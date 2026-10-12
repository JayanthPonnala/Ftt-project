"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface BlogHeaderProps {
  showBackToBlog?: boolean;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ showBackToBlog = false }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#050505]/90 border-b border-white/10 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto h-[68px] px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group outline-none"
          aria-label="Forex Trader Telugu Homepage"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#F5B942]/60 shadow-[0_0_12px_rgba(245,185,66,0.25)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/fttlogo.jpg"
              alt="Forex Trader Telugu Logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <div className="font-heading uppercase tracking-[0.5px] text-[17px] sm:text-[20px] leading-none pt-0.5">
            <span className="text-white">FOREX TRADER</span>{" "}
            <span className="text-[#F5B942]">TELUGU</span>
          </div>
        </Link>

        {/* Center/Right Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          {showBackToBlog ? (
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#F5B942] hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-[#F5B942]/10 hover:bg-[#F5B942]/20 border border-[#F5B942]/30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </Link>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#A8A8A8] px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] animate-pulse" />
              Research & Journals
            </span>
          )}

          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-[#A8A8A8] hover:text-[#F5B942] transition-colors"
          >
            Home
          </Link>

          <Link
            href="/#community"
            className="hidden sm:inline-block text-xs sm:text-sm font-medium text-[#A8A8A8] hover:text-[#F5B942] transition-colors"
          >
            Community
          </Link>

          <Link
            href="/#courses"
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black shadow-[0_0_12px_rgba(245,185,66,0.25)] hover:scale-105 transition-transform"
          >
            Join FTT
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
