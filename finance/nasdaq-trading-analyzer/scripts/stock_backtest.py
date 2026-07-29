#!/usr/bin/env python3
"""
Stock Backtest — validate swing strategies on years of historical data.

Pulls multi-year daily bars for a stock from Alpaca (free tier is fine for
daily/hourly) and runs a strategy over the whole history, producing honest
performance stats: total return, CAGR, win rate, max drawdown, and a
per-year breakdown. This is how a PLANNED/BACKTESTING strategy earns its way
to LIVE — with real out-of-sample numbers instead of a claim.

Strategies included (long-only, daily):
  - sma_cross : trend-following 20/50 SMA crossover
  - rsi2      : Connors RSI(2) mean reversion (buy deep dips above the 200SMA)

Usage:
    python3 stock_backtest.py --config my-config.json --symbol AAPL --years 5
    python3 stock_backtest.py --config my-config.json --symbol QQQ --strategy rsi2 --years 5
    python3 stock_backtest.py --config my-config.json --symbol MSFT --years 3 --format json

Honest limits:
    - Daily bars only here; minute-level multi-year needs a paid data plan.
    - Long-only, one position at a time, ~5 bps cost per side for slippage.
    - Past performance is not predictive. This measures a hypothesis, it does
      not promise future results.
"""

import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from alpaca_api import AlpacaREST
from technical_analyzer import calc_sma, calc_rsi

COST = 0.0005  # 5 bps per side (slippage + commission approximation)
RESULTS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "..", "assets", "backtests", "backtest-results.jsonl")


# ---- Strategies: given closes + index + current position, return target ----

def strat_sma_cross(closes, i, pos, fast=20, slow=50):
    """Long while the fast SMA is above the slow SMA."""
    if i < slow:
        return 0
    fma = sum(closes[i - fast + 1:i + 1]) / fast
    sma = sum(closes[i - slow + 1:i + 1]) / slow
    return 1 if fma > sma else 0


def strat_rsi2(closes, i, pos):
    """Connors RSI(2) mean reversion: buy oversold dips in an uptrend,
    exit on a short-term bounce."""
    if i < 200:
        return 0
    sma200 = sum(closes[i - 199:i + 1]) / 200
    sma5 = sum(closes[i - 4:i + 1]) / 5
    rsi2 = calc_rsi(closes[:i + 1], 2)
    r = rsi2[i] if rsi2 and rsi2[i] is not None else 50
    if pos == 0:
        # entry: price above long-term trend but short-term washed out
        if closes[i] > sma200 and r < 10:
            return 1
        return 0
    else:
        # exit: short-term strength returns
        if closes[i] > sma5 or r > 70:
            return 0
        return 1


def strat_donchian(closes, i, pos, entry_n=20, exit_n=10):
    """Turtle-style breakout: buy an N-day high, exit on an M-day low."""
    if i < entry_n:
        return 0
    if pos == 0:
        return 1 if closes[i] >= max(closes[i - entry_n + 1:i + 1]) else 0
    return 0 if closes[i] <= min(closes[i - exit_n + 1:i + 1]) else 1


def strat_momentum(closes, i, pos, lookback=252):
    """Time-series momentum: hold while the 12-month return is positive and
    price is above its 200-day average; step aside otherwise."""
    if i < lookback:
        return 0
    mom = closes[i] / closes[i - lookback] - 1
    sma200 = sum(closes[i - 199:i + 1]) / 200
    ok = mom > 0 and closes[i] > sma200
    return 1 if ok else 0


STRATEGIES = {
    "sma_cross": strat_sma_cross,
    "rsi2": strat_rsi2,
    "donchian": strat_donchian,
    "momentum": strat_momentum,
}


# ---- Simulation ----

def simulate(bars, strategy, capital=10000.0):
    closes = [b["close"] for b in bars]
    dates = [b.get("datetime", "")[:10] for b in bars]
    cash, shares, entry, entry_date = capital, 0.0, 0.0, ""
    trades, equity = [], []

    for i in range(len(bars)):
        price = closes[i]
        pos = 1 if shares > 0 else 0
        target = strategy(closes, i, pos)
        if pos == 0 and target == 1:
            shares = cash / (price * (1 + COST))
            entry, entry_date, cash = price, dates[i], 0.0
        elif pos == 1 and target == 0:
            cash = shares * price * (1 - COST)
            trades.append({"entry_date": entry_date, "exit_date": dates[i],
                           "ret": price / entry - 1})
            shares = 0.0
        equity.append(cash + shares * price)

    # close any open position at the last price
    if shares > 0:
        price = closes[-1]
        cash = shares * price * (1 - COST)
        trades.append({"entry_date": entry_date, "exit_date": dates[-1],
                       "ret": price / entry - 1, "open_at_end": True})
        equity[-1] = cash

    return {"closes": closes, "dates": dates, "trades": trades,
            "equity": equity, "final": equity[-1] if equity else capital,
            "capital": capital}


