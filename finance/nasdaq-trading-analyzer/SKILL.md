---
name: "nasdaq-trading-analyzer"
description: "NASDAQ futures (NQ/MNQ) trading analyzer for Apex Trader Funding accounts. Technical analysis (RSI, MACD, EMA, Bollinger, VWAP, ATR), risk management with Apex drawdown rules, session timing, economic calendar, and news scanning. 4 Python tools, stdlib-only."
version: 1.0.0
author: Alireza Rezvani
license: MIT
tags:
  - trading
  - nasdaq
  - futures
  - technical-analysis
  - apex-trader-funding
  - risk-management
agents:
  - claude-code
  - codex-cli
  - openclaw
---

# NASDAQ Futures Trading Analyzer

> Comprehensive analysis toolkit for NQ/MNQ futures traders using Apex Trader Funding. Technical indicators, risk management, session analysis, and market intelligence — all from the command line.

## Quick Start

```bash
# Analyze price data with technical indicators
python3 scripts/technical_analyzer.py prices.csv

# Calculate position size with Apex account rules
python3 scripts/risk_manager.py --account 50k --entry 18450.50 --stop 18430.00 --target 18490.00

# Show current/upcoming market sessions and key times
python3 scripts/session_analyzer.py --timezone US/Eastern

# Scan economic calendar and news for NQ-moving events
python3 scripts/news_scanner.py --date 2026-04-01
```

## Tools Overview

### 1. Technical Analyzer (`scripts/technical_analyzer.py`)

Full-featured technical analysis engine for NQ/MNQ price data.

**Indicators Computed:**
- **Trend:** EMA (9, 21, 50, 200), SMA (20, 50, 200), VWAP
- **Momentum:** RSI (14), MACD (12/26/9), Stochastic (14/3/3)
- **Volatility:** Bollinger Bands (20/2), ATR (14), Average Daily Range
- **Volume:** Volume Profile, Relative Volume, OBV
- **Structure:** Support/Resistance levels, Pivot Points (daily/weekly)

**Input:** CSV file with columns: `datetime,open,high,low,close,volume`

```bash
# Full analysis
python3 scripts/technical_analyzer.py prices.csv

# Specific indicators only
python3 scripts/technical_analyzer.py prices.csv --indicators rsi,macd,ema

# JSON output for piping
python3 scripts/technical_analyzer.py prices.csv --format json

# Custom periods
python3 scripts/technical_analyzer.py prices.csv --rsi-period 10 --ema-periods 8,21,55
```

**Output includes:**
- Current indicator values with signal interpretation (bullish/bearish/neutral)
- Multi-timeframe trend alignment summary
- Key support/resistance levels
- Volatility assessment and expected range
- Trade bias recommendation based on indicator confluence

### 2. Risk Manager (`scripts/risk_manager.py`)

Position sizing and risk calculator built around Apex Trader Funding account rules.

**Features:**
- All Apex account types (25K–300K) with correct drawdown limits
- Position size calculator respecting max contracts and trailing drawdown
- Risk/Reward ratio analysis
- Daily loss limit tracking
- Drawdown proximity warnings
- Scale-in/scale-out plan generator

```bash
# Basic position sizing
python3 scripts/risk_manager.py --account 50k --entry 18450.50 --stop 18430.00 --target 18490.00

# Track current session P&L against drawdown
python3 scripts/risk_manager.py --account 100k --balance 101250.00 --pnl -500

# Scale plan with multiple targets
python3 scripts/risk_manager.py --account 50k --entry 18450 --stop 18430 --targets 18470,18490,18510

# JSON output
python3 scripts/risk_manager.py --account 50k --entry 18450 --stop 18430 --target 18490 --format json
```

**Apex Account Rules Built In:**
| Account | Drawdown | Max Contracts | Trailing Threshold |
|---------|----------|---------------|--------------------|
| 25K | $1,500 | 4 NQ / 40 MNQ | Trails from Day 1 |
| 50K | $2,500 | 10 NQ / 100 MNQ | Trails from Day 1 |
| 75K | $2,750 | 12 NQ / 120 MNQ | Trails from Day 1 |
| 100K | $3,000 | 14 NQ / 140 MNQ | Trails from Day 1 |
| 150K | $5,000 | 17 NQ / 170 MNQ | Trails from Day 1 |
| 250K | $6,500 | 27 NQ / 270 MNQ | Trails from Day 1 |
| 300K | $7,500 | 35 NQ / 350 MNQ | Trails from Day 1 |

### 3. Session Analyzer (`scripts/session_analyzer.py`)

Market session timing, key trading windows, and session statistics.

