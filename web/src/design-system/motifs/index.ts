/**
 * Schematic motif library — server-safe primitives.
 *
 * Organised by motif family:
 *   - tokens       — InkColors palette
 *   - effects      — WobbleDefs, Hatch, StrokeDraw
 *   - lines        — DimLine, DimLineV, Arrow
 *   - annotations  — Callout, LeaderCaption, StepNum, Stamp, Annotation
 *   - marks        — CheckMark, CrossMark
 *   - card         — SchematicCard, FoldedCorner, PartTag, PenDivider, Chip
 *   - inputs       — SInput
 *   - icons        — Icon, IconName (type)
 *
 * SButton (the only stateful primitive) lives in ../schematic-client.tsx.
 *
 * Prefer importing from a specific submodule (`./motifs/card`) when you only
 * need one family; this barrel exists for convenience and back-compat.
 */
export { InkColors } from "./tokens";
export { WobbleDefs, Hatch, StrokeDraw } from "./effects";
export { DimLine, DimLineV, Arrow } from "./lines";
export { Callout, LeaderCaption, StepNum, Stamp, Annotation } from "./annotations";
export { CheckMark, CrossMark } from "./marks";
export { SchematicCard, FoldedCorner, PartTag, PenDivider, Chip } from "./card";
export { SInput } from "./inputs";
export { Icon } from "./icons";
export type { IconName } from "./icons";
