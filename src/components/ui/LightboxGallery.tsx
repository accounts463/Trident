"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageAsset } from "@/content/types";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

type Props = {
  items: readonly ImageAsset[];
  listClassName?: string;
  itemClassName?: string;
  mediaClassName?: string;
  sizes?: string;
  /** Adds the scroll-reveal entrance to each thumbnail. */
  reveal?: boolean;
};

/**
 * Thumbnail grid that opens a full-screen viewer. Uses a modal <dialog> for focus
 * trapping and Escape; arrow keys and swipes move between photos.
 */
export function LightboxGallery({ items, listClassName, itemClassName, mediaClassName, sizes, reveal }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const swipeStart = useRef<number | null>(null);
  const count = items.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + count) % count));

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [index]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={listClassName}>
        {items.map((img, i) => (
          <li key={img.src ?? i} className={itemClassName} data-reveal={reveal ? "" : undefined}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block size-full overflow-hidden rounded-[inherit] text-left"
              aria-label={`View larger: ${img.alt}`}
            >
              <Media image={img} className={cn("zoom-on-hover", mediaClassName)} sizes={sizes} />
              <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/35">
                <span className="inline-flex size-12 scale-75 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <ZoomIn className="size-5" aria-hidden />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onPointerDown={(e) => {
          swipeStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeStart.current === null) return;
          const dx = e.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
        aria-label="Photo viewer"
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-navy/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <figure key={current.src} className="tc-zoom-in relative h-[min(78vh,900px)] w-full max-w-6xl">
              {current.src && (
                <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
              )}
            </figure>
            <p className="max-w-3xl text-center text-sm text-white/80">
              {current.alt}
              <span className="ml-3 font-semibold text-white">
                {index! + 1} / {count}
              </span>
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Close photo viewer"
        >
          <X className="size-5" aria-hidden />
        </button>
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