def analyze(sim, years):
    trades, eq = sim["trades"], sim["equity"]
    cap, final = sim["capital"], sim["final"]
    total_ret = final / cap - 1
    cagr = (final / cap) ** (1 / years) - 1 if years > 0 and final > 0 else 0

    wins = [t for t in trades if t["ret"] > 0]
    losses = [t for t in trades if t["ret"] <= 0]
    n = len(trades)
    win_rate = len(wins) / n * 100 if n else 0
    avg_win = sum(t["ret"] for t in wins) / len(wins) * 100 if wins else 0
    avg_loss = sum(t["ret"] for t in losses) / len(losses) * 100 if losses else 0

    # max drawdown on the equity curve
    peak, max_dd = eq[0] if eq else cap, 0.0
    for v in eq:
        peak = max(peak, v)
        max_dd = min(max_dd, v / peak - 1)

    # buy & hold benchmark
    closes = sim["closes"]
    bh_ret = closes[-1] / closes[0] - 1 if closes else 0

    # per-year returns
    by_year = {}
    if sim["dates"]:
        year_eq = {}
        for d, v in zip(sim["dates"], eq):
            if d:
                year_eq.setdefault(d[:4], []).append(v)
        prev = cap
        for yr in sorted(year_eq):
            end = year_eq[yr][-1]
            by_year[yr] = round((end / prev - 1) * 100, 1)
            prev = end

    return {
        "total_return_pct": round(total_ret * 100, 1),
        "cagr_pct": round(cagr * 100, 1),
        "buy_hold_pct": round(bh_ret * 100, 1),
        "vs_buy_hold_pct": round((total_ret - bh_ret) * 100, 1),
        "trades": n,
        "win_rate_pct": round(win_rate, 1),
        "avg_win_pct": round(avg_win, 2),
        "avg_loss_pct": round(avg_loss, 2),
        "max_drawdown_pct": round(max_dd * 100, 1),
        "final_equity": round(final, 2),
        "by_year_pct": by_year,
    }


def fetch_daily(rest, symbol, years):
    days = int(years * 365) + 5
    bars_raw = rest.get_bars(symbol, timeframe="1Day", limit=10000, days_back=days)
    bars = []
    for b in bars_raw:
        c = float(b.get("c", b.get("close", 0)))
        if c > 0:
            bars.append({
                "open": float(b.get("o", b.get("open", c))),
                "high": float(b.get("h", b.get("high", c))),
                "low": float(b.get("l", b.get("low", c))),
                "close": c,
                "volume": int(b.get("v", b.get("volume", 0))),
                "datetime": b.get("t", b.get("timestamp", "")),
            })
    return bars


def format_text(symbol, strat, years, stats, n_bars):
    L = []
    L.append("=" * 56)
    L.append(f"  BACKTEST · {symbol} · {strat} · {years}yr ({n_bars} daily bars)")
    L.append("=" * 56)
    L.append(f"  Total return    {stats['total_return_pct']:>8}%")
    L.append(f"  CAGR            {stats['cagr_pct']:>8}%")
    L.append(f"  Buy & hold      {stats['buy_hold_pct']:>8}%   "
             f"(strategy vs B&H: {stats['vs_buy_hold_pct']:+}%)")
    L.append(f"  Max drawdown    {stats['max_drawdown_pct']:>8}%")
    L.append("-" * 56)
    L.append(f"  Trades          {stats['trades']:>8}")
    L.append(f"  Win rate        {stats['win_rate_pct']:>8}%")
    L.append(f"  Avg win / loss  {stats['avg_win_pct']:>7}% / {stats['avg_loss_pct']}%")
    L.append("-" * 56)
    if stats["by_year_pct"]:
        L.append("  Per year:")
        for yr, r in stats["by_year_pct"].items():
            bar = "+" if r >= 0 else ""
            L.append(f"    {yr}   {bar}{r}%")
    L.append("=" * 56)
    verdict = ("Beats buy & hold" if stats["vs_buy_hold_pct"] > 0
               else "Underperforms buy & hold")
    L.append(f"  {verdict}. Past results are not predictive.")
    return "\n".join(L)


def load_config(path):
    with open(path) as f:
        cfg = json.load(f)
    for k in ("api_key", "secret_key"):
        if k not in cfg:
            print(f"Config missing {k}", file=sys.stderr)
            sys.exit(1)
    return cfg


