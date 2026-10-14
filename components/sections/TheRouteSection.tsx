"use client";

import React, { useState } from "react";
import { Check, Clipboard, Info, Percent, ShieldCheck, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Deal = {
  kind: string;
  name: string;
  description: string;
  offer: string;
  offerDetail: string;
  secondaryOffer?: string;
  secondaryOfferDetail?: string;
  bullets: string[];
  code?: string;
  secondaryCode?: string;
  secondaryLabel?: string;
  action: string;
  href: string;
  tone: "gold" | "green" | "blue" | "purple";
};

const deals: Deal[] = [
  {
    kind: "PROP FIRM",
    name: "MyFunded Futures",
    description: "The Retail Prop Firm",
    offer: "50% OFF",
    offerDetail: "Rapid • Builder • Pro Accounts",
    bullets: ["High payouts", "Trader-friendly rules", "Built for serious traders", "Trade up to $200K"],
    code: "FTT",
    action: "Claim Offer",
    href: "https://myfundedfutures.com",
    tone: "gold",
  },
  {
    kind: "PROP FIRM",
    name: "Lucid Trading",
    description: "More Power. More Opportunities.",
    offer: "40% OFF",
    offerDetail: "New Accounts",
    bullets: ["Recommended: 50K Flex", "More flexibility", "More powerful setups", "Trader-friendly platform"],
    code: "FTT",
    action: "Explore Lucid",
    href: "https://lucidtrading.com",
    tone: "green",
  },
  {
    kind: "FOREX BROKER",
    name: "JustMarkets",
    description: "Trade More. Trade Better.",
    offer: "",
    offerDetail: "",
    bullets: ["Tight spreads", "Fast execution", "Easy payments", "Wide range of instruments", "Reliable and trusted broker"],
    code: "24u140fax",
    action: "Open Account",
    href: "https://justmarkets.com",
    tone: "blue",
  },
  {
    kind: "CRYPTO PAYMENTS",
    name: "RedotPay",
    description: "Spend Crypto Like Fiat!",
    offer: "$5 FREE",
    offerDetail: "On Sign Up",
    secondaryOffer: "20% OFF",
    secondaryOfferDetail: "On Fees",
    bullets: ["Global card acceptance", "Low fees", "Easy KYC & quick setup", "Support multiple cryptocurrencies"],
    code: "0g9eh",
    secondaryCode: "20OFF2026",
    secondaryLabel: "20% OFF Fees",
    action: "Get RedotPay",
    href: "https://www.redotpay.com",
    tone: "purple",
  },
];

const toneClasses = {
  gold: {
    card: "border-amber-400/30 hover:border-amber-300/70",
    glow: "bg-amber-400/10",
    accent: "text-amber-300",
    button: "bg-gradient-to-r from-amber-300 to-yellow-500 text-black",
    icon: "border-amber-300/40 text-amber-300",
  },
  green: {
    card: "border-emerald-400/30 hover:border-emerald-300/70",
    glow: "bg-emerald-400/10",
    accent: "text-emerald-300",
    button: "bg-gradient-to-r from-emerald-300 to-green-500 text-black",
    icon: "border-emerald-300/40 text-emerald-300",
  },
  blue: {
    card: "border-blue-400/30 hover:border-blue-300/70",
    glow: "bg-blue-400/10",
    accent: "text-blue-300",
    button: "bg-gradient-to-r from-blue-400 to-blue-600 text-white",
    icon: "border-blue-300/40 text-blue-300",
  },
  purple: {
    card: "border-purple-400/30 hover:border-purple-300/70",
    glow: "bg-purple-400/10",
    accent: "text-purple-300",
    button: "bg-gradient-to-r from-purple-400 to-violet-600 text-white",
    icon: "border-purple-300/40 text-purple-300",
  },
};

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
        let copied = false;
        try {
          textArea.select();
          copied = document.execCommand("copy");
        } finally {
          textArea.remove();
        }

        if (!copied) {
          throw new Error("The browser could not copy the coupon code.");
        }
      }

      setCopied(code);
      window.setTimeout(() => setCopied(null), 1800);
    } catch (error) {
      console.error("Unable to copy coupon code.", error);
      setCopied(null);
    }
  };

  return (
    <RevealItem className="h-full">
      <motion.article
        whileHover={shouldReduceMotion ? undefined : { y: -5 }}
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#0b1018]/95 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-colors sm:p-5 ${colors.card}`}
      >
        <motion.div
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { x: [-24, 32, -12, -24], rotate: [0, 8, -5, 0], scale: [1, 1.12, 0.96, 1] }}
          transition={shouldReduceMotion ? undefined : { duration: 12 + index * 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl ${colors.glow}`}
        />
        <motion.div
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { x: ["-120%", "120%"] }}
          transition={shouldReduceMotion ? undefined : { duration: 8 + index, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          className="pointer-events-none absolute -inset-y-10 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(to bottom, black, transparent 72%)",
          }}
        />
        <div className="relative flex flex-1 flex-col">
          <div className="mb-4 min-h-[74px]">
            <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${colors.accent}`}>{deal.kind}</p>
            <h3 className="mt-1 text-lg font-extrabold text-white">{deal.name}</h3>
            <p className="text-[11px] text-slate-400">{deal.description}</p>
          </div>

          {deal.offer ? (
            <div className={`mb-4 min-h-[58px] ${deal.secondaryOffer ? "grid grid-cols-2 gap-2" : ""}`}>
              <div>
                <p className={`text-4xl font-black leading-none ${colors.accent}`}>{deal.offer}</p>
                <p className="mt-1 text-[10px] font-medium text-slate-300">{deal.offerDetail}</p>
              </div>
              {deal.secondaryOffer && (
                <div className="border-l border-white/10 pl-2">
                  <p className={`text-2xl font-black leading-none ${colors.accent}`}>{deal.secondaryOffer}</p>
                  <p className="mt-1 text-[10px] font-medium text-slate-300">{deal.secondaryOfferDetail}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4 flex min-h-[58px] items-center gap-2">
              {["Tight spreads", "Fast execution"].map((marker) => (
                <div
                  key={marker}
                  className={`flex flex-1 items-center gap-1.5 rounded-lg border border-dashed px-2 py-2 text-[9px] font-semibold ${colors.icon}`}
                >
                  <Check className="h-3 w-3 shrink-0" />
                  <span>{marker}</span>
                </div>
              ))}
            </div>
          )}

          <ul className="min-h-[104px] space-y-1.5 border-t border-white/10 pt-3">
            {deal.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[10px] text-slate-300">
                <Check className={`mt-0.5 h-3 w-3 shrink-0 ${colors.accent}`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className={`mt-4 ${deal.secondaryCode ? "grid grid-cols-2 gap-2" : "space-y-2"}`}>
            {deal.code && (
              <button
                type="button"
                onClick={() => copyCode(deal.code!)}
                className={`flex min-w-0 w-full cursor-pointer items-center justify-between gap-1 rounded-lg border border-dashed px-2 py-2 text-left text-[9px] ${colors.icon}`}
              >
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-slate-500">USE CODE</span>
                  <strong className="mt-0.5 truncate tracking-[0.08em]">{deal.code}</strong>
                </span>
                {copied === deal.code ? <Check className="h-3 w-3 shrink-0" /> : <Clipboard className="h-3 w-3 shrink-0" />}
              </button>
            )}
            {deal.secondaryCode && (
              <button
                type="button"
                onClick={() => copyCode(deal.secondaryCode!)}
                className={`flex min-w-0 w-full cursor-pointer items-center justify-between gap-1 rounded-lg border border-dashed px-2 py-2 text-left text-[9px] ${colors.icon}`}
              >
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-slate-500">{deal.secondaryLabel}</span>
                  <strong className="mt-0.5 truncate tracking-[0.04em]">{deal.secondaryCode}</strong>
                </span>
                {copied === deal.secondaryCode ? <Check className="h-3 w-3 shrink-0" /> : <Clipboard className="h-3 w-3 shrink-0" />}
              </button>
            )}
          </div>

          <a
            href={deal.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 flex items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold transition-transform hover:scale-[1.02] ${colors.button}`}
          >
            {deal.action} <span className="ml-1.5">↗</span>
          </a>
        </div>
      </motion.article>
    </RevealItem>
  );
}

export const TheRouteSection: React.FC = () => {
  return (
    <SectionShell id="partners" titleId="partners-title" glowSide="right">
      <div className="max-w-3xl">
        <Reveal><Eyebrow>FTT PARTNERS &amp; EXCLUSIVE DEALS</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 id="partners-title" className="mt-2 font-heading text-4xl font-black uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            <span className="block text-white">BETTER TOOLS.</span>
            <span className="block text-gold-gradient">BIGGER OPPORTUNITIES.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Exclusive offers on trusted trading platforms and tools for our community. Use our codes and support Forex Trader Telugu.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="mt-5 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Trusted Platforms", detail: "Used by many traders" },
            { icon: Percent, title: "Exclusive Discounts", detail: "Only for FTT community" },
            { icon: Users, title: "Support the Community", detail: "Helps us create more content" },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0b1018]/70 px-3 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-300/70">
              <Icon className="h-4 w-4 text-amber-300" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-white">{title}</p>
              <p className="mt-0.5 text-[9px] text-slate-400">{detail}</p>
            </div>
          </div>
          ))}
        </div>
      </Reveal>

      <RevealGroup stagger={0.08} delay={0.15}>
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deals.map((deal, index) => <DealCard key={deal.name} deal={deal} index={index} />)}
        </div>
      </RevealGroup>

      <Reveal delay={0.2}>
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0b1018]/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-8 w-8 shrink-0 text-amber-300" />
            <div>
              <h3 className="text-sm font-bold text-white">Support Forex Trader Telugu</h3>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                By using our links and codes, you get exclusive discounts and also support our community to create more free content, reviews, and educational resources.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-[10px] leading-relaxed text-slate-500 sm:max-w-[230px]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Offers and terms may change. Please check each provider&apos;s official website for the latest details.</span>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default TheRouteSection;
