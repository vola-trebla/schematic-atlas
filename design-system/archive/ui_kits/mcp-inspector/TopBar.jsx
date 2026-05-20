/* Top bar: brand, project name, transport pill, search, actions. */
function TopBar({ onConnect, recording, onToggleRecord }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "12px 24px",
        borderBottom: `1.5px solid ${InkColors.ink}`,
        background: "var(--paper)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, backgroundImage: "none" }}>
        <svg width="26" height="26" viewBox="0 0 64 64" fill="none" stroke={InkColors.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="14" r="2" fill={InkColors.ink} stroke="none" />
          <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
          <path d="M50 56 L 44 52 M 50 56 L 44 60" />
        </svg>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, lineHeight: 1, color: InkColors.ink, paddingRight: 4 }}>
          Schematic
        </span>
      </a>

      <span style={{ width: 1, height: 22, background: InkColors.faint, opacity: 0.7 }} />

      {/* Project / file */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase", color: InkColors.muted }}>
          inspecting
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: InkColors.ink }}>
          ~/code/my-mcp-server/<span style={{ color: InkColors.ink, borderBottom: `1.5px solid ${InkColors.ink}` }}>server.ts</span>
        </span>
      </div>

      {/* Transport pill */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: InkColors.ink,
          background: "var(--paper-bright)",
          border: `1.4px solid ${InkColors.ink}`,
          borderRadius: 999,
          padding: "3px 12px",
          marginLeft: 8,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: InkColors.green,
            display: "inline-block",
            boxShadow: `0 0 0 2px var(--paper-bright)`,
          }}
        />
        stdio · 0.3.1
      </span>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderBottom: `1.5px solid ${InkColors.ink}`, padding: "4px 4px 4px 2px", width: 240 }}>
        <Icon name="search" size={16} />
        <input
          type="text"
          placeholder="filter calls — / to focus"
          style={{
            border: 0,
            background: "transparent",
            outline: "none",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: InkColors.ink,
            width: "100%",
          }}
        />
      </div>

      {/* Action buttons */}
      <SButton onClick={onToggleRecord}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon name={recording ? "pause" : "play"} size={14} />
          {recording ? "Pause" : "Record"}
        </span>
      </SButton>
      <SButton primary onClick={onConnect}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--paper)" }}>
          <Icon name="plus" size={14} color="var(--paper)" />
          New tool
        </span>
      </SButton>
    </header>
  );
}

Object.assign(window, { TopBar });
