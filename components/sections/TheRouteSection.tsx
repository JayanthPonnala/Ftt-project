"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Percent,
  Users,
  Info,
  Sparkles,
  Flame,
  ArrowRight,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export type Deal = {
  id: string;
  name: string;
  planName: string;
  tagline: string;
  category: "all" | "prop" | "broker";
  categoryBadge: string;
  offer: string;
  offerDetail: string;
  badgeText: string;
  bullets: Array<{ title: string; desc: string }>;
  code?: string;
  secondaryCode?: string;
  secondaryLabel?: string;
  action: string;
  href: string;
  tone: "gold" | "purple" | "green" | "blue" | "cyan" | "rose";
  accountSizes: string;
  featured?: boolean;
};

const deals: Deal[] = [
  {
    id: "mff",
    name: "MyFunded Futures",
    planName: "BUILDER & RAPID PLANS",
    tagline: "The Simplest Way To Get Funded",
    category: "prop",
    categoryBadge: "FUTURES PROP FIRM",
    offer: "50% OFF",
    offerDetail: "Rapid • Builder • Pro Plans",
    badgeText: "TOP COMMUNITY PICK",
    bullets: [
      { title: "No Profit Target", desc: "Trade your edge, zero consistency rules" },
      { title: "EOD Trailing Drawdown", desc: "End-of-day drawdown for maximum leeway" },
      { title: "1-Day Min Trading", desc: "Fast-track and get funded in just 1 day" },
      { title: "Flexible Payouts", desc: "Frequent withdrawals & soft loss pause" },
    ],
    code: "FTT",
    action: "Claim 50% Off",
    href: "https://myfundedfutures.com/?ref=4886",
    tone: "gold",
    accountSizes: "$25K • $50K • $100K Accounts",
    featured: true,
  },
  {
    id: "fundednext",
    name: "FundedNext",
    planName: "FLEX FUTURES MODEL",
    tagline: "Maximum Flexibility • Maximum Opportunity",
    category: "prop",
    categoryBadge: "FUTURES PROP FIRM",
    offer: "55% OFF",
    offerDetail: "On Flex Futures Plan",
    badgeText: "EXCLUSIVE 55% OFF",
    bullets: [
      { title: "No Buffer & No DLL", desc: "Direct straightforward path to live funding" },
      { title: "95% Profit Split", desc: "Keep up to 95% of your trading rewards" },
      { title: "From $133.99", desc: "The most affordable modern futures model" },
      { title: "Fast Funding", desc: "Modern flexible rules built for day traders" },
    ],
    code: "FTTFX",
    action: "Claim 55% Off",
    href: "https://fundednext.com/?fpr=FTTFX",
    tone: "purple",
    accountSizes: "Flexible Account Sizing Available",
    featured: true,
  },
  {
    id: "lucid",
    name: "Lucid Trading",
    planName: "FLEX & SCALE TRADING",
    tagline: "More Power • More Opportunities",
    category: "prop",
    categoryBadge: "FUTURES PROP FIRM",
    offer: "40% OFF",
    offerDetail: "New Accounts • 50K Flex",
    badgeText: "RECOMMENDED SETUP",
    bullets: [
      { title: "Recommended 50K Flex", desc: "Engineered for flexibility & daily room" },
      { title: "Trader-First Platform", desc: "Zero hidden rules or complex restrictions" },
      { title: "Fast Reliable Payouts", desc: "Prompt payout cycles directly to you" },
      { title: "News & Weekends Allowed", desc: "Trade during news and hold overnight" },
    ],
    code: "FTT",
    action: "Claim 40% Off",
    href: "https://lucidtrading.com/ref/forextradertelugu/",
    tone: "green",
    accountSizes: "$50K Flex & Scale Accounts",
    featured: true,
  },
  {
    id: "blueguardian",
    name: "Blue Guardian",
    planName: "EMPOWERING TRADERS",
    tagline: "Trade With Confidence • Grow With BG",
    category: "prop",
    categoryBadge: "FUTURES & CFDs",
    offer: "25% OFF",
    offerDetail: "All Accounts • CFDs & Futures",
    badgeText: "ZERO TIME LIMITS",
    bullets: [
      { title: "Fund Up To $200,000", desc: "Access substantial institutional capital" },
      { title: "Keep Up To 90% Profits", desc: "Maximize your earnings retention" },
      { title: "Flexible Trading Rules", desc: "Trade your own style, in your own time" },
      { title: "Built For Traders", desc: "Guardian protector tools & tight spreads" },
    ],
    code: "FTT",
    action: "Claim 25% Off",
    href: "https://blueguardian.com/?afmc=FTT",
    tone: "blue",
    accountSizes: "Up to $200,000 Capital",
    featured: true,
  },
  {
    id: "justmarkets",
    name: "JustMarkets",
    planName: "RAW SPREAD ACCOUNT",
    tagline: "Trade More • Trade Better Worldwide",
    category: "broker",
    categoryBadge: "FOREX & METALS BROKER",
    offer: "0.0 PIPS",
    offerDetail: "Raw Spreads • Zero Markup",
    badgeText: "LOCAL INR UPI DEPOSITS",
    bullets: [
      { title: "Spreads From 0.0 Pips", desc: "Ultra-tight spreads on all major pairs" },
      { title: "Sub-Second Execution", desc: "Lightning fast institutional latency" },
      { title: "Instant Local Payments", desc: "Seamless instant UPI & crypto gateways" },
      { title: "Negative Balance Shield", desc: "Regulated broker with protected capital" },
    ],
    code: "24u140fax",
    action: "Open Free Account",
    href: "https://one.justmarkets.link/a/4zul40fax5",
    tone: "cyan",
    accountSizes: "Micro, Standard & Raw Accounts",
  },
  {
    id: "redotpay",
    name: "RedotPay",
    planName: "GLOBAL CRYPTO VISA",
    tagline: "Spend Crypto Anywhere Like Fiat",
    category: "broker",
    categoryBadge: "CRYPTO PAYMENTS",
    offer: "$5 FREE",
    offerDetail: "Instant Bonus + 20% Fee Discount",
    badgeText: "INSTANT VIRTUAL CARD",
    bullets: [
      { title: "$5 Instant Welcome Reward", desc: "Free bonus credited on registration" },
      { title: "Apple & Google Pay Support", desc: "Tap & pay at millions of merchants" },
      { title: "Ultra-Low Card Fees", desc: "Lowest ATM & POS conversion fees" },
      { title: "Instant 5-Min KYC", desc: "Virtual card generated immediately" },
    ],
    code: "0g9eh",
    secondaryCode: "20OFF2026",
    secondaryLabel: "20% OFF Fees",
    action: "Claim $5 Bonus",
    href: "https://url.hk/i/en/0g9eh",
    tone: "rose",
    accountSizes: "Virtual & Physical Visa Cards",
  },
];

