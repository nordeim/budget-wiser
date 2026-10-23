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
// Session-173 — THE DEEPER PROPERTY FAMILY (the s172 close's named
// candidate; NO new devDep — fast-check rides the s172 declaration):
//
//   P-h  create-defaults round-trip — an input carrying ONLY the required
//                               field parses SUCCESS and the output
//                               carries the s166 quadrant defaults
//   P-i  enum membership      — a vocabulary member parses to its trimmed
//                               self; an outside value rejects
//   P-j  email contract       — the shared emailField trims + lowercases
//   P-k  PUT three-state      — absent → the key is ABSENT from the
//                               output; null → null; a value → trimmed
//   P-l  required-name quadrant — null/""/whitespace reject with the
//                               route's exact message (every CREATE
//                               schema)
//   P-m  legacy priority map  — hot/warm/cold → Key/Standard/At Risk;
//                               the direct vocabulary passes verbatim
//   P-n  fixed-window reset   — a key blocked at t₀ resets AT the
//                               crossing with a fresh count (RED at
//                               birth: F-173a — the clock seam absent,
//                               the 4th argument ignored, the crossing
//                               never observed)
//   P-o  retryAfterSec formula— the exact ceiling ceil((resetAt −
//                               now)/1000), floor 1 (RED at birth)
//   P-p  remaining monotonicity — each allowed call decrements by
//                               exactly 1; blocked calls return 0 and
//                               never transition back within the window
//   P-q  first-call + default-clock equivalence — a fresh key's first
//                               call is always allowed; the 4-arg call at
//                               Date.now() matches the 3-arg default
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
import {
  accountCreateSchema,
  accountUpdateSchema,
  activityCreateSchema,
  contactCreateSchema,
  eventCreateSchema,
  leadCreateSchema,
  loginSchema,
  signupSchema,
} from "@/lib/schemas";
import {
  ACCOUNT_HEALTH_STATUSES,
  ACCOUNT_STATUSES,
  ACTIVITY_TYPES,
  CONTACT_PRIORITIES,
  CONTACT_PRIORITIES_REF,
  CONTACT_STATUSES,
  EVENT_TYPES,
  LEAD_STAGES,
} from "@/lib/constants";
import { rateLimit } from "@/lib/rate-limit";

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

// ---------------------------------------------------------------------------
// Session-173 — THE DEEPER PROPERTY FAMILY (P-h…P-q). The Zod half
// (P-h…P-m) lands as born-green freeze pins over the s166 seam's own
// contracts (the P-b…P-g precedent); the rate-limit half (P-n…P-q)
// rides the NEW injectable clock seam (F-173a) — P-n/P-o RED at birth
// against the unfixed seam (the 4th argument ignored at runtime, the
// injected clock has no effect, the window crossing never observed).
// ---------------------------------------------------------------------------

// a valid required name: non-empty after trim, inside the schema caps
// (the 120-char name cap is the tightest of the five families)
const validNameArb = fc
  .string({ minLength: 1, maxLength: 40 })
  .filter((s) => s.trim().length > 0 && s.trim().length <= 120);

