import { faqs } from "@/content/faqs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSearch } from "@/components/sections/FaqSearch";
import { PageHero } from "@/components/sections/PageHero";
import { faqJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solar FAQs",
  description: "Answers to common questions about rooftop solar, commercial and industrial solar, module supply and solar maintenance.",
  path: "/resources/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Quick answers about our services, rooftop solar, business installations, module supply and maintenance."
        breadcrumbs={[
          { name: "Resources", href: "/resources" },
          { name: "FAQs", href: "/resources/faqs" },
        ]}
      />
      <section className="section">
        <div className="container-site max-w-4xl">
          <FaqSearch faqs={faqs} />
        </div>
      </section>
      <CtaBanner title="Still have questions?" description="Our team is happy to talk through your project and answer anything not covered here." />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
