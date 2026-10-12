"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ReadingProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5 pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#F5B942] shadow-[0_0_12px_rgba(56,189,248,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ReadingProgressBar;
