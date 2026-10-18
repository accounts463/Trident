import type { Faq } from "./types";

// TODO: have Trident Core Energy review answers; add warranty and timeline
// specifics only once verified.
export const faqs: Faq[] = [
  {
    category: "General",
    question: "What services does Trident Core Energy offer?",
    answer:
      "We manufacture solar panels and provide end-to-end solar solutions: system design and engineering, solar EPC, residential, commercial and industrial installation, and operations and maintenance.",
  },
  {
    category: "General",
    question: "How do I get a quote?",
    answer:
      "Use the Request a Quote form with your project type, location and approximate electricity consumption. Our team reviews the details and contacts you to arrange a consultation and, where needed, a site assessment.",
  },
  {
    category: "General",
    question: "How can I confirm I am dealing with Trident Core Energy?",
    answer:
      "Only rely on contact details published on this website. Before making any payment, confirm bank details and communications directly with us through the official phone number listed here.",
  },
  {
    category: "Residential",
    question: "How do I know what system size my home needs?",
    answer:
      "System size depends on your electricity consumption, usable shadow-free roof area and local net-metering rules. We review your recent electricity bills and assess your roof before recommending a size.",
  },
  {
    category: "Residential",
    question: "Will my rooftop solar system work during a power cut?",
    answer:
      "Standard on-grid systems shut down during grid outages for safety. If you need backup power, ask us whether a battery or hybrid option is suitable for your home.",
  },
  {
    category: "Residential",
    question: "Am I eligible for a government rooftop solar subsidy?",
    answer:
      "Eligibility and subsidy amounts are set by the government and can change. Please check the official national rooftop solar portal for current terms. Our Subsidy Guide links to official sources.",
  },
  {
    category: "Commercial & Industrial",
    question: "Can solar be installed without disrupting our operations?",
    answer:
      "In most cases, yes. We plan installation in phases, coordinate shutdown windows for electrical integration and follow site safety procedures agreed with your facility team.",
  },
  {
    category: "Commercial & Industrial",
    question: "What information do you need for a commercial or industrial proposal?",
    answer:
      "Recent electricity bills, sanctioned load and connection details, roof or land drawings if available, and any structural information. A site visit completes the assessment.",
  },
  {
    category: "Manufacturing",
    question: "Do you supply solar modules for bulk procurement?",
    answer:
      "Yes, we accept enquiries for project and bulk module supply. Select Manufacturing/Bulk Procurement in the quote form and share your required quantity and specifications.",
  },
  {
    category: "Manufacturing",
    question: "Where can I find product datasheets?",
    answer:
      "Published datasheets are available on our Products and Downloads pages. If you need a document that is not listed, request it through the contact form.",
  },
  {
    category: "Maintenance",
    question: "How often should solar panels be cleaned?",
    answer:
      "It depends on local dust, pollution and rainfall. Many sites benefit from regular cleaning, with more frequent cleaning in dry, dusty periods. Watching your generation data helps you spot when cleaning is due.",
  },
  {
    category: "Maintenance",
    question: "Do you offer maintenance for systems you did not install?",
    answer:
      "Contact us with details of your existing system. We will review its condition and let you know what maintenance support we can provide.",
  },
];
