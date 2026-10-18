import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site max-w-2xl text-center">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-navy md:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-muted">The page may have moved, or the link may be incorrect.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            Browse Products
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
