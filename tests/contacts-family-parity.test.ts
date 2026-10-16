import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-88 pins: the contacts filter-panel + stat-card family parity
// suite (the 88-c fresh-eyes rotation — the standing session_171
// first-listed alternate: the kke panel's own chrome + the Rx stat
// cards + the Cke toolbar/export/shrink family, never a dedicated
// rotation — s28 pinned the panel structure + the checkbox anatomy,
// s75 the memo + the row construction, s82 the slide-over chrome, but
// nobody had walked the stat card's Card/CardContent split, the chip's
// class-vs-inline mechanism, the trend row's construction, the row
// icon identities, or the export's disabled binding). PLUS the
// rotation's root-cause discovery: THE V4 PALETTE DIVERGENCE — every
// literal palette class used in src/ re-pins to the reference's v3
// values in @theme (the fifth member of the v4 re-pin family).
//
// The decisive contracts (all bundle-decoded from the byte-stable
// reference + LIVE-probed on BOTH apps):
// - THE PALETTE (M-88c1): v4's default oklch palette is NOT v3's —
//   blue-600 v4 #155dfc rgb(21,93,252) vs v3 #2563eb rgb(37,99,235);
//   red-600 Δ38; green-400 Δ69; amber-400 Δ36; purple-600 Δ35;
//   cyan-400 Δ34. @theme re-pins every literal (family, step) used
//   in src/ to the v3 values (verified against the reference's
//   compiled index-Be9epoFc.css on 97 rules, ZERO mismatches).
// - THE STAT CARD SPLIT (L-88c5): the reference's Rx = Card (the
//   stock component, gradient className) > CardContent "p-6" > the
//   div.flex.items-start.justify-between row — the padding NEVER
//   merges into the card div.
// - THE CHIP MECHANISM (L-88c5): `p-3 rounded-lg ${iconColor}` where
//   iconColor is a CLASS STRING (bg-blue-500 …) — NO inline style,
//   NO shrink-0, NO aria-hidden.
// - THE TREND ROW (L-88c5): a DIV `flex items-center gap-1` holding
//   the TrendingUp|TrendingDown `w-4 h-4 text-green-600|text-red-600`
//   + the span `text-sm font-medium text-{green|red}-600` — the
//   direction is a prop; the icon color is EXPLICIT.
// - THE ROW ICON (M-88c2): the table's last-activity icon is lucide
//   ACTIVITY (the bundle's AC=tr("Activity")) — never Zap.
// - THE AWARD PAIR (M-88c3): the bundle's wT=tr("Award") — the stat
//   card icon AND the name-cell overlay; the bundle ships NO Crown.
// - THE SOURCE LABEL CASE (M-88c4): the reference renders the Source
//   labels CAPITALIZED via charAt(0).toUpperCase()+slice(1) — the raw
//   lowercase value only rides the id + the wire.
// - THE EXPORT BINDING (L-88c6): disabled binds the RAW list
//   ($.length === 0 — the bundle), not filtered.length.
// - THE DETAIL SHRINK (L-88c7): the inner scroll div appends
//   mr-[500px] while the detail slide-over is open.
// - THE MOBILE BADGE (N-88c8): the map value ONLY — the Badge base's
//   font-semibold stands (no border font-medium extras on mobile).

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const CONTACTS_LAYOUT_ANCHOR = "CONTACTS_LAYOUT.mobileCards";
const contactsSrc = () => read("src/app/(app)/contacts/contacts-page.tsx");
const pagePartsSrc = () => read("src/components/shared/page-parts.tsx");
const globalsSrc = () => read("src/app/globals.css");

function themeToken(name: string): string | undefined {
  const m = globalsSrc().match(new RegExp(`--${name}:\\s*([^;]+);`));
  return m?.[1]?.trim();
}

/** The contacts arm of IconStatCard = the return block after the
 *  session-88 comment (the comment itself names the retired arms, so
 *  the assertions must scan the CODE, not the prose). */
function contactsArm(): string {
  const src = pagePartsSrc();
  const comment = src.indexOf("Session-88 (L-88c5, bundle-decoded from the reference's Rx)");
  const start = src.indexOf("return (", comment);
  const end = src.indexOf("/**", start);
  return src.slice(start, end > start ? end : start + 2000);
}

