"use client";

import { FadeUp } from "./FadeUp";

const CLAIMS = [
  {
    tag: "01",
    title: "Built to be used, not shelved.",
    body: "Full-grain leather, cut and saddle-stitched to be carried hard, day after day — not to sit behind glass.",
  },
  {
    tag: "02",
    title: "A bag that ages with you, for decades.",
    body: "Full-grain hide patinas rather than wearing out. The corners round, the strap darkens where your hand rests — it gets better, not worse.",
  },
];

export function TrustSection() {
  return (
    <section className="relative bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] tracking-[0.22em] text-accent/70">
          <span className="text-primary">❯</span> cat --our-craft.log
        </p>
        <FadeUp className="mt-4">
          <h2 className="font-display text-[2.25rem] font-bold leading-tight text-white md:text-[3rem]">
            Our craft, verified.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
          No badges to wave around — just what's true about how each bag is
          made, and what happens to it after you buy it.
        </FadeUp>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {CLAIMS.map((c, i) => (
            <FadeUp key={c.tag} delay={0.15 + i * 0.1}>
              <div className="liquid-glass rounded-xl border border-hairline/60 p-8">
                <span className="font-display text-[13px] font-bold tracking-[0.14em] text-primary">
                  {c.tag}
                </span>
                <h3 className="mt-3 font-display text-[19px] font-bold leading-snug text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-10">
          <div className="border-l-2 border-primary/60 pl-6">
            <p className="text-[14px] italic leading-relaxed text-ink/70">
              A note from the bench: we don&apos;t have customer reviews or
              certifications up yet — we&apos;re a small workshop, and we&apos;d
              rather say that plainly than dress up empty stars. Judge us by
              the materials and the stitching, which you can see for yourself.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
