# REVIEW.md — first pass on `web/`

A punch-list of issues, antipatterns, and improvement opportunities in the Next.js port (`web/src/**`). Ordered by impact, not by location. Code in `Schematic Design System/` is treated as the design source-of-truth; `web/` is the port that has drifted.

Tags: **[arch]** structural · **[dry]** duplication · **[type]** types · **[a11y]** accessibility · **[ux]** user-facing regression · **[hygiene]** cleanup

---

## A. Architecture & DRY

### A1. Design system is duplicated, not imported **[arch][dry]** — _headline issue_

`web/src/design-system/schematic.tsx` is a TSX copy of `Schematic Design System/assets/schematic.jsx`. `web/src/design-system/protocol-renderer.tsx` is a TSX copy of `Schematic Design System/templates/protocol-page.jsx`. `web/src/design-system/globals.css` duplicates `Schematic Design System/colors_and_type.css` byte-for-byte.

Three places where any visual change must be made by hand. When the design source evolves, the port doesn't. Already drifted (see A4, B6).

**Options**:

1. Make `Schematic Design System/` the single source. Either symlink the TSX/CSS into `web/`, or publish it as a tiny internal package (e.g. `@schematic/atlas-design`), or generate the TSX from the JSX with a small build script.
2. Flip it: declare `web/src/design-system/` canonical, deprecate `Schematic Design System/assets/schematic.jsx` to "prototype only" and stop touching it.

