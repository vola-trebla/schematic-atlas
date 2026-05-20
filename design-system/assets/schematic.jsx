/* PROTOTYPE / REFERENCE ONLY — do not edit expecting changes to ship.
   Canonical implementation: web/src/design-system/schematic.tsx
   Use this file to sketch new motifs (Babel-in-browser, no build step).
   Once validated, port changes to the TSX file.
*/
/* Schematic motifs — the signature ingredients of the brand.
   Use these to compose any UI surface. Globals at end of file.
   Depends on: colors_and_type.css (for CSS vars).
*/

const InkColors = {
  ink: "#15161B",
  soft: "#2E2F36",
  muted: "#6A6962",
  faint: "#ACA694",
  ghost: "#C9C2AE",
  red: "#B43A2A",
  blue: "#26537B",
  green: "#3F6E3A",
};

/* ───────────────────────── Wobble SVG defs (inject once) ───────────────────────── */
function WobbleDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden="true">
      <defs>
        <filter id="wobble" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="wobble-strong" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="wobble-subtle" x="-1%" y="-1%" width="102%" height="102%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* ───────────────────────── Dimension line ─────────────────────────
   Horizontal arrowed line with a value label centered above.
   <DimLine label="142 KB" width={220} />
*/
function DimLine({ label, width = 200, color = InkColors.ink, align = "above", style }) {
  const h = align === "above" ? 22 : 22;
  return (
    <span
      className="dim-line"
      style={{
        display: "inline-flex",
        flexDirection: align === "above" ? "column" : "column-reverse",
        alignItems: "center",
        gap: 2,
        ...style,
      }}
    >
      <span
        className="mono"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-mono-sm)",
          color,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
      <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none" stroke={color}>
        {/* left tick */}
        <line x1="1" y1="3" x2="1" y2={h - 3} strokeWidth="1.2" />
        {/* right tick */}
        <line x1={width - 1} y1="3" x2={width - 1} y2={h - 3} strokeWidth="1.2" />
        {/* arrows */}
        <line x1="1" y1={h / 2} x2={width - 1} y2={h / 2} strokeWidth="1.2" />
        <path d={`M 8 ${h / 2 - 4} L 1 ${h / 2} L 8 ${h / 2 + 4}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={`M ${width - 8} ${h / 2 - 4} L ${width - 1} ${h / 2} L ${width - 8} ${h / 2 + 4}`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ───────────────────────── Vertical dimension line ───────────────────────── */
function DimLineV({ label, height = 200, color = InkColors.ink, style }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, ...style }}>
      <svg width="22" height={height} viewBox={`0 0 22 ${height}`} fill="none" stroke={color}>
        <line x1="3" y1="1" x2={22 - 3} y2="1" strokeWidth="1.2" />
        <line x1="3" y1={height - 1} x2={22 - 3} y2={height - 1} strokeWidth="1.2" />
        <line x1="11" y1="1" x2="11" y2={height - 1} strokeWidth="1.2" />
        <path d="M 7 8 L 11 1 L 15 8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M 7 ${height - 8} L 11 ${height - 1} L 15 ${height - 8}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-mono-sm)",
          color,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </span>
  );
}

/* ───────────────────────── Callout circle (lettered) ─────────────────────────
   <Callout letter="A" /> — circled ink letter, 24px.
*/
function Callout({ letter = "A", size = 26, color = InkColors.ink, filled = false, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.8px solid ${color}`,
        background: filled ? color : "transparent",
        color: filled ? "#F2EDE2" : color,
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        fontSize: size * 0.5,
        lineHeight: 1,
        ...style,
      }}
    >
      {letter}
    </span>
  );
}

