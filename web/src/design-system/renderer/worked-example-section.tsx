import type { Example } from "../../types/protocol";
import { InkColors, LeaderCaption, SchematicCard } from "../motifs";

import { FigHeader } from "./fig-header";

export function WorkedExampleSection({ example, fig }: { example: Example; fig: string | null }) {
  if (!example.code) return null;
  const captions = example.captions ?? [];
  return (
    <section className="section-rule">
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="Worked example." />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: captions.length > 0 ? "8fr 4fr" : "1fr",
          gap: 36,
          alignItems: "start",
        }}
      >
        <SchematicCard pad="20px 24px">
          {example.lang && (
            <div
              className="fig-label"
              style={{ letterSpacing: "0.18em", marginBottom: 10, fontSize: 10 }}
            >
              {example.lang}
            </div>
          )}
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              lineHeight: 1.6,
              color: InkColors.ink,
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {example.code}
          </pre>
        </SchematicCard>
        {captions.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 8 }}>
            {captions.map((c, i) => (
              <LeaderCaption key={i} letter={["i", "ii", "iii", "iv"][i] || String(i + 1)}>
                {c}
              </LeaderCaption>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
