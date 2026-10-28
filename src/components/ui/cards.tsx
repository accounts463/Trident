import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Certification, Product, ProductCategory, Service } from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Media } from "./Media";

const cardSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

export function ProductCard({ product, categoryName }: { product: Product; categoryName?: string }) {
  return (
    <article className="card card-interactive group relative flex flex-col overflow-hidden" data-reveal>
      <Media
        image={product.image}
        fit={product.representativeImage || product.photoImages ? "cover" : "contain"}
        className="aspect-[4/3] border-b border-line"
        sizes={cardSizes}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        {categoryName && <p className="eyebrow text-accent">{categoryName}</p>}
        <h3 className="font-display text-xl font-bold text-navy">{product.name}</h3>
        <p className="leading-relaxed text-muted">{product.summary}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-primary after:absolute after:inset-0 after:content-['']"
        >
          View details<span className="sr-only">: {product.name}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function CategoryCard({ category, count }: { category: ProductCategory; count: number }) {
  return (
    <article className="card card-interactive group relative flex flex-col overflow-hidden" data-reveal>
      <div className="relative">
        <Media image={category.image} className="aspect-[16/11]" sizes={cardSizes} />
        <span className="absolute left-4 top-4 inline-flex size-11 items-center justify-center rounded-lg bg-white text-primary shadow-card">
          <Icon name={category.icon} className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-lg font-bold text-navy">{category.name}</h3>
        <p className="text-sm leading-relaxed text-muted">{category.summary}</p>
        <Link
          href={`/products/${category.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-primary after:absolute after:inset-0 after:content-['']"
        >
          {count} {count === 1 ? "product" : "products"}
          <span className="sr-only"> in {category.name}</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className={cn("card group relative flex flex-col gap-4 overflow-hidden p-6", service.page && "card-interactive")} data-reveal>
      <span
        className="absolute right-5 top-4 font-display text-4xl font-black text-line transition-colors group-hover:text-tint"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative inline-flex size-12 items-center justify-center rounded-lg bg-tint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon name={service.icon} className="size-6" />
      </span>
      <div className="relative">
        <h3 className="font-display text-lg font-bold text-navy">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
      </div>
      {service.page && (
        <Link
          href={`/services/${service.page.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary after:absolute after:inset-0 after:content-['']"
        >
          Learn more<span className="sr-only">: {service.title}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </article>
  );
}

export function CertificateCard({ certification }: { certification: Certification }) {
  return (
    <article className="card card-interactive group relative flex flex-col overflow-hidden" data-reveal>
      <Media
        image={certification.image}
        fit="contain"
        className="aspect-[4/5] border-b border-line bg-canvas"
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-lg font-bold text-navy">{certification.name}</h3>
        <p className="text-sm font-semibold text-primary">{certification.issuer}</p>
        <p className="text-sm leading-relaxed text-muted">{certification.detail}</p>
        {certification.image.src && (
          <a
            href={certification.image.src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-primary after:absolute after:inset-0 after:content-['']"
          >
            View document<span className="sr-only">: {certification.name} (opens in a new tab)</span>
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
