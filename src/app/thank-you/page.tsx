import { CircleCheck } from "lucide-react";
import { FraudNotice } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank You",
  description: "Your request has been received.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container-site max-w-2xl text-center">
        <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-mint text-primary">
          <CircleCheck className="size-9" aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold text-evergreen">Thank you. We&apos;ve received your request.</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Our team will review your details and get in touch using the contact information you provided.
        </p>
        <div className="mt-8 text-left">
          <FraudNotice tone="light" />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/resources" variant="secondary">
            Explore Solar Guides
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
