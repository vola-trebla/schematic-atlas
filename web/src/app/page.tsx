import { PROTOCOLS } from "../data/protocols";
import { AtlasCatalog } from "../design-system/catalog.client";

export default function Home() {
  return (
    <main style={{ padding: "0 var(--sp-6)", maxWidth: 1200, margin: "0 auto" }}>
      <AtlasCatalog protocols={PROTOCOLS} />
    </main>
  );
}
