import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";
import markDark from "@/assets/logo-mark.png";
import markLight from "@/assets/logo-mark-light.png";

/**
 * Horizontal lockup: the Trident mark (from the official logo) beside a live-text
 * wordmark, so it stays crisp at header size and works on light and dark backgrounds.
 */
export function Logo({ tone = "dark", className, priority }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  const light = tone === "light";
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label={`${company.name}, home`}>
      <Image src={light ? markLight : markDark} alt="" className="h-10 w-auto" priority={priority} sizes="56px" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.45rem] font-black uppercase tracking-[-0.01em]",
            light ? "text-white" : "text-primary",
          )}
        >
          Trident
        </span>
        <span className={cn("mt-1 text-[0.58rem] font-bold uppercase tracking-[0.34em]", light ? "text-white/70" : "text-ink")}>
          Core Energy
        </span>
      </span>
    </Link>
  );
}
