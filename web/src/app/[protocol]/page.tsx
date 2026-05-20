import { notFound } from "next/navigation";

import { PROTOCOLS } from "../../data/protocols";
import { ProtocolRenderer } from "../../design-system/protocol-renderer";

export default async function ProtocolPage({ params }: { params: Promise<{ protocol: string }> }) {
  const { protocol } = await params;
  const config = PROTOCOLS[protocol];

  if (!config) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <ProtocolRenderer config={config} />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(PROTOCOLS).map((protocol) => ({
    protocol,
  }));
}
