"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { VideoLoop } from "./VideoLoop";
import { Typewriter } from "./Typewriter";

const LINES = ["Built to age.", "Not to expire."];

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
              "linear-gradient(90deg, rgba(13,17,23,0.78) 0%, rgba(13,17,23,0.5) 42%, rgba(13,17,23,0.15) 68%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(13,17,23,0.65))" }}
        />
        <div className="crt-scanlines absolute inset-0" />
      </motion.div>

      <motion.section
        className="relative z-10 flex h-screen flex-col justify-center px-6 md:px-16"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="max-w-[720px]">
          <p className="mb-4 flex items-center gap-2 text-[12px] tracking-[0.08em] text-accent/90">
            <span className="text-primary">❯</span>
            <Typewriter text="cat ./north-leather/philosophy.log" startDelay={300} />
          </p>
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-white/60">
            north-leather — full-grain goods, est. bench-built
          </p>
          <h1 className="font-display text-[3rem] font-bold leading-[0.95] text-white sm:text-[4.25rem] md:text-[6rem]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduced ? undefined : { y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 * i + 2.0 }}
                >
                  {i === 1 ? <span className="text-primary">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-8 max-w-md text-[14px] leading-relaxed text-white/85 md:text-[16px]"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent">material:</span> full-grain leather &nbsp;
            <span className="text-secondary">stitch:</span> hand, saddle &nbsp;
            <span className="text-magenta">warranty:</span> none needed
          </motion.p>
        </div>
      </motion.section>

      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        <span className="border border-white/20 bg-black/30 px-2 py-1 text-[10px] tracking-[0.14em] text-white/70 backdrop-blur-sm">
          [ scroll ↓ ]
        </span>
      </motion.div>

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-10 hidden justify-between px-6 md:flex md:px-16">
        <p className="text-[12px] text-white/60">
          <span className="text-primary">#</span> no.04 satchel · 1 of 1 skin
        </p>
      </div>
    </div>
  );
}
