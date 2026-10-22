import { Award, Clock, Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { company } from "@/content/company";
import { Logo } from "@/components/ui/Logo";
import { formatAddress, formatHours, getContact } from "@/lib/content";
import { getFooterGroups } from "@/lib/navigation";
import { CookieSettingsButton } from "./ConsentBanner";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function FraudNotice({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const contact = getContact();
  return (
    <div
      className={
        tone === "dark"
          ? "flex gap-3 rounded-lg border border-white/15 bg-white/5 p-4 text-sm text-white/80"
          : "flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
      }
    >
      <ShieldAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p>
        <strong className="font-semibold">Fraud awareness:</strong> {company.name} will never ask you to pay into a
        personal account. Before making any payment, confirm bank details and communications through this official
        website{contact.phoneDisplay ? ` and our official phone number, ${contact.phoneDisplay}` : " and our official phone number"}.
      </p>
    </div>
  );
}

export function Footer() {
  const contact = getContact();
  const groups = getFooterGroups();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white">
      <span className="absolute inset-x-0 top-0 flex h-1" aria-hidden>
        <span className="w-1/3 bg-accent" />
        <span className="w-2/3 bg-primary" />
      </span>
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">{company.whoWeAre}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-white/90">
              <Award className="size-4 text-accent-soft" aria-hidden />
              ISO 9001:2015 certified
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              {contact.phoneHref && (
                <li>
                  <a href={contact.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white">
                    <Phone className="size-4 text-accent-soft" aria-hidden />
                    {contact.phoneDisplay}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                    <Mail className="size-4 text-accent-soft" aria-hidden />
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent-soft" aria-hidden />
                  <div>
                    <address className="not-italic">{formatAddress(contact.address)}</address>
                    {contact.directionsHref && (
                      <a
                        href={contact.directionsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block font-semibold text-accent-soft hover:text-white hover:underline"
                      >
                        Get directions
                        <span className="sr-only"> (opens Google Maps in a new tab)</span>
                      </a>
                    )}
                  </div>
                </li>
              )}
              {contact.hours && (
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-accent-soft" aria-hidden />
                  <span>
                    {contact.hours.days}, {formatHours(contact.hours)}
                    {contact.hours.closedDays && <span className="block text-white/60">{contact.hours.closedDays} closed</span>}
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">{group.title}</h2>
                <span className="mt-3 block h-0.5 w-8 bg-accent" aria-hidden />
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <FraudNotice />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {company.legalName ?? company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <CookieSettingsButton className="hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
