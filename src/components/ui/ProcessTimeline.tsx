import { cn } from "@/lib/cn";

type Step = { title: string; description: string };

/** Horizontal on desktop, vertical on mobile. Rendered as an ordered list for screen readers. */
export function ProcessTimeline({ steps, tone = "light", className }: { steps: Step[]; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const cols = steps.length === 5 ? "lg:grid-cols-5" : steps.length > 4 ? "lg:grid-cols-6" : "lg:grid-cols-4";
  return (
    <ol className={cn("relative grid gap-8 lg:gap-6", cols, className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-5" data-reveal>
          {/* connector */}
          {i < steps.length - 1 && (
            <span
              className={cn(
                "absolute left-5 top-12 h-[calc(100%-1rem)] w-px lg:left-12 lg:top-5 lg:h-px lg:w-[calc(100%-2rem)]",
                dark ? "bg-white/20" : "bg-primary/20",
              )}
              aria-hidden
            />
          )}
          <span
            className={cn(
              "relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
              dark ? "bg-accent-soft text-navy" : "bg-primary text-white",
            )}
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pb-2">
            <h3 className={cn("font-display text-base font-bold", dark ? "text-white" : "text-navy")}>
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/70" : "text-muted")}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
