import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FraudNotice } from "@/components/layout/Footer";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { formatAddress, getContact } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Trident Core Energy in Greater Noida about LT panels, compact substations, bus ducts, cable trays, earthing or electrical contracting.",
  path: "/contact",
});

export default function ContactPage() {
  const c = getContact();
  const details = [
    c.phoneHref && { icon: Phone, label: "Call us", value: c.phoneDisplay, href: c.phoneHref },
    c.whatsappHref && { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: c.whatsappHref },
    c.email && { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    c.address && { icon: MapPin, label: "Address", value: formatAddress(c.address) },
    c.hours && { icon: Clock, label: "Hours", value: c.hours },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Our Team"
        description="Call, email or send an enquiry. Our engineers will get back to you about panels, substations or your electrical project."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="card p-6 md:p-10 lg:col-span-7">
            <h2 className="mb-6 font-display text-2xl font-extrabold text-navy">Send us an enquiry</h2>
            <EnquiryForm idPrefix="contact" />
          </div>
          <aside className="space-y-6 lg:col-span-5">
            {details.length > 0 && (
              <ul className="card divide-y divide-line">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-4 p-5">
                    <d.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="text-sm text-muted">{d.label}</p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="font-semibold text-navy hover:text-primary hover:underline"
                          {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-navy">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {c.mapEmbedUrl && <MapEmbed src={c.mapEmbedUrl} title="Trident Core Energy location map" />}
            <FraudNotice tone="light" />
          </aside>
        </div>
      </section>
    </>
  );
}
