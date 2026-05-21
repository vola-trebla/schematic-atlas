import type { ProtocolConfig } from "../../types/protocol";

import context7 from "./context7";
import dbhub from "./dbhub";
import envSecretExposureAnalyzer from "./env-secret-exposure-analyzer";
import mcpGrep from "./mcp-grep";
import playwrightTraceDecoder from "./playwright-trace-decoder";

export const PROTOCOLS: Record<string, ProtocolConfig> = {
  context7,
  "env-secret-exposure-analyzer": envSecretExposureAnalyzer,
  "playwright-trace-decoder": playwrightTraceDecoder,
  "mcp-grep": mcpGrep,
  dbhub,
};
