#!/usr/bin/env python3
"""Website Outreach MCP Server.

Exposes four tools over the Model Context Protocol for reaching out to
businesses that either lack a website or need one upgraded:

  - discover_businesses     — find local businesses by lat/lng + keyword
  - assess_website          — score a site's quality and upgrade priority
  - enrich_contacts         — extract public emails/phones/socials
  - draft_outreach          — generate email/SMS/voicemail drafts (no LLM)
  - build_campaign          — convenience: discover -> assess -> draft for each lead

Data sources:
  - OpenStreetMap Overpass (no key)                                        — default
  - Google Places (needs GOOGLE_PLACES_API_KEY)                            — optional
  - PageSpeed Insights (needs PAGESPEED_API_KEY)                           — optional

Run:
    pip install fastmcp
    python mcp_server.py

Register with Claude Code / any MCP client per their docs (stdio transport).

The server does NOT send outreach. It only drafts messages for a human to
review and send. This is deliberate — it keeps the surface area small and
sidesteps deliverability / anti-spam concerns.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path
from typing import Any

# Make script modules importable regardless of CWD
_HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(_HERE / "scripts"))

import discover_businesses  # noqa: E402
import assess_website  # noqa: E402
import enrich_contacts  # noqa: E402
import draft_outreach  # noqa: E402

try:
    from fastmcp import FastMCP
except ImportError:
    print("ERROR: fastmcp not installed. Run: pip install fastmcp", file=sys.stderr)
    raise

mcp = FastMCP(name="website-outreach-mcp")


@mcp.tool()
def discover_businesses_tool(
    source: str = "osm",
    lat: float | None = None,
    lng: float | None = None,
    radius_m: int = 2000,
    keyword: str = "",
    file: str | None = None,
    missing_website_only: bool = False,
    limit: int = 0,
) -> dict[str, Any]:
    """Find local businesses to target for outreach.

    Args:
      source: "osm" (free, no key), "google_places" (needs GOOGLE_PLACES_API_KEY),
              or "local" (reads from a JSON file).
      lat, lng: Search center (required for osm / google_places).
      radius_m: Search radius in meters (default 2000).
      keyword: Optional category/name filter (e.g. "plumber", "bakery").
      file: Path to a local JSON file (for source="local").
      missing_website_only: If true, drop any lead that already has a website.
      limit: Cap results (0 = no cap).

    Returns:
      {"count": int, "businesses": [...]}
    """
    try:
        if source == "google_places":
            key = os.environ.get("GOOGLE_PLACES_API_KEY")
            if not key:
                return {"error": {"code": "missing_key",
                                  "message": "GOOGLE_PLACES_API_KEY not set"}}
            if lat is None or lng is None:
                return {"error": {"code": "bad_input", "message": "lat/lng required"}}
            rows = discover_businesses.discover_google(lat, lng, radius_m, keyword, key)
        elif source == "osm":
            if lat is None or lng is None:
                return {"error": {"code": "bad_input", "message": "lat/lng required"}}
            rows = discover_businesses.discover_osm(lat, lng, radius_m, keyword)
        elif source == "local":
            if not file:
                return {"error": {"code": "bad_input", "message": "file required"}}
            rows = discover_businesses.discover_local(file)
        else:
            return {"error": {"code": "bad_input", "message": f"unknown source {source}"}}
    except Exception as e:
        return {"error": {"code": "discovery_failed", "message": str(e)}}

    if missing_website_only:
        rows = [r for r in rows if not (r.get("website") or "").strip()]
    if limit and limit > 0:
        rows = rows[:limit]
    return {"count": len(rows), "businesses": rows}


@mcp.tool()
def assess_website_tool(url: str, use_pagespeed: bool = False,
                        strategy: str = "mobile") -> dict[str, Any]:
    """Assess a website's quality and compute an upgrade_priority score (0-100).

    Args:
      url: Website URL (empty string is valid — scored as 'no site').
      use_pagespeed: If true, also call PageSpeed Insights (needs PAGESPEED_API_KEY).
      strategy: "mobile" or "desktop" for PageSpeed.

    Returns: heuristic assessment dict, optionally augmented with PageSpeed metrics.
    """
    result = assess_website.heuristic_assess(url)
    if use_pagespeed and result.get("reachable"):
        key = os.environ.get("PAGESPEED_API_KEY")
        if not key:
            result["pagespeed_error"] = "PAGESPEED_API_KEY not set"
        else:
            try:
                result["pagespeed"] = assess_website.pagespeed_assess(
                    result.get("final_url") or url, key, strategy
                )
            except Exception as e:
                result["pagespeed_error"] = str(e)
    return result


@mcp.tool()
def enrich_contacts_tool(url: str, crawl_contact_page: bool = True) -> dict[str, Any]:
    """Extract public emails, phone numbers, and social links from a business website.

    Args:
      url: Website URL.
      crawl_contact_page: If true, follow the first discovered /contact link for extras.

    Returns: {emails, phones, socials, contact_pages, crawled_urls}
    """
    return enrich_contacts.enrich(url, crawl_contact_page=crawl_contact_page)


@mcp.tool()
def draft_outreach_tool(business: dict[str, Any], assessment: dict[str, Any],
                        signer: dict[str, str] | None = None) -> dict[str, Any]:
    """Draft email, SMS, and voicemail outreach for a single lead.

    Args:
      business: Business record from discover_businesses_tool.
      assessment: Assessment record from assess_website_tool.
      signer: {name, company, phone, offer_summary, offer_price_anchor}.

    Returns: {classification, email, sms, voicemail, notes}
    """
    return draft_outreach.run({"business": business, "assessment": assessment, "signer": signer})


@mcp.tool()
def build_campaign(
    source: str = "osm",
    lat: float | None = None,
    lng: float | None = None,
    radius_m: int = 2000,
    keyword: str = "",
    file: str | None = None,
    limit: int = 10,
    min_upgrade_priority: int = 40,
    use_pagespeed: bool = False,
    signer: dict[str, str] | None = None,
) -> dict[str, Any]:
    """End-to-end: discover -> assess -> draft for each qualifying lead.

    Filters leads to those whose assessed upgrade_priority is at or above
    `min_upgrade_priority`. Returns a list of ready-to-review drafts, each
    paired with the business record and assessment findings.
    """
    disc = discover_businesses_tool(source=source, lat=lat, lng=lng,
                                    radius_m=radius_m, keyword=keyword, file=file,
                                    missing_website_only=False, limit=limit)
    if "error" in disc:
        return disc

    campaign: list[dict[str, Any]] = []
    for biz in disc["businesses"]:
        website = (biz.get("website") or "").strip()
        a = assess_website_tool(url=website, use_pagespeed=use_pagespeed)
        if (a.get("upgrade_priority") or 0) < min_upgrade_priority:
            continue
        drafts = draft_outreach_tool(business=biz, assessment=a, signer=signer)
        campaign.append({
            "business": biz,
            "assessment": {
                "upgrade_priority": a.get("upgrade_priority"),
                "findings": a.get("findings", []),
                "reachable": a.get("reachable"),
                "https": a.get("https"),
                "looks_parked": a.get("looks_parked"),
            },
            "drafts": drafts,
        })
    return {
        "searched": disc["count"],
        "qualified": len(campaign),
        "leads": campaign,
    }


if __name__ == "__main__":
    mcp.run()
