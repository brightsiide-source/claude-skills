# Daily Pre-Market Prep Checklist

## 1. Calendar Check (7:30 AM ET)
- [ ] Run: `python3 scripts/news_scanner.py --impact high`
- [ ] Note any HIGH impact events and their times
- [ ] If FOMC/CPI/NFP → reduce size or plan to sit out
- [ ] Check earnings: any Mag 7 reporting today/after close?

## 2. Overnight Analysis (8:00 AM ET)
- [ ] Mark overnight high: _______
- [ ] Mark overnight low: _______
- [ ] Overnight trend direction: UP / DOWN / RANGE
- [ ] Gap from prior close: _______ points (UP / DOWN)
- [ ] Asia session behavior: _______
- [ ] London session behavior: _______

## 3. Technical Levels (8:15 AM ET)
- [ ] Run: `python3 scripts/technical_analyzer.py overnight_data.csv`
- [ ] Prior day high: _______
- [ ] Prior day low: _______
- [ ] Prior day close: _______
- [ ] VWAP (developing): _______
- [ ] Daily pivot point: _______
- [ ] R1/R2: _______ / _______
- [ ] S1/S2: _______ / _______
- [ ] Key EMA levels (9/21/50): _______ / _______ / _______
- [ ] RSI reading: _______ (overbought/oversold/neutral?)
- [ ] ATR (14): _______ points

## 4. Bias Formation (8:30 AM ET)
- [ ] Overall bias: LONG / SHORT / NEUTRAL
- [ ] Confidence: HIGH / MEDIUM / LOW
- [ ] Reasons for bias:
  1. _______
  2. _______
  3. _______
- [ ] What would invalidate my bias? _______

## 5. Risk Parameters (8:45 AM ET)
- [ ] Run: `python3 scripts/risk_manager.py --account {size} --balance {current}`
- [ ] Account type: _______
- [ ] Current balance: $_______
- [ ] Remaining drawdown: $_______
- [ ] Drawdown floor: $_______
- [ ] Max risk per trade: $_______ (___% of drawdown)
- [ ] Max daily loss limit: $_______
- [ ] Position size: _______ contracts
- [ ] Stop distance for today's ATR: _______ points

## 6. Session Timing (9:00 AM ET)
- [ ] Run: `python3 scripts/session_analyzer.py`
- [ ] Opening Drive: 9:30-10:00 — WAIT for confirmation
- [ ] Best window: 10:00-12:00 — primary trading time
- [ ] Lunch: 12:00-2:00 — reduce or stop
- [ ] Power Hour: 3:00-4:00 — last opportunity
- [ ] Stop trading by: _______ (latest)

## 7. Playbook Selection
Based on overnight action and gap analysis, today's most likely plays:

- [ ] Primary play: #___  _______
- [ ] Secondary play: #___  _______
- [ ] If the day turns choppy: SIT OUT or play #5 (VWAP bounce only)

## 8. Mental Prep
- [ ] I accept I may lose today — my stop is my friend
- [ ] I will follow my playbook, not chase
- [ ] I will stop after 3 losers — no revenge trading
- [ ] I will journal every trade
- [ ] My goal today: _______ (process goal, not dollar goal)

---

**Ready to trade: YES / NO**

If NO → what's missing? _______
