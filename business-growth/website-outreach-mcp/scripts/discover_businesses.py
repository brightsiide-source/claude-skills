#!/usr/bin/env python3
"""Discover local businesses by location and category.

Supports three data sources:
  1. google_places — Google Places Nearby Search (needs GOOGLE_PLACES_API_KEY)
  2. osm             — OpenStreetMap Overpass API (free, no key)
  3. local           — A local JSON file (offline testing)

Output rows are normalized to a common schema:
  {name, category, address, phone, website, lat, lng, source, raw_id}

The caller can filter downstream with --missing-website to focus on leads
that have no homepage listed (the primary outreach target).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
from typing import Any


GOOGLE_NEARBY_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
GOOGLE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"


def _http_get_json(url: str, timeout: int = 20) -> dict[str, Any]:
    req = urllib.request.Request(url, headers={"User-Agent": "website-outreach-mcp/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _http_post_json(url: str, body: str, timeout: int = 30) -> dict[str, Any]:
    req = urllib.request.Request(
        url,
        data=body.encode("utf-8"),
        headers={
            "User-Agent": "website-outreach-mcp/1.0",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def discover_google(lat: float, lng: float, radius_m: int, keyword: str, api_key: str,
                    include_details: bool = True) -> list[dict[str, Any]]:
    params = {
        "location": f"{lat},{lng}",
        "radius": radius_m,
        "keyword": keyword,
        "key": api_key,
    }
    url = f"{GOOGLE_NEARBY_URL}?{urllib.parse.urlencode(params)}"
    data = _http_get_json(url)
    if data.get("status") not in ("OK", "ZERO_RESULTS"):
        raise RuntimeError(f"Google Places error: {data.get('status')} {data.get('error_message', '')}")

    rows: list[dict[str, Any]] = []
    for r in data.get("results", []):
        place_id = r.get("place_id", "")
        row = {
            "name": r.get("name", ""),
            "category": ",".join(r.get("types", []) or []),
            "address": r.get("vicinity", ""),
            "phone": "",
            "website": "",
            "lat": (r.get("geometry") or {}).get("location", {}).get("lat"),
            "lng": (r.get("geometry") or {}).get("location", {}).get("lng"),
            "source": "google_places",
            "raw_id": place_id,
        }
        if include_details and place_id:
            try:
                dparams = {
                    "place_id": place_id,
                    "fields": "website,formatted_phone_number,formatted_address",
                    "key": api_key,
                }
                durl = f"{GOOGLE_DETAILS_URL}?{urllib.parse.urlencode(dparams)}"
                d = _http_get_json(durl).get("result", {}) or {}
                row["website"] = d.get("website", "") or ""
                row["phone"] = d.get("formatted_phone_number", "") or ""
                if d.get("formatted_address"):
                    row["address"] = d["formatted_address"]
            except Exception:
                pass
        rows.append(row)
    return rows


def discover_osm(lat: float, lng: float, radius_m: int, keyword: str) -> list[dict[str, Any]]:
    # Overpass QL: match nodes/ways with shop/amenity/office tag and a name
    q = f"""
    [out:json][timeout:25];
    (
      node(around:{radius_m},{lat},{lng})[name][~"^(shop|amenity|office|craft|tourism)$"~"."];
      way(around:{radius_m},{lat},{lng})[name][~"^(shop|amenity|office|craft|tourism)$"~"."];
    );
    out center tags 60;
    """
    data = _http_post_json(OVERPASS_URL, "data=" + urllib.parse.quote(q))
    kw = keyword.lower().strip() if keyword else ""
    rows: list[dict[str, Any]] = []
    for el in data.get("elements", []):
        tags = el.get("tags") or {}
        name = tags.get("name", "")
        if not name:
            continue
        category = tags.get("shop") or tags.get("amenity") or tags.get("office") or tags.get("craft") or tags.get("tourism") or ""
        if kw and kw not in name.lower() and kw not in category.lower():
            continue
        addr_parts = [tags.get("addr:housenumber"), tags.get("addr:street"), tags.get("addr:city"), tags.get("addr:postcode")]
        address = ", ".join(p for p in addr_parts if p)
        center = el.get("center") or {}
        rows.append({
            "name": name,
            "category": category,
            "address": address,
            "phone": tags.get("phone", "") or tags.get("contact:phone", ""),
            "website": tags.get("website", "") or tags.get("contact:website", "") or tags.get("url", ""),
            "lat": el.get("lat") or center.get("lat"),
            "lng": el.get("lon") or center.get("lon"),
            "source": "osm",
            "raw_id": f"{el.get('type')}/{el.get('id')}",
        })
    return rows


def discover_local(path: str) -> list[dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict) and "businesses" in data:
        data = data["businesses"]
    if not isinstance(data, list):
        raise ValueError("local file must be a JSON list or {businesses: [...]}")
    out = []
    for item in data:
        out.append({
            "name": item.get("name", ""),
            "category": item.get("category", ""),
            "address": item.get("address", ""),
            "phone": item.get("phone", ""),
            "website": item.get("website", ""),
            "lat": item.get("lat"),
            "lng": item.get("lng"),
            "source": item.get("source", "local"),
            "raw_id": item.get("raw_id", item.get("id", "")),
        })
    return out


def format_human(rows: list[dict[str, Any]]) -> str:
    lines = [f"Discovered {len(rows)} business(es):", ""]
    for i, r in enumerate(rows, 1):
        lines.append(f"{i}. {r['name']}  [{r.get('category','') or 'uncategorized'}]")
        if r.get("address"):
            lines.append(f"   {r['address']}")
        lines.append(f"   website: {r.get('website') or '(none)'}   phone: {r.get('phone') or '(none)'}")
        lines.append(f"   source: {r['source']}  id: {r['raw_id']}")
        lines.append("")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Discover local businesses for website outreach.")
    p.add_argument("--source", choices=("google_places", "osm", "local"), default="osm",
                   help="Data source (default: osm)")
    p.add_argument("--lat", type=float, help="Latitude of search center")
    p.add_argument("--lng", type=float, help="Longitude of search center")
    p.add_argument("--radius-m", type=int, default=2000, help="Search radius in meters (default: 2000)")
    p.add_argument("--keyword", default="", help="Category or name keyword (e.g. 'plumber', 'bakery')")
    p.add_argument("--file", help="Local JSON file (for --source local)")
    p.add_argument("--missing-website", action="store_true",
                   help="Only return businesses with no website on record")
    p.add_argument("--limit", type=int, default=0, help="Max rows to return (0 = all)")
    p.add_argument("--format", choices=("json", "text"), default="text")
    args = p.parse_args(argv)

    try:
        if args.source == "google_places":
            key = os.environ.get("GOOGLE_PLACES_API_KEY")
            if not key:
                print("ERROR: GOOGLE_PLACES_API_KEY env var not set", file=sys.stderr)
                return 2
            if args.lat is None or args.lng is None:
                print("ERROR: --lat and --lng required for google_places", file=sys.stderr)
                return 2
            rows = discover_google(args.lat, args.lng, args.radius_m, args.keyword, key)
        elif args.source == "osm":
            if args.lat is None or args.lng is None:
                print("ERROR: --lat and --lng required for osm", file=sys.stderr)
                return 2
            rows = discover_osm(args.lat, args.lng, args.radius_m, args.keyword)
        else:
            if not args.file:
                print("ERROR: --file required for --source local", file=sys.stderr)
                return 2
            rows = discover_local(args.file)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    if args.missing_website:
        rows = [r for r in rows if not (r.get("website") or "").strip()]
    if args.limit and args.limit > 0:
        rows = rows[: args.limit]

    if args.format == "json":
        print(json.dumps({"count": len(rows), "businesses": rows}, indent=2))
    else:
        print(format_human(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
