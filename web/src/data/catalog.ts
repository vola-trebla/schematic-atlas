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

import { card as braveSearch } from "./protocols/brave-search";
import { card as context7 } from "./protocols/context7";
import { card as dbhub } from "./protocols/dbhub";
import { card as envSecretExposureAnalyzer } from "./protocols/env-secret-exposure-analyzer";
import { card as fetch } from "./protocols/fetch";
import { card as filesystem } from "./protocols/filesystem";
import { card as git } from "./protocols/git";
import { card as github } from "./protocols/github";
import { card as mcpGrep } from "./protocols/mcp-grep";
import { card as memory } from "./protocols/memory";
import { card as ndjsonLocalLogTriage } from "./protocols/ndjson-local-log-triage";
import { card as playwrightTraceDecoder } from "./protocols/playwright-trace-decoder";
import { card as reactRenderProfile } from "./protocols/react-render-profile";
import { card as slack } from "./protocols/slack";

export const CATALOG: CatalogEntry[] = [
  { slug: "brave-search", ...braveSearch },
  { slug: "context7", ...context7 },
  { slug: "dbhub", ...dbhub },
  { slug: "env-secret-exposure-analyzer", ...envSecretExposureAnalyzer },
  { slug: "fetch", ...fetch },
  { slug: "filesystem", ...filesystem },
  { slug: "git", ...git },
  { slug: "github", ...github },
  { slug: "mcp-grep", ...mcpGrep },
  { slug: "memory", ...memory },
  { slug: "ndjson-local-log-triage", ...ndjsonLocalLogTriage },
  { slug: "playwright-trace-decoder", ...playwrightTraceDecoder },
  { slug: "react-render-profile", ...reactRenderProfile },
  { slug: "slack", ...slack },
];
