import { InkColors } from "../motifs";

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

export function CategoryFilter({
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
