import { notFound } from "next/navigation";
import { company } from "@/content/company";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solar Products",
  description: "Solar modules and system components from Trident Core Energy, a solar panel supplier and manufacturer. View specifications and datasheets.",
  path: "/products",
});

export default function ProductsPage() {
  if (!company.features.manufacturing) notFound();
  const products = getProducts();
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Solar Products"
        description="Solar modules and system components manufactured and supplied by Trident Core Energy."
        breadcrumbs={[{ name: "Products", href: "/products" }]}
      >
        <ButtonLink href="/request-quote?type=manufacturing" variant="cta" size="lg">
          Product Enquiry
        </ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container-site">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <Alert variant="info" title="Our product range is being published">
              Detailed product information and datasheets will appear here shortly. For current availability and
              specifications, please send a product enquiry.
            </Alert>
          )}
        </div>
      </section>
      <CtaBanner
        title="Looking for modules in volume?"
        description="Share your required quantity and specifications and our team will respond with availability and next steps."
        primary={{ label: "Bulk Procurement Enquiry", href: "/request-quote?type=manufacturing" }}
      />
    </>
  );
}
