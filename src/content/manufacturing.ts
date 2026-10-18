import type { ImageAsset } from "./types";

// TODO: confirm with Trident Core operations. Process steps and wording must
// match the actual production line before launch.
export const manufacturingProcess = [
  {
    title: "Solar Cells",
    description: "Incoming cells are inspected and sorted before they enter production.",
  },
  {
    title: "Cell Interconnection",
    description: "Cells are soldered into strings using automated stringing equipment.",
  },
  {
    title: "Module Assembly",
    description: "Strings are laid up with glass, encapsulant and backsheet into the module stack.",
  },
  {
    title: "Lamination",
    description: "Heat and vacuum bond the layers into a single weather-resistant laminate.",
  },
  {
    title: "Testing & Quality Inspection",
    description: "Modules are framed and checked through electrical and visual inspection.",
  },
  {
    title: "Finished Modules",
    description: "Approved modules are labelled, packed and readied for dispatch.",
  },
];

// TODO: confirm with Trident Core operations which checks are performed in-house.
export const qualityChecks = [
  {
    title: "Incoming material inspection",
    description: "Cells, glass, encapsulant and frames are checked against purchase specifications before use.",
  },
  {
    title: "In-process inspection",
    description: "Strings and lay-ups are inspected at defined stages before lamination.",
  },
  {
    title: "Electrical performance testing",
    description: "Each finished module is tested to record its electrical characteristics.",
  },
  {
    title: "Defect imaging",
    description: "Imaging inspection helps detect cell cracks and soldering faults not visible to the eye.",
  },
  {
    title: "Visual and dimensional checks",
    description: "Final inspection of frame, junction box, labelling and appearance before packing.",
  },
];

export const manufacturingHighlights = [
  { title: "Manufacturing facility", description: "Dedicated production floor for module assembly." },
  { title: "Cell & module assembly", description: "Controlled stringing, lay-up and lamination." },
  { title: "Quality inspection & testing", description: "Checks at incoming, in-process and final stages." },
  { title: "Datasheets & specifications", description: "Product documentation for engineers and buyers." },
];

// TODO: replace with real facility photography (see README checklist).
// The gallery renders only the company's own photos (src set, not stock).
export const facilityGallery: ImageAsset[] = [
  { alt: "Solar module production line with automated stringing equipment", tone: "factory" },
  { alt: "Laminator section of the module manufacturing floor", tone: "factory" },
  { alt: "Quality technician reviewing module test results", tone: "people" },
  { alt: "Finished solar modules stacked and packed for dispatch", tone: "panels" },
];