const toneClasses = {
  gold: {
    card: "border-amber-400/30 hover:border-amber-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(245,185,66,0.22)]",
    glow: "bg-amber-400/15",
    accent: "text-amber-300",
    badge: "border-amber-400/35 bg-amber-400/10 text-amber-300",
    button: "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-black hover:brightness-110 shadow-[0_0_20px_rgba(245,185,66,0.35)]",
    iconBorder: "border-amber-300/40 text-amber-300 bg-amber-400/5",
    couponBg: "bg-amber-400/[0.04] border-amber-300/30 text-amber-200",
    bulletIcon: "text-amber-300",
    brandBg: "bg-gradient-to-br from-amber-400/20 to-yellow-600/10 border-amber-400/30",
  },
  purple: {
    card: "border-purple-400/30 hover:border-purple-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
    glow: "bg-purple-500/15",
    accent: "text-purple-300",
    badge: "border-purple-400/35 bg-purple-500/10 text-purple-300",
    button: "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-600 text-white hover:brightness-110 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    iconBorder: "border-purple-300/40 text-purple-300 bg-purple-500/5",
    couponBg: "bg-purple-500/[0.04] border-purple-300/30 text-purple-200",
    bulletIcon: "text-purple-300",
    brandBg: "bg-gradient-to-br from-purple-500/20 to-violet-700/10 border-purple-400/30",
  },
  green: {
    card: "border-emerald-400/30 hover:border-emerald-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.22)]",
    glow: "bg-emerald-400/15",
    accent: "text-emerald-300",
    badge: "border-emerald-400/35 bg-emerald-400/10 text-emerald-300",
    button: "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-black hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
    iconBorder: "border-emerald-300/40 text-emerald-300 bg-emerald-400/5",
    couponBg: "bg-emerald-400/[0.04] border-emerald-300/30 text-emerald-200",
    bulletIcon: "text-emerald-300",
    brandBg: "bg-gradient-to-br from-emerald-400/20 to-teal-600/10 border-emerald-400/30",
  },
  blue: {
    card: "border-sky-400/30 hover:border-sky-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    glow: "bg-sky-400/15",
    accent: "text-sky-300",
    badge: "border-sky-400/35 bg-sky-400/10 text-sky-300",
    button: "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white hover:brightness-110 shadow-[0_0_20px_rgba(56,189,248,0.35)]",
    iconBorder: "border-sky-300/40 text-sky-300 bg-sky-400/5",
    couponBg: "bg-sky-400/[0.04] border-sky-300/30 text-sky-200",
    bulletIcon: "text-sky-300",
    brandBg: "bg-gradient-to-br from-sky-400/20 to-blue-700/10 border-sky-400/30",
  },
  cyan: {
    card: "border-cyan-400/30 hover:border-cyan-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.22)]",
    glow: "bg-cyan-400/15",
    accent: "text-cyan-300",
    badge: "border-cyan-400/35 bg-cyan-400/10 text-cyan-300",
    button: "bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 text-black hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.35)]",
    iconBorder: "border-cyan-300/40 text-cyan-300 bg-cyan-400/5",
    couponBg: "bg-cyan-400/[0.04] border-cyan-300/30 text-cyan-200",
    bulletIcon: "text-cyan-300",
    brandBg: "bg-gradient-to-br from-cyan-400/20 to-teal-700/10 border-cyan-400/30",
  },
  rose: {
    card: "border-rose-400/30 hover:border-rose-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]",
    glow: "bg-rose-400/15",
    accent: "text-rose-300",
    badge: "border-rose-400/35 bg-rose-400/10 text-rose-300",
    button: "bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    iconBorder: "border-rose-300/40 text-rose-300 bg-rose-400/5",
    couponBg: "bg-rose-400/[0.04] border-rose-300/30 text-rose-200",
    bulletIcon: "text-rose-300",
    brandBg: "bg-gradient-to-br from-rose-400/20 to-pink-700/10 border-rose-400/30",
  },
};

