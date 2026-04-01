# NQ/MNQ Trading Playbook

> Session-based trading strategies and setups for NASDAQ futures. Each play includes entry criteria, risk parameters, and session timing.

## Pre-Session Checklist

Before taking any trade:

1. **Check the calendar** — Is there a high-impact event today? (CPI, FOMC, NFP)
2. **Identify the overnight trend** — Did NQ trend or range overnight?
3. **Mark key levels** — Prior day H/L, overnight H/L, weekly pivots, VWAP
4. **Assess the gap** — Is NQ gapping up/down from prior close? Size of gap?
5. **Check VIX** — High VIX = wider stops, fewer contracts. Low VIX = tighter plays.
6. **Know your risk** — How much drawdown room do you have? Max loss for the day?

## The Playbook

---

### PLAY 1: Gap & Go (Trend Continuation)

**When:** NQ gaps up/down >30 points and holds above/below VWAP after open

**Setup:**
- Gap direction aligns with overnight trend
- First 5-min candle holds above VWAP (longs) or below (shorts)
- Volume confirms (above average on first bars)

**Entry:** Break of first 15-min high (longs) or low (shorts)
**Stop:** Below VWAP (longs) or above VWAP (shorts) — typically 15-25 pts
**Target 1:** Overnight high/low
**Target 2:** Prior day high/low extension
**R:R:** Minimum 1:2

**Best Time:** 9:30 - 10:30 AM ET
**Apex Sizing:** Conservative (15% of drawdown) — opening volatility is high

---

### PLAY 2: Gap Fill Fade

**When:** NQ gaps 20-60 points with no major catalyst, shows rejection at open

**Setup:**
- Gap is NOT supported by news/earnings (unfilled "air" gap)
- Price fails to break overnight high/low in first 15 minutes
- RSI showing divergence against the gap direction
- VWAP acting as resistance/support against gap continuation

**Entry:** First lower-high (short fill trade) or higher-low (long fill trade) on 5-min chart
**Stop:** Beyond the opening 15-min range extreme — 20-30 pts
**Target:** Prior day close (gap fill)
**R:R:** Minimum 1:1.5

**Best Time:** 9:45 - 11:00 AM ET
**Apex Sizing:** Moderate (25% of drawdown) — high probability when criteria met

---

### PLAY 3: 10 AM Reversal

**When:** NQ makes a directional move from 9:30-10:00, then reverses

**Setup:**
- Strong move in first 30 minutes (often trapping late chasers)
- 10:00 AM data release (ISM, Consumer data) provides catalyst
- RSI reaches extreme (>70 or <30) on 5-min chart
- Candle rejection pattern at key level

**Entry:** Break of the 10:00-10:15 reversal candle
**Stop:** Beyond the 9:30-10:00 extreme — 15-25 pts
**Target 1:** VWAP
**Target 2:** Opening price
**R:R:** Minimum 1:2

**Best Time:** 10:00 - 10:30 AM ET
**Apex Sizing:** Moderate — this is one of the most reliable NQ patterns

---

### PLAY 4: EMA Pullback Continuation

**When:** NQ is trending strongly (EMA 9 > 21 > 50 or vice versa)

**Setup:**
- Clear trend established (at least 3 higher-highs/higher-lows for longs)
- Price pulls back to 9 or 21 EMA on 5-min chart
- MACD histogram still positive (longs) or negative (shorts)
- Pullback on decreasing volume

**Entry:** First candle that holds and closes above 9 EMA (longs) after pullback
**Stop:** Below the 21 EMA — typically 10-20 pts
**Target:** New swing high/low
**R:R:** Minimum 1:2

**Best Time:** 10:00 AM - 12:00 PM ET (morning session trends)
**Apex Sizing:** Moderate to Aggressive (if multiple confluences present)

---

### PLAY 5: VWAP Bounce (Mean Reversion)

**When:** NQ is range-bound and oscillating around VWAP

**Setup:**
- No strong trend (EMAs flat or choppy)
- Price touches VWAP for the 2nd or 3rd time
- RSI in the 40-60 range (not trending)
- Bollinger Bands relatively narrow

**Entry:** Candle that bounces from VWAP with confirmation (next candle continues)
**Stop:** 2 pts beyond VWAP on the opposite side — 8-15 pts
**Target:** Upper/lower Bollinger Band or prior swing
**R:R:** 1:1.5 minimum

