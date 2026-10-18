import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { company } from "@/content/company";
import { manufacturingHighlights, manufacturingProcess } from "@/content/manufacturing";
import { projectCapabilities } from "@/content/projects";
import { benefits, solarProcess, sustainabilityPillars } from "@/content/services";
import type { Faq } from "@/content/types";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/cards";
import { IconFeature } from "@/components/ui/IconFeature";
import { Media } from "@/components/ui/Media";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { getContact, getProjects, getSolutions } from "@/lib/content";
import { faqJsonLd, JsonLd } from "@/lib/jsonld";
import { ProjectGrid } from "./ProjectGrid";
import { images } from "@/content/images";

export function SolutionsGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section bg-canvas">
      <div className="container-site">
        {heading && (
          <SectionHeading
            eyebrow="What We Do"
            title="Solar Solutions for Every Scale"
            description="From a single rooftop to large industrial plants and bulk module supply, we design, build and support solar systems that fit how you use energy."
            align="center"
          />
        )}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getSolutions().map((s) => (
            <ServiceCard key={s.key} solution={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManufacturingShowcase() {
  if (!company.features.manufacturing) return null;
  return (
    <section className="on-dark section bg-evergreen">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* TODO: interim stock photo; replace with real manufacturing line photography. */}
          <Media
            image={images.modulesSunset}
            className="aspect-[4/3] rounded-card ring-1 ring-white/10 lg:aspect-[5/6]"
          />
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Manufacturing"
              title="Precision Manufacturing. Reliable Solar Performance."
              description="Our module manufacturing combines controlled processes with inspection at every stage, so the panels we supply and install are built to perform."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {manufacturingHighlights.map((h) => (
                <li key={h.title} className="flex gap-3" data-reveal>
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-renew" aria-hidden />
                  <div>
                    <h3 className="font-display font-bold text-white">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{h.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/manufacturing" variant="cta" size="lg">
                Explore Our Manufacturing
              </ButtonLink>
              <ButtonLink href="/request-quote?type=manufacturing" variant="outline-light" size="lg">
                Product Enquiry
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-white/10 pt-14">
          <h3 className="eyebrow mb-10 text-sun">Process overview</h3>
          <ProcessTimeline steps={manufacturingProcess} tone="dark" />
        </div>
      </div>
    </section>
  );
}

export function SolarProcess() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow="How It Works"
          title="How Our Solar Process Works"
          description="A clear, four-stage process that keeps you informed from the first conversation to long-term support."
        />
        <ProcessTimeline steps={solarProcess} className="mt-14" />
      </div>
    </section>
  );
}

export function ProjectsSection({ limit }: { limit?: number }) {
  const projects = getProjects();
  return (
    <section className="section bg-canvas">
      <div className="container-site">
        {projects.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Our Work"
              title="Real Projects. Cleaner Energy."
              description="A selection of solar installations delivered by our team."
            />
            <ProjectGrid projects={limit ? projects.slice(0, limit) : projects} />
            {limit && projects.length > limit && (
              <ButtonLink href="/projects" variant="secondary" className="mt-10">
                View all projects <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            )}
          </>
        ) : (
          <ProjectCapabilities />
        )}
      </div>
    </section>
  );
}

/** Shown in place of the project grid until verified projects are published. */
export function ProjectCapabilities() {
  return (
    <>
      <SectionHeading
        eyebrow="Project Capabilities"
        title="The Kinds of Projects We Deliver"
        description="Our project portfolio will be published here. Meanwhile, these are the project types our team is equipped to plan and deliver."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {projectCapabilities.map((p) => (
          <article key={p.title} className="card overflow-hidden" data-reveal>
            <Media image={p.image} className="aspect-[4/3]" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
            <div className="p-6">
              <p className="eyebrow text-primary">{p.category}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-evergreen">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function ImpactNumbers() {
  const impact = company.impact;
  if (!impact || impact.metrics.length === 0) return null;
  const metrics = impact.metrics.filter((m) => Number.isFinite(m.value) && m.value > 0);
  if (metrics.length === 0) return null;
  return (
    <div className="mt-16 rounded-card bg-white p-8 md:p-12" data-reveal>
      <h3 className="eyebrow text-primary">Impact in numbers</h3>
      <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <dt className="text-sm font-medium text-muted">{m.label}</dt>
            <dd className="mt-2 font-display text-4xl font-extrabold text-evergreen">
              <StatCounter value={m.value} unit={m.unit} label={m.label} />
            </dd>
            <dd className="mt-2 text-xs leading-relaxed text-muted">{m.basis}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed text-muted">
        Reporting period: {impact.reportingPeriod}. {impact.assumptions}
      </p>
    </div>
  );
}

export function SustainabilitySection() {
  return (
    <section className="section bg-mint">
      <div className="container-site">
        <SectionHeading
          eyebrow="Sustainability"
          title="Clean Energy Is More Than Power. It's a Responsibility."
          description="Sustainability shapes how we manufacture, how we design systems and how we support them over their working life."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {sustainabilityPillars.map((p) => (
            <IconFeature key={p.title} icon={p.icon} title={p.title} description={p.description} />
          ))}
        </div>
        <ImpactNumbers />
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why Trident Core Energy"
          title="Your Trusted Partner in the Solar Energy Journey"
          align="center"
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white p-8">
              <IconFeature icon={b.icon} title={b.title} description={b.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faqs, title = "Frequently Asked Questions" }: { faqs: Faq[]; title?: string }) {
  if (faqs.length === 0) return null;
  return (
    <section className="section bg-canvas">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQs" title={title} />
          <ButtonLink href="/resources/faqs" variant="secondary" className="mt-8">
            See all FAQs
          </ButtonLink>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} />
        </div>
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}

export function LeadFormSection({
  title = "Tell Us About Your Project",
  description = "Share a few details and our team will get in touch to discuss the right solar solution for you.",
  id = "enquiry",
}: {
  title?: string;
  description?: string;
  id?: string;
}) {
  const contact = getContact();
  return (
    <section id={id} className="section scroll-mt-24">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Get in Touch" title={title} description={description} />
          {(contact.phoneHref || contact.email) && (
            <ul className="mt-8 space-y-3">
              {contact.phoneHref && (
                <li>
                  <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Phone className="size-4" aria-hidden /> {contact.phoneDisplay}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Mail className="size-4" aria-hidden /> {contact.email}
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="card p-6 md:p-10 lg:col-span-8">
          <EnquiryForm idPrefix={id} />
        </div>
      </div>
    </section>
  );
}
