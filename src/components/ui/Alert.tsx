import { CircleAlert, CircleCheck, Info, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "success" | "error" | "info" | "warning";

const styles: Record<Variant, { box: string; icon: typeof Info }> = {
  success: { box: "border-primary/25 bg-tint text-navy", icon: CircleCheck },
  error: { box: "border-danger/30 bg-red-50 text-danger", icon: CircleAlert },
  info: { box: "border-line bg-canvas text-ink", icon: Info },
  warning: { box: "border-amber-300 bg-amber-50 text-amber-950", icon: ShieldAlert },
};

/** Inline alert / toast body. Errors announce assertively; others politely. */
export function Alert({ variant = "info", title, children, className }: { variant?: Variant; title?: string; children?: ReactNode; className?: string }) {
  const { box, icon: IconComponent } = styles[variant];
  return (
    <div role={variant === "error" ? "alert" : "status"} className={cn("flex gap-3 rounded-2xl border p-4 text-sm", box, className)}>
      <IconComponent className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="leading-relaxed">{children}</div>}
      </div>
    </div>
  );
}
