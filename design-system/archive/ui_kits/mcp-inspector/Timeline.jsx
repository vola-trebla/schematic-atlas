/* Center pane — chronological timeline of calls. */
const CALLS = [
  { id: 1, t: "10:14:02", tool: "list_dir",     args: "./src",                         ms: 4,   status: "ok",  size: "1.2 KB" },
  { id: 2, t: "10:14:02", tool: "read_file",    args: "./src/server.ts",               ms: 6,   status: "ok",  size: "8.4 KB" },
  { id: 3, t: "10:14:03", tool: "read_file",    args: "./src/transports/stdio.ts",     ms: 5,   status: "ok",  size: "3.1 KB" },
  { id: 4, t: "10:14:03", tool: "search_glob",  args: "**/*.test.ts",                  ms: 18,  status: "ok",  size: "412 B" },
  { id: 5, t: "10:14:04", tool: "read_file",    args: "./tests/connect.test.ts",       ms: 7,   status: "ok",  size: "2.7 KB", selected: true },
  { id: 6, t: "10:14:05", tool: "read_file",    args: "./tests/missing.test.ts",       ms: 11,  status: "err", size: "0 B" },
  { id: 7, t: "10:14:06", tool: "write_file",   args: "./tests/connect.test.ts",       ms: 9,   status: "ok",  size: "3.0 KB" },
  { id: 8, t: "10:14:07", tool: "stat",         args: "./tests/connect.test.ts",       ms: 2,   status: "ok",  size: "84 B" },
  { id: 9, t: "10:14:09", tool: "list_dir",     args: "./src/transports",              ms: 4,   status: "ok",  size: "318 B" },
  { id:10, t: "10:14:11", tool: "move",         args: "./src/x.ts → ./src/y.ts",      ms: 13,  status: "warn",size: "—" },
  { id:11, t: "10:14:13", tool: "read_file",    args: "./README.md",                   ms: 5,   status: "ok",  size: "14 KB" },
  { id:12, t: "10:14:15", tool: "search_glob",  args: "**/*.md",                       ms: 22,  status: "ok",  size: "1.6 KB" },
];

function StatusGlyph({ kind, size = 14 }) {
  if (kind === "ok") return <CheckMark size={size} />;
  if (kind === "err") return <CrossMark size={size} />;
  if (kind === "warn")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={InkColors.red}>
        <path d="M 12 3 L 22 21 L 2 21 Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="10" x2="12" y2="15" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="18" r="1" fill={InkColors.red}/>
      </svg>
    );
  return <span style={{ display: "inline-block", width: size, height: size }} />;
}

function Timeline({ selectedId, onSelect }) {
  return (
    <section
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRight: `1.5px solid ${InkColors.ink}`,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "10px 22px",
          borderBottom: `1px dashed ${InkColors.faint}`,
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: InkColors.muted }}>
          timeline · 142 calls
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <Chip>all</Chip>
          <Chip color={InkColors.red}>err · 3</Chip>
          <Chip color={InkColors.faint}>{"≥ 10 ms"}</Chip>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: InkColors.muted, letterSpacing: "0.04em" }}>
          <Icon name="clock" size={12} color={InkColors.muted} />
          last 60 s
        </span>
      </div>

      {/* Column header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "22px 80px 1fr 80px 70px 22px",
          gap: 14,
          padding: "8px 22px",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: InkColors.faint,
          borderBottom: `1px solid ${InkColors.faint}`,
          flexShrink: 0,
        }}
      >
        <span />
        <span>time</span>
        <span>call</span>
        <span style={{ textAlign: "right" }}>duration</span>
        <span style={{ textAlign: "right" }}>size</span>
        <span />
      </div>

      {/* Rows */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {CALLS.map((c) => {
          const sel = c.id === selectedId;
          const ms = c.ms;
          const dimWidth = Math.min(70, Math.max(8, ms * 3));
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              style={{
                display: "grid",
                gridTemplateColumns: "22px 80px 1fr 80px 70px 22px",
                gap: 14,
                alignItems: "center",
                padding: "10px 22px",
                border: 0,
                borderBottom: `1px dashed ${InkColors.faint}`,
                background: sel ? "rgba(242,217,87,0.5)" : "transparent",
                borderLeft: sel ? `2.5px solid ${InkColors.ink}` : `2.5px solid transparent`,
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "var(--font-hand)",
                color: InkColors.ink,
                width: "100%",
              }}
            >
              <StatusGlyph kind={c.status} size={14} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: InkColors.muted, letterSpacing: "0.02em" }}>
                {c.t}
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0, overflow: "hidden" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: InkColors.ink, flexShrink: 0 }}>
                  {c.tool}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: InkColors.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  ({c.args})
                </span>
              </span>
              {/* Duration: mini dimension line */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <svg width={dimWidth} height="10" viewBox={`0 0 ${dimWidth} 10`} fill="none" stroke={InkColors.ink}>
                  <line x1="1" y1="2" x2="1" y2="8" strokeWidth="0.9" />
                  <line x1={dimWidth - 1} y1="2" x2={dimWidth - 1} y2="8" strokeWidth="0.9" />
                  <line x1="1" y1="5" x2={dimWidth - 1} y2="5" strokeWidth="0.9" />
                </svg>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: InkColors.ink, width: 28, textAlign: "right" }}>
                  {ms} ms
                </span>
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: InkColors.muted, textAlign: "right" }}>
                {c.size}
              </span>
              <span>
                {sel && <Icon name="arrow_right" size={14} />}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

Object.assign(window, { Timeline, CALLS });
