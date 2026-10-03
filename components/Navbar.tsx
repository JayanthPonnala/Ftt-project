"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE } from "@/lib/config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToIdGlobal } from "@/components/SmoothScroll";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isNavActive, setActiveSectionManual } = useActiveSection();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent,
    target: string
  ) => {
    e.preventDefault();
    setActiveSectionManual(target);
    scrollToIdGlobal(target);
  };

  const handleMobileNavClick = (target: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      setActiveSectionManual(target);
      scrollToIdGlobal(target);
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-md ${
        isScrolled
          ? "bg-[#050505]/95 shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
          : "bg-[#050505]/85"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-[60px] lg:h-[68px] px-5 sm:px-8 lg:px-[60px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#F5B942] rounded-md outline-none"
          aria-label="Forex Trader Telugu Homepage"
        >
          {/* Official FTT Logo from Assets */}
          <div className="relative w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full overflow-hidden shrink-0 border border-[#F5B942]/60 shadow-[0_0_12px_rgba(245,185,66,0.25)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/ftt-logo.jpg"
              alt="Forex Trader Telugu Logo"
              fill
              sizes="42px"
              className="object-cover"
              priority
            />
          </div>

          {/* Logo Text: FTT Fullform */}
          <div className="font-heading uppercase tracking-[0.5px] text-[19px] sm:text-[22px] lg:text-[24px] leading-none select-none flex items-center gap-1.5 pt-0.5">
            <span className="text-white">FOREX TRADER</span>
            <span className="text-[#F5B942]">TELUGU</span>
          </div>
        </Link>

        {/* Center: Nav links (Desktop) */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 xl:gap-[32px]"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item.sections);

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`relative text-[15px] font-medium transition-colors duration-200 py-1 select-none outline-none focus-visible:text-[#F5B942] ${
                  active ? "text-[#F5B942]" : "text-white hover:text-[#F5B942]"
                }`}
              >
                {item.label}

                {/* Sliding Gold Underline Indicator */}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[12px] left-0 right-0 h-[2px] bg-[#F5B942] rounded-full shadow-[0_0_8px_rgba(245,185,66,0.6)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: CTA button (Desktop) */}
        <div className="hidden lg:block">
          <a
            href={SITE.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] gold-btn-gradient text-[#0A0A0A] font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,185,66,0.35)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white select-none"
          >
            <span>Join FTT Community</span>
            <ArrowRight className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#F5B942] focus-visible:ring-2 focus-visible:ring-[#F5B942] rounded-lg transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* 2px Gold Scroll Progress Bar along bottom edge */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] origin-left z-10 pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-[#0B0B0B] border-b border-white/10 px-6 py-6 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {NAV_ITEMS.map((item) => {
                const active = isNavActive(item.sections);

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleMobileNavClick(item.target)}
                    className={`text-left text-[17px] font-medium py-1.5 transition-colors ${
                      active
                        ? "text-[#F5B942] font-semibold pl-2.5 border-l-2 border-[#F5B942]"
                        : "text-[#D6D6D6] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <a
              href={SITE.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-[12px] px-6 rounded-[8px] gold-btn-gradient text-[#0A0A0A] font-semibold text-[15px] shadow-[0_4px_16px_rgba(245,185,66,0.3)]"
            >
              <span>Join FTT Community</span>
              <ArrowRight className="w-[16px] h-[16px]" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
