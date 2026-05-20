/* templates/enrich.js — Schematic Atlas auto-enrichment.
   ──────────────────────────────────────────────────────────────────────────
   Takes a sparse, README-shaped input and produces the rich AtlasConfig the
   renderer expects. The locked renderer (protocol-page.jsx) stays unchanged
   — enrichment is a pure function applied BEFORE rendering.

   PRINCIPLE: produce REAL density, not FAKE density.
   - Never invent tools that don't exist.
   - Never put words in the protocol's mouth (no fabricated tool descriptions).
   - Sections we synthesize are TAGGED with `inferred: true`. The renderer
     surfaces this as a small "// inferred" label so readers can trust the
     page.

   Runs in-browser via Babel; the same code transpiles cleanly to TypeScript
   if you want server-side ingestion in a build pipeline.

   ──────────────────────────────────────────────────────────────────────────
   FlatProtocolInput (what you feed in):

     {
       name:       string,          // REQUIRED. "env-secret-exposure-analyzer"
       purpose:    string,          // REQUIRED. one or more sentences; first wins
       repo?:      string,
       package?:   string,
       license?:   string,
       tools:      Array<{ name: string, sub?: string }>,    // FLAT list
       install?:   { [pkgmgr: string]: string },
       run?:       string,
       worksWith?: string[],
       // optional richer fields you can pass if you have them:
       warnings?:  string[],        // ["Don't run on production…", …]
       example?: {                  // a JSON/code snippet + 1-2 captions
         lang?: string,             // "json" | "ts" | "bash"
         code: string,
         captions?: string[],       // ["This is the output of foo()", …]
       },
       inputLabel?:  string,        // override the synthesized flow input box
       outputLabel?: string,        // override the synthesized flow output
       // total opt-out: pass a hand-authored flow and we won't synthesize one
       flow?: AtlasConfig['flow'],
     }
   ────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────── 1. CATEGORY KEYWORD TABLE ─────────────────────── */
/* Order matters: first match wins. Most specific patterns first. */
const CATEGORY_RULES = [
  { key: "comparison",  title: "Comparison",    icon: "filter",   blurb: "Side-by-side. Diffs, signatures, deltas.",
    keywords: ["compare", "diff", "correlate", "signature", "delta", "match_against"] },
  { key: "stream",      title: "Streaming",     icon: "stream",   blurb: "Long-lived. Push instead of pull.",
    keywords: ["stream", "watch", "subscribe", "tail", "follow", "listen"] },
  { key: "rendering",   title: "Rendering",     icon: "eye",      blurb: "Pictures, not data. Screenshots and snapshots.",
    keywords: ["screenshot", "image", "render", "snapshot", "capture", "thumbnail"] },
  { key: "performance", title: "Performance",   icon: "clock",    blurb: "Latency, timing, throughput.",
    keywords: ["perf", "latency", "timing", "bench", "profile", "anomaly", "throughput"] },
  { key: "diagnostics", title: "Diagnostics",   icon: "bug",      blurb: "Trace, log, debug output.",
    keywords: ["trace", "log", "debug", "report", "diagnose", "console", "stderr"] },
  { key: "analysis",    title: "Analysis",      icon: "bug",      blurb: "Inspect raw data and draw conclusions.",
    keywords: ["analyze", "detect", "race", "scan", "audit", "lint", "evaluate", "assess"] },
  { key: "mutation",    title: "Mutation",      icon: "tool",     blurb: "Change state. Write, update, delete.",
    keywords: ["write", "create", "update", "delete", "move", "rename", "set_", "apply", "fix", "patch", "suggest"] },
  { key: "execution",   title: "Execution",     icon: "play",     blurb: "Run something. Spawn processes, drive workloads.",
    keywords: ["run_", "execute", "spawn", "drive", "invoke", "exec_", "trigger", "replay"] },
  { key: "search",      title: "Search",        icon: "search",   blurb: "Locate. Pattern-match across content.",
    keywords: ["search", "find_", "grep", "match_", "query_", "lookup", "filter_"] },
  { key: "comparison_alt", title: "Comparison", icon: "filter",   blurb: "Side-by-side. Diffs, signatures, deltas.",
    keywords: ["baseline", "reconcile"] },
  { key: "config",      title: "Configuration", icon: "terminal", blurb: "Set up the run.",
    keywords: ["config", "load_", "parse_", "init_", "setup_", "configure"] },
  { key: "connection",  title: "Connection",    icon: "link",     blurb: "Open / close. Auth and session.",
    keywords: ["connect", "auth", "session", "link_", "open_", "disconnect", "handshake"] },
  { key: "export",      title: "Export",        icon: "arrow_right", blurb: "Hand off to the next system.",
    keywords: ["export", "emit_", "publish_", "upload_", "save_", "write_to", "dump_"] },
  { key: "inspection",  title: "Inspection",    icon: "eye",      blurb: "Read raw state. The starting point.",
    keywords: ["get_", "list_", "read_", "show_", "fetch_", "summary", "metadata", "inspect", "describe_", "check_", "validate_", "verify_"] },
];

