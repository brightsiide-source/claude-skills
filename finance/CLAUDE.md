# Finance Skills - Claude Code Guidance

This guide covers the finance skills and their Python automation tools.

## Finance Skills Overview

**Available Skills:**
1. **financial-analyst/** - Financial statement analysis, ratio analysis, DCF valuation, budgeting, forecasting (4 Python tools)
2. **saas-metrics-coach/** - SaaS financial health: ARR, MRR, churn, CAC, LTV, NRR, Quick Ratio, 12-month projections (3 Python tools)
3. **nasdaq-trading-analyzer/** - NASDAQ futures (NQ/MNQ) technical analysis, Apex Trader Funding risk management, session timing, economic calendar & news scanning (4 Python tools)

**Total Tools:** 11 Python automation tools, 8 knowledge bases, 8 templates

**Commands:** 2 (`/financial-health`, `/saas-health`)

## Python Automation Tools

### 1. Ratio Calculator (`financial-analyst/scripts/ratio_calculator.py`)

**Purpose:** Calculate and interpret financial ratios from statement data

**Features:**
- Profitability ratios (ROE, ROA, Gross/Operating/Net Margin)
- Liquidity ratios (Current, Quick, Cash)
- Leverage ratios (Debt-to-Equity, Interest Coverage, DSCR)
- Efficiency ratios (Asset/Inventory/Receivables Turnover, DSO)
- Valuation ratios (P/E, P/B, P/S, EV/EBITDA, PEG)
- Built-in interpretation and benchmarking

**Usage:**
```bash
python financial-analyst/scripts/ratio_calculator.py financial_data.json
python financial-analyst/scripts/ratio_calculator.py financial_data.json --format json
```

### 2. DCF Valuation (`financial-analyst/scripts/dcf_valuation.py`)

**Purpose:** Discounted Cash Flow enterprise and equity valuation

**Features:**
- Revenue and cash flow projections
- WACC calculation (CAPM-based)
- Terminal value (perpetuity growth and exit multiple methods)
- Enterprise and equity value derivation
- Two-way sensitivity analysis
- No external dependencies (uses math/statistics)

**Usage:**
```bash
python financial-analyst/scripts/dcf_valuation.py valuation_data.json
python financial-analyst/scripts/dcf_valuation.py valuation_data.json --format json
```

### 3. Budget Variance Analyzer (`financial-analyst/scripts/budget_variance_analyzer.py`)

**Purpose:** Analyze actual vs budget vs prior year performance

**Features:**
- Variance calculation (actual vs budget, actual vs prior year)
- Materiality threshold filtering
- Favorable/unfavorable classification
- Department and category breakdown

**Usage:**
```bash
python financial-analyst/scripts/budget_variance_analyzer.py budget_data.json
python financial-analyst/scripts/budget_variance_analyzer.py budget_data.json --format json
```

### 4. Forecast Builder (`financial-analyst/scripts/forecast_builder.py`)

**Purpose:** Driver-based revenue forecasting and cash flow projection

**Features:**
- Driver-based revenue forecast model
- 13-week cash flow projection
- Scenario modeling (base/bull/bear)
- Trend analysis from historical data

**Usage:**
```bash
python financial-analyst/scripts/forecast_builder.py forecast_data.json
python financial-analyst/scripts/forecast_builder.py forecast_data.json --format json
```

## Quality Standards

**All finance Python tools must:**
- Use standard library only (math, statistics, json, argparse)
- Support both JSON and human-readable output via `--format` flag
- Provide clear error messages for invalid input
- Return appropriate exit codes
- Process files locally (no API calls)
- Include argparse CLI with `--help` support

### 5. Technical Analyzer (`nasdaq-trading-analyzer/scripts/technical_analyzer.py`)

**Purpose:** Compute technical indicators for NQ/MNQ futures price data

**Features:**
- RSI, MACD, EMA, SMA, Bollinger Bands, ATR, VWAP, Stochastic
- Pivot points and support/resistance detection
- Overall bias calculation from indicator confluence

**Usage:**
```bash
python nasdaq-trading-analyzer/scripts/technical_analyzer.py prices.csv
python nasdaq-trading-analyzer/scripts/technical_analyzer.py prices.csv --indicators rsi,macd --format json
```

### 6. Risk Manager (`nasdaq-trading-analyzer/scripts/risk_manager.py`)

**Purpose:** Position sizing and drawdown tracking for Apex Trader Funding accounts

**Features:**
- All Apex account types (25K–300K) with correct drawdown limits
- Conservative/moderate/aggressive position sizing
- Multi-target scale-out planning
- Drawdown proximity warnings

**Usage:**
```bash
python nasdaq-trading-analyzer/scripts/risk_manager.py --account 50k --entry 18450 --stop 18430 --target 18490
python nasdaq-trading-analyzer/scripts/risk_manager.py --account 50k --balance 51200 --pnl -300
```

### 7. Session Analyzer (`nasdaq-trading-analyzer/scripts/session_analyzer.py`)

**Purpose:** Market session timing, key events, and trading windows

**Usage:**
```bash
python nasdaq-trading-analyzer/scripts/session_analyzer.py --timezone US/Eastern
python nasdaq-trading-analyzer/scripts/session_analyzer.py --week
```

### 8. News Scanner (`nasdaq-trading-analyzer/scripts/news_scanner.py`)

**Purpose:** Economic calendar and news headlines for NQ-moving events

**Usage:**
```bash
python nasdaq-trading-analyzer/scripts/news_scanner.py --impact high
python nasdaq-trading-analyzer/scripts/news_scanner.py --week --news
```

## Related Skills

- **C-Level:** Strategic financial decision-making -> `../c-level-advisor/`
- **Business & Growth:** Revenue operations, sales metrics -> `../business-growth/`
- **Product Team:** Budget allocation, RICE scoring -> `../product-team/`

---

**Last Updated:** April 2026
**Skills Deployed:** 3/3 finance skills production-ready
**Total Tools:** 11 Python automation tools
**Commands:** /financial-health, /saas-health
