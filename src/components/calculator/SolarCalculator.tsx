"use client";

import { useId, useState } from "react";
import type { CalculatorAssumptions } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/fields";

type InputMode = "bill" | "units";

const inr = (n: number) => n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const num = (n: number, d = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: d });

/** Pure estimate so the formula shown on the page is exactly what runs. */
export function estimate(a: CalculatorAssumptions, monthlyUnits: number, roofArea: number | null, unitsPerKw: number) {
  const neededKw = monthlyUnits / unitsPerKw;
  const roofKw = roofArea ? roofArea / a.roofAreaPerKw : Infinity;
  const raw = Math.min(neededKw, roofKw, a.maxSystemKw);
  const systemKw = Math.max(a.minSystemKw, Math.round(raw * 2) / 2);
  const generation = systemKw * unitsPerKw;
  const offsetUnits = Math.min(generation, monthlyUnits);
  return {
    systemKw,
    roofLimited: roofKw < neededKw,
    generation,
    savings: offsetUnits * a.tariffPerUnit,
    costLow: systemKw * a.costPerKwRange[0],
    costHigh: systemKw * a.costPerKwRange[1],
    roofNeeded: systemKw * a.roofAreaPerKw,
  };
}

export function SolarCalculator({ assumptions: a }: { assumptions: CalculatorAssumptions }) {
  const id = useId();
  const [mode, setMode] = useState<InputMode>("bill");
  const [amount, setAmount] = useState("");
  const [roof, setRoof] = useState("");
  const [location, setLocation] = useState(a.locations[0]?.id ?? "");

  const value = Number(amount);
  const roofArea = roof ? Number(roof) : null;
  const loc = a.locations.find((l) => l.id === location) ?? a.locations[0];
  const valid = value > 0 && Number.isFinite(value) && (roofArea === null || roofArea > 0) && loc;
  const monthlyUnits = mode === "bill" ? value / a.tariffPerUnit : value;
  const result = valid ? estimate(a, monthlyUnits, roofArea, loc.unitsPerKwPerMonth) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form className="card space-y-6 p-6 md:p-8 lg:col-span-5" onSubmit={(e) => e.preventDefault()} aria-label="Solar estimate inputs">
        <fieldset>
          <legend className="text-sm font-semibold text-evergreen">I know my</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-full bg-canvas p-1">
            {(["bill", "units"] as const).map((m) => (
              <label
                key={m}
                className={`flex h-10 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${mode === m ? "bg-white text-primary shadow-sm" : "text-muted"}`}
              >
                <input type="radio" name={`${id}-mode`} value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
                {m === "bill" ? "Monthly bill (₹)" : "Monthly units (kWh)"}
              </label>
            ))}
          </div>
        </fieldset>
        <Field id={`${id}-amount`} label={mode === "bill" ? "Average monthly bill (₹)" : "Average monthly units (kWh)"} required>
          <Input id={`${id}-amount`} type="number" inputMode="decimal" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field id={`${id}-roof`} label="Shadow-free roof area (sq ft)" hint="Leave blank if you're not sure">
          <Input
            id={`${id}-roof`}
            type="number"
            inputMode="decimal"
            min={1}
            value={roof}
            onChange={(e) => setRoof(e.target.value)}
            aria-describedby={`${id}-roof-hint`}
          />
        </Field>
        <Field id={`${id}-loc`} label="Location type" required>
          <Select id={`${id}-loc`} value={location} onChange={(e) => setLocation(e.target.value)}>
            {a.locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </Select>
        </Field>
      </form>

      <div className="lg:col-span-7" aria-live="polite">
        {result ? (
          <div className="on-dark rounded-card bg-evergreen p-6 text-white md:p-8">
            <p className="eyebrow text-sun">Indicative estimate</p>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-white/70">Suggested system size</dt>
                <dd className="mt-1 font-display text-4xl font-extrabold">{num(result.systemKw, 1)} kW</dd>
              </div>
              <div>
                <dt className="text-sm text-white/70">Estimated monthly generation</dt>
                <dd className="mt-1 font-display text-4xl font-extrabold">{num(result.generation)} kWh</dd>
              </div>
              <div>
                <dt className="text-sm text-white/70">Indicative monthly bill offset</dt>
                <dd className="mt-1 font-display text-2xl font-bold">up to {inr(result.savings)}</dd>
              </div>
              <div>
                <dt className="text-sm text-white/70">Indicative system cost range</dt>
                <dd className="mt-1 font-display text-2xl font-bold">
                  {inr(result.costLow)} to {inr(result.costHigh)}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-white/70">
              Approximate roof area needed: {num(result.roofNeeded)} sq ft.
              {result.roofLimited && " The suggested size is limited by the roof area you entered."}
            </p>
            <p className="mt-6 rounded-xl bg-white/10 p-4 text-sm leading-relaxed text-white/85">
              <strong>Indicative estimate only, not a quotation.</strong> Actual system size, generation, cost and savings
              depend on a site survey, shading, roof condition, component choice, tariffs and DISCOM rules.
            </p>
            <ButtonLink href="/request-quote" variant="cta" size="lg" className="mt-6">
              Request an Accurate Quote
            </ButtonLink>
          </div>
        ) : (
          <div className="flex h-full min-h-64 items-center justify-center rounded-card border border-dashed border-line bg-canvas p-8 text-center text-muted">
            Enter your monthly {mode === "bill" ? "bill" : "units"} to see an indicative estimate.
          </div>
        )}
      </div>
    </div>
  );
}
