"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Radio,
  TrendingUp,
  ShieldCheck,
  Users,
  GraduationCap,
  MessagesSquare,
  ClipboardList,
  BarChart3,
  Trophy,
  Handshake,
  Info,
} from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import IconBox from "@/components/ui/IconBox";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import { joinCommunityCards, joinCommunityStats } from "@/lib/data";
import { SITE } from "@/lib/config";

const cardIcons = {
  Radio: <Radio className="w-5 h-5 text-[#F5B942]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#F5B942]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#F5B942]" />,
  Users: <Users className="w-5 h-5 text-[#F5B942]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[#F5B942]" />,
  MessagesSquare: <MessagesSquare className="w-5 h-5 text-[#F5B942]" />,
  ClipboardList: <ClipboardList className="w-5 h-5 text-[#F5B942]" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-[#F5B942]" />,
};

const statIcons = {
  Users: <Users className="w-5 h-5 text-[#F5B942]" />,
  Trophy: <Trophy className="w-5 h-5 text-[#F5B942]" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-[#F5B942]" />,
  Handshake: <Handshake className="w-5 h-5 text-[#F5B942]" />,
};

export const JoinCommunitySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-25, 25]
  );

  return (
    <SectionShell id="join" titleId="join-title" glowSide="right">
      <div ref={containerRef} className="relative">
        {/* Background Trading Floor Image Anchored Top-Right */}
        <motion.div
          style={{ y: bgY }}
          className="absolute top-0 right-0 w-full sm:w-[55%] lg:w-[45%] h-[260px] sm:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden pointer-events-none select-none opacity-25 lg:opacity-40"
        >
          <Image
            src="/images/community-room.png"
            alt="FTT Trading Floor & Community Lounge"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center"
          />

          {/* Left Fade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #050505 10%, transparent 80%)",
            }}
          />

          {/* Bottom Fade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, #050505 15%, transparent 85%)",
            }}
          />
        </motion.div>

        {/* Header Block */}
        <div className="relative z-10 max-w-[720px] pb-5 border-b border-white/10">
          <Reveal>
            <Eyebrow>THE FTT COMMUNITY</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <SectionTitle id="join-title" whiteText="LEARN. TRADE. GROW." goldText="TOGETHER." />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#D6D6D6] mt-4">
              FTT Community is a group of serious traders who support each other, learn together and
              grow with the mentor. You get daily live trading, proven strategies, doubt solving
              sessions and continuous guidance to become a consistently profitable trader.
            </p>
          </Reveal>

          {/* Slogan with Gold Bar */}
          <Reveal delay={0.15} className="mt-4 flex items-center gap-3">
            <div className="w-[2px] h-9 bg-[#F5B942] rounded-full shrink-0" />
            <div className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider leading-snug">
              <span className="text-white">A COMMUNITY THAT KEEPS YOU </span>
              <span className="text-[#F5B942]">DISCIPLINED, MOTIVATED AND ACCOUNTABLE.</span>
            </div>
          </Reveal>
        </div>

        {/* 4x2 Grid of Feature Cards (2 cols on tablet, 1 on mobile) */}
        <div className="relative z-10 mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {joinCommunityCards.map((card, idx) => (
            <Reveal key={card.title} delay={0.05 + idx * 0.05}>
              <GlassCard className="p-4 sm:p-5 flex items-start gap-3.5 h-full group hover:border-[#F5B942]/60">
                <IconBox size="sm" className="shrink-0 mt-0.5 w-10 h-10 rounded-[10px]">
                  {cardIcons[card.icon]}
                </IconBox>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-white group-hover:text-[#F5B942] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    {card.tag && (
                      <span className="text-[10.5px] font-semibold text-[#F5B942] bg-[#F5B942]/10 px-2 py-0.5 rounded-full border border-[#F5B942]/30">
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] leading-[1.55] text-[#A8A8A8] mt-1.5">
                    {card.desc}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Action Row Under Hairline */}
        <div className="relative z-10 mt-12 sm:mt-14 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="shrink-0">
            <GoldButton
              href={SITE.joinUrl}
              pill
              className="py-4 px-8 uppercase tracking-wider text-[15px] shadow-[0_10px_35px_rgba(245,185,66,0.3)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              JOIN FTT COMMUNITY
            </GoldButton>
          </div>

          {/* 4 Stat Items with Dividers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-white/10 w-full lg:w-auto">
            {joinCommunityStats.map((item, idx) => (
              <div key={idx} className="px-3 sm:px-4 py-1 flex items-center gap-3">
                <div className="shrink-0">{statIcons[item.icon]}</div>
                <div>
                  <span className="font-heading text-[18px] sm:text-[20px] text-white block leading-tight">
                    {item.value}
                  </span>
                  <span className="text-[11px] text-[#A8A8A8] leading-tight block">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="relative z-10 mt-10 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-[#F5B942] shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-[12px] leading-[1.6] text-[#8E8E8E]">
            FTT provides trading education and community support. We do not provide investment
            advice or guaranteed returns. Trading in futures, forex and other markets involves
            substantial risk of loss. Past performance (including prop firm payouts) does not
            guarantee future results. Please trade only with capital you can afford to lose.
          </p>
        </div>
      </div>
    </SectionShell>
  );
};

export default JoinCommunitySection;
