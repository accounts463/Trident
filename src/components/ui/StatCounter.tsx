"use client";

import { useEffect, useRef, useState } from "react";

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up once when scrolled into view. Server-renders the final value, so it never shows zero. */
export function StatCounter({ value, unit, label }: { value: number; unit: string; label: string }) {
  const decimals = Number.isInteger(value) ? 0 : 1;
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(format(value, decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(value * eased, decimals));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals]);

  return (
    <span ref={ref} aria-label={`${format(value, decimals)} ${unit} ${label}`}>
      <span aria-hidden>
        {display}
        <span className="ml-1 text-[0.55em] font-semibold">{unit}</span>
      </span>
    </span>
  );
}
