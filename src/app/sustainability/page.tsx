import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { SustainabilitySection } from "@/components/sections/shared-sections";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Sustainability",
  description:
    "How Trident Core Energy approaches sustainability: renewable energy adoption, responsible manufacturing, energy efficiency and long-term environmental stewardship.",
  path: "/sustainability",
});

const commitments = [
  {
    title: "In manufacturing",
    text: "We aim to use materials carefully, reduce waste on the production floor and handle packaging responsibly.",
  },
  {
    title: "In system design",
    text: "Well-designed systems generate more clean energy from the same roof or land, and last longer in service.",
  },
  {
    title: "Across the system's life",
    text: "Maintenance extends useful life, and we plan for responsible handling of components at end of life.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Clean Energy Is More Than Power. It's a Responsibility."
        description="Sustainability guides how we manufacture, how we engineer systems and how we support them over decades of service."
        breadcrumbs={[{ name: "Sustainability", href: "/sustainability" }]}
        image={images.solarFarmGreen}
      />
      <SustainabilitySection />
      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our Approach" title="Responsibility at every stage" />
            <ul className="mt-10 space-y-8">
              {commitments.map((c) => (
                <li key={c.title} className="border-l-2 border-renew pl-5" data-reveal>
                  <h3 className="font-display text-lg font-bold text-evergreen">{c.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <Media image={images.modulesSunset} className="aspect-[4/5] rounded-card" />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
