/**
 * Schematic motif library — server-safe primitives.
 * SButton (the only stateful component) lives in schematic-client.tsx.
 */
import type { CSSProperties, ReactNode } from "react";

import type { IconName } from "../types/protocol";

export { IconName };

export const InkColors = {
  ink: "#15161B",
  soft: "#2E2F36",
  muted: "#6A6962",
  faint: "#ACA694",
  ghost: "#C9C2AE",
  red: "#B43A2A",
  blue: "#26537B",
  green: "#3F6E3A",
} as const;

/* ───────────────────────── Wobble SVG defs (inject once at root) ───────────────────────── */
export function WobbleDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="wobble" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="wobble-strong" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="wobble-subtle" x="-1%" y="-1%" width="102%" height="102%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="1"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

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

/* ───────────────────────── Callout circle (lettered / numbered) ───────────────────────── */
type CalloutProps = {
  letter?: string;
  size?: number;
  color?: string;
  filled?: boolean;
  style?: CSSProperties;
};

export function Callout({
  letter = "A",
  size = 26,
  color = InkColors.ink,
  filled = false,
  style,
}: CalloutProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.8px solid ${color}`,
        background: filled ? color : "transparent",
        color: filled ? "#F2EDE2" : color,
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        fontSize: size * 0.5,
        lineHeight: 1,
        ...style,
      }}
    >
      {letter}
    </span>
  );
}

/* ───────────────────────── Leader line + caption ───────────────────────── */
type LeaderCaptionProps = {
  letter: string;
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
};

export function LeaderCaption({
  letter,
  children,
  color = InkColors.ink,
  style,
}: LeaderCaptionProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, ...style }}>
      <Callout letter={letter} color={color} />
      <span
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: "var(--fs-caption)",
          color: InkColors.ink,
          lineHeight: 1.45,
          maxWidth: "28ch",
          paddingTop: 4,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/* ───────────────────────── Numbered step pill ───────────────────────── */
type StepNumProps = Omit<CalloutProps, "letter"> & { n?: number | string };

export function StepNum({ n = 1, ...rest }: StepNumProps) {
  return <Callout letter={String(n)} {...rest} />;
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

/* ───────────────────────── Hatching block ───────────────────────── */
type HatchProps = {
  width?: number | string;
  height?: number;
  angle?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
  style?: CSSProperties;
};

export function Hatch({
  width = "100%",
  height = 60,
  angle = 45,
  spacing = 5,
  color = InkColors.ink,
  opacity = 0.45,
  style,
}: HatchProps) {
  const bg = `repeating-linear-gradient(${angle}deg, ${color} 0 1px, transparent 1px ${spacing}px)`;
  return (
    <span style={{ display: "block", width, height, backgroundImage: bg, opacity, ...style }} />
  );
}

/* ───────────────────────── Stamp ───────────────────────── */
type StampProps = {
  children?: ReactNode;
  color?: string;
  rotate?: number;
  size?: number | string;
  style?: CSSProperties;
};

export function Stamp({
  children = "DRAFT",
  color = InkColors.red,
  rotate = -3,
  size = "var(--fs-h3)",
  style,
}: StampProps) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-stamp)",
        fontSize: size,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        border: `2.5px solid ${color}`,
        padding: "4px 12px",
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ───────────────────────── Margin annotation ───────────────────────── */
type AnnotationProps = {
  children: ReactNode;
  side?: "left" | "right";
  color?: string;
  leaderLength?: number;
  style?: CSSProperties;
};

export function Annotation({
  children,
  side = "right",
  color = InkColors.blue,
  leaderLength = 40,
  style,
}: AnnotationProps) {
  const leader = (
    <svg
      width={leaderLength}
      height="10"
      viewBox={`0 0 ${leaderLength} 10`}
      fill="none"
      stroke={color}
      style={{ alignSelf: "center" }}
    >
      <path
        d={side === "right" ? `M 0 5 L ${leaderLength - 4} 5` : `M ${leaderLength} 5 L 4 5`}
        strokeWidth="1"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
      <circle cx={side === "right" ? leaderLength - 2 : 2} cy="5" r="1.6" fill={color} />
    </svg>
  );
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: side === "right" ? "row-reverse" : "row",
        alignItems: "center",
        gap: 6,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-hand)",
          fontStyle: "italic",
          fontSize: "var(--fs-caption)",
          color,
          lineHeight: 1.45,
          maxWidth: "22ch",
        }}
      >
        {children}
      </span>
      {leader}
    </span>
  );
}

/* ───────────────────────── Folded corner ───────────────────────── */
type FoldedCornerProps = { size?: number; color?: string; style?: CSSProperties };

export function FoldedCorner({ size = 28, color = InkColors.ink, style }: FoldedCornerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      stroke={color}
      style={{ position: "absolute", top: -1, right: -1, ...style }}
      aria-hidden="true"
    >
      <path d="M 0 0 L 28 0 L 28 28 Z" fill="#F2EDE2" stroke="none" />
      <path d="M 0 0 L 28 28" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M 28 0 L 12 0 L 28 16 Z"
        fill="#E8E0CE"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ───────────────────────── Part-number tag ───────────────────────── */
type PartTagProps = { children?: ReactNode; style?: CSSProperties };

export function PartTag({ children = "A.01", style }: PartTagProps) {
  return (
    <span
      className="mono"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-label)",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: InkColors.ink,
        border: `1.4px solid ${InkColors.ink}`,
        padding: "2px 6px",
        background: "var(--paper-bright)",
        ...style,
      }}
    >
      [{children}]
    </span>
  );
}

/* ───────────────────────── Pen-stroke divider ───────────────────────── */
type PenDividerProps = { width?: number | string; color?: string; style?: CSSProperties };

export function PenDivider({ width = "100%", color = InkColors.ink, style }: PenDividerProps) {
  return (
    <svg
      width={width}
      height="8"
      viewBox="0 0 1000 8"
      preserveAspectRatio="none"
      fill="none"
      stroke={color}
      style={{ display: "block", ...style }}
    >
      <path
        d="M 0 4 Q 100 2, 200 4 T 400 4 T 600 4 T 800 4 T 1000 4"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───────────────────────── Schematic card frame ───────────────────────── */
type SchematicCardProps = {
  children?: ReactNode;
  partTag?: string;
  folded?: boolean;
  shadow?: boolean;
  stamp?: string;
  pad?: string | number;
  style?: CSSProperties;
  /** Additional props forwarded to the inner content div. */
  [key: string]: unknown;
};

export function SchematicCard({
  children,
  partTag,
  folded = false,
  shadow = false,
  stamp,
  pad = "var(--sp-5)",
  style,
  ...rest
}: SchematicCardProps) {
  return (
    <div style={{ position: "relative", ...style }}>
      {shadow && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: -8,
            bottom: -8,
            // z-index: -1 keeps shadow behind the card surface within this stacking context
            zIndex: -1,
            backgroundImage: `repeating-linear-gradient(45deg, ${InkColors.ink} 0 1px, transparent 1px 5px)`,
            opacity: 0.5,
          }}
        />
      )}
      <div
        {...rest}
        style={{
          position: "relative",
          zIndex: 1,
          border: `1.5px solid ${InkColors.ink}`,
          padding: pad,
          // transparent: cards live on the paper, not as separate bright surfaces
          background: "transparent",
        }}
      >
        {partTag && (
          <span
            style={{
              position: "absolute",
              top: -10,
              left: 14,
              background: "var(--paper)",
              padding: "0 4px",
            }}
          >
            <PartTag>{partTag}</PartTag>
          </span>
        )}
        {folded && <FoldedCorner />}
        {stamp && (
          <span style={{ position: "absolute", top: 16, right: 16, transform: "rotate(-4deg)" }}>
            <Stamp size="var(--fs-h4)">{stamp}</Stamp>
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────── Schematic input ───────────────────────── */
type SInputProps = {
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
  [key: string]: unknown;
};

export function SInput({ label, hint, value, onChange, placeholder, style, ...rest }: SInputProps) {
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-label)",
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: InkColors.ink,
            marginBottom: 6,
          }}
        >
          {label}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        style={{
          width: "100%",
          background: "transparent",
          border: 0,
          borderBottom: `1.5px solid ${InkColors.ink}`,
          fontFamily: "var(--font-hand)",
          fontSize: "var(--fs-body)",
          color: InkColors.ink,
          padding: "6px 2px",
          outline: "none",
        }}
      />
      {hint && (
        <span
          style={{
            fontFamily: "var(--font-hand)",
            fontStyle: "italic",
            fontSize: "var(--fs-caption)",
            color: InkColors.blue,
            display: "block",
            marginTop: 4,
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

/* ───────────────────────── Tag chip (adhesive label) ───────────────────────── */
type ChipProps = { children: ReactNode; color?: string; style?: CSSProperties };

export function Chip({ children, color = InkColors.ink, style }: ChipProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono-sm)",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color,
        background: "var(--paper-bright)",
        border: `1.4px solid ${color}`,
        borderRadius: 999,
        padding: "2px 10px",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ───────────────────────── Schematic check ───────────────────────── */
type MarkProps = { size?: number; color?: string; style?: CSSProperties };

export function CheckMark({ size = 18, color = InkColors.green, style }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} style={style}>
      <path
        d="M 4 13 L 10 19 L 21 6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ───────────────────────── Schematic cross ───────────────────────── */
export function CrossMark({ size = 18, color = InkColors.red, style }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} style={style}>
      <path
        d="M 5 5 L 19 19 M 19 5 L 5 19"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ───────────────────────── Icon ───────────────────────── */
const ICON_PATHS: Record<IconName, React.ReactNode> = {
  github: (
    <g>
      <path d="M12 2.5 C 6.8 2.5 2.5 6.8 2.5 12 c 0 4.2 2.7 7.7 6.5 9 c 0.5 0.1 0.6 -0.2 0.6 -0.5 v -1.6 c -2.6 0.6 -3.2 -1.2 -3.2 -1.2 c -0.4 -1.1 -1.1 -1.4 -1.1 -1.4 c -0.9 -0.6 0.1 -0.6 0.1 -0.6 c 1 0.1 1.5 1 1.5 1 c 0.9 1.5 2.3 1.1 2.9 0.8 c 0.1 -0.7 0.4 -1.1 0.6 -1.4 c -2.1 -0.2 -4.3 -1 -4.3 -4.6 c 0 -1 0.4 -1.9 1 -2.5 c -0.1 -0.3 -0.4 -1.3 0.1 -2.7 c 0 0 0.8 -0.3 2.7 1 c 0.8 -0.2 1.6 -0.3 2.5 -0.3 c 0.8 0 1.7 0.1 2.5 0.3 c 1.9 -1.3 2.7 -1 2.7 -1 c 0.5 1.4 0.2 2.4 0.1 2.7 c 0.6 0.7 1 1.5 1 2.5 c 0 3.6 -2.2 4.4 -4.3 4.6 c 0.3 0.3 0.6 0.9 0.6 1.8 v 2.6 c 0 0.3 0.2 0.6 0.6 0.5 c 3.8 -1.3 6.5 -4.8 6.5 -9 c 0 -5.2 -4.2 -9.5 -9.5 -9.5 z" />
    </g>
  ),
  eye: (
    <g>
      <path d="M 2 12 C 5 6, 9 4, 12 4 C 15 4, 19 6, 22 12 C 19 18, 15 20, 12 20 C 9 20, 5 18, 2 12 Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  play: (
    <g>
      <path d="M 7 4 L 7 20 L 20 12 Z" strokeLinejoin="round" />
    </g>
  ),
  bug: (
    <g>
      <ellipse cx="12" cy="13" rx="5" ry="6.5" />
      <line x1="12" y1="6.5" x2="12" y2="20" />
      <path d="M 9 5 L 11 8" />
      <path d="M 15 5 L 13 8" />
      <line x1="3" y1="10" x2="7" y2="11" />
      <line x1="21" y1="10" x2="17" y2="11" />
      <line x1="3" y1="17" x2="7" y2="16" />
      <line x1="21" y1="17" x2="17" y2="16" />
      <line x1="3" y1="13.5" x2="7" y2="13.5" />
      <line x1="21" y1="13.5" x2="17" y2="13.5" />
    </g>
  ),
  tool: (
    <g>
      <path
        d="M 14 4 L 20 10 L 16 14 L 14 12 L 6 20 L 4 18 L 12 10 L 10 8 L 14 4 Z"
        strokeLinejoin="round"
      />
    </g>
  ),
  terminal: (
    <g>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M 7 9 L 11 12 L 7 15" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="17" y2="16" />
    </g>
  ),
  search: (
    <g>
      <circle cx="11" cy="11" r="6" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" />
    </g>
  ),
  link: (
    <g>
      <path d="M 10 14 L 14 10" />
      <path
        d="M 11 7 L 13 5 C 15 3, 18 3, 20 5 C 22 7, 22 10, 20 12 L 18 14"
        strokeLinejoin="round"
      />
      <path
        d="M 13 17 L 11 19 C 9 21, 6 21, 4 19 C 2 17, 2 14, 4 12 L 6 10"
        strokeLinejoin="round"
      />
    </g>
  ),
  stream: (
    <g>
      <path d="M 3 7 C 7 5, 9 9, 13 7 C 17 5, 19 9, 21 7" />
      <path d="M 3 12 C 7 10, 9 14, 13 12 C 17 10, 19 14, 21 12" />
      <path d="M 3 17 C 7 15, 9 19, 13 17 C 17 15, 19 19, 21 17" />
    </g>
  ),
  pause: (
    <g>
      <line x1="8" y1="5" x2="8" y2="19" strokeWidth="2.4" />
      <line x1="16" y1="5" x2="16" y2="19" strokeWidth="2.4" />
    </g>
  ),
  copy: (
    <g>
      <rect x="8" y="8" width="12" height="12" />
      <path d="M 16 8 L 16 4 L 4 4 L 4 16 L 8 16" strokeLinejoin="round" />
    </g>
  ),
  arrow_right: (
    <g>
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M 15 7 L 20 12 L 15 17" strokeLinejoin="round" />
    </g>
  ),
  arrow_left: (
    <g>
      <line x1="20" y1="12" x2="4" y2="12" />
      <path d="M 9 7 L 4 12 L 9 17" strokeLinejoin="round" />
    </g>
  ),
  plus: (
    <g>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>
  ),
  filter: (
    <g>
      <path d="M 4 5 L 20 5 L 14 12 L 14 20 L 10 18 L 10 12 Z" strokeLinejoin="round" />
    </g>
  ),
  clock: (
    <g>
      <circle cx="12" cy="12" r="8" />
      <path d="M 12 7 L 12 12 L 16 14" strokeLinejoin="round" />
    </g>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

export function Icon({
  name,
  size = 20,
  color = InkColors.ink,
  strokeWidth = 1.6,
  style,
}: IconProps) {
  const path = ICON_PATHS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      aria-hidden="true"
    >
      {path || <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

/* ───────────────────────── Stroke-draw wrapper ───────────────────────── */
type StrokeDrawProps = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  style?: CSSProperties;
};

export function StrokeDraw({ children, duration = 600, delay = 0, style }: StrokeDrawProps) {
  return (
    <span
      className="anim-draw"
      style={{
        display: "inline-block",
        ["--dash-len" as string]: 800,
        ["--dur-slow" as string]: `${duration}ms`,
        animationDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
