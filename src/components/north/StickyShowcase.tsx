"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

const DETAILS = [
  {
    src: "/images/material.png",
    label: "Grain",
    copy: "Full-grain hide, left with its natural markings — no two panels read quite the same.",
    side: "left" as const,
    range: [0.16, 0.34] as [number, number],
    top: "12%",
  },
  {
    src: "/images/detail.png",
    label: "Stitching",
    copy: "Nine stitches per inch, saddle-stitched by hand so a single thread break never unravels the seam.",
    side: "right" as const,
    range: [0.34, 0.52] as [number, number],
    top: "58%",
  },
  {
    src: "/images/process.png",
    label: "Hardware",
    copy: "Solid brass fittings, set to darken with the leather instead of pitting against it.",
    side: "left" as const,
    range: [0.52, 0.7] as [number, number],
    top: "62%",
  },
  {
    src: "/images/hero.png",
    label: "Edge paint",
    copy: "Burnished edges, sealed by hand — the detail most bags skip entirely.",
    side: "right" as const,
    range: [0.7, 0.88] as [number, number],
    top: "16%",
  },
];

function DetailPanel({
  d,
  progress,
}: {
  d: (typeof DETAILS)[number];
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const fromX = d.side === "left" ? -120 : 120;
  const x = useTransform(progress, [d.range[0], d.range[0] + 0.1], [fromX, 0]);
  const opacity = useTransform(progress, [d.range[0], d.range[0] + 0.1], [0, 1]);

  return (
    <motion.div
      className={`absolute w-[42%] max-w-[280px] md:w-[26%] ${
        d.side === "left" ? "left-[3%] md:left-[6%]" : "right-[3%] md:right-[6%]"
      }`}
      style={{ top: d.top, x: reduced ? 0 : x, opacity: reduced ? 1 : opacity }}
    >
      <div className="overflow-hidden rounded-sm border border-hairline/60 bg-wall">
        <div className="relative aspect-[4/3]">
          <Image src={d.src} alt={d.label} fill className="object-cover" sizes="30vw" />
        </div>
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/60">{d.label}</p>
      <p className="mt-1 max-w-[26ch] font-display text-[13px] italic leading-snug text-ink/80">
        {d.copy}
      </p>
    </motion.div>
  );
}

export function StickyShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bagScale = useTransform(scrollYProgress, [0, 0.16], [0.92, 1]);

  return (
    <section ref={ref} className="relative h-[350vh] bg-gallery">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
            Exhibit 02 — Construction
          </p>
        </div>

        <motion.div
          className="relative z-10 w-[52%] max-w-[420px]"
          style={{ scale: bagScale }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(43,27,18,0.25)]">
            <Image src="/images/hero.png" alt="North Leather satchel" fill className="object-cover" sizes="40vw" priority={false} />
          </div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-ink/50">
            No. 04 Satchel — held whole
          </p>
        </motion.div>

        {DETAILS.map((d) => (
          <DetailPanel key={d.label} d={d} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
