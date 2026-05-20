# UI Kit — `mcp-inspector`

The product itself: a debugger / inspector for an MCP server. Three-pane layout
rendered as a schematic — left rail of connected servers, center timeline of
calls, right pane with the selected call's payload.

## Files

| File | What |
|---|---|
| `index.html` | Loads React, Babel, `schematic.jsx`, then the inspector. |
| `App.jsx` | Composition root + global state (selected call). |
| `TopBar.jsx` | Project name, transport pill, connect indicator, search, action buttons |
| `ServerRail.jsx` | Left: connected servers with tool counts, status dots |
| `Timeline.jsx` | Center: chronological list of calls with status, duration dimension lines, redacted "off" entries |
| `CallDetail.jsx` | Right: selected call header + tabbed JSON payload (request / response / trace) |
| `StatusBar.jsx` | Bottom: ms-resolution latency graph + counters |

## Demo behavior

- Click a call in the timeline → updates the right pane.
- Tab between request / response / trace in the detail pane.
- The "Connect" button up top opens a small dialog (same component as on the
  marketing site for consistency).
