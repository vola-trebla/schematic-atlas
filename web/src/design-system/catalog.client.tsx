"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { ProtocolConfig } from "../types/protocol";

import { Annotation, DimLine, Icon, InkColors } from "./schematic";

/* ── types ── */
type CatalogEntry = ProtocolConfig & { slug: string };

const CATEGORIES = [
  { key: "all", label: "all" },
  { key: "debugging", label: "debugging" },
  { key: "testing", label: "testing" },
  { key: "search", label: "search" },
  { key: "orchestration", label: "orchestration" },
  { key: "benchmarking", label: "benchmarking" },
  { key: "security", label: "security" },
  { key: "documentation", label: "documentation" },
  { key: "persistence", label: "persistence" },
];

/* ── AtlasHeader ── */
function AtlasHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 0 24px",
        borderBottom: `1.5px solid ${InkColors.ink}`,
        gap: 16,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          stroke={InkColors.ink}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="14" r="1.8" fill={InkColors.ink} stroke="none" />
          <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
          <path d="M50 56 L 44 52 M 50 56 L 44 60" strokeWidth="2" />
        </svg>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 42,
            fontWeight: 700,
            lineHeight: 1,
            color: InkColors.ink,
            paddingRight: 4,
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          Schematic Atlas
        </h1>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: InkColors.muted,
          textAlign: "right",
          lineHeight: 1.4,
        }}
      >
        a visual encyclopedia
        <br />
        of MCP &amp; AI tooling
      </span>
    </header>
  );
}

/* ── Intro ── */
function Intro({ count }: { count: number }) {
  return (
    <section style={{ padding: "52px 0 36px", position: "relative" }}>
      <span
        style={{
          position: "absolute",
          top: 64,
          left: -68,
          transform: "rotate(-90deg)",
          transformOrigin: "left top",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: InkColors.faint,
          }}
        >
          index
        </span>
      </span>
      <div className="intro-grid">
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 22,
            lineHeight: 1.5,
            color: InkColors.ink,
            maxWidth: "56ch",
            margin: 0,
          }}
        >
          One page per protocol. Each page is a single schematic explanation of what the tool does,
          how the data flows, and which components it exposes. No marketing, no scroll-jacking.
          Drawn by hand, mostly.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            justifyContent: "flex-end",
            paddingBottom: 4,
          }}
        >
          <DimLine label={`${count} entries`} width={140} />
          <DimLine label="v0.1" width={80} color={InkColors.blue} />
        </div>
      </div>
    </section>
  );
}

