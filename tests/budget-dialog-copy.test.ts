import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { monthLabel } from "@/lib/budget-math";

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

// ---------------------------------------------------------------------------
// F-246a (census #54, session-57): the reference's Set Budget dialog carried
// a DESCRIPTION line — `Set a monthly spending limit for November 2026` —
// a p.text-sm.text-slate-500 inside the DialogHeader (live-extracted
// 2026-11-02). Our dialog shipped headerless-of-description since the
// s194 re-mirror; the F-246a fix mirrored the header placement.
//
// F-246b (census #59, session-62): the reference REDESIGNED the placement —
// live-extracted 2026-11-03: the DialogHeader now carries ONLY the H2
// ("Set Budget"), and the description P moved to the TOP OF THE FORM BODY
// as its first child, ahead of the Category field. The reference's P is a
// PLAIN p (class="text-sm text-slate-500", NO Radix id wiring — the
// platform owner's edit left the dialog's aria-describedby dangling at a
// vanished radix id; a defect this clone does not mirror — our dialog
// simply emits no aria-describedby, the clean Radix form for a
// description-less dialog). The visible result: the line is always
// LEFT-aligned (the form body carries no text-center) and spaced by the
// form's own space-y-6 pt-4 rhythm, not the header's space-y-1.5.
// This pin keeps the line in the reference's current position.
// ---------------------------------------------------------------------------

describe("the Set Budget dialog's description line (F-246b — the reference's redesigned form)", () => {
  const src = read("src/components/shared/budget-dialog.tsx");

  it("the form body leads with the description as a plain p — the reference's redesigned placement", () => {
    // The description line itself — the reference's exact wording, with the
    // month interpolated (NOT a static string: the reference's line rolls
    // with the calendar).
    expect(src).toContain("Set a monthly spending limit for");
    // The reference's P is a PLAIN p with class="text-sm text-slate-500"
    // (#64748b) — NOT the Radix DialogDescription primitive (whose default
    // muted-ink #737373 is the wrong ink AND whose id wiring the reference
    // no longer carries). The className pins the ink on the plain p.
    expect(src).toMatch(/<p className="text-sm text-slate-500">/);
    // No DialogDescription ELEMENT and no import of the primitive remain
    // (comments may name it; the JSX must not).
    expect(src).not.toMatch(/<DialogDescription/);
    expect(src).not.toMatch(/import[\s\S]*?DialogDescription/);
    // It must sit as the form's FIRST child, ahead of the Category field.
    const form = src.split('<form onSubmit={onSubmit} className="space-y-6 pt-4">')[1]?.split("</form>")[0] ?? "";
    const firstField = form.split("<div")[0] ?? "";
    expect(firstField).toContain("Set a monthly spending limit for");
  });

  it("the DialogHeader carries ONLY the title (the reference's header is description-less since the redesign)", () => {
    const header = src.split("<DialogHeader>")[1]?.split("</DialogHeader>")[0] ?? "";
    expect(header).toContain("<DialogTitle");
    expect(header).not.toContain("Set a monthly spending limit for");
    expect(header).not.toContain("<p");
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
