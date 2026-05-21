/**
 * Per-slug protocol loader. Each entry in REGISTRY is a dynamic import
 * function — when called, the bundler emits one chunk per protocol module,
 * so the [protocol]/page.tsx route only pulls the config it actually needs.
 *
 * Explicit registry (rather than `import('./protocols/' + slug)`) keeps
 * Next.js 16 / Turbopack honest about which modules can be loaded. When the
 * catalog grows past hand-maintainable size, generate this from a directory
 * listing at build time.
 */
import type { ProtocolConfig } from "../types/protocol";
import { ProtocolConfigSchema } from "../types/protocol.schema";

type ProtocolModule = { default: ProtocolConfig };

const REGISTRY: Record<string, () => Promise<ProtocolModule>> = {
  context7: () => import("./protocols/context7"),
  dbhub: () => import("./protocols/dbhub"),
  "env-secret-exposure-analyzer": () => import("./protocols/env-secret-exposure-analyzer"),
  filesystem: () => import("./protocols/filesystem"),
  git: () => import("./protocols/git"),
  github: () => import("./protocols/github"),
  "mcp-grep": () => import("./protocols/mcp-grep"),
  memory: () => import("./protocols/memory"),
  "playwright-trace-decoder": () => import("./protocols/playwright-trace-decoder"),
  "react-render-profile": () => import("./protocols/react-render-profile"),
  slack: () => import("./protocols/slack"),
};

export const PROTOCOL_SLUGS = Object.keys(REGISTRY);

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
