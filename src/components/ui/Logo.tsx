import Link from "next/link";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";

/**
 * The Trident "T" mark, traced from the official logo as vector paths so it is
 * crisp at any size. On dark backgrounds the charcoal strokes flip to white.
 */
export function LogoMark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const stroke = tone === "light" ? "#ffffff" : "var(--tc-brand-dark)";
  return (
    <svg viewBox="0 0 284 212" className={className} aria-hidden focusable="false">
      <path fill="var(--tc-brand-orange)" d="M1 2H135V210L96 165V45H27Z" />
      <path fill="var(--tc-brand-orange)" d="M145 2H282L253 45H145Z" />
      <path fill={stroke} d="M145 48H181V166L145 210Z" />
      <path fill={stroke} d="M191 64H227L191 139Z" />
      <path fill="var(--tc-brand-orange)" d="M229 64H245L192 140Z" />
    </svg>
  );
}

/**
 * Horizontal lockup: the Trident mark beside a live-text wordmark set in the
 * logo's blue, with the orange notch inside the "N" from the official artwork.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label={`${company.name}, home`}>
      <LogoMark tone={tone} className="h-10 w-auto shrink-0" />
      <span className="flex flex-col leading-none" aria-hidden>
        <span
          className={cn(
            "font-display text-[1.5rem] font-black uppercase tracking-[-0.01em]",
            light ? "text-white" : "text-brand-blue",
          )}
        >
          TRIDE
          <span className="relative">
            N
            <span className="absolute left-[calc(58%-0.12em)] top-[0.44em] size-[0.24em] bg-brand-orange [clip-path:polygon(38%_0,100%_100%,0_100%)]" />
          </span>
          T
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-bold uppercase tracking-[0.36em]",
            light ? "text-brand-blue-soft" : "text-brand-blue",
          )}
        >
          Core Energy
        </span>
      </span>
    </Link>
  );
}
