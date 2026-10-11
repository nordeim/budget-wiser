import { expect, test } from "@playwright/test";

// Session-109 (S109-P3): the seeded-state mobile walk of the FIFTH
// surface family — the activities priority rows at 390, the LAST
// un-walked phone surface (the spec-family census: auth, crm,
// mobile-navigation, reports-mobile, settings-mobile, calendar-mobile,
// activities-mobile). The seeded activities had never been walked at
// phone width WITH DATA, and no e2e pin held the activities geometry
// at 390 (the ten-route overflow sweep in mobile-navigation.spec
// asserts only the CLOSED-drawer document contract — nothing pins the
// KPI ladder, the segmented tab strip, the priority-row containment,
// or the quick-log wrap at phone width).
//
// The 109-c ANALYZE probes that motivated this guard found ONE live
// defect invisible to every standing gate: the priority row's right
// cluster — the time span (40px) + the ghost "Check as completed" text
// button (174px at min-content) + the 20px iconSm edit button = a
// 249px un-shrinkable min-content inside the 326px panel — pushed
// main.scrollWidth to 488 at 390 (a horizontally-swipeable
// /activities, the M-108c1 genus on the flex axis; M-109c1). This
// guard asserts BOTH frames: the document contract AND the
// inner-overflow contract (mainScrollW — the assertion that would have
// caught M-109c1), plus the per-row containment.
//
// The ANALYZE mysteries resolved (recorded so no future session
// re-hunts them): the whole rail (the Filters card + the
// Activities-by-Type card) is `hidden lg:block` — display:none below
// lg on BOTH apps (the reference's own desktop-only model); the
// by-type chart therefore measures w=0 at 390 on both apps (NOT a
// defect), and the quick-log header row wraps 2x2 at 390 (safe).
//
// This runs against the SEEDED e2e.db (the global setup pushes + seeds
// db/e2e.db) — the seeded-state face the zero-data drift sweep cannot
// see. The guard's geometry facts were mapped live first (the S109
// ANALYZE probes on the standing build, then transcribed here):
//   docScrollW 390 exact · mainScrollW 390 post-fix (488 pre-fix) ·
//   the KPI grid ONE track (358px) x 6 cards, gap 16px · the
//   segmented tab strip 4 triggers 4 tracks w=326 · the Overdue tab's
//   badge === the active panel's row count (self-consistent, never
//   hardcoded) · every priority row's right edge within the panel ·
//   the timeline LONG-WEEKDAY h3 headers + single-column rows · the
//   rail display:none at 390 · the quick-log row 4 buttons, none past
//   390 · a REAL Completed-tab switch that swaps the panel and keeps
//   the frame at 390.
test("the seeded activities hold the 390px phone contract (the fifth-surface mobile walk)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/activities");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "Activities", exact: true })).toBeVisible();
  // The rows are FETCHED data (fetchActivities lands after the static
  // shell paints — the s108 events-fetch-wait lesson: the heading
  // renders before the data resolves). Wait for the seeded timeline's
  // first LONG-WEEKDAY h3 before measuring (the standing seed groups
  // 23 activities under 12 date headers).
  await page.waitForLoadState("networkidle");
  await expect(page.locator("main h3").first()).toBeVisible({ timeout: 15000 });

  const geo = await page.evaluate(() => {
    // the KPI grid: the FIRST .grid.grid-cols-1 in main — the
    // PAGE_KPI_GRIDS.activities root ("grid grid-cols-1 sm:grid-cols-2
    // lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6"). The 6-card count
    // proves the walk found the right element.
    const kpi = document.querySelector("main .grid.grid-cols-1") as HTMLElement | null;
    const kpiCards = kpi ? Array.from(kpi.children) : [];
    // the segmented tab strip + the Overdue badge
    const tablist = document.querySelector('[role="tablist"]');
    const tabs = tablist ? Array.from(tablist.querySelectorAll('[role="tab"]')) : [];
    const overdueTab = tabs.find((t) => t.textContent?.startsWith("Overdue")) ?? null;
    const overdueBadge = overdueTab?.textContent?.replace(/^Overdue/, "") ?? "";
    // the ACTIVE panel + its rows (the p-3 rows inside the panel)
    const panel = document.querySelector('[role="tabpanel"]:not([hidden])');
    const rows = panel
      ? (Array.from(panel.querySelectorAll(".flex.items-center.justify-between")) as HTMLElement[])
      : [];
    const panelRight = panel ? panel.getBoundingClientRect().right : -1;
    const rowOverflows = rows.filter((r) => r.getBoundingClientRect().right > panelRight + 1).length;
    // the right cluster guard: the cluster (the row's LAST child) may
    // not extend past the row's own right edge (the pre-fix cluster
    // laid out 117px past the 326px row).
    const clusterOverflows = rows.filter((r) => {
      const cluster = r.children[r.children.length - 1];
      return cluster ? cluster.getBoundingClientRect().right > r.getBoundingClientRect().right + 1 : false;
    }).length;
    // the timeline: LONG-WEEKDAY h3 headers + single-column rows
    const h3s = Array.from(document.querySelectorAll("main h3"));
    const timelineRow = h3s[0]?.parentElement?.querySelector(".p-4") ?? null;
    // the rail: hidden lg:block — display:none below lg (the
    // reference's own model; the Filters + by-type cards)
    const rail = document.querySelector("main div.hidden.lg\\:block");
    // the quick-log row: the four Log-* buttons in the page header
    const quickLog = Array.from(document.querySelectorAll("main button")).filter((b) =>
      /^Log (Call|Email|Meeting|WhatsApp)/.test(b.textContent?.trim() ?? ""),
    );
    return {
      // (a) the document-level contract: nothing overflows the frame.
      docScrollW: document.documentElement.scrollWidth,
      // (b) the INNER-overflow contract — the M-109c1 catcher: the
      // priority rows may not push the main scroller past the phone
      // frame (pre-fix this read 488: the 249px cluster).
      mainScrollW: document.querySelector("main")?.scrollWidth ?? -1,
      // (c) the KPI ladder at phone width: single column, 6 cards,
      // gap-4 (the sm/lg/xl arms inactive below 640/1024/1280).
      kpiCardCount: kpiCards.length,
      kpiTrackCount: kpi ? getComputedStyle(kpi).gridTemplateColumns.split(" ").length : -1,
      kpiGap: kpi ? getComputedStyle(kpi).gap : null,
      // (d) the segmented tab strip: 4 triggers in 4 tracks.
      tabCount: tabs.length,
      tabTrackCount: tablist ? getComputedStyle(tablist).gridTemplateColumns.split(" ").length : -1,
      overdueBadge,
      // (e) the priority rows: the active panel's rows, every row
      // within the panel, every cluster within its row.
      rowCount: rows.length,
      rowOverflows,
      clusterOverflows,
      // (f) the timeline: the LONG-WEEKDAY headers + the row width
      // (single-column stack — the Card p-4 rows fit the content
      // column; the rail is display:none so nothing competes).
      timelineHeaderCount: h3s.length,
      timelineRowW: timelineRow ? Math.round(timelineRow.getBoundingClientRect().width) : -1,
      // (g) the rail: display:none at 390 (the reference's own model).
      railDisplay: rail ? getComputedStyle(rail).display : "absent",
      // (h) the quick-log row: 4 buttons, none past the frame.
      quickLogCount: quickLog.length,
      quickLogMaxRight: quickLog.length
        ? Math.round(Math.max(...quickLog.map((b) => b.getBoundingClientRect().right)))
        : -1,
    };
  });

  // (a) the document contract.
  expect(geo.docScrollW, "the seeded activities overflow the 390px frame").toBeLessThanOrEqual(390);
  // (b) the INNER contract — the priority rows may not push main past
  // the frame (pre-fix this read 488: the unshrinkable cluster).
  expect(geo.mainScrollW, "the seeded activities push main past the 390px frame (the M-109c1 genus)").toBeLessThanOrEqual(390);
  // (c) the KPI ladder: 6 stat cards stacked in ONE column.
  expect(geo.kpiCardCount, "the KPI grid must ship its 6 cards").toBe(6);
  expect(geo.kpiTrackCount, "the KPI grid must be single-track at 390").toBe(1);
  expect(geo.kpiGap, "the KPI grid must keep its gap-4 (16px)").toBe("16px");
  // (d) the segmented tab strip: 4 triggers in 4 tracks, the Overdue
  // badge self-consistent with the panel (never hardcoded — the seed
  // may change and the guard follows it).
  expect(geo.tabCount, "the tab strip must ship its 4 tabs").toBe(4);
  expect(geo.tabTrackCount, "the tab strip must be 4-track").toBe(4);
  expect(geo.rowCount, "the active panel must ship rows on the seeded data").toBeGreaterThan(0);
  expect(geo.overdueBadge, "the Overdue tab's badge must equal the panel's row count").toBe(String(geo.rowCount));
  // (e) the row containment — every row within the panel, every
  // cluster within its row (the M-109c1 guard; pre-fix the cluster
  // sat 117px past the 326px row).
  expect(geo.rowOverflows, "no row may render past the panel's right edge (the M-109c1 genus)").toBe(0);
  expect(geo.clusterOverflows, "no right cluster may render past its row's right edge").toBe(0);
  // (f) the timeline: the LONG-WEEKDAY headers + the single-column rows.
  expect(geo.timelineHeaderCount, "the seeded timeline must group under LONG-WEEKDAY h3 headers").toBeGreaterThan(0);
  expect(geo.timelineRowW, "the timeline rows must fit the 390px frame").toBeLessThanOrEqual(358);
  // (g) the rail: display:none at 390 — the reference's own model.
  expect(geo.railDisplay, "the filters/by-type rail must be display:none below lg").toBe("none");
  // (h) the quick-log row: 4 buttons, none past the frame (they wrap
  // 2x2 at 390 — the ANALYZE-verified safe face).
  expect(geo.quickLogCount, "the header must ship its 4 quick-log buttons").toBe(4);
  expect(geo.quickLogMaxRight, "no quick-log button may pass the 390px frame").toBeLessThanOrEqual(390);

  // (i) a REAL tab switch at phone width: Overdue → Completed — the
  // active tab moves, the panel swaps, and the frame stays at 390.
  await page.getByRole("tab", { name: "Completed" }).click();
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => ({
    active: document.querySelector('[role="tab"][aria-selected="true"]')?.getAttribute("data-state") ?? null,
    selectedText: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent ?? null,
    panelRows: document
      .querySelector('[role="tabpanel"]:not([hidden])')
      ?.querySelectorAll(".flex.items-center.justify-between").length ?? -1,
    docScrollW: document.documentElement.scrollWidth,
    mainScrollW: document.querySelector("main")?.scrollWidth ?? -1,
  }));
  expect(after.selectedText, "the Completed tab must be selected").toContain("Completed");
  expect(after.docScrollW, "the switched panel must not overflow the 390px frame").toBeLessThanOrEqual(390);
  expect(after.mainScrollW, "the switched panel must not push main past the frame").toBeLessThanOrEqual(390);
});
