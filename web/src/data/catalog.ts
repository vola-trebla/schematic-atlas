/**
 * Catalog index — the lightweight projection of all protocols, used by the
 * home page grid. Imports only the `card` named export of each protocol
 * module, so the heavy `default` (full ProtocolConfig) is tree-shaken out
 * of the catalog page bundle.
 *
 * When this list grows past 20–30 hand-maintained entries, generate it from
 * a directory listing at build time.
 */
import type { CatalogEntry } from "../types/catalog";

import { card as context7 } from "./protocols/context7";
import { card as dbhub } from "./protocols/dbhub";
import { card as envSecretExposureAnalyzer } from "./protocols/env-secret-exposure-analyzer";
import { card as mcpGrep } from "./protocols/mcp-grep";
import { card as playwrightTraceDecoder } from "./protocols/playwright-trace-decoder";

export const CATALOG: CatalogEntry[] = [
  { slug: "context7", ...context7 },
  { slug: "dbhub", ...dbhub },
  { slug: "env-secret-exposure-analyzer", ...envSecretExposureAnalyzer },
  { slug: "mcp-grep", ...mcpGrep },
  { slug: "playwright-trace-decoder", ...playwrightTraceDecoder },
];
