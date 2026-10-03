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
import Reveal from "@/components/ui/Reveal";
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
      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
      >
        {/* Left Column: Photo (~42% width = 5 cols) */}
        <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] lg:h-[460px] rounded-2xl overflow-hidden shadow-2xl">
          <motion.div style={{ y: photoY }} className="absolute inset-0 w-full h-[110%] -top-[5%]">
            <Image
              src="/images/mentor.png"
              alt="Chaitanya - Founder and Mentor at Forex Trader Telugu"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[70%_center] lg:object-[68%_center]"
            />
          </motion.div>

          {/* Right edge fade into #050505 background (desktop) */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 60%, #050505 100%)",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, #050505 0%, transparent 35%)",
            }}
          />
        </div>

        {/* Right Column: Content (~58% width = 7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
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
              A full-time trader with 9+ years of experience in{" "}
              <strong className="text-[#F5B942] font-semibold">Futures and Forex</strong> markets,
              Chaitanya has built a proven track record, taken{" "}
              <strong className="text-[#F5B942] font-semibold">$1M+ in payouts</strong> from prop
              firms, and now helps{" "}
              <strong className="text-[#F5B942] font-semibold">1000+ traders</strong> through FTT
              to become consistently profitable.
            </p>
          </Reveal>

          {/* 5. Four Stat Cards */}
          <Reveal delay={0.2} className="w-full mt-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {mentorStats.map((stat, idx) => (
                <GlassCard
                  key={idx}
                  className="p-3 sm:p-3.5 flex flex-col justify-between"
                  hoverGlow
                >
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-[#F5B942]/30 flex items-center justify-center mb-1.5">
                    {iconMap[stat.icon]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-[15px] sm:text-[17px] leading-tight">
                      {stat.value !== undefined ? (
                        <CountUp
                          end={stat.value}
                          prefix={stat.prefix || ""}
                          suffix={stat.suffix || ""}
                          locale="en-IN"
                        />
                      ) : (
                        <span>{stat.textValue}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#A8A8A8] mt-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>

          {/* 6. My Trading Journey */}
          <Reveal delay={0.25} className="mt-5 sm:mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-4 bg-[#F5B942] rounded-full inline-block" />
              <h3 className="font-heading uppercase text-white text-[17px] sm:text-[19px] tracking-wide">
                MY TRADING JOURNEY
              </h3>
            </div>
            <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-[#D6D6D6]">
              I started trading with a simple curiosity and it quickly turned into a deep passion.
              Like every trader, I went through failures, blown accounts and tough learning
              phases. Over the years, I developed a structured approach with strong risk
              management, price action and market understanding.
            </p>
          </Reveal>

          {/* 7. My Trading Philosophy (4 cards) */}
          <Reveal delay={0.3} className="w-full mt-5 sm:mt-6">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1 h-4 bg-[#F5B942] rounded-full inline-block" />
              <h3 className="font-heading uppercase text-white text-[17px] sm:text-[19px] tracking-wide">
                MY TRADING PHILOSOPHY
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {philosophy.map((item, idx) => (
                <GlassCard
                  key={idx}
                  className={`p-3 transition-all duration-300 ${
                    idx === 0 ? "border-l-2 border-l-[#F5B942]" : ""
                  }`}
                  hoverGlow
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#F5B942]/10 border border-[#F5B942]/40 flex items-center justify-center shrink-0">
                      {iconMap[item.icon]}
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-white">{item.title}</h4>
                      <p className="text-[11.5px] text-[#A8A8A8] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
};

export default AboutSection;
