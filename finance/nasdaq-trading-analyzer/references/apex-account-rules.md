# Apex Trader Funding — Account Rules & Specifications

> Complete reference for all Apex evaluation and PA (Performance Account) rules as they apply to NQ/MNQ futures trading. Updated for the **End-of-Day (EOD) drawdown system**.

## Account Types & Limits

| Account | Starting Balance | EOD Drawdown | Max NQ | Max MNQ | Monthly Cost |
|---------|-----------------|-------------|--------|---------|-------------|
| 25K | $25,000 | $1,500 | 4 | 40 | ~$147/mo |
| 50K | $50,000 | $2,500 | 10 | 100 | ~$167/mo |
| 75K | $75,000 | $2,750 | 12 | 120 | ~$187/mo |
| 100K | $100,000 | $3,000 | 14 | 140 | ~$207/mo |
| 150K | $150,000 | $5,000 | 17 | 170 | ~$297/mo |
| 250K | $250,000 | $6,500 | 27 | 270 | ~$407/mo |
| 300K | $300,000 | $7,500 | 35 | 350 | ~$457/mo |

*Pricing subject to change. Apex frequently runs promotions (50-80% off).*

## End-of-Day (EOD) Drawdown System

### How It Works
1. **Starting floor** = Starting Balance - Drawdown Amount
   - Example: 50K account → Floor starts at $47,500
2. **The floor trails UP** based on your highest **end-of-day settled balance** only
3. **Intraday unrealized P&L does NOT move the floor** — this is the key difference from trailing drawdown
4. **Account breaches** when your end-of-day settled balance touches or goes below the floor

### Why EOD Drawdown Is Better for Scalpers
- You can hold through intraday drawdowns without the floor chasing your equity up
- A winning trade that you close at breakeven doesn't permanently raise your floor
- Only your **settled balance at end of day** matters for the drawdown calculation
- Gives you more breathing room for 1m/5m scalping where quick dips and recoveries are normal

### EOD vs Trailing Drawdown — Key Differences
| Aspect | EOD Drawdown | Trailing Drawdown (old) |
|--------|-------------|------------------------|
| Floor moves on | End-of-day settled balance | Intraday equity high (including unrealized) |
| Unrealized P&L | Does NOT affect floor | DOES raise the floor |
| Scalping impact | Favorable — dips don't hurt you | Unfavorable — brief spikes raise floor permanently |
| Floor check | Once per day at settlement | Continuously intraday |

### Example Scenario (50K Account, EOD System)
```
Day 1 start:   $50,000  |  Floor: $47,500
  Intraday high: $51,500 (unrealized) — FLOOR STAYS at $47,500
  EOD balance:   $50,800 (closed winners)
  New floor:     $48,300 (trailed up by $800 based on EOD balance)

Day 2 start:   $50,800  |  Floor: $48,300
  Intraday low:  $49,500 (unrealized drawdown) — NO BREACH (floor is $48,300)
  EOD balance:   $51,400 (recovered and closed green)
  New floor:     $48,900 (trailed up to $51,400 - $2,500)

Day 3 start:   $51,400  |  Floor: $48,900
  Bad day, EOD:  $49,200 — STILL SAFE (above floor of $48,900)
  Floor stays:   $48,900 (doesn't trail down)
```

## Evaluation Rules

### Pass Criteria
- Reach the profit target for your account size
- Trade a minimum number of days (typically 7)
- Do not breach EOD drawdown

### Profit Targets
| Account | Profit Target |
|---------|--------------|
| 25K | $1,500 |
| 50K | $3,000 |
| 75K | $4,250 |
| 100K | $6,000 |
| 150K | $9,000 |
| 250K | $15,000 |
| 300K | $20,000 |

### Restrictions During Evaluation
- Must close all positions by end of session (no overnight holds in eval)
- Must trade within allowed hours
- Check current Apex rules for news trading restrictions

## Performance Account (PA) Rules

