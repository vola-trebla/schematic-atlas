import type { CSSProperties, ReactNode } from "react";

import { InkColors } from "./tokens";

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
