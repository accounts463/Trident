import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/products",
    "/services",
    "/manufacturing",
    "/certifications",
    "/industries",
    "/clients",
    "/contact",
    "/request-quote",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...getProducts().map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), priority: 0.8 })),
  ];
}
