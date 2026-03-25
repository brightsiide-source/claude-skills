#!/usr/bin/env python3
"""
Clever Leads Bulk Updater (Browser Edition)
--------------------------------------------
Uses Playwright to automate a real browser — no token expiry issues.

Step 1: Run with --login to save your session:
    python3 update_clever_leads_browser.py --login

Step 2: Dry run:
    python3 update_clever_leads_browser.py \
        --csv /path/to/Exported_Leads.csv --dry-run

Step 3: Run for real:
    python3 update_clever_leads_browser.py \
        --csv /path/to/Exported_Leads.csv
"""

import argparse
import csv
import json
import os
import random
import re
import sys
import time
from collections import Counter
from datetime import datetime, date

# ─── Configuration ───────────────────────────────────────────────────────────

BASE_URL = "https://investors.cleveroffers.com/api/portal"
LOGIN_URL = "https://investors.cleveroffers.com"
STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "browser_state.json")
TODAY = date.today()

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
    if not created_date_str:
        return 9999
    try:
        created = datetime.strptime(created_date_str.strip(), "%Y-%m-%d").date()
        return (TODAY - created).days
    except ValueError:
        return 9999


def make_lost_payload(status=""):
    """Generate a lost payload. Uses 'Other' + notes since valid reasons vary by deal stage."""
    notes_options = [
        "No longer pursuing this lead",
        "Lead went cold — no response",
        "Not a fit for our buying criteria",
        "Unable to reach seller after multiple attempts",
        "Seller not motivated at this time",
    ]
    return {
        "update_type": "lost",
        "payload": {
            "reason": "Other",
            "notes": random.choice(notes_options),
            "buy_box_mismatch_reason": [],
            "buy_box_update_requested": False,
        }
    }


def determine_update(status, days_old, offer_price="", offer_date="",
                     uc_price="", uc_date=""):
    if status == "New Leads":
        return None, None

    if status in ("Warm Lead", "Dead Lead", "Referred To Agent"):
        return "lost", make_lost_payload()

    if status == "Attempting Contact":
        if days_old > 10:
            return "lost", make_lost_payload(status)
        else:
            # "Reached Out" and "Status Unchanged" deprecated — mark as lost
            return "lost", make_lost_payload(status)

    if status == "Contact Made - Follow Up":
        if days_old > 20:
            return "lost", make_lost_payload(status)
        else:
            return "connected", {
                "update_type": "connected",
                "payload": {
                    "seller_motivation": "3",
                    "conversation_summary": "Contact made, following up",
                    "likely_next_step": "Need More Info",
                    "notes": "Contact made — synced from CRM"
                }
            }

    if status in ("Qualified", "Negotiation"):
        if days_old > 30:
            return "lost", make_lost_payload(status)
        else:
            return "connected", {
                "update_type": "connected",
                "payload": {
                    "seller_motivation": "3",
                    "conversation_summary": f"{status} — in active discussions",
                    "likely_next_step": "Need More Info",
                    "notes": f"{status} — synced from CRM"
                }
            }

    if status == "Offers Made":
        price = offer_price.replace("$", "").replace(",", "").strip() if offer_price else ""
        payload = {
            "update_type": "offer_made",
            "payload": {
                "notes": f"Offer at {offer_price}" if offer_price else "Offer made — synced from CRM",
            }
        }
        if price:
            try:
                payload["payload"]["initial_offer_amount"] = float(price)
            except ValueError:
                pass
        payload["payload"]["acquisition_strategy"] = "Wholesale"
        payload["payload"]["offer_amount"] = float(price) if price else 0
        payload["payload"]["offer_type"] = "Cash"
        return "offer_made", payload

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
        payload["payload"]["acquisition_strategy"] = "Wholesale"
        payload["payload"]["purchase_price"] = float(price) if price else 0
        payload["payload"]["close_date"] = uc_date if uc_date else TODAY.isoformat()
        payload["payload"]["confidence"] = "High"
        return "under_contract", payload

    return None, None


# ─── CSV Loading ─────────────────────────────────────────────────────────────

def load_resimpli_leads(csv_path):
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


# ─── Browser API Helpers ─────────────────────────────────────────────────────

def browser_api_get(page, url):
    """Use the browser's fetch() with Clerk auth token."""
    result = page.evaluate("""async (url) => {
        try {
            // Get fresh token from Clerk
            let token = '';
            if (window.Clerk && window.Clerk.session) {
                token = await window.Clerk.session.getToken();
            }
            const headers = { 'Accept': 'application/json' };
            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            }
            const resp = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });
            const data = await resp.json();
            return { status: resp.status, data: data };
        } catch (e) {
            return { status: 0, error: e.message };
        }
    }""", url)
    return result


