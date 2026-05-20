# Schematic Atlas — Design System (prototype / reference)

> **This folder is a read-only prototype playground.**
> The canonical implementation lives in `web/src/design-system/`.
>
> | File here                     | Canonical counterpart                         |
> | ----------------------------- | --------------------------------------------- |
> | `assets/schematic.jsx`        | `web/src/design-system/schematic.tsx`         |
> | `colors_and_type.css`         | `web/src/design-system/globals.css`           |
> | `templates/protocol-page.jsx` | `web/src/design-system/protocol-renderer.tsx` |
> | `catalog/atlas.jsx`           | `web/src/design-system/catalog.client.tsx`    |
>
> Use this folder to **sketch new motifs** using Babel-in-browser (no build step).
> Once validated, port the change to `web/src/design-system/` — that is the single source of truth that ships.
> Do not edit `schematic.jsx` or `colors_and_type.css` expecting those changes to propagate to the deployed app.

---

**The product.** A catalog of MCP / AI-tooling protocols, each rendered as a
single schematic page. One protocol → one page. The page is the entry. The
catalog is the experience.

The visual language is **0.5 mm black gel pen on warm sketchbook paper** —
engineering notebook, not corporate SaaS. Hand-made but precise. Annotated
but legible. The interface itself is a diagram of how each tool works.

---

## Index

| File / Folder                  | What's in it                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| `README.md`                    | This file — brand context, content + visual + iconography fundamentals                       |
| `colors_and_type.css`          | All CSS custom properties — colors, paper, ink, type scale, semantic styles                  |
| `fonts/`                       | Google Fonts links + substitution notes                                                      |
| `assets/`                      | Logo mark, paper textures, the JSX motif library                                             |
| `assets/schematic.jsx`         | Reusable motifs — `DimLine`, `Callout`, `SchematicCard`, `SButton`, `Icon`, etc.             |
| `preview/`                     | Design-system tab cards — type, colors, motifs, components                                   |
| **`catalog/`**                 | **The Atlas index page** (`index.html` + `atlas.jsx`). Lists every protocol.                 |
| **`templates/`**               | **The canonical protocol-page renderer** + worked examples.                                  |
| `templates/protocol-page.jsx`  | The single, locked renderer. Edit the schema cautiously.                                     |
| `templates/protocol-page.html` | The scaffold to copy for new protocols.                                                      |
| `templates/examples/`          | 4 worked examples — `playwright-trace-decoder`, `mcp-grep`, `mcp-orchestrator`, `mcp-bench`. |
| `archive/`                     | Older brand exploration (fictional product microsites). Not the product.                     |
| `SKILL.md`                     | Agent skill manifest — load this to give an agent the brand                                  |

---

## The auto-enricher — and the hybrid workflow

A typical MCP README is **flat**: a name, a paragraph, a list of tools.
Hand-curating dozens of those into rich `CONFIG`s doesn't scale.

`templates/enrich.js` is a pure function `enrich(flatInput) → richConfig`.
It auto-categorises tools into icon-tagged groups, synthesises a 3-step
data-flow diagram, infers stats, applies the brand's motifs to warnings
and worked examples, and emits the rich Atlas config the renderer
expects.

**The enricher is a build-time tool, not a runtime hook.** The workflow is:

1. **Enrich**: feed a flat input into the enricher (web tool at `templates/enrich-tool.html`, or CLI `node templates/enrich-cli.mjs flat.json`). You get a 90%-complete rich config.
2. **Hand-author the soul**: paste into a fresh `protocol-page.html` and rewrite the parts that need a human — sharpened gutter annotations, custom red-stamped branches, tool-specific group blurbs, worked-example captions.
3. **Commit**.

**Hand-crafted illusion is locked in.** The catalog never displays an
"auto-enriched" badge on entry cards. The `enriched: true` flag is kept in
the catalog data layer for internal analytics only — it never reaches the
rendered DOM. From the reader's perspective, every page is hand-drawn.

See `templates/README.md` for the schema, both interactive and CLI tools,
and the field-by-field "hand-author the soul" checklist.
`templates/examples/env-secret-exposure-analyzer.html` is the canonical
worked example of this hybrid workflow.

---

## Adding a protocol — the 5-step workflow

1. **Copy** `templates/protocol-page.html` to `templates/examples/<your-tool>.html`.
2. **Edit the `CONFIG` block** at the top — see `templates/README.md` for the schema reference.
3. **Add an entry** to `ATLAS` in `catalog/atlas.jsx` (name, partTag, purpose, href, category, 3 thumbnail node labels).
4. Open `catalog/index.html` to see the new card appear.
5. Open the protocol page itself to verify the layout.

That's it. No CSS to write. No new components to build. Consistency by construction.

---

## What the canonical protocol page looks like

Every page has the same five sections, in the same order, with the same visual
treatments. **No tabs. No sub-pages. No nav.**

```
┌─────────────────────────────────────────────────────────────┐
│  ← back to catalog       Schematic Atlas       [T.04]       │
├─────────────────────────────────────────────────────────────┤
│  TITLE BLOCK                                                │
│  name (mono, filename-style)                                │
│  one-sentence purpose with a highlighter swipe              │
│  repo · package · LICENSE                                   │
├─────────────────────────────────────────────────────────────┤
│  KEY STATS (dim lines)                                      │
├─────────────────────────────────────────────────────────────┤
│  FIG. 1 — THE FLOW                                          │
│  vertical step sequence with optional red-stamped branches  │
├─────────────────────────────────────────────────────────────┤
│  FIG. 2 — COMPONENTS                                        │
│  groups (2-col) or a flat tools list                        │
├─────────────────────────────────────────────────────────────┤
│  FIG. 3 — INSTALL / USE                                     │
│  install tabs · run command · works-with checklist          │
├─────────────────────────────────────────────────────────────┤
│  footer                                                      │
└─────────────────────────────────────────────────────────────┘
```

