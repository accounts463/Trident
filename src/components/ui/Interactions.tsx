"use client";

import { useEffect } from "react";

const REVEAL = "[data-reveal]";

/**
 * Site-wide interaction layer, mounted once in the root layout. Renders nothing.
 *
 * - Scroll reveal: [data-reveal] elements fade and rise in as they enter the viewport,
 *   staggered within a group of siblings. Anything already on screen when the page loads
 *   is shown immediately, and nothing is hidden until this script runs, so content never
 *   depends on JavaScript to appear. New elements (route changes, client renders) are
 *   picked up by a MutationObserver.
 * - Cursor spotlight: .card-interactive and [data-spotlight] elements get --mx/--my set to
 *   the pointer position, which the CSS glow follows.
 *
 * Both are skipped for reduced motion; the CSS also guards every effect.
 */
export function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const seen = new WeakSet<Element>();

    const reveal = (el: Element, animate: boolean) => {
      el.setAttribute("data-revealed", "");
      if (!animate) {
        el.setAttribute("data-reveal-done", "");
        return;
      }
      const done = (e: Event) => {
        if (e.target !== el || (e as TransitionEvent).propertyName !== "opacity") return;
        el.setAttribute("data-reveal-done", "");
        el.removeEventListener("transitionend", done);
      };
      el.addEventListener("transitionend", done);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target, true);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const scan = (initial: boolean) => {
      for (const el of document.querySelectorAll<HTMLElement>(REVEAL)) {
        if (seen.has(el)) continue;
        seen.add(el);
        const group = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL)) : [el];
        el.style.setProperty("--reveal-i", String(Math.max(0, group.indexOf(el))));
        const r = el.getBoundingClientRect();
        if (initial && r.top < window.innerHeight && r.bottom > 0) reveal(el, false);
        else io.observe(el);
      }
    };

    scan(true);
    root.classList.add("reveal-ready");

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
      root.classList.remove("reveal-ready");
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
      if (!target) return;
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
