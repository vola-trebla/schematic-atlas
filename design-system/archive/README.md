# `archive/` — earlier brand exploration

The first two iterations of this system mocked up **fictional product
microsites**:

- `archive/ui_kits/mcp-tool-site/` — a marketing-and-docs landing page for
  a hypothetical product called "Schematic" (a fake MCP inspector).
- `archive/ui_kits/mcp-inspector/` — a 3-pane debugger UI for the same
  fictional product.

These were useful **brand exploration** — they helped land the visual
language (paper, ink, dimension lines, callouts, hatching shadows). But
the product was wrong: a deep multi-page microsite per repo doesn't scale,
and the marketing voice ("Get started in minutes") is the opposite of the
catalog's intent.

The actual product is the **Schematic Atlas** — one canonical page per
protocol, indexed by `catalog/index.html`. Build new pages through
`templates/protocol-page.jsx`, not from these archives.

These files are kept for reference but **should not be the starting point**
for any new work.
