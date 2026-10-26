// Session-189 (discovery): THE ACCOUNT INSIGHTS DIALOG + THE LEADS
// SAVED-VIEWS SELECT + THE CALENDAR MONTH-NAV ARMS probe — the s398
// close's named next-rotation candidates: "the remaining unwalked
// interiors at the reference's zero-data state (the account INSIGHTS
// dialog + the leads SAVED-VIEWS select's open faces — the s28/s29-era
// constructions never re-walked live under ADR-022 · the calendar
// month-nav arms — the s27-era construction, its interactive faces
// never walked)", plus the standing re-checks (the discover-184..188
// Edit-family census — the reference's zero-row state; the
// topbar-search dropdown arm gated on the reference's own suggestions
// ever populating). probe:ref STABLE (46bc2d9c, this session) kills
// the fresh-bundle candidate; the registry's latest 3.10.1 (verified
// live) kills the recharts 4.0 gate. This probe answers the
// round-shape questions BEFORE the plan:
//
//   1. THE EDIT-FAMILY REACHABILITY (standing re-check) — the row
//      counts on /contacts, /leads, /accounts + the calendar chips on
//      both apps (the discover-184..188 census, one leg). The Insights
//      dialog rides an account row's ⋮ menu — rowMenus=0 kills the arm.
//   2. THE LEADS SAVED-VIEWS SELECT (first-named) — the s29-era
//      construction: the toolbar's Saved Views select appears only
//      after a view is saved (localStorage `neo-crm.leads.views` — a
//      CLIENT-side seam, safe to exercise on both apps; the browser
//      context discards it). Leg: Save a view through the Filters
//      popover, then census the select's resting + focus + OPEN faces
//      on BOTH apps.
//   3. THE CALENDAR MONTH-NAV ARMS (second-named) — the s27-era
//      construction: the header row's three outline buttons (Previous
//      month / Today / Next month). Data-independent, reachable on
//      BOTH apps at the reference's zero-data state. Leg: the three
//      buttons' resting + focus faces + the strip geometry + the
//      click round-trip (local state, NO writes).
//   4. THE TOPBAR-SEARCH DROPDOWN (the standing conditional gate) —
//      does the reference's own search populate suggestions NOW? One
//      leg: type a seeded-term, census any listbox/popover/dropdown.
//
// Run: bun scripts/discover-189.ts
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
 * discover-184..188 census, one leg): the entity-page rows + the
 * calendar chips. The reference's rows name which edit dialogs can
 * open TWO-APP at all — the Insights dialog rides an account row's ⋮. */
async function censusRows(page: import("@playwright/test").Page, url: string, label: string, w: number): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("main table tbody tr")).filter(
      (tr) => (tr.textContent ?? "").trim().length > 0,
    );
    const rowMenuButtons = Array.from(document.querySelectorAll('main button[aria-haspopup="true"], main button[aria-haspopup="menu"]'));
    const insightsButtons = Array.from(document.querySelectorAll('main button, [role="menuitem"]')).filter((b) =>
      /view insights|insights/i.test(b.textContent ?? ""),
    );
    return {
      tableRows: rows.length,
      rowMenuCount: rowMenuButtons.length,
      insightsTriggers: insightsButtons.length,
    };
  });
  console.log(`  [${label}@${w}] ${new URL(url).pathname}: rows=${census.tableRows} rowMenus=${census.rowMenuCount} insightsTriggers=${census.insightsTriggers}`);
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

/** Leg 2 — the leads SAVED-VIEWS select: ride the Filters popover's
 * Save View flow (a localStorage seam — client-only, context-scoped,
 * never a DB write), then census the newly-mounted select's resting +
 * focus + OPEN faces on BOTH apps. The s29-era construction; the
 * select's open faces never walked under ADR-022. */
