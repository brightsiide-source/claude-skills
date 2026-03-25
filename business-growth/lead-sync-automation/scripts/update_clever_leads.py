#!/usr/bin/env python3
"""
Clever Leads Bulk Updater
-------------------------
Matches leads from RESimpli CSV export to Clever Leads connections
and posts status updates via the Clever Leads API.

Status logic is time-based:
  - Attempting Contact: >10 days = Lost, ≤10 days = Reached Out
  - Contact Made - Follow Up: >20 days = Lost, ≤20 days = Connected
  - Qualified / Negotiation: >30 days = Lost, ≤30 days = Connected
  - Offers Made: Offer Made (with price/date details)
  - Under Contract: Under Contract
  - Warm / Dead / Referred To Agent: Lost (random reason)
  - New Leads: Skip

Usage:
    python3 update_clever_leads.py \
        --csv /path/to/Exported_Leads.csv \
        --token "Bearer eyJ..." \
        --dry-run
"""

import argparse
import csv
import json
import random
import re
import sys
import time
import urllib.request
import urllib.error
from collections import Counter
from datetime import datetime, date

# ─── Configuration ───────────────────────────────────────────────────────────

BASE_URL = "https://investors.cleveroffers.com/api/portal"
TODAY = date.today()

# Reasons to randomly pick for lost leads
LOST_REASONS = [
    "Outside My Buy Box",
    "Could Not Connect",
    "Price Too High",
    "Other",
]

LOST_BUY_BOX_REASONS = [
    ["Location"],
    ["Price"],
    ["Condition"],
    [],
]

# ─── Address Normalization ───────────────────────────────────────────────────

DIRECTION_MAP = {
    "north": "n", "south": "s", "east": "e", "west": "w",
    "northeast": "ne", "northwest": "nw", "southeast": "se", "southwest": "sw",
}

STREET_SUFFIX_MAP = {
    "street": "st", "avenue": "ave", "boulevard": "blvd", "drive": "dr",
    "court": "ct", "place": "pl", "lane": "ln", "road": "rd",
    "circle": "cir", "terrace": "ter", "trail": "trl", "way": "way",
    "parkway": "pkwy", "highway": "hwy", "pike": "pk",
}


def normalize_address(address):
    """Normalize an address for fuzzy matching."""
    if not address:
        return ""
    addr = address.lower().strip()
    addr = re.sub(r'\b(apt|unit|suite|ste|#)\s*\S+', '', addr)
    addr = addr.replace(",", " ").replace(".", " ")
    addr = re.sub(r'\s+', ' ', addr).strip()

    words = addr.split()
    normalized = []
    for word in words:
        if word in DIRECTION_MAP:
            normalized.append(DIRECTION_MAP[word])
        elif word in STREET_SUFFIX_MAP:
            normalized.append(STREET_SUFFIX_MAP[word])
        else:
            normalized.append(word)

    return " ".join(normalized)


# ─── Time-Based Status Logic ────────────────────────────────────────────────

def days_since_created(created_date_str):
    """Calculate days since lead was created."""
    if not created_date_str:
        return 9999  # Treat missing dates as very old
    try:
        created = datetime.strptime(created_date_str.strip(), "%Y-%m-%d").date()
        return (TODAY - created).days
    except ValueError:
        return 9999


def make_lost_payload():
    """Generate a lost payload with a random reason."""
    idx = random.randint(0, len(LOST_REASONS) - 1)
    return {
        "update_type": "lost",
        "payload": {
            "reason": LOST_REASONS[idx],
            "buy_box_mismatch_reason": LOST_BUY_BOX_REASONS[idx],
            "buy_box_update_requested": False,
        }
    }


