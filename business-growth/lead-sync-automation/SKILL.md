---
name: "lead-sync-automation"
description: Automates bulk lead status synchronization from RESimpli CRM to Clever Leads (Lead Partnership). Matches leads by email and normalized address, applies time-based status logic (Attempting Contact, Follow Up, Qualified, Offers Made, Under Contract), and posts updates via Clever Leads API. Two modes — API token (fast, lightweight) and Playwright browser (no token expiry). Use when syncing CRM lead statuses to Clever, bulk updating lead partnerships, or automating RESimpli-to-Clever workflows.
license: MIT
metadata:
  version: 1.0.0
  author: Alireza Rezvani
  category: business-growth
  domain: lead-management
  updated: 2026-03-25
  python-tools: update_clever_leads.py, update_clever_leads_browser.py
  tech-stack: resimpli, clever-leads, lead-sync, real-estate
---

# Lead Sync Automation (RESimpli → Clever Leads)

Automates bulk synchronization of lead statuses from RESimpli CRM exports to Clever Leads (Lead Partnership portal). Two Python scripts handle matching and updating — one via API token, one via Playwright browser automation for persistent sessions.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Status Mapping Logic](#status-mapping-logic)
- [Scripts](#scripts)
- [Quick Start](#quick-start)
- [Reference Guides](#reference-guides)
- [Templates](#templates)
- [Troubleshooting](#troubleshooting)
- [Limitations](#limitations)

---

## How It Works

1. **Export leads** from RESimpli as CSV
2. **Load & classify** each lead using time-based status logic
3. **Fetch connections** from Clever Leads API (paginated)
4. **Match** CRM leads to Clever connections by email or normalized address
5. **Post status updates** to matched connections
6. **Log results** to a timestamped JSON file

### Matching Strategy

Leads are matched in priority order:
1. **Email match** — exact match on email address
2. **Address match** — normalized address comparison (handles abbreviations, direction words, unit numbers)

Address normalization handles: `Street` → `St`, `Avenue` → `Ave`, `North` → `N`, strips apt/unit/suite numbers, and removes punctuation.

---

## Status Mapping Logic

| RESimpli Status | Age Threshold | Clever Update |
|---|---|---|
| New Leads | — | **Skip** (no update) |
| Attempting Contact | ≤10 days | Reached Out |
| Attempting Contact | >10 days | Lost |
| Contact Made - Follow Up | ≤20 days | Connected |
| Contact Made - Follow Up | >20 days | Lost |
| Qualified | ≤30 days | Connected |
| Negotiation | ≤30 days | Connected |
| Qualified / Negotiation | >30 days | Lost |
| Offers Made | — | Offer Made (with price) |
| Under Contract | — | Under Contract (with price) |
| Warm Lead | — | Lost |
| Dead Lead | — | Lost |
| Referred To Agent | — | Lost |

**Browser edition note:** The browser script marks all "Attempting Contact" leads as Lost (regardless of age) since "Reached Out" was deprecated in the Clever API. Check `references/status-mapping.md` for the latest field requirements per update type.

---

## Scripts

### 1. API Token Edition (`scripts/update_clever_leads.py`)

Lightweight — uses `urllib` only, no external dependencies. Requires a Bearer token from browser DevTools.

```bash
# Dry run (preview only)
python3 scripts/update_clever_leads.py \
    --csv ~/exports/Exported_Leads.csv \
    --token "Bearer eyJ..." \
    --dry-run

# Live run
python3 scripts/update_clever_leads.py \
    --csv ~/exports/Exported_Leads.csv \
    --token "Bearer eyJ..."

# With cookies (if needed for auth)
python3 scripts/update_clever_leads.py \
    --csv ~/exports/Exported_Leads.csv \
    --token "Bearer eyJ..." \
    --cookie "session=abc123; ..."
```

**Flags:**
- `--csv` (required) — Path to RESimpli CSV export
- `--token` (required) — Bearer token from DevTools Network tab
- `--cookie` — Full Cookie header string (optional, for extra auth)
- `--dry-run` — Preview matches without sending updates

**Limitation:** Bearer tokens expire quickly (typically 60 seconds with Clerk). Use the browser edition for longer runs.

### 2. Browser Edition (`scripts/update_clever_leads_browser.py`)

Uses Playwright to run a real Chromium browser — auto-refreshes tokens via Clerk, no expiry issues.

**Requires:** `pip install playwright && playwright install chromium`

```bash
# Step 1: Login and save session (one-time)
python3 scripts/update_clever_leads_browser.py --login

# Step 2: Dry run
python3 scripts/update_clever_leads_browser.py \
    --csv ~/exports/Exported_Leads.csv --dry-run

# Step 3: Live run
python3 scripts/update_clever_leads_browser.py \
    --csv ~/exports/Exported_Leads.csv
```

**Flags:**
- `--login` — Opens browser for manual login, saves session to `browser_state.json`
- `--csv` — Path to RESimpli CSV export
- `--dry-run` — Preview matches without sending updates

---

## Quick Start

### Option A: API Token (fast, simple)

1. Export leads from RESimpli → CSV
2. Open Clever Leads in Chrome → DevTools → Network tab
3. Find any API request → copy the `Authorization: Bearer eyJ...` header
4. Run:
   ```bash
   python3 scripts/update_clever_leads.py \
       --csv Exported_Leads.csv \
       --token "Bearer eyJ..." \
       --dry-run
   ```
5. Review the dry-run output, then remove `--dry-run` to execute

### Option B: Browser (persistent sessions)

1. Install Playwright: `pip install playwright && playwright install chromium`
2. Login: `python3 scripts/update_clever_leads_browser.py --login`
3. Follow the prompts (enter email, paste magic link)
4. Run:
   ```bash
   python3 scripts/update_clever_leads_browser.py \
       --csv Exported_Leads.csv --dry-run
   ```

---

## Reference Guides

- `references/status-mapping.md` — Detailed status mapping logic and Clever API payload schemas

---

## Templates

- `assets/sample_leads.csv` — Sample RESimpli CSV export format with all required columns

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `TOKEN EXPIRED` after a few pages | Use the browser edition instead |
| `No connections fetched` | Token/session expired — re-authenticate |
| `Session expired` (browser) | Re-run with `--login` |
| Low match rate | Check CSV column names match expected headers |
| `401` errors mid-run | Clerk token expired — browser edition auto-refreshes |
| API returns `422` | Payload fields may have changed — check `references/status-mapping.md` |

---

## Limitations

- **One-way sync only** — pushes RESimpli → Clever, does not pull back
- **No duplicate detection** — running twice will post duplicate updates
- **Token expiry** — API edition tokens last ~60s; use browser edition for large batches
- **Clever API undocumented** — payload schemas are reverse-engineered from the portal; fields may change
- **No scheduling** — manual export + run; use cron or a task scheduler for automation
