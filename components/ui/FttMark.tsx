import React from "react";
import Image from "next/image";

interface FttMarkProps {
  className?: string;
  size?: number;
}

export const FttMark: React.FC<FttMarkProps> = ({ className = "", size = 68 }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Official FTT Logo Image from Assets */}
      <div
        className="relative rounded-full overflow-hidden border border-[#F5B942]/60 shadow-[0_0_16px_rgba(245,185,66,0.3)] transition-transform duration-300 hover:scale-105"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src="https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg"
          alt="Forex Trader Telugu Logo"
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>

      {/* Heavy Italic FTT and COMMUNITY */}
      <div className="font-heading uppercase tracking-normal text-[22px] sm:text-[24px] leading-none text-white italic mt-1.5 font-black">
        FTT
      </div>
      <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.45em] text-[#A8A8A8] mt-0.5 pl-[0.45em]">
        COMMUNITY
      </div>
    </div>
  );
};

export default FttMark;
