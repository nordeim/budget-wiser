import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-108 pins (S108-P3): the COMPLETE-WEEKS calendar grid freeze.
//
// The 108-c ANALYZE probes caught the s76 M-76c8 decode gloss ("the grid
// is ALWAYS the UNTRIMMED 42 cells — 6 constant rows") contradicting the
// LIVE reference: probed at five months the reference renders 35 cells
// for October 2026 (Sep 27..Oct 31), 35 for November 2026 (Nov 1..Dec 5),
// 42 for January 2027 (Dec 27..Feb 6 — the 6-week month), 35 for April
// 2027 (Mar 28..May 1) and 35 for July 2026 (Jun 28..Aug 1) — the
// COMPLETE-WEEKS model (eachDayOfInterval from the Sunday before the 1st
// to the Saturday on-or-after the last: 28/35/42 as the month demands),
// exactly the s51-era "trimmed render" the s51 test comments describe
// ("Nov 2026: lead 0 + 30 days → 5 weeks → Dec 5"). The always-42 form
// was invisible to every standing gate — the extra 6th row sits below
// the 900px sweep fold on both apps (VLM-verified off the sweep
// screenshots) and no e2e pinned a cell count.
//
// The fix lives in the seam: calendarGrid's leading branch now produces
// whole weeks (`Math.ceil((offset + daysInMonth) / 7) * 7`), the page
// call stays byte-identical, and calendarFetchBounds follows exactly
// (its `to` IS the rendered grid's last cell — the N-51a contract now
// with equality). This suite freezes all three faces RED-first: the
// live-verified members table, the structural invariants, and the
// bounds alignment. Non-vacuousness by induced drift (RED-2): a
// temporary reversion to always-42 fails its (a)+(c) members by name.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

describe("session-108: the complete-weeks calendar grid (M-108c2)", () => {
  it("the LIVE-verified members table — 28/35/42 as the month demands (the reference's five probed months)", async () => {
    const { calendarGrid } = await import("@/lib/format");
    const fmt = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const cases: Array<[number, number, number, string, string]> = [
      // [year, month0, expectedCells, firstCell, lastCell]
      [2026, 1, 28, "2026-2-1", "2026-2-28"], // Feb 2026: Sunday-start, 28 days → 4 whole weeks
      [2026, 9, 35, "2026-9-27", "2026-10-31"], // Oct 2026: Thu-start (lead 4 + 31 = 35 exactly)
      [2026, 10, 35, "2026-11-1", "2026-12-5"], // Nov 2026: Sunday-start (0 lead + 30 → 35)
      [2027, 0, 42, "2026-12-27", "2027-2-6"], // Jan 2027: Fri-start (5 lead + 31 = 36 → 42)
      [2026, 6, 35, "2026-6-28", "2026-8-1"], // Jul 2026: Wed-start (3 lead + 31 = 34 → 35)
      [2027, 3, 35, "2027-3-28", "2027-5-1"], // Apr 2027: Thu-start (4 lead + 30 = 34 → 35)
    ];
    for (const [year, month, cells, first, last] of cases) {
      const grid = calendarGrid(year, month, "sunday", true);
      expect(
        grid.length,
        `${year}-${month + 1}: the complete-weeks cell count`,
      ).toBe(cells);
      expect(fmt(grid[0]), `${year}-${month + 1}: the first cell`).toBe(first);
      expect(
        fmt(grid[grid.length - 1]),
        `${year}-${month + 1}: the last cell`,
      ).toBe(last);
    }
    // the always-42 form is RETIRED: October 2026 renders 35 on the
    // live reference — never 42.
    expect(calendarGrid(2026, 9, "sunday", true).length).not.toBe(42);
  });

  it("the structural invariants — whole weeks, Sunday-anchored, contiguous, exactly ceil((offset + dim)/7)*7", async () => {
    const { calendarGrid } = await import("@/lib/format");
    // every month of 2026 + 2027: the invariants hold universally
    for (const year of [2026, 2027]) {
      for (let month = 0; month < 12; month += 1) {
        const grid = calendarGrid(year, month, "sunday", true);
        const first = new Date(year, month, 1);
        const offset = first.getDay(); // sunday-anchored
        const dim = new Date(year, month + 1, 0).getDate();
        expect(
          grid.length,
          `${year}-${month + 1}: a whole number of weeks`,
        ).toBe(grid.length - (grid.length % 7));
        expect(grid.length % 7, `${year}-${month + 1}: whole weeks`).toBe(0);
        expect(
          grid.length,
          `${year}-${month + 1}: the ceil formula`,
        ).toBe(Math.ceil((offset + dim) / 7) * 7);
        expect(grid[0].getDay(), `${year}-${month + 1}: starts on a Sunday`).toBe(0);
        expect(
          grid[grid.length - 1].getDay(),
          `${year}-${month + 1}: ends on a Saturday`,
        ).toBe(6);
        // contiguous daily steps
        for (let i = 1; i < grid.length; i += 1) {
          const delta =
            (grid[i].getTime() - grid[i - 1].getTime()) / 86_400_000;
          expect(delta, `${year}-${month + 1} day ${i}: contiguous`).toBe(1);
        }
        // the month's own 1st is in the grid
        expect(
          grid.some(
            (d) =>
              d.getFullYear() === year &&
              d.getMonth() === month &&
              d.getDate() === 1,
          ),
          `${year}-${month + 1}: the 1st is rendered`,
        ).toBe(true);
      }
    }
  });

  it("the fetch window's last day IS the rendered grid's last cell (the N-51a contract exact — the s51 trimmed values return)", async () => {
    const { calendarFetchBounds, endOfDay } = await import("@/lib/format");
    // Oct 2026 (zero-trailing): the window ends Oct 31 — the grid's
    // last cell, not the old Nov 7 (the 42nd cell).
    expect(calendarFetchBounds(2026, 9).to).toBe(
      endOfDay(new Date(2026, 9, 31)).toISOString(),
    );
    // Nov 2026 (trailing Dec 1-5): the window ends Dec 5 — the s51
    // comment's own "the grid SHOWS through Dec 5" value, now the
    // bound itself (the old bound was Dec 12 — the 42nd cell).
    expect(calendarFetchBounds(2026, 10).to).toBe(
      endOfDay(new Date(2026, 11, 5)).toISOString(),
    );
    // Jan 2027 (the 6-week month): the window ends Feb 6.
    expect(calendarFetchBounds(2027, 0).to).toBe(
      endOfDay(new Date(2027, 1, 6)).toISOString(),
    );
    // the source form (the seam carries the complete-weeks formula)
    const lib = read("src/lib/format.ts") ?? "";
    expect(lib).toContain(
      "total = leading ? Math.ceil((offset + daysInMonth) / 7) * 7 : daysInMonth;",
    );
  });
});
