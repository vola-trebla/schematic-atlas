/* Bottom status bar — latency sparkline + counters. */
function StatusBar() {
  /* fake latency samples (ms) */
  const samples = [3, 5, 4, 12, 6, 8, 22, 4, 5, 7, 11, 5, 4, 6, 18, 9, 4, 7, 6, 5, 10, 4, 13, 6, 5, 8, 19, 4, 6, 7, 11, 4, 8, 6, 5, 7];
  const maxM = 28;
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "8px 22px",
        borderTop: `1.5px solid ${InkColors.ink}`,
        flexShrink: 0,
        background: "var(--paper)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: InkColors.muted,
        letterSpacing: "0.04em",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: InkColors.green, display: "inline-block" }} />
        connected
      </span>

      <span style={{ height: 14, width: 1, background: InkColors.faint, opacity: 0.7 }} />

      <span><span style={{ color: InkColors.ink }}>142</span> ok</span>
      <span><span style={{ color: InkColors.red }}>3</span> err</span>
      <span><span style={{ color: InkColors.ink }}>2.4</span> req/s</span>
      <span><span style={{ color: InkColors.ink }}>p50 6</span> ms · <span style={{ color: InkColors.ink }}>p99 22</span> ms</span>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
        <span style={{ letterSpacing: "0.10em", textTransform: "uppercase" }}>last 60 s</span>
        <svg width="240" height="22" viewBox="0 0 240 22" fill="none" stroke={InkColors.ink}>
          {/* baseline */}
          <line x1="0" y1="20" x2="240" y2="20" strokeWidth="0.6" opacity="0.4"/>
          {samples.map((m, i) => {
            const x = (i / (samples.length - 1)) * 240;
            const h = (m / maxM) * 18;
            const isOutlier = m >= 18;
            return (
              <line
                key={i}
                x1={x}
                y1={20}
                x2={x}
                y2={20 - h}
                strokeWidth="1.5"
                stroke={isOutlier ? InkColors.red : InkColors.ink}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <span style={{ color: InkColors.ink, fontWeight: 600 }}>0 ms ↔ 28 ms</span>
      </div>
    </footer>
  );
}

Object.assign(window, { StatusBar });
