# Tradovate Live Connector — Setup Guide

This guide walks you through connecting the NASDAQ Trading Analyzer to Tradovate for real-time market data, account tracking, and automated trade journaling.

---

## 1. Prerequisites

Before starting, make sure you have:

- **Tradovate account** — either a demo (paper trading) or live account at [trader.tradovate.com](https://trader.tradovate.com)
- **Python 3.10+** — verify with `python3 --version`
- **websocket-client** package — installed via pip (see Section 3)

A demo account is free and provides full market data access. Start with demo to validate your setup before connecting a live account.

---

## 2. Getting Your API Credentials

1. Log in to [trader.tradovate.com](https://trader.tradovate.com)
2. Navigate to **Settings** → **API Access**
3. Click **Create New API Application**
   - Name it anything you like (e.g., "NQAnalyzer")
   - No special permissions are needed for market data
4. After creation, note two values:
   - **Client ID (cid)** — a numeric integer
   - **Client Secret (sec)** — an alphanumeric string
5. Your **username** and **password** are your normal Tradovate login credentials

**IMPORTANT:** Start with the **DEMO** environment to test your connection. Switch to live only after confirming everything works correctly. API credentials give full trading access to your account — treat them like a password.

---

## 3. Installing Dependencies

The live connector requires the `websocket-client` package for real-time WebSocket communication with Tradovate:

```bash
pip install websocket-client
```

All other dependencies are Python standard library. No additional packages are needed.

To verify the installation:

```bash
python3 -c "import websocket; print(websocket.__version__)"
```

---

## 4. Configuration

### Copy the Template

```bash
cp assets/tradovate-config.example.json tradovate-config.json
```

### Fill In Your Credentials

Open `tradovate-config.json` and replace the placeholder values:

| Field | Value |
|-------|-------|
| `username` | Your Tradovate login username |
| `password` | Your Tradovate login password |
| `cid` | Client ID from API Access settings (integer) |
| `sec` | Client Secret from API Access settings (string) |
| `environment` | `demo` for paper trading, `live` for real account |
| `symbol` | Current front-month contract symbol |
| `apex_account` | Your Apex account size for drawdown tracking |

### Security Warning

**NEVER commit config files with real credentials.** The `tradovate-config.json` filename is already covered by `.gitignore` patterns. Double-check that your config file is not tracked:

```bash
git status tradovate-config.json
```

If it shows as tracked, add it to `.gitignore` immediately.

### Contract Symbol Codes

NQ and MNQ futures roll quarterly. The symbol format is `{instrument}{month_code}{year_digit}`:

| Month Code | Expiration Month |
|------------|-----------------|
| **H** | March |
| **M** | June |
| **U** | September |
| **Z** | December |

The year digit is the last digit of the year (e.g., `6` for 2026).

**Examples:**
- `NQM6` — Full-size NQ, June 2026
- `NQU6` — Full-size NQ, September 2026
- `MNQM6` — Micro NQ, June 2026
- `MNQZ6` — Micro NQ, December 2026

Always update your config symbol after each quarterly contract roll.

---

## 5. Running the Live Connector

### Demo Mode (Recommended First)

```bash
python3 scripts/live_connector.py --config tradovate-config.json --demo
```

The `--demo` flag forces the demo environment regardless of what is set in the config file.

### Live Mode

```bash
python3 scripts/live_connector.py --config tradovate-config.json
```

Uses the environment specified in your config file. Make sure `environment` is set to `live`.

### Additional Options

| Flag | Description |
|------|-------------|
| `--no-account` | Market data only — skip account balance and P&L tracking |
| `--format json` | Output JSON instead of the formatted dashboard (useful for piping to other tools) |
| `--symbol MNQM6` | Override the symbol from the config file |
| `--account-type 100k` | Override the Apex account type from the config file |

### Combined Examples

```bash
# Watch Micro NQ with a 100k account in demo mode
python3 scripts/live_connector.py --config tradovate-config.json --demo --symbol MNQM6 --account-type 100k

# Stream JSON market data without account tracking
python3 scripts/live_connector.py --config tradovate-config.json --no-account --format json

# Pipe JSON output to another process
python3 scripts/live_connector.py --config tradovate-config.json --format json | python3 scripts/technical_analyzer.py --stdin
```

---

## 6. Understanding the Dashboard

When running in terminal mode (default), the live connector displays a multi-section dashboard that refreshes every few seconds.

### Price Bar

The top section shows the current price action:

- **Last price** — most recent trade price
- **Bid/Ask** — current best bid and best ask with spread
- **Session High/Low** — intraday range
- **Volume** — cumulative session volume
- **Change** — points and percentage change from prior session close

### Session Info

- **Current session** — Pre-Market, RTH (Regular Trading Hours), or Post-Market
- **Time remaining** — countdown to next session boundary
- **Session VWAP** — volume-weighted average price for the current session

### EOD Drawdown Status

Tracks your account against Apex Trader Funding end-of-day drawdown rules:

- **Account balance** — current equity
- **EOD drawdown level** — the minimum balance you must stay above at session close
- **Drawdown remaining** — how much room you have before hitting the limit
- **Status indicator** — GREEN (safe), YELLOW (caution, within 30%), RED (danger, within 15%)

### 5-Minute Signals

Technical indicator readings on the 5-minute timeframe:

- **EMA 9/21** — trend direction and crossover status
- **RSI** — overbought/oversold with divergence detection
- **MACD** — histogram direction and signal line crossovers
- **Bollinger Bands** — squeeze detection and band position
- **VWAP** — price position relative to VWAP

### Key Levels

Automatically calculated support and resistance levels:

- **Prior day high/low/close**
- **Overnight high/low**
- **VWAP and standard deviation bands**
- **Pivot points** (daily R1/R2/S1/S2)

### Setup Alerts

Real-time pattern detection alerts appear at the bottom of the dashboard when a tradeable setup is identified. See Section 7 for details on each alert type.

---

## 7. Setup Alerts Explained

The live connector monitors for five pattern types and generates alerts when conditions align. Each alert includes a suggested direction, entry zone, and invalidation level.

### EMA Pullback

**What it detects:** Price pulls back to the 9 or 21 EMA during a trending move, then shows a rejection candle (wick off the EMA with close back in trend direction).

**How to act:** Enter in the trend direction when price holds the EMA. Stop loss below the pullback low (longs) or above the pullback high (shorts). Target the prior swing high/low or a measured move.

### VWAP Bounce

**What it detects:** Price tests the session VWAP level and bounces — confirmed by a strong close back away from VWAP with increasing volume.

**How to act:** Enter on the bounce in the direction of the rejection. VWAP acts as dynamic support/resistance. Stop loss on the other side of VWAP. Target the next key level or VWAP standard deviation band.

### Bollinger Squeeze

**What it detects:** Bollinger Band width contracts to its narrowest point over the last 20 bars, signaling a volatility expansion is imminent.

**How to act:** Prepare for a breakout in either direction. Wait for the first strong close outside the bands with volume confirmation before entering. The squeeze identifies the timing — the breakout direction determines the trade.

### RSI Divergence

**What it detects:** Price makes a new high/low but RSI fails to confirm, creating a divergence signal. Bullish divergence: price makes a lower low, RSI makes a higher low. Bearish divergence: price makes a higher high, RSI makes a lower high.

**How to act:** Divergence warns that momentum is fading. Wait for a price confirmation (break of the minor swing) before entering against the prior trend. Works best at key support/resistance levels.

### MACD Crossover

**What it detects:** The MACD line crosses above (bullish) or below (bearish) the signal line, with the histogram flipping direction.

**How to act:** Enter in the crossover direction when confirmed by price action. Crossovers near the zero line are stronger signals. Avoid crossovers during choppy, range-bound conditions.

---

## 8. Auto Trade Journal

The live connector automatically logs all fills (executed trades) to a trade journal file for post-session review.

### How It Works

- Every fill event from Tradovate is captured in real time
- Each entry records: timestamp, symbol, side (buy/sell), quantity, fill price, order type, and account balance at time of fill
- Entries and exits are paired automatically when positions close

### Journal File Location

Journal files are saved to the `trade-journals/` directory (created automatically):

```
trade-journals/
├── 2026-04-01-journal.csv
├── 2026-04-02-journal.csv
└── ...
```

Each day gets its own file, named by date.

### Export and Review

The journal files are standard CSV format, importable into any spreadsheet or analysis tool:

```bash
# View today's journal
cat trade-journals/$(date +%Y-%m-%d)-journal.csv

# Analyze with the technical analyzer
python3 scripts/technical_analyzer.py --journal trade-journals/2026-04-01-journal.csv
```

Fields in each row: `timestamp`, `symbol`, `side`, `qty`, `price`, `order_type`, `pnl`, `balance`, `notes`.

---

## 9. Troubleshooting

### "Failed to authorize"

- Double-check your `username`, `password`, `cid`, and `sec` values in the config file
- Make sure there are no extra spaces or quotes around the values
- Try the **demo** environment first — if demo works but live does not, your live credentials may differ
- Verify your API application is still active at trader.tradovate.com → Settings → API Access

### "No bars received"

- Futures markets are not open 24/7. NQ trades Sunday 6:00 PM to Friday 5:00 PM ET with a daily halt from 5:00–6:00 PM ET
- Check that you are using the correct contract symbol (it may have rolled to the next quarter)
- Verify your internet connection and that Tradovate is not experiencing an outage

### "websocket-client not found"

- Run `pip install websocket-client` (or `pip3 install websocket-client`)
- If using a virtual environment, make sure it is activated
- Verify with `python3 -c "import websocket; print('OK')"`

### Connection Drops

- Auto-reconnect is built into the live connector — it will attempt to reconnect automatically
- If reconnection fails repeatedly, check your internet connection
- Restart the connector manually if the issue persists
- Tradovate may perform maintenance during off-hours (weekends)

### Wrong Symbol / "Instrument not found"

- The contract may have rolled to the next quarter — update your config to the current front-month symbol
- Use the contract roll schedule in Section 10 to determine the current symbol
- Verify the symbol exists by checking the Tradovate platform directly

---

## 10. Contract Roll Schedule

NQ and MNQ futures contracts roll quarterly. The front-month contract changes on the **third Friday** of the expiration month. After the roll, the prior contract becomes illiquid — always trade the front month.

| Roll Date | Old Contract | New Contract |
|-----------|-------------|-------------|
| March (3rd Friday) | NQH6 / MNQH6 | NQM6 / MNQM6 |
| June (3rd Friday) | NQM6 / MNQM6 | NQU6 / MNQU6 |
| September (3rd Friday) | NQU6 / MNQU6 | NQZ6 / MNQZ6 |
| December (3rd Friday) | NQZ6 / MNQZ6 | NQH7 / MNQH7 |

**Best practice:** Update your config symbol 1–2 days before the roll date. Most volume migrates to the new contract in the days leading up to expiration.

To check the current front-month contract, look at volume — the contract with the highest daily volume is the active front month.

---

## 11. Security Notes

- **Never share your config file** — it contains credentials that grant full trading access to your account
- **Use demo for all testing** — only switch to live after you are confident in your setup
- **API credentials = account access** — anyone with your cid, sec, username, and password can place trades on your account
- **Rotate credentials periodically** — delete and recreate your API application at Tradovate if you suspect compromise
- **Do not store credentials in scripts** — always use the external config file, which is excluded from version control
- **Review API access logs** — Tradovate tracks API connections; check periodically for unauthorized access
