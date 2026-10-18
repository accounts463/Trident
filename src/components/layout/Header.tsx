import { Award, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/company";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { getContact } from "@/lib/content";
import { getMainNav } from "@/lib/navigation";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const nav = getMainNav();
  const contact = getContact();
  return (
    <>
      <div className="on-dark bg-navy text-white/80">
        <div className="container-site flex h-10 items-center justify-between gap-6 text-xs md:text-[13px]">
          <p className="flex items-center gap-2 font-medium">
            <Award className="size-4 text-accent-soft" aria-hidden />
            ISO 9001:2015 certified
            <span className="hidden sm:inline">· Panel manufacturer since {company.foundedYear}</span>
          </p>
          <ul className="hidden items-center gap-6 md:flex">
            {contact.address && (
              <li className="hidden items-center gap-1.5 lg:flex">
                <MapPin className="size-3.5 text-accent-soft" aria-hidden />
                {contact.address.locality}, {contact.address.region}
              </li>
            )}
            {contact.phoneHref && (
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-1.5 hover:text-white">
                  <Phone className="size-3.5 text-accent-soft" aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="size-3.5 text-accent-soft" aria-hidden />
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-white/95 shadow-[0_6px_20px_-12px_rgb(11_22_40/0.25)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <div className="container-site flex h-[76px] items-center justify-between gap-6 xl:h-[84px]">
          <Logo size="lg" className="max-sm:[&_svg]:h-10" />
          <DesktopNav items={nav} />
          <div className="flex items-center gap-2 xl:hidden">
            <ButtonLink href="/request-quote" variant="cta" className="max-sm:hidden">
              Request a Quote
            </ButtonLink>
            <MobileNav items={nav} contact={{ phoneHref: contact.phoneHref, phoneDisplay: contact.phoneDisplay, email: contact.email }} />
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-[-1px] h-[3px] bg-gradient-to-r from-navy via-primary to-accent" aria-hidden />
      </header>
    </>
  );
}
