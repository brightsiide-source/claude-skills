#!/usr/bin/env python3
"""
Alpaca Live Connector - Real-Time NQ Trading Co-Pilot

Connects to Alpaca's free paper trading API for real-time market data.
Runs technical analysis on 1m/5m candles, monitors EOD drawdown against
your Apex account, detects playbook setups, and auto-logs trades.

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
from risk_manager import APEX_ACCOUNTS


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


# ---- Setup Detector ---------------------------------------------------

class SetupDetector:
    """Detects playbook setups from indicator analysis results."""

    def detect_all(self, analysis_1m: Dict, analysis_5m: Dict) -> List[Dict]:
        setups = []
        if not analysis_5m or not analysis_1m:
            return setups

        price = analysis_5m.get("current_price", 0)
        ind_5m = analysis_5m.get("indicators", {})
        ind_1m = analysis_1m.get("indicators", {})
        sig_5m = analysis_5m.get("signals", {})

        setups.extend(self._check_ema_pullback(price, ind_5m))
        setups.extend(self._check_vwap_bounce(price, ind_5m))
        setups.extend(self._check_bollinger_squeeze(price, ind_5m))
        setups.extend(self._check_macd_crossover(price, ind_5m))
        setups.extend(self._check_rsi_extreme(price, ind_5m))
        return setups

    def _check_ema_pullback(self, price, ind_5m):
        ema = ind_5m.get("ema", {})
        rsi = ind_5m.get("rsi", {})
        e9 = ema.get("ema_9")
        e21 = ema.get("ema_21")
        rsi_val = rsi.get("value") if isinstance(rsi, dict) else None
        if not all([e9, e21, rsi_val]):
            return []
        # Use percentage-based proximity for any price level (works for QQQ, TQQQ, etc.)
        proximity = price * 0.001  # 0.1% of price
        if e9 > e21 and abs(price - e9) < proximity and rsi_val > 45:
            return [{"name": "EMA Pullback (Long)", "direction": "LONG",
                     "confidence": "HIGH" if rsi_val > 50 else "MEDIUM",
                     "entry": round(e9, 2), "stop": round(e21 - proximity, 2),
                     "target": round(price + abs(price - e21) * 2, 2),
                     "description": f"5m EMA9({e9:.2f}) > EMA21({e21:.2f}), pullback. RSI {rsi_val:.1f}"}]
        if e9 < e21 and abs(price - e9) < proximity and rsi_val < 55:
            return [{"name": "EMA Pullback (Short)", "direction": "SHORT",
                     "confidence": "HIGH" if rsi_val < 50 else "MEDIUM",
                     "entry": round(e9, 2), "stop": round(e21 + proximity, 2),
                     "target": round(price - abs(price - e21) * 2, 2),
                     "description": f"5m EMA9({e9:.2f}) < EMA21({e21:.2f}), rally back. RSI {rsi_val:.1f}"}]
        return []

    def _check_vwap_bounce(self, price, ind_5m):
        vwap = ind_5m.get("vwap")
        rsi = ind_5m.get("rsi", {})
        rsi_val = rsi.get("value") if isinstance(rsi, dict) else None
        if not all([vwap, rsi_val]):
            return []
        proximity = price * 0.002
        if abs(price - vwap) < proximity and 38 < rsi_val < 62:
            direction = "LONG" if price <= vwap else "SHORT"
            return [{"name": "VWAP Bounce", "direction": direction,
                     "confidence": "MEDIUM",
                     "entry": round(vwap, 2),
                     "stop": round(vwap - proximity * 2 if direction == "LONG" else vwap + proximity * 2, 2),
                     "target": round(vwap + proximity * 3 if direction == "LONG" else vwap - proximity * 3, 2),
                     "description": f"Price near VWAP ({vwap:.2f}), RSI neutral ({rsi_val:.1f})"}]
        return []

    def _check_bollinger_squeeze(self, price, ind_5m):
        bb = ind_5m.get("bollinger", {})
        width = bb.get("width")
        if width is not None and width < 0.3:
            return [{"name": "Bollinger Squeeze", "direction": "NEUTRAL",
                     "confidence": "MEDIUM", "entry": round(price, 2),
                     "stop": round(bb.get("lower", price * 0.995), 2),
                     "target": round(bb.get("upper", price * 1.005), 2),
                     "description": f"BB width {width:.4f}% — tight. Breakout imminent."}]
        return []

    def _check_macd_crossover(self, price, ind_5m):
        macd = ind_5m.get("macd", {})
        m, s, h = macd.get("macd"), macd.get("signal"), macd.get("histogram")
        if not all(v is not None for v in [m, s, h]):
            return []
        threshold = price * 0.0005
        if abs(h) < threshold and abs(m - s) < threshold:
            if m > s and h > 0:
                return [{"name": "MACD Bullish Cross", "direction": "LONG",
                         "confidence": "MEDIUM", "entry": round(price, 2),
                         "stop": round(price * 0.995, 2), "target": round(price * 1.008, 2),
                         "description": f"MACD ({m:.2f}) crossing above signal ({s:.2f})"}]
            elif m < s and h < 0:
                return [{"name": "MACD Bearish Cross", "direction": "SHORT",
                         "confidence": "MEDIUM", "entry": round(price, 2),
                         "stop": round(price * 1.005, 2), "target": round(price * 0.992, 2),
                         "description": f"MACD ({m:.2f}) crossing below signal ({s:.2f})"}]
        return []

    def _check_rsi_extreme(self, price, ind_5m):
        rsi = ind_5m.get("rsi", {})
        rsi_val = rsi.get("value") if isinstance(rsi, dict) else None
        sr = ind_5m.get("support_resistance", {})
        if rsi_val is None:
            return []
        supports = sr.get("support", [])
        resistances = sr.get("resistance", [])
        proximity = price * 0.003
        if rsi_val < 30 and supports:
            nearest = supports[0]
            if abs(price - nearest) < proximity:
                return [{"name": "RSI Oversold at Support", "direction": "LONG",
                         "confidence": "HIGH", "entry": round(nearest, 2),
                         "stop": round(nearest * 0.997, 2), "target": round(nearest * 1.006, 2),
                         "description": f"RSI {rsi_val:.1f} oversold near support {nearest:.2f}"}]
        if rsi_val > 70 and resistances:
            nearest = resistances[0]
            if abs(price - nearest) < proximity:
                return [{"name": "RSI Overbought at Resistance", "direction": "SHORT",
                         "confidence": "HIGH", "entry": round(nearest, 2),
                         "stop": round(nearest * 1.003, 2), "target": round(nearest * 0.994, 2),
                         "description": f"RSI {rsi_val:.1f} overbought near resistance {nearest:.2f}"}]
        return []


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


# ---- Terminal Dashboard -----------------------------------------------

class Dashboard:
    """Terminal display for live trading co-pilot."""

    @staticmethod
    def clear():
        print("\033[2J\033[H", end="", flush=True)

    def render(self, symbol: str, price: float, analysis_5m: Dict,
               analysis_1m: Dict, setups: List[Dict], account_info: Dict,
               bar_count: int, nq_price: float = None):
        self.clear()
        now = datetime.now()

        # Header
        print("=" * 64)
        price_display = f"{symbol} {price:.2f}"
        if nq_price:
            price_display += f"  |  NQ ~{nq_price:.2f}"
        print(f"  NQ LIVE CO-PILOT  |  {price_display}  |  {now.strftime('%H:%M:%S')}")
        print("=" * 64)

        # EOD Drawdown Status
        apex_acct = account_info.get("apex_account", "50k")
        balance = account_info.get("balance", 0)
        acct_rules = APEX_ACCOUNTS.get(apex_acct.lower(), {})
        dd_limit = acct_rules.get("drawdown", 2500)
        floor = balance - dd_limit
        remaining = balance - floor

        status = "SAFE"
        if remaining < dd_limit * 0.2:
            status = "!! CRITICAL !!"
        elif remaining < dd_limit * 0.4:
            status = "CAUTION"
        elif remaining < dd_limit * 0.6:
            status = "WATCH"

        print(f"  Apex {apex_acct.upper()}  |  Balance: ${balance:,.2f}  |  "
              f"EOD Floor: ${floor:,.0f}  |  Remaining: ${remaining:,.0f}  |  {status}")
        print("-" * 64)

        # 5-min Signals
        sig_5m = analysis_5m.get("signals", {})
        ind_5m = analysis_5m.get("indicators", {})
        bias = analysis_5m.get("overall_bias", "Waiting for data...")

        print(f"  5min BIAS: {bias}")
        for key in ["trend", "rsi", "macd", "vwap", "bollinger", "stochastic"]:
            if sig_5m.get(key):
                label = key.upper()
                extra = ""
                if key == "rsi":
                    rv = ind_5m.get("rsi", {})
                    if isinstance(rv, dict):
                        extra = f" ({rv.get('value', '?')})"
                elif key == "vwap":
                    extra = f" ({ind_5m.get('vwap', '?')})"
                print(f"    {label}:{extra}  {sig_5m[key]}")

        atr = ind_5m.get("atr", {})
        if isinstance(atr, dict) and atr.get("value"):
            print(f"    ATR(14):  {atr['value']} pts")
        print("-" * 64)

        # 1-min Signals (compact)
        sig_1m = analysis_1m.get("signals", {})
        bias_1m = analysis_1m.get("overall_bias", "Waiting...")
        line = f"  1min BIAS: {bias_1m}"
        if sig_1m.get("rsi"):
            line += f"  |  RSI: {sig_1m['rsi']}"
        print(line)
        print("-" * 64)

        # Key Levels
        sr = ind_5m.get("support_resistance", {})
        pivots = ind_5m.get("pivot_points", {})
        if sr.get("resistance"):
            print(f"  Resistance: {', '.join(f'{r:.2f}' for r in sr['resistance'][:3])}")
        if pivots.get("pp"):
            print(f"  Pivot: {pivots['pp']}  R1: {pivots.get('r1','-')}  S1: {pivots.get('s1','-')}")
        if sr.get("support"):
            print(f"  Support:    {', '.join(f'{s:.2f}' for s in sr['support'][:3])}")
        print("-" * 64)

        # Setup Alerts
        if setups:
            print("  ** SETUP ALERTS **")
            for s in setups[:3]:
                print(f"  [{s['confidence']}] {s['name']} -- {s['direction']}")
                print(f"    Entry: {s['entry']}  Stop: {s['stop']}  Target: {s['target']}")
                print(f"    {s['description']}")
        else:
            print("  No active setups. Watching...")

        print("=" * 64)
        print(f"  Bars: {bar_count}  |  Data: Alpaca (paper)  |  Ctrl+C to stop")


# ---- Live Connector (Main Orchestrator) --------------------------------

class LiveConnector:
    """Connects to Alpaca, streams data, runs analysis in real-time."""

    def __init__(self, config: Dict):
        self.config = config
        self.api_key = config["api_key"]
        self.secret_key = config["secret_key"]
        self.env = config.get("environment", "paper")
        self.symbol = config.get("symbol", "TQQQ")
        self.apex_account = config.get("apex_account", "50k")
        self.apex_balance = config.get("apex_balance", 50000.0)

        self.candles = CandleAggregator()
        self.detector = SetupDetector()
        self.dashboard = Dashboard()

        log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               "..", "assets", "trade-logs")
        self.logger = TradeLogger(log_dir)

        self.rest: Optional[AlpacaREST] = None
        self.stream: Optional[AlpacaStream] = None

        self._running = False
        self._last_price = 0.0
        self._new_bar_event = threading.Event()

    def run(self):
        """Main entry point."""
        check_dependencies()
        print("=" * 64)
        print("  NQ LIVE CO-PILOT (Alpaca) — Starting up...")
        print("=" * 64)

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

        # Verify credentials
        try:
            account = self.rest.get_account()
            print(f"  Account verified: {account.get('id', 'OK')}")
            print(f"  Paper equity: ${float(account.get('equity', 0)):,.2f}")
        except ConnectionError as e:
            print(f"  Auth failed: {e}", file=sys.stderr)
            print(f"\n  Check your API key and secret in the config file.", file=sys.stderr)
            sys.exit(1)

        # Connect WebSocket
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
            bars = self.rest.get_bars(self.symbol, timeframe="1Min", limit=200)
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
        print(f"  Subscribed. Waiting for market data...\n")

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
        pass  # Silently ignore — dashboard will show stale data

    def _analysis_loop(self):
        """Main analysis loop."""
        self._running = True

        # Wait for minimum data
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

                setups = self.detector.detect_all(analysis_1m, analysis_5m)

                account_info = {
                    "apex_account": self.apex_account,
                    "balance": self.apex_balance,
                }

                self.dashboard.render(
                    symbol=self.symbol,
                    price=price,
                    analysis_5m=analysis_5m or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
                    analysis_1m=analysis_1m or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
                    setups=setups,
                    account_info=account_info,
                    bar_count=self.candles.bar_count,
                )

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
        print("  Disconnected. Session ended.")


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
        description="Alpaca Live Connector — Real-Time NQ Trading Co-Pilot"
    )
    parser.add_argument("--config", required=True,
                        help="Path to Alpaca config JSON file")
    parser.add_argument("--symbol", default=None,
                        help="Symbol to track (default: TQQQ). Try QQQ, SPY, etc.")

    args = parser.parse_args()
    config = load_config(args.config)

    if args.symbol:
        config["symbol"] = args.symbol

    connector = LiveConnector(config)
    connector.run()


if __name__ == "__main__":
    main()
