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
  { tick: "0", label: "day_01", src: "/images/products/product-0.jpg", caption: "// stiff at the fold. bright at the edge. exactly as it left the bench." },
  { tick: "6mo", label: "month_06", src: "/images/products/product-1.jpg", caption: "// the strap darkens where your hand rests." },
  { tick: "2yr", label: "year_02", src: "/images/products/product-2.jpg", caption: "// corners round, they don't crack." },
  { tick: "5yr", label: "year_05", src: "/images/products/product-3.jpg", caption: "// grain deepens like a sun-worn deck rail." },
  { tick: "10yr", label: "year_10", src: "/images/products/product-0.jpg", caption: "// ten years in, and it's only just broken in." },
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
      className="mt-6 max-w-[30ch] text-[13px] leading-snug text-accent/90 md:text-[14px]"
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
    ["#1e2a24", "#39ff14", "#39ff14", "#1e2a24"],
  );
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <motion.span
        className="h-2 w-2 rounded-full"
        style={{ scale, backgroundColor: color }}
      />
      <span className="text-[10px] tracking-[0.14em] text-ink/50">
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
  const gray = useTransform(scrollYProgress, [0, 1], [65, 15]);
  const hue = useTransform(scrollYProgress, [0, 1], [90, 100]);
  const filter = useMotionTemplate`grayscale(${gray}%) sepia(20%) hue-rotate(${hue}deg) contrast(1.05) brightness(0.92)`;

  return (
    <section id="ledger" className="relative bg-gallery">
      <div className="px-6 pt-28 text-center md:px-16">
        <p className="text-[11px] tracking-[0.22em] text-accent/80">
          <span className="text-primary">❯</span> exhibit_03 --patina-ledger
        </p>
        <FadeUp className="mx-auto mt-4 max-w-2xl">
          <h2 className="font-display text-[1.85rem] font-bold leading-tight text-white md:text-[2.5rem]">
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
                  <div className="relative h-full w-full max-w-[560px] overflow-hidden rounded-sm border border-hairline bg-wall shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]">
                    <Image
                      src={f.src}
                      alt={`North Leather satchel — ${f.label}`}
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                    <span className="absolute left-3 top-3 border border-hairline bg-black/50 px-2 py-1 text-[10px] tracking-[0.1em] text-primary backdrop-blur-sm">
                      {f.label}.jpg
                    </span>
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
            <div className="relative h-px flex-1 bg-hairline" />
          </div>
          <div className="mx-auto flex w-full max-w-2xl px-8 md:px-0">
            {FRAMES.map((_, i) => (
              <Tick key={i} i={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-32 pt-8 md:px-16">
        <FadeUp className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-sm border border-hairline bg-wall/60 p-8 text-center">
          <p className="text-[11px] tracking-[0.22em] text-accent/70">
            <span className="text-primary">❯</span> cat object_label.txt
          </p>
          <p className="text-[14px] text-ink/90">
            no.04 satchel · serial NL-0412 · purchased 2016
            <br />
            repaired once, 2022 · still in daily use
          </p>
          <p className="text-[11px] tracking-[0.14em] text-ink/40">
            receipt on file · lifetime repair honored
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