/* ───────────────────────── Leader line + caption ─────────────────────────
   A short kinked leader line ending in a callout, with a caption.
   Composes as a flex row.
*/
function LeaderCaption({ letter, children, color = InkColors.ink, style }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, ...style }}>
      <Callout letter={letter} color={color} />
      <span
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: "var(--fs-caption)",
          color: InkColors.ink,
          lineHeight: 1.45,
          maxWidth: "28ch",
          paddingTop: 4,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/* ───────────────────────── Numbered step pill ─────────────────────────
   ① ② ③ — circled numeric, mono. Same as Callout but defaults to number style.
*/
function StepNum({ n = 1, ...rest }) {
  return <Callout letter={String(n)} {...rest} />;
}

/* ───────────────────────── Arrow (hand-drawn) ─────────────────────────
   Open-triangle arrowhead at end of a line. Direction: right by default.
*/
function Arrow({ length = 80, direction = "right", color = InkColors.ink, dashed = false, style }) {
  const w = direction === "right" || direction === "left" ? length : 16;
  const h = direction === "right" || direction === "left" ? 16 : length;
  const dashAttr = dashed ? "6 4" : undefined;
  let pathD = "";
  let arrowD = "";
  if (direction === "right") {
    pathD = `M 1 8 L ${length - 6} 8`;
    arrowD = `M ${length - 10} 3 L ${length - 1} 8 L ${length - 10} 13`;
  } else if (direction === "left") {
    pathD = `M ${length - 1} 8 L 6 8`;
    arrowD = `M 10 3 L 1 8 L 10 13`;
  } else if (direction === "down") {
    pathD = `M 8 1 L 8 ${length - 6}`;
    arrowD = `M 3 ${length - 10} L 8 ${length - 1} L 13 ${length - 10}`;
  } else if (direction === "up") {
    pathD = `M 8 ${length - 1} L 8 6`;
    arrowD = `M 3 10 L 8 1 L 13 10`;
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke={color} style={style}>
      <path d={pathD} strokeWidth="1.4" strokeDasharray={dashAttr} strokeLinecap="round" />
      <path d={arrowD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── Hatching block ─────────────────────────
   Diagonal hatched fill, for "disabled" or "shadow" zones.
*/
function Hatch({ width = "100%", height = 60, angle = 45, spacing = 5, color = InkColors.ink, opacity = 0.45, style }) {
  // background-image with repeating-linear-gradient
  const bg = `repeating-linear-gradient(${angle}deg, ${color} 0 1px, transparent 1px ${spacing}px)`;
  return (
    <span
      style={{
        display: "block",
        width,
        height,
        backgroundImage: bg,
        opacity,
        ...style,
      }}
    />
  );
}

/* ───────────────────────── Stamp ─────────────────────────
   Rotated rubber-stamp label in red ink.
*/
function Stamp({ children = "DRAFT", color = InkColors.red, rotate = -3, size = "var(--fs-h3)", style }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-stamp)",
        fontSize: size,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        border: `2.5px solid ${color}`,
        padding: "4px 12px",
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ───────────────────────── Margin annotation ─────────────────────────
   Italic-hand caption that lives in the gutter, with a thin leader line
   pointing right (or left). Position with absolute.
*/
function Annotation({ children, side = "right", color = InkColors.blue, leaderLength = 40, style }) {
  const leader = (
    <svg
      width={leaderLength}
      height="10"
      viewBox={`0 0 ${leaderLength} 10`}
      fill="none"
      stroke={color}
      style={{ alignSelf: "center" }}
    >
      <path
        d={
          side === "right"
            ? `M 0 5 L ${leaderLength - 4} 5`
            : `M ${leaderLength} 5 L 4 5`
        }
        strokeWidth="1"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
      <circle cx={side === "right" ? leaderLength - 2 : 2} cy="5" r="1.6" fill={color} />
    </svg>
  );
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: side === "right" ? "row-reverse" : "row",
        alignItems: "center",
        gap: 6,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-hand)",
          fontStyle: "italic",
          fontSize: "var(--fs-caption)",
          color,
          lineHeight: 1.45,
          maxWidth: "22ch",
        }}
      >
        {children}
      </span>
      {leader}
    </span>
  );
}

