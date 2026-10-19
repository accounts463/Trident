import type { Metadata } from "next";
import { company } from "@/content/company";
import type { Product, ProductCategorySlug } from "@/content/types";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Exclude utility pages (thank-you) from search. */
  noIndex?: boolean;
  /** Path under /public for a page-specific social image; defaults to the site's opengraph-image. */
  image?: string;
};

export function pageMetadata({ title, description, path, noIndex, image }: PageMeta): Metadata {
  const images = image ? [{ url: image }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      type: "website",
      locale: "en_IN",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
      ...(images ? { images } : {}),
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/** Categories made at the Greater Noida plant (the rest are supplied), so "Manufacturer" is accurate. */
const MANUFACTURED: ProductCategorySlug[] = [
  "lt-panels",
  "power-quality",
  "automation-panels",
  "power-distribution",
  "cable-management",
  "earthing",
];
const TITLE_SUFFIX = ` | ${company.name}`;

/** "Power Control Centre (PCC) Manufacturer", when that keyword fits in a ~65-character title. */
export function productSeoTitle(product: Product) {
  const keyword = `${product.name} Manufacturer`;
  const fits = (keyword + TITLE_SUFFIX).length <= 65;
  return MANUFACTURED.includes(product.category) && fits ? keyword : product.name;
}

/** The product summary plus the location, kept within the ~160 characters search results show. */
export function productSeoDescription(product: Product) {
  const where = MANUFACTURED.includes(product.category)
    ? " Made and tested in Greater Noida."
    : " From Trident Core Energy, Greater Noida.";
  const full = product.summary + where;
  return full.length <= 160 ? full : product.summary;
}
