// Session-188 (pre-plan micro-probe): the two open questions the
// discovery left — (1) does the reference's /leads page carry a search
// input AT ALL (the discovery's strict aria-label locator found none —
// a looser census answers whether the arm is walkable or KILLED), and
// (2) the settings tab trigger's FULL class chain on both apps (the
// discovery saw REF paint outline "3px solid rgba(10,10,10,0.5)" at
// .focus() vs OURS "3px none" — the full untruncated strings name the
// carrier rule and whether the REAL keyboard paints it too).
// Run: bun scripts/probe-leads-search-and-tab-outline.ts
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

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (!(await waitOnUrl(`${OUR_URL}/login`, 3000))) {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    const w = 1440;
    for (const [label, base] of [
      ["OURS", OUR_URL],
      ["REF ", REF_URL],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      console.log(`\n########## ${label} ##########`);

      // (1) the leads toolbar's FULL input census (loose)
      await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
      await page.waitForTimeout(2800);
      const leadsCensus = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll("main input")).map((i) => ({
          type: (i as HTMLInputElement).type,
          aria: i.getAttribute("aria-label"),
          ph: (i as HTMLInputElement).placeholder,
          cls: (i.getAttribute("class") ?? "").slice(0, 100),
        }));
        const buttons = Array.from(document.querySelectorAll("main button")).slice(0, 10).map((b) => ({
          text: (b.textContent ?? "").trim().slice(0, 36),
          aria: b.getAttribute("aria-label") ?? "(none)",
        }));
        const toolbar = document.querySelector("main form, main .sticky, main [class*='toolbar']");
        return { inputs, buttons, toolbarCls: toolbar ? (toolbar.getAttribute("class") ?? "").slice(0, 100) : null };
      });
      console.log(`  LEADS inputs (${leadsCensus.inputs.length}):`);
      for (const i of leadsCensus.inputs) console.log(`    input type=${i.type} aria="${i.aria}" ph="${i.ph}"\n      cls="${i.cls}"`);
      console.log(`  LEADS first buttons:`);
      for (const b of leadsCensus.buttons) console.log(`    button "${b.text}" aria="${b.aria}"`);

      // (2) the settings tab trigger's FULL class chain + the REAL keyboard focus
      await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
      await page.waitForTimeout(2400);
      const tabCls = await page.evaluate(() => {
        const t = document.querySelector('main [role="tablist"] [role="tab"]');
        return t ? (t.getAttribute("class") ?? "") : "(none)";
      });
      console.log(`  SETTINGS TAB#1 FULL cls="${tabCls}"`);
      // the strip's full class too
      const stripCls = await page.evaluate(() => {
        const t = document.querySelector('main [role="tablist"]');
        return t ? (t.getAttribute("class") ?? "") : "(none)";
      });
      console.log(`  SETTINGS STRIP FULL cls="${stripCls}"`);

      // The REAL keyboard drive: click the page body anchor then Tab until the
      // first tab trigger is focused — census the REAL :focus-visible face
      const tabTrigger = page.locator('main [role="tablist"] [role="tab"]').first();
      // drive the REAL keyboard from the topbar search (the first Tab stop in main
      // is the tab strip on this page — the PageHeader carries no interactive)
      await page.keyboard.press("Tab");
      await page.waitForTimeout(250);
      let focusedTag = await page.evaluate(() => `${document.activeElement?.tagName} ${document.activeElement?.getAttribute("role") ?? ""} "${(document.activeElement?.textContent ?? "").trim().slice(0, 40)}"`);
      console.log(`  REAL Tab#1 landed on: ${focusedTag}`);
      // walk up to 6 tabs to land on the strip
      for (let i = 0; i < 6; i++) {
        if (focusedTag.includes("tab")) break;
        await page.keyboard.press("Tab");
        await page.waitForTimeout(250);
        focusedTag = await page.evaluate(() => `${document.activeElement?.tagName} ${document.activeElement?.getAttribute("role") ?? ""} "${(document.activeElement?.textContent ?? "").trim().slice(0, 40)}"`);
        console.log(`  REAL Tab#${i + 2} landed on: ${focusedTag}`);
      }
      if (focusedTag.includes("tab")) {
        const realFace = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          const cs = getComputedStyle(el);
          return {
            outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
            boxShadow: cs.boxShadow,
          };
        });
        console.log(`  REAL-KEYBOARD FOCUS on the tab trigger: outline="${realFace.outline}"`);
        console.log(`    boxShadow="${realFace.boxShadow.slice(0, 260)}"`);
        // and the SECOND trigger (Defaults) — Tab once more
        await page.keyboard.press("Tab");
        await page.waitForTimeout(250);
        const secondFace = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          const cs = getComputedStyle(el);
          const t = `${el.tagName} role=${el.getAttribute("role")} "${(el.textContent ?? "").trim().slice(0, 30)}"`;
          return { t, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, boxShadow: cs.boxShadow.slice(0, 200) };
        });
        console.log(`  NEXT Tab stop: ${secondFace.t}\n    outline="${secondFace.outline}" boxShadow="${secondFace.boxShadow}"`);
      }
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
  console.error("[probe-leads-tab]", e);
  process.exit(1);
});