def determine_update(status, days_old, offer_price="", offer_date="",
                     uc_price="", uc_date=""):
    """Determine the Clever Leads update_type and payload based on RESimpli status + age."""

    # ── New Leads: skip
    if status == "New Leads":
        return None, None

    # ── Warm / Dead / Referred To Agent: always Lost
    if status in ("Warm Lead", "Dead Lead", "Referred To Agent"):
        return "lost", make_lost_payload()

    # ── Attempting Contact: >10 days = Lost, ≤10 days = Reached Out
    if status == "Attempting Contact":
        if days_old > 10:
            return "lost", make_lost_payload()
        else:
            return "reached_out", {
                "update_type": "reached_out",
                "payload": {
                    "notes": "Attempting contact — synced from CRM"
                }
            }

    # ── Contact Made - Follow Up: >20 days = Lost, ≤20 days = Connected
    if status == "Contact Made - Follow Up":
        if days_old > 20:
            return "lost", make_lost_payload()
        else:
            return "connected", {
                "update_type": "connected",
                "payload": {
                    "notes": "Contact made, following up — synced from CRM"
                }
            }

    # ── Qualified / Negotiation: >30 days = Lost, ≤30 days = Connected
    if status in ("Qualified", "Negotiation"):
        if days_old > 30:
            return "lost", make_lost_payload()
        else:
            return "connected", {
                "update_type": "connected",
                "payload": {
                    "notes": f"{status} — synced from CRM"
                }
            }

    # ── Offers Made: Offer Made with details
    if status == "Offers Made":
        # Clean price string
        price = offer_price.replace("$", "").replace(",", "").strip() if offer_price else ""
        payload = {
            "update_type": "offer_made",
            "payload": {
                "notes": f"Offer: {offer_price}" if offer_price else "Offer made — synced from CRM",
            }
        }
        # Add price fields if the API accepts them
        if price:
            try:
                payload["payload"]["initial_offer_amount"] = float(price)
            except ValueError:
                pass
        return "offer_made", payload

    # ── Under Contract
    if status == "Under Contract":
        price = uc_price.replace("$", "").replace(",", "").strip() if uc_price else ""
        payload = {
            "update_type": "under_contract",
            "payload": {
                "notes": f"Under contract at {uc_price}" if uc_price else "Under contract — synced from CRM",
            }
        }
        if price:
            try:
                payload["payload"]["final_purchase_price"] = float(price)
            except ValueError:
                pass
        return "under_contract", payload

    # Fallback: skip unknown statuses
    return None, None


# ─── API Helpers ─────────────────────────────────────────────────────────────

def api_request(url, token, method="GET", data=None, cookies=""):
    """Make an authenticated request to the Clever Leads API."""
    headers = {
        "Authorization": token,
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        "Referer": "https://investors.cleveroffers.com/connections",
        "Origin": "https://investors.cleveroffers.com",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }
    if cookies:
        headers["Cookie"] = cookies
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8")), resp.status
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8") if e.fp else ""
        return {"error": error_body, "status": e.code}, e.code


def fetch_all_connections(token, cookies=""):
    """Fetch all connections from Clever Leads (paginated)."""
    connections = []
    page = 1
    per_page = 25

    while True:
        url = f"{BASE_URL}/connections?page={page}&per_page={per_page}&sort=-created_at"
        data, status = api_request(url, token, cookies=cookies)

        if status == 401:
            print(f"\n  TOKEN EXPIRED on page {page}. Grab a fresh Bearer token and re-run.")
            sys.exit(1)

        if status != 200:
            print(f"  ERROR fetching page {page}: {status} — {data}")
            break

        if isinstance(data, list):
            batch = data
        elif isinstance(data, dict):
            batch = data.get("results", data.get("data", data.get("connections", [])))
        else:
            break

        if not batch:
            break

        connections.extend(batch)
        print(f"  Fetched page {page} — {len(batch)} connections (total: {len(connections)})")
        page += 1
        time.sleep(0.3)

    return connections


def post_update(token, connection_id, update_payload, dry_run=False, cookies=""):
    """Post a status update to a Clever Leads connection."""
    url = f"{BASE_URL}/connections/{connection_id}/updates"
    if dry_run:
        return {"dry_run": True}, 200
    data, status = api_request(url, token, method="POST", data=update_payload, cookies=cookies)
    time.sleep(0.5)
    return data, status


# ─── CSV Loading ─────────────────────────────────────────────────────────────

