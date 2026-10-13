"use client";

import React, { useRef } from "react";
import {
  ClipboardCheck,
  Coins,
  Banknote,
  ShieldCheck,
  BarChart3,
  RefreshCw,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import NumberBadge from "@/components/ui/NumberBadge";
import GlassCard from "@/components/ui/GlassCard";
import GoldUnderlineScribble from "@/components/ui/GoldUnderlineScribble";
import Reveal, { RevealGroup, RevealItem, EASE_CUSTOM } from "@/components/ui/Reveal";
import { routeSteps, routeBenefits } from "@/lib/data";

const stepIcons = {
  ClipboardCheck: <ClipboardCheck className="w-6 h-6 text-[#F5B942]" />,
  Coins: <Coins className="w-6 h-6 text-[#F5B942]" />,
  Banknote: <Banknote className="w-6 h-6 text-[#F5B942]" />,
};

const benefitIcons = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#F5B942]" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-[#F5B942]" />,
  RefreshCw: <RefreshCw className="w-5 h-5 text-[#F5B942]" />,
  Landmark: <Landmark className="w-5 h-5 text-[#F5B942]" />,
};

export const TheRouteSection: React.FC = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const isChartInView = useInView(chartRef, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionShell id="partners" titleId="partners-title" glowSide="right">
      {/* Decorative Candlestick Curve in Top-Right */}
      <div className="absolute top-10 right-6 sm:right-14 opacity-35 pointer-events-none select-none hidden md:block">
        <svg
          ref={chartRef}
          width="260"
          height="140"
          viewBox="0 0 260 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Candlestick bars */}
          <rect x="20" y="80" width="8" height="24" fill="#00D1B2" opacity="0.6" rx="1" />
          <line x1="24" y1="72" x2="24" y2="110" stroke="#00D1B2" strokeWidth="1.5" opacity="0.6" />

          <rect x="55" y="65" width="8" height="30" fill="#00D1B2" opacity="0.7" rx="1" />
          <line x1="59" y1="58" x2="59" y2="102" stroke="#00D1B2" strokeWidth="1.5" opacity="0.7" />

          <rect x="95" y="70" width="8" height="18" fill="#FF3B5C" opacity="0.6" rx="1" />
          <line x1="99" y1="62" x2="99" y2="94" stroke="#FF3B5C" strokeWidth="1.5" opacity="0.6" />

          <rect x="135" y="45" width="8" height="32" fill="#00D1B2" opacity="0.8" rx="1" />
          <line x1="139" y1="36" x2="139" y2="84" stroke="#00D1B2" strokeWidth="1.5" opacity="0.8" />

          <rect x="180" y="30" width="8" height="36" fill="#00D1B2" opacity="0.9" rx="1" />
          <line x1="184" y1="20" x2="184" y2="72" stroke="#00D1B2" strokeWidth="1.5" opacity="0.9" />

          <rect x="220" y="15" width="8" height="28" fill="#F5B942" rx="1" />
          <line x1="224" y1="6" x2="224" y2="48" stroke="#F5B942" strokeWidth="1.5" />

          {/* Golden Trend Arrow Curve */}
          <motion.path
            d="M 15 115 Q 110 95 240 18"
            stroke="#F5B942"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            animate={isChartInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: EASE_CUSTOM }}
          />
          <polygon points="236,12 248,15 242,27" fill="#F5B942" />
        </svg>
      </div>

      {/* Header Block */}
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow>THE ROUTE</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="partners-title"
            className="font-heading uppercase tracking-[0.5px] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="text-white block">PROVE YOUR SKILLS.</span>
            <span className="flex flex-wrap items-baseline gap-2 mt-1">
              <span className="relative text-gold-gradient inline-block">
                TRADE BIGGER.
                <div className="absolute -bottom-2 left-0 right-0">
                  <GoldUnderlineScribble />
                </div>
              </span>
              <span className="text-white">GET PAID.</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.6] text-[#D6D6D6] mt-4">
            A prop firm gives you access to trading capital. You first prove your skills through an
            evaluation, then get a funded account to trade real market conditions. Meet the rules,
            manage risk and stay consistent — and you get paid.
          </p>
        </Reveal>
      </div>

      {/* 3 Step Cards with Gold Arrows */}
      <div className="mt-8 sm:mt-10">
        <RevealGroup stagger={0.09} delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {routeSteps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <RevealItem className="h-full">
                  <GlassCard
                    className={`h-full p-4 sm:p-5 lg:p-5.5 flex flex-col justify-between group hover:border-[#F5B942]/60 ${
                      idx === 2 ? "md:scale-[1.01] border-[#F5B942]/30" : ""
                    }`}
                  >
                    <div>
                      {/* Top: Badge + Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <NumberBadge n={step.number} className="w-9 h-9 text-[13px] transition-transform duration-300 group-hover:scale-105" />
                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-[#F5B942]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#F5B942]/70 group-hover:bg-[#F5B942]/10 group-hover:scale-105">
                          {stepIcons[step.icon]}
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-heading uppercase text-white text-[20px] sm:text-[23px] tracking-wide leading-tight group-hover:text-[#F5B942] transition-colors duration-200">
                        {step.title}
                      </h3>
                      <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#F5B942] mt-1">
                        {step.subtitle}
                      </div>

                      {/* Description */}
                      <p className="text-[12.5px] sm:text-[13.5px] leading-[1.55] text-[#A8A8A8] mt-3">
                        {step.desc}
                      </p>
                    </div>

                    <div className="w-8 h-[2px] bg-[#F5B942] rounded-full mt-5 transition-all duration-300 group-hover:w-14" />
                  </GlassCard>
                </RevealItem>

                {/* Arrow separator (desktop) */}
                {idx < routeSteps.length - 1 && (
                  <div
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#F5B942]/60"
                    style={{
                      left: `calc(${(idx + 1) * 33.333}% - 14px)`,
                    }}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </RevealGroup>
      </div>

      {/* Bottom Strip: 4 Items with Staggered Entrance */}
      <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
        <RevealGroup stagger={0.07} delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {routeBenefits.map((item, idx) => (
              <RevealItem key={idx}>
                <div className="px-4 py-2 flex items-start gap-3.5 group hover:bg-white/[0.03] rounded-xl transition-all duration-300 cursor-default">
                  <div className="shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                    {benefitIcons[item.icon]}
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-[14px] font-bold text-white uppercase tracking-wider leading-tight group-hover:text-[#F5B942] transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-[#A8A8A8] mt-1 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </SectionShell>
  );
};

export default TheRouteSection;
