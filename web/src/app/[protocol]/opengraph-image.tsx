import fs from "fs";
import path from "path";

import { ImageResponse } from "next/og";

import { loadProtocol, PROTOCOL_SLUGS } from "../../data/load-protocol";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROTOCOL_SLUGS.map((protocol) => ({ protocol }));
}

const INK = "#15161B";
const INK_MUTED = "rgba(21,22,27,0.4)";
const INK_BLUE = "#1C3A8A";
const PAPER = "#F2EDE2";
const MONO = "JetBrains Mono";

function loadFont(): ArrayBuffer {
  const fontPath = path.join(process.cwd(), "public", "fonts", "JetBrainsMono-SemiBold.ttf");
  return fs.readFileSync(fontPath).buffer as ArrayBuffer;
}

export default async function Image({ params }: { params: Promise<{ protocol: string }> }) {
  const { protocol } = await params;
  const config = await loadProtocol(protocol);

  if (!config) return new Response("Not found", { status: 404 });

  const fontData = loadFont();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: PAPER,
        padding: "40px 64px",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {config.partTag && (
            <span
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: INK,
                border: `1.4px solid ${INK}`,
                padding: "3px 8px",
                letterSpacing: "0.1em",
              }}
            >
              [{config.partTag}]
            </span>
          )}
          <span
            style={{
              fontFamily: MONO,
              fontSize: 14,
              color: INK_MUTED,
              letterSpacing: "0.15em",
            }}
          >
            SCHEMATIC ATLAS
          </span>
        </div>
        {config.category && (
          <span
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: INK_MUTED,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {config.category}
          </span>
        )}
      </div>

      {/* ── Rule ── */}
      <div style={{ height: 1, backgroundColor: INK, marginBottom: 36 }} />

      {/* ── Protocol name ── */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 54,
          fontWeight: 600,
          color: INK,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        {config.name}
      </div>

      {/* ── Purpose ── */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 20,
          color: INK,
          lineHeight: 1.5,
          marginBottom: 36,
          maxWidth: "76%",
          fontWeight: 400,
        }}
      >
        {config.purpose}
      </div>

      {/* ── Stats ── */}
      {config.stats && config.stats.length > 0 && (
        <div style={{ display: "flex", gap: 48, marginBottom: 36 }}>
          {config.stats.slice(0, 3).map(([value, label], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 28,
                  fontWeight: 600,
                  color: i % 2 === 1 ? INK_BLUE : INK,
                }}
              >
                {value}
              </span>
              {label && (
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: INK_MUTED,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Spacer pushes nodes to bottom ── */}
      <div style={{ flex: 1 }} />

      {/* ── Node flow ── */}
      {config.nodes && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {config.nodes.map((node, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  padding: "6px 14px",
                  border: `1.4px solid ${INK_MUTED}`,
                  color: INK,
                }}
              >
                {node}
              </div>
              {i < config.nodes!.length - 1 && (
                <span
                  style={{
                    color: INK_MUTED,
                    fontSize: 20,
                    fontFamily: MONO,
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>,
    {
      ...size,
      fonts: [
        {
          name: MONO,
          data: fontData,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}
