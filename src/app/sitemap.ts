import type { MetadataRoute } from "next";
import { getCategories, getProducts, getServicePages } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

// Build time: content only changes with a deploy.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/products",
    "/services",
    "/manufacturing",
    "/machinery",
    "/certifications",
    "/industries",
    "/clients",
    "/contact",
    "/request-quote",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p === "/privacy-policy" || p === "/terms" ? 0.3 : 0.7,
    })),
    ...getCategories().map((c) => ({
      url: absoluteUrl(`/products/${c.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getServicePages().map((s) => ({
      url: absoluteUrl(`/services/${s.page.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getProducts().map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      // Image sitemap entries help product photos appear in image search.
      images: [p.image.src, ...(p.gallery ?? []).map((g) => g.src)].filter((s): s is string => !!s).map((s) => absoluteUrl(s)),
    })),
  ];
}
