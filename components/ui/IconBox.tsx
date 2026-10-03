import React from "react";

interface IconBoxProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const IconBox: React.FC<IconBoxProps> = ({
  children,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-11 h-11 rounded-[10px]",
    md: "w-14 h-14 rounded-[12px]",
    lg: "w-16 h-16 rounded-[14px]",
  }[size];

  return (
    <div
      className={`${sizeClasses} bg-white/[0.03] border border-[#F5B942]/45 flex items-center justify-center shrink-0 text-[#F5B942] shadow-[0_0_15px_rgba(245,185,66,0.1)] transition-all duration-300 group-hover:border-[#F5B942]/80 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(245,185,66,0.25)] ${className}`}
    >
      {children}
    </div>
  );
};

export default IconBox;
