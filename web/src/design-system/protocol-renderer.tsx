/**
 * Protocol page renderer — composition root.
 * Sections live in ./renderer/*; this file only orchestrates them.
 * Only InstallSection (tab state) is a client boundary; everything else SSRs.
 */
import type { ProtocolConfig } from "../types/protocol";

import { InstallSection } from "./install-section.client";
import { AtlasStrip } from "./renderer/atlas-strip";
import { ComponentsSection } from "./renderer/components-section";
import { FlowSection } from "./renderer/flow-section";
import { NotesSection } from "./renderer/notes-section";
import { ProtocolFooter } from "./renderer/protocol-footer";
import { StatsRow } from "./renderer/stats-row";
import { TitleBlock } from "./renderer/title-block";
import { WorkedExampleSection } from "./renderer/worked-example-section";

export function ProtocolRenderer({ config }: { config: ProtocolConfig }) {
  const hasFlow = !!(config.flow && config.flow.steps && config.flow.steps.length > 0);
  const hasComponents = !!(
    (config.groups && config.groups.length) ||
    (config.tools && config.tools.length)
  );
  const hasNotes = !!(config.notes && config.notes.length > 0);
  const hasExample = !!(config.example && config.example.code);

  let n = 0;
  const flowFig = hasFlow ? String(++n) : null;
  const componentsFig = hasComponents ? String(++n) : null;
  const notesFig = hasNotes ? String(++n) : null;
  const exampleFig = hasExample ? String(++n) : null;
  const installFig = String(++n);

  return (
    <div className="page-shell">
      <span className="margin-rule" style={{ left: "36px" }} />
      <span className="margin-rule" style={{ right: "36px" }} />

      <AtlasStrip config={config} />
      <TitleBlock config={config} />
      <StatsRow stats={config.stats} />

      {hasFlow && <FlowSection fig={flowFig} flow={config.flow!} />}
      {hasComponents && (
        <ComponentsSection fig={componentsFig} groups={config.groups} tools={config.tools} />
      )}
      {hasNotes && <NotesSection notes={config.notes!} fig={notesFig} />}
      {hasExample && <WorkedExampleSection example={config.example!} fig={exampleFig} />}

      <InstallSection fig={installFig} config={config} />
      <ProtocolFooter config={config} />
    </div>
  );
}