Sections gracefully omit themselves if their data is missing — but the flow
diagram is strongly preferred (it's the whole point).

---

## Content Fundamentals

Voice is **annotated engineering**. You are the engineer leaving notes for
the next engineer (often: an LLM agent reading the catalog).

- **Second person, sparingly.** Prefer imperatives ("Pipe stdout to the inspector") or stated-fact ("`mcp.connect()` opens a long-lived stream"). Avoid "we", "our team", "your journey".
- **Sentence case** everywhere. The only ALL-CAPS is stamped labels (`DRAFT`, `v0.3`, `IF FLAKY`) — these read as marginal annotations, not shouting.
- **No emoji.** Iconography is hand-drawn line art only.
- **No exclamation marks.** A schematic does not exclaim.
- **Short, declarative.** Period-terminated. Subordinate clauses fine; multiple commas per sentence are not.
- **Numbers stay numerals.** "3 tools", not "three tools" — same convention as a parts list.

### Diction

| Prefer                       | Avoid                          |
| ---------------------------- | ------------------------------ |
| tool, server, client, stream | platform, solution, experience |
| connect, call, return, fail  | empower, unlock, supercharge   |
| see Fig. 2, see callout B    | learn more, click here         |
| Returns the run id.          | Get started in minutes.        |

### Worked examples

**Atlas entry purpose (good):**

> _"An MCP server that turns Playwright `trace.zip` into structured signal for AI-driven failure analysis."_

**Atlas entry purpose (bad — wrong voice):**

> _"Empower your AI agents with next-generation test-failure observability."_

---

## Visual Foundations

Every UI surface is composed as if drawn on paper.

### Paper

Warm off-white sketchbook (`--paper`, `#F2EDE2`) with a faint paper-grain
texture at low opacity. Optionally a 5-mm engineering grid (`--paper-shadow`)
on hero areas, never under body copy.

### Ink

One ink color: `--ink` (`#15161B`) — near-black with a touch of cool blue.

Two accent inks, sparingly:

- **Red** `--ink-red` (`#B43A2A`) — corrections, conditional branches, warning stamps.
- **Blueprint blue** `--ink-blue` (`#26537B`) — italic-hand margin annotations.

A **highlighter yellow** `--hl-yellow` (`#F2D957`) at 60–80% opacity for one
key noun per page. The highlight is implemented as a **clamped CSS band**
(28% → 86% of the line-box) so it draws behind only the visible letters, not
the whole line.

### Type

| Role           | Family                      | Use                                                  |
| -------------- | --------------------------- | ---------------------------------------------------- |
| Display (hand) | **Caveat** 700              | Section figure titles                                |
| Body (hand)    | **Architects Daughter** 400 | Long-form body, captions, italic-hand annotations    |
| Mono / labels  | **JetBrains Mono** 400/600  | Tool names, code, part numbers, all technical labels |
| Stamp          | **Special Elite**           | Rotated rubber-stamp labels (DRAFT, IF FLAKY)        |

All Google-Fonts substitutes. See `fonts/README.md`.

### Spacing & strokes

5-mm grid mental model. Default stroke 1.5 px (cards, buttons); 2.5 px for
diagram primary; 1 px for dimension lines.

Corner radius: **0 px** — schematics don't have rounded corners. The single
exception is adhesive-label chips (`--r-pill`, 999 px).

### Shadows

No soft drop-shadows. Elevation = **hatching** (parallel diagonal lines along
the bottom-right edge) or **offset ghost stroke** (pressed state).

### Schematic motifs

The brand's signature library — used on every Atlas page:

- **Dimension lines** — arrowed `↔` with a mono label. Stats, sizes, latencies.
- **Lettered/numbered callouts** — circled glyph on a leader line, with a paragraph caption nearby.
- **Dashed connection lines** — connect related elements. Dash pattern `6 4`.
- **Hatching** — diagonal fills for shadowed, off, or redacted regions.
- **Margin annotations** — italic-hand notes in `--ink-blue`, attached by a dashed leader.
- **Stamps** — rotated red rubber-stamp labels (`IF FLAKY`, `EXPERIMENTAL`). ≤ 4° rotation.
- **Part-number tags** — square brackets, mono, on the top-left of any card (`[T.04]`, `[G.RCA]`).

### Animation

Rare and mechanical. Pen-stroke draw-ins for SVG borders (220 ms,
`cubic-bezier(0.7, 0, 0.3, 1)`). No bounce, no spring, no scale-in.

### Hover / press

- **Atlas entry cards** lift 2 px diagonally with a faint ghost-stroke behind.
- **Buttons** show the ghost stroke; pressed = shift 2 px down-right.
- **Links** — underline-draw on hover (no color change).

---

## Iconography

**Hand-drawn line illustrations, single stroke, single ink color.** No fills.
No two-tone. No emoji. No unicode glyphs masquerading as icons. No system
icon fonts.

A brand-native icon set lives inline in `assets/schematic.jsx` under
`ICON_PATHS`. Currently includes: `github · eye · play · bug · tool ·
terminal · search · link · stream · pause · copy · arrow_right · plus ·
filter · clock`. Use via `<Icon name="..." size={...} />`. Add new icons by
appending to `ICON_PATHS` in the same file — viewBox `0 0 24 24`, stroke
`currentColor`, 1.6 px default weight.

---

## What's in `archive/`

The first iterations of this system mocked up _fictional product microsites_
(a marketing site for "Schematic", a 3-pane "Schematic Inspector"). They
were brand exploration, not the product. Kept around for reference. **Do
not build new pages in that style** — every new protocol goes through
`templates/protocol-page.jsx` instead.
