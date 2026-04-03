#!/usr/bin/env python3
"""
Tradovate Live Connector - Real-Time NQ/MNQ Trading Co-Pilot

Connects to Tradovate for live market data and runs technical analysis
on 1m/5m candles in real-time. Monitors EOD drawdown, detects playbook
setups, and auto-logs trades.

Requirements:
    pip install websocket-client

Usage:
    python3 live_connector.py --config tradovate-config.json
    python3 live_connector.py --config tradovate-config.json --demo
    python3 live_connector.py --config tradovate-config.json --symbol MNQM6
"""

import argparse
import json
import os
import sys
import threading
import time
from datetime import datetime, timezone
from typing import Dict, List, Optional

# Allow imports from same directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from technical_analyzer import (
    analyze, calc_ema, calc_rsi, calc_macd, calc_bollinger,
    calc_atr, calc_vwap, find_support_resistance,
)
from tradovate_api import (
    TradovateREST, TradovateWebSocket, MarketDataClient,
    AccountMonitor, check_dependencies, ENVIRONMENTS,
)
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
        """Add a 1-minute bar. Keys: open, high, low, close, volume."""
        with self._lock:
            self._bars_1m.append(bar)
            if len(self._bars_1m) > self.MAX_BARS:
                self._bars_1m = self._bars_1m[-self.MAX_BARS:]
            self.last_bar_time = bar.get("datetime", "")

    def get_1m_candles(self) -> List[Dict]:
        with self._lock:
            return list(self._bars_1m)

    def get_5m_candles(self) -> List[Dict]:
        """Aggregate 1m bars into 5m bars."""
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
        # Handle remaining bars as partial candle
        remainder = len(bars) % 5
        if remainder > 0 and len(bars) >= 5:
            group = bars[-(remainder):]
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

        setups.extend(self._check_ema_pullback(price, ind_5m, ind_1m, sig_5m))
        setups.extend(self._check_vwap_bounce(price, ind_5m, ind_1m))
        setups.extend(self._check_bollinger_squeeze(price, ind_5m, sig_5m))
        setups.extend(self._check_macd_crossover(price, ind_5m, sig_5m))
        setups.extend(self._check_rsi_extreme(price, ind_5m, ind_1m))
        return setups

    def _check_ema_pullback(self, price, ind_5m, ind_1m, sig_5m):
        ema = ind_5m.get("ema", {})
        rsi = ind_5m.get("rsi", {})
        e9 = ema.get("ema_9")
        e21 = ema.get("ema_21")
        rsi_val = rsi.get("value") if isinstance(rsi, dict) else None
        if not all([e9, e21, rsi_val]):
            return []

        # Bullish pullback: EMA 9 > 21, price near 9 EMA, RSI > 45
        if e9 > e21 and abs(price - e9) < 3.0 and price >= e9 - 2.0 and rsi_val > 45:
            return [{
                "name": "EMA Pullback (Long)",
                "direction": "LONG",
                "confidence": "HIGH" if rsi_val > 50 else "MEDIUM",
                "entry": round(e9 + 0.5, 2),
                "stop": round(e21 - 1.0, 2),
                "target": round(price + abs(price - e21) * 2, 2),
                "description": f"5m EMA 9 ({e9:.2f}) > 21 ({e21:.2f}), price pulling back. RSI {rsi_val:.1f}",
            }]
        # Bearish pullback
        if e9 < e21 and abs(price - e9) < 3.0 and price <= e9 + 2.0 and rsi_val < 55:
            return [{
                "name": "EMA Pullback (Short)",
                "direction": "SHORT",
                "confidence": "HIGH" if rsi_val < 50 else "MEDIUM",
                "entry": round(e9 - 0.5, 2),
                "stop": round(e21 + 1.0, 2),
                "target": round(price - abs(price - e21) * 2, 2),
                "description": f"5m EMA 9 ({e9:.2f}) < 21 ({e21:.2f}), price rallying back. RSI {rsi_val:.1f}",
            }]
        return []

    def _check_vwap_bounce(self, price, ind_5m, ind_1m):
        vwap = ind_5m.get("vwap")
        rsi = ind_5m.get("rsi", {})
        rsi_val = rsi.get("value") if isinstance(rsi, dict) else None
        bb = ind_5m.get("bollinger", {})
        if not all([vwap, rsi_val]):
            return []

        near_vwap = abs(price - vwap) < 4.0
        neutral_rsi = 38 < rsi_val < 62
        narrow_bb = bb.get("width") and bb["width"] < 0.5

        if near_vwap and neutral_rsi:
            direction = "LONG" if price <= vwap else "SHORT"
            return [{
                "name": "VWAP Bounce",
                "direction": direction,
                "confidence": "MEDIUM" if narrow_bb else "LOW",
                "entry": round(vwap, 2),
                "stop": round(vwap - 8 if direction == "LONG" else vwap + 8, 2),
                "target": round(vwap + 12 if direction == "LONG" else vwap - 12, 2),
                "description": f"Price near VWAP ({vwap:.2f}), RSI neutral ({rsi_val:.1f}). Mean reversion setup.",
            }]
        return []

    def _check_bollinger_squeeze(self, price, ind_5m, sig_5m):
        bb = ind_5m.get("bollinger", {})
        width = bb.get("width")
        if width is None:
            return []
        if width < 0.3:
            return [{
                "name": "Bollinger Squeeze",
                "direction": "NEUTRAL",
                "confidence": "MEDIUM",
                "entry": round(price, 2),
                "stop": round(bb.get("lower", price - 10), 2),
                "target": round(bb.get("upper", price + 10), 2),
                "description": f"BB width {width:.4f}% — extremely tight. Breakout imminent. Wait for direction.",
            }]
        return []

    def _check_macd_crossover(self, price, ind_5m, sig_5m):
        macd = ind_5m.get("macd", {})
        m = macd.get("macd")
        s = macd.get("signal")
        h = macd.get("histogram")
        if not all(v is not None for v in [m, s, h]):
            return []

        # Fresh crossover: histogram near zero and crossed
        if abs(h) < 2.0 and abs(m - s) < 2.0:
            if m > s and h > 0:
                return [{
                    "name": "MACD Bullish Crossover",
                    "direction": "LONG",
                    "confidence": "MEDIUM",
                    "entry": round(price, 2),
                    "stop": round(price - 12, 2),
                    "target": round(price + 18, 2),
                    "description": f"MACD ({m:.2f}) crossing above signal ({s:.2f}). Histogram: {h:.2f}",
                }]
            elif m < s and h < 0:
                return [{
                    "name": "MACD Bearish Crossover",
                    "direction": "SHORT",
                    "confidence": "MEDIUM",
                    "entry": round(price, 2),
                    "stop": round(price + 12, 2),
                    "target": round(price - 18, 2),
                    "description": f"MACD ({m:.2f}) crossing below signal ({s:.2f}). Histogram: {h:.2f}",
                }]
        return []

    def _check_rsi_extreme(self, price, ind_5m, ind_1m):
        rsi_5m = ind_5m.get("rsi", {})
        rsi_val = rsi_5m.get("value") if isinstance(rsi_5m, dict) else None
        sr = ind_5m.get("support_resistance", {})
        if rsi_val is None:
            return []

        supports = sr.get("support", [])
        resistances = sr.get("resistance", [])

        if rsi_val < 30 and supports:
            nearest = supports[0]
            if abs(price - nearest) < 8:
                return [{
                    "name": "RSI Oversold at Support",
                    "direction": "LONG",
                    "confidence": "HIGH",
                    "entry": round(nearest + 1, 2),
                    "stop": round(nearest - 6, 2),
                    "target": round(nearest + 15, 2),
                    "description": f"RSI {rsi_val:.1f} oversold, price near support {nearest:.2f}. Bounce likely.",
                }]

        if rsi_val > 70 and resistances:
            nearest = resistances[0]
            if abs(price - nearest) < 8:
                return [{
                    "name": "RSI Overbought at Resistance",
                    "direction": "SHORT",
                    "confidence": "HIGH",
                    "entry": round(nearest - 1, 2),
                    "stop": round(nearest + 6, 2),
                    "target": round(nearest - 15, 2),
                    "description": f"RSI {rsi_val:.1f} overbought, price near resistance {nearest:.2f}. Rejection likely.",
                }]
        return []


