import type { ProtocolConfig } from "../types/protocol";

export const PROTOCOLS: Record<string, ProtocolConfig> = {
  context7: {
    name: "context7",
    category: "documentation",
    nodes: ["query", "context7", "LLM context"],
    purpose:
      "Up-to-date documentation and code examples as a service for LLMs, eliminating hallucinations by providing fresh data from source.",
    highlight: "eliminating hallucinations",
    repo: "https://github.com/upstash/context7",
    package: "@upstash/context7",
    license: "MIT",
    stats: [
      ["5", "tools"],
      ["2", "groups"],
      ["4", "clients"],
      ["MIT", "license"],
    ],
    flow: {
      input: {
        label: "user query",
        sub: "← 'use context7'",
      },
      steps: [
        {
          n: 1,
          name: "lookup_library",
          body: "Match library name to unique Context7 index ID.",
          question: '"which library?"',
        },
        {
          n: 2,
          name: "fetch_live_source",
          body: "Crawl primary sources or fetch from Upstash cache.",
          question: '"is it fresh?"',
        },
        {
          n: 3,
          name: "query_documentation",
          body: "Inject snippets directly into the LLM context.",
          question: '"what to inject?"',
        },
      ],
    },
    groups: [
      {
        key: "search",
        title: "Search",
        icon: "search",
        blurb: "Locate. Pattern-match across content.",
        items: [
          { name: "lookup_library", sub: "resolve name to unique ID" },
          { name: "query_documentation", sub: "fetch snippets by ID" },
        ],
      },
      {
        key: "config",
        title: "Configuration",
        icon: "terminal",
        blurb: "Set up the run.",
        items: [
          { name: "setup_context", sub: "initialize environment" },
          { name: "configure_credentials", sub: "manage API keys" },
        ],
      },
      {
        key: "misc",
        title: "Misc",
        icon: "tool",
        blurb: "Support tools.",
        items: [{ name: "fetch_live_source", sub: "crawl primary sources" }],
      },
    ],
    notes: [
      {
        body: "API Key Recommended. Get a free key at context7.com for higher rate limits.",
        condition: "rate-limit",
      },
    ],
    example: {
      lang: "bash",
      code: 'npx ctx7 setup --cursor\nctx7 library supabase\nctx7 docs /supabase/docs "how to auth?"',
      captions: ["Setup is one-time", "Search for the lib ID first", "Then query the docs"],
    },
    install: {
      npx: "npx ctx7 setup",
    },
    run: "ctx7 library lodash",
    worksWith: ["Cursor · Claude Code", "Cline · RooCode", "Any MCP Client"],
  },
  "env-secret-exposure-analyzer": {
    name: "env-secret-exposure-analyzer",
    partTag: "S.02",
    category: "security",
    nodes: ["repo", "analyzer", "findings"],
    purpose:
      "Scans projects for secret exposure risks (API keys, unprotected .env, logs) before an AI agent accidentally exfiltrates them.",
    highlight: "secret exposure risks",
    repo: "https://github.com/vola-trebla/env-secret-exposure-analyzer-mcp",
    package: "env-secret-exposure-analyzer-mcp",
    license: "MIT",
    stats: [
      ["20+", "patterns"],
      ["3", "risk levels"],
      ["Safe", "previews"],
    ],
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
  },
  "playwright-trace-decoder": {
    name: "playwright-trace-decoder",
    partTag: "T.04",
    category: "testing",
    nodes: ["trace.zip", "decoder", "agent"],
    purpose:
      "An MCP server that turns Playwright trace.zip into structured signal for AI-driven failure analysis.",
    highlight: "trace.zip",
    repo: "https://github.com/vola-trebla/playwright-trace-decoder-mcp",
    package: "playwright-trace-decoder-mcp",
    license: "MIT",
    stats: [
      ["16", "tools"],
      ["~90%", "fewer tokens"],
      ["LRU 50", "cache"],
    ],
    flow: {
      input: {
        label: "trace.zip",
        sub: "← from CI",
      },
      steps: [
        {
          n: 1,
          name: "get_trace_summary",
          args: "trace_path",
          body: "The first call. Returns the failing action, the top-level error, and total action count.",
          question: "“what failed?”",
        },
        {
          n: 2,
          name: "get_causal_chain_for_failure",
          args: "trace_path, lookback_ms?",
          body: "Walks backwards from the failed action and threads together preceding actions, network errors, and console errors (default window: 5 s).",
          question: "“what led up to it?”",
          branch: {
            n: 8,
            name: "compare_traces",
            condition: "if flaky",
            body: "LCS-aligned diff of a passing run vs the failing one. Surfaces structural divergence + timing anomalies > 500 ms.",
          },
        },
        {
          n: 3,
          name: "get_aria_accessibility_tree",
          args: "trace_path, action_index?",
          body: "The DOM as compact YAML — ~90% fewer tokens than raw HTML. Defaults to the snapshot at the failing action.",
          question: "“what did the page look like?”",
          branch: {
            n: 4,
            name: "get_screenshot_at_failure",
            condition: "if ARIA empty",
            body: "Base64 JPEG closest to the failure. Use when the page was blank — captcha, error page, unexpected redirect.",
          },
        },
        {
          n: 5,
          name: "get_dom_mutation_delta",
          args: "trace_path, action_index",
          body: "A set-diff of ARIA lines before vs after a specific action. Added / removed elements only — not two full DOM dumps.",
          question: "“what changed right before the failure?”",
        },
        {
          n: 6,
          name: "analyze_race_conditions",
          args: "trace_path",
          body: "Network requests that were still in-flight when an interaction or assertion fired.",
          question: "“was a fetch still pending?”",
        },
        {
          n: 7,
          name: "correlate_dom_and_network",
          args: "trace_path",
          body: "Joins the HAR log with DOM snapshots. For each action where a fetch completed and the DOM mutated within ±100 ms: triggering URL, response status, body snippet, and the nodes added/removed.",
          question: "“which fetch caused which DOM change?”",
          branch: {
            n: 9,
            name: "detect_performance_anomalies",
            condition: "if timeout, no js error",
            body: "Ranks slow actions + frame drops with a suspected_cause: main_thread_blocked / network_saturation / timeout_or_navigation.",
          },
        },
      ],
    },
    groups: [
      {
        key: "inspection",
        title: "Inspection",
        icon: "eye",
        blurb: "Read raw trace data. The starting point.",
        items: [
          { name: "get_test_metadata", sub: "browser · platform · viewport · title" },
          { name: "get_trace_summary", sub: "failing action + error + count" },
          { name: "get_action_timeline", sub: "paginated · API names + locators + timings" },
          { name: "get_filtered_network_logs", sub: "only 4xx/5xx · static assets stripped" },
          { name: "get_console_errors", sub: "JS exceptions + warnings" },
          { name: "get_element_state_at_failure", sub: "failing locator + before/after metadata" },
          {
            name: "extract_trace_metadata_strict",
            sub: "format version · HAR mode · retry sessions",
          },
        ],
      },
      {
        key: "dom",
        title: "DOM / UI",
        icon: "search",
        blurb: "What did the page actually look like and how did it change?",
        items: [
          { name: "get_aria_accessibility_tree", sub: "ARIA → YAML · ~90% fewer tokens" },
          { name: "get_dom_mutation_delta", sub: "set-diff before vs after action" },
          { name: "get_screenshot_at_failure", sub: "base64 JPEG · walk full timeline" },
          { name: "analyze_race_conditions", sub: "in-flight requests at assertion time" },
          { name: "correlate_dom_and_network", sub: "join HAR + DOM within ±100 ms" },
        ],
      },
      {
        key: "rca",
        title: "Root-cause",
        icon: "bug",
        blurb: "From signal to cause. Group failures, compare runs.",
        items: [
          { name: "get_causal_chain_for_failure", sub: "chronological lookback (default 5 s)" },
          { name: "generate_error_signature", sub: "stable 12-char SHA-1 · group duplicates" },
          { name: "compare_traces", sub: "LCS-aligned passing vs failing diff" },
        ],
      },
      {
        key: "perf",
        title: "Performance",
        icon: "clock",
        blurb: "When the timeout has no JS error attached.",
        items: [
          { name: "detect_performance_anomalies", sub: "p50/p95 · frame drops · suspected cause" },
        ],
      },
    ],
    install: {
      npm: "npm install playwright-trace-decoder-mcp",
      git: "git clone … && npm i && npm run build",
    },
    run: "claude mcp add playwright-trace-decoder node /…/dist/index.js",
    worksWith: ["Claude Desktop", "Cursor · VS Code", "Claude Code", "Docker"],
  },
  "mcp-grep": {
    name: "mcp-grep",
    partTag: "T.01",
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
          question: "“what to search?”",
        },
        {
          n: 2,
          name: "spawn_ripgrep",
          args: "argv",
          body: "Fork ripgrep with line-buffered stdout. The shim never reads the index itself — ripgrep is the source of truth.",
          question: "“who scans?”",
        },
        {
          n: 3,
          name: "stream_matches",
          args: "stdout",
          body: "Each match line becomes one MCP content chunk: file, line, column, snippet. First match returns before the last file is scanned.",
          question: "“how does the agent see it?”",
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
  },
  "sqlite-mcp": {
    name: "sqlite-mcp",
    partTag: "P.01",
    category: "persistence",
    nodes: ["query", "sqlite-mcp", "database"],
    purpose:
      "Provides read/write access to local SQLite databases with safe query execution and schema inspection.",
    highlight: "SQLite databases",
    stats: [
      ["v0.4.2", "stable"],
      ["Local", "type"],
    ],
    tools: [
      { name: "query", sub: "Execute SQL read/write" },
      { name: "list_tables", sub: "Get schema overview" },
    ],
    install: {
      npm: "npm install -g @modelcontextprotocol/server-sqlite",
    },
  },
};
