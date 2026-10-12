import React from "react";

export const GlowOrbsBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] selection:bg-[#F5B942] selection:text-black overflow-x-hidden">
      {/* 1. Subtle Luxury Ambient Gold Mesh (Pure CSS, 0% CPU/GPU Overhead) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 select-none opacity-100"
        style={{
          background: `
            radial-gradient(800px circle at 50% -80px, rgba(245, 185, 66, 0.07), transparent 70%),
            radial-gradient(600px circle at 90% 40%, rgba(212, 175, 55, 0.04), transparent 60%),
            radial-gradient(500px circle at 10% 80%, rgba(245, 185, 66, 0.03), transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* 2. Delicate FTT Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* 3. Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowOrbsBackground;
