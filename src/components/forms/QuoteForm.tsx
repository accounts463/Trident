"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Cable, Check, Gauge, HardHat, Layers, Shapes, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { products } from "@/content/products";
import type { ProductCategorySlug } from "@/content/types";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Combobox, Select } from "@/components/ui/Dropdown";
import { Checkbox, describedBy, Field, Honeypot, Input, Textarea } from "@/components/ui/fields";
import {
  contactMethods,
  quoteSchema,
  quoteStepFields,
  requirementTypes,
  timelines,
  type QuoteInput,
} from "@/lib/schemas";
import { cn } from "@/lib/cn";
import { Turnstile } from "./Turnstile";
import { honeypotValue, useLeadSubmit } from "./useLeadSubmit";

const steps = ["Requirement", "Details", "Contact"];
const productNames = products.map((p) => p.name);
const typeIcons = {
  panels: Layers,
  distribution: Zap,
  "cable-management": Cable,
  earthing: ShieldCheck,
  "power-conditioning": Gauge,
  contracting: HardHat,
  other: Shapes,
};

const requirementForCategory: Record<ProductCategorySlug, QuoteInput["requirement"]> = {
  "lt-panels": "panels",
  "power-quality": "panels",
  "automation-panels": "panels",
  "power-distribution": "distribution",
  "cable-management": "cable-management",
  accessories: "cable-management",
  earthing: "earthing",
  "power-conditioning": "power-conditioning",
};

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      product: "",
      rating: "",
      location: "",
      name: "",
      company: "",
      phone: "",
      email: "",
      requirements: "",
      consent: false,
    },
  });
  const { submit, serverError, errorRef, setTurnstileToken, turnstileReset } = useLeadSubmit("/api/quote", setError, (fields) => {
    // Server-side field errors may belong to an earlier step; show that step.
    const target = quoteStepFields.findIndex((stepFields) => stepFields.some((f) => fields.includes(f)));
    if (target >= 0) setStep(target);
  });
  const requirement = useWatch({ control, name: "requirement" });

  // Preselect from ?type= or ?product= links. Read on mount so the form stays prerendered.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = products.find((p) => p.slug === params.get("product"));
    if (product) {
      setValue("product", product.name);
      setValue("requirement", requirementForCategory[product.category]);
      return;
    }
    const match = requirementTypes.find((t) => t.value === params.get("type"));
    if (match) setValue("requirement", match.value);
  }, [setValue]);

  // Move focus to the new step's heading for keyboard and screen-reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  async function next() {
    const valid = await trigger([...quoteStepFields[step]] as (keyof QuoteInput)[], { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  const aria = (name: keyof QuoteInput, hint?: string) => ({
    id: `q-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": describedBy(`q-${name}`, errors[name]?.message, hint),
  });

  const ratingHint =
    requirement === "contracting"
      ? "Scope, e.g. 11 kV substation with 2 × 1000 kVA transformers"
      : "Rating and quantity, e.g. 1600 A PCC × 1, or 500 m of 300 mm tray";

  return (
    <div className="card p-6 md:p-10">
      <ol className="mb-10 grid grid-cols-3 gap-3" aria-label="Quote request progress">
        {steps.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined} className="flex flex-col gap-2">
            <span className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-accent" : "bg-line")} aria-hidden />
            <span className={cn("text-xs font-semibold md:text-sm", i === step ? "text-primary" : "text-muted")}>
              <span className="sr-only">{i < step ? "Completed: " : i === step ? "Current: " : ""}</span>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <form
        noValidate
        aria-label="Request a quote"
        onSubmit={handleSubmit(
          (values, event) => submit(values, honeypotValue(event)),
          (errs) => {
            // A server-side error may point at an earlier step; jump to it.
            const target = quoteStepFields.findIndex((fields) => fields.some((f) => f in errs));
            if (target >= 0 && target !== step) setStep(target);
          },
        )}
        onKeyDown={(e) => {
          // Enter advances a step instead of submitting the whole form early.
          if (e.key === "Enter" && step < steps.length - 1 && (e.target as HTMLElement).tagName === "INPUT") {
            e.preventDefault();
            void next();
          }
        }}
        className="space-y-6"
      >
        {serverError && (
          <div ref={errorRef} tabIndex={-1} className="focus:outline-none">
            <Alert variant="error" title="Your request wasn't sent">
              {serverError}
            </Alert>
          </div>
        )}

        <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-bold text-navy focus:outline-none">
          {step === 0 && "What do you need?"}
          {step === 1 && "Tell us about the requirement"}
          {step === 2 && "How can we reach you?"}
        </h2>

        {step === 0 && (
          <fieldset aria-describedby={errors.requirement ? "q-requirement-error" : undefined}>
            <legend className="sr-only">Requirement type</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {requirementTypes.map((t) => {
                const IconComponent = typeIcons[t.value];
                const selected = requirement === t.value;
                return (
                  <label
                    key={t.value}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary",
                      selected ? "border-primary bg-tint" : "border-line hover:border-primary/40",
                    )}
                  >
                    <input type="radio" value={t.value} className="sr-only" {...register("requirement")} />
                    <span
                      className={cn(
                        "inline-flex size-10 shrink-0 items-center justify-center rounded-lg",
                        selected ? "bg-primary text-white" : "bg-canvas text-primary",
                      )}
                    >
                      <IconComponent className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold text-navy">{t.label}</span>
                      <span className="block text-xs text-muted">{t.hint}</span>
                    </span>
                    {selected && <Check className="ml-auto size-5 shrink-0 text-primary" aria-hidden />}
                  </label>
                );
              })}
            </div>
            {errors.requirement && (
              <p id="q-requirement-error" className="mt-3 text-sm font-medium text-danger">
                {errors.requirement.message}
              </p>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="q-product" label="Product or service" error={errors.product?.message} className="md:col-span-2">
              <Controller
                control={control}
                name="product"
                render={({ field }) => (
                  <Combobox options={productNames} placeholder="e.g. APFC Panel" {...field} value={field.value ?? ""} {...aria("product")} />
                )}
              />
            </Field>
            <Field id="q-rating" label="Rating, quantity or scope" hint={ratingHint} error={errors.rating?.message} className="md:col-span-2">
              <Input {...register("rating")} {...aria("rating", ratingHint)} />
            </Field>
            <Field id="q-location" label="Project location" error={errors.location?.message} required>
              <Input autoComplete="address-level2" placeholder="City, State" {...register("location")} {...aria("location")} />
            </Field>
            <Field id="q-timeline" label="When do you need it?" error={errors.timeline?.message} required>
              <Controller
                control={control}
                name="timeline"
                render={({ field }) => <Select options={timelines} {...field} {...aria("timeline")} />}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="q-name" label="Full name" error={errors.name?.message} required>
                <Input autoComplete="name" {...register("name")} {...aria("name")} />
              </Field>
              <Field id="q-company" label="Company" error={errors.company?.message}>
                <Input autoComplete="organization" {...register("company")} {...aria("company")} />
              </Field>
              <Field id="q-phone" label="Phone" error={errors.phone?.message} required>
                <Input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} {...aria("phone")} />
              </Field>
              <Field id="q-email" label="Email" error={errors.email?.message} required>
                <Input type="email" autoComplete="email" {...register("email")} {...aria("email")} />
              </Field>
              <Field id="q-contactMethod" label="Preferred contact method" error={errors.contactMethod?.message} required>
                <Controller
                  control={control}
                  name="contactMethod"
                  render={({ field }) => <Select options={contactMethods} {...field} {...aria("contactMethod")} />}
                />
              </Field>
            </div>
            <Field id="q-requirements" label="Anything else we should know?" error={errors.requirements?.message}>
              <Textarea rows={4} placeholder="Site conditions, standards to follow, preferred switchgear makes…" {...register("requirements")} {...aria("requirements")} />
            </Field>
            <Checkbox
              id="q-consent"
              error={errors.consent?.message}
              label={
                <>
                  I agree to be contacted by Trident Core Energy about this request and accept the{" "}
                  <Link href="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </>
              }
              {...register("consent")}
            />
            <Honeypot name="website" />
            <Turnstile onToken={setTurnstileToken} resetKey={turnstileReset} />
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <Button type="button" size="lg" onClick={next}>
              Next
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          ) : (
            <Button type="submit" size="lg" variant="cta" loading={isSubmitting} loadingText="Sending…">
              Submit Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
