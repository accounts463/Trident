/**
 * Content model. Shapes are deliberately CMS-friendly (flat, slug-keyed,
 * serialisable) so /content can later be replaced by Sanity or Strapi queries
 * without touching components.
 */

/**
 * - "verified": confirmed by Trident Core Energy; always rendered.
 * - "sample": illustrative placeholder; rendered only in development or when
 *   NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true, always with a visible "Sample" badge.
 */
export type ContentStatus = "verified" | "sample";

export type ImageAsset = {
  /** Path under /public or a remote URL allowed in next.config. Omit until real photography exists. */
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  /** Visual tone for the placeholder shown while src is missing. */
  tone?: "panels" | "factory" | "rooftop" | "people" | "landscape";
  /** Interim stock photo; must not be used where the image claims to show the company itself. */
  stock?: boolean;
  /** Where a stock photo came from, for licence records. */
  sourceUrl?: string;
};

export type PostalAddress = {
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
};

export type SocialLink = { label: string; href: string };

export type ImpactMetric = {
  label: string;
  value: number;
  unit: string;
  /** How the number was derived, shown under the metric. */
  basis: string;
};

export type Impact = {
  metrics: ImpactMetric[];
  reportingPeriod: string;
  assumptions: string;
};

export type Certification = {
  name: string;
  issuer: string;
  scope: string;
  /** Link to a downloadable certificate, if published. */
  href?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image?: ImageAsset;
};

export type CalculatorLocation = {
  id: string;
  label: string;
  /** Average generation per installed kW per month (kWh). */
  unitsPerKwPerMonth: number;
};

export type CalculatorAssumptions = {
  /** Grid tariff used to convert a bill to units (currency per kWh). */
  tariffPerUnit: number;
  locations: CalculatorLocation[];
  /** Shadow-free roof area needed per kW (sq ft). */
  roofAreaPerKw: number;
  /** Indicative installed cost per kW, low and high (currency). */
  costPerKwRange: [number, number];
  minSystemKw: number;
  maxSystemKw: number;
  /** Who validated these numbers and when, shown on the page. */
  source: string;
  reviewedOn: string;
};

export type FeatureFlags = {
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
  manufacturing: boolean;
  epc: boolean;
  operationsMaintenance: boolean;
  groundMount: boolean;
  batteryStorage: boolean;
  onGrid: boolean;
  offGrid: boolean;
  hybrid: boolean;
  channelPartners: boolean;
  careers: boolean;
};

export type Company = {
  name: string;
  legalName: string | null;
  tagline: string;
  coreMessage: string;
  description: string;
  announcement: string;
  vision: string;
  mission: string;
  foundedYear: number | null;
  logo: ImageAsset | null;
  contact: {
    /** E.164 format, e.g. +919800000000 */
    phone: string | null;
    phoneDisplay: string | null;
    /** E.164 digits used for wa.me links. */
    whatsapp: string | null;
    email: string | null;
    address: PostalAddress | null;
    hours: string | null;
    /** Google Maps embed URL; loaded only after consent. */
    mapEmbedUrl: string | null;
  };
  socials: SocialLink[];
  /** Cities/regions actually served. Used for location keywords only when filled. */
  serviceAreas: string[];
  features: FeatureFlags;
  impact: Impact | null;
  certifications: Certification[];
  team: TeamMember[];
  calculator: CalculatorAssumptions | null;
};

export type ServiceKey = keyof Pick<
  FeatureFlags,
  "residential" | "commercial" | "industrial" | "manufacturing" | "epc" | "operationsMaintenance"
>;

export type Solution = {
  key: ServiceKey;
  title: string;
  summary: string;
  bullets: string[];
  href: string;
  image: ImageAsset;
};

export type ProductCategory = "Solar Modules" | "Balance of System" | "Inverters" | "Mounting Structures";

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  status: ContentStatus;
  name: string;
  category: ProductCategory;
  summary: string;
  description: string;
  applications: string[];
  specs: ProductSpec[];
  /** Path under /public/documents; omit until the real datasheet exists. */
  datasheet?: string;
  image: ImageAsset;
};

export type ProjectCategory = "Residential" | "Commercial" | "Industrial" | "Utility-Scale";

export type Project = {
  slug: string;
  status: ContentStatus;
  name: string;
  category: ProjectCategory;
  location: string;
  installationType: string;
  /** Verified installed capacity, e.g. "120 kWp". Omit unless verified. */
  capacity?: string;
  completed?: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: ImageAsset;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleCategory = "Solar Basics" | "Residential" | "Manufacturing" | "Planning" | "Maintenance";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  /** ISO date */
  publishedAt: string;
  readingMinutes: number;
  image: ImageAsset;
  sections: ArticleSection[];
};

export type FaqCategory = "General" | "Residential" | "Commercial & Industrial" | "Manufacturing" | "Maintenance";

export type Faq = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export type Download = {
  title: string;
  description: string;
  /** Path under /public/documents */
  file: string;
  fileType: "PDF" | "DOCX" | "XLSX";
  sizeLabel: string;
  category: "Brochure" | "Company Profile" | "Datasheet" | "Certificate";
};
