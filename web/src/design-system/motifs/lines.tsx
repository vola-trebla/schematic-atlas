import type { CSSProperties } from "react";

import { InkColors } from "./tokens";

/* ───────────────────────── Dimension line ───────────────────────── */
type DimLineProps = {
  label: string;
  width?: number;
  color?: string;
  align?: "above" | "below";
  style?: CSSProperties;
};

export function DimLine({
  label,
  width = 200,
  color = InkColors.ink,
  align = "above",
  style,
}: DimLineProps) {
  const h = 22;
  return (
    <span
      className="dim-line"
      style={{
        display: "inline-flex",
        flexDirection: align === "above" ? "column" : "column-reverse",
        alignItems: "center",
        gap: 2,
        ...style,
      }}
    >
      <span
        className="mono"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-mono-sm)",
          color,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
      <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none" stroke={color}>
        <line x1="1" y1="3" x2="1" y2={h - 3} strokeWidth="1.2" />
        <line x1={width - 1} y1="3" x2={width - 1} y2={h - 3} strokeWidth="1.2" />
        <line x1="1" y1={h / 2} x2={width - 1} y2={h / 2} strokeWidth="1.2" />
        <path
          d={`M 8 ${h / 2 - 4} L 1 ${h / 2} L 8 ${h / 2 + 4}`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M ${width - 8} ${h / 2 - 4} L ${width - 1} ${h / 2} L ${width - 8} ${h / 2 + 4}`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ───────────────────────── Vertical dimension line ───────────────────────── */
type DimLineVProps = { label: string; height?: number; color?: string; style?: CSSProperties };

export function DimLineV({ label, height = 200, color = InkColors.ink, style }: DimLineVProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, ...style }}>
      <svg width="22" height={height} viewBox={`0 0 22 ${height}`} fill="none" stroke={color}>
        <line x1="3" y1="1" x2={22 - 3} y2="1" strokeWidth="1.2" />
        <line x1="3" y1={height - 1} x2={22 - 3} y2={height - 1} strokeWidth="1.2" />
        <line x1="11" y1="1" x2="11" y2={height - 1} strokeWidth="1.2" />
        <path
          d="M 7 8 L 11 1 L 15 8"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M 7 ${height - 8} L 11 ${height - 1} L 15 ${height - 8}`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-mono-sm)",
          color,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </span>
  );
}

/* ───────────────────────── Arrow (hand-drawn) ───────────────────────── */
type ArrowProps = {
  length?: number;
  direction?: "right" | "left" | "down" | "up";
  color?: string;
  dashed?: boolean;
  style?: CSSProperties;
};

export function Arrow({
  length = 80,
  direction = "right",
  color = InkColors.ink,
  dashed = false,
  style,
}: ArrowProps) {
  const w = direction === "right" || direction === "left" ? length : 16;
  const h = direction === "right" || direction === "left" ? 16 : length;
  const dashAttr = dashed ? "6 4" : undefined;
  let pathD = "";
  let arrowD = "";
  if (direction === "right") {
    pathD = `M 1 8 L ${length - 6} 8`;
    arrowD = `M ${length - 10} 3 L ${length - 1} 8 L ${length - 10} 13`;
  } else if (direction === "left") {
    pathD = `M ${length - 1} 8 L 6 8`;
    arrowD = `M 10 3 L 1 8 L 10 13`;
  } else if (direction === "down") {
    pathD = `M 8 1 L 8 ${length - 6}`;
    arrowD = `M 3 ${length - 10} L 8 ${length - 1} L 13 ${length - 10}`;
  } else {
    pathD = `M 8 ${length - 1} L 8 6`;
    arrowD = `M 3 10 L 8 1 L 13 10`;
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke={color} style={style}>
      <path d={pathD} strokeWidth="1.4" strokeDasharray={dashAttr} strokeLinecap="round" />
      <path d={arrowD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
