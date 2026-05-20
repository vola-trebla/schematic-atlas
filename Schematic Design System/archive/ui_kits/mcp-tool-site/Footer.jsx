function Footer() {
  return (
    <footer style={{ padding: "48px 0 60px", borderTop: `1.5px solid ${InkColors.ink}`, marginTop: 60, position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr 3fr 3fr", gap: 32, marginBottom: 36 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" stroke={InkColors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="14" r="1.8" fill={InkColors.ink} stroke="none" />
              <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
              <path d="M50 56 L 44 52 M 50 56 L 44 60" strokeWidth="2" />
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, lineHeight: 1, color: InkColors.ink }}>
              Schematic
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: InkColors.muted, marginTop: 12, maxWidth: "32ch", lineHeight: 1.5 }}>
            A pocket inspector for MCP tools. Built in public. 142 KB. No telemetry.
          </p>
        </div>
        {[
          ["product", ["inspector", "log", "tap", "playground (soon)"]],
          ["docs", ["quickstart", "transports", "examples", "api"]],
          ["company", ["changelog", "github", "discord", "rss"]],
        ].map(([title, links]) => (
          <div key={title}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: InkColors.faint, display: "block", marginBottom: 12 }}>
              {title}
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {links.map((l) => (
                <li key={l}>
                  <a href="#" style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: InkColors.ink, lineHeight: 1.5 }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 20, borderTop: `1px dashed ${InkColors.faint}` }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase", color: InkColors.muted }}>
          © 2026 — drawn by hand, mostly
        </span>
        <Annotation side="left" color={InkColors.blue}>— the bottom of the page is also a margin.</Annotation>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
