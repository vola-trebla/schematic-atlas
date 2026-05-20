# `templates/` — the canonical protocol-page renderer

**One template. One schema. Many pages.** This is how every protocol enters
the Schematic Atlas.

## Files

| File                 | What                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `protocol-page.html` | The scaffold. Copy for every new entry. Edit the rich `CONFIG`.                                      |
| `protocol-page.jsx`  | The locked renderer. Reads the rich Atlas config.                                                    |
| `enrich.js`          | The auto-enricher. Pure function `FlatInput → AtlasConfig`. Run as a build step, not at render time. |
| `enrich-tool.html`   | Interactive web tool — paste a flat JSON input, see the rich config, copy it.                        |
| `enrich-cli.mjs`     | Node CLI: `node enrich-cli.mjs flat.json > rich.json` (or `--readme README.md`).                     |
| `examples/`          | Worked examples.                                                                                     |

## The schema

```js
const CONFIG = {
  // ── identity ─────────────────────────────────────
  name:       string,        // REQUIRED. Mono, filename-style. "playwright-trace-decoder"
  partTag:    string?,       // "TRACE" — auto-stamped as a square tag in the top-right
  purpose:    string,        // REQUIRED. ONE sentence. The whole point of the protocol.
  highlight:  string?,       // Substring of `purpose` to draw the highlighter behind.
  repo:       string?,       // GitHub / source URL. Renders inline with the GitHub icon.
  package:    string?,       // npm package name. Renders next to repo.
  license:    string?,       // "MIT" / "Apache-2.0" / etc. Renders as a small framed badge.

  // ── key stats (0–4 items) ───────────────────────
  // Rendered as a row of dimension lines.
  stats: [
    [value, label],          // [["16", "tools"], ["~90%", "fewer tokens"], …]
  ],

  // ── flow (the centerpiece) ───────────────────────
  // STRONGLY PREFERRED. If the protocol has no clear data flow, omit `flow`
  // entirely and the section is skipped. Don't fake one.
  flow: {
    input: {                 // optional input box at the top of the diagram
      label: string,         // "trace.zip", "scenario.yaml", "search(pattern, path)"
      sub:   string?,        // "← from CI"
    },
    steps: [
      {
        n:        number|string,   // step number — drives the callout circle
        name:     string,           // mono tool/step name
        args:     string?,          // "trace_path, lookback_ms?" — shown as (signature)
        body:     string?,          // one-paragraph description
        question: string?,          // italic-blue "what?" gutter annotation
        branch: {                   // optional conditional side-branch
          n: number|string,
          name: string,
          condition: string,        // becomes the red stamp ("if flaky")
          body: string?,
        }?,
      },
      …
    ],
  },

  // ── components / tools ──────────────────────────
  // Provide EITHER `groups` (2-col grid of grouped cards) OR `tools`
  // (a flat 2-col list inside a single card). Not both.
  groups: [
    {
      key:   string,         // short slug ("inspection") — drives the [G.XXX] tag
      title: string,         // "Inspection"
      icon:  string?,        // icon name from ICON_PATHS — eye / search / bug / clock / …
      blurb: string?,        // one-sentence introduction to the group
      items: [
        { name: string, sub: string? },
      ],
    },
  ],
  tools: [{ name: string, sub: string? }],   // alternative

  // ── install / use ───────────────────────────────
  install:   { [packageManager: string]: string },   // { npm: "npm i ...", cargo: "..." }
  run:       string?,                                // command to run after install
  worksWith: string[]?,                              // ["node ≥ 18", "Claude Desktop", …]
};
```

## Authoring rules

- **One sentence in `purpose`.** Two sentences means two pages.
- **Highlight one word at most.** Usually the key noun the protocol acts on (`trace.zip`, `MCP tools`, `single composite`).
- **Mono everywhere for code-like strings** — tool names, args, packages, transports.
- **Hand for prose** — body, captions, blurbs. Italic-hand-blue for question annotations.
- **Don't invent new sections.** The five sections (identity / stats / flow / components / install) are the whole page. If something doesn't fit, it doesn't belong.

## Available icons (`assets/schematic.jsx`)

`github · eye · play · bug · tool · terminal · search · link · stream · pause · copy · arrow_right · plus · filter · clock`

Add new ones by appending to `ICON_PATHS` in `assets/schematic.jsx`. ViewBox
`0 0 24 24`, stroke `currentColor`, 1.6 px default weight.

## Adding the entry to the Atlas

After creating the page file, append an entry to `ATLAS` in
`catalog/atlas.jsx`:

```js
{
  name: "your-tool",
  partTag: "ESEA",
  purpose: "One sentence — same as on the page.",
  href: "../templates/examples/your-tool.html",
  category: "debugging",            // freeform string; adds itself to the filter chips
  stats: [["XX", "label"], ...],    // 1–2 items, shown on the catalog card
  repo: "owner/repo",
  license: "MIT",
  nodes: ["input", "yours", "output"],   // 3 short labels for the thumbnail schematic
},
```

That's the contract.

---

## The hybrid workflow — enrich, then hand-tweak the soul

