import type { FlowStep as FlowStepType, Flow } from "../../types/protocol";
import { Callout, Icon, InkColors, SchematicCard, Stamp } from "../motifs";

import { FigHeader } from "./fig-header";

/*
 * Grid: [num 44px] [card 1fr] [question 180px] [arrow 40px] [branch 1fr]
 * The branch arrow lives in col 4 — no magic absolute offsets.
 * When there is no branch, cols 4+5 are empty and collapse visually.
 */

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
    <div className="flow-step-grid">
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
      <div className="flow-step-question-col" style={{ paddingTop: 22 }}>
        {question && <span className="step-question">{question}</span>}
      </div>

      {/* col 4 — branch connector arrow (empty when no branch) */}
      <div className="flow-step-arrow-col">{branch ? <BranchArrow /> : null}</div>

      {/* col 5 — branch card (empty when no branch) */}
      <div className="flow-step-branch-col" style={{ paddingTop: 4 }}>
        {branch && (
          <>
            <div style={{ marginBottom: 6 }}>
              <Stamp size="11px" color={InkColors.red} rotate={-2}>
                {branch.condition}
              </Stamp>
            </div>
            <SchematicCard
              pad="12px 14px"
              style={{ borderColor: InkColors.red, borderWidth: 1.4, borderStyle: "dashed" }}
            >
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

export function FlowSection({ fig, flow }: { fig: string | null; flow: Flow }) {
  if (!flow.steps || flow.steps.length === 0) return null;
  return (
    <section className="section-dashed">
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="The flow." />
      </div>

      {flow.input && (
        <div className="flow-step-grid" style={{ alignItems: "center", marginBottom: 20 }}>
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
          {/* cols 3–5 placeholders — hidden on narrow screens via CSS */}
          <div className="flow-col-placeholder" />
          <div className="flow-col-placeholder" />
          <div className="flow-col-placeholder" />
          {/* down-arrow always anchored to col 2 */}
          <div
            style={{ gridColumn: 2, display: "flex", justifyContent: "center", padding: "8px 0" }}
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
        </div>
      )}

      {flow.steps.map((s, i) => (
        <FlowStep key={i} step={s} last={i === flow.steps.length - 1} />
      ))}
    </section>
  );
}
