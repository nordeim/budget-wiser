import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-75 pins: the accounts/contacts TABLE-FAMILY parity suite (the
// 75-c fresh-eyes rotation — the seam's first dedicated rotation, the
// session_142 suggested target). Every pin below is bundle-decoded
// against the fresh-fetched reference (the M/L/N-75 family, validated
// at file:line by the orchestrator).
//
// The decisive contracts:
// - ACCOUNTS KPI: the Overdue Activities value counts ACCOUNTS with >=1
//   overdue scheduled activity (the reference's overdueAccounts memo —
//   `N.filter(te=>te.overdueActivities>0).length`), NOT the raw activity
//   count; the five sparkbars are the reference's STATIC 6-value literals
//   ([50,60,55,70,65,75] blue / [55,60,58,68,65,72] green /
//   [40,45,50,55,58,62] cyan / [60,65,70,75,78,82] purple /
//   [30,35,40,38,42,45] red) — never computed per-industry buckets.
// - ACCOUNTS chrome: the trailing TableHead is w-12; the health badge
//   fallback is the GRAY terminal (bg-gray-100 text-gray-800).
// - ACCOUNTS route: NO _count include (zero consumers); NO
//   lastActivityAt stamp on create (the reference's bce form ships no
//   last-activity field — fresh accounts render "No activity").
// - CONTACTS headers: the Name th is a LIVE sort affordance (onClick +
//   the flex items-center gap-1 hover:text-blue-600 transition-colors
//   inner div + the active-only chevron); the Last Activity th carries
//   cursor-pointer + the onClick DIRECTLY (no inner button, no
//   ArrowUpDown fallback — the chevron renders only when active).
// - CONTACTS panel: the Filters button flips variant when open; the kke
//   panel ships SIX groups (Engagement Level last — High/Medium/Low);
//   every checkbox is the kit's button-role Checkbox primitive (never a
//   native input).
// - CONTACTS stats: all four cards derive from the FILTERED memo;
//   "Top Decision Makers" counts BOTH roles (Decision Maker OR Key
//   Contact); the card is the reference's Rx construction (items-start
//   wrapper, flex-1 left, the gray-600 label + gray-900 value with
//   mb-2, the 48px p-3 chip with the w-6 h-6 text-white icon).
// - CONTACTS empty/hygiene: the table empty cell is the rich stack (the
//   w-12 h-12 text-gray-300 icon + the font-medium line + the text-sm
//   hint); the mobile empty p is BARE; the search scope matches
//   name/email/company only; the null-activity sort fallback is the
//   epoch 0; the scanFile resets on dialog close.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const accountsPage = () => stripComments(read("src/app/(app)/accounts/accounts-page.tsx") ?? "");
const accountsRoute = () => stripComments(read("src/app/api/accounts/route.ts") ?? "");
const contactsPage = () => stripComments(read("src/app/(app)/contacts/contacts-page.tsx") ?? "");
const pageParts = () => stripComments(read("src/components/shared/page-parts.tsx") ?? "");

describe("session-75: the accounts KPI family", () => {
  it("the Overdue Activities KPI counts ACCOUNTS with >=1 overdue activity (the distinct-accountId Set)", () => {
    const src = accountsPage();
    // The reference's memo: W = N.filter(te => te.overdueActivities > 0).length
    // — overdueAccounts, rendered value:M.overdueAccounts. Ours counted raw
    // overdue ACTIVITIES (diverges whenever any account carries 2+).
    expect(src).toMatch(/new Set\(/);
    expect(src).toMatch(/\.size/);
    const overdueIdx = src.indexOf("Overdue Activities");
    expect(overdueIdx).toBeGreaterThan(-1);
    // The Set construction feeds the KPI value (anchored near the card).
    const setIdx = src.indexOf("new Set(");
    expect(setIdx).toBeGreaterThan(-1);
  });

  it("the five sparkbars are the reference's STATIC 6-value literals", () => {
    const src = accountsPage();
    expect(src).toContain("[50, 60, 55, 70, 65, 75]");
    expect(src).toContain("[55, 60, 58, 68, 65, 72]");
    expect(src).toContain("[40, 45, 50, 55, 58, 62]");
    expect(src).toContain("[60, 65, 70, 75, 78, 82]");
    expect(src).toContain("[30, 35, 40, 38, 42, 45]");
    // The computed per-industry bucket memos retire.
    expect(src).not.toMatch(/industrySpark/);
    expect(src).not.toMatch(/activeSpark/);
    expect(src).not.toMatch(/revenueSpark/);
  });

  // Session-117 (D-117a2 — the accounts-list family walk's freeze): the
  // five KPI labels were never pinned as a set ("Total Accounts" appeared
  // in ZERO test assertions before this it). The per-card adjacency
  // (label -> the next label) pins each card's OWN trend/color pair —
  // trend="up" on the first four, NONE on Overdue (the reference's own
  // call-site quirk, the L-90c4 decode); the arm census on the
  // comment-stripped source pins the SITE TOTALS: a fifth trend site or a
  // seventh color site is a parity event, not a growth (the sixth color
  // site is the Cards-view Avatar's hex prop).
  it("the five KPI labels + the per-card trend/color pairs (the s117 census pin)", () => {
    const src = accountsPage();
    const cards: Array<{ label: string; trend: string | null; color: string }> = [
      { label: "Total Accounts", trend: "up", color: "blue" },
      { label: "Active Accounts", trend: "up", color: "green" },
      { label: "Key Accounts", trend: "up", color: "cyan" },
      { label: "Total Revenue", trend: "up", color: "purple" },
      { label: "Overdue Activities", trend: null, color: "red" },
    ];
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i]!;
      const start = src.indexOf(`label="${card.label}"`);
      expect(start, `the ${card.label} card must exist`).toBeGreaterThan(-1);
      const end =
        i + 1 < cards.length
          ? src.indexOf(`label="${cards[i + 1]!.label}"`)
          : src.indexOf('color="red"', start) + 12;
      expect(end).toBeGreaterThan(start);
      const slice = src.slice(start, end);
      if (card.trend) {
        expect(slice, `${card.label}: the trend arm`).toContain(`trend="${card.trend}"`);
      } else {
        expect(slice, "Overdue: NO trend arm (the reference's own quirk)").not.toContain(`trend="up"`);
      }
      expect(slice, `${card.label}: the color KEY`).toContain(`color="${card.color}"`);
    }
    // The arm census (comment-stripped): trend="up" at EXACTLY four
    // sites; color= at EXACTLY six (the five KPI keys + the Avatar hex).
    expect(src.match(/trend="up"/g) ?? []).toHaveLength(4);
    expect(src.match(/color="/g) ?? []).toHaveLength(6);
  });

  it("the trailing TableHead is w-12 (the reference's literal)", () => {
    const src = accountsPage();
    expect(src).toMatch(/<TableHead className="w-12" \/>/);
    expect(src).not.toMatch(/<TableHead className="w-10" \/>/);
  });

  it("the health badge fallback is the GRAY terminal (not the Healthy green)", () => {
    const src = accountsPage();
    expect(src).toMatch(/bg-gray-100 text-gray-800/);
    expect(src).not.toMatch(/ACCOUNT_HEALTH_BADGE\.Healthy/);
  });
});

describe("session-75: the accounts route hygiene", () => {
  it("the GET ships NO _count include (zero consumers — dead payload)", () => {
    const src = accountsRoute();
    expect(src).not.toMatch(/_count/);
  });

  it("the create route stamps NO lastActivityAt (the reference's form ships no last-activity field)", () => {
    const src = accountsRoute();
    expect(src).not.toMatch(/lastActivityAt/);
  });
});

describe("session-75: the contacts sortable headers", () => {
  it("the Name th is a LIVE sort affordance: onClick + the hover family + the active-only chevron", () => {
    const src = contactsPage();
    const i = src.indexOf('toggleSort("name")');
    expect(i).toBeGreaterThan(-1);
    const block = src.slice(Math.max(0, i - 400), i + 400);
    expect(block).toMatch(/hover:text-blue-600/);
    expect(block).toMatch(/flex items-center gap-1/);
    // The chevron renders ONLY while the column is active (no fallback glyph).
    expect(block).toMatch(/sortKey === "name" &&/);
  });

  it("the Last Activity th carries cursor-pointer + the onClick DIRECTLY (no inner button, no ArrowUpDown fallback)", () => {
    const src = contactsPage();
    const i = src.indexOf("Last Activity");
    expect(i).toBeGreaterThan(-1);
    const block = src.slice(Math.max(0, i - 700), i + 120);
    expect(block).toMatch(/cursor-pointer/);
    expect(block).toMatch(/toggleSort\("lastActivity"\)/);
    expect(block).toMatch(/hover:text-blue-600/);
    expect(src).not.toMatch(/ArrowUpDown/);
    expect(src).not.toMatch(/<button type="button" className="inline-flex items-center gap-1"/);
  });

  it("the null-activity sort fallback is the epoch 0 (not createdAt)", () => {
    const src = contactsPage();
    expect(src).not.toMatch(/\?\? a\.createdAt/);
    expect(src).not.toMatch(/\?\? b\.createdAt/);
  });
});

describe("session-75: the contacts filter panel (kke)", () => {
  it("the Filters button flips variant when the panel is open", () => {
    const src = contactsPage();
    expect(src).toMatch(/variant=\{showFilters \? "default" : "outline"\}/);
  });

  it("the panel ships SIX groups — Engagement Level last (High/Medium/Low)", () => {
    const src = contactsPage();
    expect(src).toContain("Engagement Level");
    // The group rides the High/Medium/Low vocabulary with engagement- ids.
    expect(src).toMatch(/engagement-\$\{/);
    // The filter clause exists.
    expect(src).toMatch(/engagementLevels/);
    // The group is the LAST card (after the Source group's map).
    const srcIdx = src.indexOf("CONTACT_SOURCE_OPTIONS.map");
    const engIdx = src.indexOf(">Engagement Level<");
    expect(engIdx).toBeGreaterThan(srcIdx);
  });

  it("every panel checkbox is the kit's button-role Checkbox primitive (zero native checkbox inputs)", () => {
    const src = contactsPage();
    expect(src).not.toMatch(/type="checkbox"/);
    expect(src).toMatch(/onCheckedChange/);
  });
});

describe("session-75: the contacts stat cards (the Rx construction)", () => {
  it("all four cards derive from the FILTERED memo", () => {
    const src = contactsPage();
    const i = src.indexOf("Total Contacts");
    const block = src.slice(i, i + 1200);
    expect(block).toMatch(/filtered\.length/);
    expect(block).not.toMatch(/contacts\.filter/);
    expect(block).not.toMatch(/contacts\.length/);
  });

  it("Top Decision Makers counts BOTH roles (Decision Maker OR Key Contact)", () => {
    const src = contactsPage();
    const i = src.indexOf("Top Decision Makers");
    const block = src.slice(i + "Top Decision Makers".length, i + 400);
    expect(block).toMatch(/"Decision Maker"/);
    expect(block).toMatch(/"Key Contact"/);
  });

  it("the card anatomy: items-start wrapper, flex-1 left, gray-600 label, gray-900 value, the 48px p-3 chip with the w-6 h-6 icon", () => {
    const src = pageParts();
    // The contacts arm (after the leads early-return).
    const i = src.indexOf('variant === "leads"');
    const contactsArm = src.slice(i);
    expect(contactsArm).toMatch(/flex items-start justify-between/);
    expect(contactsArm).not.toMatch(/flex items-center justify-between gap-3/);
    expect(contactsArm).toMatch(/text-sm font-medium text-gray-600 mb-2/);
    expect(contactsArm).toMatch(/text-3xl font-bold text-gray-900 mb-2/);
    expect(contactsArm).toMatch(/p-3 rounded-lg/);
    // The icon class (the reference's `w-6 h-6 text-white`) rides the
    // contacts page's call sites.
    const page = contactsPage();
    expect(page).toMatch(/w-6 h-6 text-white/);
  });
});

describe("session-75: the contacts empty states + hygiene", () => {
  it("the table empty cell is the rich stack (icon + font-medium line + text-sm hint)", () => {
    const src = contactsPage();
    expect(src).toContain("Try adjusting your search or filters");
    expect(src).toMatch(/w-12 h-12 text-gray-300/);
    expect(src).toMatch(/font-medium/);
  });

  it("the mobile card list carries NO empty-state branch (the s119 retirement — the reference's empty container)", () => {
    // Session-119 (D-119a0, the 119-c walk's F-119c1): the s75-era
    // L-75c2-9 "bundle-decoded bare p" reading was an invention — the
    // LIVE reference renders the EMPTY lg:hidden container at zero
    // data (childN 0, probe-verified at both widths). The bare-p
    // branch retired; the map is the container's only child. This
    // it's s75-era form pinned the retired string — flipped to the
    // retirement contract (the s119 walk's live evidence).
    const src = contactsPage();
    expect(src).not.toMatch(/py-8 text-center text-sm text-muted/);
    expect(src).not.toMatch(/text-center text-gray-500 py-8/);
    const mobile = src.slice(src.indexOf("CONTACTS_LAYOUT.mobileCards"));
    expect(mobile).not.toMatch(/length === 0 \?/);
    expect(mobile).toMatch(/filtered\.map\(\(c\) =>/);
  });

  it("the search scope matches name/email/company only (position retired)", () => {
    const src = contactsPage();
    const i = src.indexOf("const q = search.trim().toLowerCase();");
    const block = src.slice(i, i + 300);
    expect(block).not.toContain("position");
  });

  it("the scanFile resets when the Scan dialog closes (no stale Selected line)", () => {
    const src = contactsPage();
    const i = src.indexOf("open={scanOpen}");
    expect(i).toBeGreaterThan(-1);
    const block = src.slice(Math.max(0, i - 100), i + 500);
    expect(block).toMatch(/setScanFile\(null\)/);
  });

  it("the mobile-card map carries no dead ve (the row state stays row-side)", () => {
    const src = contactsPage();
    // Exactly ONE priority === "Key" read (the row's ve) — the mobile map's
    // dead copy retires.
    const hits = src.match(/priority === "Key"/g) ?? [];
    expect(hits.length).toBe(1);
  });

  it("BOTH avatar surfaces carry the photoUrl conditional (the table row AND the mobile card — the img over the initial)", () => {
    // Session-121 (D-121a2, the 121-c walk): the s30 photo family's two
    // LIST carriers were pinned NOWHERE at the unit level (the table-row
    // cell e2e-only via S30-P2; the mobile-card branch — the lg:hidden
    // face the Desktop-Chrome e2e never rides — pinned on NO axis).
    // The walk live-verified both (PASS 2: the Photo Walk row/card render
    // the img; the 15 seeded rows/cards render the initials). Pinned as
    // the source-shape contract: each carrier's gradient circle carries
    // EXACTLY the photoUrl ternary.
    const src = contactsPage();
    // The TABLE ROW avatar (w-11 h-11 + ring): the img.object-cover branch
    // over the charAt(0).toUpperCase() initial.
    const rowAvatar = src.slice(src.indexOf('w-11 h-11 bg-gradient-to-br'));
    expect(rowAvatar.slice(0, 400)).toMatch(
      /c\.photoUrl \? \(\s*<img src=\{c\.photoUrl\} alt=\{c\.name\} className="w-full h-full object-cover" \/>\s*\) : \(/,
    );
    expect(rowAvatar.slice(0, 700)).toMatch(
      /charAt\(0\)\.toUpperCase\(\)/,
    );
    // The MOBILE CARD avatar (w-12 h-12, no ring): the same ternary —
    // the ONLY other photoUrl read in the page (exactly two, both
    // carriers, no third branch).
    const mobileAvatar = src.slice(src.indexOf("CONTACTS_LAYOUT.mobileCards"));
    expect(mobileAvatar.slice(0, 900)).toMatch(
      /c\.photoUrl \? \(\s*<img src=\{c\.photoUrl\} alt=\{c\.name\} className="w-full h-full object-cover" \/>\s*\) : \(/,
    );
    const photoReads = src.match(/c\.photoUrl \?/g) ?? [];
    expect(photoReads.length).toBe(2);
  });
});

// Session-133 (D-133a2 — the accounts-list family third-cycle re-check's
// freeze pins, the L-133a5 gap): the walk censused the 8-heads set + the
// toolbar construction byte-equal both apps at both viewports (s117 + the
// s133 re-check) but neither was ever PINNED — "Account Name" appeared in
// ZERO test assertions before this block (the exact D-116a2/D-132a0
// genus). The runtime rects/fonts/inks stay walk-verified per re-check
// cycle; these source censuses pin the SET + the ORDER + the COUNT — a
// ninth head, a reorder, or a new toolbar control is a parity event, not
// a growth.
describe("session-133: the accounts table + toolbar freeze", () => {
  it("the eight table heads as an ordered set (the s117/s133 walk census)", () => {
    const src = accountsPage();
    const heads = [
      "Account Name",
      "Industry",
      "Revenue",
      "Tier",
      "Owner",
      "Last Activity",
      "Status",
    ];
    let prev = -1;
    for (const h of heads) {
      const i = src.indexOf(`<TableHead>${h}</TableHead>`);
      expect(i, `the ${h} head must exist as a bare TableHead`).toBeGreaterThan(-1);
      expect(i, `the ${h} head must keep the census order`).toBeGreaterThan(prev);
      prev = i;
    }
    // exactly SEVEN bare text heads + exactly ONE w-12 trailing head
    expect(src.match(/<TableHead>[A-Z][^<]*<\/TableHead>/g) ?? []).toHaveLength(7);
    expect(src.match(/<TableHead className="w-12" \/>/g) ?? []).toHaveLength(1);
  });

  it("the toolbar construction freeze (the s8 stack + the s133 walk census)", () => {
    const src = accountsPage();
    // The reference's stack: [Table/Cards switcher][density (empty label,
    // dead)][More outline h-8 dead] BEFORE the search, then Export CSV —
    // the s8-3 re-pin, walk-verified s117 + s133 (both apps stack the
    // children flex-col below sm, the rows exactly 220px @390).
    const order = [
      'aria-label="Accounts view"', // the Table/Cards switcher trigger
      "VIEW_SWITCHER.options.map", // the Table/Cards options ride
      'aria-label="Row density"', // the dead density select
      "TABLE_TOOLBAR.densityOptions.map", // the Standard/Detailed pair
      'aria-label="More"', // the dead More outline
      'placeholder="Search accounts..."', // the search input
    ];
    let prev = -1;
    for (const marker of order) {
      const i = src.indexOf(marker);
      expect(i, `the ${marker} control must exist`).toBeGreaterThan(-1);
      expect(i, `the ${marker} control must keep the stack order`).toBeGreaterThan(prev);
      prev = i;
    }
    // the export pair: the header's icon+hidden-span button + the
    // toolbar's text-only button — both ride onClick={exportAccounts}
    // (exactly TWO sites; the header label is the hidden sm:inline span,
    // icon-only @390 — the L-132c3 discipline).
    expect(src.match(/onClick=\{exportAccounts\}/g) ?? []).toHaveLength(2);
    expect(src).toContain('<span className="hidden sm:inline">Export CSV</span>');
  });
});
