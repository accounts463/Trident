import { Compass, Target } from "lucide-react";
import { company } from "@/content/company";
import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { CertificationsSection, DeliveryProcess, ValuesSection } from "@/components/sections/shared-sections";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Trident Core Energy has manufactured electrical panels in Greater Noida since 2010. Meet the company, our mission and vision, values and the engineers behind it.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Panel manufacturing since 2010, built on honesty"
        description={company.whoWeAre}
        breadcrumbs={[{ name: "About Us", href: "/about" }]}
        image={images.adminOffice}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our Story" title="A growing panel manufacturer with engineering at its core" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {company.story.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="space-y-6 lg:col-span-5">
            <Media image={images.adminBlock} className="aspect-[4/5] rounded-card" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="rounded-card bg-navy p-6 text-white">
              <p className="eyebrow text-accent-soft">Leadership</p>
              <p className="mt-3 font-display text-xl font-bold">{company.director.name}</p>
              <p className="text-sm text-white/70">Director</p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{company.director.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          {[
            { title: "Our Mission", text: company.mission, icon: Target, tone: "bg-accent" },
            { title: "Our Vision", text: company.vision, icon: Compass, tone: "bg-primary" },
          ].map(({ title, text, icon: IconComponent, tone }) => (
            <article key={title} className="card p-8 md:p-10" data-reveal>
              <span className={`inline-flex size-12 items-center justify-center rounded-lg text-white ${tone}`}>
                <IconComponent className="size-6" aria-hidden />
              </span>
              <h2 className="mt-6 font-display text-2xl font-extrabold text-navy">{title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <ValuesSection />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Industries"
              title="Engineering services for a wide range of industries"
              description="Design, manufacturing, erection, commissioning and installation for:"
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {company.industriesServed.map((i) => (
                <li key={i} className="rounded-lg border border-line bg-canvas px-4 py-2 text-sm font-semibold text-navy">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2" aria-label="Our principles">
            {company.principles.map((p, i) => (
              <li key={p} className="card flex gap-4 p-5" data-reveal>
                <span className="font-display text-2xl font-black text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold leading-snug text-navy">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DeliveryProcess tone="dark" />
      <CertificationsSection />
      <CtaBanner />
    </>
  );
}
