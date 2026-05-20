"use client";

import React from "react";

import {
  InkColors,
  SchematicCard,
  Icon,
  DimLine,
  Callout,
  Stamp,
  CheckMark,
  WobbleDefs,
  LeaderCaption,
} from "./schematic";

const ATLAS_LINK = "/";

/* ───────────────────────── Atlas strip (top) ───────────────────────── */
function AtlasStrip({ config }: any) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 0 16px",
        borderBottom: `1px dashed ${InkColors.faint}`,
        gap: 16,
      }}
    >
      <a
        href={ATLAS_LINK}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 64 64"
          fill="none"
          stroke={InkColors.ink}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="14" r="2" fill={InkColors.ink} stroke="none" />
          <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
          <path d="M50 56 L 44 52 M 50 56 L 44 60" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1,
            color: InkColors.ink,
            paddingRight: 4,
            whiteSpace: "nowrap",
          }}
        >
          Schematic Atlas
        </span>
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: InkColors.muted,
        }}
      >
        <a href={ATLAS_LINK} style={{ color: InkColors.muted, textDecoration: "none" }}>
          ← catalog
        </a>
        {config.partTag && (
          <span
            style={{
              color: InkColors.ink,
              border: `1.4px solid ${InkColors.ink}`,
              padding: "2px 6px",
              background: "var(--paper-bright)",
            }}
          >
            [{config.partTag}]
          </span>
        )}
      </div>
    </header>
  );
}

/* ───────────────────────── Title block ───────────────────────── */
function TitleBlock({ config }: any) {
  const { name, purpose, highlight, repo, package: pkg, license } = config;
  const split =
    highlight && purpose && purpose.includes(highlight)
      ? purpose.split(highlight)
      : [purpose || "", ""];
  return (
    <section style={{ padding: "52px 0 40px", position: "relative" }}>
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
          atlas entry
        </span>
      </span>

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: InkColors.blue,
        }}
      >
        {"// protocol"}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          margin: "10px 0 18px",
          color: InkColors.ink,
          wordBreak: "break-word",
        }}
      >
        {name}
      </h1>

      <p
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: 24,
          lineHeight: 1.45,
          color: InkColors.ink,
          maxWidth: "44ch",
          margin: "0 0 28px",
        }}
      >
        {split[0]}
        {highlight && (
          <span
            style={{
              display: "inline",
              padding: "0 0.06em",
              background:
                "linear-gradient(transparent 28%, rgba(242,217,87,0.78) 28%, rgba(242,217,87,0.78) 86%, transparent 86%)",
            }}
          >
            {highlight}
          </span>
        )}
        {split[1]}
      </p>

      {(repo || pkg || license) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: InkColors.muted,
            letterSpacing: "0.04em",
            flexWrap: "wrap",
          }}
        >
          {repo && (
            <a
              href={repo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                color: InkColors.ink,
                textDecoration: "none",
              }}
            >
              <Icon name="github" size={14} />
              {repo.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
            </a>
          )}
          {pkg && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <Icon name="terminal" size={13} color={InkColors.muted} />
              {pkg}
            </span>
          )}
          {license && (
            <span
              style={{
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: InkColors.ink,
                border: `1.2px solid ${InkColors.ink}`,
                padding: "1px 6px",
                background: "var(--paper-bright)",
              }}
            >
              {license}
            </span>
          )}
        </div>
      )}
    </section>
  );
}

