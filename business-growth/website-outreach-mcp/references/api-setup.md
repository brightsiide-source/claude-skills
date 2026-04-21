# API Setup

All integrations this skill uses have free tiers. BYOK (bring your own key).

## Places API (New) — primary discovery source

**What it is:** `places.googleapis.com/v1` — the current generation of Google's Places API. Replaces the legacy `maps.googleapis.com/maps/api/place/...` endpoints (which are being deprecated).

**Why the New API:**
- **Field-mask billing** — you only pay for fields you request (we ask for `rating`, `userRatingCount`, `websiteUri`, etc. — exactly what we need to filter)
- Returns `websiteUri` directly (legacy required a second `place/details` call)
- Cleaner JSON shape

**Get a key:**
1. [Google Cloud Console](https://console.cloud.google.com/) → pick or create a project
2. **APIs & Services → Library** → search for **Places API (New)** → Enable
3. **APIs & Services → Credentials** → Create credentials → API key
4. **Restrict the key** to "Places API (New)" and ideally to a server IP
5. Export: `export GOOGLE_PLACES_API_KEY=...`

**Pricing (rough, as of early 2026):**

| SKU | What it includes | Cost per 1,000 calls |
|-----|------------------|----------------------|
| Essentials (IDs Only) | `places.id` only | $0 (free) |
| Basic | + `displayName`, `types`, `location`, `formattedAddress` | ~$5 |
| Advanced | + `rating`, `userRatingCount`, `websiteUri`, `businessStatus` | ~$25 |
| Preferred | + reviews text, editorial summary | ~$35 |

This skill's field mask lands in **Advanced** because we need `websiteUri` + ratings for the filter. With Google's $200/month free credit:

- Advanced: ~8,000 searches free per month
- At 20 results each, that's up to 160,000 leads surfaced for $0 if you're careful

**Cost math for a typical city sweep:**

| Grid | Tiles | Keywords | Calls | Cost (paid) | Within free tier? |
|------|-------|----------|-------|-------------|-------------------|
| 5 km radius, 500m tiles | ~80 | 1 | 80 | $2 | Yes |
| 5 km radius, 500m tiles | ~80 | 3 (keyword sweep) | 240 | $6 | Yes |
| 15 km radius, 500m tiles | ~700 | 3 | 2,100 | $52 | Yes (free credit absorbs) |
| 15 km radius, 500m tiles | ~700 | 5 | 3,500 | $88 | Yes (free credit absorbs) |

The `--max-tiles` guardrail (default 100) prevents accidental overspend. Raise it deliberately when you know the scope.

## PageSpeed Insights (optional)

- Cost: free, generous quota
- Key: same console → enable **PageSpeed Insights API** → create API key
- Export: `export PAGESPEED_API_KEY=...`
- Docs: https://developers.google.com/speed/docs/insights/v5/get-started

## OpenStreetMap Overpass (free fallback)

- Cost: free, no key
- Respect the fair-use policy: low QPS, identify with a User-Agent (script does this)
- Good for recon when you haven't turned on the Google key yet
- Data quality is noisier than Google Places — use `--min-rating` / `--min-reviews` filters only with Google sources

## Recommended env setup

```bash
# ~/.bashrc or ~/.zshrc
export GOOGLE_PLACES_API_KEY="..."
export PAGESPEED_API_KEY="..."
```

Restrict both keys in the GCP console (by API + IP or referrer). If you commit code, keep the keys out of the repo — this skill reads them from environment variables only.
