"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";

const ROWS = [
  { period: "Stage 01", milestone: "Tannery sourcing", place: "Full-grain hides, vegetable-tanned", src: "/images/material.png" },
  { period: "Stage 02", milestone: "Cutting room", place: "Panels cut around the hide's own marks", src: "/images/detail.png" },
  { period: "Stage 03", milestone: "Hand-stitching", place: "Saddle-stitched, nine per inch", src: "/images/process.png" },
  { period: "Stage 04", milestone: "Final inspection", place: "Every seam, every edge, by hand", src: "/images/hero.png" },
];

export function TimelineRows() {
  return (
    <section className="bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">Exhibit 04 — Provenance</p>
          <FadeUp className="mt-4">
            <h2 className="font-display text-[2.25rem] font-light leading-tight text-ink md:text-[3rem]">
              Four rooms, one bag.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
            We keep the chain short on purpose — a single tannery, a single
            cutting room, one bench of hands that finishes what it starts.
            Nothing is outsourced to save a week.
          </FadeUp>

          <div className="mt-10 flex flex-col gap-0">
            {ROWS.map((r, i) => (
              <motion.div
                key={r.milestone}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 border-t border-hairline/50 py-4 text-[13px] first:border-t-0 md:text-[14px]"
              >
                <span className="text-ink/50">{r.period}</span>
                <span aria-hidden className="h-[6px] w-[6px] rotate-45 bg-secondary" />
                <span className="font-medium text-ink">{r.milestone}</span>
                <span className="text-right text-ink/50">{r.place}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border border-hairline/50 bg-wall grayscale-[35%] sepia-[15%]"
            >
              <Image src={r.src} alt={r.milestone} fill className="object-cover" sizes="25vw" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
