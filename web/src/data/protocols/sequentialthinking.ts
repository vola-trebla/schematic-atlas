import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "sequentialthinking",
  partTag: "SEQ",
  category: "orchestration",
  nodes: ["problem", "SEQ", "solution"],
  purpose:
    "Wraps reasoning into a structured iteration loop — each step is a numbered thought the agent can revise, branch from, or extend until a solution emerges.",
  stats: [
    ["1", "MCP tool"],
    ["revisable", "thoughts"],
    ["branchable", "reasoning"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "structured iteration loop",
  repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking",
  package: "@modelcontextprotocol/server-sequential-thinking",
  license: "MIT",
  flow: {
    input: {
      label: "complex problem",
      sub: "← agent must reason in steps",
    },
    steps: [
      {
        n: 1,
        name: "first thought",
        args: "thoughtNumber=1, totalThoughts, nextThoughtNeeded",
        body: "Agent commits its first reasoning step. totalThoughts is an estimate, not a hard cap — it can grow if the problem turns out deeper than expected.",
        question: '"where to start?"',
      },
      {
        n: 2,
        name: "continue · revise",
        args: "thoughtNumber, isRevision?, revisesThought?",
        body: "Each call carries the next step. isRevision flips when the agent realizes an earlier thought was wrong — revisesThought says which one. The history isn't immutable.",
        question: '"is the earlier step still right?"',
        branch: {
          n: "!",
          name: "branch alt path",
          condition: "if branchFromThought set",
          body: "Forks reasoning at thoughtNumber=N as a parallel branch with branchId. Two hypotheses can be tracked simultaneously without losing the original thread — classic A/B reasoning.",
        },
      },
      {
        n: 3,
        name: "terminate",
        args: "nextThoughtNeeded=false",
        body: "Loop exits when the agent decides it's done. The final thought is the answer; revisions and branches stay in the trace for the host to display.",
        question: '"am I done?"',
      },
    ],
  },
  tools: [
    {
      name: "sequentialthinking",
      sub: "iterative thought · revision · branch mechanics",
    },
  ],
  notes: [
    {
      condition: "agent-driven",
      body: "The model decides how many iterations to run. Hosts can render the trace, but the loop logic lives in the model — the server is just a structured container for thoughts.",
    },
    {
      condition: "logging opt-out",
      body: "Set DISABLE_THOUGHT_LOGGING=true to suppress server-side logging of thought content. Useful when reasoning includes sensitive data the host shouldn't persist.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "sequential-thinking": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]\n    }\n  }\n}',
    captions: [
      "Standard MCP config — works in any client",
      "Then prompt 'reason through this step by step' — host invokes the tool repeatedly",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-sequential-thinking",
    docker: "docker run --rm -i mcp/sequentialthinking",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
