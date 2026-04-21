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
    source: str = "google_places_grid",
    lat: float | None = None,
    lng: float | None = None,
    radius_m: int = 2000,
    city_radius_m: int = 5000,
    tile_radius_m: int = 1000,
    max_tiles: int = 150,
    keyword: str = "",
    included_types: list[str] | None = None,
    keyword_sweep: list[str] | None = None,
    file: str | None = None,
    missing_website: bool = True,
    min_rating: float | None = 4.0,
    min_reviews: int | None = 20,
    operational_only: bool = True,
    limit: int = 0,
) -> dict[str, Any]:
    """Find local businesses to target for outreach.

    The default settings implement the recommended ICP:
    Google-verified businesses with good reviews (>= 4.0, >= 20 reviews)
    that currently have NO WEBSITE, swept across a city via grid tiling.

    Args:
      source: One of "google_places_nearby" (single 20-result call),
              "google_places_text" (text query, up to 60 results),
              "google_places_grid" (tile a city — default, highest yield),
              "osm" (free, no key), "local" (JSON file).
      lat, lng: Search center.
      radius_m: Radius for nearby/text modes (default 2000).
      city_radius_m: Outer sweep radius for grid mode (default 5000).
      tile_radius_m: Per-tile radius for grid mode (default 500).
      max_tiles: Hard cap on grid tiles (default 100) — cost guardrail.
      keyword: Free-text keyword (OSM filter, or query for text search).
      included_types: Places types for nearby/grid (e.g. ["plumber"]).
      keyword_sweep: Text queries to run per tile in grid mode (e.g.
                     ["plumber", "plumbing repair", "emergency plumber"]).
      file: Path to local JSON (source="local").
      missing_website: Drop any lead that already has a website (default True).
      min_rating: Keep leads rated >= this on Google (default 4.0).
      min_reviews: Keep leads with at least N reviews (default 20).
      operational_only: Drop CLOSED_TEMPORARILY / CLOSED_PERMANENTLY.
      limit: Cap results (0 = no cap).

    Returns:
      {"count": int, "businesses": [...]}  — each row includes rating,
      review_count, business_status, and google_maps_uri when available.
    """
    try:
        if source.startswith("google_places"):
            key = os.environ.get("GOOGLE_PLACES_API_KEY")
            if not key:
                return {"error": {"code": "missing_key",
                                  "message": "GOOGLE_PLACES_API_KEY not set"}}
            if source == "google_places_nearby":
                if lat is None or lng is None:
                    return {"error": {"code": "bad_input", "message": "lat/lng required"}}
                rows = discover_businesses.discover_google_nearby(
                    lat, lng, radius_m, included_types or None, key
                )
            elif source == "google_places_text":
                if not keyword:
                    return {"error": {"code": "bad_input",
                                      "message": "keyword required for google_places_text"}}
                rows = discover_businesses.discover_google_text(
                    keyword, key, lat=lat, lng=lng, radius_m=radius_m
                )
            elif source == "google_places_grid":
                if lat is None or lng is None:
                    return {"error": {"code": "bad_input", "message": "lat/lng required"}}
                if not included_types and not keyword_sweep:
                    return {"error": {"code": "bad_input",
                                      "message": "grid needs included_types or keyword_sweep"}}
                rows = discover_businesses.discover_google_grid(
                    lat, lng, city_radius_m, included_types or None, key,
                    tile_radius_m=tile_radius_m, max_tiles=max_tiles,
                    keyword_sweep=keyword_sweep or None,
                )
            else:
                return {"error": {"code": "bad_input", "message": f"unknown source {source}"}}
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

    rows = discover_businesses.filter_leads(
        rows,
        min_rating=min_rating,
        min_reviews=min_reviews,
        missing_website=missing_website,
        operational_only=operational_only,
    )
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
    source: str = "google_places_grid",
    lat: float | None = None,
    lng: float | None = None,
    radius_m: int = 2000,
    city_radius_m: int = 5000,
    tile_radius_m: int = 1000,
    max_tiles: int = 150,
    keyword: str = "",
    included_types: list[str] | None = None,
    keyword_sweep: list[str] | None = None,
    file: str | None = None,
    limit: int = 50,
    missing_website: bool = True,
    min_rating: float | None = 4.0,
    min_reviews: int | None = 20,
    operational_only: bool = True,
    min_upgrade_priority: int = 40,
    use_pagespeed: bool = False,
    signer: dict[str, str] | None = None,
) -> dict[str, Any]:
    """End-to-end: discover -> assess -> draft for each qualifying lead.

    Default behavior targets the recommended ICP: good-reviews + no-website
    businesses within a city grid. Because `missing_website=True` by default,
    every qualifying lead will assess at upgrade_priority 100.

    Filters:
      - Google: min_rating, min_reviews, operational_only, missing_website
      - Site:   min_upgrade_priority (only matters for leads WITH a website)
    """
    disc = discover_businesses_tool(
        source=source, lat=lat, lng=lng,
        radius_m=radius_m, city_radius_m=city_radius_m,
        tile_radius_m=tile_radius_m, max_tiles=max_tiles,
        keyword=keyword, included_types=included_types,
        keyword_sweep=keyword_sweep, file=file,
        missing_website=missing_website,
        min_rating=min_rating, min_reviews=min_reviews,
        operational_only=operational_only, limit=limit,
    )
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
