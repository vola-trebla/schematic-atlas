import type { ProtocolConfig } from "../../types/protocol";

const config: ProtocolConfig = {
  name: "context7",
  partTag: "CTX7",
  category: "documentation",
  nodes: ["library name", "context7", "LLM context"],
  purpose:
    "Resolves any library name to a Context7 ID, then injects version-accurate docs and code examples directly into the agent's context.",
  highlight: "version-accurate docs",
  repo: "https://github.com/upstash/context7",
  package: "@upstash/context7-mcp",
  license: "MIT",
  stats: [
    ["2", "MCP tools"],
    ["2-step", "flow"],
  ],
  flow: {
    input: {
      label: "user query",
      sub: "← 'use context7'",
    },
    steps: [
      {
        n: 1,
        name: "resolve-library-id",
        args: "libraryName, query",
        body: "Fuzzy-matches the library name against the Context7 index and returns the canonical slash-ID (e.g. /vercel/next.js). Ranks by relevance to the user's query.",
        question: '"which exact library?"',
        branch: {
          n: "!",
          name: "ambiguous-match",
          condition: "if multiple hits",
          body: "Returns ranked list. Agent must pick the correct ID before proceeding — wrong ID pulls wrong docs.",
        },
      },
      {
        n: 2,
        name: "query-docs",
        args: "libraryId, query",
        body: "Fetches version-specific documentation and code examples from the Context7 backend using the resolved ID. Injects snippets directly into the LLM context.",
        question: '"what to inject?"',
      },
    ],
  },
  tools: [
    { name: "resolve-library-id", sub: "name → Context7 slash-ID" },
    { name: "query-docs", sub: "slash-ID → versioned docs + examples" },
  ],
  notes: [
    {
      body: "API key recommended. Free key at context7.com/dashboard gives higher rate limits.",
      condition: "rate-limit",
    },
  ],
  example: {
    lang: "bash",
    code: 'npx ctx7 setup --claude\nctx7 library supabase "auth"\nctx7 docs /supabase/supabase "email password sign-up"',
    captions: [
      "One-time setup — injects MCP config",
      "Find the canonical library ID first",
      "Then pull versioned docs into context",
    ],
  },
  install: {
    npx: "npx ctx7 setup",
    mcp: "https://mcp.context7.com/mcp",
  },
  worksWith: ["Claude Code · Claude Desktop", "Cursor · VS Code", "Any MCP client"],
};

export default config;
