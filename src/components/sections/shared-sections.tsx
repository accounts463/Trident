import { ArrowRight, Check, CheckCircle2, Mail, Phone, Quote, Trophy } from "lucide-react";
import Link from "next/link";
import { applicationAreas, clientCount, featuredClients, sectors } from "@/content/clients";
import { company } from "@/content/company";
import { faqs as allFaqs } from "@/content/faqs";
import { machines, testingActivities } from "@/content/facilities";
import { images } from "@/content/images";
import { deliveryProcess, services, strengths } from "@/content/services";
import type { Faq, ImageAsset } from "@/content/types";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { CategoryCard, CertificateCard, ProductCard, ServiceCard } from "@/components/ui/cards";
import { Icon } from "@/components/ui/Icon";
import { IconFeature } from "@/components/ui/IconFeature";
import { LightboxGallery } from "@/components/ui/LightboxGallery";
import { Media } from "@/components/ui/Media";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategories, getContact, getFeaturedProducts, getProduct, getProducts } from "@/lib/content";
import { faqJsonLd, JsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

/** Scrolling strip of client names. Names, not logos: no third-party marks are reproduced. */
export function ClientMarquee() {
  const names = featuredClients;
  return (
    <section aria-labelledby="clients-strip" className="border-b border-line bg-white">
      <div className="container-site flex flex-col gap-4 py-8 lg:flex-row lg:items-center lg:gap-10">
        <h2 id="clients-strip" className="eyebrow shrink-0 text-muted">
          Trusted by {Math.floor(clientCount / 10) * 10}+ clients
        </h2>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="marquee-track flex w-max gap-3" tabIndex={0} aria-label="Selected clients">
            {[...names, ...names].map((name, i) => (
              <li
                key={`${name}-${i}`}
                data-duplicate={i >= names.length || undefined}
                aria-hidden={i >= names.length || undefined}
                className="whitespace-nowrap rounded-lg border border-line bg-canvas px-4 py-2 font-display text-sm font-bold text-navy/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <Link href="/clients" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary hover:underline">
          All clients <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export function AboutIntro() {
  return (
    <section className="section">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative" data-reveal>
          <div className="grid grid-cols-5 gap-4">
            <Media image={images.adminBlock} className="col-span-3 aspect-[3/4] rounded-card" sizes="(min-width: 1024px) 28vw, 60vw" />
            <div className="col-span-2 flex flex-col gap-4">
              <Media image={images.punching} className="aspect-square rounded-card" sizes="(min-width: 1024px) 18vw, 40vw" />
              <Media image={images.testAcb} className="aspect-square rounded-card" sizes="(min-width: 1024px) 18vw, 40vw" />
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 rounded-card bg-accent px-6 py-5 text-white shadow-card-hover">
            <p className="font-display text-4xl font-black leading-none">{company.foundedYear}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">Building panels since</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="About Trident Core Energy"
            title="Complete power solutions, from generation to distribution"
            description={company.whoWeAre}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {company.principles.slice(0, 4).map((p) => (
              <li key={p} className="flex gap-3 text-ink" data-reveal>
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <figure className="mt-8 rounded-card border border-line bg-canvas p-5" data-reveal>
            <Quote className="size-5 text-accent" aria-hidden />
            <blockquote className="mt-2 text-sm leading-relaxed text-ink">{company.director.note}</blockquote>
            <figcaption className="mt-2 text-sm font-bold text-navy">{company.director.name}, Director</figcaption>
          </figure>
          <ButtonLink href="/about" className="mt-8" size="lg">
            Discover Our Story
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection({ tone = "canvas" }: { tone?: "canvas" | "white" }) {
  const categories = getCategories();
  return (
    <section className={cn("section", tone === "canvas" ? "bg-canvas" : "bg-white")}>
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Manufacturing Range"
            title="Everything from the substation to the socket"
            description="Panels, power distribution, cable management, earthing and power conditioning: designed, fabricated and tested under one roof."
          />
          <ButtonLink href="/products" variant="secondary">
            View all products <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} count={getProducts(c.slug).length} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const featured = getFeaturedProducts().filter((p) => p.slug !== "compact-substation");
  const categories = getCategories();
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow="Featured Products" title="Panels and systems our clients rely on" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((p) => (
            <ProductCard key={p.slug} product={p} categoryName={categories.find((c) => c.slug === p.category)?.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SubstationSpotlight() {
  const css = getProduct("compact-substation");
  if (!css) return null;
  const keySpecs = css.specs.filter((s) =>
    ["Voltage class", "Rating", "MV switchgear", "LV panel", "Degree of protection", "Complete CSS assembly"].includes(s.label),
  );
  return (
    <section className="on-dark section grid-lines relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 70% at 15% 20%, rgb(45 78 158 / 0.5), transparent 70%)" }}
        aria-hidden
      />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Product Spotlight"
            title={css.name}
            description={css.description[0]}
          />
          <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-2">
            {keySpecs.map((s) => (
              <div key={s.label} className="bg-navy-2/90 p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-soft">{s.label}</dt>
                <dd className="mt-1.5 text-sm font-medium leading-relaxed text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`/products/${css.slug}`} variant="cta" size="lg">
              Full specifications
            </ButtonLink>
            <ButtonLink href={`/request-quote?product=${css.slug}`} variant="outline-light" size="lg">
              Enquire about CSS
            </ButtonLink>
          </div>
        </div>
        <div data-reveal>
          <Media image={css.image} className="aspect-[4/3] rounded-card shadow-2xl ring-1 ring-white/10" />
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {applicationAreas.map((a) => (
              <li key={a.title} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white/85">
                <Icon name={a.icon} className="size-4 shrink-0 text-accent-soft" />
                {a.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ManufacturingSection() {
  // Shop-floor photos only; product cut-outs would look out of place in this grid.
  const photos = machines.filter((m) => m.image && m.fit !== "contain");
  return (
    <section className="section bg-canvas">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Manufacturing Facilities"
              title="In-house machinery. Inspected and tested before dispatch."
              description="Sheet metal, busbars and finishes are processed on our own CNC machines and powder coating line, then every panel goes through our test bay."
            />
            <ul className="mt-8 space-y-3">
              {testingActivities.slice(1, 7).map((t) => (
                <li key={t} className="flex gap-3 text-ink" data-reveal>
                  <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <ButtonLink href="/manufacturing" className="mt-10" size="lg">
              Tour our facilities <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            {photos.map((m) => (
              <figure key={m.title} className="group relative overflow-hidden rounded-card" data-reveal>
                <Media image={m.image!} className="aspect-[4/5]" sizes="(min-width: 1024px) 28vw, 50vw" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-4 pt-10 text-sm font-bold text-white">
                  {m.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="section">
      <div className="container-site">
        {heading && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Contracting Services"
              title="From 33 kV substations to O&M contracts"
              description="Our contracting team installs, tests and commissions what we manufacture, and much more."
            />
            {limit && (
              <ButtonLink href="/services" variant="secondary">
                All services <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            )}
          </div>
        )}
        <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-4", heading && "mt-12")}>
          {list.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DeliveryProcess({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={cn("section", dark && "on-dark grid-lines bg-navy")}>
      <div className="container-site">
        <SectionHeading
          tone={tone}
          eyebrow="How We Deliver"
          title="One team from design to commissioning"
          description="Design, manufacturing, erection, commissioning and installation, all handled by Trident."
        />
        <ProcessTimeline steps={deliveryProcess} tone={tone} className="mt-14" />
      </div>
    </section>
  );
}

export function SectorsSection({ showReferences = true }: { showReferences?: boolean }) {
  return (
    <section className="section bg-canvas">
      <div className="container-site">
        <SectionHeading
          eyebrow="Sectors We Serve"
          title="Turnkey projects across industry, buildings, education and healthcare"
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sectors.map((s, i) => (
            <article key={s.slug} id={s.slug} className="card scroll-mt-28 overflow-hidden" data-reveal>
              <div className={cn("flex items-center gap-4 px-6 py-4 text-white", i % 2 === 0 ? "bg-accent" : "bg-primary")}>
                <span className="font-display text-2xl font-black">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-7 w-px bg-white/50" aria-hidden />
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <Icon name={s.icon} className="ml-auto size-6 opacity-80" />
              </div>
              <div className="p-6">
                <p className="leading-relaxed text-muted">{s.summary}</p>
                {showReferences && (
                  <ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-ink sm:grid-cols-2">
                    {s.references.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationsSection({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section">
      <div className="container-site">
        {heading && (
          <SectionHeading
            eyebrow="Quality · Safety · Compliance · Trust"
            title="Certified, type-tested and independently verified"
            description="Our quality system and panel designs are backed by independent certification and testing."
          />
        )}
        <div className={cn("grid gap-6 md:grid-cols-3", heading && "mt-12")}>
          {company.certifications.map((c) => (
            <CertificateCard key={c.slug} certification={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Homepage teaser for the awards, linking to the full section on the About page. */
export function AwardsSection() {
  return (
    <section className="on-dark section grid-lines bg-navy">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="Awards & Recognition"
            title="Recognised for business excellence and social contribution"
            description="Our work has been recognised beyond the shop floor, for how we run our business and for what we give back to the community."
          />
          <ButtonLink href="/about#awards" variant="outline-light" className="mt-8">
            Read about our awards <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {company.awards.map((a) => (
            <li key={a.title} className="overflow-hidden rounded-card bg-navy-2 ring-1 ring-white/10" data-reveal>
              <Media image={a.image} className="aspect-[4/5]" sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw" />
              <div className="flex gap-3 p-5">
                <Trophy className="mt-0.5 size-5 shrink-0 text-accent-soft" aria-hidden />
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-white">{a.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{a.presentedBy}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Full awards section for the About page, with the story behind each award. */
export function AwardsDetail() {
  return (
    <section id="awards" className="section scroll-mt-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Awards & Recognition"
          title="Honoured for excellence in business and service to society"
          description="Recognition received by Trident Core Energy, accepted on the company's behalf by our director."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {company.awards.map((a) => (
            <article key={a.title} className="card flex flex-col overflow-hidden" data-reveal>
              <Media image={a.image} className="aspect-[4/5] sm:aspect-[5/6]" sizes="(min-width: 768px) 45vw, 100vw" />
              <div className="flex flex-1 gap-4 p-6 md:p-8">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                  <Trophy className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-navy md:text-2xl">{a.title}</h3>
                  <p className="mt-1 font-semibold text-primary">{a.presentedBy}</p>
                  <p className="mt-4 leading-relaxed text-muted">{a.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StrengthsSection() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow="Why Trident" title="Why industries choose Trident Core Energy" align="center" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s) => (
            <div key={s.title} className="bg-white p-8">
              <IconFeature icon={s.icon} title={s.title} description={s.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuesSection() {
  return (
    <section className="section bg-canvas">
      <div className="container-site">
        <SectionHeading eyebrow="Our Values" title="How we work" align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {company.values.map((v, i) => (
            <article key={v.title} className="card relative overflow-hidden p-7" data-reveal>
              <span className="font-display text-5xl font-black text-tint" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "absolute right-6 top-6 inline-flex size-12 items-center justify-center rounded-lg text-white",
                  i % 2 === 0 ? "bg-primary" : "bg-accent",
                )}
              >
                <Icon name={v.icon} className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{v.title}</h3>
              <span className="mt-3 block h-0.5 w-8 bg-accent" aria-hidden />
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PanelGallery({ items = images.gallery, title = "From our shop floor" }: { items?: readonly ImageAsset[]; title?: string }) {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow="Gallery" title={title} />
        <LightboxGallery
          items={items.slice(0, 12)}
          listClassName="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3"
          itemClassName="overflow-hidden rounded-card"
          mediaClassName="aspect-[4/3]"
          sizes="(min-width: 1024px) 33vw, 50vw"
          reveal
        />
      </div>
    </section>
  );
}

export function FaqSection({ faqs = allFaqs, title = "Frequently Asked Questions" }: { faqs?: Faq[]; title?: string }) {
  if (faqs.length === 0) return null;
  return (
    <section id="faqs" className="section scroll-mt-28 bg-canvas">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQs" title={title} />
          <ButtonLink href="/contact" variant="secondary" className="mt-8">
            Ask our engineers
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
  title = "Tell Us About Your Requirement",
  description = "Share a few details and our team will get back to you with the right configuration and pricing.",
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
                  <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
                    <Phone className="size-4" aria-hidden /> {contact.phoneDisplay}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
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
