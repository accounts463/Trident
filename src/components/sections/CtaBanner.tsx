import { ButtonLink } from "@/components/ui/Button";

type Props = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBanner({
  title = "Let's Build a Cleaner Energy Future Together.",
  description = "Tell us about your home, business or project. Our team will help you understand your options and plan the right solar solution.",
  primary = { label: "Request a Solar Quote", href: "/request-quote" },
  secondary = { label: "Talk to Our Team", href: "/contact" },
}: Props) {
  return (
    <section className="section">
      <div className="container-site">
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 md:px-14 md:py-20" data-reveal>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 90% at 100% 0%, rgb(250 204 21 / 0.18), transparent 60%), radial-gradient(60% 80% at 0% 100%, rgb(11 47 36 / 0.7), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">{title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="cta" size="lg">
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="outline-light" size="lg">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
