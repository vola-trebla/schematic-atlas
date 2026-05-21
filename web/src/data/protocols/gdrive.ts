import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "gdrive",
  partTag: "GDRIVE",
  category: "cloud-storage",
  nodes: ["query", "gdrive", "files"],
  purpose:
    "Search Google Drive and read any file — Workspace docs auto-export to clean markdown / CSV / plain text, binaries come through in native format.",
  stats: [
    ["1", "MCP tool"],
    ["files", "as resources"],
    ["auto-export", "to text"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "auto-export to clean markdown",
  repo: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/gdrive",
  package: "@modelcontextprotocol/server-gdrive",
  license: "MIT",
  flow: {
    input: {
      label: "agent intent",
      sub: "← 'find the Q3 OKRs doc'",
    },
    steps: [
      {
        n: 1,
        name: "search",
        args: "query",
        body: "Drive search by name, content, or modified-date. Returns matching file names + MIME types — agent uses MIME to know how the file will export before opening it.",
        question: '"which file?"',
      },
      {
        n: 2,
        name: "read file resource",
        args: "uri: gdrive:///<file_id>",
        body: "Read by file_id as an MCP resource. Workspace docs convert automatically (Docs → markdown, Sheets → CSV, Slides → plain text). Other formats come through as native bytes.",
        question: '"what\'s the format?"',
        branch: {
          n: "!",
          name: "binary blob",
          condition: "if non-Workspace MIME",
          body: "PDFs, images, binaries return in native format — the agent gets bytes, not text. For these, hand off to a format-specific reader rather than parsing as text.",
        },
      },
    ],
  },
  tools: [{ name: "search", sub: "Drive search → name + MIME for each hit" }],
  notes: [
    {
      condition: "OAuth required",
      body: "Server requires a Google OAuth credentials.json with Drive scope. Token refresh is handled by the server but credentials.json must be reachable to the process — keep it out of repo and image layers.",
    },
    {
      condition: "files as resources",
      body: "Files are MCP resources (gdrive:///<id>), not tool outputs. The agent reads them via the resource API after search — separating discovery from retrieval keeps the surface clean.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "gdrive": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-gdrive"],\n      "env": {\n        "GDRIVE_CREDENTIALS_PATH": "/path/to/.gdrive-creds.json"\n      }\n    }\n  }\n}',
    captions: [
      "Credentials path in env, file outside the workspace tree",
      "First run kicks off OAuth in the browser — token is cached after",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-gdrive",
    docker: "docker run -v ~/.gdrive:/gdrive-server mcp/gdrive",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
