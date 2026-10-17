import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-76 pins: the activities/calendar FAMILY parity suite (the 76-c
// fresh-eyes rotation — the family's first dedicated rotation, the
// session_145 suggested target). Every pin below is bundle-decoded
// against the fresh-fetched reference (the M/L/N-76 family, validated at
// file:line by the orchestrator; component identities: activities =
// JSe/gm/vx/Rce/Lce/QSe/Mce, calendar = jAe/Mx/_Ae/SAe).
//
// The decisive contracts:
// - KPI STATICS: the ten stat cards ship the reference's STATIC
//   deltas/subtexts/bar arrays (the gm literals: "+23%" / "Due now" +
//   "2h overdue" / "+7 today" / "+4 today" / "+1h 12m" / the six
//   6-value chartData arrays; the Mx trends "+3"/"+34"/"+2"/"+3") —
//   never computed values. The labels are the literal text-gray-600
//   (not the muted token). The WhatsApp bars are green-400 like Calls.
// - PRIORITY ROWS (vx): the p-3 hover:bg-gray-50 rounded-lg border-b row
//   with the initials avatar box, the relatedName-||-"Activity" title,
//   the destructive "Xh/Xd overdue" badge, the description line, the
//   time span, and the ghost "Check as completed" button.
// - TIMELINE (Rce): the long-weekday date groups, the Card p-4
//   hover:shadow-md items with the tinted icon square (the 100/600
//   pairs), the "Related to:" blue-link line, and the avatar + owner +
//   type-badge footer; "Loading activities..." while the first fetch is
//   in flight.
// - TABS: "No activities due today"; the per-tab caps (no cap on
//   overdue/dueToday, slice(0,5) on upcoming/completed); the Status
//   select vocabulary 7days/30days/90days.
// - KPI DERIVATIONS: Activities Today by the DUE DATE within
//   [startOfToday, startOfTomorrow); Meetings Scheduled counts ALL
//   meetings; the overdue boundary is startOfToday; the values read the
//   type-filtered set.
// - CALENDAR GRID: TODAY always carries the blue pill (the
//   white-on-white bug); the grid is the UNTRIMMED 42 cells; the chip
//   container is a plain space-y-0.5; the page renders through
//   CALENDAR_CELL.
// - UPCOMING/AGENDA: the 7-day window + scheduled + slice(0,5); the
//   agenda timestamp is the "EEEE, MMM d • h:mm a" weekday-bullet form
//   + the event DESCRIPTION line; the events query orders DESC.
// - CALENDAR KPIs read the RAW events array; the Date rail is
//   single-valued radio semantics.
// - DIALOGS: the Event submit is BLUE in both modes with the "Update
//   Event" label; the conditional Name field renders when a related
//   type is chosen; the five s15-missed placeholders land; the Activity
//   type select lists five (the WhatsApp preset rides the SUBMIT); the
//   Activity textarea is rows=4; the related selects default "" (the
//   placeholder shows at rest); "Saving..." carries three ASCII dots.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const activitiesPage = () => stripComments(read("src/app/(app)/activities/activities-page.tsx") ?? "");
const calendarPage = () => stripComments(read("src/app/(app)/calendar/calendar-page.tsx") ?? "");
const entityDialogs = () => stripComments(read("src/components/shared/entity-dialogs.tsx") ?? "");
const pageParts = () => stripComments(read("src/components/shared/page-parts.tsx") ?? "");
const pageLayoutSrc = () => stripComments(read("src/lib/page-layout.ts") ?? "");
const constantsSrc = () => stripComments(read("src/lib/constants.ts") ?? "");
const formatSrc = () => stripComments(read("src/lib/format.ts") ?? "");
const eventsRoute = () => stripComments(read("src/app/api/events/route.ts") ?? "");

describe("session-76: the KPI STATICS family (gm/Mx literals)", () => {
  it("the six activities chartData literals + static deltas/subtexts ship as constants", () => {
    const src = pageLayoutSrc();
    const block = src.slice(src.indexOf("ACTIVITY_KPI_STATICS"), src.indexOf("ACTIVITY_KPI_STATICS") + 1400);
    expect(src).toMatch(/ACTIVITY_KPI_STATICS/);
    // Whitespace-insensitive on the arrays (prettier-formatted); the
    // string literals keep their spaces via flexible regexes.
    const compact = block.replace(/\s+/g, "");
    expect(compact).toContain("[60,70,65,80,75,85]");
    expect(compact).toContain("[40,50,45,60,55,50]");
    expect(compact).toContain("[30,40,50,60,70,80]");
    expect(compact).toContain("[50,55,60,65,70,75]");
    expect(compact).toContain("[40,50,55,60,70,65]");
    expect(compact).toContain("[30,35,40,45,50,55]");
    expect(block).toMatch(/delta:\s*"\+23%"/);
    expect(block).toMatch(/sub:\s*"Due now"/);
    expect(block).toMatch(/delta:\s*"2h overdue"/);
    expect(block).toMatch(/sub:\s*"\+7 today"/);
    expect(block).toMatch(/sub:\s*"\+4 today"/);
    expect(block).toMatch(/sub:\s*"\+1h 12m"/);
  });

  it("the activities cards render the statics — the dynamic delta/subtext/bar memos retire", () => {
    const src = activitiesPage();
    expect(src).toMatch(/ACTIVITY_KPI_STATICS/);
    for (const retired of ["todayDelta", "overdueLabel", "emailsToday", "callsToday", "meetingDuration", "barsFor", "allBars"]) {
      expect(src, `${retired} must retire`).not.toContain(retired);
    }
  });

  it("the calendar trend texts are the static +3/+34/+2/+3 literals", () => {
    const src = calendarPage();
    // The four Mx cards render CALENDAR_KPI_STATICS (the +3/+34/+2/+3
    // literals) — never a computed trend.
    expect((src.match(/CALENDAR_KPI_STATICS\./g) ?? []).length).toBe(4);
    expect(src).not.toMatch(/trend=\{trend\(/);
    const layout = pageLayoutSrc();
    const block = layout.slice(layout.indexOf("CALENDAR_KPI_STATICS"), layout.indexOf("CALENDAR_KPI_STATICS") + 300);
    expect(block).toContain('"+3"');
    expect(block).toContain('"+34"');
    expect(block).toContain('"+2"');
  });

  it("the TrendStatCard swaps TrendingDown on the down direction", () => {
    const src = pageParts();
    expect(src).toMatch(/TrendingDown/);
    expect(src).toMatch(/trend === "down"|trendDirection === "down"/);
  });

  it("the stat-card labels are the literal text-gray-600 (gm/Mx contract)", () => {
    const parts = pageParts();
    // BarStatCard's LABEL span (the gm label) — scoped: the KpiCard
    // suffix / IconStatCard / CircleStatCard labels are OTHER families
    // with their own prior pins. Session-90: the window anchored to the
    // next component boundary (the construction mirror grew the body
    // past the old 1200-char window).
    const barStart = parts.indexOf("export function BarStatCard");
    const barBlock = parts.slice(barStart, parts.indexOf("export function", barStart + 30) > 0 ? parts.indexOf("export function", barStart + 30) : barStart + 2600);
    expect(barBlock).toMatch(/text-xs text-gray-600/);
    expect(barBlock).not.toMatch(/<span className="text-xs text-muted">\{label\}/);
    // Session-90 (L-90c3): the Mx label lives in the TrendStatCard
    // component (page-parts), not the calendar page — the construction
    // mirror moved it there.
    const trendBlock = parts.slice(parts.indexOf("export function TrendStatCard"));
    expect(trendBlock).toContain('<div className="text-xs text-gray-600 mt-1">{label}</div>');
  });

  it("the WhatsApp bars are the green color KEY (the gm color map — re-anchored at s90)", () => {
    const src = activitiesPage();
    const block = src.slice(src.indexOf('label="WhatsApp"'), src.indexOf('label="WhatsApp"') + 300);
    // Session-90 (L-90c4): the bars ride the bg-CLASS color map keyed
    // by the reference's own color strings — the CHART_COLORS.green400
    // hex prop retired.
    expect(block).toMatch(/color="green"/);
    expect(block).not.toMatch(/green400/);
    expect(block).not.toMatch(/#22c55e/);
  });
});

describe("session-76: the priority-tab row family (vx)", () => {
  it("the rows are the p-3 hover rounded-lg border-b construction with the initials avatar", () => {
    const src = activitiesPage();
    expect(src).toContain("hover:bg-gray-50 rounded-lg border-b");
    expect(src).toContain("p-3");
    expect(src).toMatch(/w-10 h-10 bg-blue-100/);
    expect(src).toMatch(/text-blue-600 text-sm font-semibold/);
  });

  it("the title is relatedName || Activity with the destructive overdue badge", () => {
    const src = activitiesPage();
    expect(src).toMatch(/a\.relatedName \|\| a\.contact\?\.name \|\| "Activity"/);
    expect(src).toMatch(/variant="destructive"/);
    expect(src).toMatch(/h overdue|d overdue/);
  });

  it("the right side carries the time span + the Check as completed button", () => {
    const src = activitiesPage();
    expect(src).toContain("Check as completed");
    expect(src).toMatch(/text-red-600/);
  });

  // ------------------------------------------------------------------
  // Session-109 (S109-P2, the M-109c1 fix): the priority row's clusters
  // are SHRINKABLE at phone width. The 109-c ANALYZE found the right
  // cluster un-shrinkable — the time span (40px) + the ghost "Check as
  // completed" text button (174px at min-content) + the 20px iconSm
  // edit button = a 249px min-content inside the 326px panel (content
  // box 302), pushing main.scrollWidth to 488 at 390x844 — a
  // horizontally-swipeable /activities, the M-108c1 genus on the flex
  // axis. The fix (the mobile-nav doctrine, ours the documented
  // superset — the reference's own construction carries the same
  // latent defect, un-live-verifiable at its zero-data state):
  // min-w-0 on both clusters + the label in a min-w-0 truncate span.
  // ------------------------------------------------------------------
  it("the priority row's clusters are min-w-0 shrinkable with a truncating label span (M-109c1)", () => {
    const src = activitiesPage();
    // the left cluster + its inner text block: the name/subject wrap
    // vertically instead of forcing the flex line.
    expect(src).toContain("flex items-center gap-3 flex-1 min-w-0");
    expect(src).toMatch(/"flex-1 min-w-0"/);
    // the right cluster: shrinkable below its content's min.
    expect(src).toContain("flex items-center gap-2 min-w-0");
    // the check button: shrinkable + its label in a truncating span
    // (a raw text node cannot shrink — the truncate-engages doctrine).
    expect(src).toMatch(/className="text-xs min-w-0"/);
    expect(src).toContain('<span className="min-w-0 truncate">Check as completed</span>');
    // the retired bare-label form never returns (the raw text after
    // the CircleCheck icon — the pre-fix construction).
    expect(src).not.toMatch(/"true" \/>\s*\n\s*Check as completed/);
  });

  it("the retired divide-y/toggle construction is gone", () => {
    const src = activitiesPage();
    expect(src).not.toContain("divide-y");
    expect(src).not.toMatch(/<CheckCircle2/);
    expect(src).not.toMatch(/<Circle /);
  });
});

describe("session-76: the timeline family (Rce)", () => {
  it("the date groups render the long weekday format under the h3", () => {
    const src = activitiesPage();
    expect(src).toMatch(/weekday: "long"/);
    expect(src).toMatch(/text-sm font-semibold text-gray-900 mb-3/);
  });

  it("the items are Card p-4 hover:shadow-md with the tinted icon square", () => {
    const src = activitiesPage();
    expect(src).toContain("hover:shadow-md transition-shadow");
    expect(src).toMatch(/w-10 h-10 rounded-lg/);
    // The tint pairs live in constants (ACTIVITY_TIMELINE_TINT) — the
    // page consumes the map with the gray-terminal fallback.
    expect(src).toMatch(/ACTIVITY_TIMELINE_TINT\[a\.type\] \?\? "bg-gray-100 text-gray-600"/);
    const consts = constantsSrc();
    const block = consts.slice(consts.indexOf("ACTIVITY_TIMELINE_TINT"), consts.indexOf("ACTIVITY_TIMELINE_TINT") + 500);
    expect(block).toContain('"bg-blue-100 text-blue-600"');
    expect(block).toContain('"bg-green-100 text-green-600"');
    expect(block).toContain('"bg-purple-100 text-purple-600"');
    expect(block).toContain('"bg-emerald-100 text-emerald-600"');
    expect(block).toContain('"bg-gray-100 text-gray-600"');
  });

  it("the Related-to line + the avatar/owner/type-badge footer render", () => {
    const src = activitiesPage();
    expect(src).toContain("Related to:");
    expect(src).toMatch(/text-blue-600 hover:underline cursor-pointer/);
    expect(src).toMatch(/w-6 h-6 bg-gray-200/);
  });

  it("the loading line renders while the first fetch is in flight", () => {
    const src = activitiesPage();
    expect(src).toContain("Loading activities...");
    expect(src).toMatch(/text-center py-12 text-gray-500/);
  });

  it("the retired border-l dotted rail construction is gone", () => {
    const src = activitiesPage();
    expect(src).not.toContain("border-l ");
    expect(src).not.toContain("-left-[27px]");
  });
});

describe("session-76: the tabs + rail vocabulary", () => {
  it('the due-today empty label reads "No activities due today"', () => {
    const src = activitiesPage();
    expect(src).toContain('"No activities due today"');
    expect(src).not.toContain("Nothing due today");
  });

  it("the per-tab caps: NO slice on overdue/dueToday, slice(0,5) on upcoming/completed", () => {
    const src = activitiesPage();
    expect(src).not.toContain("slice(0, 8)");
    expect((src.match(/slice\(0, 5\)/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });

  it("the Status select vocabulary is 7days/30days/90days (default 7days)", () => {
    const src = activitiesPage();
    expect(src).toContain('"7days"');
    expect(src).toContain('"30days"');
    expect(src).toContain('"90days"');
    expect(src).not.toContain("Last 24 hours");
    expect(src).not.toContain("All Time");
  });
});

describe("session-76: the activities KPI derivations", () => {
  it("Activities Today buckets by the DUE DATE within the today window", () => {
    const src = activitiesPage();
    expect(src).not.toMatch(/createdAt.*startOfDay|startOfDay.*createdAt/);
    expect(src).toMatch(/dueAt/);
  });

  it("Meetings Scheduled counts ALL meetings (not upcoming-only)", () => {
    const src = activitiesPage();
    // The reference's meetingsScheduled: A.filter(H=>H.type==="Meeting") —
    // no status guard, no window. Our upcomingMeetings memo retires.
    expect(src).not.toContain("upcomingMeetings");
  });

  it("the overdue boundary is startOfToday (not < now)", () => {
    const src = activitiesPage();
    expect(src).not.toMatch(/dueAt\) < now/);
  });
});

describe("session-76: the calendar grid", () => {
  it("TODAY always carries the blue pill — never a white number on a white cell", () => {
    const src = calendarPage();
    // The state chain keys isToday BEFORE inMonth — the pill can never
    // be lost to selection, and the number never goes white on a light bg.
    const chain = src.match(/isToday\s*\?[\s\S]*?:[\s\S]*?inMonth\s*\?/);
    expect(chain, "the isToday-first ternary chain must exist").not.toBeNull();
  });

  it("the grid renders the UNTRIMMED 42 cells", () => {
    const src = calendarPage();
    expect(src).not.toMatch(/Math\.ceil\(\(lead/);
    expect(src).not.toMatch(/weeks \* 7/);
  });

  it("the chip container is the plain space-y-0.5 stack (no mt-auto flex)", () => {
    const src = calendarPage();
    expect(src).not.toContain("mt-auto flex flex-col gap-0.5");
    expect(src).toContain("space-y-0.5");
  });

  it("the page renders through CALENDAR_CELL (the record is the source of truth)", () => {
    const src = calendarPage();
    expect(src).toMatch(/CALENDAR_CELL\./);
  });
});

describe("session-76: the upcoming/agenda pair", () => {
  it("the upcoming derivation is the 7-day window + scheduled + slice(0,5)", () => {
    const src = calendarPage();
    expect(src).toMatch(/86400000 \* 7|addDays\(today, 7\)/);
    expect(src).toMatch(/status === "scheduled"/);
    expect(src).not.toMatch(/slice\(0, 6\)/);
  });

  it("the agenda timestamp is the weekday-bullet format + the description line", () => {
    const src = calendarPage();
    expect(src).toMatch(/formatWeekdayBulletTime/);
    const agenda = src.slice(src.indexOf("Agenda View"), src.indexOf("Agenda View") + 2600);
    expect(agenda).toMatch(/line-clamp-2/);
  });

  it("the events route orders startAt DESC", () => {
    const src = eventsRoute();
    expect(src).toContain('orderBy: { startAt: "desc" }');
  });

  it("formatWeekdayBulletTime renders the EEEE, MMM d • h:mm a shape", async () => {
    const mod = await import("../src/lib/format");
    const f = (mod as unknown as { formatWeekdayBulletTime: (d: Date) => string }).formatWeekdayBulletTime;
    expect(f(new Date(2026, 9, 5, 10, 0))).toBe("Monday, Oct 5 • 10:00 AM");
  });
});

describe("session-76: the calendar KPI basis + the Date rail", () => {
  it("the KPI memo reads the RAW events array (not visible)", () => {
    const src = calendarPage();
    const memo = src.slice(src.indexOf("const todaysEvents"), src.indexOf("const todaysEvents") + 900);
    expect(memo).not.toContain("visible");
    expect(memo).toMatch(/events\./);
  });

  it("the Date rail is single-valued (radio semantics)", () => {
    const src = calendarPage();
    // The dateRange is ONE value or null — the onCheckedChange writes
    // setDateRange(v ? d.id : null), never an accumulation into the
    // filters record; Clear All resets it.
    expect(src).toMatch(/setDateRange\(v \? d\.id : null\)/);
    expect(src).toMatch(/dateRange === d\.id/);
    expect(src).not.toMatch(/onCheckedChange=\{\(v\) => setFilters\(\(f\) => \(\{ \.\.\.f, \[d\.id\]: v \}\)\)\}\)/);
  });
});

describe("session-76: the dialog family (SAe/Mce)", () => {
  it("the Event submit is BLUE in both modes with the Update Event label", () => {
    const src = entityDialogs();
    const block = src.slice(src.indexOf("ev-end"), src.indexOf("ev-end") + 2200);
    expect(block).toMatch(/className=\{EVENT_DIALOG\.submit\}/);
    expect(block).toContain('"Update Event"');
    expect(block).not.toContain("DIALOG_SUBMIT.button");
  });

  it("the conditional Name field renders when a related type is chosen", () => {
    const src = entityDialogs();
    expect(src).toMatch(/Enter \$\{/);
    expect(src).toMatch(/relatedType && |relatedType\)/);
  });

  it("the five s15-missed placeholders land", () => {
    const src = entityDialogs();
    expect(src).toContain('"Enter location or meeting link"');
    expect(src).toContain('"Select type"');
    expect(src).toContain('"Enter activity details..."');
    expect(src).toContain('"e.g., John Doe"');
  });

  it("the Activity type select lists five (no whatsapp) — the preset rides the submit", () => {
    const src = entityDialogs();
    const block = src.slice(src.indexOf("ACTIVITY_DIALOG_TYPES"), src.indexOf("ACTIVITY_DIALOG_TYPES") + 600);
    expect(block).not.toMatch(/ACTIVITY_TYPES\.map/);
    // The reference's `type: i || N.type` — the preset wins at submit in
    // create mode; the edit mode keeps the form's own type.
    expect(src).toMatch(/type: activity \? form\.type : \(defaultType \|\| form\.type\)/);
    const consts = constantsSrc();
    expect(consts).toMatch(/ACTIVITY_DIALOG_TYPES = \["call", "email", "meeting", "task", "note"\]/);
  });

  it("the Activity Description textarea is rows=4", () => {
    const src = entityDialogs();
    const block = src.slice(src.indexOf("Enter activity details..."), src.indexOf("Enter activity details...") - 300);
    expect(block + src.slice(src.indexOf("Enter activity details..."), src.indexOf("Enter activity details...") + 200)).toMatch(/rows=\{4\}|rows="4"/);
  });

  it("the related selects default empty (the placeholder shows at rest)", () => {
    const src = entityDialogs();
    // The reference's initial related_to_type is "" — the "Select type"
    // placeholder shows at rest; ours preselected "none"/"contact".
    expect(src).not.toMatch(/relatedType: (event\?\.relatedType )?\?\? "none"/);
    expect(src).not.toMatch(/relatedType: (activity\?\.relatedType )?\?\? "contact"/);
  });

  it('"Saving..." carries three ASCII dots (no ellipsis character)', () => {
    const src = entityDialogs();
    expect(src).not.toContain("Saving…");
    expect(src).toContain('"Saving..."');
  });
});

describe("session-76: the hygiene pair", () => {
  it("the dead green field retires from QUICK_LOG", () => {
    const src = activitiesPage();
    expect(src).not.toContain("green: true");
  });

  it("the by-type footer wraps its children in the inner flex row", () => {
    const layout = pageLayoutSrc();
    const block = layout.slice(layout.indexOf("BY_TYPE_CARD"), layout.indexOf("BY_TYPE_CARD") + 900);
    // The reference: div.mt-4.pt-4.border-t > div.flex.items-center.gap-2 >
    // [checkbox, label, ml-auto dots] — the ml-auto is inert without the
    // inner row. Pinned on the footerRow FIELD (the chip row also carries
    // "flex items-center gap-2" — a bare substring match false-positives).
    expect(block).toMatch(/footerRow: "flex items-center gap-2"/);
  });
});

// ---------------------------------------------------------------------------
// Session-124 (the 124-c two-app calendar family walk — the pin-only
// session): the live-measured contracts of the never-walked interactive
// arm. PASS 1 walked both apps at 1440×900 + 390×844 through the shell +
// KPI row + month card + the filter rail (the radio semantics LIVE two-app
// for the first time) + the New Event dialog + the month-nav round-trip —
// ZERO parity defects (the single divergent axis adjudicated L-124c1 noise:
// ours carries the aria-label superset over the reference's unnamed
// icon-only nav buttons). PASS 2 walked ours-only populated 44/44 with
// every value db-verified. These pins freeze the walk's findings.
// ---------------------------------------------------------------------------

describe("session-124: the calendar family walk pins (the 124-c two-app face)", () => {
  it("the filter rail's TYPE vocabulary is the six pairs verbatim (124-c PASS 1: the 10 checkbox labels byte-equal two-app)", () => {
    const src = calendarPage();
    const block = src.slice(src.indexOf("TYPE_FILTERS"), src.indexOf("DATE_FILTERS"));
    // The live census: Appointments/Calls/Meetings/Tasks/Reminders/Demos
    // rendered identically on BOTH apps (16x16 boxes, unchecked).
    expect(block).toContain('{ id: "appointment", label: "Appointments" }');
    expect(block).toContain('{ id: "call", label: "Calls" }');
    expect(block).toContain('{ id: "meeting", label: "Meetings" }');
    expect(block).toContain('{ id: "task", label: "Tasks" }');
    expect(block).toContain('{ id: "reminder", label: "Reminders" }');
    expect(block).toContain('{ id: "demo", label: "Demos" }');
    expect((block.match(/\{ id: "/g) ?? []).length).toBe(6);
  });

  it("the filter rail's DATE vocabulary is the four pairs verbatim (124-c: the wire ids today/tomorrow/this_week/next_week)", () => {
    const src = calendarPage();
    const block = src.slice(src.indexOf("DATE_FILTERS"), src.indexOf("DATE_FILTERS") + 500);
    expect(block).toContain('{ id: "today", label: "Today" }');
    expect(block).toContain('{ id: "tomorrow", label: "Tomorrow" }');
    expect(block).toContain('{ id: "this_week", label: "This Week" }');
    expect(block).toContain('{ id: "next_week", label: "Next Week" }');
    expect((block.match(/\{ id: "/g) ?? []).length).toBe(4);
  });

  it("Clear All is the blue TEXT LINK resetting BOTH rails (124-c: the reset census false|false two-app)", () => {
    const src = calendarPage();
    // The walk: the link computes #2563eb/12px on both apps; the reset
    // clears the type record AND the single-valued dateRange.
    expect(src).toContain("className={FILTER_RAIL.clearAllLink}");
    expect(src).toMatch(/setFilters\(\{\}\);\s*setDateRange\(null\);/);
    expect(src).toMatch(/>\s*Clear All\s*<\/button>/);
    const layout = pageLayoutSrc();
    expect(layout).toMatch(/clearAllLink: "text-xs text-blue-600 hover:text-blue-700 font-normal"/);
  });

  it("the empty-state pair reads No upcoming events / No events found in the centered py-8 construction (124-c: byte-equal two-app)", () => {
    const src = calendarPage();
    expect(src).toContain("No upcoming events");
    expect(src).toContain("No events found");
    expect(src).toMatch(/text-center text-gray-500 py-8/);
    expect(src).not.toContain("No events upcoming");
  });

  it("the header search is the pl-9 h-9 construction with the Search events... placeholder + aria-label (124-c: the shell census)", () => {
    const src = calendarPage();
    expect(src).toContain('placeholder="Search events..."');
    expect(src).toContain('aria-label="Search events"');
    expect(src).toMatch(/className="h-9 pl-9"/);
    expect(src).toMatch(/relative flex-1 sm:flex-none sm:w-64/);
  });

  it("the KPI week windows are the typed [weekStart, weekEnd) counts off the RAW array (124-c PASS 2: 3 meetings / 1 call db-verified)", () => {
    const src = calendarPage();
    const meetings = src.slice(src.indexOf("const meetingsThisWeek"), src.indexOf("const meetingsThisWeek") + 400);
    const calls = src.slice(src.indexOf("const callsThisWeek"), src.indexOf("const callsThisWeek") + 400);
    // The walk verified the rendered 3/1 == the db's window counts: the
    // type equality + the [weekStart, weekEnd) bounds are the contract.
    expect(meetings).toContain('e.type === "meeting"');
    expect(meetings).toContain("weekStart");
    expect(meetings).toContain("weekEnd");
    expect(calls).toContain('e.type === "call"');
    expect(calls).toContain("weekStart");
    expect(calls).toContain("weekEnd");
    expect(meetings).not.toContain("visible");
    expect(calls).not.toContain("visible");
  });

  it("the nav trio: the outline icon pair + the Today hidden-below-sm + OUR aria-label superset (the L-124c1 adjudication made standing)", () => {
    const src = calendarPage();
    // The walk: the reference's icon-only nav buttons compute EMPTY
    // accessible names; ours carry the aria-label pair — the a11y
    // superset (the mobile-nav doctrine: the reference's own defect,
    // fixed in ours, never copied). Geometry byte-equal: 36x36 outline
    // icons; Today 75x36 at 1440 and display:none below sm.
    expect(src).toContain('aria-label="Previous month"');
    expect(src).toContain('aria-label="Next month"');
    const todayBtn = src.slice(src.indexOf("Previous month"), src.indexOf("Next month"));
    expect(todayBtn).toMatch(/hidden sm:flex/);
    expect(src).toMatch(/variant="outline" size="icon"/);
  });

  it("the upcoming related line is the ACCOUNT-first chain with the Contact prefix (124-c PASS 2: 'Contact: Oasis Healthcare' db-verified)", () => {
    const src = calendarPage();
    const block = src.slice(src.indexOf("Upcoming Events"), src.indexOf("Upcoming Events") + 3000);
    // The walk's FAIL-then-decode: the rendered line reads the ACCOUNT
    // name first (the source's own ?? chain), the relatedType default
    // "Contact" as the prefix.
    expect(block).toMatch(/e\.account\?\.name \?\? e\.contact\?\.name/);
    expect(block).toContain('e.relatedType ?? "Contact"');
  });

  it("the Phone ghost renders ONLY on call type (124-c PASS 2: the ghost trio db-verified)", () => {
    const src = calendarPage();
    const block = src.slice(src.indexOf("Upcoming Events"), src.indexOf("Upcoming Events") + 3000);
    // Pen (Edit) + MessageCircle always; the Phone icon gated on the
    // call type — the walk verified hasPhone true on the call row and
    // the conditional absent otherwise.
    expect(block).toMatch(/\{e\.type === "call" && \(/);
    expect(block).toContain('aria-label="Call contact"');
    expect(block).toContain('aria-label="Message contact"');
    expect(block).toContain('aria-label="Edit event"');
  });

  it("the chip onClick opens the EDIT dialog with the event prefilled (124-c PASS 2: the unpinned edit arm — setEditing + null defaultStart)", () => {
    const src = calendarPage();
    const region = src.slice(src.indexOf("monthGrid"), src.indexOf("monthGrid") + 3600);
    // The walk: clicking a day-cell chip opens the Edit Event dialog
    // with the event's title prefilled — the full trio, the
    // defaultStart null distinguishing it from the day-cell
    // double-click create arm.
    expect(region).toMatch(/setEditing\(e\);\s*setDefaultStart\(null\);\s*setDialogOpen\(true\);/);
  });
});

// ---------------------------------------------------------------------------
// Session-125 — the 125-c walk pins (the activities family walk, the
// LAST never-two-app-walked interactive family: PASS 1 zero-data
// two-app 176+142 axes — the F-125c1 active-pill find fixed at
// TABS_SEGMENTED [pinned in page-layout] + the L-125c2 expander
// superset adjudicated; PASS 2 populated ours-only 49/49 db-verified).
// The unpinned residue the walk surfaced: the tab-label + empty-state
// quartets, the KPI label sextet + the FILTERED-basis doctrine, the
// API render order, the quick-log preset + toggle arms, the by-type
// vocabulary — none ever pinned as sets.
// ---------------------------------------------------------------------------

describe("session-125: the activities family walk pins (the 125-c two-app face)", () => {
  it("the tab strip is the ordered quartet Overdue/Due Today/Upcoming/Completed (the walk's live census)", () => {
    const src = activitiesPage();
    // The PASS 1 census: the four tabs byte-equal on both apps — the
    // labels in ORDER, the segmented construction, the count badge on
    // Overdue only. The labels were never pinned as an ordered set.
    const tabsBlock = src.slice(src.indexOf("tabs={["), src.indexOf("tabs={[") + 420);
    expect(tabsBlock.indexOf('"Overdue"')).toBeGreaterThanOrEqual(0);
    expect(tabsBlock.indexOf('"Due Today"')).toBeGreaterThan(tabsBlock.indexOf('"Overdue"'));
    expect(tabsBlock.indexOf('"Upcoming"')).toBeGreaterThan(tabsBlock.indexOf('"Due Today"'));
    expect(tabsBlock.indexOf('"Completed"')).toBeGreaterThan(tabsBlock.indexOf('"Upcoming"'));
    expect(src).toContain('variant="segmented"');
    expect(src).toContain("cols={4}");
  });

  it("the four empty-state literals ship as the ordered quartet (the walk's tab-switch LIVE)", () => {
    const src = activitiesPage();
    // The PASS 1 tab-switch semantics: all four panels swap to their
    // own empty state — each literal pinned exactly once, in the tab
    // order; only "No activities due today" was pinned before (s76).
    expect((src.match(/"No overdue activities"/g) ?? []).length).toBe(1);
    expect((src.match(/"No activities due today"/g) ?? []).length).toBe(1);
    expect((src.match(/"No upcoming activities"/g) ?? []).length).toBe(1);
    expect((src.match(/"No completed activities"/g) ?? []).length).toBe(1);
    expect(src).not.toContain("Nothing due today");
    expect(src).not.toContain("No overdue items");
  });

  it("the KPI row is the ordered label sextet (the D-117a2/D-118a1 genus — never pinned as a set)", () => {
    const src = activitiesPage();
    // The PASS 1 census: all six BarStatCards byte-equal on both apps —
    // the labels in ORDER. The D-117a2/D-118a1 genus: the statcard
    // labels were never pinned as a set anywhere.
    const labels = [
      "Activities Today", "Overdue Activities", "Emails Sent",
      "Calls Logged", "Meetings Scheduled", "WhatsApp",
    ];
    let prev = -1;
    for (const l of labels) {
      const i = src.indexOf(`label="${l}"`);
      expect(i, `label="${l}" must exist`).toBeGreaterThan(0);
      expect(i).toBeGreaterThan(prev);
      prev = i;
    }
    expect((src.match(/<BarStatCard/g) ?? []).length).toBe(6);
  });

  it("the KPI values read the FILTERED basis — the filters MOVE the KPI values (the OPPOSITE of the calendar's RAW doctrine)", () => {
    const src = activitiesPage();
    // The PASS 2 filtered-basis cascade: checking the Call type moved
    // the whole KPI sextet (1/0/0/0/5 + the badge) — every derivation
    // reads baseFiltered, never the raw activities array. The calendar
    // keeps its KPIs RAW under filters; the activities page is the
    // reference's OWN opposite doctrine (the L-76c2 A/O/P memos).
    expect(src).toMatch(/const baseFiltered = React\.useMemo\(\(\) => \{\s*const activeTypes/);
    expect(src).toMatch(/activitiesToday = baseFiltered\.filter/);
    expect(src).toMatch(/emailsSent = baseFiltered\.filter/);
    expect(src).toMatch(/callsLogged = baseFiltered\.filter/);
    expect(src).toMatch(/meetingsScheduled = baseFiltered\.filter/);
    expect(src).toMatch(/whatsappInteractions = baseFiltered\.filter/);
    expect(src).toMatch(/const overdue = baseFiltered\.filter/);
    // the range fold-in (our functional superset over the reference's
    // dead Status select — the s8 precedent): createdAt within rangeDays
    expect(src).toMatch(/new Date\(a\.createdAt\) < rangeStart/);
  });

  it("the activities API orders dueAt asc then createdAt desc — the render order the walk's rows verified against", () => {
    const route = stripComments(read("src/app/api/activities/route.ts") ?? "");
    // The PASS 2 row order: the Overdue tab rendered the OLDEST due
    // first (Tomas Novak, due -4) — the API's compound order, never
    // pinned (only the events route's startAt desc was).
    expect(route).toContain('orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }]');
  });

  it("the quick-log preset rides the SUBMIT — the visible form always starts at Call (the L-76c6 quirk, walk-verified)", () => {
    const src = entityDialogs();
    // The PASS 2 create round-trip: Log WhatsApp opened the dialog with
    // the type select STILL reading "Call"; the submitted record landed
    // type=whatsapp — the preset wins at submit time in create mode.
    expect(src).toMatch(/type: activity \? form\.type : \(defaultType \|\| form\.type\)/);
    expect(src).toMatch(/type: activity\?\.type \?\? "call"/);
  });

  it("the toggle flips scheduled↔completed with the un-complete arm relabeled (the walk's round-trip)", () => {
    const src = activitiesPage();
    // The PASS 2 toggle round-trip: Check as completed flipped the db
    // status (overdue 3→2, completed 5→6) and the Completed tab's row
    // carried the "Mark as scheduled" un-complete arm — the flip is
    // BIDIRECTIONAL, the label keyed on the current status.
    expect(src).toMatch(/status: a\.status === "completed" \? "scheduled" : "completed"/);
    expect(src).toMatch(/a\.status === "completed" \? "Mark as scheduled" : "Check as completed"/);
  });

  it("the by-type chart is the FIVE-series vocabulary — WhatsApp is NEVER a chart series", () => {
    const src = activitiesPage();
    // The PASS 1 census: the by-type card's five chips "Call 0"...
    // byte-equal on both apps — the quintet vocabulary (the
    // BY_TYPE_CATEGORIES constant), WhatsApp a quick-log type but
    // never a series.
    expect(src).toContain('const BY_TYPE_CATEGORIES = ["call", "email", "meeting", "task", "note"] as const;');
    expect(src).not.toMatch(/BY_TYPE_CATEGORIES[^;]*whatsapp/);
  });
});

// ---------------------------------------------------------------------------
// Session-141 (the activities walk, walk32): the by-type chips palette +
// the STATIC subtitle — the walk's chip census verified the five swatches
// byte-equal two-app (the per-type colors live ONLY in the chips row; the
// bars are single-fill #3b82f6). The chips read the FILTERED set: at the
// 7days default the windowed counts "Call 5|Email 3|Meeting 4|Task 3|
// Note 0"; the Call-only filter round-trip moved them to "Call 5|rest 0"
// then restored byte-identically.
// ---------------------------------------------------------------------------

describe("session-141: the by-type chips palette + the static subtitle (the walk's chip census)", () => {
  it("the chips palette is the five-hex BY_TYPE_CARD.colors map + the w-3 h-3 inline-backgroundColor swatch + the STATIC Last 2 days subtitle", () => {
    const layout = read("src/lib/page-layout.ts") ?? "";
    expect(layout).not.toBe("");
    // THE FIVE-HEX MAP (the S13-P5 palette, DOM-extracted from the
    // reference's chip inline-colors — the walk's swatch census:
    // rgb(59,130,246) | rgb(139,92,246) | rgb(245,158,11) |
    // rgb(16,185,129) | rgb(20,184,166), byte-equal two-app)
    expect(layout).toContain('call: "#3b82f6",');
    expect(layout).toContain('email: "#8b5cf6",');
    expect(layout).toContain('meeting: "#f59e0b",');
    expect(layout).toContain('task: "#10b981",');
    expect(layout).toContain('note: "#14b8a6",');
    // THE STATIC SUBTITLE (S13-P5, live-verified again at s141: the
    // range filter does not change it — the windowed chips ride, the
    // subtitle never moves)
    expect(layout).toContain('subtitleText: "Last 2 days"');
    // THE SWATCH CONSTRUCTION: the w-3 h-3 rounded square carrying the
    // INLINE backgroundColor (never a Tailwind bg-class — the hex map
    // is the single color source)
    const page = activitiesPage();
    expect(page).toMatch(/style=\{\{ backgroundColor: t\.color \}\}/);
    // the chips render the windowed counts: "{t.label} {t.count}" off
    // the FILTERED baseFiltered set
    expect(page).toMatch(/\{t\.label\} \{t\.count\}/);
  });
});
