import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "brave-search",
  partTag: "BRAVE",
  category: "search",
  nodes: ["query", "brave", "results"],
  purpose:
    "Brave Search API as MCP — runs web or local-business queries with pagination, freshness filters, and automatic fallback from local to web when no business hits.",
  stats: [
    ["2", "MCP tools"],
    ["API key", "auth"],
    ["web · local", "modes"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "automatic fallback from local to web",
  repo: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/brave-search",
  package: "@modelcontextprotocol/server-brave-search",
  license: "MIT",
  flow: {
    input: {
      label: "agent query",
      sub: "← 'best ramen near union square'",
    },
    steps: [
      {
        n: 1,
        name: "intent: web or local?",
        body: "Agent classifies the query. Place-bound questions (businesses, restaurants, services within a city) → brave_local_search. Everything else → brave_web_search.",
        question: '"web result or business listing?"',
      },
      {
        n: 2,
        name: "brave_local_search · brave_web_search",
        args: "query, count?, offset?",
        body: "Local mode returns business cards (name, address, hours, rating). Web mode returns standard snippets with freshness controls. Both paginate via count (max 20) and offset (max 9).",
        question: '"any results?"',
        branch: {
          n: "!",
          name: "local fallback",
          condition: "if local returns nothing",
          body: "brave_local_search automatically falls back to brave_web_search — the agent doesn't have to retry. The smart-fallback is by design; don't double-issue.",
        },
      },
      {
        n: 3,
        name: "paginate",
        args: "offset += count",
        body: "Bump offset by count to fetch the next page. offset caps at 9, count at 20 — so 180 results is the practical ceiling per query.",
        question: '"need more?"',
      },
    ],
  },
  tools: [
    { name: "brave_web_search", sub: "general queries · pagination · freshness" },
    { name: "brave_local_search", sub: "businesses · services · auto-fallback to web" },
  ],
  notes: [
    {
      condition: "API key required",
      body: "Sign up at brave.com/search/api for a key. Free tier gives 2,000 queries/month — fine for personal use, gate it behind cache for agent workloads at scale.",
    },
    {
      condition: "pagination ceiling",
      body: "count (max 20) × offset (max 9) caps total results at 180 per query thread. For deeper coverage, split into multiple narrower queries instead of trying to paginate past the cap.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "brave-search": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-brave-search"],\n      "env": { "BRAVE_API_KEY": "BSA..." }\n    }\n  }\n}',
    captions: [
      "API key in env — never on the command line",
      "Then prompt the agent with intent — it decides web vs local from the query",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-brave-search",
    docker: "docker run -e BRAVE_API_KEY mcp/brave-search",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
