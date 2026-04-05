#!/usr/bin/env python3
"""
NQ/MNQ Backtester — Test Playbook Setups Against Historical Data

Runs every playbook setup against historical 1m/5m NQ price data and
reports actual win rates, P&L, expectancy, best times, and equity curves.

Usage:
    python3 backtester.py prices.csv
    python3 backtester.py prices.csv --setup ema_pullback
    python3 backtester.py prices.csv --account 50k --risk-pct 25
    python3 backtester.py prices.csv --format json
    python3 backtester.py prices.csv --export results.csv
"""

import argparse
import csv
import json
import math
import os
import sys
from datetime import datetime
from typing import Dict, List, Optional, Tuple

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from technical_analyzer import (
    analyze, calc_ema, calc_rsi, calc_macd, calc_bollinger,
    calc_atr, calc_vwap, find_support_resistance,
)
from risk_manager import APEX_ACCOUNTS

NQ_POINT_VALUE = 20.00
MNQ_POINT_VALUE = 2.00


# ═══════════════════════════════════════════════════════════════════════
# DATA LOADING
# ═══════════════════════════════════════════════════════════════════════

def load_price_data(filepath: str) -> List[Dict]:
    """Load OHLCV data from CSV. Handles multiple column naming conventions."""
    rows = []
    with open(filepath, "r", newline="") as f:
        reader = csv.DictReader(f)
        col_map = {col.lower().strip(): col for col in reader.fieldnames or []}

        for row in reader:
            try:
                entry = {
                    "open": float(row[col_map.get("open", col_map.get("o", "open"))]),
                    "high": float(row[col_map.get("high", col_map.get("h", "high"))]),
                    "low": float(row[col_map.get("low", col_map.get("l", "low"))]),
                    "close": float(row[col_map.get("close", col_map.get("c", "close"))]),
                    "volume": int(float(row.get(col_map.get("volume", col_map.get("v", "volume")), "0") or "0")),
                }
                dt_col = col_map.get("datetime", col_map.get("date", col_map.get("time", col_map.get("t", ""))))
                if dt_col and row.get(dt_col):
                    entry["datetime"] = row[dt_col]
                rows.append(entry)
            except (ValueError, KeyError):
                continue
    return rows


def aggregate_to_5m(bars_1m: List[Dict]) -> List[Dict]:
    """Aggregate 1-min bars into 5-min bars."""
    candles = []
    for i in range(0, len(bars_1m) - 4, 5):
        group = bars_1m[i:i + 5]
        candle = {
            "open": group[0]["open"],
            "high": max(b["high"] for b in group),
            "low": min(b["low"] for b in group),
            "close": group[-1]["close"],
            "volume": sum(b.get("volume", 0) for b in group),
            "_bar_index": i,
        }
        if "datetime" in group[0]:
            candle["datetime"] = group[0]["datetime"]
        candles.append(candle)
    return candles


# ═══════════════════════════════════════════════════════════════════════
# TRADE SIMULATION ENGINE
# ═══════════════════════════════════════════════════════════════════════

class Trade:
    """Represents a single simulated trade."""

    def __init__(self, setup: str, direction: str, entry_price: float,
                 stop_price: float, target_price: float, entry_bar: int,
                 contracts: int = 1, entry_time: str = "",
                 confluence_score: int = 50):
        self.setup = setup
        self.direction = direction
        self.entry_price = entry_price
        self.stop_price = stop_price
        self.target_price = target_price
        self.entry_bar = entry_bar
        self.contracts = contracts
        self.entry_time = entry_time
        self.confluence_score = confluence_score

        self.exit_price: Optional[float] = None
        self.exit_bar: Optional[int] = None
        self.exit_time: str = ""
        self.exit_reason: str = ""
        self.pnl: float = 0.0
        self.pnl_points: float = 0.0
        self.bars_held: int = 0
        self.max_favorable: float = 0.0
        self.max_adverse: float = 0.0
        self.won: bool = False

    def close(self, exit_price: float, exit_bar: int, reason: str,
              exit_time: str = "", point_value: float = NQ_POINT_VALUE):
        self.exit_price = exit_price
        self.exit_bar = exit_bar
        self.exit_reason = reason
        self.exit_time = exit_time
        self.bars_held = exit_bar - self.entry_bar

        if self.direction == "LONG":
            self.pnl_points = exit_price - self.entry_price
        else:
            self.pnl_points = self.entry_price - exit_price

        self.pnl = self.pnl_points * point_value * self.contracts
        self.won = self.pnl > 0

    def to_dict(self) -> Dict:
        return {
            "setup": self.setup,
            "direction": self.direction,
            "entry_price": self.entry_price,
            "stop_price": self.stop_price,
            "target_price": self.target_price,
            "exit_price": self.exit_price,
            "entry_time": self.entry_time,
            "exit_time": self.exit_time,
            "exit_reason": self.exit_reason,
            "pnl_points": round(self.pnl_points, 2),
            "pnl_dollars": round(self.pnl, 2),
            "bars_held": self.bars_held,
            "max_favorable": round(self.max_favorable, 2),
            "max_adverse": round(self.max_adverse, 2),
            "won": self.won,
            "contracts": self.contracts,
            "confluence_score": self.confluence_score,
        }


