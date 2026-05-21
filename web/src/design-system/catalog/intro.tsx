import { DimLine, InkColors } from "../motifs";

export function Intro({ count }: { count: number }) {
  return (
    <section style={{ padding: "52px 0 36px", position: "relative" }}>
      <span
        style={{
          position: "absolute",
          top: 64,
          left: -68,
          transform: "rotate(-90deg)",
          transformOrigin: "left top",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: InkColors.faint,
          }}
        >
          index
        </span>
      </span>
      <div className="intro-grid">
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 22,
            lineHeight: 1.5,
            color: InkColors.ink,
            maxWidth: "56ch",
            margin: 0,
          }}
        >
          One page per protocol. Each page is a single schematic explanation of what the tool does,
          how the data flows, and which components it exposes. No marketing, no scroll-jacking.
          Drawn by hand, mostly.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            justifyContent: "flex-end",
            paddingBottom: 4,
          }}
        >
          <DimLine label={`${count} entries`} width={140} />
          <DimLine label="v0.1" width={80} color={InkColors.blue} />
        </div>
      </div>
    </section>
  );
}
