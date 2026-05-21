import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "github",
  partTag: "GH",
  category: "version-control",
  nodes: ["agent", "github", "repos"],
  purpose:
    "Wraps the GitHub API as MCP — letting an agent read repos, triage issues and PRs, watch Actions runs, and act on Dependabot or code-scanning alerts.",
  stats: [
    ["18", "toolsets"],
    ["read-only", "mode available"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "GitHub API as MCP",
  repo: "https://github.com/github/github-mcp-server",
  license: "MIT",
  flow: {
    input: {
      label: "agent intent",
      sub: "← 'triage open PRs'",
    },
    steps: [
      {
        n: 1,
        name: "context",
        body: "First call — agent asks who am I, what repo am I in, which branch. Strongly recommended as the default-on toolset; it grounds every subsequent action.",
        question: '"what\'s my scope?"',
      },
      {
        n: 2,
        name: "fetch (scoped toolset)",
        args: "e.g. list_pull_requests, get_issue, list_workflow_runs",
        body: "Reads happen through scoped toolsets — agent pulls just the slice it needs (PRs, issues, runs, scans) rather than the entire API surface.",
        question: '"what\'s the current state?"',
      },
      {
        n: 3,
        name: "act (mutation)",
        args: "e.g. create_pull_request_comment, update_issue",
        body: "Writes are scoped to enabled toolsets and authenticated via PAT or OAuth. Token scopes are the hard ceiling — the agent can't exceed them.",
        question: '"what needs changing?"',
        branch: {
          n: "!",
          name: "read-only mode",
          condition: "if --read-only",
          body: "All mutating tools are stripped from the surface at server startup. The agent literally cannot call them — safer than relying on prompt-level discipline.",
        },
      },
    ],
  },
  tools: [
    { name: "context", sub: "current user + repo — strongly recommended on" },
    { name: "repos", sub: "browse files, branches, commits" },
    { name: "pull_requests", sub: "list · review · comment" },
    { name: "issues", sub: "create · update · triage" },
    { name: "actions", sub: "workflow runs, build logs" },
    { name: "code_security", sub: "code-scanning alerts" },
    { name: "dependabot", sub: "vulnerability alerts" },
    { name: "secret_protection", sub: "leaked credentials" },
    { name: "security_advisories", sub: "CVE feed for your deps" },
    { name: "discussions", sub: "repo + org discussions" },
    { name: "notifications", sub: "inbox" },
    { name: "projects", sub: "boards, items, fields" },
    { name: "orgs", sub: "org-level operations" },
    { name: "labels", sub: "issue / PR labels" },
    { name: "users", sub: "user lookup" },
    { name: "gists", sub: "personal snippets" },
    { name: "stargazers", sub: "who starred" },
    { name: "copilot", sub: "Copilot-specific tools" },
  ],
  notes: [
    {
      condition: "tokenized access",
      body: "Requires a GitHub PAT (or OAuth via the remote server). Token scopes determine which toolsets even respond — the agent gets a 401 long before it gets a security incident.",
    },
    {
      condition: "lockdown mode",
      body: "Pair --read-only with a per-tool allow-list to pin the agent to a narrow surface (e.g. only get_issue and list_pull_requests). Useful for autonomous triage runs.",
    },
  ],
  example: {
    lang: "bash",
    code: "export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...\ndocker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN \\\n  ghcr.io/github/github-mcp-server",
    captions: [
      "Token in env, never on the command line",
      "Docker keeps the binary off the host — remote MCP is the next step up",
    ],
  },
  install: {
    docker: "docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server",
    homebrew: "brew install github-mcp-server",
    remote: "https://api.githubcopilot.com/mcp/ (OAuth)",
  },
  worksWith: ["VS Code · Claude Desktop", "Cursor · Zed", "Any MCP client"],
};

export default config;
