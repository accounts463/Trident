"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";

/** Client-side filter over FAQs, grouped by category. */
export function FaqSearch({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = q ? faqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : faqs;
  const categories = Array.from(new Set(matches.map((f) => f.category)));

  return (
    <div>
      <label htmlFor="faq-search" className="sr-only">
        Search FAQs
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, e.g. subsidy, cleaning, bulk"
          className="h-14 w-full rounded-full border border-line bg-white pl-12 pr-5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {q ? `${matches.length} ${matches.length === 1 ? "result" : "results"} for “${query.trim()}”` : `${faqs.length} questions`}
      </p>
      <div className="mt-8 space-y-10">
        {categories.map((c) => (
          <section key={c}>
            <h2 className="mb-4 font-display text-xl font-bold text-evergreen">{c}</h2>
            <Accordion items={matches.filter((f) => f.category === c)} />
          </section>
        ))}
        {matches.length === 0 && (
          <p className="rounded-card bg-canvas p-6 text-muted">
            No questions match your search. Try a different word, or contact our team directly.
          </p>
        )}
      </div>
    </div>
  );
}
