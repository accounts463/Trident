import type { ReactNode } from "react";
import type { Faq, ImageAsset } from "@/content/types";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection, LeadFormSection, SolarProcess } from "@/components/sections/shared-sections";
import { ButtonLink } from "@/components/ui/Button";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import { IconFeature } from "@/components/ui/IconFeature";
import type { IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  image: ImageAsset;
  benefitsTitle: string;
  benefits: { icon: IconName; title: string; description: string }[];
  faqs: Faq[];
  quoteType: string;
  children?: ReactNode;
};

/** Shared layout for audience-specific solution pages (Residential, C&I). */
export function AudiencePage({ eyebrow, title, description, breadcrumbs, image, benefitsTitle, benefits, faqs, quoteType, children }: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} breadcrumbs={breadcrumbs} image={image}>
        <ButtonLink href={`/request-quote?type=${quoteType}`} variant="cta" size="lg">
          Get a Solar Quote
        </ButtonLink>
        <ButtonLink href="#enquiry" variant="outline-light" size="lg">
          Talk to Our Team
        </ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Benefits" title={benefitsTitle} />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <IconFeature key={b.title} {...b} />
            ))}
          </div>
        </div>
      </section>
      {children}
      <SolarProcess />
      <FaqSection faqs={faqs} />
      <LeadFormSection />
      <CtaBanner primary={{ label: "Request a Solar Quote", href: `/request-quote?type=${quoteType}` }} />
    </>
  );
}
