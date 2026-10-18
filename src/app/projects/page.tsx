import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsSection } from "@/components/sections/shared-sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects & Case Studies",
  description: "Residential, commercial and industrial solar projects delivered by Trident Core Energy.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Projects & Case Studies"
        description="Solar systems planned, built and supported by our team, from home rooftops to industrial facilities."
        breadcrumbs={[{ name: "Projects", href: "/projects" }]}
      />
      <ProjectsSection />
      <CtaBanner title="Have a project in mind?" description="Tell us about your site and energy needs, and we'll help you plan the right system." />
    </>
  );
}
