"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, BarChart3, Users, Play, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import StatItem from "./StatItem";
import PartnerLogos from "./PartnerLogos";
import { scrollToIdGlobal } from "./SmoothScroll";
import { EASE_CUSTOM } from "./ui/Reveal";

const STORY_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

// Custom MoneyBag icon matching reference screenshot
const MoneyBagIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 sm:w-6 sm:h-6"
    aria-hidden="true"
  >
    <path d="M9 4.5C9 3.5 10 3 12 3C14 3 15 3.5 15 4.5L16 6H8L9 4.5Z" />
    <path d="M8 6C8 6 10 6.5 12 6.5C14 6.5 16 6 16 6" />
    <path d="M16 6C18.5 7 20 10.5 20 14.5C20 18.5 16.5 21 12 21C7.5 21 4 18.5 4 14.5C4 10.5 5.5 7 8 6" />
    <path d="M12 9.5V17.5" />
    <path d="M14 11C13.5 10.4 12.8 10 12 10C10.6 10 9.8 10.8 9.8 12C9.8 13.5 14.2 13.2 14.2 15C14.2 16.2 13.2 17 12 17C10.9 17 10.2 16.5 9.8 15.8" />
  </svg>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_CUSTOM,
    },
  },
};

export const Hero: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[840px] sm:min-h-[700px] lg:h-screen lg:max-h-screen bg-[#050505] overflow-hidden flex items-center pt-[64px] lg:pt-[68px] pb-8 sm:pb-6 scroll-mt-16 md:scroll-mt-[78px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791737603/FTT_hero_background_4K.png"
          alt="Forex Trader Telugu"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-center"
        />
      </div>

      {/* Overlays */}
      {/* 1. Left-to-right gradient for text legibility (desktop) */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.88) 28%, rgba(5,5,5,0.48) 50%, rgba(5,5,5,0.06) 72%, rgba(5,5,5,0) 100%)",
        }}
      />

      {/* 1b. Mobile uniform overlay */}
      <div className="md:hidden absolute inset-0 bg-[#050505]/68 pointer-events-none z-[1]" />

      {/* 2. Top fade under navbar */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, transparent 16%)",
        }}
      />

      {/* 3. Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(0deg, rgba(5,5,5,0.85) 0%, transparent 20%)",
        }}
      />

      {/* 4. Warm radial glow behind heading */}
      <div
        className="absolute top-1/4 left-1/12 w-[460px] h-[460px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(245,185,66,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[60px] xl:px-[80px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[620px] flex flex-col items-start"
        >
          {/* 1. Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center text-[11px] sm:text-[12px] uppercase font-medium tracking-[0.2em] text-[#A8A8A8] mb-3 sm:mb-4"
          >
            <span>DISCIPLINE</span>
            <span
              className="w-[1px] h-[12px] bg-white/35 mx-2.5 sm:mx-3.5 inline-block shrink-0"
              aria-hidden="true"
            />
            <span>STRATEGY</span>
            <span
              className="w-[1px] h-[12px] bg-white/35 mx-2.5 sm:mx-3.5 inline-block shrink-0"
              aria-hidden="true"
            />
            <span>CONSISTENCY</span>
          </motion.div>

          {/* 2. Masked Word-by-Word Hero Headline Reveal */}
          <h1
            id="hero-heading"
            className="font-heading uppercase tracking-[0.5px] text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] xl:text-[76px] leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            {/* Line 1: FOREX TRADER with masked slide-up per word */}
            <span className="block text-white">
              <span className="inline-block overflow-hidden mr-[0.25em] align-top">
                <motion.span
                  className="inline-block"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { y: "110%", opacity: 0 }
                  }
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE_CUSTOM, delay: 0.12 }}
                >
                  FOREX
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { y: "110%", opacity: 0 }
                  }
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE_CUSTOM, delay: 0.22 }}
                >
                  TRADER
                </motion.span>
              </span>
            </span>

            {/* Line 2: TELUGU with masked slide-up */}
            <span className="block text-gold-gradient overflow-hidden">
              <motion.span
                className="inline-block"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { y: "110%", opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE_CUSTOM, delay: 0.34 }}
              >
                TELUGU
              </motion.span>
            </span>
          </h1>

          {/* 3. Byline with masked slide and rotation */}
          <div className="flex items-baseline -mt-1 sm:-mt-1.5 overflow-hidden">
            <motion.span
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { y: 24, opacity: 0 }
              }
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_CUSTOM, delay: 0.44 }}
              className="font-body text-[#A8A8A8] text-[18px] sm:text-[22px] lg:text-[24px] font-normal"
            >
              by
            </motion.span>
            <motion.span
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0, rotate: -3 }
                  : { y: 32, opacity: 0, rotate: -8 }
              }
              animate={{ y: 0, opacity: 1, rotate: -3 }}
              transition={{ duration: 0.7, ease: EASE_CUSTOM, delay: 0.52 }}
              className="font-script text-[#F5B942] text-[40px] sm:text-[48px] lg:text-[56px] ml-2.5 -rotate-[3deg] select-none leading-none drop-shadow-[0_2px_14px_rgba(245,185,66,0.3)] origin-left"
            >
              Chaitanya
            </motion.span>
          </div>

          {/* 4. Description paragraph with soft fade-up */}
          <motion.p
            variants={itemVariants}
            className="font-body text-[#D6D6D6] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.45] w-full max-w-[260px] sm:max-w-[540px] mt-3.5 sm:mt-4 font-normal text-left mr-auto"
          >
            Helping Telugu traders turn knowledge into consistent income through
            practical education, real market experience and a supportive
            community.
          </motion.p>

          {/* 5. Stats row with count-up animations */}
          <motion.div
            variants={itemVariants}
            className="mt-20 sm:mt-6 grid grid-cols-3 gap-0 sm:flex sm:flex-wrap sm:items-center sm:gap-7 lg:gap-8 w-full sm:w-auto"
          >
            <StatItem
              icon={<MoneyBagIcon />}
              value="1M+"
              label="Total Funding & Payouts"
            />
            <StatItem
              icon={
                <BarChart3
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  strokeWidth={1.5}
                />
              }
              value="9+"
              label="Years Experience"
            />
            <StatItem
              icon={
                <Users className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              }
              value="5k+"
              label="Active Community"
            />
          </motion.div>

          {/* 6. CTA buttons with hover scale (1.03-1.05) & shadow */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => scrollToIdGlobal("courses")}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-[8px] gold-btn-gradient text-[#0A0A0A] font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-[1.035] hover:shadow-[0_12px_36px_rgba(245,185,66,0.4)] active:scale-[0.98] text-center select-none"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={() => {
                window.location.hash = "about";
                scrollToIdGlobal("about");
              }}
              className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] bg-black/35 backdrop-blur-md border border-white/55 text-white font-medium text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-[1.035] hover:border-[#F5B942] hover:text-[#F5B942] hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(245,185,66,0.2)] active:scale-[0.98]"
            >
              {/* Circular play icon */}
              <span className="w-6 h-6 rounded-full border border-white group-hover:border-[#F5B942] flex items-center justify-center shrink-0 transition-colors">
                <Play className="w-2.5 h-2.5 fill-white text-white group-hover:fill-[#F5B942] group-hover:text-[#F5B942] ml-0.5 transition-colors" />
              </span>
              <span>Watch My Story</span>
            </button>
          </motion.div>

          {/* 7. Trusted partners strip */}
          <motion.div variants={itemVariants} className="w-full">
            <PartnerLogos />
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal with smooth scale/fade animation */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.3, ease: EASE_CUSTOM }}
              className="relative w-full max-w-4xl bg-[#0B0B0B] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10"
              role="dialog"
              aria-modal="true"
              aria-label="Chaitanya's Story Video"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Responsive Video Container */}
              <div className="relative aspect-video w-full">
                <iframe
                  src={STORY_VIDEO_URL}
                  title="Chaitanya - Forex Trader Telugu Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
