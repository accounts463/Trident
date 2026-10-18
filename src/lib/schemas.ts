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

export const propertyTypes = [
  "Independent house / villa",
  "Apartment / housing society",
  "Commercial building",
  "Industrial facility",
  "Institution (school, hospital, etc.)",
  "Open land",
  "Other",
] as const;

export const enquirySchema = z.object({
  name,
  phone,
  email,
  location: z.string().trim().min(2, "Please enter your city or project location").max(120),
  propertyType: z.enum(propertyTypes, { message: "Please choose a property or project type" }),
  energyRequirement: optionalText(120),
  details: optionalText(2000),
  consent,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const projectTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "manufacturing", label: "Manufacturing / Bulk Procurement" },
  { value: "other", label: "Other" },
] as const;

export const contactMethods = ["Phone call", "WhatsApp", "Email"] as const;

export const quoteStep1Schema = z.object({
  projectType: z.enum(["residential", "commercial", "industrial", "manufacturing", "other"], {
    message: "Please choose a project type",
  }),
});

export const quoteStep2Schema = z.object({
  location: z.string().trim().min(2, "Please enter the project location").max(120),
  propertyType: z.enum(propertyTypes, { message: "Please choose a property type" }),
  area: optionalText(60),
  capacity: optionalText(120),
});

export const quoteStep3Schema = z.object({
  name,
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
  ["projectType"],
  ["location", "propertyType", "area", "capacity"],
  ["name", "phone", "email", "contactMethod", "requirements", "consent"],
] as const;
