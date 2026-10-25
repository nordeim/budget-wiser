// Session-184 (discovery): THE EDIT-FAMILY-REACHABILITY + ACTIVITIES
// MORE-FILTERS-TOGGLE probe — the s388 close's named OPEN/focus
// candidates: "the Edit-family dialogs' focus faces — the walk54 arm
// covered the CREATE family's canonical member" + "the activities
// More-Filters toggle's OPEN face — the same variant-flip family the
// D-183a1 find rode, the one other variant-flipping trigger in the
// app". This probe answers the round-shape questions BEFORE the plan:
//
//   1. The EDIT-FAMILY REACHABILITY — the reference's live data state
//      names which edit dialogs can open TWO-APP at all (the probe:ref
//      census carries contacts 0 / leads 0 / accounts 0 — if the
//      reference's tables are empty, the W7/wce/Mke edit dialogs have
//      no trigger rows there and the walk must adjudicate the shape).
//      Census: the row counts on the five entity pages + the row-menu
//      (the "..." trigger) presence + the calendar chip count on both
//      apps, at the desktop axis.
//   2. The ACTIVITIES MORE-FILTERS TOGGLE — the variant-flip family
//      arm: the trigger's RESTING class/face census on both apps, then
//      the CLICK: does the reference's button do ANYTHING (the L-125c2
//      dead-stub doctrine says no onClick — re-verify live), does OURS
//      reveal the More Types group (the functional superset), and what
//      does each trigger's face become post-click (the D-183a1
//      same-family check: OURS carries the FIXED outline — if the
//      reference's construction flipped to its dark stock primary and
//      ours flipped to OUR blue, that would be the family's second
//      live member).
//
// Run: bun scripts/discover-184.ts
// (reuses the dev server on :3000 — the walk56 boot-site form; the
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

/** The face probe — the walk53/55/56 computed form (the VISIBLE
 * carriers). */
function faceOf(el: Element): Record<string, string> {
  const cs = getComputedStyle(el as HTMLElement);
  return {
    bg: cs.backgroundColor,
    color: cs.color,
    border: cs.border,
    boxShadow: cs.boxShadow,
    borderRadius: cs.borderRadius,
    outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
    fontWeight: cs.fontWeight,
  };
}

/** Leg 1 — the entity-page row census: how many table rows + row-menu
 * ("..."/More trigger) candidates each app carries per page. The
 * reference's rows name the reachable edit dialogs. */
async function censusRows(page: import("@playwright/test").Page, url: string, label: string, w: number): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("main table tbody tr")).filter(
      (tr) => (tr.textContent ?? "").trim().length > 0,
    );
    const rowMenuButtons = Array.from(document.querySelectorAll('main button[aria-haspopup="true"], main button[aria-haspopup="menu"]'));
    const moreButtons = Array.from(document.querySelectorAll("main button")).filter((b) =>
      (b.textContent ?? "").trim() === "..." || (b.textContent ?? "").trim() === "⋯" || (b.getAttribute("aria-label") ?? "").toLowerCase().includes("more"),
    );
    return {
      tableRows: rows.length,
      firstRowText: rows[0] ? (rows[0].textContent ?? "").trim().slice(0, 70) : "(none)",
      rowMenuCount: rowMenuButtons.length,
      moreCount: moreButtons.length,
    };
  });
  console.log(`  [${label}@${w}] ${new URL(url).pathname}: rows=${census.tableRows} rowMenus=${census.rowMenuCount} more=${census.moreCount}`);
  if (census.tableRows > 0) console.log(`    firstRow: "${census.firstRowText}"`);
}

/** Leg 2 — the activities page: the calendar-chip census (the Edit
 * Event reachability) + the KPI zero-state, quick census. */
