// Session-172 (WP-2): THE FAST-CHECK PROPERTY FAMILY — the other
// s170-named rotation candidate, landed as the round's ONE devDep bump
// (fast-check ^4.10.2; the no-mid-rotation-bump posture holds: s171
// bumped axe-core, s172 bumps fast-check).
//
// The example-based batteries (csv.test.ts · csv-formula-guard ·
// lead-filters · saved-reports · format · avatar) pin FIXED cases; the
// property battery pins the INVARIANTS that must hold for EVERY input
// the seams can meet in production — round-trips, idempotence,
// totality, and robustness, each stated as a named property with a
// generated input space:
//
//   P-a  csv round-trip       — parseCsv(toCsv(rows)) recovers the rows
//                               through guardFormulaPrefix for ARBITRARY
//                               cell strings (RED at birth: F-172e — the
//                               parser normalized \r\n globally, so a
//                               quoted CRLF mutated to LF; the fix moved
//                               the normalization inside the state
//                               machine, outside quotes only — RFC 4180)
//   P-b  guard idempotence    — the OWASP prefix lands exactly once
//   P-c  lead-views round-trip— the Save View localStorage seam
//   P-d  saved-reports total + idempotent — decode never throws on ANY
//                               string; the normalize-on-decode converges
//                               in one pass
//   P-e  formatter robustness — the format family never throws and always
//                               returns strings (NaN/±Infinity/huge/
//                               arbitrary strings/null)
//   P-f  initials invariants  — never throws, never empty, "?" or 1–2
//                               uppercase letters for ASCII names
//   P-g  csvFilename convention — the prefix_YYYY-MM-DD.csv regex holds
//
// numRuns is tuned per property (the round-trip families at 300 — the
// csv escape surface is where production data lands; the robustness
// families at 150 — they are freeze pins).

import fc from "fast-check";
import { describe, expect, it } from "vitest";

import { csvFilename, guardFormulaPrefix, parseCsv, toCsv, type CsvColumn } from "@/lib/csv";
import { decodeSavedLeadViews, encodeSavedLeadViews, LEAD_FILTER_SOURCE_OPTIONS, LEAD_FILTER_STATUS_OPTIONS } from "@/lib/lead-filters";
import { decodeSavedReports, encodeSavedReports } from "@/lib/saved-reports";
import { formatCompactCurrency, formatCurrency, formatDate } from "@/lib/format";
import { initialsOf } from "@/components/ui/avatar";