describe("session-88: the @theme v3-palette re-pin (M-88c1)", () => {
  it("the blue family re-pins to the reference's v3 values (blue-600 #2563eb, not v4's #155dfc)", () => {
    expect(themeToken("color-blue-500")).toBe("#3b82f6");
    expect(themeToken("color-blue-600")).toBe("#2563eb");
    expect(themeToken("color-blue-700")).toBe("#1d4ed8");
  });

  it("the chromatic families re-pin (red/green/amber/purple/cyan — v4's oklch defaults diverge by Δ34-69)", () => {
    expect(themeToken("color-red-500")).toBe("#ef4444");
    expect(themeToken("color-red-600")).toBe("#dc2626");
    expect(themeToken("color-red-700")).toBe("#b91c1c");
    expect(themeToken("color-green-400")).toBe("#4ade80");
    expect(themeToken("color-green-500")).toBe("#22c55e");
    expect(themeToken("color-green-600")).toBe("#16a34a");
    expect(themeToken("color-amber-400")).toBe("#fbbf24");
    expect(themeToken("color-purple-600")).toBe("#9333ea");
    expect(themeToken("color-cyan-400")).toBe("#22d3ee");
    expect(themeToken("color-cyan-500")).toBe("#06b6d4");
    expect(themeToken("color-emerald-600")).toBe("#059669");
    expect(themeToken("color-orange-600")).toBe("#ea580c");
    expect(themeToken("color-yellow-500")).toBe("#eab308");
  });

  it("the gray/slate families re-pin (the imperceptible Δ≤3 divergences retired too)", () => {
    expect(themeToken("color-gray-500")).toBe("#6b7280");
    expect(themeToken("color-gray-600")).toBe("#4b5563");
    expect(themeToken("color-gray-700")).toBe("#374151");
    expect(themeToken("color-gray-800")).toBe("#1f2937");
    expect(themeToken("color-gray-900")).toBe("#111827");
    expect(themeToken("color-slate-600")).toBe("#475569");
    expect(themeToken("color-slate-700")).toBe("#334155");
    expect(themeToken("color-slate-800")).toBe("#1e293b");
    expect(themeToken("color-slate-900")).toBe("#0f172a");
  });

  it("the pin block carries the session-88 divergence comment (the v4!=v3 mechanism)", () => {
    expect(globalsSrc()).toMatch(/Session-88 \(M-88c1\): THE V3 PALETTE RE-PIN/);
    expect(globalsSrc()).toMatch(/#155dfc/);
  });

  it("the pin set covers every literal (family, step) used in src/ — the 94-token census", () => {
    // Session-90 (S90-P0): 92 → 94 — the stat-card bar color maps'
    // bg-red-400/bg-purple-400 pairs (the (family, step) combinations
    // the s88 sweep never covered: our bars rode inline hexes, so the
    // classes never appeared in src/ before the s90 mirror).
    const all = execFileSync(
      "grep",
      [
        "-rhoE",
        "(text|bg|border|ring|from|via|to)-(gray|blue|green|red|amber|yellow|emerald|cyan|purple|indigo|slate|orange|rose|neutral|zinc|stone)-[0-9]+",
        "src/",
        "--include=*.tsx",
        "--include=*.ts",
      ],
      { cwd: root, encoding: "utf8" },
    ).split("\n").filter(Boolean);
    const tokens = new Set(all.map((c) => c.replace(/^(text|bg|border|ring|from|via|to)-/, "color-")));
    expect(tokens.size).toBe(94);
    for (const t of tokens) {
      expect(themeToken(t), `token ${t} must be pinned`).toBeDefined();
    }
  });
});

describe("session-88: the stat card construction (L-88c5)", () => {
  it("the contacts arm ships Card > CardContent p-6 > the row (the padding never merges into the card)", () => {
    const src = pagePartsSrc();
    expect(src).toMatch(/<Card className=\{gradient \? "bg-gradient-to-br from-white to-gray-50" : undefined\}>/);
    expect(src).toMatch(/<CardContent className="p-6">/);
    expect(src).toMatch(/flex items-start justify-between/);
  });

  it("the chip is a CLASS mechanism — p-3 rounded-lg ${iconColor}, no inline style, no shrink-0, no aria-hidden", () => {
    const arm = contactsArm();
    expect(arm).toMatch(/p-3 rounded-lg \$\{iconColor\}/);
    expect(arm).not.toMatch(/backgroundColor/);
    expect(arm).not.toMatch(/shrink-0/);
    expect(arm).not.toMatch(/aria-hidden/);
  });

  it("the trend row is a DIV with the explicit-color icon + the direction-colored span", () => {
    const arm = contactsArm();
    expect(arm).toMatch(/<TrendingUp className="w-4 h-4 text-green-600" \/>/);
    expect(arm).toMatch(/<TrendingDown className="w-4 h-4 text-red-600" \/>/);
    expect(arm).toMatch(/trendDir === "up" \?/);
    expect(arm).toMatch(/text-sm font-medium \$\{trendDir === "up" \? "text-green-600" : "text-red-600"\}/);
  });

  it("the subValue retires from the contacts arm (leads-only)", () => {
    expect(contactsArm()).not.toMatch(/subValue/);
  });

  it("the four contacts call sites pass the bg-CLASS chips (no hex color props)", () => {
    const src = contactsSrc();
    expect(src).toMatch(/iconColor="bg-blue-500"/);
    expect(src).toMatch(/iconColor="bg-green-500"/);
    expect(src).toMatch(/iconColor="bg-amber-500"/);
    expect(src).toMatch(/iconColor="bg-red-500"/);
    expect(src).not.toMatch(/color="#(3b82f6|22c55e|f59e0b|ef4444)"/);
  });
});

describe("session-88: the row icon identities (M-88c2/c3)", () => {
  it("the table's last-activity icon is lucide Activity — never Zap (the AC=tr(Activity) decode)", () => {
    const src = contactsSrc();
    expect(src).toMatch(/<Activity className=\{`w-4 h-4 \$\{pe \? "text-red-500" : "text-green-500"\}`\} \/>/);
    expect(src).not.toMatch(/<Zap/);
    expect(src).not.toMatch(/\bZap,/);
  });

  it("the Award icon replaces Crown at BOTH sites (the stat card + the name-cell overlay)", () => {
    const src = contactsSrc();
    expect(src).toMatch(/icon=\{<Award className="w-6 h-6 text-white" \/>\}/);
    expect(src).toMatch(/<Award className="w-3 h-3 text-white" \/>/);
    expect(src).not.toMatch(/\bCrown,/);
    expect(src).not.toMatch(/<Crown/);
  });
});

describe("session-88: the Source label case + the export binding + the shrink (M-88c4, L-88c6/c7)", () => {
  it("the Source labels render CAPITALIZED (the reference's own capitalizer; the id/value stay raw)", () => {
    const src = contactsSrc();
    expect(src).toMatch(/charAt\(0\)\.toUpperCase\(\) \+ o\.value\.slice\(1\)/);
    expect(src).toMatch(/id=\{`source-\$\{o\.value\}`\}/);
  });

  it("the Export CSV disabled binding reads the RAW list (the bundle's $.length === 0), never filtered", () => {
    const src = contactsSrc();
    expect(src).toMatch(/disabled=\{contacts\.length === 0\}/);
    expect(src).not.toMatch(/disabled=\{filtered\.length === 0\}/);
  });

  it("the inner scroll area appends mr-[500px] while the detail slide-over is open", () => {
    const src = contactsSrc();
    expect(src).toMatch(/detailContact[^}]*mr-\[500px\]/);
  });
});

