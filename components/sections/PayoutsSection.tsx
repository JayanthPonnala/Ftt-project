"use client";

import React from "react";
import Image from "next/image";
import {
  CalendarDays,
  Trophy,
  ShieldCheck,
  Layers,
  BarChart3,
  UserCircle,
  Coins,
} from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import CertificateCard from "@/components/ui/CertificateCard";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { payoutCards, payoutTrust } from "@/lib/data";

const trustIcons = {
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#F5B942]" />,
  Layers: <Layers className="w-4 h-4 text-[#F5B942]" />,
  BarChart3: <BarChart3 className="w-4 h-4 text-[#F5B942]" />,
  UserCircle: <UserCircle className="w-4 h-4 text-[#F5B942]" />,
};

// Custom rendered firm logo element using official assets
const FirmLogo: React.FC<{ type: string; name: string }> = ({ type, name }) => {
  switch (type) {
    case "mff":
      return (
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#4C7BFF]/40">
            <Image
              src="/partners/myfundedfutures.jpg"
              alt="MyFundedFutures"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[14.5px] font-bold leading-tight">
              <span className="text-white">MyFunded</span>
              <span className="text-[#4C7BFF]">Futures</span>
            </div>
            <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#F5B942]">
              SIMPLER TRADING
            </span>
          </div>
        </div>
      );
    case "lucid":
      return (
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#3FA9F5]/40">
            <Image
              src="/partners/lucid-trading.jpg"
              alt="Lucid Trading"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-[14.5px] font-bold text-white block leading-tight">LUCID</span>
            <span className="text-[9px] font-semibold text-[#A8A8A8] tracking-[0.25em] block leading-none">
              TRADING
            </span>
          </div>
        </div>
      );
    case "justmarkets":
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-[18px] font-bold text-white tracking-tight">Just</span>
          <span className="text-[18px] font-bold text-[#1E6BFF] tracking-tight">Markets</span>
        </div>
      );
    case "exness":
      return (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[4px] bg-[#FFE600] flex items-center justify-center text-black font-black text-[11px] italic">
            ex
          </div>
          <span className="text-[17px] font-bold text-white tracking-tight">exness</span>
        </div>
      );
    default:
      return <span className="text-white font-bold">{name}</span>;
  }
};

export const PayoutsSection: React.FC = () => {
  return (
    <SectionShell id="results" titleId="results-title" glowSide="left">
      {/* Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 border-b border-white/10">
        <div>
          <Reveal>
            <Eyebrow>PAYOUTS</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionTitle
              id="results-title"
              whiteText="REAL PROP FIRMS."
              goldText="PAYOUTS."
              whiteTextPost="REAL"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[#D6D6D6] max-w-[600px] mt-3">
              These are my actual funded account payouts from different prop firms. Each payout is
              ₹2,00,000+ along with dollars, and they are separate payouts — not added together.
            </p>
          </Reveal>
        </div>

        {/* Right Quote with Gold Bar */}
        <Reveal delay={0.15} className="flex items-center gap-3 lg:mb-1 shrink-0">
          <div className="w-[2px] h-10 bg-[#F5B942] rounded-full shrink-0" />
          <div className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wide leading-tight italic max-w-[260px]">
            <span className="text-white">DISCIPLINE TURNS SMALL ACCOUNTS INTO </span>
            <span className="text-[#F5B942]">BIG PAYOUTS.</span>
          </div>
        </Reveal>
      </div>

      {/* 2x2 Grid of Payout Cards */}
      <div className="mt-7 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {payoutCards.map((card, idx) => (
          <Reveal key={card.firm} delay={0.1 + idx * 0.08}>
            <GlassCard className="p-3.5 sm:p-4.5 bg-gradient-to-br from-white/[0.035] to-transparent border border-[#F5B942]/20 hover:border-[#F5B942]/60 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left Side: Firm Logo + Amount + Meta */}
                <div className="flex-1">
                  {/* Firm Logo */}
                  <div className="mb-3">
                    <FirmLogo type={card.logoType} name={card.firm} />
                  </div>

                  {/* Payout Amount */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A8A8] block">
                      PAYOUT AMOUNT
                    </span>
                    <span className="font-heading text-[26px] sm:text-[32px] lg:text-[36px] leading-none text-gold-gradient block mt-1">
                      $
                      <CountUp end={card.amount} duration={1800} locale="en-IN" />
                      <span className="text-[#F5B942]">+</span>
                    </span>
                  </div>

                  {/* Meta items */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-[11px] text-[#A8A8A8]">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-[#F5B942]" />
                      <span>{card.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-[#F5B942]" />
                      <span className="font-semibold text-white/90">{card.accountType}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Certificate Card */}
                <div className="shrink-0 flex items-center justify-center sm:justify-end">
                  <CertificateCard
                    firm={card.firm}
                    amount={card.certAmount}
                    certSlug={card.certSlug}
                    dateRange={card.dateRange}
                    accountType={card.accountType}
                    logoType={card.logoType}
                  />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {/* Bottom Total Payouts Strip */}
      <Reveal delay={0.25} className="mt-8 sm:mt-10">
        <div className="rounded-2xl border border-[#F5B942]/40 bg-gradient-to-r from-black/60 via-[#F5B942]/[0.05] to-black/60 p-3.5 sm:p-5 backdrop-blur-md shadow-[0_0_35px_rgba(245,185,66,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Total Counter Box */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl gold-btn-gradient flex items-center justify-center text-black shadow-[0_0_18px_rgba(245,185,66,0.35)] shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white block">
                TOTAL PAYOUTS
              </span>
              <span className="font-heading text-[28px] sm:text-[34px] text-gold-gradient block leading-none mt-0.5">
                $<CountUp end={1000000} duration={2200} locale="en-IN" />+
              </span>
              <span className="text-[9px] font-medium tracking-[0.25em] text-[#A8A8A8] uppercase block mt-0.5">
                ACROSS DIFFERENT PROP FIRMS
              </span>
            </div>
          </div>

          {/* 4 Trust Points with Dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:divide-x lg:divide-white/10 w-full lg:w-auto">
            {payoutTrust.map((item, idx) => (
              <div key={idx} className="px-2.5 sm:px-3 py-1 flex items-start gap-2.5">
                <div className="shrink-0 mt-0.5">{trustIcons[item.icon]}</div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12px] font-bold text-white uppercase tracking-wider leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] text-[#A8A8A8] mt-0.5 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default PayoutsSection;
