/**
 * Core schema types for Schematic Atlas protocol pages.
 *
 * Mirrors the CONFIG schema documented in CLAUDE.md §4.
 * `enriched` is the only field that lives in data only — never reaches the DOM.
 */

// Icon names available in the schematic motif library (schematic.tsx ICON_PATHS).
export type IconName =
  | "github"
  | "eye"
  | "play"
  | "bug"
  | "tool"
  | "terminal"
  | "search"
  | "link"
  | "stream"
  | "pause"
  | "copy"
  | "arrow_right"
  | "arrow_left"
  | "plus"
  | "filter"
  | "clock";

export type Tool = {
  name: string;
  sub?: string;
};

export type Group = {
  key: string;
  title: string;
  icon?: IconName;
  blurb?: string;
  items: Tool[];
};

export type FlowBranch = {
  /** Step number or special glyph (e.g. "!" for a warning branch). */
  n: number | string;
  name: string;
  condition: string;
  body?: string;
};

export type FlowStep = {
  n: number | string;
  name: string;
  args?: string;
  body?: string;
  /** Italic-blue gutter question — answers WHY an agent calls this. */
  question?: string;
  branch?: FlowBranch;
};

export type FlowInput = {
  label: string;
  sub?: string;
};

export type Flow = {
  input?: FlowInput;
  steps: FlowStep[];
};

export type Note = {
  n?: number | string;
  /** Rendered as a red rubber-stamp label above the note card. */
  condition?: string;
  body: string;
};

export type Example = {
  lang?: string;
  code: string;
  captions?: string[];
};

export type ProtocolConfig = {
  // ── Identity ──────────────────────────────────────────────────────
  name: string;
  /** Corner tag in [X.00] format (e.g. "T.04"). Optional — context7 has none. */
  partTag?: string;
  purpose: string;
  /** Substring of `purpose` to highlight. At most one per page. */
  highlight?: string;
  repo?: string;
  package?: string;
  license?: string;

  // ── Stats (0–4 dim-line entries) ──────────────────────────────────
  stats?: [string, string?][];

  // ── Centerpiece ───────────────────────────────────────────────────
  flow?: Flow;

  // ── Components: groups XOR tools — never both ─────────────────────
  groups?: Group[];
  tools?: Tool[];

  // ── Optional sections ─────────────────────────────────────────────
  notes?: Note[];
  example?: Example;

  // ── Install / use ─────────────────────────────────────────────────
  install?: Record<string, string>;
  run?: string;
  worksWith?: string[];

  // ── Catalog metadata (used by home page, never by renderer) ───────
  /** Protocol category for catalog filtering. */
  category?: string;
  /** Three-node labels for the catalog thumbnail SVG. */
  nodes?: [string, string, string];

  // ── Internal ──────────────────────────────────────────────────────
  /** Marks enricher-generated configs. Never rendered. */
  enriched?: boolean;
};