describe("session-173 P-h: the create-defaults round-trip — only-required input parses to the s166 quadrant defaults", () => {
  // the date generator: an integer timestamp in the 2020-2030 band (the
  // live-caught calibration — fc.date can hand the property an INVALID
  // Date (NaN), whose toISOString() throws before the schema ever sees
  // the input; the integer form is deterministic and always in-range)
  const isoArb = fc
    .integer({ min: Date.UTC(2020, 0, 1), max: Date.UTC(2030, 0, 1) })
    .map((ms) => new Date(ms).toISOString());

  it("every CREATE schema: the required field alone parses SUCCESS and the output carries the documented defaults", () => {
    fc.assert(
      fc.property(validNameArb, isoArb, (name, startAt) => {
        const account = accountCreateSchema.parse({ name });
        expect(account.name).toBe(name.trim());
        expect(account.status).toBe("active");
        expect(account.health).toBe("Healthy");
        expect(account.ownerId).toBeNull();
        expect(account.annualRevenue).toBeNull();
        expect(account.employees).toBeNull();
        expect(account.industry).toBeNull();
        expect(account.email).toBeNull();
        expect(account.phone).toBeNull();
        expect(account.website).toBeNull();

        const activity = activityCreateSchema.parse({ subject: name });
        expect(activity.subject).toBe(name.trim());
        expect(activity.type).toBe("call");
        expect(activity.status).toBe("scheduled");
        expect(activity.priority).toBe("normal");
        expect(activity.contactId).toBeNull();
        expect(activity.accountId).toBeNull();
        expect(activity.dueAt).toBeNull();
        expect(activity.notes).toBeNull();

        const contact = contactCreateSchema.parse({ name });
        expect(contact.name).toBe(name.trim());
        expect(contact.priority).toBe("Standard");
        expect(contact.status).toBe("active");
        expect(contact.email).toBeNull();
        expect(contact.role).toBeNull();
        expect(contact.engagementLevel).toBeNull();
        expect(contact.companySize).toBeNull();
        expect(contact.photoUrl).toBeNull();
        expect(contact.phone).toBeNull();
        expect(contact.company).toBeNull();
        expect(contact.position).toBeNull();
        expect(contact.source).toBeNull();

        const event = eventCreateSchema.parse({ title: name, startAt });
        expect(event.title).toBe(name.trim());
        expect(event.startAt.getTime()).toBe(new Date(startAt).getTime());
        expect(event.type).toBe("meeting");
        expect(event.status).toBe("scheduled");
        expect(event.allDay).toBe(false);
        expect(event.endAt).toBeNull();
        expect(event.description).toBeNull();
        expect(event.location).toBeNull();

        const lead = leadCreateSchema.parse({ name });
        expect(lead.name).toBe(name.trim());
        expect(lead.stage).toBe("new");
        expect(lead.source).toBeNull();
        expect(lead.ownerId).toBeNull();
        expect(lead.value).toBeNull();
        expect(lead.email).toBeNull();
        expect(lead.phone).toBeNull();
        expect(lead.company).toBeNull();
      }),
      { numRuns: 200 },
    );
  });
});

describe("session-173 P-i: the enum membership invariant — members parse to their trimmed selves, outsiders reject", () => {
  // the defaulted-enum family's representatives: one per CREATE schema
  const enumCases = [
    { label: "account status", values: ACCOUNT_STATUSES, make: (name: string, v: string) => accountCreateSchema.safeParse({ name, status: v }), field: (r: { status: string }) => r.status },
    { label: "account health", values: ACCOUNT_HEALTH_STATUSES, make: (name: string, v: string) => accountCreateSchema.safeParse({ name, health: v }), field: (r: { health: string }) => r.health },
    { label: "activity type", values: ACTIVITY_TYPES, make: (name: string, v: string) => activityCreateSchema.safeParse({ subject: name, type: v }), field: (r: { type: string }) => r.type },
    { label: "contact status", values: CONTACT_STATUSES, make: (name: string, v: string) => contactCreateSchema.safeParse({ name, status: v }), field: (r: { status: string }) => r.status },
    { label: "event type", values: EVENT_TYPES, make: (name: string, v: string) => eventCreateSchema.safeParse({ title: name, startAt: "2026-01-01T10:00:00.000Z", type: v }), field: (r: { type: string }) => r.type },
    { label: "lead stage", values: LEAD_STAGES, make: (name: string, v: string) => leadCreateSchema.safeParse({ name, stage: v }), field: (r: { stage: string }) => r.stage },
  ] as const;

  it("a vocabulary member (even whitespace-padded) parses to its trimmed self", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...enumCases),
        validNameArb,
        fc.string({ minLength: 0, maxLength: 4 }).filter((s) => /^[ \t]*$/.test(s)),
        (c, name, pad) => {
          const member = c.values[Math.floor(Math.random() * c.values.length)];
          const result = c.make(name, `${pad}${member}${pad}`);
          expect(result.success).toBe(true);
          if (result.success) expect(c.field(result.data as never)).toBe(member);
        },
      ),
      { numRuns: 200 },
    );
  });

  it("a non-empty string OUTSIDE the vocabulary rejects (whitespace-only is NOT outside — it rides the default)", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...enumCases),
        validNameArb,
        fc.string({ minLength: 1, maxLength: 12 }).filter(
          (s) => s.trim() !== "" && !(enumCases.some((c) => (c.values as readonly string[]).includes(s.trim()))),
        ),
        (c, name, outsider) => {
          const result = c.make(name, outsider);
          expect(result.success).toBe(false);
        },
      ),
      { numRuns: 200 },
    );
  });
});

