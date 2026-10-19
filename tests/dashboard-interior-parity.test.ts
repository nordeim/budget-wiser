import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DASHBOARD_CARD } from "../src/lib/page-layout";

// Session-151 (walk41, F-151c1): the internal-scroller census — the
// dashboard's below-every-fold card headers, decoded live on both apps at
// 390 + 1440. The s7-era ghost "+ Add" buttons (the S7-18 extraction —
// ghost h-8, blue text-primary, an mr-1 Plus) on the Lead Sources + the
// Upcoming Activities CardHeaders are RETIRED: the CURRENT reference
// bundle (stable since the s147 parity event, re-verified at probe:ref
// #125) renders TITLE-ONLY headers there (rowH 24 @390 · 28 @1440 — the
// CardTitle's text-base/text-lg pairing), while ours rendered rowH 32
// with the 75x32 button at BOTH widths. The buttons lived in the dead
// zone NO standing gate can see — below the 900px desktop sweep fold,
// below the 844px phone fold inside main's internal scroller (the
// L-151c2 lesson) — for 143 sessions; the walk41 full-geometry census
// caught them via the +16px mainH delta (exactly the two 8px row
// differences). The quick-create wiring retired WITH its last two entry
// points (the dialogs stay reachable on the Leads/Activities pages).
//
// The ellipsis pair (Top Performing Sales Reps + Recent Deals card
// headers) + the Recent Deals per-row ghost (the L-78c3 bundle-decoded
// affordance) SURVIVE — the reference renders all three.

const read = (rel: string): string => {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
};

const dashPage = () => read("src/app/(app)/dashboard/page.tsx");
const pageLayout = () => read("src/lib/page-layout.ts");

describe("session-151: the dashboard card-header mirror (the walk41 internal-scroller census)", () => {
  it("F-151c1: the two card-header ghost Adds are retired with their quick-create wiring", () => {
    const src = dashPage();
    // the quick-create state machine is GONE (the type, the state, the
    // setters, the two dialog mounts — their only entry points died)
    expect(src).not.toContain("quickCreate");
    // no Plus glyph rides any Button on the page
    expect(src).not.toContain("<Plus");
    // the two create-dialog mounts retired from the dashboard (the
    // components stay on the Leads/Activities pages)
    expect(src).not.toContain("<LeadDialog");
    expect(src).not.toContain("<ActivityDialog");
    // no ghost-Add consumer of the retired constant remains
    expect(src).not.toContain("DASHBOARD_CARD.addBtn");
    expect(src).not.toContain("DASHBOARD_CARD.addIcon");
  });

  it("the card-header Button census: the ellipsis family survives, three source sites", () => {
    const src = dashPage();
    // exactly THREE "More actions" ghost sites: the Top Reps + the
    // Recent Deals card headers + the Recent Deals per-row affordance
    expect(src.match(/aria-label="More actions"/g) ?? []).toHaveLength(3);
    // the two card-header sites consume the frozen constant; the row
    // ghost carries its literal (the L-78c3 construction)
    expect(src.match(/DASHBOARD_CARD\.ellipsisBtn/g) ?? []).toHaveLength(2);
    expect(src.match(/className="h-8 w-8" aria-label="More actions"/g) ?? []).toHaveLength(1);
  });

  it("DASHBOARD_CARD object-shape freeze: addBtn/addIcon retired, the pair remains", () => {
    expect(Object.keys(DASHBOARD_CARD).sort()).toEqual(["ellipsisBtn", "headerRow"]);
    // the surviving members stay byte-frozen
    expect(DASHBOARD_CARD.ellipsisBtn).toBe("h-8 w-8");
    expect(DASHBOARD_CARD.headerRow).toBe("flex justify-between items-center");
  });

  it("the retired class strings leave page-layout.ts entirely (no dead constants)", () => {
    const src = pageLayout();
    expect(src).not.toContain("h-8 px-3 text-xs text-primary");
    expect(src).not.toContain("h-4 w-4 mr-1");
    // the block comment re-anchored off the Add-buttons phrasing
    expect(src).not.toContain("Add buttons (Lead Sources /");
  });
});
