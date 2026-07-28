#!/usr/bin/env python3
"""
Web Engine — headless wrapper around the live co-pilot for the web app.

Reuses the exact analysis stack from live_connector_alpaca (CandleAggregator,
SetupDetector, AlertManager, OutcomeTracker, NewsGuard, regime filter, scalp
calibration, market-hours guard) with ZERO duplicated logic.

Trick: the LiveConnector already computes the full dashboard state every loop
and hands it to dashboard.render(**kwargs). We inject a StateDashboard whose
render() captures that state into a thread-safe JSON snapshot instead of
printing it. The web server then serves that snapshot.

Usage (standalone test):
    python3 web/engine.py --config my-config.json
"""

import argparse
import json
import os
import sys
import threading
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scripts"))

from live_connector_alpaca import (  # noqa: E402
    LiveConnector, calc_position_size, APEX_ACCOUNTS,
)


class StateDashboard:
    """Drop-in replacement for the terminal Dashboard that captures the
    render() call arguments into a JSON-serializable snapshot."""

    def __init__(self):
        self.state = {"status": "starting", "ts": None}
        self._lock = threading.Lock()

    @staticmethod
    def clear():
        pass  # no-op for the web engine

    def render(self, symbol, price, analysis_5m, analysis_1m, setups,
               account_info, bar_count, alert_history=None, min_score=50,
               nq_price=None, regime="RANGE", news_msg="", next_news=None,
               outcome_stats=None, open_trades=0, closed_msg=""):
        ind_5m = (analysis_5m or {}).get("indicators", {})
        rsi = ind_5m.get("rsi", {})
        macd = ind_5m.get("macd", {})
        atr = ind_5m.get("atr", {})
        bb = ind_5m.get("bollinger", {})
        sr = ind_5m.get("support_resistance", {})
        pivots = ind_5m.get("pivot_points", {})

        apex = account_info.get("apex_account", "50k")
        balance = account_info.get("balance", 0)
        instrument = account_info.get("instrument", "NQ")
        rules = APEX_ACCOUNTS.get(str(apex).lower(), {})
        dd = rules.get("drawdown", 2500)
        floor = balance - dd
        remaining = balance - floor
        status = "SAFE"
        if remaining < dd * 0.2:
            status = "CRITICAL"
        elif remaining < dd * 0.4:
            status = "CAUTION"
        elif remaining < dd * 0.6:
            status = "WATCH"

        # Attach position sizing to each setup
        setups_out = []
        for s in (setups or [])[:5]:
            sz = calc_position_size(s["entry"], s["stop"], apex, balance, instrument)
            setups_out.append({
                "name": s.get("name"), "direction": s.get("direction"),
                "score": s.get("score"), "entry": s.get("entry"),
                "stop": s.get("stop"), "target": s.get("target"),
                "rr": s.get("rr"), "scalp_pts": s.get("scalp_pts"),
                "description": s.get("description"),
                "contracts": sz["contracts"], "risk": sz["total_risk"],
            })

        # Build the track-record table
        tr = []
        tw = tl = 0
        for name, st in sorted((outcome_stats or {}).items()):
            w, l = st["win"], st["loss"]
            tw += w
            tl += l
            n = w + l
            tr.append({"name": name, "win": w, "loss": l,
                       "wr": round(w / n * 100) if n else 0, "n": n})
        gn = tw + tl

        snap = {
            "status": "ok",
            "ts": datetime.utcnow().isoformat() + "Z",
            "symbol": symbol,
            "price": round(price, 2) if price else None,
            "market_open": not bool(closed_msg),
            "closed_msg": closed_msg,
            "news_msg": news_msg,
            "next_news": ({"name": next_news[0], "mins": round(next_news[1])}
                          if next_news else None),
            "regime": regime,
            "bias_5m": (analysis_5m or {}).get("overall_bias", "Waiting..."),
            "bias_1m": (analysis_1m or {}).get("overall_bias", "Waiting..."),
            "indicators": {
                "rsi": rsi.get("value") if isinstance(rsi, dict) else None,
                "macd_h": macd.get("histogram"),
                "vwap": ind_5m.get("vwap"),
                "atr": atr.get("value") if isinstance(atr, dict) else None,
                "bbw": bb.get("width"),
            },
            "levels": {
                "resistance": sr.get("resistance", [])[:3],
                "support": sr.get("support", [])[:3],
                "pivot": pivots.get("pp"),
            },
            "account": {
                "apex": str(apex).upper(), "balance": balance,
                "floor": floor, "remaining": remaining, "status": status,
                "instrument": instrument,
            },
            "setups": setups_out,
            "alerts": [
                {"time": a.get("alert_time"), "name": a.get("name"),
                 "direction": a.get("direction"), "score": a.get("score"),
                 "entry": a.get("entry"), "target": a.get("target")}
                for a in (alert_history or [])[-6:]
            ],
            "track_record": {
                "rows": tr,
                "overall": {"win": tw, "loss": tl,
                            "wr": round(tw / gn * 100) if gn else 0, "n": gn},
            },
            "bar_count": bar_count,
            "min_score": min_score,
            "open_trades": open_trades,
        }
        with self._lock:
            self.state = snap

    def get_state(self):
        with self._lock:
            return dict(self.state)


class WebEngine:
    """Runs a LiveConnector in a background thread, capturing its state."""

    def __init__(self, config, min_score=55, scalp=None, news_buffer=15):
        self.connector = LiveConnector(
            config, min_score=min_score, scalp=scalp, news_buffer=news_buffer)
        self.state_dashboard = StateDashboard()
        self.connector.dashboard = self.state_dashboard  # inject capture
        self._thread = None

    def start(self):
        self._thread = threading.Thread(target=self.connector.run, daemon=True)
        self._thread.start()

    def get_state(self):
        return self.state_dashboard.get_state()


def main():
    p = argparse.ArgumentParser(description="Web engine standalone test")
    p.add_argument("--config", required=True)
    p.add_argument("--min-score", type=int, default=55)
    args = p.parse_args()
    with open(args.config) as f:
        cfg = json.load(f)
    eng = WebEngine(cfg, min_score=args.min_score,
                    scalp={"stop_points": 12, "target_points": 20, "nq_ref": 25000})
    eng.start()
    import time
    while True:
        time.sleep(3)
        print(json.dumps(eng.get_state())[:300])


if __name__ == "__main__":
    main()
