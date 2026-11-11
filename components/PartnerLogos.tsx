import React from "react";
import Image from "next/image";

export const PartnerLogos: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-5 w-full pb-2 sm:pb-0">
      {/* Label */}
      <div className="mb-3 flex items-center gap-3 sm:block">
        <span className="hidden sm:inline-block h-px w-12 bg-white/20 align-middle" />
        <h3 className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A8A8A8] text-center">
          TRUSTED PARTNERS
        </h3>
        <span className="hidden sm:inline-block h-px w-12 bg-white/20 align-middle" />
      </div>

      {/* Logos Strip */}
      <div className="rounded-2xl border border-white/15 bg-black/35 px-4 py-5 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
        <div className="flex items-center justify-between gap-3 sm:justify-start sm:gap-4 overflow-x-auto no-scrollbar pb-1 pt-0.5 max-w-full">
          {/* 1. MyFundedFutures (mffu) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.25)]"
            title="MyFundedFutures Verified Partner"
          >
            <Image
              src="/partners/myfundedfutures.jpg"
              alt="MyFundedFutures"
              width={100}
              height={22}
              className="h-5 sm:h-[22px] w-auto object-contain rounded-sm"
            />
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 2. Lucid Trading (lucid) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.25)]"
            title="Lucid Trading Official Partner"
          >
            <Image
              src="/partners/lucid-trading.jpg"
              alt="Lucid Trading"
              width={100}
              height={22}
              className="h-5 sm:h-[22px] w-auto object-contain rounded-sm"
            />
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 3. Blue Guardian (blue guardian) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
            title="Blue Guardian Official Partner"
          >
            <svg viewBox="0 0 142 30" className="h-5 sm:h-[22px] w-auto" fill="none">
              <g transform="translate(2, 5)">
                <path
                  d="M9 1L2 3.5v6.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V3.5L9 1z"
                  fill="#0284C7"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                />
                <path d="M6 10v-3h1.5v1.5h1V7h1v1.5h1V7h1.5v3H6z" fill="#FFFFFF" />
              </g>
              <text
                x="27"
                y="20"
                fill="#FFFFFF"
                fontFamily="var(--font-heading), system-ui, sans-serif"
                fontWeight="800"
                fontSize="12"
                letterSpacing="0.5"
              >
                BLUE <tspan fill="#38BDF8">GUARDIAN</tspan>
              </text>
            </svg>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 4. FuturesElite (futureselite) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.45)]"
            title="FuturesElite Official Partner"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 sm:h-[22px] sm:w-[22px] items-center justify-center rounded-md bg-[#ec4899]/10 border border-[#ec4899]/40 p-0.5 shadow-[0_0_8px_rgba(236,72,153,0.3)]">
                <svg viewBox="0 0 24 24" className="h-3 sm:h-3.5 w-auto text-[#f472b6]" fill="none">
                  <path d="M4 6.5C4 5.67 4.67 5 5.5 5H10.5C11.5 5 12.5 6 13.5 7C14.5 8 15.5 9 17 9H19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M3 12C3 11.17 3.67 10.5 4.5 10.5H9.5C10.5 10.5 11.5 11.5 12.5 12.5C13.5 13.5 14.5 14.5 16 14.5H19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M4 17.5C4 16.67 4.67 16 5.5 16H10.5C11.5 16 12.5 17 13.5 18C14.5 19 15.5 20 17 20H19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-heading text-[12.5px] sm:text-[13px] font-extrabold tracking-tight text-white">
                Futures<span className="text-[#ec4899]">Elite</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* Blueberry Funded (blueberryfunded) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(129,140,248,0.45)]"
            title="Blueberry Funded Official Partner"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 sm:h-[22px] sm:w-[22px] items-center justify-center rounded-md bg-[#6366f1]/15 border border-[#818cf8]/45 p-0.5 shadow-[0_0_8px_rgba(129,140,248,0.35)]">
                <svg viewBox="0 0 24 24" className="h-3 sm:h-3.5 w-auto text-[#a5b4fc]" fill="currentColor">
                  <path d="M6 3.5h7.2a4.2 4.2 0 0 1 3.4 6.7A4.6 4.6 0 0 1 14 18.5H6V3.5zm3.2 2.7v3.6h3.8a1.8 1.8 0 0 0 0-3.6H9.2zm0 6.3v3.7H14a1.85 1.85 0 0 0 0-3.7H9.2z" />
                </svg>
              </div>
              <span className="font-heading text-[12.5px] sm:text-[13px] font-extrabold tracking-tight text-white">
                Blueberry<span className="text-[#818cf8]">Funded</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* MyFundedPerps (myfundedperps) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.35)]"
            title="MyFundedPerps Official Partner"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 sm:h-[22px] sm:w-[22px] items-center justify-center rounded-md bg-[#00F5A0]/10 border border-[#00F5A0]/40 p-0.5 shadow-[0_0_8px_rgba(0,245,160,0.25)]">
                <svg viewBox="0 0 24 24" className="h-3 sm:h-3.5 w-auto" fill="none">
                  <path d="M7 6L9 8.5L12 5L15 8.5L17 6V9.5H7V6Z" fill="#00F5A0" />
                  <rect x="6" y="11" width="2.5" height="7" rx="0.5" fill="#00F5A0" />
                  <rect x="10.5" y="12" width="2.5" height="6" rx="0.5" fill="#F5B942" />
                  <rect x="15" y="10" width="2.5" height="8" rx="0.5" fill="#00F5A0" />
                </svg>
              </div>
              <span className="font-heading text-[12.5px] sm:text-[13px] font-extrabold tracking-tight text-white">
                MyFunded<span className="text-[#F5B942]">Perps</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 5. Vest Markets (vest markets) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
            title="Vest Markets Official Partner"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 sm:h-[22px] sm:w-[22px] items-center justify-center rounded-md bg-[#091526] border border-sky-400/40 p-0.5 shadow-[0_0_8px_rgba(56,189,248,0.25)]">
                <svg viewBox="0 0 550 339" className="h-3 sm:h-3.5 w-auto" fill="white">
                  <path d="M546.559 104.307L418.198 1.6418C415.785 -0.290179 412.222 1.43159 412.222 4.52475V217.483L546.559 110.043C548.401 108.561 548.401 105.768 546.559 104.307Z" />
                  <path d="M130.463 1.64132L2.10114 104.296C0.259255 105.778 0.259255 108.571 2.10114 110.032L136.429 217.472V4.52427C136.429 1.43111 132.865 -0.260628 130.453 1.64132H130.463Z" />
                  <path d="M272.038 325.934L136.429 217.482V335.143C136.429 337.165 138.06 338.827 140.112 338.827H408.597C410.62 338.827 412.281 337.195 412.281 335.143V217.482L276.672 325.934C275.331 327.005 273.439 327.005 272.068 325.934H272.038Z" />
                </svg>
              </div>
              <span className="font-heading text-[12.5px] sm:text-[13px] font-extrabold tracking-tight text-white">
                VEST <span className="text-[#38bdf8]">MARKETS</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 5. JustMarkets (just markets) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            title="JustMarkets Official Partner"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 sm:h-[22px] sm:w-[22px] items-center justify-center rounded-md bg-cyan-500/10 border border-cyan-400/40 p-0.5 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                <svg viewBox="0 0 24 24" className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 16l6-6 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 8h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-heading text-[13px] sm:text-[13.5px] font-bold tracking-tight text-white">
                Just<span className="text-[#1E6BFF]">Markets</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 6. RedotPay (reddotpay) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(229,62,62,0.3)]"
            title="RedotPay Partner"
          >
            <svg viewBox="0 0 120 30" className="h-5 sm:h-[22px] w-auto" fill="none">
              <circle cx="14" cy="15" r="10" fill="#E53E3E" />
              <path
                d="M12 11h4a3 3 0 0 1 0 6h-4v-6zm0 6h3l3 4"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="32"
                y="20"
                fill="#FFFFFF"
                fontFamily="var(--font-body), system-ui, sans-serif"
                fontWeight="700"
                fontSize="14"
              >
                RedotPay
              </text>
            </svg>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

          {/* 7. FundedNext (last fundednext) */}
          <div
            className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.35)]"
            title="FundedNext Official Partner"
          >
            <svg viewBox="0 0 132 30" className="h-5 sm:h-[22px] w-auto" fill="none">
              <g transform="translate(2, 5)">
                <rect x="0" y="0" width="18" height="18" rx="4" fill="#7C3AED" />
                <path d="M4 4h10v2.5H7v2.5h6v2.5H7V14H4V4z" fill="#FFF" />
                <polygon points="12,10 15,14 12,14" fill="#C084FC" />
              </g>
              <text
                x="27"
                y="20"
                fill="#FFFFFF"
                fontFamily="var(--font-heading), system-ui, sans-serif"
                fontWeight="900"
                fontSize="12.5"
                letterSpacing="0.8"
              >
                FUNDED<tspan fill="#A855F7">NEXT</tspan>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
