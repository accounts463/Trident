import type { Faq } from "./types";

/** Answers are limited to facts stated in the company catalogue. */
export const faqs: Faq[] = [
  {
    question: "Can panels be customised to our requirements?",
    answer:
      "Yes. Our panels are custom-built to each project's requirements. They are designed in AutoCAD to the latest Indian electrical and panel standards, and the MCC range is designed to IEC and Indian standards.",
  },
  {
    question: "What enclosure protection ratings do you offer?",
    answer:
      "LT panel enclosures are available with IP42, IP54 and IP65 protection. Compact substations are offered with IP23 or IP54 protection to IEC 60529.",
  },
  {
    question: "Are panels tested before dispatch?",
    answer:
      "Yes. Every panel is inspected and tested at our plant: insulation testing up to 1000 megohms, a 2.5 kV high-voltage test, functional testing, primary injection up to 4000 A, secondary injection, switchgear operation and powder coating inspection.",
  },
  {
    question: "Is your design independently tested?",
    answer:
      "A Trident PCC panel rated 415 V, 4000 A was short-circuit tested at CPRI Bhopal to IS 8623 (Part 1). It withstood 50 kA for 1 second with no abnormality and then passed a 2.5 kV high-voltage test.",
  },
  {
    question: "Which compact substation ratings are available?",
    answer:
      "Our compact substations are factory-assembled units with MV switchgear, a distribution transformer and an LV panel, for 11 kV or 33 kV, 50 Hz, rated up to 4000 kVA.",
  },
  {
    question: "What ratings do your bus ducts cover?",
    answer: "We manufacture bus ducts and rising mains in aluminium or copper, rated from 100 A to 6000 A.",
  },
  {
    question: "Do you install and commission on site?",
    answer:
      "Yes. Our contracting team handles 33 kV / 11 kV substations, HT/LT panel installation, cable laying, bus duct and cable tray installation, transformer, VCB and RMU SITC, external lighting and O&M contracts.",
  },
  {
    question: "Where is your factory?",
    answer: "Our plant and admin block are at Plot No. 456, Udyog Kendra-2, Ecotech-3, Greater Noida, Uttar Pradesh 201306.",
  },
];
