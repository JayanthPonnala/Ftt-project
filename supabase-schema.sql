-- ==============================================================================
-- FTT Community - Optimized PostgreSQL Schema for Supabase
-- Run this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New query -> Paste & Run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. POSTS TABLE (Blog Articles)
-- ------------------------------------------------------------------------------
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

-- Optimized B-Tree & Composite Indexes for Articles
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_created_at ON public.posts(published, created_at DESC);

-- PostgreSQL Full-Text Search (GIN Index) for lightning-fast keyword search
CREATE INDEX IF NOT EXISTS idx_posts_search ON public.posts USING GIN (
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
);

-- ------------------------------------------------------------------------------
-- 2. LEADS TABLE (User Details Captured via Blog Access Modal)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT DEFAULT 'FTT Blog',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optimized Indexes for Leads Queries & Reporting
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- ------------------------------------------------------------------------------
-- 3. AUTOMATIC updated_at TIMESTAMP TRIGGER (PostgreSQL PL/pgSQL)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_posts_updated_at ON public.posts;
CREATE TRIGGER trigger_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON public.leads;
CREATE TRIGGER trigger_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Posts Policies:
-- Visitors can ONLY read published articles
DROP POLICY IF EXISTS "Public visitors can only view published posts" ON public.posts;
CREATE POLICY "Public visitors can only view published posts"
ON public.posts
FOR SELECT
USING (published = true);

-- Service Role (Backend API) has full admin access to all articles
DROP POLICY IF EXISTS "Admin service role has full access to all posts" ON public.posts;
CREATE POLICY "Admin service role has full access to all posts"
ON public.posts
FOR ALL
USING (auth.role() = 'service_role');

-- Leads Policies:
-- Visitors can insert their details through the Blog Access Modal
DROP POLICY IF EXISTS "Public visitors can submit leads" ON public.leads;
CREATE POLICY "Public visitors can submit leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Service Role (Backend API) has full access to read and export leads
DROP POLICY IF EXISTS "Admin service role has full access to leads" ON public.leads;
CREATE POLICY "Admin service role has full access to leads"
ON public.leads
FOR ALL
USING (auth.role() = 'service_role');

-- ------------------------------------------------------------------------------
-- 5. INITIAL SEED ARTICLES (Inserts if not already present)
-- ------------------------------------------------------------------------------
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

1. **London Open (11:30 AM - 1:30 PM IST):** Observing EUR/USD and GBP/USD support & resistance levels.
2. **New York Morning Open (7:00 PM - 9:30 PM IST):** Nasdaq (NQ) and Gold (GC) breakout and retest execution.

Trading outside these windows introduces erratic spread expansion and low-volume chop that eats away at funded buffers.

---

## 3. The Payout Request Ritual

Once reaching the 14-day evaluation requirement, many traders make the fatal mistake of attempting to "double the balance" before requesting payout. 

**Always take the withdrawal.** Requesting regular payouts crystallizes real profits in your bank account and resets your psychological relationship with the charts.',
  true,
  NOW() - INTERVAL '3 days'
),
(
  'Simple Price Action: Support & Resistance That Actually Works',
  'simple-price-action-support-resistance-guide',
  'Stop cluttering charts with 10 conflicting indicators. Master the clean approach to horizontal levels, dynamic reaction zones, and high-probability entries.',
  '# Simple Price Action: Support & Resistance That Actually Works

Most beginner retail traders fail because their charts look like abstract art—filled with RSIs, MACDs, Bollinger Bands, and conflicting lines.

When you strip away the noise and look at raw candlesticks, the market becomes clear.

---

## 1. Defining True Support & Resistance

Support and Resistance are not razor-thin lines. They are **reaction zones** where institutional buyers and sellers entered the market previously with heavy volume.

- **Support:** A price zone where buying pressure overcomes selling pressure, halting a downtrend and reversing price upward.
- **Resistance:** A price zone where selling pressure overcomes buying pressure, halting an uptrend and rejecting price downward.

---

## 2. The 3-Touch Validation Rule

Not all levels are equal. A level gains strength with clean rejection tests:

1. **Touch 1 (Origin):** Initial swing high or swing low creation.
2. **Touch 2 (Confirmation):** Price returns and shows a strong rejection wick.
3. **Touch 3 (Trade Entry):** Wait for a clear confirmation candle close at the zone before entering with defined risk.

---

## 3. Role Reversal: The Break & Retest

Once a key resistance level is broken with strong volume, it flips into potential **support**. 

Patiently waiting for the retest gives you:
- A tight stop-loss placed just behind the retested level.
- Favorable risk-to-reward ratios (1:2 to 1:4).
- Confidence that you are trading in the direction of the dominant breakout.',
  true,
  NOW() - INTERVAL '7 days'
)
ON CONFLICT (slug) DO NOTHING;
