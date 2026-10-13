"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import { EASE_CUSTOM } from "./Reveal";

interface CertificateCardProps {
  firm: string;
  amount: string;
  certSlug: string;
  dateRange: string;
  accountType: string;
  logoType: "mff" | "lucid" | "justmarkets" | "exness";
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  firm,
  amount,
  certSlug,
  dateRange,
  accountType,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mini Certificate Thumbnail (Tilted by default, straightens and lifts on hover) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`View ${firm} ${amount} Payout Certificate`}
        className="group/cert relative w-full sm:w-[130px] md:w-[140px] aspect-[4/3] rounded-[8px] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#F5B942]/40 p-3 flex flex-col justify-between shadow-[0_6px_20px_rgba(0,0,0,0.6)] transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1 group-hover:border-[#F5B942] group-hover:shadow-[0_0_24px_rgba(245,185,66,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F5B942]"
      >
        {/* Certificate Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#F5B942]" />
            <span className="text-[8px] font-bold uppercase tracking-wider text-[#A8A8A8]">
              CERTIFICATE
            </span>
          </div>
          <span className="text-[7px] text-[#A8A8A8] font-mono">{accountType}</span>
        </div>

        {/* Certificate Amount */}
        <div className="my-auto text-center">
          <span className="text-[8px] uppercase tracking-wider text-[#A8A8A8] block">
            PAYOUT VALUE
          </span>
          <span className="font-heading text-[17px] text-white tracking-tight leading-none block mt-0.5 group-hover:text-gold-gradient transition-colors">
            {amount}
          </span>
        </div>

        {/* Signature Squiggle */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          <span className="text-[8px] font-medium text-white/80 truncate max-w-[70px]">
            {firm}
          </span>
          <svg
            className="w-10 h-3 text-[#F5B942]"
            viewBox="0 0 50 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M2 10C8 4 14 12 20 6C26 0 32 10 38 7C42 5 46 9 48 4" />
          </svg>
        </div>
      </button>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: EASE_CUSTOM }}
              role="dialog"
              aria-modal="true"
              aria-label={`${firm} Payout Certificate`}
              className="relative w-full max-w-2xl bg-gradient-to-br from-[#161616] to-[#0A0A0A] border-2 border-[#F5B942]/60 rounded-2xl p-8 sm:p-10 shadow-[0_0_60px_rgba(245,185,66,0.25)] z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 text-white/70 hover:text-white bg-black/60 rounded-full transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-[#F5B942]"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Certificate Inner Design */}
              <div className="border border-[#F5B942]/30 p-6 sm:p-8 rounded-xl bg-black/40 text-center relative overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                  <span className="font-heading text-[120px] text-white">FTT</span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award className="w-6 h-6 text-[#F5B942]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#F5B942]">
                    OFFICIAL PAYOUT CERTIFICATE
                  </span>
                </div>

                <h3 className="font-heading text-[28px] sm:text-[34px] text-white tracking-wide uppercase">
                  {firm}
                </h3>
                <p className="text-[13px] text-[#A8A8A8] tracking-widest uppercase mt-1">
                  Account Type: {accountType} • Payout Cycle: {dateRange}
                </p>

                <div className="my-8 py-5 border-y border-[#F5B942]/30">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-[#A8A8A8] block">
                    TOTAL AMOUNT PAID
                  </span>
                  <span className="font-heading text-[48px] sm:text-[60px] text-gold-gradient block mt-1 tracking-tight">
                    {amount}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-left">
                    <span className="text-[11px] text-[#A8A8A8] block">VERIFIED RECIPIENT</span>
                    <span className="text-[15px] font-bold text-white">Chaitanya (FTT)</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#A8A8A8] block">AUTHENTICATION</span>
                    <span className="font-script text-[#F5B942] text-[26px]">Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificateCard;
