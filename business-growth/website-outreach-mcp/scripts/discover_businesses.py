#!/usr/bin/env python3
"""Discover local businesses by location, category, and quality signals.

Primary target: businesses with GOOD REVIEWS but NO WEBSITE — they have
proven demand but no web presence. Easy outreach pitch.

Data sources:
  1. google_places_nearby — Places API (New), one circle, up to 20 results
  2. google_places_text   — Places API (New), text query, up to 60 results
  3. google_places_grid   — Grid-tile a city with nearby calls (dedupe by id)
  4. osm                  — OpenStreetMap Overpass API (free, no key)
  5. local                — A local JSON file (offline testing)

Filters (apply to any source):
  --min-rating FLOAT     Keep only leads with rating >= this
  --min-reviews INT      Keep only leads with at least N reviews
  --missing-website      Keep only leads with no website on record
  --operational-only     Drop CLOSED_TEMPORARILY / CLOSED_PERMANENTLY

Output rows are normalized to a common schema:
  {name, category, address, phone, website, rating, review_count,
   business_status, google_maps_uri, lat, lng, source, raw_id}

Cost control (Places API New):
  - Uses a minimal field mask so only the fields we need are billed
  - --max-tiles caps grid expansion so you can't accidentally overspend
  - --keyword-sweep takes a comma-list; each keyword = one API call per tile
"""
from __future__ import annotations

import argparse
import json
import math
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


