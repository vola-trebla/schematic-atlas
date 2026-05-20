"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { InkColors } from "./schematic";

/* ───────────────────────── Schematic button ───────────────────────── */
type SButtonProps = {
  children?: ReactNode;
  primary?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  [key: string]: unknown;
};

export function SButton({
  children,
  primary,
  onClick,
  type = "button",
  style,
  ...rest
}: SButtonProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      style={{
        position: "relative",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono)",
        fontWeight: 600,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        background: primary ? InkColors.ink : "var(--paper-bright)",
        color: primary ? "var(--paper)" : InkColors.ink,
        border: `1.5px solid ${InkColors.ink}`,
        padding: "10px 18px",
        cursor: "pointer",
        transform: pressed ? "translate(2px, 2px)" : "none",
        transition: "transform 120ms cubic-bezier(0.7,0,0.3,1)",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: `1.5px solid ${InkColors.faint}`,
          transform: "translate(3px, 3px)",
          zIndex: -1,
        }}
      />
      {children}
    </button>
  );
}
