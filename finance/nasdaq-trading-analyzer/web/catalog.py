#!/usr/bin/env python3
"""
Strategy & Coverage Catalog — the honest roster.

Lists every market and strategy the platform covers or plans to, each with a
status that is EARNED, not asserted:
  - LIVE        : validated edge (enough resolved trades AND win rate above
                  a break-even bar). Promoted by data, never by hand.
  - BACKTESTING : implemented and collecting outcomes, not yet proven.
  - PLANNED     : on the roadmap, not built.

A strategy only shows LIVE when the outcome data says so. This is what makes
the catalog safe to put in front of investors: it shows vision AND exactly
what is proven vs not.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scripts"))

# Promotion thresholds — a strategy earns LIVE only past all of these.
MIN_N = 40          # resolved trades
MIN_WR = 52.0       # win rate % (above rough break-even for ~1.5:1 R)

# Markets / asset coverage
MARKETS = [
    {"name": "NASDAQ futures (NQ/MNQ)", "status": "active",
     "note": "Live proxy feed today. The built strategies run here."},
    {"name": "S&P futures (ES/MES)", "status": "planned",
     "note": "Same engine, different instrument + point values."},
    {"name": "US stocks (Robinhood-style)", "status": "planned",
     "note": "Needs per-symbol feed + share-based sizing."},
    {"name": "Crypto (BTC/ETH)", "status": "planned",
     "note": "24/7 feed; volatility-scaled setups."},
]

# Strategy roster. `key` matches the setup name the engine logs, so live
# track-record data attaches automatically.
STRATEGIES = [
    {"key": "Trend Continuation", "market": "NASDAQ futures",
     "style": "Momentum / with-trend", "timeframe": "1m/5m",
     "blurb": "Joins a strong trend on a fresh breakout instead of fading it."},
    {"key": "EMA Pullback", "market": "NASDAQ futures",
     "style": "Trend pullback", "timeframe": "1m/5m",
     "blurb": "Buys the dip to the 9EMA in an uptrend (mirror for shorts)."},
    {"key": "VWAP Bounce", "market": "NASDAQ futures",
     "style": "Mean reversion", "timeframe": "1m/5m",
     "blurb": "Fades an extension back toward session VWAP, trend-aligned."},
    {"key": "RSI Oversold + Support", "market": "NASDAQ futures",
     "style": "Reversal", "timeframe": "1m/5m",
     "blurb": "Deep RSI washout at a support level — capitulation bounce."},
    {"key": "MACD Bullish Cross", "market": "NASDAQ futures",
     "style": "Momentum", "timeframe": "1m/5m",
     "blurb": "Fresh MACD cross near the zero line in the trend direction."},
    {"key": "Bollinger Squeeze", "market": "NASDAQ futures",
     "style": "Volatility breakout", "timeframe": "1m/5m",
     "blurb": "Tight-band compression resolving into a directional break."},
    # Roadmap strategies (no engine yet -> PLANNED)
    {"key": "Opening Range Breakout", "market": "NASDAQ futures",
     "style": "Breakout", "timeframe": "5m", "planned": True,
     "blurb": "First-15-min range break. Backtester exists; not live-wired."},
    {"key": "Swing Trend (daily)", "market": "S&P futures",
     "style": "Multi-day trend", "timeframe": "1h/1d", "planned": True,
     "blurb": "Higher-timeframe trend rides. Needs daily-bar engine."},
    {"key": "Gap & Go", "market": "US stocks",
     "style": "Momentum", "timeframe": "1m/5m", "planned": True,
     "blurb": "Pre-market gap continuation. Needs per-symbol stock feed."},
    {"key": "Mean Reversion (RSI2)", "market": "US stocks",
     "style": "Mean reversion", "timeframe": "1d", "planned": True,
     "blurb": "Classic short-term reversion on oversold pullbacks."},
]


def _load_stats(outcomes_path):
    """Per-strategy W/L from the outcomes file (empty if none yet)."""
    try:
        from track_record import load_outcomes, summarize
        recs = load_outcomes(outcomes_path)
        if not recs:
            return {}
        return summarize(recs)["by_setup"]
    except Exception:
        return {}


def build_catalog(outcomes_path):
    """Assemble the catalog with earned statuses and live track-record."""
    stats = _load_stats(outcomes_path)
    strategies = []
    counts = {"LIVE": 0, "BACKTESTING": 0, "PLANNED": 0}

    for s in STRATEGIES:
        row = dict(s)
        st = stats.get(s["key"], {})
        w, l = st.get("win", 0), st.get("loss", 0)
        n = w + l
        wr = round(w / n * 100) if n else None

        if s.get("planned"):
            status = "PLANNED"
        elif n >= MIN_N and wr is not None and wr >= MIN_WR:
            status = "LIVE"
        else:
            status = "BACKTESTING"

        row.update({
            "status": status,
            "record": {"win": w, "loss": l, "n": n, "wr": wr} if n else None,
            "data_note": (
                f"{w}W-{l}L · {wr}% · n={n}" if n
                else ("roadmap — not built" if s.get("planned") else "collecting data")),
        })
        row.pop("planned", None)
        strategies.append(row)
        counts[status] += 1

    return {
        "markets": MARKETS,
        "strategies": strategies,
        "counts": counts,
        "thresholds": {"min_n": MIN_N, "min_wr": MIN_WR},
    }


if __name__ == "__main__":
    import json
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "..", "assets", "trade-logs", "alert-outcomes.jsonl")
    print(json.dumps(build_catalog(path), indent=2))
