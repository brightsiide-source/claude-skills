---
name: "website-outreach-mcp"
description: Discovers local businesses that either have no website or have a website that needs upgrading, scores each site's quality, extracts public contact info, and drafts personalized outreach emails, SMS, and voicemail scripts. Exposes the workflow as a Model Context Protocol (MCP) server so Claude Code or any MCP client can run the full pipeline. Use when building a web-design outbound pipeline, prospecting local businesses for a website agency, auditing a list of leads for site quality, or generating first-draft outreach messages. Handles tasks described as 'find businesses without websites', 'website outreach campaign', 'local business prospecting', 'website quality audit', 'web design lead gen', or 'cold outreach for web agency'.
---

# Website Outreach MCP Skill

A Model Context Protocol server + CLI toolkit for finding local businesses that need a new or upgraded website, auditing what's wrong, and generating ready-to-review outreach drafts.

The skill is deliberately **draft-only** — it never sends email or SMS. Human review is the last step.

## What it does

1. **Discovers** businesses in a location by keyword (plumber, bakery, dentist, etc.)
2. **Assesses** each business's existing website (or flags that there isn't one) and computes a 0-100 upgrade-priority score
3. **Enriches** leads with publicly available emails, phones, and social links
4. **Drafts** an email, SMS, and voicemail script tailored to the lead's situation — no site / broken site / dated site

## Recommended ICP

**Google-verified businesses with good reviews but no website.** Proven demand + zero web presence = highest-signal outreach target. Default filters:

- `min_rating >= 4.0`
- `min_reviews >= 20`
- `missing_website = true`
- `operational_only = true`

## Data sources

| Source | Cost | Key required | Use for |
|--------|------|--------------|---------|
| `google_places_grid` (**recommended**) | Free credit covers most use | `GOOGLE_PLACES_API_KEY` | Tile a city, dedupe, filter on rating + no-website |
| `google_places_text` | Same | Same | 60-result text query with locationBias |
| `google_places_nearby` | Same | Same | Single 20-result circle (cheapest test) |
| OpenStreetMap Overpass | Free | No | Rough reconnaissance, no review data |
| PageSpeed Insights | Free | `PAGESPEED_API_KEY` | Performance / accessibility / SEO scoring |
| Public website HTML | Free | No | Heuristic site assessment + contact enrichment |

All Google modes use **Places API (New)** (`places.googleapis.com/v1`) with a minimal field mask — see [references/api-setup.md](references/api-setup.md) for pricing and key setup.

### Cost guardrails

- `--max-tiles` (default 100) caps grid expansion — you cannot accidentally run a 2,000-tile sweep.
- The field mask is restricted to the fields we actually filter on; each extra field class bumps the SKU tier.
- `--keyword-sweep` multiplies calls (1 per keyword per tile) — use 2-3 variants, not 10.

## Installation

```bash
pip install fastmcp
```

That is the only runtime dependency. Everything else uses the Python standard library.

## Run as MCP server

```bash
python business-growth/website-outreach-mcp/mcp_server.py
```

Register with your MCP client (Claude Code, Codex, etc.) per that client's docs — the server speaks stdio.

### MCP tools exposed

| Tool | What it does |
|------|--------------|
| `discover_businesses_tool` | Find businesses by lat/lng + keyword |
| `assess_website_tool` | Heuristic + optional PageSpeed assessment of one site |
| `enrich_contacts_tool` | Extract public emails/phones/socials from a site |
| `draft_outreach_tool` | Generate email/SMS/voicemail drafts for one lead |
| `build_campaign` | End-to-end: discover -> assess -> draft for a list |

## Run as CLI (no MCP client needed)

Each tool also works standalone:

```bash
# 1) Discover plumbers near a lat/lng, OSM (free)
python scripts/discover_businesses.py --source osm \
    --lat 40.7128 --lng -74.0060 --radius-m 3000 \
    --keyword plumber --format json > leads.json

# 2) Assess one lead's site (add --pagespeed for deeper scoring)
python scripts/assess_website.py https://example-bakery.com --format json

# 3) Extract contact info from a site
python scripts/enrich_contacts.py https://example-bakery.com

# 4) Draft outreach for a single lead
python scripts/draft_outreach.py assets/sample_lead_payload.json
```

## 5-Phase Workflow

### Phase 1: Define the target niche

**Objective:** Narrow to one vertical + one geography. Outreach works better when the pitch is specific.

