import type { Metadata } from "next";
import { company } from "@/content/company";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import {
  AboutIntro,
  CategoriesSection,
  CertificationsSection,
  ClientMarquee,
  DeliveryProcess,
  FaqSection,
  FeaturedProducts,
  ManufacturingSection,
  SectorsSection,
  ServicesSection,
  StrengthsSection,
  SubstationSpotlight,
} from "@/components/sections/shared-sections";

export const metadata: Metadata = {
  title: { absolute: `${company.name} | LT Panel, Compact Substation & Bus Duct Manufacturer` },
  description:
    "ISO 9001:2015 certified manufacturer of LT panels, PCC, MCC, APFC and AMF panels, compact substations, bus ducts, cable trays and earthing in Greater Noida, with electrical contracting and O&M services.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <AboutIntro />
      <CategoriesSection />
      <FeaturedProducts />
      <SubstationSpotlight />
      <ManufacturingSection />
      <ServicesSection limit={8} />
      <DeliveryProcess tone="dark" />
      <StrengthsSection />
      <SectorsSection showReferences={false} />
      <CertificationsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
