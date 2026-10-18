import { NextResponse, type NextRequest } from "next/server";
import { articles } from "@/content/articles";
import { getProducts, getProjects } from "@/lib/content";

/**
 * Dynamic detail pages stream their shell before params resolve, so a late
 * notFound() would answer 200 + noindex. Rejecting unknown slugs here, before
 * rendering, gives crawlers a real 404.
 */
const known: Record<string, Set<string>> = {
  products: new Set(getProducts().map((p) => p.slug)),
  projects: new Set(getProjects().map((p) => p.slug)),
  resources: new Set(articles.map((a) => a.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  // /resources/faqs and /resources/solar-subsidy-guide are static routes and never reach here.
  if (section && slug && known[section] && !known[section].has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:slug", "/projects/:slug", "/resources/:slug((?!faqs$|solar-subsidy-guide$).*)"],
};