/* ── CategoryFilter ── */
function CategoryFilter({
  active,
  onSelect,
  counts,
}: {
  active: string;
  onSelect: (k: string) => void;
  counts: Record<string, number>;
}) {
  const visibleCategories = CATEGORIES.filter((c) => c.key === "all" || (counts[c.key] ?? 0) > 0);

  return (
    <div
      role="group"
      aria-label="Filter by category"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "20px 0 28px",
        flexWrap: "wrap",
        borderBottom: `1px dashed ${InkColors.faint}`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: InkColors.faint,
          marginRight: 8,
        }}
      >
        filter
      </span>
      {visibleCategories.map((c) => {
        const isActive = c.key === active;
        const n = c.key === "all" ? counts.all : (counts[c.key] ?? 0);
        return (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            aria-pressed={isActive}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: isActive ? "var(--paper)" : InkColors.ink,
              background: isActive ? InkColors.ink : "var(--paper-bright)",
              border: `1.4px solid ${InkColors.ink}`,
              borderRadius: 999,
              padding: "4px 12px",
              cursor: "pointer",
            }}
          >
            {c.label}
            <span
              style={{
                fontSize: 10,
                color: isActive ? "var(--paper)" : InkColors.muted,
                opacity: 0.8,
              }}
            >
              {n}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── EntryThumbnail ── */
function EntryThumbnail({ nodes }: { nodes: [string, string, string] }) {
  const NW = 88,
    NH = 32,
    GAP = 22;
  const W = nodes.length * NW + (nodes.length - 1) * GAP;
  const H = 56;
  const Y = (H - NH) / 2;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      fill="none"
      stroke={InkColors.ink}
      style={{ maxWidth: W }}
      aria-hidden="true"
    >
      {nodes.map((label, i) => {
        const x = i * (NW + GAP);
        const accent = i === Math.floor(nodes.length / 2);
        return (
          <g key={i}>
            <rect x={x} y={Y} width={NW} height={NH} strokeWidth={accent ? 2 : 1.4} />
            <text
              x={x + NW / 2}
              y={Y + NH / 2 + 4}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fill={InkColors.ink}
              stroke="none"
            >
              {label}
            </text>
            {i < nodes.length - 1 && (
              <g>
                <path
                  d={`M ${x + NW + 2} ${H / 2} L ${x + NW + GAP - 5} ${H / 2}`}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${x + NW + GAP - 9} ${H / 2 - 4} L ${x + NW + GAP - 4} ${H / 2} L ${x + NW + GAP - 9} ${H / 2 + 4}`}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── EntryCard ── */
function EntryCard({ entry }: { entry: CatalogEntry }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/${entry.slug}`}
      aria-label={`${entry.name} — ${entry.purpose}`}
      style={{
        position: "relative",
        display: "block",
        border: `1.5px solid ${InkColors.ink}`,
        padding: "20px 22px 22px",
        color: InkColors.ink,
        background: "var(--paper)",
        textDecoration: "none",
        transform: hovered ? "translate(-2px, -2px)" : "none",
        boxShadow: hovered ? `4px 4px 0 ${InkColors.faint}` : "none",
        transition:
          "transform 120ms cubic-bezier(0.7,0,0.3,1), box-shadow 120ms cubic-bezier(0.7,0,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {entry.partTag && (
        <span
          style={{
            position: "absolute",
            top: -10,
            left: 16,
            background: "var(--paper)",
            padding: "0 6px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: `1.4px solid ${InkColors.ink}`,
          }}
        >
          [{entry.partTag}]
        </span>
      )}

      <div
        style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 2, marginBottom: 8 }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 19,
            fontWeight: 600,
            color: InkColors.ink,
            lineHeight: 1.2,
          }}
        >
          {entry.name}
        </span>
        {entry.category && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: InkColors.muted,
              marginLeft: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {entry.category}
          </span>
        )}
      </div>

      <p
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: 16,
          lineHeight: 1.45,
          color: InkColors.ink,
          margin: "0 0 16px",
          maxWidth: "44ch",
        }}
      >
        {entry.purpose}
      </p>

      {entry.nodes && (
        <div
          style={{
            marginBottom: 16,
            padding: "8px 0",
            borderTop: `1px dashed ${InkColors.faint}`,
            borderBottom: `1px dashed ${InkColors.faint}`,
          }}
        >
          <EntryThumbnail nodes={entry.nodes} />
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {entry.stats?.map(([v, l], i) => (
            <DimLine
              key={i}
              label={l ? `${v} · ${l}` : v}
              width={90}
              color={i % 2 ? InkColors.blue : InkColors.ink}
            />
          ))}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: InkColors.ink,
            whiteSpace: "nowrap",
          }}
        >
          open
          <Icon name="arrow_right" size={13} />
        </span>
      </div>
    </Link>
  );
}

/* ── AtlasFooter ── */
function AtlasFooter() {
  return (
    <footer
      style={{
        padding: "48px 0 56px",
        borderTop: `1.5px solid ${InkColors.ink}`,
        marginTop: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: InkColors.muted,
          }}
        >
          Schematic Atlas · open catalog · drawn by hand, mostly
        </div>
        <div
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 14,
            color: InkColors.muted,
            marginTop: 8,
            maxWidth: "44ch",
            lineHeight: 1.5,
          }}
        >
          To add a protocol: open an issue or submit a PR with the protocol config.
        </div>
      </div>
      <Annotation side="left" color={InkColors.blue}>
        — part of the Schematic family.
      </Annotation>
    </footer>
  );
}

/* ── Root catalog component ── */
export function AtlasCatalog({ protocols }: { protocols: Record<string, ProtocolConfig> }) {
  const entries: CatalogEntry[] = Object.entries(protocols).map(([slug, p]) => ({ ...p, slug }));

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
