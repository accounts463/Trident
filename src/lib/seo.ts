import type { Metadata } from "next";
import { company } from "@/content/company";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Exclude utility pages (thank-you, coming-soon) from search. */
  noIndex?: boolean;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, noIndex, type = "website" }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
