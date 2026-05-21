import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "filesystem",
  partTag: "FS",
  category: "filesystem",
  nodes: ["allowed roots", "fs server", "agent file ops"],
  purpose:
    "Gives an agent gated read · write · explore access to specific directories on the host, with allow-listed roots and dry-run-able edits.",
  stats: [
    ["13", "file tools"],
    ["allow-list", "access model"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "gated read · write · explore",
  repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
  package: "@modelcontextprotocol/server-filesystem",
  license: "MIT",
  flow: {
    input: {
      label: "agent intent",
      sub: "← 'read project README'",
    },
    steps: [
      {
        n: 1,
        name: "list_allowed_directories",
        body: "Agent's first call — confirms which roots the server is willing to touch. Anything outside this list fails fast with a clear error.",
        question: '"where can I read?"',
        branch: {
          n: "!",
          name: "out-of-scope path",
          condition: "if path outside roots",
          body: "Server refuses immediately. Restart with --allowed-directories or use MCP Roots to widen scope — security-by-default, not by trust.",
        },
      },
      {
        n: 2,
        name: "read_text_file · read_multiple_files",
        args: "path, head?, tail?",
        body: "Pulls UTF-8 content into the agent context. head/tail let the agent peek at large files (logs, JSON dumps) without loading the whole thing.",
        question: '"what\'s inside?"',
      },
      {
        n: 3,
        name: "edit_file",
        args: "path, edits[], dryRun",
        body: "Pattern-matched edits with whitespace normalization. Always preview with dryRun: true first — server returns a git-style diff before any write.",
        question: '"safe to write?"',
      },
    ],
  },
  groups: [
    {
      key: "read",
      title: "Read",
      icon: "eye",
      blurb: "Pull file content into the agent context, with streaming for large files.",
      items: [
        { name: "read_text_file", sub: "UTF-8 text, with optional head / tail" },
        { name: "read_media_file", sub: "image or audio as base64 + MIME" },
        { name: "read_multiple_files", sub: "batch read — failures don't stop the batch" },
        { name: "get_file_info", sub: "size, mtime, type, permissions" },
      ],
    },
    {
      key: "write",
      title: "Write",
      icon: "tool",
      blurb: "Create or modify files. edit_file supports dry-run previews — use them.",
      items: [
        { name: "write_file", sub: "create or overwrite" },
        { name: "edit_file", sub: "pattern-matched edits, dryRun-able" },
        { name: "create_directory", sub: "idempotent mkdir -p" },
        { name: "move_file", sub: "rename or relocate" },
      ],
    },
    {
      key: "explore",
      title: "Explore",
      icon: "search",
      blurb: "Walk the directory tree without reading file content.",
      items: [
        { name: "list_directory", sub: "flat listing with [FILE] / [DIR]" },
        { name: "list_directory_with_sizes", sub: "same, plus file sizes" },
        { name: "directory_tree", sub: "recursive JSON tree" },
        { name: "search_files", sub: "glob match, with excludes" },
        { name: "list_allowed_directories", sub: "what the server will touch" },
      ],
    },
  ],
  notes: [
    {
      condition: "allow-list enforced",
      body: "All paths validate against --allowed-directories or MCP Roots. Symlinks pointing outside are blocked. Run as non-root — the OS is the second line of defense.",
    },
    {
      condition: "no auto-confirm",
      body: "write_file overwrites silently. The agent — not the server — is responsible for asking the human before destructive writes.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]\n    }\n  }\n}',
    captions: [
      "Single root configured via argv",
      "Repeat the argument to add roots — server validates each",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-filesystem <dir1> <dir2>",
    docker: "docker run -v /host:/projects mcp/filesystem /projects",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
