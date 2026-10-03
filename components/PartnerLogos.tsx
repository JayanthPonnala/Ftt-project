import React from "react";
import Image from "next/image";

export const PartnerLogos: React.FC = () => {
  return (
    <div className="mt-4 sm:mt-5 w-full">
      {/* Label */}
      <h3 className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A8A8A8] mb-2">
        TRUSTED PARTNERS
      </h3>

      {/* Logos Strip */}
      <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-1 pt-0.5 max-w-full">
        {/* 1. MyFundedFutures using official partner asset */}
        <div className="flex items-center gap-2 shrink-0 group cursor-default">
          <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/20">
            <Image
              src="/partners/myfundedfutures.jpg"
              alt="MyFundedFutures"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          <span className="text-white font-bold text-[12.5px] tracking-tight">
            MyFundedFutures
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/15 shrink-0" />

        {/* 2. Lucid Trading using official partner asset */}
        <div className="flex items-center gap-2 shrink-0 group cursor-default">
          <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/20">
            <Image
              src="/partners/lucid-trading.jpg"
              alt="Lucid Trading"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          <span className="text-white font-medium text-[12.5px] tracking-tight">
            Lucid Trading
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/15 shrink-0" />

        {/* 3. RedotPay */}
        <div className="flex items-center gap-1.5 shrink-0 group cursor-default">
          <div className="w-4 h-4 rounded-full bg-[#FF3B5C] flex items-center justify-center text-white font-bold text-[8.5px]">
            P
          </div>
          <span className="text-white font-medium text-[12.5px] tracking-tight">
            RedotPay
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/15 shrink-0" />

        {/* 4. Bidget */}
        <div className="flex items-center gap-1.5 shrink-0 group cursor-default">
          <div className="w-4 h-4 rounded-[3px] bg-[#00D1B2] flex items-center justify-center text-black font-black text-[9px]">
            B
          </div>
          <span className="text-[#00D1B2] font-bold text-[12.5px] tracking-tight">
            Bidget
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/15 shrink-0" />

        {/* 5. Binance */}
        <div className="flex items-center gap-1.5 shrink-0 group cursor-default">
          <svg
            className="w-3.5 h-3.5 text-[#F0B90B]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2.5L16.2 6.7L13.8 9.1L12 7.3L10.2 9.1L7.8 6.7L12 2.5Z" />
            <path d="M6.6 7.9L9 10.3L6.6 12.7L4.2 10.3L6.6 7.9Z" />
            <path d="M17.4 7.9L19.8 10.3L17.4 12.7L15 10.3L17.4 7.9Z" />
            <path d="M12 11.5L14.4 13.9L12 16.3L9.6 13.9L12 11.5Z" />
            <path d="M6.6 15.1L9 17.5L6.6 19.9L4.2 17.5L6.6 15.1Z" />
            <path d="M17.4 15.1L19.8 17.5L17.4 19.9L15 17.5L17.4 15.1Z" />
            <path d="M12 18.7L14.4 21.1L12 23.5L9.6 21.1L12 18.7Z" />
          </svg>
          <span className="text-[#F0B90B] font-bold text-[12px] tracking-wider uppercase">
            BINANCE
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
