/* Right pane — detail of the selected call. Tabs: request / response / trace. */

const PAYLOADS = {
  5: {
    request: `{
  "jsonrpc": "2.0",
  "id": "1f-83a",
  "method": "tools/call",
  "params": {
    "name": "read_file",
    "arguments": {
      "path": "./tests/connect.test.ts"
    }
  }
}`,
    response: `{
  "jsonrpc": "2.0",
  "id": "1f-83a",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "import { test } from 'node:test'\\n…"
      }
    ],
    "isError": false
  }
}`,
    trace: `→ stdin    7 ms read
→ handler  4 ms resolve
← stdout   2 ms encode
total      13 ms
peer:      pid 8421 (node)`,
  },
};

function CallDetail({ callId }) {
  const [tab, setTab] = React.useState("request");
  const call = (window.CALLS || []).find((c) => c.id === callId);
  const data = PAYLOADS[callId] || PAYLOADS[5];

  return (
    <aside
      style={{
        width: 440,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "18px 22px 14px", borderBottom: `1.5px solid ${InkColors.ink}`, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: InkColors.faint }}>
            call #{callId} · 10:14:04
          </span>
          <Chip color={call?.status === "err" ? InkColors.red : InkColors.green}>
            {call?.status === "err" ? "failed" : "ok"}
          </Chip>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, lineHeight: 1.05, color: InkColors.ink }}>
          {call?.tool || "read_file"}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: InkColors.muted, marginLeft: 8, fontWeight: 400 }}>
            ({call?.args || "—"})
          </span>
        </div>

        {/* Dim line for size + duration */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 14 }}>
          <DimLine label={`${call?.ms || 7} ms`} width={120} />
          <DimLine label={call?.size || "2.7 KB"} width={120} color={InkColors.blue} />
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 0, padding: "10px 22px 0", borderBottom: `1px dashed ${InkColors.faint}` }}>
        {["request", "response", "trace"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "transparent",
              color: tab === t ? InkColors.ink : InkColors.muted,
              border: 0,
              borderBottom: tab === t ? `2.5px solid ${InkColors.ink}` : "2.5px solid transparent",
              padding: "8px 14px 10px 0",
              marginRight: 18,
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 22px" }}>
        <pre
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            lineHeight: 1.55,
            color: InkColors.ink,
            background: "transparent",
            border: 0,
            padding: 0,
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {data[tab]}
        </pre>

        {tab === "trace" && (
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${InkColors.faint}` }}>
            <Annotation side="right" color={InkColors.blue}>
              The peer is your tool — pid + process name come from the OS, not the protocol.
            </Annotation>
          </div>
        )}
      </div>

      {/* Action footer */}
      <div style={{ display: "flex", gap: 10, padding: "12px 22px", borderTop: `1px dashed ${InkColors.faint}` }}>
        <SButton>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="copy" size={12} />
            Copy
          </span>
        </SButton>
        <SButton>Edit + replay</SButton>
        <div style={{ flex: 1 }} />
        <SButton>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="link" size={12} />
            Permalink
          </span>
        </SButton>
      </div>
    </aside>
  );
}

Object.assign(window, { CallDetail });
