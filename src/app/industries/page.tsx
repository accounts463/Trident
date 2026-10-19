import { applicationAreas } from "@/content/clients";
import { company } from "@/content/company";
import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { SectorsSection } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries & Projects We Power",
  description:
    "Electrical panels and power distribution for manufacturing, infrastructure, hospitals, schools, food and retail, with projects for Samsung, Honda and IOCL.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries & Projects"
        title="Sectors we serve"
        description="We have completed turnkey projects for heavy and light industry, housing and commercial developments, schools, colleges and hospitals."
        breadcrumbs={[{ name: "Industries", href: "/industries" }]}
        image={images.panelRows}
      >
        <ButtonLink href="/clients" variant="outline-light" size="lg">
          See our clients
        </ButtonLink>
      </PageHero>

      <SectorsSection />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Engineering Services"
              title="Industries we design and build for"
              description="Our engineering services cover design, manufacturing, erection, commissioning and installation for:"
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {company.industriesServed.map((i) => (
                <li key={i} className="rounded-lg border border-line bg-canvas px-4 py-2 text-sm font-semibold text-navy">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Compact Substations"
              title="Powering multiple industries"
              description="From infrastructure to renewable energy, our compact substations serve:"
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {applicationAreas.map((a) => (
                <li key={a.title} className="flex items-center gap-3 rounded-lg border border-line p-4 text-sm font-semibold text-navy">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
                    <Icon name={a.icon} className="size-5" />
                  </span>
                  {a.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
