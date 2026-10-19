import { ArrowRight, CheckCircle2 } from "lucide-react";
import { machines, shopFloorPhotos } from "@/content/facilities";
import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Machinery: CNC Fabrication & Powder Coating",
  description:
    "CNC laser cutting, punching, shearing and bending, busbar processing, cable tray perforation, 7-tank pre-treatment and powder coating at our Greater Noida plant.",
  path: "/machinery",
});

export default function MachineryPage() {
  // Stages in production order, each listed once.
  const stages = [...new Set(machines.map((m) => m.stage))];
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="Our machinery"
        description="Every Trident panel, busbar and cable tray is made on our own CNC machines and finished on our own pre-treatment and powder coating line."
        breadcrumbs={[
          { name: "Manufacturing & Testing", href: "/manufacturing" },
          { name: "Machinery", href: "/machinery" },
        ]}
        image={images.machinePretreatment}
      >
        <ButtonLink href="/request-quote" variant="cta" size="lg">
          Request a quote <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/manufacturing" variant="outline-light" size="lg">
          Testing facilities
        </ButtonLink>
      </PageHero>

      <section className="border-b border-line bg-canvas py-8">
        <div className="container-site">
          <p className="eyebrow text-muted">From sheet steel to finished part</p>
          <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            {stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary text-xs text-white">{i + 1}</span>
                  {stage}
                </span>
                {i < stages.length - 1 && <ArrowRight className="size-4 text-muted" aria-hidden />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="In-house machinery"
            title="Eight machines, one production line"
            description="Owning the machines means we control accuracy, finish and lead time ourselves, without waiting on outside fabricators."
          />
          <div className="mt-14 space-y-16 lg:space-y-24">
            {machines.map((m, i) => (
              <article
                key={m.slug}
                id={m.slug}
                className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:items-center lg:gap-14"
                data-reveal
              >
                <Media
                  image={m.image}
                  className={cn("aspect-video rounded-card border border-line bg-white lg:col-span-7", i % 2 === 1 && "lg:order-2")}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
                <div className="lg:col-span-5">
                  <p className="eyebrow flex items-center gap-3 text-accent">
                    <span className="font-display text-base text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {m.stage}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-navy md:text-3xl">{m.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{m.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {m.capabilities.map((c) => (
                      <li key={c} className="flex gap-2.5 text-sm text-ink">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-site">
          <SectionHeading
            eyebrow="On the shop floor"
            title="Our machines at work"
            description="Photos from our plant in Greater Noida."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {shopFloorPhotos.map((p) => (
              <figure key={p.title} className="relative overflow-hidden rounded-card" data-reveal>
                <Media image={p.image!} className="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 50vw" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-4 pt-10 text-sm font-bold text-white">
                  {p.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
