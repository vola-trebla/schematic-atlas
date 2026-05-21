import { Annotation, InkColors } from "../motifs";

export function AtlasFooter() {
  return (
    <footer
      style={{
        padding: "48px 0 56px",
        borderTop: `1.5px solid ${InkColors.ink}`,
        marginTop: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: InkColors.muted,
          }}
        >
          Schematic Atlas · open catalog · drawn by hand, mostly
        </div>
        <div
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 14,
            color: InkColors.muted,
            marginTop: 8,
            maxWidth: "44ch",
            lineHeight: 1.5,
          }}
        >
          To add a protocol: open an issue or submit a PR with the protocol config.
        </div>
      </div>
      <Annotation side="left" color={InkColors.blue}>
        — part of the Schematic family.
      </Annotation>
    </footer>
  );
}
