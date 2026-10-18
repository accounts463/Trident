import type { Article } from "./types";
import { images } from "./images";

// TODO: have Trident Core Energy's engineering team review each article and
// confirm the publish dates before launch.
export const articles: Article[] = [
  {
    slug: "how-a-solar-power-system-works",
    title: "How a Solar Power System Works",
    category: "Solar Basics",
    excerpt:
      "From sunlight to the socket: a plain-language walk through panels, inverters, meters and the grid.",
    publishedAt: "2026-10-01",
    readingMinutes: 5,
    image: images.solarFieldSky,
    sections: [
      {
        heading: "Sunlight becomes direct current",
        paragraphs: [
          "Solar panels are made of photovoltaic (PV) cells, usually silicon. When sunlight strikes a cell, it frees electrons and creates a flow of direct current (DC) electricity.",
          "Cells are wired together into a module, and modules are connected into strings. The more light reaching the panels, the more current they produce, which is why orientation, tilt and shading matter so much.",
        ],
      },
      {
        heading: "The inverter makes it usable",
        paragraphs: [
          "Homes and businesses run on alternating current (AC). The inverter converts DC from the panels into AC that matches the grid's voltage and frequency.",
          "Modern inverters also track the panels' optimal operating point through the day, record generation data and shut down safely if the grid goes down.",
        ],
      },
      {
        heading: "Using, exporting and importing power",
        paragraphs: [
          "In an on-grid system, solar power first supplies whatever is running on site. Any surplus can be exported to the grid, and power is drawn from the grid when solar output is not enough, such as at night.",
          "A bidirectional (net) meter records both directions so that exported energy can be accounted for under your electricity distribution company's rules.",
        ],
      },
      {
        heading: "The supporting components",
        paragraphs: ["A complete system includes more than panels and an inverter:"],
        bullets: [
          "Mounting structures that hold panels at the right angle and withstand wind loads",
          "DC and AC cabling sized for the system's current",
          "Protection devices such as fuses, isolators, surge protection and earthing",
          "Monitoring so you can see how the system is performing",
        ],
      },
      {
        heading: "Why design matters",
        paragraphs: [
          "Two systems with the same panel count can perform very differently. Careful design accounts for roof space, shading through the year, cable losses and local grid requirements, so the system delivers what was planned.",
        ],
      },
    ],
  },
  {
    slug: "rooftop-solar-for-homeowners",
    title: "Rooftop Solar for Homeowners: What to Know Before You Start",
    category: "Residential",
    excerpt: "The questions worth asking about your roof, your bills and your installer before going solar.",
    publishedAt: "2026-10-03",
    readingMinutes: 6,
    image: images.installerHouse,
    sections: [
      {
        heading: "Start with your electricity bills",
        paragraphs: [
          "Your last twelve months of bills are the best starting point. They show how many units (kWh) you use and how that changes with the seasons, which is what a system should be sized around.",
        ],
      },
      {
        heading: "Check your roof",
        paragraphs: ["A site survey should look at:"],
        bullets: [
          "Usable, shadow-free area, considering water tanks, parapets and nearby buildings or trees",
          "Roof type and condition, whether RCC, metal sheet or tiled",
          "Orientation and how sunlight falls across the day and year",
          "Access for installation and future cleaning",
        ],
      },
      {
        heading: "Understand approvals and metering",
        paragraphs: [
          "Grid-connected rooftop systems need approval from your electricity distribution company (DISCOM) and a net or bidirectional meter. Requirements vary by state, so ask your installer to explain the process and timeline for your area.",
          "Government rooftop solar schemes may be available to eligible households. Always confirm eligibility and current terms on the official government portal.",
        ],
      },
      {
        heading: "Compare proposals carefully",
        paragraphs: ["When comparing quotes, look beyond the headline price:"],
        bullets: [
          "Panel and inverter make, model and documented warranties",
          "Structure material and design",
          "Estimated generation and how it was calculated",
          "What is included: approvals, metering support, monitoring and maintenance",
        ],
      },
      {
        heading: "Plan for the long term",
        paragraphs: [
          "A rooftop system is a long-term asset. Simple routines like periodic cleaning and an annual inspection help it keep performing as designed.",
        ],
      },
    ],
  },
  {
    slug: "solar-panel-manufacturing-explained",
    title: "Solar Panel Manufacturing Explained",
    category: "Manufacturing",
    excerpt: "How individual solar cells become a sealed, framed and tested module ready for the field.",
    publishedAt: "2026-10-06",
    readingMinutes: 5,
    image: images.elevatedRows,
    sections: [
      {
        heading: "From cells to strings",
        paragraphs: [
          "Module manufacturing begins with solar cells. Cells are inspected and sorted, then joined with conductive ribbons into strings using automated stringing machines.",
        ],
      },
      {
        heading: "Building the module stack",
        paragraphs: [
          "Strings are arranged on a sheet of glass between layers of encapsulant, with a backsheet or rear glass behind them. Interconnections between strings are made at this stage.",
        ],
      },
      {
        heading: "Lamination",
        paragraphs: [
          "The stack goes into a laminator, where heat and vacuum melt the encapsulant and bond all the layers into one laminate. Good lamination protects cells from moisture and mechanical stress over many years outdoors.",
        ],
      },
      {
        heading: "Framing and junction box",
        paragraphs: [
          "An aluminium frame is fitted for strength and mounting, and a junction box with bypass diodes is attached to the rear to connect the module safely to the system.",
        ],
      },
      {
        heading: "Testing and quality inspection",
        paragraphs: ["Finished modules typically pass through several checks:"],
        bullets: [
          "Electrical performance testing under a simulated sun to measure output",
          "Imaging inspection to reveal micro-cracks and soldering defects",
          "Insulation and safety checks",
          "Visual inspection of glass, frame and labelling",
        ],
      },
      {
        heading: "Why process control matters",
        paragraphs: [
          "Consistent materials, calibrated equipment and inspection at each stage are what separate a module that performs reliably for decades from one that degrades early.",
        ],
      },
    ],
  },
  {
    slug: "on-grid-vs-off-grid-vs-hybrid",
    title: "On-Grid vs Off-Grid vs Hybrid Solar Systems",
    category: "Planning",
    excerpt: "Three ways to connect solar, and how to tell which one fits your site and goals.",
    publishedAt: "2026-10-09",
    readingMinutes: 5,
    image: images.groundMountRows,
    sections: [
      {
        heading: "On-grid systems",
        paragraphs: [
          "On-grid (grid-tied) systems work alongside the utility grid. Solar supplies your load first, surplus can be exported, and the grid covers any shortfall.",
          "They are usually the simplest and most economical option where grid supply is reliable. Most on-grid inverters switch off during a power cut for safety, so they do not provide backup on their own.",
        ],
      },
      {
        heading: "Off-grid systems",
        paragraphs: [
          "Off-grid systems are not connected to the utility. Batteries store energy for night-time and cloudy periods, so the system must be sized carefully for both generation and storage.",
          "They suit remote locations where a grid connection is unavailable or very unreliable.",
        ],
      },
      {
        heading: "Hybrid systems",
        paragraphs: [
          "Hybrid systems combine a grid connection with battery storage. They can export surplus, store energy for later use and keep essential loads running during outages.",
          "They add cost and complexity, so they make most sense where backup power has real value.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: ["Consider these questions:"],
        bullets: [
          "How reliable is grid supply at your site?",
          "Do you need backup during outages, and for which loads?",
          "What do your local net-metering rules allow?",
          "What is your budget for upfront cost versus long-term value?",
        ],
      },
    ],
  },
  {
    slug: "factors-that-influence-installation-costs",
    title: "Factors That Influence Solar Installation Costs",
    category: "Planning",
    excerpt: "Why two solar quotes can differ, and what actually drives the cost of a system.",
    publishedAt: "2026-10-12",
    readingMinutes: 4,
    image: images.installerRoof,
    sections: [
      {
        heading: "System size",
        paragraphs: [
          "Capacity, measured in kilowatts (kW), is the biggest driver. It depends on your consumption, available area and how much of your demand you want solar to cover.",
        ],
      },
      {
        heading: "Component choice",
        paragraphs: [
          "Panel technology, inverter type and brand, and the quality of cables and protection devices all affect price, and also affect long-term performance and reliability.",
        ],
      },
      {
        heading: "Site conditions",
        paragraphs: ["The site itself shapes the installation effort:"],
        bullets: [
          "Roof type, height and access",
          "Structure design, such as elevated structures to keep roof space usable",
          "Distance between panels, inverter and the distribution board",
          "Any civil or electrical upgrades needed",
        ],
      },
      {
        heading: "Approvals and metering",
        paragraphs: [
          "DISCOM application fees, metering and documentation vary by state and connection type, and are sometimes quoted separately.",
        ],
      },
      {
        heading: "Service after installation",
        paragraphs: [
          "Monitoring, cleaning and maintenance support may be included or offered separately. Check what is covered and for how long.",
          "The most useful comparison is not the lowest price but the clearest proposal: one that explains exactly what you are getting.",
        ],
      },
    ],
  },
  {
    slug: "solar-maintenance-best-practices",
    title: "Solar Maintenance Best Practices",
    category: "Maintenance",
    excerpt: "Simple routines that help a solar system keep performing as designed, year after year.",
    publishedAt: "2026-10-15",
    readingMinutes: 4,
    image: images.panelCleaning,
    sections: [
      {
        heading: "Keep panels clean",
        paragraphs: [
          "Dust, bird droppings and leaves reduce the light reaching the cells. Clean panels with water and a soft brush or cloth, ideally early morning or evening when panels are cool.",
          "Avoid abrasive tools, detergents and high-pressure jets, and never walk on panels.",
        ],
      },
      {
        heading: "Watch the monitoring",
        paragraphs: [
          "Check your inverter display or monitoring app regularly. A sudden drop in generation on a clear day can point to shading, soiling or a fault worth investigating.",
        ],
      },
      {
        heading: "Schedule professional inspections",
        paragraphs: ["A periodic inspection by trained technicians should cover:"],
        bullets: [
          "Module condition, including cracks, discolouration or hotspots",
          "Structure and fasteners for corrosion or loosening",
          "Cable routing, connectors and junction boxes",
          "Earthing, surge protection and inverter health",
        ],
      },
      {
        heading: "Stay safe",
        paragraphs: [
          "Solar systems generate electricity whenever there is light. Leave electrical work and any opening of equipment to qualified technicians.",
        ],
      },
    ],
  },
];