/* ───────────────────────── Stats row ───────────────────────── */
function StatsRow({ stats }: any) {
  if (!stats || stats.length === 0) return null;
  return (
    <section style={{ padding: "0 0 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
        {stats.map(([value, label]: any, i: number) => (
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

/* ───────────────────────── Section header ───────────────────────── */
function FigHeader({ n, title }: any) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: InkColors.faint,
            whiteSpace: "nowrap",
          }}
        >
          fig. {n}
        </span>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.05,
          margin: 0,
          color: InkColors.ink,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ───────────────────────── Flow step ───────────────────────── */
function FlowStep({ step, last }: any) {
  const { n, name, args, body, question, branch } = step;
  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "44px 1fr 180px 280px",
        gap: 20,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 14 }}>
        <Callout letter={String(n)} size={34} />
      </div>

      <SchematicCard partTag={`S.${String(n).padStart(2, "0")}`} pad="14px 18px 14px">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 16,
            fontWeight: 600,
            color: InkColors.ink,
            lineHeight: 1.25,
            wordBreak: "break-word",
          }}
        >
          {name}
          {args && <span style={{ fontWeight: 400, color: InkColors.muted }}>({args})</span>}
        </div>
        {body && (
          <p
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: 14,
              lineHeight: 1.45,
              color: InkColors.ink,
              margin: "6px 0 0",
            }}
          >
            {body}
          </p>
        )}
      </SchematicCard>

      <div style={{ paddingTop: 22 }}>
        {question && (
          <span
            style={{
              fontFamily: "var(--font-hand)",
              fontStyle: "italic",
              fontSize: 15,
              color: InkColors.blue,
              lineHeight: 1.4,
            }}
          >
            {question}
          </span>
        )}
      </div>

      <div style={{ paddingTop: 4 }}>
        {branch && (
          <React.Fragment>
            <div style={{ position: "relative", height: 0 }}>
              <svg
                width="40"
                height="24"
                viewBox="0 0 40 24"
                fill="none"
                stroke={InkColors.faint}
                style={{ position: "absolute", left: -44, top: 32 }}
              >
                <path
                  d="M 0 12 L 30 12"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="5 4"
                />
                <path
                  d="M 25 7 L 35 12 L 25 17"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ marginBottom: 6 }}>
              <Stamp size="11px" color={InkColors.red} rotate={-2}>
                {branch.condition}
              </Stamp>
            </div>
            <SchematicCard pad="12px 14px" style={{ borderColor: InkColors.red, borderWidth: 1.4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Callout letter={String(branch.n)} size={24} color={InkColors.red} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: InkColors.ink,
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {branch.name}
                </span>
              </div>
              {branch.body && (
                <p
                  style={{
                    fontFamily: "var(--font-hand)",
                    fontSize: 13,
                    lineHeight: 1.45,
                    color: InkColors.ink,
                    margin: "8px 0 0",
                  }}
                >
                  {branch.body}
                </p>
              )}
            </SchematicCard>
          </React.Fragment>
        )}
      </div>

      {!last && (
        <div
          style={{
            gridColumn: "2 / 3",
            display: "flex",
            justifyContent: "center",
            padding: "8px 0",
          }}
        >
          <svg width="14" height="36" viewBox="0 0 14 36" fill="none" stroke={InkColors.ink}>
            <line x1="7" y1="0" x2="7" y2="28" strokeWidth="1.6" strokeLinecap="round" />
            <path
              d="M 2 23 L 7 32 L 12 23"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Flow section ───────────────────────── */
function FlowSection({ fig, flow }: any) {
  if (!flow || !flow.steps || flow.steps.length === 0) return null;
  return (
    <section style={{ padding: "20px 0 60px", borderTop: `1px dashed ${InkColors.faint}` }}>
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="The flow." />
      </div>

      {flow.input && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "44px 1fr 180px 280px",
            gap: 20,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div />
          <SchematicCard
            pad="14px 18px"
            style={{ borderWidth: "2.5px", display: "inline-block", minWidth: 220 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="terminal" size={18} />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: 1,
                  color: InkColors.ink,
                }}
              >
                {flow.input.label}
              </span>
              {flow.input.sub && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: InkColors.muted,
                    letterSpacing: "0.04em",
                  }}
                >
                  {flow.input.sub}
                </span>
              )}
            </div>
          </SchematicCard>
          <div />
          <div />
          <div />
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
            <svg width="14" height="36" viewBox="0 0 14 36" fill="none" stroke={InkColors.ink}>
              <line x1="7" y1="0" x2="7" y2="28" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d="M 2 23 L 7 32 L 12 23"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      {flow.steps.map((s: any, i: number) => (
        <FlowStep key={i} step={s} last={i === flow.steps.length - 1} />
      ))}
    </section>
  );
}

