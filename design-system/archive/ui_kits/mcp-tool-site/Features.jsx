function Features() {
  const items = [
    {
      tag: "C.01",
      icon: "eye",
      title: "See every call.",
      body: "Live timeline of every request, response, and failure. No log files, no grep.",
      stamp: null,
      folded: true,
    },
    {
      tag: "C.02",
      icon: "play",
      title: "Replay payloads.",
      body: "Pick any frame. Edit the JSON. Re-send. Diff the response against the original.",
      stamp: null,
      folded: false,
    },
    {
      tag: "C.03",
      icon: "bug",
      title: "Catch failures.",
      body: "Failed calls are pinned with a red mark. Stack trace, retry count, peer status — all in one card.",
      stamp: "v0.3",
      folded: false,
    },
  ];
  return (
    <section style={{ padding: "60px 0", position: "relative" }}>
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
          fig. 3
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 600, lineHeight: 1, margin: 0 }}>
          What it does.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
        {items.map((it) => (
          <SchematicCard key={it.tag} partTag={it.tag} folded={it.folded} stamp={it.stamp}>
            <span
              style={{
                width: 44,
                height: 44,
                border: `1.5px solid ${InkColors.ink}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 4,
                marginBottom: 14,
              }}
            >
              <Icon name={it.icon} size={24} />
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1, color: InkColors.ink }}>
              {it.title}
            </div>
            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: 16,
                lineHeight: 1.5,
                color: InkColors.ink,
                margin: "16px 0 4px",
              }}
            >
              {it.body}
            </p>
          </SchematicCard>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Features });