# ---- Trade Logger -----------------------------------------------------

class TradeLogger:
    """Auto-logs fills to a daily markdown file."""

    def __init__(self, log_dir: str):
        self.log_dir = log_dir
        os.makedirs(log_dir, exist_ok=True)

    def _get_log_path(self) -> str:
        date_str = datetime.now().strftime("%Y-%m-%d")
        return os.path.join(self.log_dir, f"trades-{date_str}.md")

    def log_fill(self, fill: Dict):
        """Append a fill entry to today's trade log."""
        path = self._get_log_path()
        is_new = not os.path.exists(path)

        with open(path, "a") as f:
            if is_new:
                f.write(f"# Trade Log — {datetime.now().strftime('%Y-%m-%d')}\n\n")
                f.write("| Time | Side | Qty | Price | P&L |\n")
                f.write("|------|------|-----|-------|-----|\n")

            ts = fill.get("timestamp", datetime.now().isoformat())
            side = "BUY" if fill.get("action") == "Buy" else "SELL"
            qty = fill.get("qty", fill.get("filledQty", "?"))
            price = fill.get("price", fill.get("fillPrice", "?"))
            pnl = fill.get("realizedPnl", "")
            pnl_str = f"${pnl:+.2f}" if isinstance(pnl, (int, float)) else ""

            f.write(f"| {ts} | {side} | {qty} | {price} | {pnl_str} |\n")


