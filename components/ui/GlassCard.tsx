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
      className={`relative rounded-[12px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 ${
        hoverGlow
          ? "hover:-translate-y-1 hover:border-[#F5B942]/45 hover:shadow-[0_12px_32px_rgba(245,185,66,0.12)] hover:bg-white/[0.04]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
