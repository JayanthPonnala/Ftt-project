"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
  scrollToId: (id: string) => void;
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollToId: () => {},
  lenis: null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const scrollToIdGlobal = (id: string) => {
  if (typeof window === "undefined") return;

  const cleanId = id.replace(/^#/, "");
  const target = document.getElementById(cleanId);
  if (!target) return;

  const isMobile = window.innerWidth < 768;
  const offset = isMobile ? -64 : -76;

  const lenisInstance = (window as unknown as { __lenis?: Lenis }).__lenis;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition + offset,
      behavior: "smooth",
    });
  }
};

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    // Intercept clicks on anchor tags pointing to hashes for buttery inertia scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const pathPart = href.substring(0, hashIndex);
      const hashPart = href.substring(hashIndex + 1);

      if (
        (pathPart === "" || pathPart === "/" || pathPart === window.location.pathname) &&
        hashPart
      ) {
        const targetElement = document.getElementById(hashPart);
        if (targetElement) {
          e.preventDefault();
          scrollToIdGlobal(hashPart);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Scroll to initial hash if present on mount
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      setTimeout(() => {
        scrollToIdGlobal(targetId);
      }, 350);
    }

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("click", handleAnchorClick);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  const scrollToId = (id: string) => {
    scrollToIdGlobal(id);
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollToId, lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
