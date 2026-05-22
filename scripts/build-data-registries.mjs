#!/usr/bin/env node
/**
 * scripts/build-data-registries.mjs
 * ────────────────────────────────────────────────────────────────────────
 * Reads `web/src/data/protocols/*.ts` and writes a single generated file:
 *
 *   web/src/data/registry.generated.ts
 *
 * containing both:
 *   - CATALOG[] — light card projection for the home page grid
 *   - REGISTRY  — slug → () => import() for per-protocol page loading
 *   - PROTOCOL_SLUGS — derived from REGISTRY keys
 *
 * Consumed by:
 *   - data/catalog.ts        — re-exports CATALOG
 *   - data/load-protocol.ts  — uses REGISTRY + PROTOCOL_SLUGS, adds Zod validation
 *
 * Slug = filename without extension. Each protocol file must export both
 *   `card` (named) and `default` (full ProtocolConfig) — enforced by the
 *   vitest registry gate at test time.
 *
 * Run manually:
 *   node scripts/build-data-registries.mjs
 *
 * Runs automatically via the `predev` + `prebuild` hooks in web/package.json.
 * ────────────────────────────────────────────────────────────────────────
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const PROTOCOLS_DIR = path.join(REPO_ROOT, "web", "src", "data", "protocols");
const OUTPUT = path.join(REPO_ROOT, "web", "src", "data", "registry.generated.ts");

// Discover protocol slugs from filenames. Excludes `__tests__/`, dotfiles,
// and anything starting with `_` (reserved for future internal helpers).
const slugs = fs
  .readdirSync(PROTOCOLS_DIR, { withFileTypes: true })
  .filter((d) => d.isFile())
  .map((d) => d.name)
  .filter((n) => n.endsWith(".ts") && !n.startsWith("_") && !n.startsWith("."))
  .map((n) => n.replace(/\.ts$/, ""))
  .sort();

if (slugs.length === 0) {
  console.error("No protocol files found in", PROTOCOLS_DIR);
  process.exit(1);
}

// kebab-case slug → camelCase identifier for `import { card as <ident> }`.
// JS-identifier-safe: stripping anything other than [a-zA-Z0-9_$].
const camelize = (slug) =>
  slug.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/[^a-zA-Z0-9_$]/g, "");

// Object keys: bare identifier when JS-safe, quoted string otherwise.
// (Slugs with hyphens — "brave-search", "mcp-grep" — get quoted.)
const isBareKey = (slug) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(slug);
const keyFor = (slug) => (isBareKey(slug) ? slug : `"${slug}"`);

const cardImports = slugs
  .map((slug) => `import { card as ${camelize(slug)} } from "./protocols/${slug}";`)
  .join("\n");

const catalogEntries = slugs
  .map((slug) => `  { slug: "${slug}", ...${camelize(slug)} },`)
  .join("\n");

const registryEntries = slugs
  .map((slug) => `  ${keyFor(slug)}: () => import("./protocols/${slug}"),`)
  .join("\n");

const content = `/**
 * GENERATED — do not edit by hand.
 * Regenerate with: \`node scripts/build-data-registries.mjs\`
 * (runs automatically via the predev + prebuild hooks in web/package.json)
 *
 * Source: web/src/data/protocols/*.ts (one file per slug)
 * Discovery: slug = filename without extension, sorted alphabetically.
 *
 * Consumers — do not import from this file directly:
 *   - web/src/data/catalog.ts re-exports CATALOG
 *   - web/src/data/load-protocol.ts wraps REGISTRY with Zod validation
 */
import type { CatalogEntry } from "../types/catalog";
import type { ProtocolConfig } from "../types/protocol";

${cardImports}

type ProtocolModule = { default: ProtocolConfig };

export const CATALOG: CatalogEntry[] = [
${catalogEntries}
];

export const REGISTRY: Record<string, () => Promise<ProtocolModule>> = {
${registryEntries}
};

export const PROTOCOL_SLUGS = Object.keys(REGISTRY);
`;

fs.writeFileSync(OUTPUT, content);
console.log(`Wrote ${path.relative(REPO_ROOT, OUTPUT)} with ${slugs.length} protocols.`);
