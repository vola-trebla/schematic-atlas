import { ProtocolConfigSchema } from "../../types/protocol.schema";

import context7 from "./context7";
import dbhub from "./dbhub";
import envSecretExposureAnalyzer from "./env-secret-exposure-analyzer";
import mcpGrep from "./mcp-grep";
import playwrightTraceDecoder from "./playwright-trace-decoder";

const raw: Record<string, unknown> = {
  context7,
  "env-secret-exposure-analyzer": envSecretExposureAnalyzer,
  "playwright-trace-decoder": playwrightTraceDecoder,
  "mcp-grep": mcpGrep,
  dbhub,
};

// Validate every entry at module load — fail fast with a clear error
// before a broken config reaches the renderer.
export const PROTOCOLS: Record<string, import("../../types/protocol").ProtocolConfig> =
  Object.fromEntries(
    Object.entries(raw).map(([slug, config]) => {
      const result = ProtocolConfigSchema.safeParse(config);
      if (!result.success) {
        throw new Error(
          `Invalid protocol config for "${slug}":\n${result.error.issues.map((i) => `  ${i.path.join(".")} — ${i.message}`).join("\n")}`
        );
      }
      return [slug, result.data];
    })
  );
