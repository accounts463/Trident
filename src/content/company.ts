import type { Company } from "./types";
import { images } from "./images";

/**
 * Single source of truth for company facts, taken from the Trident Core Energy
 * company catalogue. Components hide anything that is empty or null.
 */
export const company: Company = {
  name: "Trident Core Energy",
  // TODO: confirm the registered legal name (e.g. "Trident Core Energy Pvt. Ltd.") for the footer and JSON-LD.
  legalName: null,
  tagline: "Engineered for Safety. Built for Reliability.",
  slogans: ["Powering a Sustainable Tomorrow", "Smart Energy for a Powerful Tomorrow", "Power Management You Can Trust"],
  description:
    "Trident Core Energy is an ISO 9001:2015 certified manufacturer of LT electrical panels, compact substations, bus ducts, cable trays and earthing systems in Greater Noida, India, and an electrical contractor for substations, HT/LT installation and maintenance.",
  foundedYear: 2010,
  director: {
    name: "Mr. Pramod Kumar",
    note: "Our director is an electrical engineer with extensive knowledge and experience in the electrical industry.",
  },
  story: [
    "Trident Core Energy has manufactured electrical panels since 2010. We keep growing on the strength of our quality and our customers' satisfaction, and we aim to become a leading panel manufacturer in India. We believe success comes from teamwork, customer satisfaction, innovation and ethical behaviour.",
    "Our engineering team serves power, chemicals, food and beverages, dairy, water treatment, sugar and paper mills, residential and commercial buildings and railways, covering design, manufacturing, erection, commissioning and installation.",
    "We follow the latest Indian electrical and panel standards. AutoCAD design keeps every panel accurate, and standardised testing keeps operation and maintenance costs down. Our quality system is built around modern quality assurance standards in design and installation.",
    "We work to one simple motto: honesty. That means hard work and dedication for every customer, professional values in every engineering decision, and mechanised, modern erection methods carried out by well-trained, experienced people, so clients get economical solutions.",
  ],
  whoWeAre:
    "We deliver complete power solutions that perform. From generation to distribution, we support industries and infrastructure with modern, safe and efficient systems. We are an ISO-certified company focused on quality, reliability and innovation, and our team delivers turnkey projects with strong engineering capability and on-time execution.",
  mission:
    "To deliver outstanding products through operational excellence, innovative customer service and strong marketing. To create a workplace where employees are empowered, cared for, developed and given opportunities to grow. To keep innovating, enhance our core technologies and develop new world-class products, and to become India's largest exporter of industrial power distribution and control equipment.",
  vision:
    "To be a trusted, respected and preferred brand. To manage power in India's biggest industries, its tallest buildings and its most critical infrastructure. To be closest to our customers, to serve millions of homes across the country, to be a role model for others, and to make \"Made in India\" a respected label worldwide.",
  values: [
    {
      title: "Customer Awareness",
      description: "We listen first and go the extra mile, so every panel and project fits how the customer actually works.",
      icon: "handshake",
    },
    {
      title: "Innovation",
      description: "We keep improving our designs, machinery and methods to deliver safer, more efficient power systems.",
      icon: "lightbulb",
    },
    {
      title: "Ethical Value",
      description: "Frank, honest dealings and professional values in every engineering practice we follow.",
      icon: "scale",
    },
    {
      title: "Teamwork",
      description: "We work hard and smart to succeed both as a team and as individuals.",
      icon: "users",
    },
  ],
  principles: [
    "Go the extra mile for our customers.",
    "Be frank and honest.",
    "Be obsessed with quality.",
    "Discover our strength.",
    "Work hard and smart to achieve success both as a team and as individuals.",
  ],
  industriesServed: [
    "Power",
    "Chemicals",
    "Food & beverages",
    "Dairy",
    "Water treatment plants",
    "Sugar & paper mills",
    "Residential & commercial buildings",
    "Railways",
  ],
  contact: {
    phone: "+919999982280",
    phoneDisplay: "+91 99999 82280",
    whatsapp: "+919999982280",
    email: "info@tridentcoreenergy.com",
    address: {
      streetAddress: "Plot No. 456, Udyog Kendra-2, Ecotech-3",
      locality: "Greater Noida",
      region: "Uttar Pradesh",
      postalCode: "201306",
      country: "India",
    },
    // TODO: add working hours if they should be published.
    hours: null,
    mapEmbedUrl:
      "https://www.google.com/maps?q=Plot+No+456,+Udyog+Kendra+2,+Ecotech+3,+Greater+Noida,+Uttar+Pradesh+201306&output=embed",
  },
  website: "https://www.tridentcoreenergy.com",
  // TODO: add official social profiles, e.g. { label: "LinkedIn", href: "https://..." }
  socials: [],
  serviceAreas: [],
  awards: [
    {
      title: "Business Excellence Award",
      presentedBy: "Presented by Cabinet Minister Shri Chirag Paswan",
      description:
        "Trident Core Energy was honoured with a business excellence award, presented by Cabinet Minister Shri Chirag Paswan. Our director, Mr. Pramod Kumar, received the award on behalf of the company.",
      image: images.awardBusinessExcellence,
    },
    {
      title: "Recognition for Social Welfare",
      presentedBy: "Rotary Club of Greater Noida",
      description:
        "Trident Core Energy received an award in recognition of its contributions to social welfare. Mr. Pramod Kumar accepted the award on behalf of the organisation.",
      image: images.awardSocialWelfare,
    },
  ],
  certifications: [
    {
      slug: "iso-9001",
      name: "ISO 9001:2015",
      issuer: "DGACERT Management System Pvt. Ltd. (UKACF accredited)",
      detail:
        "Quality management system certified for the manufacturing of electrical panels. Certificate no. 22800553637QM, valid until 22 September 2029.",
      image: images.certIso,
    },
    {
      slug: "ce",
      name: "CE Certificate of Compliance",
      issuer: "British Columbia Inspection & Certification (BCI)",
      detail:
        "Certificate of compliance confirming conformity with the requirements of the CE marking directives and regulations applicable within the European Union.",
      image: images.certCe,
    },
    {
      slug: "cpri",
      name: "CPRI Short-Circuit Test",
      issuer: "Central Power Research Institute, Bhopal",
      detail:
        "PCC panel rated 415 V, 4000 A tested to IS 8623 (Part 1): withstood 50 kA for 1 second with a 105 kA peak and no abnormality, then passed a 2.5 kV high-voltage test for one minute (provisional report S2121204).",
      image: images.certCpri,
    },
  ],
};
