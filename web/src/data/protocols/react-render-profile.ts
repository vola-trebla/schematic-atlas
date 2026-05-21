import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "react-render-profile",
  partTag: "RPROF",
  category: "debugging",
  nodes: ["profile.json", "RPROF", "verdicts"],
  purpose:
    "Decodes React DevTools Profiler exports into actionable render summaries for AI agents — with verdicts that don't fight React 18 concurrent rendering.",
  stats: [
    ["5", "MCP tools"],
    ["0", "runtime deps"],
    ["v5", "DevTools format"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "actionable render summaries",
  repo: "https://github.com/vola-trebla/react-render-profile-mcp",
  package: "react-render-profile-mcp",
  license: "MIT",
  flow: {
    input: {
      label: "profile.json",
      sub: "← from DevTools Profiler",
    },
    steps: [
      {
        n: 1,
        name: "get_render_summary",
        body: "First probe — total commits, total render time, top components, total spurious count. Each component carries lifecycle counts so the agent can spot unstable-key bugs.",
        question: '"how bad is it?"',
        branch: {
          n: "!",
          name: "lifecycle anomaly",
          condition: "if mount_count ≈ unmount_count",
          body: "Component is being destroyed and recreated each render — classic unstable `key` prop bug. React.memo can't help. Fix the key in the parent.",
        },
      },
      {
        n: 2,
        name: "find_spurious_renders",
        body: "Classifies root cause per suspect: UNSTABLE_PARENT_REF (fix with React.memo) · CONTEXT_UPDATE (memo can't help — stabilize the context value) · concurrent_yield (React 18 intentional, do not optimize).",
        question: '"what kind of waste?"',
      },
      {
        n: 3,
        name: "trace_render_cascade",
        args: "commit_index",
        body: "For one commit — what triggered it and every component that re-rendered as a result. is_concurrent_commit flags React 18 transition lanes so the agent doesn't mistake them for regressions.",
        question: '"why 40 re-renders from one click?"',
      },
      {
        n: 4,
        name: "suggest_memoization",
        body: "Per-component verdict: MEMOIZE · DO_NOT_MEMOIZE (renders under 2ms — memo overhead exceeds the render cost) · INTENTIONAL_CONCURRENT_YIELD. Avoids the reflexive 'wrap everything' fix.",
        question: '"now what do I change?"',
      },
    ],
  },
  tools: [
    { name: "get_render_summary", sub: "scale + top components + lifecycle flags" },
    { name: "find_spurious_renders", sub: "classified by root cause + concurrent_yield" },
    { name: "get_hottest_components", sub: "top N by self CPU, transition-aware" },
    { name: "trace_render_cascade", sub: "propagation tree for a specific commit" },
    {
      name: "suggest_memoization",
      sub: "MEMOIZE · DO_NOT_MEMOIZE · INTENTIONAL_CONCURRENT_YIELD",
    },
  ],
  notes: [
    {
      condition: "concurrent-aware",
      body: "React 18 intentionally re-renders during startTransition / useDeferredValue commits. The tool flags these as concurrent_yield rather than flagging them as bugs — fighting React's scheduler is the most common false fix.",
    },
    {
      condition: "no React dep",
      body: "Pure JSON parsing — no React or DevTools packages in the dependency tree. Works against any React 16.5+ profile that DevTools v5 could export.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "react-render-profile": {\n      "command": "npx",\n      "args": ["-y", "react-render-profile-mcp"]\n    }\n  }\n}',
    captions: [
      "Add to Claude Desktop config — Cursor / VS Code use the same shape",
      "Then DevTools → Profiler → Record → Save → pass the .json path to any tool",
    ],
  },
  install: {
    npx: "npx -y react-render-profile-mcp",
    npm: "npm install -g react-render-profile-mcp",
  },
  worksWith: [
    "Claude Desktop · Claude Code",
    "Cursor · VS Code",
    "React 16.5+ DevTools v5 exports",
  ],
};

export default config;