def run_one(rest, symbol, strategy, years, capital, save):
    """Backtest a single symbol; return (stats, n_bars) or (None, 0)."""
    bars = fetch_daily(rest, symbol, years)
    if len(bars) < 60:
        print(f"  {symbol}: not enough history ({len(bars)} bars) — skipped", file=sys.stderr)
        return None, 0
    stats = analyze(simulate(bars, STRATEGIES[strategy], capital), years)
    if save:
        from datetime import datetime, timezone
        rec = {"symbol": symbol, "strategy": strategy, "years": years,
               "bars": len(bars), "stats": stats,
               "ts": datetime.now(timezone.utc).isoformat()}
        try:
            os.makedirs(os.path.dirname(RESULTS_PATH), exist_ok=True)
            with open(RESULTS_PATH, "a") as f:
                f.write(json.dumps(rec) + "\n")
        except Exception as e:
            print(f"  (could not save {symbol}: {e})", file=sys.stderr)
    return stats, len(bars)


def format_basket(strategy, years, rows):
    """rows: list of (symbol, stats). Print a comparison table + averages."""
    L = ["=" * 66,
         f"  BASKET BACKTEST · {strategy} · {years}yr · {len(rows)} symbols",
         "=" * 66,
         f"  {'Symbol':<8}{'CAGR':>8}{'Buy&Hold':>10}{'vs B&H':>9}{'MaxDD':>8}{'Trades':>8}{'Win%':>7}"]
    L.append("-" * 66)
    for sym, st in rows:
        L.append(f"  {sym:<8}{st['cagr_pct']:>7}%{st['buy_hold_pct']:>9}%"
                 f"{st['vs_buy_hold_pct']:>+8}%{st['max_drawdown_pct']:>7}%"
                 f"{st['trades']:>8}{st['win_rate_pct']:>6}%")
    if rows:
        n = len(rows)
        avg_cagr = round(sum(s['cagr_pct'] for _, s in rows) / n, 1)
        avg_vs = round(sum(s['vs_buy_hold_pct'] for _, s in rows) / n, 1)
        beat = sum(1 for _, s in rows if s['vs_buy_hold_pct'] > 0)
        L.append("-" * 66)
        L.append(f"  {'AVERAGE':<8}{avg_cagr:>7}%{'':>10}{avg_vs:>+8}%")
        L.append("=" * 66)
        L.append(f"  Beat buy & hold: {beat}/{n} symbols. "
                 f"{'A real edge — forward-test it.' if avg_vs > 0 else 'No edge vs holding — do not ship.'}")
        L.append("  Past results are not predictive.")
    return "\n".join(L)


def main():
    p = argparse.ArgumentParser(description="Backtest a swing strategy over years of stock history")
    p.add_argument("--config", required=True, help="Alpaca config JSON")
    p.add_argument("--symbol", required=True,
                   help="Symbol, or comma-separated basket e.g. AAPL,MSFT,GOOGL")
    p.add_argument("--years", type=float, default=5)
    p.add_argument("--strategy", choices=list(STRATEGIES), default="sma_cross")
    p.add_argument("--capital", type=float, default=10000)
    p.add_argument("--format", choices=["text", "json"], default="text")
    p.add_argument("--save", action="store_true",
                   help="Append each result to the shared backtest log the "
                        "catalog reads (assets/backtests/backtest-results.jsonl)")
    args = p.parse_args()

    cfg = load_config(args.config)
    rest = AlpacaREST(cfg["api_key"], cfg["secret_key"], cfg.get("environment", "paper"))

    symbols = [s.strip().upper() for s in args.symbol.split(",") if s.strip()]

    # Single symbol -> full detailed report
    if len(symbols) == 1:
        stats, n = run_one(rest, symbols[0], args.strategy, args.years, args.capital, args.save)
        if not stats:
            sys.exit(1)
        if args.save:
            print(f"(saved to {os.path.relpath(RESULTS_PATH)})", file=sys.stderr)
        if args.format == "json":
            print(json.dumps({"symbol": symbols[0], "strategy": args.strategy,
                              "years": args.years, "bars": n, "stats": stats}, indent=2))
        else:
            print(format_text(symbols[0], args.strategy, args.years, stats, n))
        return

    # Basket -> comparison table
    rows = []
    for sym in symbols:
        print(f"  backtesting {sym}...", file=sys.stderr)
        stats, n = run_one(rest, sym, args.strategy, args.years, args.capital, args.save)
        if stats:
            rows.append((sym, stats))
    if not rows:
        print("No symbols produced enough history.", file=sys.stderr)
        sys.exit(1)
    if args.save:
        print(f"(saved {len(rows)} results to {os.path.relpath(RESULTS_PATH)})", file=sys.stderr)
    if args.format == "json":
        print(json.dumps({"strategy": args.strategy, "years": args.years,
                          "results": [{"symbol": s, "stats": st} for s, st in rows]}, indent=2))
    else:
        print(format_basket(args.strategy, args.years, rows))


if __name__ == "__main__":
    main()
