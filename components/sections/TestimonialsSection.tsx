"use client";

import React from "react";
import {
  Star,
  CheckCircle2,
  Trophy,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { testimonialsData, TestimonialItem } from "@/lib/data";

interface TestimonialCardProps {
  item: TestimonialItem;
}

const MediumTestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  return (
    <div className="relative w-[390px] sm:w-[460px] shrink-0 rounded-2xl bg-gradient-to-br from-[#181818]/95 via-[#101010]/95 to-[#080808] border border-[#F5B942]/20 hover:border-[#F5B942]/70 transition-all duration-300 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_14px_44px_rgba(245,185,66,0.14)] group flex flex-col justify-between select-none overflow-hidden">
      {/* Top Hairline Gold Glow Gradient */}
      <div
        className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B942]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Corner Ambient Mesh on Hover */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(245,185,66,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* 1. Top Row: Avatar & Trader Info + Payout Pill */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar Initials with Gold Gradient Border */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2E2E2E] via-[#1A1A1A] to-[#0D0D0D] border border-[#F5B942]/50 flex items-center justify-center font-heading text-sm text-[#F5B942] shadow-[0_0_12px_rgba(245,185,66,0.25)] shrink-0 group-hover:scale-105 transition-transform">
            {item.avatarInitials}
          </div>

          {/* Name & City */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-[14.5px] sm:text-[15px] font-bold text-white truncate leading-tight group-hover:text-[#F5B942] transition-colors">
                {item.name}
              </h4>
              <CheckCircle2 className="w-4 h-4 text-[#F5B942] shrink-0" />
            </div>
            <span className="text-[11.5px] text-[#A0A0A0] truncate block mt-0.5">
              {item.city}
            </span>
          </div>
        </div>

        {/* Payout & Stars Badge */}
        <div className="flex flex-col items-end shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFE29A]/15 via-[#F5B942]/20 to-[#B8801F]/15 border border-[#F5B942]/40 text-[#F5B942] text-[12px] font-mono font-bold shadow-[0_0_10px_rgba(245,185,66,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-[#F5B942]" />
            <span>{item.payoutAmount}</span>
          </div>
          <div className="flex items-center gap-0.5 mt-1.5">
            {[...Array(item.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-[#F5B942] text-[#F5B942]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Quote with Comfortable Line-Height */}
      <p className="text-[13px] sm:text-[13.5px] text-[#D8D8D8] leading-[1.6] italic line-clamp-3 my-2 font-body">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* 3. Bottom Row: Firm / Pass Badge + Instrument Focus */}
      <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1.5 font-bold text-[#F5B942] tracking-wider uppercase bg-[#F5B942]/10 px-2.5 py-1 rounded-full border border-[#F5B942]/30">
          <Sparkles className="w-3 h-3 text-[#F5B942]" />
          <span>{item.highlightBadge}</span>
        </span>
        <span className="text-[#999] font-medium truncate">
          {item.tradingFocus}
        </span>
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  // Split into Row 1 and Row 2 for 2-line alternating marquee
  const row1 = testimonialsData.slice(0, 6);
  const row2 = testimonialsData.slice(6, 12);

  // Duplicate for seamless 50% translation infinite loop
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <SectionShell id="testimonials" titleId="testimonials-title" glowSide="right" className="!px-0 overflow-hidden">
      {/* Decorative Outlined Number "05" in top-right */}
      <div
        className="absolute top-8 right-6 lg:right-12 text-[100px] sm:text-[140px] lg:text-[170px] font-heading select-none pointer-events-none opacity-20 font-black leading-none"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          color: "transparent",
        }}
        aria-hidden="true"
      >
        05
      </div>

      {/* Header Block (Inner constrained container) */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <Reveal>
              <Eyebrow>TRADER SUCCESS & REVIEWS</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionTitle
                id="testimonials-title"
                whiteText="REAL TELUGU TRADERS."
                goldText="DOCUMENTED RESULTS."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[#D6D6D6] max-w-[620px] mt-3 font-body">
                Watch how disciplined Telugu traders across the globe transitioned from
                inconsistent guessing to institutional Price Action, funded accounts, and verified payouts.
              </p>
            </Reveal>
          </div>

          {/* Right Slogan with 2px vertical gold line */}
          <Reveal delay={0.1} className="flex items-center gap-3.5 lg:mb-1 shrink-0">
            <div className="w-[2px] h-10 bg-[#F5B942] rounded-full shrink-0" />
            <div className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] uppercase leading-tight italic max-w-[260px]">
              <span className="text-white">NO THEORIES. </span>
              <span className="text-gold-gradient">JUST CONSISTENT TRADERS.</span>
            </div>
          </Reveal>
        </div>

        {/* Compact Trust Counters Row */}
        <Reveal delay={0.15} className="mt-6 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-white/[0.03] via-[#F5B942]/[0.04] to-white/[0.03] border border-[#F5B942]/20 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F5B942]/10 border border-[#F5B942]/30 flex items-center justify-center text-[#F5B942] shrink-0">
                <Star className="w-4 h-4 fill-[#F5B942]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-[20px] text-white">4.9</span>
                  <span className="text-xs text-[#F5B942] font-semibold">/ 5.0</span>
                </div>
                <span className="text-[9.5px] text-[#A8A8A8] uppercase tracking-wider block">
                  850+ Community Reviews
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F5B942]/10 border border-[#F5B942]/30 flex items-center justify-center text-[#F5B942] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-heading text-[20px] text-gold-gradient">
                    <CountUp end={1000} duration={1600} locale="en-IN" />
                  </span>
                  <span className="text-xs text-[#F5B942] font-bold">+</span>
                </div>
                <span className="text-[9.5px] text-[#A8A8A8] uppercase tracking-wider block">
                  Traders Mentored
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F5B942]/10 border border-[#F5B942]/30 flex items-center justify-center text-[#F5B942] shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-heading text-[20px] text-gold-gradient">
                    $<CountUp end={1} duration={1400} />M
                  </span>
                  <span className="text-xs text-[#F5B942] font-bold">+</span>
                </div>
                <span className="text-[9.5px] text-[#A8A8A8] uppercase tracking-wider block">
                  Total Member Payouts
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F5B942]/10 border border-[#F5B942]/30 flex items-center justify-center text-[#F5B942] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-heading text-[20px] text-white">100</span>
                  <span className="text-xs text-[#F5B942] font-bold">%</span>
                </div>
                <span className="text-[9.5px] text-[#A8A8A8] uppercase tracking-wider block">
                  Telugu Live Streams
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 2 Horizontal Scrolling Marquee Rows with Left & Right Gradient Fades */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Edge Fade Animation */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.85) 45%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Right Edge Fade Animation */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(270deg, #050505 0%, rgba(5,5,5,0.85) 45%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Row 1: Scrolling Left slowly */}
        <div className="flex w-full overflow-hidden mb-4 sm:mb-5 select-none">
          <div className="animate-marquee-left flex gap-5 sm:gap-6 px-3">
            {marqueeRow1.map((item, idx) => (
              <MediumTestimonialCard key={`r1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right slowly */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="animate-marquee-right flex gap-5 sm:gap-6 px-3">
            {marqueeRow2.map((item, idx) => (
              <MediumTestimonialCard key={`r2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint Strip */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center justify-between text-xs text-[#777] border-t border-white/5 pt-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] animate-pulse" />
            Hover over any review to pause scrolling
          </span>
          <a
            href="#courses"
            className="text-[#F5B942] hover:underline font-medium inline-flex items-center gap-1"
          >
            Join FTT Mentorship <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </SectionShell>
  );
};

export default TestimonialsSection;
