"use client";

import { InkColors } from "../motifs";

/**
 * Underlined hand-field search box for the catalog. Mirrors SInput's
 * aesthetic (transparent background, ink underline, hand font) but adds
 * an inline clear button — built here rather than as a motif so SInput
 * stays a clean primitive.
 */
export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div
      role="search"
      style={{
        position: "relative",
        maxWidth: 380,
        padding: "16px 0 4px",
      }}
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search protocols..."
        aria-label="Search protocols by name, purpose, or category"
        style={{
          width: "100%",
          background: "transparent",
          border: 0,
          borderBottom: `1.5px solid ${InkColors.ink}`,
          fontFamily: "var(--font-hand)",
          fontSize: 18,
          color: InkColors.ink,
          padding: "6px 28px 6px 2px",
          outline: "none",
          // Hide the native search clear (e.g. Webkit's × icon) — we render our own
          appearance: "none",
          WebkitAppearance: "none",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: 0,
            bottom: 6,
            background: "transparent",
            border: 0,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 22,
            lineHeight: 1,
            color: InkColors.muted,
            padding: "2px 6px",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
