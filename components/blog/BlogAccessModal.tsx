"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { isBlogUnlocked, setBlogLeadUser } from "@/lib/blogAccess";

export const BlogAccessModal: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string>("/blog");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if current page is inside the blog section
  const isInsideBlog = pathname.startsWith("/blog");

  // Listen for custom trigger events from Navbar, cards, etc.
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetUrl?: string }>;
      const nextUrl = customEvent.detail?.targetUrl || "/blog";
      setTargetUrl(nextUrl);

      // If user is already unlocked, navigate directly
      if (isBlogUnlocked()) {
        router.push(nextUrl);
        return;
      }

      setError(null);
      setIsOpen(true);
    };

    window.addEventListener("open-blog-access-modal", handleOpen);
    return () => window.removeEventListener("open-blog-access-modal", handleOpen);
  }, [router]);

  // If user directly visits /blog or /blog/[slug], check unlock status on mount
  useEffect(() => {
    if (isInsideBlog) {
      if (!isBlogUnlocked()) {
        setTargetUrl(pathname);
        setIsOpen(true);
      }
    }
  }, [isInsideBlog, pathname]);

  const handleClose = () => {
    if (isInsideBlog && !isBlogUnlocked()) {
      // If gating blog directly and user dismisses without filling, return to home
      router.push("/");
    }
    setIsOpen(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid Gmail / Email address.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: cleanPhone,
          source: isInsideBlog ? "FTT Blog Direct" : "FTT Blog Navbar",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      // Mark as unlocked in localStorage for this user permanently
      setBlogLeadUser({
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
      });

      setSuccess(true);

      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);

        // If not already on the destination page, route there
        if (pathname !== targetUrl) {
          router.push(targetUrl);
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop with strong blur to protect blog content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-3xl border border-[#F5B942]/40 bg-[#0A0D14]/95 p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Ambient Gold Radial Glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
              style={{ background: "rgba(245,185,66,0.18)" }}
              aria-hidden="true"
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="relative text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F5B942]/40 bg-gradient-to-br from-[#F5B942]/20 to-[#B8801F]/10 shadow-[0_0_24px_rgba(245,185,66,0.25)]">
                <Lock className="h-6 w-6 text-[#F5B942]" />
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F5B942]/30 bg-[#F5B942]/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5B942] mb-2">
                <Sparkles className="h-3 w-3" />
                <span>EXCLUSIVE ACCESS</span>
              </div>

              <h2
                id="modal-title"
                className="font-sans text-2xl sm:text-[28px] font-black uppercase tracking-tight text-white leading-tight"
              >
                UNLOCK <span className="text-gold-gradient">FTT BLOG &amp; INSIGHTS</span>
              </h2>

              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-300">
                Enter your details once for instant, lifetime free access to all Telugu trading masterclasses, market breakdowns, and prop firm guides.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Success Banner */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Access Granted! Redirecting to blog...</span>
              </motion.div>
            )}

            {/* Lead Capture Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chaitanya Kumar"
                    disabled={loading || success}
                    className="w-full rounded-xl border border-white/15 bg-black/50 py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942]/50 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Gmail / Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Gmail / Email Address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    disabled={loading || success}
                    className="w-full rounded-xl border border-white/15 bg-black/50 py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942]/50 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Mobile Number
                </label>
                <div className="relative flex rounded-xl border border-white/15 bg-black/50 focus-within:border-[#F5B942] focus-within:ring-1 focus-within:ring-[#F5B942]/50">
                  <div className="flex items-center gap-1 border-r border-white/15 px-3 py-2 text-xs font-semibold text-slate-300 shrink-0">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="10-digit mobile number"
                    disabled={loading || success}
                    className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading || success}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-[0_0_24px_rgba(245,185,66,0.35)] transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Unlocking Blog...
                  </span>
                ) : success ? (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Unlocked!
                  </span>
                ) : (
                  <>
                    <span>Unlock Blog Now</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Privacy Guarantee Footer */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10.5px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-[#F5B942]" />
              <span>We value your privacy. Details asked only once for verification.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BlogAccessModal;