describe("session-173 P-j: the email contract — the shared emailField trims and lowercases", () => {
  // the email regex domain: local@domain.tld with no internal whitespace
  const localArb = fc.string({ minLength: 1, maxLength: 10 }).filter((s) => /^[A-Za-z0-9._-]+$/.test(s));
  const domainArb = fc.string({ minLength: 1, maxLength: 10 }).filter((s) => /^[A-Za-z0-9-]+$/.test(s));
  const padArb = fc.constantFrom("", "  ", " \t ", "   ");

  it("loginSchema parses padded/mixed-case addresses to the trimmed + lowercased form", () => {
    fc.assert(
      fc.property(localArb, domainArb, padArb, (local, domain, pad) => {
        const raw = `${pad}${local}@${domain}.COM${pad}`;
        const result = loginSchema.parse({ email: raw, password: "longenough" });
        expect(result.email).toBe(`${local.toLowerCase()}@${domain.toLowerCase()}.com`);
      }),
      { numRuns: 200 },
    );
  });

  it("signupSchema applies the same emailField contract (the one-seam parity)", () => {
    fc.assert(
      fc.property(localArb, domainArb, padArb, (local, domain, pad) => {
        const raw = `${pad}${local}@${domain}.IO${pad}`;
        const result = signupSchema.parse({ email: raw, password: "longenough" });
        expect(result.email).toBe(`${local.toLowerCase()}@${domain.toLowerCase()}.io`);
      }),
      { numRuns: 200 },
    );
  });
});

describe("session-173 P-k: the PUT three-state round-trip — absent stays absent, null clears, a value trims", () => {
  const industryArb = fc.string({ minLength: 1, maxLength: 40 }).filter((s) => s.trim().length > 0);

  it("for a clearable field: absent → the key is ABSENT; null → null; a value → trimmed", () => {
    fc.assert(
      fc.property(industryArb, fc.string({ minLength: 0, maxLength: 4 }).filter((s) => /^[ \t]*$/.test(s)), (industry, pad) => {
        // the seam's own contract: the OUTPUT is the TRIMMED form (the
        // live-caught calibration — the generator's raw value may carry
        // its own leading/trailing whitespace)
        const trimmed = industry.trim();
        // absent: the key never appears in the output (no write)
        const absent = accountUpdateSchema.parse({});
        expect("industry" in absent).toBe(false);
        expect("annualRevenue" in absent).toBe(false);
        expect("ownerId" in absent).toBe(false);

        // null: the explicit clear
        const cleared = accountUpdateSchema.parse({ industry: null, annualRevenue: null, ownerId: null });
        expect(cleared.industry).toBeNull();
        expect(cleared.annualRevenue).toBeNull();
        expect(cleared.ownerId).toBeNull();

        // a value: the trimmed form (padded values trim to the same word)
        const written = accountUpdateSchema.parse({ industry: `${pad}${industry}${pad}`, ownerId: ` ${industry} ` });
        expect(written.industry).toBe(trimmed);
        expect(written.ownerId).toBe(trimmed);
      }),
      { numRuns: 200 },
    );
  });
});

