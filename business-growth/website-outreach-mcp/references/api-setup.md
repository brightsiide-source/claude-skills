# API Setup

All integrations this skill uses have free tiers. BYOK (bring your own key).

## PageSpeed Insights (recommended)

- Cost: free, generous quota
- Key: [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → enable **PageSpeed Insights API** → create API key
- Export: `export PAGESPEED_API_KEY=...`
- Docs: https://developers.google.com/speed/docs/insights/v5/get-started

## Google Places (optional, cleaner data)

- Cost: $200/month free credit covers hundreds of Nearby Search + Place Details calls
- Key: [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → enable **Places API** → create API key
- Export: `export GOOGLE_PLACES_API_KEY=...`
- Docs: https://developers.google.com/maps/documentation/places/web-service/overview

**Restrict both keys** to the specific APIs above plus an IP restriction where possible.

## OpenStreetMap Overpass (default)

- Cost: free, no key
- Respect the fair-use policy: low QPS, identify with a User-Agent (the script does this)
- Docs: https://wiki.openstreetmap.org/wiki/Overpass_API

## Nothing else is required

Contact enrichment and HTML heuristics use only the Python standard library and direct HTTP fetches of publicly served pages.
