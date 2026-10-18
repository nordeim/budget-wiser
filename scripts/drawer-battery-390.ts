// Session-95: the mobile-nav drawer battery at TRUE 390x844 — the
// standing mobile-nav verification, productized as a tool (the s94
// corrected exact-selector protocol; exact aria-labels; a REAL user
// click; the URL-based wait — the /Leads route is the s24 CAPITAL-route
// construction and the dev server compiles it on first visit).
// Session-147 (the parity-event re-anchor): the drawer is the Radix
// Sheet now (the reference's own fix, mirrored) — the PANEL is the
// `[role="dialog"][data-state="open"]` CONTENT itself (w-72, no inner
// wrapper), the trigger label is the reference's "Open navigation", and
// the closed state is UNMOUNTED (Radix), not inert.
// Run: bun scripts/drawer-battery-390.ts
// (Session-123: the platform DATABASE_URL override is now guarded at the
// boot site — the `env -u` prefix is no longer required, though it stays
// harmless.)
// Verifies: trigger geometry · panel 288px @ x0 · 8 links · focus
// inside · dual body+main lock · navigate-close -> /Leads with the full
// release · Escape-close · the resize-past-md lock release (against a
// REOPENED drawer — the F-96a1 fix: the auto-close listener only
// registers while open).
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

