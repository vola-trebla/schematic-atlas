/**
 * Build-time gate: every protocol slug in the registry must load and
 * validate against the Zod schema. Catches broken configs in CI rather
 * than at page-load.
 */
import { describe, expect, it } from "vitest";

import { CATALOG } from "../catalog";
import { loadProtocol, PROTOCOL_SLUGS } from "../load-protocol";

describe("protocol registry", () => {
  it("catalog index covers the same slugs as the loader registry", () => {
    const catalogSlugs = CATALOG.map((e) => e.slug).sort();
    const registrySlugs = [...PROTOCOL_SLUGS].sort();
    expect(catalogSlugs).toEqual(registrySlugs);
  });

  it.each(PROTOCOL_SLUGS)("loads and validates %s", async (slug) => {
    const config = await loadProtocol(slug);
    expect(config).not.toBeNull();
  });

  it("returns null for unknown slug", async () => {
    expect(await loadProtocol("does-not-exist")).toBeNull();
  });
});
