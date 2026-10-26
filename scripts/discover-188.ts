// Session-188 (discovery): THE SETTINGS SEGMENTED TAB-BAR + THE
// ACCOUNT/LEADS/REPORTS PAGE-LEVEL ARMS probe — the s396 close's named
// next-rotation candidates: "the remaining unwalked interiors at the
// reference's zero-data state (the settings Data-tab's OWN deeper focus
// faces — the RESET input's REAL-keyboard ring walked, the tab-bar
// segmented focus faces never · the account/leads/reports page-level
// interactive arms under ADR-022 — the density selects + the period
// dropdown + the report tabs' focus/open faces, the s18/s25-era
// constructions never re-walked live)" (first-named + second-named),
// plus the standing re-checks (the discover-184/185/186/187
// Edit-family census — the reference's zero-row state; the
// topbar-search dropdown arm gated on the reference's own suggestions
// ever populating). probe:ref STABLE (46bc2d9c, this session) kills
// the fresh-bundle candidate; the registry's latest 3.10.1 (verified
// live) kills the recharts 4.0 gate. This probe answers the
// round-shape questions BEFORE the plan:
//
//   1. THE EDIT-FAMILY REACHABILITY (standing re-check) — the row
//      counts on /contacts, /leads, /accounts + the calendar chips on
//      both apps (the discover-184/185/186/187 census, one leg).
//   2. THE SETTINGS TAB-BAR (first-named) — the segmented Tabs strip
//      (CRM Configuration | Defaults | Data — the s23-era
//      construction): the three triggers' resting + FOCUS faces + the
//      strip's geometry. The focus faces never walked under ADR-022.
//   3. THE PAGE-LEVEL ARMS (second-named) — the accounts rail's three
//      selects (Filter by owner/industry/revenue — the s28-era
//      construction) + the leads toolbar's search input + the reports
//      tab pills (the s18/s25-era constructions never RE-walked
//      live): resting + focus faces, the reachability census.
//   4. THE TOPBAR-SEARCH DROPDOWN (the standing conditional gate) —
//      does the reference's own search populate suggestions NOW? One
//      leg: type a seeded-term, census any listbox/popover/dropdown.
//
// Run: bun scripts/discover-188.ts
// (reuses the dev server on :3000 — the walk57/58 boot-site form; the
// reference rides the sweep-state storageState pair, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

import { preflightPairState } from "./sweep-state";

const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const root = resolve(here, "..");
    if (existsSync(join(root, "package.json"))) return root;
  } catch {
    /* fall through to the cwd */
  }
  return process.cwd();
})();
const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

/** Leg 1 — the standing Edit-family reachability re-check (the
 * discover-184/185/186/187 census, one leg): the entity-page rows + the
 * calendar chips. The reference's rows name which edit dialogs can
 * open TWO-APP at all. */
async function censusRows(page: import("@playwright/test").Page, url: string, label: string, w: number): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("main table tbody tr")).filter(
      (tr) => (tr.textContent ?? "").trim().length > 0,
    );
    const rowMenuButtons = Array.from(document.querySelectorAll('main button[aria-haspopup="true"], main button[aria-haspopup="menu"]'));
    return {
      tableRows: rows.length,
      rowMenuCount: rowMenuButtons.length,
    };
  });
  console.log(`  [${label}@${w}] ${new URL(url).pathname}: rows=${census.tableRows} rowMenus=${census.rowMenuCount}`);
}

async function censusCalendar(page: import("@playwright/test").Page, base: string, label: string, w: number): Promise<void> {
  await page.goto(`${base}/calendar`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('main [class*="cursor-pointer"][class*="truncate"], main button[class*="text-xs"]')).filter((el) => (el.textContent ?? "").includes(":"));
    return { chipCount: chips.length };
  });
  console.log(`  [${label}@${w}] calendar chips: ${census.chipCount}`);
}

