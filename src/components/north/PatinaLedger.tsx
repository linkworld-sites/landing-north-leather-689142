"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { FadeUp } from "./FadeUp";

const FRAMES = [
  { tick: "0", label: "Day 1", src: "/images/hero.png", caption: "Stiff at the fold. Bright at the edge. Exactly as it left the bench." },
  { tick: "6mo", label: "Month 6", src: "/images/material.png", caption: "The strap darkens where your hand rests." },
  { tick: "2yr", label: "Year 2", src: "/images/detail.png", caption: "Corners round, they don't crack." },
  { tick: "5yr", label: "Year 5", src: "/images/process.png", caption: "Grain deepens like a sun-worn deck rail." },
  { tick: "10yr", label: "Year 10", src: "/images/hero.png", caption: "Ten years in, and it's only just broken in." },
];

const N = FRAMES.length;

function Caption({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const center = i / (N - 1);
  const w = 0.5 / (N - 1);
  const opacity = useTransform(
    progress,
    [center - w, center - w * 0.35, center + w * 0.35, center + w],
    [0, 1, 1, 0],
  );
  return (
    <motion.p
      style={{ opacity }}
      className="mt-6 max-w-[26ch] font-display text-[15px] italic leading-snug text-ink/80 md:text-[17px]"
    >
      {FRAMES[i].caption}
    </motion.p>
  );
}

function Tick({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const center = i / (N - 1);
  const w = 0.5 / (N - 1);
  const scale = useTransform(
    progress,
    [center - w, center - w * 0.35, center + w * 0.35, center + w],
    [1, 1.6, 1.6, 1],
  );
  const color = useTransform(
    progress,
    [center - w, center - w * 0.35, center + w * 0.35, center + w],
    ["#C9C4B8", "#8A2E1E", "#8A2E1E", "#C9C4B8"],
  );
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <motion.span
        className="h-2 w-2 rounded-full"
        style={{ scale, backgroundColor: color }}
      />
      <span className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
        {FRAMES[i].tick}
      </span>
    </div>
  );
}

export function PatinaLedger() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", `-${(N - 1) * 100}%`]);
  const gray = useTransform(scrollYProgress, [0, 1], [55, 8]);
  const sepia = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const filter = useMotionTemplate`grayscale(${gray}%) sepia(${sepia}%) contrast(1.04)`;

  return (
    <section id="ledger" className="relative bg-gallery">
      <div className="px-6 pt-28 text-center md:px-16">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
          Exhibit 03 — The Patina Ledger
        </p>
        <FadeUp className="mx-auto mt-4 max-w-2xl">
          <h2 className="font-display text-[2rem] font-light leading-tight text-ink md:text-[2.75rem]">
            One bag, photographed the same way, ten years apart.
          </h2>
        </FadeUp>
      </div>

      <div ref={ref} className="relative mt-16 h-[500vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
          <div className="relative h-[52vh] w-full overflow-hidden md:h-[58vh]">
            <motion.div
              className="flex h-full"
              style={{ x: reduced ? "0%" : trackX, filter: reduced ? undefined : filter }}
            >
              {FRAMES.map((f, i) => (
                <div
                  key={i}
                  className="relative flex h-full w-full shrink-0 items-center justify-center px-6 md:px-24"
                >
                  <div className="relative h-full w-full max-w-[560px] overflow-hidden rounded-sm border border-hairline/50 bg-wall shadow-[0_20px_50px_-25px_rgba(43,27,18,0.3)]">
                    <Image
                      src={f.src}
                      alt={`North Leather satchel — ${f.label}`}
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative mx-auto mt-8 h-24 w-full max-w-3xl px-6 text-center md:px-0">
            {FRAMES.map((_, i) => (
              <div key={i} className="absolute inset-0 mx-auto flex max-w-xl flex-col items-center px-6">
                <Caption i={i} progress={scrollYProgress} />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-2xl items-center gap-0 px-8 md:px-0">
            <div className="relative h-px flex-1 bg-hairline/60" />
          </div>
          <div className="mx-auto flex w-full max-w-2xl px-8 md:px-0">
            {FRAMES.map((_, i) => (
              <Tick key={i} i={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-32 pt-8 md:px-16">
        <FadeUp className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-sm border border-hairline/60 bg-wall/60 p-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">Object Label</p>
          <p className="font-display text-[15px] italic text-ink/80">
            No. 04 Satchel, Serial NL-0412 — Purchased 2016. Repaired once, 2022.
            Still in daily use.
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Receipt on file · Lifetime repair honored
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