// Custom Brand Emblem for visual consistency & polish
function BrandEmblem({ id, name }: { id: string; name: string }) {
  switch (id) {
    case "mff":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 shadow-[0_0_12px_rgba(245,185,66,0.2)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-300" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
        </div>
      );
    case "fundednext":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-purple-300" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 6h10v3H10v3h6v3H10v3H7V6z" fill="currentColor" />
          </svg>
        </div>
      );
    case "lucid":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="none">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3.5" fill="currentColor" />
          </svg>
        </div>
      );
    case "blueguardian":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-300" fill="none">
            <path
              d="M12 2L4 5.5v7.5c0 5 3.5 9 8 10.5 4.5-1.5 8-5.5 8-10.5V5.5L12 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="rgba(56,189,248,0.15)"
            />
            <path d="M9 13.5v-3h1.5v1.5h1v-1.5h1v1.5h1v-1.5h1.5v3H9z" fill="currentColor" />
          </svg>
        </div>
      );
    case "justmarkets":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 16l6-6 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 8h6v6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "redotpay":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-400/10 shadow-[0_0_12px_rgba(244,63,94,0.25)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-rose-400" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="6" cy="15" r="1.5" fill="currentColor" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white">
          <Tag className="h-5 w-5" />
        </div>
      );
  }
}

