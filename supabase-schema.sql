-- ==============================================================================
-- FTT Community - Admin Blog System Schema for Supabase
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Create the posts table with all required fields
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_created_at ON public.posts(published, created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 4. Public access policy: Visitors can ONLY SELECT published posts
CREATE POLICY "Public visitors can only view published posts"
ON public.posts
FOR SELECT
USING (published = true);

-- 5. Service Role policy: Full admin read / write / update / delete access
CREATE POLICY "Admin service role has full access to all posts"
ON public.posts
FOR ALL
USING (auth.role() = 'service_role');

-- 6. Optional: Insert initial seed posts
INSERT INTO public.posts (title, slug, excerpt, content, published, created_at)
VALUES 
(
  '$196,000+ MyFundedFutures Payout: My Scaling Plan & Risk Rules',
  '196k-myfundedfutures-payout-scaling-plan',
  'A complete breakdown of my largest prop firm payout cycle. How I managed drawdown on NQ and Gold, scaled position sizes, and requested the payout.',
  '# The $196,000+ Prop Firm Payout Playbook

Securing over **$196,000 in payouts** from MyFundedFutures did not happen by taking oversized gambles or chasing 100-point moves on Nasdaq. It was the result of relentless, boring execution of a mechanical trading strategy.

> "Consistency is not about making money every day. It is about never violating your daily drawdown limit, no matter how tempted you feel."

---

## 1. The Core Risk Framework

When managing funded accounts, **capital preservation is your only objective**. The prop firm gives you capital, but they also enforce strict trailing thresholds.

Here is the exact risk configuration I deployed:

- **Daily Loss Limit:** Strictly capped at 1.5% of total account buffer.
- **Max Stop-Outs per Day:** 2 consecutive losses = session terminated immediately.
- **Position Sizing:** Started with 2 NQ contracts, only scaling to 4 contracts after building a $5,000 cushion.

```text
Account Balance: $150,000
Trailing Drawdown: $5,000
Max Daily Risk: $1,250 (0.83% of balance, 25% of buffer)
Risk per Trade: $600 (approx. 15 points on 2 NQ contracts)
```

---

## 2. Session Liquidity & Timing

I trade exclusively during high-liquidity market overlaps:

1. **London Open Sweep (11:30 AM - 1:30 PM IST):** Observing EUR/USD and GBP/USD institutional liquidity pools.
2. **New York Morning Open (7:00 PM - 9:30 PM IST):** Nasdaq (NQ) and Gold (GC) fair value gap fills and previous day high/low raids.

Trading outside these windows introduces erratic spread expansion and low-volume chop that eats away at funded buffers.

---

## 3. The Payout Request Ritual

Once reaching the 14-day evaluation requirement, many traders make the fatal mistake of attempting to "double the balance" before requesting payout. 

**Always take the withdrawal.** Requesting regular payouts crystallizes real profits in your bank account and resets your psychological relationship with the charts.',
  true,
  NOW() - INTERVAL '3 days'
),
(
  'Navigating Volatility: How I Withdrew $187,000+ from Lucid Trading',
  'withdrew-187k-lucid-trading-volatility',
  'Trading high-impact news days and staying disciplined during choppy summer market conditions to achieve consistent withdrawals.',
  '# Managing Choppy Regimes & $187,000+ in Lucid Trading Payouts

Markets do not trend 100% of the time. Over 70% of market sessions are spent in ranging consolidations or liquidity-seeking rotations. Learning how to trade or **sit on your hands** during chop is what separates professional traders from gamblers.

---

## The Rule of High Impact News

During FOMC and CPI announcement weeks, spreads on futures widen dramatically. Here are my rules:

- **15 Minutes Before News:** Flatten all open contracts. No exceptions.
- **15 Minutes After News:** Wait for the initial spike to exhaust and the orderbook spreads to normalize.
- **Enter on Liquidity Retest:** Only take trades after the high and low of the news candle have been tapped and swept.

```json
{
  "instrument": "Gold Futures (GC)",
  "payout_total": "$187,240.50",
  "average_rr": "1:2.4",
  "win_rate": "58.4%"
}
```

> "In the FTT Community, we emphasize that 80% of profitable trading is knowing when NOT to click buy or sell."

---

## Mental Stamina on Drawdown Days

When you hit a losing trade, your heart rate spikes. Dopamine triggers urge you to enter another trade to "get back to even". 

To defeat revenge trading, I close the laptop screen and do 20 pushups or step outside for a 10-minute walk. Your edge only works over hundreds of trades, not in 5 minutes.',
  true,
  NOW() - INTERVAL '7 days'
),
(
  '$168,000+ Forex Payouts: Why Simplicity Always Outperforms Complexity',
  '168k-forex-payouts-simplicity-over-complexity',
  'Trading major Forex pairs with pure price action, clean liquidity sweeps, and zero lagging indicators.',
  '# Naked Charts: Why Simplicity Outperforms Indicators

When Telugu traders ask me what magical indicators I rely on to generate hundreds of thousands of dollars in payouts, they are usually stunned by my answer:

**I trade completely naked charts.**

No RSI, no Bollinger Bands, no Stochastic oscillators, and no lagging ribbons.

---

## What Actually Moves Forex Prices?

Price moves for two reasons only:
1. **To engineer and sweep liquidity (Stop-losses of retail traders).**
2. **To rebalance price inefficiencies (Fair Value Gaps & imbalances).**

Indicators only calculate the average of past prices. By the time a moving average crosses or an RSI registers overbought, the institutional move has already ended.

### My Daily Execution Checklist:

* [x] Mark Previous Day High (PDH) and Previous Day Low (PDL)
* [x] Identify clean 15-minute Fair Value Gaps (FVG)
* [x] Wait for a liquidity raid into Asian highs/lows
* [x] Wait for 1-minute Market Structure Shift (MSS) with displacement
* [x] Place limit order at 50% discount with stop above swing high

---

## The Power of the Telugu Trading Community

Trading can be lonely and isolating. Having a team of dedicated traders analyzing the charts alongside you every day keeps you accountable. Join our live trade rooms, log your trades, and let discipline do the compounding.',
  true,
  NOW() - INTERVAL '12 days'
)
ON CONFLICT (slug) DO NOTHING;
