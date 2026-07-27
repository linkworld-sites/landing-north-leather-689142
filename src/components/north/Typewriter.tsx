"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Realistic-cadence typewriter with a blinking block cursor. */
export function Typewriter({
  text,
  className,
  startDelay = 0,
  speed = 26,
  onDone,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const [done, setDone] = useState(!!reduced);

  useEffect(() => {
    if (reduced) {
      onDone?.();
      return;
    }
    let i = 0;
    let tick: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const step = () => {
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) {
          tick = setTimeout(step, speed + Math.random() * 45);
        } else {
          setDone(true);
          onDone?.();
        }
      };
      step();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(tick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced, startDelay, speed]);

  return (
    <span className={className}>
      {out}
      {!done && <span className="cursor-blink">▊</span>}
    </span>
  );
}
