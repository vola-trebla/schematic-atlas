# CLAUDE.md — Schematic Atlas

Internal context file. Read this first. New Claude sessions should be able to onboard in <2 minutes.

---

## 1. What this project is

**Schematic Atlas** is a visual encyclopedia for MCP protocols and AI-tooling systems. The product is not any single page — the product is the atlas itself: a catalog of protocols, each rendered as one schematic engineering-notebook page using a single locked renderer.

The whole thesis: **visual cognition compression**. A developer should grasp what an MCP server does in <30 seconds by scanning a diagram, not by reading 20 minutes of README.

Full vision: [mcp_atlas_concept_roadmap_md.md](mcp_atlas_concept_roadmap_md.md).

**The atlas is the product. Each page is an entry. Do not build microsites, dashboards, tabs, or drill-downs.**

---

## 2. Repo layout

```
/Schematic Design System/          ← design system prototype (source of truth for the visual language)
   README.md                        brand context + iconography fundamentals
   SKILL.md                         agent skill manifest
   colors_and_type.css              all design tokens (paper, ink, type, spacing, motion)
   assets/schematic.jsx             motif library — DimLine, Callout, Stamp, SchematicCard, Icon, …
   assets/{logo.svg, paper-grain.svg, wobble-filter.svg, logo-wordmark.svg}
   templates/
     protocol-page.html             the scaffold to copy per protocol
     protocol-page.jsx              THE LOCKED RENDERER. Reads rich CONFIG, emits the page.
     enrich.js                      pure function: FlatInput → RichConfig (auto-categorise + synthesise)
     enrich-cli.mjs                 Node CLI wrapper around enrich.js
     enrich-tool.html               browser UI for the enricher
     examples/                      worked protocol pages (playwright-trace-decoder, mcp-grep, …)
   catalog/
     atlas.jsx                      the catalog grid (header, intro, filters, entry cards, thumbnails)
     index.html                     atlas catalog entrypoint
   preview/                         per-token / per-component preview cards
   archive/                         older brand exploration. DO NOT build new pages in this style.
   scraps/                          screenshots / iteration snapshots
   uploads/                         scratch
   cli/                             early CLI experiments

/web/                              ← Next.js 16 + React 19 port (deployment target)
   src/
     app/layout.tsx                root layout — loads fonts + WobbleDefs
     app/page.tsx                  catalog/home grid
     app/[protocol]/page.tsx       dynamic route → ProtocolRenderer
     app/globals.css               BOILERPLATE (Tailwind 4, Geist) — see REVIEW.md, item 5
     design-system/globals.css     real design tokens (duplicate of colors_and_type.css)
     design-system/schematic.tsx   motif library (TSX port of assets/schematic.jsx)
     design-system/protocol-renderer.tsx   TSX port of protocol-page.jsx
     data/protocols.ts             the catalog data (Record<string, ProtocolConfig>)
   AGENTS.md                       warning: Next.js 16 has breaking changes — consult node_modules/next/dist/docs/

mcp_atlas_concept_roadmap_md.md    full vision + roadmap
context7_*.{json,md}               scratch examples used while testing the enricher
REVIEW.md                          punch-list of issues + improvements for the web/ port
```

The two implementations are not yet unified. Treat `Schematic Design System/` as the design source-of-truth and `web/` as the deployable port that has drifted.

---

## 3. Rendering pipeline

```
README.md  ─┐
            ├─►  parseReadme(md)  ─►  FlatProtocolInput  ─►  enrich(flat)  ─►  rich CONFIG  ─┐
flat JSON ──┘                                                                                  │
                                                                                               ▼
                                                                  hand-author the 10% — sharpen
                                                                  flow.question, add red-stamp
                                                                  branches, tool-specific blurbs
                                                                                               │
                                                                                               ▼
                                                                          locked renderer
                                                                       (ProtocolPage / Renderer)
                                                                                               │
                                                                                               ▼
                                                                                  published page
```

**Invariants:**

- The renderer is **locked**. Edit the schema cautiously; don't add new sections.
- Sections gracefully omit themselves when their data is absent. Flow is strongly preferred.
- **Hand-crafted illusion**: `enriched: true` lives in the data layer only, never in DOM. The reader cannot tell which lines came from the script and which came from a human.

---

## 4. The CONFIG schema (locked)

Five logical sections, fixed order: **identity → stats → flow → components → install**, with optional `notes` and `example` inserted between components and install.

