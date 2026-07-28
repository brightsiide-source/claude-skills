# Deploying the Co-Pilot Web App to a Public URL (Phase 2)

This gets the app onto an always-on public URL using Render.com (Railway and
Fly.io work the same way). Free demo hosting; ~$7/mo for always-on.

> **Before you charge anyone:** a public *free* demo is fine. A *paid*
> product built on real-time market data requires proper exchange data
> licensing and legal/disclaimer review first. See the "Before monetizing"
> section at the bottom. Do not skip it.

## What's in the repo for deployment

- `requirements.txt` — the single dependency (`websocket-client`)
- `web/Dockerfile` — container build
- `web/render.yaml` — Render blueprint (service + env vars)
- `web/server.py` — reads keys from **environment variables** in the cloud,
  so no secrets are ever committed

## Steps (Render.com)

1. **Push the repo to GitHub** (already done on the working branch).
2. Create a free account at https://render.com and connect your GitHub.
3. **New → Blueprint** → select this repo. Render reads `web/render.yaml`.
4. In the service's **Environment** tab, set the two secret values:
   - `ALPACA_API_KEY` = your Alpaca paper key
   - `ALPACA_SECRET_KEY` = your Alpaca paper secret
   (These are entered in Render's dashboard, never in the repo.)
5. Deploy. In ~2-3 minutes you get a public URL like
   `https://nq-live-copilot.onrender.com`.

Open it — the dashboard runs for anyone with the link.

## Switching profiles on the deployed app

Set the `PROFILE` env var (`scalper`, `swing`, `position`, `stocks`) and
`MIN_SCORE`. Only `scalper` is a fully built strategy today; the others are
parameter presets awaiting their own validated build (see `web/profiles.py`).

## Config precedence

`server.py` merges config from (highest first): environment variables →
`--config` file → built-in defaults. Locally you use a `my-config.json`
file; in the cloud you use env vars.

## Before monetizing (the real gates)

1. **Market-data licensing.** Charging for real-time data redistribution
   requires exchange agreements and per-user fees. Alpaca's free IEX terms
   do not cover commercial redistribution. Resolve this before any paywall.
2. **Securities/legal.** Selling trade signals can trigger adviser
   regulation. Add clear "informational, not financial advice" disclaimers
   and get a securities lawyer's review.
3. **Proven edge.** Don't market it as profitable until the outcome-tracking
   data over a meaningful sample says it is. As of now that is unproven.

These are business/legal steps, not code. The app can be public and free
today; monetization waits on the above.