def browser_api_post(page, url, payload):
    """Use the browser's fetch() with Clerk auth token to POST."""
    result = page.evaluate("""async ([url, payload]) => {
        try {
            // Get fresh token from Clerk
            let token = '';
            if (window.Clerk && window.Clerk.session) {
                token = await window.Clerk.session.getToken();
            }
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            }
            const resp = await fetch(url, {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(payload)
            });
            const data = await resp.json();
            return { status: resp.status, data: data };
        } catch (e) {
            return { status: 0, error: e.message };
        }
    }""", [url, payload])
    return result


def fetch_all_connections(page):
    """Fetch all connections via the browser."""
    connections = []
    pg = 1
    per_page = 25

    while True:
        url = f"{BASE_URL}/connections?page={pg}&per_page={per_page}&sort=-created_at"
        result = browser_api_get(page, url)

        status = result.get("status", 0)
        data = result.get("data")

        if status == 401:
            print(f"\n  Session expired on page {pg}. Re-run with --login.")
            sys.exit(1)

        if status != 200:
            print(f"  ERROR page {pg}: HTTP {status} — {result.get('error', data)}")
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
        print(f"  Fetched page {pg} — {len(batch)} connections (total: {len(connections)})")
        pg += 1
        time.sleep(0.3)

    return connections


# ─── Matching ────────────────────────────────────────────────────────────────

def match_leads(crm_leads, clever_connections):
    clever_by_email = {}
    clever_by_addr = {}

    for conn in clever_connections:
        email = (conn.get("seller_email") or conn.get("customer_email") or conn.get("email") or "").strip().lower()
        if email:
            clever_by_email[email] = conn

        addr = conn.get("address") or conn.get("property_address") or ""
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


# ─── Login Flow ──────────────────────────────────────────────────────────────

