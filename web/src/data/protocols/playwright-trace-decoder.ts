import type { ProtocolConfig } from "../../types/protocol";

const config: ProtocolConfig = {
  name: "playwright-trace-decoder",
  partTag: "TRACE",
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
        question: '"what failed?"',
      },
      {
        n: 2,
        name: "get_causal_chain_for_failure",
        args: "trace_path, lookback_ms?",
        body: "Walks backwards from the failed action and threads together preceding actions, network errors, and console errors (default window: 5 s).",
        question: '"what led up to it?"',
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
        question: '"what did the page look like?"',
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
        question: '"what changed right before the failure?"',
      },
      {
        n: 6,
        name: "analyze_race_conditions",
        args: "trace_path",
        body: "Network requests that were still in-flight when an interaction or assertion fired.",
        question: '"was a fetch still pending?"',
      },
      {
        n: 7,
        name: "correlate_dom_and_network",
        args: "trace_path",
        body: "Joins the HAR log with DOM snapshots. For each action where a fetch completed and the DOM mutated within ±100 ms: triggering URL, response status, body snippet, and the nodes added/removed.",
        question: '"which fetch caused which DOM change?"',
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
};

export default config;