// Session-121 (D-121a1, the 121-b audit's N-121b1): the REPO was a
// hardcoded absolute path ("/home/z/my-project/neo-crm") that went STALE
// the moment the workspace relocated — the spawn cwd ENOENT'd and the
// battery only ran via its reuse path. Derived from the script's own
// location now (<repo>/scripts -> <repo>), the validated-anchor idiom
// the db/uploads path modules use (fallback: the process cwd).
const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url)); // <repo>/scripts
    const root = resolve(here, "..");
    if (existsSync(join(root, "package.json"))) return root;
  } catch {
    /* fall through to the cwd */
  }
  return process.cwd();
})();
const OUR_URL = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

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

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[battery] reusing the dev server on :3000");
  } else {
    // Session-123 (F-123a1, D-123a0): the platform DATABASE_URL override
    // guarded at the boot site — the runbook's `env -u` is now the
    // script's own (the sweep's Session-93 F-A rule, extended here).
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], {
      cwd: REPO,
      env: devEnv,
      stdio: "ignore",
      detached: true,
    });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(`${OUR_URL}/login`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await Promise.all([
      page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
      page.click('button[type="submit"]'),
    ]);
    // Session-144 (D-144a0/N-144b1): the s142 route move made the
    // post-login page the PUBLIC landing `/` (its own mobile menu —
    // the disclosure pattern, no CRM drawer trigger), so the battery
    // timed out deterministically at the trigger probe. The re-anchor:
    // navigate to the CRM shell explicitly — the same re-anchor the e2e
    // crm specs got at s142 (the route-move blast-radius lesson: grep
    // every post-login expectation when a route moves, not just the
    // failing carriers).
    await page.goto(`${OUR_URL}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // 1. the trigger: exact aria-label, geometry at TRUE 390
    const trigger = page.locator('button[aria-label="Open navigation"]');
    const tBox = await trigger.boundingBox();
    console.log("[battery] trigger:", JSON.stringify(tBox));

    // 2. OPEN (a REAL user click — fires the pointer sequence)
    await trigger.click();
    await page.waitForTimeout(700);

    const openProbe = await page.evaluate(() => {
      const panel = document.querySelector('[role="dialog"][data-state="open"]') as HTMLElement | null;
      const links = panel ? Array.from(panel.querySelectorAll("a")) : [];
      const cs = panel ? getComputedStyle(panel) : null;
      const body = getComputedStyle(document.body);
      const main = document.querySelector("main");
      const mainCs = main ? getComputedStyle(main) : null;
      return {
        panelW: panel ? Math.round(panel.getBoundingClientRect().width) : null,
        panelX: panel ? Math.round(panel.getBoundingClientRect().x) : null,
        panelBg: cs ? cs.backgroundColor : null,
        panelVisible: panel ? getComputedStyle(panel).visibility : null,
        linkCount: links.length,
        linkTexts: links.slice(0, 3).map((a) => a.textContent?.trim()),
        focusInside: panel ? panel.contains(document.activeElement) : false,
        activeEl: document.activeElement?.tagName + "/" + (document.activeElement?.textContent || "").slice(0, 12),
        bodyOverflow: body.overflow,
        mainOverflow: mainCs ? mainCs.overflow : null,
        // Session-147: Radix renders NO aria-modal (the stock 1.1.23
        // behavior, the reference's own) — the census field kept for the
        // walk comparability; the closed state is UNMOUNTED (below)
        rootAriaModal: panel?.getAttribute("aria-modal"),
        rootInert: null,
      };
    });
    console.log("[battery] OPEN:", JSON.stringify(openProbe, null, 1));

    // 3. navigate-close: click the Leads link -> /Leads + full release
    await page.locator('[role="dialog"] a[href="/Leads"]').first().click();
    await page.waitForURL((u) => u.pathname.includes("Leads"), { timeout: 30000 }).catch(() => undefined);
    await page.waitForTimeout(800);
    const afterNav = await page.evaluate(() => {
      // Session-147: the closed Radix sheet UNMOUNTS — the probe is the
      // dialog count + the released locks (the s147 construction has no
      // permanently-mounted hidden root)
      const main = document.querySelector("main");
      return {
        pathname: location.pathname,
        dialogCount: document.querySelectorAll('[role="dialog"]').length,
        bodyOverflow: getComputedStyle(document.body).overflow,
        mainOverflow: main ? getComputedStyle(main).overflow : null,
      };
    });
    console.log("[battery] NAV-CLOSE:", JSON.stringify(afterNav));

    // 4. reopen + Escape-close
    await page.locator('button[aria-label="Open navigation"]').click();
    await page.waitForTimeout(600);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
    const afterEsc = await page.evaluate(() => {
      return {
        dialogCount: document.querySelectorAll('[role="dialog"]').length,
        bodyOverflow: getComputedStyle(document.body).overflow,
      };
    });
    console.log("[battery] ESC-CLOSE:", JSON.stringify(afterEsc));

    // 5. the resize-past-md lock release (the s8 regression) — F-96a1
    //    (session-96): the probe must run against an OPEN drawer. The
    //    auto-close listener (mobile-nav.tsx:54-62) only registers while
    //    the drawer is open — resizing the CLOSED drawer (the s95 shape)
    //    could never go red for an s8-class regression. Reopen, verify
    //    the locks re-engage, THEN grow past md.
    await trigger.click();
    await page.waitForTimeout(700);
    const openBeforeGrow = await page.evaluate(() => {
      const panel = document.querySelector('[role="dialog"][data-state="open"]') as HTMLElement | null;
      return {
        panelOpen: !!panel,
        bodyOverflow: getComputedStyle(document.body).overflow,
        mainOverflow: document.querySelector("main") ? getComputedStyle(document.querySelector("main")!).overflow : null,
      };
    });
    console.log("[battery] REOPEN-BEFORE-GROW:", JSON.stringify(openBeforeGrow));
    await page.setViewportSize({ width: 900, height: 800 });
    await page.waitForTimeout(600);
    const afterGrow = await page.evaluate(() => ({
      bodyOverflow: getComputedStyle(document.body).overflow,
      // OUR kept superset: the auto-close listener releases both locks
      // (the S8-P1 regression the battery was born to guard)
      mainOverflow: document.querySelector("main") ? getComputedStyle(document.querySelector("main")!).overflow : null,
      dialogCount: document.querySelectorAll('[role="dialog"]').length,
    }));
    console.log("[battery] RESIZE-PAST-MD:", JSON.stringify(afterGrow));

    await browser.close();
    console.log("[battery] done");
  } finally {
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
  console.error("[battery]", e);
  process.exit(1);
});
