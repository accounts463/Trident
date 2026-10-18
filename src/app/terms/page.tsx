import { company } from "@/content/company";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms governing use of the ${company.name} website.`,
  path: "/terms",
});

// TODO: have these terms reviewed by Trident Core Energy's legal advisor before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms">
      <p>By using this website you agree to these terms.</p>
      <h2>Information on this website</h2>
      <p>
        Content on this website is provided for general information. It is not a quotation, offer or guarantee. Product
        details, specifications and services may change without notice. Specifications shown are typical and are
        confirmed for each order in our quotation and drawings.
      </p>
      <h2>Quotes and contracts</h2>
      <p>
        Prices, ratings, specifications, timelines and warranties apply only as stated in a written proposal or contract issued
        by {company.legalName ?? company.name}.
      </p>
      <h2>Payments and fraud awareness</h2>
      <p>
        Make payments only after confirming bank details directly with us through the official contact details published
        on this website. We are not responsible for payments made to accounts not confirmed through our official channels.
      </p>
      <h2>Third-party links</h2>
      <p>Links to external websites, including government portals, are provided for convenience. We do not control their content.</p>
      <h2>Intellectual property</h2>
      <p>Website content, design and branding belong to {company.name} unless stated otherwise and may not be reused without permission.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. The current version is always available on this page.</p>
    </LegalPage>
  );
}
