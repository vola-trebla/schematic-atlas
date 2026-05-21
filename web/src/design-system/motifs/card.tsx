import type { CSSProperties, ReactNode } from "react";

import { Stamp } from "./annotations";
import { InkColors } from "./tokens";

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
