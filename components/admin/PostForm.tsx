"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  Code,
  List,
  Link2,
  Table as TableIcon,
} from "lucide-react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import type { BlogPost } from "@/lib/supabase";

interface PostFormProps {
  initialData?: BlogPost;
  mode: "create" | "edit";
}

export const PostForm: React.FC<PostFormProps> = ({ initialData, mode }) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [published, setPublished] = useState<boolean>(
    initialData ? initialData.published : true
  );

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Auto generate slug from title in create mode if user hasn't typed custom slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === "create" && (!slug || slug === slugify(title))) {
      setSlug(slugify(val));
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || "text";
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 50);
  };

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      showToast("error", "Please fill in all required fields (Title, Excerpt, Content).");
      return;
    }

    if (mode === "edit" && !initialData?.id) {
      showToast("error", "Error: Missing article ID for updating.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/posts"
          : `/api/admin/posts/${initialData?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const finalSlug = slugify(slug || title);

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: finalSlug,
          excerpt: excerpt.trim(),
          content: content.trim(),
          published,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      showToast(
        "success",
        mode === "create"
          ? "Article created and published successfully!"
          : "Article updated successfully!"
      );

      setTimeout(() => {
        router.push("/admin/blog");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast("error", err.message);
      } else {
        showToast("error", "An unexpected error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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

      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] hover:text-[#F5B942] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#94A3B8] font-mono">
            {mode === "create"
              ? "New Post"
              : `Article ID: ${initialData?.id?.slice(0, 8)}...`}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Slug */}
        <div className="rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-6">
          <label
            htmlFor="title"
            className="block text-xs font-semibold uppercase tracking-wider text-[#F5B942] mb-2 font-mono"
          >
            Article Heading *
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. $196,000+ MyFundedFutures Payout: My Scaling Plan & Risk Rules"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-lg font-space font-semibold text-white placeholder-[#666] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-all"
          />

          {/* Slug */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-mono text-[#888] shrink-0">
              URL Slug: /blog/
            </span>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="196k-myfundedfutures-payout-scaling-plan"
              className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-[#CBD5E1] focus:outline-none focus:border-[#F5B942]"
            />
          </div>
        </div>

        {/* Short Excerpt */}
        <div className="rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-6">
          <label
            htmlFor="excerpt"
            className="block text-xs font-semibold uppercase tracking-wider text-[#F5B942] mb-2 font-mono"
          >
            Excerpt / Summary *
          </label>
          <textarea
            id="excerpt"
            required
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A concise 1-2 sentence preview shown on blog cards and Google search results..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-all leading-relaxed"
          />
        </div>

        {/* Content with Markdown Toolbar & Preview */}
        <div className="rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 overflow-hidden">
          {/* Header with Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F5B942] font-mono">
                Body Content (Markdown Supported) *
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "write"
                    ? "bg-gradient-to-r from-[#FFE29A] to-[#F5B942] text-black shadow-md"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Write</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "preview"
                    ? "bg-gradient-to-r from-[#FFE29A] to-[#F5B942] text-black shadow-md"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>

          {/* Markdown Quick Toolbar */}
          {activeTab === "write" && (
            <div className="flex flex-wrap items-center gap-1.5 px-6 py-2.5 border-b border-white/5 bg-white/[0.01] text-[#94A3B8]">
              <button
                type="button"
                onClick={() => insertMarkdown("**", "**")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("*", "*")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("## ")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Heading 2"
              >
                <Heading2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("### ")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Heading 3"
              >
                <Heading3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("> ")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Blockquote"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("```\n", "\n```")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Code Block"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("- ")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Bullet List"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("[", "](https://)")}
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Link"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown(
                    "| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n"
                  )
                }
                className="p-1.5 rounded hover:bg-white/10 hover:text-[#F5B942] transition-colors"
                title="Table"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Editor / Preview Area */}
          <div className="p-6">
            {activeTab === "write" ? (
              <textarea
                id="content-editor"
                required
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in Markdown... 

# Heading 1
## Heading 2
> Key trading quote

- Key takeaway 1
- Key takeaway 2

```text
Trade log entries
```"
                className="w-full bg-transparent border-0 text-sm font-mono leading-relaxed text-white placeholder-[#666] focus:outline-none resize-y min-h-[360px]"
              />
            ) : (
              <div className="p-4 rounded-xl bg-[#070B16] border border-white/5 min-h-[360px]">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-sm text-[#64748B] italic">
                    Nothing to preview yet. Switch back to Write to add content.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Publish Status & Actions */}
        <div className="rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Status Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={published}
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                published ? "bg-emerald-500" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <div>
              <p className="text-xs font-semibold text-white">
                {published ? "Publish to Live Site" : "Save as Draft"}
              </p>
              <p className="text-[11px] text-[#94A3B8]">
                {published
                  ? "Article will immediately appear on /blog for all visitors."
                  : "Article will be saved privately in your admin dashboard."}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              href="/admin/blog"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,185,66,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : mode === "create"
                ? "Create & Publish"
                : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
