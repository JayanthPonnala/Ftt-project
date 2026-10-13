import { createClient } from "@supabase/supabase-js";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at?: string;
  read_time?: string;
}

// Initial rich seed posts written from Chaitanya's perspective
export const SEED_POSTS: BlogPost[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "$196,000+ MyFundedFutures Payout: My Scaling Plan & Risk Rules",
    slug: "196k-myfundedfutures-payout-scaling-plan",
    excerpt:
      "A complete breakdown of my largest prop firm payout cycle. How I managed drawdown on NQ and Gold, scaled position sizes, and requested the payout.",
    content: `# The $196,000+ Prop Firm Payout Playbook

Securing over **$196,000 in payouts** from MyFundedFutures did not happen by taking oversized gambles or chasing 100-point moves on Nasdaq. It was the result of relentless, boring execution of a mechanical trading strategy.

> "Consistency is not about making money every day. It is about never violating your daily drawdown limit, no matter how tempted you feel."

---

## 1. The Core Risk Framework

When managing funded accounts, **capital preservation is your only objective**. The prop firm gives you capital, but they also enforce strict trailing thresholds.

Here is the exact risk configuration I deployed:

- **Daily Loss Limit:** Strictly capped at 1.5% of total account buffer.
- **Max Stop-Outs per Day:** 2 consecutive losses = session terminated immediately.
- **Position Sizing:** Started with 2 NQ contracts, only scaling to 4 contracts after building a $5,000 cushion.

\`\`\`text
Account Balance: $150,000
Trailing Drawdown: $5,000
Max Daily Risk: $1,250 (0.83% of balance, 25% of buffer)
Risk per Trade: $600 (approx. 15 points on 2 NQ contracts)
\`\`\`

---

## 2. Session Liquidity & Timing

I trade exclusively during high-liquidity market overlaps:

1. **London Open Sweep (11:30 AM - 1:30 PM IST):** Observing EUR/USD and GBP/USD institutional liquidity pools.
2. **New York Morning Open (7:00 PM - 9:30 PM IST):** Nasdaq (NQ) and Gold (GC) fair value gap fills and previous day high/low raids.

Trading outside these windows introduces erratic spread expansion and low-volume chop that eats away at funded buffers.

---

## 3. The Payout Request Ritual

Once reaching the 14-day evaluation requirement, many traders make the fatal mistake of attempting to "double the balance" before requesting payout. 

**Always take the withdrawal.** Requesting regular payouts crystallizes real profits in your bank account and resets your psychological relationship with the charts.`,
    published: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Navigating Volatility: How I Withdrew $187,000+ from Lucid Trading",
    slug: "withdrew-187k-lucid-trading-volatility",
    excerpt:
      "Trading high-impact news days and staying disciplined during choppy summer market conditions to achieve consistent withdrawals.",
    content: `# Managing Choppy Regimes & $187,000+ in Lucid Trading Payouts

Markets do not trend 100% of the time. Over 70% of market sessions are spent in ranging consolidations or liquidity-seeking rotations. Learning how to trade or **sit on your hands** during chop is what separates professional traders from gamblers.

---

## The Rule of High Impact News

During FOMC and CPI announcement weeks, spreads on futures widen dramatically. Here are my rules:

- **15 Minutes Before News:** Flatten all open contracts. No exceptions.
- **15 Minutes After News:** Wait for the initial spike to exhaust and the orderbook spreads to normalize.
- **Enter on Liquidity Retest:** Only take trades after the high and low of the news candle have been tapped and swept.

\`\`\`json
{
  "instrument": "Gold Futures (GC)",
  "payout_total": "$187,240.50",
  "average_rr": "1:2.4",
  "win_rate": "58.4%"
}
\`\`\`

> "In the FTT Community, we emphasize that 80% of profitable trading is knowing when NOT to click buy or sell."

---

## Mental Stamina on Drawdown Days

When you hit a losing trade, your heart rate spikes. Dopamine triggers urge you to enter another trade to "get back to even". 

To defeat revenge trading, I close the laptop screen and do 20 pushups or step outside for a 10-minute walk. Your edge only works over hundreds of trades, not in 5 minutes.`,
    published: true,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "$168,000+ Forex Payouts: Why Simplicity Always Outperforms Complexity",
    slug: "168k-forex-payouts-simplicity-over-complexity",
    excerpt:
      "Trading major Forex pairs with pure price action, clean liquidity sweeps, and zero lagging indicators.",
    content: `# Naked Charts: Why Simplicity Outperforms Indicators

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

Trading can be lonely and isolating. Having a team of dedicated traders analyzing the charts alongside you every day keeps you accountable. Join our live trade rooms, log your trades, and let discipline do the compounding.`,
    published: true,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper to calculate reading time
export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

// In-memory fallback cache when Supabase environment variables are not supplied
let inMemoryPosts: BlogPost[] = [...SEED_POSTS];

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      key &&
      !url.includes("your-project-id") &&
      !key.includes("your-supabase")
  );
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}

// Format posts with read_time
function formatPost(post: BlogPost): BlogPost {
  return {
    ...post,
    read_time: estimateReadTime(post.content || ""),
  };
}

export {
  getPublishedPosts,
  getPostBySlug,
  getAllPostsAdmin,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "./db";