# ---- Terminal Dashboard -----------------------------------------------

class Dashboard:
    """Terminal display for live trading co-pilot."""

    @staticmethod
    def clear():
        print("\033[2J\033[H", end="", flush=True)

    def render(self, symbol: str, price: float, analysis_5m: Dict,
               analysis_1m: Dict, setups: List[Dict], account_info: Dict,
               positions: list, fills_today: int, bar_count: int):
        """Render the full dashboard."""
        self.clear()
        now = datetime.now()

        # Header
        print("=" * 64)
        print(f"  NQ LIVE CO-PILOT  |  {symbol}  {price:.2f}  |  {now.strftime('%H:%M:%S ET')}")
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

        print(f"  EOD Drawdown: ${dd_limit:,.0f}  |  Floor: ${floor:,.0f}  |  "
              f"Remaining: ${remaining:,.0f}  |  {status}")
        print(f"  Balance: ${balance:,.2f}  |  Account: {apex_acct.upper()}  |  "
              f"Bars: {bar_count}  |  Fills: {fills_today}")
        print("-" * 64)

        # 5-min Signals
        sig_5m = analysis_5m.get("signals", {})
        ind_5m = analysis_5m.get("indicators", {})
        bias = analysis_5m.get("overall_bias", "N/A")

        print(f"  5min BIAS: {bias}")
        if sig_5m.get("trend"):
            print(f"    Trend:    {sig_5m['trend']}")
        if sig_5m.get("rsi"):
            rsi_val = ind_5m.get("rsi", {}).get("value", "?")
            print(f"    RSI:      {rsi_val} — {sig_5m['rsi']}")
        if sig_5m.get("macd"):
            print(f"    MACD:     {sig_5m['macd']}")
        if sig_5m.get("vwap"):
            vwap_val = ind_5m.get("vwap", "?")
            print(f"    VWAP:     {vwap_val} — {sig_5m['vwap']}")
        if sig_5m.get("bollinger"):
            print(f"    BB:       {sig_5m['bollinger']}")
        if sig_5m.get("stochastic"):
            print(f"    Stoch:    {sig_5m['stochastic']}")

        # ATR
        atr = ind_5m.get("atr", {})
        if atr and isinstance(atr, dict):
            print(f"    ATR(14):  {atr.get('value', '?')} pts (${atr.get('nq_dollars', '?')}/ct)")

        print("-" * 64)

        # 1-min Signals (compact)
        sig_1m = analysis_1m.get("signals", {})
        bias_1m = analysis_1m.get("overall_bias", "N/A")
        print(f"  1min BIAS: {bias_1m}", end="")
        if sig_1m.get("rsi"):
            print(f"  |  RSI: {sig_1m['rsi']}", end="")
        if sig_1m.get("vwap"):
            print(f"  |  {sig_1m['vwap']}", end="")
        print()
        print("-" * 64)

        # Key Levels
        sr = ind_5m.get("support_resistance", {})
        pivots = ind_5m.get("pivot_points", {})
        if sr.get("resistance"):
            print(f"  Resistance: {', '.join(f'{r:.2f}' for r in sr['resistance'][:3])}")
        if pivots.get("pp"):
            print(f"  Pivot:      {pivots['pp']:.2f}  (R1: {pivots.get('r1','?')}  S1: {pivots.get('s1','?')})")
        if sr.get("support"):
            print(f"  Support:    {', '.join(f'{s:.2f}' for s in sr['support'][:3])}")
        print("-" * 64)

        # Active Setups
        if setups:
            print("  ** SETUP ALERTS **")
            for s in setups[:3]:
                conf = s["confidence"]
                print(f"  [{conf}] {s['name']} — {s['direction']}")
                print(f"    Entry: {s['entry']}  Stop: {s['stop']}  Target: {s['target']}")
                print(f"    {s['description']}")
        else:
            print("  No active setups detected. Watching...")

        # Open Position
        if positions:
            for pos in positions:
                net = pos.get("netPos", 0)
                if net != 0:
                    side = "LONG" if net > 0 else "SHORT"
                    pnl = pos.get("unrealizedPnl", 0)
                    print("-" * 64)
                    print(f"  OPEN: {side} {abs(net)} @ avg {pos.get('netPrice', '?')}"
                          f"  |  Unrealized: ${pnl:+,.2f}")

        print("=" * 64)
        print("  Press Ctrl+C to stop")