/* ───────────────────────── Folded corner ─────────────────────────
   Top-right dog-eared corner. Place on a card.
*/
function FoldedCorner({ size = 28, color = InkColors.ink, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      stroke={color}
      style={{ position: "absolute", top: -1, right: -1, ...style }}
      aria-hidden="true"
    >
      {/* Paper triangle (paper-colored fill) */}
      <path d="M 0 0 L 28 0 L 28 28 Z" fill="#F2EDE2" stroke="none" />
      {/* Fold edge */}
      <path d="M 0 0 L 28 28" strokeWidth="1.4" strokeLinecap="round" />
      {/* Underside of fold */}
      <path d="M 28 0 L 12 0 L 28 16 Z" fill="#E8E0CE" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── Part-number tag ─────────────────────────
   Small mono label like [A.01] in the top-left of a card.
*/
function PartTag({ children = "A.01", style }) {
  return (
    <span
      className="mono"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-label)",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: InkColors.ink,
        border: `1.4px solid ${InkColors.ink}`,
        padding: "2px 6px",
        background: "var(--paper-bright)",
        ...style,
      }}
    >
      [{children}]
    </span>
  );
}

/* ───────────────────────── Pen-stroke divider ─────────────────────────
   Hand-drawn horizontal rule with slight wave.
*/
function PenDivider({ width = "100%", color = InkColors.ink, style }) {
  return (
    <svg
      width={width}
      height="8"
      viewBox="0 0 1000 8"
      preserveAspectRatio="none"
      fill="none"
      stroke={color}
      style={{ display: "block", ...style }}
    >
      <path d="M 0 4 Q 100 2, 200 4 T 400 4 T 600 4 T 800 4 T 1000 4" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────────────────── Schematic card frame ─────────────────────────
   The atomic surface. Stroked border, optional part-tag, optional folded
   corner, optional hatching shadow.
*/
function SchematicCard({
  children,
  partTag,
  folded = false,
  shadow = false,
  stamp,
  pad = "var(--sp-5)",
  style,
  ...rest
}) {
  return (
    <div
      {...rest}
      style={{
        position: "relative",
        border: `1.5px solid ${InkColors.ink}`,
        padding: pad,
        background: "transparent",
        ...style,
      }}
    >
      {partTag && (
        <span style={{ position: "absolute", top: -10, left: 14, background: "var(--paper)", padding: "0 4px" }}>
          <PartTag>{partTag}</PartTag>
        </span>
      )}
      {folded && <FoldedCorner />}
      {stamp && (
        <span style={{ position: "absolute", top: 16, right: 16, transform: "rotate(-4deg)" }}>
          <Stamp size="var(--fs-h4)">{stamp}</Stamp>
        </span>
      )}
      {shadow && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: -8,
            bottom: -8,
            zIndex: -1,
            backgroundImage: `repeating-linear-gradient(45deg, ${InkColors.ink} 0 1px, transparent 1px 5px)`,
            opacity: 0.5,
          }}
        />
      )}
      {children}
    </div>
  );
}

/* ───────────────────────── Schematic button ─────────────────────────
   Bordered, mono-uppercase. Ghost-stroke behind, shifts on press.
*/
function SButton({ children, primary, onClick, type = "button", style, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      {...rest}
      style={{
        position: "relative",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono)",
        fontWeight: 600,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        background: primary ? InkColors.ink : "var(--paper-bright)",
        color: primary ? "var(--paper)" : InkColors.ink,
        border: `1.5px solid ${InkColors.ink}`,
        padding: "10px 18px",
        cursor: "pointer",
        transform: pressed ? "translate(2px, 2px)" : "none",
        transition: "transform 120ms cubic-bezier(0.7,0,0.3,1)",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: `1.5px solid ${InkColors.faint}`,
          transform: "translate(3px, 3px)",
          zIndex: -1,
        }}
      />
      {children}
    </button>
  );
}

