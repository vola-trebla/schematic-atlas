import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "puppeteer",
  partTag: "PUPPET",
  category: "browser",
  nodes: ["agent", "puppeteer", "DOM"],
  purpose:
    "Drives a headless Chrome through Puppeteer — navigate, click, fill, screenshot, and execute JavaScript on any page from inside an agent loop.",
  stats: [
    ["7", "MCP tools"],
    ["headless", "default mode"],
    ["dangerous", "args gated"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "headless Chrome",
  repo: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer",
  package: "@modelcontextprotocol/server-puppeteer",
  license: "MIT",
  flow: {
    input: {
      label: "URL + intent",
      sub: "← 'fill the signup form'",
    },
    steps: [
      {
        n: 1,
        name: "puppeteer_navigate",
        args: "url, launchOptions?",
        body: "Launches headless Chrome and goes to the URL. launchOptions tweak the browser — window size, user-data-dir, viewport. Default-safe; dangerous flags are gated.",
        question: '"page loaded?"',
        branch: {
          n: "!",
          name: "dangerous flags",
          condition: "if --no-sandbox etc",
          body: "Server throws when launchOptions includes --no-sandbox, --disable-web-security, or other security-relaxing flags unless allowDangerous: true. Default-deny — agent has to be explicit about reduced sandboxing.",
        },
      },
      {
        n: 2,
        name: "puppeteer_screenshot · puppeteer_evaluate",
        args: "name, selector? / script",
        body: "Observe the page — screenshot for visual confirmation, evaluate to extract structured data via DOM queries. Pick based on whether the agent needs visual or data.",
        question: '"what does the page show?"',
      },
      {
        n: 3,
        name: "puppeteer_click · fill · select · hover",
        args: "selector, value?",
        body: "Interact via CSS selectors. The browser tab persists across calls — the agent builds up state by sequencing actions. No page refresh between calls unless triggered.",
        question: '"what to interact with?"',
      },
    ],
  },
  tools: [
    { name: "puppeteer_navigate", sub: "URL + launchOptions, allowDangerous gate" },
    { name: "puppeteer_screenshot", sub: "full page or selector, base64 mode" },
    { name: "puppeteer_click", sub: "CSS selector → click event" },
    { name: "puppeteer_hover", sub: "CSS selector → hover event" },
    { name: "puppeteer_fill", sub: "input fields by selector" },
    { name: "puppeteer_select", sub: "SELECT element by value" },
    { name: "puppeteer_evaluate", sub: "run JavaScript in the page context" },
  ],
  notes: [
    {
      condition: "tab persists",
      body: "One browser tab survives across calls within a session. The agent builds state incrementally — navigate once, then click + fill + evaluate without re-loading.",
    },
    {
      condition: "selector brittleness",
      body: "All interactions use raw CSS selectors. Pages with dynamic class names (Tailwind hash classes, CSS-in-JS) need stable data-* attributes — the agent can't reason about generated names.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "puppeteer": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]\n    }\n  }\n}',
    captions: [
      "First call spins up Chrome — subsequent calls reuse the same browser",
      "Add allowDangerous: true in launchOptions only when you really need it",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-puppeteer",
    docker: "docker run -i --rm --init -e DOCKER_CONTAINER=true mcp/puppeteer",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