async function censusCalendar(page: import("@playwright/test").Page, base: string, label: string, w: number): Promise<void> {
  await page.goto(`${base}/calendar`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('main [class*="cursor-pointer"][class*="truncate"], main button[class*="text-xs"]')).filter((el) => (el.textContent ?? "").includes(":"));
    return { chipCount: chips.length, firstChip: chips[0] ? (chips[0].textContent ?? "").slice(0, 40) : "(none)" };
  });
  console.log(`  [${label}@${w}] calendar chips: ${census.chipCount} first="${census.firstChip}"`);
}

/** Leg 3 — the activities More-Filters toggle: the RESTING census on
 * both apps, the CLICK, and the post-click census. THE D-183a1
 * same-family check: the trigger's face before + after the click. */
async function probeMoreFilters(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const resting = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("main button")).find((b) =>
      (b.textContent ?? "").includes("More Filters"),
    );
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    const cs = getComputedStyle(btn);
    return {
      text: (btn.textContent ?? "").trim(),
      cls: (btn.getAttribute("class") ?? ""),
      ariaLabel: btn.getAttribute("aria-label") ?? "(none)",
      ariaExpanded: btn.getAttribute("aria-expanded") ?? "(none)",
      box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      boxShadow: cs.boxShadow,
      borderRadius: cs.borderRadius,
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      fontWeight: cs.fontWeight,
    };
  });
  console.log(`\n=== ${label} MORE-FILTERS @${w}x* RESTING:`);
  if (!resting) {
    console.log("  TRIGGER MISSING");
    return;
  }
  console.log(`  text="${resting.text}" expanded=${resting.ariaExpanded} label=${resting.ariaLabel}`);
  console.log(`  box=${resting.box} bg=${resting.bg} color=${resting.color} weight=${resting.fontWeight}`);
  console.log(`  border="${resting.border}" radius=${resting.borderRadius}`);
  console.log(`  cls="${resting.cls}"`);

  // the pre-click rail census: the More Types group presence
  const preGroups = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean).slice(0, 20),
  );
  console.log(`  pre-click labels: [${preGroups.join(" | ")}]`);

  // THE CLICK
  await page.locator("main button", { hasText: "More Filters" }).first().click();
  await page.waitForTimeout(700);

  const post = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("main button")).find((b) =>
      (b.textContent ?? "").includes("More Filters"),
    );
    if (!btn) return null;
    const cs = getComputedStyle(btn);
    return {
      cls: (btn.getAttribute("class") ?? ""),
      ariaExpanded: btn.getAttribute("aria-expanded") ?? "(none)",
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      boxShadow: cs.boxShadow,
      borderRadius: cs.borderRadius,
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      fontWeight: cs.fontWeight,
    };
  });
  const postGroups = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean).slice(0, 20),
  );
  console.log(`  POST-CLICK face:`);
  if (!post) {
    console.log("    TRIGGER GONE");
    return;
  }
  console.log(`    expanded=${post.ariaExpanded} bg=${post.bg} color=${post.color}`);
  console.log(`    border="${post.border}" radius=${post.borderRadius}`);
  console.log(`    cls="${post.cls}"`);
  console.log(`  post-click labels: [${postGroups.join(" | ")}]`);
  console.log(`  LABEL DELTA: ${preGroups.length} -> ${postGroups.length} (revealed: [${postGroups.filter((g) => !preGroups.includes(g)).join(", ")}])`);

  // close again (toggle back) — the round-trip census for OURS
  if (post.ariaExpanded === "true") {
    await page.locator("main button", { hasText: "More Filters" }).first().click();
    await page.waitForTimeout(400);
    const back = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
      const btn = Array.from(document.querySelectorAll("main button")).find((b) => (b.textContent ?? "").includes("More Filters"));
      return { labels: labels.length, expanded: btn?.getAttribute("aria-expanded") ?? "(none)", bg: btn ? getComputedStyle(btn).backgroundColor : "?" };
    });
    console.log(`  TOGGLE-BACK: labels=${back.labels} expanded=${back.expanded} bg=${back.bg}`);
  }
}

