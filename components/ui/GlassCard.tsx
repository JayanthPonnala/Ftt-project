import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hoverGlow = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-[12px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hoverGlow
          ? "hover:-translate-y-1.5 hover:border-[#F5B942]/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_24px_rgba(245,185,66,0.12)] hover:bg-white/[0.045]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
