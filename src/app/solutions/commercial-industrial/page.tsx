import { notFound } from "next/navigation";
import { company } from "@/content/company";
import { faqs } from "@/content/faqs";
import { AudiencePage } from "@/components/sections/AudiencePage";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Commercial & Industrial Solar",
  description:
    "Commercial solar solutions and industrial solar EPC for offices, institutions, factories and warehouses: engineering, installation and O&M by Trident Core Energy.",
  path: "/solutions/commercial-industrial",
});

export default function CommercialIndustrialPage() {
  if (!company.features.commercial && !company.features.industrial) notFound();
  return (
    <AudiencePage
      eyebrow="Commercial & Industrial"
      title="Solar That Works as Hard as Your Business"
      description="Rooftop and captive solar for offices, institutions, factories and warehouses, engineered for your load profile and installed around your operations."
      breadcrumbs={[
        { name: "Solutions", href: "/solutions" },
        { name: "Commercial & Industrial", href: "/solutions/commercial-industrial" },
      ]}
      image={images.industrialRoof}
      benefitsTitle="Built for business energy demand"
      benefits={[
        { icon: "zap", title: "Offset daytime demand", description: "Solar generation aligns well with daytime commercial and industrial loads." },
        { icon: "ruler", title: "Engineered for your site", description: "Load, tariff and structural analysis shape every design." },
        { icon: "hardhat", title: "Minimal disruption", description: "Phased installation and planned shutdown windows for integration." },
        { icon: "shield", title: "Safety-led execution", description: "Documented safety procedures agreed with your facility team." },
        { icon: "leaf", title: "Sustainability goals", description: "Clean generation on site supports your environmental commitments." },
        { icon: "wrench", title: "Long-term O&M", description: "Monitoring and maintenance plans to protect performance." },
      ]}
      faqs={faqs.filter((f) => f.category === "Commercial & Industrial" || f.category === "Maintenance")}
      quoteType="commercial"
    />
  );
}
