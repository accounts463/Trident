import { company } from "@/content/company";
import type { Faq, Product } from "@/content/types";
import { getContact } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/site";

type JsonLdObject = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd(): JsonLdObject[] {
  const contact = getContact();
  const sameAs = company.socials.map((s) => s.href);
  const org: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    url: siteUrl,
    description: company.description,
    slogan: company.tagline,
    foundingDate: String(company.foundedYear),
    logo: absoluteUrl("/images/logo.png"),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  // LocalBusiness only when a verified address exists.
  if (!contact.address) return [org];
  const a = contact.address;
  return [
    org,
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: company.name,
      url: siteUrl,
      image: absoluteUrl("/images/logo.png"),
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      ...(contact.phone ? { telephone: contact.phone } : {}),
      ...(contact.email ? { email: contact.email } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: a.streetAddress,
        addressLocality: a.locality,
        addressRegion: a.region,
        postalCode: a.postalCode,
        addressCountry: a.country,
      },
      ...(company.serviceAreas.length ? { areaServed: company.serviceAreas } : {}),
    },
  ];
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function productJsonLd(product: Product, categoryName: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: categoryName,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${siteUrl}/#organization` },
    url: absoluteUrl(`/products/${product.slug}`),
    ...(product.image.src ? { image: absoluteUrl(product.image.src) } : {}),
    ...(product.specs.length
      ? {
          additionalProperty: product.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
        }
      : {}),
  };
}
