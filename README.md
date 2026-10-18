# Trident Core Energy — Website

Marketing and lead-generation website for Trident Core Energy (solar panel manufacturing, solar EPC, residential / commercial / industrial installation, O&M).

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
| `npm run dev` | Dev server. Sample content is visible and leads are logged to the terminal when no email/CRM is configured. |
| `npm run build` | Production build (type-checks during build). |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules). |
| `npx tsc --noEmit` | Standalone type-check (run `npx next typegen` first on a fresh clone). |

## Environment variables

See `.env.example` for the full list with comments. The important ones:

| Variable | Required in production | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin for metadata, sitemap, JSON-LD. |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | Yes (or CRM webhook) | Email delivery for both forms. `FROM` must be on a domain verified in Resend. |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` | Optional | JSON POST of every lead. A lead succeeds if email **or** CRM accepts it. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Strongly recommended | Cloudflare Turnstile. Without the secret, verification is skipped (honeypot + rate limit still apply). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4, loaded only after cookie consent. |
| `NEXT_PUBLIC_CONTACT_*`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Fallback contact details if not set in `company.ts`. |
| `NEXT_PUBLIC_SHOW_SAMPLE_CONTENT` | Never in production | Shows sample products/projects on a staging deployment. |

In production, if neither email nor CRM is configured, the API returns an error and the form tells the visitor to try again or call. Form data is never lost on the client.

## Theme and design system

No third-party theme was supplied, so the project ships its own small theme layer, structured so a commercial theme can be dropped in later:

| File | Role |
|---|---|
| `src/theme/theme.css` | **Base theme.** Maps semantic Tailwind tokens (`bg-primary`, `text-muted`, `rounded-card`, …) to CSS variables, base typography, focus styles, reduced-motion rules and component classes (`.container-site`, `.section`, `.card`, `.eyebrow`, `.prose-tc`). |
| `src/theme/theme-overrides.css` | **Brand overrides.** The only place brand values live (`--tc-primary: #14532d`, etc.). Re-skinning = editing this file. |
| `src/app/globals.css` | Imports Tailwind, then the base theme, then overrides. |

Tailwind v4 is configured in CSS (`@theme inline`), which replaces `tailwind.config.ts`.

**Tokens:** Forest Green `#14532D` (primary) · Deep Evergreen `#0B2F24` (bar, footer, dark sections) · Renewable Green `#22C55E` (accents) · Solar Yellow `#FACC15` (CTAs, sparingly) · Soft Background `#F4F8F3` · Charcoal `#1F2937` (text). Muted grey is `#5B6779`, darkened slightly from the brief's `#64748B` so secondary text passes WCAG AA on the soft-green background too.

**Fonts:** Manrope (headings) and Inter (body) via `next/font`.

**Components** (`src/components/ui`): `Button`/`ButtonLink`, `SectionHeading`, `Media` (image or placeholder), `Icon`, `IconFeature`, `ProcessTimeline` (horizontal desktop / vertical mobile), `StatCounter`, `Accordion`, `Breadcrumbs` (+ JSON-LD), `Alert`, form fields (`Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Honeypot`), cards (`ServiceCard`, `ProductCard`, `ProjectCard`, `ArticleCard`, `DownloadCard`), `SampleBadge`, `Logo`.

**Scroll reveals** use CSS scroll-driven animations (`[data-reveal]`, see `theme.css`), so they need no JavaScript and cause no hydration work. Browsers without support, and users with reduced motion, see content immediately.

## Content

All content lives in typed files in `src/content`, shaped so a headless CMS (Sanity/Strapi) can replace them later. Components read content through `src/lib/content.ts`.

| File | Contents |
|---|---|
| `company.ts` | Name, taglines, vision/mission, **contact details**, socials, service areas, **feature flags**, **impact metrics**, certifications, team, **calculator assumptions**. |
| `services.ts` | Solutions, capabilities, process steps, principles, benefits, sustainability pillars. |
| `manufacturing.ts` | Manufacturing process, quality checks, facility gallery. |
| `products.ts`, `projects.ts` | Products and projects (`status: "verified" \| "sample"`). |
| `articles.ts`, `faqs.ts` | Educational articles and FAQs. |
| `downloads.ts` | Real downloadable files in `/public/documents`. |

### Content integrity rules built into the code

- Anything empty or `null` is **not rendered**: contact items, socials, address, map, team, certifications, impact numbers, downloads, calculator.
- Items with `status: "sample"` render only in `next dev` (or with `NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true`), always with a visible "Sample content" badge, and they're excluded from the sitemap and JSON-LD.
- **Projects:** until a verified project exists, the site shows a clearly labelled "Project Capabilities" block instead.
- **Impact in numbers:** renders only with verified values, plus the reporting period and assumptions. Zero or invalid values are dropped.
- **Calculator:** shows a "coming soon + request a quote" state (noindexed, hidden from nav, contact strip and homepage) until `company.calculator` is filled.
- **Downloads:** hidden from nav and the sitemap, and noindexed, while the list is empty.
- **Feature flags** in `company.features` hide whole services and pages (`groundMount`, `batteryStorage`, `offGrid`, `hybrid`, `channelPartners`, `careers`, …).
- Search the codebase for `TODO: replace with verified Trident Core Energy information` (and other `TODO:` notes) to find every gap.

### Images

