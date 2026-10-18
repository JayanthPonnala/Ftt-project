"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GlowOrbsBackground from "@/components/blog/GlowOrbsBackground";
import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";
import type { BlogPost } from "@/lib/supabase";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        const data = await res.json();
        if (res.ok && data.post) {
          setPost(data.post);
        } else {
          setError(data.error || "Post not found");
        }
      } catch {
        setError("Failed to fetch post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <GlowOrbsBackground>
      <AdminHeader />
      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-8 max-w-4xl mx-auto">
          <h1 className="font-space text-3xl font-bold text-white tracking-tight">
            Edit Article
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Update content, revise headings, or toggle publication status.
          </p>
        </div>

        {loading ? (
          <div className="max-w-4xl mx-auto h-96 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
        ) : error || !post ? (
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-sm text-red-400 mb-4">{error || "Article could not be found."}</p>
            <button
              type="button"
              onClick={() => router.push("/admin/blog")}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <PostForm mode="edit" initialData={post} />
        )}
      </main>
    </GlowOrbsBackground>
  );
}
