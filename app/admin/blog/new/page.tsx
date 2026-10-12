"use client";

import React from "react";
import GlowOrbsBackground from "@/components/blog/GlowOrbsBackground";
import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <GlowOrbsBackground>
      <AdminHeader />
      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-8 max-w-4xl mx-auto">
          <h1 className="font-space text-3xl font-bold text-white tracking-tight">
            Compose New Article
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Publish market breakdowns, prop firm payout journals, or trading lessons.
          </p>
        </div>

        <PostForm mode="create" />
      </main>
    </GlowOrbsBackground>
  );
}
