import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "env-secret-exposure-analyzer",
  partTag: "ESEA",
  category: "security",
  nodes: ["repo", "analyzer", "findings"],
  purpose:
    "Scans projects for secret exposure risks (API keys, unprotected .env, logs) before an AI agent accidentally exfiltrates them.",
  stats: [
    ["20+", "patterns"],
    ["3", "risk levels"],
    ["Safe", "previews"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "secret exposure risks",
  repo: "https://github.com/vola-trebla/env-secret-exposure-analyzer-mcp",
  package: "env-secret-exposure-analyzer-mcp",
  license: "MIT",
  flow: {
    input: {
      label: "scan_for_secrets",
      sub: "← from agent",
    },
    steps: [
      {
        n: 1,
        name: "scan_fs",
        args: "path, patterns",
        body: "Recursively search the project for hardcoded keys (AWS, Stripe, OpenAI, etc.). Surfaces line numbers with masked values.",
        question: "“any keys exposed?”",
      },
      {
        n: 2,
        name: "check_gitignore",
        args: "target_files",
        body: "Cross-references discovered sensitive files (.env, .pem) with .gitignore rules to ensure they aren't staged for commit.",
        question: "“is it tracked by git?”",
        branch: {
          n: "!",
          name: "exposure_warning",
          condition: "if UNTRACKED",
          body: "CRITICAL warning: Sensitive file detected in workspace but missing from .gitignore.",
        },
      },
      {
        n: 3,
        name: "scan_logs",
        args: "log_calls",
        body: "Analyzes logging statements (console.log, logger.info) that might accidentally output process.env or credential objects.",
        question: "“leaking in logs?”",
      },
    ],
  },
  tools: [
    { name: "scan_for_secrets", sub: "bulk project scan" },
    { name: "check_gitignore_coverage", sub: "verify ignore rules" },
    { name: "scan_for_log_leaks", sub: "detect log exfiltration" },
  ],
  install: {
    npx: "npx env-secret-exposure-analyzer-mcp",
  },
  run: "claude mcp add analyzer npx -y env-secret-exposure-analyzer-mcp",
  worksWith: ["Claude Desktop", "Cursor · VS Code", "Any AI Agent"],
};

export default config;
