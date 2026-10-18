import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Media } from "@/components/ui/Media";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { getProject, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const visible = getProjects();
  // Cache Components requires at least one param; unknown slugs render notFound().
  return visible.length ? visible.map((p) => ({ slug: p.slug })) : [{ slug: projects[0]?.slug ?? "placeholder" }];
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
    noIndex: project.status === "sample",
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const facts = [
    { label: "Category", value: project.category },
    { label: "Location", value: project.location },
    { label: "Installation type", value: project.installationType },
    ...(project.capacity ? [{ label: "Installed capacity", value: project.capacity }] : []),
    ...(project.completed ? [{ label: "Completed", value: project.completed }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        description={project.summary}
        breadcrumbs={[
          { name: "Projects", href: "/projects" },
          { name: project.name, href: `/projects/${project.slug}` },
        ]}
      />
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <Media image={project.image} priority className="aspect-[16/9] rounded-card" sizes="(min-width: 1024px) 66vw, 100vw" />
            <SampleBadge status={project.status} />
            {[
              ["The challenge", project.challenge],
              ["Our solution", project.solution],
              ["The outcome", project.outcome],
            ].map(([title, text]) => (
              <div key={title}>
                <h2 className="font-display text-2xl font-bold text-evergreen">{title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <dl className="card sticky top-28 divide-y divide-line">
              {facts.map((f) => (
                <div key={f.label} className="px-6 py-4">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="mt-1 font-semibold text-evergreen">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
      <CtaBanner title="Planning a similar project?" />
    </>
  );
}
