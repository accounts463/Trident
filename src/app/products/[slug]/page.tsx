import { CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryOf } from "@/content/products";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/cards";
import { LightboxGallery } from "@/components/ui/LightboxGallery";
import { Media } from "@/components/ui/Media";
import { getContact, getProduct, getProducts, getRelatedProducts } from "@/lib/content";
import { JsonLd, productJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Product not found", robots: { index: false } };
  return pageMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${product.slug}`,
    image: product.image.src,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = categoryOf(product);
  const related = getRelatedProducts(product.slug);
  const contact = getContact();

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={product.name}
        description={product.summary}
        breadcrumbs={[
          { name: "Products", href: "/products" },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      >
        <ButtonLink href={`/request-quote?product=${product.slug}`} variant="cta" size="lg">
          Enquire About This Product
        </ButtonLink>
        {contact.phoneHref && (
          <a
            href={contact.phoneHref}
            className="inline-flex h-13 items-center gap-2 rounded-lg border border-white/35 px-7 font-bold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <Phone className="size-4" aria-hidden />
            {contact.phoneDisplay}
          </a>
        )}
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <figure>
              <Media
                image={product.image}
                priority
                fit={product.representativeImage || product.photoImages ? "cover" : "contain"}
                className="aspect-square rounded-card border border-line"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              {product.representativeImage && (
                <figcaption className="mt-2 text-xs text-muted">Representative photo from the Trident plant.</figcaption>
              )}
            </figure>
            {product.gallery && product.gallery.length > 0 && (
              <LightboxGallery
                items={product.gallery}
                listClassName="grid grid-cols-3 gap-3"
                itemClassName="overflow-hidden rounded-lg border border-line"
                mediaClassName="aspect-square"
                sizes="15vw"
              />
            )}
          </div>

          <div className="space-y-10 lg:col-span-7">
            <div>
              {product.tagline && <p className="eyebrow mb-3 text-accent">{product.tagline}</p>}
              <h2 className="font-display text-2xl font-extrabold text-navy">Overview</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                {product.description.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>

            {product.features.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-extrabold text-navy">Key features</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3 text-ink">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.standard && (
              <aside className="rounded-card border-l-4 border-primary bg-tint p-6">
                <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold text-navy">
                  <ShieldCheck className="size-5 text-primary" aria-hidden />
                  {product.standard.title}
                </h2>
                <p className="mt-1 text-sm font-bold text-primary">{product.standard.reference} states:</p>
                <blockquote className="mt-3 leading-relaxed text-ink">{product.standard.text}</blockquote>
              </aside>
            )}

            {product.specs.length > 0 && (
              <div className="card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <caption className="border-b border-line bg-navy px-6 py-4 text-left font-display text-lg font-bold text-white">
                    Specifications
                  </caption>
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.label} className="border-b border-line last:border-0 even:bg-canvas">
                        <th scope="row" className="w-2/5 px-6 py-3.5 align-top font-semibold text-muted">
                          {s.label}
                        </th>
                        <td className="px-6 py-3.5 font-semibold text-ink">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {product.applications.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-extrabold text-navy">Applications</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <li key={a} className="rounded-lg bg-tint px-4 py-2 text-sm font-semibold text-primary">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {product.range && (
          <div className="container-site mt-16">
            <h2 className="font-display text-2xl font-extrabold text-navy">{product.range.title}</h2>
            <ul className={cn("mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3", product.range.items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
              {product.range.items.map((item) => (
                <li key={item.name} className="card overflow-hidden" data-reveal>
                  {item.image && (
                    <Media image={item.image} fit={product.photoImages ? "cover" : "contain"} className={cn("border-b border-line", product.photoImages ? "aspect-square" : "aspect-[4/3]")} sizes="(min-width: 1024px) 25vw, 50vw" />
                  )}
                  <p className="px-4 py-3 text-sm font-bold text-navy">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="section bg-canvas">
          <div className="container-site">
            <h2 className="font-display text-3xl font-extrabold text-navy">Related products</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} categoryName={categoryOf(p).name} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title={`Get a quotation for ${product.name}`}
        description="Tell us the rating, quantity and site location. Our engineers will confirm the configuration and send a quotation."
        primary={{ label: "Request a Quote", href: `/request-quote?product=${product.slug}` }}
      />
      <JsonLd data={productJsonLd(product, category.name)} />
    </>
  );
}
