import { Factory, Leaf, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { images } from "@/content/images";

const indicators = [
  { label: "Solar Manufacturing", icon: Factory },
  { label: "End-to-End Installation", icon: Wrench },
  { label: "Sustainable Energy Solutions", icon: Leaf },
];

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-evergreen">
      {/* TODO: interim stock photo; replace with real hero photography (own solar farm or industrial rooftop). */}
      <Media
        image={images.solarFarmAerial}
        priority
        sizes="100vw"
        decorative
        className="absolute inset-0 -z-10"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(100deg, rgb(11 47 36 / 0.94) 0%, rgb(11 47 36 / 0.78) 45%, rgb(11 47 36 / 0.25) 100%)" }}
        aria-hidden
      />
      <div className="container-site flex min-h-[calc(100svh-112px)] max-h-[880px] flex-col justify-center py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3 text-sun">
            <span className="h-px w-8 bg-sun/60" aria-hidden />
            Engineering a Sustainable Future
          </p>
          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            Powering Progress. <span className="text-renew">Protecting Our Planet.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            From advanced solar panel manufacturing to end-to-end solar installations, we deliver reliable clean-energy
            solutions built for a more sustainable tomorrow.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/solutions" variant="cta" size="lg">
              Explore Our Solutions
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light" size="lg">
              Request a Consultation
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
          {indicators.map(({ label, icon: IconComponent }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <IconComponent className="size-5 shrink-0 text-renew" aria-hidden strokeWidth={1.75} />
              <span className="text-sm font-medium text-white/90">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