/** Leg 3b — the FULL rail-buttons census: Save All (ghost) + More
 * Filters (outline) + Filter (the DEFAULT variant — the D-183a1
 * family's next member: OUR --color-primary is deliberately the blue
 * the reference's CTAs use; if the reference's Filter button rides
 * its stock default it renders DARK #171717 where ours renders blue —
 * the drift sweep's clean standing table says it must be the explicit
 * blue CTA family instead; this census settles it live). */
async function probeRailButtons(
  page: import("@playwright/test").Page,
  label: string,
  w: number,
): Promise<void> {
  const census = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("main button")).filter((b) =>
      ["Save All", "Filter"].includes((b.textContent ?? "").trim()) ||
      (b.textContent ?? "").includes("More Filters"),
    );
    return buttons.map((b) => {
      const cs = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return {
        text: (b.textContent ?? "").trim(),
        cls: (b.getAttribute("class") ?? "").slice(0, 120),
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    });
  });
  console.log(`\n=== ${label} RAIL BUTTONS @${w}x* (${census.length}):`);
  for (const b of census) {
    console.log(`  "${b.text}" bg=${b.bg} color=${b.color} box=${b.box}`);
    console.log(`    border="${b.border}"`);
    console.log(`    shadow="${b.boxShadow}"`);
    console.log(`    cls="${b.cls}"`);
  }
}

/** Leg 4 — the quick-log quartet census (the other activities-page
 * variant construction — `variant={q.type === "whatsapp" ? "default" :
 * "outline"}`, the STATIC ternary) + the Log WhatsApp face. This is
 * the OTHER variant-bearing trigger family member on the activities
 * page — its OPEN-state (dialog-open) form is the s183-family check. */
async function probeQuickLog(
  page: import("@playwright/test").Page,
  label: string,
  w: number,
): Promise<void> {
  const census = await page.evaluate(() => {
    const header = Array.from(document.querySelectorAll("main h1, main h2")).find((h) => (h.textContent ?? "").includes("Activities"));
    const bar = header?.closest("div")?.parentElement;
    const scope = bar ?? document.querySelector("main") ?? document.body;
    const buttons = Array.from(scope.querySelectorAll("button")).filter((b) =>
      ["Log Call", "Log Email", "Log Meeting", "Log Task", "Log WhatsApp"].some((t) =>
        (b.textContent ?? "").includes(t),
      ),
    );
    return buttons.map((b) => {
      const cs = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return {
        text: (b.textContent ?? "").trim(),
        cls: (b.getAttribute("class") ?? "").slice(0, 80),
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    });
  });
  console.log(`\n=== ${label} QUICK-LOG @${w}x* (${census.length} buttons):`);
  for (const b of census) {
    console.log(`  "${b.text}" bg=${b.bg} color=${b.color} box=${b.box}`);
    console.log(`    border="${b.border}"`);
    console.log(`    cls="${b.cls}"`);
  }
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[discover-184] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-184] pair state: ready (the s162 guarded form)");
    const w = 1440;
    for (const [label, base] of [
      ["OURS", OUR_URL],
      ["REF ", REF_URL],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      console.log(`\n########## ${label} @${w}x900 ##########`);
      for (const p of ["/contacts", "/leads", "/accounts", "/activities"]) {
        await censusRows(page, `${base}${p}`, label, w).catch((e) => console.log(`  [${p} ${label}] ERROR: ${e}`));
      }
      await censusCalendar(page, base, label, w).catch((e) => console.log(`  [calendar ${label}] ERROR: ${e}`));
      await probeMoreFilters(page, base, label, w).catch((e) => console.log(`  [more-filters ${label}] ERROR: ${e}`));
      await probeRailButtons(page, label, w).catch((e) => console.log(`  [rail ${label}] ERROR: ${e}`));
      await probeQuickLog(page, label, w).catch((e) => console.log(`  [quick-log ${label}] ERROR: ${e}`));
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
  console.error("[discover-184]", e);
  process.exit(1);
});