describe("session-88: the mobile badge + the aria superset note (N-88c8/c9)", () => {
  it("the mobile priority badge renders the map value ONLY (the base font-semibold stands)", () => {
    const src = contactsSrc();
    const mobile = src.slice(src.indexOf(CONTACTS_LAYOUT_ANCHOR));
    const badge = mobile.match(/<Badge className=\{`([^`]+)`\}/);
    expect(badge?.[1]).toBe("${CONTACT_PRIORITY_META[c.priority] ?? CONTACT_PRIORITY_META.Standard}");
  });

  it("the Filters button documents the aria-expanded superset", () => {
    const src = contactsSrc();
    expect(src).toMatch(/aria-expanded=\{showFilters\}/);
    expect(src).toMatch(/accessibility superset/);
  });
});

describe("session-119: the four-label + adjacency census pin (D-119a3) + the mobile-list empty-state retirement (D-119a0)", () => {
  it("the four statcard labels as an ordered set + the per-card icon/iconColor adjacency + the trend on exactly New This Month", () => {
    // The 119-c contacts-family walk's freeze find (the D-117a2/D-118a2
    // genus): the labels were NEVER pinned as an ordered set —
    // "Top Decision Makers" and "No Recent Activity" appear in ZERO
    // unit label-set assertions before (grep-verified s119). The walk
    // measured the live two-app byte-equal zero-data face: the 14px/500
    // labels rgb(75,85,99), the 30px/700 values, the chips
    // bg-blue-500/green-500/amber-500/red-500 48px, the trend "+0"
    // green on exactly the second card.
    const src = contactsSrc();
    const grid = src.slice(src.indexOf('PAGE_KPI_GRIDS.contacts'));
    // the label= PROP (never the search input's aria-label=)
    const labels = [...grid.matchAll(/(?<!aria-)label="([^"]+)"/g)].map((m) => m[1]);
    expect(labels).toEqual([
      "Total Contacts",
      "New This Month",
      "Top Decision Makers",
      "No Recent Activity",
    ]);
    // the per-card adjacency: icon identity + iconColor (the walk's
    // Users-blue / TrendingUp-green / Award-amber / CircleAlert-red)
    const icons = [...grid.matchAll(/icon=\{<(\w+) /g)].map((m) => m[1]);
    expect(icons).toEqual(["Users", "TrendingUp", "Award", "CircleAlert"]);
    const chipCls = [...grid.matchAll(/iconColor="([^"]+)"/g)].map((m) => m[1]);
    expect(chipCls).toEqual(["bg-blue-500", "bg-green-500", "bg-amber-500", "bg-red-500"]);
    // the trend row on EXACTLY the second card (New This Month) —
    // trend={`+${newThisMonth}`} + trendDir="up", no other card
    // carries a trend prop
    const trendSites = [...grid.matchAll(/trend=\{/g)].length;
    expect(trendSites).toBe(1);
    expect(grid).toMatch(/trend=\{`\+\$\{newThisMonth\}`\}/);
    expect(grid.match(/trendDir="up"/g)?.length).toBe(1);
    // the gradient flag: all four cards (the walk's linear-gradient
    // white->gray-50 cards, byte-equal modulo the documented oklab
    // serialization genus) — the bare prop on its own line, never the
    // bg-gradient-to-* utility classes
    expect(grid.match(/^\s*gradient$/gm)?.length).toBe(4);
    // the arm census: iconColor= appears EXACTLY four times on the raw
    // source — a fifth site is a parity event, not a growth
    expect(src.match(/iconColor=/g)?.length).toBe(4);
  });

  it("the mobile card list renders the MAP ONLY — no empty-state branch (the reference's empty container, live-verified s119)", () => {
    // The 119-c walk's first real defect (F-119c1): our invented
    // `filtered.length === 0 ? <p>No contacts found</p>` branch
    // (the stale L-75c2-9 "bundle-decoded" reading) rendered a SECOND
    // zero-data message at 390 where the LIVE reference renders the
    // EMPTY CONTAINER (class "lg:hidden mt-6 space-y-4", display:block,
    // childN: 0 — the map has no empty branch; probe-verified at both
    // widths s119). The table's own rich empty stack is the ONLY
    // zero-data message, exactly the reference's face.
    const src = contactsSrc();
    const mobile = src.slice(src.indexOf(CONTACTS_LAYOUT_ANCHOR));
    // the container renders the map directly — no length ternary
    expect(mobile).toMatch(/filtered\.map\(\(c\) =>/);
    expect(mobile).not.toMatch(/length === 0 \?/);
    expect(mobile).not.toMatch(/<p className="text-center text-gray-500 py-8">No contacts found<\/p>/);
    // the table's rich empty stack STAYS (the only zero-data face)
    expect(src).toMatch(/<span className="font-medium">No contacts found<\/span>/);
    expect(src).toMatch(/Try adjusting your search or filters/);
  });
});

// ---------------------------------------------------------------------------
// Session-135 pins: the contacts-list third-cycle re-check (the 135-c
// rotation — walk26 + the walk26b decisive anatomy probe). The rotation's
// three real defects ALL live in the Scan Business Card dialog (the NAe
// contract, one site); the freeze pins close the L-135a9 ordered-set gaps
// the walk surfaced (the 8 heads / the 6 panel cards / the row-menu trio /
// the W7 labels — individually pinned since their ships, never ORDERED).
// ---------------------------------------------------------------------------

describe("session-135: the scan-dialog fix (F-135c1/c2/c3, the 135-c walk)", () => {
  // the house idiom (import-dialog.test.ts): comments stripped so the
  // pins assert CODE, never prose — the fix's own explanatory comments
  // must not false-trigger the negatives.
  const stripComments = (src: string) =>
    src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  const scanRegion = () => {
    const src = contactsSrc();
    const i = src.indexOf("Scan Business Card");
    return stripComments(src.slice(i, i + 5000));
  };

  it("the Scan submit carries the reference's DARK NEUTRAL family (F-135c1)", () => {
    // The walk26b decisive two-app anatomy probe: the reference's Scan
    // submit computes rgb(23,23,23) — the bg-neutral-900 DIALOG_SUBMIT
    // family its Import sibling rides (the s127 F-127c2 fix) — where
    // ours shipped the bare default Button (bg-primary blue-600,
    // rgb(37,99,235)), both viewports. The F-127c2 genus' missed
    // sibling: the s127 re-ink covered the Import submit, never
    // censused the Scan dialog's own footer.
    // The RAW region anchored on the submit's own label (the
    // comment-stripper cannot be used here: the accept="image/*"
    // string literal's `/*` would eat to the fix comment's `*/`).
    const raw = contactsSrc().slice(
      contactsSrc().indexOf("Scan Business Card"),
      contactsSrc().indexOf("Scan Business Card") + 5000,
    );
    const iScan = raw.indexOf("Scanning...");
    expect(iScan, "the Scan submit label found").toBeGreaterThan(-1);
    const btnStart = raw.lastIndexOf("<Button", iScan);
    expect(btnStart, "the Scan submit button found").toBeGreaterThan(-1);
    const btn = raw.slice(btnStart, iScan);
    expect(btn).toContain('className={DIALOG_SUBMIT.button}');
    expect(btn).toContain("disabled={!scanFile || scanBusy}");
    // the exact-className form: the submit rides DIALOG_SUBMIT.button
    // ALONE (any bg-primary/blue variant appended would break this) —
    // the family doctrine's negative without reading the comments.
    const cls = /className=\{([^}]+)\}/.exec(btn)?.[1] ?? "";
    expect(cls).toBe("DIALOG_SUBMIT.button");
  });

  it("the Scan file input rides the Input component's stock stack + the max-w-xs cap (F-135c2/c3)", () => {
    // The walk26b anatomy: the reference's VISIBLE file input carries
    // the platform's STOCK INPUT STACK — h-9 36px, rounded-md, 1px
    // border-line, px-3 py-1 (4px/12px), text-base md:text-sm (16px on
    // phones / 14px at md), shadow-sm, and a FLUID width capped at 320
    // (272 at 390 — it shrinks inside the dropzone) — where ours
    // shipped the bare `max-w-xs mx-auto` two-class form: the
    // browser-default 16px/24px zero-padding stack AND the intrinsic
    // 320 min-content that forced the dropzone to 388 at phone width,
    // ESCAPING the dialog's p-6 padding (the reference's dz 340x224 vs
    // ours 388x192 @390). The fix rides the Input component (the
    // byte-parity-verified stock stack the search + create-dialog
    // fields ride — its className stack pinned in ui/input.tsx) with
    // the max-w-xs mx-auto append: the component supplies h-9 +
    // w-full + px-3 py-1 + text-base md:text-sm + shadow-sm, the
    // append supplies the 320 cap + the centering.
    // The RAW region (never comment-stripped — the accept string
    // literal itself carries `/*`): anchor on the accept attr (the
    // scan dialog's ONE file input; the import dialog's accepts
    // .csv,.xls,.xlsx), then read the COMPONENT tag + its className.
    const src = contactsSrc();
    const i0 = src.indexOf("Scan Business Card");
    const raw = src.slice(i0, i0 + 5000);
    const i = raw.indexOf('accept="image/*"');
    expect(i, "the Scan file input found").toBeGreaterThan(-1);
    // the tag is the INPUT COMPONENT (the stock-stack carrier), never
    // the bare <input element
    const before = raw.slice(Math.max(0, i - 300), i);
    expect(before).toMatch(/<Input\b/);
    expect(before).not.toMatch(/<input\b/);
    // the component's className: the max-w-xs cap + the mx-auto
    // centering (the fluid w-full rides the component's own base)
    const attrs = raw.slice(i, i + 600);
    const cls = /className="([^"]+)"/.exec(attrs)?.[1] ?? "";
    expect(cls).toContain("max-w-xs");
    expect(cls).toContain("mx-auto");
    // the negative: the full bare-element form retired (the defect's
    // own signature — the bare <input with ONLY the two classes)
    expect(raw).not.toMatch(/<input\s+type="file"\s+accept="image\/\*"\s+className="max-w-xs mx-auto"/);
  });
});

describe("session-135: the freeze pins (L-135a9 — the never-ordered sets)", () => {
  it("the 8 table heads as an ORDERED SET (the walk's table.heads census)", () => {
    // The walk's two-app census: table.heads = the pipe-joined ordered
    // set "Name|Role|Priority|Last Activity|Engagement|Company|Source|
    // Actions" — byte-equal both apps, but in ZERO ordered-set
    // assertions before (the D-133a2/D-134a0 genus: the accounts
    // 8-heads + the dashboard 6-KPI sets got their pins; contacts'
    // never did). The sortable heads wrap their text in the inner div —
    // so the ORDER is asserted per-TableHead chunk, never per `>text<`.
    const src = contactsSrc();
    const hdr = src.slice(src.indexOf("<TableHeader>"), src.indexOf("</TableHeader>"));
    // split on the space/newline-terminated forms so the <TableHeader>
    // wrapper itself (the `er>` suffix) never counts as a head chunk —
    // the heads ship BOTH the multi-line (sortable) and single-line forms
    const chunks = hdr.split(/<TableHead[ \n]/).slice(1).map((c) => c.slice(0, 400));
    expect(chunks.length, "exactly 8 TableHeads").toBe(8);
    const heads = [
      "Name",
      "Role",
      "Priority",
      "Last Activity",
      "Engagement",
      "Company",
      "Source",
      "Actions",
    ];
    chunks.forEach((c, i) => {
      // WORD-BOUNDARY match — the head text must appear as a whole
      // word, never as a substring of a mutated longer word (the
      // stash-proof discipline: "Engagements" must RED this pin)
      const re = new RegExp(`(^|[^a-zA-Z])${heads[i]}([^a-zA-Z]|$)`);
      expect(re.test(c), `the TableHead #${i + 1} = "${heads[i]}" (whole word)`).toBe(true);
    });
  });

  it("the 6 filter-panel card groups as an ordered set (the kke rail)", () => {
    // The walk's kke.cards census: Role|Priority|Activity Status|
    // Company Size|Source|Engagement Level — the panel's construction
    // order, never ordered-pinned (s28 pinned the structure, s88 the
    // chrome family).
    const src = contactsSrc();
    const panel = src.slice(src.indexOf('showFilters && ('));
    const groups = [
      "Role",
      "Priority",
      "Activity Status",
      "Company Size",
      "Source",
      "Engagement Level",
    ];
    let prev = -1;
    for (const g of groups) {
      const i = panel.indexOf(`>${g}<`, prev + 1);
      expect(i, `the panel card "${g}" after position ${prev}`).toBeGreaterThan(prev);
      prev = i;
    }
  });

  it("the row-menu items as an ordered set (Edit|Log Activity|Delete)", () => {
    // The walk's rmenu.items census: the real-Radix row menu renders
    // exactly Edit|Log Activity|Delete in order — the Delete the bare
    // text-red-600 literal (the M-73c9 decode), the Log Activity OUR
    // wired superset (the reference's own item dead, S73-P1). Never
    // ordered-pinned (the topbar-rowmenu suite covers the topbar
    // menus, not the contacts row menu).
    const src = contactsSrc();
    const menu = src.slice(src.indexOf("<MenuContent>"), src.indexOf("</MenuContent>"));
    expect(menu.length).toBeGreaterThan(0);
    const items = ["Edit", "Log Activity", "Delete"];
    let prev = -1;
    for (const item of items) {
      const m = new RegExp(`>\\s*${item}\\s*<`).exec(menu.slice(prev + 1));
      expect(m, `the row-menu item "${item}" in order`).not.toBeNull();
      prev = (prev + 1) + (m?.index ?? 0);
    }
    // the Delete literal + exactly 3 items
    expect(menu).toMatch(/className="text-red-600"/);
    expect(menu.split("<MenuItem").length - 1).toBe(3);
  });

  it("the W7's 7 field labels as an ordered set (the EntityEditDialog config)", () => {
    // The walk's w7.labels census: Name *|Email *|Phone|Company|
    // Position|Status|Source — the CONTACT_EDIT_FIELDS construction
    // order (individually pinned since s91 in entity-edit-dialog.test,
    // never ORDERED — the D-134a0 genus).
    const src = read("src/components/shared/entity-edit-dialog.tsx");
    const cfg = src.slice(src.indexOf("CONTACT_EDIT_FIELDS"), src.indexOf("ACCOUNT_EDIT_FIELDS"));
    const labels = ["Name *", "Email *", "Phone", "Company", "Position", "Status", "Source"];
    let prev = -1;
    for (const l of labels) {
      const i = cfg.indexOf(`label: "${l}"`, prev + 1);
      expect(i, `the W7 label "${l}" after position ${prev}`).toBeGreaterThan(prev);
      prev = i;
    }
  });
});
