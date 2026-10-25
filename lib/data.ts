import { SITE } from "./config";

export interface MentorStat {
  icon: "BarChart3" | "Trophy" | "Users" | "TrendingUp";
  value?: number;
  prefix?: string;
  suffix?: string;
  textValue?: string;
  label: string;
}

export interface PhilosophyItem {
  icon: "Target" | "ShieldCheck" | "Brain" | "BarChart3";
  title: string;
  desc: string;
}

export interface CommunityItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface MethodStep {
  id: string;
  number: string;
  icon: "CandlestickChart" | "Crosshair" | "FileText" | "TrendingUp";
  title: string;
  desc: string;
}

export interface MembershipFeature {
  number: string;
  title: string;
  desc: string;
}

export interface MembershipBenefit {
  icon: "PlayCircle" | "GraduationCap" | "FileText" | "Users" | "TrendingUp" | "CalendarDays";
  title: string;
  subtitle: string;
}

export interface RouteStep {
  id: string;
  number: string;
  icon: "ClipboardCheck" | "Coins" | "Banknote";
  title: string;
  subtitle: string;
  desc: string;
}

export interface RouteBenefit {
  icon: "ShieldCheck" | "BarChart3" | "RefreshCw" | "Landmark";
  title: string;
  desc: string;
}

export interface PayoutCardItem {
  firm: string;
  logoType: "mff" | "lucid" | "justmarkets" | "exness";
  amount: number;
  amountFormatted: string;
  dateRange: string;
  accountType: "FUTURES" | "FOREX";
  certAmount: string;
  certSlug: string;
}

export interface PayoutTrustItem {
  icon: "ShieldCheck" | "Layers" | "BarChart3" | "UserCircle";
  title: string;
  desc: string;
}

export interface JoinCommunityCard {
  icon: "Radio" | "TrendingUp" | "ShieldCheck" | "Users" | "GraduationCap" | "MessagesSquare" | "ClipboardList" | "BarChart3";
  title: string;
  desc: string;
  tag?: string;
}

export interface JoinCommunityStat {
  icon: "Users" | "Trophy" | "BarChart3" | "Handshake";
  value: string;
  label: string;
}

export const mentorStats: MentorStat[] = [
  { icon: "BarChart3", value: 9, suffix: "+ Years", label: "Trading Experience" },
  { icon: "Trophy", value: 1, prefix: "$", suffix: "M+", label: "Prop Firm Payouts" },
  { icon: "Users", value: 1000, suffix: "+", label: "Traders Mentored" },
  { icon: "TrendingUp", textValue: "Futures & Forex", label: "Primary Focus" },
];

export const philosophy: PhilosophyItem[] = [
  { icon: "Target", title: "Simplicity", desc: "Focus on what actually works." },
  { icon: "ShieldCheck", title: "Risk First", desc: "Protect capital always." },
  { icon: "Brain", title: "Discipline", desc: "Emotions kill accounts." },
  { icon: "BarChart3", title: "Consistency", desc: "Small edges compound." },
];

export const communityGrid: CommunityItem[] = [
  {
    id: "c-01",
    number: "01",
    title: "TELUGU TRADING LIVE",
    subtitle: `Daily ${SITE.liveTime}`,
    desc: "Watch real market analysis and live executions every trading day. Learn my thought process, entries, exits and trade management on Telugu trading live stream.",
  },
  {
    id: "c-02",
    number: "02",
    title: "FOREX & GOLD IN TELUGU",
    subtitle: "Gold (GC / XAUUSD), NQ & Forex in Telugu",
    desc: "We trade and analyze high-probability setups across Forex in Telugu and Gold in Telugu with real-time institutional execution.",
  },
  {
    id: "c-03",
    number: "03",
    title: "FUNDAMENTAL ANALYSIS",
    subtitle: "Day-to-Day Summaries",
    desc: "In-depth fundamental analysis with daily news, events and market impact explained in a simple and practical way.",
  },
  {
    id: "c-04",
    number: "04",
    title: "TECHNICAL ANALYSIS",
    subtitle: "Levels, Price Action & Setups",
    desc: "Live chart analysis, key levels, price action, patterns and precise trade setups on stream for all markets.",
  },
  {
    id: "c-05",
    number: "05",
    title: "RISK MANAGEMENT",
    subtitle: "Protect Capital. Trade Long Term.",
    desc: "Learn how to manage risk, position sizing, handling losses and staying consistent through all market conditions.",
  },
  {
    id: "c-06",
    number: "06",
    title: "WEEKEND SIMULATION & COMMUNITY TALK",
    subtitle: "Review. Improve. Grow Together.",
    desc: "Weekly market replay, trade reviews, simulation analysis and open community discussions to clear doubts and improve.",
  },
];

