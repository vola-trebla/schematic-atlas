/**
 * Per-slug protocol loader. Each entry in REGISTRY is a dynamic import
 * function — when called, the bundler emits one chunk per protocol module,
 * so the [protocol]/page.tsx route only pulls the config it actually needs.
 *
 * REGISTRY itself is built by codegen — see registry.generated.ts.
 * This file wraps it with Zod validation, so a malformed config fails
 * loud at load time with a precise error pointing to the bad field.
 */
import type { ProtocolConfig } from "../types/protocol";
import { ProtocolConfigSchema } from "../types/protocol.schema";

import { REGISTRY, PROTOCOL_SLUGS } from "./registry.generated";

export { PROTOCOL_SLUGS };

export async function loadProtocol(slug: string): Promise<ProtocolConfig | null> {
  const loader = REGISTRY[slug];
  if (!loader) return null;
  const mod = await loader();
  const result = ProtocolConfigSchema.safeParse(mod.default);
  if (!result.success) {
    throw new Error(
      `Invalid protocol config for "${slug}":\n${result.error.issues
        .map((i) => `  ${i.path.join(".")} — ${i.message}`)
        .join("\n")}`
    );
  }
  return result.data;
}