```ts
{
  // identity
  name:       string        // REQUIRED. mono, filename-style. "playwright-trace-decoder"
  partTag?:   string        // "T.04" — top-right corner tag
  purpose:    string        // REQUIRED. ONE sentence.
  highlight?: string        // substring of `purpose` to highlighter
  repo?:      string
  package?:   string
  license?:   string

  // 0–4 dim-line stats
  stats?:     Array<[value, label]>

  // centerpiece — vertical step diagram
  flow?: {
    input?: { label, sub? },
    steps:  Array<{
      n, name, args?, body?, question?,
      branch?: { n, name, condition, body? }    // condition → red rubber stamp
    }>
  }

  // components — EITHER groups (2-col grouped cards) OR tools (flat 2-col list)
  groups?: Array<{ key, title, icon?, blurb?, items: [{ name, sub? }] }>
  tools?:  Array<{ name, sub? }>

  // optional sections
  notes?:   Array<{ n?, condition?, body }>     // red-stamped warning cards
  example?: { lang?, code, captions?: string[] } // worked-example + leader captions

  // install / use
  install?:   { [pkgmgr]: command }
  run?:       string
  worksWith?: string[]
}
```

Hard rules:

- **One sentence in `purpose`.** Two sentences means two pages.
- **`groups` XOR `tools`** — never both.
- **At most one `highlight`** word per page. Usually the protocol's key noun.

---

## 5. Design philosophy — non-negotiables

The visual metaphor is _"an engineer explaining a system through annotated diagrams."_ These constraints are the product:

| Do                                                                             | Don't                                             |
| ------------------------------------------------------------------------------ | ------------------------------------------------- |
| Black ink on warm sketchbook paper                                             | Glossy SaaS, neon, crypto-gradient                |
| Mono for code-like strings, hand for prose, italic-blue for gutter annotations | Mixing fonts inside a single role                 |
| Red stamps for conditional branches only                                       | Red as decoration                                 |
| One highlight per page                                                         | Highlighter to "draw attention" generally         |
| 0 px radius (except adhesive pill chips)                                       | Rounded cards, soft shadows, drop-shadows         |
| Hatching or offset ghost stroke for elevation                                  | `box-shadow: 0 4px 12px rgba(...)`                |
| Hand-drawn inline-SVG icons via `ICON_PATHS`                                   | Emoji, unicode glyphs, system icon fonts          |
| Sentence case everywhere                                                       | ALL-CAPS shouting (stamps are the only exception) |
| Imperatives / stated facts ("Pipe stdout to the inspector")                    | Marketing voice ("Empower your AI agents")        |
| Period-terminated short sentences                                              | Exclamation marks                                 |
| Numerals ("3 tools")                                                           | Spelled-out numbers                               |

If a request would break any of these, push back. The constraints are the recognisable identity.

---

## 6. Reusable primitives (motif library)

Defined in `Schematic Design System/assets/schematic.jsx` (and ported to `web/src/design-system/schematic.tsx`). Use these directly; don't reinvent.

- **Layout**: `SchematicCard` (the atomic surface; supports `partTag`, `folded`, `shadow`, `stamp`)
- **Annotations**: `Annotation` (italic-blue gutter caption with dashed leader), `LeaderCaption` (callout + caption)
- **Diagram chrome**: `DimLine` / `DimLineV` (arrowed dimension lines for stats), `Callout` / `StepNum` (circled letter/number), `Arrow` (open-triangle, supports dashed), `PenDivider`, `FoldedCorner`
- **Stamps & tags**: `Stamp` (rotated red rubber-stamp), `PartTag` (`[T.04]`-style), `Chip` (adhesive pill)
- **Marks**: `CheckMark`, `CrossMark`
- **Inputs**: `SButton` (ghost-stroke, mono-uppercase), `SInput` (underlined hand-field)
- **Icons**: `Icon` reads from inline `ICON_PATHS` — `github · eye · play · bug · tool · terminal · search · link · stream · pause · copy · arrow_right · plus · filter · clock`. Add new ones by appending to `ICON_PATHS`. ViewBox `0 0 24 24`, stroke `currentColor`, weight 1.6.
- **Filters**: `WobbleDefs` (inject once at root for the wobble SVG filter), `Hatch` (diagonal fill block)
- **Effects**: `StrokeDraw` (pen-stroke draw-in animation, 600 ms ease-pen)

Tokens live in CSS custom properties (`--paper`, `--ink`, `--ink-blue`, `--ink-red`, `--hl-yellow`, `--font-display`, `--font-hand`, `--font-mono`, `--font-stamp`, `--sp-1`..`--sp-8`, `--stroke-rule`, `--stroke-diagram`, `--dur-fast`/`--dur-draw`, `--ease-pen`, etc.). Prefer tokens over hard-coded values.

---

## 7. Adding a new protocol — the 5-step workflow

