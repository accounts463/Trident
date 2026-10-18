import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} breadcrumbs={[{ name: title, href: path }]} />
      <section className="section">
        <div className="prose-tc container-site max-w-3xl">{children}</div>
      </section>
    </>
  );
}
