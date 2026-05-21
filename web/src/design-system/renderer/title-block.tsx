import type { ProtocolConfig } from "../../types/protocol";
import { Icon, InkColors } from "../motifs";

export function TitleBlock({ config }: { config: ProtocolConfig }) {
  const { name, purpose, highlight, repo, package: pkg, license } = config;
  const split =
    highlight && purpose && purpose.includes(highlight)
      ? purpose.split(highlight)
      : [purpose || "", ""];
  return (
    <section style={{ padding: "52px 0 40px", position: "relative" }}>
      <span
        className="title-block-label"
        style={{
          position: "absolute",
          top: 64,
          left: -68,
          transform: "rotate(-90deg)",
          transformOrigin: "left top",
        }}
      >
        <span className="fig-label">atlas entry</span>
      </span>

      <span className="proto-kicker">{"// protocol"}</span>

      <h1
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          margin: "10px 0 18px",
          color: InkColors.ink,
          wordBreak: "break-word",
        }}
      >
        {name}
      </h1>

      <p
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: 24,
          lineHeight: 1.45,
          color: InkColors.ink,
          maxWidth: "44ch",
          margin: "0 0 28px",
        }}
      >
        {split[0]}
        {highlight && <mark>{highlight}</mark>}
        {split[1]}
      </p>

      {(repo || pkg || license) && (
        <div className="meta-row">
          {repo && (
            <a
              href={repo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                textDecoration: "none",
              }}
            >
              <Icon name="github" size={14} />
              {repo.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
            </a>
          )}
          {pkg && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <Icon name="terminal" size={13} color={InkColors.muted} />
              {pkg}
            </span>
          )}
          {license && <span className="meta-badge">{license}</span>}
        </div>
      )}
    </section>
  );
}
