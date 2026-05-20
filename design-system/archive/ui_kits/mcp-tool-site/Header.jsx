function Header() {
  const [hovered, setHovered] = React.useState(null);
  const items = ["docs", "inspector", "log", "changelog"];
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 0 24px",
        borderBottom: `1.5px solid ${InkColors.ink}`,
        position: "relative",
      }}
    >
      <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 14, backgroundImage: "none", flexShrink: 0 }}>
        <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke={InkColors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="14" r="1.8" fill={InkColors.ink} stroke="none" />
          <path d="M12 14 C 30 14, 38 14, 46 18 C 54 22, 54 32, 46 36 C 38 40, 26 40, 18 44 C 10 48, 10 56, 22 56 L 50 56" />
          <path d="M50 56 L 44 52 M 50 56 L 44 60" strokeWidth="2" />
        </svg>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, lineHeight: 1, color: InkColors.ink, paddingRight: 18 }}>
          Schematic
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: InkColors.ink,
            border: `1.4px solid ${InkColors.ink}`,
            padding: "2px 6px",
            background: "var(--paper-bright)",
            marginLeft: 6,
            alignSelf: "center",
          }}
        >
          v0.3.1
        </span>
      </a>

      <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {items.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: 18,
              color: InkColors.ink,
              background: hovered === item ? "rgba(242,217,87,0.7)" : "none",
              padding: "2px 4px",
              backgroundImage: "none",
              transition: "background 220ms cubic-bezier(0.7,0,0.3,1)",
            }}
          >
            {item}
          </a>
        ))}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, paddingLeft: 24, borderLeft: `1px dashed ${InkColors.faint}` }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 13, color: InkColors.ink, letterSpacing: "0.04em", backgroundImage: "none" }}>
            <Icon name="github" size={18} />
            github
          </a>
        </span>
      </nav>
    </header>
  );
}

Object.assign(window, { Header });