export const methodSteps: MethodStep[] = [
  {
    id: "m-01",
    number: "01",
    icon: "CandlestickChart",
    title: "PRICE ACTION",
    desc: "Understand the core market principles — price action, liquidity, structure and institutional behavior.",
  },
  {
    id: "m-02",
    number: "02",
    icon: "Crosshair",
    title: "SETUPS",
    desc: "Follow your setups, stick to your plan and edge. Focus on high-probability opportunities without overcomplicating the charts.",
  },
  {
    id: "m-03",
    number: "03",
    icon: "FileText",
    title: "TRADING PLAN",
    desc: "Define your execution, entry criteria, targets and invalidation. Manage risk, position size and journal your trades for consistent improvement.",
  },
  {
    id: "m-04",
    number: "04",
    icon: "TrendingUp",
    title: "STRUCTURED EXECUTION",
    desc: "Execute the same checklist every day. Review, track and improve based on real market feedback to build long-term consistency.",
  },
];

export const membershipFeatures: MembershipFeature[] = [
  { number: "01", title: "Price Action Concepts", desc: "Understand price action, liquidity, structure and institutional behavior." },
  { number: "02", title: "Advanced Trading Concepts", desc: "In-depth concepts to read the market like a professional." },
  { number: "03", title: "Market Trend Identification", desc: "Learn to identify trends and trade high-probability opportunities." },
  { number: "04", title: "Risk Management", desc: "Proper position sizing, loss management and capital preservation." },
  { number: "05", title: "Live Trading Sessions", desc: `Daily live trading from ${SITE.liveTimeIST} with real-time market execution.` },
  { number: "06", title: "Live Q&A Sessions", desc: "Get your doubts clarified during live sessions." },
  { number: "07", title: "Prop Firm Passing Guidance", desc: "Complete guidance to pass prop firm challenges." },
  { number: "08", title: "Hedge Fund Concepts", desc: "Learn institutional strategies and market fundamentals." },
  { number: "09", title: "Fundamentals & Currency Analysis", desc: "Day-to-day news, economic events and currency/market analysis." },
  { number: "10", title: "Trading Psychology", desc: "Build the right mindset and discipline to stay consistent." },
];

export const membershipBenefits: MembershipBenefit[] = [
  { icon: "PlayCircle", title: "Live Trading", subtitle: `Daily ${SITE.liveTime}` },
  { icon: "GraduationCap", title: "Complete Course", subtitle: "Basic to Advanced" },
  { icon: "FileText", title: "Trade Ideas & Analysis", subtitle: "Futures & Forex" },
  { icon: "Users", title: "Community Support", subtitle: "Discord Access" },
  { icon: "TrendingUp", title: "Ask Questions", subtitle: "Live Q&A Sessions" },
  { icon: "CalendarDays", title: "Weekend Reviews", subtitle: "Full Trade Breakdowns" },
];

export const routeSteps: RouteStep[] = [
  {
    id: "r-01",
    number: "01",
    icon: "ClipboardCheck",
    title: "EVAL STAGE",
    subtitle: "PROVE YOUR TRADING SKILLS",
    desc: "Trade a simulated account and follow the firm's rules — profit target, max drawdown, position size and trading days. This stage tests your discipline, risk management and consistency.",
  },
  {
    id: "r-02",
    number: "02",
    icon: "Coins",
    title: "FUNDED STAGE",
    subtitle: "TRADE REAL CAPITAL",
    desc: "Once you pass the evaluation, you get a funded account with the firm's capital. Same instruments, same rules, but now you trade in real market conditions and keep a share of the profits.",
  },
  {
    id: "r-03",
    number: "03",
    icon: "Banknote",
    title: "PAYOUT",
    subtitle: "GET YOUR PROFITS",
    desc: "When you meet the minimum trading days and profit requirements, your profits can be withdrawn through the firm's payout cycle. The payouts are sent directly to your account.",
  },
];

