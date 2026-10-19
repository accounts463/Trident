import type { Metadata } from "next";
import { company } from "@/content/company";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import {
  AboutIntro,
  AwardsSection,
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
  title: { absolute: `LT Panel Manufacturer in Greater Noida | ${company.name}` },
  description:
    "ISO 9001:2015 certified maker of LT, PCC, MCC, APFC and AMF panels, compact substations, bus ducts, cable trays and earthing in Greater Noida since 2010.",
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
      <AwardsSection />
      <CertificationsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
