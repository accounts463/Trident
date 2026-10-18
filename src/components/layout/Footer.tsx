import { Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { company } from "@/content/company";
import { Logo } from "@/components/ui/Logo";
import { formatAddress, getContact } from "@/lib/content";
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
          ? "flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/80"
          : "flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
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
  const hasContact = contact.phone || contact.email || contact.address;

  return (
    <footer className="on-dark bg-evergreen text-white">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">{company.coreMessage}</p>
            <p className="mt-4 font-display text-sm font-semibold text-renew">{company.tagline}</p>
            {company.socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {company.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-white/20 px-4 text-sm text-white/80 hover:border-renew hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-renew">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-sm text-white/75 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {hasContact && (
          <ul className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-10 text-sm text-white/80 md:flex-row md:flex-wrap md:gap-10">
            {contact.phoneHref && (
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="size-4 text-renew" aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="size-4 text-renew" aria-hidden />
                  {contact.email}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-renew" aria-hidden />
                <address className="not-italic">{formatAddress(contact.address)}</address>
              </li>
            )}
          </ul>
        )}

        <div className="mt-10">
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
