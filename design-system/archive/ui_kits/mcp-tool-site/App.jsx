function ConnectDialog({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(21,22,27,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          background: "var(--paper)",
          border: `1.5px solid ${InkColors.ink}`,
          padding: "28px 30px",
          position: "relative",
        }}
      >
        <FoldedCorner />
        <span style={{ position: "absolute", top: -10, left: 18, background: "var(--paper)", padding: "0 6px" }}>
          <PartTag>D.01</PartTag>
        </span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, margin: "0 0 4px", lineHeight: 1 }}>
          Connect a tool.
        </h3>
        <p style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: InkColors.muted, margin: "0 0 20px", lineHeight: 1.5 }}>
          Paste the path to your MCP server. We'll handshake on stdio by default.
        </p>
        <SInput label="server path" placeholder="./my-server.js" hint="Or pass a transport URL." />
        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
          <SButton onClick={onClose}>Cancel</SButton>
          <SButton primary onClick={onClose}>Connect</SButton>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [dialog, setDialog] = React.useState(false);
  return (
    <React.Fragment>
      <WobbleDefs />
      <div className="page-shell">
        <Header />
        <Hero onConnect={() => setDialog(true)} />
        <ToolDiagram />
        <Install />
        <Features />
        <Steps />
        <Footer />
      </div>
      <ConnectDialog open={dialog} onClose={() => setDialog(false)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
