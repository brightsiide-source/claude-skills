# Apex Trader Funding — Account Rules & Specifications

> Complete reference for all Apex evaluation and PA (Performance Account) rules as they apply to NQ/MNQ futures trading.

## Account Types & Limits

| Account | Starting Balance | Trailing Drawdown | Max NQ | Max MNQ | Monthly Cost |
|---------|-----------------|-------------------|--------|---------|-------------|
| 25K | $25,000 | $1,500 | 4 | 40 | ~$147/mo |
| 50K | $50,000 | $2,500 | 10 | 100 | ~$167/mo |
| 75K | $75,000 | $2,750 | 12 | 120 | ~$187/mo |
| 100K | $100,000 | $3,000 | 14 | 140 | ~$207/mo |
| 150K | $150,000 | $5,000 | 17 | 170 | ~$297/mo |
| 250K | $250,000 | $6,500 | 27 | 270 | ~$407/mo |
| 300K | $300,000 | $7,500 | 35 | 350 | ~$457/mo |

*Pricing subject to change. Apex frequently runs promotions (50-80% off).*

## Trailing Drawdown Mechanics

### How It Works
1. **Starting floor** = Starting Balance - Drawdown Amount
   - Example: 50K account → Floor starts at $47,500
2. **The floor trails UP** with your highest balance (including unrealized P&L)
3. **The floor NEVER trails down** — it only moves up or stays
4. **Account breaches** when balance touches or goes below the floor

### Critical Details
- Trailing drawdown tracks **intraday highs**, not just end-of-day
- If your balance hits $52,500 on a 50K account, your new floor is $50,000
- Once the floor reaches your starting balance ($50,000), it **stops trailing** (on some account types)
- Unrealized P&L counts — a floating profit raises the high-water mark

### Example Scenario (50K Account)
```
Starting:    $50,000  |  Floor: $47,500
Trade 1 win: $51,200  |  Floor: $48,700 (trailed up by $1,200)
Trade 2 win: $52,800  |  Floor: $50,300 (trailed up)
Trade 3 loss: $51,500 |  Floor: $50,300 (doesn't trail down)
Remaining buffer: $51,500 - $50,300 = $1,200
```

## Evaluation Rules

### Pass Criteria
- Reach the profit target for your account size
- Trade a minimum number of days (typically 7)
- Do not breach trailing drawdown

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
- No trading during major news events (varies by Apex policy)
- Must close all positions by end of session (no overnight holds in eval)
- Must trade within allowed hours

## Performance Account (PA) Rules

### After Passing Evaluation
- You receive a funded PA account
- First withdrawal after meeting minimum trading days + profit threshold
- Apex takes a percentage of profits (typically 10-20% after initial payouts)
- Payout schedule: Twice monthly or as specified by Apex

### PA-Specific Rules
- Trailing drawdown still applies
- Position limits may differ
- Scaling plan may apply (start with fewer contracts, earn more over time)
- Consistency rule: No single day P&L > 30-50% of total profits (check current rules)

## Trading Hours

### Allowed Trading Hours
- **Evaluation:** Generally during Globex hours (6:00 PM - 5:00 PM ET next day, with daily halt 5:00-6:00 PM)
- **PA Account:** Same Globex hours, rules may vary

### Not Allowed
- Holding positions during the daily maintenance window (5:00-6:00 PM ET)
- Some accounts restrict trading during high-impact news (check your specific rules)

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

## Risk Management Best Practices for Apex

### The 1% Rule (Adapted for Apex)
- Never risk more than **15-25% of your trailing drawdown** on a single trade
- For a 50K account ($2,500 drawdown): max risk = $375-$625 per trade
- This gives you 4-6 full losing trades before breach

### Position Sizing Formula
```
Max Contracts = (Drawdown × Risk%) / (Stop Distance × Point Value)

Example (50K, 20-point stop on NQ, 20% risk):
Max = ($2,500 × 0.20) / (20 × $20) = $500 / $400 = 1.25 → 1 NQ contract
```

### Daily Loss Limits (Self-Imposed)
- **Conservative:** Stop trading after losing 10% of drawdown ($250 on 50K)
- **Moderate:** Stop after 20% of drawdown ($500 on 50K)
- **Maximum:** Never lose more than 30% of drawdown in one day

### Scaling Strategy
1. Start with **1-2 NQ** or **5-10 MNQ** regardless of max allowed
2. Only scale up after proving consistent profitability
3. Use MNQ to fine-tune position sizes (1 NQ = 10 MNQ)

## Common Account Killers

1. **Revenge trading** after a loss — leads to oversizing and drawdown breach
2. **Moving stop losses** further away — turns small loss into account-ending loss
3. **Ignoring the trailing nature** — profits raise your floor, then a reversal breaches
4. **News trading** without understanding the risk — NQ can move 200+ pts in seconds
5. **Overtrading** — commissions add up, and more trades = more exposure to the trailing drawdown
6. **Not understanding unrealized P&L counts** — floating profit raises the high-water mark

## Useful Links

- Apex Trader Funding: apextraderfunding.com
- CME Group NQ Specs: cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.html
- CME Micro NQ Specs: cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.html

---

*Last updated: April 2026. Always verify current rules at apextraderfunding.com as policies change frequently.*
