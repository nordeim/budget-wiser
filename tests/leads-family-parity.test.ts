import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-77 pins: the leads-page FAMILY parity suite (the 77-c
// fresh-eyes rotation — the s29/s31-era interactive table's first
// dedicated rotation, the session_147 suggested target). Every pin
// below is bundle-decoded against the fresh-fetched reference (the
// M/L/N-77 family, validated at file:line by the orchestrator;
// component identities: Qke page + Gke popover + Sm card + Xke charts
// + Tke create + Mke edit; the icon aliases resolved at their tr()
// assignments: Wc TrendingUp / op Target / MB CircleCheckBig / BQ
// CircleX / nJ Percent / qd Calendar / l_ ArrowUpDown).
//
// The decisive contracts:
// - SORTABLE HEADERS: a STATIC w-4 h-4 ArrowUpDown inside a bare
//   `flex items-center gap-2` (no chevron flip — the s29 pin
//   bundle-falsified; the flip is the CONTACTS page's s75-P6
//   behavior); the comparator is raw code-unit (no localeCompare);
//   a new sort key ALWAYS starts "asc" (no createdAt→desc case).
// - WON-VS-LOST: the reference's r-memo — buckets by created date,
//   "Oct 2026" labels (month short + year numeric), insertion order
//   over the sorted filtered list, slice(-6) cap.
// - LOADING ROW: a colSpan-9 "Loading..." row while the first fetch
//   is in flight (the page-local leadsLoaded flag — the s76
//   "Loading activities..." precedent), THEN "No leads found".
// - EDIT SUBMIT: the EntityEditDialog submit carries DIALOG_SUBMIT
//   (the reference's in-dialog --primary is the stock shadcn dark —
//   the create dialogs already carry it; the edit arm was blue).
// - CREATE LABELS: "Creating..." on the three create submits (the
//   Event/Activity dialogs keep "Saving..." — the s76 pair).
// - SM CARD: the class-pair chip map (bg-*-50 text-*-600), the
//   responsive icon w-4 h-4 sm:w-5 sm:h-5, the gray-600 label, the
//   gray-500 mt-1 subValue, the cyan Avg-cycle pair, the
//   $${value.toLocaleString()} raw subValues.
// - MIN DEAL VALUE: the RAW STRING semantics (a typed "0" is ACTIVE
//   and excludes zero-value leads; fractions not floored) — the
//   reference's own truthy-string quirk.
// - SEARCH: the raw untrimmed query.
// - POPOVER CHROME: shadow-md + sideOffset 4 (the stock
//   PopoverContent pair).
// - SELECT FOCUS: the trigger's ring fires on MOUSE CLICK (plain
//   focus:, not focus-visible: — the S10-2 pin's model corrected;
//   the Input + Button bases ARE focus-visible on both apps).
// - HYGIENE: no min={0} on the create-value input; the store
//   comment's rationale re-derived (the reference is mutate +
//   invalidate-on-success, NOT optimistic).

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const leadsPage = () => stripComments(read("src/app/(app)/leads/leads-page.tsx") ?? "");
const leadFilters = () => stripComments(read("src/lib/lead-filters.ts") ?? "");
const pageParts = () => stripComments(read("src/components/shared/page-parts.tsx") ?? "");
const pageLayoutSrc = () => stripComments(read("src/lib/page-layout.ts") ?? "");
const entityDialogs = () => stripComments(read("src/components/shared/entity-dialogs.tsx") ?? "");
const entityEditDialog = () => stripComments(read("src/components/shared/entity-edit-dialog.tsx") ?? "");
const selectSrc = () => stripComments(read("src/components/ui/select.tsx") ?? "");
const crmStore = () => stripComments(read("src/stores/crm-store.ts") ?? "");

describe("session-77: the sortable-header family (M-77c1 + L-77c9)", () => {
  it("the sortable headers render the STATIC ArrowUpDown — no chevron flip (the s29 pin bundle-falsified)", () => {
    const src = leadsPage();
    // The reference: ["Lead Name", l_] — a static w-4 h-4 glyph, no
    // conditional. The chevron ternary is the contacts page's family.
    const sortHead = src.slice(src.indexOf("function SortHead"));
    expect(sortHead).toContain("<ArrowUpDown className=\"h-4 w-4\" />");
    expect(sortHead).not.toMatch(/active\s*\?/);
    expect(sortHead).not.toContain("ChevronUp");
    expect(sortHead).not.toContain("ChevronDown");
  });

  it("the label/icon container is the bare flex items-center gap-2 (no inline-flex, no tracking-wide)", () => {
    const src = leadsPage();
    const sortHead = src.slice(src.indexOf("function SortHead"));
    expect(sortHead).toContain('className="flex items-center gap-2"');
    expect(sortHead).not.toContain("tracking-wide");
    expect(sortHead).not.toContain("inline-flex");
  });

  it("the inactive glyph carries NO text-subtle tint (the th color inherits)", () => {
    const src = leadsPage();
    const sortHead = src.slice(src.indexOf("function SortHead"));
    expect(sortHead).not.toContain("text-subtle");
  });

  it("the comparator is raw code-unit for name/email (no localeCompare)", () => {
    const src = leadsPage();
    expect(src).not.toContain("localeCompare");
    expect(src).toMatch(/a\.name < b\.name \? -1 : a\.name > b\.name \? 1 : 0/);
    expect(src).toMatch(/\(a\.email \?\? ""\) < \(b\.email \?\? ""\) \? -1 : \(a\.email \?\? ""\) > \(b\.email \?\? ""\) \? 1 : 0/);
  });

  it("a new sort key ALWAYS starts asc (no createdAt→desc special case)", () => {
    const src = leadsPage();
    expect(src).not.toMatch(/key === "createdAt" \? "desc" : "asc"/);
    expect(src).toMatch(/setSortDir\("asc"\)/);
  });
});

describe("session-77: the won-vs-lost series (M-77c2 — the reference's r-memo)", () => {
  it("buckets by the CREATED date (not closedAt ?? createdAt)", () => {
    const src = leadsPage();
    const fn = src.slice(src.indexOf("function buildWonVsLost"), src.indexOf("export default function LeadsPage"));
    expect(fn).toContain("new Date(l.createdAt)");
    expect(fn).not.toContain("closedAt");
  });

  it("the month label is the month+year form (\"Oct 2026\")", () => {
    const src = leadsPage();
    const fn = src.slice(src.indexOf("function buildWonVsLost"), src.indexOf("export default function LeadsPage"));
    expect(fn).toMatch(/toLocaleDateString\("en-US", \{ month: "short", year: "numeric" \}\)/);
    expect(fn).not.toContain("toLocaleString");
  });

  it("insertion order over the sorted list — NO stamp sort", () => {
    const src = leadsPage();
    const fn = src.slice(src.indexOf("function buildWonVsLost"), src.indexOf("export default function LeadsPage"));
    expect(fn).not.toMatch(/\.sort\(/);
    expect(fn).toContain("Object.values");
  });

  it("capped at the LAST 6 buckets (slice(-6))", () => {
    const src = leadsPage();
    const fn = src.slice(src.indexOf("function buildWonVsLost"), src.indexOf("export default function LeadsPage"));
    expect(fn).toContain(".slice(-6)");
  });

  it("the signature takes the sorted rows (the won/lost partition rides inside — the insertion order must follow the merged sort)", () => {
    const src = leadsPage();
    expect(src).toMatch(/function buildWonVsLost\(rows: Lead\[\]\)/);
    expect(src).toMatch(/const wonVsLost = buildWonVsLost\(filtered\)/);
    expect(src).not.toMatch(/buildWonVsLost\(won, lost\)/);
  });
});

describe("session-77: the Loading row (M-77c3 — the reference's A ternary)", () => {
  it("the page-local leadsLoaded flag flips when the fetch resolves", () => {
    const src = leadsPage();
    expect(src).toMatch(/leadsLoaded/);
    expect(src).toMatch(/setLeadsLoaded\(true\)/);
  });

  it("the tbody renders Loading... BEFORE the empty/rows ternary", () => {
    const src = leadsPage();
    const i = src.indexOf("<TableBody>");
    const body = src.slice(i, src.indexOf("</TableBody>"));
    expect(body.indexOf("Loading...")).toBeGreaterThan(-1);
    expect(body.indexOf("Loading...")).toBeLessThan(body.indexOf("No leads found"));
    expect(body).toMatch(/!leadsLoaded \?/);
  });

  it("the Loading row is the colSpan-9 family (TableEmptyRow)", () => {
    const src = leadsPage();
    expect(src).toMatch(/TableEmptyRow colSpan=\{9\} message="Loading\.\.\." \//);
  });

  it("\"No leads found\" survives (the loading-layer pin)", () => {
    const src = leadsPage();
    expect(src).toContain("No leads found");
  });
});

describe("session-77: the edit-dialog submit (M-77c4)", () => {
  it("the EntityEditDialog submit carries DIALOG_SUBMIT.button (the stock dark, like the create dialogs)", () => {
    const src = entityEditDialog();
    expect(src).toMatch(/<Button type="submit" disabled=\{isLoading\} className=\{DIALOG_SUBMIT\.button\}>/);
  });

  it("the edit footer keeps the Saving.../Save Changes pair (the s71 capability)", () => {
    const src = entityEditDialog();
    expect(src).toContain('"Saving..." : "Save Changes"');
  });
});

describe("session-77: the create labels (L-77c5)", () => {
  it("\"Creating...\" on the Lead create submit", () => {
    const src = entityDialogs();
    expect(src).toMatch(/"Creating\.\.\." : "Create Lead"/);
  });

  it("\"Creating...\" on the Account create submit", () => {
    const src = entityDialogs();
    expect(src).toMatch(/"Creating\.\.\." : "Create Account"/);
  });

  it("\"Creating...\" on the Contact create submit", () => {
    const src = entityDialogs();
    expect(src).toMatch(/"Creating\.\.\." : "Create Contact"/);
  });

  it("the Event/Activity dialogs keep \"Saving...\" (the s76 bundle-verified pair)", () => {
    const src = entityDialogs();
    expect(src).toMatch(/"Saving\.\.\." : event \? "Update Event" : "Create Event"/);
    expect(src).toMatch(/"Saving\.\.\." : activity \? "Save Changes" : "Log Activity"/);
  });
});

describe("session-77: the Sm KPI-card anatomy (L-77c6 + N-77c16)", () => {
  it("STAT_CHIP_PAIRS ships the reference's six class pairs verbatim", () => {
    const src = pageLayoutSrc();
    expect(src).toContain('blue: "bg-blue-50 text-blue-600"');
    expect(src).toContain('green: "bg-green-50 text-green-600"');
    expect(src).toContain('orange: "bg-orange-50 text-orange-600"');
    expect(src).toContain('red: "bg-red-50 text-red-600"');
    expect(src).toContain('purple: "bg-purple-50 text-purple-600"');
    expect(src).toContain('cyan: "bg-cyan-50 text-cyan-600"');
    expect(src).toMatch(/export const STAT_CHIP_PAIRS/);
  });

  it("the IconStatCard leads arm consumes the pairs (the alpha-tint style chip retires on that arm)", () => {
    const src = pageParts();
    const i = src.indexOf('variant === "leads"');
    const arm = src.slice(i, src.indexOf("return (", src.indexOf("return (", i) + 1));
    expect(arm).toContain("STAT_CHIP_PAIRS[chipTone");
    const leadsArm = src.slice(i, i + 1400);
    expect(leadsArm).not.toContain("}1a`");
  });

  it("the leads label is text-gray-600 (not the muted token)", () => {
    const src = pageParts();
    const i = src.indexOf('if (variant === "leads")');
    // Session-89: the window re-anchored to the arm's CODE (the s89
    // Card/CardContent mirror grew the comment block past the old
    // 1400-char prose window — the assertions scan the code).
    const arm = src.slice(i, src.indexOf("// Session-88 (L-88c5", i));
    expect(arm).toContain("text-xs sm:text-sm text-gray-600");
    expect(arm).not.toContain("text-muted sm:text-sm");
  });

  it("the leads subValue is the responsive gray-500 mt-1 form", () => {
    const src = pageParts();
    const i = src.indexOf('if (variant === "leads")');
    const arm = src.slice(i, src.indexOf("// Session-88 (L-88c5", i));
    expect(arm).toContain("text-xs sm:text-sm text-gray-500 mt-1");
    expect(arm).not.toContain("text-sm font-medium text-muted");
  });

  it("the six call sites pass tone keys + the responsive icon classes", () => {
    const src = leadsPage();
    for (const key of ["blue", "orange", "green", "red", "purple", "cyan"]) {
      expect(src).toContain(`chipTone="${key}"`);
    }
    expect(src).not.toMatch(/color="#[0-9a-f]{6}"/);
    expect(src).toContain('className="w-4 h-4 sm:w-5 sm:h-5"');
    expect(src).not.toContain('className="h-5 w-5"');
  });

  it("the Won/Dropped subValues are the $${toLocaleString()} raw form (fraction digits preserved)", () => {
    const src = leadsPage();
    expect(src).not.toMatch(/formatCurrency\(won\.reduce/);
    expect(src).not.toMatch(/formatCurrency\(lost\.reduce/);
    expect(src).toMatch(/\$\$\{won\.reduce\(\(s, l\) => s \+ \(l\.value \|\| 0\), 0\)\.toLocaleString\(\)\}/);
    expect(src).toMatch(/\$\$\{lost\.reduce\(\(s, l\) => s \+ \(l\.value \|\| 0\), 0\)\.toLocaleString\(\)\}/);
  });
});

describe("session-77: the Min Deal Value raw string (L-77c7)", () => {
  it("LeadFilters.minValue is the raw string type", () => {
    const src = leadFilters();
    expect(src).toMatch(/minValue: string;/);
    expect(src).not.toMatch(/minValue: number \| null;/);
  });

  it("the DEFAULT is the empty string (the reference's initial state)", () => {
    const src = leadFilters();
    const i = src.indexOf("DEFAULT_LEAD_FILTERS");
    const block = src.slice(i, src.indexOf("}", i));
    expect(block).toMatch(/minValue: "",/);
  });

  it("asFilters validates the string form", () => {
    const src = leadFilters();
    const i = src.indexOf("function asFilters");
    const block = src.slice(i, src.indexOf("return { status, source, minValue, followUpDate };", i));
    expect(block).toMatch(/typeof minValue !== "string"/);
    expect(block).not.toMatch(/Number\.isInteger/);
  });

  it("the input stores e.target.value verbatim (no floor)", () => {
    const src = leadsPage();
    const i = src.indexOf("Minimum deal value");
    const block = src.slice(i, src.indexOf("</div>", src.indexOf("</div>", i) + 1));
    expect(block).not.toContain("Math.floor");
    expect(block).not.toContain("Math.max");
    expect(block).toMatch(/minValue: raw/);
  });

  it("the predicate is the truthy-string + parseFloat form (a typed \"0\" is ACTIVE and excludes zero-value leads)", () => {
    const src = leadsPage();
    expect(src).toMatch(/filters\.minValue && !\(l\.value && l\.value >= parseFloat\(filters\.minValue\)\)/);
    expect(src).not.toContain("filters.minValue > 0");
    expect(src).not.toContain("filters.minValue != null");
  });
});

describe("session-77: the search + the popover chrome (L-77c8 + L-77c10)", () => {
  it("the search query is untrimmed", () => {
    const src = leadsPage();
    expect(src).not.toContain("search.trim()");
    expect(src).toContain("search.toLowerCase()");
  });

  it("the filters popover rides shadow-md + sideOffset 4 (the stock PopoverContent pair)", () => {
    const src = leadsPage();
    const i = src.indexOf("<DropdownContent align=\"start\"");
    const block = src.slice(i, i + 220);
    expect(block).toContain("shadow-md");
    expect(block).toContain("sideOffset={4}");
  });
});

describe("session-77: the select-trigger focus ring (N-77c11 scoped)", () => {
  it("SELECT_TRIGGER.focusRing is the plain focus: form (the ring fires on mouse click)", () => {
    const src = pageLayoutSrc();
    // the SELECT_TRIGGER record carries the field
    const i = src.indexOf("export const SELECT_TRIGGER");
    const block = src.slice(i, src.indexOf("} as const;", i));
    expect(block).toContain('focusRing: "focus:outline-none focus:ring-1 focus:ring-ring"');
  });

  it("select.tsx consumes the record's focusRing (no focus-visible on the trigger)", () => {
    const src = selectSrc();
    const i = src.indexOf("SelectPrimitive.Trigger");
    const block = src.slice(i, i + 900);
    expect(block).toContain("${SELECT_TRIGGER.focusRing}");
    expect(block).not.toContain("focus-visible");
  });

  it("the Input + Button bases STAY focus-visible (byte-verified on both apps)", () => {
    const src = pageLayoutSrc();
    expect(src).toContain('focusRing: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",');
  });
});

describe("session-77: hygiene (N-77c12 partial + N-77c14)", () => {
  it("no min={0} on the create-value input (the reference's value inputs carry no min)", () => {
    const src = entityDialogs();
    const i = src.indexOf("id=\"ld-value\"");
    const block = src.slice(Math.max(0, i - 400), i + 400);
    expect(block).not.toContain("min={0}");
  });

  it("the updateLead comment no longer claims the reference is optimistic", () => {
    // The rationale lives in a COMMENT — assert on the RAW source (the
    // crmStore() helper strips comments).
    const raw = read("src/stores/crm-store.ts") ?? "";
    expect(raw).not.toContain("React-Query cache updates instantly");
    expect(raw).toContain("invalidate-on-success");
  });
});

// ---------------------------------------------------------------------------
// Session-136 (the 136-c rotation — THE LEADS-TABLE FAMILY THIRD-CYCLE
// RE-CHECK): the freeze pins. The walk27 verdict — ZERO REAL PARITY DEFECTS,
// PASS 1 byte-equal on all 191/208 axes two-app at 1440+390, PASS 2 every
// seeded contract holding — means the remediation is PIN-ONLY: the four
// never-ordered sets (the L-136a9 gaps, the D-133a2/D-134a0/D-135c genus —
// accounts pinned s133, dashboard s134, contacts s135, leads never) get
// their ordered-unit pins so any future drift REDs exactly one assertion.
// ---------------------------------------------------------------------------

describe("session-136: the freeze pins (L-136a9 — the never-ordered sets)", () => {
  it("the 9 table heads as an ORDERED SET (the walk's thead census)", () => {
    // The walk's two-app census: the interleaved SortHead/TableHead
    // sequence renders Lead Name|Email|Phone|Company|Value|Status|Source|
    // Next Follow-up|the w-12 actions head — byte-equal both apps, but in
    // ZERO ordered-set assertions before. The split regex takes BOTH the
    // <SortHead (label prop) and the <TableHead (child text) forms in
    // document order; each chunk is word-boundary matched so a mutated
    // longer word ("Engagements"-genus) REDs rather than passing.
    const src = leadsPage();
    const i = src.indexOf("<TableHeader");
    const j = src.indexOf("</TableHeader>");
    expect(i).toBeGreaterThan(-1);
    expect(j).toBeGreaterThan(i);
    const hdr = src.slice(i, j);
    const chunks = hdr.split(/<SortHead |<TableHead[ \n/>]/).slice(1).map((c) => c.slice(0, 400));
    expect(chunks.length, "exactly 9 heads (3 SortHead + 6 TableHead)").toBe(9);
    const heads = [
      "Lead Name",
      "Email",
      "Phone",
      "Company",
      "Value",
      "Status",
      "Source",
      "Next Follow-up",
    ];
    chunks.forEach((c, idx) => {
      if (idx < 8) {
        const re = new RegExp(`(^|[^a-zA-Z])${heads[idx]}([^a-zA-Z]|$)`);
        expect(re.test(c), `the head #${idx + 1} = "${heads[idx]}" (whole word)`).toBe(true);
      }
    });
    // the 9th head is the EMPTY w-12 actions head
    expect(chunks[8], "the 9th head is the bare w-12").toContain("w-12");
  });

  it("the Gke filter panel's 4 field labels as an ORDERED SET", () => {
    // The walk's popover census: gke.label0..3 = Status|Source|Min Deal
    // Value|Follow-up Date, byte-equal both apps. The s113 D-113a1 re-tag
    // pinned the <label> MECHANISM; the ordered set never.
    const src = leadsPage();
    const i = src.indexOf('className={LEADS_FILTERS_POPOVER.stack}');
    expect(i).toBeGreaterThan(-1);
    const panel = src.slice(i, i + 4200);
    const labels = ["Status", "Source", "Min Deal Value", "Follow-up Date"];
    let prev = -1;
    labels.forEach((label) => {
      const m = new RegExp(`>${label}<`).exec(panel.slice(prev + 1));
      expect(m, `the label "${label}" appears in order after the previous`).not.toBeNull();
      prev = (m?.index ?? 0) + prev + 1;
    });
  });

  it("the row-menu items as an ORDERED SET + the Delete red (the walk's [role=menu] census)", () => {
    // The walk's census: Edit|Convert to Opportunity|Delete, 178x32 each,
    // the Delete text-red-600 rgb(220,38,38). The s120 e2e census holds
    // the item texts individually; the ordered unit pin never existed.
    const src = leadsPage();
    const i = src.indexOf("<MenuContent>");
    const j = src.indexOf("</MenuContent>", i);
    expect(i).toBeGreaterThan(-1);
    const menu = src.slice(i, j);
    const items = ["Edit", "Convert to Opportunity", "Delete"];
    let prev = -1;
    items.forEach((item) => {
      const m = new RegExp(`>\\s*${item}\\s*<`).exec(menu.slice(prev + 1));
      expect(m, `the item "${item}" appears in order after the previous`).not.toBeNull();
      prev = (m?.index ?? 0) + prev + 1;
    });
    // the Delete item's OWN chunk carries the red (the multi-line onClick
    // sits between the className and the child — chunk-scope the assert)
    const del = menu.split("<MenuItem").find((c) => /(^|\s)Delete\s*</.test(c));
    expect(del, "the Delete MenuItem chunk exists").toBeDefined();
    expect(del ?? "").toContain('className="text-red-600"');
  });

  it("the edit dialog's 7 field labels as an ORDERED SET (the W7 genus)", () => {
    // The walk's dialog census: Name *|Email|Phone|Company|Status|Source|
    // Estimated Value — the LEAD_EDIT_FIELDS labels present-only since
    // s77 (the s91-era entity-edit-dialog.test pins the fields
    // individually), never ordered. The "Name *" carries the required
    // marker, so the first label matches the ^-anchored form.
    const raw = read("src/components/shared/entity-edit-dialog.tsx") ?? "";
    const i = raw.indexOf("LEAD_EDIT_FIELDS");
    expect(i).toBeGreaterThan(-1);
    const fields = raw.slice(i, i + 900);
    // the first label is the literal "Name *" (the required marker)
    const labels = ["Name", "Email", "Phone", "Company", "Status", "Source", "Estimated Value"];
    let prev = -1;
    labels.forEach((label) => {
      const m = new RegExp(`label:\\s*"${label}\\s*\\*?"`).exec(fields.slice(prev + 1));
      expect(m, `the field label "${label}" appears in order after the previous`).not.toBeNull();
      prev = (m?.index ?? 0) + prev + 1;
    });
    // the Name label carries the required marker (the dialog census's
    // "Name *")
    expect(fields).toMatch(/label:\s*"Name\s*\*"/);
  });
});

// ---------------------------------------------------------------------------
// Session-140 (the 140-c rotation — THE LEADS CHART-INTERIORS POST-FIX
// WALK): the freeze pins. The walk31 verdict — ZERO REAL PARITY DEFECTS,
// PASS 1 byte-equal on all 245 axes two-app at 1440+390 (the s138 grid
// fix's consumer #3 verified — the H/V geometry byte-equal on both
// grid-bearing charts at both viewports, NO residual), PASS 2 every
// seeded contract holding — means the remediation is PIN-ONLY: the three
// MAIDEN TOOLTIP FACES the walk decoded (never censused on ANY prior
// walk — the lens was invented at s138 and run on reports + the
// dashboard only) get their construction pins so any future drift REDs
// exactly one assertion.
// ---------------------------------------------------------------------------

describe("session-140: the chart-interiors freeze pins (the maiden tooltip faces)", () => {
  it("the pipeline call site's TOOLTIP construction: the dollarFormatter + NO name prop (the raw-dataKey face) + NO radius", () => {
    // The walk's maiden decode: the populated ch0 tooltip reads
    // "New value : $319,000" — the series name renders the RAW dataKey
    // "value" (NO name prop on the call site, unlike the reports tab-1
    // pipeline's "Value ($)") + the dollarFormatter face. The bars are
    // PLAIN rects (NO radius — the dashboard's pipeline carries
    // [8,8,0,0]; the leads site carries none). The construction drives
    // the tooltip text; pin the source so the face cannot drift.
    const src = leadsPage();
    const i = src.indexOf("Pipeline Value by Stage");
    expect(i).toBeGreaterThan(-1);
    const region = src.slice(i, i + 900);
    expect(region).toContain("<SingleBarChart");
    expect(region).toMatch(/formatter=\{dollarFormatter\}/);
    expect(region).toMatch(/tickFontSize=\{12\}/);
    expect(region).toMatch(/height=\{250\}/);
    // the raw-dataKey face: NO name prop in the call window
    expect(region).not.toMatch(/name=/);
    // the plain-rect construction: NO radius (the dashboard-only arm)
    expect(region).not.toMatch(/radius=/);
  });

  it("the wonlost call site's series construction: Won/Lost names + the paired fills + xKey month (the RAW-NUMBER tooltip face)", () => {
    // The walk's maiden decode: the populated ch1 tooltip reads
    // "Sep 2026 / Won : 2 / Lost : 0" — the series NAMES render (the
    // GroupedBars' per-series name prop) with RAW UN-FORMATTED numbers
    // (the family's stock <Tooltip /> carries NO formatter — the
    // raw-number face, never decoded on ANY family before this walk).
    // The fills pair #10b981/#ef4444; the month buckets ride xKey
    // "month" (the M-77c2 reverse-chrono insertion order).
    const src = leadsPage();
    const i = src.indexOf("Won vs Lost Over Time");
    expect(i).toBeGreaterThan(-1);
    const region = src.slice(i, i + 1100);
    expect(region).toContain("<GroupedBarsChart");
    expect(region).toMatch(/xKey="month"/);
    expect(region).toMatch(/key:\s*"won",\s*name:\s*"Won",\s*fill:\s*"#10b981"/);
    expect(region).toMatch(/key:\s*"lost",\s*name:\s*"Lost",\s*fill:\s*"#ef4444"/);
    expect(region).toMatch(/tickFontSize=\{12\}/);
    expect(region).toMatch(/height=\{250\}/);
  });

  it("the funnel call site: the stock ConversionFunnel with the STATUS-CUMULATIVE data + height 250 (the stock payload face)", () => {
    // The walk's maiden decode: the populated ch2 tooltip reads "0 : 4"
    // — the FunnelChart's stock payload face (the family's bare
    // <Tooltip />, no formatter, no name prop at the call site). The
    // zero-data face: BOTH apps render 4 degenerate 0x0 trapezoids with
    // 0 labels — byte-equal (the AGENTS "renders NOTHING" note
    // re-characterized by the walk: no VISIBLE funnel on either app,
    // the DOM symmetric). The data rides the STATUS-CUMULATIVE funnel
    // memo (the s27 bundle decode — 4/12/10/7 seeded, non-monotonic by
    // construction).
    const src = leadsPage();
    const i = src.indexOf("Conversion Funnel");
    expect(i).toBeGreaterThan(-1);
    const region = src.slice(i, i + 700);
    expect(region).toMatch(/<ConversionFunnel\s+data=\{funnel\}\s+height=\{250\}\s*\/>/);
    // the STATUS-CUMULATIVE memo construction (the s27 vocabulary)
    const f = src.indexOf("const funnel = React.useMemo");
    expect(f).toBeGreaterThan(-1);
    const memo = src.slice(f, f + 700);
    expect(memo).toMatch(/LEADS_FUNNEL/);
    expect(memo).toMatch(/n\(\["contacted",\s*"qualified",\s*"won"\]\)/);
    expect(memo).toMatch(/n\(\["qualified",\s*"won"\]\)/);
  });
});
