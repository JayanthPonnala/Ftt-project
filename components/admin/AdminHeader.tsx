"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink, Plus, ShieldCheck } from "lucide-react";

export const AdminHeader: React.FC = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050505]/95 border-b border-white/10">
      <div className="max-w-[1280px] mx-auto h-[68px] px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Brand & Admin Badge */}
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#F5B942]/60 shadow-[0_0_10px_rgba(245,185,66,0.25)]">
              <Image
                src="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg"
                alt="FTT Logo"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="font-heading uppercase tracking-wide text-lg hidden sm:inline">
              <span className="text-white">FTT</span>{" "}
              <span className="text-[#F5B942]">ADMIN</span>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5B942]/10 border border-[#F5B942]/30 text-[#F5B942] text-xs font-mono font-medium">
            <ShieldCheck className="w-3 h-3 text-[#F5B942]" />
            <span>Portal</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#F5B942] to-[#B8801F] text-black font-bold text-xs sm:text-sm shadow-[0_0_16px_rgba(245,185,66,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </Link>

          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-[#A8A8A8] hover:text-[#F5B942] transition-colors"
            title="View Public Blog"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Public Site</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {loggingOut ? "..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