# ---- Live Connector (Main Orchestrator) --------------------------------

class LiveConnector:
    """Main orchestrator: connects to Tradovate, streams data, runs analysis."""

    def __init__(self, config: Dict):
        self.config = config
        self.env = config.get("environment", "demo")
        self.symbol = config.get("symbol", "NQM6")
        self.apex_account = config.get("apex_account", "50k")
        self.apex_balance = config.get("apex_balance", 50000.0)

        self.candles = CandleAggregator()
        self.detector = SetupDetector()
        self.dashboard = Dashboard()

        log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               "..", "assets", "trade-logs")
        self.logger = TradeLogger(log_dir)

        self.rest: Optional[TradovateREST] = None
        self.md_ws: Optional[TradovateWebSocket] = None
        self.md_client: Optional[MarketDataClient] = None
        self.account_monitor: Optional[AccountMonitor] = None

        self._running = False
        self._last_price = 0.0
        self._fills_today = 0
        self._positions: list = []
        self._new_bar_event = threading.Event()

    def run(self):
        """Main entry point."""
        check_dependencies()
        print("=" * 64)
        print("  NQ LIVE CO-PILOT — Starting up...")
        print("=" * 64)

        try:
            self._authenticate()
            self._connect_market_data()
            self._start_account_monitor()
            self._analysis_loop()
        except KeyboardInterrupt:
            print("\n  Shutting down gracefully...")
        except ConnectionError as e:
            print(f"\n  Connection error: {e}", file=sys.stderr)
            sys.exit(1)
        finally:
            self._cleanup()

    def _authenticate(self):
        """Authenticate with Tradovate REST API."""
        print(f"  Connecting to Tradovate ({self.env})...")
        self.rest = TradovateREST(env=self.env)

        self.rest.authenticate(
            name=self.config["username"],
            password=self.config["password"],
            app_id=self.config.get("app_id", "NQAnalyzer"),
            app_version=self.config.get("app_version", "1.0"),
            cid=self.config.get("cid"),
            sec=self.config.get("sec"),
        )
        print(f"  Authenticated as user {self.rest.user_id}")

    def _connect_market_data(self):
        """Connect to market data WebSocket and subscribe."""
        md_url = ENVIRONMENTS[self.env]["md"]
        token = self.rest.md_access_token or self.rest.access_token

        print(f"  Connecting to market data WebSocket...")
        self.md_ws = TradovateWebSocket(
            url=md_url,
            token=token,
            on_message=self._on_market_data,
            label="MD",
        )
        self.md_ws.connect()
        print(f"  Market data connected and authorized")

        self.md_client = MarketDataClient(self.md_ws)

        print(f"  Subscribing to {self.symbol} 1-min chart...")
        result = self.md_client.subscribe_chart(
            symbol=self.symbol,
            timeframe_min=1,
            bar_count=200,
        )
        if result:
            print(f"  Chart subscription active")
        else:
            print(f"  Warning: Chart subscription response was empty (may still work)")

        # Also subscribe to real-time quotes for live price
        self.md_client.subscribe_quote(self.symbol)
        print(f"  Quote subscription active")

    def _start_account_monitor(self):
        """Start polling account data."""
        try:
            accounts = self.rest.get_accounts()
            if accounts:
                acct_id = accounts[0].get("id")
                print(f"  Monitoring account ID: {acct_id}")
                self.account_monitor = AccountMonitor(
                    rest=self.rest, account_id=acct_id, poll_interval=5.0
                )
                self.account_monitor.on_new_fill = self._on_fill
                self.account_monitor.on_position_update = self._on_position_update
                self.account_monitor.start()
            else:
                print(f"  Warning: No accounts found (account monitoring disabled)")
        except Exception as e:
            print(f"  Warning: Could not start account monitor: {e}")

    def _on_market_data(self, msg: Dict):
        """Handle incoming market data messages."""
        if not isinstance(msg, dict):
            return

        # Handle chart bar data
        # Tradovate sends chart data in various formats; handle common ones
        charts = msg.get("charts") or msg.get("d") or msg.get("_body")
        if isinstance(charts, list):
            for chart in charts:
                bars = chart.get("bars") if isinstance(chart, dict) else None
                if isinstance(bars, list):
                    for bar_data in bars:
                        self._process_bar(bar_data)

        # Single bar update
        if "high" in msg and "low" in msg and "close" in msg:
            self._process_bar(msg)

        # Quote data for live price
        if "entries" in msg:
            entries = msg["entries"]
            if isinstance(entries, dict):
                trade = entries.get("Trade", {})
                if "price" in trade:
                    self._last_price = float(trade["price"])

        # Direct price in message
        if "price" in msg and "high" not in msg:
            try:
                self._last_price = float(msg["price"])
            except (ValueError, TypeError):
                pass

    def _process_bar(self, bar_data: Dict):
        """Process a single bar from market data."""
        try:
            bar = {
                "open": float(bar_data.get("open", bar_data.get("o", 0))),
                "high": float(bar_data.get("high", bar_data.get("h", 0))),
                "low": float(bar_data.get("low", bar_data.get("l", 0))),
                "close": float(bar_data.get("close", bar_data.get("c", 0))),
                "volume": int(bar_data.get("volume", bar_data.get("v", 0))),
            }
            ts = bar_data.get("timestamp", bar_data.get("t", ""))
            if ts:
                bar["datetime"] = str(ts)

            if bar["close"] > 0:
                self.candles.add_bar(bar)
                self._last_price = bar["close"]
                self._new_bar_event.set()
        except (ValueError, TypeError, KeyError):
            pass

    def _on_fill(self, fill: Dict):
        """Handle a new fill from account monitor."""
        self._fills_today += 1
        self.logger.log_fill(fill)

    def _on_position_update(self, positions: list):
        """Handle position updates."""
        self._positions = positions

    def _analysis_loop(self):
        """Main analysis loop running in the main thread."""
        self._running = True
        print(f"\n  Live analysis started. Waiting for bars...\n")

        # Initial wait for data
        while self._running and self.candles.bar_count < 5:
            time.sleep(1)
            if self.candles.bar_count > 0:
                print(f"  Received {self.candles.bar_count} bars so far...", end="\r")

        while self._running:
            try:
                bars_1m = self.candles.get_1m_candles()
                bars_5m = self.candles.get_5m_candles()

                if not bars_1m:
                    time.sleep(1)
                    continue

                price = self._last_price or bars_1m[-1]["close"]

                # Run analysis
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

                # Detect setups
                setups = self.detector.detect_all(analysis_1m, analysis_5m)

                # Account info
                account_info = {
                    "apex_account": self.apex_account,
                    "balance": self.apex_balance,
                }

                # Render
                self.dashboard.render(
                    symbol=self.symbol,
                    price=price,
                    analysis_5m=analysis_5m or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
                    analysis_1m=analysis_1m or {"signals": {}, "indicators": {}, "overall_bias": "Waiting..."},
                    setups=setups,
                    account_info=account_info,
                    positions=self._positions,
                    fills_today=self._fills_today,
                    bar_count=self.candles.bar_count,
                )

                # Wait for next bar or timeout
                self._new_bar_event.clear()
                self._new_bar_event.wait(timeout=2.0)

            except KeyboardInterrupt:
                raise
            except Exception as e:
                print(f"\n  Analysis error: {e}")
                time.sleep(2)

    def _cleanup(self):
        """Clean up connections."""
        self._running = False
        if self.account_monitor:
            self.account_monitor.stop()
        if self.md_ws:
            self.md_ws.close()
        print("  Disconnected. Session ended.")


# ---- Config Loading ----------------------------------------------------

def load_config(path: str) -> Dict:
    """Load config from JSON file."""
    with open(path, "r") as f:
        config = json.load(f)

    required = ["username", "password"]
    missing = [k for k in required if k not in config]
    if missing:
        print(f"Error: Missing required config keys: {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)

    return config


# ---- Main Entry Point --------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Tradovate Live Connector — Real-Time NQ/MNQ Trading Co-Pilot"
    )
    parser.add_argument("--config", required=True,
                        help="Path to Tradovate config JSON file")
    parser.add_argument("--demo", action="store_true",
                        help="Force demo environment (overrides config)")
    parser.add_argument("--symbol",
                        help="Override symbol (e.g., NQM6, MNQM6)")

    args = parser.parse_args()

    config = load_config(args.config)

    if args.demo:
        config["environment"] = "demo"
    if args.symbol:
        config["symbol"] = args.symbol

    connector = LiveConnector(config)
    connector.run()


if __name__ == "__main__":
    main()
