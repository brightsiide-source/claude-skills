# NQ/MNQ Trading Playbook

> Session-based scalping strategies for NASDAQ futures on **1-minute and 5-minute charts**. Each play includes entry criteria, risk parameters, and session timing. Built for Apex Trader Funding's **EOD drawdown** system.

## Pre-Session Checklist

Before taking any trade:

1. **Check the calendar** — Is there a high-impact event today? (CPI, FOMC, NFP)
2. **Identify the overnight trend** — Did NQ trend or range overnight?
3. **Mark key levels** — Prior day H/L, overnight H/L, weekly pivots, VWAP
4. **Assess the gap** — Is NQ gapping up/down from prior close? Size of gap?
5. **Check VIX** — High VIX = wider stops, fewer contracts. Low VIX = tighter plays.
6. **Know your risk** — How much EOD drawdown room do you have? Set a max daily realized loss limit.

## The Playbook

---

### PLAY 1: Gap & Go Scalp (Trend Continuation)

**When:** NQ gaps up/down >30 points and holds above/below VWAP after open

**Setup:**
- Gap direction aligns with overnight trend
- First 5-min candle holds above VWAP (longs) or below (shorts)
- 1-min chart shows higher lows (longs) forming after open

**Entry:** 1-min break above the first 5-min candle high (longs) or below low (shorts)
**Stop:** Below the 5-min candle low — typically 8-15 pts
**Target 1:** 10-20 pts (quick scalp) or overnight high/low
**Target 2:** Prior day high/low extension
**R:R:** Minimum 1:1.5

**Best Time:** 9:30 - 10:00 AM ET
**Apex Sizing:** Conservative (15% of drawdown) — opening volatility is high
**EOD Advantage:** Even if the first scalp dips against you, intraday unrealized loss doesn't move your floor

---

### PLAY 2: Gap Fill Fade Scalp

**When:** NQ gaps 20-60 points with no major catalyst, shows rejection at open

**Setup:**
- Gap is NOT supported by news/earnings (unfilled "air" gap)
- 5-min chart: Price fails to break overnight high/low in first 10 minutes
- 1-min chart: RSI divergence forming against gap direction
- VWAP acting as resistance/support against gap continuation

**Entry:** 1-min lower-high (short fill) or higher-low (long fill) with confirming candle close
**Stop:** Beyond the 5-min opening range extreme — 10-15 pts
**Target:** VWAP first (quick scalp), then prior day close (gap fill)
**R:R:** Minimum 1:1.5

**Best Time:** 9:40 - 10:30 AM ET
**Apex Sizing:** Moderate (25% of drawdown) — high probability when criteria met

---

### PLAY 3: 10 AM Reversal Scalp

**When:** NQ makes a directional move from 9:30-10:00, then reverses

**Setup:**
- Strong move in first 30 minutes (often trapping late chasers)
- 10:00 AM data release (ISM, Consumer data) provides catalyst
- 5-min RSI reaches extreme (>65 or <35)
- 1-min chart shows clear reversal candle (engulfing, pin bar) at key level

**Entry:** 1-min break of the reversal candle, confirmed by 5-min RSI turning
**Stop:** Beyond the 9:30-10:00 extreme — 8-15 pts (use 1-min swing point)
**Target 1:** VWAP (quick scalp, 5-15 pts)
**Target 2:** Opening price
**R:R:** Minimum 1:2

**Best Time:** 10:00 - 10:30 AM ET
**Apex Sizing:** Moderate — this is one of the most reliable NQ patterns on any timeframe

---

### PLAY 4: EMA Pullback Scalp (Trend Continuation)

**When:** NQ is trending strongly (5-min EMA 9 > 21 for longs)

**Setup:**
- Clear trend on 5-min chart (EMA 9 > 21, at least 3 higher-highs)
- Price pulls back to 9 EMA on 5-min chart
- 1-min chart shows pullback stalling (decreasing volume, doji/hammer candles)
- MACD histogram on 5-min still positive (longs) or negative (shorts)

