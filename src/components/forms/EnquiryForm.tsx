"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox, describedBy, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/fields";
import { enquirySchema, requirementTypes, type EnquiryInput } from "@/lib/schemas";
import { Turnstile } from "./Turnstile";
import { honeypotValue, useLeadSubmit } from "./useLeadSubmit";

export function EnquiryForm({ idPrefix = "enq" }: { idPrefix?: string }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", company: "", phone: "", email: "", location: "", details: "", consent: false },
  });
  const { submit, serverError, errorRef, setTurnstileToken, turnstileReset } = useLeadSubmit("/api/enquiry", setError);

  const id = (name: string) => `${idPrefix}-${name}`;
  const aria = (name: keyof EnquiryInput, hint?: string) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": describedBy(id(name), errors[name]?.message, hint),
  });

  const detailsHint = "Ratings, quantities or scope, e.g. 1600 A PCC with 2 incomers, or 300 m cable tray";

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values, event) => submit(values, honeypotValue(event)))}
      className="relative space-y-5"
      aria-label="Enquiry form"
    >
      {serverError && (
        <div ref={errorRef} tabIndex={-1} className="focus:outline-none">
          <Alert variant="error" title="Your enquiry wasn't sent">
            {serverError}
          </Alert>
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name?.message} required>
          <Input autoComplete="name" {...register("name")} {...aria("name")} />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company?.message}>
          <Input autoComplete="organization" {...register("company")} {...aria("company")} />
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone?.message} required>
          <Input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} {...aria("phone")} />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email?.message} required>
          <Input type="email" autoComplete="email" {...register("email")} {...aria("email")} />
        </Field>
        <Field id={id("location")} label="City / project location" error={errors.location?.message} required>
          <Input autoComplete="address-level2" {...register("location")} {...aria("location")} />
        </Field>
        <Field id={id("requirement")} label="What do you need?" error={errors.requirement?.message} required>
          <Select defaultValue="" {...register("requirement")} {...aria("requirement")}>
            <option value="" disabled>
              Select an option
            </option>
            {requirementTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field id={id("details")} label="Requirement details" hint={detailsHint} error={errors.details?.message}>
        <Textarea rows={4} {...register("details")} {...aria("details", detailsHint)} />
      </Field>
      <Checkbox
        id={id("consent")}
        error={errors.consent?.message}
        label={
          <>
            I agree to be contacted by Trident Core Energy about my enquiry and accept the{" "}
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs text-muted sm:max-w-sm">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          Your details are used only to respond to your enquiry. We never sell your information.
        </p>
        <Button type="submit" size="lg" variant="cta" loading={isSubmitting} loadingText="Sending…">
          Send Enquiry
        </Button>
      </div>
    </form>
  );
}
