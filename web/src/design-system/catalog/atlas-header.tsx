import { InkColors } from "../motifs";

export function AtlasHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 0 24px",
        borderBottom: `1.5px solid ${InkColors.ink}`,
        gap: 16,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          stroke={InkColors.ink}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="14" r="1.8" fill={InkColors.ink} stroke="none" />
          <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
          <path d="M50 56 L 44 52 M 50 56 L 44 60" strokeWidth="2" />
        </svg>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 42,
            fontWeight: 700,
            lineHeight: 1,
            color: InkColors.ink,
            paddingRight: 4,
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          Schematic Atlas
        </h1>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: InkColors.muted,
          textAlign: "right",
          lineHeight: 1.4,
        }}
      >
        a visual encyclopedia
        <br />
        of MCP &amp; AI tooling
      </span>
    </header>
  );
}
