import type { Project, ProjectCategory, ImageAsset } from "./types";
import { images } from "./images";

/**
 * TODO: replace with verified Trident Core Energy information.
 * Sample projects contain no client names or capacities and are hidden in
 * production. Add real projects with status "verified"; include `capacity`
 * only when it is verified.
 */
export const projects: Project[] = [
  {
    slug: "sample-residential-rooftop",
    status: "sample",
    name: "Sample Residential Rooftop",
    category: "Residential",
    location: "City, State",
    installationType: "Rooftop, on-grid",
    summary: "Sample entry showing how a residential project will be presented.",
    challenge: "Describe the homeowner's goal and site constraints, such as roof space or shading.",
    solution: "Describe the system design, components and installation approach.",
    outcome: "Describe verified results only, such as commissioning date and handover.",
    image: images.tiledRooftop,
  },
  {
    slug: "sample-commercial-rooftop",
    status: "sample",
    name: "Sample Commercial Rooftop",
    category: "Commercial",
    location: "City, State",
    installationType: "Rooftop, on-grid",
    summary: "Sample entry showing how a commercial project will be presented.",
    challenge: "Describe the business's energy demand and operational constraints.",
    solution: "Describe the system design and how installation was phased around operations.",
    outcome: "Describe verified results only.",
    image: images.commercialRoofRows,
  },
  {
    slug: "sample-industrial-plant",
    status: "sample",
    name: "Sample Industrial Plant",
    category: "Industrial",
    location: "City, State",
    installationType: "Industrial rooftop",
    summary: "Sample entry showing how an industrial project will be presented.",
    challenge: "Describe the facility's load profile and structural considerations.",
    solution: "Describe engineering, protection and grid integration.",
    outcome: "Describe verified results only.",
    image: images.industrialRoof,
  },
];

export const projectCategories: ProjectCategory[] = ["Residential", "Commercial", "Industrial", "Utility-Scale"];

/** Shown instead of the project grid until verified projects exist. */
export const projectCapabilities: { category: ProjectCategory; title: string; description: string; image: ImageAsset }[] = [
  {
    category: "Residential",
    title: "Home rooftop systems",
    description: "Systems for independent houses and villas, sized to household consumption.",
    image: images.tiledRooftop,
  },
  {
    category: "Commercial",
    title: "Commercial rooftops",
    description: "Systems for offices, schools, hospitals and retail that offset daytime demand.",
    image: images.commercialRoof,
  },
  {
    category: "Industrial",
    title: "Industrial and captive solar",
    description: "Larger systems for factories and warehouses, engineered for safety and high loads.",
    image: images.industrialRoof,
  },
  {
    category: "Utility-Scale",
    title: "Ground-mounted plants",
    description: "Ground-mounted plants for larger energy requirements, subject to project feasibility.",
    image: images.groundMountPlant,
  },
];
