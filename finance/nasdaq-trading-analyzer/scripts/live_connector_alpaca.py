#!/usr/bin/env python3
"""
Alpaca Live Connector - Real-Time NQ Trading Co-Pilot

Connects to Alpaca's free paper trading API for real-time market data.
Runs technical analysis on 1m/5m candles, monitors EOD drawdown against
your Apex account, detects playbook setups, and auto-logs trades.

ALERT SYSTEM: Beeps and flashes when high-confluence setups appear.
Only shows trades worth taking. Includes exact entry/stop/target with
position sizing for your Apex account.

Uses TQQQ/QQQ as a real-time NASDAQ proxy (tracks NQ closely).
You watch NQ price on Tradovate on another screen.

Requirements:
    pip install websocket-client

Setup:
    1. Sign up at https://alpaca.markets (free, instant)
    2. Go to Paper Trading > API Keys > Generate
    3. Copy API Key ID and Secret Key into your config file

Usage:
    python3 live_connector_alpaca.py --config alpaca-config.json
    python3 live_connector_alpaca.py --config alpaca-config.json --symbol TQQQ
    python3 live_connector_alpaca.py --config alpaca-config.json --min-score 60
    python3 live_connector_alpaca.py --config alpaca-config.json --alert-log alerts.txt
"""

import argparse
import json
import os
import sys
import threading
import time
from datetime import datetime, timezone
from typing import Dict, List, Optional

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from technical_analyzer import analyze
from alpaca_api import AlpacaREST, AlpacaStream, check_dependencies
from risk_manager import APEX_ACCOUNTS, NQ_POINT_VALUE, MNQ_POINT_VALUE, NQ_TICK_VALUE, MNQ_TICK_VALUE


# ---- Candle Aggregator ------------------------------------------------

class CandleAggregator:
    """Maintains rolling window of 1m bars and aggregates to 5m."""

    MAX_BARS = 500

    def __init__(self):
        self._bars_1m: List[Dict] = []
        self._lock = threading.Lock()
        self.last_bar_time: Optional[str] = None

    def add_bar(self, bar: Dict):
        with self._lock:
            self._bars_1m.append(bar)
            if len(self._bars_1m) > self.MAX_BARS:
                self._bars_1m = self._bars_1m[-self.MAX_BARS:]
            self.last_bar_time = bar.get("datetime", "")

    def get_1m_candles(self) -> List[Dict]:
        with self._lock:
            return list(self._bars_1m)

    def get_5m_candles(self) -> List[Dict]:
        bars = self.get_1m_candles()
        candles_5m = []
        for i in range(0, len(bars) - 4, 5):
            group = bars[i:i + 5]
            candle = {
                "open": group[0]["open"],
                "high": max(b["high"] for b in group),
                "low": min(b["low"] for b in group),
                "close": group[-1]["close"],
                "volume": sum(b.get("volume", 0) for b in group),
            }
            if "datetime" in group[0]:
                candle["datetime"] = group[0]["datetime"]
            candles_5m.append(candle)
        remainder = len(bars) % 5
        if remainder > 0 and len(bars) >= 5:
            group = bars[-remainder:]
            candle = {
                "open": group[0]["open"],
                "high": max(b["high"] for b in group),
                "low": min(b["low"] for b in group),
                "close": group[-1]["close"],
                "volume": sum(b.get("volume", 0) for b in group),
            }
            if "datetime" in group[0]:
                candle["datetime"] = group[0]["datetime"]
            candles_5m.append(candle)
        return candles_5m

    @property
    def bar_count(self) -> int:
        return len(self._bars_1m)


# ---- Setup Detector (with Confluence Scoring) -------------------------

