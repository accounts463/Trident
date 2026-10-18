import { Award, Factory, Gauge } from "lucide-react";
import { clientCount } from "@/content/clients";
import { company } from "@/content/company";
import { images } from "@/content/images";
import { CountUp } from "@/components/ui/CountUp";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";

// `count` animates the figure up from zero; a year reads oddly counting, so it stays static.
const stats = [
  { value: String(company.foundedYear), label: "Manufacturing panels since", count: false },
  { value: "4000 kVA", label: "Compact substations up to", count: true },
  { value: "6000 A", label: "Bus ducts and rising mains up to", count: true },
  { value: `${Math.floor(clientCount / 10) * 10}+`, label: "Clients across industries", count: true },
];

const slides: HeroSlide[] = [
  {
    image: images.mccLineupLong,
    eyebrow: company.slogans[0],
    title: "Engineered for Safety.",
    highlight: "Built for Reliability.",
    description:
      "LT panels, compact substations, bus ducts, cable trays and earthing systems, manufactured in Greater Noida and installed by our own engineers. Power management you can trust.",
    cta: { label: "Explore Products", href: "/products" },
  },
  {
    image: images.mimicLineupAcb,
    eyebrow: "Power Control Centres",
    title: "PCC panels tested",
    highlight: "at CPRI, Bhopal.",
    description:
      "A Trident PCC rated 415 V, 4000 A has been short-circuit tested at the Central Power Research Institute: 50 kA for 1 second.",
    cta: { label: "View PCC Panels", href: "/products/power-control-centre" },
  },
  {
    image: images.compactSubstation,
    eyebrow: "Compact Substations · 11 kV & 33 kV",
    title: "Compact substations",
    highlight: "up to 4000 kVA.",
    description:
      "MV switchgear, transformer and LV panel assembled in one factory-built enclosure, ready to install on site.",
    cta: { label: "View Compact Substations", href: "/products/compact-substation" },
  },
  {
    image: images.panelsAssembly,
    eyebrow: "Manufacturing & Testing",
    title: "Built in-house.",
    highlight: "Tested before dispatch.",
    description:
      "CNC punching, shearing, bending and laser cutting, busbar processing and powder coating at our own plant, then full testing in our test bay.",
    cta: { label: "Tour Our Facilities", href: "/manufacturing" },
  },
];

const badges = [
  { label: "ISO 9001:2015 certified", icon: Award },
  { label: "In-house CNC & powder coating", icon: Factory },
  { label: "Tested before dispatch", icon: Gauge },
];

export function Hero() {
  return (
    <HeroCarousel slides={slides}>
      <ul className="mt-3 hidden flex-wrap gap-x-6 gap-y-2 sm:flex">
        {badges.map(({ label, icon: IconComponent }) => (
          <li key={label} className="flex items-center gap-2 text-sm font-medium text-white/85">
            <IconComponent className="size-4 text-accent-soft" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 md:mt-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-0.5 bg-navy/85 px-4 py-3 backdrop-blur-sm md:gap-1 md:p-5">
            <dt className="text-[0.7rem] font-medium leading-snug text-white/65 md:text-xs">{s.label}</dt>
            <dd className="font-display text-xl font-black text-white md:text-3xl">
              {s.count ? <CountUp value={s.value} /> : s.value}
            </dd>
          </div>
        ))}
      </dl>
    </HeroCarousel>
  );
}
