"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Trophy,
  Users,
  TrendingUp,
  Target,
  ShieldCheck,
  Brain,
} from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import GlassCard from "@/components/ui/GlassCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { mentorStats, philosophy } from "@/lib/data";

const iconMap = {
  BarChart3: <BarChart3 className="w-4 h-4 text-[#F5B942]" />,
  Trophy: <Trophy className="w-4 h-4 text-[#F5B942]" />,
  Users: <Users className="w-4 h-4 text-[#F5B942]" />,
  TrendingUp: <TrendingUp className="w-4 h-4 text-[#F5B942]" />,
  Target: <Target className="w-4 h-4 text-[#F5B942]" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#F5B942]" />,
  Brain: <Brain className="w-4 h-4 text-[#F5B942]" />,
};

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-20, 20]
  );

  return (
    <SectionShell id="about" titleId="about-title" glowSide="right">
      <div ref={containerRef} className="flex flex-col gap-8 sm:gap-10">
        {/* Tier 1: Mentor Profile & Command Center Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Cinematic Workspace Photo (5 cols) */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-white/10 bg-[#0A0A0A]">
            <motion.div style={{ y: photoY }} className="absolute inset-0 w-full h-[110%] -top-[5%]">
              <Image
                src="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1792906849/Cinematic_FTT_Trading_Mentor_Workspace.png"
                alt="Chaitanya - Founder and Mentor at Forex Trader Telugu in his Trading Workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
            </motion.div>

            {/* Subtle Vignette & Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, transparent 60%, rgba(5,5,5,0.7) 100%)",
              }}
            />

            {/* Top-Right Badge: Experience */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10.5px] uppercase font-bold tracking-widest text-[#F5B942]">
              9+ YRS VETERAN
            </div>

            {/* Bottom-Left Live Status Badge */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#F5B942]/30 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#F5B942] animate-pulse" />
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-wider text-white uppercase">
                Trading Command Center
              </span>
            </div>
          </div>

          {/* Right Column: Bio & Aligned Stat Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* 1. Eyebrow */}
            <Reveal>
              <Eyebrow>MEET YOUR MENTOR</Eyebrow>
            </Reveal>

            {/* 2. H2 Chaitanya */}
            <Reveal delay={0.05}>
              <h2
                id="about-title"
                className="font-heading uppercase text-white tracking-wide text-[32px] sm:text-[40px] md:text-[46px] lg:text-[50px] leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              >
                CHAITANYA
              </h2>
            </Reveal>

            {/* 3. Subtitle */}
            <Reveal delay={0.1}>
              <div className="text-[12px] sm:text-[14px] lg:text-[15px] font-bold uppercase tracking-wider text-[#F5B942] mt-1.5 flex flex-wrap items-center gap-2">
                <span>TRADER</span>
                <span className="text-white/40">|</span>
                <span>MENTOR</span>
                <span className="text-white/40">|</span>
                <span>FOUNDER OF FTT</span>
              </div>
            </Reveal>

            {/* 4. Bio Paragraph with Highlights */}
            <Reveal delay={0.15}>
              <p className="text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[#D6D6D6] mt-3.5">
                A full-time market veteran with 9+ years trading{" "}
                <strong className="text-[#F5B942] font-semibold">Forex in Telugu</strong> and{" "}
                <strong className="text-[#F5B942] font-semibold">Gold in Telugu</strong>, Chaitanya
                has taken <strong className="text-[#F5B942] font-semibold">$1M+ in prop firm payouts</strong>.
                Through <strong className="text-white font-medium">forextradertelugu</strong>, he mentors{" "}
                <strong className="text-[#F5B942] font-semibold">1,000+ traders</strong> via the premier{" "}
                <strong className="text-white font-medium">Telugu trading course</strong> and daily{" "}
                <strong className="text-[#F5B942] font-semibold">Telugu trading live</strong> streams.
              </p>
            </Reveal>

            {/* 5. Four Stat Cards - Perfectly Aligned Horizontally & Vertically */}
            <div className="w-full mt-5 sm:mt-6">
              <RevealGroup stagger={0.08} delay={0.18}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {mentorStats.map((stat, idx) => (
                    <RevealItem key={idx}>
                      <GlassCard
                        className="p-3 sm:p-3.5 flex flex-col justify-between h-full min-h-[116px] group hover:border-[#F5B942]/50"
                        hoverGlow
                      >
                        {/* Top: Icon */}
                        <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-[#F5B942]/30 flex items-center justify-center mb-2.5 transition-colors group-hover:border-[#F5B942]/60 group-hover:bg-[#F5B942]/10 shrink-0">
                          {iconMap[stat.icon]}
                        </div>

                        {/* Bottom: Aligned Value + Aligned Label */}
                        <div className="flex flex-col justify-end">
                          <div className="text-white font-bold text-[15px] sm:text-[16px] leading-tight min-h-[38px] flex items-end">
                            {stat.value !== undefined ? (
                              <CountUp
                                end={stat.value}
                                prefix={stat.prefix || ""}
                                suffix={stat.suffix || ""}
                                locale="en-IN"
                              />
                            ) : (
                              <span className="text-[13.5px] sm:text-[14.5px] leading-snug font-bold">
                                {stat.textValue}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] sm:text-[11.5px] text-[#A8A8A8] mt-1.5 leading-[1.3] min-h-[30px] flex items-start">
                            {stat.label}
                          </div>
                        </div>
                      </GlassCard>
                    </RevealItem>
                  ))}
                </div>
              </RevealGroup>
            </div>
          </div>
        </div>

        {/* Tier 2: My Trading Journey & My Trading Philosophy (Balanced 2-Column Row) */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: My Trading Journey (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal delay={0.2} className="h-full">
              <GlassCard className="p-5 sm:p-6 h-full flex flex-col justify-between border-l-2 border-l-[#F5B942]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-4 bg-[#F5B942] rounded-full inline-block" />
                    <h3 className="font-heading uppercase text-white text-[17px] sm:text-[19px] tracking-wide">
                      MY TRADING JOURNEY
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-[#D6D6D6]">
                    I started trading with a simple curiosity and it quickly turned into a deep passion.
                    Like every trader, I went through failures, blown accounts and tough learning
                    phases. Over the years, I developed a structured approach with strong risk
                    management, price action and market understanding.
                  </p>
                </div>
                <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#A8A8A8]">Mentorship Philosophy</span>
                  <span className="text-[12px] font-bold text-[#F5B942] uppercase tracking-wider">— Chaitanya</span>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right: My Trading Philosophy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Reveal delay={0.22}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 bg-[#F5B942] rounded-full inline-block" />
                <h3 className="font-heading uppercase text-white text-[17px] sm:text-[19px] tracking-wide">
                  MY TRADING PHILOSOPHY
                </h3>
              </div>
            </Reveal>
            <RevealGroup stagger={0.08} delay={0.24}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 h-full">
                {philosophy.map((item, idx) => (
                  <RevealItem key={idx} className="h-full">
                    <GlassCard
                      className={`p-3.5 sm:p-4 transition-all duration-300 h-full flex items-center ${
                        idx === 0 ? "border-l-2 border-l-[#F5B942]" : ""
                      }`}
                      hoverGlow
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F5B942]/10 border border-[#F5B942]/40 flex items-center justify-center shrink-0">
                          {iconMap[item.icon]}
                        </div>
                        <div>
                          <h4 className="text-[13.5px] sm:text-[14px] font-bold text-white tracking-tight">{item.title}</h4>
                          <p className="text-[11.5px] sm:text-[12px] text-[#A8A8A8] mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default AboutSection;
