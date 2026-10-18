import type { Metadata } from "next";
import { company } from "@/content/company";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { AboutIntro, CalculatorTeaser, CapabilitiesStrip, ResourcesPreview } from "@/components/sections/home-sections";
import {
  ManufacturingShowcase,
  ProjectsSection,
  SolarProcess,
  SolutionsGrid,
  SustainabilitySection,
  WhyChooseUs,
} from "@/components/sections/shared-sections";
import { calculatorLive } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: `${company.name} | Solar Panel Manufacturer & Solar Installation Company` },
  description:
    "Trident Core Energy is a solar panel manufacturer and solar installation company delivering residential rooftop solar, commercial solar solutions, industrial solar EPC and solar maintenance services.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <AboutIntro />
      <SolutionsGrid />
      <ManufacturingShowcase />
      <SolarProcess />
      <ProjectsSection limit={6} />
      <SustainabilitySection />
      <WhyChooseUs />
      {calculatorLive && <CalculatorTeaser />}
      <ResourcesPreview />
      <CtaBanner />
    </>
  );
}