/* ───────────────────────── Components / tools ───────────────────────── */
function GroupCard({ group }: any) {
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
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: InkColors.muted,
            letterSpacing: "0.04em",
            marginLeft: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {group.items.length} {group.items.length === 1 ? "tool" : "tools"}
        </div>
      </div>
      {group.blurb && (
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 14,
            lineHeight: 1.45,
            color: InkColors.ink,
            margin: "0 0 12px",
          }}
        >
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
        {group.items.map((t: any) => (
          <div
            key={t.name}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 12,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: InkColors.ink,
                fontWeight: 500,
              }}
            >
              {t.name}
            </span>
            {t.sub && (
              <span
                style={{
                  fontFamily: "var(--font-hand)",
                  fontStyle: "italic",
                  fontSize: 13,
                  color: InkColors.blue,
                  lineHeight: 1.35,
                }}
              >
                — {t.sub}
              </span>
            )}
          </div>
        ))}
      </div>
    </SchematicCard>
  );
}

function ComponentsSection({ fig, groups, tools }: any) {
  if ((!groups || groups.length === 0) && (!tools || tools.length === 0)) return null;
  return (
    <section style={{ padding: "20px 0 60px", borderTop: `1.5px solid ${InkColors.ink}` }}>
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title={groups ? "Components, grouped." : "Components."} />
      </div>

      {groups && groups.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: groups.length === 1 ? "1fr" : "1fr 1fr",
            gap: 24,
          }}
        >
          {groups.map((g: any) => (
            <GroupCard key={g.key} group={g} />
          ))}
        </div>
      )}

      {tools && tools.length > 0 && (
        <SchematicCard pad="20px 24px">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
            {tools.map((t: any) => (
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
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: InkColors.ink,
                    fontWeight: 500,
                  }}
                >
                  {t.name}
                </span>
                {t.sub && (
                  <span
                    style={{
                      fontFamily: "var(--font-hand)",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: InkColors.blue,
                      lineHeight: 1.35,
                    }}
                  >
                    — {t.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </SchematicCard>
      )}
    </section>
  );
}

/* ───────────────────────── Notes / warnings ───────────────────────── */
function NotesSection({ notes, fig }: any) {
  if (!notes || notes.length === 0) return null;
  return (
    <section style={{ padding: "20px 0 60px", borderTop: `1.5px solid ${InkColors.ink}` }}>
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="Notes." />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: notes.length === 1 ? "1fr" : "1fr 1fr",
          gap: 20,
        }}
      >
        {notes.map((note: any, i: number) => (
          <div key={i} style={{ position: "relative" }}>
            <div style={{ marginBottom: 8, marginLeft: 6 }}>
              <Stamp size="11px" color={InkColors.red} rotate={-2}>
                {note.condition || "note"}
              </Stamp>
            </div>
            <SchematicCard pad="14px 18px" style={{ borderColor: InkColors.red, borderWidth: 1.5 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Callout letter={String(note.n || i + 1)} size={26} color={InkColors.red} />
                <p
                  style={{
                    fontFamily: "var(--font-hand)",
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: InkColors.ink,
                    margin: "2px 0 0",
                    flex: 1,
                  }}
                >
                  {note.body}
                </p>
              </div>
            </SchematicCard>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Worked example ───────────────────────── */
function WorkedExampleSection({ example, fig }: any) {
  if (!example || !example.code) return null;
  const captions = example.captions || [];
  return (
    <section style={{ padding: "20px 0 60px", borderTop: `1.5px solid ${InkColors.ink}` }}>
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
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: InkColors.muted,
                marginBottom: 10,
              }}
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
            {captions.map((c: any, i: number) => (
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

/* ───────────────────────── Install / use ───────────────────────── */
function InstallSection({ fig, config }: any) {
  const { install, run, worksWith } = config;
  const tabs = install ? Object.keys(install) : [];
  const [activeTab, setActiveTab] = React.useState<string | null>(tabs[0] ?? null);
  if (!install && !run && (!worksWith || worksWith.length === 0)) return null;
  return (
    <section style={{ padding: "20px 0 50px", borderTop: `1.5px solid ${InkColors.ink}` }}>
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="Install · use." />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: install || run ? "8fr 4fr" : "1fr",
          gap: 36,
          alignItems: "start",
        }}
      >
        <div>
          {install && tabs.length > 0 && (
            <React.Fragment>
              <div style={{ display: "flex", marginBottom: -1.5, position: "relative", zIndex: 1 }}>
                {tabs.map((k) => (
                  <button
                    key={k}
                    onClick={() => setActiveTab(k)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      border: `1.5px solid ${InkColors.ink}`,
                      borderBottom:
                        activeTab === k
                          ? `1.5px solid var(--paper)`
                          : `1.5px solid ${InkColors.ink}`,
                      background: activeTab === k ? "var(--paper)" : "var(--paper-dim)",
                      color: InkColors.ink,
                      padding: "8px 14px",
                      cursor: "pointer",
                      marginRight: -1.5,
                      position: "relative",
                      zIndex: activeTab === k ? 2 : 1,
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <div
                style={{
                  border: `1.5px solid ${InkColors.ink}`,
                  padding: "16px 20px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: InkColors.ink,
                  wordBreak: "break-word",
                }}
              >
                <span style={{ color: InkColors.faint, marginRight: 8 }}>$</span>
                {activeTab ? install[activeTab] : null}
              </div>
            </React.Fragment>
          )}
          {run && (
            <div style={{ marginTop: install ? 20 : 0 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: InkColors.faint,
                }}
              >
                then run
              </span>
              <div
                style={{
                  border: `1.5px solid ${InkColors.ink}`,
                  padding: "14px 20px",
                  marginTop: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: InkColors.ink,
                  wordBreak: "break-word",
                }}
              >
                <span style={{ color: InkColors.faint, marginRight: 8 }}>$</span>
                {run}
              </div>
            </div>
          )}
        </div>
        {worksWith && worksWith.length > 0 && (
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: InkColors.faint,
                display: "block",
                marginBottom: 10,
              }}
            >
              works with
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {worksWith.map((x: string) => (
                <div key={x} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckMark size={14} />
                  <span
                    style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: InkColors.ink }}
                  >
                    {x}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function ProtocolFooter({ config }: any) {
  return (
    <footer
      style={{
        padding: "32px 0 56px",
        borderTop: `1.5px solid ${InkColors.ink}`,
        marginTop: 32,
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
          {config.license || "open source"} · atlas entry · drawn by hand, mostly
        </div>
        {config.repo && (
          <a
            href={config.repo}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: InkColors.ink,
              marginTop: 6,
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            {config.repo.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
      <a
        href={ATLAS_LINK}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: InkColors.ink,
          textDecoration: "none",
        }}
      >
        <Icon name="arrow_right" size={14} style={{ transform: "rotate(180deg)" }} />
        back to atlas
      </a>
    </footer>
  );
}

/* ───────────────────────── Root ───────────────────────── */
export function ProtocolRenderer({ config }: any) {
  const hasFlow = !!(config.flow && config.flow.steps && config.flow.steps.length > 0);
  const hasComponents = !!(
    (config.groups && config.groups.length) ||
    (config.tools && config.tools.length)
  );
  const hasNotes = !!(config.notes && config.notes.length > 0);
  const hasExample = !!(config.example && config.example.code);

  let n = 0;
  const flowFig = hasFlow ? String(++n) : null;
  const componentsFig = hasComponents ? String(++n) : null;
  const notesFig = hasNotes ? String(++n) : null;
  const exampleFig = hasExample ? String(++n) : null;
  const installFig = String(++n);

  return (
    <div
      className="page-shell"
      style={{
        maxWidth: "1180px",
        margin: "0 auto",
        padding: "0 84px",
        position: "relative",
        background: "var(--paper)",
      }}
    >
      <WobbleDefs />
      <AtlasStrip config={config} />
      <TitleBlock config={config} />
      <StatsRow stats={config.stats} />

      {hasFlow && <FlowSection fig={flowFig} flow={config.flow} />}
      {hasComponents && (
        <ComponentsSection fig={componentsFig} groups={config.groups} tools={config.tools} />
      )}
      {hasNotes && <NotesSection notes={config.notes} fig={notesFig} />}
      {hasExample && <WorkedExampleSection example={config.example} fig={exampleFig} />}

      <InstallSection fig={installFig} config={config} />
      <ProtocolFooter config={config} />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "36px",
          width: "1px",
          background: "rgba(21,22,27,0.10)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "36px",
          width: "1px",
          background: "rgba(21,22,27,0.10)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
