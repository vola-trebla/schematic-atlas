import { z } from "zod";

const IconNameSchema = z.enum([
  "github",
  "eye",
  "play",
  "bug",
  "tool",
  "terminal",
  "search",
  "link",
  "stream",
  "pause",
  "copy",
  "arrow_right",
  "arrow_left",
  "plus",
  "filter",
  "clock",
]);

const ToolSchema = z.object({
  name: z.string(),
  sub: z.string().optional(),
});

const GroupSchema = z.object({
  key: z.string(),
  title: z.string(),
  icon: IconNameSchema.optional(),
  blurb: z.string().optional(),
  items: z.array(ToolSchema),
});

const FlowBranchSchema = z.object({
  n: z.union([z.number(), z.string()]),
  name: z.string(),
  condition: z.string(),
  body: z.string().optional(),
});

const FlowStepSchema = z.object({
  n: z.union([z.number(), z.string()]),
  name: z.string(),
  args: z.string().optional(),
  body: z.string().optional(),
  question: z.string().optional(),
  branch: FlowBranchSchema.optional(),
});

const FlowInputSchema = z.object({
  label: z.string(),
  sub: z.string().optional(),
});

const FlowSchema = z.object({
  input: FlowInputSchema.optional(),
  steps: z.array(FlowStepSchema),
});

const NoteSchema = z.object({
  n: z.union([z.number(), z.string()]).optional(),
  condition: z.string().optional(),
  body: z.string(),
});

const ExampleSchema = z.object({
  lang: z.string().optional(),
  code: z.string(),
  captions: z.array(z.string()).optional(),
});

export const ProtocolConfigSchema = z
  .object({
    // Identity
    name: z.string(),
    partTag: z.string().optional(),
    purpose: z.string(),
    highlight: z.string().optional(),
    repo: z.string().optional(),
    package: z.string().optional(),
    license: z.string().optional(),

    // Stats
    stats: z.array(z.tuple([z.string(), z.string().optional()])).optional(),

    // Centerpiece
    flow: FlowSchema.optional(),

    // Components: groups XOR tools
    groups: z.array(GroupSchema).optional(),
    tools: z.array(ToolSchema).optional(),

    // Optional sections
    notes: z.array(NoteSchema).optional(),
    example: ExampleSchema.optional(),

    // Install / use
    install: z.record(z.string(), z.string()).optional(),
    run: z.string().optional(),
    worksWith: z.array(z.string()).optional(),

    // Catalog metadata
    category: z.string().optional(),
    nodes: z.tuple([z.string(), z.string(), z.string()]).optional(),

    // Internal
    enriched: z.boolean().optional(),
  })
  .refine((c) => !(c.groups && c.tools), {
    message: "groups and tools are mutually exclusive — use one or the other",
    path: ["groups"],
  });

export type ProtocolConfig = z.infer<typeof ProtocolConfigSchema>;
export type IconName = z.infer<typeof IconNameSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export type Group = z.infer<typeof GroupSchema>;
export type FlowBranch = z.infer<typeof FlowBranchSchema>;
export type FlowStep = z.infer<typeof FlowStepSchema>;
export type FlowInput = z.infer<typeof FlowInputSchema>;
export type Flow = z.infer<typeof FlowSchema>;
export type Note = z.infer<typeof NoteSchema>;
export type Example = z.infer<typeof ExampleSchema>;
