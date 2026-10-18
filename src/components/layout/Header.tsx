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
      <div className="on-dark bg-evergreen text-white/85">
        <p className="container-site py-2.5 text-center text-xs font-medium tracking-wide md:text-[13px]">{company.announcement}</p>
      </div>
      <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <DesktopNav items={nav} />
          <div className="flex items-center gap-2">
            <ButtonLink href="/request-quote" variant="cta" className="hidden sm:inline-flex">
              Get a Solar Quote
            </ButtonLink>
            <MobileNav items={nav} contactHref={contact.phoneHref} />
          </div>
        </div>
      </header>
    </>
  );
}
