import { CATALOG } from "../data/catalog";
import { AtlasCatalog } from "../design-system/catalog.client";

export default function Home() {
  return (
    <main style={{ padding: "0 var(--sp-6)", maxWidth: 1200, margin: "0 auto" }}>
      <AtlasCatalog entries={CATALOG} />
    </main>
  );
}
