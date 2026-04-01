#!/usr/bin/env python3
"""
NASDAQ Futures Technical Analyzer

Computes technical indicators for NQ/MNQ futures price data.
Supports RSI, MACD, EMA, SMA, Bollinger Bands, ATR, VWAP,
Stochastic, pivot points, and support/resistance detection.

Usage:
    python3 technical_analyzer.py prices.csv
    python3 technical_analyzer.py prices.csv --indicators rsi,macd,ema
    python3 technical_analyzer.py prices.csv --format json
"""

import argparse
import csv
import json
import math
import sys
from datetime import datetime
from typing import Dict, List, Optional, Tuple


def read_price_data(filepath: str) -> List[Dict]:
    """Read OHLCV data from CSV file."""
    rows = []
    with open(filepath, "r", newline="") as f:
        reader = csv.DictReader(f)
        required = {"open", "high", "low", "close"}
        if not required.issubset(set(col.lower().strip() for col in reader.fieldnames or [])):
            print(f"Error: CSV must have columns: datetime,open,high,low,close,volume", file=sys.stderr)
            sys.exit(1)

        col_map = {col.lower().strip(): col for col in reader.fieldnames or []}
        for row in reader:
            try:
                entry = {
                    "open": float(row[col_map.get("open", "open")]),
                    "high": float(row[col_map.get("high", "high")]),
                    "low": float(row[col_map.get("low", "low")]),
                    "close": float(row[col_map.get("close", "close")]),
                    "volume": int(float(row.get(col_map.get("volume", "volume"), "0") or "0")),
                }
                dt_col = col_map.get("datetime", col_map.get("date", col_map.get("time", "")))
                if dt_col and row.get(dt_col):
                    entry["datetime"] = row[dt_col]
                rows.append(entry)
            except (ValueError, KeyError) as e:
                continue
    return rows


def calc_sma(closes: List[float], period: int) -> List[Optional[float]]:
    """Simple Moving Average."""
    result = [None] * len(closes)
    for i in range(period - 1, len(closes)):
        result[i] = sum(closes[i - period + 1:i + 1]) / period
    return result


def calc_ema(closes: List[float], period: int) -> List[Optional[float]]:
    """Exponential Moving Average."""
    result: List[Optional[float]] = [None] * len(closes)
    if len(closes) < period:
        return result
    multiplier = 2 / (period + 1)
    result[period - 1] = sum(closes[:period]) / period
    for i in range(period, len(closes)):
        result[i] = closes[i] * multiplier + (result[i - 1] or 0) * (1 - multiplier)
    return result


def calc_rsi(closes: List[float], period: int = 14) -> List[Optional[float]]:
    """Relative Strength Index."""
    result: List[Optional[float]] = [None] * len(closes)
    if len(closes) < period + 1:
        return result

    gains = []
    losses = []
    for i in range(1, period + 1):
        delta = closes[i] - closes[i - 1]
        gains.append(max(delta, 0))
        losses.append(max(-delta, 0))

    avg_gain = sum(gains) / period
    avg_loss = sum(losses) / period

    if avg_loss == 0:
        result[period] = 100.0
    else:
        rs = avg_gain / avg_loss
        result[period] = 100 - (100 / (1 + rs))

    for i in range(period + 1, len(closes)):
        delta = closes[i] - closes[i - 1]
        gain = max(delta, 0)
        loss = max(-delta, 0)
        avg_gain = (avg_gain * (period - 1) + gain) / period
        avg_loss = (avg_loss * (period - 1) + loss) / period
        if avg_loss == 0:
            result[i] = 100.0
        else:
            rs = avg_gain / avg_loss
            result[i] = 100 - (100 / (1 + rs))
    return result


