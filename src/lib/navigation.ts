import { company } from "@/content/company";
import { calculatorLive, getProducts, getSolutions, hasDownloads } from "@/lib/content";

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

/** Builds navigation from content and feature flags so hidden pages are never linked. */
export function getMainNav(): NavItem[] {
  const f = company.features;
  const products = getProducts();

  const manufacturingChildren: NavLink[] = [
    { label: "Manufacturing Overview", href: "/manufacturing", description: "Facility, process and quality" },
    ...(products.length
      ? [{ label: "Solar Products", href: "/products", description: "Modules, specifications and datasheets" }]
      : []),
    { label: "Bulk Procurement", href: "/request-quote?type=manufacturing", description: "Project and bulk module supply" },
  ];

  const solutionChildren: NavLink[] = [
    { label: "All Solutions", href: "/solutions", description: "Every way we can help" },
    ...(f.residential ? [{ label: "Residential Solar", href: "/solutions/residential", description: "Rooftop solar for homes" }] : []),
    ...(f.commercial || f.industrial
      ? [
          {
            label: "Commercial & Industrial",
            href: "/solutions/commercial-industrial",
            description: "Rooftop and captive solar for business",
          },
        ]
      : []),
    ...(f.operationsMaintenance
      ? [{ label: "Operations & Maintenance", href: "/solutions#operations-maintenance", description: "Keep systems performing" }]
      : []),
  ];

  const exploreChildren: NavLink[] = [
    ...(calculatorLive ? [{ label: "Solar Calculator", href: "/solar-calculator", description: "Indicative system estimate" }] : []),
    { label: "Resources", href: "/resources", description: "Guides and articles" },
    { label: "FAQs", href: "/resources/faqs", description: "Answers to common questions" },
    { label: "Subsidy Guide", href: "/resources/solar-subsidy-guide", description: "Government rooftop schemes" },
    ...(hasDownloads ? [{ label: "Downloads", href: "/downloads", description: "Brochures and datasheets" }] : []),
  ];

  return [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    ...(f.manufacturing ? [{ label: "Manufacturing", href: "/manufacturing", children: manufacturingChildren }] : []),
    { label: "Solutions", href: "/solutions", children: solutionChildren.length > 1 ? solutionChildren : undefined },
    { label: "Projects", href: "/projects" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Explore", href: "/resources", children: exploreChildren },
    { label: "Contact", href: "/contact" },
  ];
}

export function getFooterGroups() {
  const f = company.features;
  const solutions = getSolutions();
  return [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Sustainability", href: "/sustainability" },
        ...(f.channelPartners ? [{ label: "Channel Partners", href: "/channel-partners" }] : []),
        ...(f.careers ? [{ label: "Careers", href: "/careers" }] : []),
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Manufacturing & Services",
      links: solutions.map((s) => ({ label: s.title, href: s.href })),
    },
    {
      title: "Explore",
      links: [
        ...(getProducts().length ? [{ label: "Solar Products", href: "/products" }] : []),
        ...(calculatorLive ? [{ label: "Solar Calculator", href: "/solar-calculator" }] : []),
        { label: "Resources", href: "/resources" },
        { label: "FAQs", href: "/resources/faqs" },
        { label: "Subsidy Guide", href: "/resources/solar-subsidy-guide" },
        ...(hasDownloads ? [{ label: "Downloads", href: "/downloads" }] : []),
        { label: "Request a Quote", href: "/request-quote" },
      ],
    },
  ];
}
