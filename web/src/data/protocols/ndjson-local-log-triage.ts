import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "ndjson-local-log-triage",
  partTag: "TRIAGE",
  category: "debugging",
  nodes: ["log.ndjson", "triage", "anomalies"],
  purpose:
    "Lets an agent triage huge NDJSON log files — stream-parsed, never loaded into memory, with Z-score anomaly detection and adaptive severity timelines.",
  stats: [
    ["8", "MCP tools"],
    ["streaming", "parse mode"],
    ["Z-score", "anomaly stat"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "stream-parsed, never loaded into memory",
  repo: "https://github.com/vola-trebla/ndjson-local-log-triage-mcp",
  package: "ndjson-local-log-triage-mcp",
  license: "MIT",
  flow: {
    input: {
      label: "app.log.ndjson",
      sub: "← 2GB, agent must triage",
    },
    steps: [
      {
        n: 1,
        name: "summarize_log_timeline",
        args: "file, window, adaptive?",
        body: "First probe — chronological aggregation of errors / warnings / info counts per time window. adaptive: true auto-scales bucket size and re-zooms 10× at the peak. Reveals where the incident sits without reading raw entries.",
        question: '"when did things go wrong?"',
      },
      {
        n: 2,
        name: "detect_error_anomalies",
        args: "file, window, zScoreCutoff",
        body: "Buckets errors by time window, computes mean + stdDev across the file, flags windows where the rate is anomalously high. Z-score cutoff is the dial — typical 2.0 catches real spikes, 3.0 only catches loud ones.",
        question: '"is the spike real or just noise?"',
      },
      {
        n: 3,
        name: "query_log_pattern",
        args: "file, field, pattern, lineStartPattern?",
        body: "Stream-filters entries matching a field/value at the suspect timestamp. Returns up to N matches without scanning the rest of the file.",
        question: '"which entries actually fired?"',
        branch: {
          n: "!",
          name: "multiline traces",
          condition: "if logs include stack traces",
          body: "Default parser drops lines that don't parse as JSON — multiline stack traces vanish silently. Pass lineStartPattern (e.g. ^{) so the streamer knows where each entry begins.",
        },
      },
    ],
  },
  tools: [
    { name: "query_log_pattern", sub: "stream-filter by field/value, multiline-aware" },
    { name: "detect_error_anomalies", sub: "Z-score frequency analysis per window" },
    { name: "summarize_log_timeline", sub: "severity counts per window, adaptive zoom" },
    { name: "correlate_request", sub: "reconstruct distributed trace by trace_id" },
    { name: "discover_log_schema", sub: "infer wrapper format + per-key type schema" },
    { name: "group_semantic_patterns", sub: "cluster templates via Drain algorithm" },
    { name: "start_live_triage", sub: "tail with real-time anomaly alerting" },
    {
      name: "query_external_logs",
      sub: "Datadog · Splunk · ES → OpenTelemetry Log Data Model",
    },
  ],
  notes: [
    {
      condition: "memory-flat",
      body: "Stream-parses line by line — works on 2GB+ files where read_text_file would OOM the agent. Memory stays flat regardless of file size; throughput is the only cost.",
    },
    {
      condition: "JSON-RPC push",
      body: "start_live_triage emits notifications/triage events directly over the JSON-RPC channel. The agent gets pushed alerts on anomaly thresholds — no polling, no busy-wait.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "log-triage": {\n      "command": "npx",\n      "args": ["-y", "ndjson-local-log-triage-mcp"]\n    }\n  }\n}',
    captions: [
      "Standard MCP config — works in any client",
      "Then point it at a log file and ask: 'where's the spike?'",
    ],
  },
  install: {
    npx: "npx -y ndjson-local-log-triage-mcp",
    npm: "npm install -g ndjson-local-log-triage-mcp",
  },
  worksWith: [
    "Claude Desktop · Claude Code",
    "Cursor · VS Code",
    "NDJSON · Syslog · Kubernetes logs",
  ],
};

export default config;
