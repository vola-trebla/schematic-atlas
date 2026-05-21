import Link from "next/link";

import type { ProtocolConfig } from "../../types/protocol";
import { InkColors } from "../motifs";

import { ATLAS_LINK } from "./atlas-link";

export function AtlasStrip({ config }: { config: ProtocolConfig }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 0 16px",
        borderBottom: `1px dashed ${InkColors.faint}`,
        gap: 16,
      }}
    >
      <Link
        href={ATLAS_LINK}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 64 64"
          fill="none"
          stroke={InkColors.ink}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="14" r="2" fill={InkColors.ink} stroke="none" />
          <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
          <path d="M50 56 L 44 52 M 50 56 L 44 60" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1,
            color: InkColors.ink,
            paddingRight: 4,
            whiteSpace: "nowrap",
          }}
        >
          Schematic Atlas
        </span>
      </Link>
      <div className="fig-label" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Link href={ATLAS_LINK} style={{ color: InkColors.muted, textDecoration: "none" }}>
          ← catalog
        </Link>
        {config.partTag && (
          <span className="meta-badge" style={{ border: `1.4px solid ${InkColors.ink}` }}>
            [{config.partTag}]
          </span>
        )}
      </div>
    </header>
  );
}
