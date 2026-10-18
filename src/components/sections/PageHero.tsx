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
  children?: ReactNode;
};

/** Inner-page hero: dark band with breadcrumbs, single H1 and optional image. */
export function PageHero({ eyebrow, title, description, breadcrumbs, image, children }: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-evergreen">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(60% 80% at 85% 0%, rgb(34 197 94 / 0.22), transparent 60%)" }}
        aria-hidden
      />
      <div className="container-site relative grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className={image ? "lg:col-span-7" : "lg:col-span-9"}>
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          {eyebrow && <p className="eyebrow mt-8 text-sun">{eyebrow}</p>}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <Media image={image} priority className="aspect-[4/3] rounded-card ring-1 ring-white/10" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
