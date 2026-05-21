import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "fetch",
  partTag: "FETCH",
  category: "web",
  nodes: ["agent", "fetch", "markdown"],
  purpose:
    "Fetches a URL and converts HTML to clean markdown for the agent's context — paginated via start_index so models can page through long content.",
  stats: [
    ["1", "MCP tool"],
    ["HTML → md", "default mode"],
    ["robots.txt", "obeyed"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "HTML to clean markdown",
  repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
  package: "mcp-server-fetch",
  license: "MIT",
  flow: {
    input: {
      label: "URL",
      sub: "← 'pull docs from docs.example.com'",
    },
    steps: [
      {
        n: 1,
        name: "fetch",
        args: "url, max_length?",
        body: "Fetches the URL, strips scripts and chrome, converts HTML to markdown. Returns up to max_length characters (default 5000) — enough for one screenful, not the whole page.",
        question: '"can I read this in one shot?"',
        branch: {
          n: "!",
          name: "truncated",
          condition: "if max_length hit",
          body: "Response includes a note that content was cut. Agent must call fetch again with start_index = end-of-previous to continue. Skipping this strands the model mid-document.",
        },
      },
      {
        n: 2,
        name: "fetch (next chunk)",
        args: "url, start_index, max_length?",
        body: "Resumes from the character index where the previous call stopped. Each call is independent — the server keeps no session state, so the agent is the one paging through.",
        question: '"is there more?"',
      },
    ],
  },
  tools: [{ name: "fetch", sub: "URL → markdown, paginated via start_index" }],
  notes: [
    {
      condition: "robots.txt obeyed",
      body: "By default the server respects robots.txt for tool calls (model-initiated). Pass --ignore-robots-txt only when you know the target permits scraping — the default is the safer side.",
    },
    {
      condition: "internal IPs reachable",
      body: "The server can hit local/internal IPs (127.0.0.1, 192.168.x.x). If the agent is operating on untrusted user input, sandbox the server's network — a malicious URL could probe the LAN.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "fetch": {\n      "command": "uvx",\n      "args": ["mcp-server-fetch"]\n    }\n  }\n}',
    captions: [
      "uvx runs the Python server in a one-shot venv — no global install",
      "Pass --ignore-robots-txt as an extra arg if you need to override the default",
    ],
  },
  install: {
    uvx: "uvx mcp-server-fetch",
    pip: "pip install mcp-server-fetch",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