/* ───────────────────────── Schematic input ───────────────────────── */
function SInput({ label, hint, value, onChange, placeholder, style, ...rest }) {
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-label)",
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: InkColors.ink,
            marginBottom: 6,
          }}
        >
          {label}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        style={{
          width: "100%",
          background: "transparent",
          border: 0,
          borderBottom: `1.5px solid ${InkColors.ink}`,
          fontFamily: "var(--font-hand)",
          fontSize: "var(--fs-body)",
          color: InkColors.ink,
          padding: "6px 2px",
          outline: "none",
        }}
      />
      {hint && (
        <span
          style={{
            fontFamily: "var(--font-hand)",
            fontStyle: "italic",
            fontSize: "var(--fs-caption)",
            color: InkColors.blue,
            display: "block",
            marginTop: 4,
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

/* ───────────────────────── Tag chip (adhesive label) ───────────────────────── */
function Chip({ children, color = InkColors.ink, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono-sm)",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color,
        background: "var(--paper-bright)",
        border: `1.4px solid ${color}`,
        borderRadius: 999,
        padding: "2px 10px",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ───────────────────────── Schematic check ─────────────────────────
   Hand-drawn ✓ in ink-green for "ok" / "passed".
*/
function CheckMark({ size = 18, color = InkColors.green, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} style={style}>
      <path d="M 4 13 L 10 19 L 21 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── Schematic cross ─────────────────────────
   Hand-drawn ✗ in ink-red for "failed" / "error".
*/
function CrossMark({ size = 18, color = InkColors.red, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} style={style}>
      <path d="M 5 5 L 19 19 M 19 5 L 5 19" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── Icon (inline SVG, hand-drawn) ─────────────────────────
   A small brand-native icon set. Single stroke, 1.6 px, viewBox 0 0 24 24.
   Use: <Icon name="eye" size={20} />
*/
const ICON_PATHS = {
  github: (
    <g>
      <path d="M12 2.5 C 6.8 2.5 2.5 6.8 2.5 12 c 0 4.2 2.7 7.7 6.5 9 c 0.5 0.1 0.6 -0.2 0.6 -0.5 v -1.6 c -2.6 0.6 -3.2 -1.2 -3.2 -1.2 c -0.4 -1.1 -1.1 -1.4 -1.1 -1.4 c -0.9 -0.6 0.1 -0.6 0.1 -0.6 c 1 0.1 1.5 1 1.5 1 c 0.9 1.5 2.3 1.1 2.9 0.8 c 0.1 -0.7 0.4 -1.1 0.6 -1.4 c -2.1 -0.2 -4.3 -1 -4.3 -4.6 c 0 -1 0.4 -1.9 1 -2.5 c -0.1 -0.3 -0.4 -1.3 0.1 -2.7 c 0 0 0.8 -0.3 2.7 1 c 0.8 -0.2 1.6 -0.3 2.5 -0.3 c 0.8 0 1.7 0.1 2.5 0.3 c 1.9 -1.3 2.7 -1 2.7 -1 c 0.5 1.4 0.2 2.4 0.1 2.7 c 0.6 0.7 1 1.5 1 2.5 c 0 3.6 -2.2 4.4 -4.3 4.6 c 0.3 0.3 0.6 0.9 0.6 1.8 v 2.6 c 0 0.3 0.2 0.6 0.6 0.5 c 3.8 -1.3 6.5 -4.8 6.5 -9 c 0 -5.2 -4.2 -9.5 -9.5 -9.5 z" />
    </g>
  ),
  eye: (
    <g>
      <path d="M 2 12 C 5 6, 9 4, 12 4 C 15 4, 19 6, 22 12 C 19 18, 15 20, 12 20 C 9 20, 5 18, 2 12 Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  play: (
    <g>
      <path d="M 7 4 L 7 20 L 20 12 Z" strokeLinejoin="round" />
    </g>
  ),
  bug: (
    <g>
      <ellipse cx="12" cy="13" rx="5" ry="6.5" />
      <line x1="12" y1="6.5" x2="12" y2="20" />
      <path d="M 9 5 L 11 8" />
      <path d="M 15 5 L 13 8" />
      <line x1="3" y1="10" x2="7" y2="11" />
      <line x1="21" y1="10" x2="17" y2="11" />
      <line x1="3" y1="17" x2="7" y2="16" />
      <line x1="21" y1="17" x2="17" y2="16" />
      <line x1="3" y1="13.5" x2="7" y2="13.5" />
      <line x1="21" y1="13.5" x2="17" y2="13.5" />
    </g>
  ),
  tool: (
    <g>
      <path d="M 14 4 L 20 10 L 16 14 L 14 12 L 6 20 L 4 18 L 12 10 L 10 8 L 14 4 Z" strokeLinejoin="round" />
    </g>
  ),
  terminal: (
    <g>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M 7 9 L 11 12 L 7 15" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="17" y2="16" />
    </g>
  ),
  search: (
    <g>
      <circle cx="11" cy="11" r="6" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" />
    </g>
  ),
  link: (
    <g>
      <path d="M 10 14 L 14 10" />
      <path d="M 11 7 L 13 5 C 15 3, 18 3, 20 5 C 22 7, 22 10, 20 12 L 18 14" strokeLinejoin="round" />
      <path d="M 13 17 L 11 19 C 9 21, 6 21, 4 19 C 2 17, 2 14, 4 12 L 6 10" strokeLinejoin="round" />
    </g>
  ),
  stream: (
    <g>
      <path d="M 3 7 C 7 5, 9 9, 13 7 C 17 5, 19 9, 21 7" />
      <path d="M 3 12 C 7 10, 9 14, 13 12 C 17 10, 19 14, 21 12" />
      <path d="M 3 17 C 7 15, 9 19, 13 17 C 17 15, 19 19, 21 17" />
    </g>
  ),
  pause: (
    <g>
      <line x1="8" y1="5" x2="8" y2="19" strokeWidth="2.4" />
      <line x1="16" y1="5" x2="16" y2="19" strokeWidth="2.4" />
    </g>
  ),
  copy: (
    <g>
      <rect x="8" y="8" width="12" height="12" />
      <path d="M 16 8 L 16 4 L 4 4 L 4 16 L 8 16" strokeLinejoin="round" />
    </g>
  ),
  arrow_right: (
    <g>
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M 15 7 L 20 12 L 15 17" strokeLinejoin="round" />
    </g>
  ),
  plus: (
    <g>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>
  ),
  filter: (
    <g>
      <path d="M 4 5 L 20 5 L 14 12 L 14 20 L 10 18 L 10 12 Z" strokeLinejoin="round" />
    </g>
  ),
  clock: (
    <g>
      <circle cx="12" cy="12" r="8" />
      <path d="M 12 7 L 12 12 L 16 14" strokeLinejoin="round" />
    </g>
  ),
};

function Icon({ name, size = 20, color = InkColors.ink, strokeWidth = 1.6, style }) {
  const path = ICON_PATHS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      aria-hidden="true"
    >
      {path || <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

/* ───────────────────────── Stroke-draw wrapper ─────────────────────────
   Adds a stroke-draw animation to any SVG children.
*/
function StrokeDraw({ children, duration = 600, delay = 0, style }) {
  return (
    <span
      className="anim-draw"
      style={{
        display: "inline-block",
        ["--dash-len"]: 800,
        ["--dur-slow"]: `${duration}ms`,
        animationDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* Expose globals */
Object.assign(window, {
  InkColors,
  WobbleDefs,
  DimLine,
  DimLineV,
  Callout,
  LeaderCaption,
  StepNum,
  Arrow,
  Hatch,
  Stamp,
  Annotation,
  FoldedCorner,
  PartTag,
  PenDivider,
  SchematicCard,
  SButton,
  SInput,
  Chip,
  CheckMark,
  CrossMark,
  Icon,
  StrokeDraw,
});
