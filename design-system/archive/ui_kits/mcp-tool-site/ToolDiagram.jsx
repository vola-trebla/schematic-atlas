/* The big "how the tool works" diagram. Pure SVG schematic. */
function ToolDiagram() {
  return (
    <section style={{ padding: "72px 0", borderTop: `1px dashed ${InkColors.faint}`, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 32 }}>
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
          fig. 1
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 600, lineHeight: 1, margin: 0, color: InkColors.ink }}>
          How a call flows.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 40 }}>
        <div style={{ position: "relative" }}>
          <svg viewBox="0 0 720 360" width="100%" height="360" fill="none" stroke={InkColors.ink}>
            {/* AGENT (left) */}
            <rect x="20" y="140" width="120" height="80" strokeWidth="2" />
            <text x="80" y="172" textAnchor="middle" fontFamily="Caveat" fontSize="26" fontWeight="700" fill={InkColors.ink} stroke="none">agent</text>
            <text x="80" y="194" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.muted} stroke="none">claude · cursor · …</text>
            {/* dimension above agent */}
            <g stroke={InkColors.ink}>
              <line x1="20" y1="125" x2="20" y2="119" strokeWidth="1"/>
              <line x1="140" y1="125" x2="140" y2="119" strokeWidth="1"/>
              <line x1="20" y1="122" x2="140" y2="122" strokeWidth="1"/>
              <path d="M 26 118 L 20 122 L 26 126" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 134 118 L 140 122 L 134 126" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <text x="80" y="113" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.ink} stroke="none">120 px</text>

            {/* arrow: agent -> tap */}
            <path d="M 140 175 L 245 175" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 4" />
            <path d="M 240 168 L 250 175 L 240 182" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="190" y="166" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill={InkColors.blue} stroke="none">call()</text>

            {/* TAP (the inspector) */}
            <rect x="250" y="135" width="110" height="90" strokeWidth="2.5" />
            <text x="305" y="170" textAnchor="middle" fontFamily="Caveat" fontSize="26" fontWeight="700" fill={InkColors.ink} stroke="none">tap</text>
            <text x="305" y="195" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.muted} stroke="none">inspector</text>
            {/* callout A on tap */}
            <circle cx="305" cy="115" r="13" strokeWidth="1.8" />
            <text x="305" y="120" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fontWeight="600" fill={InkColors.ink} stroke="none">A</text>
            <path d="M 305 128 L 305 135" strokeWidth="1.2" />

            {/* arrow: tap -> server */}
            <path d="M 360 175 L 470 175" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 465 168 L 475 175 L 465 182" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="415" y="166" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.ink} stroke="none">forwards</text>

            {/* SERVER */}
            <rect x="475" y="140" width="120" height="80" strokeWidth="2" />
            <text x="535" y="172" textAnchor="middle" fontFamily="Caveat" fontSize="26" fontWeight="700" fill={InkColors.ink} stroke="none">server</text>
            <text x="535" y="194" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.muted} stroke="none">your tool</text>
            {/* callout B */}
            <circle cx="535" cy="118" r="13" strokeWidth="1.8" />
            <text x="535" y="123" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fontWeight="600" fill={InkColors.ink} stroke="none">B</text>

            {/* return arrow under */}
            <path d="M 475 235 L 360 235" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 365 228 L 355 235 L 365 242" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="418" y="252" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={InkColors.ink} stroke="none">result / error</text>

            {/* render down from tap */}
            <path d="M 305 225 L 305 305" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 298 300 L 305 310 L 312 300" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            {/* TIMELINE (bottom render) */}
            <rect x="220" y="310" width="170" height="36" strokeWidth="1.5" />
            <g stroke={InkColors.ink}>
              {Array.from({length: 14}).map((_, i) => (
                <line key={i} x1={228 + i*12} y1="310" x2={228 + i*12} y2="346" strokeWidth="0.8" opacity="0.45"/>
              ))}
            </g>
            <circle cx="240" cy="328" r="3" fill={InkColors.ink} stroke="none"/>
            <circle cx="276" cy="328" r="3" fill={InkColors.ink} stroke="none"/>
            <circle cx="312" cy="328" r="3" fill={InkColors.red} stroke="none"/>
            <circle cx="348" cy="328" r="3" fill={InkColors.ink} stroke="none"/>
            <text x="305" y="370" textAnchor="middle" fontFamily="Caveat" fontSize="22" fontWeight="600" fill={InkColors.ink} stroke="none">your timeline</text>

            {/* return arrow back to agent (under everything) */}
            <path d="M 250 235 L 140 235" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 4" />
            <path d="M 145 228 L 135 235 L 145 242" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Right column: callout captions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 12 }}>
          <LeaderCaption letter="A">
            The tap proxies the transport. Same protocol, no shim. Your server never knows it's being watched.
          </LeaderCaption>
          <LeaderCaption letter="B">
            Your tool runs unmodified. If it crashes, the inspector keeps the stream open and records the failure.
          </LeaderCaption>
          <div style={{ marginTop: 12, paddingTop: 16, borderTop: `1px dashed ${InkColors.faint}` }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase", color: InkColors.faint }}>
              transports supported
            </span>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <Chip>stdio</Chip>
              <Chip>sse</Chip>
              <Chip>websocket</Chip>
              <Chip color={InkColors.faint}>http/2 (draft)</Chip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ToolDiagram });
