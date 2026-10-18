import type { ImageAsset } from "./types";

/**
 * Photography from the Trident Core Energy company catalogue and original
 * shop-floor photos (public/images/catalog). Alt text describes what is in each photo.
 * To replace a photo, drop a new file in /public/images and update its path here.
 */
function photo(file: string, alt: string): ImageAsset {
  return { src: `/images/catalog/${file}.jpg`, alt };
}

/** Original shop-floor photography of Trident panels. */
const panels = {
  mccLineupLong: photo("mcc-lineup-long", "Long line-up of motor control panels on the Trident shop floor"),
  mimicLineupAcb: photo("mimic-lineup-acb", "Panel line-up with red mimic diagram, ACB incomers and indicator lamps"),
  incomerColourPanels: photo("incomer-colour-panels", "Panels with blue, orange and yellow incomer sections"),
  pccColourLineup: photo("pcc-colour-lineup", "Colour-coded PCC line-up with green, blue, red and orange sections"),
  pccColourSections: photo("pcc-colour-sections", "PCC panels with red, blue, yellow and orange incomer doors"),
  colourFeederDoors: photo("colour-feeder-doors", "Panel fronts with colour-coded feeder doors"),
  acbFeederPanel: photo("acb-feeder-panel", "ACB incomer and feeder panel with an operator display"),
  panelRoomColour: photo("panel-room-colour", "Finished panels in a room with orange and yellow sections"),
  colourLineupPerspective: photo("colour-lineup-perspective", "Long panel line-up with colour-coded incomer sections"),
  litLineupLong: photo("lit-lineup-long", "Long MCC line-up with indicator lamps lit during testing"),
  litPanels: photo("lit-panels", "Panels with indicator lamps lit during functional testing"),
  acbPanelsPair: photo("acb-panels-pair", "Two ACB incomer panels side by side"),
  panelRowAcb: photo("panel-row-acb", "Row of panels with ACB incomers"),
  panelLineupShop: photo("panel-lineup-shop", "Panel line-up with metering and selector switches on the shop floor"),
  panelAisle1: photo("panel-aisle-1", "Aisle between long rows of finished MCC panels"),
  panelAisle2: photo("panel-aisle-2", "Rows of finished panels ready for dispatch"),
  panelLineupMeters: photo("panel-lineup-meters", "Tall panel line-up with digital meters"),
  feederPanelFront: photo("feeder-panel-front", "Front view of a feeder panel with meters and switches"),
  mccLineupHall: photo("mcc-lineup-hall", "MCC line-up with starter feeders along the shop floor"),
  multiTierFeeder: photo("multi-tier-feeder", "Multi-tier feeder panel with withdrawable modules"),
  panelLineupRow: photo("panel-lineup-row", "Panel line-up with meters and indicator lamps"),
  panelsAssembly: photo("panels-assembly", "Two open floor-standing panels during assembly"),
  mimicPanelsAssembly: photo("mimic-panels-assembly", "Panels with red mimic diagrams being assembled on the shop floor"),
};

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
  compactSubstationOpen: photo("compact-substation-open", "Compact substation with doors open showing the HT and LT compartments"),
  packageSubstation: photo("package-substation", "Package substation enclosure with a red roof on the shop floor"),

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
  cableTrayPlant: photo("cable-tray-plant", "Stacks of galvanised perforated cable trays at the Trident plant"),
  cableTrayStack: photo("cable-tray-stack-gi", "Stack of galvanised perforated cable trays"),
  cableTrayPerforated: photo("cable-tray-perforated", "Powder-coated perforated cable tray lengths"),
  cableTrayBatch: photo("cable-tray-batch", "Batch of finished perforated cable trays ready for dispatch"),
  trayBendPhoto: photo("tray-bend-photo", "Perforated cable tray horizontal bend"),
  trayTeePhoto: photo("tray-tee-photo", "Perforated cable tray tee"),
  trayVerticalBendPhoto: photo("tray-vertical-bend-photo", "Perforated cable tray vertical bend"),
  ladderTray: photo("cable-tray-3", "Perforated tray beside a ladder-type cable tray"),
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
  laserCutter: photo("machine-laser", "CNC fibre laser cutting machine"),
  busbarMachine: photo("machine-busbar", "Busbar bending, cutting and punching machine"),
  testBench: photo("test-bench", "Trident panel testing bench with meters and switches"),
  testEquipment: [
    photo("test-eq-1", "High-voltage test kit"),
    photo("test-eq-2", "Power quality and harmonics analyser"),
    photo("test-eq-3", "Digital insulation resistance tester"),
    photo("test-eq-4", "Oil test set"),
    photo("test-eq-5", "Hipot test instrument in a carry case"),
    photo("test-eq-6", "Multifunction installation tester"),
  ],

  // Panel photos
  ...panels,
  gallery: [
    panels.mccLineupLong,
    panels.mimicLineupAcb,
    panels.incomerColourPanels,
    panels.pccColourLineup,
    panels.colourFeederDoors,
    panels.acbFeederPanel,
    panels.panelRoomColour,
    panels.colourLineupPerspective,
    panels.litPanels,
    panels.acbPanelsPair,
    panels.panelRowAcb,
    panels.panelAisle1,
    panels.panelLineupShop,
    panels.pccColourSections,
    panels.feederPanelFront,
    panels.mccLineupHall,
  ],
  panelLineup: panels.mccLineupLong,
  shopFloor: panels.panelsAssembly,
  panelRows: panels.panelAisle2,

  // Company
  adminBlock: photo("admin-block", "Trident Core Energy admin block in Greater Noida"),
  adminOffice: photo("admin-office", "Open-plan office inside the Trident Core Energy admin block"),

  // Awards
  awardBusinessExcellence: photo(
    "award-business-excellence",
    "Director Pramod Kumar receiving the business excellence award trophy from Cabinet Minister Chirag Paswan",
  ),
  awardSocialWelfare: photo(
    "award-social-welfare",
    "Director Pramod Kumar receiving a Rotary Club of Greater Noida certificate for contributions to social welfare",
  ),

  // Certificates
  certIso: photo("cert-iso", "ISO 9001:2015 certificate of registration for Trident Core Energy"),
  certCe: photo("cert-ce", "CE certificate of compliance"),
  certCpri: photo("cert-cpri", "CPRI provisional short-circuit test report for a Trident PCC panel"),
  certApproval: photo("cert-approval", "Approval letter issued to Trident Core Energy, in Hindi"),
} as const;
