"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Hamburger + focus-trapped drawer for screens below xl. */
export function MobileNav({ items, contactHref }: { items: NavItem[]; contactHref: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-canvas"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-6" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <div
            ref={panelRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display font-bold text-navy">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-canvas"
              >
                <X className="size-6" aria-hidden />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 px-3 py-4">
              <ul className="space-y-1">
                {items.map((item) =>
                  item.children?.length ? (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-navy hover:bg-canvas"
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={cn("size-5 transition-transform", expanded === item.label && "rotate-180")} aria-hidden />
                      </button>
                      {expanded === item.label && (
                        <ul className="mb-2 ml-4 border-l border-line pl-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="block rounded-lg px-4 py-2.5 text-sm text-ink hover:bg-canvas">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-navy hover:bg-canvas"
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className="space-y-3 border-t border-line p-5">
              <Link href="/request-quote" className={buttonClasses("cta", "lg", "w-full")}>
                Request a Quote
              </Link>
              {contactHref && (
                <a href={contactHref} className={buttonClasses("secondary", "lg", "w-full")}>
                  Call Us
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