def load_resimpli_leads(csv_path):
    """Load leads from RESimpli CSV export."""
    leads = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            status = row.get("Lead Status", "").strip()
            address = row.get("Property Street Address", "").strip()
            city = row.get("Property City", "").strip()
            state = row.get("Property State", "").strip()
            zip_code = row.get("Property Zip", "").strip()
            email = row.get("Email Address", "").strip().lower()
            fname = row.get("First Name", "").strip()
            lname = row.get("Last Name", "").strip()
            created = row.get("Lead Created Date", "").strip()
            offer_price = row.get("Offer Price", "").strip()
            offer_date = row.get("Offer Date", "").strip()
            uc_price = row.get("Under Contract Price", "").strip()
            uc_date = row.get("Under Contract Date", "").strip()

            if not address and not email:
                continue

            days_old = days_since_created(created)
            update_type, payload = determine_update(
                status, days_old, offer_price, offer_date, uc_price, uc_date
            )

            # Skip leads with no update needed
            if not update_type:
                continue

            leads.append({
                "address": address,
                "city": city,
                "state": state,
                "zip": zip_code,
                "email": email,
                "status": status,
                "update_type": update_type,
                "payload": payload,
                "norm_address": normalize_address(address),
                "name": f"{fname} {lname}".strip(),
                "days_old": days_old,
                "created": created,
            })

    return leads


# ─── Matching ────────────────────────────────────────────────────────────────

