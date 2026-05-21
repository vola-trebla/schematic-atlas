import type { Group } from "../../types/protocol";
import { Icon, InkColors, SchematicCard } from "../motifs";

import { FigHeader } from "./fig-header";

function GroupCard({ group }: { group: Group }) {
  return (
    <SchematicCard partTag={`G.${group.key.slice(0, 3).toUpperCase()}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        {group.icon && (
          <span
            style={{
              width: 32,
              height: 32,
              border: `1.5px solid ${InkColors.ink}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name={group.icon} size={18} />
          </span>
        )}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            lineHeight: 1,
            color: InkColors.ink,
            whiteSpace: "nowrap",
          }}
        >
          {group.title}
        </div>
        <div
          className="fig-label"
          style={{ letterSpacing: "0.04em", marginLeft: "auto", whiteSpace: "nowrap" }}
        >
          {group.items.length} {group.items.length === 1 ? "tool" : "tools"}
        </div>
      </div>
      {group.blurb && (
        <p className="card-body" style={{ margin: "0 0 12px" }}>
          {group.blurb}
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          borderTop: `1px dashed ${InkColors.faint}`,
          paddingTop: 12,
        }}
      >
        {group.items.map((t) => (
          <div
            key={t.name}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 12,
              alignItems: "baseline",
            }}
          >
            <span className="tool-name">{t.name}</span>
            {t.sub && <span className="tool-sub">— {t.sub}</span>}
          </div>
        ))}
      </div>
    </SchematicCard>
  );
}

export function ComponentsSection({
  fig,
  groups,
  tools,
}: {
  fig: string | null;
  groups?: Group[];
  tools?: { name: string; sub?: string }[];
}) {
  if ((!groups || groups.length === 0) && (!tools || tools.length === 0)) return null;
  return (
    <section className="section-rule">
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title={groups ? "Components, grouped." : "Components."} />
      </div>

      {groups && groups.length > 0 && (
        <div className={groups.length === 1 ? undefined : "catalog-grid"} style={{ gap: 24 }}>
          {groups.map((g) => (
            <GroupCard key={g.key} group={g} />
          ))}
        </div>
      )}

      {tools && tools.length > 0 && (
        <SchematicCard pad="20px 24px">
          <div className="catalog-grid" style={{ gap: "8px 32px" }}>
            {tools.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 12,
                  alignItems: "baseline",
                  paddingBottom: 6,
                  borderBottom: `1px dashed ${InkColors.faint}`,
                }}
              >
                <span className="tool-name">{t.name}</span>
                {t.sub && <span className="tool-sub">— {t.sub}</span>}
              </div>
            ))}
          </div>
        </SchematicCard>
      )}
    </section>
  );
}
