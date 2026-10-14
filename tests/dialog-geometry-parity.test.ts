// Session-92 pins: the dialog-geometry family (the 92-c rotation — the
// dialogs-at-390 walk; every dialog family opened at TRUE 390px on BOTH
// apps, geometry + construction diffed live).
//
// THE HEADLINE (M-92c1) — THE PHANTOM-MB SELECT-TRIGGER GENUS, a NEW
// v4 space-y face: Radix renders a hidden native <select>
// (position:absolute, aria-hidden, NO `hidden` attribute) as the LAST
// TREE-CHILD of every Select group inside <form> contexts — so v4's
// `:where(.space-y-2 > :not(:last-child))` matches the TRIGGER (a
// non-last child!) and gives it margin-bottom: 8px, where v3's
// `:not([hidden]) ~ :not([hidden])` rule gave the trigger margin-TOP
// only (mb always 0 on the reference — live-probed). In plain block
// groups the phantom mb collapses out through the parent's bottom
// edge (invisible — but the computed mb is 8 vs the reference's 0:
// the Lead Status/Source triggers). WHERE THE GROUP IS A DIRECT GRID
// ITEM (grid items establish a BFC — child margins are contained and
// can NEVER collapse out) THE GROUP INFLATES 68 -> 76: LIVE-verified
// on the Account create dialog's Status group (ours 76 vs ref 68; the
// dialog 516 vs 508; the 4th row track 76px vs 68px) and the Contact
// create dialog's "How did you meet?" group (76 vs 68). Proven by
// isolation: the display:block natural-height test returns 68 for
// every group at any width — the +8 exists only in the grid/BFC
// context.
//
// The fix: `DIALOG_GROUP.controlMt` "mt-2" -> "mt-2 mb-0" — mb-0 at
// (0,1,0) beats the :where() rule at (0,0,0), every controlMt trigger
// computes mb 0 = the reference. The token's Input call sites are
// unaffected (Inputs are genuine last children — mb already 0).
//
// - L-92c2 THE CONTACT DIALOG'S SECTIONS: the reference nests each
//   section as space-y-4 [H3, field-group, field-group] (live-probed:
//   two 188px section divs); ours flattened the H3s as separate grid
//   items — the H3->field gap computed 24px (the grid gap-6) where the
//   reference computes 16px (the section's space-y-4) = +16px.
// - M-92c3 THE EVENT DIALOG'S DESCRIPTION ROWS: the reference's
//   textarea is rows=3 (live-probed 90px); ours rendered rows=2 (66px,
//   the HTML default — the rows prop never set; the house's own
//   entity-dialogs comment documents "the Event dialog's rows=3").
// - N-92c4 THE IMPORT DIALOG'S COLUMNS-BOX p2: the box carries
//   space-y-1; the reference's `font-semibold mt-2` p2 COMPUTES 4px
//   (v3's space-y-1 rule at (0,3,0) overrides the (0,1,0) utility);
//   ours computed 8px (v4's :where at (0,0,0) loses to it) — the
//   M-91c2 genus in the INVERSE direction. Fixed to mt-1 per the s11
//   computed-gap rule.
//
// The census anchors: the dialog select census (the 4 controlMt
// triggers; the Event family's BARE-cell selects immune by
// construction), the textarea rows family (Event 3 + Activity 4), and
// the space-y usage census (F-92a1: the s91 header's "all 99 space-y
// usages" was not re-derivable — this suite's algorithm is the
// documented method: the s91 suite's own noComments() strip + a
// global occurrence count over src/**/*.{ts,tsx}).

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const dialogsSrc = () => read("src/components/shared/entity-dialogs.tsx");
const contactsSrc = () => read("src/app/(app)/contacts/contacts-page.tsx");
const layoutSrc = () => read("src/lib/page-layout.ts");

/** Strip block comments (the assertions scan the CODE, not the prose —
 * the s88/s90 needle-in-own-docs lesson: retirement comments
 * legitimately name the retired tokens). */
