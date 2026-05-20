# Schematic Atlas

A visual encyclopedia for MCP protocols and AI-tooling systems. One schematic engineering-notebook page per protocol.

The thesis: **visual cognition compression.** A developer should understand what an MCP server does in under 30 seconds by scanning a diagram — not by reading a README wall.

![CI](https://github.com/vola-trebla/schematic-atlas/actions/workflows/ci.yml/badge.svg)

---

## What it is

Each protocol gets a single page. That page is a hand-drawn schematic: a data-flow diagram, annotated components, key stats, and install instructions. No marketing copy, no deep navigation trees, no AI-SaaS aesthetics.

The atlas is the product. Not isolated landing pages — a unified visual catalog for understanding AI tooling systems.

---

## Stack

| Layer         | Tech                                                          |
| ------------- | ------------------------------------------------------------- |
| Frontend      | Next.js 16, React 19, TypeScript                              |
| Design system | Custom schematic motif library (`web/src/design-system/`)     |
| Fonts         | Caveat · Architects Daughter · JetBrains Mono · Special Elite |
| Linting       | ESLint + Prettier + Husky pre-commit                          |
| CI            | GitHub Actions (lint + typecheck on every PR)                 |

---

## Repo layout

```
design-system/   ← design prototype (source of visual language)
  assets/schematic.jsx       motif library — DimLine, Callout, Stamp, Icon, …
  catalog/atlas.jsx          catalog grid (reference implementation)
  templates/                 protocol-page renderer + enricher CLI
  colors_and_type.css        design tokens

web/                       ← Next.js app (deployment target)
  src/
    app/                     routes: / (catalog) + /[protocol] (pages)
    design-system/           TSX motif library + renderer
    data/protocols.ts        catalog data (Record<string, ProtocolConfig>)
    types/protocol.ts        full ProtocolConfig type system
```

---

## Running locally

```bash
# install dependencies
cd web && npm install

# start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding a protocol

1. Add an entry to `web/src/data/protocols.ts` following the `ProtocolConfig` schema.
2. Required fields: `name`, `purpose`, `category`, `nodes` (3-label thumbnail).
3. The renderer picks up the entry automatically — no other changes needed.

For a fuller config (flow diagram, components, install), see the locked schema in `web/src/types/protocol.ts` and the worked examples in `design-system/templates/examples/`.

---

## Design principles

- Black ink on warm sketchbook paper. No gradients, no rounded cards, no drop-shadows.
- Mono for code strings, handwriting for prose, italic blue for annotations.
- Red stamps for conditional branches only — never as decoration.
- One highlight per page. One sentence in `purpose`.
- Imperatives and stated facts. No marketing voice, no exclamation marks.

---

## Roadmap

- **Phase 1 (now)** — internal foundation. Stable visual language, renderer, schema. 5–10 real protocol pages.
- **Phase 2** — public Atlas. Hosted, searchable, OG images, responsive.
- **Phase 3** — community submissions. GitHub repo → README parsed → preview → published.
