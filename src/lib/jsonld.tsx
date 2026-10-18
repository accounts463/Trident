import { company } from "@/content/company";
import type { Article, Faq, Product } from "@/content/types";
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
    ...(company.logo?.src ? { logo: absoluteUrl(company.logo.src) } : {}),
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
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      ...(contact.phone ? { telephone: contact.phone } : {}),
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

export function articleJsonLd(article: Article): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    mainEntityOfPage: absoluteUrl(`/resources/${article.slug}`),
    author: { "@type": "Organization", name: company.name },
    publisher: { "@id": `${siteUrl}/#organization` },
    ...(article.image.src ? { image: absoluteUrl(article.image.src) } : {}),
  };
}

export function productJsonLd(product: Product): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: product.category,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${siteUrl}/#organization` },
    url: absoluteUrl(`/products/${product.slug}`),
    ...(product.image.src ? { image: absoluteUrl(product.image.src) } : {}),
  };
}
