import { ArrowRight, Award, Factory, Gauge } from "lucide-react";
import { clientCount } from "@/content/clients";
import { company } from "@/content/company";
import { images } from "@/content/images";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";

const stats = [
  { value: String(company.foundedYear), label: "Manufacturing panels since" },
  { value: "4000 kVA", label: "Compact substations up to" },
  { value: "6000 A", label: "Bus ducts and rising mains up to" },
  { value: `${Math.floor(clientCount / 10) * 10}+`, label: "Clients across industries" },
];

const badges = [
  { label: "ISO 9001:2015 certified", icon: Award },
  { label: "In-house CNC & powder coating", icon: Factory },
  { label: "Tested before dispatch", icon: Gauge },
];

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-20">
        <Media image={images.panelLineup} priority sizes="100vw" decorative className="size-full" />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgb(13 23 48 / 0.97) 0%, rgb(13 23 48 / 0.9) 42%, rgb(13 23 48 / 0.45) 75%, rgb(13 23 48 / 0.2) 100%)",
        }}
        aria-hidden
      />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="absolute -right-10 top-0 -z-10 hidden h-full w-40 -skew-x-[24deg] bg-accent/85 lg:block" aria-hidden />
      <div className="absolute right-36 top-0 -z-10 hidden h-full w-12 -skew-x-[24deg] bg-primary/80 lg:block" aria-hidden />

      <div className="container-site flex min-h-[calc(100svh-116px)] max-h-[900px] flex-col justify-center py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3 text-accent-soft">
            <span className="slash text-[0.75rem]" aria-hidden />
            {company.slogans[0]}
          </p>
          <h1 className="mt-6 font-display text-[2.6rem] font-black leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
            Engineered for Safety.
            <span className="block text-accent-soft">Built for Reliability.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            LT panels, compact substations, bus ducts, cable trays and earthing systems, manufactured in Greater Noida
            and installed by our own engineers. Power management you can trust.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/products" variant="cta" size="lg">
              Explore Products
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/request-quote" variant="outline-light" size="lg">
              Request a Quote
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map(({ label, icon: IconComponent }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-white/85">
                <IconComponent className="size-4 text-accent-soft" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 bg-navy/85 p-5 backdrop-blur-sm">
              <dt className="text-xs font-medium leading-snug text-white/65">{s.label}</dt>
              <dd className="font-display text-2xl font-black text-white md:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