const face = (el: Element) => {
  const cs = getComputedStyle(el as HTMLElement);
  const r = el.getBoundingClientRect();
  return {
    bg: cs.backgroundColor,
    color: cs.color,
    border: cs.border,
    radius: cs.borderRadius,
    boxShadow: cs.boxShadow.slice(0, 200),
    outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
    font: `${cs.fontSize}/${cs.fontWeight}`,
    box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
    cls: (el.getAttribute("class") ?? "").slice(0, 160),
  };
};

/** Leg 2 — the settings segmented tab-bar census: the three triggers'
 * resting + programmatic-focus faces + the strip's geometry + the
 * aria wiring. The s23-era construction; the focus faces never
 * walked under ADR-022. */
async function probeSettingsTabs(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  const strip = await page.evaluate(() => {
    const tablist = document.querySelector('main [role="tablist"]');
    if (!tablist) return null;
    const cs = getComputedStyle(tablist as HTMLElement);
    const r = tablist.getBoundingClientRect();
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]')).map((t) => ({
      text: (t.textContent ?? "").trim(),
      id: t.id || "(none)",
      selected: t.getAttribute("aria-selected"),
      panel: t.getAttribute("aria-controls") || "(none)",
      disabled: (t as HTMLButtonElement).disabled,
    }));
    return {
      box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      bg: cs.backgroundColor,
      radius: cs.borderRadius,
      border: cs.border,
      cls: (tablist.getAttribute("class") ?? "").slice(0, 160),
      tabs,
    };
  });
  console.log(`\n=== ${label} SETTINGS TAB-BAR @${w}x*:`);
  if (!strip) {
    console.log("  TABLIST: NOT FOUND");
    return;
  }
  console.log(`  strip: box=${strip.box} bg=${strip.bg} radius=${strip.radius}\n    border="${strip.border}"\n    cls="${strip.cls}"`);
  for (const t of strip.tabs) console.log(`  tab "${t.text}" id=${t.id} selected=${t.selected} panel=${t.panel} disabled=${t.disabled}`);

  // Each trigger's resting + programmatic-focus face
  const triggers = page.locator('main [role="tablist"] [role="tab"]');
  const n = await triggers.count();
  for (let i = 0; i < n; i++) {
    const t = triggers.nth(i);
    const text = (await t.textContent())?.trim() ?? `#${i}`;
    const resting = await t.evaluate(face).catch(() => null);
    console.log(`  TAB "${text}" resting: bg=${resting?.bg} color=${resting?.color} box=${resting?.box}\n    cls="${resting?.cls}"`);
    await t.focus();
    const focused = await t.evaluate(face).catch(() => null);
    console.log(`  TAB "${text}" .focus(): boxShadow="${focused?.boxShadow}" outline="${focused?.outline}"`);
  }

  // The selected tab's data-state arm (the active face)
  const active = await page.evaluate(() => {
    const t = document.querySelector('main [role="tablist"] [role="tab"][data-state="active"], main [role="tablist"] [role="tab"][aria-selected="true"]');
    return t ? (t.getAttribute("class") ?? "").slice(0, 160) : "(none)";
  });
  console.log(`  ACTIVE TAB cls="${active}"`);
}

/** Leg 3a — the accounts rail: the three filter selects (owner/
 * industry/revenue — the s28-era construction), resting + programmatic
 * focus + the OPEN listbox census. */