def calc_macd(closes: List[float], fast: int = 12, slow: int = 26, signal: int = 9) -> Dict:
    """MACD with signal line and histogram."""
    ema_fast = calc_ema(closes, fast)
    ema_slow = calc_ema(closes, slow)

    macd_line = [None] * len(closes)
    for i in range(len(closes)):
        if ema_fast[i] is not None and ema_slow[i] is not None:
            macd_line[i] = ema_fast[i] - ema_slow[i]

    # Signal line (EMA of MACD)
    macd_vals = [v for v in macd_line if v is not None]
    signal_line = [None] * len(closes)
    if len(macd_vals) >= signal:
        sig_ema = calc_ema(macd_vals, signal)
        start_idx = len(closes) - len(macd_vals)
        for i, v in enumerate(sig_ema):
            if v is not None:
                signal_line[start_idx + i] = v

    histogram = [None] * len(closes)
    for i in range(len(closes)):
        if macd_line[i] is not None and signal_line[i] is not None:
            histogram[i] = macd_line[i] - signal_line[i]

    return {"macd": macd_line, "signal": signal_line, "histogram": histogram}


def calc_bollinger(closes: List[float], period: int = 20, std_dev: float = 2.0) -> Dict:
    """Bollinger Bands."""
    sma = calc_sma(closes, period)
    upper = [None] * len(closes)
    lower = [None] * len(closes)
    width = [None] * len(closes)

    for i in range(period - 1, len(closes)):
        window = closes[i - period + 1:i + 1]
        mean = sma[i]
        if mean is None:
            continue
        variance = sum((x - mean) ** 2 for x in window) / period
        sd = math.sqrt(variance)
        upper[i] = mean + std_dev * sd
        lower[i] = mean - std_dev * sd
        if mean > 0:
            width[i] = (upper[i] - lower[i]) / mean * 100

    return {"middle": sma, "upper": upper, "lower": lower, "width": width}


def calc_atr(data: List[Dict], period: int = 14) -> List[Optional[float]]:
    """Average True Range."""
    result: List[Optional[float]] = [None] * len(data)
    if len(data) < 2:
        return result

    true_ranges = [data[0]["high"] - data[0]["low"]]
    for i in range(1, len(data)):
        tr = max(
            data[i]["high"] - data[i]["low"],
            abs(data[i]["high"] - data[i - 1]["close"]),
            abs(data[i]["low"] - data[i - 1]["close"]),
        )
        true_ranges.append(tr)

    if len(true_ranges) < period:
        return result

    result[period - 1] = sum(true_ranges[:period]) / period
    for i in range(period, len(data)):
        result[i] = (result[i - 1] * (period - 1) + true_ranges[i]) / period
    return result


def calc_stochastic(data: List[Dict], k_period: int = 14, d_period: int = 3) -> Dict:
    """Stochastic Oscillator (%K and %D)."""
    k_values: List[Optional[float]] = [None] * len(data)

    for i in range(k_period - 1, len(data)):
        window = data[i - k_period + 1:i + 1]
        highest = max(bar["high"] for bar in window)
        lowest = min(bar["low"] for bar in window)
        if highest - lowest > 0:
            k_values[i] = ((data[i]["close"] - lowest) / (highest - lowest)) * 100
        else:
            k_values[i] = 50.0

    # %D is SMA of %K
    k_nums = [v if v is not None else 0 for v in k_values]
    d_values = calc_sma(k_nums, d_period)
    # Null out where K was null
    for i in range(len(data)):
        if k_values[i] is None:
            d_values[i] = None

    return {"k": k_values, "d": d_values}


def calc_vwap(data: List[Dict]) -> List[Optional[float]]:
    """Volume Weighted Average Price (session-based, resets daily)."""
    result: List[Optional[float]] = [None] * len(data)
    cum_vol = 0
    cum_tp_vol = 0.0

    for i in range(len(data)):
        tp = (data[i]["high"] + data[i]["low"] + data[i]["close"]) / 3
        vol = data[i].get("volume", 0)
        if vol == 0:
            vol = 1  # avoid division by zero
        cum_vol += vol
        cum_tp_vol += tp * vol
        result[i] = cum_tp_vol / cum_vol
    return result


def calc_pivot_points(data: List[Dict]) -> Dict:
    """Standard pivot points from most recent completed bar."""
    if not data:
        return {}
    bar = data[-1]
    h, l, c = bar["high"], bar["low"], bar["close"]
    pp = (h + l + c) / 3
    return {
        "pp": round(pp, 2),
        "r1": round(2 * pp - l, 2),
        "r2": round(pp + (h - l), 2),
        "r3": round(h + 2 * (pp - l), 2),
        "s1": round(2 * pp - h, 2),
        "s2": round(pp - (h - l), 2),
        "s3": round(l - 2 * (h - pp), 2),
    }


