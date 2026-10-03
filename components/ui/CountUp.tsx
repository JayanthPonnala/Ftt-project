"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  useGrouping?: boolean;
  locale?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  useGrouping = true,
  locale = "en-IN",
  className = "",
}) => {
  function formatNumber(num: number, dec: number, group: boolean, loc: string): string {
    if (!group) return num.toFixed(dec);
    try {
      return new Intl.NumberFormat(loc, {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      }).format(num);
    } catch {
      const fixed = num.toFixed(dec);
      const parts = fixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  }

  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${formatNumber(end, decimals, useGrouping, locale)}${suffix}`
  );
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let startTime: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;

      setDisplayValue(`${prefix}${formatNumber(current, decimals, useGrouping, locale)}${suffix}`);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(`${prefix}${formatNumber(end, decimals, useGrouping, locale)}${suffix}`);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isInView, end, start, duration, prefix, suffix, decimals, useGrouping, locale]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
};

export default CountUp;
