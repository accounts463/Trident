import { ArrowRight, ArrowUpRight, Check, Download as DownloadIcon, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import type { Article, Download, Product, Project, Solution } from "@/content/types";
import { formatDate } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Media } from "./Media";
import { SampleBadge } from "./SampleBadge";

const cardSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

export function ServiceCard({ solution }: { solution: Solution }) {
  return (
    <article className="card card-interactive group relative flex flex-col overflow-hidden" data-reveal>
      <Media image={solution.image} className="aspect-[16/10]" sizes={cardSizes} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-evergreen">{solution.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{solution.summary}</p>
        <ul className="mt-5 space-y-2">
          {solution.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
        <Link
          href={solution.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
        >
          Learn More<span className="sr-only"> about {solution.title}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card card-interactive group relative flex flex-col overflow-hidden" data-reveal>
      <Media image={product.image} className="aspect-[4/3]" sizes={cardSizes} />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow text-primary">{product.category}</span>
          <SampleBadge status={product.status} />
        </div>
        <h3 className="font-display text-xl font-bold text-evergreen">{product.name}</h3>
        <p className="leading-relaxed text-muted">{product.summary}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
        >
          View specifications<span className="sr-only"> for {product.name}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-interactive group relative flex flex-col overflow-hidden" data-reveal>
      <div className="relative">
        <Media image={project.image} className="aspect-[4/3]" sizes={cardSizes} />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-evergreen">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <SampleBadge status={project.status} />
        <h3 className="font-display text-xl font-bold text-evergreen">{project.name}</h3>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted">Location</dt>
            <dd className="flex items-center gap-1 font-medium text-ink">
              <MapPin className="size-3.5 text-primary" aria-hidden />
              {project.location}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Installation</dt>
            <dd className="font-medium text-ink">{project.installationType}</dd>
          </div>
          {project.capacity && (
            <div>
              <dt className="text-muted">Capacity</dt>
              <dd className="font-medium text-ink">{project.capacity}</dd>
            </div>
          )}
        </dl>
        <p className="leading-relaxed text-muted">{project.summary}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
        >
          View Project<span className="sr-only">: {project.name}</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <article className={cn("card card-interactive group relative flex flex-col overflow-hidden", className)} data-reveal>
      <Media image={article.image} className="aspect-[16/9]" sizes={cardSizes} decorative />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="eyebrow text-primary">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-evergreen">{article.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <Link
          href={`/resources/${article.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
        >
          Read More<span className="sr-only">: {article.title}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function DownloadCard({ download }: { download: Download }) {
  return (
    <article className="card card-interactive flex items-start gap-4 p-5" data-reveal>
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mint text-primary">
        <FileText className="size-6" aria-hidden />
      </span>
      <div className="flex-1">
        <p className="eyebrow text-primary">{download.category}</p>
        <h3 className="mt-1 font-display font-bold text-evergreen">{download.title}</h3>
        <p className="mt-1 text-sm text-muted">{download.description}</p>
        <a
          href={download.file}
          download
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <DownloadIcon className="size-4" aria-hidden />
          Download {download.fileType} ({download.sizeLabel})
        </a>
      </div>
    </article>
  );
}
