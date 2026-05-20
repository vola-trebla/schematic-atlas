"use client";

import { useState } from "react";

import type { ProtocolConfig } from "../types/protocol";

import { CheckMark, InkColors } from "./schematic";

type InstallSectionProps = {
  fig: string;
  config: ProtocolConfig;
};

export function InstallSection({ fig, config }: InstallSectionProps) {
  const { install, run, worksWith } = config;
  const tabs = install ? Object.keys(install) : [];
  const [activeTab, setActiveTab] = useState<string | null>(tabs[0] ?? null);

  if (!install && !run && (!worksWith || worksWith.length === 0)) return null;

  return (
    <section className="section-rule">
      <div style={{ paddingTop: 40 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 6 }}>
            <span className="fig-label">fig. {fig}</span>
          </div>
          <h2 className="fig-title">Install · use.</h2>
        </div>
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
            <>
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
            </>
          )}
          {run && (
            <div style={{ marginTop: install ? 20 : 0 }}>
              <span className="fig-label" style={{ letterSpacing: "0.10em" }}>
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
              className="fig-label"
              style={{ letterSpacing: "0.10em", display: "block", marginBottom: 10 }}
            >
              works with
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {worksWith.map((x) => (
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
