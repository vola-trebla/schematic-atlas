import type { Note } from "../../types/protocol";
import { Callout, InkColors, SchematicCard, Stamp } from "../motifs";

import { FigHeader } from "./fig-header";

export function NotesSection({ notes, fig }: { notes: Note[]; fig: string | null }) {
  if (notes.length === 0) return null;
  return (
    <section className="section-rule">
      <div style={{ paddingTop: 40 }}>
        <FigHeader n={fig} title="Notes." />
      </div>
      <div className={notes.length === 1 ? undefined : "catalog-grid"} style={{ gap: 20 }}>
        {notes.map((note, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div style={{ marginBottom: 8, marginLeft: 6 }}>
              <Stamp size="11px" color={InkColors.red} rotate={-2}>
                {note.condition || "note"}
              </Stamp>
            </div>
            <SchematicCard
              pad="14px 18px"
              style={{ borderColor: InkColors.red, borderWidth: 1.5, borderStyle: "dashed" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Callout letter={String(note.n ?? i + 1)} size={26} color={InkColors.red} />
                <p className="card-body" style={{ fontSize: 15, margin: "2px 0 0", flex: 1 }}>
                  {note.body}
                </p>
              </div>
            </SchematicCard>
          </div>
        ))}
      </div>
    </section>
  );
}
