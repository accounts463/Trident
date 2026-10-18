# Trident Core Energy — Website

Marketing and lead-generation website for Trident Core Energy, an ISO 9001:2015 certified manufacturer of LT electrical panels, compact substations, bus ducts, cable trays and earthing systems in Greater Noida, and an electrical contractor (substations, HT/LT installation, O&M).

All copy, specifications, client names and photography come from the company catalogue (`TRIDENT.pdf`).

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 · React Hook Form + Zod · Lucide icons · Resend.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server. Leads are logged to the terminal when no email/CRM is configured. |
| `npm run build` | Production build (type-checks during build). |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules). |
| `npx tsc --noEmit` | Standalone type-check (run `npx next typegen` first on a fresh clone). |

## Pages

| Route | Content |
|---|---|
| `/` | Hero, client strip, about, product categories, featured products, compact substation spotlight, manufacturing, services, delivery process, strengths, sectors, certifications, FAQs |
| `/about` | Story, director, mission & vision, values, principles, industries |
| `/products`, `/products/[slug]` | 8 categories, 24 product pages with specifications, ranges and related products |
| `/services` | 11 contracting services and the delivery process |
| `/manufacturing` | CNC machinery, testing activities, test equipment, shop-floor gallery |
| `/certifications` | ISO 9001:2015, CE certificate of compliance, CPRI short-circuit test report |
| `/industries` | Sectors served with project references |
| `/clients` | Client names by sector |
| `/contact`, `/request-quote`, `/thank-you`, `/privacy-policy`, `/terms` | Utility pages |

URLs from the earlier solar site (`/solutions`, `/projects`, `/resources`, `/sustainability`, `/solar-calculator`, …) permanently redirect to their nearest equivalent (`next.config.ts`).

## Environment variables

See `.env.example`. The important ones:

| Variable | Required in production | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin for metadata, sitemap, JSON-LD (e.g. `https://www.tridentcoreenergy.com`). |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | Yes (or CRM webhook) | Email delivery for both forms. `FROM` must be on a domain verified in Resend. |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` | Optional | JSON POST of every lead. A lead succeeds if email **or** CRM accepts it. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Strongly recommended | Cloudflare Turnstile. Without the secret, verification is skipped (honeypot + rate limit still apply). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4, loaded only after cookie consent. |

In production, if neither email nor CRM is configured, the API returns an error and the form tells the visitor to try again or call. Form data is never lost on the client.

## Theme and design system

| File | Role |
|---|---|
| `src/theme/theme.css` | Base theme: maps semantic Tailwind tokens (`bg-primary`, `bg-navy`, `text-accent`, `rounded-card`, …) to CSS variables, plus component classes (`.container-site`, `.section`, `.card`, `.eyebrow`, `.slash`, `.grid-lines`, marquee). |
| `src/theme/theme-overrides.css` | Brand values only. Re-skinning = editing this file. |

**Tokens (sampled from the logo):** Trident Blue `#2D4E9E` (primary) · Deep Navy `#0D1730` (top bar, footer, dark sections) · Signal Red `#E01F26` (CTAs, highlights) · Soft Red `#FF6B70` (small text on navy) · Canvas `#F3F5F9` · Charcoal `#161D2B`. The red/blue diagonal "slash" motif comes from the catalogue.

**Fonts:** Archivo (headings) and Inter (body) via `next/font`.

**Logo:** the Trident mark is an inline SVG traced from the official artwork (`LogoMark` in `src/components/ui/Logo.tsx`); the wordmark is live text. Logo colours live in `src/theme/theme-overrides.css` as `--tc-brand-*`. The full stacked logo is `public/images/logo.png` (used in JSON-LD). `src/app/icon.png`, `apple-icon.png` and `opengraph-image.jpg` are generated from the same artwork. Replace them with vector originals when available.

## Content

All content lives in typed files in `src/content` (CMS-friendly shapes); components read it through `src/lib/content.ts`.

| File | Contents |
|---|---|
| `company.ts` | Name, slogans, story, mission/vision, values, principles, director, **contact details**, certifications |
| `products.ts` | Product categories and 24 products (description, features, specs, ranges, applications, images) |
| `services.ts` | Contracting services, delivery process, strengths |
| `facilities.ts` | Machinery, testing activities, test equipment |
| `clients.ts` | Sectors with project references, client groups, home-page client strip |
| `faqs.ts` | FAQs (answers limited to catalogue facts) |
| `images.ts` | Registry of catalogue photography in `public/images/catalog` |

Rules:
- Only publish specifications, ratings and client names that appear in a company-supplied document.
- Products whose photo shows a similar Trident panel rather than the exact product set `representativeImage: true`; the product page then captions it.
- Client names are shown as text, not logos, so no third-party trademarks are reproduced.
- Empty contact fields (e.g. WhatsApp, hours) are not rendered.

## Forms and API

- **Enquiry form** (`/contact`, `/services`) → `POST /api/enquiry`.
- **Quote form** (`/request-quote`, three steps, per-step validation) → `POST /api/quote`. Preselect with `?type=panels|distribution|cable-management|earthing|power-conditioning|contracting` or `?product=<slug>` (fills the product name and requirement).
- Shared Zod schemas in `src/lib/schemas.ts` validate on both client and server.
- Server pipeline (`src/lib/server/handle-lead.ts`): body-size check → per-IP rate limit (5 per 10 min) → honeypot → Zod → Turnstile → sanitise → Resend email and/or CRM webhook.

## SEO

- Per-page metadata via `pageMetadata()` (`src/lib/seo.ts`); product pages use their own photo as the share image.
- JSON-LD: Organization, LocalBusiness (Greater Noida address), BreadcrumbList, FAQPage, Product (with specifications as `additionalProperty`).
- `sitemap.ts` lists every page and product. `robots.ts` blocks indexing on Vercel preview deployments. `proxy.ts` returns a real 404 for unknown product slugs.

## Checklist: still to confirm with Trident Core Energy

- [ ] Registered legal name (footer, JSON-LD) → `company.legalName`
- [ ] WhatsApp number and business hours, if they should be published
- [ ] Social profile URLs
- [ ] Vector logo (SVG) to replace the raster cut-outs
- [ ] Datasheets or the catalogue PDF (compressed) for download
- [ ] Legal review of the Privacy Policy and Terms
- [ ] Production env vars: `NEXT_PUBLIC_SITE_URL`, Resend (or CRM), Turnstile
