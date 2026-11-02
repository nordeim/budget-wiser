import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { monthLabel } from "@/lib/budget-math";

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

// ---------------------------------------------------------------------------
// F-246a (census #54, session-57): the reference's Set Budget dialog carries
// a DESCRIPTION line under its title — `Set a monthly spending limit for
// November 2026` — a p.text-sm.text-slate-500 inside the DialogHeader
// (live-extracted 2026-11-02: header = flex flex-col space-y-1.5
// text-center sm:text-left; H2 "Set Budget"; the P directly beneath). Our
// dialog shipped headerless-of-description since the s194 re-mirror — the
// schema comment quoted the reference's own line ("Set a monthly spending
// limit for October 2026") but the component never rendered it. Sixteen
// census rounds of "all fields" probes (title/trigger/placeholder/submit)
// never listed the description, so the gap was invisible to the field-list
// methodology. This pin keeps the mirrored line — the month tense rides
// monthLabel() (en-US long month), the reference's own always-current-month
// form (its October read was "…for October 2026", its November read
// "…for November 2026").
// ---------------------------------------------------------------------------

describe("the Set Budget dialog's description line (F-246a — the reference's own form)", () => {
  const src = read("src/components/shared/budget-dialog.tsx");

  it("the DialogHeader renders the description under the title with the reference's slate-500 ink", () => {
    // The description line itself — the reference's exact wording, with the
    // month interpolated (NOT a static string: the reference's line rolls
    // with the calendar).
    expect(src).toContain("Set a monthly spending limit for");
    // The reference's P is class="text-sm text-slate-500" — the DialogDescription
    // primitive's default muted-ink (#737373) is the WRONG ink (slate-500 is
    // #64748b), so the className pins it explicitly.
    expect(src).toMatch(/DialogDescription[^>]*className="text-sm text-slate-500"/);
    // It must sit inside the DialogHeader, directly after the title.
    const header = src.split("<DialogHeader>")[1]?.split("</DialogHeader>")[0] ?? "";
    expect(header).toContain("<DialogTitle");
    expect(header).toContain("Set a monthly spending limit for");
  });

  it("the month tense rides monthLabel() (the en-US long-month form, the same helper the dashboard header uses)", () => {
    expect(src).toContain("monthLabel");
    // The computed label is the CURRENT month — the dialog defaults
    // month/year to now (the schema's documented contract), and the
    // reference's line is always the current month.
    expect(src).toMatch(/monthLabel\(\s*new Date\(\)\.getFullYear\(\),\s*new Date\(\)\.getMonth\(\)\s*\+\s*1\s*\)/);
    // The helper's own form — "November 2026" (pinned in budget-math's own
    // suite; re-asserted here because the dialog's line depends on it).
    const now = new Date();
    expect(monthLabel(now.getFullYear(), now.getMonth() + 1)).toBe(
      now.toLocaleString("en-US", { month: "long", year: "numeric" }),
    );
  });
});
