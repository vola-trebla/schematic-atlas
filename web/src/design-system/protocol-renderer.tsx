/**
 * Protocol page renderer — Server Component.
 * Only InstallSection (tab state) is a client boundary; everything else SSRs.
 */
import Link from "next/link";

import type {
  ProtocolConfig,
  FlowStep as FlowStepType,
  Group,
  Note,
  Example,
  Flow,
} from "../types/protocol";

import { InstallSection } from "./install-section.client";
import {
  InkColors,
  SchematicCard,
  Icon,
  DimLine,
  Callout,
  Stamp,
  LeaderCaption,
} from "./schematic";

const ATLAS_LINK = "/";

/* ───────────────────────── Atlas strip (top nav) ───────────────────────── */
function AtlasStrip({ config }: { config: ProtocolConfig }) {
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
      <Link
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
      </Link>
      <div className="fig-label" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Link href={ATLAS_LINK} style={{ color: InkColors.muted, textDecoration: "none" }}>
          ← catalog
        </Link>
        {config.partTag && (
          <span className="meta-badge" style={{ border: `1.4px solid ${InkColors.ink}` }}>
            [{config.partTag}]
          </span>
        )}
      </div>
    </header>
  );
}

/* ───────────────────────── Title block ───────────────────────── */
function TitleBlock({ config }: { config: ProtocolConfig }) {
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
        <span className="fig-label">atlas entry</span>
      </span>

      <span className="proto-kicker">{"// protocol"}</span>

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
        {highlight && <mark>{highlight}</mark>}
        {split[1]}
      </p>

      {(repo || pkg || license) && (
        <div className="meta-row">
          {repo && (
            <a
              href={repo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
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
          {license && <span className="meta-badge">{license}</span>}
        </div>
      )}
    </section>
  );
}

/* ───────────────────────── Stats row ───────────────────────── */
function StatsRow({ stats }: { stats?: [string, string?][] }) {
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

/* ───────────────────────── Section header ───────────────────────── */
export function FigHeader({ n, title }: { n: string | null; title: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 6 }}>
        <span className="fig-label">fig. {n}</span>
      </div>
      <h2 className="fig-title">{title}</h2>
    </div>
  );
}

/* ───────────────────────── Flow step ───────────────────────── */
/*
 * Grid: [num 44px] [card 1fr] [question 180px] [arrow 40px] [branch 1fr]
 * The branch arrow lives in col 4 — no magic absolute offsets.
 * When there is no branch, cols 4+5 are empty and collapse visually.
 */
const FLOW_GRID = "44px 1fr 180px 40px 1fr";

function BranchArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 46,
        height: "100%",
      }}
    >
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none" stroke={InkColors.faint}>
        <path d="M 0 8 L 30 8" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="5 4" />
        <path
          d="M 25 3 L 35 8 L 25 13"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FlowStep({ step, last }: { step: FlowStepType; last: boolean }) {
  const { n, name, args, body, question, branch } = step;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: FLOW_GRID,
        gap: 20,
        alignItems: "start",
      }}
    >
      {/* col 1 — step number */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 14 }}>
        <Callout letter={String(n)} size={34} />
      </div>

      {/* col 2 — main card */}
      <SchematicCard partTag={`S.${String(n).padStart(2, "0")}`} pad="14px 18px 14px">
        <div
          className="tool-name"
          style={{ fontSize: 16, lineHeight: 1.25, wordBreak: "break-word" }}
        >
          {name}
          {args && <span style={{ fontWeight: 400, color: InkColors.muted }}>({args})</span>}
        </div>
        {body && (
          <p className="card-body" style={{ margin: "6px 0 0" }}>
            {body}
          </p>
        )}
      </SchematicCard>

      {/* col 3 — italic question annotation */}
      <div style={{ paddingTop: 22 }}>
        {question && <span className="step-question">{question}</span>}
      </div>

      {/* col 4 — branch connector arrow (empty when no branch) */}
      {branch ? <BranchArrow /> : <div />}

      {/* col 5 — branch card (empty when no branch) */}
      <div style={{ paddingTop: 4 }}>
        {branch && (
          <>
            <div style={{ marginBottom: 6 }}>
              <Stamp size="11px" color={InkColors.red} rotate={-2}>
                {branch.condition}
              </Stamp>
            </div>
            <SchematicCard pad="12px 14px" style={{ borderColor: InkColors.red, borderWidth: 1.4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Callout letter={String(branch.n)} size={24} color={InkColors.red} />
                <span
                  className="tool-name"
                  style={{
                    fontSize: 12,
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {branch.name}
                </span>
              </div>
              {branch.body && (
                <p className="card-body" style={{ margin: "8px 0 0", fontSize: 13 }}>
                  {branch.body}
                </p>
              )}
            </SchematicCard>
          </>
        )}
      </div>

      {/* down-arrow between steps — spans col 2 only */}
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
function FlowSection({ fig, flow }: { fig: string | null; flow: Flow }) {
  if (!flow.steps || flow.steps.length === 0) return null;
  return (
    <section className="section-dashed">
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="The flow." />
      </div>

      {flow.input && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: FLOW_GRID,
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
                <span className="fig-label" style={{ letterSpacing: "0.04em" }}>
                  {flow.input.sub}
                </span>
              )}
            </div>
          </SchematicCard>
          {/* cols 3–5 empty, then down-arrow spans col 1–5 but sits under col 2 */}
          <div />
          <div />
          <div />
          <div
            style={{
              gridColumn: "1 / 6",
              display: "grid",
              gridTemplateColumns: FLOW_GRID,
              gap: 20,
            }}
          >
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
        </div>
      )}

      {flow.steps.map((s, i) => (
        <FlowStep key={i} step={s} last={i === flow.steps.length - 1} />
      ))}
    </section>
  );
}

/* ───────────────────────── Components / tools ───────────────────────── */
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

function ComponentsSection({
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: groups.length === 1 ? "1fr" : "1fr 1fr",
            gap: 24,
          }}
        >
          {groups.map((g) => (
            <GroupCard key={g.key} group={g} />
          ))}
        </div>
      )}

      {tools && tools.length > 0 && (
        <SchematicCard pad="20px 24px">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
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

/* ───────────────────────── Notes / warnings ───────────────────────── */
function NotesSection({ notes, fig }: { notes: Note[]; fig: string | null }) {
  if (notes.length === 0) return null;
  return (
    <section className="section-rule">
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
        {notes.map((note, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div style={{ marginBottom: 8, marginLeft: 6 }}>
              <Stamp size="11px" color={InkColors.red} rotate={-2}>
                {note.condition || "note"}
              </Stamp>
            </div>
            <SchematicCard pad="14px 18px" style={{ borderColor: InkColors.red, borderWidth: 1.5 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Callout letter={String(note.n ?? i + 1)} size={26} color={InkColors.red} />
                <p className="card-body" style={{ fontSize: 15, margin: "2px 0 0", flex: 1 }}>
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
function WorkedExampleSection({ example, fig }: { example: Example; fig: string | null }) {
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

/* ───────────────────────── Footer ───────────────────────── */
function ProtocolFooter({ config }: { config: ProtocolConfig }) {
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
        <div className="fig-label" style={{ letterSpacing: "0.10em" }}>
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
      <Link
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
        <Icon name="arrow_left" size={14} />
        back to atlas
      </Link>
    </footer>
  );
}

/* ───────────────────────── Root ───────────────────────── */
export function ProtocolRenderer({ config }: { config: ProtocolConfig }) {
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
    <div className="page-shell">
      <span className="margin-rule" style={{ left: "36px" }} />
      <span className="margin-rule" style={{ right: "36px" }} />

      <AtlasStrip config={config} />
      <TitleBlock config={config} />
      <StatsRow stats={config.stats} />

      {hasFlow && <FlowSection fig={flowFig} flow={config.flow!} />}
      {hasComponents && (
        <ComponentsSection fig={componentsFig} groups={config.groups} tools={config.tools} />
      )}
      {hasNotes && <NotesSection notes={config.notes!} fig={notesFig} />}
      {hasExample && <WorkedExampleSection example={config.example!} fig={exampleFig} />}

      <InstallSection fig={installFig} config={config} />
      <ProtocolFooter config={config} />
    </div>
  );
}