def simulate_trade(trade: Trade, bars: List[Dict], max_bars: int = 60,
                   point_value: float = NQ_POINT_VALUE) -> Trade:
    """Simulate a trade forward through price bars.

    Checks each bar for stop hit, target hit, or time exit.
    Tracks max favorable/adverse excursion.
    """
    for i in range(trade.entry_bar + 1, min(trade.entry_bar + max_bars + 1, len(bars))):
        bar = bars[i]
        high = bar["high"]
        low = bar["low"]

        # Track excursions
        if trade.direction == "LONG":
            favorable = high - trade.entry_price
            adverse = trade.entry_price - low
        else:
            favorable = trade.entry_price - low
            adverse = high - trade.entry_price

        trade.max_favorable = max(trade.max_favorable, favorable)
        trade.max_adverse = max(trade.max_adverse, adverse)

        # Check stop hit (check stop FIRST — worst case assumption)
        if trade.direction == "LONG" and low <= trade.stop_price:
            trade.close(trade.stop_price, i, "STOP", bar.get("datetime", ""), point_value)
            return trade
        elif trade.direction == "SHORT" and high >= trade.stop_price:
            trade.close(trade.stop_price, i, "STOP", bar.get("datetime", ""), point_value)
            return trade

        # Check target hit
        if trade.direction == "LONG" and high >= trade.target_price:
            trade.close(trade.target_price, i, "TARGET", bar.get("datetime", ""), point_value)
            return trade
        elif trade.direction == "SHORT" and low <= trade.target_price:
            trade.close(trade.target_price, i, "TARGET", bar.get("datetime", ""), point_value)
            return trade

    # Time exit — close at last bar's close
    last_bar = min(trade.entry_bar + max_bars, len(bars) - 1)
    trade.close(bars[last_bar]["close"], last_bar, "TIME_EXIT",
                bars[last_bar].get("datetime", ""), point_value)
    return trade


# ═══════════════════════════════════════════════════════════════════════
# SETUP SCANNERS — Detect entries from indicator data
# ═══════════════════════════════════════════════════════════════════════

def compute_indicators_at(bars: List[Dict], idx: int, lookback: int = 200) -> Dict:
    """Compute indicators using bars up to index idx."""
    start = max(0, idx - lookback)
    window = bars[start:idx + 1]
    if len(window) < 20:
        return {}
    try:
        return analyze(window)
    except Exception:
        return {}


