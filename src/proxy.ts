import { NextResponse, type NextRequest } from "next/server";
import { getProducts } from "@/lib/content";

/**
 * Product pages stream their shell before params resolve, so a late
 * notFound() would answer 200 + noindex. Rejecting unknown slugs here, before
 * rendering, gives crawlers a real 404.
 */
const knownProducts = new Set(getProducts().map((p) => p.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownProducts.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:slug"],
};
