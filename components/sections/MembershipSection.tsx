"use client";

import React from "react";
import {
  PlayCircle,
  GraduationCap,
  FileText,
  Users,
  TrendingUp,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import NumberBadge from "@/components/ui/NumberBadge";
import IconBox from "@/components/ui/IconBox";
import CountUp from "@/components/ui/CountUp";
import FttMark from "@/components/ui/FttMark";
import Reveal, { EASE_CUSTOM } from "@/components/ui/Reveal";
import { membershipFeatures, membershipBenefits } from "@/lib/data";
import { SITE } from "@/lib/config";

const benefitIcons = {
  PlayCircle: <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" strokeWidth={1.5} />,
  GraduationCap: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" strokeWidth={1.5} />,
  FileText: <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" strokeWidth={1.5} />,
  Users: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" strokeWidth={1.5} />,
  TrendingUp: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" strokeWidth={1.5} />,
  CalendarDays: <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" strokeWidth={1.5} />,
};

export const MembershipSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="courses"
      aria-labelledby="courses-title"
      className="scroll-mt-16 md:scroll-mt-[78px] relative w-full bg-[#050505] overflow-hidden"
    >
      {/* Top Hairline */}
      <div
        className="w-full h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(245,185,66,0.25), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Warm Gold Radial Glow Behind Price (~5% opacity) */}
      <div
        className="absolute top-[25%] left-[2%] w-[380px] h-[380px] rounded-full pointer-events-none select-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(245,185,66,0.06) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
        aria-hidden="true"
      />

      {/* Main Inner Container */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Main Grid: Desktop 34% / 1px / 1fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[34%_1px_1fr] gap-6 xl:gap-10 items-stretch">
          {/* ======================================================== */}
          {/* COLUMN 1: Left Intro & Pricing                            */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between">
            <div>
              {/* 1. Eyebrow */}
              <Reveal>
                <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.3em] text-[#F5B942]">
                  <span>MEMBERSHIP</span>
                  <span className="w-[50px] h-[1px] bg-[#F5B942] inline-block shrink-0" aria-hidden="true" />
                </div>
              </Reveal>

              {/* 2. Heading */}
              <Reveal delay={0.08}>
                <h2
                  id="courses-title"
                  className="font-heading uppercase tracking-[0.5px] text-[38px] sm:text-[48px] xl:text-[60px] leading-[0.9] mt-2.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                >
                  <span className="block text-white">FTT</span>
                  <span className="block text-gold-gradient">COMMUNITY</span>
                </h2>
              </Reveal>

              {/* 3. Tagline with gold bullets */}
              <Reveal delay={0.16}>
                <div className="text-[11px] sm:text-[12.5px] font-medium tracking-[0.25em] text-[#A8A8A8] uppercase mt-3 flex items-center flex-wrap gap-2">
                  <span>TRADE</span>
                  <span className="text-[#F5B942]">•</span>
                  <span>LEARN</span>
                  <span className="text-[#F5B942]">•</span>
                  <span>DISCUSS</span>
                  <span className="text-[#F5B942]">•</span>
                  <span>GROW TOGETHER</span>
                </div>
              </Reveal>

              {/* 4. Descriptive Paragraph */}
              <Reveal delay={0.24}>
                <p className="font-body text-[#D6D6D6] text-[13.5px] sm:text-[14.5px] leading-[1.6] max-w-[440px] mt-3.5 font-normal">
                  Get complete access to live trading sessions, advanced concepts, trade ideas,
                  community support and everything you need to become a consistent trader.
                </p>
              </Reveal>
            </div>

            {/* 5. Pricing and CTA Area */}
            <Reveal delay={0.32} className="w-full mt-6 sm:mt-7">
              <div>
                <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] uppercase text-white block">
                  {SITE.priceLabel}
                </span>

                <div className="mt-0.5 flex items-baseline">
                  <span className="font-heading text-[44px] sm:text-[54px] xl:text-[66px] leading-none text-gold-gradient drop-shadow-[0_6px_36px_rgba(245,185,66,0.35)]">
                    <CountUp end={14999} prefix="₹" duration={1800} locale="en-IN" />
                  </span>
                </div>

                <div className="w-[80px] h-[1px] bg-[#F5B942] mt-2.5" aria-hidden="true" />

                {/* Full-width Pill CTA Button with subtle scale & hover shadow */}
                <a
                  href={SITE.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join FTT Community, 6 months access for ₹14,999"
                  className="relative w-full h-[52px] sm:h-[58px] rounded-full gold-btn-gradient text-[#0A0A0A] font-bold text-[15px] sm:text-[16px] uppercase tracking-[0.08em] flex items-center justify-center gap-2 mt-5 sm:mt-6 shadow-[0_12px_40px_rgba(245,185,66,0.30)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(245,185,66,0.45)] active:scale-[0.98] overflow-hidden group select-none"
                >
                  {/* Periodic shimmer sweep */}
                  <div
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-shimmer-sweep"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">JOIN FTT COMMUNITY</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: 1px Vertical Divider                            */}
          {/* ======================================================== */}
          <div
            className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent self-stretch"
            aria-hidden="true"
          />

          {/* Tablet/Mobile Horizontal Divider */}
          <div
            className="lg:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-5"
            aria-hidden="true"
          />

          {/* ======================================================== */}
          {/* COLUMN 3: Right Quote, Brand Mark & 10 Features          */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between">
            {/* Top Row: Quote (Left) & FTT Community Mark (Right) */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              {/* Bold Quote with Gold Bar */}
              <div className="flex items-center gap-3">
                <div className="w-[2px] h-9 sm:h-11 bg-[#F5B942] rounded-full shrink-0" />
                <div className="font-bold text-[16px] sm:text-[19px] lg:text-[21px] italic uppercase tracking-tight leading-snug">
                  <span className="text-white block">“ONE RIGHT DECISION</span>
                  <span className="text-[#F5B942] block">CAN CHANGE YOUR FUTURE”</span>
                </div>
              </div>

              {/* FTT Community Brand Mark using Official Asset Logo */}
              <FttMark size={56} className="w-[110px] sm:w-[125px] shrink-0 self-start sm:self-center" />
            </div>

            {/* 10 Feature Rows in 2 Sub-Columns with Staggered Entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 xl:gap-x-10 mt-3.5">
              {/* Left Sub-Column: 01 to 05 (5 points) */}
              <div className="flex flex-col">
                {membershipFeatures.slice(0, 5).map((feat, idx) => (
                  <motion.div
                    key={feat.number}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: EASE_CUSTOM,
                    }}
                    className="py-2.5 sm:py-3 flex items-start gap-3 group relative border-b border-white/10 last:border-b-0 cursor-default"
                  >
                    <div className="shrink-0 mt-0.5">
                      <NumberBadge n={feat.number} className="w-8 h-8 text-[12px] transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-white group-hover:text-[#F5B942] group-hover:translate-x-1.5 transition-all duration-300 leading-snug">
                        {feat.title}
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] text-[#A8A8A8] mt-0.5 leading-[1.45]">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Sub-Column: 06 to 10 (5 points) */}
              <div className="flex flex-col">
                {membershipFeatures.slice(5, 10).map((feat, idx) => (
                  <motion.div
                    key={feat.number}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + idx * 0.06,
                      ease: EASE_CUSTOM,
                    }}
                    className="py-2.5 sm:py-3 flex items-start gap-3 group relative border-b border-white/10 last:border-b-0 cursor-default"
                  >
                    <div className="shrink-0 mt-0.5">
                      <NumberBadge n={feat.number} className="w-8 h-8 text-[12px] transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-white group-hover:text-[#F5B942] group-hover:translate-x-1.5 transition-all duration-300 leading-snug">
                        {feat.title}
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] text-[#A8A8A8] mt-0.5 leading-[1.45]">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BENEFITS STRIP: 6-Cell Full Width Hairline Strip          */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-0 lg:divide-x lg:divide-white/10">
            {membershipBenefits.map((item, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: EASE_CUSTOM }}
                className="px-2 sm:px-3 py-1.5 flex items-center lg:items-start gap-2.5 group hover:bg-white/[0.03] rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
              >
                <IconBox size="sm" className="w-9 h-9 rounded-[8px] shrink-0 transition-transform duration-300 group-hover:scale-105">
                  {benefitIcons[item.icon]}
                </IconBox>
                <div>
                  <h4 className="text-[12.5px] sm:text-[13.5px] font-semibold text-white leading-tight group-hover:text-[#F5B942] transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] sm:text-[11.5px] text-[#A8A8A8] mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
