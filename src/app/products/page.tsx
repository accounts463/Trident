import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/cards";
import { Icon } from "@/components/ui/Icon";
import { getCategories, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrical Panels, Bus Ducts & Cable Trays",
  description:
    "LT, PCC, MCC, APFC and AMF panels, compact substations, bus ducts, cable trays, earthing and stabilizers, made and tested at our Greater Noida plant.",
  path: "/products",
});

export default function ProductsPage() {
  const categories = getCategories();
  return (
    <>
      <PageHero
        eyebrow="Our Manufacturing Range"
        title="Electrical panels & power distribution products"
        description="Electrical panels, power distribution, cable management, earthing and power conditioning, custom-built and tested at our Greater Noida plant."
        breadcrumbs={[{ name: "Products", href: "/products" }]}
        image={images.ltPanel}
        imageFit="contain"
      >
        <ButtonLink href="/request-quote" variant="cta" size="lg">
          Request a Quote
        </ButtonLink>
      </PageHero>

      <nav aria-label="Product categories" className="sticky top-[77px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <a
                href={`#${c.slug}`}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3.5 text-sm font-semibold text-navy transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name={c.icon} className="size-4 text-accent" />
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="divide-y divide-line">
        {categories.map((c, i) => {
          const list = getProducts(c.slug);
          return (
            <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-heading`} className={`section scroll-mt-32 ${i % 2 ? "bg-canvas" : ""}`}>
              <div className="container-site">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <p className="eyebrow flex items-center gap-3 text-accent">
                      <span className="slash text-[0.7rem]" aria-hidden />
                      {String(i + 1).padStart(2, "0")} · {list.length} {list.length === 1 ? "product" : "products"}
                    </p>
                    <h2 id={`${c.slug}-heading`} className="mt-3 font-display text-3xl font-extrabold text-navy">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-muted">{c.summary}</p>
                  </div>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <FaqSection />
      <CtaBanner
        title="Need a panel built to your single-line diagram?"
        description="Send us your SLD, BOQ or load list. Our engineers will design the panel in AutoCAD and quote within the scope you need."
      />
    </>
  );
}
