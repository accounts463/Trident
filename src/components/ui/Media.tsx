import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide from assistive tech when the image is purely decorative. */
  decorative?: boolean;
  /** "contain" suits product cut-outs on white; "cover" suits photos. */
  fit?: "cover" | "contain";
};

/**
 * Renders a photo via next/image, or a neutral branded placeholder carrying
 * the same alt text when no src is set.
 */
export function Media({ image, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, decorative, fit = "cover" }: Props) {
  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden", fit === "contain" && "bg-white", className)}>
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain p-[6%]" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("grid-lines relative overflow-hidden bg-navy", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : image.alt}
      aria-hidden={decorative || undefined}
    >
      <span className="slash absolute bottom-5 right-5 text-3xl" aria-hidden />
    </div>
  );
}
