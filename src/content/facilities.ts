import type { Facility, Machine } from "./types";
import { images } from "./images";

/** In-house manufacturing machinery (catalogue pages 14-15), in production order. */
export const machines: Machine[] = [
  {
    slug: "cnc-laser-cutting",
    title: "CNC Laser Cutting Machine",
    stage: "Cutting",
    summary: "Fine, burr-free profiles for complex panel parts.",
    description:
      "Our fibre laser cuts CRCA and galvanised sheet straight from the CAD drawing, so meter cut-outs, louvres and complex profiles come out clean, accurate and ready for bending.",
    capabilities: ["Burr-free cut edges", "Complex profiles and cut-outs", "Programmed directly from CAD", "Repeatable across batches"],
    image: images.machineLaser,
  },
  {
    slug: "cnc-punching",
    title: "CNC Punching Machine",
    stage: "Cutting",
    summary: "Accurate, repeatable punching of panel sheets and cut-outs.",
    description:
      "The CNC turret punch handles the holes, knock-outs and cut-outs on every enclosure sheet, so mounting points line up exactly from one panel to the next.",
    capabilities: ["Multi-tool turret", "Holes, knock-outs and louvres", "Consistent hole positions", "High-volume sheet work"],
    image: images.machinePunching,
  },
  {
    slug: "cnc-shearing",
    title: "CNC Shearing Machine",
    stage: "Cutting",
    summary: "Clean, square cuts on CRCA sheet steel for every enclosure.",
    description:
      "Sheets are sheared to size under CNC control, giving square, straight edges that keep doors, covers and frames true when they are formed and assembled.",
    capabilities: ["Square, straight edges", "Sized under CNC control", "CRCA and galvanised sheet", "Minimal material waste"],
    image: images.machineShearing,
  },
  {
    slug: "cnc-bending",
    title: "CNC Bending Machine",
    stage: "Forming",
    summary: "Precise forming of doors, frames and covers.",
    description:
      "Our CNC press brake forms doors, frames, covers and mounting plates to programmed angles, so every enclosure is rigid, square and consistent.",
    capabilities: ["Programmed bend angles", "Full-length segmented tooling", "Doors, frames and covers", "Consistent, rigid enclosures"],
    image: images.machineBending,
  },
  {
    slug: "busbar-processing",
    title: "Busbar Bending, Cutting & Punching Machine",
    stage: "Busbars",
    summary: "Busbars processed in-house to the exact design.",
    description:
      "Copper and aluminium busbars are cut, punched and bent on one machine, so each busbar matches the panel's design and fits without rework on the shop floor.",
    capabilities: ["Cutting, punching and bending in one machine", "Copper and aluminium busbars", "Touchscreen bend programming", "Accurate hole positions for joints"],
    image: images.machineBusbar,
  },
  {
    slug: "cable-tray-perforation",
    title: "Cable Tray Perforation Line",
    stage: "Cable trays",
    summary: "In-house perforation of cable trays in a range of sizes.",
    description:
      "Our perforation press punches galvanised steel strip into perforated cable trays, so we can supply trays in the widths and lengths a project needs.",
    capabilities: ["Perforated cable trays", "Range of widths and lengths", "Galvanised steel strip", "Uniform perforation pattern"],
    image: images.machineCableTray,
  },
  {
    slug: "pre-treatment-plant",
    title: "7-Tank Chemical Pre-Treatment Plant",
    stage: "Finishing",
    summary: "Surface treatment before powder coating for long-lasting adhesion.",
    description:
      "Fabricated parts pass through seven tanks of cleaning, rinsing and chemical treatment before coating, so the powder coat bonds properly and resists corrosion.",
    capabilities: ["Seven-stage dip process", "Cleaning, rinsing and chemical treatment", "Overhead crane handling", "Better adhesion and corrosion resistance"],
    image: images.machinePretreatment,
  },
  {
    slug: "powder-coating-oven",
    title: "Powder Coating Oven",
    stage: "Finishing",
    summary: "Spray booth and curing oven for a durable, even finish.",
    description:
      "After spraying in our powder coating booth, parts are cured in a walk-in oven under controlled temperature, giving a hard, even finish that is then checked for coating thickness.",
    capabilities: ["Walk-in curing oven", "Controlled curing temperature", "Even, durable finish", "Coating thickness inspected"],
    image: images.machineOven,
  },
];

/** Original shop-floor photos of our machines in use. */
export const shopFloorPhotos: Facility[] = [
  { title: "CNC Punching Machine", description: "Programming the CNC punch.", image: images.punching },
  { title: "CNC Shearing Machine", description: "Cutting sheet steel to size.", image: images.shearing },
  { title: "CNC Bending Machine", description: "Forming panel parts.", image: images.bending },
  { title: "Powder Coating System", description: "Coating parts in the spray booth.", image: images.powderCoating },
];

/** In-house panel testing (catalogue pages 16-17). */
export const testingActivities = [
  "Inspection and testing at the plant",
  "Insulation testing up to 1000 megohms",
  "High-voltage test: 2.5 kV for 1 second (50 Hz)",
  "Functional testing and powder coating quality inspection",
  "Aluminium (Al) and copper (Cu) conductivity testing (% IACS)",
  "kWh meter calibration",
  "Primary injection testing up to 4000 A",
  "Secondary injection testing",
  "Switchgear operational testing",
];

export const testPhotos: Facility[] = [
  { title: "ACB Testing", description: "Air circuit breakers checked inside the finished panel.", image: images.testAcb },
  { title: "High-Voltage Testing", description: "Dielectric strength verified before dispatch.", image: images.testHv },
  { title: "Insulation Resistance Testing", description: "Insulation measured on every panel.", image: images.testIr },
  {
    title: "Powder Coating Thickness Inspection",
    description: "Coating thickness checked on enclosure surfaces.",
    image: images.testCoating,
  },
];

export const testEquipment = [
  "High voltage meter",
  "Megger (1000 V)",
  "Multimeter",
  "Tong tester",
  "Clamp meter",
  "kWh meter (load calculation meter)",
  "Digital harmonics measuring meter",
  "Current transformer",
  "Voltage transformer",
  "Analyser",
  "Digital frequency meter",
  "Digital ammeter",
  "Digital voltmeter",
  "Digital power factor meter & controller",
];
