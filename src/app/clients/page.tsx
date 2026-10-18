import { clientCount, clientGroups } from "@/content/clients";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Clients",
  description:
    "Trident Core Energy serves industries, infrastructure developers, hospitals, schools, food and beverage brands and retailers across India, including Samsung, Honda, NTPC, Indian Oil, Nestlé and Max Healthcare.",
  path: "/clients",
});

export default function ClientsPage() {
  const total = Math.floor(clientCount / 10) * 10;
  return (
    <>
      <PageHero
        eyebrow="Our Valuable Clients"
        title={`Trusted by ${total}+ clients across India`}
        description="From manufacturers and infrastructure developers to hospitals, schools and household names in food and retail."
        breadcrumbs={[{ name: "Clients", href: "/clients" }]}
      />

      <nav aria-label="Client sectors" className="border-b border-line bg-white">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {clientGroups.map((g) => (
            <li key={g.title} className="shrink-0">
              <a
                href={`#${slug(g.title)}`}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3.5 text-sm font-semibold text-navy hover:border-primary hover:text-primary"
              >
                {g.title}
                <span className="rounded bg-tint px-1.5 text-xs text-primary">{g.clients.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {clientGroups.map((g, i) => (
        <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-h`} className={`section scroll-mt-24 ${i % 2 ? "bg-canvas" : ""}`}>
          <div className="container-site">
            <p className="eyebrow flex items-center gap-3 text-accent">
              <span className="slash text-[0.7rem]" aria-hidden />
              {g.clients.length} clients
            </p>
            <h2 id={`${slug(g.title)}-h`} className="mt-3 font-display text-3xl font-extrabold text-navy">
              {g.title}
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {g.clients.map((c) => (
                <li
                  key={c}
                  className="flex min-h-20 items-center justify-center rounded-lg border border-line bg-white px-4 py-5 text-center font-display text-sm font-bold text-navy shadow-card"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <p className="container-site pb-4 text-sm text-muted">
        Client names are listed for reference. All trademarks belong to their respective owners.
      </p>
      <CtaBanner />
    </>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
