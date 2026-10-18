import { notFound } from "next/navigation";
import { ClipboardCheck } from "lucide-react";
import { company } from "@/content/company";
import { facilityGallery, manufacturingProcess, qualityChecks } from "@/content/manufacturing";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { LeadFormSection } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { DownloadCard, ProductCard } from "@/components/ui/cards";
import { Media } from "@/components/ui/Media";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDownloads, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Solar Panel Manufacturing",
  description:
    "Solar panel manufacturer with controlled module assembly, lamination and staged quality inspection. Explore our process, products and bulk procurement options.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  if (!company.features.manufacturing) notFound();
  const products = getProducts();
  const datasheets = getDownloads().filter((d) => d.category === "Datasheet");
  const specProducts = products.filter((p) => p.specs.length > 0);
  const gallery = facilityGallery.filter((img) => img.src && !img.stock);

  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Precision Solar Panel Manufacturing"
        description="Controlled processes, careful material handling and inspection at every stage, so the modules we supply are built to perform in the field."
        breadcrumbs={[{ name: "Manufacturing", href: "/manufacturing" }]}
        image={images.moduleRows}
      >
        <ButtonLink href="/request-quote?type=manufacturing" variant="cta" size="lg">
          Bulk Order Enquiry
        </ButtonLink>
        {products.length > 0 && (
          <ButtonLink href="/products" variant="outline-light" size="lg">
            View Products
          </ButtonLink>
        )}
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Overview" title="From cell to finished module" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7" data-reveal>
            <p>
              Our manufacturing operation assembles solar cells into finished modules for our own projects and for
              procurement partners. Each stage follows documented procedures, and modules move forward only after passing
              inspection.
            </p>
            <p>
              Manufacturing in-house lets us control quality closely and match module supply to project schedules, from a
              single rooftop to bulk orders.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-site">
          <SectionHeading
            eyebrow="Process"
            title="Our manufacturing process"
            description="Six controlled stages take raw cells to dispatch-ready modules."
          />
          <ProcessTimeline steps={manufacturingProcess} className="mt-14" />
        </div>
      </section>

      {products.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading eyebrow="Module Range" title="Module types and categories" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="on-dark section bg-evergreen">
        <div className="container-site">
          <SectionHeading
            tone="dark"
            eyebrow="Quality"
            title="Quality inspection and testing"
            description="Inspection happens throughout production, not only at the end of the line."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {qualityChecks.map((q) => (
              <li key={q.title} className="rounded-card border border-white/10 bg-white/5 p-6" data-reveal>
                <ClipboardCheck className="size-7 text-renew" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-lg font-bold text-white">{q.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{q.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {specProducts.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading eyebrow="Specifications" title="Specification overview" />
            <div className="mt-12 space-y-8">
              {specProducts.map((p) => (
                <div key={p.slug} className="card overflow-hidden" data-reveal>
                  <div className="flex flex-wrap items-center gap-3 border-b border-line bg-canvas px-6 py-4">
                    <h3 className="font-display text-lg font-bold text-evergreen">{p.name}</h3>
                    <SampleBadge status={p.status} />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <caption className="sr-only">{p.name} specifications</caption>
                      <tbody>
                        {p.specs.map((s) => (
                          <tr key={s.label} className="border-b border-line last:border-0">
                            <th scope="row" className="w-1/2 px-6 py-3 font-medium text-muted">
                              {s.label}
                            </th>
                            <td className="px-6 py-3 font-semibold text-ink">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {datasheets.length > 0 && (
        <section className="section bg-canvas">
          <div className="container-site">
            <SectionHeading eyebrow="Downloads" title="Datasheets" />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {datasheets.map((d) => (
                <DownloadCard key={d.file} download={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      {company.certifications.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading eyebrow="Standards" title="Certifications and standards" />
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {company.certifications.map((c) => (
                <li key={c.name} className="card p-6" data-reveal>
                  <h3 className="font-display font-bold text-evergreen">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.scope}
                  </p>
                  {c.href && (
                    <a href={c.href} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                      View certificate
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
      <section className="section bg-canvas">
        <div className="container-site">
          <SectionHeading eyebrow="Facility" title="Inside our facility" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <Media key={img.alt} image={img} className="aspect-[4/5] rounded-card" sizes="(min-width: 1024px) 25vw, 50vw" />
            ))}
          </div>
        </div>
      </section>
      )}

      <LeadFormSection
        id="bulk-enquiry"
        title="Bulk Order Enquiry"
        description="Planning a project or procuring modules in volume? Share your requirements and our team will respond with availability and next steps."
      />
      <CtaBanner
        title="Need modules and installation together?"
        description="We can supply modules and deliver the complete project, from design to commissioning."
        primary={{ label: "Request a Quote", href: "/request-quote?type=manufacturing" }}
      />
    </>
  );
}
