# web/

Next.js 16 + React 19 app — the deployable frontend for Schematic Atlas.

See the [root README](../README.md) for project overview and design principles.

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
```

## Checks

```bash
npx eslint src/
npx tsc --noEmit
```

Pre-commit hook runs both automatically via Husky + lint-staged (configured at repo root).

## Structure

```
src/
  app/
    layout.tsx              root layout — fonts, WobbleDefs
    page.tsx                catalog home
    [protocol]/page.tsx     protocol page + generateMetadata
  design-system/
    schematic.tsx           motif library (Server Component)
    schematic-client.tsx    SButton (client — press state)
    protocol-renderer.tsx   locked renderer (Server Component)
    install-section.client.tsx  tab state for install commands
    catalog.client.tsx      catalog UI components
    globals.css             design tokens
  data/
    protocols.ts            catalog entries (Record<string, ProtocolConfig>)
  types/
    protocol.ts             ProtocolConfig and all sub-types
```
