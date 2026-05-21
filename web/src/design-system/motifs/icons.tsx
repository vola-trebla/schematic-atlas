import type { CSSProperties, ReactNode } from "react";

import type { IconName } from "../../types/protocol";

import { InkColors } from "./tokens";

export type { IconName };

const ICON_PATHS: Record<IconName, ReactNode> = {
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
