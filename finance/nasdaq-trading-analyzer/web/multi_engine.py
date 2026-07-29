#!/usr/bin/env python3
"""
Multi-Market Engine — run several co-pilots at once (NASDAQ, S&P, ...).

Design choice: REST polling, not websockets. Each live market re-pulls its
recent bars every ~15s and runs the exact same analysis pipeline (regime
filter, confluence scoring, scalp calibration, outcome tracking). This side-
steps Alpaca's free-tier one-websocket limit — so we can serve unlimited
markets on the free plan — and is far more robust than a multi-stream setup.
Tradeoff: ~15s data lag vs. instant, which is negligible for a 1m/5m co-pilot.

Reuses every component from the single-market engine; nothing is duplicated
except the per-market orchestration.
"""

import os
import sys
import threading
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scripts"))

from live_connector_alpaca import (  # noqa: E402
    CandleAggregator, SetupDetector, AlertManager, OutcomeTracker,
    NewsGuard, now_eastern,
)
from technical_analyzer import analyze  # noqa: E402
from alpaca_api import AlpacaREST  # noqa: E402
from engine import StateDashboard  # noqa: E402
from profiles import live_markets  # noqa: E402

POLL_SECONDS = 15
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "trade-logs")


def market_status():
    """(is_open, message) for US equity regular trading hours (ET)."""
    try:
        from datetime import time as _t
        now = now_eastern()
        if now.weekday() >= 5:
            return (False, "Weekend — market closed")
        t = now.time()
        if t < _t(9, 30):
            return (False, "Pre-market — opens 9:30 ET")
        if t >= _t(16, 0):
            return (False, "After-hours — closed 16:00 ET")
        return (True, "")
    except Exception:
        return (True, "")


class MarketPipeline:
    """One market's analysis state — its own candles, detector, alerts and
    outcome log, sharing the app's single Alpaca REST client."""

    def __init__(self, key, mkt, rest, min_score, news):
        self.key = key
        self.mkt = mkt
        self.rest = rest
        self.symbol = mkt["proxy"]
        self.min_score = min_score
        self.news = news
        self.candles = CandleAggregator()
        self.detector = SetupDetector()
        self.detector.scalp = {"stop_points": 12, "target_points": 20,
                               "nq_ref": mkt.get("index_ref", 25000)}
        self.alerts = AlertManager(min_score=min_score)
        # nasdaq keeps the original outcomes path so the catalog still reads it
        fname = "alert-outcomes.jsonl" if key == "nasdaq" else f"outcomes-{key}.jsonl"
        self.outcomes = OutcomeTracker(os.path.join(DATA_DIR, fname),
                                       nq_ref=mkt.get("index_ref", 25000))
        self.dash = StateDashboard()
        self._last_price = 0.0

    def _fetch(self):
        bars = self.rest.get_bars(self.symbol, timeframe="1Min",
                                  limit=500, days_back=3)
        self.candles = CandleAggregator()
        for b in bars:
            c = float(b.get("c", b.get("close", 0)))
            if c > 0:
                self.candles.add_bar({
                    "open": float(b.get("o", c)), "high": float(b.get("h", c)),
                    "low": float(b.get("l", c)), "close": c,
                    "volume": int(b.get("v", 0)), "datetime": b.get("t", ""),
                })
                self._last_price = c

    def tick(self, markets_meta):
        try:
            self._fetch()
        except Exception:
            return  # keep last snapshot on a transient fetch error
        bars_1m = self.candles.get_1m_candles()
        bars_5m = self.candles.get_5m_candles()
        if not bars_1m:
            return
        price = self._last_price or bars_1m[-1]["close"]

        a1 = analyze(bars_1m) if len(bars_1m) >= 20 else {}
        a5 = analyze(bars_5m) if len(bars_5m) >= 10 else {}

        open_now, closed_msg = market_status()
        if open_now:
            self.outcomes.update(price)

        setups = self.detector.detect_all(a1, a5, bars_5m, bars_1m)
        for s in setups:
            s["regime"] = self.detector.regime

        news_halt, news_msg = (self.news.check() if self.news else (False, ""))
        if news_halt or not open_now:
            setups = []

        prev = len(self.alerts.alert_history)
        qualified = self.alerts.process_setups(setups)
        if open_now and len(self.alerts.alert_history) > prev:
            for s in self.alerts.alert_history[prev:]:
                self.outcomes.record(s)

        self.dash.meta = {
            "market": self.key, "profile_label": self.mkt["label"],
            "instrument": self.mkt.get("instrument", "NQ"),
            "markets": markets_meta,
        }
        self.dash.render(
            symbol=self.symbol, price=price,
            analysis_5m=a5 or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
            analysis_1m=a1 or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
            setups=qualified,
            account_info={"apex_account": "50k", "balance": 50000.0,
                          "instrument": self.mkt.get("instrument", "NQ")},
            bar_count=self.candles.bar_count,
            alert_history=self.alerts.get_recent_alerts(),
            min_score=self.min_score,
            regime=self.detector.regime,
            news_msg=news_msg if news_halt else "",
            next_news=self.news.next_event() if self.news else None,
            outcome_stats=self.outcomes.get_summary(),
            open_trades=self.outcomes.open_count,
            closed_msg=closed_msg if not open_now else "",
        )

    def get_state(self):
        return self.dash.get_state()


class MultiMarketEngine:
    """Polls every live market on one shared REST client, in one thread."""

    def __init__(self, config, min_score=55):
        self.rest = AlpacaREST(config["api_key"], config["secret_key"],
                               config.get("environment", "paper"))
        self.news = NewsGuard(buffer_min=15)
        self.pipelines = {}
        for key, mkt in live_markets().items():
            if mkt.get("proxy"):
                self.pipelines[key] = MarketPipeline(key, mkt, self.rest, min_score, self.news)
        # switcher metadata (includes planned markets, flagged)
        from profiles import MARKETS
        self.markets_meta = [
            {"key": k, "label": v["label"], "live": bool(v.get("live") and v.get("proxy"))}
            for k, v in MARKETS.items()
        ]
        self.default = "nasdaq" if "nasdaq" in self.pipelines else next(iter(self.pipelines), None)
        self._thread = None

    def start(self):
        self._thread = threading.Thread(target=self._loop, daemon=True)
        self._thread.start()

    def _loop(self):
        while True:
            for p in self.pipelines.values():
                p.tick(self.markets_meta)
            time.sleep(POLL_SECONDS)

    def get_state(self, market=None):
        key = market if market in self.pipelines else self.default
        if not key:
            return {"status": "no-engine"}
        st = self.pipelines[key].get_state()
        st["markets"] = self.markets_meta
        return st