// ---------------------------------------------------------------------------
// P-a — the csv round-trip (F-172e's RED birth; the parser fix's proof)
// ---------------------------------------------------------------------------
describe("session-172 P-a: the csv escape/parse round-trip holds for arbitrary cells", () => {
  // the full cell alphabet the exporter can meet: commas, quotes,
  // newlines, formula prefixes, unicode, controls, the empty string
  const cellArb = fc.string({ minLength: 0, maxLength: 24 }).map((s) =>
    s.replace(/\0/g, ""),
  );
  // TWO live-caught domain calibrations (the seam's OWN contracts):
  // (1) the toCsv model renders FIXED-WIDTH column sets — every
  //     production exporter (the entity-export family, the report
  //     branch) passes uniform rows; ragged rows normalize to the
  //     column width and are OUTSIDE the round-trip domain. The
  //     generator chains the width so every row matches.
  // (2) the parser's pinned s26 contract: rows whose EVERY cell is
  //     blank-after-trim are dropped ("drops blank trailing lines") —
  //     such rows are outside the domain by design.
  const matrixArb = fc.nat({ max: 3 }).chain((wIdx) => {
    const width = wIdx + 1;
    return fc
      .array(fc.array(cellArb, { minLength: width, maxLength: width }), {
        minLength: 0,
        maxLength: 6,
      })
      .filter((rows) => rows.every((r) => r.some((c) => c.trim().length > 0)));
  });

  it("parseCsv(toCsv(rows)) recovers the rows through guardFormulaPrefix", () => {
    fc.assert(
      fc.property(matrixArb, (rows) => {
          const columns: Array<CsvColumn<string[]>> = rows[0]?.map((_, i) => ({
            header: `h${i}`,
            value: (r: string[]) => r[i] ?? "",
          })) ?? [];
          if (columns.length === 0) return; // zero-row degenerate: skip
          const csv = toCsv(rows, columns);
          const back = parseCsv(csv);
          // the parsed FIRST row is the header; the data rows follow
          expect(back[0]).toEqual(columns.map((c) => c.header));
          // the round-trip recovers the GUARDED cells (the OWASP prefix
          // is the documented, pinned trade-off — csv-formula-guard)
          const expected = rows.map((r) => r.map((c) => guardFormulaPrefix(c)));
          expect(back.slice(1)).toEqual(expected);
        },
      ),
      { numRuns: 300 },
    );
  });

  it("the formula guard is the ONLY cell mutation (cells without prefixes round-trip verbatim)", () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 2 }).chain((wIdx) => {
          const width = wIdx + 1;
          return fc
            .array(
              fc.array(
                fc.string({ minLength: 0, maxLength: 16 }).filter((s) => !/^[=+@\t\r]/.test(s)),
                { minLength: width, maxLength: width },
              ),
              { minLength: 1, maxLength: 4 },
            )
            .filter((rows) => rows.every((r) => r.some((c) => c.trim().length > 0)));
        }),
        (rows) => {
          const columns: Array<CsvColumn<string[]>> = rows[0].map((_, i) => ({
            header: `c${i}`,
            value: (r: string[]) => r[i] ?? "",
          }));
          const back = parseCsv(toCsv(rows, columns));
          // the header row precedes the data rows (the live-caught
          // calibration: the parsed csv ALWAYS leads with the header)
          expect(back[0]).toEqual(columns.map((c) => c.header));
          expect(back.slice(1)).toEqual(rows);
        },
      ),
      { numRuns: 200 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-b — the guard's idempotence (the prefix lands exactly once)
// ---------------------------------------------------------------------------
describe("session-172 P-b: guardFormulaPrefix is idempotent", () => {
  it("guard(guard(s)) === guard(s) for any string", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 32 }), (s) => {
        const once = guardFormulaPrefix(s);
        expect(guardFormulaPrefix(once)).toBe(once);
      }),
      { numRuns: 300 },
    );
  });

  it("a guarded cell never re-matches the formula prefix", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 32 }), (s) => {
        expect(/^[=+@\t\r]/.test(guardFormulaPrefix(s))).toBe(false);
      }),
      { numRuns: 300 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-c — the lead-views localStorage round-trip (the Save View seam)
// ---------------------------------------------------------------------------
describe("session-172 P-c: the saved lead-views encode/decode round-trip", () => {
  // the seam's OWN contract (lead-filters.ts): status/source ride the
  // pinned vocabularies ("unqualified" is the EDIT dialog's word, NOT a
  // filter word — the live-caught calibration), minValue/followUpDate
  // are RAW STRINGS ("" = unset — undefined is NOT in the contract).
  const statusArb = fc.constantFrom(...LEAD_FILTER_STATUS_OPTIONS);
  const sourceArb = fc.constantFrom(...LEAD_FILTER_SOURCE_OPTIONS);
  const minValueArb = fc.string({ minLength: 0, maxLength: 8 });
  const dateArb = fc.string({ minLength: 0, maxLength: 10 });
  const nameArb = fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0);

  it("decode(encode(views)) === views for valid saved-view lists", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            name: nameArb,
            filters: fc.record({
              status: statusArb,
              source: sourceArb,
              minValue: minValueArb,
              followUpDate: dateArb,
            }),
          }),
          { minLength: 0, maxLength: 5 },
        ),
        (views) => {
          expect(decodeSavedLeadViews(encodeSavedLeadViews(views))).toEqual(views);
        },
      ),
      { numRuns: 300 },
    );
  });

  it("decode is total: ANY string yields a list or null, never a throw", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 48 }), (raw) => {
        expect(() => decodeSavedLeadViews(raw)).not.toThrow();
      }),
      { numRuns: 300 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-d — the saved-reports seam: total + normalization idempotent
// ---------------------------------------------------------------------------
describe("session-172 P-d: the saved-reports decode is total and its normalization is idempotent", () => {
  it("decode never throws on ANY string (the localStorage seam can hold anything)", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 64 }), (raw) => {
        expect(() => decodeSavedReports(raw)).not.toThrow();
      }),
      { numRuns: 300 },
    );
  });

  it("decode(encode(decode(raw))) === decode(raw) — the normalize converges in one pass (the legacy-id migration; the DECODABLE domain — a null decode is the seam's own rejection, not a migration step)", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 64 }), (raw) => {
        const once = decodeSavedReports(raw);
        if (once === null) return; // the rejection face: out of domain
        const twice = decodeSavedReports(encodeSavedReports(once));
        expect(twice).toEqual(once);
      }),
      { numRuns: 300 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-e — the formatter robustness family (the freeze pins)
// ---------------------------------------------------------------------------
describe("session-172 P-e: the format family is total (never throws, always returns strings)", () => {
  const numericArb = fc.oneof(
    fc.double({ noNaN: false, noDefaultInfinity: false }),
    fc.integer({ min: -Number.MAX_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
    fc.constant(0),
    fc.constant(-0),
  );

  it("formatCurrency / formatCompactCurrency return strings for ANY numeric input", () => {
    fc.assert(
      fc.property(numericArb, (v) => {
        expect(typeof formatCurrency(v)).toBe("string");
        expect(typeof formatCompactCurrency(v)).toBe("string");
        expect(typeof formatCompactCurrency(v, { upper: true, decimals: 0 })).toBe("string");
      }),
      { numRuns: 150 },
    );
  });

  it("formatDate returns a string for ANY input (numbers, strings, null)", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.double({ noNaN: false, noDefaultInfinity: false }),
          fc.string({ minLength: 0, maxLength: 24 }),
          fc.constant(null),
          fc.constant(undefined),
        ),
        (v) => {
          expect(typeof formatDate(v)).toBe("string");
        },
      ),
      { numRuns: 150 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-f — the initials invariants (the avatar seam)
// ---------------------------------------------------------------------------
describe("session-172 P-f: initialsOf never throws and yields well-formed initials", () => {
  it("any input yields a non-empty string (never throws)", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string({ minLength: 0, maxLength: 24 }),
          fc.constant(null),
          fc.constant(undefined),
        ),
        (name) => {
          const r = initialsOf(name);
          expect(typeof r).toBe("string");
          expect(r.length).toBeGreaterThan(0);
        },
      ),
      { numRuns: 200 },
    );
  });

  it("letter-initial ASCII names yield '?' or 1–2 uppercase letters (the reference's verbatim formula mirrors digits/symbols as-is — out of the letters domain by design)", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[A-Za-z][A-Za-z]*(\s+[A-Za-z][A-Za-z]*)*$/),
        (name) => {
          expect(initialsOf(name)).toMatch(/^(\?|[A-Z]{1,2})$/);
        },
      ),
      { numRuns: 200 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-g — the csvFilename convention (the export artifact's name form)
// ---------------------------------------------------------------------------
describe("session-172 P-g: csvFilename always rides the prefix_ISO-date.csv convention", () => {
  it("any sane prefix yields a convention-matching filename", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 12 }).filter((s) => /^[a-z]+$/i.test(s)),
        (prefix) => {
          expect(csvFilename(prefix)).toMatch(
            new RegExp(`^${prefix}_\\d{4}-\\d{2}-\\d{2}\\.csv$`),
          );
        },
      ),
      { numRuns: 150 },
    );
  });
});
