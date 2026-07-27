"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FadeUp } from "./FadeUp";

const STEPS = [
  { n: "01", title: "source", body: "Full-grain hides, vegetable-tanned at a single tannery we've used for years." },
  { n: "02", title: "cut", body: "Panels cut around the hide's own marks — nothing hidden, nothing wasted." },
  { n: "03", title: "stitch", body: "Saddle-stitched by hand, nine per inch, no lockstitch to unravel." },
  { n: "04", title: "inspect", body: "Every seam and edge checked by hand before it earns the stamp." },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function StepsRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <section ref={ref} className="relative bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] tracking-[0.22em] text-accent/70">
          <span className="text-primary">❯</span> ps --process
        </p>
        <FadeUp className="mt-4">
          <h2 className="font-display text-[2.25rem] font-bold leading-tight text-white md:text-[3rem]">
            Four steps, one bench.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
          We keep the chain short on purpose — one tannery, one cutting room,
          one bench of hands that finishes what it starts.
        </FadeUp>

        {/* Desktop: row with self-drawing connector */}
        <div className="relative mt-20 hidden md:block">
          <svg className="pointer-events-none absolute left-0 top-6 h-px w-full overflow-visible" aria-hidden>
            <motion.line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="#3a2a20"
              strokeWidth="1"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.3, ease: EASE }}
            />
          </svg>
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="relative pt-6"
              >
                <motion.span
                  aria-hidden
                  style={reduced ? undefined : { y: ghostY }}
                  className="pointer-events-none absolute -top-2 left-0 select-none font-display text-[6.5rem] font-bold leading-none text-primary/10"
                >
                  {s.n}
                </motion.span>
                <div className="relative z-10">
                  <h3 className="text-[13px] tracking-[0.14em] text-primary">
                    <span className="text-white/40">$</span> {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical rail */}
        <div className="relative mt-16 md:hidden">
          <svg className="pointer-events-none absolute left-3 top-0 h-full w-px overflow-visible" aria-hidden>
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#3a2a20"
              strokeWidth="1"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
          </svg>
          <div className="flex flex-col gap-10 pl-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-3 select-none font-display text-[3.5rem] font-bold leading-none text-primary/10"
                >
                  {s.n}
                </span>
                <h3 className="text-[13px] tracking-[0.14em] text-primary">
                  <span className="text-white/40">$</span> {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
