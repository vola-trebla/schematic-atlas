"use client";

import { useMemo, useState } from "react";

import type { CatalogEntry } from "../types/catalog";

import { AtlasFooter } from "./catalog/atlas-footer";
import { AtlasHeader } from "./catalog/atlas-header";
import { CategoryFilter } from "./catalog/category-filter";
import { EntryCard } from "./catalog/entry-card";
import { Intro } from "./catalog/intro";
import { SearchInput } from "./catalog/search-input";
import { InkColors } from "./motifs";

function matchesQuery(entry: CatalogEntry, q: string): boolean {
  if (!q) return true;
  return (
    entry.name.toLowerCase().includes(q) ||
    entry.purpose.toLowerCase().includes(q) ||
    (entry.category?.toLowerCase().includes(q) ?? false)
  );
}

export function AtlasCatalog({ entries }: { entries: CatalogEntry[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  // Apply search first — chip counts then reflect the current search,
  // so the user can see at a glance which categories the query landed in.
  const searchFiltered = useMemo(() => entries.filter((e) => matchesQuery(e, q)), [entries, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: searchFiltered.length };
    searchFiltered.forEach((e) => {
      if (e.category) c[e.category] = (c[e.category] ?? 0) + 1;
    });
    return c;
  }, [searchFiltered]);

  const visible =
    active === "all" ? searchFiltered : searchFiltered.filter((e) => e.category === active);

  return (
    <>
      <AtlasHeader />
      <Intro count={entries.length} />
      <SearchInput value={query} onChange={setQuery} />
      <CategoryFilter active={active} onSelect={setActive} counts={counts} />
      <section aria-label="Protocol entries" style={{ padding: "32px 0 8px" }}>
        <div className="catalog-grid">
          {visible.map((e) => (
            <EntryCard key={e.slug} entry={e} />
          ))}
        </div>
        {visible.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 60,
              fontFamily: "var(--font-hand)",
              fontStyle: "italic",
              fontSize: 16,
              color: InkColors.muted,
            }}
          >
            {q ? `No protocols match "${query}".` : "No entries in this category yet."}
          </div>
        )}
      </section>
      <AtlasFooter />
    </>
  );
}