function noComments(s: string): string {
  return s.replace(/\{\/[\s\S]*?\*\//g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/[^\n]*$/gm, "$1");
}

/** The Account create dialog body: from the ACCOUNT_DIALOG.body div to
 * the DialogFooter. */
function accountBody(): string {
  const src = dialogsSrc();
  const start = src.indexOf("ACCOUNT_DIALOG.body");
  const end = src.indexOf("DialogFooter", start);
  return src.slice(start, end);
}

/** The Contact create dialog body: from the CONTACT_DIALOG.body div to
 * the DialogFooter. */
function contactBody(): string {
  const src = dialogsSrc();
  const start = src.indexOf("CONTACT_DIALOG.body");
  const end = src.indexOf("DialogFooter", start);
  return src.slice(start, end);
}

/** The Event dialog form: from the EVENT_DIALOG.form to the Event
 * dialog's own footer button (the Create Event label — before the
 * ActivityDialog component begins). */
function eventForm(): string {
  const src = dialogsSrc();
  const start = src.indexOf("EVENT_DIALOG.form");
  const end = src.indexOf('"Create Event"', start);
  return src.slice(start, end);
}

/** The Import dialog columns box: the bg-gray-50 box region. */
function importColumnsBox(): string {
  const src = contactsSrc();
  const start = src.indexOf("bg-gray-50 rounded-lg p-3");
  const end = src.indexOf("</div>", src.indexOf("Optional columns", start));
  return src.slice(start, end);
}

describe("session-92 (M-92c1): the phantom-mb select-triggers (the Radix native-select tree-sibling genus)", () => {
  it("DIALOG_GROUP.controlMt gains mb-0 (the phantom margin-bottom neutralized at (0,1,0) vs the :where() (0,0,0) rule)", async () => {
    const L = (await import("@/lib/page-layout")).DIALOG_GROUP;
    expect(L.controlMt).toBe("mt-2 mb-0");
  });

  it("the genus is documented at the token (the hidden native select + v4's :not(:last-child) + the BFC containment)", () => {
    const src = layoutSrc();
    const i = src.indexOf('controlMt: "mt-2 mb-0"');
    const comment = src.slice(Math.max(0, i - 1400), i);
    expect(comment).toMatch(/M-92c1/);
    expect(comment).toMatch(/native/);
    expect(comment).toMatch(/:not\(:last-child\)/);
  });

  it("the dialog select census: exactly 4 triggers ride controlMt + w-full (Account Status, Contact Source, Lead Status + Source)", () => {
    const src = noComments(dialogsSrc());
    const sites = src.match(/controlMt \+ " w-full"/g) ?? [];
    expect(sites.length).toBe(4);
  });

  it("the Event family's selects stay BARE-CELL (className=\"w-full\", no controlMt — no space-y ancestor, immune by construction)", () => {
    const form = noComments(eventForm());
    const bareTriggers = form.match(/<SelectTrigger className="w-full"/g) ?? [];
    expect(bareTriggers.length).toBe(3);
    expect(form).not.toMatch(/<SelectTrigger className={DIALOG_GROUP/);
  });
});

describe("session-92 (L-92c2): the contact dialog's NESTED sections", () => {
  it("each h3 sits INSIDE its space-y-4 section div (the reference's own construction — the H3->field gap 16px, not the grid's 24px)", () => {
    const body = noComments(contactBody());
    // post-fix: the pairGroup opens and the h3 is its FIRST child
    expect(body).toMatch(/CONTACT_DIALOG\.pairGroup}>\s*(?:\{\/\*[\s\S]*?\*\/\s*)?<h3/);
  });

  it("both section headers nest (Contact Details + Professional Details — two sections, the fields follow inside)", () => {
    const body = noComments(contactBody());
    const nested = body.match(/CONTACT_DIALOG\.pairGroup}>[\s\S]{0,400}?<h3/g) ?? [];
    expect(nested.length).toBe(2);
  });

  it("no h3 is a DIRECT child of the body grid (the flattened construction retired)", () => {
    const body = noComments(contactBody());
    // pre-fix the h3 directly followed the avatar section at grid level;
    // post-fix every h3 is preceded by a pairGroup open tag within 400 chars
    const direct = body.match(/<\/div>\s*<h3/g) ?? [];
    expect(direct).toHaveLength(0);
  });

  it("the section wrapper keeps the reference's space-y-4 (the pairGroup token unchanged)", async () => {
    const L = (await import("@/lib/page-layout")).CONTACT_DIALOG;
    expect(L.pairGroup).toBe("space-y-4");
  });
});

describe("session-92 (M-92c3): the Event dialog's Description rows", () => {
  it("the ev-desc Textarea carries rows={3} (the reference's own rows — 90px vs our collapsed 66px)", () => {
    const form = eventForm();
    expect(form).toMatch(/<Textarea id="ev-desc"[^>]*rows=\{3\}/);
  });

  it("the textarea rows family census: Event rows=3 + Activity rows=4 (the two dialog textareas, both the reference's own)", () => {
    const src = noComments(dialogsSrc());
    const rowses = src.match(/rows=\{(\d)\}/g) ?? [];
    expect(rowses).toEqual(["rows={3}", "rows={4}"]);
  });
});

describe("session-92 (N-92c4): the import dialog's columns-box p2 margin", () => {
  it("the Optional-columns p carries mt-1 (the reference COMPUTES 4px — v3's space-y-1 rule at (0,3,0) kills the mt-2)", () => {
    const box = importColumnsBox();
    expect(box).toContain('className="font-semibold mt-1"');
    expect(box).not.toContain('className="font-semibold mt-2"');
  });

  it("the v3-kill is documented (the s11 computed-gap rule, the M-91c2 inverse)", () => {
    const src = contactsSrc();
    const i = src.indexOf('className="font-semibold mt-1"');
    const comment = src.slice(Math.max(0, i - 1200), i);
    expect(comment).toMatch(/N-92c4/);
  });
});

describe("session-92 (F-92a1): the space-y usage census (the documented method)", () => {
  // The s91 header claimed "all 99 space-y usages" — not re-derivable
  // by any method (the raw grep is 172 lines; the comment-stripped
  // occurrence count is the census below). This it IS the method: the
  // s91 suite's own noComments() strip + a global occurrence count
  // over src/**/*.{ts,tsx}. Re-derive here when the codebase changes.
  it("the census: 108 comment-stripped space-y occurrences across the 18 src files that carry one", () => {
    const files = execFileSync(
      "grep",
      ["-rl", "space-y-", `${root}/src`, "--include=*.ts", "--include=*.tsx"],
      { encoding: "utf8" },
    )
      .split("\n")
      .filter(Boolean);
    let total = 0;
    for (const f of files) {
      const stripped = noComments(readFileSync(f, "utf8"));
      total += (stripped.match(/space-y-/g) ?? []).length;
    }
    expect(files.length).toBe(18);
    // session-96 re-anchor: 112 -> 111 (the v4 space-y genus fix on the
    // auth fields — the two `space-y-1.5` field constants retired to the
    // `[&>*+*]:mt-1.5` v3-semantics variant, the google wrap's inert
    // `space-y-3` added inside the new w-full section: net −1)
    // session-98 re-anchor: 111 -> 110 / 19 -> 18 files (the CardHeader
    // base's `space-y-1.5` retired to the `[&>*+*]:mt-1.5` v3-semantics
    // variant — the F-98c1 row-genus fix; card.tsx's only space-y, the
    // file drops out of the census)
    // session-111 re-anchor: 110 -> 108 (the s111 login-family re-walk:
    // the signup titleStack wrapper retired [its inert single-child
    // space-y-2] + the verify headingStack's `space-y-3 sm:space-y-4`
    // re-pinned to the reference's flat `space-y-2` — the sm: arm's
    // second occurrence retired; net −2)
    expect(total).toBe(108);
  });

  it("the s91 header's unstable '99' claim is re-derived (spacey-hazard-parity no longer asserts an un-derivable count)", () => {
    const s91 = read("tests/spacey-hazard-parity.test.ts");
    expect(s91).not.toMatch(/all 99 space-y/);
    expect(s91).toMatch(/108 comment-stripped/);
  });

  it("the SKILL project_state + the PAD row carry the re-derived census (the living docs, method-stated)", () => {
    // session-93 pin-shape repair: the census phrase lives line-wrapped in
    // §16cf ("112\n  comment-stripped space-y occurrences") — the s92 form
    // matched only the UNWRAPPED project_state line and went brittle the
    // moment the s93 project_state stopped repeating it. Flexible
    // whitespace keeps the semantic anchor (the census, method-stated)
    // without depending on where the line breaks.
    expect(read("neo-crm_SKILL.md")).toMatch(/108\s+comment-stripped space-y occurrences/);
    expect(read("Project_Architecture_Document.md")).not.toMatch(/all 99 space-y/);
  });
});

describe("session-92 (F-92a2 + B-92a5 + B-92a4): the audit nanos", () => {
  it("the stat-value-contract header: the leads arm is EXPLICIT (the shared IconStatCard arm) — 2 bare + 4 explicit, no phantom 'leads-contacts-arm' label", () => {
    const header = read("tests/stat-value-contract.test.ts").slice(0, 2400);
    expect(header).toMatch(/two BARE families/);
    expect(header).not.toMatch(/three BARE families/);
    expect(header).not.toMatch(/leads-contacts-arm/);
  });

  it("the constants.test B-2 label: the correct attribution (not 'G-91a2-class')", () => {
    const src = read("tests/constants.test.ts");
    expect(src).not.toMatch(/G-91a2-class/);
    expect(src).toMatch(/B-2-class/);
  });

  it("AGENTS.md carries the §Session-91 history block (the per-session cadence restored)", () => {
    expect(read("AGENTS.md")).toMatch(/### Session-91 — the v4 space-y hazard family/);
  });

  it("the CLAUDE.md stale 1788 anchors are re-derived (the test-pyramid line + the coverage line — F-92a3)", () => {
    const claude = read("CLAUDE.md");
    // session-97 lockstep carry-forward: 1849 -> 1862 (the s97 +13 — the
    // 3 tablet-class baseline pins + the 5 parseNumberArg fail-fast pins
    // + the stale-comment pin + the 4 gate:full pins — the same lockstep
    // s92 performed 1788 -> 1828, s93 1828 -> 1829, s94 1829 -> 1832,
    // s95 1832 -> 1836, s96 1836 -> 1849)
    // session-98 lockstep carry-forward: 1862 -> 1870 (the s98 +8 — the
    // 2 CardHeader row-genus pins + the 2 vs-wins legend pins + the 4
    // sweep docs/per-class-print pins)
    // session-99 lockstep carry-forward: 1870 -> 1872 (the s99 +2 — the
    // landscape table pin + the landscape driftVerdict contrast pin;
    // the banding/doc/explained/gate/lockstep pins are re-anchors,
    // not new its)
    // session-100 lockstep carry-forward: 1872 -> 1880 (the s100 +8 —
    // the 7 clusterDiff seam pins + the 1 --clusters wiring pin; the
    // ALL-FIVE parseNumberArg re-anchor + this lockstep are re-anchors,
    // not new its)
    // session-101 lockstep carry-forward: 1880 -> 1892 (the s101 +12 —
    // the 2 clusterDiff edge-wrap pins + the 10 drift-probe-tool pins;
    // this lockstep is a re-anchor, not a new it)
    // session-102 lockstep carry-forward: 1892 -> 1903 (the s102 +11 —
    // the 11 docs-counts secondary-sites pins; this lockstep is a
    // re-anchor, not a new it)
    // session-103 lockstep carry-forward: 1903 -> 1915 (the s103 +12 —
    // the 11 seeded-charts freeze pins + the s103-maiden sweep-tool
    // floor pin; this lockstep is a re-anchor, not a new it)
    // session-104 lockstep carry-forward: 1915 -> 1921 (the s104 +6 —
    // the docs-counts e2e-count lockstep extension: the AGENTS/CLAUDE/
    // README/PAD e2e-site pins + the e2e stale-form negatives + the
    // mobile-nav suite-count pin; this lockstep is a re-anchor, not a
    // new it)
    // session-105 lockstep carry-forward: unit UNCHANGED at 1921 (the
    // s105 rotation added zero unit its; this lockstep untouched).
    // session-106 lockstep carry-forward: 1921 -> 1922 (the s106 +1 —
    // the docs-counts H1/project_state lockstep it, the F-106a1 fix)
    // + the F-106c1 third site joined: CLAUDE's commands-table unit
    // row ("Vitest unit suites (N checks)") was an UNPINNED
    // live-tense unit-count site — the F-99a1 genus on the CLAUDE
    // commands-table axis, missed by the s102/s104 locksteps (found
    // in-flight during the s106 plan validation).
    // session-107 lockstep carry-forward: 1922 -> 1927 (the s107 +5 —
    // the seeded-reports-kpis freeze suite [+4] + the docs-counts
    // Appendix B totals pin [+1]) + the F-107b1 FOURTH site joined:
    // CLAUDE's gate-order unit half ("`bun run test` (N)") was another
    // UNPINNED live-tense unit-count site — the docs-counts AGENTS
    // gate-order pin covered only AGENTS while CLAUDE's e2e half was
    // already pinned (the asymmetry; found in-flight during the s107
    // plan validation).
    // session-108 lockstep carry-forward: 1927 -> 1932 (the s108 +5 —
    // the calendar-grid freeze suite [+3] + the calendar-cells chip
    // pin [+1] + the docs-counts four-site pin [+1]); the four sites
    // re-anchored, the retired 1927 forms join the negatives below.
    // session-109 lockstep carry-forward: 1932 -> 1934 (the s109 +2 —
    // the activities-calendar-parity row pin [+1] + the docs-counts
    // line-census pin [+1]); the four sites re-anchored again, the
    // retired 1932 forms join the negatives below.
    // session-110 lockstep carry-forward: 1934 -> 1938 (the s110 +4 —
    // the seeded-dashboard-kpis freeze suite, the dashboardKpis seam
    // extraction); the four sites re-anchored again, the retired 1934
    // forms join the negatives below.
    // session-111 lockstep carry-forward: 1938 -> 1942 (the s111 +4 —
    // the login-family LIVE re-walk's four new its; the two re-anchors
    // land in existing its, no net change); the four sites re-anchored
    // again, the retired 1938 forms join the negatives below.
    // session-112 lockstep carry-forward: 1942 -> 1944 (the s112 +2 —
    // the dialog-family LIVE re-walk's two new its: the close-X
    // byte-parity re-pin + the camera aria-label superset pin; both
    // land in EXISTING files); the four sites re-anchored again, the
    // retired 1942 forms join the negatives below.
    // session-113 lockstep carry-forward: 1944 -> 1946 (the s113 +2 —
    // the menu/popover-family LIVE re-walk's two new its: the
    // MENU_CONTENT outline-none retirement re-pin + the Filters
    // field-label LABEL-element pin; both land in page-layout.test.ts);
    // the four sites re-anchored again, the retired 1944 forms join
    // the negatives below.
    // session-114 lockstep carry-forward: 1946 -> 1948 (the s114 +2 —
    // the profile + settings Data-tab family walk's two new its: the
    // profile email/role ID construction pin + the camera/file-input
    // wiring pin; both land in profile-family-parity.test.ts); the
    // four sites re-anchored again, the retired 1946 forms join the
    // negatives below.
    // session-115 lockstep carry-forward: 1948 -> 1950 (the s115 +2 —
    // the Defaults-tab + insights-dialog family walk's two freeze its:
    // the Defaults label htmlFor/id association superset pin
    // [settings-defaults-parity.test.ts] + the insights tabs
    // segmented-variant construction pin [account-surfaces.test.ts]);
    // the four sites re-anchored again, the retired 1948 forms join
    // the negatives below.
    // session-116 lockstep carry-forward: 1950 -> 1951 (the s116 +1 —
    // the reports-tables family walk's freeze it: the ten-CardTitle +
    // risk-construction census pin [reports-tabcontent-parity.test.ts]);
    // the four sites re-anchored again, the retired 1950 forms join
    // the negatives below.
    // session-117 lockstep carry-forward: 1951 -> 1952 (the s117 +1 —
    // the accounts-list family walk's freeze it: the five-KPI-label
    // census pin [account-contacts-parity.test.ts]);
    // the four sites re-anchored again, the retired 1951 forms join
    // the negatives below.
    // session-118 lockstep carry-forward: 1952 -> 1953 (the s118 +1 —
    // the dashboard-charts + leads-statcard family walk's freeze it:
    // the six-label + adjacency census pin
    // [leads-statcard-parity.test.ts]);
    // the four sites re-anchored again, the retired 1952 forms join
    // the negatives below.
    // session-119 lockstep carry-forward: 1953 -> 1956 (the s119 +3 —
    // the contacts-list family walk's freeze its: the
    // primary-foreground re-pin [design-tokens.test.ts] + the
    // four-label + adjacency census pin + the mobile-list empty-state
    // retirement pin [contacts-family-parity.test.ts]);
    // the four sites re-anchored again, the retired 1953 forms join
    // the negatives below.
    expect(claude).toContain("Unit (Vitest, 1956 checks)");
    expect(claude).toContain("(currently 1956)");
    expect(claude).toContain("Vitest unit suites (1956 checks)");
    expect(claude).toContain("`bun run test` (1956)");
    expect(claude).not.toContain("Unit (Vitest, 1953 checks)");
    expect(claude).not.toContain("(currently 1953)");
    expect(claude).not.toContain("Vitest unit suites (1953 checks)");
    expect(claude).not.toContain("`bun run test` (1953)");
    expect(claude).not.toContain("Unit (Vitest, 1952 checks)");
    expect(claude).not.toContain("(currently 1952)");
    expect(claude).not.toContain("Vitest unit suites (1952 checks)");
    expect(claude).not.toContain("`bun run test` (1952)");
    expect(claude).not.toContain("Unit (Vitest, 1951 checks)");
    expect(claude).not.toContain("(currently 1951)");
    expect(claude).not.toContain("Vitest unit suites (1951 checks)");
    expect(claude).not.toContain("`bun run test` (1951)");
    expect(claude).not.toContain("Unit (Vitest, 1950 checks)");
    expect(claude).not.toContain("(currently 1950)");
    expect(claude).not.toContain("Vitest unit suites (1950 checks)");
    expect(claude).not.toContain("`bun run test` (1950)");
    expect(claude).not.toContain("Unit (Vitest, 1948 checks)");
    expect(claude).not.toContain("(currently 1948)");
    expect(claude).not.toContain("Vitest unit suites (1948 checks)");
    expect(claude).not.toContain("`bun run test` (1948)");
    expect(claude).not.toContain("Unit (Vitest, 1946 checks)");
    expect(claude).not.toContain("(currently 1946)");
    expect(claude).not.toContain("Vitest unit suites (1946 checks)");
    expect(claude).not.toContain("`bun run test` (1946)");
    expect(claude).not.toContain("Unit (Vitest, 1944 checks)");
    expect(claude).not.toContain("(currently 1944)");
    expect(claude).not.toContain("Vitest unit suites (1944 checks)");
    expect(claude).not.toContain("`bun run test` (1944)");
    expect(claude).not.toContain("Unit (Vitest, 1942 checks)");
    expect(claude).not.toContain("(currently 1942)");
    expect(claude).not.toContain("Vitest unit suites (1942 checks)");
    expect(claude).not.toContain("`bun run test` (1942)");
    expect(claude).not.toContain("Unit (Vitest, 1938 checks)");
    expect(claude).not.toContain("(currently 1938)");
    expect(claude).not.toContain("Vitest unit suites (1938 checks)");
    expect(claude).not.toContain("`bun run test` (1938)");
    expect(claude).not.toContain("Unit (Vitest, 1934 checks)");
    expect(claude).not.toContain("(currently 1934)");
    expect(claude).not.toContain("Vitest unit suites (1934 checks)");
    expect(claude).not.toContain("`bun run test` (1934)");
    expect(claude).not.toMatch(/1788 checks/);
    expect(claude).not.toMatch(/currently 1788/);
    expect(claude).not.toMatch(/1828 checks/);
    expect(claude).not.toMatch(/1829 checks/);
    expect(claude).not.toMatch(/1832 checks/);
    expect(claude).not.toMatch(/currently 1832/);
    expect(claude).not.toMatch(/1836 checks/);
    expect(claude).not.toMatch(/1849 checks/);
    expect(claude).not.toMatch(/currently 1849/);
    expect(claude).not.toMatch(/currently 1836/);
    expect(claude).not.toMatch(/1862 checks/);
    expect(claude).not.toMatch(/currently 1862/);
    expect(claude).not.toMatch(/1870 checks/);
    expect(claude).not.toMatch(/currently 1870/);
    expect(claude).not.toMatch(/1872 checks/);
    expect(claude).not.toMatch(/currently 1872/);
    expect(claude).not.toMatch(/1880 checks/);
    expect(claude).not.toMatch(/currently 1880/);
    expect(claude).not.toMatch(/1892 checks/);
    expect(claude).not.toMatch(/currently 1892/);
    expect(claude).not.toMatch(/1903 checks/);
    expect(claude).not.toMatch(/currently 1903/);
    expect(claude).not.toMatch(/1915 checks/);
    expect(claude).not.toMatch(/currently 1915/);
    // session-107: the retired 1922 forms join the ladder (CLAUDE keeps
    // no session-history blocks — after the realignment no 1922
    // construction may remain anywhere in the file)
    expect(claude).not.toMatch(/1922 checks/);
    expect(claude).not.toMatch(/currently 1922/);
    expect(claude).not.toMatch(/`bun run test` \(1922\)/);
  });
});
