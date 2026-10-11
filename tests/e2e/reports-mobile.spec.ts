import { expect, test } from "@playwright/test";

// Session-105 (S105-P2): the seeded-state mobile walk of the SECOND
// surface family — the reports analytics tabs at 390. The s103 157
// capture is desktop-only (1904x1077); the tab charts were never walked
// at phone width WITH DATA, and no e2e pin held the reports geometry at
// 390 (the ten-route overflow sweep in mobile-navigation.spec asserts
// only the CLOSED-drawer document contract — nothing pins the KPI row,
// the 2-column pill tab bar, or the 300px charts at phone width).
//
// This runs against the SEEDED e2e.db (the global setup pushes + seeds
// db/e2e.db) — the seeded-state face the zero-data drift sweep cannot
// see. The guard's geometry facts were mapped live first (the S105
// ANALYZE probe on the dev server, then transcribed here):
//   docScrollW 390 exact · the KPI row ONE track (358px) x 5 cards,
//   gap 16px · the pill tab bar TWO tracks (174px 174px — grid-cols-2
//   at 390; the lg:grid-cols-5 variant inactive below 1024), 5
//   triggers, 3 rows · the sales panel 4 charts at exactly 300px in a
//   single-column gap-24px grid · a REAL tab switch moves the active
//   tab, swaps the panel, and keeps the frame at 390.
test("the seeded reports tabs hold the 390px phone contract (the second-surface mobile walk)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/reports");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("tab", { name: "Sales Overview" })).toBeVisible();

  const geo = await page.evaluate(() => {
    // the KPI row: the FIRST .grid.grid-cols-1 in main — empirically the
    // PAGE_KPI_GRIDS.reports root (the charts grids match the selector
    // too but come LATER in document order; the 5-card count below
    // proves the walk found the right element).
    const kpiRow = document.querySelector(
      "main .grid.grid-cols-1",
    ) as HTMLElement | null;
    const kpiCards = kpiRow ? Array.from(kpiRow.children) : [];
    const tablist = document.querySelector('[role="tablist"]');
    const tabs = tablist ? Array.from(tablist.querySelectorAll('[role="tab"]')) : [];
    const active = tabs.find((t) => t.getAttribute("data-state") === "active");
    const panel = document.querySelector(
      '[role="tabpanel"]:not([hidden])',
    ) as HTMLElement | null;
    const charts = panel ? Array.from(panel.querySelectorAll(".recharts-wrapper")) : [];
    const chartGrid = charts[0] ? (charts[0].closest(".grid") as HTMLElement | null) : null;
    return {
      // (a) the document-level contract: nothing overflows the frame.
      docScrollW: document.documentElement.scrollWidth,
      // (b) the KPI row at phone width: single column, 5 cards, gap-4.
      kpiCardCount: kpiCards.length,
      kpiTrackCount: kpiRow
        ? getComputedStyle(kpiRow).gridTemplateColumns.split(" ").length
        : -1,
      kpiGap: kpiRow ? getComputedStyle(kpiRow).gap : null,
      // (c) the pill tab bar at phone width: grid-cols-2 (TWO tracks —
      // 5 triggers in 3 rows; the lg:grid-cols-5 form inactive at 390).
      tabCount: tabs.length,
      tabTrackCount: tablist
        ? getComputedStyle(tablist as HTMLElement).gridTemplateColumns.split(" ").length
        : -1,
      activeTab: active?.textContent?.trim() ?? null,
      // (d) the sales panel: 4 charts at exactly 300px, single-column
      // gap-6 grid (the lg:grid-cols-2 form inactive below 1024).
      chartCount: charts.length,
      chartHeights: charts.slice(0, 6).map((c) => Math.round(c.getBoundingClientRect().height)),
      chartGridGap: chartGrid ? getComputedStyle(chartGrid).gap : null,
      chartTrackCount: chartGrid
        ? getComputedStyle(chartGrid).gridTemplateColumns.split(" ").length
        : -1,
    };
  });

  // (a) the overflow contract — the seeded reports data may not push
  // anything past the phone frame (tab labels, KPI sparks, chart
  // legends, the sticky filter bar, all of it).
  expect(geo.docScrollW, "the seeded reports page overflows the 390px frame").toBeLessThanOrEqual(390);
  // (b) the KPI row: 5 cards stack in ONE column at gap-4.
  expect(geo.kpiCardCount, "the reports KPI row must ship its 5 cards").toBe(5);
  expect(geo.kpiTrackCount, "the KPI row must be single-track at 390").toBe(1);
  expect(geo.kpiGap, "the KPI row must keep its gap-4 (16px)").toBe("16px");
  // (c) the pill tab bar: all 5 destinations in the 2-column form.
  expect(geo.tabCount, "the tab bar must ship all 5 tabs").toBe(5);
  expect(geo.tabTrackCount, "the tab bar must be 2-track (grid-cols-2) at 390").toBe(2);
  expect(geo.activeTab, "the sales tab must be the initial active tab").toBe("Sales Overview");
  // (d) the sales panel: the 4 charts at the stock 300px height.
  expect(geo.chartCount, "the sales panel must ship its 4 charts").toBe(4);
  expect(geo.chartHeights, "every chart must render at exactly 300px").toEqual([300, 300, 300, 300]);
  expect(geo.chartGridGap, "the chart grid must keep its gap-6 (24px)").toBe("24px");
  expect(geo.chartTrackCount, "the chart grid must be single-track at 390").toBe(1);

  // (e) a REAL tab switch at phone width: the active tab moves, the
  // panel swaps, and the frame stays at 390 with the new charts out.
  await page.getByRole("tab", { name: "Pipeline & Forecast" }).click();
  await expect(page.getByRole("tabpanel", { name: "Pipeline & Forecast" })).toBeVisible();
  const switched = await page.evaluate(() => {
    const active = document.querySelector('[role="tab"][data-state="active"]');
    const panel = document.querySelector(
      '[role="tabpanel"]:not([hidden])',
    ) as HTMLElement | null;
    const charts = panel ? Array.from(panel.querySelectorAll(".recharts-wrapper")) : [];
    return {
      activeTab: active?.textContent?.trim() ?? null,
      chartCount: charts.length,
      chartHeights: charts.slice(0, 6).map((c) => Math.round(c.getBoundingClientRect().height)),
      docScrollW: document.documentElement.scrollWidth,
    };
  });
  expect(switched.activeTab, "the switch must move the active tab").toBe("Pipeline & Forecast");
  expect(switched.chartCount, "the pipeline panel must ship its 4 charts").toBe(4);
  expect(switched.chartHeights, "the pipeline charts must render at exactly 300px").toEqual([300, 300, 300, 300]);
  expect(switched.docScrollW, "the switched panel must not overflow the 390px frame").toBeLessThanOrEqual(390);
});
