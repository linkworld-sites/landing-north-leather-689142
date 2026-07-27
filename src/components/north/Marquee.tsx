"use client";

import { FadeUp } from "./FadeUp";

const SPECS = [
  { sym: "Fg", label: "full-grain" },
  { sym: "Vt", label: "veg-tan" },
  { sym: "Br", label: "brass" },
  { sym: "Ss", label: "saddle-stitch" },
  { sym: "1:1", label: "single skin" },
  { sym: "9pt", label: "stitch/in" },
  { sym: "Hw", label: "hand-worked" },
  { sym: "Rw", label: "raw edge" },
];

function Tile({ sym, label }: { sym: string; label: string }) {
  return (
    <div
      title={label}
      className="liquid-glass mx-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl md:h-16 md:w-16"
    >
      <span className="font-display text-[15px] font-bold text-primary md:text-[17px]">{sym}</span>
    </div>
  );
}

export function Marquee() {
  const row = [...SPECS, ...SPECS];
  return (
    <section className="relative overflow-hidden bg-gallery py-20">
      <FadeUp className="mx-auto mb-10 max-w-md px-6 text-center">
        <p className="text-[11px] tracking-[0.22em] text-accent/70">
          <span className="text-primary">❯</span> ls --spec-sheet
        </p>
      </FadeUp>

      <div className="group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max py-2">
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]">
            {row.map((s, i) => (
              <Tile key={`a-${i}`} sym={s.sym} label={s.label} />
            ))}
          </div>
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]" aria-hidden>
            {row.map((s, i) => (
              <Tile key={`b-${i}`} sym={s.sym} label={s.label} />
            ))}
          </div>
        </div>
      </div>

      <div className="group mt-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max py-2">
          <div className="flex animate-marquee-right group-hover:[animation-play-state:paused]">
            {row.map((s, i) => (
              <Tile key={`c-${i}`} sym={s.sym} label={s.label} />
            ))}
          </div>
          <div className="flex animate-marquee-right group-hover:[animation-play-state:paused]" aria-hidden>
            {row.map((s, i) => (
              <Tile key={`d-${i}`} sym={s.sym} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
