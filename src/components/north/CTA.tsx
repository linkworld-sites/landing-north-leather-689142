"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { WordStagger } from "./FadeUp";

function MagneticLink() {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className="inline-block"
    >
      <Link
        href="/shop"
        onClick={reset}
        className="text-[15px] tracking-[0.08em] text-white underline decoration-primary underline-offset-8 hover:text-primary md:text-[17px]"
      >
        <span className="text-primary">❯</span> shop the satchel →
      </Link>
    </motion.span>
  );
}

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#080b10] px-6 py-32 text-center md:px-16 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 overflow-hidden opacity-[0.07]"
        aria-hidden
      >
        {[0, 1].map((row) => (
          <div key={row} className="flex w-max animate-marquee-left">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-8 whitespace-nowrap font-display text-[7rem] font-bold text-white md:text-[10rem]"
              >
                NORTH LEATHER
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="text-[11px] tracking-[0.22em] text-accent/70">
          <span className="text-primary">❯</span> init --checkout
        </p>
        <h2 className="mt-6">
          <WordStagger
            text="CARRY IT. DON'T REPLACE IT."
            className="justify-center font-display text-[2.5rem] font-bold uppercase leading-[0.95] text-white sm:text-[3.5rem] md:text-[5rem]"
          />
        </h2>
        <div className="mt-10">
          <MagneticLink />
        </div>
      </div>
    </section>
  );
}
