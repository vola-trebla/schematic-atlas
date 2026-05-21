import type { CSSProperties, ReactNode } from "react";

import { InkColors } from "./tokens";

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
