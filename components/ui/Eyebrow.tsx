import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  hasLine?: boolean;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = "",
  hasLine = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#F5B942] mb-3 sm:mb-4 select-none ${className}`}
    >
      <span>{children}</span>
      {hasLine && (
        <span
          className="w-[60px] h-[1px] bg-gradient-to-r from-[#F5B942] to-transparent inline-block shrink-0"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Eyebrow;
