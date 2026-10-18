import { notFound } from "next/navigation";
import { company } from "@/content/company";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: `Careers at ${company.name}.`,
  path: "/careers",
  noIndex: !company.features.careers,
});

// Enabled via company.features.careers. TODO: add real openings before enabling.
export default function CareersPage() {
  if (!company.features.careers) notFound();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a Cleaner Energy Future With Us"
        description="We're always interested in hearing from engineers, technicians and specialists who care about quality work."
        breadcrumbs={[{ name: "Careers", href: "/careers" }]}
      />
      <section className="section">
        <div className="container-site max-w-3xl text-center">
          <p className="text-lg text-muted">Current openings will be listed here. To introduce yourself, get in touch through our contact page.</p>
          <ButtonLink href="/contact" className="mt-8">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
