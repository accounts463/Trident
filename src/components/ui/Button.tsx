import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "cta" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

// Buttons press in slightly and any trailing arrow nudges forward on hover.
const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-bold tracking-tight transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.97] [&_.lucide-arrow-right]:transition-transform hover:[&_.lucide-arrow-right]:translate-x-1 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  cta: "btn-shine bg-accent text-white shadow-[0_8px_20px_-8px_rgb(217_56_0/0.6)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_28px_-10px_rgb(217_56_0/0.7)]",
  secondary: "border border-primary/25 bg-white text-primary hover:border-primary hover:bg-tint",
  ghost: "text-primary hover:bg-tint",
  light: "bg-white text-navy hover:bg-canvas",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function ButtonLink({ variant, size, className, ...props }: LinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  loadingText?: ReactNode;
};

export function Button({ variant, size, className, loading, loadingText, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={buttonClasses(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
