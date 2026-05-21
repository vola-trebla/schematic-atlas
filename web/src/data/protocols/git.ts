import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "git",
  partTag: "GIT",
  category: "version-control",
  nodes: ["agent intent", "git server", "working tree"],
  purpose:
    "Lets an agent drive git through a structured MCP interface — status, diff, log, commit, branch — without spawning shells or parsing porcelain.",
  stats: [
    ["12", "git tools"],
    ["3-step", "core flow"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "without spawning shells",
  repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/git",
  package: "mcp-server-git",
  license: "MIT",
  flow: {
    input: {
      label: "agent intent",
      sub: "← 'is the repo clean?'",
    },
    steps: [
      {
        n: 1,
        name: "git_status",
        args: "repo_path",
        body: "First probe — reports untracked, modified, and staged files. The agent uses this to decide whether any further write is safe.",
        question: '"is the tree dirty?"',
        branch: {
          n: "!",
          name: "tree-dirty",
          condition: "if changes present",
          body: "Agent must inspect with diff or stash before any commit. Skipping this step risks clobbering uncommitted work.",
        },
      },
      {
        n: 2,
        name: "git_diff_unstaged · git_diff_staged",
        args: "repo_path, context_lines?",
        body: "Two separate tools — the agent reasons about unstaged hunks and staged hunks independently. Configurable context, no porcelain to parse.",
        question: '"what changed, exactly?"',
      },
      {
        n: 3,
        name: "git_add → git_commit",
        args: "files[], message",
        body: "Stages an explicit file list (no add -A — that's how secrets leak), then commits with the agent-authored message. Returns the new commit hash.",
        question: '"ready to record?"',
      },
    ],
  },
  tools: [
    { name: "git_status", sub: "working tree state" },
    { name: "git_diff_unstaged", sub: "what's not yet staged" },
    { name: "git_diff_staged", sub: "what's queued for commit" },
    { name: "git_diff", sub: "compare with a branch or commit" },
    { name: "git_add", sub: "stage an explicit file list" },
    { name: "git_reset", sub: "unstage everything" },
    { name: "git_commit", sub: "record with message" },
    { name: "git_log", sub: "history, with optional date filter" },
    { name: "git_show", sub: "inspect a specific revision" },
    { name: "git_branch", sub: "list local · remote · all" },
    { name: "git_create_branch", sub: "from current or specified base" },
    { name: "git_checkout", sub: "switch branches" },
  ],
  notes: [
    {
      condition: "shells out",
      body: "The server invokes the local git binary. Repo permissions are the OS user's git permissions — not separately gated.",
    },
  ],
  example: {
    lang: "bash",
    code: "uvx mcp-server-git --repository /path/to/repo",
    captions: [
      "uvx runs the server in a one-shot venv, no global install",
      "Pin the repository at launch — agent can't drift to a sibling tree",
    ],
  },
  install: {
    uvx: "uvx mcp-server-git",
    pip: "pip install mcp-server-git",
    docker: "docker run --rm -v $(pwd):/repo mcp/git --repository /repo",
  },
  worksWith: ["Claude Desktop · Claude Code", "Zed · Cursor · VS Code", "Any MCP client"],
};

export default config;
