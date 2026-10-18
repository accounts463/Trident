import { Compass, Target } from "lucide-react";
import { company } from "@/content/company";
import { principles } from "@/content/services";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { SolarProcess, WhyChooseUs } from "@/components/sections/shared-sections";
import { IconFeature } from "@/components/ui/IconFeature";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Trident Core Energy: our vision, mission and commitment to clean energy through solar panel manufacturing, solar EPC and installation.",
  path: "/about",
});

const capabilities = [
  {
    icon: "factory" as const,
    title: "Manufacturing",
    description: "In-house solar module manufacturing with controlled processes and staged quality inspection.",
  },
  {
    icon: "ruler" as const,
    title: "Engineering",
    description: "System design, structural assessment and electrical engineering tailored to each site.",
  },
  {
    icon: "hardhat" as const,
    title: "Delivery",
    description: "Project execution from procurement to installation, commissioning and handover.",
  },
  {
    icon: "wrench" as const,
    title: "Long-term support",
    description: "Monitoring, cleaning and maintenance that keep systems performing as designed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Engineering Clean Energy for a Sustainable Future"
        description={company.coreMessage}
        breadcrumbs={[{ name: "About Us", href: "/about" }]}
        image={images.engineerVest}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who We Are" title="Manufacturing and delivery, under one roof" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7" data-reveal>
            <p>{company.description}</p>
            <p>
              By combining module manufacturing with engineering and project delivery, we stay accountable for quality from
              the production line to the rooftop, and for the years of service that follow.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <article className="card p-8 md:p-10" data-reveal>
            <Compass className="size-10 text-primary" aria-hidden strokeWidth={1.5} />
            <h2 className="mt-6 font-display text-2xl font-bold text-evergreen">Our Vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{company.vision}</p>
          </article>
          <article className="card p-8 md:p-10" data-reveal>
            <Target className="size-10 text-primary" aria-hidden strokeWidth={1.5} />
            <h2 className="mt-6 font-display text-2xl font-bold text-evergreen">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{company.mission}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Media
            image={images.technicianOnPanels}
            className="aspect-[4/3] rounded-card"
          />
          <div>
            <SectionHeading
              eyebrow="Our Commitment"
              title="A lasting commitment to clean energy"
              description="We believe the shift to solar should be simple, safe and dependable. That shapes how we build, how we communicate and how we support every system."
            />
            <ul className="mt-10 space-y-6">
              {principles.map((p) => (
                <li key={p.title} data-reveal>
                  <h3 className="font-display text-lg font-bold text-evergreen">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-site">
          <SectionHeading
            eyebrow="Expertise"
            title="Manufacturing and delivery capabilities"
            description="Integrated capabilities that cover the full life of a solar system."
          />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <IconFeature key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark section bg-evergreen">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <SectionHeading
            tone="dark"
            eyebrow="Quality & Safety"
            title="Quality and safety are designed in, not inspected in"
          />
          <div className="space-y-5 text-lg leading-relaxed text-white/75" data-reveal>
            <p>
              We follow documented processes in manufacturing and on site: incoming material checks, staged inspection,
              careful system design and safe installation practices.
            </p>
            <p>
              On every project, we prioritise the safety of our teams and customers, and we communicate clearly at each
              stage, from survey and design to commissioning.
            </p>
          </div>
        </div>
      </section>

      {company.team.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading eyebrow="Leadership" title="The people behind Trident Core Energy" />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {company.team.map((m) => (
                <li key={m.name} className="card overflow-hidden" data-reveal>
                  {m.image && <Media image={m.image} className="aspect-square" sizes="(min-width: 1024px) 25vw, 50vw" />}
                  <div className="p-5">
                    <p className="font-display font-bold text-evergreen">{m.name}</p>
                    <p className="text-sm text-muted">{m.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SolarProcess />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