The enricher is a **build-time tool**, not a runtime hook. It produces a
90%-complete rich config from a flat input; you hand-author the last 10%
that gives the page its soul. The renderer doesn't know or care which path
the config came from — the reader can't tell, and we intentionally hide it.

```
┌─ flat input (or README) ──┐    ┌─ enricher ───────────┐    ┌─ rich JSON ─┐
│  9 tools, 1 paragraph,    │ →  │  buckets + icons +   │ →  │  90% done   │
│  some warnings            │    │  flow + stats        │    │             │
└───────────────────────────┘    └──────────────────────┘    └─────────────┘
                                                                    ↓
        ┌─ finalised CONFIG ──────────────────────────┐    ┌─ hand-author ─┐
        │  the page reader sees a hand-drawn page     │ ←  │  the soul     │
        └─────────────────────────────────────────────┘    └───────────────┘
```

### Tools

- **Interactive**: open `enrich-tool.html` in your browser. Paste flat JSON in the left pane, copy rich JSON from the right.
- **CLI**: `node enrich-cli.mjs flat-input.json > rich-config.json`
- **CLI from a README**: `node enrich-cli.mjs --readme path/to/README.md > rich-config.json` — best-effort markdown extraction first, then enrichment.

### What "hand-author the soul" means

After pasting the enricher's output into a fresh `protocol-page.html` CONFIG
block, walk through it and rewrite:

- **`flow.steps[].question`** — the italic-blue annotations in the gutter. Defaults are generic. Sharpen them to the actual question an agent would ask.
- **`flow.steps[].branch`** — add a real conditional branch with a custom red stamp condition where the agent genuinely has a choice (e.g. `if HEAD is clean`, `if ARIA empty`).
- **`groups[].blurb`** — the enricher writes a generic per-category blurb. Rewrite to say something specific to _this_ protocol.
- **`highlight`** — auto-detect picks a noun-like token; override if it picked wrong.
- **`example.captions`** — the most valuable prose on the page. Always written by hand.

### The locked invariant: hand-crafted illusion

The catalog **does not** display any "auto-enriched" badge on entry cards.
The `enriched: true` flag is kept in the catalog data layer for internal
analytics only — it never reaches the rendered DOM. From the reader's
perspective, every page is hand-drawn. This is by design.

---

## The `FlatProtocolInput` schema

```js
const FLAT_INPUT = {
  // ── identity ──
  name:       string,                // REQUIRED.
  purpose:    string,                // REQUIRED. First sentence wins.
  partTag?:   string,
  highlight?: string,                // optional — otherwise auto-detected
  repo?:      string,
  package?:   string,
  license?:   string,

  // ── tools (FLAT — no grouping needed) ──
  tools: [
    { name: string, sub?: string },
  ],

  // ── optional richer fields ──
  warnings?:  string[],              // become red-stamped Notes cards
  example?: {                        // becomes a Worked-example section
    lang?: string, code: string, captions?: string[],
  },
  install?:    object,
  run?:        string,
  worksWith?:  string[],

  // ── escape hatches ──
  inputLabel?:  string,              // override the synthesized flow input
  flow?:        Flow,                // pass a hand-authored flow → no synthesis
  stats?:       Array,               // override stats inference
};
```

### What `enrich(flat)` does

| Step                      | Output                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Auto-categorise tools** | Keyword table maps `get_*`, `scan_*`, `compare_*`, … → 14 categories with icons + blurbs. Multi-tool buckets become groups; singletons coalesce into "Misc". |
| **Synthesise flow**       | Picks one real tool per slot (ingest / process / emit) and draws a 3-step diagram. Refuses to fake one if it can't find ≥ 2 sensible candidates.             |
| **Infer stats**           | `[N tools] · [M groups] · [K integrations] · [LICENSE]`                                                                                                      |
| **Auto-detect highlight** | Picks the most noun-like word in the purpose (backticked, filename, ALL-CAPS, CamelCase).                                                                    |
| **Apply motifs**          | `warnings` → red-stamped Notes section. `example` → Worked-example card + leader captions.                                                                   |

### Guardrails

- **Never invents tool names or descriptions.** Only re-arranges given material.
- **If categorisation produces 1-tool groups for everything**, falls back to a flat tool list. No fake density.
- **If the flow synthesiser can't fill ≥ 2 slots**, the whole section is skipped. No fabricated diagrams.

### Bonus: `parseReadme(markdown)`

`enrich.js` also exports `parseReadme(md)` — a best-effort markdown
extractor for the FlatProtocolInput shape. Pulls H1 → name, first paragraph
→ purpose, bullets under "Tools" / "API" headings → tools, `> Warning:`
blockquotes → warnings, fenced install block → install. Use as a starting
point, then hand-review before enriching.

### Adding the entry to the Atlas

Same as any other page. Optionally set `enriched: true` for internal
analytics — it does NOT render anywhere:

```js
{ name: "your-tool", partTag: "ESEA", purpose: "…", href: "…",
  category: "…", enriched: true, nodes: ["…","…","…"], …}
```