async function probeAccountsRail(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/accounts`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  const census = await page.evaluate(() => {
    const combos = Array.from(document.querySelectorAll('main [role="combobox"]')).map((c) => ({
      aria: c.getAttribute("aria-label") ?? "(none)",
      text: (c.textContent ?? "").trim().slice(0, 40),
      id: c.id || "(none)",
      cls: (c.getAttribute("class") ?? "").slice(0, 150),
    }));
    const rail = Array.from(document.querySelectorAll("main aside, main [class*='w-80'], main [class*='hidden lg:block']")).map((r) => ({
      cls: (r.getAttribute("class") ?? "").slice(0, 120),
      w: Math.round(r.getBoundingClientRect().width),
    }));
    return { combos, rail: rail.slice(0, 4) };
  });
  console.log(`\n=== ${label} ACCOUNTS RAIL @${w}x*:`);
  for (const c of census.combos) console.log(`  combobox "${c.aria}" text="${c.text}" id=${c.id}\n    cls="${c.cls}"`);
  for (const r of census.rail) console.log(`  rail box w=${r.w} cls="${r.cls}"`);

  // The first rail select's resting + focus + OPEN face
  const firstCombo = page.locator('main [role="combobox"]').first();
  if (await firstCombo.count()) {
    const resting = await firstCombo.evaluate(face).catch(() => null);
    console.log(`  RAIL SELECT#1 resting: bg=${resting?.bg} border="${resting?.border}" box=${resting?.box}`);
    await firstCombo.focus();
    const focused = await firstCombo.evaluate(face).catch(() => null);
    console.log(`  RAIL SELECT#1 .focus(): boxShadow="${focused?.boxShadow}"`);
    await firstCombo.click();
    await page.waitForTimeout(700);
    const open = await page.evaluate(() => {
      const lb = document.querySelector('[role="listbox"]');
      if (!lb) return null;
      const cs = getComputedStyle(lb as HTMLElement);
      const items = Array.from(lb.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim().slice(0, 30));
      return {
        cls: (lb.getAttribute("class") ?? "").slice(0, 150),
        bg: cs.backgroundColor,
        radius: cs.borderRadius,
        shadow: cs.boxShadow.slice(0, 120),
        box: `${Math.round(lb.getBoundingClientRect().x)},${Math.round(lb.getBoundingClientRect().y)} ${Math.round(lb.getBoundingClientRect().width)}x${Math.round(lb.getBoundingClientRect().height)}`,
        items: items.slice(0, 8),
        itemCount: items.length,
      };
    });
    console.log(`  RAIL SELECT#1 OPEN: ${open ? `cls="${open.cls}" bg=${open.bg} radius=${open.radius} box=${open.box}\n    items(${open.itemCount})=[${open.items.join(" | ")}]` : "NO LISTBOX"}`);
    await page.keyboard.press("Escape").catch(() => undefined);
  } else {
    console.log("  RAIL SELECT: NOT FOUND");
  }
}

/** Leg 3b — the leads toolbar: the search input's resting + focus
 * faces + the Filters trigger + the toolbar geometry (the s29-era
 * construction; walk56 covered the popover OPEN, the search focus
 * face never walked). */
async function probeLeadsToolbar(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  const search = page.locator('main input[aria-label="Search leads"]').first();
  if (!(await search.count())) {
    console.log(`\n=== ${label} LEADS TOOLBAR @${w}x*: SEARCH NOT FOUND`);
    return;
  }
  const resting = await search.evaluate(face).catch(() => null);
  console.log(`\n=== ${label} LEADS TOOLBAR @${w}x*:`);
  console.log(`  SEARCH resting: bg=${resting?.bg} border="${resting?.border}" box=${resting?.box}\n    cls="${resting?.cls}"`);
  await search.focus();
  const focused = await search.evaluate(face).catch(() => null);
  console.log(`  SEARCH .focus(): boxShadow="${focused?.boxShadow}" outline="${focused?.outline}"`);

  const filtersBtn = page.locator('main button[aria-label="Open lead filters"]').first();
  if (await filtersBtn.count()) {
    const f = await filtersBtn.evaluate(face).catch(() => null);
    console.log(`  FILTERS TRIGGER resting: bg=${f?.bg} color=${f?.color} box=${f?.box}\n    cls="${f?.cls}"`);
  }
}

/** Leg 3c — the reports page: the tab pills' resting + focus faces
 * (the s18/s25-era constructions never RE-walked live — walk52 the
 * s179-era original) + the four select triggers' resting + focus
 * faces (walk55 covered the OPEN state). */
