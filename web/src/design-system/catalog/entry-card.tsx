"use client";

import Link from "next/link";
import { useState } from "react";

import type { CatalogEntry } from "../../types/catalog";
import { DimLine, Icon, InkColors } from "../motifs";

import { EntryThumbnail } from "./entry-thumbnail";

export type { CatalogEntry };

export function EntryCard({ entry }: { entry: CatalogEntry }) {
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