Recommend option 1 — keep the prototype playground in `Schematic Design System/` (it's where new motifs get explored fast with Babel-in-browser), but consume it from `web/` rather than re-implement.

### A2. The renderer has internal duplication too **[dry]**

In [Schematic Design System/templates/protocol-page.jsx](Schematic Design System/templates/protocol-page.jsx):

- `FlowSection` (lines ~241-282) and `FlowSectionWithFig` (lines ~558-596) are the same component, copy-pasted with a different `fig` source. Same for `ComponentsSection` vs `ComponentsSectionWithFig` (~324-359 vs ~597-628). The "With Fig" variants exist purely to inject the auto-numbered fig title — should just be a prop.

The web/ port partially fixed this (`FlowSection` accepts `fig` directly) but inherited the historical mess. Worth a small commit to delete the duplicates in the JSX source too.

### A3. Catalog UX regressed from `atlas.jsx` → `web/src/app/page.tsx` **[ux][arch]**

The original [catalog/atlas.jsx](Schematic Design System/catalog/atlas.jsx) has:

- `AtlasHeader` with full logo lockup + tagline
- `Intro` with a quoted explanation + `DimLine` "entries · v0.1"
- `CategoryFilter` chip row with counts per category
- `EntryThumbnail` — a compact 3-node SVG schematic of the protocol's data flow on each card
- `EntryCard` with corner part-tag label, category in the header, dim-line stats row, "open →" affordance
- `AtlasFooter`

The web/ port ([web/src/app/page.tsx](web/src/app/page.tsx)) ships a simplified grid: a single h1, plain `SchematicCard`s with a stat, and the first 3 tool names as raw tags. The category filter, flow thumbnail, part-tag corner label, and dim-line stats are all missing. This is a visible product regression.

**Action**: port `AtlasHeader`, `Intro`, `CategoryFilter`, `EntryThumbnail`, `EntryCard`, `AtlasFooter` from `atlas.jsx` to TSX components, replace the home page body with them, drive from `PROTOCOLS` (which needs a `category` and `nodes` field — see C1).

### A4. Wobble filter applied unconditionally on every `SchematicCard` **[ux][regression]**

[web/src/design-system/schematic.tsx:366](web/src/design-system/schematic.tsx#L366) sets `filter: "url(#wobble-subtle)"` on every card's inner wrapper. The original ([assets/schematic.jsx:382-422](Schematic Design System/assets/schematic.jsx#L382-L422)) doesn't apply any filter; wobble is opt-in via a `.wobble` class. This globally adds a noise-displacement filter to every framed surface — and to all SVG content rendered inside cards (callouts, stamps, dim lines). Visible drift from the design spec ("subtle highlights, slightly imperfect" ≠ "everything wobbles").

**Action**: remove the unconditional `filter` from `SchematicCard`'s inner div. Keep `.wobble` available for opt-in.

### A5. `SchematicCard` background drift **[ux]**

Original `SchematicCard` has `background: "transparent"` so cards live against the paper texture. Web/ port uses `background: "var(--paper-bright)"`, making every card a brighter rectangle than the page — over-using `paper-bright` (which was reserved for "high contrast surface" per the token comments). Combined with A4, cards now read as separate surfaces, not as drawn boxes on the same sheet.

### A6. `'use client'` over-applied **[arch][perf]**

Both `web/src/design-system/schematic.tsx` and `web/src/design-system/protocol-renderer.tsx` are marked `"use client"`. The only client-state needs are `InstallSection`'s tab state and `SButton`'s pressed state. Everything else can be a Server Component.

**Action**: split `InstallSection` (and `SButton`) into their own files marked `"use client"`; leave the rest as RSC. This trims the client bundle and lets the protocol page render on the server.

### A7. `app/globals.css` is create-next-app boilerplate, fighting the design system **[hygiene]**

[web/src/app/globals.css](web/src/app/globals.css) imports Tailwind v4, defines `--background: #ffffff` / `--foreground: #171717`, has a dark-mode media query, and sets `font-family: Arial, Helvetica, sans-serif`. None of this is used — but it's also not removed. The real tokens live in `web/src/design-system/globals.css`, which `layout.tsx` imports. The boilerplate file is dead code that could confuse future work.

**Action**: delete `web/src/app/globals.css` entirely (and remove the unused Tailwind dependency — see A8). Or, if Tailwind is desired down the line, scope it explicitly and reconcile with the design tokens.

### A8. Dependencies installed but never imported **[hygiene]**

In [web/package.json](web/package.json):

- `framer-motion` — not used. Vision doc allows it "minimal/subtle only"; the project explicitly favors pen-stroke draw-ins via CSS keyframes already.
- `lucide-react@1.16.0` — not used (and that version is from 2020; the current major is v0.4xx-named differently). The project has its own `ICON_PATHS` and hand-drawn icons.
- `clsx`, `tailwind-merge` — not used.
- `tailwindcss`, `@tailwindcss/postcss` — only referenced by the boilerplate globals.css.

**Action**: drop these unless a concrete use case appears. Each adds bundle weight and cognitive load. Lock the stack to React, Next.js, TypeScript only until a real need shows up.

---

## B. Type safety

### B1. Everything is `any` **[type]** — _foundational issue_

`web/src/design-system/protocol-renderer.tsx` uses `any` for every prop (`config: any`, `step: any`, `group: any`, `note: any`, `t: any`, `c: any`). `web/src/design-system/schematic.tsx` does the same. `web/src/data/protocols.ts` declares `PROTOCOLS: Record<string, any>`. The CONFIG schema is documented in JSX comments but nowhere expressed as a TypeScript type.

Result: TypeScript is loaded but not used. Typos in config silently render broken pages; refactoring is unsafe; IDE autocomplete is useless.

**Action**: introduce a `types.ts` (or co-locate with `protocols.ts`) defining:

```ts
type Tool = { name: string; sub?: string };
type Group = { key: string; title: string; icon?: IconName; blurb?: string; items: Tool[] };
type FlowBranch = { n: number | string; name: string; condition: string; body?: string };
type FlowStep = {
  n: number | string;
  name: string;
  args?: string;
  body?: string;
  question?: string;
  branch?: FlowBranch;
};
type Flow = { input?: { label: string; sub?: string }; steps: FlowStep[]; inferred?: boolean };
type Note = { n?: number | string; condition?: string; body: string };
type Example = { lang?: string; code: string; captions?: string[] };
type ProtocolConfig = {
  name: string;
  partTag?: string;
  purpose: string;
  highlight?: string;
  repo?: string;
  package?: string;
  license?: string;
  stats?: [string, string?][];
  flow?: Flow;
  groups?: Group[];
  tools?: Tool[];
  notes?: Note[];
  example?: Example;
  install?: Record<string, string>;
  run?: string;
  worksWith?: string[];
  category?: string; // for the catalog (see A3)
  nodes?: [string, string, string]; // for the catalog thumbnail (see A3)
  enriched?: boolean; // internal — never rendered
};
type IconName = keyof typeof ICON_PATHS;
```

…then re-type `protocols.ts`, the renderer, and the motif library. This is also a chance to invariant-check `groups XOR tools` at the type level.

### B2. Catalog data and renderer treat `partTag` inconsistently **[type][ux]**

`partTag` is optional in the schema, but the home page renders `[{p.partTag}]` directly inside the card without a null check. Currently `context7` has no `partTag` in [web/src/data/protocols.ts](web/src/data/protocols.ts#L2) — it would render `[undefined]` if surfaced. The web/ home page sidesteps this by not rendering the part-tag at all (see A3) but once A3 is fixed, this needs a guard.

### B3. `SchematicCard` has dead props **[type]**

`web/src/app/page.tsx` passes `title={p.name}` to `SchematicCard`, but `SchematicCard` doesn't render `title`. Dead prop. Same for `onMouseEnter`/`onMouseLeave` (the home page binds them directly on `<Link>`, but the original `atlas.jsx` does it on the card body). With `any` props, TS doesn't complain.

---

## C. Catalog data layer

### C1. Catalog data drifts from the original `ATLAS` **[arch][ux]**

[Schematic Design System/catalog/atlas.jsx](Schematic Design System/catalog/atlas.jsx) defines an `ATLAS` array with each entry carrying: `name`, `partTag`, `purpose`, `href`, **`category`**, `stats`, `repo`, `license`, **`nodes`** (3-node thumbnail labels), optional `enriched`.

[web/src/data/protocols.ts](web/src/data/protocols.ts) is a `Record<string, ProtocolConfig>` keyed by name and **does not carry `category` or `nodes`**. So even if A3 is implemented, the catalog has no category for filtering and no thumbnail labels.

**Action**: either (a) extend `ProtocolConfig` with `category` and `nodes` and have the home page consume the same object the renderer consumes, or (b) split into two layers — a `ProtocolConfig` for the page, plus a `CatalogEntry` derived from it (or stored separately). I'd start with (a) and let `nodes` default to "input → name → output" when missing.

### C2. `sqlite-mcp` and `context7` are partial fictions **[data]**

Skim shows that some entries in `protocols.ts` are placeholder/synthesized rather than real catalog content (e.g. `sqlite-mcp` has only 2 tools, no repo, no flow; `context7` has 5 invented tool names that don't match the real Context7 API in [context7_v2_readme.md](context7_v2_readme.md) — the real tools are `resolve-library-id`, `query-docs`, `ctx7 library`, `ctx7 docs`). This is fine for prototyping but means the catalog grid is showing test fixtures, not curated entries.

**Action**: decide whether to keep these as fixtures (and label them as such internally), or replace with real protocol data. Either way, document the policy — and never let "auto-enriched" leak to the DOM (see CLAUDE.md §7).

### C3. `parseReadme` shipped `tools: []` for context7 **[pipeline]**

The first run produced [context7_flat.json](context7_flat.json) with fabricated tool names like `lookup_library`, `query_documentation`, `fetch_live_source` that don't match the actual README. This isn't a `web/` bug — it's a hint that the enricher's `parseReadme` should be more conservative when the README doesn't have a clear `## Tools` / `## API` section, instead of silently producing an empty list (or a hand-edited synthesized list). Worth a guardrail: if `tools.length === 0` after parse, refuse to enrich and tell the human to fill in the tools by hand.

---

## D. Renderer code quality

### D1. Inline styles dominate; design-system classes ignored **[dry][hygiene]**

`web/src/design-system/protocol-renderer.tsx` is ~80% inline styles. The CSS already exposes `.card`, `.btn`, `.btn-primary`, `.tag`, `.stamp`, `.label`, `.annot`, `.bg-paper`, `.bg-grid`, `.bg-dot`, `.elev-hatch`, `.hl`, plus all tokens (`var(--ink)`, `var(--sp-5)`, `var(--font-mono)`, etc.). The renderer mostly uses tokens via `style={{...}}` and ignores the utility classes.

This makes the renderer hard to read (every section is 30-line inline-style chains) and means token changes that propagate through CSS classes won't propagate through the renderer.

**Action**: extract repeated style blocks into either:

- CSS classes (preferred where the design system already has one — e.g. `.card` for `SchematicCard` body, `.label` for mono uppercase labels, `.stamp` for the red stamp, `.annot` for italic-blue annotations)
- styled `const` style objects shared across components (where a class doesn't quite fit and the inline shape is the right primitive)
- CSS Modules for component-specific layouts

The goal: each component reads as composition + content, not as a wall of style props.

### D2. Hardcoded coordinates and offsets **[hygiene]**

`FlowStep` (`web/src/design-system/protocol-renderer.tsx:140-209`) uses a `gridTemplateColumns: "44px 1fr 180px 280px"` grid with the branch arrow drawn at `position: "absolute", left: -44, top: 32` — a brittle relationship between the grid columns and the SVG. If column widths change, the leader line floats away.

**Action**: place the branch leader in its own grid column or pass the offset as a derived CSS variable. Or convert to a flex column where the branch sits to the right of step n at the same baseline.

### D3. `branch.n: "!"` rendered as a callout letter **[ux/type]**

[web/src/data/protocols.ts:127](web/src/data/protocols.ts#L127) uses `n: "!"` for the exposure-warning branch, expecting `Callout` to render `!` inside the circle. `Callout` only sizes its font at `size * 0.5` (12px when `size=24`) — `!` renders fine, but the schema doesn't say "branch.n can be a glyph". Either widen the type intentionally (`n: number | string | "!"`) and document it as a deliberate stamping pattern, or use a dedicated `<Stamp>`/icon for warning branches. Right now it's an undocumented hack.

### D4. `Icon arrow_right` rotated 180° for "back" **[a11y/hygiene]**

`ProtocolFooter` (line 484 in protocol-renderer.tsx) renders `<Icon name="arrow_right" style={{ transform: "rotate(180deg)" }} />` for "back to atlas". Either:

- Add an explicit `arrow_left` to `ICON_PATHS` (preferred — semantic icons read better and don't depend on CSS),
- Or, if a transform is the policy, ship `scaleX(-1)` to also flip the arrowhead correctly (a 180° rotation also flips vertically, which is fine for a horizontal arrow but not a habit to build on).

The original `protocol-page.jsx` uses `scaleX(-1)`; the web port uses `rotate(180deg)`. Drift again.

### D5. Mixed quote styles, mixed `React.Fragment`/JSX shorthand, mixed `React.useState`/imported **[hygiene]**

`protocol-renderer.tsx` and `schematic.tsx` mix single and double quotes, use both `React.Fragment` and `<></>`, and call `React.useState` directly rather than importing `useState`. None of these affect behavior; they read as code that wasn't proof-read. Worth a Prettier + ESLint sweep once the structural fixes land.

### D6. Unused imports **[hygiene]**

`protocol-renderer.tsx` imports `Annotation` from `./schematic` (line 16) but never uses it. Lint should be flagging that — possibly suppressed by the `// @ts-ignore`-style `: any` typing or by the eslint config (which extends `eslint-config-next` defaults; worth verifying `no-unused-vars` is on).

### D7. `AtlasStrip` and footer use `<a href="/">` for in-app navigation **[perf/ux]**

`ProtocolRenderer` is a server component (could be) that navigates back to home via plain anchor tags. Use `next/link` for client-side transitions — the home page does this correctly for outbound links to `[protocol]` pages, but the renderer's "← catalog" / "back to atlas" links full-page-load.

### D8. No SEO metadata per protocol page **[ux/seo]**

`web/src/app/[protocol]/page.tsx` doesn't export `generateMetadata`. Every page in the atlas inherits the same `<title>Schematic Atlas</title>` from `layout.tsx`. For a published encyclopedia, each protocol page should set its own title + description (the `purpose` is right there).

### D9. `ATLAS_LINK = "/"` hardcoded **[arch]**

The strip and footer hardcode `ATLAS_LINK = "/"`. If the atlas is ever mounted under `/atlas` (very plausible for the public deployment), the strip breaks. Derive from `usePathname()` or pass as a prop.

---

## E. CSS / design tokens

### E1. Two CSS files holding the same tokens **[dry]**

`Schematic Design System/colors_and_type.css` and `web/src/design-system/globals.css` are byte-identical token files. When a token is tweaked, both need updating. See A1 for the structural fix.

### E2. Token comments still describe HTML-only context **[doc]**

The token file comments are accurate for the original HTML/JSX prototype. Inside the TSX port, comments like "use sparingly — corrections, warnings, stamps" are still right but worth doubling-down: add a short "Token usage in TSX" note at the top of `web/src/design-system/globals.css` explaining the preferred path (CSS vars in tokens, classes in renderer, no raw hex in TSX).

---

## F. Accessibility & semantics

### F1. Icon `<svg>` has `aria-hidden="true"` but link wrappers lack accessible names **[a11y]**

`AtlasStrip`'s logo `<a>` has only the logo SVG (decorative) and the wordmark text — fine. But the GitHub link in `TitleBlock` renders the github icon + repo path; screenreaders will read "github [repo]", which is acceptable. The "back to atlas" link has icon + text — also fine. But the home page card link wraps the whole card with no `aria-label`; ensure the card's heading is the first focusable text inside. Mostly OK, worth a manual screenreader pass.

### F2. Color-only signaling for branches **[a11y]**

Conditional branches are signalled by red stroke + red callout + red rubber-stamp. Colorblind users get the stamp text ("if flaky") but no shape difference. Adding a small icon or a different border treatment (dashed in addition to red) would make the branch readable without color.

### F3. `<h1>` / `<h2>` hierarchy is broken in the renderer **[a11y/seo]**

`ProtocolRenderer`'s `TitleBlock` renders `<h1>` for the protocol name. `FigHeader` renders `<h2>` for "The flow." — correct. But the home page also renders `<h1>` ("Schematic Atlas") and then individual cards have no headings, just bare spans. When merged into the larger app this works; just confirm with a quick axe-core pass.

---

## G. To think about — open questions

### G1. Part-tags should probably become semantic **[ux]** — _the user-raised question_

Right now part-tags are generic series codes: `[T.01]`, `[T.02]`, `[T.03]`, `[T.04]`, `[T.05]`, `[S.02]`, `[P.01]`. They look stylish and schematic-like, but in the catalog grid they don't help quickly identify which MCP is which — a scanner has to read the name next to the tag, defeating the purpose of having a tag.

Options to explore (pick one consistently):

1. **Semantic short codes**: `[CTX7]`, `[TRACE]`, `[GREP]`, `[ORCH]`, `[BENCH]`, `[SECRET]` — abbreviations of the protocol's identity. Pro: immediately recognisable. Con: collisions possible as the atlas grows; needs a naming policy.
2. **Namespaced codes**: `[MCP:TRACE]`, `[MCP:GREP]`, `[MCP:ORCH]` — explicit that it's an MCP server. Pro: future-proof when non-MCP entries enter (CLI tools, agent infra). Con: longer, eats horizontal space.
3. **Auto-derived from repo/package name**: `[context7]`, `[mcp-grep]`, `[playwright-trace-decoder]` — readable, no naming decision needed. Con: long names eat horizontal space (`[playwright-trace-decoder]` is ~26 chars vs `[T.04]`'s 6 chars); the visual rhythm of small framed labels weakens.
4. **Keep the generic series codes** but treat them as call-numbers (like Dewey decimal) — `[T.01]` for "tools, entry 1", `[S.02]` for "security, entry 2". Pro: stays compact, consistent with the engineering-encyclopedia metaphor. Con: still not scannable without a legend.
5. **Hybrid**: small semantic chip in addition to the series code: `[T.04][TRACE]` or just `[TRACE]` in the corner with `T.04` reserved for an internal call-number elsewhere.

Recommend a 3-step decision:

1. Test option (1) or (3) on the 5 existing entries — render the catalog grid both ways and compare scannability.
2. Once the language is chosen, encode it in the schema (e.g. add a `code` field separate from `partTag`, or repurpose `partTag` and migrate existing entries).
3. Make the enricher derive a default code from the protocol name (slug → uppercase short form) so new entries get one automatically.

**This is the highest-value UX call to make before public launch** — the catalog page is the front door, and the tag is the most repeated visual element on it.

### G2. What happens when an MCP has no clear flow?

The enricher refuses to fabricate a flow if it can't find 2+ candidate tools, and the renderer gracefully omits the section. But for protocols where the value is _not_ a sequential flow (e.g. a search index, a database adapter), the page risks reading thin. Options:

- Allow alternate centerpieces — "topology" diagram (N nodes around a hub), "schema" diagram (table-like). Currently the schema is one centerpiece shape only.
- Or accept that some protocols don't deserve a full page — they belong as a one-line entry under a broader topic.

### G3. Naming: "Schematic Design System" vs "Schematic Atlas"

The top-level brand is "Schematic Atlas". The design system folder is "Schematic Design System". The catalog tagline calls it "a visual encyclopedia of MCP & AI tooling". Two product-words coexisting (Schematic + Atlas) is fine, but signpost it: the design system is the _internal_ design system used by the Atlas. Worth a `Schematic Design System/README.md` first-line tweak to remove ambiguity, or rename the folder to `design-system/` once the port stabilises.

### G4. Where does the enricher live in production?

Currently it's a Babel-in-browser script + a Node CLI. For the public Atlas (Phase 2), enrichment will need to run server-side as part of submission ingestion (Phase 3). The `globalThis.window` shim already lets `enrich.js` run under Node — but moving it into the `web/` build pipeline (or a separate small service) is a real decision waiting to happen. Probably out of scope for this review.

---

## H. Suggested order of attack

If you wanted to fix this in passes, I'd order them:

1. **Types first** (B1, C1). Adds a safety net before any refactor. A few hours of work; high leverage.
2. **De-duplicate the design system** (A1). Pick the strategy and execute. Largest yield in maintainability.
3. **Catalog UX parity** (A3, C1). Brings the home page back to spec.
4. **Visual regressions** (A4, A5, D4). Pure consistency wins.
5. **Server-component split** (A6) and the `'use client'` boundaries.
6. **Hygiene** (A7, A8, D5–D9). Easy, satisfying.
7. **Semantic tag decision** (G1). UX call, do once with intention.

This is a first pass. Subsequent reviews can drill into the enricher (`enrich.js`) and the `parseReadme` heuristics — both are pretty good but have edge cases worth tightening.
