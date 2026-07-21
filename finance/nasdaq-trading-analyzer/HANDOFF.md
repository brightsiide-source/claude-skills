# NQ Live Co-Pilot — Setup Guide (Mac / Windows / Linux)

A real-time NASDAQ scalping co-pilot. It streams live market data from
Alpaca (free paper account), runs technical analysis on 1m/5m candles,
detects playbook setups with a confluence score, and logs the outcome of
every alert so you build a real, per-setup win-rate record over time.

You watch NQ/MNQ on your own platform (Tradovate, etc.) on another screen;
this tool is the analysis brain that tells you when a high-confluence setup
appears — calibrated to a scalper's 10-20 point range.

---

## What you need

- **Python 3.9+** (Macs usually have it; check with `python3 --version`).
  If missing, install from https://python.org or `brew install python`.
- **One free package:** `websocket-client`
- **Your own free Alpaca paper-trading API keys** (do NOT reuse someone
  else's — each person needs their own).

---

## 1. Get the code

Download the branch as a ZIP from GitHub, or clone it:

```bash
git clone -b claude/nasdaq-trading-analyzer-EEuO4 \
  https://github.com/brightsiide-source/claude-skills.git
cd claude-skills/finance/nasdaq-trading-analyzer
```

(If you download the ZIP instead, unzip it and `cd` into
`.../finance/nasdaq-trading-analyzer`.)

## 2. Install the one dependency

```bash
pip3 install websocket-client
```

## 3. Get your Alpaca keys (free, instant)

1. Sign up at https://alpaca.markets
2. Left sidebar → **Paper Trading**
3. Find **API Keys** → **Generate** (the Secret shows only once — copy it)

## 4. Create your config

Create a file named `my-config.json` in the `nasdaq-trading-analyzer`
folder with your own keys:

```json
{
    "api_key": "YOUR_ALPACA_KEY",
    "secret_key": "YOUR_ALPACA_SECRET",
    "environment": "paper",
    "symbol": "TQQQ",
    "apex_account": "50k",
    "apex_balance": 50000.0,
    "instrument": "NQ"
}
```

`TQQQ` is a 3x-NASDAQ ETF used as a real-time proxy (Alpaca doesn't stream
NQ futures directly). Adjust `apex_account` / `apex_balance` to your own.

## 5. Run it

**Mac / Linux:**

```bash
bash assets/start-copilot.sh
```

…or directly:

```bash
python3 scripts/live_connector_alpaca.py --config my-config.json --min-score 55 --scalp --nq-ref 25000
```

**Windows:** double-click `assets/start-copilot.bat` (edit the paths inside
it first) or run the same `python` command.

`--nq-ref` is roughly where NQ is trading today (glance at your platform);
it calibrates the scalp point conversion. `--scalp` uses a 12pt stop / 20pt
target by default (tune with `--scalp-stop` / `--scalp-target`).

## 6. Check the track record any time

```bash
bash assets/view-stats.sh
# or:  python3 scripts/track_record.py
```

---

## How to use it

- **Leave it running** during (and outside) market hours — it auto-pauses
  when the market is closed, so it never logs junk. It uses true US Eastern
  time computed from UTC, so it's correct in any local timezone.
- Every alert is followed forward and logged as WIN (hit target) / LOSS
  (hit stop) to `assets/trade-logs/alert-outcomes.jsonl`.
- The dashboard's **TRACK RECORD** and **HOW FAR THEY RUN** tables show
  which setups have an edge and how far they typically travel (hold vs take
  quick profit).
- **Don't trust small samples.** The tool flags when the sample is big
  enough ("solid sample"). Aim for n≥60 total with 15+ per setup before
  drawing conclusions — roughly 1.5-2 weeks of daily sessions.

## Notes for the handoff

- Each machine collects its **own independent** outcomes file. Drew's data
  and David's data don't mix — that's fine; they're separate test runs.
- No paid services. Alpaca paper is free; the only dependency is
  `websocket-client`.
- All logic is deterministic Python (no AI calls in the scripts), so it
  runs fast and offline-friendly aside from the market data stream.
