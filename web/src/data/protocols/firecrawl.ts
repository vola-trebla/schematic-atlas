import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "firecrawl",
  partTag: "FIRE",
  category: "web",
  nodes: ["URL", "firecrawl", "structured"],
  purpose:
    "Web scraping and crawling as MCP — single-page scrape, multi-page crawl, full-site map, search, and LLM-driven structured extraction with JSON-schema output.",
  stats: [
    ["9", "MCP tools"],
    ["JS-rendered", "scrape mode"],
    ["JSON schema", "extract output"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "JSON-schema output",
  repo: "https://github.com/mendableai/firecrawl-mcp-server",
  package: "firecrawl-mcp",
  license: "MIT",
  flow: {
    input: {
      label: "agent intent",
      sub: "← 'pull all blog posts as markdown'",
    },
    steps: [
      {
        n: 1,
        name: "intent: known URLs or unknown?",
        body: "Single page agent already has → scrape. Multiple URLs known → batch_scrape. URLs unknown but site is → map or crawl. Unsure where the info lives → search.",
        question: '"do I have the URLs?"',
      },
      {
        n: 2,
        name: "firecrawl_scrape · crawl · map · search",
        args: "url(s), formats?, schema?",
        body: "scrape one, batch_scrape many, map discovers URLs, crawl follows links with depth limits, search runs a web query first. Each returns markdown by default; pass formats to get HTML/links/screenshot.",
        question: '"which collection mode?"',
        branch: {
          n: "!",
          name: "structured extraction",
          condition: "if specific fields needed",
          body: "Use firecrawl_extract with a JSON schema instead of scrape-then-parse. LLM extraction runs server-side and returns typed data — agent skips the parsing dance entirely.",
        },
      },
      {
        n: 3,
        name: "poll status",
        args: "id (for batch_scrape · crawl)",
        body: "Long-running ops (batch_scrape, crawl) return a job ID. Agent polls check_batch_status / check_crawl_status until complete — keeps the agent unblocked while pages stream in.",
        question: '"done yet?"',
      },
    ],
  },
  groups: [
    {
      key: "scrape",
      title: "Scrape",
      icon: "eye",
      blurb: "Pull content from URLs you already have. Single-page or batch.",
      items: [
        { name: "firecrawl_scrape", sub: "one URL → markdown / HTML / links / screenshot" },
        { name: "firecrawl_batch_scrape", sub: "many URLs in parallel, returns job ID" },
        { name: "firecrawl_check_batch_status", sub: "poll job for completion" },
      ],
    },
    {
      key: "discover",
      title: "Discover",
      icon: "search",
      blurb: "Find URLs when the agent doesn't have them yet.",
      items: [
        { name: "firecrawl_map", sub: "list all URLs on a site, fast" },
        { name: "firecrawl_search", sub: "web search → ranked results" },
        { name: "firecrawl_crawl", sub: "follow links with depth + count limits" },
        { name: "firecrawl_check_crawl_status", sub: "poll crawl job" },
      ],
    },
    {
      key: "extract",
      title: "Extract",
      icon: "tool",
      blurb: "LLM-driven structured extraction — skip the parsing dance.",
      items: [{ name: "firecrawl_extract", sub: "URLs + JSON schema → typed structured data" }],
    },
  ],
  notes: [
    {
      condition: "API key gated",
      body: "Cloud mode needs FIRECRAWL_API_KEY. Self-hosted mode points at a local Firecrawl instance via FIRECRAWL_API_URL — same MCP surface, different backend.",
    },
    {
      condition: "rate limits per tier",
      body: "Free tier has tight per-minute caps; the server retries on 429 with exponential backoff. Long crawls + batch_scrape should be expected to take minutes — design agent prompts around async polling, not blocking calls.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "firecrawl": {\n      "command": "npx",\n      "args": ["-y", "firecrawl-mcp"],\n      "env": { "FIRECRAWL_API_KEY": "fc-..." }\n    }\n  }\n}',
    captions: [
      "API key in env — never inline in args",
      "Self-host? Set FIRECRAWL_API_URL=http://localhost:3002 to point at your instance",
    ],
  },
  install: {
    npx: "npx -y firecrawl-mcp",
    docker: "docker run -e FIRECRAWL_API_KEY mendableai/firecrawl-mcp",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · Windsurf · VS Code", "Any MCP client"],
};

export default config;