The site currently uses **interim stock photography** from Unsplash (Unsplash License: free for commercial use, no attribution required). All of it is registered in `src/content/images.ts`, with the source page for each photo for licence records. The images are served through `next/image` (AVIF/WebP, responsive, lazy-loaded) from `images.unsplash.com`, which is allowed in `next.config.ts`.

Rules for stock images:
- Alt text describes what is actually in the photo and never claims it shows Trident Core Energy's own facility, team or projects.
- Slots that must show the company itself ignore stock images. For example, the manufacturing "Inside our facility" gallery stays hidden until real photos with `src` set (and no `stock` flag) are added.
- In development, a small "Stock photo" tag marks each one.

To replace a photo, put the real image in `/public/images`, then point the slot at it, e.g. `{ src: "/images/hero.jpg", alt: "…" }`, without `stock: true`. Slots with no `src` fall back to a CSS placeholder.

## Forms and API

- **Enquiry form** (`/contact`, `/solutions`, audience pages, manufacturing bulk enquiry) → `POST /api/enquiry`.
- **Quote form** (`/request-quote`, three steps, per-step validation, values kept across steps, `?type=` preselect) → `POST /api/quote`.
- Shared Zod schemas in `src/lib/schemas.ts` validate on both client and server.
- Server pipeline (`src/lib/server/handle-lead.ts`): body-size check → per-IP rate limit (5 per 10 min) → honeypot (silent success) → Zod → Turnstile → sanitise → Resend email and/or CRM webhook.
- The rate limiter is in-memory, per instance. For strict global limits, add a Vercel Firewall rate-limit rule or a shared store (e.g. Upstash Redis).
- Success redirects to `/thank-you`, which includes the fraud-awareness reminder.

## SEO

- Per-page metadata via `pageMetadata()` (`src/lib/seo.ts`): title template, description, canonical URL, Open Graph, Twitter.
- JSON-LD (`src/lib/jsonld.tsx`): Organization (always), LocalBusiness (only when an address is supplied), BreadcrumbList (every inner page), FAQPage, Article, Product (verified products only).
- `src/app/sitemap.ts` lists only live pages and verified items. `src/app/robots.ts` blocks indexing on Vercel preview deployments.
- Location keywords: add served locations to `company.serviceAreas` (used in LocalBusiness `areaServed`). Don't add city pages for areas not served.

## Accessibility and performance

- Skip link, landmarks, one H1 per page, visible focus rings (yellow on dark sections), keyboard-operable dropdowns (Escape, outside click), a focus-trapped mobile drawer, form errors linked via `aria-describedby`, focus moved to step headings and error summaries, `aria-live` result counts.
- Static prerendering for every page. Client JavaScript only for interactive parts (nav, forms, filters, FAQ search, consent, calculator). No sliders or autoplay video.
- Checked at 360 / 768 / 1440 px with no horizontal overflow. Run Lighthouse against `npm run build && npm start` before launch.

## Deployment (Vercel)

1. Push the repo and import it in Vercel (framework auto-detected).
2. Add environment variables for Production (and Preview if needed).
3. Verify your sending domain in Resend, and create a Turnstile widget for the production domain.
4. Deploy. `robots.ts` keeps preview deployments out of search engines automatically.

## Checklist: facts and assets Trident Core Energy must supply

**Brand**
- [ ] Logo (SVG, light and dark versions) → `company.logo`
- [ ] Registered legal name, founding year
- [ ] Favicon / app icon, Open Graph share image (1200×630)

**Contact**
- [ ] Official phone (and display format), WhatsApp number, email
- [ ] Registered or office address, business hours, Google Maps embed URL
- [ ] Social profile URLs
- [ ] Cities/states served

**Services**
- [ ] Confirm feature flags: ground-mount, battery storage, off-grid, hybrid, channel partners, careers
- [ ] Confirm service scope wording in `services.ts`

**Manufacturing**
- [ ] Confirm process steps and quality checks with operations (`manufacturing.ts`)
- [ ] Product range: names, technology, power classes, specifications
- [ ] Datasheets (PDF) → `/public/documents`
- [ ] Certifications and standards (name, issuer, scope, certificate files)

**Proof**
- [ ] Verified projects: name, category, location, installation type, capacity (only if verified), challenge / solution / outcome, photos
- [ ] Impact metrics with basis, reporting period and assumptions
- [ ] Team members (optional)
- [ ] Company profile and brochure PDFs

**Calculator** (required before it goes live)
- [ ] Tariff per unit, generation per kW per month by location type, roof area per kW, cost range per kW, min/max system size, who validated them and when

**Legal**
- [ ] Legal review of the Privacy Policy and Terms
- [ ] Review of articles, FAQs and the subsidy guide

**Photography needed** (realistic, natural light; one image per slot). Stock images currently fill these slots, except the facility gallery. Replace them with the company's own photos before launch:

| Section | Shot |
|---|---|
| Home hero | Wide solar farm or industrial rooftop, golden hour |
| Home about / About page | Engineers at the facility or on site |
| Solutions cards (×6) | Home rooftop, commercial roof, industrial roof, manufacturing line, engineers reviewing a layout, panel cleaning |
| Manufacturing showcase and page | Production line, stringer, laminator, QC testing, packed modules (facility gallery ×4) |
| Project capabilities (×4) | Residential, commercial, industrial, ground-mounted |
| Sustainability | Panels in a green landscape, close-up of a module surface |
| Articles (×6) | One topical image per article |
| Products | Product photography per module or product |
