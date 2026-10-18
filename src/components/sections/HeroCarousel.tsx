"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  image: ImageAsset;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: { label: string; href: string };
};

const INTERVAL_MS = 6000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Full-bleed hero carousel. Backgrounds cross-fade; every slide's text stays in the
 * DOM (inactive ones hidden) so the first slide's H1 is server-rendered. Autoplay
 * pauses while focus is inside, can be paused with a button, and is off for reduced motion.
 * It does not pause on hover: the hero fills most of the screen, so it would rarely advance.
 * `children` (badges and stats) stays fixed beneath the changing copy.
 */
export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true, // No autoplay until hydrated.
  );
  const count = slides.length;

  const autoplay = !paused && !focused && !reducedMotion && count > 1;
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoplay, count, index]);

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <section
      className="on-dark relative isolate overflow-hidden bg-navy"
      aria-roledescription="carousel"
      aria-label="Trident Core Energy highlights"
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      <div className="absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <div
            key={s.image.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Media
              image={s.image}
              priority={i === 0}
              sizes="100vw"
              decorative
              className={cn("size-full transition-transform duration-[7000ms] ease-out", i === index && "scale-105")}
            />
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgb(11 22 40 / 0.97) 0%, rgb(11 22 40 / 0.9) 42%, rgb(11 22 40 / 0.45) 75%, rgb(11 22 40 / 0.2) 100%)",
        }}
        aria-hidden
      />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="absolute -right-10 top-0 -z-10 hidden h-full w-40 -skew-x-[24deg] bg-accent/85 lg:block" aria-hidden />
      <div className="absolute right-36 top-0 -z-10 hidden h-full w-12 -skew-x-[24deg] bg-primary/80 lg:block" aria-hidden />

      <div className="container-site flex min-h-[calc(100svh-124px)] max-h-[900px] flex-col justify-center py-20 lg:py-24">
        <div className="grid max-w-3xl" aria-live={autoplay ? "off" : "polite"}>
          {slides.map((s, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            const active = i === index;
            return (
              <div
                key={s.title}
                className={cn("[grid-area:1/1]", active ? "tc-slide-in" : "invisible")}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
              >
                <p className="eyebrow flex items-center gap-3 text-accent-soft">
                  <span className="slash text-[0.75rem]" aria-hidden />
                  {s.eyebrow}
                </p>
                <Heading className="mt-6 font-display text-[2.6rem] font-black leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
                  {s.title}
                  <span className="block text-accent-soft">{s.highlight}</span>
                </Heading>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{s.description}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href={s.cta.href} variant="cta" size="lg">
                    {s.cta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                  <ButtonLink href="/request-quote" variant="outline-light" size="lg">
                    Request a Quote
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <ol className="flex items-center gap-2">
              {slides.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    className="group flex h-10 items-center"
                    aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <span
                      className={cn(
                        "block h-1.5 rounded-full transition-all",
                        i === index ? "w-10 bg-accent-soft" : "w-5 bg-white/35 group-hover:bg-white/70",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="ml-1 inline-flex size-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              >
                {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
