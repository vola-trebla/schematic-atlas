# UI Kit — `mcp-tool-site`

A single-page marketing-and-docs surface for an MCP tool. Demonstrates the
brand's signature schematic-on-paper composition: hero with a dimension-line
subtitle, a full diagram with lettered callouts, an install snippet, feature
cards with folded corners, and a numbered "how it works" sequence.

## Files

| File | What |
|---|---|
| `index.html` | Loads React, Babel, Iconoir CSS, the schematic.jsx motifs library, then `App.jsx`. |
| `App.jsx` | Composition root — assembles the page from the section components |
| `Header.jsx` | Top nav: logo + 4 nav items + GitHub button |
| `Hero.jsx` | Display headline, dimension-line tagline, primary + secondary buttons, "what is this" annotation |
| `ToolDiagram.jsx` | The schematic of the tool: boxes connected by arrows + lettered callouts + leader captions |
| `Install.jsx` | Code block + tab-pill switcher (npm / pnpm / bun) |
| `Features.jsx` | 3-up grid of feature cards (folded corners, hatched shadows) |
| `Steps.jsx` | Numbered "how it works" sequence |
| `Footer.jsx` | Compact ink footer with margin note |

Each `.jsx` exports its components to `window`. No bundler — Babel transpiles
in-browser, components share global scope.

## Demo behavior

- The install snippet has working tabs (npm / pnpm / bun).
- The hero "Connect tool" button toggles a connect-dialog overlay.
- The Iconoir CDN provides line icons (substitution flag — see top-level README).
