import type { ContentStatus } from "@/content/types";

/** Flags illustrative content so it is never mistaken for verified company data. */
export function SampleBadge({ status }: { status: ContentStatus }) {
  if (status !== "sample") return null;
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
      Sample content: replace before launch
    </span>
  );
}
