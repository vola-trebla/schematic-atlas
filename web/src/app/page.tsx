import Link from "next/link";

import { PROTOCOLS } from "../data/protocols";
import { SchematicCard, DimLine } from "../design-system/schematic";
import type { Tool } from "../types/protocol";

export default function Home() {
  const protocols = Object.values(PROTOCOLS);

  return (
    <main style={{ padding: "var(--sp-6)", maxWidth: "1200px", margin: "0 auto" }}>
      <header
        style={{
          marginBottom: "var(--sp-8)",
          borderBottom: "1.5px solid var(--ink)",
          paddingBottom: "var(--sp-4)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-display-2)",
            color: "var(--ink)",
          }}
        >
          Schematic Atlas
        </h1>
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: "var(--fs-h3)",
            color: "var(--ink-soft)",
          }}
        >
          Visual Encyclopedia for{" "}
          <span style={{ backgroundColor: "var(--hl-yellow-a)", padding: "0 4px" }}>
            MCP Protocols
          </span>{" "}
          & AI Tooling
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "var(--sp-6)",
        }}
      >
        {protocols.map((p) => (
          <Link
            key={p.name}
            href={`/${p.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SchematicCard
              partTag={p.partTag}
              shadow
              style={{ height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-hand)",
                  fontSize: "16px",
                  marginBottom: "var(--sp-4)",
                  minHeight: "3em",
                }}
              >
                {p.purpose}
              </p>

              <div
                style={{ display: "flex", justifyContent: "center", marginBottom: "var(--sp-4)" }}
              >
                {p.stats && p.stats[0] && (
                  <DimLine label={`${p.stats[0][0]} · ${p.stats[0][1]}`} width={280} />
                )}
              </div>

              <div
                style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap", marginTop: "auto" }}
              >
                {(p.tools ?? []).slice(0, 3).map((t: Tool) => (
                  <span
                    key={t.name}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      border: "1px solid var(--ink)",
                      padding: "2px 6px",
                      background: "var(--paper-bright)",
                    }}
                  >
                    {t.name}
                  </span>
                ))}
                {(p.tools ?? []).length > 3 && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--ink-muted)",
                    }}
                  >
                    +{(p.tools ?? []).length - 3} more
                  </span>
                )}
              </div>
            </SchematicCard>
          </Link>
        ))}
      </div>

      <footer
        style={{
          marginTop: "var(--sp-8)",
          borderTop: "1px dashed var(--ink-faint)",
          paddingTop: "var(--sp-4)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-stamp)",
            fontSize: "var(--fs-mono)",
            color: "var(--ink-red)",
            transform: "rotate(-1.5deg)",
            display: "inline-block",
          }}
        >
          ATLAS v0.1 - WORK IN PROGRESS
        </p>
      </footer>
    </main>
  );
}
