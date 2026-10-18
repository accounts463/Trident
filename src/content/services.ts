import type { ProcessStep, Service } from "./types";

/** Contracting services listed in the company catalogue. */
export const services: Service[] = [
  {
    title: "33 kV / 11 kV Substations",
    description: "Turnkey substation works at 33 kV and 11 kV, from design through erection, testing and commissioning.",
    icon: "zap",
  },
  {
    title: "HT / LT Cable SITC",
    description: "Supply, installation, testing and commissioning of HT and LT cabling.",
    icon: "cable",
  },
  {
    title: "HT / LT Panel Installation",
    description: "Installation of HT and LT panels on site by our own trained crews.",
    icon: "layers",
  },
  {
    title: "Electrical Panel SIT",
    description: "Supply, installation and testing of electrical panels, carried out to the same standards as our factory tests.",
    icon: "gauge",
  },
  {
    title: "SITC of LT Transformers",
    description: "Supply, installation, testing and commissioning of LT transformers.",
    icon: "bolt",
  },
  {
    title: "SITC of VCB Panels & RMU",
    description: "Supply, installation, testing and commissioning of VCB panels and ring main units.",
    icon: "cog",
  },
  {
    title: "SITC of Servo Stabilizers",
    description: "Supply, installation, testing and commissioning of servo voltage stabilizers.",
    icon: "sliders",
  },
  {
    title: "Bus Duct / Rising Mains Installation",
    description: "Installation of bus ducts and rising mains in industrial and high-rise buildings.",
    icon: "plug",
  },
  {
    title: "Cable Tray / Raceway Laying",
    description: "Laying of cable tray and raceway systems, with all supports and accessories.",
    icon: "blocks",
  },
  {
    title: "External Lighting Projects",
    description: "External and area lighting projects for campuses, buildings and infrastructure.",
    icon: "lightbulb",
  },
  {
    title: "Operation & Maintenance Contracts",
    description: "Operation and maintenance contracts that keep electrical installations running safely.",
    icon: "wrench",
  },
];

/** The stages named in the catalogue's About Us: design, manufacturing, erection, commissioning and installation. */
export const deliveryProcess: ProcessStep[] = [
  { title: "Design", description: "AutoCAD design to the latest Indian electrical and panel standards." },
  { title: "Manufacturing", description: "In-house CNC fabrication, powder coating and assembly at our Greater Noida plant." },
  { title: "Inspection & Testing", description: "Insulation, high-voltage, functional and injection testing before dispatch." },
  { title: "Erection & Installation", description: "Mechanised erection by well-trained, experienced crews." },
  { title: "Commissioning", description: "Testing and commissioning on site, then handover." },
];

/** Reasons to choose Trident, each grounded in the catalogue. */
export const strengths = [
  {
    title: "Manufacturing since 2010",
    description: "More than a decade of building electrical panels for industry, infrastructure and buildings.",
    icon: "factory",
  },
  {
    title: "ISO 9001:2015 certified",
    description: "A certified quality management system for the manufacture of electrical panels.",
    icon: "award",
  },
  {
    title: "In-house CNC & powder coating",
    description: "Punching, shearing, bending, laser cutting, busbar processing and a 7-tank pre-treatment line under one roof.",
    icon: "cog",
  },
  {
    title: "Tested before dispatch",
    description: "Insulation, high-voltage, primary and secondary injection, and switchgear operation tests at the plant.",
    icon: "gauge",
  },
  {
    title: "Engineers at the helm",
    description: "Our directors are electrical engineers with extensive experience in the electrical industry.",
    icon: "hardhat",
  },
  {
    title: "Turnkey delivery",
    description: "Design, manufacturing, erection, installation and commissioning by one accountable team.",
    icon: "handshake",
  },
] as const;
