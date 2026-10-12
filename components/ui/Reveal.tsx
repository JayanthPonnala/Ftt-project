"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const EASE_CUSTOM = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  viewportMargin?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 28,
  className = "",
  viewportMargin = "-40px",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: EASE_CUSTOM,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  viewportMargin?: string;
}

export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  stagger = 0.08,
  delay = 0,
  className = "",
  viewportMargin = "-40px",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  yOffset?: number;
  duration?: number;
  className?: string;
}

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  yOffset = 24,
  duration = 0.6,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: EASE_CUSTOM,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FadeUpTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const FadeUpText: React.FC<FadeUpTextProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 20,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: EASE_CUSTOM,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
