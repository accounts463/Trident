import { z } from "zod";

/** Shared by client forms and API route handlers. */

const phonePattern = /^\+?[\d\s()-]{7,20}$/;

const name = z.string().trim().min(2, "Please enter your name").max(100, "Name is too long");
const phone = z.string().trim().regex(phonePattern, "Please enter a valid phone number");
const email = z.string().trim().max(160).pipe(z.email({ message: "Please enter a valid email address" }));
const consent = z.boolean().refine((v) => v, { message: "Please confirm you agree to be contacted" });
const optionalText = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters`).optional();

/** Anti-spam fields added to every submission. */
export const antiSpamSchema = z.object({
  // Honeypot: real users never see or fill this.
  website: z.string().optional().default(""),
  turnstileToken: z.string().optional().default(""),
});

/** What the visitor needs. Values double as quote form types (?type=). */
export const requirementTypes = [
  { value: "panels", label: "LT / control panels", hint: "PCC, MCC, APFC, AMF, PLC panels" },
  { value: "distribution", label: "Substation or bus duct", hint: "Compact substations, bus ducts, rising mains" },
  { value: "cable-management", label: "Cable trays & raceways", hint: "Trays, raceways, fittings, accessories" },
  { value: "earthing", label: "Earthing", hint: "Electrodes, compound, strips" },
  { value: "power-conditioning", label: "Stabilizers & transformers", hint: "Servo, transformers, UPS, CVT" },
  { value: "contracting", label: "Installation / contracting", hint: "Substations, SITC, O&M contracts" },
  { value: "other", label: "Something else", hint: "Tell us what you need" },
] as const;

type RequirementValue = (typeof requirementTypes)[number]["value"];
const requirementValues = requirementTypes.map((t) => t.value) as [RequirementValue, ...RequirementValue[]];

export const enquirySchema = z.object({
  name,
  company: optionalText(120),
  phone,
  email,
  location: z.string().trim().min(2, "Please enter your city or project location").max(120),
  requirement: z.enum(requirementValues, { message: "Please choose what you need" }),
  details: optionalText(2000),
  consent,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const timelines = ["Immediately", "Within 1 month", "1–3 months", "3+ months / planning stage"] as const;
export const contactMethods = ["Phone call", "WhatsApp", "Email"] as const;

export const quoteStep1Schema = z.object({
  requirement: z.enum(requirementValues, { message: "Please choose what you need" }),
});

export const quoteStep2Schema = z.object({
  product: optionalText(160),
  rating: optionalText(200),
  location: z.string().trim().min(2, "Please enter the project location").max(120),
  timeline: z.enum(timelines, { message: "Please choose a timeline" }),
});

export const quoteStep3Schema = z.object({
  name,
  company: optionalText(120),
  phone,
  email,
  contactMethod: z.enum(contactMethods, { message: "Please choose how we should contact you" }),
  requirements: optionalText(2000),
  consent,
});

export const quoteSchema = z.object({
  ...quoteStep1Schema.shape,
  ...quoteStep2Schema.shape,
  ...quoteStep3Schema.shape,
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const quoteStepFields = [
  ["requirement"],
  ["product", "rating", "location", "timeline"],
  ["name", "company", "phone", "email", "contactMethod", "requirements", "consent"],
] as const;
