function Install() {
  const [tab, setTab] = React.useState("npm");
  const commands = {
    npm: "npm install -g @schematic/inspector",
    pnpm: "pnpm add -g @schematic/inspector",
    bun: "bun add -g @schematic/inspector",
  };
  return (
    <section style={{ padding: "60px 0", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 24 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: InkColors.faint,
          }}
        >
          fig. 2
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 600, lineHeight: 1, margin: 0 }}>
          Install it.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 40, alignItems: "start" }}>
        <div>
          {/* tab strip */}
          <div style={{ display: "flex", gap: 0, marginBottom: -1.5, position: "relative", zIndex: 1 }}>
            {Object.keys(commands).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  border: `1.5px solid ${InkColors.ink}`,
                  borderBottom: tab === k ? `1.5px solid var(--paper)` : `1.5px solid ${InkColors.ink}`,
                  background: tab === k ? "var(--paper)" : "var(--paper-dim)",
                  color: InkColors.ink,
                  padding: "8px 16px",
                  cursor: "pointer",
                  marginRight: -1.5,
                  position: "relative",
                  zIndex: tab === k ? 2 : 1,
                }}
              >
                {k}
              </button>
            ))}
          </div>
          {/* code block */}
          <div
            style={{
              border: `1.5px solid ${InkColors.ink}`,
              padding: "20px 22px",
              background: "transparent",
              fontFamily: "var(--font-mono)",
              fontSize: 16,
              color: InkColors.ink,
              position: "relative",
            }}
          >
            <span style={{ color: InkColors.faint, marginRight: 8 }}>$</span>
            {commands[tab]}
            <button
              onClick={() => navigator.clipboard?.writeText(commands[tab])}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                background: "var(--paper-bright)",
                color: InkColors.ink,
                border: `1.4px solid ${InkColors.ink}`,
                padding: "3px 8px",
                cursor: "pointer",
              }}
            >
              copy
            </button>
          </div>

          {/* quick-run */}
          <div style={{ marginTop: 28 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: InkColors.faint,
              }}
            >
              then run
            </span>
            <div
              style={{
                border: `1.5px solid ${InkColors.ink}`,
                padding: "16px 22px",
                marginTop: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                lineHeight: 1.6,
                color: InkColors.ink,
              }}
            >
              <div><span style={{ color: InkColors.faint, marginRight: 8 }}>$</span>schematic inspect ./my-server.js</div>
              <div style={{ color: InkColors.muted, marginTop: 2 }}>→ http://localhost:7e7</div>
            </div>
          </div>
        </div>

        <div>
          <Annotation side="left" color={InkColors.blue}>
            No global state, no daemon. The CLI exits when the inspector tab closes.
          </Annotation>
          <div style={{ marginTop: 32 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: InkColors.faint,
                display: "block",
                marginBottom: 8,
              }}
            >
              works with
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["node ≥ 18", "deno ≥ 1.40", "bun ≥ 1.0", "python ≥ 3.10 (via shim)"].map((x) => (
                <div key={x} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckMark size={16} />
                  <span style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: InkColors.ink }}>{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Install });
