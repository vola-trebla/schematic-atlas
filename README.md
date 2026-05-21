# Schematic Atlas

A visual encyclopedia for MCP protocols and AI-tooling systems. One schematic engineering-notebook page per protocol.

**Live:** [schematic-atlas-web.vercel.app](https://schematic-atlas-web.vercel.app)

The thesis: **visual cognition compression.** A developer should understand what an MCP server does in under 30 seconds by scanning a diagram — not by reading a README wall.

![CI](https://github.com/vola-trebla/schematic-atlas/actions/workflows/ci.yml/badge.svg)

---

## What it is

Each protocol gets a single page: a hand-drawn schematic with a data-flow diagram, annotated components, key stats, and install instructions. No marketing copy, no deep navigation trees, no AI-SaaS aesthetics.

The atlas is the product. Not isolated landing pages — a unified visual catalog for understanding AI tooling systems.

---

## Stack

| Layer         | Tech                                                          |
| ------------- | ------------------------------------------------------------- |
| Frontend      | Next.js 16, React 19, TypeScript                              |
| Design system | Custom schematic motif library (`web/src/design-system/`)     |
| Data          | Per-protocol TS files — `web/src/data/protocols/<slug>.ts`    |
| Validation    | Zod schema — runtime + build-time (`ProtocolConfigSchema`)    |
| Fonts         | Caveat · Architects Daughter · JetBrains Mono · Special Elite |
| Linting       | ESLint + Prettier + Husky pre-commit                          |
| CI            | GitHub Actions (lint + typecheck on every PR)                 |
| Hosting       | Vercel — SSG, per-PR preview deploys                          |

---

## Repo layout

```
design-system/   ← design prototype (source of visual language)
  assets/schematic.jsx       motif library — DimLine, Callout, Stamp, Icon, …
  catalog/atlas.jsx          catalog grid (reference implementation)
  templates/                 protocol-page renderer + enricher CLI
  colors_and_type.css        design tokens

web/                         ← Next.js app (deployment target)
  src/
    app/                     routes: / (catalog) · /[protocol] (pages)
    app/[protocol]/
      opengraph-image.tsx    per-protocol OG image (1200×630, SSG)
    design-system/           TSX motif library + renderer
    data/protocols/          per-protocol data files + index registry
    types/protocol.schema.ts Zod schema (single source of truth)
    types/protocol.ts        re-exports from schema
```

---

## Running locally

```bash
npm install      # from repo root (npm workspaces)
npm run dev      # starts web/ dev server at localhost:3000
```

---

## Adding a protocol

1. Create `web/src/data/protocols/<slug>.ts` with a `ProtocolConfig` default export.
2. Register it in `web/src/data/protocols/index.ts`.
3. The renderer, catalog, and OG image pick it up automatically.

Required fields: `name`, `purpose`, `category`, `nodes` (3-label thumbnail). The registry validates the schema at startup via Zod — a malformed entry throws before reaching the renderer.

For a full config (flow diagram, components, install), see the schema in `web/src/types/protocol.schema.ts` and examples in `design-system/templates/examples/`.

---

## Design principles

- Black ink on warm sketchbook paper. No gradients, no rounded cards, no drop-shadows.
- Mono for code strings, handwriting for prose, italic blue for annotations.
- Red stamps for conditional branches only — never as decoration.
- One highlight per page. One sentence in `purpose`.
- Imperatives and stated facts. No marketing voice, no exclamation marks.

---

## Roadmap

- **Phase 1** ✅ — internal foundation. Stable visual language, renderer, schema, 5 protocol pages.
- **Phase 2** 🚧 — public atlas. Hosted on Vercel, responsive, OG images, search (in progress).
- **Phase 3** — community submissions. GitHub repo → README parsed → preview → moderation → published.
