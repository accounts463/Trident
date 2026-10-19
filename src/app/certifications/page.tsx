import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { CertificationsSection } from "@/components/sections/shared-sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ISO 9001, CE & CPRI Certifications",
  description:
    "ISO 9001:2015 certified, CE compliant, with a PCC panel short-circuit tested at CPRI Bhopal (415 V, 4000 A, 50 kA for 1 s). View our certificates.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality · Safety · Compliance · Trust"
        title="Certifications & test reports"
        description="Our quality system and panel designs are backed by independent certification and testing. Select a document to view it in full."
        breadcrumbs={[{ name: "Certifications", href: "/certifications" }]}
        image={images.certIso}
        imageFit="contain"
      />
      <CertificationsSection heading={false} />
      <CtaBanner
        title="Need certificates or test reports for a tender?"
        description="Our team can share copies of certificates, test reports and panel drawings for your approval process."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
