import { InkColors } from "../motifs";

export function EntryThumbnail({ nodes }: { nodes: [string, string, string] }) {
  const NW = 88,
    NH = 32,
    GAP = 22;
  const W = nodes.length * NW + (nodes.length - 1) * GAP;
  const H = 56;
  const Y = (H - NH) / 2;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      fill="none"
      stroke={InkColors.ink}
      style={{ maxWidth: W }}
      aria-hidden="true"
    >
      {nodes.map((label, i) => {
        const x = i * (NW + GAP);
        const accent = i === Math.floor(nodes.length / 2);
        return (
          <g key={i}>
            <rect x={x} y={Y} width={NW} height={NH} strokeWidth={accent ? 2 : 1.4} />
            <text
              x={x + NW / 2}
              y={Y + NH / 2 + 4}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fill={InkColors.ink}
              stroke="none"
            >
              {label}
            </text>
            {i < nodes.length - 1 && (
              <g>
                <path
                  d={`M ${x + NW + 2} ${H / 2} L ${x + NW + GAP - 5} ${H / 2}`}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${x + NW + GAP - 9} ${H / 2 - 4} L ${x + NW + GAP - 4} ${H / 2} L ${x + NW + GAP - 9} ${H / 2 + 4}`}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
