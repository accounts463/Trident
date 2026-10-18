import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";

/**
 * Uses the supplied logo from company.ts when available. Otherwise renders a
 * neutral wordmark with a simple mark (placeholder, not a final brand asset).
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label={`${company.name}, home`}>
      {company.logo?.src ? (
        <Image src={company.logo.src} alt="" width={company.logo.width ?? 160} height={company.logo.height ?? 40} priority />
      ) : (
        <>
          <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
            <rect width="40" height="40" rx="11" fill={light ? "#ffffff" : "#14532d"} />
            <circle cx="20" cy="15" r="5" fill="#facc15" />
            <path
              d="M11 22v4a9 9 0 0 0 18 0v-4M20 22v11"
              stroke={light ? "#14532d" : "#ffffff"}
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="flex flex-col leading-none">
            <span className={cn("font-display text-[1.05rem] font-extrabold tracking-tight", light ? "text-white" : "text-evergreen")}>
              Trident Core
            </span>
            <span className={cn("mt-1 text-[0.62rem] font-bold uppercase tracking-[0.28em]", light ? "text-renew" : "text-primary")}>
              Energy
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
