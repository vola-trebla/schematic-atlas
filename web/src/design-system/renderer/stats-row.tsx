import { DimLine, InkColors } from "../motifs";

export function StatsRow({ stats }: { stats?: [string, string?][] }) {
  if (!stats || stats.length === 0) return null;
  return (
    <section style={{ padding: "0 0 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
        {stats.map(([value, label], i) => (
          <DimLine
            key={i}
            label={label ? `${value} · ${label}` : value}
            width={150}
            color={i % 2 ? InkColors.blue : InkColors.ink}
          />
        ))}
      </div>
    </section>
  );
}
