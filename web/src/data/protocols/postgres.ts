import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "postgres",
  partTag: "PG",
  category: "persistence",
  nodes: ["agent", "postgres", "tables"],
  purpose:
    "Read-only PostgreSQL MCP — exposes table schemas as resources and lets the agent run SELECTs inside a READ ONLY transaction, with no write path possible from the server.",
  stats: [
    ["1", "MCP tool"],
    ["read-only", "transaction"],
    ["schemas", "as resources"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "no write path possible",
  repo: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/postgres",
  package: "@modelcontextprotocol/server-postgres",
  license: "MIT",
  flow: {
    input: {
      label: "SQL intent",
      sub: "← 'top 10 users by signups this week'",
    },
    steps: [
      {
        n: 1,
        name: "read schemas",
        args: "resource: postgres://<host>/<table>/schema",
        body: "Schemas are MCP resources — the agent doesn't run a query to learn columns, it reads the schema resource directly. Reduces guesswork and round-trips before the actual query.",
        question: '"what tables and columns exist?"',
      },
      {
        n: 2,
        name: "query",
        args: "sql",
        body: "Executes the SQL inside a READ ONLY transaction — any INSERT/UPDATE/DELETE rolls back at commit. The agent can compose any read query without risk of mutating production.",
        question: '"what does the data say?"',
        branch: {
          n: "!",
          name: "write attempted",
          condition: "if SQL mutates",
          body: "READ ONLY transaction rolls back at commit. The query technically executes but its effects vanish — useful for plan-validation, but the agent should treat this as a hard 'no write' boundary, not a soft warning.",
        },
      },
    ],
  },
  tools: [{ name: "query", sub: "SELECT inside a READ ONLY transaction" }],
  notes: [
    {
      condition: "read-only by transaction",
      body: "Safety is enforced via the BEGIN READ ONLY transaction wrapper, not via SQL parsing. Catches DML and DDL alike at commit — no need for fragile statement classifiers.",
    },
    {
      condition: "schemas as MCP resources",
      body: "Each table's schema is published as a `postgres://<host>/<table>/schema` resource. The agent can discover the database shape via the resource API without burning query budget on metadata.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "postgres": {\n      "command": "npx",\n      "args": [\n        "-y",\n        "@modelcontextprotocol/server-postgres",\n        "postgresql://user:pass@host:5432/mydb"\n      ]\n    }\n  }\n}',
    captions: [
      "Connection string at argv — credentials never reach environment logs",
      "Use a read-replica DSN where possible — defense in depth beyond the READ ONLY tx",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-postgres <DSN>",
    docker: "docker run -i --rm mcp/postgres <DSN>",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
