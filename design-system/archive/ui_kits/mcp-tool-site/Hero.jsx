function Hero({ onConnect }) {
  return (
    <section style={{ padding: "84px 0 64px", position: "relative" }}>
      {/* Margin annotation top-left */}
      <span
        style={{
          position: "absolute",
          top: 92,
          left: -68,
          width: 56,
          display: "flex",
          alignItems: "center",
          gap: 4,
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
          fig. 0 — hero
        </span>
      </span>

      <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 48, alignItems: "start" }}>
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: InkColors.blue,
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            // mcp tool — inspector
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: "0 0 40px",
              color: InkColors.ink,
              maxWidth: "14ch",
            }}
          >
            A pocket inspector for <span style={{
              display: "inline",
              padding: "0 0.06em",
              background: "linear-gradient(transparent 28%, rgba(242,217,87,0.78) 28%, rgba(242,217,87,0.78) 86%, transparent 86%)",
              WebkitBoxDecorationBreak: "clone",
              boxDecorationBreak: "clone",
              color: InkColors.ink,
            }}>MCP tools.</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: 22,
              lineHeight: 1.5,
              color: InkColors.ink,
              maxWidth: "48ch",
              margin: "0 0 36px",
            }}
          >
            Pipe any server in. See every call, every payload, every failure on a single timeline.
          </p>

          {/* Dimension-line specs */}
          <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 36 }}>
            <DimLine label="142 KB" width={140} />
            <DimLine label="< 8 ms" width={140} color={InkColors.blue} />
            <DimLine label="0 telemetry" width={160} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <SButton primary onClick={onConnect}>Connect tool</SButton>
            <SButton>View live demo</SButton>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: InkColors.muted,
                letterSpacing: "0.04em",
              }}
            >
              $ npm i -g @schematic/inspector
            </span>
          </div>
        </div>

        {/* Right margin: annotation + a small specimen schematic */}
        <div style={{ position: "relative", paddingTop: 48 }}>
          <Annotation side="left">
            Tools register against a transport. The inspector taps that transport — nothing more.
          </Annotation>

          <div style={{ marginTop: 36, position: "relative" }}>
            <svg viewBox="0 0 320 180" width="100%" height="180" fill="none" stroke={InkColors.ink} style={{maxWidth: 320}}>
              {/* server box */}
              <rect x="10" y="40" width="90" height="50" strokeWidth="1.5" />
              <text x="55" y="70" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill={InkColors.ink} stroke="none">server</text>
              {/* transport arrow */}
              <path d="M 100 65 L 195 65" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" />
              <path d="M 191 60 L 200 65 L 191 70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="148" y="56" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.blue} stroke="none">stdio</text>
              {/* inspector box */}
              <rect x="200" y="40" width="110" height="50" strokeWidth="2.5" />
              <text x="255" y="70" textAnchor="middle" fontFamily="Caveat" fontSize="22" fontWeight="700" fill={InkColors.ink} stroke="none">inspector</text>
              {/* callout */}
              <circle cx="255" cy="22" r="11" strokeWidth="1.8" />
              <text x="255" y="27" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fontWeight="600" fill={InkColors.ink} stroke="none">A</text>
              <path d="M 255 33 L 255 38" strokeWidth="1.2" />
              {/* down stream arrow */}
              <path d="M 255 90 L 255 140" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 250 134 L 255 144 L 260 134" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="270" y="118" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.ink} stroke="none">render</text>
              {/* timeline at bottom */}
              <rect x="200" y="148" width="110" height="22" strokeWidth="1.5" />
              <g stroke={InkColors.ink}>
                <line x1="212" y1="148" x2="212" y2="170" strokeWidth="0.8" opacity="0.5" />
                <line x1="226" y1="148" x2="226" y2="170" strokeWidth="0.8" opacity="0.5" />
                <line x1="240" y1="148" x2="240" y2="170" strokeWidth="0.8" opacity="0.5" />
                <line x1="254" y1="148" x2="254" y2="170" strokeWidth="0.8" opacity="0.5" />
                <line x1="268" y1="148" x2="268" y2="170" strokeWidth="0.8" opacity="0.5" />
                <line x1="282" y1="148" x2="282" y2="170" strokeWidth="0.8" opacity="0.5" />
                <line x1="296" y1="148" x2="296" y2="170" strokeWidth="0.8" opacity="0.5" />
              </g>
              <circle cx="219" cy="159" r="2.6" fill={InkColors.ink} stroke="none" />
              <circle cx="247" cy="159" r="2.6" fill={InkColors.ink} stroke="none" />
              <circle cx="275" cy="159" r="2.6" fill={InkColors.red} stroke="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