function DealCard({ deal, index }: { deal: Deal; index: number }) {
  const [copied, setCopied] = useState<string | null>(null);
  const colors = toneClasses[deal.tone];
  const shouldReduceMotion = useReducedMotion();

  const copyCode = async (code: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        let wasCopied = false;
        try {
          textArea.select();
          wasCopied = document.execCommand("copy");
        } finally {
          textArea.remove();
        }
        if (!wasCopied) throw new Error("Fallback copy failed");
      }
      setCopied(code);
      window.setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Unable to copy coupon code:", error);
      setCopied(null);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
      className={`group relative flex h-full min-h-[580px] w-full flex-col overflow-hidden rounded-2xl border bg-[#0b1018]/95 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 ${colors.card}`}
    >
      {/* Background Animated Ambient Glow */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.25, 0.95, 1], opacity: [0.15, 0.28, 0.18, 0.15] }}
        transition={shouldReduceMotion ? undefined : { duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" }}
        className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl ${colors.glow}`}
      />

      {/* Shimmer light sweep */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: ["-130%", "140%"] }}
        transition={shouldReduceMotion ? undefined : { duration: 7 + index, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-y-12 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />

      {/* Fine grid pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
        }}
      />

      {/* Inner Card Content with Strict Symmetrical Vertical Hierarchy */}
      <div className="relative flex flex-1 flex-col z-10">
        {/* ROW 1: Badges Header (h-[28px]) */}
        <div className="flex items-center justify-between gap-2 h-7 mb-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.16em] ${colors.badge}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {deal.categoryBadge}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-slate-300">
            {deal.badgeText}
          </span>
        </div>

        {/* ROW 2: Brand Identity & Title (min-h-[64px]) */}
        <div className="flex items-center gap-3 mb-4 min-h-[64px]">
          <BrandEmblem id={deal.id} name={deal.name} />
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-[18px] sm:text-[19px] font-bold text-white tracking-tight leading-snug truncate">
              {deal.name}
            </h3>
            <p className={`text-[10px] font-bold tracking-[0.08em] uppercase ${colors.accent} truncate mt-0.5`}>
              {deal.planName}
            </p>
            <p className="text-[11px] text-slate-300 font-normal truncate leading-snug mt-0.5">
              {deal.tagline}
            </p>
          </div>
        </div>

        {/* ROW 3: Big Discount / Value Callout (min-h-[86px]) */}
        <div className="mb-4 flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3.5 min-h-[86px]">
          <div className="flex items-baseline justify-between gap-2">
            {(() => {
              const parts = deal.offer.split(" ");
              const main = parts[0];
              const suffix = parts.slice(1).join(" ");
              return (
                <div className="flex items-baseline gap-2">
                  <span className={`font-sans text-3xl sm:text-[34px] font-extrabold tracking-tight leading-none ${colors.accent}`}>
                    {main}
                  </span>
                  {suffix && (
                    <span className={`font-sans text-xl sm:text-[22px] font-bold tracking-wider uppercase ${colors.accent}`}>
                      {suffix}
                    </span>
                  )}
                </div>
              );
            })()}
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Verified Deal
            </span>
          </div>
          <p className="mt-1.5 text-xs font-medium text-slate-200">
            {deal.offerDetail}
          </p>
        </div>

        {/* ROW 4: Account Sizes / Model Pill (h-[26px]) */}
        <div className="mb-4 flex items-center gap-1.5 text-[10.5px] text-slate-400 h-[26px]">
          <span className="font-medium text-slate-500">Plan Options:</span>
          <span className="font-semibold text-slate-200 truncate">{deal.accountSizes}</span>
        </div>

        {/* ROW 5: Standardized 4 Feature Bullets (min-h-[160px]) */}
        <ul className="mb-4 space-y-2 border-t border-white/10 pt-3.5 min-h-[160px]">
          {deal.bullets.map((bullet) => (
            <li key={bullet.title} className="flex items-start gap-2 text-[11px] leading-snug text-slate-300">
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] ${colors.bulletIcon}`}>
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-white mr-1">{bullet.title}:</span>
                <span className="text-slate-400">{bullet.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* ROW 6: Standardized Interactive Coupon Code Container (min-h-[52px]) */}
        <div className="mb-3 min-h-[52px] flex flex-col justify-end">
          {deal.code ? (
            <button
              type="button"
              onClick={() => copyCode(deal.code!)}
              className={`group/btn relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-dashed px-3 py-2 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${colors.couponBg}`}
              title="Click to copy coupon code"
              aria-label={`Copy coupon code ${deal.code}`}
            >
              <div className="flex min-w-0 flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {copied === deal.code ? "Code Copied To Clipboard!" : "Exclusive Coupon Code"}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[14px] font-black tracking-widest text-white">
                    {deal.code}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.accent}`}>
                    {copied === deal.code ? "✓ Copied" : "• Click to copy"}
                  </span>
                </div>
              </div>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 transition-colors ${copied === deal.code ? "bg-emerald-500 text-black border-emerald-400" : "bg-white/[0.06] text-white group-hover/btn:bg-white/[0.12]"}`}>
                {copied === deal.code ? <Check className="h-4 w-4 stroke-[3]" /> : <Copy className="h-4 w-4" />}
              </div>
            </button>
          ) : (
            <div className="flex h-11 w-full items-center justify-between rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-3">
              <span className="text-[10px] font-semibold text-slate-400">Direct Activation via Link</span>
              <span className={`text-[10px] font-bold ${colors.accent}`}>Instant Access</span>
            </div>
          )}
        </div>

        {/* ROW 7: Radiant Action CTA Button (h-[46px], mt-auto) */}
        <a
          href={deal.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto flex h-[46px] w-full items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${colors.button}`}
        >
          <span>{deal.action}</span>
          <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
        </a>

        {/* ROW 8: Guarantee Sub-text (h-[18px]) */}
        <p className="mt-2 text-center text-[9.5px] font-medium text-slate-500">
          Official Partner Link • Instant Discount Active
        </p>
      </div>
    </motion.article>
  );
}

export const TheRouteSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "prop" | "broker">("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredDeals = deals.filter(
    (deal) => activeFilter === "all" || deal.category === activeFilter
  );

  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index based on scroll position
    const cardWidth = el.firstElementChild?.clientWidth || 360;
    const gap = 20;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, filteredDeals.length - 1)));
  }, [filteredDeals.length]);

  useEffect(() => {
    checkScrollState();
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      checkScrollState();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState, filteredDeals]);

  // Smooth scroll left/right actions
  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 360;
    const scrollAmount = (cardWidth + 20) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Scroll to a specific card index
  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 360;
    el.scrollTo({ left: index * (cardWidth + 20), behavior: "smooth" });
  };

  // Subtle smooth auto-cycle when idle
  useEffect(() => {
    if (isPaused || filteredDeals.length <= 1) return;

    const interval = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, filteredDeals.length]);

  return (
    <SectionShell id="partners" titleId="partners-title" glowSide="right">
      {/* Header Container */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>FTT OFFICIAL PARTNERS &amp; EXCLUSIVE DISCOUNTS</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="partners-title"
              className="mt-2 font-sans text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-[44px] leading-[1.1]"
            >
              <span className="block text-white">TRADE WITH THE BEST.</span>
              <span className="block text-gold-gradient">SAVE UP TO 55% OFF.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Hand-picked, verified prop firms and trading platforms trusted by the Forex Trader Telugu
              community. Use our exclusive codes for the highest active discounts and direct live funding routes.
            </p>
          </Reveal>
        </div>

        {/* Carousel Navigation Buttons & Indicators */}
        <Reveal delay={0.12}>
          <div className="flex items-center gap-3 shrink-0">
            {/* Filter Pills */}
            <div className="flex items-center rounded-xl border border-white/10 bg-[#0b1018]/90 p-1">
              {[
                { id: "all", label: `All Deals (${deals.length})` },
                { id: "prop", label: "Futures Prop (4)" },
                { id: "broker", label: "Brokers & Crypto (2)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.id as "all" | "prop" | "broker");
                    const el = scrollContainerRef.current;
                    if (el) el.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    activeFilter === tab.id
                      ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(245,185,66,0.4)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous partner deal"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  canScrollLeft
                    ? "border-amber-400/40 bg-[#0b1018] text-amber-300 hover:bg-amber-400/10 hover:border-amber-300 shadow-[0_0_12px_rgba(245,185,66,0.15)]"
                    : "border-white/5 bg-white/[0.02] text-slate-600 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next partner deal"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  canScrollRight
                    ? "border-amber-400/40 bg-[#0b1018] text-amber-300 hover:bg-amber-400/10 hover:border-amber-300 shadow-[0_0_12px_rgba(245,185,66,0.15)]"
                    : "border-white/5 bg-white/[0.02] text-slate-600 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Trust Highlights Strip */}
      <Reveal delay={0.14}>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: ShieldCheck,
              title: "100% Verified Partners",
              detail: "Tested payout proof & trader-first policies",
            },
            {
              icon: Percent,
              title: "Guaranteed Lowest Rates",
              detail: "Exclusive discounts up to 55% with FTT codes",
            },
            {
              icon: Users,
              title: "Community Backed & Supported",
              detail: "Direct Telegram & Discord assistance available",
            },
          ].map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1018]/70 px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-400/10 text-amber-300">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">{title}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Carousel Track Container */}
      <div
        className="relative mt-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Subtle Horizontal Edge Shadows for overflow depth */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-[#050505] to-transparent" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-[#050505] to-transparent" />
        )}

        {/* Carousel Scroll Track */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          role="region"
          aria-label="Partners Deals Carousel"
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 rounded-2xl"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="w-[88vw] sm:w-[350px] md:w-[365px] lg:w-[380px] shrink-0 snap-start flex"
            >
              <DealCard deal={deal} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Swipe Indicator & Pagination Dots */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {filteredDeals.map((deal, idx) => (
              <button
                key={deal.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${deal.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-7 bg-amber-400 shadow-[0_0_8px_rgba(245,185,66,0.5)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Swipe or click arrows to explore all deals</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Community Support Banner */}
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0b1018]/80 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/40 bg-amber-400/10 text-amber-300">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                Support Forex Trader Telugu When You Get Funded
              </h3>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                By purchasing evaluations through our verified affiliate links and coupon codes, you lock in the
                steepest community discounts while supporting our team to create free Telugu trading masterclasses, daily live streams, and market analysis.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-500 sm:max-w-[260px]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>
              Coupons and promotions are subject to each prop firm&apos;s active terms. Check provider portals for full terms and conditions.
            </span>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default TheRouteSection;