/* normalise + dedupe rule keys (we used _alt above to keep grouping intent) */
function _ruleKey(rule) { return rule.key.replace(/_alt$/, ""); }

/* ─────────────────────── 2. CATEGORIZE ONE TOOL ─────────────────────── */
function categorizeOne(toolName) {
  const n = toolName.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => n.includes(kw))) {
      return { ...rule, key: _ruleKey(rule) };
    }
  }
  return null; // → goes to Misc bucket
}

/* ─────────────────────── 3. GROUP A FLAT TOOL LIST ───────────────────────
   After bucketing, fold singletons into a "Misc" group — but only if doing
   so leaves at least 2 multi-tool groups. Otherwise return a flat list.
   This prevents the "7 tiny groups for 9 tools" failure mode.
*/
function autoGroup(tools) {
  const bucketsByKey = new Map();
  for (const t of tools) {
    const cat = categorizeOne(t.name);
    const key = cat ? cat.key : "misc";
    if (!bucketsByKey.has(key)) {
      bucketsByKey.set(key, {
        key,
        title: cat ? cat.title : "Misc",
        icon: cat ? cat.icon : "tool",
        blurb: cat ? cat.blurb : "Everything else.",
        items: [],
      });
    }
    bucketsByKey.get(key).items.push(t);
  }
  // Preserve a deterministic order matching CATEGORY_RULES, then "misc" last.
  const orderedKeys = [...new Set(CATEGORY_RULES.map(_ruleKey))].concat(["misc"]);
  let groups = orderedKeys.map((k) => bucketsByKey.get(k)).filter(Boolean);

  // Coalesce 1-tool groups into Misc when there's still real structure left.
  const multi = groups.filter((g) => g.items.length >= 2);
  if (multi.length >= 2) {
    const singletons = groups.filter((g) => g.items.length < 2);
    if (singletons.length > 0) {
      const merged = [
        ...multi,
        {
          key: "misc",
          title: "Misc",
          icon: "tool",
          blurb: "Everything else \u2014 singletons that didn't fit a category.",
          items: singletons.flatMap((g) => g.items),
        },
      ];
      groups = merged;
    }
  }
  return groups;
}

/* ─────────────────────── 4. SYNTHESIZE A FLOW ──────────────────────────
   The "generic architectural" 3-step flow. Visible but honest: we only
   surface tools the protocol actually has, in roles inferred from category.
   If we can't find a sensible candidate for a slot, we skip the flow
   entirely (don't fake it).
*/
const FLOW_SLOTS = [
  { role: "ingest",   prefer: ["inspection", "config", "connection"],
    fallbackName: "load",      question: '"what to work on?"' },
  { role: "process",  prefer: ["analysis", "search", "mutation", "execution", "comparison", "stream"],
    fallbackName: "process",   question: '"what does it actually do?"' },
  { role: "emit",     prefer: ["export", "rendering", "mutation", "diagnostics"],
    fallbackName: "report",    question: '"how does the agent see it?"' },
];

function synthesizeFlow(input, groups) {
  if (input.flow) return input.flow; // user provided one, use it verbatim

  if (!input.tools || input.tools.length < 2) return null;

  // Build a quick lookup: category-key → list of tools.
  const byCat = new Map();
  for (const g of groups) byCat.set(g.key, g.items);

  // Pick one tool per slot. A tool can be picked at most once.
  const used = new Set();
  const steps = [];
  for (let i = 0; i < FLOW_SLOTS.length; i++) {
    const slot = FLOW_SLOTS[i];
    let chosen = null;
    for (const cat of slot.prefer) {
      const candidates = (byCat.get(cat) || []).filter((t) => !used.has(t.name));
      if (candidates.length > 0) {
        chosen = candidates[0];
        break;
      }
    }
    if (!chosen) continue;
    used.add(chosen.name);
    steps.push({
      n: i + 1,
      name: chosen.name,
      body: chosen.sub
        ? chosen.sub
        : `Picked as the ${slot.role} step. See the components index below for the full signature.`,
      question: slot.question,
    });
  }

  if (steps.length < 2) return null; // not enough to make a meaningful diagram

  return {
    input: {
      label: input.inputLabel || _inferInputLabel(input),
      sub: "← from agent / client",
    },
    steps,
    inferred: true, // tells the renderer to mark this section
  };
}

