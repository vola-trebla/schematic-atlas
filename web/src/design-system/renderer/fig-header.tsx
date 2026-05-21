export function FigHeader({ n, title }: { n: string | null; title: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 6 }}>
        <span className="fig-label">fig. {n}</span>
      </div>
      <h2 className="fig-title">{title}</h2>
    </div>
  );
}
