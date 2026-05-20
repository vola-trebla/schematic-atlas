#!/usr/bin/env node
/* templates/enrich-cli.mjs
   ──────────────────────────────────────────────────────────────────────────
   Node CLI wrapper around enrich.js. The hybrid-workflow build step:

     node enrich-cli.mjs flat-input.json > rich-config.json

   The output is a complete CONFIG object ready to be pasted into the
   CONFIG block of a fresh templates/protocol-page.html. After pasting,
   hand-author the 10% the script can't write — specific margin
   annotations, custom red stamps, nuanced captions.

   Round-trip: a hand-authored rich config that you previously generated
   from this tool is just a normal CONFIG. The renderer doesn't know or
   care which path it came from.
   ────────────────────────────────────────────────────────────────────────── */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load enrich.js. It's written for the browser (assigns to `window`); we
// shim a minimal `window` so the same source works under Node.
globalThis.window = globalThis.window || globalThis;
const enrichSource = fs.readFileSync(path.join(__dirname, "enrich.js"), "utf8");
new Function(enrichSource).call(globalThis);

const { enrich, parseReadme } = globalThis;

function usage() {
  console.error(`Schematic Atlas \u2014 enrich CLI

Usage:
  node enrich-cli.mjs <input.json>            Read JSON, output rich config
  node enrich-cli.mjs --readme <README.md>    Best-effort README \u2192 flat input \u2192 rich config
  node enrich-cli.mjs --help                  This message

Tip: pipe the output into a file, then paste its contents into the
CONFIG block of a fresh templates/protocol-page.html. After pasting,
hand-author the 10% the script can't write.`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  usage();
  process.exit(args.length === 0 ? 1 : 0);
}

let flat;
try {
  if (args[0] === "--readme") {
    if (!args[1]) { usage(); process.exit(1); }
    const md = fs.readFileSync(args[1], "utf8");
    flat = parseReadme(md);
    if (!flat || !flat.name) {
      console.error("Could not extract a name from the README. Fill in a flat input by hand instead.");
      process.exit(2);
    }
  } else {
    const raw = fs.readFileSync(args[0], "utf8");
    flat = JSON.parse(raw);
  }
} catch (e) {
  console.error(`Failed to load input: ${e.message}`);
  process.exit(2);
}

const rich = enrich(flat);
delete rich._enrichment;   // strip internal metadata; reviewer doesn't want noise
process.stdout.write(JSON.stringify(rich, null, 2) + "\n");
