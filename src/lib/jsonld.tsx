import { company } from "@/content/company";
import { images } from "@/content/images";
import type { Faq, Product, Service } from "@/content/types";
import { getCategories, getContact } from "@/lib/content";
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

/** WebSite entity, so search engines associate the site name with the domain. */
export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: company.name,
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function organizationJsonLd(): JsonLdObject[] {
  const contact = getContact();
  // The verified Google Business Profile ties the site to the Maps listing.
  const sameAs = [...company.socials.map((s) => s.href), contact.googleProfileHref].filter((s): s is string => !!s);
  const a = contact.address;
  const postalAddress = a && {
    "@type": "PostalAddress",
    streetAddress: a.streetAddress,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: "IN",
  };
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
    ...(postalAddress ? { address: postalAddress } : {}),
    ...(contact.phone || contact.email
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            areaServed: "IN",
            ...(contact.phone ? { telephone: contact.phone } : {}),
            ...(contact.email ? { email: contact.email } : {}),
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    // Product lines, so the company is associated with what it makes.
    knowsAbout: getCategories().map((c) => c.name),
  };

  // LocalBusiness only when a verified address exists.
  if (!a || !postalAddress) return [org];
  return [
    org,
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: company.name,
      url: siteUrl,
      // Real plant and office photos; Google uses these for the business entity.
      image: [images.adminBlock, images.adminOffice, images.panelLineup, images.bending].map((img) => absoluteUrl(img.src)),
      logo: absoluteUrl("/images/logo.png"),
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      ...(contact.phone ? { telephone: contact.phone } : {}),
      ...(contact.email ? { email: contact.email } : {}),
      description: company.description,
      address: postalAddress,
      ...(sameAs.length ? { sameAs } : {}),
      ...(contact.geo
        ? {
            geo: { "@type": "GeoCoordinates", latitude: contact.geo.latitude, longitude: contact.geo.longitude },
            hasMap: `https://www.google.com/maps/search/?api=1&query=${contact.geo.latitude},${contact.geo.longitude}`,
          }
        : {
            hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              [a.streetAddress, a.locality, a.region, a.postalCode].join(", "),
            )}`,
          }),
      ...(contact.hours
        ? {
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: contact.hours.dayOfWeek,
              opens: contact.hours.opens,
              closes: contact.hours.closes,
            },
          }
        : {}),
      areaServed: company.serviceAreas.length ? company.serviceAreas : { "@type": "Country", name: "India" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Electrical products and services",
        itemListElement: getCategories().map((c) => ({
          "@type": "OfferCatalog",
          name: c.name,
          url: absoluteUrl(`/products#${c.slug}`),
        })),
      },
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

/** Contracting services, each provided by the organization. */
export function servicesJsonLd(services: Service[]): JsonLdObject[] {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    serviceType: s.title,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: company.serviceAreas.length ? company.serviceAreas : { "@type": "Country", name: "India" },
    url: absoluteUrl("/services"),
  }));
}
