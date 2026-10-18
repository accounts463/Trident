import { articles } from "@/content/articles";
import { company } from "@/content/company";
import { downloads } from "@/content/downloads";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { solutions } from "@/content/services";
import type { ContentStatus } from "@/content/types";

/**
 * Sample content renders in development, or on staging when
 * NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true. Production builds only show verified entries.
 */
export const showSampleContent =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_SAMPLE_CONTENT === "true";

export function isVisible(item: { status: ContentStatus }) {
  return item.status === "verified" || showSampleContent;
}

export function getSolutions() {
  return solutions.filter((s) => company.features[s.key]);
}

export function getProducts() {
  return company.features.manufacturing ? products.filter(isVisible) : [];
}

export function getProduct(slug: string) {
  return getProducts().find((p) => p.slug === slug);
}

export function getProjects() {
  return projects.filter(isVisible);
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

export function getArticles() {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getDownloads() {
  return downloads;
}

export const calculatorLive = company.calculator !== null;
export const hasDownloads = downloads.length > 0;

function clean(value: string | null | undefined) {
  const v = value?.trim();
  return v ? v : null;
}

/** Contact details from company.ts, falling back to public env vars. Null means "do not render". */
export function getContact() {
  const c = company.contact;
  const phone = clean(c.phone) ?? clean(process.env.NEXT_PUBLIC_CONTACT_PHONE);
  const whatsapp = clean(c.whatsapp) ?? clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
  return {
    phone,
    phoneDisplay: clean(c.phoneDisplay) ?? clean(process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY) ?? phone,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null,
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : null,
    email: clean(c.email) ?? clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    address: c.address,
    hours: clean(c.hours),
    mapEmbedUrl: clean(c.mapEmbedUrl),
  };
}

export type Contact = ReturnType<typeof getContact>;

export function formatAddress(a: NonNullable<Contact["address"]>) {
  return [a.streetAddress, a.locality, `${a.region} ${a.postalCode}`.trim(), a.country].filter(Boolean).join(", ");
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
