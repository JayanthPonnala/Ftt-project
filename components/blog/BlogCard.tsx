"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/supabase";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const shouldReduceMotion = useReducedMotion();

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-full flex flex-col"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative flex flex-col flex-1 rounded-2xl p-6 sm:p-7 backdrop-blur-xl bg-[#0D0D0D]/80 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#F5B942]/40 hover:shadow-[0_16px_40px_rgba(245,185,66,0.15)] hover:bg-[#121212]/90 overflow-hidden"
      >
        {/* Subtle Ambient Gold Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5B942]/30 group-hover:via-[#F5B942]/70 to-transparent transition-all duration-300" />

        {/* Card Header: Metadata (Date & Read Time) */}
        <div className="flex items-center justify-between text-xs text-[#A8A8A8] mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#F5B942]/80" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F5B942]/80" />
            <span>{post.read_time || "4 min read"}</span>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-[#F5B942] transition-colors duration-200">
          {post.title}
        </h3>

        {/* Short Excerpt */}
        <p className="text-sm text-[#A8A8A8] leading-relaxed line-clamp-3 mb-6 flex-1">
          {post.excerpt}
        </p>

        {/* Card Footer: Read Article CTA */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-[#F5B942] group-hover:text-white flex items-center gap-1.5 transition-colors">
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>

          <span className="text-[11px] font-mono text-[#666] uppercase tracking-wider">
            FTT Journal
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