def find_support_resistance(data: List[Dict], lookback: int = 50) -> Dict:
    """Detect support and resistance levels from swing highs/lows."""
    if len(data) < 5:
        return {"support": [], "resistance": []}

    window = data[-lookback:] if len(data) > lookback else data
    swing_highs = []
    swing_lows = []

    for i in range(2, len(window) - 2):
        if (window[i]["high"] > window[i - 1]["high"]
                and window[i]["high"] > window[i - 2]["high"]
                and window[i]["high"] > window[i + 1]["high"]
                and window[i]["high"] > window[i + 2]["high"]):
            swing_highs.append(window[i]["high"])

        if (window[i]["low"] < window[i - 1]["low"]
                and window[i]["low"] < window[i - 2]["low"]
                and window[i]["low"] < window[i + 1]["low"]
                and window[i]["low"] < window[i + 2]["low"]):
            swing_lows.append(window[i]["low"])

    # Cluster nearby levels
    def cluster(levels, threshold=10.0):
        if not levels:
            return []
        levels.sort()
        clusters = [[levels[0]]]
        for lvl in levels[1:]:
            if lvl - clusters[-1][-1] < threshold:
                clusters[-1].append(lvl)
            else:
                clusters.append([lvl])
        return [round(sum(c) / len(c), 2) for c in clusters]

    current_price = data[-1]["close"]
    supports = [l for l in cluster(swing_lows) if l < current_price]
    resistances = [l for l in cluster(swing_highs) if l > current_price]

    return {
        "support": sorted(supports, reverse=True)[:5],
        "resistance": sorted(resistances)[:5],
    }


def interpret_rsi(value: float) -> str:
    if value >= 70:
        return "OVERBOUGHT — caution on longs, watch for reversal"
    elif value >= 60:
        return "BULLISH — momentum favoring buyers"
    elif value >= 40:
        return "NEUTRAL — no clear momentum edge"
    elif value >= 30:
        return "BEARISH — momentum favoring sellers"
    else:
        return "OVERSOLD — caution on shorts, watch for bounce"


def interpret_macd(macd_val: float, signal_val: float, histogram: float) -> str:
    if macd_val > signal_val and histogram > 0:
        return "BULLISH — MACD above signal, histogram expanding"
    elif macd_val > signal_val and histogram < 0:
        return "WEAKENING BULL — MACD above signal but histogram contracting"
    elif macd_val < signal_val and histogram < 0:
        return "BEARISH — MACD below signal, histogram expanding down"
    elif macd_val < signal_val and histogram > 0:
        return "WEAKENING BEAR — MACD below signal but histogram contracting"
    else:
        return "NEUTRAL — at crossover point"


def get_trend_bias(ema9: float, ema21: float, ema50: float, close: float) -> str:
    if close > ema9 > ema21 > ema50:
        return "STRONG BULLISH — price above all EMAs, EMAs stacked up"
    elif close > ema21 and ema9 > ema50:
        return "BULLISH — price above key EMAs"
    elif close < ema9 < ema21 < ema50:
        return "STRONG BEARISH — price below all EMAs, EMAs stacked down"
    elif close < ema21 and ema9 < ema50:
        return "BEARISH — price below key EMAs"
    else:
        return "MIXED/CHOPPY — EMAs not aligned, expect range-bound action"


