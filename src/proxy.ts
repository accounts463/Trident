import { NextResponse, type NextRequest } from "next/server";
import { getCategories, getProducts, getServicePages } from "@/lib/content";

/**
 * Product, category and service pages stream their shell before params
 * resolve, so a late notFound() would answer 200 + noindex. Rejecting unknown
 * slugs here, before rendering, gives crawlers a real 404.
 */
const knownSlugs: Record<string, Set<string>> = {
  products: new Set([...getProducts().map((p) => p.slug), ...getCategories().map((c) => c.slug)]),
  services: new Set(getServicePages().map((s) => s.page.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (slug && !knownSlugs[section]?.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:slug", "/services/:slug"],
};