describe("session-173 P-l: the required-name quadrant — null/empty/whitespace all reject with the route's exact message", () => {
  const nameCases = [
    { label: "account", make: (v: unknown) => accountCreateSchema.safeParse({ name: v }), message: "Account name is required" },
    { label: "activity", make: (v: unknown) => activityCreateSchema.safeParse({ subject: v }), message: "Activity details are required" },
    { label: "contact", make: (v: unknown) => contactCreateSchema.safeParse({ name: v }), message: "Name is required" },
    { label: "event", make: (v: unknown) => eventCreateSchema.safeParse({ title: v, startAt: "2026-01-01T10:00:00.000Z" }), message: "Event title is required" },
    { label: "lead", make: (v: unknown) => leadCreateSchema.safeParse({ name: v }), message: "Lead name is required" },
  ] as const;
  const badArb = fc.constantFrom(null, "", "   ", " \t ", "\n  ");

  it("every CREATE schema rejects the empty quadrant with its own required message", () => {
    fc.assert(
      fc.property(fc.constantFrom(...nameCases), badArb, (c, bad) => {
        const result = c.make(bad);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe(c.message);
        }
      }),
      { numRuns: 200 },
    );
  });
});

describe("session-173 P-m: the contacts legacy priority mapping — hot/warm/cold map, the direct vocabulary passes verbatim", () => {
  const LEGACY: Record<string, string> = { hot: "Key", warm: "Standard", cold: "At Risk" };

  it("a legacy word maps to its ref vocabulary word; a direct word passes verbatim; garbage rejects", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...CONTACT_PRIORITIES, ...CONTACT_PRIORITIES_REF),
        fc.string({ minLength: 1, maxLength: 12 }).filter(
          (s) =>
            s.trim() !== "" &&
            !(CONTACT_PRIORITIES as readonly string[]).includes(s.trim()) &&
            !(CONTACT_PRIORITIES_REF as readonly string[]).includes(s.trim()),
        ),
        (word, garbage) => {
          const legacy = contactCreateSchema.safeParse({ name: "A", priority: word });
          expect(legacy.success).toBe(true);
          if (legacy.success) {
            expect(legacy.data.priority).toBe(LEGACY[word] ?? word);
          }
          const rejected = contactCreateSchema.safeParse({ name: "A", priority: garbage });
          expect(rejected.success).toBe(false);
        },
      ),
      { numRuns: 200 },
    );
  });
});

// ---------------------------------------------------------------------------
// P-n…P-q — the rate-limit window arithmetic over the injectable clock
// (F-173a: `rateLimit(key, limit, windowMs, now = Date.now())` — the
// s164 sweepRateLimits form extended to the rateLimit path). The fixed
// epoch base keeps every generated window deterministic; the per-run
// namespaced keys keep the module-level bucket map isolated.
//
// THE STATEFUL-SEAM CALIBRATION (live-caught at RED birth — the fourth
// calibration catch): the module-level bucket map persists ACROSS fc
// runs, and fc's short-string generator COLLIDES within 150 runs (the
// shrunk counterexample "p173p: " — a second run on a colliding key
// inherits the first run's count and fails the fresh-key expectation).
// The cure: a per-property monotonic run id appended to every key —
// uniqueness is a property of the RUN, not of the generated input.
// ---------------------------------------------------------------------------
const T0 = 1_760_000_000_000; // a fixed epoch base (2025-10 ff.)
const rlKeyArb = (tag: string) =>
  fc.string({ minLength: 1, maxLength: 12 }).map((s) => `p173${tag}:${s}`);
const limitArb = fc.integer({ min: 1, max: 6 });
const windowArb = fc.integer({ min: 60_000, max: 600_000 });
const runId = () => `${Date.now()}-${Math.random()}`;

