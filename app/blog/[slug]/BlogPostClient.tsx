"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  BookOpen,
} from "lucide-react";
import type { BlogPost } from "@/lib/supabase";
import GlowOrbsBackground from "@/components/blog/GlowOrbsBackground";
import BlogHeader from "@/components/blog/BlogHeader";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { isBlogUnlocked, openBlogAccessModal } from "@/lib/blogAccess";

interface BlogPostClientProps {
  post: BlogPost;
}

export const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isBlogUnlocked()) {
      openBlogAccessModal(window.location.pathname);
    }
  }, []);

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleTwitterShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `"${post.title}" by Chaitanya @forex_telugu`
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
    }
  };

  return (
    <GlowOrbsBackground>
      {/* 1. Fixed Reading Progress Bar at the top */}
      <ReadingProgressBar />

      {/* 2. Blog Navigation */}
      <BlogHeader showBackToBlog={true} />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {/* Top Back Navigation Link */}
        <div className="max-w-[760px] mx-auto mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#A8A8A8] hover:text-[#F5B942] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all journals</span>
          </Link>
        </div>

        {/* 3. Centered Obsidian Glass Panel (max-w ~760px) */}
        <div className="max-w-[760px] mx-auto rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle Ambient Gold Glow Border Header */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5B942]/50 to-transparent" />

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#A8A8A8] pb-6 mb-6 border-b border-white/10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5B942]/10 text-[#F5B942] font-semibold text-xs border border-[#F5B942]/30">
              <BookOpen className="w-3 h-3" />
              FTT Journal
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F5B942]/80" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F5B942]/80" />
              <span>{post.read_time || "4 min read"}</span>
            </div>
          </div>

          {/* Heading with smooth fade-in */}
          <motion.h1
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.18] mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed mb-8 italic border-l-2 border-[#F5B942]/70 pl-4 py-1 bg-white/[0.01]">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center justify-between gap-4 py-4 px-4 sm:px-5 rounded-xl bg-white/[0.03] border border-white/5 mb-10">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#F5B942]/60 shadow-[0_0_10px_rgba(245,185,66,0.2)] shrink-0">
                <Image
                  src="/images/mentor.png"
                  alt="Chaitanya"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Chaitanya
                </p>
                <p className="text-xs text-[#A8A8A8]">
                  Founder & Head Trader, Forex Trader Telugu
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTwitterShare}
                aria-label="Share on X"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#A8A8A8] hover:text-[#F5B942] flex items-center justify-center transition-colors"
                title="Share on X"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#A8A8A8] hover:text-white transition-colors"
                title="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Full Markdown Article Content */}
          <MarkdownRenderer content={post.content} />

          {/* Article Footer & Return CTA */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5B942] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore More Articles</span>
            </Link>

            <Link
              href="/#courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black font-bold text-xs tracking-wider uppercase shadow-[0_4px_16px_rgba(245,185,66,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Join FTT Community</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 mt-20 backdrop-blur-xl bg-[#050505]/80">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <p>© {new Date().getFullYear()} Forex Trader Telugu. All rights reserved.</p>
          <p>Educational journals only. Trading involves risk.</p>
        </div>
      </footer>
    </GlowOrbsBackground>
  );
};

export default BlogPostClient;
