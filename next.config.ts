import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Pages from the earlier solar-focused site, sent to their nearest equivalent.
  async redirects() {
    return [
      { source: "/solutions", destination: "/services", permanent: true },
      { source: "/solutions/:path*", destination: "/services", permanent: true },
      { source: "/projects", destination: "/industries", permanent: true },
      { source: "/projects/:path*", destination: "/industries", permanent: true },
      { source: "/sustainability", destination: "/about", permanent: true },
      { source: "/resources", destination: "/products", permanent: true },
      { source: "/resources/faqs", destination: "/products#faqs", permanent: true },
      { source: "/resources/:path*", destination: "/products", permanent: true },
      { source: "/solar-calculator", destination: "/request-quote", permanent: true },
      { source: "/downloads", destination: "/products", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/channel-partners", destination: "/contact", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
