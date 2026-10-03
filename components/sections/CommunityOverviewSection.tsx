"use client";

import React from "react";
import { BarChart3, Quote } from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import NumberBadge from "@/components/ui/NumberBadge";
import GoldButton from "@/components/ui/GoldButton";
import PlayLink from "@/components/ui/PlayLink";
import Reveal from "@/components/ui/Reveal";
import { communityGrid } from "@/lib/data";
import { SITE } from "@/lib/config";

export const CommunityOverviewSection: React.FC = () => {
  return (
    <SectionShell id="community" titleId="community-title" glowSide="left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column (~40% = 5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <Reveal>
            <Eyebrow>COMMUNITY</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <SectionTitle id="community-title" whiteText="FTT" goldText="COMMUNITY" />
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.1}>
            <div className="text-[13px] sm:text-[15px] font-medium tracking-[0.25em] text-[#E0E0E0] uppercase mt-4 flex items-center gap-2">
              <span>TRADE</span>
              <span className="text-[#F5B942]/60">•</span>
              <span>LEARN</span>
              <span className="text-[#F5B942]/60">•</span>
              <span>DISCUSS</span>
              <span className="text-[#F5B942]/60">•</span>
              <span>GROW TOGETHER</span>
            </div>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.15}>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#D6D6D6] mt-5 max-w-[480px]">
              This isn&apos;t just a course you watch. It&apos;s a trading environment where you
              learn from real markets, real executions and real discussions.
            </p>
          </Reveal>

          {/* Quote Block */}
          <Reveal delay={0.2} className="w-full mt-6">
            <div className="relative pl-5 py-2 border-l-2 border-[#F5B942] flex flex-col gap-1 bg-white/[0.015] rounded-r-lg">
              <Quote className="w-6 h-6 text-[#F5B942]/70 mb-1" />
              <p className="text-[14px] sm:text-[15px] text-white/90 italic leading-snug">
                “By watching you learn nothing, execution teaches you a lot.”
              </p>
              <p className="text-[14px] sm:text-[15px] font-bold text-[#F5B942]">
                Failures make you profitable.
              </p>
            </div>
          </Reveal>

          {/* Callout Bar */}
          <Reveal delay={0.25} className="w-full mt-6">
            <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-[10px] bg-[#F5B942]/[0.05] border border-[#F5B942]/30">
              <div className="w-9 h-9 rounded-lg gold-btn-gradient flex items-center justify-center shrink-0 text-black shadow-[0_0_12px_rgba(245,185,66,0.3)]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <p className="text-[13px] sm:text-[14px] text-white/90 leading-tight">
                Trading is 10% Buying, 10% Selling,{" "}
                <strong className="text-[#F5B942] font-bold">80% Patience.</strong>
              </p>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <GoldButton href={SITE.joinUrl} target="_blank" rel="noopener noreferrer">
              Join FTT Community
            </GoldButton>
            <PlayLink label="See How It Works" targetId="method" />
          </Reveal>
        </div>

        {/* Right Column: 2x3 Bordered Grid Panel (~60% = 7 cols) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-white/10 shadow-2xl">
              {communityGrid.map((item, idx) => {
                // Border logic for 2-column internal dividers
                const isTopRow = idx < 2;
                const isLeftCol = idx % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className={`group p-4 sm:p-5 lg:p-5.5 flex flex-col justify-between transition-all duration-300 hover:bg-[#F5B942]/[0.035] ${
                      !isTopRow ? "sm:border-t sm:border-white/10" : ""
                    } ${!isLeftCol ? "sm:border-l sm:border-white/10" : ""}`}
                  >
                    <div>
                      {/* Number Badge + Dash Line */}
                      <div className="flex items-center gap-3 mb-3">
                        <NumberBadge n={item.number} className="w-9 h-9 text-[13px]" />
                        <span className="w-8 h-[1px] bg-[#F5B942]/40 inline-block transition-all duration-300 group-hover:w-12 group-hover:bg-[#F5B942]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-white font-bold text-[16px] sm:text-[18px] leading-tight uppercase font-body">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <div className="text-[12px] sm:text-[13px] font-semibold text-[#F5B942] mt-1 leading-snug">
                        {item.subtitle}
                      </div>

                      {/* Description */}
                      <p className="text-[12.5px] sm:text-[13.5px] leading-[1.55] text-[#A8A8A8] mt-2.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
};

export default CommunityOverviewSection;