class SetupScanner:
    """Scans historical bars for all playbook setup entries."""

    def __init__(self, bars_1m: List[Dict], bars_5m: List[Dict],
                 instrument: str = "NQ"):
        self.bars_1m = bars_1m
        self.bars_5m = bars_5m
        self.point_value = NQ_POINT_VALUE if instrument == "NQ" else MNQ_POINT_VALUE

    def scan_all(self, setups: List[str] = None) -> List[Trade]:
        """Scan for all setup types and return list of trades."""
        all_setups = {
            "ema_pullback": self._scan_ema_pullback,
            "vwap_bounce": self._scan_vwap_bounce,
            "macd_crossover": self._scan_macd_crossover,
            "rsi_extreme": self._scan_rsi_extreme,
            "bollinger_squeeze": self._scan_bollinger_squeeze,
            "opening_range_breakout": self._scan_orb,
        }

        to_scan = setups or list(all_setups.keys())
        trades = []

        for setup_name in to_scan:
            if setup_name in all_setups:
                found = all_setups[setup_name]()
                trades.extend(found)

        # Sort by entry bar index
        trades.sort(key=lambda t: t.entry_bar)
        return trades

    def _scan_ema_pullback(self) -> List[Trade]:
        """Scan for EMA pullback setups on 5m bars, enter on 1m."""
        trades = []
        closes_5m = [b["close"] for b in self.bars_5m]
        if len(closes_5m) < 25:
            return trades

        ema9 = calc_ema(closes_5m, 9)
        ema21 = calc_ema(closes_5m, 21)
        rsi = calc_rsi(closes_5m, 14)

        for i in range(25, len(self.bars_5m) - 1):
            e9, e21, r = ema9[i], ema21[i], rsi[i]
            if not all([e9, e21, r]):
                continue
            price = closes_5m[i]
            proximity = 3.0  # points

            score = 50
            # Bullish pullback
            if e9 > e21 and abs(price - e9) < proximity and price >= e9 - 2.0 and r > 45:
                stop = round(e21 - 1.0, 2)
                target = round(price + abs(price - e21) * 2, 2)
                entry = round(e9 + 0.25, 2)

                # Confluence scoring
                score = 50
                if r > 50: score += 10
                if r > 55: score += 5
                if price > e9: score += 10
                if abs(e9 - e21) > 5: score += 10  # Strong trend spacing
                atr_window = self.bars_5m[max(0,i-14):i+1]
                if len(atr_window) > 5:
                    avg_range = sum(b["high"]-b["low"] for b in atr_window) / len(atr_window)
                    if self.bars_5m[i]["high"] - self.bars_5m[i]["low"] < avg_range * 0.8:
                        score += 10  # Low volatility pullback candle

                bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                if bar_idx < len(self.bars_1m) - 1:
                    trades.append(Trade(
                        "ema_pullback", "LONG", entry, stop, target,
                        bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                        confluence_score=min(score, 100)
                    ))

            # Bearish pullback
            elif e9 < e21 and abs(price - e9) < proximity and price <= e9 + 2.0 and r < 55:
                stop = round(e21 + 1.0, 2)
                target = round(price - abs(price - e21) * 2, 2)
                entry = round(e9 - 0.25, 2)

                score = 50
                if r < 50: score += 10
                if r < 45: score += 5
                if price < e9: score += 10
                if abs(e9 - e21) > 5: score += 10

                bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                if bar_idx < len(self.bars_1m) - 1:
                    trades.append(Trade(
                        "ema_pullback", "SHORT", entry, stop, target,
                        bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                        confluence_score=min(score, 100)
                    ))
        return trades

    def _scan_vwap_bounce(self) -> List[Trade]:
        """Scan for VWAP bounce setups."""
        trades = []
        vwap = calc_vwap(self.bars_5m)
        closes = [b["close"] for b in self.bars_5m]
        rsi = calc_rsi(closes, 14)

        for i in range(20, len(self.bars_5m) - 1):
            v, r = vwap[i], rsi[i]
            if not all([v, r]):
                continue
            price = closes[i]

            if abs(price - v) < 4.0 and 38 < r < 62:
                score = 45
                if 42 < r < 58: score += 10
                if abs(price - v) < 2.0: score += 15
                # Check if price bounced (prev bar was further from VWAP)
                if i > 0 and vwap[i-1] and abs(closes[i-1] - vwap[i-1]) > abs(price - v):
                    score += 10

                if price <= v:
                    entry = round(v, 2)
                    stop = round(v - 8, 2)
                    target = round(v + 12, 2)
                    direction = "LONG"
                else:
                    entry = round(v, 2)
                    stop = round(v + 8, 2)
                    target = round(v - 12, 2)
                    direction = "SHORT"

                bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                if bar_idx < len(self.bars_1m) - 1:
                    trades.append(Trade(
                        "vwap_bounce", direction, entry, stop, target,
                        bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                        confluence_score=min(score, 100)
                    ))
        return trades

    def _scan_macd_crossover(self) -> List[Trade]:
        """Scan for MACD crossover setups."""
        trades = []
        closes = [b["close"] for b in self.bars_5m]
        macd_data = calc_macd(closes)
        macd_line = macd_data["macd"]
        signal_line = macd_data["signal"]
        histogram = macd_data["histogram"]

        for i in range(30, len(self.bars_5m) - 1):
            m, s, h = macd_line[i], signal_line[i], histogram[i]
            prev_h = histogram[i - 1] if i > 0 else None
            if not all(v is not None for v in [m, s, h, prev_h]):
                continue

            price = closes[i]
            # Fresh bullish crossover (histogram flipped positive)
            if h > 0 and prev_h <= 0 and abs(h) < 3.0:
                score = 50
                if abs(m) < 5: score += 10  # Near zero line
                bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                if bar_idx < len(self.bars_1m) - 1:
                    trades.append(Trade(
                        "macd_crossover", "LONG", price,
                        round(price - 12, 2), round(price + 18, 2),
                        bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                        confluence_score=score
                    ))

            # Fresh bearish crossover
            elif h < 0 and prev_h >= 0 and abs(h) < 3.0:
                score = 50
                if abs(m) < 5: score += 10
                bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                if bar_idx < len(self.bars_1m) - 1:
                    trades.append(Trade(
                        "macd_crossover", "SHORT", price,
                        round(price + 12, 2), round(price - 18, 2),
                        bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                        confluence_score=score
                    ))
        return trades

    def _scan_rsi_extreme(self) -> List[Trade]:
        """Scan for RSI extreme setups at support/resistance."""
        trades = []
        closes = [b["close"] for b in self.bars_5m]
        rsi = calc_rsi(closes, 14)

        for i in range(30, len(self.bars_5m) - 1):
            r = rsi[i]
            if r is None:
                continue
            price = closes[i]

            sr = find_support_resistance(self.bars_5m[max(0,i-50):i+1])
            supports = sr.get("support", [])
            resistances = sr.get("resistance", [])

            if r < 30 and supports:
                nearest = supports[0]
                if abs(price - nearest) < 8:
                    score = 60
                    if r < 25: score += 15
                    if abs(price - nearest) < 4: score += 10
                    bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                    if bar_idx < len(self.bars_1m) - 1:
                        trades.append(Trade(
                            "rsi_extreme", "LONG", round(nearest + 1, 2),
                            round(nearest - 6, 2), round(nearest + 15, 2),
                            bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                            confluence_score=min(score, 100)
                        ))

            elif r > 70 and resistances:
                nearest = resistances[0]
                if abs(price - nearest) < 8:
                    score = 60
                    if r > 75: score += 15
                    if abs(price - nearest) < 4: score += 10
                    bar_idx = self.bars_5m[i].get("_bar_index", i * 5)
                    if bar_idx < len(self.bars_1m) - 1:
                        trades.append(Trade(
                            "rsi_extreme", "SHORT", round(nearest - 1, 2),
                            round(nearest + 6, 2), round(nearest - 15, 2),
                            bar_idx, entry_time=self.bars_5m[i].get("datetime", ""),
                            confluence_score=min(score, 100)
                        ))
        return trades

    def _scan_bollinger_squeeze(self) -> List[Trade]:
        """Scan for Bollinger Band squeeze breakouts."""
        trades = []
        closes = [b["close"] for b in self.bars_5m]
        bb = calc_bollinger(closes)
        width = bb["width"]

        for i in range(25, len(self.bars_5m) - 2):
            w = width[i]
            if w is None:
                continue

            # Squeeze: width < 0.3% then next bar breaks out
            if w < 0.3 and i + 1 < len(self.bars_5m):
                next_bar = self.bars_5m[i + 1]
                upper = bb["upper"][i]
                lower = bb["lower"][i]
                if upper is None or lower is None:
                    continue

                score = 55
                if w < 0.2: score += 10

                # Breakout direction based on next bar
                if next_bar["close"] > upper:
                    bar_idx = self.bars_5m[i + 1].get("_bar_index", (i + 1) * 5)
                    if bar_idx < len(self.bars_1m) - 1:
                        trades.append(Trade(
                            "bollinger_squeeze", "LONG", next_bar["close"],
                            round(lower, 2), round(next_bar["close"] + (upper - lower), 2),
                            bar_idx, entry_time=next_bar.get("datetime", ""),
                            confluence_score=min(score, 100)
                        ))
                elif next_bar["close"] < lower:
                    bar_idx = self.bars_5m[i + 1].get("_bar_index", (i + 1) * 5)
                    if bar_idx < len(self.bars_1m) - 1:
                        trades.append(Trade(
                            "bollinger_squeeze", "SHORT", next_bar["close"],
                            round(upper, 2), round(next_bar["close"] - (upper - lower), 2),
                            bar_idx, entry_time=next_bar.get("datetime", ""),
                            confluence_score=min(score, 100)
                        ))
        return trades

    def _scan_orb(self) -> List[Trade]:
        """Scan for Opening Range Breakout (first 15 bars = 15 min)."""
        trades = []
        # Group bars by day (simplified: every 390 bars for RTH)
        day_size = 390  # approximate bars in a trading day
        for day_start in range(0, len(self.bars_1m) - day_size, day_size):
            # First 15 bars = opening range
            opening = self.bars_1m[day_start:day_start + 15]
            if len(opening) < 15:
                continue
            or_high = max(b["high"] for b in opening)
            or_low = min(b["low"] for b in opening)
            or_range = or_high - or_low
            if or_range < 3:  # Too tight
                continue

            score = 55
            if or_range > 10: score += 10
            if or_range > 20: score += 5

            # Check for breakout in next 30 bars
            for i in range(day_start + 15, min(day_start + 45, len(self.bars_1m) - 1)):
                bar = self.bars_1m[i]
                if bar["close"] > or_high:
                    trades.append(Trade(
                        "opening_range_breakout", "LONG", bar["close"],
                        round(or_low + or_range * 0.5, 2),
                        round(or_high + or_range, 2),
                        i, entry_time=bar.get("datetime", ""),
                        confluence_score=score
                    ))
                    break
                elif bar["close"] < or_low:
                    trades.append(Trade(
                        "opening_range_breakout", "SHORT", bar["close"],
                        round(or_high - or_range * 0.5, 2),
                        round(or_low - or_range, 2),
                        i, entry_time=bar.get("datetime", ""),
                        confluence_score=score
                    ))
                    break
        return trades


