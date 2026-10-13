"use client";

import React from "react";
import { Play } from "lucide-react";
import { scrollToIdGlobal } from "@/components/SmoothScroll";

interface PlayLinkProps {
  label: string;
  targetId?: string;
  onClick?: () => void;
  className?: string;
}

export const PlayLink: React.FC<PlayLinkProps> = ({
  label,
  targetId,
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetId) {
      scrollToIdGlobal(targetId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-3 text-left focus-visible:ring-2 focus-visible:ring-[#F5B942] rounded-full outline-none select-none transition-all duration-300 hover:scale-[1.035] active:scale-[0.98] ${className}`}
    >
      {/* 48px Circular Play Button */}
      <div className="w-12 h-12 rounded-full border border-[#F5B942]/60 bg-[#F5B942]/5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#F5B942] group-hover:border-[#F5B942] group-hover:shadow-[0_0_20px_rgba(245,185,66,0.35)]">
        <Play className="w-4 h-4 fill-[#F5B942] text-[#F5B942] ml-0.5 transition-colors duration-300 group-hover:fill-black group-hover:text-black" />
      </div>

      <span className="text-[15px] font-medium text-[#D6D6D6] transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
    </button>
  );
};

export default PlayLink;