def do_login():
    """Open a browser for the user to log in, then save the session."""
    from playwright.sync_api import sync_playwright

    print("Opening browser for Clever Leads login...")
    print()
    print("  INSTRUCTIONS:")
    print("  1. Enter your email in the browser window that opens")
    print("  2. Check your email for the magic link")
    print("  3. RIGHT-CLICK the link in your email → Copy Link")
    print("  4. Come back here and paste the link when prompted")
    print()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto(LOGIN_URL)

        input("  → After entering your email, press Enter here... ")

        magic_link = input("  → Paste the magic link from your email here: ").strip()

        if magic_link:
            print("  Navigating to magic link...")
            page.goto(magic_link, wait_until="domcontentloaded", timeout=60000)
            time.sleep(5)  # Let the auth complete

            # After verification, navigate to the dashboard
            print("  Redirecting to dashboard...")
            page.goto(LOGIN_URL, wait_until="domcontentloaded", timeout=60000)
            time.sleep(5)

        print("  Checking login status...")
        current_url = page.url
        print(f"  Current URL: {current_url}")

        # Check for sign-in page (but not /login/verify which means success)
        if ("sign-in" in current_url or current_url.endswith("/login")) and "verify" not in current_url:
            print("\n  Doesn't look like login worked. Trying alternative approach...")
            print("  The browser is still open — try logging in manually.")
            input("  → Press Enter once you see your dashboard... ")

        # Verify we can access the API
        time.sleep(3)
        test_result = browser_api_get(page, f"{BASE_URL}/connections?page=1&per_page=1")
        if test_result.get("status") == 200:
            print("  ✓ Login successful! API access confirmed.")
        else:
            print(f"  Warning: API returned {test_result.get('status')} — session may not be fully active.")
            input("  → Press Enter to save session anyway, or Ctrl+C to abort... ")

        # Save session state
        context.storage_state(path=STATE_FILE)
        print(f"\n  Session saved to {STATE_FILE}")
        print("  You can now run the updater without --login.")

        browser.close()


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Bulk update Clever Leads statuses from RESimpli CSV (browser edition)"
    )
    parser.add_argument("--csv", help="Path to RESimpli CSV export")
    parser.add_argument("--login", action="store_true", help="Open browser to log in and save session")
    parser.add_argument("--dry-run", action="store_true", help="Preview matches without updating")
    args = parser.parse_args()

    if args.login:
        do_login()
        return

    if not args.csv:
        parser.error("--csv is required (unless using --login)")

    if not os.path.exists(STATE_FILE):
        print("No saved session found. Run with --login first:")
        print("  python3 update_clever_leads_browser.py --login")
        sys.exit(1)

    from playwright.sync_api import sync_playwright

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = f"clever_update_log_{timestamp}.json"

    print("=" * 60)
    print("  Clever Leads Bulk Updater (Browser Edition)")
    print("=" * 60)
    print(f"  Date: {TODAY}")
    if args.dry_run:
        print("  MODE: DRY RUN (no changes will be made)")
    print()

    # Step 1: Load CRM leads
    print("[1/4] Loading RESimpli leads...")
    crm_leads = load_resimpli_leads(args.csv)
    print(f"  {len(crm_leads)} leads need updates")

    update_breakdown = Counter(l["update_type"] for l in crm_leads)
    print()
    print("  Update breakdown:")
    for ut, count in update_breakdown.most_common():
        print(f"    {ut:>20s}: {count}")

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

    # Step 2: Launch browser and fetch connections
    print("[2/4] Launching browser and fetching Clever Leads connections...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(storage_state=STATE_FILE)
        page = context.new_page()

        # Navigate to trigger Clerk auth
        page.goto(LOGIN_URL, wait_until="domcontentloaded", timeout=60000)
        print("  Waiting for Clerk to refresh auth tokens...")
        time.sleep(8)  # Let Clerk refresh tokens

        # Check if we're logged in
        current_url = page.url
        print(f"  Page loaded: {current_url}")

        if "sign-in" in current_url or "login" in current_url:
            print("\n  Session expired. Re-run with --login to re-authenticate.")
            browser.close()
            sys.exit(1)

        # Wait for Clerk token refresh by trying a test API call with retries
        print("  Testing API access...")
        for attempt in range(5):
            test_url = f"{BASE_URL}/connections?page=1&per_page=1"
            test_result = browser_api_get(page, test_url)
            if test_result.get("status") == 200:
                print("  API access confirmed!")
                break
            elif test_result.get("status") == 401:
                print(f"  Token not ready yet, waiting... (attempt {attempt + 1}/5)")
                time.sleep(3)
            else:
                print(f"  Unexpected response: {test_result.get('status')} — retrying...")
                time.sleep(3)
        else:
            print("\n  Could not authenticate after 5 attempts.")
            print("  Re-run with --login to refresh your session.")
            browser.close()
            sys.exit(1)

        clever_connections = fetch_all_connections(page)
        print(f"  Total connections: {len(clever_connections)}")
        print()

        if not clever_connections:
            print("ERROR: No connections fetched. Try re-running with --login.")
            browser.close()
            sys.exit(1)

        # Show connection field names
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
            browser.close()
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
            status_display = f"{lead['status']} ({lead['days_old']}d) → {update_type}"

            if args.dry_run:
                print(f"  [{i}/{len(matched)}] {display_name}")
                print(f"           {status_display}")
                results["success"].append({
                    "name": lead["name"],
                    "address": lead["address"],
                    "connection_id": conn_id,
                    "update_type": update_type,
                    "days_old": lead["days_old"],
                    "dry_run": True,
                })
            else:
                url = f"{BASE_URL}/connections/{conn_id}/updates"
                resp = browser_api_post(page, url, payload)
                status_code = resp.get("status", 0)

                if status_code in (200, 201):
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
                    error_data = resp.get("data", {})
                    error_msg = ""
                    if isinstance(error_data, dict):
                        error_msg = error_data.get("detail", error_data.get("message", str(error_data)))
                    else:
                        error_msg = str(error_data)
                    print(f"  [{i}/{len(matched)}] ✗ FAILED: {display_name} — HTTP {status_code}")
                    print(f"           {status_display}")
                    print(f"           Error: {str(error_msg)[:200]}")
                    print(f"           Payload sent: {json.dumps(payload)[:200]}")
                    results["failed"].append({
                        "name": lead["name"],
                        "address": lead["address"],
                        "connection_id": conn_id,
                        "update_type": update_type,
                        "error": str(error_msg)[:500],
                        "payload_sent": payload,
                        "status_code": status_code,
                    })

                    if status_code == 401:
                        print(f"\n  SESSION EXPIRED after {len(results['success'])} updates.")
                        print("  Re-run with --login, then run again.")
                        break

                time.sleep(0.5)

        # Save updated session state
        context.storage_state(path=STATE_FILE)
        browser.close()

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
