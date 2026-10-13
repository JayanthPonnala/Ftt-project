"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import GlowOrbsBackground from "@/components/blog/GlowOrbsBackground";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/blog";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please check your credentials.");
      }

      // Success -> Redirect to admin dashboard
      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-2xl backdrop-blur-xl bg-[#0D0D0D]/90 border border-white/10 p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
    >
      {/* Ambient Gold Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5B942] to-transparent" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#F5B942]/60 shadow-[0_0_16px_rgba(245,185,66,0.3)] mx-auto mb-4">
          <Image
            src="/fttlogo.jpg"
            alt="FTT Logo"
            fill
            sizes="56px"
            className="object-cover"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B942]/10 border border-[#F5B942]/30 text-[#F5B942] text-xs font-mono uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Authentication</span>
        </div>

        <h1 className="font-heading uppercase tracking-wide text-2xl font-bold text-white">
          <span className="text-white">FTT</span> <span className="text-gold-gradient">PORTAL</span>
        </h1>
        <p className="text-xs text-[#A8A8A8] mt-1.5">
          Enter your verified credentials to access editorial management.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs mb-6"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-1.5"
          >
            Admin Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A8A8]" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@forextradertelugu.com"
              className="w-full bg-[#141414] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A8A8]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#141414] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A8A8] hover:text-[#F5B942] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black font-bold text-sm tracking-wide shadow-[0_0_24px_rgba(245,185,66,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      {/* Footer Helper */}
      <div className="mt-8 pt-5 border-t border-white/10 text-center">
        <Link
          href="/"
          className="text-xs text-[#A8A8A8] hover:text-[#F5B942] transition-colors"
        >
          ← Back to Homepage
        </Link>
      </div>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <GlowOrbsBackground>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <Suspense
          fallback={
            <div className="w-full max-w-md h-96 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
          }
        >
          <LoginFormContent />
        </Suspense>
      </div>
    </GlowOrbsBackground>
  );
}
