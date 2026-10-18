import type { Facility } from "./types";
import { images } from "./images";

/** In-house manufacturing machinery (catalogue pages 14-15). */
export const machines: Facility[] = [
  {
    title: "CNC Punching Machine",
    description: "Accurate, repeatable punching of panel sheets and cut-outs.",
    image: images.punching,
  },
  {
    title: "CNC Shearing Machine",
    description: "Clean, square cuts on CRCA sheet steel for every enclosure.",
    image: images.shearing,
  },
  {
    title: "CNC Bending Machine",
    description: "Precise forming of doors, frames and covers.",
    image: images.bending,
  },
  {
    title: "Powder Coating System",
    description: "Spray booth and powder coating oven for a durable, even finish.",
    image: images.powderCoating,
  },
  { title: "CNC Laser Cutting Machine", description: "Fine, burr-free profiles for complex panel parts." },
  { title: "Busbar Bending, Cutting & Punching Machine", description: "Busbars processed in-house to the exact design." },
  { title: "Cable Tray Perforation Line", description: "In-house perforation of cable trays in a range of sizes." },
  { title: "7-Tank Chemical Pre-Treatment Plant", description: "Surface treatment before powder coating for long-lasting adhesion." },
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
