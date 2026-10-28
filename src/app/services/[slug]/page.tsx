import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryOf } from "@/content/products";
import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { DeliveryProcess, FaqSection, LeadFormSection } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/cards";
import { getProduct, getServicePage, getServicePages } from "@/lib/content";
import { JsonLd, servicesJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getServicePages().map((s) => ({ slug: s.page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getServicePage((await params).slug);
  if (!service) return { title: "Service not found", robots: { index: false } };
  return pageMetadata({ ...service.page.seo, path: `/services/${service.page.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getServicePage((await params).slug);
  if (!service) notFound();
  const { page } = service;
  const products = page.relatedProducts.map(getProduct).filter((p) => p !== undefined);
  const others = getServicePages().filter((s) => s.page.slug !== page.slug);

  return (
    <>
      <PageHero
        eyebrow="Contracting Services"
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${page.slug}` },
        ]}
        image={images.testHv}
      >
        <ButtonLink href="/request-quote?type=contracting" variant="cta" size="lg">
          Discuss a Project
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-7">
            <h2 className="font-display text-2xl font-extrabold text-navy">Overview</h2>
            {page.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="card p-6 md:p-8 lg:col-span-5">
            <h2 className="font-display text-xl font-extrabold text-navy">Scope of work</h2>
            <ol className="mt-5 space-y-4">
              {page.scope.map((step, i) => (
                <li key={step} className="flex gap-4 text-ink">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-tint text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="section bg-canvas">
          <div className="container-site">
            <h2 className="font-display text-3xl font-extrabold text-navy">Equipment we manufacture for this work</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} categoryName={categoryOf(p).name} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DeliveryProcess tone="dark" />
      {page.faqs && page.faqs.length > 0 && <FaqSection faqs={page.faqs} title={`${service.title}: common questions`} />}

      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-2xl font-extrabold text-navy">Other services</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((s) => (
              <li key={s.page.slug}>
                <ButtonLink href={`/services/${s.page.slug}`} variant="secondary">
                  {s.title}
                </ButtonLink>
              </li>
            ))}
            <li>
              <ButtonLink href="/services" variant="secondary">
                All services
              </ButtonLink>
            </li>
          </ul>
        </div>
      </section>

      <LeadFormSection
        title="Tell us about your site"
        description="Share the scope, location and timeline. Our engineers will plan the work and send a proposal."
      />
      <CtaBanner />
      <JsonLd data={servicesJsonLd([service])} />
    </>
  );
}
