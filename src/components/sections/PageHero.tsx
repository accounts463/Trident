import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Media } from "@/components/ui/Media";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  image?: ImageAsset;
  /** "contain" for product cut-outs on white. */
  imageFit?: "cover" | "contain";
  children?: ReactNode;
};

/** Inner-page hero: navy band with breadcrumbs, single H1 and optional image. */
export function PageHero({ eyebrow, title, description, breadcrumbs, image, imageFit = "cover", children }: Props) {
  return (
    <section className="on-dark grid-lines relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 90% at 90% 10%, rgb(45 78 158 / 0.55), transparent 65%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 top-0 hidden h-full w-20 -skew-x-[24deg] bg-accent/90 lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-24 top-0 hidden h-full w-6 -skew-x-[24deg] bg-primary/70 lg:block"
        aria-hidden
      />
      <div className="container-site relative grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className={image ? "lg:col-span-7" : "lg:col-span-8"}>
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          {eyebrow && (
            <p className="eyebrow mt-8 flex items-center gap-3 text-accent-soft">
              <span className="slash text-[0.7rem]" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-white md:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <Media
              image={image}
              priority
              fit={imageFit}
              className="aspect-[4/3] rounded-card shadow-2xl ring-1 ring-white/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