# ═══════════════════════════════════════════════════════════════════════
# PERFORMANCE ANALYTICS
# ═══════════════════════════════════════════════════════════════════════

def analyze_performance(trades: List[Trade], initial_balance: float = 50000,
                        drawdown_limit: float = 2500) -> Dict:
    """Comprehensive performance analytics on completed trades."""
    if not trades:
        return {"error": "No trades to analyze"}

    winners = [t for t in trades if t.won]
    losers = [t for t in trades if not t.won]

    total_pnl = sum(t.pnl for t in trades)
    gross_profit = sum(t.pnl for t in winners) if winners else 0
    gross_loss = sum(t.pnl for t in losers) if losers else 0

    win_rate = len(winners) / len(trades) * 100
    avg_winner = gross_profit / len(winners) if winners else 0
    avg_loser = gross_loss / len(losers) if losers else 0
    avg_win_pts = sum(t.pnl_points for t in winners) / len(winners) if winners else 0
    avg_loss_pts = sum(t.pnl_points for t in losers) / len(losers) if losers else 0

    # Expectancy (avg $ per trade)
    expectancy = total_pnl / len(trades)

    # Profit factor
    profit_factor = abs(gross_profit / gross_loss) if gross_loss != 0 else float("inf")

    # Max consecutive wins/losses
    max_consec_wins = 0
    max_consec_losses = 0
    current_wins = 0
    current_losses = 0
    for t in trades:
        if t.won:
            current_wins += 1
            current_losses = 0
            max_consec_wins = max(max_consec_wins, current_wins)
        else:
            current_losses += 1
            current_wins = 0
            max_consec_losses = max(max_consec_losses, current_losses)

    # Equity curve and drawdown
    equity = [initial_balance]
    peak = initial_balance
    max_drawdown = 0
    max_drawdown_pct = 0

    for t in trades:
        new_equity = equity[-1] + t.pnl
        equity.append(new_equity)
        if new_equity > peak:
            peak = new_equity
        dd = peak - new_equity
        if dd > max_drawdown:
            max_drawdown = dd
            max_drawdown_pct = (dd / peak) * 100

    # Would you have survived Apex?
    apex_survived = max_drawdown < drawdown_limit
    min_equity = min(equity)

    # Per-setup breakdown
    setup_stats = {}
    setup_names = set(t.setup for t in trades)
    for setup in setup_names:
        s_trades = [t for t in trades if t.setup == setup]
        s_winners = [t for t in s_trades if t.won]
        s_pnl = sum(t.pnl for t in s_trades)
        s_avg_winner = sum(t.pnl for t in s_winners) / len(s_winners) if s_winners else 0
        s_losers = [t for t in s_trades if not t.won]
        s_avg_loser = sum(t.pnl for t in s_losers) / len(s_losers) if s_losers else 0
        setup_stats[setup] = {
            "trades": len(s_trades),
            "winners": len(s_winners),
            "win_rate": round(len(s_winners) / len(s_trades) * 100, 1) if s_trades else 0,
            "total_pnl": round(s_pnl, 2),
            "avg_winner": round(s_avg_winner, 2),
            "avg_loser": round(s_avg_loser, 2),
            "expectancy": round(s_pnl / len(s_trades), 2) if s_trades else 0,
        }

    # Confluence score analysis
    score_brackets = {"0-40": [], "41-60": [], "61-80": [], "81-100": []}
    for t in trades:
        s = t.confluence_score
        if s <= 40: score_brackets["0-40"].append(t)
        elif s <= 60: score_brackets["41-60"].append(t)
        elif s <= 80: score_brackets["61-80"].append(t)
        else: score_brackets["81-100"].append(t)

    score_analysis = {}
    for bracket, btrades in score_brackets.items():
        if btrades:
            bwinners = [t for t in btrades if t.won]
            score_analysis[bracket] = {
                "trades": len(btrades),
                "win_rate": round(len(bwinners) / len(btrades) * 100, 1),
                "total_pnl": round(sum(t.pnl for t in btrades), 2),
                "avg_pnl": round(sum(t.pnl for t in btrades) / len(btrades), 2),
            }

    # Time-of-day analysis (if datetime available)
    hour_stats = {}
    for t in trades:
        if t.entry_time:
            try:
                # Try to parse hour from various formats
                for fmt in ["%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S", "%H:%M:%S", "%H:%M"]:
                    try:
                        dt = datetime.strptime(t.entry_time[:19], fmt)
                        hour = dt.hour
                        if hour not in hour_stats:
                            hour_stats[hour] = {"trades": 0, "wins": 0, "pnl": 0}
                        hour_stats[hour]["trades"] += 1
                        if t.won:
                            hour_stats[hour]["wins"] += 1
                        hour_stats[hour]["pnl"] += t.pnl
                        break
                    except ValueError:
                        continue
            except Exception:
                pass

    for h in hour_stats:
        s = hour_stats[h]
        s["win_rate"] = round(s["wins"] / s["trades"] * 100, 1) if s["trades"] else 0
        s["pnl"] = round(s["pnl"], 2)

    # Exit reason breakdown
    exit_reasons = {}
    for t in trades:
        r = t.exit_reason
        if r not in exit_reasons:
            exit_reasons[r] = {"count": 0, "pnl": 0}
        exit_reasons[r]["count"] += 1
        exit_reasons[r]["pnl"] += t.pnl
    for r in exit_reasons:
        exit_reasons[r]["pnl"] = round(exit_reasons[r]["pnl"], 2)

    return {
        "summary": {
            "total_trades": len(trades),
            "winners": len(winners),
            "losers": len(losers),
            "win_rate": round(win_rate, 1),
            "total_pnl": round(total_pnl, 2),
            "gross_profit": round(gross_profit, 2),
            "gross_loss": round(gross_loss, 2),
            "profit_factor": round(profit_factor, 2) if profit_factor != float("inf") else "inf",
            "expectancy_per_trade": round(expectancy, 2),
            "avg_winner": round(avg_winner, 2),
            "avg_loser": round(avg_loser, 2),
            "avg_winner_pts": round(avg_win_pts, 2),
            "avg_loser_pts": round(avg_loss_pts, 2),
            "largest_winner": round(max(t.pnl for t in trades), 2),
            "largest_loser": round(min(t.pnl for t in trades), 2),
            "max_consec_wins": max_consec_wins,
            "max_consec_losses": max_consec_losses,
        },
        "equity": {
            "starting": initial_balance,
            "ending": round(equity[-1], 2),
            "peak": round(peak, 2),
            "min": round(min_equity, 2),
            "max_drawdown": round(max_drawdown, 2),
            "max_drawdown_pct": round(max_drawdown_pct, 2),
        },
        "apex_check": {
            "drawdown_limit": drawdown_limit,
            "max_drawdown": round(max_drawdown, 2),
            "survived": apex_survived,
            "verdict": "PASS — Account survived" if apex_survived else "FAIL — Would have breached drawdown",
        },
        "by_setup": setup_stats,
        "by_confluence_score": score_analysis,
        "by_hour": dict(sorted(hour_stats.items())),
        "by_exit_reason": exit_reasons,
        "equity_curve": [round(e, 2) for e in equity],
    }