async function probeSavedViews(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  console.log(`\n=== ${label} LEADS SAVED-VIEWS @${w}x*:`);

  // Step 1 — the pre-save census: the select must be absent (length=0)
  const preSelects = await page.evaluate(() =>
    Array.from(document.querySelectorAll('main [role="combobox"]')).map((c) => ({
      aria: c.getAttribute("aria-label") ?? "(none)",
      text: (c.textContent ?? "").trim().slice(0, 40),
    })),
  );
  console.log(`  pre-save comboboxes(${preSelects.length}): [${preSelects.map((c) => `${c.aria}="${c.text}"`).join(" | ")}]`);

  // Step 2 — the Filters popover: open, click Save View, answer the
  // NATIVE prompt("Enter view name:") (the s29 live-verified contract —
  // the reference fires the same native prompt; the walk must handle
  // the dialog, never a text input).
  const filtersTrigger = page
    .locator('main button[aria-label="Open lead filters"], main button:has-text("Filters")')
    .first();
  if (!(await filtersTrigger.count())) {
    console.log("  FILTERS TRIGGER: NOT FOUND — arm unreachable");
    return;
  }
  await filtersTrigger.click();
  await page.waitForTimeout(900);
  const saveBtn = page.locator('button:has-text("Save View")').first();
  if (!(await saveBtn.count())) {
    console.log("  SAVE VIEW affordance: NOT FOUND in the popover");
    await page.keyboard.press("Escape").catch(() => undefined);
    return;
  }
  page.once("dialog", (d) => {
    void d.accept("Discovery View").catch(() => undefined);
  });
  await saveBtn.click();
  await page.waitForTimeout(1400);

  // Step 3 — the post-save census: the select's resting + focus + OPEN faces
  const select = page.locator('main [role="combobox"]').filter({ hasText: /Saved|Discovery/i }).first();
  if (!(await select.count())) {
    const allCombos = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main [role="combobox"]')).map((c) => (c.textContent ?? "").trim().slice(0, 40)),
    );
    console.log(`  POST-SAVE SELECT: NOT FOUND — combos now [${allCombos.join(" | ")}]`);
    return;
  }
  const resting = await select.evaluate(face).catch(() => null);
  console.log(`  SAVED-VIEWS resting: bg=${resting?.bg} color=${resting?.color} border="${resting?.border}" box=${resting?.box}\n    cls="${resting?.cls}"`);
  await select.focus();
  const focused = await select.evaluate(face).catch(() => null);
  console.log(`  SAVED-VIEWS .focus(): boxShadow="${focused?.boxShadow}" outline="${focused?.outline}"`);
  await select.click();
  await page.waitForTimeout(800);
  const open = await page.evaluate(() => {
    const lb = document.querySelector('[role="listbox"]');
    if (!lb) return null;
    const items = Array.from(lb.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim().slice(0, 30));
    const cs = getComputedStyle(lb as HTMLElement);
    return {
      cls: (lb.getAttribute("class") ?? "").slice(0, 160),
      bg: cs.backgroundColor,
      radius: cs.borderRadius,
      shadow: cs.boxShadow.slice(0, 120),
      itemCount: items.length,
      items: items.slice(0, 6),
    };
  });
  console.log(
    open
      ? `  SAVED-VIEWS OPEN: cls="${open.cls}" bg=${open.bg} radius=${open.radius}\n    items(${open.itemCount})=[${open.items.join(" | ")}]`
      : "  SAVED-VIEWS OPEN: NO LISTBOX",
  );
  await page.keyboard.press("Escape").catch(() => undefined);
}

/** Leg 3 — the calendar month-nav arms: the header row's three outline
 * buttons (Previous month / Today / Next month — the s27-era
 * construction). Data-independent; reachable on BOTH apps at the
 * reference's zero-data state. The resting + focus faces + the strip
 * geometry + the click round-trip (local state, NO writes). */
async function probeCalendarNav(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/calendar`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  console.log(`\n=== ${label} CALENDAR MONTH-NAV @${w}x*:`);

  const heading = await page.evaluate(() => {
    const h2 = document.querySelector("main h2");
    return h2 ? { text: (h2.textContent ?? "").trim(), cls: (h2.getAttribute("class") ?? "").slice(0, 120) } : null;
  });
  console.log(`  heading: "${heading?.text}" cls="${heading?.cls}"`);

  // The three nav buttons — the header-row band: the buttons whose
  // y-center sits within the heading's row (the s88-c9 locator-free
  // form: the reference carries no aria-labels on these; ours do).
  const navBtns = await page.evaluate(() => {
    const h2 = document.querySelector("main h2");
    if (!h2) return [] as Array<Record<string, string>>;
    const hr = h2.getBoundingClientRect();
    const band = hr.y;
    // the card-scoped pool (the month card owns the header row)
    const card = h2.closest("div")?.parentElement ?? h2.parentElement;
    const pool = Array.from(card?.querySelectorAll("button") ?? []);
    return pool
      .filter((b) => Math.abs(b.getBoundingClientRect().y - band) < 14)
      .map((b) => {
        const cs = getComputedStyle(b);
        const r = b.getBoundingClientRect();
        return {
          text: (b.textContent ?? "").trim() || "(icon)",
          aria: b.getAttribute("aria-label") ?? "(none)",
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          bg: cs.backgroundColor,
          color: cs.color,
          border: cs.border,
          radius: cs.borderRadius,
          shadow: cs.boxShadow.slice(0, 120),
          cls: (b.getAttribute("class") ?? "").slice(0, 160),
        };
      });
  });
  console.log(`  nav row buttons(${navBtns.length}):`);
  for (const b of navBtns) {
    console.log(`    btn "${b.text}" aria=${b.aria} box=${b.box} bg=${b.bg} color=${b.color}\n      border="${b.border}" radius=${b.radius}\n      cls="${b.cls}"`);
  }

  // The first icon button's focus face + a click round-trip (local state)
  const prevBtn = page.locator('main button[aria-label="Previous month"]').first();
  const prevFallback = page.locator("main h2").locator("xpath=../..//button").first();
  const target = (await prevBtn.count()) ? prevBtn : prevFallback;
  if (await target.count()) {
    await target.focus();
    const focused = await target.evaluate(face).catch(() => null);
    console.log(`  PREV .focus(): boxShadow="${focused?.boxShadow}" outline="${focused?.outline}"`);
    const before = await page.evaluate(() => document.querySelector("main h2")?.textContent?.trim() ?? "");
    await target.click();
    await page.waitForTimeout(900);
    const after = await page.evaluate(() => document.querySelector("main h2")?.textContent?.trim() ?? "");
    console.log(`  PREV click round-trip: "${before}" -> "${after}" (local state, NO writes)`);
  } else {
    console.log("  PREV BUTTON: NOT FOUND");
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
    console.log("[discover-189] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-189] pair state: ready (the s162 guarded form)");
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
      await probeSavedViews(page, base, label, w).catch((e) => console.log(`  [saved-views ${label}] ERROR: ${e}`));
      await probeCalendarNav(page, base, label, w).catch((e) => console.log(`  [calendar-nav ${label}] ERROR: ${e}`));
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
  console.error("[discover-189]", e);
  process.exit(1);
});
