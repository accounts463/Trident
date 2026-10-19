import { company } from "@/content/company";
import { productCategories, products } from "@/content/products";
import type { ProductCategorySlug } from "@/content/types";

export function getCategories() {
  return productCategories.filter((c) => products.some((p) => p.category === c.slug));
}

export function getProducts(category?: ProductCategorySlug) {
  return category ? products.filter((p) => p.category === category) : products;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const product = getProduct(slug);
  if (!product) return [];
  const sameCategory = products.filter((p) => p.category === product.category && p.slug !== slug);
  const others = products.filter((p) => p.category !== product.category && p.featured);
  return [...sameCategory, ...others].slice(0, limit);
}

/** Pre-filled first message when a visitor opens a WhatsApp chat. */
const WHATSAPP_GREETING = `Hello ${company.name}, I'd like to enquire about your products and services.`;

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
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_GREETING)}` : null,
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
