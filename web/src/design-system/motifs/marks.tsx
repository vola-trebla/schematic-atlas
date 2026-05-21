import type { CSSProperties } from "react";

import { InkColors } from "./tokens";

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