def match_leads(crm_leads, clever_connections):
    """Match CRM leads to Clever Leads connections by email + address."""
    clever_by_email = {}
    clever_by_addr = {}

    for conn in clever_connections:
        email = (conn.get("customer_email") or conn.get("email") or "").strip().lower()
        if email:
            clever_by_email[email] = conn

        addr = conn.get("property_address", "") or ""
        if addr:
            norm_addr = normalize_address(addr)
            if norm_addr:
                clever_by_addr[norm_addr] = conn

    matched = []
    unmatched = []
    match_methods = Counter()

    for lead in crm_leads:
        conn = None
        method = ""

        if lead["email"] and lead["email"] in clever_by_email:
            conn = clever_by_email[lead["email"]]
            method = "email"

        if not conn and lead["norm_address"]:
            conn = clever_by_addr.get(lead["norm_address"])
            if conn:
                method = "address"

        if conn:
            matched.append({
                "lead": lead,
                "connection": conn,
                "connection_id": conn.get("id"),
                "match_method": method,
            })
            match_methods[method] += 1
        else:
            unmatched.append(lead)

    print(f"  Match methods: email={match_methods['email']}, address={match_methods['address']}")
    return matched, unmatched


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Bulk update Clever Leads statuses from RESimpli CSV export"
    )
    parser.add_argument("--csv", required=True, help="Path to RESimpli CSV export")
    parser.add_argument("--token", required=True, help='Bearer token (e.g., "Bearer eyJ...")')
    parser.add_argument("--cookie", default="", help='Full Cookie header string from browser DevTools')
    parser.add_argument("--dry-run", action="store_true", help="Preview matches without updating")
    args = parser.parse_args()

    token = args.token
    if not token.startswith("Bearer "):
        token = f"Bearer {token}"

    cookies = args.cookie

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = f"clever_update_log_{timestamp}.json"

    print("=" * 60)
    print("  Clever Leads Bulk Updater")
    print("=" * 60)
    print(f"  Date: {TODAY}")
    if args.dry_run:
        print("  MODE: DRY RUN (no changes will be made)")
    print()

    # Step 1: Load CRM leads
    print("[1/4] Loading RESimpli leads (with time-based status logic)...")
    crm_leads = load_resimpli_leads(args.csv)
    print(f"  {len(crm_leads)} leads need updates")

    update_breakdown = Counter()
    for l in crm_leads:
        update_breakdown[l["update_type"]] += 1

    print()
    print("  Update breakdown:")
    for ut, count in update_breakdown.most_common():
        print(f"    {ut:>20s}: {count}")

    # Show time-based decisions for non-lost statuses
    time_decisions = Counter()
    for l in crm_leads:
        if l["status"] in ("Attempting Contact", "Contact Made - Follow Up", "Qualified", "Negotiation"):
            age_label = "stale→lost" if l["update_type"] == "lost" else "recent→active"
            time_decisions[f"{l['status']} | {age_label}"] += 1

    if time_decisions:
        print()
        print("  Time-based decisions:")
        for decision, count in time_decisions.most_common():
            print(f"    {count:>4}  {decision}")

    print()

    # Step 2: Fetch Clever Leads connections
    print("[2/4] Fetching Clever Leads connections...")
    clever_connections = fetch_all_connections(token, cookies)
    print(f"  Total connections: {len(clever_connections)}")
    print()

    if not clever_connections:
        print("ERROR: No connections fetched. Check your Bearer token.")
        print("  Tokens expire quickly — grab a fresh one from DevTools.")
        sys.exit(1)

    # Show first connection's keys for debugging
    if clever_connections:
        print(f"  Connection fields: {list(clever_connections[0].keys())}")
        print()

    # Step 3: Match
    print("[3/4] Matching leads...")
    matched, unmatched = match_leads(crm_leads, clever_connections)
    print(f"  Matched: {len(matched)}")
    print(f"  Unmatched: {len(unmatched)} (likely not from Clever)")
    print()

    matched_updates = Counter(m["lead"]["update_type"] for m in matched)
    print("  Matched updates to send:")
    for ut, count in matched_updates.most_common():
        print(f"    {ut:>20s}: {count}")
    print()

    if not matched:
        print("No matches found.")
        sys.exit(0)

    # Step 4: Send updates
    print("[4/4] Sending updates...")
    print()
    results = {"success": [], "failed": [], "skipped": []}

    for i, match in enumerate(matched, 1):
        lead = match["lead"]
        conn_id = match["connection_id"]
        update_type = lead["update_type"]
        payload = lead["payload"]

        display_name = lead["name"] or lead["address"]
        addr_short = f"{lead['city']}, {lead['state']}".strip(", ")
        status_display = f"{lead['status']} ({lead['days_old']}d old) → {update_type}"

        resp, status_code = post_update(token, conn_id, payload, dry_run=args.dry_run, cookies=cookies)

        if args.dry_run:
            print(f"  [{i}/{len(matched)}] {display_name} — {addr_short}")
            print(f"           {status_display}")
            results["success"].append({
                "name": lead["name"],
                "address": lead["address"],
                "connection_id": conn_id,
                "update_type": update_type,
                "days_old": lead["days_old"],
                "dry_run": True,
            })
        elif status_code in (200, 201):
            print(f"  [{i}/{len(matched)}] ✓ {display_name} — {status_display}")
            results["success"].append({
                "name": lead["name"],
                "address": lead["address"],
                "connection_id": conn_id,
                "update_type": update_type,
                "days_old": lead["days_old"],
                "response_status": status_code,
            })
        else:
            print(f"  [{i}/{len(matched)}] ✗ FAILED: {display_name} — HTTP {status_code}")
            results["failed"].append({
                "name": lead["name"],
                "address": lead["address"],
                "connection_id": conn_id,
                "update_type": update_type,
                "error": str(resp),
                "status_code": status_code,
            })

            if status_code == 401:
                print(f"\n  TOKEN EXPIRED after {len(results['success'])} successful updates.")
                print("  Grab a fresh Bearer token from DevTools and re-run.")
                print(f"  Progress saved to {log_file}")
                break

    # Summary
    print()
    print("=" * 60)
    print("  SUMMARY")
    print("=" * 60)
    print(f"  Successful:  {len(results['success'])}")
    print(f"  Failed:      {len(results['failed'])}")
    print(f"  Skipped:     {len(results['skipped'])}")
    print(f"  Unmatched:   {len(unmatched)}")
    print()

    # Save log
    log_data = {
        "timestamp": timestamp,
        "dry_run": args.dry_run,
        "csv_file": args.csv,
        "total_crm_leads": len(crm_leads),
        "total_clever_connections": len(clever_connections),
        "matched": len(matched),
        "results": results,
        "unmatched_samples": [
            {"name": l["name"], "address": l["address"], "email": l["email"],
             "status": l["status"]}
            for l in unmatched[:100]
        ],
    }

    with open(log_file, "w") as f:
        json.dump(log_data, f, indent=2)
    print(f"  Log saved to: {log_file}")


if __name__ == "__main__":
    main()
