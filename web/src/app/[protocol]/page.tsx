import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PROTOCOLS } from "../../data/protocols";
import { ProtocolRenderer } from "../../design-system/protocol-renderer";

type PageProps = { params: Promise<{ protocol: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { protocol } = await params;
  const config = PROTOCOLS[protocol];
  if (!config) return {};
  return {
    title: `${config.name} — Schematic Atlas`,
    description: config.purpose,
  };
}

export default async function ProtocolPage({ params }: PageProps) {
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
  return Object.keys(PROTOCOLS).map((protocol) => ({ protocol }));
}
