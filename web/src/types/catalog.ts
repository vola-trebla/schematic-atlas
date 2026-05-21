/**
 * Catalog entry — the lightweight projection of a ProtocolConfig used by
 * the home page grid. Defined as a Pick<> over ProtocolConfig so adding a
 * card-relevant field in one place propagates everywhere.
 *
 * Each protocols/*.ts exports a `card` named export of shape `CardFields`,
 * which the catalog index reads (with slug attached). The full ProtocolConfig
 * stays as the default export and is only loaded per-page on demand.
 */
import type { ProtocolConfig } from "./protocol";

export type CardFields = Pick<
  ProtocolConfig,
  "name" | "partTag" | "purpose" | "category" | "nodes" | "stats"
>;

export type CatalogEntry = CardFields & { slug: string };