function _inferInputLabel(input) {
  // Single short noun. The input box is narrow; long labels wrap badly.
  const n = (input.name || "").toLowerCase();
  if (/trace/.test(n)) return "trace.zip";
  if (/log/.test(n)) return "log";
  if (/secret|env|leak/.test(n)) return "repo";
  if (/grep|search/.test(n)) return "query";
  if (/bench/.test(n)) return "scenario";
  if (/diff/.test(n)) return "files";
  if (/render|screenshot|image|page/.test(n)) return "page";
  if (/db|sql|query/.test(n)) return "query";
  if (/auth/.test(n)) return "credentials";
  return "input";
}

/* ─────────────────────── 5. STATS INFERENCE ─────────────────────── */
function inferStats(input, groups) {
  if (input.stats && input.stats.length > 0) return input.stats; // honor caller

  const stats = [];
  if (input.tools && input.tools.length) {
    stats.push([String(input.tools.length), "tools"]);
  }
  // Only show a "groups" stat if we'd render groups (≥ 2 multi-tool buckets).
  const multi = (groups || []).filter((g) => g.items.length >= 2);
  if (multi.length >= 2) {
    stats.push([String(multi.length), "groups"]);
  }
  if (input.worksWith && input.worksWith.length) {
    stats.push([String(input.worksWith.length), "integrations"]);
  }
  if (input.license) {
    stats.push([input.license, "license"]);
  }
  return stats.slice(0, 4);
}

