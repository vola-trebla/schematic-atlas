function App() {
  const [selectedId, setSelectedId] = React.useState(5);
  const [recording, setRecording] = React.useState(true);
  return (
    <React.Fragment>
      <WobbleDefs />
      <TopBar
        recording={recording}
        onToggleRecord={() => setRecording((r) => !r)}
        onConnect={() => {}}
      />
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        <ServerRail />
        <Timeline selectedId={selectedId} onSelect={setSelectedId} />
        <CallDetail callId={selectedId} />
      </div>
      <StatusBar />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