# ═══════════════════════════════════════════════════════════════════════
# OUTPUT FORMATTING
# ═══════════════════════════════════════════════════════════════════════

def format_text(results: Dict) -> str:
    lines = []
    s = results["summary"]
    eq = results["equity"]
    apex = results["apex_check"]

    lines.append("=" * 64)
    lines.append("  NQ BACKTEST RESULTS")
    lines.append("=" * 64)

    lines.append(f"\n  SUMMARY")
    lines.append(f"  {'Total Trades:':<25s} {s['total_trades']}")
    lines.append(f"  {'Winners:':<25s} {s['winners']}  ({s['win_rate']}%)")
    lines.append(f"  {'Losers:':<25s} {s['losers']}")
    lines.append(f"  {'Total P&L:':<25s} ${s['total_pnl']:,.2f}")
    lines.append(f"  {'Profit Factor:':<25s} {s['profit_factor']}")
    lines.append(f"  {'Expectancy/Trade:':<25s} ${s['expectancy_per_trade']:,.2f}")
    lines.append(f"  {'Avg Winner:':<25s} ${s['avg_winner']:,.2f}  ({s['avg_winner_pts']:.1f} pts)")
    lines.append(f"  {'Avg Loser:':<25s} ${s['avg_loser']:,.2f}  ({s['avg_loser_pts']:.1f} pts)")
    lines.append(f"  {'Largest Winner:':<25s} ${s['largest_winner']:,.2f}")
    lines.append(f"  {'Largest Loser:':<25s} ${s['largest_loser']:,.2f}")
    lines.append(f"  {'Max Consec Wins:':<25s} {s['max_consec_wins']}")
    lines.append(f"  {'Max Consec Losses:':<25s} {s['max_consec_losses']}")

    lines.append(f"\n  EQUITY CURVE")
    lines.append(f"  {'Starting:':<25s} ${eq['starting']:,.2f}")
    lines.append(f"  {'Ending:':<25s} ${eq['ending']:,.2f}")
    lines.append(f"  {'Peak:':<25s} ${eq['peak']:,.2f}")
    lines.append(f"  {'Max Drawdown:':<25s} ${eq['max_drawdown']:,.2f}  ({eq['max_drawdown_pct']:.1f}%)")

    lines.append(f"\n  APEX SURVIVAL CHECK")
    lines.append(f"  {'Drawdown Limit:':<25s} ${apex['drawdown_limit']:,.2f}")
    lines.append(f"  {'Max Drawdown Hit:':<25s} ${apex['max_drawdown']:,.2f}")
    lines.append(f"  >>> {apex['verdict']} <<<")

    # By Setup
    lines.append(f"\n  {'─' * 60}")
    lines.append(f"  RESULTS BY SETUP")
    lines.append(f"  {'─' * 60}")
    lines.append(f"  {'Setup':<25s} {'Trades':>6s} {'Win%':>6s} {'P&L':>10s} {'Expect':>10s}")
    lines.append(f"  {'─' * 60}")
    for setup, stats in sorted(results["by_setup"].items(), key=lambda x: x[1]["total_pnl"], reverse=True):
        flag = "  **" if stats["total_pnl"] > 0 else "  --"
        lines.append(f"  {setup:<25s} {stats['trades']:>6d} {stats['win_rate']:>5.1f}% "
                     f"${stats['total_pnl']:>9,.2f} ${stats['expectancy']:>9,.2f}{flag}")

    # By Confluence Score
    if results.get("by_confluence_score"):
        lines.append(f"\n  {'─' * 60}")
        lines.append(f"  RESULTS BY CONFLUENCE SCORE")
        lines.append(f"  {'─' * 60}")
        lines.append(f"  {'Score':<15s} {'Trades':>6s} {'Win%':>6s} {'P&L':>10s} {'Avg P&L':>10s}")
        lines.append(f"  {'─' * 60}")
        for bracket, stats in results["by_confluence_score"].items():
            lines.append(f"  {bracket:<15s} {stats['trades']:>6d} {stats['win_rate']:>5.1f}% "
                         f"${stats['total_pnl']:>9,.2f} ${stats['avg_pnl']:>9,.2f}")

    # By Hour
    if results.get("by_hour"):
        lines.append(f"\n  {'─' * 60}")
        lines.append(f"  RESULTS BY HOUR (ET)")
        lines.append(f"  {'─' * 60}")
        lines.append(f"  {'Hour':<10s} {'Trades':>6s} {'Win%':>6s} {'P&L':>10s}")
        for h, stats in results["by_hour"].items():
            lines.append(f"  {h:>2d}:00     {stats['trades']:>6d} {stats['win_rate']:>5.1f}% ${stats['pnl']:>9,.2f}")

    # By Exit Reason
    if results.get("by_exit_reason"):
        lines.append(f"\n  {'─' * 60}")
        lines.append(f"  EXIT REASONS")
        lines.append(f"  {'─' * 60}")
        for reason, stats in results["by_exit_reason"].items():
            lines.append(f"  {reason:<15s} {stats['count']:>4d} trades  ${stats['pnl']:>9,.2f}")

    lines.append("\n" + "=" * 64)

    # Recommendations
    lines.append(f"\n  RECOMMENDATIONS")
    lines.append(f"  {'─' * 60}")

    # Find best and worst setups
    by_expect = sorted(results["by_setup"].items(), key=lambda x: x[1]["expectancy"], reverse=True)
    if by_expect:
        best = by_expect[0]
        lines.append(f"  BEST SETUP:  {best[0]} (${best[1]['expectancy']:,.2f}/trade, {best[1]['win_rate']}% win rate)")
        if len(by_expect) > 1:
            worst = by_expect[-1]
            if worst[1]["expectancy"] < 0:
                lines.append(f"  DROP SETUP:  {worst[0]} (${worst[1]['expectancy']:,.2f}/trade — losing money)")

    # Score-based recommendation
    if results.get("by_confluence_score"):
        high_score = results["by_confluence_score"].get("81-100", {})
        low_score = results["by_confluence_score"].get("0-40", {})
        if high_score and low_score:
            lines.append(f"  SCORE FILTER: Trades scoring 81-100 avg ${high_score.get('avg_pnl', 0):,.2f}/trade "
                         f"vs 0-40 avg ${low_score.get('avg_pnl', 0):,.2f}/trade")
            if high_score.get("avg_pnl", 0) > low_score.get("avg_pnl", 0):
                lines.append(f"  >> Only take setups with confluence score 60+ to improve results")

    lines.append("=" * 64)
    return "\n".join(lines)