### After Passing Evaluation
- You receive a funded PA account
- First withdrawal after meeting minimum trading days + profit threshold
- Apex takes a percentage of profits (typically 10-20% after initial payouts)
- Payout schedule: Twice monthly or as specified by Apex

### PA-Specific Rules
- EOD drawdown still applies
- Position limits may differ
- Scaling plan may apply (start with fewer contracts, earn more over time)
- Consistency rule: No single day P&L > 30-50% of total profits (check current rules)

## Trading Hours

### Allowed Trading Hours
- **Evaluation:** Generally during Globex hours (6:00 PM - 5:00 PM ET next day, with daily halt 5:00-6:00 PM)
- **PA Account:** Same Globex hours, rules may vary

### Not Allowed
- Holding positions during the daily maintenance window (5:00-6:00 PM ET)
- Check your specific account rules for any additional restrictions

## Instruments Available

### NASDAQ Futures
- **NQ** (E-mini NASDAQ 100): $20/point, $5/tick
- **MNQ** (Micro E-mini NASDAQ 100): $2/point, $0.50/tick

### Other Available (varies by account)
- ES/MES (S&P 500)
- YM/MYM (Dow Jones)
- RTY/M2K (Russell 2000)
- CL/MCL (Crude Oil)
- GC/MGC (Gold)
- And others

## Risk Management for EOD Drawdown + 1m/5m Scalping

### Position Sizing Formula
```
Max Contracts = (Drawdown × Risk%) / (Stop Distance × Point Value)

Example (50K, 8-point stop on NQ, 20% risk):
Max = ($2,500 × 0.20) / (8 × $20) = $500 / $160 = 3.1 → 3 NQ contracts
```

### Scalping-Specific Risk Rules
- **Tight stops on 1m/5m:** Typical stop distance = 5-15 points (20-60 ticks)
- **With EOD drawdown, you can recover intraday** — a dip to -$800 unrealized doesn't breach if you close green
- **But don't abuse it** — still manage risk per trade to avoid a cascade of realized losses
- **Daily loss limit (self-imposed):** Stop after losing 20-30% of drawdown in realized losses
- **Max trades per day:** Cap at 6-8 scalps to avoid overtrading and commission drag

### Daily Loss Limits (Self-Imposed)
| Level | Max Daily Realized Loss | 50K Example |
|-------|------------------------|-------------|
| Conservative | 15% of drawdown | $375 |
| Moderate | 25% of drawdown | $625 |
| Maximum | 35% of drawdown | $875 |

### Scaling Strategy for Scalpers
1. Start with **1-2 NQ** or **5-10 MNQ** regardless of max allowed
2. On 1m/5m charts, use MNQ to scale in/out with precision
3. Only scale up size after 2+ weeks of consistent green days
4. **1 NQ = 10 MNQ** — use MNQ for fine-grained position management

## Common Account Killers (EOD System)

1. **Revenge trading** after a loss — multiple realized losses stack up against EOD floor
2. **Moving stop losses** further away — turns small scalp loss into account-ending loss
3. **Not closing losers** — EOD drawdown gives you intraday room, but don't let losers run to settlement
4. **News trading** without understanding the risk — NQ can move 200+ pts in minutes on CPI/FOMC
5. **Overtrading on 1m** — commissions eat into scalp profits; be selective with setups
6. **Thinking EOD = unlimited intraday risk** — your settled balance at day's end is what matters

## EOD Drawdown Advantage: How to Use It

The EOD system is a significant edge for scalpers:

1. **Take the trade with proper stop** — if stopped out, the loss is realized and counted
2. **Hold through normal noise** — intraday dips in unrealized P&L won't kill your account
3. **If a trade goes against you but hasn't hit stop** — you have room to manage it
4. **Close flat trades freely** — entering and exiting at breakeven doesn't raise the floor
5. **Focus on ending each day green** — even a small green day is a win with EOD drawdown

## Useful Links

- Apex Trader Funding: apextraderfunding.com
- CME Group NQ Specs: cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.html
- CME Micro NQ Specs: cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.html

---

*Last updated: April 2026. Always verify current rules at apextraderfunding.com as policies change frequently.*
