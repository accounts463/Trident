"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { question: string; answer: string };

export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-line rounded-card border border-line bg-white", className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-display text-base font-semibold text-navy transition-colors hover:bg-canvas md:px-6"
              >
                {item.question}
                <ChevronDown
                  aria-hidden
                  className={cn("size-5 shrink-0 text-primary transition-transform duration-200", expanded && "rotate-180")}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className="px-5 pb-6 md:px-6">
              <p className="leading-relaxed text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
