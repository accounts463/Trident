"use client";

import { useState } from "react";
import { projectCategories } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/types";
import { ProjectCard } from "@/components/ui/cards";
import { cn } from "@/lib/cn";

/** Filter chips + grid. Only categories that have projects are offered. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const available = projectCategories.filter((c) => projects.some((p) => p.category === c));
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {available.length > 1 && (
        <div role="group" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-2">
          {(["All", ...available] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "h-10 rounded-full border px-5 text-sm font-semibold transition-colors",
                filter === c ? "border-primary bg-primary text-white" : "border-line bg-white text-evergreen hover:border-primary/40",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
