# NQ/MNQ Technical Patterns & Indicator Strategies

> Chart patterns, indicator setups, and confluence techniques specifically for NASDAQ futures.

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

**NQ-Specific Notes:**
- NQ trends harder than ES — RSI can stay overbought/oversold longer
- Use RSI divergence on 15min+ charts for higher probability
- 5-min RSI is useful for timing entries within larger trend

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
- **Use for stops:** 1.5× ATR for swing trades, 0.5-1× ATR for day trades
- **High ATR days:** Reduce position size proportionally
- **Low ATR days:** Tighter stops, expect range-bound action

## Chart Patterns for NQ

### High-Probability Patterns

#### 1. Opening Range Breakout (ORB)
- **Setup:** Mark the high/low of the first 15-30 minutes after 9:30 AM
- **Entry:** Break above range high (long) or below range low (short)
- **Stop:** Opposite side of the range
- **Target:** 1:1.5 to 1:2 R:R
- **Works best:** Trend days following overnight consolidation

#### 2. VWAP Reversion
- **Setup:** Price extended 1+ ATR from VWAP
- **Entry:** First pullback toward VWAP with confirming candle
- **Stop:** Beyond the extreme (recent high/low)
- **Target:** VWAP touch or slight overshoot
- **Works best:** Lunch session, choppy days

#### 3. EMA Pullback (Trend Continuation)
- **Setup:** Price in clear trend (EMA stack aligned)
- **Entry:** Pullback to 9 or 21 EMA with holding candle
- **Stop:** Below the 21 EMA (longs) or above (shorts)
- **Target:** New high/low beyond previous swing
- **Works best:** 10 AM - 12 PM morning session

#### 4. Double Bottom/Top at Support/Resistance
- **Setup:** Price tests a key level twice with RSI divergence
- **Entry:** Break above the neckline (double bottom) or below (double top)
- **Stop:** Below the double bottom / above double top
- **Target:** Measured move (distance from bottom to neckline, projected)
- **Works best:** At prior day high/low, weekly pivots

#### 5. Bull/Bear Flag
- **Setup:** Strong impulse move followed by tight consolidation (flag)
- **Entry:** Break of flag in direction of impulse
- **Stop:** Beyond the flag boundary
- **Target:** Measured move (length of pole projected from breakout)
- **Works best:** Morning session continuation setups

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

## Multi-Timeframe Analysis Framework

| Timeframe | Purpose | Key Indicators |
|-----------|---------|---------------|
| Daily | Trend direction, key levels | 50/200 SMA, daily pivots |
| 4H | Swing bias | EMA stack, MACD |
| 1H | Session trend | VWAP, EMA 9/21 |
| 15min | Entry timing | RSI, Bollinger, candle patterns |
| 5min | Precise entry/exit | Price action, volume |

**Rule:** Only trade in the direction of the 1H+ trend unless you see a confirmed reversal pattern with strong confluence.

---

*These patterns are based on common NQ behavior. No pattern guarantees profit. Always use proper risk management and respect your Apex drawdown limits.*
