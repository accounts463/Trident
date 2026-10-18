import type { Metadata } from "next";
import { company } from "@/content/company";

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
