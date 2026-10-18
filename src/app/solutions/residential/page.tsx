import { notFound } from "next/navigation";
import { company } from "@/content/company";
import { faqs } from "@/content/faqs";
import { AudiencePage } from "@/components/sections/AudiencePage";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const metadata = pageMetadata({
  title: "Residential Rooftop Solar",
  description:
    "Residential rooftop solar for homes: site survey, system sizing from your bills, safe installation and long-term maintenance from Trident Core Energy.",
  path: "/solutions/residential",
});

export default function ResidentialPage() {
  if (!company.features.residential) notFound();
  return (
    <AudiencePage
      eyebrow="Residential Solar"
      title="Rooftop Solar for Your Home"
      description="Generate clean electricity on your own roof, with a system designed around your household's consumption, roof space and budget."
      breadcrumbs={[
        { name: "Solutions", href: "/solutions" },
        { name: "Residential Solar", href: "/solutions/residential" },
      ]}
      image={images.homeRooftop}
      benefitsTitle="Why homeowners choose rooftop solar"
      benefits={[
        { icon: "sun", title: "Clean power at home", description: "Use electricity generated on your own roof during the day." },
        { icon: "zap", title: "Lower grid dependence", description: "Solar can help reduce how much electricity you buy from the grid." },
        { icon: "sliders", title: "Sized for your home", description: "We size the system from your actual bills and usable roof area." },
        { icon: "shield", title: "Safe installation", description: "Proper structures, earthing and protection, installed by trained crews." },
        { icon: "message", title: "Clear guidance", description: "We explain approvals, metering and what to expect at every step." },
        { icon: "wrench", title: "Ongoing support", description: "Cleaning and maintenance support to keep your system performing." },
      ]}
      faqs={faqs.filter((f) => f.category === "Residential" || f.category === "Maintenance")}
      quoteType="residential"
    />
  );
}
