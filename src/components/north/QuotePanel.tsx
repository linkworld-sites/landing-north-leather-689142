import Image from "next/image";
import { FadeUp } from "./FadeUp";

export function QuotePanel() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 md:px-16 md:py-40">
      <div className="absolute inset-0">
        <Image
          src="/images/process.png"
          alt=""
          fill
          className="scale-110 object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <FadeUp className="relative mx-auto max-w-2xl">
        <div className="liquid-glass noise-overlay rounded-2xl p-5 md:p-6">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 left-4 select-none font-display text-[9rem] italic leading-none text-white/[0.06] md:text-[12rem]"
          >
            &rdquo;
          </span>
          <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/70">
            <span className="h-3 w-3 rounded-full border border-white/40" />
            Client Voice
          </p>
          <p className="relative text-[13.5px] leading-[1.6] text-white/85 md:text-[15px]">
            This bag has outlived three jobs, two moves, and one kid so far. It
            doesn&apos;t look tired — it looks like it&apos;s been somewhere.
            I stopped babying it years ago. That&apos;s the whole point.
          </p>
          <p className="mt-6 text-[13px] font-semibold text-white">
            Marguerite H.
            <span className="ml-2 font-normal text-white/60">Owner since 2016</span>
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
