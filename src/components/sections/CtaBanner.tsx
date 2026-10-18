import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getContact } from "@/lib/content";

type Props = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
};

export function CtaBanner({
  title = "Planning a panel, substation or electrical project?",
  description = "Share your single-line diagram, load details or BOQ. Our engineers will review it and come back with the right configuration and a quotation.",
  primary = { label: "Request a Quote", href: "/request-quote" },
}: Props) {
  const contact = getContact();
  return (
    <section className="section">
      <div className="container-site">
        <div className="on-dark grid-lines relative overflow-hidden rounded-[1.25rem] bg-navy px-6 py-14 md:px-14 md:py-16" data-reveal>
          <div
            className="pointer-events-none absolute -right-4 top-0 hidden h-full w-16 -skew-x-[24deg] bg-accent md:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-20 top-0 hidden h-full w-5 -skew-x-[24deg] bg-primary md:block"
            aria-hidden
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:pr-48">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">{title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="cta" size="lg">
                {primary.label}
              </ButtonLink>
              {contact.phoneHref && (
                <a
                  href={contact.phoneHref}
                  className="inline-flex h-13 items-center gap-2 rounded-lg border border-white/35 px-7 font-bold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  <Phone className="size-4" aria-hidden />
                  {contact.phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
