// Session-187 (micro-probe 2): the deep interior DFS of the Import
// Templates card — every element from the card root to the first
// button, tag+cls+box+computed paddings/line-height — to find exactly
// where the 8px first-button offset is born (both content boxes are
// byte-equal at 289,340 1118x68, yet REF's button sits at y=348).
// Run: bun scripts/probe-import-dfs.ts
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
    /* fall through */
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
      /* not up */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (!(await waitOnUrl(`${OUR_URL}/login`, 3000))) {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    for (const [label, base] of [
      ["OURS", OUR_URL],
      ["REF ", REF_URL],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
      await page.waitForTimeout(2400);
      const tab = page.locator('main [role="tab"]').filter({ hasText: "Data" }).first();
      await tab.click();
      await page.waitForTimeout(1200);
      const dfs = await page.evaluate(() => {
        const h = Array.from(document.querySelectorAll("main div")).find(
          (el) => (el.textContent ?? "").trim() === "Import Templates" &&
            !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Import Templates")),
        );
        if (!h) return null;
        let card = h;
        for (let i = 0; i < 10; i++) {
          const p = card.parentElement;
          if (!p) break;
          const cs = getComputedStyle(p);
          if (cs.borderStyle !== "none" && cs.borderRadius !== "0px" && p.querySelector("button")) { card = p; break; }
          card = p;
        }
        const rows: Array<{ depth: number; tag: string; cls: string; box: string; pad: string; mgn: string; lh: string; fs: string; display: string; text: string }> = [];
        const collect = (el: Element, depth: number) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          rows.push({
            depth,
            tag: el.tagName.toLowerCase(),
            cls: (el.getAttribute("class") ?? "").slice(0, 70),
            box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
            pad: `${cs.paddingTop}/${cs.paddingBottom}`,
            mgn: `${cs.marginTop}/${cs.marginBottom}`,
            lh: cs.lineHeight,
            fs: cs.fontSize,
            display: cs.display,
            text: Array.from(el.childNodes).filter((n: ChildNode) => n.nodeType === 3).map((n: ChildNode) => (n.textContent ?? "").trim()).join("").slice(0, 20),
          });
          for (const child of Array.from(el.children)) collect(child, depth + 1);
        };
        collect(card, 0);
        return rows;
      });
      console.log(`\n=== ${label} IMPORT CARD DFS:`);
      if (dfs) {
        for (const row of dfs) {
          console.log(`  d${row.depth} <${row.tag}> "${row.text}" box=${row.box} pad=${row.pad} mgn=${row.mgn} lh=${row.lh} fs=${row.fs} disp=${row.display}\n     cls="${row.cls}"`);
        }
      }
      await ctx.close();
    }
  } finally {
    await browser.close().catch(() => undefined);
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* gone */
      }
    }
  }
}

main().catch((e) => {
  console.error("[probe-import-dfs]", e);
  process.exit(1);
});
