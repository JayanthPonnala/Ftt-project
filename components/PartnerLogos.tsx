import React from "react";

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
        {/* 1. MyFundedFutures (Supplied Asset from old code) */}
        <div
          className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.25)]"
          title="MyFundedFutures Verified Partner"
        >
          <img
            src="/partners/myfundedfutures.jpg"
            alt="MyFundedFutures"
            className="h-5 sm:h-[22px] w-auto object-contain rounded-sm"
          />
        </div>

        {/* Divider */}
        <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

        {/* 2. Lucid Trading (Supplied Asset from old code) */}
        <div
          className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.25)]"
          title="Lucid Trading Official Partner"
        >
          <img
            src="/partners/lucid-trading.jpg"
            alt="Lucid Trading"
            className="h-5 sm:h-[22px] w-auto object-contain rounded-sm"
          />
        </div>

        {/* Divider */}
        <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

        {/* 3. FundedNext */}
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

        {/* Divider */}
        <div className="w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

        {/* 4. Blue Guardian */}
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

        {/* 3. RedotPay (Vector Crisp Brand from old code) */}
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

        {/* 4. Bitget / Bidget (Vector Crisp Brand from old code) */}
        <div
          className="shrink-0 flex items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(0,208,156,0.3)]"
          title="Bitget Prop Trading"
        >
          <svg viewBox="0 0 110 30" className="h-5 sm:h-[22px] w-auto" fill="none">
            <rect x="4" y="6" width="18" height="18" rx="4" fill="#00D09C" />
            <text
              x="13"
              y="20"
              fill="#07080B"
              fontFamily="var(--font-body), system-ui, sans-serif"
              fontWeight="900"
              fontSize="14"
              textAnchor="middle"
            >
              B
            </text>
            <text
              x="30"
              y="20"
              fill="#00D09C"
              fontFamily="var(--font-body), system-ui, sans-serif"
              fontWeight="700"
              fontSize="14"
            >
              Bidget
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-3.5 sm:h-4 bg-white/15 shrink-0" />

        {/* 5. Binance (Vector Crisp Brand from old code) */}
        <div
          className="hidden sm:flex shrink-0 items-center opacity-85 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:drop-shadow-[0_0_10px_rgba(243,186,47,0.3)]"
          title="Binance Partner"
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 30" className="h-5 sm:h-[22px] w-auto" fill="none">
            <g fill="#F3BA2F">
              <polygon points="12,15 15,12 18,15 15,18" />
              <polygon points="8,11 11,8 14,11 11,14" />
              <polygon points="16,11 19,8 22,11 19,14" />
              <polygon points="15,4 12,7 15,10 18,7" />
              <polygon points="15,20 12,23 15,26 18,23" />
            </g>
            <text
              x="30"
              y="20"
              fill="#F3BA2F"
              fontFamily="var(--font-body), system-ui, sans-serif"
              fontWeight="800"
              fontSize="14"
              letterSpacing="1"
            >
              BINANCE
            </text>
          </svg>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
