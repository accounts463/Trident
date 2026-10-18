"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  // Links with a query or hash (e.g. /request-quote?type=...) are shortcuts, not sections.
  if (/[?#]/.test(href)) return false;
  const path = href;
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

/** Disclosure-pattern dropdowns: open on hover or click, close on Escape, outside click or navigation. */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Close menus when the route changes (layouts stay mounted between navigations).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${open}"]`);
      setOpen(null);
      trigger?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const hoverOpen = (label: string) => {
    clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  return (
    <nav ref={navRef} aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href) || item.children?.some((c) => isActive(pathname, c.href));
          const linkClass = cn(
            "inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors",
            active ? "text-primary" : "text-ink hover:bg-canvas hover:text-primary",
          );

          if (!item.children?.length) {
            return (
              <li key={item.label}>
                <Link href={item.href} className={linkClass} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          }

          const expanded = open === item.label;
          const menuId = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => hoverOpen(item.label)}
              onMouseLeave={hoverClose}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
              }}
            >
              <button
                type="button"
                className={linkClass}
                aria-expanded={expanded}
                aria-controls={menuId}
                data-menu-trigger={item.label}
                onClick={() => setOpen(expanded ? null : item.label)}
              >
                {item.label}
                <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden />
              </button>
              <div
                id={menuId}
                hidden={!expanded}
                className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3"
              >
                <ul className="card p-2 shadow-card-hover">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-xl px-4 py-3 transition-colors hover:bg-canvas"
                        aria-current={pathname === child.href ? "page" : undefined}
                      >
                        <span className="block text-sm font-semibold text-evergreen">{child.label}</span>
                        {child.description && <span className="mt-0.5 block text-xs text-muted">{child.description}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
