import React from "react";

interface SectionShellProps {
  id: string;
  titleId?: string;
  glowSide?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export const SectionShell: React.FC<SectionShellProps> = ({
  id,
  titleId,
  glowSide = "left",
  className = "",
  children,
}) => {
  return (
    <section
      id={id}
      aria-labelledby={titleId || `${id}-title`}
      className={`relative w-full bg-[#050505] scroll-mt-16 md:scroll-mt-[78px] overflow-hidden ${className}`}
    >
      {/* Hairline Divider at Top */}
      <div
        className="w-full h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,185,66,0.25), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Alternating Warm Radial Gold Glow */}
      <div
        className={`absolute top-1/4 ${
          glowSide === "left" ? "-left-40" : "-right-40"
        } w-[420px] h-[420px] rounded-full pointer-events-none select-none z-0`}
        style={{
          background:
            "radial-gradient(circle, rgba(245,185,66,0.05) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      {/* Inner Container - Scaled for compact, comfortable zoom appearance */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
