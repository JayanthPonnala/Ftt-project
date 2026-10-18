"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE } from "@/lib/config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToIdGlobal } from "@/components/SmoothScroll";
import { isBlogUnlocked, openBlogAccessModal } from "@/lib/blogAccess";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isNavActive, setActiveSectionManual } = useActiveSection();
  const { scrollYProgress } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Don't hide navbar if mobile menu is open
      if (!mobileMenuOpen) {
        if (currentScrollY > 100 && currentScrollY > lastScrollY.current + 8) {
          setIsVisible(false); // scrolling down
        } else if (currentScrollY < lastScrollY.current - 4 || currentScrollY <= 60) {
          setIsVisible(true); // scrolling up or near top
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent,
    item: { href: string; target: string }
  ) => {
    if (item.href === "/blog" || item.href.startsWith("/blog")) {
      if (!isBlogUnlocked()) {
        e.preventDefault();
        openBlogAccessModal(item.href);
        return;
      }
    }
    if (item.href.startsWith("/#")) {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        setActiveSectionManual(item.target);
        scrollToIdGlobal(item.target);
      }
      // If on another page, let the standard link redirect to /#target
    }
  };

  const handleMobileNavClick = (item: { href: string; target: string }) => {
    setMobileMenuOpen(false);
    if (item.href === "/blog" || item.href.startsWith("/blog")) {
      if (!isBlogUnlocked()) {
        openBlogAccessModal(item.href);
        return;
      }
    }
    if (item.href.startsWith("/#") && typeof window !== "undefined" && window.location.pathname === "/") {
      setTimeout(() => {
        setActiveSectionManual(item.target);
        scrollToIdGlobal(item.target);
      }, 100);
    } else {
      window.location.href = item.href;
    }
  };

  return (
    <header
      onFocus={() => setIsVisible(true)}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? "bg-[#050505]/95 shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
          : "bg-[#050505]/85"
      } ${isVisible || mobileMenuOpen ? "translate-y-0" : "-translate-y-full shadow-none"}`}
    >
      <div className="max-w-[1440px] mx-auto h-[72px] sm:h-[60px] lg:h-[68px] px-4 sm:px-8 lg:px-[60px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, { href: "/#home", target: "home" })}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-[#F5B942] rounded-md outline-none"
          aria-label="Forex Trader Telugu Homepage"
        >
          {/* Official FTT Logo with image zoom on hover */}
          <div className="relative w-[44px] h-[44px] sm:w-[42px] sm:h-[42px] rounded-full overflow-hidden shrink-0 border border-[#F5B942]/60 shadow-[0_0_12px_rgba(245,185,66,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(245,185,66,0.4)]">
            <Image
              src="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg"
              alt="Forex Trader Telugu Logo"
              fill
              sizes="42px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              priority
            />
          </div>

          {/* Logo Text: FTT Fullform */}
          <div className="min-w-0 font-heading uppercase tracking-[0.35px] text-[20px] sm:text-[22px] lg:text-[24px] leading-none select-none flex items-center gap-1.5 pt-0.5 whitespace-nowrap">
            <span className="text-white transition-colors duration-200 group-hover:text-white/90">FOREX TRADER</span>
            <span className="text-[#F5B942] transition-colors duration-200 group-hover:text-[#FFE29A]">TELUGU</span>
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
                onClick={(e) => handleNavClick(e, item)}
                className={`relative text-[15px] font-medium transition-colors duration-200 py-1 select-none outline-none focus-visible:text-[#F5B942] group ${
                  active ? "text-[#F5B942]" : "text-white hover:text-[#F5B942]"
                }`}
              >
                <span>{item.label}</span>

                {/* Sliding Gold Underline Indicator for Active Item */}
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

        {/* Right: CTA button (Desktop) with subtle scale and shadow */}
        <div className="hidden lg:block">
          <a
            href={SITE.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] gold-btn-gradient text-[#0A0A0A] font-semibold text-[15px] transition-all duration-300 hover:scale-[1.035] hover:shadow-[0_8px_24px_rgba(245,185,66,0.4)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white select-none"
          >
            <span>Join FTT Community</span>
            <ArrowRight className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden shrink-0 p-2 text-white hover:text-[#F5B942] focus-visible:ring-2 focus-visible:ring-[#F5B942] rounded-lg transition-colors active:scale-95"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* 2px Gold Scroll Progress Bar along bottom edge with soft glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] origin-left z-10 pointer-events-none shadow-[0_0_10px_rgba(245,185,66,0.5)]"
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
                    onClick={() => handleMobileNavClick(item)}
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
              className="flex items-center justify-center gap-2 w-full py-[12px] px-6 rounded-[8px] gold-btn-gradient text-[#0A0A0A] font-semibold text-[15px] shadow-[0_4px_16px_rgba(245,185,66,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
