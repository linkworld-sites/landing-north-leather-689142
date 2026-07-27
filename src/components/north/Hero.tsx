"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { VideoLoop } from "./VideoLoop";

const LINES = ["Made to last.", "Not to impress."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-[100vh]">
      <motion.div
        className="fixed inset-0 z-0 h-screen w-full"
        style={reduced ? undefined : { scale: videoScale }}
      >
        <VideoLoop src="/videos/hero.mp4" poster="/images/hero-workshop.png" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(26,17,10,0.62) 0%, rgba(26,17,10,0.32) 45%, rgba(26,17,10,0.08) 68%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(26,17,10,0.5))" }}
        />
      </motion.div>

      <motion.section
        className="relative z-10 flex h-screen flex-col justify-center px-6 md:px-16"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="max-w-[720px]">
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-white/70">
            North Leather — Full-Grain Goods
          </p>
          <h1 className="font-display text-[3.25rem] font-light leading-[0.95] text-white sm:text-[4.5rem] md:text-[6.5rem]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduced ? undefined : { y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 * i }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-8 max-w-md text-[15px] leading-relaxed text-white/85 md:text-[17px]"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Full-grain. Hand-stitched. Yours for life. A satchel built to earn
            its character with every year you carry it.
          </motion.p>
        </div>
      </motion.section>

      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/60"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-white/40" />
      </motion.div>

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-10 hidden justify-between px-6 md:flex md:px-16">
        <p className="font-display text-[13px] italic text-white/70">
          North Leather — No. 04 Satchel
        </p>
      </div>
    </div>
  );
}
