import type { Company } from "./types";

/**
 * Single source of truth for company facts.
 *
 * Every `null` or empty array below is a gap that Trident Core Energy must fill.
 * Components hide anything that is empty, so nothing unverified is published.
 * Contact values can also come from env vars (see .env.example).
 */
export const company: Company = {
  name: "Trident Core Energy",
  // TODO: replace with verified Trident Core Energy information (registered legal name)
  legalName: null,
  tagline: "Clean Energy. Smart Engineering. Sustainable Future.",
  coreMessage:
    "Powering a sustainable future through reliable solar technology and responsible energy solutions.",
  description:
    "Trident Core Energy manufactures solar panels and delivers end-to-end solar solutions, from system design and EPC to residential, commercial and industrial installation and long-term operations and maintenance.",
  announcement: "Powering a Cleaner Tomorrow Through Solar Innovation",
  vision:
    "To accelerate the transition towards a cleaner and more sustainable world by making reliable solar energy solutions accessible to communities, businesses, and industries.",
  mission:
    "To deliver dependable solar products and energy solutions through responsible manufacturing, thoughtful engineering, professional execution, and a lasting commitment to environmental sustainability.",
  // TODO: replace with verified Trident Core Energy information
  foundedYear: null,
  // TODO: replace with verified Trident Core Energy information (supply SVG logo in /public/images)
  logo: null,
  contact: {
    // TODO: replace with verified Trident Core Energy information
    phone: null,
    phoneDisplay: null,
    whatsapp: null,
    email: null,
    address: null,
    hours: null,
    mapEmbedUrl: null,
  },
  // TODO: replace with verified Trident Core Energy information, e.g. { label: "LinkedIn", href: "https://..." }
  socials: [],
  // TODO: replace with verified Trident Core Energy information (cities/states served)
  serviceAreas: [],
  features: {
    residential: true,
    commercial: true,
    industrial: true,
    manufacturing: true,
    epc: true,
    operationsMaintenance: true,
    // TODO: confirm with Trident Core Energy whether these are offered
    groundMount: false,
    batteryStorage: false,
    onGrid: true,
    offGrid: false,
    hybrid: false,
    channelPartners: false,
    careers: false,
  },
  // TODO: replace with verified Trident Core Energy information. Shape:
  // { metrics: [{ label, value, unit, basis }], reportingPeriod, assumptions }
  impact: null,
  // TODO: replace with verified Trident Core Energy information
  certifications: [],
  // TODO: replace with verified Trident Core Energy information
  team: [],
  // TODO: replace with validated assumptions before the calculator goes live. Shape:
  // {
  //   tariffPerUnit: number,                         // currency per kWh
  //   locations: [{ id, label, unitsPerKwPerMonth }], // kWh per kW per month
  //   roofAreaPerKw: number,                          // sq ft per kW
  //   costPerKwRange: [low, high],                    // currency per kW
  //   minSystemKw: number, maxSystemKw: number,
  //   source: "Validated by <team>", reviewedOn: "YYYY-MM-DD",
  // }
  calculator: null,
};
