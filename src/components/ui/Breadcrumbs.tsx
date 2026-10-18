import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList JSON-LD. "Home" is prepended automatically. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", tone === "dark" ? "text-white/70" : "text-muted")}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight className="size-3.5 opacity-60" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
