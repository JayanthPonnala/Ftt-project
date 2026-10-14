"use client";

import React from "react";
import Image from "next/image";
import { Send, Mail } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE } from "@/lib/config";
import { scrollToIdGlobal } from "@/components/SmoothScroll";
import Reveal from "@/components/ui/Reveal";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#") && typeof window !== "undefined" && window.location.pathname === "/") {
      const hash = href.replace("/#", "");
      scrollToIdGlobal(hash);
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full bg-[#050505] border-t border-white/10 pt-10 sm:pt-12 pb-8 sm:pb-10 overflow-hidden scroll-mt-16"
    >
      {/* Background Subtle Radial Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none select-none"
        style={{
          background: "radial-gradient(circle, rgba(245,185,66,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <Reveal delay={0.05}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-12 border-b border-white/10">
            {/* Left: FTT Logo & Mission */}
            <div className="flex flex-col items-start max-w-sm">
              <button
                type="button"
                onClick={() => scrollToIdGlobal("home")}
                className="flex items-center gap-3 group text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F5B942] rounded-lg"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#F5B942]/60 shadow-[0_0_12px_rgba(245,185,66,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(245,185,66,0.4)]">
                  <Image
                    src="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg"
                    alt="Forex Trader Telugu"
                    fill
                    sizes="40px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="font-heading uppercase tracking-[0.5px] text-[20px] sm:text-[22px] leading-none pt-0.5">
                  <span className="text-white transition-colors duration-200 group-hover:text-white/90">FOREX TRADER</span>{" "}
                  <span className="text-[#F5B942] transition-colors duration-200 group-hover:text-[#FFE29A]">TELUGU</span>
                </div>
              </button>

              <p className="text-[13px] text-[#A8A8A8] mt-3 leading-relaxed">
                Empowering Telugu traders with practical education, institutional discipline, and a
                collaborative growth environment.
              </p>
            </div>

            {/* Center: Quick Nav Links with Smooth Line Transition */}
            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 sm:gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="relative group text-[14px] font-medium text-[#D6D6D6] hover:text-[#F5B942] transition-colors py-1 outline-none focus-visible:text-[#F5B942]"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5B942] transition-all duration-300 ease-out group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right: Social Icons & Contact */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2.5">
                <a
                  href={SITE.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FTT YouTube"
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D6D6D6] hover:text-[#F5B942] hover:border-[#F5B942]/50 hover:bg-[#F5B942]/10 hover:scale-110 hover:shadow-[0_0_16px_rgba(245,185,66,0.3)] active:scale-95 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FTT Instagram"
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D6D6D6] hover:text-[#F5B942] hover:border-[#F5B942]/50 hover:bg-[#F5B942]/10 hover:scale-110 hover:shadow-[0_0_16px_rgba(245,185,66,0.3)] active:scale-95 transition-all duration-300"
                >
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href={SITE.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FTT Telegram"
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D6D6D6] hover:text-[#F5B942] hover:border-[#F5B942]/50 hover:bg-[#F5B942]/10 hover:scale-110 hover:shadow-[0_0_16px_rgba(245,185,66,0.3)] active:scale-95 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={SITE.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FTT X (Twitter)"
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D6D6D6] hover:text-[#F5B942] hover:border-[#F5B942]/50 hover:bg-[#F5B942]/10 hover:scale-110 hover:shadow-[0_0_16px_rgba(245,185,66,0.3)] active:scale-95 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              <a
                href={`mailto:${SITE.socials.email}`}
                className="inline-flex items-center gap-2 text-[13px] text-[#A8A8A8] hover:text-[#F5B942] hover:border-[#F5B942]/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 py-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/10"
              >
                <Mail className="w-3.5 h-3.5 text-[#F5B942]" />
                <span>{SITE.socials.email}</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Bottom Copyright & Disclaimer */}
        <Reveal delay={0.1}>
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-[#7E7E7E]">
            <p>© {currentYear} Forex Trader Telugu by Chaitanya. All rights reserved.</p>
            <p className="max-w-xl text-left sm:text-right">
              Risk Warning: Trading futures, forex and CFDs carries high market risk. Past prop firm
              performance does not guarantee future results.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
