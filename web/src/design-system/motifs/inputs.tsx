import type { CSSProperties } from "react";

import { InkColors } from "./tokens";

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