**Best Time:** 12:00 - 2:00 PM ET (lunch session)
**Apex Sizing:** Conservative — lunch session is choppy, keep size small

---

### PLAY 6: Power Hour Breakout

**When:** NQ consolidates from 2:00-3:00 PM, then breaks out in the final hour

**Setup:**
- Price coils in a range during the 2:00-3:00 PM window
- MOC (Market on Close) imbalances published at 3:00 PM
- Volume picks up sharply after 3:00 PM
- Direction typically aligns with the dominant daily trend

**Entry:** Break of the 2:00-3:00 PM range with volume confirmation
**Stop:** Midpoint of the afternoon range — 15-25 pts
**Target 1:** Day's high/low extension
**Target 2:** ATR-based target from breakout
**R:R:** 1:1.5 to 1:2

**Best Time:** 3:00 - 3:45 PM ET (close by 3:50 to avoid settlement)
**Apex Sizing:** Moderate — strong setups with institutional flow backing

---

### PLAY 7: Overnight Level Test

**When:** RTH (Regular Trading Hours) opens and tests the overnight high or low

**Setup:**
- Clear overnight range established
- RTH opens within the overnight range
- Price moves toward overnight H/L in first 30-60 minutes
- Watch for rejection (fakeout) or acceptance (breakout) at the level

**Entry (Fade):** Rejection candle at overnight high/low → trade back into range
**Entry (Breakout):** Close beyond overnight high/low with volume → trade continuation
**Stop:** 5-10 pts beyond the overnight level
**Target (Fade):** VWAP or opposite side of overnight range
**Target (Breakout):** Measured move (overnight range projected)

**Best Time:** 9:30 - 10:30 AM ET
**Apex Sizing:** Conservative to Moderate

---

## Day Type Classification

Identify the day type early to select the right plays:

### Trend Day (~20% of days)
- **Characteristics:** Gap and go, one-directional, closes at extreme
- **Best Plays:** Gap & Go (#1), EMA Pullback (#4)
- **Avoid:** Fading the trend, VWAP mean reversion
- **Clue:** First 30-min range break holds, VWAP trends strongly

### Range Day (~50% of days)
- **Characteristics:** Rotates between support/resistance, VWAP-centered
- **Best Plays:** VWAP Bounce (#5), Gap Fill (#2), Overnight Level Test (#7)
- **Avoid:** Breakout trades, chasing momentum
- **Clue:** Price crosses VWAP multiple times, narrow opening range

### Reversal Day (~15% of days)
- **Characteristics:** Starts one direction, reverses strongly
- **Best Plays:** 10 AM Reversal (#3), Gap Fill Fade (#2)
- **Avoid:** Early trend trades, holding through the reversal
- **Clue:** Extreme RSI early, divergence forming, no follow-through on breakout

### Choppy/News Day (~15% of days)
- **Characteristics:** Wild swings, no clear structure, driven by headlines
- **Best Plays:** NONE — sit out or trade only Power Hour (#6)
- **Avoid:** All regular setups — the edge is gone
- **Clue:** High-impact event on calendar, VIX spiking, wide spreads

## Risk Management Rules

### Position Sizing by Day Type
| Day Type | Drawdown Risk | Max Contracts |
|----------|--------------|--------------|
| Trend Day | 25-35% | Up to moderate sizing |
| Range Day | 15-20% | Conservative sizing |
| Reversal Day | 15-20% | Conservative sizing |
| News/Choppy | 10% or FLAT | Minimum or sit out |

### Trade Management
1. **Move stop to breakeven** after reaching 1:1 R:R
2. **Scale out 50%** at Target 1, trail the rest
3. **Maximum 3 losing trades** per day — then stop
4. **Maximum 2 hours of screen time** if not in a trade — prevents overtrading
5. **No trading in the last 10 minutes** (3:50-4:00) — settlement games

### Weekly Goals
- **Minimum:** 3 winning days per week
- **Target:** 4-5 winning days with average winner > average loser
- **Review:** Journal every trade, review weekly on weekends

---

*This playbook is a framework. Adapt it to your own observations and trading style. The best edge comes from combining these setups with your own pattern recognition developed through journaling and screen time.*
