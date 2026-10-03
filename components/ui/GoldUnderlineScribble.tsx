"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface GoldUnderlineScribbleProps {
  className?: string;
}

export const GoldUnderlineScribble: React.FC<GoldUnderlineScribbleProps> = ({
  className = "",
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 280 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[280px] h-3 sm:h-4 overflow-visible pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scribbleGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFE29A" />
          <stop offset="50%" stopColor="#F5B942" />
          <stop offset="100%" stopColor="#B8801F" />
        </linearGradient>
      </defs>
      <motion.path
        d="M3 13C45 5 110 3 277 8C195 14 85 15 25 15"
        stroke="url(#scribbleGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
};

export default GoldUnderlineScribble;
