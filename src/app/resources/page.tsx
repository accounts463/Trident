import Link from "next/link";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/ui/cards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getArticles, hasDownloads } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solar Resources & Guides",
  description: "Guides on how solar works, rooftop solar for homeowners, system types, installation costs, manufacturing and maintenance.",
  path: "/resources",
});

export default function ResourcesPage() {
  const articles = getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const quickLinks = [
    { label: "Frequently Asked Questions", href: "/resources/faqs", text: "Quick answers to common questions." },
    { label: "Solar Subsidy Guide", href: "/resources/solar-subsidy-guide", text: "Overview of government rooftop schemes." },
    ...(hasDownloads ? [{ label: "Downloads", href: "/downloads", text: "Brochures and datasheets." }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Solar Resources & Guides"
        description="Practical, plain-language guides to help you understand solar and make confident decisions."
        breadcrumbs={[{ name: "Resources", href: "/resources" }]}
      />
      <section className="border-b border-line bg-canvas">
        <ul className="container-site grid gap-4 py-8 md:grid-cols-3">
          {quickLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="card card-interactive block p-5">
                <span className="font-display font-bold text-evergreen">{l.label}</span>
                <span className="mt-1 block text-sm text-muted">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {categories.length > 1 && (
        <nav aria-label="Article categories" className="container-site pt-12">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c}>
                <a
                  href={`#${c.toLowerCase().replace(/\W+/g, "-")}`}
                  className="inline-flex h-10 items-center rounded-full border border-line px-5 text-sm font-semibold text-evergreen hover:border-primary/40"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {categories.map((c) => (
        <section key={c} id={c.toLowerCase().replace(/\W+/g, "-")} className="container-site scroll-mt-28 py-12">
          <SectionHeading title={c} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((a) => a.category === c)
              .map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
          </div>
        </section>
      ))}
      <CtaBanner />
    </>
  );
}
