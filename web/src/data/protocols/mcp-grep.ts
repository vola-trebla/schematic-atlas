import type { ProtocolConfig } from "../../types/protocol";

const config: ProtocolConfig = {
  name: "mcp-grep",
  partTag: "GREP",
  category: "search",
  nodes: ["query", "shim", "ripgrep"],
  purpose:
    "Sub-millisecond grep as an MCP server, with glob-aware filtering and streaming matches.",
  highlight: "Sub-millisecond grep",
  repo: "https://github.com/example/mcp-grep",
  package: "mcp-grep",
  license: "MIT",
  stats: [
    ["18 KB", "binary"],
    ["< 0.4 ms", "p50"],
    ["0", "deps"],
  ],
  flow: {
    input: {
      label: "search(pattern, path)",
      sub: "← from agent",
    },
    steps: [
      {
        n: 1,
        name: "parse_args",
        args: "pattern, path, glob?",
        body: "Validate against zod schema. Resolve path. Build ripgrep argv (respects .gitignore unless overridden).",
        question: '"what to search?"',
      },
      {
        n: 2,
        name: "spawn_ripgrep",
        args: "argv",
        body: "Fork ripgrep with line-buffered stdout. The shim never reads the index itself — ripgrep is the source of truth.",
        question: '"who scans?"',
      },
      {
        n: 3,
        name: "stream_matches",
        args: "stdout",
        body: "Each match line becomes one MCP content chunk: file, line, column, snippet. First match returns before the last file is scanned.",
        question: '"how does the agent see it?"',
      },
    ],
  },
  tools: [
    { name: "search", sub: "pattern, path, glob? — primary entry" },
    { name: "search_strict", sub: "no .gitignore — search everything" },
    { name: "count", sub: "match count only — no content" },
  ],
  install: {
    npm: "npm install -g mcp-grep",
    cargo: "cargo install mcp-grep",
  },
  run: "mcp-grep --path ./src",
  worksWith: ["any MCP client", "ripgrep ≥ 13 (bundled)", "macOS · Linux · Windows"],
};

export default config;