def analyze(data: List[Dict], indicators: Optional[List[str]] = None,
            rsi_period: int = 14, ema_periods: Optional[List[int]] = None) -> Dict:
    """Run full technical analysis on price data."""
    closes = [bar["close"] for bar in data]
    all_indicators = indicators is None
    ema_p = ema_periods or [9, 21, 50, 200]

    results: Dict = {
        "bars_analyzed": len(data),
        "current_price": closes[-1] if closes else 0,
        "indicators": {},
        "signals": {},
    }

    if data:
        results["price_range"] = {
            "high": max(bar["high"] for bar in data),
            "low": min(bar["low"] for bar in data),
            "range": round(max(bar["high"] for bar in data) - min(bar["low"] for bar in data), 2),
        }

    # EMAs
    if all_indicators or "ema" in (indicators or []):
        ema_results = {}
        for p in ema_p:
            ema = calc_ema(closes, p)
            val = ema[-1]
            if val is not None:
                ema_results[f"ema_{p}"] = round(val, 2)
        results["indicators"]["ema"] = ema_results

        # Trend bias
        if all(f"ema_{p}" in ema_results for p in [9, 21, 50]):
            results["signals"]["trend"] = get_trend_bias(
                ema_results["ema_9"], ema_results["ema_21"],
                ema_results["ema_50"], closes[-1]
            )

    # SMA
    if all_indicators or "sma" in (indicators or []):
        sma_results = {}
        for p in [20, 50, 200]:
            sma = calc_sma(closes, p)
            val = sma[-1]
            if val is not None:
                sma_results[f"sma_{p}"] = round(val, 2)
        results["indicators"]["sma"] = sma_results

    # RSI
    if all_indicators or "rsi" in (indicators or []):
        rsi = calc_rsi(closes, rsi_period)
        val = rsi[-1]
        if val is not None:
            results["indicators"]["rsi"] = {"value": round(val, 2), "period": rsi_period}
            results["signals"]["rsi"] = interpret_rsi(val)

    # MACD
    if all_indicators or "macd" in (indicators or []):
        macd_data = calc_macd(closes)
        m = macd_data["macd"][-1]
        s = macd_data["signal"][-1]
        h = macd_data["histogram"][-1]
        if all(v is not None for v in [m, s, h]):
            results["indicators"]["macd"] = {
                "macd": round(m, 2),
                "signal": round(s, 2),
                "histogram": round(h, 2),
            }
            results["signals"]["macd"] = interpret_macd(m, s, h)

    # Bollinger Bands
    if all_indicators or "bollinger" in (indicators or []):
        bb = calc_bollinger(closes)
        if bb["upper"][-1] is not None:
            results["indicators"]["bollinger"] = {
                "upper": round(bb["upper"][-1], 2),
                "middle": round(bb["middle"][-1], 2),
                "lower": round(bb["lower"][-1], 2),
                "width": round(bb["width"][-1], 4) if bb["width"][-1] else None,
            }
            # Squeeze detection
            if bb["width"][-1] is not None:
                widths = [w for w in bb["width"] if w is not None]
                if widths:
                    avg_width = sum(widths) / len(widths)
                    if bb["width"][-1] < avg_width * 0.5:
                        results["signals"]["bollinger"] = "SQUEEZE — low volatility, expect breakout"
                    elif closes[-1] > bb["upper"][-1]:
                        results["signals"]["bollinger"] = "ABOVE UPPER BAND — overbought / strong trend"
                    elif closes[-1] < bb["lower"][-1]:
                        results["signals"]["bollinger"] = "BELOW LOWER BAND — oversold / strong downtrend"
                    else:
                        results["signals"]["bollinger"] = "WITHIN BANDS — normal volatility"

    # ATR
    if all_indicators or "atr" in (indicators or []):
        atr = calc_atr(data)
        val = atr[-1]
        if val is not None:
            results["indicators"]["atr"] = {
                "value": round(val, 2),
                "points": round(val, 2),
                "ticks": round(val / 0.25),
                "nq_dollars": round(val * 20, 2),
                "mnq_dollars": round(val * 2, 2),
            }

    # Stochastic
    if all_indicators or "stochastic" in (indicators or []):
        stoch = calc_stochastic(data)
        k = stoch["k"][-1]
        d = stoch["d"][-1]
        if k is not None and d is not None:
            results["indicators"]["stochastic"] = {
                "k": round(k, 2),
                "d": round(d, 2),
            }
            if k > 80:
                results["signals"]["stochastic"] = "OVERBOUGHT"
            elif k < 20:
                results["signals"]["stochastic"] = "OVERSOLD"
            elif k > d:
                results["signals"]["stochastic"] = "BULLISH CROSSOVER"
            else:
                results["signals"]["stochastic"] = "BEARISH CROSSOVER"

    # VWAP
    if all_indicators or "vwap" in (indicators or []):
        vwap = calc_vwap(data)
        if vwap[-1] is not None:
            results["indicators"]["vwap"] = round(vwap[-1], 2)
            if closes[-1] > vwap[-1]:
                results["signals"]["vwap"] = "ABOVE VWAP — bullish intraday bias"
            else:
                results["signals"]["vwap"] = "BELOW VWAP — bearish intraday bias"

    # Pivot Points
    if all_indicators or "pivots" in (indicators or []):
        results["indicators"]["pivot_points"] = calc_pivot_points(data)

    # Support / Resistance
    if all_indicators or "sr" in (indicators or []):
        results["indicators"]["support_resistance"] = find_support_resistance(data)

    # Overall bias
    bullish = sum(1 for s in results["signals"].values() if "BULLISH" in s.upper() or "ABOVE" in s.upper())
    bearish = sum(1 for s in results["signals"].values() if "BEARISH" in s.upper() or "BELOW" in s.upper() or "OVERSOLD" in s.upper())
    neutral = len(results["signals"]) - bullish - bearish

    if bullish > bearish + 1:
        results["overall_bias"] = "BULLISH"
    elif bearish > bullish + 1:
        results["overall_bias"] = "BEARISH"
    else:
        results["overall_bias"] = "NEUTRAL/MIXED"

    results["bias_breakdown"] = {"bullish": bullish, "bearish": bearish, "neutral": neutral}

    return results


