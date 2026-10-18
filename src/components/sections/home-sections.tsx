import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { capabilities, principles } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { ArticleCard } from "@/components/ui/cards";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { getArticles } from "@/lib/content";
import { images } from "@/content/images";

export function CapabilitiesStrip() {
  const items = capabilities.filter((c) => c.key === "design" || company.features[c.key]);
  return (
    <section aria-labelledby="capabilities-heading" className="border-b border-line bg-white">
      <h2 id="capabilities-heading" className="sr-only">
        Our capabilities
      </h2>
      <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-3 lg:grid-cols-5">
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-3">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint text-primary">
              <Icon name={c.icon} className="size-5" />
            </span>
            <span className="text-sm font-semibold leading-snug text-evergreen">{c.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AboutIntro() {
  return (
    <section className="section">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative" data-reveal>
          {/* TODO: interim stock photo; replace with a real photo of Trident Core engineers or facility. */}
          <Media
            image={images.engineerVest}
            className="aspect-[4/5] rounded-card md:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-line bg-white p-5 shadow-card-hover md:left-auto md:w-72">
            <p className="font-display text-sm font-bold text-evergreen">{company.tagline}</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="About Trident Core Energy"
            title="Building a Better Future Through Clean Energy"
            description="We bring solar panel manufacturing and complete solar project delivery together, so homes, businesses and industries can adopt clean energy with confidence and a single accountable partner."
          />
          <ul className="mt-10 space-y-6">
            {principles.map((p) => (
              <li key={p.title} className="flex gap-4" data-reveal>
                <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-lg font-bold text-evergreen">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" className="mt-10" size="lg">
            Discover Our Story
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function CalculatorTeaser() {
  return (
    <section className="section pt-0">
      <div className="container-site">
        <div className="card flex flex-col gap-6 bg-canvas p-8 md:flex-row md:items-center md:justify-between md:p-12" data-reveal>
          <div className="flex items-start gap-5">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <Calculator className="size-7" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-evergreen">Estimate your solar system in a minute</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                Enter your monthly bill and roof area for an indicative system size and estimate. It&apos;s a starting
                point, not a quotation.
              </p>
            </div>
          </div>
          <ButtonLink href="/solar-calculator" size="lg">
            Try the Solar Calculator
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function ResourcesPreview() {
  const articles = getArticles().slice(0, 6);
  return (
    <section className="section bg-canvas">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Learn"
            title="Solar Knowledge, Explained Simply"
            description="Practical guides to help you understand solar technology and make confident decisions."
          />
          <Link href="/resources" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
            View all resources
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
