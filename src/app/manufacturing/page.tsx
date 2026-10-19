import { CheckCircle2, Wrench } from "lucide-react";
import { machines, testEquipment, testingActivities, testPhotos } from "@/content/facilities";
import { images } from "@/content/images";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { CertificationsSection, PanelGallery } from "@/components/sections/shared-sections";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Panel Manufacturing & Testing Plant",
  description:
    "In-house CNC punching, bending and laser cutting, busbar processing, 7-tank pre-treatment, powder coating and full panel testing in Greater Noida.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  const withPhotos = machines.filter((m) => m.image);
  const withoutPhotos = machines.filter((m) => !m.image);
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="Manufacturing facilities, all in-house"
        description="From sheet steel to a tested, powder-coated panel: every stage happens at our plant in Greater Noida."
        breadcrumbs={[{ name: "Manufacturing & Testing", href: "/manufacturing" }]}
        image={images.shopFloor}
      />

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Machinery"
            title="CNC fabrication and powder coating"
            description="Our own machinery gives us control over accuracy, finish and lead time."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {withPhotos.map((m) => (
              <figure key={m.title} className="card overflow-hidden" data-reveal>
                <Media image={m.image!} fit={m.fit} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 50vw" />
                <figcaption className="p-5">
                  <span className="block font-display text-lg font-bold text-navy">{m.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{m.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {withoutPhotos.map((m) => (
              <li key={m.title} className="flex gap-4 rounded-card border border-line bg-canvas p-5" data-reveal>
                <Wrench className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                <span>
                  <span className="block font-bold text-navy">{m.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{m.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark section grid-lines bg-navy">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Inspection & Testing"
              title="Every panel is tested at the plant"
              description="We have complete in-house panel testing facilities."
            />
            <ul className="mt-8 space-y-3">
              {testingActivities.map((t) => (
                <li key={t} className="flex gap-3 text-white/85">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-soft" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <Media image={images.testBench} fit="contain" className="mt-10 aspect-[4/3] rounded-card" sizes="(min-width: 1024px) 35vw, 100vw" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {testPhotos.map((t) => (
              <figure key={t.title} className="overflow-hidden rounded-card border border-white/10 bg-navy-2" data-reveal>
                <Media image={t.image!} className="aspect-[4/3] sm:aspect-[4/5]" sizes="(min-width: 1024px) 28vw, 50vw" />
                <figcaption className="p-5">
                  <span className="block font-display font-bold text-white">{t.title}</span>
                  <span className="mt-1 block text-sm text-white/70">{t.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Test Equipment"
              title="Calibrated instruments for every test"
              description="Our test bay is equipped with:"
            />
            <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {testEquipment.map((e) => (
                <li key={e} className="flex gap-2.5 text-sm text-ink">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7">
            {images.testEquipment.map((img) => (
              <li key={img.src} className="overflow-hidden rounded-card border border-line" data-reveal>
                <Media image={img} className="aspect-square" sizes="(min-width: 1024px) 20vw, 33vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PanelGallery />
      <CertificationsSection />
      <CtaBanner />
    </>
  );
}
