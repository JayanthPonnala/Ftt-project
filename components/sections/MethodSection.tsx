"use client";

import React from "react";
import {
  CandlestickChart,
  Crosshair,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import NumberBadge from "@/components/ui/NumberBadge";
import GlassCard from "@/components/ui/GlassCard";
import GoldUnderlineScribble from "@/components/ui/GoldUnderlineScribble";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { methodSteps } from "@/lib/data";

const iconMap = {
  CandlestickChart: <CandlestickChart className="w-5 h-5 text-[#F5B942]" />,
  Crosshair: <Crosshair className="w-5 h-5 text-[#F5B942]" />,
  FileText: <FileText className="w-5 h-5 text-[#F5B942]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#F5B942]" />,
};

export const MethodSection: React.FC = () => {
  return (
    <SectionShell id="method" titleId="method-title" glowSide="right">
      {/* Decorative Outlined Number "03" in top-right */}
      <div
        className="absolute top-8 right-6 lg:right-12 text-[100px] sm:text-[140px] lg:text-[170px] font-heading select-none pointer-events-none opacity-20 font-black leading-none"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          color: "transparent",
        }}
        aria-hidden="true"
      >
        03
      </div>

      {/* Header Block */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <Reveal>
            <Eyebrow>METHOD</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionTitle
              id="method-title"
              whiteText="A STRUCTURED APPROACH"
              goldText="TO TRADE THE MARKETS"
            />
          </Reveal>
        </div>

        {/* Right Slogan with 2px vertical gold line */}
        <Reveal delay={0.1} className="flex items-center gap-3.5 lg:mb-1">
          <div className="w-[2px] h-10 bg-[#F5B942] rounded-full shrink-0" />
          <div className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] uppercase leading-tight">
            <span className="text-[#A8A8A8] block">SAME PROCESS.</span>
            <span className="text-[#A8A8A8] block">SAME DISCIPLINE.</span>
            <span className="text-[#F5B942] block">DIFFERENT OPPORTUNITIES.</span>
          </div>
        </Reveal>
      </div>

      {/* Description Paragraph */}
      <Reveal delay={0.15}>
        <p className="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-[#D6D6D6] max-w-[700px] mt-5">
          A simple, rule-based approach designed to remove guesswork and bring structure and
          consistency to your trading decisions. Built on proven concepts and refined for Futures
          and Forex.
        </p>
      </Reveal>

      {/* 4 Cards in a Row with Arrows */}
      <div className="mt-8 sm:mt-10">
        <RevealGroup stagger={0.08} delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
            {methodSteps.map((step, idx) => {
              return (
                <RevealItem key={step.id} className="h-full relative">
                  <GlassCard className="h-full p-4 sm:p-5 flex flex-col justify-between group hover:border-[#F5B942]/60">
                    <div>
                      {/* Top Row: Badge + Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <NumberBadge n={step.number} className="w-9 h-9 text-[13px] transition-transform duration-300 group-hover:scale-105" />
                        <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-[#F5B942]/30 flex items-center justify-center transition-colors group-hover:border-[#F5B942]/70 group-hover:bg-[#F5B942]/10">
                          {iconMap[step.icon]}
                        </div>
                      </div>

                      {/* Step Title - Bold, Clean & Neat typography */}
                      <div className="min-h-[42px] flex items-center">
                        <h3 className="text-white font-bold text-[16px] sm:text-[17px] font-body tracking-tight leading-snug group-hover:text-[#F5B942] transition-colors">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[12.5px] sm:text-[13.5px] leading-[1.55] text-[#A8A8A8] mt-2">
                        {step.desc}
                      </p>
                    </div>

                    {/* 28px x 2px Gold Underline at Bottom */}
                    <div className="w-7 h-[2px] bg-[#F5B942] rounded-full mt-5 transition-all duration-300 group-hover:w-12 shrink-0" />
                  </GlassCard>

                  {/* Arrow Indicator between cards - perfectly centered in gap and at exact vertical midpoint */}
                  {idx < methodSteps.length - 1 && (
                    <div
                      className="hidden lg:flex absolute -right-[20px] top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center w-4 h-4 text-[#F5B942]/70 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  )}
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      </div>

      {/* Hairline Divider & Equation Strip with Reveal */}
      <Reveal delay={0.2} className="w-full">
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            {/* Letter spaced formula header */}
            <div className="text-[11.5px] uppercase tracking-[0.25em] font-semibold text-[#A8A8A8] mb-2">
              DISCIPLINE <span className="text-[#F5B942]">×</span> PATIENCE{" "}
              <span className="text-[#F5B942]">×</span> CONSISTENCY
            </div>

            {/* Big Equation */}
            <div className="font-heading uppercase text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-tight text-white flex flex-wrap items-baseline gap-2">
              <span>DISCIPLINE + PATIENCE + CONSISTENCY =</span>
              <span className="relative inline-block text-gold-gradient">
                PROFITABLE.
                <div className="absolute -bottom-2 left-0 right-0">
                  <GoldUnderlineScribble />
                </div>
              </span>
            </div>
          </div>

          {/* Far Right Tagline behind vertical divider */}
          <div className="flex items-center gap-3.5 lg:border-l lg:border-white/15 lg:pl-6 shrink-0">
            <div className="text-[13px] sm:text-[14px] leading-snug">
              <span className="text-[#A8A8A8] block">Same market.</span>
              <span className="text-[#A8A8A8] block">Same rules.</span>
              <strong className="text-[#F5B942] font-semibold block">Better results.</strong>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default MethodSection;
