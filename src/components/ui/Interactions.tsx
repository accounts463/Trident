"use client";

import { useEffect } from "react";

const REVEAL = "[data-reveal]";
const REVEAL_KEYFRAMES: Keyframe[] = [
  { opacity: 0, translate: "0 28px" },
  { opacity: 1, translate: "0 0" },
];

/**
 * React stamps hydrated DOM nodes with a `__reactFiber$…` key. Writing attributes (even
 * inline style) to a node React has not hydrated yet causes a hydration mismatch, so DOM
 * writes below are limited to nodes that pass this check.
 */
function isHydrated(el: Element) {
  return Object.keys(el).some((k) => k.startsWith("__reactFiber$"));
}

/**
 * Site-wide interaction layer, mounted once in the root layout. Renders nothing.
 *
 * - Scroll reveal: [data-reveal] elements fade and rise in as they enter the viewport,
 *   staggered within a group of siblings. It runs entirely through the Web Animations API
 *   and never writes attributes, so it cannot cause hydration mismatches. Elements on
 *   screen at load are left alone; the rest are held at the first keyframe by a paused
 *   animation and played on entry. Once an animation finishes it leaves no trace, so hover
 *   transforms are unaffected. New elements (route changes) are found by a MutationObserver.
 * - Cursor spotlight: hydrated .card-interactive / [data-spotlight] elements get --mx/--my
 *   set to the pointer position, which the CSS glow follows.
 *
 * Both are skipped for reduced motion.
 */
export function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakSet<Element>();
    const pending = new Map<Element, Animation>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          pending.get(entry.target)?.play();
          pending.delete(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const scan = (initial: boolean) => {
      for (const el of document.querySelectorAll<HTMLElement>(REVEAL)) {
        if (seen.has(el)) continue;
        seen.add(el);
        const r = el.getBoundingClientRect();
        if (initial && r.top < window.innerHeight && r.bottom > 0) continue;
        const group = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL)) : [el];
        const animation = el.animate(REVEAL_KEYFRAMES, {
          duration: 700,
          delay: Math.min(Math.max(0, group.indexOf(el)), 6) * 80,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
        animation.pause();
        pending.set(el, animation);
        io.observe(el);
      }
    };

    scan(true);

    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan(false);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
      for (const animation of pending.values()) animation.cancel();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target = (e.target as Element | null)?.closest<HTMLElement>(".card-interactive, [data-spotlight]") ?? null;
      if (!target || !isHydrated(target)) return;
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!target) return;
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${x - r.left}px`);
        target.style.setProperty("--my", `${y - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
