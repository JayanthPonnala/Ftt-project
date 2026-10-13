import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  pill?: boolean;
  className?: string;
  showArrow?: boolean;
  target?: string;
  rel?: string;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  href,
  onClick,
  pill = false,
  className = "",
  showArrow = true,
  target,
  rel,
}) => {
  const baseClasses = `group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 gold-btn-gradient text-[#0A0A0A] font-semibold text-[15px] sm:text-[16px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.035] hover:shadow-[0_12px_36px_rgba(245,185,66,0.4)] active:scale-[0.98] text-center select-none ${
    pill ? "rounded-full" : "rounded-[8px]"
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default GoldButton;
