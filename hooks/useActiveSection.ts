"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { NAV_ITEMS } from "@/lib/nav";

const ALL_SECTION_IDS = [
  "home",
  "about",
  "community",
  "method",
  "courses",
  "partners",
  "blog",
  "join",
  "contact",
];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const isClickPausedRef = useRef(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Manual section selection (on nav click)
  const setActiveSectionManual = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    isClickPausedRef.current = true;

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    pauseTimerRef.current = setTimeout(() => {
      isClickPausedRef.current = false;
    }, 900);

    // Update URL hash without causing a page jump
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/#${sectionId}`);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check initial hash
    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (ALL_SECTION_IDS.includes(hashId)) {
        setActiveSection(hashId);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickPausedRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // Helper to check if a nav item is active based on its sections array
  const isNavActive = useCallback(
    (navSections: readonly string[]) => {
      return navSections.includes(activeSection);
    },
    [activeSection]
  );

  return {
    activeSection,
    setActiveSectionManual,
    isNavActive,
  };
}

export default useActiveSection;
