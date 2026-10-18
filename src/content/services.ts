import type { ServiceKey, Solution } from "./types";
import { images } from "./images";

// TODO: confirm service scope wording with Trident Core Energy before launch.
export const solutions: Solution[] = [
  {
    key: "residential",
    title: "Residential Solar",
    summary:
      "Rooftop systems designed around your home's consumption, roof and budget, installed with care and supported long after commissioning.",
    bullets: ["Site survey and shading review", "System sizing from your electricity bills", "Clean, safe rooftop installation"],
    href: "/solutions/residential",
    image: images.homeRooftop,
  },
  {
    key: "commercial",
    title: "Commercial Solar",
    summary:
      "Rooftop solar for offices, retail, hospitals and institutions, planned to offset daytime demand without disrupting operations.",
    bullets: ["Load and tariff analysis", "Structural and safety assessment", "Phased installation planning"],
    href: "/solutions/commercial-industrial",
    image: images.commercialRoofRows,
  },
  {
    key: "industrial",
    title: "Industrial Solar",
    summary:
      "Larger rooftop and captive systems for factories and warehouses, engineered for high loads, safety compliance and long service life.",
    bullets: ["Detailed engineering and design", "Grid integration and protection", "Performance monitoring setup"],
    href: "/solutions/commercial-industrial",
    image: images.industrialRoof,
  },
  {
    key: "manufacturing",
    title: "Solar Panel Manufacturing",
    summary:
      "In-house module manufacturing with controlled processes and quality inspection, supplying projects and bulk procurement partners.",
    bullets: ["Module assembly and lamination", "Quality inspection and testing", "Bulk and project supply"],
    href: "/manufacturing",
    image: images.technicianModule,
  },
  {
    key: "epc",
    title: "Solar EPC",
    summary:
      "Engineering, procurement and construction under one accountable team, from feasibility to commissioning and handover.",
    bullets: ["Feasibility and design", "Procurement and logistics", "Construction and commissioning"],
    href: "/solutions",
    image: images.engineerUnderArray,
  },
  {
    key: "operationsMaintenance",
    title: "Operations & Maintenance",
    summary:
      "Planned cleaning, inspection and monitoring that help your system keep performing as designed throughout its working life.",
    bullets: ["Scheduled cleaning and inspection", "Performance monitoring", "Fault diagnosis and repair"],
    href: "/solutions#operations-maintenance",
    image: images.panelCleaning,
  },
];

export const capabilities: { key: ServiceKey | "design"; label: string; icon: CapabilityIcon }[] = [
  { key: "manufacturing", label: "Solar Panel Manufacturing", icon: "factory" },
  { key: "design", label: "System Design & Engineering", icon: "ruler" },
  { key: "epc", label: "Solar EPC Solutions", icon: "hardhat" },
  { key: "residential", label: "Residential & Commercial Installation", icon: "home" },
  { key: "operationsMaintenance", label: "Operations & Maintenance", icon: "wrench" },
];

export type CapabilityIcon = "factory" | "ruler" | "hardhat" | "home" | "wrench";

export const solarProcess = [
  {
    title: "Consultation & Site Assessment",
    description: "We review your energy use, visit the site and assess roof or land condition, orientation and shading.",
  },
  {
    title: "System Design & Planning",
    description: "Our engineers size the system, select components and prepare layouts, approvals and an installation plan.",
  },
  {
    title: "Installation & Commissioning",
    description: "Trained crews install, test and commission the system safely, then walk you through how it works.",
  },
  {
    title: "Monitoring & Maintenance",
    description: "Ongoing monitoring and scheduled maintenance help keep the system performing as designed.",
  },
];

export const principles = [
  { title: "Sustainability First", description: "Every decision weighs long-term environmental impact alongside performance." },
  { title: "Engineering Excellence", description: "Careful design, sound components and disciplined execution on every project." },
  { title: "Long-Term Reliability", description: "Systems built to keep delivering clean energy year after year." },
];

export const benefits = [
  {
    title: "Integrated Solar Capabilities",
    description: "Manufacturing, engineering, installation and maintenance under one roof, with one point of accountability.",
    icon: "layers",
  },
  {
    title: "Quality-Focused Engineering",
    description: "Designs and components chosen for safety, durability and real-world performance.",
    icon: "shield",
  },
  {
    title: "Solutions Tailored to Your Needs",
    description: "Every system is sized around your consumption, site conditions and goals.",
    icon: "sliders",
  },
  {
    title: "Transparent Project Communication",
    description: "Clear proposals, realistic timelines and regular updates from survey to handover.",
    icon: "message",
  },
  {
    title: "Reliable Installation Practices",
    description: "Trained crews following documented safety and installation procedures.",
    icon: "hardhat",
  },
  {
    title: "Long-Term Service Support",
    description: "Monitoring and maintenance support that continues well beyond commissioning.",
    icon: "wrench",
  },
] as const;

export const sustainabilityPillars = [
  {
    title: "Renewable Energy Adoption",
    description: "Helping homes, businesses and industries move their daily energy use to clean solar power.",
    icon: "sun",
  },
  {
    title: "Responsible Resource Management",
    description: "Using materials carefully in manufacturing and handling waste and packaging responsibly.",
    icon: "recycle",
  },
  {
    title: "Energy Efficiency",
    description: "Designing systems that make the most of every square metre of roof or land.",
    icon: "zap",
  },
  {
    title: "Long-Term Environmental Stewardship",
    description: "Building systems for long service lives and planning for responsible end-of-life handling.",
    icon: "leaf",
  },
] as const;
