"use client";

import { useEffect, useRef } from "react";

/**
 * Two stacked copies of the same clip crossfade into each other ~1s before
 * the end, so the hero never shows the hard cut a bare `loop` attribute gives.
 */
export function VideoLoop({ src, poster }: { src: string; poster?: string }) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vids = [a.current, b.current] as HTMLVideoElement[];
    if (!vids[0] || !vids[1]) return;
    let active = 0;
    let switching = false;

    vids[0].style.opacity = "1";
    vids[1].style.opacity = "0";

    const handlers: Array<() => void> = [];

    vids.forEach((v, i) => {
      const onTime = () => {
        if (i !== active || switching || !v.duration) return;
        if (v.duration - v.currentTime < 1) {
          switching = true;
          const next = vids[1 - active];
          next.currentTime = 0;
          void next.play();
          next.style.transition = "opacity 0.9s ease-out";
          v.style.transition = "opacity 0.9s ease-out";
          next.style.opacity = "1";
          v.style.opacity = "0";
          window.setTimeout(() => {
            v.pause();
            v.currentTime = 0;
            active = 1 - active;
            switching = false;
          }, 900);
        }
      };
      v.addEventListener("timeupdate", onTime);
      handlers.push(() => v.removeEventListener("timeupdate", onTime));
    });

    return () => handlers.forEach((h) => h());
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <video
        ref={a}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={b}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