export const routeBenefits: RouteBenefit[] = [
  { icon: "ShieldCheck", title: "NO PERSONAL CAPITAL RISK", desc: "You trade the firm's money, not yours." },
  { icon: "BarChart3", title: "REAL MARKET CONDITIONS", desc: "Same instruments, real liquidity." },
  { icon: "RefreshCw", title: "SCALE YOUR ACCOUNT", desc: "Be consistent and unlock higher capital." },
  { icon: "Landmark", title: "REGULAR PAYOUTS", desc: "Keep a share of what you make." },
];

export const payoutCards: PayoutCardItem[] = [
  {
    firm: "MyFundedFutures",
    logoType: "mff",
    amount: 196000,
    amountFormatted: "$196,000+",
    dateRange: "3 OCT 2025 – 8 AUG 2026",
    accountType: "FUTURES",
    certAmount: "$196,000.00",
    certSlug: "myfundedfutures",
  },
  {
    firm: "Lucid Trading",
    logoType: "lucid",
    amount: 187000,
    amountFormatted: "$187,000+",
    dateRange: "14 APR 2026 – 23 JUNE 2026",
    accountType: "FUTURES",
    certAmount: "$187,000.00",
    certSlug: "lucid-trading",
  },
  {
    firm: "JustMarkets",
    logoType: "justmarkets",
    amount: 168000,
    amountFormatted: "$168,000+",
    dateRange: "VARIOUS PAYOUTS",
    accountType: "FOREX",
    certAmount: "$168,000.00",
    certSlug: "justmarkets",
  },
  {
    firm: "exness",
    logoType: "exness",
    amount: 190000,
    amountFormatted: "$190,000+",
    dateRange: "VARIOUS PAYOUTS",
    accountType: "FOREX",
    certAmount: "$190,000.00",
    certSlug: "exness",
  },
];

export const payoutTrust: PayoutTrustItem[] = [
  { icon: "ShieldCheck", title: "VERIFIED PAYOUTS", desc: "Real certificates & documented payouts" },
  { icon: "Layers", title: "DIFFERENT PROP FIRMS", desc: "Separate payouts, not combined" },
  { icon: "BarChart3", title: "REAL ACCOUNTS", desc: "Actual trading with real risk management" },
  { icon: "UserCircle", title: "CONSISTENT PERFORMANCE", desc: "Following rules & discipline" },
];

export const joinCommunityCards: JoinCommunityCard[] = [
  {
    icon: "Radio",
    title: "Daily Live Trading",
    desc: "Live market analysis, real-time trade execution and detailed explanation of setups.",
    tag: SITE.liveTimeIST,
  },
  {
    icon: "TrendingUp",
    title: "Trade Setups & Strategies",
    desc: "Learn proven price action setups across Futures, Forex, Gold, NQ, ES and major pairs with clear rules.",
  },
  {
    icon: "ShieldCheck",
    title: "Risk Management",
    desc: "Learn position sizing, drawdown control and capital preservation to trade safely and stay in the game long term.",
  },
  {
    icon: "Users",
    title: "Community Support",
    desc: "A group of like-minded traders helping each other grow, share ideas, discuss trades and stay disciplined.",
  },
  {
    icon: "GraduationCap",
    title: "Structured Learning",
    desc: "Step-by-step concepts, repeated classes and repeated sessions so you never miss anything.",
  },
  {
    icon: "MessagesSquare",
    title: "Doubt Solving & Q&A",
    desc: "Get your doubts cleared in live sessions and through the community whenever you need.",
  },
  {
    icon: "ClipboardList",
    title: "Backtesting & Journaling",
    desc: "Learn how to backtest setups, track your trades and improve with data and reviews.",
  },
  {
    icon: "BarChart3",
    title: "Continuous Guidance",
    desc: "Regular trade reviews, market updates and mentor guidance to help you figure things out and grow consistently.",
  },
];

