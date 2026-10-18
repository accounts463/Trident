"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Building2, Check, Factory, House, Lock, Package, Shapes } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox, describedBy, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/fields";
import {
  contactMethods,
  projectTypes,
  propertyTypes,
  quoteSchema,
  quoteStepFields,
  type QuoteInput,
} from "@/lib/schemas";
import { cn } from "@/lib/cn";
import { Turnstile } from "./Turnstile";
import { honeypotValue, useLeadSubmit } from "./useLeadSubmit";

const steps = ["Project type", "Project details", "Contact"];
const typeIcons = { residential: House, commercial: Building2, industrial: Factory, manufacturing: Package, other: Shapes };

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
      location: "",
      area: "",
      capacity: "",
      name: "",
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
  const projectType = useWatch({ control, name: "projectType" });

  // Preselect from ?type= links (e.g. Bulk Procurement in the nav). Read on mount so the form stays prerendered.
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    const match = projectTypes.find((t) => t.value === type);
    if (match) setValue("projectType", match.value);
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

  return (
    <div className="card p-6 md:p-10">
      <ol className="mb-10 grid grid-cols-3 gap-3" aria-label="Quote request progress">
        {steps.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined} className="flex flex-col gap-2">
            <span className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-line")} aria-hidden />
            <span className={cn("text-xs font-semibold md:text-sm", i === step ? "text-primary" : "text-muted")}>
              <span className="sr-only">{i < step ? "Completed: " : i === step ? "Current: " : ""}</span>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <form
        noValidate
        aria-label="Request a solar quote"
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

        <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-bold text-evergreen focus:outline-none">
          {step === 0 && "What kind of project is this?"}
          {step === 1 && "Tell us about the project"}
          {step === 2 && "How can we reach you?"}
        </h2>

        {step === 0 && (
          <fieldset aria-describedby={errors.projectType ? "q-projectType-error" : undefined}>
            <legend className="sr-only">Project type</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projectTypes.map((t) => {
                const IconComponent = typeIcons[t.value];
                const selected = projectType === t.value;
                return (
                  <label
                    key={t.value}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary",
                      selected ? "border-primary bg-mint" : "border-line hover:border-primary/40",
                    )}
                  >
                    <input type="radio" value={t.value} className="sr-only" {...register("projectType")} />
                    <IconComponent className="size-6 text-primary" aria-hidden />
                    <span className="font-semibold text-evergreen">{t.label}</span>
                    {selected && <Check className="ml-auto size-5 text-primary" aria-hidden />}
                  </label>
                );
              })}
            </div>
            {errors.projectType && (
              <p id="q-projectType-error" className="mt-3 text-sm font-medium text-danger">
                {errors.projectType.message}
              </p>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="q-location" label="Project location" error={errors.location?.message} required>
              <Input autoComplete="address-level2" placeholder="City, State" {...register("location")} {...aria("location")} />
            </Field>
            <Field id="q-propertyType" label="Property type" error={errors.propertyType?.message} required>
              <Select defaultValue="" {...register("propertyType")} {...aria("propertyType")}>
                <option value="" disabled>
                  Select an option
                </option>
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </Field>
            <Field id="q-area" label="Roof or land area" hint="Approximate, e.g. 800 sq ft" error={errors.area?.message}>
              <Input {...register("area")} {...aria("area", "Approximate, e.g. 800 sq ft")} />
            </Field>
            <Field
              id="q-capacity"
              label="Consumption or desired capacity"
              hint={projectType === "manufacturing" ? "Module quantity, wattage or project size" : "e.g. 450 units/month or 5 kW"}
              error={errors.capacity?.message}
            >
              <Input
                {...register("capacity")}
                {...aria("capacity", projectType === "manufacturing" ? "Module quantity, wattage or project size" : "e.g. 450 units/month or 5 kW")}
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
              <Field id="q-phone" label="Phone" error={errors.phone?.message} required>
                <Input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} {...aria("phone")} />
              </Field>
              <Field id="q-email" label="Email" error={errors.email?.message} required>
                <Input type="email" autoComplete="email" {...register("email")} {...aria("email")} />
              </Field>
              <Field id="q-contactMethod" label="Preferred contact method" error={errors.contactMethod?.message} required>
                <Select defaultValue="" {...register("contactMethod")} {...aria("contactMethod")}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {contactMethods.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field id="q-requirements" label="Additional requirements" error={errors.requirements?.message}>
              <Textarea rows={4} {...register("requirements")} {...aria("requirements")} />
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
            <p className="flex items-start gap-2 text-xs text-muted">
              <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              Your details are used only to prepare and discuss your quote. We never sell your information.
            </p>
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