**Checklist:**
- [ ] Pick a vertical where a website genuinely drives revenue (trades, hospitality, local services)
- [ ] Pick a geography you know (so the email reads local, not templated)
- [ ] Decide your offer: full build, site refresh, or emergency fix for broken/parked pages
- [ ] Write a one-line offer summary for the `signer.offer_summary` field

**Output:** A signer config (see `assets/sample_signer.json`).

---

### Phase 2: Discover leads

**Recommended — Google Places grid sweep for the ICP:**

```bash
python scripts/discover_businesses.py --source google_places_grid \
  --lat 40.7128 --lng -74.0060 \
  --city-radius-m 5000 --tile-radius-m 500 --max-tiles 100 \
  --included-types "plumber" \
  --missing-website --min-rating 4.0 --min-reviews 20 \
  --operational-only --format json > leads.json
```

Add a keyword sweep to catch niche synonyms:

```bash
python scripts/discover_businesses.py --source google_places_grid \
  --lat 40.7128 --lng -74.0060 --city-radius-m 5000 \
  --keyword-sweep "plumber,plumbing repair,emergency plumber" \
  --missing-website --min-rating 4.0 --min-reviews 20 --format json
```

**Cheaper modes:**
- `--source google_places_nearby` — single 20-result circle (1 API call)
- `--source google_places_text --keyword "plumber in exampletown"` — up to 60 results (3 calls)
- `--source osm` — free, no key, but no rating data

**Validation checkpoint:** At least 15 leads matching rating + no-website before moving on. If fewer, lower `--min-reviews` to 10, widen `--city-radius-m`, or add more keyword-sweep variants.

---

### Phase 3: Assess each site

For each lead with a website, run `assess_website.py` and record `upgrade_priority` and `findings`. Leads with no website go straight to the drafting phase with a 100 priority.

Budget-friendly tip: skip `--pagespeed` for first-pass filtering, add it only for leads that pass the heuristic gate.

**Validation checkpoint:** Drop any lead whose `upgrade_priority < 40` unless they have no site. That keeps your outreach relevant.

---

### Phase 4: Enrich contacts

```bash
python scripts/enrich_contacts.py <website-url> --format json
```

This extracts only information the business has already published publicly. Outreach targeting must still respect:

- **CAN-SPAM (US)** — valid reply-to, physical address, clear opt-out
- **CASL (Canada)** — requires express or implied consent
- **GDPR (EU/UK)** — legitimate interest must be documented
- **Local do-not-call registries** before any phone outreach

See [references/outreach-best-practices.md](references/outreach-best-practices.md).

---

### Phase 5: Draft and review

```bash
python scripts/draft_outreach.py assets/sample_lead_payload.json
```

Or via MCP: call `build_campaign` with a signer block to get drafts for everyone at once.

**Every draft must be read and edited** before sending. The drafts are structured, but they are intentionally plain — the edit pass is where personalization actually happens (mentioning a specific product, a recent event, etc.).

---

## Ethics & compliance

- This skill **does not send messages**. It only drafts them. That is deliberate.
- Do not mass-scrape or use this to build a sellable list.
- Respect `robots.txt` if you extend the enrichment script to crawl more than the homepage + one contact page.
- Never hammer OSM Overpass — the public endpoint has rate limits; keep requests low-volume.
- Prefer verified businesses (Google Places result) over raw OSM entries when the recipient could be a person's home address.

## Files

```
website-outreach-mcp/
├── SKILL.md                        # This file
├── mcp_server.py                   # MCP entrypoint (FastMCP)
├── scripts/
│   ├── discover_businesses.py      # Google Places / OSM / local-file discovery
│   ├── assess_website.py           # Heuristic + PageSpeed site scoring
│   ├── enrich_contacts.py          # Public contact extraction
│   └── draft_outreach.py           # Email / SMS / voicemail drafter
├── references/
│   ├── api-setup.md                # How to get free API keys
│   ├── outreach-best-practices.md  # Anti-spam + response-rate tips
│   └── website-quality-heuristics.md # What signals mean what
└── assets/
    ├── sample_signer.json          # Template signer block
    ├── sample_lead_payload.json    # Template draft_outreach.py input
    ├── sample_local_businesses.json # Offline testing dataset
    └── campaign_tracker.csv        # Tracking spreadsheet template
```

## Related skills

- `marketing-skill/copywriting/` — polish the final message copy
- `business-growth/sales-engineer/` — if the lead asks for a proposal
- `engineering-team/landing-page-generator/` — build the actual site you sell
