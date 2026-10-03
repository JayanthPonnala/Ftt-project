import React from "react";

interface NumberBadgeProps {
  n: string | number;
  className?: string;
}

export const NumberBadge: React.FC<NumberBadgeProps> = ({ n, className = "" }) => {
  return (
    <div
      className={`w-11 h-11 rounded-full border border-[#F5B942]/60 bg-[#F5B942]/5 text-[#F5B942] font-bold text-[16px] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#F5B942] group-hover:text-black group-hover:shadow-[0_0_16px_rgba(245,185,66,0.4)] ${className}`}
    >
      <span>{n}</span>
    </div>
  );
};

export default NumberBadge;
