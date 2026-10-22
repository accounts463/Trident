/**
 * Content model. Shapes are deliberately CMS-friendly (flat, slug-keyed,
 * serialisable) so /content can later be replaced by Sanity or Strapi queries
 * without touching components.
 *
 * All copy and figures come from the Trident Core Energy company catalogue.
 * Don't add specifications, ratings or client names that aren't in a
 * company-supplied document.
 */

export type ImageAsset = {
  /** Path under /public. Omit to render a neutral placeholder. */
  src?: string;
  alt: string;
  width?: number;
  height?: number;
};

export type PostalAddress = {
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
};

export type SocialLink = { label: string; href: string };

export type IconKey =
  | "award"
  | "blocks"
  | "bolt"
  | "building"
  | "cable"
  | "cog"
  | "cpu"
  | "factory"
  | "gauge"
  | "graduation"
  | "handshake"
  | "hardhat"
  | "hospital"
  | "layers"
  | "leaf"
  | "lightbulb"
  | "plug"
  | "scale"
  | "shield"
  | "sliders"
  | "train"
  | "users"
  | "wrench"
  | "zap";

export type Certification = {
  slug: string;
  name: string;
  issuer: string;
  /** What the document covers, in the words of the certificate or report. */
  detail: string;
  image: ImageAsset;
};

export type Award = {
  title: string;
  /** Who presented or conferred the award. */
  presentedBy: string;
  description: string;
  image: ImageAsset;
};

export type Value = { title: string; description: string; icon: IconKey };

export type OpeningHours = {
  /** Display label for the open days, e.g. "Monday – Saturday". */
  days: string;
  /** schema.org day names, e.g. ["Monday", "Tuesday"]. */
  dayOfWeek: string[];
  /** 24-hour "HH:MM". */
  opens: string;
  closes: string;
  /** Display label for closed days, e.g. "Sunday". */
  closedDays?: string;
};

export type Company = {
  name: string;
  legalName: string | null;
  /** Primary line used across the site. */
  tagline: string;
  /** Secondary brand lines from the catalogue. */
  slogans: string[];
  description: string;
  foundedYear: number;
  director: { name: string; note: string };
  story: string[];
  whoWeAre: string;
  mission: string;
  vision: string;
  values: Value[];
  principles: string[];
  /** Industries named in the catalogue's About Us. */
  industriesServed: string[];
  contact: {
    /** E.164 format, e.g. +919800000000 */
    phone: string | null;
    phoneDisplay: string | null;
    /** E.164 digits used for wa.me links. */
    whatsapp: string | null;
    email: string | null;
    address: PostalAddress | null;
    /** Published opening hours. Also emitted as openingHoursSpecification. */
    hours: OpeningHours | null;
    /** Map pin for the office. Drives the embed, directions link and schema geo. */
    geo: { latitude: number; longitude: number } | null;
    /**
     * Verified Google Business Profile links. Fill in only after Google verifies the profile.
     * profileUrl: the profile's share link (Maps → Share). reviewUrl: "Ask for reviews" link from the profile.
     */
    googleBusiness: { profileUrl: string | null; reviewUrl: string | null };
  };
  website: string;
  socials: SocialLink[];
  /** Cities/regions actually served. Used for location keywords only when filled. */
  serviceAreas: string[];
  certifications: Certification[];
  awards: Award[];
};

export type ProductCategorySlug =
  | "lt-panels"
  | "power-quality"
  | "automation-panels"
  | "power-distribution"
  | "cable-management"
  | "earthing"
  | "power-conditioning"
  | "accessories";

export type ProductCategory = {
  slug: ProductCategorySlug;
  name: string;
  summary: string;
  image: ImageAsset;
  icon: IconKey;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  category: ProductCategorySlug;
  name: string;
  summary: string;
  description: string[];
  features: string[];
  specs: ProductSpec[];
  /** Short strapline shown above the overview, e.g. "Stable System · Reliable Power · Safe Ground". */
  tagline?: string;
  /** A standard the product is built to, quoted in its own panel. */
  standard?: { title: string; reference: string; text: string };
  /** Variants or items in the range, e.g. bends and reducers for cable trays. */
  range?: { title: string; items: { name: string; image?: ImageAsset }[] };
  applications: string[];
  image: ImageAsset;
  /** The photo shows a Trident panel of a similar type, not this exact product. */
  representativeImage?: boolean;
  /** The images are full photographs (not cut-outs on white), so they fill their frame. */
  photoImages?: boolean;
  gallery?: ImageAsset[];
  /** Featured on the home page. */
  featured?: boolean;
};

export type Service = { title: string; description: string; icon: IconKey };

export type ProcessStep = { title: string; description: string };

export type Sector = {
  slug: string;
  title: string;
  summary: string;
  icon: IconKey;
  /** Completed projects named in the catalogue. */
  references: string[];
};

export type ClientGroup = { title: string; clients: string[] };

/** `fit: "contain"` marks a product cut-out on white rather than a site photo. */
export type Facility = { title: string; description: string; image?: ImageAsset; fit?: "cover" | "contain" };

export type Machine = {
  slug: string;
  title: string;
  /** Production stage the machine belongs to, e.g. "Cutting". */
  stage: string;
  summary: string;
  description: string;
  capabilities: string[];
  image: ImageAsset;
};

export type Faq = { question: string; answer: string };