async function probeReportsArms(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  console.log(`\n=== ${label} REPORTS ARMS @${w}x*:`);

  // The tab pills
  const pills = page.locator('main [role="tablist"] [role="tab"]');
  const n = await pills.count();
  if (!n) {
    console.log("  TAB PILLS: NOT FOUND");
  } else {
    for (let i = 0; i < n; i++) {
      const p = pills.nth(i);
      const text = (await p.textContent())?.trim() ?? `#${i}`;
      const resting = await p.evaluate(face).catch(() => null);
      console.log(`  PILL "${text}" resting: bg=${resting?.bg} color=${resting?.color} box=${resting?.box}\n    cls="${resting?.cls}"`);
      await p.focus();
      const focused = await p.evaluate(face).catch(() => null);
      console.log(`  PILL "${text}" .focus(): boxShadow="${focused?.boxShadow}"`);
    }
  }

  // The four select triggers
  const combos = page.locator('main [role="combobox"]');
  const m = await combos.count();
  for (let i = 0; i < m; i++) {
    const c = combos.nth(i);
    const aria = await c.getAttribute("aria-label").catch(() => "(none)");
    const resting = await c.evaluate(face).catch(() => null);
    console.log(`  SELECT "${aria}" resting: bg=${resting?.bg} border="${resting?.border}" box=${resting?.box}`);
    await c.focus();
    const focused = await c.evaluate(face).catch(() => null);
    console.log(`  SELECT "${aria}" .focus(): boxShadow="${focused?.boxShadow}"`);
  }
}

/** Leg 4 — the topbar-search dropdown: does typing populate any
 * suggestion surface on either app? (the standing conditional gate.) */
async function probeTopbarSearch(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  const search = page.locator('header input, input[type="search"], input[placeholder*="Search"]').first();
  if (!(await search.count())) {
    console.log(`\n=== ${label} TOPBAR SEARCH @${w}x*: INPUT NOT FOUND`);
    return;
  }
  const ph = await search.getAttribute("placeholder");
  await search.click();
  await search.fill("Acme");
  await page.waitForTimeout(1500);
  const census = await page.evaluate(() => {
    const pop = Array.from(document.querySelectorAll('[role="listbox"], [role="dialog"], [data-radix-popper-content-wrapper], [class*="absolute"] [class*="z-50"]'));
    const visible = pop.filter((p) => {
      const r = p.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    return { popCount: visible.length, texts: visible.map((p) => (p.textContent ?? "").trim().slice(0, 80)) };
  });
  console.log(`\n=== ${label} TOPBAR SEARCH @${w}x*: placeholder="${ph}" populated=${census.popCount}`);
  for (const t of census.texts) console.log(`    pop text: "${t}"`);
  await page.keyboard.press("Escape").catch(() => undefined);
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[discover-188] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-188] pair state: ready (the s162 guarded form)");
    const w = 1440;
    for (const [label, base] of [
      ["OURS", OUR_URL],
      ["REF ", REF_URL],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      console.log(`\n########## ${label} @${w}x900 ##########`);
      for (const p of ["/contacts", "/leads", "/accounts"]) {
        await censusRows(page, `${base}${p}`, label, w).catch((e) => console.log(`  [${p} ${label}] ERROR: ${e}`));
      }
      await censusCalendar(page, base, label, w).catch((e) => console.log(`  [calendar ${label}] ERROR: ${e}`));
      await probeSettingsTabs(page, base, label, w).catch((e) => console.log(`  [settings-tabs ${label}] ERROR: ${e}`));
      await probeAccountsRail(page, base, label, w).catch((e) => console.log(`  [accounts-rail ${label}] ERROR: ${e}`));
      await probeLeadsToolbar(page, base, label, w).catch((e) => console.log(`  [leads-toolbar ${label}] ERROR: ${e}`));
      await probeReportsArms(page, base, label, w).catch((e) => console.log(`  [reports-arms ${label}] ERROR: ${e}`));
      await probeTopbarSearch(page, base, label, w).catch((e) => console.log(`  [topbar-search ${label}] ERROR: ${e}`));
      await ctx.close();
    }
  } finally {
    await browser.close().catch(() => undefined);
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
}

main().catch((e) => {
  console.error("[discover-188]", e);
  process.exit(1);
});
