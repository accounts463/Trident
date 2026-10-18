import { getCategories } from "@/lib/content";

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export function getMainNav(): NavItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "All Products", href: "/products", description: "The complete Trident range" },
        ...getCategories().map((c) => ({ label: c.name, href: `/products#${c.slug}` })),
      ],
    },
    { label: "Services", href: "/services" },
    {
      label: "Infrastructure",
      href: "/manufacturing",
      children: [
        { label: "Manufacturing & Testing", href: "/manufacturing", description: "CNC plant, powder coating and test bay" },
        { label: "Certifications", href: "/certifications", description: "ISO 9001:2015, CE and CPRI" },
      ],
    },
    { label: "Industries", href: "/industries" },
    { label: "Clients", href: "/clients" },
    { label: "Contact", href: "/contact" },
  ];
}

export function getFooterGroups() {
  return [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Manufacturing & Testing", href: "/manufacturing" },
        { label: "Certifications", href: "/certifications" },
        { label: "Industries", href: "/industries" },
        { label: "Clients", href: "/clients" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Products",
      links: getCategories().map((c) => ({ label: c.name, href: `/products#${c.slug}` })),
    },
    {
      title: "Services",
      links: [
        { label: "Substations (33 / 11 kV)", href: "/services" },
        { label: "HT / LT Panel Installation", href: "/services" },
        { label: "Cable & Bus Duct Installation", href: "/services" },
        { label: "O&M Contracts", href: "/services" },
        { label: "Request a Quote", href: "/request-quote" },
      ],
    },
  ];
}
