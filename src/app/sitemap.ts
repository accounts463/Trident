import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { calculatorLive, getArticles, getProducts, getProjects, hasDownloads } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const f = company.features;
  const staticPaths = [
    "/",
    "/about",
    ...(f.manufacturing ? ["/manufacturing"] : []),
    "/solutions",
    ...(f.residential ? ["/solutions/residential"] : []),
    ...(f.commercial || f.industrial ? ["/solutions/commercial-industrial"] : []),
    ...(getProducts().length ? ["/products"] : []),
    "/projects",
    "/sustainability",
    "/resources",
    "/resources/faqs",
    "/resources/solar-subsidy-guide",
    ...(calculatorLive ? ["/solar-calculator"] : []),
    ...(hasDownloads ? ["/downloads"] : []),
    "/contact",
    "/request-quote",
    "/privacy-policy",
    "/terms",
    ...(f.channelPartners ? ["/channel-partners"] : []),
    ...(f.careers ? ["/careers"] : []),
  ];

  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...getProducts()
      .filter((p) => p.status === "verified")
      .map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), priority: 0.6 })),
    ...getProjects()
      .filter((p) => p.status === "verified")
      .map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), priority: 0.6 })),
    ...getArticles().map((a) => ({ url: absoluteUrl(`/resources/${a.slug}`), lastModified: a.publishedAt, priority: 0.6 })),
  ];
}
