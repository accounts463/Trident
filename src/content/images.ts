import type { ImageAsset } from "./types";

/**
 * Photography cropped from the Trident Core Energy company catalogue
 * (public/images/catalog). Alt text describes what is in each photo.
 * To replace a photo, drop a new file in /public/images and update its path here.
 */
function photo(file: string, alt: string): ImageAsset {
  return { src: `/images/catalog/${file}.jpg`, alt };
}

export const images = {
  // Panels
  ltPanel: photo("lt-panel", "Trident main LT control panel with multiple compartments and metering"),
  apfcPanel: photo("apfc-panel", "Automatic power factor correction panel line-up with capacitor feeder modules"),
  drawoutPanel: photo("drawout-panel", "Draw-out type LT panel with withdrawable feeder modules"),
  syncPanel: photo("sync-panel", "DG synchronization panel with breakers and synchronising controllers"),
  amfPanel: photo("amf-panel", "Long AMF and distribution panel line-up with an orange incomer section"),
  mccPccPanel: photo("mcc-pcc-panel", "Motor control centre panel with rows of starter feeders and indicator lamps"),
  plcMccPanel: photo("plc-mcc-panel", "PLC-based MCC panel with an operator touchscreen"),
  ahfSvgPanel: photo("ahf-svg-panel", "AHF and SVG based APFC panel with harmonic filter modules"),
  distributionPanel: photo("thumb-distribution-panel", "Compact distribution panel with indicator lamps"),
  busDuct: photo("bus-duct", "Bus duct section with colour-coded busbars and a rising main trunking"),
  compactSubstation: photo("compact-substation", "Trident compact substation enclosure with blue roof on a factory floor"),

  // Power conditioning
  transformer: photo("transformer", "Oil-cooled distribution transformer with radiator fins"),
  servoStabilizer: photo("servo-stabilizer", "Oil-cooled servo voltage stabilizer on castor wheels"),
  distributionTransformer: photo("thumb-distribution-transformer", "Distribution transformer"),
  onlineUps: photo("thumb-online-ups", "Online UPS cabinets"),
  cvt: photo("thumb-cvt", "Constant voltage transformer (CVT)"),
  oilCooledServo: photo("thumb-oil-cooled-servo", "Three-phase oil-cooled servo stabilizer"),
  isolation: photo("thumb-isolation", "Isolation transformer cabinet"),
  rollingStabilizer: photo("thumb-rolling-stabilizer", "Rolling contact servo voltage stabilizer"),
  airCooledServo: photo("thumb-air-cooled-servo", "Air-cooled servo stabilizer cabinet"),
  avs: photo("thumb-avs", "Automatic voltage stabilizer"),
  variac: photo("thumb-variac", "Variable auto transformers (variacs)"),

  // Cable management
  cableTrayColours: photo("cable-tray-1", "Perforated cable trays powder coated in several colours"),
  cableTrayStack: photo("cable-tray-2", "Stack of galvanised perforated cable trays"),
  ladderTray: photo("cable-tray-3", "Perforated tray beside a ladder-type cable tray"),
  cableTrayBundle: photo("cable-tray-4", "Bundle of galvanised cable trays"),
  trayTypes: photo("cable-tray-5", "Wire-mesh, ladder and perforated cable tray types with fittings"),
  trayFittings: photo("cable-tray-6", "Cable tray bends, tees and reducers"),
  raceway1: photo("raceway-1", "Stack of partitioned raceways"),
  raceway2: photo("raceway-2", "Galvanised raceway sections with knock-outs"),
  raceway3: photo("raceway-3", "Single galvanised raceway section"),
  trayVerticalBend: photo("tray-acc-1", "Ladder tray vertical bends"),
  trayReducer: photo("tray-acc-2", "Perforated tray reducers"),
  trayLadderReducer: photo("tray-acc-3", "Ladder tray reducers"),
  trayTee: photo("tray-acc-4", "Tee bends for perforated and ladder trays"),
  trayHorizontalBend: photo("tray-acc-5", "Horizontal ladder tray bends"),
  trayPerforatedBend: photo("tray-acc-6", "Horizontal perforated tray bends"),

  // Earthing
  earthing: photo("earthing-hero", "Copper earthing electrode installed in soil with cable connections"),
  earthingGi: photo("earthing-gi", "Trident G.I. earthing electrodes in four sizes"),
  earthingCompound: photo("earthing-compound", "Bag of Trident earthing compound"),
  earthingCopper: photo("earthing-copper", "Trident copper earthing electrodes in four sizes"),
  stripCopper: photo("strip-copper", "Coil of copper earthing strip"),
  stripGi: photo("strip-gi", "Galvanised iron earthing strip"),

  // Accessories
  clamp: photo("acc-clamp", "Cable tray joint clamp"),
  jointer: photo("acc-jointer", "Cable tray jointer plates"),
  junctionBox: photo("acc-junction-box", "Galvanised junction box"),
  threadedRod: photo("acc-threaded-rod", "Bundle of threaded rods"),
  cChannel: photo("acc-c-channel", "Slotted C-channel"),
  tamlex: photo("acc-tamlex", "Tamlex support bracket"),
  fastener: photo("acc-fastener", "Anchor fastener"),
  perforatedBend: photo("acc-perforated-bend", "Perforated tray bend"),
  solarStructure: photo("mms-1", "Aluminium module mounting structure installed on a rooftop"),
  solarStructureParts: photo("mms-2", "Galvanised module mounting structure parts"),
  solarChannels: photo("mms-3", "Module mounting channels"),
  solarPurlins: photo("mms-4", "Module mounting purlins"),

  // Facility and testing (company photography)
  bending: photo("fac-bending", "Operators forming sheet metal on a CNC bending machine at the Trident plant"),
  punching: photo("fac-punching", "Engineers programming the CNC punching machine at the Trident plant"),
  powderCoating: photo("fac-powder-coating", "Technician powder coating panel parts in the spray booth"),
  shearing: photo("fac-shearing", "Operators cutting sheet steel on the CNC shearing machine"),
  testAcb: photo("test-acb", "Engineer testing an air circuit breaker inside an LT panel"),
  testHv: photo("test-hv", "High-voltage test being carried out on a panel"),
  testIr: photo("test-ir", "Engineers carrying out insulation resistance testing on a panel"),
  testCoating: photo("test-coating", "Inspector checking powder coating thickness on a panel door"),
  testBench: photo("test-bench", "Trident panel testing bench with meters and switches"),
  testEquipment: [
    photo("test-eq-1", "High-voltage test kit"),
    photo("test-eq-2", "Power quality and harmonics analyser"),
    photo("test-eq-3", "Digital insulation resistance tester"),
    photo("test-eq-4", "Oil test set"),
    photo("test-eq-5", "Hipot test instrument in a carry case"),
    photo("test-eq-6", "Multifunction installation tester"),
  ],

  // Panel gallery
  gallery: [
    photo("gal-1", "Long line-up of motor control panels on the shop floor"),
    photo("gal-17", "Colour-coded PCC line-up with orange, yellow, white and blue sections"),
    photo("gal-2", "Panels with blue, orange and yellow incomer sections"),
    photo("gal-3", "Two open floor-standing panels during assembly"),
    photo("gal-16", "Panel line-up with red mimic diagram and ACB incomers"),
    photo("gal-8", "Rows of finished panels ready for dispatch"),
    photo("gal-13", "Panel room with overhead cable trays"),
    photo("gal-10", "MCC line-up with digital meters and indicator lamps"),
    photo("gal-11", "ACB incomer panel with multiple compartments"),
    photo("gal-12", "Tall feeder panels with withdrawable modules"),
    photo("gal-14", "Panel line-up with metering and selector switches"),
    photo("gal-15", "Front view of a multi-tier feeder panel"),
    photo("gal-7", "Panel fronts with colour-coded feeder doors"),
    photo("gal-9", "Panels in an electrical room with an orange section"),
  ],
  panelLineup: photo("gal-17", "Colour-coded PCC line-up with orange, yellow, white and blue sections"),
  shopFloor: photo("gal-1", "Long line-up of motor control panels on the Trident shop floor"),
  panelRows: photo("gal-8", "Rows of finished panels ready for dispatch"),

  // Company
  adminBlock: photo("admin-block", "Trident Core Energy admin block in Greater Noida"),
  adminOffice: photo("admin-office", "Open-plan office inside the Trident Core Energy admin block"),

  // Certificates
  certIso: photo("cert-iso", "ISO 9001:2015 certificate of registration for Trident Core Energy"),
  certCe: photo("cert-ce", "CE certificate of compliance"),
  certCpri: photo("cert-cpri", "CPRI provisional short-circuit test report for a Trident PCC panel"),
  certApproval: photo("cert-approval", "Approval letter issued to Trident Core Energy, in Hindi"),
} as const;
