function Steps() {
  const steps = [
    { n: 1, title: "Pipe the server in.", body: "Any MCP server: stdio, SSE, websocket." },
    { n: 2, title: "Open the inspector.", body: "Binds to localhost:7e7. One browser tab." },
    { n: 3, title: "See every call.", body: "Live timeline. Click any frame for the full payload." },
    { n: 4, title: "Replay, edit, ship.", body: "When the bug's fixed, the green ✓ stays on the timeline." },
  ];
  return (
    <section style={{ padding: "60px 0", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 36 }}>
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
          fig. 4
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 600, lineHeight: 1, margin: 0 }}>
          The whole loop.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative" }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ position: "relative", paddingRight: i < steps.length - 1 ? 16 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <Callout letter={String(s.n)} size={30} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1, color: InkColors.ink }}>
                {s.title}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-hand)", fontSize: 15, lineHeight: 1.5, color: InkColors.muted, margin: 0 }}>
              {s.body}
            </p>
            {/* connector arrow between steps */}
            {i < steps.length - 1 && (
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                stroke={InkColors.faint}
                style={{ position: "absolute", top: 8, right: -2 }}
              >
                <path d="M 0 7 L 14 7" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="3 3" />
                <path d="M 10 2 L 19 7 L 10 12" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Steps });
