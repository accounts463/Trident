import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { DeliveryProcess, LeadFormSection, ServicesSection } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import { JsonLd, servicesJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "33 / 11 kV Substation & Electrical Contractor",
  description:
    "Turnkey 33 kV / 11 kV substations, HT/LT panel and cable installation, bus duct installation and O&M contracts by Trident Core Energy, Greater Noida.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Contracting Services"
        title="Electrical contracting, from substation to switchboard"
        description="Our contracting team designs, installs, tests and commissions complete electrical systems, using mechanised erection methods and well-trained, experienced crews."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
        image={images.testHv}
      >
        <ButtonLink href="/request-quote?type=contracting" variant="cta" size="lg">
          Discuss a Project
        </ButtonLink>
      </PageHero>
      <ServicesSection heading={false} />
      <DeliveryProcess tone="dark" />
      <LeadFormSection
        title="Tell us about your site"
        description="Share the scope, location and timeline. Our engineers will plan the work and send a proposal."
      />
      <CtaBanner />
      <JsonLd data={servicesJsonLd(services)} />
    </>
  );
}
