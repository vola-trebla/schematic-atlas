/**
 * Core schema types for Schematic Atlas protocol pages.
 *
 * Types are derived from the Zod schema in protocol.schema.ts.
 * Mirrors the CONFIG schema documented in CLAUDE.md §4.
 * `enriched` is the only field that lives in data only — never reaches the DOM.
 */

export type {
  ProtocolConfig,
  IconName,
  Tool,
  Group,
  FlowBranch,
  FlowStep,
  FlowInput,
  Flow,
  Note,
  Example,
} from "./protocol.schema";
