import { Download } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/content/products";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { getProduct, getProducts } from "@/lib/content";
import { JsonLd, productJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const visible = getProducts();
  // Cache Components requires at least one param; unknown slugs render notFound().
  return visible.length ? visible.map((p) => ({ slug: p.slug })) : [{ slug: products[0]?.slug ?? "placeholder" }];
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Product not found", robots: { index: false } };
  return pageMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${product.slug}`,
    noIndex: product.status === "sample",
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.summary}
        breadcrumbs={[
          { name: "Products", href: "/products" },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      >
        <ButtonLink href="/request-quote?type=manufacturing" variant="cta" size="lg">
          Enquire About This Product
        </ButtonLink>
        {product.datasheet && (
          <ButtonLink href={product.datasheet} variant="outline-light" size="lg" download>
            <Download className="size-4" aria-hidden /> Datasheet
          </ButtonLink>
        )}
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Media image={product.image} priority className="aspect-square rounded-card" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="space-y-8 lg:col-span-7">
            <SampleBadge status={product.status} />
            <div>
              <h2 className="font-display text-2xl font-bold text-evergreen">Overview</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{product.description}</p>
            </div>
            {product.applications.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-evergreen">Applications</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <li key={a} className="rounded-full bg-mint px-4 py-1.5 text-sm font-medium text-evergreen">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.specs.length > 0 && (
              <div className="card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <caption className="border-b border-line bg-canvas px-6 py-4 text-left font-display text-lg font-bold text-evergreen">
                    Specifications
                  </caption>
                  <tbody>
                    {product.specs.map((s) => (
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
            )}
          </div>
        </div>
      </section>
      <CtaBanner
        title="Need pricing or availability?"
        description="Tell us your quantity, project location and timeline, and our team will respond."
        primary={{ label: "Request a Quote", href: "/request-quote?type=manufacturing" }}
      />
      {product.status === "verified" && <JsonLd data={productJsonLd(product)} />}
    </>
  );
}
