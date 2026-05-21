"use client";

import { useMemo, useState } from "react";

import type { CatalogEntry } from "../types/catalog";

import { AtlasFooter } from "./catalog/atlas-footer";
import { AtlasHeader } from "./catalog/atlas-header";
import { CategoryFilter } from "./catalog/category-filter";
import { EntryCard } from "./catalog/entry-card";
import { Intro } from "./catalog/intro";
import { InkColors } from "./motifs";

export function AtlasCatalog({ entries }: { entries: CatalogEntry[] }) {
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: entries.length };
    entries.forEach((e) => {
      if (e.category) c[e.category] = (c[e.category] ?? 0) + 1;
    });
    return c;
  }, [entries]);

  const [active, setActive] = useState("all");
  const visible = active === "all" ? entries : entries.filter((e) => e.category === active);

  return (
    <>
      <AtlasHeader />
      <Intro count={entries.length} />
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
            No entries in this category yet.
          </div>
        )}
      </section>
      <AtlasFooter />
    </>
  );
}
