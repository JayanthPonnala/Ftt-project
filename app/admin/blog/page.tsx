"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Search,
} from "lucide-react";
import GlowOrbsBackground from "@/components/blog/GlowOrbsBackground";
import AdminHeader from "@/components/admin/AdminHeader";
import type { BlogPost } from "@/lib/supabase";

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/admin/posts?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.posts) {
        setPosts(data.posts);
      } else {
        console.error("Failed to load posts:", data.error);
      }
    } catch (err) {
      console.error("Failed to load admin posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/posts/${postToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
        showToast("success", `"${postToDelete.title}" was deleted.`);
        setPostToDelete(null);
      } else {
        showToast("error", data.error || "Failed to delete article. Please try again.");
      }
    } catch {
      showToast("error", "An error occurred while deleting.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <GlowOrbsBackground>
      <AdminHeader />

      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl backdrop-blur-xl shadow-2xl border text-sm font-medium ${
                toast.type === "success"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/15 border-red-500/30 text-red-300"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Title & Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <h1 className="font-space text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Editorial Dashboard
            </h1>
            <p className="text-sm text-[#94A3B8] mt-1">
              Create, edit, preview, and manage your published articles and market journals.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black font-bold text-sm shadow-[0_0_20px_rgba(245,185,66,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Link>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="rounded-xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-5">
            <span className="text-xs uppercase font-mono text-[#A8A8A8]">Total Articles</span>
            <p className="text-2xl font-bold text-white mt-1">{posts.length}</p>
          </div>
          <div className="rounded-xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-5">
            <span className="text-xs uppercase font-mono text-emerald-400">Live / Published</span>
            <p className="text-2xl font-bold text-emerald-300 mt-1">{publishedCount}</p>
          </div>
          <div className="rounded-xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-5">
            <span className="text-xs uppercase font-mono text-[#F5B942]">Drafts</span>
            <p className="text-2xl font-bold text-[#FFE29A] mt-1">{draftCount}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A8A8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search article titles or slugs..."
            className="w-full bg-[#0D0D0D]/90 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-all"
          />
        </div>

        {/* Posts Table / List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-[#0D0D0D]/60 border border-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-5 sm:p-6 transition-all hover:border-[#F5B942]/40 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* Post Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                        post.published
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                          : "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-[#A8A8A8] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#F5B942]" />
                      {post.read_time || "4 min"}
                    </span>
                    <span className="text-xs text-[#A8A8A8] flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-[#F5B942]" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white truncate mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#A8A8A8] line-clamp-1">
                    {post.excerpt}
                  </p>
                  <p className="text-[11px] font-mono text-[#777] mt-1 truncate">
                    Slug: /blog/{post.slug}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#CBD5E1] hover:text-[#F5B942] transition-colors"
                    title="View public page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>

                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F5B942]/10 hover:bg-[#F5B942]/20 border border-[#F5B942]/30 text-xs text-[#F5B942] hover:text-white transition-colors font-medium"
                    title="Edit article"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setPostToDelete(post)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-400 hover:text-red-300 transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-[#0D0D0D]/60 border border-white/5">
            <FileText className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-white">No articles found</h2>
            <p className="text-sm text-[#A8A8A8] mt-1">
              {search
                ? `No articles match "${search}".`
                : "You have not created any blog articles yet."}
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black font-bold text-xs shadow-[0_0_16px_rgba(245,185,66,0.25)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Post</span>
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {postToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-2xl bg-[#090D1A] border border-white/15 p-6 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>

                <h3 className="font-space text-xl font-bold text-white mb-2">
                  Delete Article?
                </h3>
                <p className="text-sm text-[#94A3B8] mb-6">
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-white">"{postToDelete.title}"</strong>?
                  This action cannot be undone.
                </p>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setPostToDelete(null)}
                    disabled={deleting}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    disabled={deleting}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white shadow-lg shadow-red-600/30 transition-colors disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </GlowOrbsBackground>
  );
}
