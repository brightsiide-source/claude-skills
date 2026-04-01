# NQ/MNQ Technical Patterns & Indicator Strategies

> Chart patterns, indicator setups, and confluence techniques for NASDAQ futures. Optimized for **1-minute and 5-minute scalping** timeframes.

## Indicator Quick Reference

### RSI (Relative Strength Index)
| Reading | Interpretation | NQ Action |
|---------|---------------|-----------|
| > 80 | Extremely overbought | Look for short entries on divergence |
| 70-80 | Overbought | Tighten long stops, no new longs |
| 50-70 | Bullish momentum | Buy dips toward 50 |
| 40-50 | Neutral zone | Wait for direction |
| 20-40 | Bearish momentum | Sell rallies toward 50 |
| < 20 | Extremely oversold | Look for long entries on divergence |

**NQ-Specific Notes (1m/5m Scalping):**
- NQ trends harder than ES — RSI can stay overbought/oversold longer
- **5-min RSI** is your primary signal — use for entry timing within the trend
- **1-min RSI** can be noisy; best used to confirm 5-min signals or spot micro-divergence
- On 1m charts, RSI >65 or <35 is often sufficient (don't wait for 70/30 extremes)

### MACD (12/26/9)
| Signal | Description | Action |
|--------|-------------|--------|
| Bullish crossover | MACD crosses above signal | Long entry signal |
| Bearish crossover | MACD crosses below signal | Short entry signal |
| Histogram expanding | Momentum increasing | Hold position |
| Histogram contracting | Momentum fading | Tighten stops |
| Zero line cross (up) | Trend turning bullish | Strong buy signal |
| Zero line cross (down) | Trend turning bearish | Strong sell signal |

### EMA Stack
| Configuration | Meaning | NQ Behavior |
|--------------|---------|-------------|
| Price > 9 > 21 > 50 > 200 | Perfect bull stack | Trend continuation, buy pullbacks to 9/21 EMA |
| Price < 9 < 21 < 50 < 200 | Perfect bear stack | Trend continuation, sell rallies to 9/21 EMA |
| 9 crossing 21 | Short-term momentum shift | Early entry signal |
| 50 crossing 200 | Golden/Death cross | Major trend change (rare on intraday) |
| Price between 9 and 21 | Consolidation | Wait for break above/below |

### Bollinger Bands (20/2)
| Condition | Interpretation | Trade |
|-----------|---------------|-------|
| Squeeze (narrow bands) | Low volatility, breakout imminent | Prepare for directional move |
| Price walks upper band | Strong uptrend | Buy dips to middle band |
| Price walks lower band | Strong downtrend | Sell rallies to middle band |
| Touch upper + RSI > 70 | Potential reversal | Look for short |
| Touch lower + RSI < 30 | Potential reversal | Look for long |

### ATR (Average True Range)
- **NQ typical daily ATR:** 150-300 points (varies with VIX)
- **For 1m/5m scalping:** Use 0.3-0.5× the 5-min ATR for stop placement (typically 5-15 points)
- **High ATR days:** Reduce contracts, widen stops slightly, but scalps still work with EOD drawdown
- **Low ATR days:** Tighter stops, smaller targets — good for VWAP scalps
- **1-min ATR:** Useful for setting micro-targets on quick scalps (2-5 point moves)

## Chart Patterns for 1m/5m NQ Scalping

### High-Probability Scalp Setups

#### 1. Opening Range Breakout (ORB) — 5min
- **Setup:** Mark the high/low of the first 5-15 minutes after 9:30 AM (use 5-min candles)
- **Entry:** Break above range high (long) or below range low (short) on 1-min confirmation
- **Stop:** Midpoint or opposite side of the range (typically 8-15 points)
- **Target:** 1:1.5 to 1:2 R:R, or prior day high/low
- **Works best:** Trend days following overnight consolidation

#### 2. VWAP Scalp (Mean Reversion)
- **Setup:** Price extended 10+ points from VWAP on 5-min chart
- **Entry:** 1-min candle reversal pattern near VWAP deviation extreme
- **Stop:** 5-10 points beyond the extreme
- **Target:** VWAP touch or slight overshoot (5-15 points)
- **Works best:** Lunch session, choppy days. The bread-and-butter 1m/5m scalp.

#### 3. EMA Pullback Scalp (Trend Continuation)
- **Setup:** 5-min EMA stack aligned (9 > 21 for longs). Price pulls back to 9 EMA on 1-min.
- **Entry:** 1-min candle holds and closes above 9 EMA (longs)
- **Stop:** Below the 1-min swing low or 5-min 21 EMA (5-10 points)
- **Target:** New 1-min swing high, or 5-min candle high
- **Works best:** 10 AM - 12 PM morning session. Most reliable scalp pattern.

#### 4. Double Bottom/Top Micro-Pattern
- **Setup:** On 1-min chart, price tests a level twice with RSI divergence
- **Entry:** Break of the micro-neckline on 1-min
- **Stop:** Below the double bottom (3-8 points)
- **Target:** Measured move from the pattern (5-15 points)
- **Works best:** At VWAP, pivot points, or prior session high/low

#### 5. Bull/Bear Flag Scalp
- **Setup:** 1-min impulse candle (3+ points) followed by 2-4 tight consolidation candles
- **Entry:** Break of flag in direction of impulse on 1-min
- **Stop:** Beyond the flag boundary (3-8 points)
- **Target:** Measured move (pole length projected from breakout)
- **Works best:** Morning session after initial direction is established

#### 6. Level-to-Level Scalp (Unique to 1m/5m)
- **Setup:** Identify two nearby levels (pivot, VWAP, S/R) 10-20 points apart
- **Entry:** Bounce from one level on 1-min chart with volume confirmation
- **Stop:** 3-5 points beyond the entry level
- **Target:** The opposite level
- **Works best:** Range days. Map your levels pre-market and trade between them.

### NQ-Specific Behaviors

1. **Gap fills:** NQ gaps fill ~70% of the time, but NOT on trend days
2. **10 AM reversal:** Frequently reverses the opening move around 10:00-10:15 AM
3. **VWAP magnet:** NQ gravitates to VWAP during lunch hours
4. **Power Hour trend:** Last hour often resumes the dominant daily trend
5. **Overnight high/low:** Key levels that frequently get tested in RTH

## Confluence Trading System

**The more factors align, the higher the probability:**

### Tier 1 (Any 2 = Tradeable)
- [ ] Price at key support/resistance level
- [ ] RSI divergence present
- [ ] MACD crossover confirming direction
- [ ] EMA stack aligned with trade direction

### Tier 2 (Add 1+ for high probability)
- [ ] VWAP acting as support/resistance
- [ ] Volume increasing on breakout
- [ ] Bollinger Band squeeze releasing in trade direction
- [ ] Pivot point alignment
- [ ] Prior day high/low acting as level

### Tier 3 (Context factors)
- [ ] No high-impact news in next 2 hours
- [ ] Current session favors the setup (morning trend, not lunch chop)
- [ ] Overnight trend aligns with day session setup
- [ ] VIX/volatility supports the trade type

**Scoring:**
- 2 Tier 1 signals = Minimum for entry
- 2 Tier 1 + 1 Tier 2 = Good setup
- 3 Tier 1 + 2 Tier 2 = A+ setup (increase size)
- Tier 3 violations = Reduce size or skip

## Multi-Timeframe Analysis Framework (for 1m/5m Scalping)

| Timeframe | Purpose | Key Indicators |
|-----------|---------|---------------|
| Daily | Trend direction, key levels | 50/200 SMA, daily pivots |
| 1H | Session bias — trade in this direction | EMA stack, VWAP |
| 15min | Context — identify key structure levels | S/R, Bollinger Bands |
| **5min** | **Primary chart — setup identification** | **EMA 9/21, RSI, MACD, VWAP** |
| **1min** | **Execution chart — entry/exit timing** | **Price action, volume, micro-patterns** |

**Rule:** Use the 5-min chart to identify the setup and direction. Use the 1-min chart ONLY for precise entry timing and scalp exits. Never trade the 1-min against the 5-min trend unless at a major level with clear divergence.

---

*These patterns are based on common NQ behavior on 1m/5m charts. No pattern guarantees profit. Always use proper risk management and respect your Apex EOD drawdown limits.*
