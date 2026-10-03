"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
  scrollToId: (id: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollToId: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const scrollToIdGlobal = (id: string) => {
  const cleanId = id.replace(/^#/, "");
  const target = document.getElementById(cleanId);
  if (!target) return;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const offset = isMobile ? -64 : -78;

  if (typeof window !== "undefined" && (window as unknown as { __lenis?: Lenis }).__lenis) {
    (window as unknown as { __lenis: Lenis }).__lenis.scrollTo(target, { offset });
  } else if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    // Scroll to initial hash if present
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      setTimeout(() => {
        scrollToIdGlobal(targetId);
      }, 300);
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  const scrollToId = (id: string) => {
    scrollToIdGlobal(id);
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollToId }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