**Entry:** 1-min candle closes above 5-min 9 EMA after the pullback
**Stop:** Below the 1-min pullback low or 5-min 21 EMA — 5-12 pts
**Target:** New 5-min swing high/low (8-20 pts)
**R:R:** Minimum 1:2

**Best Time:** 10:00 AM - 12:00 PM ET (morning session trends)
**Apex Sizing:** Moderate to Aggressive — **best scalp pattern for 1m/5m traders**

---

### PLAY 5: VWAP Bounce Scalp (Mean Reversion)

**When:** NQ is range-bound and oscillating around VWAP

**Setup:**
- No strong trend on 5-min (EMAs flat or choppy)
- 5-min price touches VWAP for the 2nd or 3rd time
- 1-min shows reversal candle at VWAP (pin bar, engulfing)
- 1-min RSI divergence at VWAP touch

**Entry:** 1-min reversal candle at VWAP, enter on the close
**Stop:** 3-5 pts beyond VWAP on the opposite side
**Target:** 5-10 pts — prior 1-min swing or Bollinger Band on 5-min
**R:R:** 1:1.5 minimum

**Best Time:** 12:00 - 2:00 PM ET (lunch session)
**Apex Sizing:** Conservative — lunch session is choppy, keep size small. Quick in-and-out.

---

### PLAY 6: Power Hour Breakout Scalp

**When:** NQ consolidates from 2:00-3:00 PM, then breaks out in the final hour

**Setup:**
- 5-min chart shows price coiling in a range during 2:00-3:00 PM
- MOC (Market on Close) imbalances published at 3:00 PM
- 1-min volume picks up sharply after 3:00 PM
- Direction typically aligns with the dominant daily trend

**Entry:** 1-min break of the afternoon range with volume bar confirmation
**Stop:** Midpoint of the afternoon range — 8-15 pts
**Target 1:** Day's high/low extension (10-25 pts)
**Target 2:** ATR-based target from breakout
**R:R:** 1:1.5 to 1:2

**Best Time:** 3:00 - 3:45 PM ET (close by 3:50 to avoid settlement)
**Apex Sizing:** Moderate — strong setups with institutional flow backing

---

### PLAY 7: Overnight Level Test Scalp

**When:** RTH (Regular Trading Hours) opens and tests the overnight high or low

**Setup:**
- Clear overnight range established (mark levels pre-market)
- RTH opens within the overnight range
- 5-min price approaches overnight H/L
- 1-min shows rejection pattern (wick, engulfing) or clean break with volume

**Entry (Fade):** 1-min rejection candle at overnight high/low → scalp back toward VWAP
**Entry (Breakout):** 1-min close beyond overnight high/low with volume → ride continuation
**Stop:** 5-8 pts beyond the overnight level
**Target (Fade):** VWAP (5-15 pts)
**Target (Breakout):** Measured move or next level (10-20 pts)

**Best Time:** 9:30 - 10:15 AM ET
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

### Trade Management (1m/5m Scalps)
1. **Move stop to breakeven** after 50%+ of target reached
2. **Scale out 50%** at Target 1 (using MNQ for precision), trail the rest on 1-min
3. **Maximum 3 consecutive losing trades** — then take a 30-min break
4. **Maximum 6-8 total trades per day** — scalping more than this invites tilt and commission drag
5. **No trading in the last 10 minutes** (3:50-4:00) — settlement games
6. **With EOD drawdown:** You can hold through normal 1-min noise — don't panic-exit every dip

### Weekly Goals
- **Minimum:** 3 winning days per week
- **Target:** 4-5 winning days with average winner > average loser
- **Review:** Journal every trade, review weekly on weekends

---

*This playbook is a framework. Adapt it to your own observations and trading style. The best edge comes from combining these setups with your own pattern recognition developed through journaling and screen time.*
