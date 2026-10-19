import Link from "next/link";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";

/**
 * The Trident "T" mark, traced from the official logo as vector paths so it is crisp at
 * any size: flat red and charcoal pieces. On dark backgrounds the charcoal pieces flip to white.
 */
export function LogoMark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const red = "var(--tc-logo-red)";
  const dark = tone === "light" ? "#ffffff" : "var(--tc-logo-charcoal)";
  return (
    <svg viewBox="0 0 284 212" className={className} aria-hidden focusable="false">
      <path fill={red} d="M1 2H135V210L96 165V45H27Z" />
      <path fill={red} d="M145 2H282L253 45H145Z" />
      <path fill={dark} d="M145 48H181V166L145 210Z" />
      <path fill={dark} d="M191 64H227L191 139Z" />
      <path fill={red} d="M229 64H245L192 140Z" />
    </svg>
  );
}

/**
 * Horizontal lockup: the Trident mark beside a live-text wordmark set like the official
 * logo (heavy geometric sans in logo blue), with the red notch inside the "N".
 */
export function Logo({
  tone = "dark",
  size = "md",
  className,
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  const light = tone === "light";
  const lg = size === "lg";
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label={`${company.name}, home`}>
      <LogoMark tone={tone} className={cn("w-auto shrink-0", lg ? "h-12" : "h-10")} />
      <span className="flex flex-col leading-none" aria-hidden>
        <span
          className={cn(
            "font-logo font-extrabold uppercase tracking-[0.02em]",
            lg ? "text-[1.7rem]" : "text-[1.4rem]",
            "text-logo-ink",
          )}
        >
          TRIDE
          {/* The artwork cuts the N's diagonal and sets a red triangle in the gap: a larger
              triangle in the background colour makes the cut, the red one sits inside it. */}
          <span className="relative">
            N
            <span
              className={cn(
                "absolute left-[45%] top-[0.43em] h-[0.18em] w-[32%] [clip-path:polygon(45%_0,100%_100%,0_100%)]",
                light ? "bg-navy" : "bg-white",
              )}
            />
            <span className="absolute left-[49%] top-[0.475em] h-[0.115em] w-[24%] bg-logo-red [clip-path:polygon(45%_0,100%_100%,0_100%)]" />
          </span>
          T
        </span>
        <span
          className={cn(
            "mt-1 pl-[0.1em] font-logo font-medium uppercase tracking-[0.3em]",
            lg ? "text-[0.74rem]" : "text-[0.62rem]",
            "text-logo-ink",
          )}
        >
          Core Energy
        </span>
      </span>
    </Link>
  );
}
