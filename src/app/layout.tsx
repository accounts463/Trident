import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { company } from "@/content/company";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { ContactStrip } from "@/components/layout/ContactStrip";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const heading = Archivo({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Electrical Panel Manufacturer`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  openGraph: { siteName: company.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1628",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col pb-16 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <ContactStrip />
        <ConsentBanner />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
