import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Props = {
  icon: IconName;
  title: string;
  description: string;
  tone?: "light" | "dark";
  className?: string;
};

export function IconFeature({ icon, title, description, tone = "light", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-4", className)} data-reveal>
      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-2xl",
          tone === "dark" ? "bg-white/10 text-accent-soft" : "bg-tint text-primary",
        )}
      >
        <Icon name={icon} className="size-6" />
      </span>
      <div>
        <h3 className={cn("font-display text-lg font-bold", tone === "dark" ? "text-white" : "text-navy")}>{title}</h3>
        <p className={cn("mt-2 leading-relaxed", tone === "dark" ? "text-white/70" : "text-muted")}>{description}</p>
      </div>
    </div>
  );
}
