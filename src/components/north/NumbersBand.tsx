"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 100, suffix: "%", label: "full-grain leather" },
  { value: 9, suffix: "", label: "stitches per inch" },
  { value: 0, suffix: "", label: "lifetime repair", display: "∞" },
  { value: 0, suffix: "", label: "planned obsolescence", display: "0" },
];

function CountUp({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  // Start rendered at the final value (correct with no JS / before hydration);
  // once scrolled into view, briefly reset to 0 and count up as an enhancement.
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || display || reduced) return;
    setN(0);
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, display]);

  return (
    <span ref={ref} className="font-display text-[4.5rem] font-bold leading-none text-primary md:text-[5.5rem]">
      {display ?? n}
      {suffix}
    </span>
  );
}

export function NumbersBand() {
  return (
    <section className="relative border-y border-hairline bg-[#0a0e14] py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 max-w-md px-6 text-[13px] tracking-[0.1em] text-ink/60"
      >
        <span className="text-accent">// </span>no gimmicks. just the material doing what it was always able to do.
      </motion.p>
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-hairline px-6 md:grid-cols-4 md:divide-y-0 md:divide-x md:px-16">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="flex flex-col items-center gap-3 py-8 md:py-0"
          >
            <CountUp value={s.value} suffix={s.suffix} display={s.display} />
            <span className="text-[11px] tracking-[0.12em] text-ink/50">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
