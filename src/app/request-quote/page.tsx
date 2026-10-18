import { CheckCircle2 } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description: "Request a quote for LT panels, compact substations, bus ducts, cable trays, earthing, stabilizers or electrical contracting from Trident Core Energy.",
  path: "/request-quote",
});

const next = [
  "Our engineers review your requirement.",
  "We contact you by your preferred method to confirm ratings and scope.",
  "Where needed, we review drawings or visit the site.",
  "You receive a clear, itemised quotation.",
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Request a Quote"
        description="Three short steps. Share what you can, such as ratings, quantities or an SLD reference, and our engineers will follow up on the details."
        breadcrumbs={[{ name: "Request a Quote", href: "/request-quote" }]}
      />
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>
          <aside className="lg:col-span-4">
            <div className="card sticky top-28 p-6 md:p-8">
              <h2 className="font-display text-lg font-bold text-navy">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {next.map((n) => (
                  <li key={n} className="flex gap-3 text-sm text-ink">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />
                    {n}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                Quotations are prepared after reviewing your requirement, drawings and site conditions. Have an SLD or
                BOQ? Mention it in the form and we&apos;ll ask you to share it.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