/* ─────────────────────── 6. AUTO-DETECT HIGHLIGHT ─────────────────────── */
/* Pick the most "noun-like" word from the purpose — usually a quoted code
   span, a filename, a capitalised acronym, or a key technical term.
*/
function inferHighlight(purpose) {
  if (!purpose) return null;
  // 1. anything in backticks
  const tick = purpose.match(/`([^`]+)`/);
  if (tick) return tick[1];
  // 2. filename-like token (foo.zip, bar.json)
  const file = purpose.match(/\b([a-z][a-z0-9_-]*\.[a-z0-9]{2,5})\b/i);
  if (file) return file[1];
  // 3. ALL-CAPS or CamelCase token of length 3+
  const caps = purpose.match(/\b([A-Z]{3,}|[A-Z][a-z]+(?:[A-Z][a-z]+){1,})\b/);
  if (caps) return caps[1];
  return null;
}

/* ─────────────────────── 7. MAIN: enrich(input) → AtlasConfig ─────────────────────── */
function enrich(input) {
  const tools = input.tools || [];
  const grouped = autoGroup(tools);
  const useGroups = grouped.length >= 2;

  const flow = synthesizeFlow(input, grouped);

  // Decide whether to render `groups` or `tools` flat. Threshold: at least
  // ONE group must have 2+ tools — otherwise a flat list reads better.
  let renderGroups = null;
  let renderTools = null;
  const multiTooled = grouped.filter((g) => g.items.length >= 2);
  if (useGroups && tools.length >= 4 && multiTooled.length >= 1) {
    renderGroups = grouped.map((g) => ({
      ...g,
      inferred: true, // mark as auto-categorized
    }));
  } else if (tools.length > 0) {
    renderTools = tools;
  }

  // Warnings → notes section.
  const notes = (input.warnings || []).map((w, i) => ({
    n: i + 1,
    body: w,
  }));

  // Worked example.
  const example = input.example || null;

  return {
    name: input.name,
    partTag: input.partTag,
    purpose: _firstSentence(input.purpose),
    highlight: input.highlight || inferHighlight(input.purpose),
    repo: input.repo,
    package: input.package,
    license: input.license,
    stats: inferStats(input, grouped),
    flow,
    groups: renderGroups,
    tools: renderTools,
    notes: notes.length ? notes : null,
    example,
    install: input.install,
    run: input.run,
    worksWith: input.worksWith,
    // metadata: how much of this was inferred?
    _enrichment: {
      flowInferred: !!(flow && flow.inferred),
      groupsInferred: !!renderGroups,
      statsInferred: !input.stats,
      highlightInferred: !input.highlight,
    },
  };
}

function _firstSentence(s) {
  if (!s) return s;
  // Split on period followed by space + capital letter. Don't split on .ts / .zip / .json.
  const m = s.match(/^(.*?[.!?])(\s+[A-Z]|$)/);
  return m ? m[1].trim() : s.trim();
}

/* ─────────────────────── 8. PARSE A README → FlatProtocolInput ───────────────────────
   Best-effort markdown parser. Pulls common patterns: name (first H1), purpose
   (first paragraph), tool list (bullet items under "Tools" / "API" /
   "Available tools" heading), warnings (callouts), install fences.
   Strict mode would refuse to render anything not extracted — but here we
   produce a partial input the human reviews + completes.
*/
function parseReadme(markdown) {
  if (!markdown) return null;
  const out = { tools: [], warnings: [] };

  // name: first H1
  const h1 = markdown.match(/^#\s+(.+)$/m);
  if (h1) out.name = h1[1].trim();

  // purpose: first paragraph after H1
  const purposeMatch = markdown.match(/^#\s+.+\n+([^\n#].+(?:\n[^\n#].+)*)/m);
  if (purposeMatch) out.purpose = purposeMatch[1].replace(/\s+/g, " ").trim();

  // tools: bullets under any of these headings
  const toolsHeadingRegex = /^#{2,4}\s+(tools|api|available tools|commands|methods)\s*$/gim;
  let m;
  while ((m = toolsHeadingRegex.exec(markdown))) {
    const after = markdown.slice(m.index + m[0].length);
    const block = after.match(/^([\s\S]*?)(?=^#{1,4}\s|\Z)/m);
    if (!block) continue;
    const bullets = block[1].match(/^[-*+]\s+`?([a-z_][a-z0-9_]*)`?(?:\s*[—:-]\s*(.+))?$/gim) || [];
    for (const bullet of bullets) {
      const parts = bullet.match(/^[-*+]\s+`?([a-z_][a-z0-9_]*)`?(?:\s*[—:-]\s*(.+))?/i);
      if (parts) out.tools.push({ name: parts[1], sub: parts[2] ? parts[2].trim() : undefined });
    }
  }

  // warnings: blockquotes that start with Warning / Note / Caveat / Limitation
  const warnRegex = /^>\s*(?:\*\*)?(?:warning|caveat|limitation|note)(?:\*\*)?:?\s*(.+(?:\n>\s*.+)*)/gim;
  while ((m = warnRegex.exec(markdown))) {
    out.warnings.push(m[1].replace(/\n>\s*/g, " ").trim());
  }

  // install: fenced code block right after an "Install" or "Setup" heading
  const installHeading = markdown.match(/^#{1,4}\s+(install(ation)?|setup|getting started)\s*$/im);
  if (installHeading) {
    const after = markdown.slice(installHeading.index + installHeading[0].length);
    const fence = after.match(/```(?:bash|sh|shell|zsh)?\n([\s\S]*?)```/);
    if (fence) {
      const cmd = fence[1].trim().split("\n")[0].replace(/^\$\s*/, "");
      const pkgmgr = /^(npm|pnpm|yarn|bun|cargo|brew|pip|uv|poetry|go)/i.exec(cmd);
      if (pkgmgr) out.install = { [pkgmgr[1].toLowerCase()]: cmd };
    }
  }

  // license: footer
  const license = markdown.match(/^#{1,4}\s+license\s*$\n+([^\n]+)/im);
  if (license) {
    const tok = license[1].match(/\b(MIT|Apache-?2\.0|BSD-?[23]?|GPL-?[23]?|ISC|MPL-?2\.0|CC0)\b/i);
    if (tok) out.license = tok[1].toUpperCase().replace("APACHE2.0", "Apache-2.0");
  }

  if (!out.warnings.length) delete out.warnings;
  if (!out.tools.length) delete out.tools;
  return out;
}

Object.assign(window, { enrich, parseReadme, autoGroup, categorizeOne });

/* Node / CommonJS export so this same file can be used as a real CLI build
   tool (e.g. `node cli/enrich.mjs README.md > config.json`). The browser
   doesn't see `module`, so the guard keeps both runtimes happy. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { enrich, parseReadme, autoGroup, categorizeOne };
}
