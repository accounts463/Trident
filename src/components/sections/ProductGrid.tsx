"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/content/types";
import { ProductCard } from "@/components/ui/cards";
import { cn } from "@/lib/cn";

export function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<ProductCategory | "All">("All");
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const shown = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
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
        Showing {shown.length} {shown.length === 1 ? "product" : "products"}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
