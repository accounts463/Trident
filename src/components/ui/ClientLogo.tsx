import Image from "next/image";
import { clientLogos } from "@/content/client-logos";
import { cn } from "@/lib/cn";

/**
 * A client's logo, scaled to fit its box without cropping. Falls back to the name as
 * text when no logo file exists. The name is always the accessible label.
 */
export function ClientLogo({ name, className, sizes = "160px" }: { name: string; className?: string; sizes?: string }) {
  const logo = clientLogos[name];
  if (!logo) {
    return (
      <span className={cn("flex items-center justify-center text-center font-display text-sm font-bold text-navy", className)}>
        {name}
      </span>
    );
  }
  return (
    <span className={cn("relative block", className)}>
      <Image src={logo.src} alt={name} title={name} fill sizes={sizes} className="object-contain" />
    </span>
  );
}
