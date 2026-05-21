import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "sentry",
  partTag: "SENTRY",
  category: "debugging",
  nodes: ["issue ID", "sentry", "stack trace"],
  purpose:
    "Pulls a Sentry issue's full context — title, level, event count, full stack trace — directly into the agent's reasoning, so it can debug production errors without context-switching.",
  stats: [
    ["1", "MCP tool"],
    ["auth token", "scoped"],
    ["full trace", "returned"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "without context-switching",
  repo: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/sentry",
  package: "mcp-server-sentry",
  license: "MIT",
  flow: {
    input: {
      label: "issue link",
      sub: "← 'this just paged us'",
    },
    steps: [
      {
        n: 1,
        name: "get_sentry_issue",
        args: "issue_id_or_url",
        body: "Single call — returns the full issue payload: title, status, level, first/last seen, event count, and the entire stack trace. Accepts either the bare ID or a sentry.io URL.",
        question: '"what broke, and how often?"',
        branch: {
          n: "!",
          name: "already resolved",
          condition: "if status = resolved",
          body: "Don't re-investigate — someone already shipped a fix. Cross-check the last-seen timestamp; if recent, the resolve was premature and the issue is back.",
        },
      },
      {
        n: 2,
        name: "agent reasons over trace",
        body: "Stack trace lands in context — the agent walks frames, identifies the throwing line, and cross-references with the local repo via filesystem or git tools. The handoff is what makes the agent useful here.",
        question: '"where in the code?"',
      },
    ],
  },
  tools: [
    {
      name: "get_sentry_issue",
      sub: "issue id or URL → title · level · event count · full stack",
    },
  ],
  notes: [
    {
      condition: "auth token required",
      body: "SENTRY_AUTH_TOKEN env var must be set with read access to the project. Token scopes determine visible issues — agent gets a 403 long before it gets a data leak.",
    },
    {
      condition: "single tool, rich payload",
      body: "One call returns everything the agent needs to start debugging. No pagination, no follow-ups for stack frames — the payload is self-contained.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "sentry": {\n      "command": "uvx",\n      "args": ["mcp-server-sentry", "--auth-token", "${SENTRY_AUTH_TOKEN}"]\n    }\n  }\n}',
    captions: [
      "Auth token in env — pass it through with shell expansion, never inline",
      "Then point the agent at an issue link and ask: 'what's the root cause?'",
    ],
  },
  install: {
    uvx: "uvx mcp-server-sentry --auth-token <TOKEN>",
    pip: "pip install mcp-server-sentry",
  },
  worksWith: ["Claude Desktop · Claude Code", "Zed · Cursor · VS Code", "Any MCP client"],
};

export default config;
