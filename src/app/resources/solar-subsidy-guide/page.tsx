import { ExternalLink } from "lucide-react";
import { company } from "@/content/company";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Alert } from "@/components/ui/Alert";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Government Rooftop Solar Subsidy Guide",
  description:
    "An informational overview of government rooftop solar schemes for Indian households, with links to official sources for eligibility and current subsidy terms.",
  path: "/resources/solar-subsidy-guide",
});

// TODO: review this page periodically; scheme names, processes and links change.
const officialSources = [
  {
    name: "PM Surya Ghar: Muft Bijli Yojana (national rooftop solar portal)",
    href: "https://pmsuryaghar.gov.in",
    text: "Official portal for residential rooftop solar applications, eligibility and current subsidy terms.",
  },
  {
    name: "Ministry of New and Renewable Energy (MNRE)",
    href: "https://mnre.gov.in",
    text: "The ministry responsible for national renewable energy programmes, guidelines and notifications.",
  },
];

const steps = [
  "Check eligibility and current subsidy terms on the official national portal.",
  "Register on the portal with your electricity connection details and apply.",
  "Your electricity distribution company (DISCOM) reviews technical feasibility.",
  "Install the system through a vendor that meets the scheme's requirements.",
  "Apply for net metering; the DISCOM installs the meter and inspects the system.",
  "After commissioning is approved, submit the details required for subsidy release.",
];

export default function SubsidyGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Residential · Informational"
        title="Government Rooftop Solar Subsidy Guide"
        description="A plain-language overview of how government rooftop solar schemes for homes generally work, with links to the official sources."
        breadcrumbs={[
          { name: "Resources", href: "/resources" },
          { name: "Subsidy Guide", href: "/resources/solar-subsidy-guide" },
        ]}
      />
      <section className="section">
        <div className="container-site max-w-3xl space-y-12">
          <Alert variant="warning" title="Informational only">
            This guide is a general overview, not advice about your eligibility. Scheme rules, subsidy amounts and
            processes are set by the government and can change. Always confirm current details on the official portal.{" "}
            {company.name} does not decide eligibility or approve subsidies.
          </Alert>

          <div className="prose-tc text-lg">
            <h2>What are rooftop solar subsidies?</h2>
            <p>
              The Government of India runs schemes that support households installing grid-connected rooftop solar. The
              main national programme for homes is PM Surya Ghar: Muft Bijli Yojana. Support is usually provided as
              central financial assistance credited after the system is installed and inspected.
            </p>
            <p>
              Some states run additional programmes. Subsidy amounts generally depend on system capacity and category, and
              they are revised from time to time, so check the official portal for current figures.
            </p>

            <h2>How the process generally works</h2>
            <ol className="list-decimal space-y-2 pl-6">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <h2>Before you apply</h2>
            <ul>
              <li>Keep a recent electricity bill and your consumer number handy.</li>
              <li>Check that your roof has enough shadow-free area for the system you want.</li>
              <li>Ask any vendor to explain the scheme requirements they meet, in writing.</li>
              <li>Never pay anyone who promises guaranteed subsidy approval.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-evergreen">Official sources</h2>
            <ul className="mt-6 space-y-4">
              {officialSources.map((s) => (
                <li key={s.href} className="card p-6">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-display font-bold text-primary hover:underline"
                  >
                    {s.name}
                    <ExternalLink className="size-4" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <p className="mt-2 text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBanner
        title="Planning rooftop solar for your home?"
        description="We can assess your roof and consumption and explain the next steps. Eligibility for any scheme is confirmed only through official channels."
        primary={{ label: "Request a Solar Quote", href: "/request-quote?type=residential" }}
      />
    </>
  );
}