**Features:**
- Globex/Asia/London/NY session identification with exact times
- Key NQ trading windows (Opening Drive, AM Reversal, Power Hour, etc.)
- Countdown timers to next session open/close
- Historical session range statistics (if price data provided)
- Holiday and half-day calendar awareness

```bash
# Current session status
python3 scripts/session_analyzer.py

# Specific timezone
python3 scripts/session_analyzer.py --timezone US/Central

# Session stats from historical data
python3 scripts/session_analyzer.py --prices prices.csv

# Show upcoming week schedule
python3 scripts/session_analyzer.py --week

# JSON output
python3 scripts/session_analyzer.py --format json
```

### 4. News Scanner (`scripts/news_scanner.py`)

Economic calendar and news event tracker for NQ-relevant catalysts.

**Features:**
- Built-in economic calendar (FOMC, CPI, PPI, NFP, GDP, Jobless Claims, etc.)
- Impact rating (High/Medium/Low) for each event
- Pre-market news summary via RSS feeds (no API key needed)
- Earnings calendar for major NASDAQ components
- Event countdown timers
- Historical event reaction data for NQ

```bash
# Today's events
python3 scripts/news_scanner.py

# Specific date
python3 scripts/news_scanner.py --date 2026-04-03

# This week's calendar
python3 scripts/news_scanner.py --week

# High-impact events only
python3 scripts/news_scanner.py --impact high

# Include RSS news headlines
python3 scripts/news_scanner.py --news

# JSON output
python3 scripts/news_scanner.py --format json
```

## Workflow: Daily Trading Prep

Use the tools together for a complete pre-market routine:

### Step 1: Check the Calendar
```bash
python3 scripts/news_scanner.py --impact high
```
→ Know what events could move NQ today. Avoid trading into FOMC/CPI.

### Step 2: Analyze the Chart
```bash
python3 scripts/technical_analyzer.py overnight_data.csv
```
→ Get key levels, trend direction, and indicator signals.

### Step 3: Plan Session Timing
```bash
python3 scripts/session_analyzer.py --timezone US/Eastern
```
→ Know when London close overlap happens, when the opening drive ends.

### Step 4: Size Your Position
```bash
python3 scripts/risk_manager.py --account 50k --entry 18450 --stop 18430 --target 18490
```
→ Know exactly how many contracts and where your R:R stands.

### Step 5: Log the Trade
Use `assets/trade-journal-template.md` to record the setup, execution, and review.

## Key NQ/MNQ Trading Concepts

### Tick Values
- **NQ (E-mini NASDAQ):** $5.00 per tick (0.25 point), $20.00 per point
- **MNQ (Micro NASDAQ):** $0.50 per tick (0.25 point), $2.00 per point

### Session Times (ET)
| Session | Open | Close | Character |
|---------|------|-------|-----------|
| Globex (Overnight) | 6:00 PM | 9:30 AM | Lower volume, trend continuation |
| Pre-Market | 8:00 AM | 9:30 AM | News reaction, gap analysis |
| Opening Drive | 9:30 AM | 10:00 AM | High volatility, traps common |
| Morning Session | 10:00 AM | 12:00 PM | Best trend moves |
| Lunch Chop | 12:00 PM | 2:00 PM | Low volume, range-bound |
| Power Hour | 3:00 PM | 4:00 PM | Institutional positioning |
| Post-Market | 4:00 PM | 6:00 PM | Settlement, reduced liquidity |

### Apex Trader Funding Quick Reference
- **Trailing Drawdown:** Follows your highest balance, never resets
- **No daily loss limit** in evaluation — but respect your own
- **Must trade during Apex hours:** Typically Globex session
- **Payout rules:** Varies by PA account type (check current Apex terms)
- **Consistency is key:** Avoid one big winner masking a losing strategy

## References

- `references/apex-account-rules.md` — Complete Apex account specifications and rules
- `references/technical-patterns.md` — NQ-specific chart patterns and indicator strategies
- `references/trading-playbook.md` — Session-based trading playbook with NQ setups

## Assets

- `assets/trade-journal-template.md` — Daily trade journaling template
- `assets/daily-prep-checklist.md` — Pre-market preparation checklist

## Tips for Apex Traders

1. **Respect the trailing drawdown.** It's the #1 account killer. Use the risk manager to track proximity.
2. **Trade the morning session (10-12 ET).** Best liquidity and trend moves on NQ.
3. **Size down on news days.** CPI, FOMC, NFP can move NQ 200+ points in minutes.
4. **Use MNQ to scale in.** 1 NQ = 10 MNQ. Scale into positions with micros for precision.
5. **Journal every trade.** The template is there — use it. Pattern recognition comes from review.
