"use client";

import React, { useState, useEffect, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/supabase";
import GlowOrbsBackground from "@/components/blog/GlowOrbsBackground";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCard from "@/components/blog/BlogCard";
import GoldUnderlineScribble from "@/components/ui/GoldUnderlineScribble";
import { isBlogUnlocked, openBlogAccessModal } from "@/lib/blogAccess";

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
}

export const BlogIndexClient: React.FC<BlogIndexClientProps> = ({
  initialPosts,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();
  const shouldReduceMotion = useReducedMotion();

  // Fresh client fetch to guarantee newly published posts show up immediately without stale cache
  useEffect(() => {
    if (!isBlogUnlocked()) {
      openBlogAccessModal("/blog");
    }

    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.warn("Failed to refresh posts on client:", err));
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );
  });

  return (
    <GlowOrbsBackground>
      <BlogHeader />

      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Hero Section matching Home Page Typography & Aesthetics */}
        <div className="relative max-w-4xl mb-12 sm:mb-16">
          {/* Warm radial gold glow behind heading */}
          <div
            className="absolute -top-12 -left-12 w-[460px] h-[460px] rounded-full pointer-events-none select-none -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(245,185,66,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />

          {/* 1. Eyebrow matching Home Page */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center text-[11px] sm:text-[12px] uppercase font-medium tracking-[0.2em] text-[#A8A8A8] mb-3 sm:mb-4 select-none"
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
            <span className="text-[#F5B942] font-semibold">CONSISTENCY</span>
            <span
              className="w-[1px] h-[12px] bg-white/35 mx-2.5 sm:mx-3.5 inline-block shrink-0"
              aria-hidden="true"
            />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#F5B942] text-[10.5px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] animate-pulse" />
              VERIFIED RESEARCH
            </span>
          </motion.div>

          {/* 2. Headline with Home Page Font & Drop-shadow */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-heading uppercase tracking-[0.5px] text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] xl:text-[76px] leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="block text-white">INSTITUTIONAL INSIGHTS.</span>
            <span className="block text-gold-gradient">VERIFIED JOURNALS.</span>
          </motion.h1>

          {/* 3. Byline matching Home Page Hero */}
          <div className="flex items-baseline mt-1 sm:mt-1.5 overflow-hidden">
            <span className="font-body text-[#A8A8A8] text-[18px] sm:text-[22px] lg:text-[24px] font-normal">
              by
            </span>
            <span
              className="font-script text-[#F5B942] text-[38px] sm:text-[46px] lg:text-[54px] ml-2.5 -rotate-[3deg] select-none leading-none drop-shadow-[0_2px_14px_rgba(245,185,66,0.3)] origin-left"
            >
              Chaitanya
            </span>
          </div>

          {/* 4. Gold Scribble Line matching Home Page */}
          <div className="w-[200px] sm:w-[260px] my-3 sm:my-4">
            <GoldUnderlineScribble />
          </div>

          {/* 5. Description matching Home Page */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-base sm:text-lg text-[#D6D6D6] leading-relaxed max-w-2xl font-body mt-2"
          >
            Mechanical trading frameworks, prop firm payout breakdowns, and psychological rules
            documented by Chaitanya for serious Telugu traders.
          </motion.p>

          {/* Search Filter Bar */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="relative mt-8 max-w-md"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5B942]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                startTransition(() => setSearchQuery(val));
              }}
              placeholder="Search journals, payouts, or topics..."
              className="w-full bg-[#0D0D0D]/90 border border-[#F5B942]/30 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-[#777] backdrop-blur-xl focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942]/50 transition-all shadow-inner"
            />
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-[#0D0D0D]/60 border border-white/5">
            <p className="text-[#A8A8A8] text-base mb-4">
              No articles found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-[#F5B942] hover:underline"
            >
              Clear search filter
            </button>
          </div>
        )}
      </main>
    </GlowOrbsBackground>
  );
};

export default BlogIndexClient;
