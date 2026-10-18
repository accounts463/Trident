import { Calculator, FileText, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { calculatorLive, getContact } from "@/lib/content";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string; icon: typeof Phone; external?: boolean; primary?: boolean };

/**
 * Bottom bar on mobile, floating stack on desktop. Each action appears only
 * when its real value exists (phone, WhatsApp number, live calculator).
 */
export function ContactStrip() {
  const contact = getContact();
  const items: Item[] = [
    ...(contact.phoneHref ? [{ label: "Call", href: contact.phoneHref, icon: Phone, external: true }] : []),
    ...(contact.whatsappHref ? [{ label: "WhatsApp", href: contact.whatsappHref, icon: MessageCircle, external: true }] : []),
    { label: "Get a Quote", href: "/request-quote", icon: FileText, primary: true },
    ...(calculatorLive ? [{ label: "Calculator", href: "/solar-calculator", icon: Calculator }] : []),
  ];

  // With only the quote action available, the header CTA already covers desktop.
  const desktopItems = items.length > 1 ? items : [];

  return (
    <>
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
          {items.map((item) => (
            <li key={item.label}>
              <StripLink
                item={item}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold",
                  item.primary ? "bg-sun text-evergreen" : "text-evergreen",
                )}
              />
            </li>
          ))}
        </ul>
      </nav>
      {desktopItems.length > 0 && (
        <nav aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 hidden md:block">
          <ul className="flex flex-col items-end gap-2">
            {desktopItems.map((item) => (
              <li key={item.label}>
                <StripLink
                  item={item}
                  className={cn(
                    "flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold shadow-lg transition-colors",
                    item.primary ? "bg-sun text-evergreen hover:bg-sun-hover" : "bg-primary text-white hover:bg-primary-hover",
                  )}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

function StripLink({ item, className }: { item: Item; className: string }) {
  const content = (
    <>
      <item.icon className="size-5" aria-hidden />
      {item.label}
    </>
  );
  return item.external ? (
    <a href={item.href} className={className} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}
