import type { Product } from "./types";
import { images } from "./images";

const tbc = "To be confirmed";

/**
 * TODO: replace with verified Trident Core Energy information.
 * Sample entries show the page structure only. They contain no specification
 * values and are hidden in production until replaced and marked "verified".
 */
export const products: Product[] = [
  {
    slug: "monocrystalline-solar-module",
    status: "sample",
    name: "Monocrystalline Solar Module",
    category: "Solar Modules",
    summary: "Module series for residential and commercial rooftops.",
    description:
      "Sample product entry. Replace with the verified module series name, technology, power classes and certifications supplied by Trident Core Energy.",
    applications: ["Residential rooftop", "Commercial rooftop"],
    specs: [
      { label: "Cell technology", value: tbc },
      { label: "Power range (Wp)", value: tbc },
      { label: "Module efficiency", value: tbc },
      { label: "Dimensions", value: tbc },
      { label: "Weight", value: tbc },
      { label: "Certifications", value: tbc },
    ],
    image: images.panelsGrass,
  },
  {
    slug: "bifacial-solar-module",
    status: "sample",
    name: "Bifacial Solar Module",
    category: "Solar Modules",
    summary: "Module series for ground-mount and elevated structures.",
    description:
      "Sample product entry. Replace with verified technology, bifaciality, power classes and certifications supplied by Trident Core Energy.",
    applications: ["Ground-mount", "Carports and elevated structures"],
    specs: [
      { label: "Cell technology", value: tbc },
      { label: "Power range (Wp)", value: tbc },
      { label: "Bifaciality", value: tbc },
      { label: "Dimensions", value: tbc },
      { label: "Certifications", value: tbc },
    ],
    image: images.elevatedRows,
  },
  {
    slug: "mounting-structures",
    status: "sample",
    name: "Rooftop Mounting Structures",
    category: "Mounting Structures",
    summary: "Structures for RCC and metal-sheet roofs.",
    description: "Sample product entry. Replace with verified structure types, materials and coatings.",
    applications: ["RCC roofs", "Metal-sheet roofs"],
    specs: [
      { label: "Material", value: tbc },
      { label: "Coating", value: tbc },
      { label: "Roof types", value: tbc },
    ],
    image: images.installerRoof,
  },
];
