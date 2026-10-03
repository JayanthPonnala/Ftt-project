"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  // Start with full value for SSR/SEO, then animate on client mount
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const animRef = useRef<number | null>(null);

  // Parse target number and suffix
  const parseValue = (val: string) => {
    const match = val.match(/^([\d.]+)(.*)$/);
    if (!match) return { target: 0, suffix: val, isDecimal: false };
    const num = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = val.includes("1M") || val.includes(".");
    return { target: num, suffix, isDecimal };
  };

  const runAnimation = () => {
    const { target, suffix, isDecimal } = parseValue(value);
    const duration = 1100; // 1.1s - brisk, energetic, yet visibly climbing
    let startTime: number | null = null;
    setIsAnimating(true);

    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out curve: lively start, quick settling
      const easeOut = 1 - Math.pow(1 - progress, 2.5);

      if (isDecimal) {
        const current = (easeOut * target).toFixed(1);
        if (progress >= 1 || parseFloat(current) >= target) {
          setDisplayValue(`${target}${suffix}`);
        } else {
          setDisplayValue(`${current}${suffix}`);
        }
      } else {
        const current = Math.floor(easeOut * target);
        setDisplayValue(`${current}${suffix}`);
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };

    animRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const { suffix, isDecimal } = parseValue(value);
    // Initialize starting value at 0 so user clearly sees the climb
    setDisplayValue(isDecimal ? `0.1${suffix}` : `0${suffix}`);

    // Quick 100ms start delay so it doesn't feel sluggish
    const timer = setTimeout(() => {
      runAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [value]);

  return (
    <div className="flex items-center gap-3 group select-none">
      {/* Compact Circular Badge */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center bg-white/[0.04] border border-[#F5B942]/45 shadow-[0_0_15px_rgba(245,185,66,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#F5B942]/80 group-hover:shadow-[0_0_20px_rgba(245,185,66,0.3)]">
        <div className="w-5 h-5 flex items-center justify-center text-[#F5B942] transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      {/* Text Stack with visible, steady count-up animation */}
      <div className="flex flex-col justify-center">
        <div className="text-[22px] sm:text-[26px] font-bold text-[#F5B942] leading-none tracking-tight flex items-baseline">
          <span
            className={`tabular-nums transition-colors duration-200 ${
              isAnimating ? "text-[#FFE29A]" : "text-[#F5B942]"
            }`}
          >
            {displayValue}
          </span>
        </div>
        <span className="text-[12px] sm:text-[13px] text-[#A8A8A8] font-normal leading-tight mt-1 line-clamp-2 max-w-[120px]">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatItem;
