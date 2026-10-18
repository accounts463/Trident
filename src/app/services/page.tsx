import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { DeliveryProcess, LeadFormSection, ServicesSection } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrical Contracting Services",
  description:
    "33 kV / 11 kV substations, HT/LT cable SITC, panel installation, bus duct and cable tray installation, transformer, VCB and RMU SITC, external lighting and O&M contracts.",
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
    </>
  );
}
