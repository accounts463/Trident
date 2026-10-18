"use client";

import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  items: NavItem[];
  contact: { phoneHref: string | null; phoneDisplay: string | null; email: string | null };
};

function isActive(pathname: string, href: string) {
  const path = href.split(/[?#]/)[0];
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * Hamburger + focus-trapped drawer for screens below xl.
 * The drawer is portalled to <body>: the sticky header uses backdrop-filter,
 * which would otherwise clip a position:fixed child to the header's box.
 */
export function MobileNav({ items, contact }: Props) {
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
    const onResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  function openDrawer() {
    // Start with the section for the current page expanded.
    setExpanded(items.find((i) => i.children?.some((c) => isActive(pathname, c.href)))?.label ?? null);
    setOpen(true);
  }

  // Links close the drawer themselves: same-page and #hash links don't change the pathname.
  const close = () => setOpen(false);

  const drawer = (
    <div className="fixed inset-0 z-[70] xl:hidden">
      <div className="tc-fade-in absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={close} aria-hidden />
      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="tc-drawer-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line px-4">
          <Logo />
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-lg text-navy hover:bg-canvas"
          >
            <X className="size-6" aria-hidden />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <span className="flex h-[3px] shrink-0" aria-hidden>
          <span className="w-2/3 bg-primary" />
          <span className="w-1/3 bg-accent" />
        </span>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href) || item.children?.some((c) => isActive(pathname, c.href));
              if (!item.children?.length) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3 text-base font-semibold hover:bg-canvas",
                        active ? "bg-tint text-primary" : "text-navy",
                      )}
                    >
                      {active && <span className="mr-3 h-5 w-1 rounded-full bg-accent" aria-hidden />}
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = expanded === item.label;
              const panelId = `mobile-sub-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    className={cn(
                      "flex w-full items-center rounded-lg px-4 py-3 text-left text-base font-semibold hover:bg-canvas",
                      active ? "text-primary" : "text-navy",
                    )}
                  >
                    {active && <span className="mr-3 h-5 w-1 rounded-full bg-accent" aria-hidden />}
                    {item.label}
                    <ChevronDown className={cn("ml-auto size-5 transition-transform", isOpen && "rotate-180")} aria-hidden />
                  </button>
                  <ul id={panelId} hidden={!isOpen} className="mb-2 ml-5 border-l-2 border-line pl-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-line bg-canvas p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link href="/request-quote" onClick={close} className={buttonClasses("cta", "lg", "w-full")}>
            Request a Quote
          </Link>
          {(contact.phoneHref || contact.email) && (
            <div className="grid grid-cols-2 gap-3">
              {contact.phoneHref && (
                <a href={contact.phoneHref} className={buttonClasses("secondary", "md", "w-full")}>
                  <Phone className="size-4" aria-hidden />
                  Call
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className={buttonClasses("secondary", "md", "w-full")}>
                  <Mail className="size-4" aria-hidden />
                  Email
                </a>
              )}
            </div>
          )}
          {contact.phoneDisplay && <p className="text-center text-xs text-muted">{contact.phoneDisplay}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-lg text-navy hover:bg-canvas"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={openDrawer}
      >
        <Menu className="size-6" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>
      {open && createPortal(drawer, document.body)}
    </div>
  );
}
