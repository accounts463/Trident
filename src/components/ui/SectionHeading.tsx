import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", as = "h2", tone = "light", className, id }: Props) {
  const Heading = as;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)} data-reveal>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
            tone === "dark" ? "text-accent-soft" : "text-accent",
          )}
        >
          <span className="slash text-[0.7rem]" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-display font-extrabold",
          as === "h1" ? "text-4xl leading-[1.06] md:text-5xl lg:text-6xl" : "text-3xl leading-tight md:text-4xl",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", tone === "dark" ? "text-white/75" : "text-muted")}>{description}</p>
      )}
    </div>
  );
}