export const joinCommunityStats: JoinCommunityStat[] = [
  { icon: "Users", value: "1000+", label: "Traders in Community" },
  { icon: "Trophy", value: "Daily Live", label: SITE.liveTimeIST },
  { icon: "BarChart3", value: "Real Growth", label: "Together with the Community" },
  { icon: "Handshake", value: "Serious Traders", label: "Helping Each Other Succeed" },
];

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  avatarInitials: string;
  category: "passes" | "live" | "psychology";
  rating: number;
  highlightBadge: string;
  payoutAmount: string;
  firmName: string;
  quote: string;
  tradingFocus: string;
  verifiedStatus: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-01",
    name: "Suresh V.",
    city: "Hyderabad, TS",
    avatarInitials: "SV",
    category: "passes",
    rating: 5,
    highlightBadge: "MFF $100K PASSED",
    payoutAmount: "$4,850",
    firmName: "MyFundedFutures",
    quote:
      "Before joining FTT, I blew 4 accounts using lagging indicators and telegram tips. Chaitanya anna's structured price action and live execution sessions changed my whole mindset. Passed my MyFundedFutures evaluation on the first attempt and received a $4,850 payout! The Telugu explanations make complex institutional setups so easy to grasp.",
    tradingFocus: "NQ Futures & Gold",
    verifiedStatus: "Verified Prop Trader",
  },
  {
    id: "test-02",
    name: "Karthik R.",
    city: "Bengaluru, KA",
    avatarInitials: "KR",
    category: "live",
    rating: 5,
    highlightBadge: "LUCID FUNDED",
    payoutAmount: "$6,200",
    firmName: "Lucid Trading",
    quote:
      "The daily 7:30 PM IST Live Trading streams are unmatched. Watching Chaitanya anna read order flow, mark liquidity pools, and strictly wait for candle closes taught me patience. I stopped over-trading and collected $6,200 in Lucid Trading payouts. FTT is the real deal.",
    tradingFocus: "Nasdaq (NQ) & ES",
    verifiedStatus: "Verified Payout Earner",
  },
  {
    id: "test-03",
    name: "Venkatesh P.",
    city: "Visakhapatnam, AP",
    avatarInitials: "VP",
    category: "psychology",
    rating: 5,
    highlightBadge: "FULL-TIME TRADER",
    payoutAmount: "$9,400+",
    firmName: "Multi-Firm Funded",
    quote:
      "My biggest hurdle was psychology and revenge trading after losses. FTT's risk framework, weekend simulation replays, and the discipline checklist saved my trading career. I now trade full-time with over $9,400 in documented prop firm withdrawals. Grateful for this community.",
    tradingFocus: "Gold (XAU/USD) & NQ",
    verifiedStatus: "Full-Time Funded Trader",
  },
  {
    id: "test-04",
    name: "Praveen K.",
    city: "Vijayawada, AP",
    avatarInitials: "PK",
    category: "passes",
    rating: 5,
    highlightBadge: "2x ACCOUNTS FUNDED",
    payoutAmount: "$3,500",
    firmName: "MyFundedFutures",
    quote:
      "Most courses sell theory and disappear. In FTT, mentor Chaitanya is on stream daily answering every single question in Telugu. Passed two funded evaluations simultaneously and just withdrew my first $3,500 payout. The Telegram and Discord family is pure positive energy.",
    tradingFocus: "Futures & Currencies",
    verifiedStatus: "Verified Community Member",
  },
  {
    id: "test-05",
    name: "Anil Reddy M.",
    city: "Dallas, Texas (USA)",
    avatarInitials: "AR",
    category: "live",
    rating: 5,
    highlightBadge: "NRI PROP TRADER",
    payoutAmount: "$11,200",
    firmName: "Lucid Trading",
    quote:
      "Being an NRI trading the US session, I watched hundreds of English YouTube channels with zero edge. Chaitanya's institutional SMC concepts and liquidity engineering gave me absolute clarity. Secured $11,200 in Lucid Trading payouts so far. Best Telugu trading platform worldwide.",
    tradingFocus: "CME Futures & Indices",
    verifiedStatus: "Verified Global Member",
  },
  {
    id: "test-06",
    name: "Sai Krishna B.",
    city: "Warangal, TS",
    avatarInitials: "SK",
    category: "psychology",
    rating: 5,
    highlightBadge: "DISCIPLINE CERTIFIED",
    payoutAmount: "$5,100",
    firmName: "Futures Funded",
    quote:
      "I went from constant stress and blown accounts to steady consistency. The rule of maximum 1-2 trades per session and hard stop losses transformed my trading life. Banked a $5,100 payout within 4 months.",
    tradingFocus: "Gold & Nasdaq 100",
    verifiedStatus: "Verified Prop Trader",
  },
  {
    id: "test-07",
    name: "Madhav C.",
    city: "Guntur, AP",
    avatarInitials: "MC",
    category: "passes",
    rating: 5,
    highlightBadge: "LUCID $50K PASSED",
    payoutAmount: "$5,400",
    firmName: "Lucid Trading",
    quote:
      "Learning liquidity sweeps and fair value gaps in Telugu removed all the confusion. Passed Lucid challenge with strict 1% risk per trade and received my first $5,400 transfer.",
    tradingFocus: "Nasdaq (NQ) Futures",
    verifiedStatus: "Verified Prop Trader",
  },
  {
    id: "test-08",
    name: "Rahul Teja",
    city: "Khammam, TS",
    avatarInitials: "RT",
    category: "live",
    rating: 5,
    highlightBadge: "LIVE STREAM TRADER",
    payoutAmount: "$3,800",
    firmName: "MyFundedFutures",
    quote:
      "Chaitanya anna's live market analysis during New York opening is pure mastery. You see the actual execution checklist in action without any hindsight bias. Just withdrew $3,800.",
    tradingFocus: "Gold (GC) & NQ",
    verifiedStatus: "Active Live Member",
  },
  {
    id: "test-09",
    name: "Niharika M.",
    city: "Hyderabad, TS",
    avatarInitials: "NM",
    category: "psychology",
    rating: 5,
    highlightBadge: "SYSTEMATIC TRADER",
    payoutAmount: "$4,200",
    firmName: "MyFundedFutures",
    quote:
      "As a female trader, having a disciplined, supportive Telugu environment was critical. The risk calculator and post-market reviews stopped my impulse trades completely.",
    tradingFocus: "Forex & US Indices",
    verifiedStatus: "Verified Funded Member",
  },
  {
    id: "test-10",
    name: "Sridhar K.",
    city: "San Jose, CA (USA)",
    avatarInitials: "SK",
    category: "passes",
    rating: 5,
    highlightBadge: "NRI ELITE TRADER",
    payoutAmount: "$14,600",
    firmName: "Lucid Trading",
    quote:
      "Trading Silicon Valley hours, FTT gave me the institutional structure I was lacking. The payout proof and mechanical rules gave me complete confidence to scale to multiple accounts.",
    tradingFocus: "CME Nasdaq & ES",
    verifiedStatus: "Verified Global Trader",
  },
  {
    id: "test-11",
    name: "Bhanu Prakash",
    city: "Tirupati, AP",
    avatarInitials: "BP",
    category: "live",
    rating: 5,
    highlightBadge: "MFF $150K FUNDED",
    payoutAmount: "$7,200",
    firmName: "MyFundedFutures",
    quote:
      "Watching the live streams every day helped me develop real patience. Waiting for the key liquidity hunt before entering changed everything. Withdrew $7,200 with zero stress.",
    tradingFocus: "Nasdaq & Micro Gold",
    verifiedStatus: "Funded Account Trader",
  },
  {
    id: "test-12",
    name: "Vikram S.",
    city: "Rajahmundry, AP",
    avatarInitials: "VS",
    category: "psychology",
    rating: 5,
    highlightBadge: "RULE-BASED TRADER",
    payoutAmount: "$6,900",
    firmName: "Futures Funded",
    quote:
      "The weekend simulation replays and trading journal reviews are worth ten times the mentorship fee. If you follow the checklist, the market rewards you consistently.",
    tradingFocus: "Price Action & Order Flow",
    verifiedStatus: "Verified Community Member",
  },
];
