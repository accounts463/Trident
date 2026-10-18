"use client";

import { MapPin } from "lucide-react";
import { setConsent, useConsent } from "@/components/layout/consent";
import { Button } from "@/components/ui/Button";

/** Third-party map loads only after the visitor accepts non-essential cookies. */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const consent = useConsent();
  if (consent === "granted") {
    return <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full rounded-card border-0" />;
  }
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-card border border-line bg-canvas p-6 text-center">
      <MapPin className="size-8 text-primary" aria-hidden />
      <p className="max-w-xs text-sm text-muted">The map is provided by a third party and may set cookies. Load it only if you agree.</p>
      <Button variant="secondary" onClick={() => setConsent("granted")}>
        Accept cookies and load map
      </Button>
    </div>
  );
}
