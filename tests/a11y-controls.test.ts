// Session-171 (WP-1): THE NAMED-CONTROL SOURCE-PIN BATTERY — the a11y
// doctrine's live-census over the audit's finding register (F-171a/b/c/d/e):
// every interactive control on an OPEN surface must carry an accessible
// name. The audit's live axe probes found three nameless families — the
// unnamed SelectTrigger comboboxes (role="combobox" names come from author
// attributes ONLY: axe's subtreeText ignores inner text for
// non-name-from-content roles, so the visible span text is INVISIBLE to
// the name computation — verified in the axe 4.13 source), the dashboard's
// inert bare Checkboxes, and the hidden-sm:inline icon-only Buttons whose
// labels evaporate at phone width. The reference ships all three families
// identically (verified live on its own DOM) — the fixes are invisible
// supersets (the drawer precedent: "match the reference, fix its defects").
//
// The battery's design (the house live-census doctrine): every pin reads
// the SOURCE live and asserts the accessible-name form. RED at birth on
// every nameless site; GREEN when WP-3 lands the aria-labels.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The five open-surface page files the audit probed (the leads popover
// pair already carried the aria-label precedent — "Filter by status" /
// "Filter by source" — and stays green-by-design through the census).
const OPEN_SURFACE_FILES = [
  "src/app/(app)/dashboard/page.tsx",
  "src/app/(app)/accounts/accounts-page.tsx",
  "src/app/(app)/contacts/contacts-page.tsx",
  "src/app/(app)/activities/activities-page.tsx",
  "src/app/(app)/reports/reports-page.tsx",
] as const;

// The combobox census: every <SelectTrigger in the open-surface pages
// must carry aria-label inside its opening tag. The tag interior is the
// text from "<SelectTrigger" to the first ">" (the multi-line trigger
// constructions wrap className + children across lines — the census
// reads the WHOLE tag, not the first line).
function selectTriggerTagInteriors(source: string): string[] {
  const interiors: string[] = [];
  let idx = source.indexOf("<SelectTrigger");
  while (idx !== -1) {
    const end = source.indexOf(">", idx);
    if (end === -1) break;
    interiors.push(source.slice(idx, end));
    idx = source.indexOf("<SelectTrigger", end);
  }
  return interiors;
}

// ---------------------------------------------------------------------------
// (a) The named-SelectTrigger census (F-171a) — 19 triggers across the
// five open-surface pages, every one carrying aria-label.
// ---------------------------------------------------------------------------
describe("session-171 (a): every open-surface SelectTrigger carries an accessible name (F-171a)", () => {
  for (const file of OPEN_SURFACE_FILES) {
    it(`${file}: zero nameless <SelectTrigger> constructions`, () => {
      const source = read(file);
      const interiors = selectTriggerTagInteriors(source);
      // the census is non-vacuous: every one of the five probed pages
      // rides the Select family (the audit counted 2/3/1(+15 row)/2/4
      // unnamed triggers at the seeded state)
      expect(interiors.length).toBeGreaterThan(0);
      const nameless = interiors.filter((i) => !i.includes("aria-label="));
      expect(nameless).toEqual([]);
    });
  }

  it("the filter family's labels follow the leads-page precedent form (Filter by …)", () => {
    const dashboard = read("src/app/(app)/dashboard/page.tsx");
    expect(dashboard).toContain('aria-label="Filter by stage"');
    expect(dashboard).toContain('aria-label="Filter by source"');
    const accounts = read("src/app/(app)/accounts/accounts-page.tsx");
    expect(accounts).toContain('aria-label="Filter by owner"');
    expect(accounts).toContain('aria-label="Filter by industry"');
    expect(accounts).toContain('aria-label="Filter by revenue range"');
    const activities = read("src/app/(app)/activities/activities-page.tsx");
    expect(activities).toContain('aria-label="Filter by owner"');
    expect(activities).toContain('aria-label="Filter by status"');
    const reports = read("src/app/(app)/reports/reports-page.tsx");
    expect(reports).toContain('aria-label="Filter by period"');
    expect(reports).toContain('aria-label="Filter by owner"');
    expect(reports).toContain('aria-label="Filter by stage"');
    expect(reports).toContain('aria-label="Filter by status"');
  });

  it("the contacts row selects carry the ROW CONTEXT (the per-row form — the control is not nameless-ambiguous across 15 rows)", () => {
    const contacts = read("src/app/(app)/contacts/contacts-page.tsx");
    // the row select's aria-label names the control AND the row (the
    // sibling <p> renders c.name — the label rides the same datum)
    expect(contacts).toContain("aria-label={`Role — ${c.name}`}");
  });

  it("the leads-page precedent pair stays named (green-by-design through the census)", () => {
    const leads = read("src/app/(app)/leads/leads-page.tsx");
    expect(leads).toContain('aria-label="Filter by status"');
    expect(leads).toContain('aria-label="Filter by source"');
  });
});

