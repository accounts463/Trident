import { Check } from "lucide-react";
import { company } from "@/content/company";
import type { ImageAsset } from "@/content/types";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { LeadFormSection, SolarProcess, SolutionsGrid } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Solar Installation Solutions",
  description:
    "Residential rooftop solar, commercial solar solutions, industrial solar EPC and solar maintenance services, engineered and delivered by Trident Core Energy.",
  path: "/solutions",
});

type Offer = { id: string; title: string; description: string; points: string[]; image: ImageAsset; href?: string; enabled: boolean };

export default function SolutionsPage() {
  const f = company.features;
  const allOffers: Offer[] = [
    {
      id: "residential-rooftop",
      title: "Residential rooftop solar",
      description: "Systems for homes, sized to your consumption and roof, with a tidy, safe installation.",
      points: ["Roof survey and shading review", "System design and layout", "Approval and metering guidance", "Installation and handover"],
      image: images.tiledRooftop,
      href: "/solutions/residential",
      enabled: f.residential,
    },
    {
      id: "commercial-rooftop",
      title: "Commercial rooftop solar",
      description: "Rooftop systems that offset daytime demand for offices, institutions and retail.",
      points: ["Load and tariff review", "Structural assessment", "Installation planned around operations", "Monitoring setup"],
      image: images.commercialRoof,
      href: "/solutions/commercial-industrial",
      enabled: f.commercial,
    },
    {
      id: "industrial",
      title: "Industrial solar",
      description: "Larger rooftop and captive systems engineered for factories, warehouses and heavy loads.",
      points: ["Detailed engineering", "Protection and grid integration", "Safety-led site execution", "Performance monitoring"],
      image: images.industrialRoof,
      href: "/solutions/commercial-industrial",
      enabled: f.industrial,
    },
    {
      id: "ground-mount",
      title: "Ground-mounted solar",
      description: "Ground-mounted systems for sites with available land.",
      points: ["Land and soil assessment", "Structure design", "Plant layout and cabling", "Commissioning"],
      image: images.groundMountPlant,
      enabled: f.groundMount,
    },
    {
      id: "battery-storage",
      title: "Battery storage",
      description: "Storage that keeps essential loads running and makes more use of your solar generation.",
      points: ["Backup load assessment", "Battery sizing", "Hybrid integration", "Safety and ventilation planning"],
      image: { alt: "Battery storage cabinet connected to a solar system", tone: "panels" },
      enabled: f.batteryStorage,
    },
  ];
  const offers = allOffers.filter((o) => o.enabled);

  const systemTypes = [
    { title: "On-grid", description: "Works with the utility grid; surplus can be exported under net-metering rules.", enabled: f.onGrid },
    { title: "Off-grid", description: "Independent of the grid, with batteries for night-time and backup.", enabled: f.offGrid },
    { title: "Hybrid", description: "Grid-connected with battery storage for backup during outages.", enabled: f.hybrid },
  ].filter((t) => t.enabled);

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solar Installation Solutions"
        description="End-to-end solar for homes, businesses and industry: engineering, procurement, installation and long-term maintenance from one accountable team."
        breadcrumbs={[{ name: "Solutions", href: "/solutions" }]}
      >
        <ButtonLink href="/request-quote" variant="cta" size="lg">
          Get a Solar Quote
        </ButtonLink>
        <ButtonLink href="#enquiry" variant="outline-light" size="lg">
          Send an Enquiry
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container-site space-y-20 lg:space-y-28">
          {offers.map((o, i) => (
            <article key={o.id} id={o.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Media image={o.image} className={`aspect-[4/3] rounded-card ${i % 2 ? "lg:order-2" : ""}`} />
              <div data-reveal>
                <h2 className="font-display text-3xl font-bold text-evergreen">{o.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{o.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-ink">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                {o.href && (
                  <ButtonLink href={o.href} variant="secondary" className="mt-8">
                    Learn more<span className="sr-only"> about {o.title}</span>
                  </ButtonLink>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {systemTypes.length > 0 && (
        <section className="section bg-canvas">
          <div className="container-site">
            <SectionHeading
              eyebrow="System Types"
              title="Choosing the right system configuration"
              description="We recommend a configuration after reviewing your grid reliability, backup needs and local metering rules."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {systemTypes.map((t) => (
                <div key={t.title} className="card p-7" data-reveal>
                  <h3 className="font-display text-xl font-bold text-evergreen">{t.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {f.epc && (
        <section className="on-dark section bg-evergreen">
          <div className="container-site grid gap-12 lg:grid-cols-2">
            <SectionHeading
              tone="dark"
              eyebrow="Engineering & Execution"
              title="Solar EPC, managed end to end"
              description="One team takes responsibility for engineering, procurement and construction, which means fewer handovers and clearer accountability."
            />
            <ul className="grid gap-5 sm:grid-cols-2" data-reveal>
              {[
                ["Engineering", "Feasibility, design, layouts and electrical engineering."],
                ["Procurement", "Modules, inverters, structures and balance of system."],
                ["Construction", "Safe, supervised installation by trained crews."],
                ["Commissioning", "Testing, documentation and customer handover."],
              ].map(([title, text]) => (
                <li key={title} className="rounded-card border border-white/10 bg-white/5 p-6">
                  <h3 className="font-display font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {f.operationsMaintenance && (
        <section id="operations-maintenance" className="section scroll-mt-24">
          <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Operations & Maintenance"
                title="Keep your system performing as designed"
                description="Solar systems need little attention, but the right routine makes a real difference over their working life."
              />
              <ul className="mt-8 space-y-3">
                {[
                  "Scheduled panel cleaning",
                  "Visual, mechanical and electrical inspection",
                  "Generation monitoring and performance review",
                  "Fault diagnosis and corrective maintenance",
                ].map((p) => (
                  <li key={p} className="flex gap-2.5 text-ink" data-reveal>
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <Media image={images.panelCleaning} className="aspect-[4/3] rounded-card" />
          </div>
        </section>
      )}

      <SolutionsGrid />
      <SolarProcess />
      <LeadFormSection />
      <CtaBanner />
    </>
  );
}
