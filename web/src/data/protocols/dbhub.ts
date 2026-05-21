import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "dbhub",
  partTag: "DBHUB",
  category: "persistence",
  nodes: ["agent", "dbhub", "database"],
  purpose:
    "Zero-dependency MCP gateway that connects any agent to PostgreSQL, MySQL, MariaDB, SQL Server, or SQLite through just 2 tools.",
  stats: [
    ["2", "MCP tools"],
    ["0", "dependencies"],
    ["5", "databases"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "2 tools",
  repo: "https://github.com/bytebase/dbhub",
  package: "@bytebase/dbhub",
  license: "MIT",
  flow: {
    input: {
      label: "SQL intent",
      sub: "← from agent",
    },
    steps: [
      {
        n: 1,
        name: "search_objects",
        args: "database, query",
        body: "Progressive schema disclosure — lists tables, columns, indexes, and procedures matching the query. Agent uses this to build the correct SQL without guessing schema.",
        question: '"what schema exists?"',
      },
      {
        n: 2,
        name: "execute_sql",
        args: "database, sql",
        body: "Executes the SQL with transaction support. Read-only mode, row limiting, and query timeout guard against runaway operations.",
        question: '"is write allowed?"',
        branch: {
          n: "!",
          name: "read-only mode",
          condition: "if readonly: true",
          body: "All write statements rejected at gateway level. Safe for production connections.",
        },
      },
    ],
  },
  tools: [
    { name: "search_objects", sub: "explore schema — tables, columns, indexes" },
    { name: "execute_sql", sub: "run SQL with safety guardrails" },
  ],
  notes: [
    {
      body: "Multi-database mode: define named connections in dbhub.toml to query prod, staging, and dev simultaneously.",
      condition: "multi-db",
    },
  ],
  example: {
    lang: "bash",
    code: 'npx @bytebase/dbhub@latest \\\n  --transport stdio \\\n  --dsn "sqlite:///path/to/app.db"',
    captions: [
      "stdio transport for Claude Desktop / Claude Code",
      "swap dsn for postgres:// or mysql:// — same config",
    ],
  },
  install: {
    npx: "npx @bytebase/dbhub@latest --transport stdio --dsn <DSN>",
    docker: "docker run --rm bytebase/dbhub --transport http --port 8080 --dsn <DSN>",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
