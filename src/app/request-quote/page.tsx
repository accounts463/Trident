import { CheckCircle2 } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Solar Quote",
  description: "Request a solar quote for residential, commercial or industrial solar, or bulk solar module procurement.",
  path: "/request-quote",
});

const next = [
  "We review your project details.",
  "Our team contacts you by your preferred method.",
  "Where needed, we arrange a site assessment.",
  "You receive a clear, itemised proposal.",
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Request a Solar Quote"
        description="Three short steps. Share what you can; our team will follow up to understand the details."
        breadcrumbs={[{ name: "Request a Quote", href: "/request-quote" }]}
      />
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>
          <aside className="lg:col-span-4">
            <div className="card sticky top-28 p-6 md:p-8">
              <h2 className="font-display text-lg font-bold text-evergreen">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {next.map((n) => (
                  <li key={n} className="flex gap-3 text-sm text-ink">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />
                    {n}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                Quotes are prepared after reviewing your requirements and site. We don&apos;t quote guaranteed prices or
                savings before an assessment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