PLACES_V1 = "https://places.googleapis.com/v1"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Field mask for Places API (New). Only request what we use — each field
# class affects pricing SKU. Including rating/userRatingCount/websiteUri
# puts us in the Advanced SKU, which is required for the ICP filter.
PLACES_FIELD_MASK = ",".join([
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.nationalPhoneNumber",
    "places.internationalPhoneNumber",
    "places.websiteUri",
    "places.rating",
    "places.userRatingCount",
    "places.businessStatus",
    "places.googleMapsUri",
    "places.location",
    "places.types",
    "places.primaryType",
    "nextPageToken",
])


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def _http_get_json(url: str, timeout: int = 20) -> dict[str, Any]:
    req = urllib.request.Request(url, headers={"User-Agent": "website-outreach-mcp/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _http_post_json(url: str, body: str, timeout: int = 30,
                    headers: dict[str, str] | None = None) -> dict[str, Any]:
    hdrs = {"User-Agent": "website-outreach-mcp/1.0"}
    if headers:
        hdrs.update(headers)
    req = urllib.request.Request(url, data=body.encode("utf-8"), headers=hdrs, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _places_post(endpoint: str, payload: dict[str, Any], api_key: str,
                 timeout: int = 30) -> dict[str, Any]:
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": PLACES_FIELD_MASK,
    }
    url = f"{PLACES_V1}/{endpoint}"
    try:
        return _http_post_json(url, json.dumps(payload), timeout=timeout, headers=headers)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace") if hasattr(e, "read") else ""
        raise RuntimeError(f"Places API error {e.code}: {detail}") from e


# ---------------------------------------------------------------------------
# Normalization
# ---------------------------------------------------------------------------

def _normalize_place_v1(p: dict[str, Any]) -> dict[str, Any]:
    loc = p.get("location") or {}
    return {
        "name": (p.get("displayName") or {}).get("text", ""),
        "category": p.get("primaryType", "") or ",".join(p.get("types") or []),
        "address": p.get("formattedAddress", ""),
        "phone": p.get("nationalPhoneNumber") or p.get("internationalPhoneNumber") or "",
        "website": p.get("websiteUri", "") or "",
        "rating": p.get("rating"),
        "review_count": p.get("userRatingCount"),
        "business_status": p.get("businessStatus", ""),
        "google_maps_uri": p.get("googleMapsUri", ""),
        "lat": loc.get("latitude"),
        "lng": loc.get("longitude"),
        "source": "google_places_v1",
        "raw_id": p.get("id", ""),
    }


# ---------------------------------------------------------------------------
# Google Places (New) — three modes
# ---------------------------------------------------------------------------

def discover_google_nearby(lat: float, lng: float, radius_m: int,
                           included_types: list[str] | None, api_key: str,
                           max_results: int = 20) -> list[dict[str, Any]]:
    body: dict[str, Any] = {
        "maxResultCount": min(max(1, max_results), 20),
        "rankPreference": "POPULARITY",
        "locationRestriction": {
            "circle": {
                "center": {"latitude": float(lat), "longitude": float(lng)},
                "radius": float(radius_m),
            }
        },
    }
    if included_types:
        body["includedTypes"] = included_types
    data = _places_post("places:searchNearby", body, api_key)
    return [_normalize_place_v1(p) for p in data.get("places", []) or []]


def discover_google_text(query: str, api_key: str,
                         lat: float | None = None, lng: float | None = None,
                         radius_m: int | None = None,
                         max_pages: int = 3,
                         page_delay_s: float = 2.0) -> list[dict[str, Any]]:
    body: dict[str, Any] = {"textQuery": query, "maxResultCount": 20}
    if lat is not None and lng is not None and radius_m:
        body["locationBias"] = {
            "circle": {
                "center": {"latitude": float(lat), "longitude": float(lng)},
                "radius": float(radius_m),
            }
        }
    out: list[dict[str, Any]] = []
    for _page in range(max(1, max_pages)):
        data = _places_post("places:searchText", body, api_key)
        out.extend(_normalize_place_v1(p) for p in data.get("places", []) or [])
        token = data.get("nextPageToken")
        if not token:
            break
        body = {k: v for k, v in body.items() if k != "pageToken"}
        body["pageToken"] = token
        time.sleep(page_delay_s)
    return out


def _grid_centers(center_lat: float, center_lng: float, city_radius_m: int,
                  tile_radius_m: int, overlap: float = 0.4) -> list[tuple[float, float]]:
    """Generate tile centers covering a circle of city_radius_m around (center_lat, center_lng).

    Tiles of radius `tile_radius_m` with ~40% overlap — centers step
    `2 * tile_radius_m * (1 - overlap)` meters apart.
    """
    step_m = max(50.0, 2 * tile_radius_m * (1 - overlap))
    lat_step = step_m / 111_320.0
    cos_lat = max(0.01, math.cos(math.radians(center_lat)))
    lng_step = step_m / (111_320.0 * cos_lat)
    span = int(math.ceil(city_radius_m / step_m)) + 1
    centers: list[tuple[float, float]] = []
    for i in range(-span, span + 1):
        for j in range(-span, span + 1):
            la = center_lat + i * lat_step
            ln = center_lng + j * lng_step
            # keep tile centers whose corners could touch the city circle
            dm = math.hypot(
                (la - center_lat) * 111_320.0,
                (ln - center_lng) * 111_320.0 * cos_lat,
            )
            if dm <= city_radius_m + tile_radius_m:
                centers.append((la, ln))
    return centers


def discover_google_grid(center_lat: float, center_lng: float, city_radius_m: int,
                         included_types: list[str] | None, api_key: str,
                         tile_radius_m: int = 500, max_tiles: int = 100,
                         keyword_sweep: list[str] | None = None,
                         on_progress=None) -> list[dict[str, Any]]:
    """Tile a city and call searchNearby per tile. Dedupe by place id.

    If `keyword_sweep` is set, runs one searchText per (tile, keyword) with
    locationRestriction — useful when includedTypes doesn't cover the niche.
    """
    centers = _grid_centers(center_lat, center_lng, city_radius_m, tile_radius_m)
    tile_count = len(centers)
    calls_per_tile = max(1, len(keyword_sweep)) if keyword_sweep else 1
    total_calls = tile_count * calls_per_tile
    if tile_count > max_tiles:
        raise ValueError(
            f"Grid produced {tile_count} tiles (> max_tiles={max_tiles}). "
            f"Either increase --max-tiles, increase --tile-radius-m, or reduce --city-radius-m. "
            f"At current settings you would make {total_calls} API calls."
        )

    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    for idx, (la, ln) in enumerate(centers, 1):
        if on_progress:
            on_progress(idx, tile_count)
        if keyword_sweep:
            for kw in keyword_sweep:
                try:
                    rows = discover_google_text(
                        query=kw, api_key=api_key,
                        lat=la, lng=ln, radius_m=tile_radius_m,
                        max_pages=1,  # stay frugal inside a grid sweep
                    )
                except Exception as e:
                    print(f"WARN: text tile {idx}/{tile_count} kw={kw!r}: {e}", file=sys.stderr)
                    continue
                for r in rows:
                    rid = r.get("raw_id") or ""
                    if rid and rid not in seen:
                        seen.add(rid)
                        out.append(r)
        else:
            try:
                rows = discover_google_nearby(
                    la, ln, tile_radius_m, included_types, api_key
                )
            except Exception as e:
                print(f"WARN: nearby tile {idx}/{tile_count}: {e}", file=sys.stderr)
                continue
            for r in rows:
                rid = r.get("raw_id") or ""
                if rid and rid not in seen:
                    seen.add(rid)
                    out.append(r)
    return out


# ---------------------------------------------------------------------------
# OSM (unchanged behavior, kept as free fallback)
# ---------------------------------------------------------------------------

def discover_osm(lat: float, lng: float, radius_m: int, keyword: str) -> list[dict[str, Any]]:
    q = f"""
    [out:json][timeout:25];
    (
      node(around:{radius_m},{lat},{lng})[name][~"^(shop|amenity|office|craft|tourism)$"~"."];
      way(around:{radius_m},{lat},{lng})[name][~"^(shop|amenity|office|craft|tourism)$"~"."];
    );
    out center tags 60;
    """
    data = _http_post_json(OVERPASS_URL, "data=" + urllib.parse.quote(q),
                           headers={"Content-Type": "application/x-www-form-urlencoded"})
    kw = keyword.lower().strip() if keyword else ""
    rows: list[dict[str, Any]] = []
    for el in data.get("elements", []):
        tags = el.get("tags") or {}
        name = tags.get("name", "")
        if not name:
            continue
        category = (tags.get("shop") or tags.get("amenity") or tags.get("office")
                    or tags.get("craft") or tags.get("tourism") or "")
        if kw and kw not in name.lower() and kw not in category.lower():
            continue
        addr_parts = [tags.get("addr:housenumber"), tags.get("addr:street"),
                      tags.get("addr:city"), tags.get("addr:postcode")]
        address = ", ".join(p for p in addr_parts if p)
        center = el.get("center") or {}
        rows.append({
            "name": name,
            "category": category,
            "address": address,
            "phone": tags.get("phone", "") or tags.get("contact:phone", ""),
            "website": (tags.get("website") or tags.get("contact:website")
                        or tags.get("url") or ""),
            "rating": None,
            "review_count": None,
            "business_status": "",
            "google_maps_uri": "",
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
            "rating": item.get("rating"),
            "review_count": item.get("review_count"),
            "business_status": item.get("business_status", ""),
            "google_maps_uri": item.get("google_maps_uri", ""),
            "lat": item.get("lat"),
            "lng": item.get("lng"),
            "source": item.get("source", "local"),
            "raw_id": item.get("raw_id", item.get("id", "")),
        })
    return out


# ---------------------------------------------------------------------------
# Filtering
# ---------------------------------------------------------------------------

def filter_leads(rows: list[dict[str, Any]], *,
                 min_rating: float | None = None,
                 min_reviews: int | None = None,
                 missing_website: bool = False,
                 operational_only: bool = False) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for r in rows:
        if operational_only:
            bs = (r.get("business_status") or "").upper()
            if bs and bs != "OPERATIONAL":
                continue
        if missing_website and (r.get("website") or "").strip():
            continue
        if min_rating is not None:
            rating = r.get("rating")
            if rating is None or rating < min_rating:
                continue
        if min_reviews is not None:
            rc = r.get("review_count")
            if rc is None or rc < min_reviews:
                continue
        out.append(r)
    return out


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def format_human(rows: list[dict[str, Any]]) -> str:
    lines = [f"Discovered {len(rows)} business(es):", ""]
    for i, r in enumerate(rows, 1):
        header = f"{i}. {r['name']}  [{r.get('category') or 'uncategorized'}]"
        rating = r.get("rating")
        rc = r.get("review_count")
        if rating is not None:
            header += f"  ★{rating}"
            if rc is not None:
                header += f" ({rc})"
        lines.append(header)
        if r.get("address"):
            lines.append(f"   {r['address']}")
        lines.append(f"   website: {r.get('website') or '(none)'}   phone: {r.get('phone') or '(none)'}")
        if r.get("google_maps_uri"):
            lines.append(f"   map: {r['google_maps_uri']}")
        lines.append(f"   source: {r['source']}  id: {r['raw_id']}")
        lines.append("")
    return "\n".join(lines)


def _parse_csv_list(s: str) -> list[str]:
    return [p.strip() for p in s.split(",") if p.strip()]


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(
        description="Discover local businesses for website outreach.",
        epilog=(
            "Recommended ICP: --source google_places_grid --missing-website "
            "--min-rating 4.0 --min-reviews 20 --operational-only"
        ),
    )
    p.add_argument("--source",
                   choices=("google_places_nearby", "google_places_text",
                            "google_places_grid", "osm", "local"),
                   default="osm")
    p.add_argument("--lat", type=float)
    p.add_argument("--lng", type=float)
    p.add_argument("--radius-m", type=int, default=2000,
                   help="Radius for nearby/text (default 2000)")
    p.add_argument("--city-radius-m", type=int, default=5000,
                   help="Outer radius for grid sweep (default 5000)")
    p.add_argument("--tile-radius-m", type=int, default=1000,
                   help="Per-tile radius for grid sweep (default 1000 — ~50 tiles for a 5km city)")
    p.add_argument("--max-tiles", type=int, default=150,
                   help="Hard cap on grid tile count (default 150) — cost guardrail")
    p.add_argument("--keyword", default="",
                   help="Keyword (OSM: name/category substring; Text: query string)")
    p.add_argument("--included-types", default="",
                   help="Comma-list of Places types for nearby/grid (e.g. 'plumber,roofing_contractor')")
    p.add_argument("--keyword-sweep", default="",
                   help="Comma-list of text queries to run per grid tile (overrides included-types for grid mode)")
    p.add_argument("--file", help="Local JSON file (for --source local)")
    p.add_argument("--min-rating", type=float, help="Keep leads with rating >= this (e.g. 4.0)")
    p.add_argument("--min-reviews", type=int, help="Keep leads with at least N reviews (e.g. 20)")
    p.add_argument("--missing-website", action="store_true",
                   help="Keep only leads with no website — the primary ICP")
    p.add_argument("--operational-only", action="store_true",
                   help="Drop CLOSED_TEMPORARILY / CLOSED_PERMANENTLY")
    p.add_argument("--limit", type=int, default=0, help="Max rows to return (0 = all)")
    p.add_argument("--format", choices=("json", "text"), default="text")
    args = p.parse_args(argv)

    try:
        if args.source.startswith("google_places"):
            key = os.environ.get("GOOGLE_PLACES_API_KEY")
            if not key:
                print("ERROR: GOOGLE_PLACES_API_KEY env var not set", file=sys.stderr)
                return 2
            included = _parse_csv_list(args.included_types)
            sweep = _parse_csv_list(args.keyword_sweep)

            if args.source == "google_places_nearby":
                if args.lat is None or args.lng is None:
                    print("ERROR: --lat and --lng required", file=sys.stderr); return 2
                rows = discover_google_nearby(args.lat, args.lng, args.radius_m,
                                               included or None, key)
            elif args.source == "google_places_text":
                if not args.keyword:
                    print("ERROR: --keyword required for google_places_text", file=sys.stderr); return 2
                rows = discover_google_text(args.keyword, key,
                                             lat=args.lat, lng=args.lng,
                                             radius_m=args.radius_m)
            else:  # grid
                if args.lat is None or args.lng is None:
                    print("ERROR: --lat and --lng required", file=sys.stderr); return 2
                if not included and not sweep:
                    print("ERROR: grid needs --included-types or --keyword-sweep", file=sys.stderr); return 2

                def _progress(i: int, n: int) -> None:
                    print(f"  tile {i}/{n}...", file=sys.stderr)

                rows = discover_google_grid(
                    args.lat, args.lng, args.city_radius_m,
                    included or None, key,
                    tile_radius_m=args.tile_radius_m,
                    max_tiles=args.max_tiles,
                    keyword_sweep=sweep or None,
                    on_progress=_progress,
                )
        elif args.source == "osm":
            if args.lat is None or args.lng is None:
                print("ERROR: --lat and --lng required for osm", file=sys.stderr); return 2
            rows = discover_osm(args.lat, args.lng, args.radius_m, args.keyword)
        else:
            if not args.file:
                print("ERROR: --file required for --source local", file=sys.stderr); return 2
            rows = discover_local(args.file)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    rows = filter_leads(
        rows,
        min_rating=args.min_rating,
        min_reviews=args.min_reviews,
        missing_website=args.missing_website,
        operational_only=args.operational_only,
    )
    if args.limit and args.limit > 0:
        rows = rows[: args.limit]

    if args.format == "json":
        print(json.dumps({"count": len(rows), "businesses": rows}, indent=2))
    else:
        print(format_human(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
