"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Reusable reveal: fade + rise into place once, when scrolled into view. */
export function FadeUp({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word stagger headline. Wrap each word in its own span. */
export function WordStagger({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={`flex flex-wrap gap-x-[0.25em] ${className ?? ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={wordClassName}
          initial={reduced ? undefined : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: 0.15 + i * 0.08,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
