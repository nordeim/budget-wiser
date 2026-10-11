import { expect, test } from "@playwright/test";

// Session-108 (S108-P5): the seeded-state mobile walk of the FOURTH
// surface family — the calendar grid at 390. The month grid is the
// app's tightest phone geometry (7 tracks in ~326px ≈ 43px cells); the
// seeded calendar had never been walked at phone width WITH DATA, and
// no e2e pin held the calendar geometry at 390 (the ten-route overflow
// sweep in mobile-navigation.spec asserts only the CLOSED-drawer
// document contract — nothing pins the KPI ladder, the DOW/month grid
// tracks, the chip containment, or the month-nav round-trip at phone
// width).
//
// The 108-c ANALYZE probes that motivated this guard found TWO live
// defects invisible to every standing gate: the event chips rendered at
// content width (INLINE spans — truncate never engaged — two chips
// pushed main.scrollWidth to 496 at 390; M-108c1) and the 42-cell grid
// vs the reference's complete-weeks 35 (M-108c2 — the extra row below
// the sweep fold on both apps). This guard asserts BOTH surfaces: the
// document contract AND the inner-overflow contract (mainScrollW — the
// assertion that would have caught M-108c1), plus the chip containment
// per cell.
//
// This runs against the SEEDED e2e.db (the global setup pushes + seeds
// db/e2e.db) — the seeded-state face the zero-data drift sweep cannot
// see. The guard's geometry facts were mapped live first (the S108
// ANALYZE probes on the standing build, then transcribed here):
//   docScrollW 390 exact · mainScrollW 390 post-fix (496 pre-fix) ·
//   the KPI grid ONE track (358px) × 4 cards, gap 16px · the DOW grid
//   7 labels · 7 tracks · gap 4px (gap-1; sm:gap-2 inactive at 390) ·
//   the month grid 7 tracks · cell ~42.8px × 80px (min-h-20) · the
//   complete-weeks cell count (35 for October 2026 — computed in-test,
//   never hardcoded) · every chip's right edge within its cell · the
//   Upcoming/Agenda grid ONE track (grid-cols-1; lg:grid-cols-2
//   inactive) · a REAL Next-month click that increments the title and
//   keeps the frame at 390.
test("the seeded calendar grid holds the 390px phone contract (the fourth-surface mobile walk)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/calendar");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "Upcoming Events" })).toBeVisible();
  // The chips are FETCHED data (fetchEvents(from, to) lands after the
  // static shell paints — the heading above renders before the events
  // resolve). Wait for the seeded current month's chips before
  // measuring (the S54-P6-era events-on-load contract: October carries
  // the −30/−14/+3/+7/… seeded events — 12 chips on the standing seed).
  await page.waitForLoadState("networkidle");
  const monthGrid = page.locator("main .grid.grid-cols-7").nth(1);
  await expect(monthGrid.locator("span.truncate").first()).toBeVisible({ timeout: 15000 });

  const geo = await page.evaluate(() => {
    // the KPI grid: the FIRST .grid.grid-cols-1 in main — the
    // PAGE_KPI_GRIDS.calendar root ("grid grid-cols-1 sm:grid-cols-2
    // lg:grid-cols-4 gap-4 mb-6"). The 4-card count proves the walk
    // found the right element.
    const kpi = document.querySelector("main .grid.grid-cols-1") as HTMLElement | null;
    const kpiCards = kpi ? Array.from(kpi.children) : [];
    // the DOW grid + the month grid: the two grid-cols-7 grids
    const sevens = Array.from(
      document.querySelectorAll("main .grid.grid-cols-7"),
    ) as HTMLElement[];
    const dow = sevens[0] ?? null;
    const month = sevens[sevens.length - 1] ?? null;
    const cells = month ? (Array.from(month.children) as HTMLElement[]) : [];
    // the chip containment: every chip's right edge within its cell
    const chips = month
      ? (Array.from(month.querySelectorAll("span.truncate")) as HTMLElement[])
      : [];
    const chipOverflows = chips.filter((c) => {
      const cell = c.closest("button");
      if (!cell) return false;
      return c.getBoundingClientRect().right > cell.getBoundingClientRect().right + 1;
    }).length;
    // the Upcoming/Agenda grid: grid-cols-1 lg:grid-cols-2
    const agenda = document.querySelector(
      "main .grid.grid-cols-1.lg\\:grid-cols-2",
    ) as HTMLElement | null;
    return {
      // (a) the document-level contract: nothing overflows the frame.
      docScrollW: document.documentElement.scrollWidth,
      // (b) the INNER-overflow contract — the M-108c1 catcher: the
      // seeded event chips may not push the main scroller past the
      // phone frame (the s105/s106 walks assert docScrollW only; the
      // chips overflowed main while the document stayed 390).
      mainScrollW: document.querySelector("main")?.scrollWidth ?? -1,
      // (c) the KPI ladder at phone width: single column, 4 cards,
      // gap-4 (the sm/lg arms inactive below 640/1024).
      kpiCardCount: kpiCards.length,
      kpiTrackCount: kpi ? getComputedStyle(kpi).gridTemplateColumns.split(" ").length : -1,
      kpiGap: kpi ? getComputedStyle(kpi).gap : null,
      // (d) the DOW grid: 7 labels in 7 tracks at gap-1.
      dowLabelCount: dow ? dow.children.length : -1,
      dowTrackCount: dow ? getComputedStyle(dow).gridTemplateColumns.split(" ").length : -1,
      dowGap: dow ? getComputedStyle(dow).gap : null,
      // (e) the month grid: 7 tracks, cells ≥ 40px wide, and the
      // complete-weeks cell count (computed by the caller).
      monthCellCount: cells.length,
      monthTrackCount: month ? getComputedStyle(month).gridTemplateColumns.split(" ").length : -1,
      monthCellMinW: cells.length
        ? Math.min(...cells.map((c) => c.getBoundingClientRect().width))
        : -1,
      // (f) the chip containment: zero chips past their cell's edge.
      chipCount: chips.length,
      chipOverflows,
      // (g) the Upcoming/Agenda stack: ONE track at 390.
      agendaChildCount: agenda ? agenda.children.length : -1,
      agendaTrackCount: agenda ? getComputedStyle(agenda).gridTemplateColumns.split(" ").length : -1,
    };
  });

  // (a) the document contract.
  expect(geo.docScrollW, "the seeded calendar overflows the 390px frame").toBeLessThanOrEqual(390);
  // (b) the INNER contract — the seeded chips may not push main past
  // the frame (pre-fix this read 496: two content-width chips).
  expect(geo.mainScrollW, "the seeded calendar pushes main past the 390px frame (the M-108c1 genus)").toBeLessThanOrEqual(390);
  // (c) the KPI ladder: 4 stat cards stacked in ONE column.
  expect(geo.kpiCardCount, "the KPI grid must ship its 4 cards").toBe(4);
  expect(geo.kpiTrackCount, "the KPI grid must be single-track at 390").toBe(1);
  expect(geo.kpiGap, "the KPI grid must keep its gap-4 (16px)").toBe("16px");
  // (d) the DOW grid: 7 labels, 7 tracks, gap-1.
  expect(geo.dowLabelCount, "the DOW grid must ship its 7 labels").toBe(7);
  expect(geo.dowTrackCount, "the DOW grid must be 7-track").toBe(7);
  expect(geo.dowGap, "the DOW grid must keep its gap-1 (4px) at 390").toBe("4px");
  // (e) the month grid: the COMPLETE-WEEKS cell count for the current
  // month — computed here with the same ceil math the seam carries
  // (never a hardcoded 35/42: the count is 28/35/42 as the month
  // demands — the reference's live model, M-108c2).
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const expectedCells = Math.ceil((first.getDay() + dim) / 7) * 7;
  expect(geo.monthCellCount, "the month grid must ship the complete-weeks cell count").toBe(expectedCells);
  expect(geo.monthTrackCount, "the month grid must be 7-track").toBe(7);
  expect(geo.monthCellMinW, "every month cell must be at least 40px wide at 390").toBeGreaterThanOrEqual(40);
  // (f) the chip containment — every seeded chip truncates inside its
  // cell (the M-108c1 guard; the seeded month carries chips).
  expect(geo.chipCount, "the seeded current month must render event chips").toBeGreaterThan(0);
  expect(geo.chipOverflows, "no chip may render past its cell's right edge (the M-108c1 genus)").toBe(0);
  // (g) the Upcoming/Agenda stack: ONE track at 390.
  expect(geo.agendaChildCount, "the Upcoming/Agenda grid must ship its 2 sections").toBe(2);
  expect(geo.agendaTrackCount, "the Upcoming/Agenda grid must be single-track at 390").toBe(1);

  // (h) a REAL month-nav round-trip at phone width: the title month
  // increments, the grid re-renders, and the frame stays at 390.
  const before = await page.evaluate(() => document.querySelector("main h2")?.textContent?.trim());
  await page.getByRole("button", { name: "Next month" }).click();
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => ({
    title: document.querySelector("main h2")?.textContent?.trim(),
    docScrollW: document.documentElement.scrollWidth,
    mainScrollW: document.querySelector("main")?.scrollWidth ?? -1,
    cells: (document.querySelectorAll("main .grid.grid-cols-7").length >= 2
      ? (document.querySelectorAll("main .grid.grid-cols-7") as NodeListOf<HTMLElement>)[
          document.querySelectorAll("main .grid.grid-cols-7").length - 1
        ].children.length
      : -1),
  }));
  expect(after.title, "the Next-month click must move the title").not.toBe(before);
  expect(after.docScrollW, "the flipped month must not overflow the 390px frame").toBeLessThanOrEqual(390);
  expect(after.mainScrollW, "the flipped month must not push main past the frame").toBeLessThanOrEqual(390);
  expect(after.cells, "the flipped month must render its complete-weeks grid").toBeGreaterThanOrEqual(28);
});
