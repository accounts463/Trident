import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Alert } from "@/components/ui/Alert";
import { DownloadCard } from "@/components/ui/cards";
import { getDownloads, hasDownloads } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Downloads",
  description: "Download Trident Core Energy brochures, company profile and product datasheets.",
  path: "/downloads",
  noIndex: !hasDownloads,
});

export default function DownloadsPage() {
  const downloads = getDownloads();
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Downloads"
        description="Brochures, company profile and product datasheets."
        breadcrumbs={[{ name: "Downloads", href: "/downloads" }]}
      />
      <section className="section">
        <div className="container-site">
          {downloads.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {downloads.map((d) => (
                <DownloadCard key={d.file} download={d} />
              ))}
            </div>
          ) : (
            <Alert variant="info" title="Documents will be available soon">
              Need a brochure or datasheet now? Contact our team and we&apos;ll send it to you.
            </Alert>
          )}
        </div>
      </section>
      <CtaBanner title="Need a specific document?" primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Request a Quote", href: "/request-quote" }} />
    </>
  );
}