1. **Get a flat input** (a name, one-sentence purpose, flat tools list, optional warnings + example). Either hand-write the JSON or pipe a README through `parseReadme()`.
2. **Run the enricher** for a 90%-complete rich config:
   - Interactive: open [Schematic Design System/templates/enrich-tool.html](Schematic Design System/templates/enrich-tool.html)
   - CLI: `node templates/enrich-cli.mjs flat.json > rich.json`
   - From a README: `node templates/enrich-cli.mjs --readme README.md > rich.json`
3. **Copy** [templates/protocol-page.html](Schematic Design System/templates/protocol-page.html) → `templates/examples/<name>.html`, paste the rich config into the `CONFIG` block.
4. **Hand-author the soul** — the 10% the enricher can't write:
   - Sharpen each `flow.steps[].question` (defaults are generic)
   - Add a real `branch` with a custom red-stamp condition where the agent genuinely has a choice (`if HEAD is clean`, `if ARIA empty`, …)
   - Rewrite each `groups[].blurb` to be tool-specific, not category-specific
   - Rewrite `example.captions` to point at the next call
   - Override `highlight` if auto-detect picked wrong
5. **Add the entry** to `ATLAS` in [catalog/atlas.jsx](Schematic Design System/catalog/atlas.jsx) (and mirror it in `web/src/data/protocols.ts`). Optionally set `enriched: true` for internal analytics — it never renders.

The renderer doesn't know or care which path the config came from. **The reader can't tell which lines started from the script and which came from a human. Don't break that.**

---

## 8. Current state of `web/`

The Next.js port (`web/`) is functional but the user has flagged it as low-quality — see [REVIEW.md](REVIEW.md). The headline issues:

- **Two source files for everything** — the design system is duplicated, not imported. Tokens, motifs, and renderer all exist twice.
- **`any` everywhere** — no `ProtocolConfig` type. TS is loaded but not used.
- **Inline styles instead of design-token classes** — the CSS file has `.card`, `.btn`, `.stamp`, `.bg-paper`, but the renderer ignores them.
- **Catalog UX regressed from `atlas.jsx`** — no category filter, no flow thumbnails, no part-tag corner labels.
- **Stale dependencies** — `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` installed but unused.
- **Two `globals.css`** — the create-next-app boilerplate (Tailwind + Geist + dark-mode) still exists alongside the design-system one.

When working in `web/`, prefer fixes that move toward a single source of truth rather than band-aids on the port.

---

## 9. Tech stack

| Layer                       | Stack                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Design-system prototype     | Plain HTML + Babel-in-browser + React 18 UMD                                           |
| Deployable frontend         | Next.js 16, React 19, TypeScript                                                       |
| Fonts (Google substitution) | Caveat (display) · Architects Daughter (hand) · JetBrains Mono · Special Elite (stamp) |
| Enricher                    | Plain JS, runs in browser AND under Node via a `globalThis.window` shim                |
| Hosting (planned)           | Vercel / GitHub Pages, static export when possible                                     |
| Future ingestion            | Node + Fastify/Hono, PostgreSQL or SQLite, Typesense/Meilisearch (not built yet)       |

**Important re: Next.js 16** — [web/AGENTS.md](web/AGENTS.md) warns the API has breaking changes vs prior versions (e.g. `params` is now `Promise<...>`). Read `node_modules/next/dist/docs/` before writing route code; don't rely on training-data assumptions.

---

## 10. Roadmap

- **Phase 1 (now)** — internal foundation. Stabilise visual language, enricher, schema. 5–10 real protocol pages, catalog, schemas.
- **Phase 2** — public Atlas. Hosted, searchable, OG-image generation, responsive.
- **Phase 3** — community submissions. User-submitted GitHub repos → README parsed → preview → moderation → published.

Long-term: protocol relationship graphs, compatibility visualisation, MCP-stack suggestions, ecosystem analytics. But growth must preserve simplicity, calm visual density, engineering-first identity. **No noisy AI-SaaS feature creep.**

Monetisation is intentionally distant. The project should become genuinely useful before trying to become a business.

---

## 11. Working principles for AI assistants

- **The diagram is the page.** Most readers come for the flow. Budget thinking accordingly.
- **Annotations carry meaning.** Each italic-blue question should answer _why an agent would call this_. Each red stamp marks a real conditional branch the agent actually takes.
- **One source of truth.** When adding a primitive or a token, add it once. Don't fork.
- **Don't widen the schema casually.** If new content "doesn't fit," it doesn't belong on the page.
- **Don't surface enrichment metadata.** The hand-crafted illusion is the invariant.
- **Test the visual result.** Type-check + lint verify code correctness, not feature correctness. For renderer changes, open the page in a browser and confirm the layout still reads correctly.
- **Don't reach for SaaS instincts.** No animated hero, no scroll-jacking, no marketing voice, no emoji, no rounded cards, no neon. If you catch yourself adding them, step back.
- **Push back on requests that would break the visual identity.** The constraints are the product.
