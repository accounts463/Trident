import type { ProcessStep, Service } from "./types";

/** Contracting services listed in the company catalogue. */
export const services: Service[] = [
  {
    title: "33 kV / 11 kV Substations",
    description: "Turnkey substation works at 33 kV and 11 kV, from design through erection, testing and commissioning.",
    icon: "zap",
    page: {
      slug: "substations",
      seo: {
        title: "33 kV / 11 kV Substation Contractor",
        description: "Turnkey 33 kV and 11 kV substation works by Trident Core Energy, Greater Noida: design, erection, testing and commissioning by our own crews."
      },
      intro: [
        "Trident Core Energy carries out turnkey substation works at 33 kV and 11 kV, from design through erection, testing and commissioning.",
        "We design, fabricate and test our panels, compact substations, bus ducts and cable trays at our own plant in Greater Noida, so the same team that builds the equipment can install and commission it.",
        "Erection uses mechanised, modern methods and is carried out by well-trained, experienced people, so clients get an economical, accountable solution."
      ],
      scope: [
        "Design to the latest Indian electrical and panel standards, drawn in AutoCAD",
        "Supply of substation equipment, including compact substations and LT panels from our own plant",
        "Mechanised erection and installation by our own trained crews",
        "Testing of the installed equipment before energisation",
        "Commissioning on site, then handover"
      ],
      relatedProducts: [
        "compact-substation",
        "transformers",
        "main-lt-panel",
        "power-control-centre"
      ],
      faqs: [
        {
          question: "Do you supply the substation equipment as well?",
          answer: "Yes. We manufacture compact substations (11 kV / 33 kV, up to 4000 kVA) and LT panels at our Greater Noida plant, and supply transformers, so one team is accountable for both the equipment and the site work."
        },
        {
          question: "What do you need to prepare a quotation?",
          answer: "Share the scope, site location and timeline, with a single-line diagram, BOQ or load list where you have one. Our engineers will plan the work and send a proposal."
        }
      ]
    },
  },
  {
    title: "HT / LT Cable SITC",
    description: "Supply, installation, testing and commissioning of HT and LT cabling.",
    icon: "cable",
    page: {
      slug: "ht-lt-cable-sitc",
      seo: {
        title: "HT / LT Cable SITC Contractor",
        description: "Supply, installation, testing and commissioning (SITC) of HT and LT cables, with cable trays and raceways made at our Greater Noida plant."
      },
      intro: [
        "Trident Core Energy provides supply, installation, testing and commissioning (SITC) of HT and LT cabling.",
        "We also manufacture the cable trays, raceways and junction boxes that carry and protect the cables, and our crews lay cable tray and raceway systems with all supports and accessories."
      ],
      scope: [
        "Supply of HT and LT cables to the project specification",
        "Cable tray and raceway laying, with supports and accessories",
        "Cable laying and termination by our own trained crews",
        "Testing of the installed cables",
        "Commissioning and handover"
      ],
      relatedProducts: [
        "cable-tray",
        "raceway",
        "junction-boxes"
      ],
      faqs: [
        {
          question: "What does SITC stand for?",
          answer: "Supply, installation, testing and commissioning: we supply the cables, install them, test them and commission them on site."
        },
        {
          question: "What do you need to prepare a quotation?",
          answer: "Share the scope, site location and timeline, with a single-line diagram, BOQ or load list where you have one. Our engineers will plan the work and send a proposal."
        }
      ]
    },
  },
  {
    title: "HT / LT Panel Installation",
    description: "Installation of HT and LT panels on site by our own trained crews.",
    icon: "layers",
    page: {
      slug: "ht-lt-panel-installation",
      seo: {
        title: "HT / LT Panel Installation Service",
        description: "Installation of HT and LT panels by our own trained crews, plus SITC of VCB panels and RMUs. From Trident Core Energy, panel manufacturer in Greater Noida."
      },
      intro: [
        "Trident Core Energy installs HT and LT panels on site with its own trained crews.",
        "We design, fabricate and test our panels, compact substations, bus ducts and cable trays at our own plant in Greater Noida, so the same team that builds the equipment can install and commission it.",
        "We also carry out supply, installation, testing and commissioning of VCB panels and ring main units (RMU), and of electrical panels to the same standards as our factory tests."
      ],
      scope: [
        "Site survey and installation planning",
        "Mechanised erection and positioning of the panels",
        "Cable termination and interconnection",
        "Testing to the same standards as our factory tests",
        "Commissioning and handover"
      ],
      relatedProducts: [
        "main-lt-panel",
        "power-control-centre",
        "motor-control-centre",
        "apfc-panel"
      ],
      faqs: [
        {
          question: "Do you install panels made by other manufacturers?",
          answer: "Our crews install HT and LT panels on site and carry out SITC of VCB panels and RMUs. Tell us the make and scope and we will confirm."
        },
        {
          question: "How are panels tested before they reach site?",
          answer: "Every panel we make is tested at our plant: insulation testing up to 1000 megohms, a 2.5 kV high-voltage test, functional testing, primary and secondary injection and switchgear operation checks."
        },
        {
          question: "What do you need to prepare a quotation?",
          answer: "Share the scope, site location and timeline, with a single-line diagram, BOQ or load list where you have one. Our engineers will plan the work and send a proposal."
        }
      ]
    },
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
    page: {
      slug: "bus-duct-installation",
      seo: {
        title: "Bus Duct and Rising Mains Installation",
        description: "Installation of bus ducts and rising mains in industrial plants and high-rise buildings, by the team that makes them (100 A to 6000 A) in Greater Noida."
      },
      intro: [
        "Trident Core Energy installs bus ducts and rising mains in industrial and high-rise buildings.",
        "We manufacture aluminium and copper bus ducts and rising mains rated from 100 A to 6000 A at our Greater Noida plant, so the same team handles manufacture and installation."
      ],
      scope: [
        "Route planning for the bus duct or rising main",
        "Supply of bus duct sections from our own plant",
        "Mechanised erection by our own trained crews",
        "Testing of the installed system",
        "Commissioning and handover"
      ],
      relatedProducts: [
        "bus-duct-rising-mains",
        "main-lt-panel"
      ],
      faqs: [
        {
          question: "Which ratings can you supply and install?",
          answer: "Aluminium or copper bus ducts and rising mains rated from 100 A to 6000 A."
        },
        {
          question: "What do you need to prepare a quotation?",
          answer: "Share the scope, site location and timeline, with a single-line diagram, BOQ or load list where you have one. Our engineers will plan the work and send a proposal."
        }
      ]
    },
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
    page: {
      slug: "electrical-om-contracts",
      seo: {
        title: "Electrical O&M Contracts",
        description: "Operation and maintenance contracts for substations, panels and electrical installations, from Trident Core Energy, Greater Noida."
      },
      intro: [
        "Trident Core Energy offers operation and maintenance contracts that keep electrical installations running safely.",
        "Our team designs, manufactures, installs and commissions substations, panels and power distribution systems, and brings that knowledge to their upkeep. Standardised testing keeps operation and maintenance costs down."
      ],
      scope: [
        "Review of the installation and agreement of the maintenance scope",
        "Operation of the installation as agreed in the contract",
        "Maintenance by our trained, experienced crews",
        "Testing to keep equipment in safe working order"
      ],
      relatedProducts: [
        "compact-substation",
        "main-lt-panel",
        "servo-voltage-stabilizer"
      ],
      faqs: [
        {
          question: "What do you need to prepare a quotation?",
          answer: "Share the scope, site location and timeline, with a single-line diagram, BOQ or load list where you have one. Our engineers will plan the work and send a proposal."
        }
      ]
    },
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
    description: "Our director is an electrical engineer with extensive experience in the electrical industry.",
    icon: "hardhat",
  },
  {
    title: "Turnkey delivery",
    description: "Design, manufacturing, erection, installation and commissioning by one accountable team.",
    icon: "handshake",
  },
] as const;
