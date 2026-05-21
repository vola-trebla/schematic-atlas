import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "memory",
  partTag: "MEM",
  category: "persistence",
  nodes: ["agent", "memory", "graph"],
  purpose:
    "Gives Claude persistent memory across chats — entities, relations, and observations stored as a local knowledge graph in a JSONL file.",
  stats: [
    ["9", "MCP tools"],
    ["JSONL", "local store"],
    ["graph", "data model"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "persistent memory across chats",
  repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
  package: "@modelcontextprotocol/server-memory",
  license: "MIT",
  flow: {
    input: {
      label: "fact to record",
      sub: "← 'John works at Anthropic'",
    },
    steps: [
      {
        n: 1,
        name: "search_nodes",
        args: "query",
        body: "First probe — searches entity names, types, and observation content. Agent checks if the subject is already in the graph before deciding to add or extend.",
        question: '"is this entity known?"',
        branch: {
          n: "!",
          name: "not in graph",
          condition: "if no match",
          body: "Agent must create_entities first, then attach observations and relations. Skipping this step strands the facts — orphan observations can't be linked.",
        },
      },
      {
        n: 2,
        name: "add_observations · create_entities",
        args: "observations[] or entities[]",
        body: "Existing entity → add_observations appends new facts. New entity → create_entities sets it up with name, type, and initial observations in one call.",
        question: '"new entity or new fact?"',
      },
      {
        n: 3,
        name: "create_relations",
        args: "from, to, relationType",
        body: "Connects entities with directed, active-voice relations (works_at, manages, uses). Skipping relations leaves isolated facts — relations are what make the graph queryable later.",
        question: '"how does this connect?"',
      },
    ],
  },
  tools: [
    { name: "create_entities", sub: "name + type + initial observations" },
    { name: "create_relations", sub: "directed, active voice" },
    { name: "add_observations", sub: "extend an existing entity" },
    { name: "delete_entities", sub: "cascade-removes associated relations" },
    { name: "delete_observations", sub: "remove specific facts" },
    { name: "delete_relations", sub: "remove specific links" },
    { name: "read_graph", sub: "dump the whole structure" },
    { name: "search_nodes", sub: "across names, types, observations" },
    { name: "open_nodes", sub: "fetch by name, with their relations" },
  ],
  notes: [
    {
      condition: "local JSONL",
      body: "Default storage is a JSONL file in the server directory. Set MEMORY_FILE_PATH to relocate. No cloud sync — memory lives where the server runs.",
    },
    {
      condition: "needs prompting",
      body: "Memory only works if Claude is told to use it. The README suggests adding a 'Memory' section to the system prompt listing tracked categories (identity, behaviors, goals).",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "memory": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-memory"],\n      "env": {\n        "MEMORY_FILE_PATH": "/Users/me/.claude/memory.jsonl"\n      }\n    }\n  }\n}',
    captions: [
      "MEMORY_FILE_PATH pins the store outside the package dir",
      "Then prompt Claude to actually use it — server alone won't trigger recall",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-memory",
    docker: "docker run -v claude-memory:/app/dist mcp/memory",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
