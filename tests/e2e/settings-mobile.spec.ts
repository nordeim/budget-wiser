import { expect, test } from "@playwright/test";

// Session-106 (S106-P2): the seeded-state mobile walk of the THIRD
// surface family — the settings tabs at 390. The picklist genus is the
// largest phone-diff share (7.7); the seeded settings capture had
// never been walked at phone width WITH DATA, and no e2e pin held the
// settings geometry at 390 (the ten-route overflow sweep in
// mobile-navigation.spec asserts only the CLOSED-drawer document
// contract — nothing pins the segmented tab bar, the picklist grid,
// or the Data-tab switch at phone width).
//
// This runs against the SEEDED e2e.db (the global setup pushes + seeds
// db/e2e.db) — the seeded-state face the zero-data drift sweep cannot
// see. The guard's geometry facts were mapped live first (the S106
// ANALYZE probe on the standing build, then transcribed here):
//   docScrollW 390 exact · the segmented tab bar ONE row of THREE
//   equal tracks (~116px each — grid-cols-3, no responsive variant on
//   the settings Tabs), 3 triggers, active "CRM Configuration" · the
//   picklist grid (SETTINGS_GRID grid-cols-1 md:grid-cols-2 gap-4, the
//   md arm inactive at 390) ONE track (358px) × 5 cards, gap 16px · a
//   REAL tab switch to "Data" moves the active tab, swaps the panel to
//   3 cards, and keeps the frame at 390.
test("the seeded settings tabs hold the 390px phone contract (the third-surface mobile walk)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/settings");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("tab", { name: "CRM Configuration" })).toBeVisible();

  const geo = await page.evaluate(() => {
    // the picklist grid: the FIRST .grid.grid-cols-1 in main — the
    // SETTINGS_GRID root ("grid grid-cols-1 md:grid-cols-2 gap-4").
    // The 5-card count below proves the walk found the right element
    // (the settings page ships exactly one such grid — the Config
    // panel's picklist container).
    const grid = document.querySelector(
      "main .grid.grid-cols-1",
    ) as HTMLElement | null;
    const cards = grid ? Array.from(grid.children) : [];
    const tablist = document.querySelector('[role="tablist"]');
    const tabs = tablist ? Array.from(tablist.querySelectorAll('[role="tab"]')) : [];
    const active = tabs.find((t) => t.getAttribute("data-state") === "active");
    return {
      // (a) the document-level contract: nothing overflows the frame
      // (the seeded picklist DATA is the largest phone-diff genus).
      docScrollW: document.documentElement.scrollWidth,
      // (b) the segmented tab bar at phone width: the grid-cols-3 form
      // (THREE equal tracks — ONE row; the settings Tabs carry no
      // responsive variant, unlike the reports pill's grid-cols-2).
      tabCount: tabs.length,
      tabTrackCount: tablist
        ? getComputedStyle(tablist as HTMLElement).gridTemplateColumns.split(" ").length
        : -1,
      activeTab: active?.textContent?.trim() ?? null,
      // (c) the picklist grid at phone width: single column, 5 cards,
      // gap-4 (the md:grid-cols-2 arm inactive below 768).
      picklistCardCount: cards.length,
      picklistTrackCount: grid
        ? getComputedStyle(grid).gridTemplateColumns.split(" ").length
        : -1,
      picklistGap: grid ? getComputedStyle(grid).gap : null,
    };
  });

  // (a) the overflow contract — the seeded picklist data may not push
  // anything past the phone frame (the bordered list rows, the rename
  // inputs, the template buttons, all of it).
  expect(geo.docScrollW, "the seeded settings page overflows the 390px frame").toBeLessThanOrEqual(390);
  // (b) the segmented tab bar: all 3 destinations in the one-row
  // three-track form.
  expect(geo.tabCount, "the tab bar must ship all 3 tabs").toBe(3);
  expect(geo.tabTrackCount, "the tab bar must be 3-track (grid-cols-3, one row) at 390").toBe(3);
  expect(geo.activeTab, "the config tab must be the initial active tab").toBe("CRM Configuration");
  // (c) the picklist grid: the 5 picklist cards stack in ONE column at
  // gap-4.
  expect(geo.picklistCardCount, "the picklist grid must ship its 5 cards").toBe(5);
  expect(geo.picklistTrackCount, "the picklist grid must be single-track at 390").toBe(1);
  expect(geo.picklistGap, "the picklist grid must keep its gap-4 (16px)").toBe("16px");

  // (d) a REAL tab switch at phone width: the active tab moves, the
  // panel swaps to the Data family (the 3 cards), and the frame stays
  // at 390.
  await page.getByRole("tab", { name: "Data" }).click();
  await expect(page.getByRole("tabpanel", { name: "Data" })).toBeVisible();
  const switched = await page.evaluate(() => {
    const active = document.querySelector('[role="tab"][data-state="active"]');
    const panel = document.querySelector(
      '[role="tabpanel"]:not([hidden])',
    ) as HTMLElement | null;
    // the Data panel's direct card children (the template/export/danger
    // Cards — 3 at phone width)
    const cards = panel ? Array.from(panel.querySelectorAll(":scope > div")) : [];
    return {
      activeTab: active?.textContent?.trim() ?? null,
      dataCardCount: cards.length,
      dataCardWidths: cards.map((c) => Math.round(c.getBoundingClientRect().width)),
      docScrollW: document.documentElement.scrollWidth,
    };
  });
  expect(switched.activeTab, "the switch must move the active tab").toBe("Data");
  expect(switched.dataCardCount, "the data panel must ship its 3 cards").toBe(3);
  expect(
    switched.dataCardWidths.every((w) => w > 0 && w <= 358),
    "the data cards must fit the 358px phone column",
  ).toBe(true);
  expect(switched.docScrollW, "the switched panel must not overflow the 390px frame").toBeLessThanOrEqual(390);
});
