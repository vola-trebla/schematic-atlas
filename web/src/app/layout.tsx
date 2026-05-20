import "../design-system/globals.css";
import type { Metadata } from "next";

import { WobbleDefs } from "../design-system/schematic";

export const metadata: Metadata = {
  title: "Schematic Atlas",
  description: "Visual Encyclopedia for MCP Protocols",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Architects+Daughter&family=JetBrains+Mono:wght@400;500;600;700&family=Special+Elite&display=swap"
        />
      </head>
      <body>
        <WobbleDefs />
        {children}
      </body>
    </html>
  );
}
