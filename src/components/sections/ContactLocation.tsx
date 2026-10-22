import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { company } from "@/content/company";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { formatAddress, formatHours, getContact } from "@/lib/content";

function Row({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
        <dd className="mt-1 text-navy">{children}</dd>
      </div>
    </div>
  );
}

/** Office map with address, contact details, hours and quick actions. */
export function ContactLocation() {
  const c = getContact();
  if (!c.address || !c.mapEmbedUrl) return null;
  const address = formatAddress(c.address);
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <section className="section bg-canvas" aria-labelledby="find-us-heading">
      <div className="container-site">
        <SectionHeading
          id="find-us-heading"
          eyebrow="Find us"
          title="Visit our plant in Greater Noida"
          description="Our manufacturing plant and office are in Ecotech-3, Greater Noida. Please call ahead before visiting so the right person is available to meet you."
        />
        <div className="card mt-10 grid overflow-hidden lg:grid-cols-12">
          <div className="relative min-h-80 lg:col-span-7 lg:min-h-[32rem]">
            <MapEmbed
              src={c.mapEmbedUrl}
              title={`Map showing ${company.name}, ${address}`}
              className="absolute inset-0 aspect-auto h-full rounded-none border-0"
            />
          </div>

          <div className="flex flex-col gap-8 p-6 md:p-10 lg:col-span-5">
            <div>
              <p className="font-display text-xl font-extrabold text-navy">{company.name}</p>
              <p className="mt-1 text-sm text-muted">Manufacturing plant &amp; office</p>
            </div>

            <dl className="space-y-6">
              <Row icon={MapPin} label="Address">
                <address className="font-semibold not-italic">{address}</address>
                {c.mapsHref && (
                  <a href={c.mapsHref} {...external} className="mt-1 inline-block text-sm font-semibold text-primary hover:underline">
                    View on Google Maps
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </Row>
              {c.phoneHref && (
                <Row icon={Phone} label="Phone">
                  <a href={c.phoneHref} className="font-semibold hover:text-primary hover:underline">
                    {c.phoneDisplay}
                  </a>
                </Row>
              )}
              {c.email && (
                <Row icon={Mail} label="Email">
                  <a href={`mailto:${c.email}`} className="font-semibold break-all hover:text-primary hover:underline">
                    {c.email}
                  </a>
                </Row>
              )}
              {c.hours && (
                <Row icon={Clock} label="Business hours">
                  <span className="flex flex-wrap justify-between gap-x-4 font-semibold">
                    <span>{c.hours.days}</span>
                    <span>{formatHours(c.hours)}</span>
                  </span>
                  {c.hours.closedDays && (
                    <span className="mt-1 flex flex-wrap justify-between gap-x-4 text-sm text-muted">
                      <span>{c.hours.closedDays}</span>
                      <span>Closed</span>
                    </span>
                  )}
                </Row>
              )}
            </dl>

            <div className="mt-auto grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {c.phoneHref && (
                <a href={c.phoneHref} className={buttonClasses("cta", "md", "w-full")}>
                  <Phone className="size-4" aria-hidden />
                  Call Us
                </a>
              )}
              {c.directionsHref && (
                <a href={c.directionsHref} {...external} className={buttonClasses("primary", "md", "w-full")}>
                  <Navigation className="size-4" aria-hidden />
                  Get Directions
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              )}
              {c.email && (
                <a href={`mailto:${c.email}`} className={buttonClasses("secondary", "md", "w-full")}>
                  <Mail className="size-4" aria-hidden />
                  Email Us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
