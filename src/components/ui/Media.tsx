import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { showSampleContent } from "@/lib/content";

const tones: Record<NonNullable<ImageAsset["tone"]>, string> = {
  panels: "from-[#0e3b2c] via-[#14532d] to-[#1f6b3d]",
  factory: "from-[#0b2f24] via-[#173f33] to-[#2b5446]",
  rooftop: "from-[#14532d] via-[#2d6a45] to-[#5a8c5f]",
  people: "from-[#123828] via-[#1d4d36] to-[#3a6b4f]",
  landscape: "from-[#0b2f24] via-[#1a5a3a] to-[#7aa36b]",
};

type Props = {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide from assistive tech when the image is purely decorative. */
  decorative?: boolean;
};

/**
 * Renders a real photo via next/image once `image.src` is supplied. Until
 * then, shows a lightweight CSS placeholder carrying the same alt text, so
 * swapping in photography requires no component changes.
 */
export function Media({ image, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, decorative }: Props) {
  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {showSampleContent && image.stock && !decorative && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur">
            Stock photo
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-gradient-to-br", tones[image.tone ?? "panels"], className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : image.alt}
      aria-hidden={decorative || undefined}
    >
      <div className="absolute -right-10 -top-10 size-48 rounded-full bg-sun/25 blur-3xl" aria-hidden />
      <div
        className="absolute inset-x-[-25%] bottom-[-10%] h-[85%] origin-bottom [transform:perspective(700px)_rotateX(58deg)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.14) 0 1px, transparent 1px 56px), repeating-linear-gradient(0deg, rgb(255 255 255 / 0.14) 0 1px, transparent 1px 34px), linear-gradient(180deg, rgb(11 47 36 / 0) 0%, rgb(11 47 36 / 0.45) 100%)",
        }}
        aria-hidden
      />
      {showSampleContent && !decorative && (
        <span className="absolute bottom-3 left-3 max-w-[85%] rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
          Photo needed: {image.alt}
        </span>
      )}
    </div>
  );
}