class SetupDetector:
    """Detects playbook setups with confluence scoring (0-100).

    Each setup starts at a base score and earns bonus points for:
    - RSI confirmation (direction alignment)
    - EMA spacing (strong trend)
    - Price proximity to key level
    - Volatility conditions (low vol pullbacks, squeezes)
    - Multi-timeframe alignment (1m confirms 5m)
    """

    # Current market regime, exposed for the dashboard. One of:
    # UPTREND, DOWNTREND, RANGE, VOLATILE
    regime = "RANGE"

    def detect_all(self, analysis_1m: Dict, analysis_5m: Dict,
                   bars_5m: List[Dict] = None, bars_1m: List[Dict] = None) -> List[Dict]:
        setups = []
        if not analysis_5m or not analysis_1m:
            return setups

        price = analysis_5m.get("current_price", 0)
        ind_5m = analysis_5m.get("indicators", {})
        ind_1m = analysis_1m.get("indicators", {})
        bias_1m = analysis_1m.get("overall_bias", "")
        bias_5m = analysis_5m.get("overall_bias", "")

        # Classify the market regime BEFORE detecting setups. This is the
        # falling-knife guard: in a strong directional move we refuse
        # counter-trend mean-reversion entries (the mistake that fired 5
        # "buy the dip" longs during a 300pt crash).
        self.regime = self._compute_regime(price, ind_5m, bars_5m)

        setups.extend(self._check_ema_pullback(price, ind_5m, ind_1m, bias_1m, bars_5m))
        setups.extend(self._check_vwap_bounce(price, ind_5m, ind_1m, bias_5m, bars_1m))
        setups.extend(self._check_bollinger_squeeze(price, ind_5m, ind_1m))
        setups.extend(self._check_macd_crossover(price, ind_5m, ind_1m, bias_1m, bias_5m))
        setups.extend(self._check_rsi_extreme(price, ind_5m, ind_1m))

        # GLOBAL FILTERS — applied to every setup
        filtered = []
        for s in setups:
            direction = s.get("direction", "")

            # REGIME GUARD — never fade a strong trend (no falling knives).
            # RSI capitulation reversals are the one allowed exception, and
            # only when explicitly flagged as a reversal setup.
            is_reversal = s.get("reversal", False)
            if self.regime == "DOWNTREND" and direction == "LONG" and not is_reversal:
                continue
            if self.regime == "UPTREND" and direction == "SHORT" and not is_reversal:
                continue
            # In a violent volatility expansion, mean reversion is unreliable.
            # Require a much higher bar (only A-grade momentum survives).
            if self.regime == "VOLATILE":
                s["score"] -= 20
                s["description"] += " [!volatile]"

            # Skip anything below 1.5:1 R:R
            if s.get("rr", 0) < 1.5:
                continue
            # Penalize when 1m and 5m bias conflict
            if direction == "LONG" and "BEAR" in bias_5m.upper():
                s["score"] -= 15  # Fighting the 5m trend
                s["description"] += " [!5m conflict]"
            elif direction == "SHORT" and "BULL" in bias_5m.upper():
                s["score"] -= 15
                s["description"] += " [!5m conflict]"
            # Bonus when both timeframes agree
            if direction == "LONG" and "BULL" in bias_5m.upper() and "BULL" in bias_1m.upper():
                s["score"] += 10
            elif direction == "SHORT" and "BEAR" in bias_5m.upper() and "BEAR" in bias_1m.upper():
                s["score"] += 10
            # Bonus when the setup goes WITH a clean trend
            if self.regime == "UPTREND" and direction == "LONG":
                s["score"] += 8
            elif self.regime == "DOWNTREND" and direction == "SHORT":
                s["score"] += 8
            s["score"] = max(0, min(s["score"], 100))
            filtered.append(s)

        # Sort by score descending — best trades first
        filtered.sort(key=lambda s: s.get("score", 0), reverse=True)
        return filtered

    def _compute_regime(self, price, ind_5m, bars_5m):
        """Classify the current market regime from 5m structure.

        Returns UPTREND / DOWNTREND / RANGE / VOLATILE. Used to suppress
        counter-trend entries so we never buy a crash or short a rip.
        """
        atr = ind_5m.get("atr", {})
        atr_val = atr.get("value") if isinstance(atr, dict) else None
        vwap = ind_5m.get("vwap")
        bb = ind_5m.get("bollinger", {})
        bbw = bb.get("width")

        if not bars_5m or len(bars_5m) < 7 or not atr_val or atr_val <= 0:
            return "RANGE"

        # Net move over the last 6 5m bars, measured in ATR units
        recent = bars_5m[-6:]
        net_move = recent[-1]["close"] - recent[0]["open"]
        net_atr = net_move / atr_val

        down = sum(1 for b in recent if b["close"] < b["open"])
        up = sum(1 for b in recent if b["close"] > b["open"])

        # Distance of price from VWAP, in ATR units (how "extended" we are)
        vwap_dist_atr = (price - vwap) / atr_val if vwap else 0

        strong_down = (net_atr <= -1.5 and down >= 4) or vwap_dist_atr <= -2.5
        strong_up = (net_atr >= 1.5 and up >= 4) or vwap_dist_atr >= 2.5

        # A very wide Bollinger band width with no clear direction = chaos
        volatile = bbw is not None and bbw > 5.0

        if strong_down:
            return "DOWNTREND"
        if strong_up:
            return "UPTREND"
        if volatile:
            return "VOLATILE"
        return "RANGE"

    def _get_rsi(self, ind):
        rsi = ind.get("rsi", {})
        return rsi.get("value") if isinstance(rsi, dict) else None

    def _check_ema_pullback(self, price, ind_5m, ind_1m, bias_1m, bars_5m=None):
        ema = ind_5m.get("ema", {})
        e9 = ema.get("ema_9")
        e21 = ema.get("ema_21")
        e50 = ema.get("ema_50")
        rsi_5m = self._get_rsi(ind_5m)
        rsi_1m = self._get_rsi(ind_1m)
        if not all([e9, e21, rsi_5m]):
            return []
        proximity = price * 0.001

        # LONG pullback
        if e9 > e21 and abs(price - e9) < proximity and rsi_5m > 45:
            score = 50
            if rsi_5m > 50: score += 10
            if rsi_5m > 55: score += 5
            if price > e9: score += 5
            if e50 and e9 > e21 > e50: score += 10  # EMAs stacked bullish
            if abs(e9 - e21) > price * 0.003: score += 5  # Strong trend spacing
            if rsi_1m and rsi_1m > 45: score += 5  # 1m confirms
            if "BULL" in bias_1m.upper(): score += 5  # 1m bias aligns
            # Low volatility pullback candle
            if bars_5m and len(bars_5m) > 14:
                recent = bars_5m[-14:]
                avg_range = sum(b["high"] - b["low"] for b in recent) / len(recent)
                if bars_5m[-1]["high"] - bars_5m[-1]["low"] < avg_range * 0.8:
                    score += 5

            stop = round(e21 - proximity, 2)
            target = round(price + abs(price - e21) * 2, 2)
            rr = abs(target - price) / max(abs(price - stop), 0.01)
            return [{"name": "EMA Pullback", "direction": "LONG", "score": min(score, 100),
                     "entry": round(e9, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                     "description": f"EMA9({e9:.2f})>21({e21:.2f}), RSI {rsi_5m:.0f}, pullback to 9EMA"}]

        # SHORT pullback
        if e9 < e21 and abs(price - e9) < proximity and rsi_5m < 55:
            score = 50
            if rsi_5m < 50: score += 10
            if rsi_5m < 45: score += 5
            if price < e9: score += 5
            if e50 and e9 < e21 < e50: score += 10
            if abs(e9 - e21) > price * 0.003: score += 5
            if rsi_1m and rsi_1m < 55: score += 5
            if "BEAR" in bias_1m.upper(): score += 5

            stop = round(e21 + proximity, 2)
            target = round(price - abs(price - e21) * 2, 2)
            rr = abs(price - target) / max(abs(stop - price), 0.01)
            return [{"name": "EMA Pullback", "direction": "SHORT", "score": min(score, 100),
                     "entry": round(e9, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                     "description": f"EMA9({e9:.2f})<21({e21:.2f}), RSI {rsi_5m:.0f}, rally to 9EMA"}]
        return []

    def _check_vwap_bounce(self, price, ind_5m, ind_1m, bias_5m="", bars_1m=None):
        vwap = ind_5m.get("vwap")
        rsi_5m = self._get_rsi(ind_5m)
        rsi_1m = self._get_rsi(ind_1m)
        if not all([vwap, rsi_5m]):
            return []
        proximity = price * 0.002

        # CHOP FILTER: If price has been oscillating around VWAP, skip.
        # Check if price crossed VWAP multiple times in recent bars
        if bars_1m and len(bars_1m) > 10:
            recent = bars_1m[-10:]
            crosses = 0
            for i in range(1, len(recent)):
                prev_side = recent[i-1]["close"] > vwap
                curr_side = recent[i]["close"] > vwap
                if prev_side != curr_side:
                    crosses += 1
            if crosses >= 3:
                return []  # Too choppy — price keeps crossing VWAP

        # APPROACH FILTER: Price must be coming FROM a direction toward VWAP,
        # not just sitting on it. Check if price moved toward VWAP recently.
        approaching = False
        if bars_1m and len(bars_1m) > 5:
            five_ago = bars_1m[-5]["close"]
            # Price was further from VWAP 5 bars ago than now
            if abs(five_ago - vwap) > abs(price - vwap) * 1.5:
                approaching = True
        if not approaching:
            return []  # Price isn't approaching VWAP, just hovering

        if abs(price - vwap) < proximity and 35 < rsi_5m < 65:
            score = 45
            if 42 < rsi_5m < 58: score += 5   # RSI truly neutral
            if abs(price - vwap) < proximity * 0.5: score += 10  # Very close
            if rsi_1m:
                if price <= vwap and rsi_1m < 40: score += 10  # 1m oversold at VWAP
                if price > vwap and rsi_1m > 60: score += 10   # 1m overbought at VWAP

            # Direction must align with 5m bias (no counter-trend VWAP bounces)
            if "BULL" in bias_5m.upper():
                direction = "LONG"
                if price > vwap:
                    return []  # Already above VWAP in uptrend — no bounce to play
            elif "BEAR" in bias_5m.upper():
                direction = "SHORT"
                if price < vwap:
                    return []  # Already below VWAP in downtrend
            else:
                # Neutral 5m — need strong 1m signal to pick direction
                if rsi_1m and rsi_1m < 40:
                    direction = "LONG"
                    score -= 5  # Lower confidence without trend
                elif rsi_1m and rsi_1m > 60:
                    direction = "SHORT"
                    score -= 5
                else:
                    return []  # No clear direction — skip

            stop = round(vwap - proximity * 2.5, 2) if direction == "LONG" else round(vwap + proximity * 2.5, 2)
            target = round(vwap + proximity * 4, 2) if direction == "LONG" else round(vwap - proximity * 4, 2)
            rr = abs(target - price) / max(abs(price - stop), 0.01)
            return [{"name": "VWAP Bounce", "direction": direction, "score": min(score, 100),
                     "entry": round(vwap, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                     "description": f"Price approaching VWAP({vwap:.2f}), RSI {rsi_5m:.0f}"}]
        return []

    def _check_bollinger_squeeze(self, price, ind_5m, ind_1m):
        bb = ind_5m.get("bollinger", {})
        width = bb.get("width")
        upper = bb.get("upper")
        lower = bb.get("lower")
        if width is None or width >= 0.3 or not upper or not lower:
            return []
        score = 55
        if width < 0.2: score += 10
        if width < 0.15: score += 5
        rsi_1m = self._get_rsi(ind_1m)
        if rsi_1m:
            if rsi_1m > 55: score += 5  # Bias long
            elif rsi_1m < 45: score += 5  # Bias short

        # Direction hint from 1m momentum
        direction = "NEUTRAL"
        macd_1m = ind_1m.get("macd", {}) if ind_1m else {}
        if macd_1m.get("histogram") and macd_1m["histogram"] > 0:
            direction = "LONG"
        elif macd_1m.get("histogram") and macd_1m["histogram"] < 0:
            direction = "SHORT"

        stop = round(lower, 2)
        target = round(upper, 2)
        rr = abs(target - price) / max(abs(price - stop), 0.01) if direction == "LONG" else abs(price - stop) / max(abs(target - price), 0.01)
        return [{"name": "Bollinger Squeeze", "direction": direction, "score": min(score, 100),
                 "entry": round(price, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                 "description": f"BB width {width:.3f}% — squeeze. Breakout imminent."}]

    def _check_macd_crossover(self, price, ind_5m, ind_1m, bias_1m, bias_5m=""):
        macd = ind_5m.get("macd", {})
        m, s, h = macd.get("macd"), macd.get("signal"), macd.get("histogram")
        if not all(v is not None for v in [m, s, h]):
            return []
        threshold = price * 0.0005
        if abs(h) < threshold and abs(m - s) < threshold:
            score = 50
            if abs(m) < price * 0.001: score += 10  # Near zero line (stronger signal)
            rsi_5m = self._get_rsi(ind_5m)
            if m > s and h > 0:
                if rsi_5m and rsi_5m > 45: score += 5
                if "BULL" in bias_1m.upper(): score += 5
                stop = round(price * 0.995, 2)
                target = round(price * 1.008, 2)
                rr = abs(target - price) / max(abs(price - stop), 0.01)
                return [{"name": "MACD Bullish Cross", "direction": "LONG", "score": min(score, 100),
                         "entry": round(price, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                         "description": f"MACD({m:.3f}) crossing above signal({s:.3f})"}]
            elif m < s and h < 0:
                if rsi_5m and rsi_5m < 55: score += 5
                if "BEAR" in bias_1m.upper(): score += 5
                stop = round(price * 1.005, 2)
                target = round(price * 0.992, 2)
                rr = abs(price - target) / max(abs(stop - price), 0.01)
                return [{"name": "MACD Bearish Cross", "direction": "SHORT", "score": min(score, 100),
                         "entry": round(price, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                         "description": f"MACD({m:.3f}) crossing below signal({s:.3f})"}]
        return []

    def _check_rsi_extreme(self, price, ind_5m, ind_1m):
        rsi_5m = self._get_rsi(ind_5m)
        sr = ind_5m.get("support_resistance", {})
        if rsi_5m is None:
            return []
        supports = sr.get("support", [])
        resistances = sr.get("resistance", [])
        proximity = price * 0.003

        if rsi_5m < 30 and supports:
            nearest = supports[0]
            if abs(price - nearest) < proximity:
                score = 60
                if rsi_5m < 25: score += 15
                if rsi_5m < 20: score += 5
                if abs(price - nearest) < proximity * 0.5: score += 10
                rsi_1m = self._get_rsi(ind_1m)
                if rsi_1m and rsi_1m < 35: score += 5  # 1m also oversold
                stop = round(nearest * 0.997, 2)
                target = round(nearest * 1.006, 2)
                rr = abs(target - nearest) / max(abs(nearest - stop), 0.01)
                # Only a DEEP washout (RSI<25) counts as a reversal that may
                # override the downtrend guard. A mild 28 dip in a crash does not.
                return [{"name": "RSI Oversold + Support", "direction": "LONG", "score": min(score, 100),
                         "reversal": rsi_5m < 25,
                         "entry": round(nearest, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                         "description": f"RSI {rsi_5m:.0f} oversold at support {nearest:.2f}"}]
        if rsi_5m > 70 and resistances:
            nearest = resistances[0]
            if abs(price - nearest) < proximity:
                score = 60
                if rsi_5m > 75: score += 15
                if rsi_5m > 80: score += 5
                if abs(price - nearest) < proximity * 0.5: score += 10
                rsi_1m = self._get_rsi(ind_1m)
                if rsi_1m and rsi_1m > 65: score += 5
                stop = round(nearest * 1.003, 2)
                target = round(nearest * 0.994, 2)
                rr = abs(nearest - target) / max(abs(stop - nearest), 0.01)
                return [{"name": "RSI Overbought + Resistance", "direction": "SHORT", "score": min(score, 100),
                         "reversal": rsi_5m > 75,
                         "entry": round(nearest, 2), "stop": stop, "target": target, "rr": round(rr, 1),
                         "description": f"RSI {rsi_5m:.0f} overbought at resistance {nearest:.2f}"}]
        return []


# ---- Alert Manager ----------------------------------------------------

class AlertManager:
    """Tracks alerts, deduplicates, beeps on new high-confluence setups."""

    def __init__(self, min_score: int = 50, alert_log_path: str = None):
        self.min_score = min_score
        self.alert_log_path = alert_log_path
        self.alert_history: List[Dict] = []
        self._seen_keys: set = set()  # Dedup: "setup_name|direction|entry" within 5min
        self._last_beep_time = 0.0
        self._lock = threading.Lock()

    def process_setups(self, setups: List[Dict]) -> List[Dict]:
        """Filter setups by min score, deduplicate, beep on new ones."""
        qualified = [s for s in setups if s.get("score", 0) >= self.min_score]
        new_alerts = []

        with self._lock:
            now = time.time()
            # Clean stale keys (older than 5 minutes)
            if len(self._seen_keys) > 100:
                self._seen_keys.clear()

            for setup in qualified:
                key = f"{setup['name']}|{setup['direction']}|{setup['entry']}"
                if key not in self._seen_keys:
                    self._seen_keys.add(key)
                    setup["alert_time"] = datetime.now().strftime("%H:%M:%S")
                    new_alerts.append(setup)
                    self.alert_history.append(setup)
                    # Keep last 20 alerts
                    if len(self.alert_history) > 20:
                        self.alert_history = self.alert_history[-20:]

            # Beep on new alerts (max once per 3 seconds)
            if new_alerts and (now - self._last_beep_time) > 3.0:
                best = new_alerts[0]
                beep_count = 3 if best["score"] >= 75 else 2 if best["score"] >= 60 else 1
                for _ in range(beep_count):
                    print("\a", end="", flush=True)
                    time.sleep(0.15)
                self._last_beep_time = now

            # Log to file
            if new_alerts and self.alert_log_path:
                self._write_log(new_alerts)

        return qualified

    def _write_log(self, alerts: List[Dict]):
        try:
            with open(self.alert_log_path, "a") as f:
                for a in alerts:
                    ts = a.get("alert_time", "?")
                    f.write(f"[{ts}] SCORE:{a['score']} {a['name']} {a['direction']} "
                            f"Entry:{a['entry']} Stop:{a['stop']} Target:{a['target']} "
                            f"R:R={a.get('rr', '?')} — {a['description']}\n")
        except Exception:
            pass

    def get_recent_alerts(self, count: int = 5) -> List[Dict]:
        with self._lock:
            return list(self.alert_history[-count:])

    def clear_stale(self):
        """Called periodically to allow setups to re-trigger."""
        with self._lock:
            self._seen_keys.clear()


# ---- Trade Logger -----------------------------------------------------

class TradeLogger:
    """Auto-logs trades to a daily markdown file."""

    def __init__(self, log_dir: str):
        self.log_dir = log_dir
        os.makedirs(log_dir, exist_ok=True)

    def log_fill(self, fill: Dict):
        path = os.path.join(self.log_dir, f"trades-{datetime.now().strftime('%Y-%m-%d')}.md")
        is_new = not os.path.exists(path)
        with open(path, "a") as f:
            if is_new:
                f.write(f"# Trade Log — {datetime.now().strftime('%Y-%m-%d')}\n\n")
                f.write("| Time | Side | Qty | Price | P&L |\n")
                f.write("|------|------|-----|-------|-----|\n")
            ts = fill.get("datetime", datetime.now().strftime("%H:%M:%S"))
            side = fill.get("side", "?")
            qty = fill.get("size", fill.get("qty", "?"))
            price = fill.get("price", "?")
            f.write(f"| {ts} | {side} | {qty} | {price} | |\n")


# ---- Position Sizer (for alert display) --------------------------------

def calc_position_size(entry: float, stop: float, apex_account: str,
                       balance: float, instrument: str = "NQ") -> Dict:
    """Calculate position size for an alert. Returns contracts and dollar risk."""
    acct = APEX_ACCOUNTS.get(apex_account.lower(), APEX_ACCOUNTS["50k"])
    point_value = NQ_POINT_VALUE if instrument.upper() == "NQ" else MNQ_POINT_VALUE
    tick_value = NQ_TICK_VALUE if instrument.upper() == "NQ" else MNQ_TICK_VALUE
    max_contracts = acct["max_nq"] if instrument.upper() == "NQ" else acct["max_mnq"]

    stop_distance = abs(entry - stop)
    risk_per_contract = stop_distance * point_value
    dd_limit = acct["drawdown"]

    # Conservative: 15% of drawdown per trade for scalping
    max_risk = dd_limit * 0.15
    if risk_per_contract > 0:
        contracts = min(int(max_risk / risk_per_contract), max_contracts)
    else:
        contracts = 1
    contracts = max(contracts, 1)

    total_risk = contracts * risk_per_contract
    return {
        "contracts": contracts,
        "risk_per_contract": round(risk_per_contract, 2),
        "total_risk": round(total_risk, 2),
        "instrument": instrument.upper(),
        "max_contracts": max_contracts,
    }


# ---- Terminal Dashboard -----------------------------------------------

class Dashboard:
    """Terminal display for live trading co-pilot with aggressive alerts."""

    SCORE_BAR = {
        90: "\033[42;30m  A+  \033[0m",  # Green bg
        75: "\033[42;30m  A   \033[0m",
        60: "\033[43;30m  B+  \033[0m",  # Yellow bg
        50: "\033[43;30m  B   \033[0m",
        0:  "\033[41;37m  C   \033[0m",   # Red bg
    }

    @staticmethod
    def clear():
        print("\033[2J\033[H", end="", flush=True)

    def _score_badge(self, score: int) -> str:
        for threshold, badge in self.SCORE_BAR.items():
            if score >= threshold:
                return badge
        return "  ?  "

    def render(self, symbol: str, price: float, analysis_5m: Dict,
               analysis_1m: Dict, setups: List[Dict], account_info: Dict,
               bar_count: int, alert_history: List[Dict] = None,
               min_score: int = 50, nq_price: float = None,
               regime: str = "RANGE"):
        self.clear()
        now = datetime.now()

        # Header
        print("=" * 72)
        price_display = f"{symbol} {price:.2f}"
        if nq_price:
            price_display += f"  |  NQ ~{nq_price:.2f}"
        print(f"  NQ LIVE CO-PILOT  |  {price_display}  |  {now.strftime('%H:%M:%S')}")
        print("=" * 72)

        # EOD Drawdown Status
        apex_acct = account_info.get("apex_account", "50k")
        balance = account_info.get("balance", 0)
        instrument = account_info.get("instrument", "NQ")
        acct_rules = APEX_ACCOUNTS.get(apex_acct.lower(), {})
        dd_limit = acct_rules.get("drawdown", 2500)
        floor = balance - dd_limit
        remaining = balance - floor

        status = "SAFE"
        if remaining < dd_limit * 0.2:
            status = "\033[41;37m !! CRITICAL !! \033[0m"
        elif remaining < dd_limit * 0.4:
            status = "\033[43;30m CAUTION \033[0m"
        elif remaining < dd_limit * 0.6:
            status = "WATCH"

        print(f"  Apex {apex_acct.upper()}  |  Bal: ${balance:,.2f}  |  "
              f"Floor: ${floor:,.0f}  |  Left: ${remaining:,.0f}  |  {status}")
        print("-" * 72)

        # ========== ACTIVE ALERTS (TOP OF SCREEN — MOST VISIBLE) ==========
        if setups:
            top = setups[0]
            badge = self._score_badge(top["score"])
            print()
            print(f"  {badge}  \033[1m>>> {top['name']} — {top['direction']} <<<\033[0m  Score: {top['score']}/100")
            print(f"        Entry: {top['entry']}   Stop: {top['stop']}   Target: {top['target']}   R:R {top.get('rr', '?')}:1")

            # Position sizing
            sizing = calc_position_size(top["entry"], top["stop"], apex_acct, balance, instrument)
            print(f"        Size: {sizing['contracts']} {sizing['instrument']}   "
                  f"Risk: ${sizing['total_risk']:.0f} (${sizing['risk_per_contract']:.0f}/ct)")
            print(f"        {top['description']}")
            print()

            # Additional setups (compact)
            if len(setups) > 1:
                for s in setups[1:3]:
                    print(f"  [{s['score']:>3}] {s['name']} {s['direction']}  "
                          f"E:{s['entry']} S:{s['stop']} T:{s['target']}  R:R {s.get('rr','?')}:1")
            print("-" * 72)
        else:
            print(f"  No setups >= {min_score} score. Scanning...  (filter: --min-score {min_score})")
            print("-" * 72)

        # 5-min + 1-min Signals (compact dual-column)
        sig_5m = analysis_5m.get("signals", {})
        ind_5m = analysis_5m.get("indicators", {})
        bias_5m = analysis_5m.get("overall_bias", "Waiting...")
        bias_1m = analysis_1m.get("overall_bias", "Waiting...")

        regime_color = {
            "UPTREND": "\033[42;30m", "DOWNTREND": "\033[41;37m",
            "VOLATILE": "\033[43;30m", "RANGE": "\033[47;30m",
        }.get(regime, "\033[47;30m")
        regime_tag = f"{regime_color} {regime} \033[0m"
        print(f"  5m: {bias_5m}  |  1m: {bias_1m}  |  Regime: {regime_tag}")

        # Key indicators inline
        parts = []
        rsi_5m = ind_5m.get("rsi", {})
        if isinstance(rsi_5m, dict) and rsi_5m.get("value"):
            parts.append(f"RSI:{rsi_5m['value']:.0f}")
        macd = ind_5m.get("macd", {})
        if macd.get("histogram") is not None:
            h = macd["histogram"]
            parts.append(f"MACD-H:{'+'if h>0 else ''}{h:.3f}")
        vwap = ind_5m.get("vwap")
        if vwap:
            parts.append(f"VWAP:{vwap:.2f}")
        atr = ind_5m.get("atr", {})
        if isinstance(atr, dict) and atr.get("value"):
            parts.append(f"ATR:{atr['value']}")
        bb = ind_5m.get("bollinger", {})
        if bb.get("width") is not None:
            parts.append(f"BBW:{bb['width']:.3f}%")
        if parts:
            print(f"  {' | '.join(parts)}")
        print("-" * 72)

        # Key Levels
        sr = ind_5m.get("support_resistance", {})
        pivots = ind_5m.get("pivot_points", {})
        levels = []
        if sr.get("resistance"):
            levels.append(f"R: {', '.join(f'{r:.2f}' for r in sr['resistance'][:3])}")
        if pivots.get("pp"):
            levels.append(f"PP: {pivots['pp']}")
        if sr.get("support"):
            levels.append(f"S: {', '.join(f'{s:.2f}' for s in sr['support'][:3])}")
        if levels:
            print(f"  {' | '.join(levels)}")
            print("-" * 72)

        # Recent Alert History
        history = alert_history or []
        if history:
            print("  RECENT ALERTS:")
            for a in history[-5:]:
                ts = a.get("alert_time", "?")
                print(f"    {ts}  [{a['score']:>3}] {a['name']} {a['direction']}  "
                      f"E:{a['entry']} T:{a['target']}")
            print("-" * 72)

        print(f"  Bars: {bar_count} | Min Score: {min_score} | Alerts: {len(history)} today | Ctrl+C to stop")


# ---- Live Connector (Main Orchestrator) --------------------------------

class LiveConnector:
    """Connects to Alpaca, streams data, runs analysis, and fires alerts."""

    def __init__(self, config: Dict, min_score: int = 50,
                 alert_log: str = None):
        self.config = config
        self.api_key = config["api_key"]
        self.secret_key = config["secret_key"]
        self.env = config.get("environment", "paper")
        self.symbol = config.get("symbol", "TQQQ")
        self.apex_account = config.get("apex_account", "50k")
        self.apex_balance = config.get("apex_balance", 50000.0)
        self.instrument = config.get("instrument", "NQ")
        self.min_score = min_score

        self.candles = CandleAggregator()
        self.detector = SetupDetector()
        self.alerts = AlertManager(min_score=min_score, alert_log_path=alert_log)
        self.dashboard = Dashboard()

        log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               "..", "assets", "trade-logs")
        self.logger = TradeLogger(log_dir)

        self.rest: Optional[AlpacaREST] = None
        self.stream: Optional[AlpacaStream] = None

        self._running = False
        self._last_price = 0.0
        self._new_bar_event = threading.Event()
        self._stale_clear_counter = 0

    def run(self):
        """Main entry point."""
        check_dependencies()
        print("=" * 72)
        print(f"  NQ LIVE CO-PILOT (Alpaca) — Alert Mode ON")
        print(f"  Min confluence score: {self.min_score}  |  Instrument: {self.instrument}")
        print(f"  Apex {self.apex_account.upper()}  |  Balance: ${self.apex_balance:,.2f}")
        print("=" * 72)

        try:
            self._connect()
            self._load_history()
            self._subscribe()
            self._analysis_loop()
        except KeyboardInterrupt:
            print("\n  Shutting down...")
        except ConnectionError as e:
            print(f"\n  Connection error: {e}", file=sys.stderr)
            sys.exit(1)
        finally:
            self._cleanup()

    def _connect(self):
        """Authenticate and verify connection."""
        print(f"  Connecting to Alpaca ({self.env})...")
        self.rest = AlpacaREST(self.api_key, self.secret_key, self.env)

        try:
            account = self.rest.get_account()
            print(f"  Account verified: {account.get('id', 'OK')}")
            print(f"  Paper equity: ${float(account.get('equity', 0)):,.2f}")
        except ConnectionError as e:
            print(f"  Auth failed: {e}", file=sys.stderr)
            print(f"\n  Check your API key and secret in the config file.", file=sys.stderr)
            sys.exit(1)

        print(f"  Connecting to real-time stream...")
        self.stream = AlpacaStream(
            api_key=self.api_key,
            secret_key=self.secret_key,
            env=self.env,
            on_bar=self._on_bar,
            on_trade=self._on_trade,
            on_error=self._on_stream_error,
        )
        self.stream.connect()
        print(f"  Stream connected and authenticated")

    def _load_history(self):
        """Load historical bars to seed the indicators."""
        print(f"  Loading historical 1-min bars for {self.symbol}...")
        try:
            bars = self.rest.get_bars(self.symbol, timeframe="1Min", limit=500, days_back=3)
            for bar_data in bars:
                bar = {
                    "open": float(bar_data.get("o", bar_data.get("open", 0))),
                    "high": float(bar_data.get("h", bar_data.get("high", 0))),
                    "low": float(bar_data.get("l", bar_data.get("low", 0))),
                    "close": float(bar_data.get("c", bar_data.get("close", 0))),
                    "volume": int(bar_data.get("v", bar_data.get("volume", 0))),
                    "datetime": bar_data.get("t", bar_data.get("timestamp", "")),
                }
                if bar["close"] > 0:
                    self.candles.add_bar(bar)
                    self._last_price = bar["close"]
            print(f"  Loaded {self.candles.bar_count} historical bars")
        except Exception as e:
            print(f"  Warning: Could not load history: {e}")
            print(f"  Will start fresh from real-time data")

    def _subscribe(self):
        """Subscribe to real-time bar and trade data."""
        print(f"  Subscribing to {self.symbol} real-time data...")
        self.stream.subscribe(
            bars=[self.symbol],
            trades=[self.symbol],
        )
        print(f"  Subscribed. Listening for alerts (score >= {self.min_score})...\n")

    def _on_bar(self, bar: Dict):
        """Handle a new 1-min bar from the stream."""
        if bar.get("close", 0) > 0:
            self.candles.add_bar(bar)
            self._last_price = bar["close"]
            self._new_bar_event.set()

    def _on_trade(self, trade: Dict):
        """Handle a real-time trade (for live price updates)."""
        price = trade.get("price", 0)
        if price > 0:
            self._last_price = price

    def _on_stream_error(self, error: str):
        """Handle stream errors."""
        pass

    def _analysis_loop(self):
        """Main analysis loop — detects setups and fires alerts."""
        self._running = True

        while self._running and self.candles.bar_count < 5:
            time.sleep(1)
            if self.candles.bar_count > 0:
                print(f"  Bars received: {self.candles.bar_count}...", end="\r")

        while self._running:
            try:
                bars_1m = self.candles.get_1m_candles()
                bars_5m = self.candles.get_5m_candles()

                if not bars_1m:
                    time.sleep(1)
                    continue

                price = self._last_price or bars_1m[-1]["close"]

                analysis_1m = {}
                analysis_5m = {}

                if len(bars_1m) >= 20:
                    try:
                        analysis_1m = analyze(bars_1m)
                    except Exception:
                        pass

                if len(bars_5m) >= 10:
                    try:
                        analysis_5m = analyze(bars_5m)
                    except Exception:
                        pass

                # Detect setups with confluence scoring
                raw_setups = self.detector.detect_all(
                    analysis_1m, analysis_5m, bars_5m, bars_1m
                )

                # Process through alert manager (filter, dedupe, beep)
                qualified_setups = self.alerts.process_setups(raw_setups)

                account_info = {
                    "apex_account": self.apex_account,
                    "balance": self.apex_balance,
                    "instrument": self.instrument,
                }

                self.dashboard.render(
                    symbol=self.symbol,
                    price=price,
                    analysis_5m=analysis_5m or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
                    analysis_1m=analysis_1m or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
                    setups=qualified_setups,
                    account_info=account_info,
                    bar_count=self.candles.bar_count,
                    alert_history=self.alerts.get_recent_alerts(),
                    min_score=self.min_score,
                    regime=self.detector.regime,
                )

                # Every 5 minutes, clear stale alert keys so setups can re-fire
                self._stale_clear_counter += 1
                if self._stale_clear_counter >= 300:  # ~10 min at 2s refresh
                    self.alerts.clear_stale()
                    self._stale_clear_counter = 0

                self._new_bar_event.clear()
                self._new_bar_event.wait(timeout=2.0)

            except KeyboardInterrupt:
                raise
            except Exception as e:
                print(f"\n  Error: {e}")
                time.sleep(2)

    def _cleanup(self):
        self._running = False
        if self.stream:
            self.stream.close()
        total = len(self.alerts.alert_history)
        print(f"  Session ended. {total} alerts fired today.")


# ---- Config & Main ----------------------------------------------------

def load_config(path: str) -> Dict:
    with open(path, "r") as f:
        config = json.load(f)
    required = ["api_key", "secret_key"]
    missing = [k for k in required if k not in config]
    if missing:
        print(f"Error: Config missing: {', '.join(missing)}", file=sys.stderr)
        print(f"Get your keys at https://app.alpaca.markets/paper/dashboard/overview", file=sys.stderr)
        sys.exit(1)
    return config


def main():
    parser = argparse.ArgumentParser(
        description="Alpaca Live Connector — Real-Time NQ Trading Co-Pilot with Alerts"
    )
    parser.add_argument("--config", required=True,
                        help="Path to Alpaca config JSON file")
    parser.add_argument("--symbol", default=None,
                        help="Symbol to track (default: TQQQ). Try QQQ, SPY, etc.")
    parser.add_argument("--min-score", type=int, default=50,
                        help="Minimum confluence score to trigger alert (0-100, default: 50). "
                             "Use 60+ for high-quality only, 75+ for A-grade setups.")
    parser.add_argument("--alert-log", default=None,
                        help="Path to write alert log file (optional)")
    parser.add_argument("--instrument", default=None, choices=["NQ", "MNQ"],
                        help="NQ or MNQ for position sizing (default: from config or NQ)")

    args = parser.parse_args()
    config = load_config(args.config)

    if args.symbol:
        config["symbol"] = args.symbol
    if args.instrument:
        config["instrument"] = args.instrument

    connector = LiveConnector(config, min_score=args.min_score,
                              alert_log=args.alert_log)
    connector.run()


if __name__ == "__main__":
    main()