def export_trades_csv(trades: List[Trade], filepath: str):
    """Export all trades to a CSV file."""
    with open(filepath, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "setup", "direction", "entry_price", "stop_price", "target_price",
            "exit_price", "entry_time", "exit_time", "exit_reason",
            "pnl_points", "pnl_dollars", "bars_held", "max_favorable",
            "max_adverse", "won", "contracts", "confluence_score",
        ])
        writer.writeheader()
        for t in trades:
            writer.writerow(t.to_dict())


# ═══════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="NQ/MNQ Backtester — test playbook setups against historical data"
    )
    parser.add_argument("file", help="CSV file with 1-min OHLCV data")
    parser.add_argument("--setup", help="Test specific setup: ema_pullback, vwap_bounce, macd_crossover, rsi_extreme, bollinger_squeeze, opening_range_breakout")
    parser.add_argument("--account", default="50k", help=f"Apex account type: {', '.join(APEX_ACCOUNTS.keys())} (default: 50k)")
    parser.add_argument("--balance", type=float, help="Starting balance (default: account starting balance)")
    parser.add_argument("--risk-pct", type=int, default=25, help="Risk per trade as pct of drawdown (default: 25)")
    parser.add_argument("--instrument", choices=["NQ", "MNQ"], default="NQ", help="Instrument (default: NQ)")
    parser.add_argument("--max-bars", type=int, default=60, help="Max bars to hold a trade (default: 60)")
    parser.add_argument("--min-score", type=int, default=0, help="Minimum confluence score to take trade (default: 0, try 60+)")
    parser.add_argument("--export", help="Export all trades to CSV file")
    parser.add_argument("--format", choices=["text", "json"], default="text", help="Output format")

    args = parser.parse_args()

    # Load data
    print(f"Loading price data from {args.file}...", file=sys.stderr)
    bars_1m = load_price_data(args.file)
    if not bars_1m:
        print("Error: No valid price data found", file=sys.stderr)
        sys.exit(1)
    print(f"Loaded {len(bars_1m)} 1-min bars", file=sys.stderr)

    # Aggregate to 5m
    bars_5m = aggregate_to_5m(bars_1m)
    print(f"Aggregated to {len(bars_5m)} 5-min bars", file=sys.stderr)

    # Account setup
    acct = APEX_ACCOUNTS.get(args.account.lower(), APEX_ACCOUNTS["50k"])
    balance = args.balance or acct["balance"]
    dd_limit = acct["drawdown"]
    point_value = NQ_POINT_VALUE if args.instrument == "NQ" else MNQ_POINT_VALUE

    # Scan for setups
    setups_to_scan = [args.setup] if args.setup else None
    scanner = SetupScanner(bars_1m, bars_5m, args.instrument)
    print(f"Scanning for setups...", file=sys.stderr)
    trades = scanner.scan_all(setups_to_scan)
    print(f"Found {len(trades)} potential trade entries", file=sys.stderr)

    # Filter by confluence score
    if args.min_score > 0:
        trades = [t for t in trades if t.confluence_score >= args.min_score]
        print(f"After score filter (>={args.min_score}): {len(trades)} trades", file=sys.stderr)

    # Remove overlapping trades (can't enter if already in a trade)
    filtered = []
    last_exit = -1
    for t in trades:
        if t.entry_bar > last_exit:
            filtered.append(t)
            last_exit = t.entry_bar + args.max_bars
    trades = filtered
    print(f"After overlap filter: {len(trades)} non-overlapping trades", file=sys.stderr)

    # Simulate all trades
    print(f"Simulating trades...", file=sys.stderr)
    for t in trades:
        simulate_trade(t, bars_1m, max_bars=args.max_bars, point_value=point_value)

    # Analyze performance
    results = analyze_performance(trades, initial_balance=balance, drawdown_limit=dd_limit)

    # Output
    if args.format == "json":
        # Remove equity curve from JSON (too large)
        output = {k: v for k, v in results.items() if k != "equity_curve"}
        print(json.dumps(output, indent=2))
    else:
        print(format_text(results))

    # Export trades
    if args.export:
        export_trades_csv(trades, args.export)
        print(f"\nTrades exported to {args.export}", file=sys.stderr)


if __name__ == "__main__":
    main()
