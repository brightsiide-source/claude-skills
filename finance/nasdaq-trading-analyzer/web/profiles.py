#!/usr/bin/env python3
"""
Trading Profiles — configurable presets for different kinds of trader.

This is the foundation for tailoring the tool to more than just NQ scalpers.
A profile bundles the knobs that define a trading style: which symbol/proxy,
the confluence threshold, the target/stop scale, and (as the engine grows)
which setups and timeframes to emphasize.

IMPORTANT — honest scope note:
  The 'scalper' profile is the fully built, validated-in-progress one. The
  others (swing / position / stocks) ship here as PARAMETER PRESETS that
  reuse the existing 1m/5m setup engine at different thresholds and target
  scales. A *genuine* swing or long-term product needs its own higher-
  timeframe analysis (hourly/daily bars) and its own validated setups —
  that's a real build per profile, not just a config flag. These presets are
  the scaffold those builds plug into, not a claim that they're proven.
"""

PROFILES = {
    "scalper": {
        "label": "Scalper — 1m/5m NQ futures",
        "asset_class": "futures",
        "symbol": "TQQQ",          # 3x NASDAQ proxy
        "min_score": 55,
        # scalp calibration: tight NQ-point stops/targets
        "scalp": {"stop_points": 12, "target_points": 20, "nq_ref": 25000},
        "timeframes": ["1m", "5m"],
        "notes": "Fast in-and-out. Built and being validated first.",
    },
    "swing": {
        "label": "Swing — multi-day (in development)",
        "asset_class": "futures",
        "symbol": "QQQ",           # 1x NASDAQ proxy, cleaner for swings
        "min_score": 65,
        "scalp": None,             # use full % swing targets, not tight points
        "timeframes": ["15m", "1h"],
        "notes": "Needs hourly/daily engine + validated swing setups. Preset only.",
    },
    "position": {
        "label": "Position / Long-term (in development)",
        "asset_class": "stocks",
        "symbol": "QQQ",
        "min_score": 70,
        "scalp": None,
        "timeframes": ["1h", "1d"],
        "notes": "Needs daily-bar engine + trend/valuation logic. Preset only.",
    },
    "stocks": {
        "label": "Stocks (Robinhood-style, in development)",
        "asset_class": "stocks",
        "symbol": "AAPL",
        "min_score": 65,
        "scalp": None,
        "timeframes": ["5m", "15m"],
        "notes": "Needs share-based sizing (not Apex drawdown). Preset only.",
    },
}

DEFAULT = "scalper"


# ---- Markets ----------------------------------------------------------
# A market = a live proxy symbol + the futures instrument it maps to. The
# same scalping engine runs on any of these; only the symbol, index
# reference and point value change. `live` markets can stream today; the
# rest are on the roadmap. Note: Alpaca's free data plan allows one live
# stream, so serving several live markets at once means subscribing to all
# their proxy symbols on a single connection (multi-symbol engine).
MARKETS = {
    "nasdaq": {"label": "NASDAQ futures (NQ/MNQ)", "proxy": "TQQQ",
               "instrument": "NQ", "index_ref": 25000, "leverage": 3, "live": True},
    "sp500": {"label": "S&P 500 futures (ES/MES)", "proxy": "SPXL",
              "instrument": "ES", "index_ref": 6000, "leverage": 3, "live": True},
    "crypto": {"label": "Crypto (BTC/ETH)", "proxy": "BTC/USD",
               "instrument": "BTC", "index_ref": 0, "leverage": 1, "live": False},
    "stocks": {"label": "US stocks (pick a symbol)", "proxy": None,
               "instrument": "shares", "index_ref": 0, "leverage": 1, "live": False},
}


def live_markets():
    """Markets that can stream today (share one Alpaca connection)."""
    return {k: v for k, v in MARKETS.items() if v.get("live")}


def get_market(name):
    return MARKETS.get((name or "").lower(), MARKETS["nasdaq"])


def get_profile(name):
    """Return a profile dict by name, falling back to the default."""
    return PROFILES.get((name or "").lower(), PROFILES[DEFAULT])


def list_profiles():
    """Return [(name, label, ready)] for UI/selection."""
    out = []
    for name, p in PROFILES.items():
        ready = name == "scalper"  # only the scalper is a real, built strategy
        out.append((name, p["label"], ready))
    return out


if __name__ == "__main__":
    for name, label, ready in list_profiles():
        flag = "READY" if ready else "preset/dev"
        print(f"  {name:10} {label:45} [{flag}]")