describe("session-173 P-n: the fixed-window reset invariant — a blocked key resets AT the crossing with a fresh count", () => {
  it("burn the quota at t₀ → blocked; one ms before the crossing → still blocked; AT t₀+window → allowed with remaining limit−1", () => {
    fc.assert(
      fc.property(rlKeyArb("n"), limitArb, windowArb, (rawKey, limit, windowMs) => {
        const key = `${rawKey}#${runId()}`;
        for (let i = 0; i < limit; i++) {
          expect(rateLimit(key, limit, windowMs, T0).allowed).toBe(true);
        }
        const blocked = rateLimit(key, limit, windowMs, T0);
        expect(blocked.allowed).toBe(false);
        expect(blocked.remaining).toBe(0);
        const before = rateLimit(key, limit, windowMs, T0 + windowMs - 1);
        expect(before.allowed).toBe(false);
        const after = rateLimit(key, limit, windowMs, T0 + windowMs);
        expect(after.allowed).toBe(true);
        expect(after.remaining).toBe(limit - 1);
        expect(after.retryAfterSec).toBe(0);
      }),
      { numRuns: 150 },
    );
  });
});

describe("session-173 P-o: the retryAfterSec formula — the exact ceiling ceil((resetAt − now)/1000), floor 1", () => {
  const caseArb = fc.record({ key: rlKeyArb("o"), limit: limitArb, windowMs: windowArb }).chain((c) =>
    fc.integer({ min: 0, max: c.windowMs - 1 }).map((offset) => ({ ...c, offset })),
  );

  it("probing a blocked bucket at t₀+offset reports ceil((window−offset)/1000), floored at 1", () => {
    fc.assert(
      fc.property(caseArb, ({ key: rawKey, limit, windowMs, offset }) => {
        const key = `${rawKey}#${runId()}`;
        for (let i = 0; i < limit; i++) {
          rateLimit(key, limit, windowMs, T0);
        }
        const blocked = rateLimit(key, limit, windowMs, T0 + offset);
        expect(blocked.allowed).toBe(false);
        const expected = Math.max(1, Math.ceil((windowMs - offset) / 1000));
        expect(blocked.retryAfterSec).toBe(expected);
      }),
      { numRuns: 150 },
    );
  });
});

describe("session-173 P-p: the remaining monotonicity — allowed calls decrement exactly once; blocked calls never transition back", () => {
  it("the quota ladder then the blocked plateau, for any limit/window pair", () => {
    fc.assert(
      fc.property(rlKeyArb("p"), limitArb, windowArb, (rawKey, limit, windowMs) => {
        const key = `${rawKey}#${runId()}`;
        for (let i = 1; i <= limit; i++) {
          const r = rateLimit(key, limit, windowMs, T0);
          expect(r.allowed).toBe(true);
          expect(r.remaining).toBe(limit - i);
          expect(r.retryAfterSec).toBe(0);
        }
        for (let i = 0; i < 3; i++) {
          const r = rateLimit(key, limit, windowMs, T0);
          expect(r.allowed).toBe(false);
          expect(r.remaining).toBe(0);
          expect(r.retryAfterSec).toBeGreaterThanOrEqual(1);
        }
      }),
      { numRuns: 150 },
    );
  });
});

describe("session-173 P-q: the first-call + default-clock equivalence — the additive seam changes nothing on the default form", () => {
  it("a fresh key's first call is always allowed at remaining limit−1; the 4-arg call at Date.now() matches the 3-arg default", () => {
    fc.assert(
      fc.property(rlKeyArb("q"), limitArb, windowArb, (rawKey, limit, windowMs) => {
        const first = rateLimit(`p173q3:${rawKey}#${runId()}`, limit, windowMs);
        expect(first.allowed).toBe(true);
        expect(first.remaining).toBe(limit - 1);
        expect(first.retryAfterSec).toBe(0);

        const injected = rateLimit(`p173q4:${rawKey}#${runId()}`, limit, windowMs, Date.now());
        expect(injected.allowed).toBe(first.allowed);
        expect(injected.remaining).toBe(first.remaining);
        expect(injected.retryAfterSec).toBe(first.retryAfterSec);
      }),
      { numRuns: 150 },
    );
  });
});
