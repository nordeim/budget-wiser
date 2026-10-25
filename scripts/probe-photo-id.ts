// Session-187 (pre-plan micro-probe): does the reference's "Profile
// Picture" Label wire htmlFor="photo-upload" (a BEHAVIORAL find — the
// label click would open the file picker) or is the id inert (a
// construction-id find)? One leg, both apps, the decisive question
// the plan needs before WP-1.
// Run: bun scripts/probe-photo-id.ts
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
      await page.goto(`${base}/profile`, { waitUntil: "domcontentloaded" });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
      await page.waitForTimeout(2400);
      const census = await page.evaluate(() => {
        const file = document.querySelector('main input[type="file"]') as HTMLInputElement | null;
        const labels = Array.from(document.querySelectorAll("main label")).map((l) => ({
          text: (l.textContent ?? "").trim(),
          htmlFor: l.getAttribute("for"),
          cls: (l.getAttribute("class") ?? "").slice(0, 80),
        }));
        // does the label wrap or reference the file input?
        let labelWraps = false;
        if (file) {
          const lbl = Array.from(document.querySelectorAll("main label")).find(
            (l) => (l.textContent ?? "").trim() === "Profile Picture",
          );
          labelWraps = lbl ? lbl.contains(file) : false;
        }
        return {
          fileId: file ? file.id : null,
          labels,
          labelWraps,
        };
      });
      console.log(`\n=== ${label} /profile:`);
      console.log(`  file input id="${census.fileId}" labelWraps=${census.labelWraps}`);
      for (const l of census.labels) console.log(`  label "${l.text}" htmlFor="${l.htmlFor}"`);
      // the Upload button's svg icon census (the Camera glyph)
      const btn = page.locator("main button").filter({ hasText: "Upload Photo" }).first();
      const glyph = await btn.evaluate((b) => {
        const svg = b.querySelector("svg");
        return svg
          ? {
              cls: svg.getAttribute("class") ?? "",
              paths: svg.querySelectorAll("path").length,
              firstPath: (svg.querySelector("path")?.getAttribute("d") ?? "").slice(0, 40),
            }
          : null;
      }).catch(() => null);
      console.log(`  upload svg: cls="${glyph?.cls}" paths=${glyph?.paths} d="${glyph?.firstPath}"`);
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
  console.error("[probe-photo-id]", e);
  process.exit(1);
});
