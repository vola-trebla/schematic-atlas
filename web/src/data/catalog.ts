/**
 * Catalog index — re-exports the light card projection of every protocol
 * for the home page grid. The CATALOG array is built by codegen from
 * data/protocols/*.ts (one file per slug) — see registry.generated.ts.
 *
 * Imports only the `card` named export of each protocol module, so the
 * heavy `default` (full ProtocolConfig) is tree-shaken out of the catalog
 * page bundle. The per-page config is loaded on demand via loadProtocol().
 */
export { CATALOG } from "./registry.generated";
