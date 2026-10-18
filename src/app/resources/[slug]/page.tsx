import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/content/articles";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/ui/cards";
import { Media } from "@/components/ui/Media";
import { formatDate, getArticle, getArticles } from "@/lib/content";
import { articleJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({ title: article.title, description: article.excerpt, path: `/resources/${article.slug}`, type: "article" });
}

export default async function ArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = getArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-canvas">
          <div className="container-site max-w-4xl py-12 lg:py-16">
            <Breadcrumbs
              items={[
                { name: "Resources", href: "/resources" },
                { name: article.title, href: `/resources/${article.slug}` },
              ]}
            />
            <p className="eyebrow mt-8 text-primary">{article.category}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-evergreen md:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{article.excerpt}</p>
            <p className="mt-6 text-sm text-muted">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingMinutes} min read
            </p>
          </div>
        </header>
        <div className="container-site max-w-4xl">
          <Media image={article.image} priority decorative className="-mt-2 aspect-[21/9] rounded-card" sizes="(min-width: 1024px) 56rem, 100vw" />
          <div className="prose-tc mx-auto max-w-3xl py-12 text-lg">
            {article.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section bg-canvas">
          <div className="container-site">
            <h2 className="font-display text-2xl font-bold text-evergreen">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBanner />
      <JsonLd data={articleJsonLd(article)} />
    </>
  );
}
