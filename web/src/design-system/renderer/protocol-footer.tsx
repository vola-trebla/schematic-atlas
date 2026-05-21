import Link from "next/link";

import type { ProtocolConfig } from "../../types/protocol";
import { Icon, InkColors } from "../motifs";

import { ATLAS_LINK } from "./atlas-link";

export function ProtocolFooter({ config }: { config: ProtocolConfig }) {
  return (
    <footer
      style={{
        padding: "32px 0 56px",
        borderTop: `1.5px solid ${InkColors.ink}`,
        marginTop: 32,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div>
        <div className="fig-label" style={{ letterSpacing: "0.10em" }}>
          {config.license || "open source"} · atlas entry · drawn by hand, mostly
        </div>
        {config.repo && (
          <a
            href={config.repo}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: InkColors.ink,
              marginTop: 6,
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            {config.repo.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
      <Link
        href={ATLAS_LINK}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: InkColors.ink,
          textDecoration: "none",
        }}
      >
        <Icon name="arrow_left" size={14} />
        back to atlas
      </Link>
    </footer>
  );
}
