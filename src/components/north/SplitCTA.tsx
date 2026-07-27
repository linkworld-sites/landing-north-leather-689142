"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";

export function SplitCTA() {
  return (
    <section className="bg-ink px-4 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#20140c] md:grid md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
            No. 04 Satchel
          </p>
          <FadeUp className="mt-6">
            <h2 className="font-display text-[2.5rem] italic font-medium leading-[0.95] text-white md:text-[3.5rem]">
              Carry it for
              <br />
              ten years.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
            One bag. Ten years. No warranty needed — just leather that was
            built right the first time.
          </FadeUp>
          <FadeUp delay={0.3} className="mt-10">
            <Link href="/blog" className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-white">
              <span className="border-b border-white/60 pb-1 transition-colors group-hover:border-white">
                Read the Craft Journal
              </span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                aria-hidden
              >
                →
              </motion.span>
            </Link>
          </FadeUp>
        </div>

        <div className="relative min-h-[320px] md:min-h-0">
          <motion.div
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src="/images/hero.png" alt="North Leather satchel" fill className="object-cover" sizes="50vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#20140c] via-transparent to-transparent md:bg-gradient-to-l" />
        </div>
      </div>
    </section>
  );
}
