"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_CUSTOM } from "./Reveal";

const INTRO_DURATION = 1650;
const IntroOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setVisible(false), INTRO_DURATION);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE_CUSTOM } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505]"
          role="status"
          aria-label="Loading Forex Trader Telugu"
        >
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1.25, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute h-64 w-64 rounded-full bg-[#F5B942]/10 blur-3xl"
          />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 18, letterSpacing: "0.45em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              transition={{ duration: 0.8, ease: EASE_CUSTOM }}
              className="font-heading text-3xl font-black text-white sm:text-4xl"
            >
              FOREX TRADER <span className="text-[#F5B942]">TELUGU</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-3 text-[9px] font-semibold uppercase tracking-[0.35em] text-slate-400"
            >
              Trade with discipline
            </motion.p>
            <div className="mt-6 h-px w-44 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#F5B942] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
