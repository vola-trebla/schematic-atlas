/* Left rail — connected servers list. */
const SERVERS = [
  {
    id: "fs",
    name: "filesystem",
    transport: "stdio",
    tools: 12,
    status: "ok",
    selected: true,
  },
  {
    id: "git",
    name: "git",
    transport: "stdio",
    tools: 8,
    status: "ok",
    selected: false,
  },
  {
    id: "search",
    name: "web-search",
    transport: "sse",
    tools: 3,
    status: "warn",
    selected: false,
  },
  {
    id: "pg",
    name: "postgres",
    transport: "stdio",
    tools: 6,
    status: "err",
    selected: false,
  },
];

const TOOLS = [
  { name: "read_file", calls: 142, ok: 140, err: 2 },
  { name: "write_file", calls: 38, ok: 37, err: 1 },
  { name: "list_dir", calls: 86, ok: 86, err: 0 },
  { name: "search_glob", calls: 24, ok: 24, err: 0 },
  { name: "stat", calls: 67, ok: 67, err: 0 },
  { name: "watch", calls: 4, ok: 4, err: 0 },
  { name: "move", calls: 9, ok: 8, err: 1 },
  { name: "delete", calls: 3, ok: 3, err: 0 },
];

function StatusDot({ kind }) {
  const map = { ok: InkColors.green, warn: InkColors.red, err: InkColors.red };
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: map[kind] || InkColors.faint,
        display: "inline-block",
        boxShadow: `0 0 0 1.5px var(--paper)`,
        flexShrink: 0,
      }}
    />
  );
}

function ServerRail() {
  return (
    <aside
      style={{
        width: 248,
        borderRight: `1.5px solid ${InkColors.ink}`,
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: InkColors.muted }}>
            servers · 4
          </span>
          <Icon name="plus" size={14} color={InkColors.muted} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {SERVERS.map((s) => (
            <button
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: s.selected ? "rgba(242,217,87,0.55)" : "transparent",
                border: 0,
                borderLeft: s.selected ? `2.5px solid ${InkColors.ink}` : `2.5px solid transparent`,
                padding: "8px 8px 8px 10px",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-hand)",
                fontSize: 16,
                color: InkColors.ink,
                width: "100%",
              }}
            >
              <StatusDot kind={s.status} />
              <span style={{ flex: 1, lineHeight: 1.1 }}>{s.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: InkColors.muted, letterSpacing: "0.04em" }}>
                {s.tools}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: InkColors.muted }}>
            tools · 12
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: InkColors.faint, letterSpacing: "0.04em" }}>
            from filesystem
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {TOOLS.map((t) => (
            <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: InkColors.ink, flex: 1, lineHeight: 1.2 }}>
                {t.name}
              </span>
              {/* tiny histogram: ok / err */}
              <svg width="64" height="10" viewBox="0 0 64 10" fill="none">
                <rect x="0" y="3" width={Math.round((t.ok / 142) * 60)} height="4" fill={InkColors.ink} />
                {t.err > 0 && (
                  <rect
                    x={Math.round((t.ok / 142) * 60)}
                    y="3"
                    width={Math.max(2, Math.round((t.err / 142) * 60))}
                    height="4"
                    fill={InkColors.red}
                  />
                )}
              </svg>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: InkColors.muted, width: 26, textAlign: "right" }}>
                {t.calls}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Margin annotation at bottom */}
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px dashed ${InkColors.faint}` }}>
        <span style={{ fontFamily: "var(--font-hand)", fontStyle: "italic", fontSize: 12, color: InkColors.blue, lineHeight: 1.4 }}>
          — drag a server file here to add it
        </span>
      </div>
    </aside>
  );
}

Object.assign(window, { ServerRail });
