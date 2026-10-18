import { Calculator } from "lucide-react";
import { company } from "@/content/company";
import { SolarCalculator } from "@/components/calculator/SolarCalculator";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

const live = company.calculator !== null;

export const metadata = pageMetadata({
  title: "Solar Calculator",
  description: "Get an indicative rooftop solar system size and estimate from your monthly electricity bill and roof area.",
  path: "/solar-calculator",
  // Keep the "coming soon" state out of search results.
  noIndex: !live,
});

export default function SolarCalculatorPage() {
  const a = company.calculator;
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Solar Calculator"
        description="A simple, transparent way to estimate the solar system size that may suit your needs."
        breadcrumbs={[{ name: "Solar Calculator", href: "/solar-calculator" }]}
      />
      <section className="section">
        <div className="container-site">
          {a ? (
            <>
              <SolarCalculator assumptions={a} />
              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="card p-6 md:p-8">
                  <h2 className="font-display text-xl font-bold text-evergreen">How the estimate is calculated</h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                    <li>Monthly units = monthly bill ÷ tariff (₹{a.tariffPerUnit}/kWh), or the units you enter.</li>
                    <li>System size (kW) = monthly units ÷ generation per kW per month for your location type.</li>
                    <li>
                      If you enter roof area, size is capped at roof area ÷ {a.roofAreaPerKw} sq ft per kW, and kept between{" "}
                      {a.minSystemKw} and {a.maxSystemKw} kW, rounded to the nearest 0.5 kW.
                    </li>
                    <li>Monthly generation = system size × generation per kW per month.</li>
                    <li>Bill offset = the smaller of generation and your units, × tariff.</li>
                    <li>
                      Cost range = system size × ₹{a.costPerKwRange[0].toLocaleString("en-IN")} to ₹
                      {a.costPerKwRange[1].toLocaleString("en-IN")} per kW.
                    </li>
                  </ol>
                </div>
                <div className="card p-6 md:p-8">
                  <h2 className="font-display text-xl font-bold text-evergreen">Assumptions</h2>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {a.locations.map((l) => (
                      <li key={l.id}>
                        {l.label}: {l.unitsPerKwPerMonth} kWh per kW per month
                      </li>
                    ))}
                    <li>Subsidies, taxes, financing and DISCOM charges are not included.</li>
                    <li>
                      {a.source}. Last reviewed {a.reviewedOn}.
                    </li>
                  </ul>
                  <p className="mt-4 text-sm font-semibold text-evergreen">
                    This is an indicative estimate only, not a quotation or a guarantee of savings.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="card mx-auto max-w-2xl p-8 text-center md:p-12">
              <span className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl bg-mint text-primary">
                <Calculator className="size-8" aria-hidden />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold text-evergreen">Our solar calculator is coming soon</h2>
              <p className="mt-3 leading-relaxed text-muted">
                We&apos;re validating the assumptions behind the calculator so its estimates are genuinely useful. In the
                meantime, our team can prepare an estimate based on your actual bills and site.
              </p>
              <ButtonLink href="/request-quote" variant="cta" size="lg" className="mt-8">
                Request a Quote
              </ButtonLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
