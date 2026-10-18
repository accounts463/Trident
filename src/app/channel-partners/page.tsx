import { notFound } from "next/navigation";
import { company } from "@/content/company";
import { PageHero } from "@/components/sections/PageHero";
import { LeadFormSection } from "@/components/sections/shared-sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Channel Partners",
  description: `Partner with ${company.name} to bring reliable solar solutions to more customers.`,
  path: "/channel-partners",
  noIndex: !company.features.channelPartners,
});

// Enabled via company.features.channelPartners.
export default function ChannelPartnersPage() {
  if (!company.features.channelPartners) notFound();
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Become a Channel Partner"
        description="Work with us to bring reliable solar products and installations to customers in your region."
        breadcrumbs={[{ name: "Channel Partners", href: "/channel-partners" }]}
      />
      <LeadFormSection title="Partner enquiry" description="Tell us about your business and the region you serve." />
    </>
  );
}