def format_text(results: Dict) -> str:
    """Format results as human-readable text."""
    lines = []
    lines.append("=" * 60)
    lines.append("  NASDAQ FUTURES TECHNICAL ANALYSIS")
    lines.append("=" * 60)
    lines.append(f"  Bars Analyzed: {results['bars_analyzed']}")
    lines.append(f"  Current Price: {results['current_price']:.2f}")

    if "price_range" in results:
        pr = results["price_range"]
        lines.append(f"  Period Range:  {pr['low']:.2f} — {pr['high']:.2f} ({pr['range']:.2f} pts)")

    lines.append("")

    # Overall bias
    bias = results.get("overall_bias", "N/A")
    bd = results.get("bias_breakdown", {})
    lines.append(f"  >>> OVERALL BIAS: {bias} <<<")
    lines.append(f"      Bullish: {bd.get('bullish', 0)} | Bearish: {bd.get('bearish', 0)} | Neutral: {bd.get('neutral', 0)}")
    lines.append("")

    # Signals
    if results.get("signals"):
        lines.append("-" * 60)
        lines.append("  SIGNALS")
        lines.append("-" * 60)
        for name, signal in results["signals"].items():
            lines.append(f"  {name.upper():.<20s} {signal}")
        lines.append("")

    # Indicators
    ind = results.get("indicators", {})

    if "ema" in ind:
        lines.append("-" * 60)
        lines.append("  EXPONENTIAL MOVING AVERAGES")
        lines.append("-" * 60)
        for key, val in ind["ema"].items():
            lines.append(f"  {key.upper()}: {val:.2f}")
        lines.append("")

    if "sma" in ind:
        lines.append("-" * 60)
        lines.append("  SIMPLE MOVING AVERAGES")
        lines.append("-" * 60)
        for key, val in ind["sma"].items():
            lines.append(f"  {key.upper()}: {val:.2f}")
        lines.append("")

    if "rsi" in ind:
        lines.append("-" * 60)
        lines.append("  RSI")
        lines.append("-" * 60)
        lines.append(f"  RSI({ind['rsi']['period']}): {ind['rsi']['value']:.2f}")
        lines.append("")

    if "macd" in ind:
        lines.append("-" * 60)
        lines.append("  MACD (12/26/9)")
        lines.append("-" * 60)
        lines.append(f"  MACD Line:  {ind['macd']['macd']:.2f}")
        lines.append(f"  Signal:     {ind['macd']['signal']:.2f}")
        lines.append(f"  Histogram:  {ind['macd']['histogram']:.2f}")
        lines.append("")

    if "bollinger" in ind:
        lines.append("-" * 60)
        lines.append("  BOLLINGER BANDS (20/2)")
        lines.append("-" * 60)
        lines.append(f"  Upper:  {ind['bollinger']['upper']:.2f}")
        lines.append(f"  Middle: {ind['bollinger']['middle']:.2f}")
        lines.append(f"  Lower:  {ind['bollinger']['lower']:.2f}")
        if ind["bollinger"].get("width"):
            lines.append(f"  Width:  {ind['bollinger']['width']:.4f}%")
        lines.append("")

    if "atr" in ind:
        lines.append("-" * 60)
        lines.append("  ATR (14)")
        lines.append("-" * 60)
        lines.append(f"  ATR:        {ind['atr']['value']:.2f} points")
        lines.append(f"  Ticks:      {ind['atr']['ticks']:.0f}")
        lines.append(f"  NQ Dollar:  ${ind['atr']['nq_dollars']:.2f}/contract")
        lines.append(f"  MNQ Dollar: ${ind['atr']['mnq_dollars']:.2f}/contract")
        lines.append("")

    if "stochastic" in ind:
        lines.append("-" * 60)
        lines.append("  STOCHASTIC (14/3/3)")
        lines.append("-" * 60)
        lines.append(f"  %K: {ind['stochastic']['k']:.2f}")
        lines.append(f"  %D: {ind['stochastic']['d']:.2f}")
        lines.append("")

    if "vwap" in ind:
        lines.append("-" * 60)
        lines.append("  VWAP")
        lines.append("-" * 60)
        lines.append(f"  VWAP: {ind['vwap']:.2f}")
        lines.append("")

    if "pivot_points" in ind and ind["pivot_points"]:
        pp = ind["pivot_points"]
        lines.append("-" * 60)
        lines.append("  PIVOT POINTS")
        lines.append("-" * 60)
        lines.append(f"  R3: {pp['r3']:.2f}")
        lines.append(f"  R2: {pp['r2']:.2f}")
        lines.append(f"  R1: {pp['r1']:.2f}")
        lines.append(f"  PP: {pp['pp']:.2f}")
        lines.append(f"  S1: {pp['s1']:.2f}")
        lines.append(f"  S2: {pp['s2']:.2f}")
        lines.append(f"  S3: {pp['s3']:.2f}")
        lines.append("")

    if "support_resistance" in ind:
        sr = ind["support_resistance"]
        lines.append("-" * 60)
        lines.append("  SUPPORT / RESISTANCE LEVELS")
        lines.append("-" * 60)
        for r in sr.get("resistance", []):
            lines.append(f"  RESISTANCE: {r:.2f}")
        lines.append(f"  --- PRICE:  {results['current_price']:.2f} ---")
        for s in sr.get("support", []):
            lines.append(f"  SUPPORT:    {s:.2f}")
        lines.append("")

    lines.append("=" * 60)
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="NASDAQ Futures Technical Analyzer — compute indicators for NQ/MNQ price data"
    )
    parser.add_argument("file", help="CSV file with OHLCV data (columns: datetime,open,high,low,close,volume)")
    parser.add_argument("--indicators", help="Comma-separated list of indicators: rsi,macd,ema,sma,bollinger,atr,stochastic,vwap,pivots,sr")
    parser.add_argument("--rsi-period", type=int, default=14, help="RSI period (default: 14)")
    parser.add_argument("--ema-periods", help="Comma-separated EMA periods (default: 9,21,50,200)")
    parser.add_argument("--format", choices=["text", "json"], default="text", help="Output format (default: text)")

    args = parser.parse_args()

    data = read_price_data(args.file)
    if not data:
        print("Error: No valid price data found in file", file=sys.stderr)
        sys.exit(1)

    indicators = args.indicators.split(",") if args.indicators else None
    ema_periods = [int(x) for x in args.ema_periods.split(",")] if args.ema_periods else None

    results = analyze(data, indicators=indicators, rsi_period=args.rsi_period, ema_periods=ema_periods)

    if args.format == "json":
        print(json.dumps(results, indent=2))
    else:
        print(format_text(results))


if __name__ == "__main__":
    main()
