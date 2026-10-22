"use client";

import { MapPin } from "lucide-react";
import { setConsent, useConsent } from "@/components/layout/consent";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Third-party map loads only after the visitor accepts non-essential cookies. */
export function MapEmbed({ src, title, className }: { src: string; title: string; className?: string }) {
  const consent = useConsent();
  if (consent === "granted") {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={cn("aspect-[4/3] w-full rounded-card border-0", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] flex-col items-center justify-center gap-4 overflow-hidden rounded-card border border-line bg-canvas p-6 text-center",
        className,
      )}
    >
      {/* Faint street grid so the placeholder still reads as a map. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:44px_44px]"
        aria-hidden
      />
      <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-white text-accent shadow-card">
        <MapPin className="size-7" aria-hidden />
      </span>
      <p className="relative max-w-xs text-sm text-muted">The map is provided by Google and may set cookies. Load it only if you agree.</p>
      <Button variant="secondary" className="relative" onClick={() => setConsent("granted")}>
        Accept cookies and load map
      </Button>
    </div>
  );
}
