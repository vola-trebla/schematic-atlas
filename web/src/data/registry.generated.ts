/**
 * GENERATED — do not edit by hand.
 * Regenerate with: `node scripts/build-data-registries.mjs`
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

import { card as braveSearch } from "./protocols/brave-search";
import { card as context7 } from "./protocols/context7";
import { card as dbhub } from "./protocols/dbhub";
import { card as envSecretExposureAnalyzer } from "./protocols/env-secret-exposure-analyzer";
import { card as fetch } from "./protocols/fetch";
import { card as filesystem } from "./protocols/filesystem";
import { card as firecrawl } from "./protocols/firecrawl";
import { card as gdrive } from "./protocols/gdrive";
import { card as git } from "./protocols/git";
import { card as github } from "./protocols/github";
import { card as mcpGrep } from "./protocols/mcp-grep";
import { card as memory } from "./protocols/memory";
import { card as ndjsonLocalLogTriage } from "./protocols/ndjson-local-log-triage";
import { card as playwrightTraceDecoder } from "./protocols/playwright-trace-decoder";
import { card as postgres } from "./protocols/postgres";
import { card as puppeteer } from "./protocols/puppeteer";
import { card as reactRenderProfile } from "./protocols/react-render-profile";
import { card as sentry } from "./protocols/sentry";
import { card as sequentialthinking } from "./protocols/sequentialthinking";
import { card as slack } from "./protocols/slack";

type ProtocolModule = { default: ProtocolConfig };

export const CATALOG: CatalogEntry[] = [
  { slug: "brave-search", ...braveSearch },
  { slug: "context7", ...context7 },
  { slug: "dbhub", ...dbhub },
  { slug: "env-secret-exposure-analyzer", ...envSecretExposureAnalyzer },
  { slug: "fetch", ...fetch },
  { slug: "filesystem", ...filesystem },
  { slug: "firecrawl", ...firecrawl },
  { slug: "gdrive", ...gdrive },
  { slug: "git", ...git },
  { slug: "github", ...github },
  { slug: "mcp-grep", ...mcpGrep },
  { slug: "memory", ...memory },
  { slug: "ndjson-local-log-triage", ...ndjsonLocalLogTriage },
  { slug: "playwright-trace-decoder", ...playwrightTraceDecoder },
  { slug: "postgres", ...postgres },
  { slug: "puppeteer", ...puppeteer },
  { slug: "react-render-profile", ...reactRenderProfile },
  { slug: "sentry", ...sentry },
  { slug: "sequentialthinking", ...sequentialthinking },
  { slug: "slack", ...slack },
];

export const REGISTRY: Record<string, () => Promise<ProtocolModule>> = {
  "brave-search": () => import("./protocols/brave-search"),
  context7: () => import("./protocols/context7"),
  dbhub: () => import("./protocols/dbhub"),
  "env-secret-exposure-analyzer": () => import("./protocols/env-secret-exposure-analyzer"),
  fetch: () => import("./protocols/fetch"),
  filesystem: () => import("./protocols/filesystem"),
  firecrawl: () => import("./protocols/firecrawl"),
  gdrive: () => import("./protocols/gdrive"),
  git: () => import("./protocols/git"),
  github: () => import("./protocols/github"),
  "mcp-grep": () => import("./protocols/mcp-grep"),
  memory: () => import("./protocols/memory"),
  "ndjson-local-log-triage": () => import("./protocols/ndjson-local-log-triage"),
  "playwright-trace-decoder": () => import("./protocols/playwright-trace-decoder"),
  postgres: () => import("./protocols/postgres"),
  puppeteer: () => import("./protocols/puppeteer"),
  "react-render-profile": () => import("./protocols/react-render-profile"),
  sentry: () => import("./protocols/sentry"),
  sequentialthinking: () => import("./protocols/sequentialthinking"),
  slack: () => import("./protocols/slack"),
};

export const PROTOCOL_SLUGS = Object.keys(REGISTRY);