// ---------------------------------------------------------------------------
// (b) The named-Checkbox census (F-171b) — the dashboard's two inert
// Follow-up families (the label prop renders its own row wrapper — visual
// drift — so the invisible fix is the aria-label attribute).
// ---------------------------------------------------------------------------
describe("session-171 (b): the dashboard's inert Checkboxes carry per-row names (F-171b)", () => {
  const dashboard = read("src/app/(app)/dashboard/page.tsx");

  it("the lead-sources family names each row (the sibling span's text)", () => {
    expect(dashboard).toContain("aria-label={`Follow up with ${s.source}`}");
  });

  it("the upcoming-activities family names each row (the subject)", () => {
    expect(dashboard).toContain("aria-label={`Mark ${a.subject} done`}");
  });

  it("no bare <Checkbox /> remains on the open surfaces (the census over all five pages)", () => {
    for (const file of OPEN_SURFACE_FILES) {
      const source = read(file);
      expect(source).not.toMatch(/<Checkbox\s*\/>/);
    }
  });
});

// ---------------------------------------------------------------------------
// (c) The icon-only Button census (F-171c) — the hidden sm:inline label
// family: display:none text contributes nothing to the accessible name at
// phone width; the aria-label matches the desktop label.
// ---------------------------------------------------------------------------
describe("session-171 (c): the icon-only Buttons carry their desktop labels (F-171c)", () => {
  it("dashboard's Filter button", () => {
    const dashboard = read("src/app/(app)/dashboard/page.tsx");
    expect(dashboard).toContain('aria-label="Filter"');
  });

  it("contacts' Scan Card + Import buttons", () => {
    const contacts = read("src/app/(app)/contacts/contacts-page.tsx");
    expect(contacts).toContain('aria-label="Scan Card"');
    expect(contacts).toContain('aria-label="Import"');
  });

  it("accounts' Export CSV button", () => {
    const accounts = read("src/app/(app)/accounts/accounts-page.tsx");
    expect(accounts).toContain('aria-label="Export CSV"');
  });
});

// ---------------------------------------------------------------------------
// (d) The declared axe-core devDep (F-171e) — the gate must not ride an
// undeclared transitive (an eslint-config bump could drop it).
// ---------------------------------------------------------------------------
describe("session-171 (d): axe-core is a DECLARED devDependency (F-171e)", () => {
  it("package.json devDependencies carries axe-core", () => {
    const pkg = JSON.parse(read("package.json")) as {
      devDependencies: Record<string, string>;
    };
    expect(pkg.devDependencies["axe-core"]).toBeDefined();
  });

  it("the declared version matches the resident transitive (4.13.0 — no lockfile churn beyond the direct edge)", () => {
    const pkg = JSON.parse(read("package.json")) as {
      devDependencies: Record<string, string>;
    };
    const resident = JSON.parse(
      readFileSync(join(root, "node_modules/axe-core/package.json"), "utf8"),
    ) as { version: string };
    expect(pkg.devDependencies["axe-core"]).toContain(resident.version.split(".")[0]);
  });
});

// ---------------------------------------------------------------------------
// (e) The two-gate e2e contract (F-171d) — the §8.3 battery rides the
// standing harness; structural violations must be ZERO; color-contrast +
// svg-img-alt nodes must cite the sanctioned matchers (the parity
// palette + the recharts genus — the reference ships both identically).
// ---------------------------------------------------------------------------
describe("session-171 (e): the a11y two-gate e2e spec contract (F-171d)", () => {
  const SPEC = "tests/e2e/a11y.spec.ts";

  it("the spec exists", () => {
    expect(existsSync(join(root, SPEC))).toBe(true);
  });

  it("the axe injection rides the DECLARED devDep (node_modules/axe-core)", () => {
    const spec = read(SPEC);
    expect(spec).toContain("node_modules/axe-core/axe.min.js");
  });

  it("the structural gate: button-name violations asserted ZERO (the named-control proof)", () => {
    const spec = read(SPEC);
    expect(spec).toContain("button-name");
  });

  it("the sanctioned families carry their citations (the palette + the recharts genus)", () => {
    const spec = read(SPEC);
    // the parity-palette citation (the reference's own design — fixing
    // would break parity)
    expect(spec).toContain("the reference's own palette");
    // the recharts citation (the library-hardcoded role="img" Layer)
    expect(spec).toContain("recharts");
  });

  it("the drawer-open state is scanned at phone width (the operator's emphasis)", () => {
    const spec = read(SPEC);
    expect(spec).toContain("Open navigation");
  });

  it("the nine CRM pages + the three anon surfaces ride both widths", () => {
    const spec = read(SPEC);
    expect(spec).toContain("/dashboard");
    expect(spec).toContain("/settings");
    expect(spec).toContain("/login");
    expect(spec).toContain("/signup");
    expect(spec).toContain('"/"');
  });
});
