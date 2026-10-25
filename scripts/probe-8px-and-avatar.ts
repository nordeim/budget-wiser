// Session-187 (micro-probe): the 8px decode — the Import Templates
// card's title→desc→content→first-button geometry chain on both apps
// (the walk60 find: titleBox byte-equal at y=274, firstBtn OURS y=340 vs
// REF y=348 — an 8px rhythm delta INSIDE the card). Plus the Account
// card avatar's construction (the D-187a2 same-family adjudication).
// Run: bun scripts/probe-8px-and-avatar.ts
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

      // Leg 1 — the Import Templates card's interior geometry chain
      await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
      await page.waitForTimeout(2400);
      const tab = page.locator('main [role="tab"]').filter({ hasText: "Data" }).first();
      await tab.click();
      await page.waitForTimeout(1200);
      const chain = await page.evaluate(() => {
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
        const boxOf = (el: Element) => {
          const r = el.getBoundingClientRect();
          return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
        };
        const title = h;
        // the desc: the direct sibling with the CSV text
        const desc = Array.from(card.querySelectorAll("div,p")).find((d) => {
          const t = (d.textContent ?? "").trim();
          return /^download CSV templates/i.test(t);
        }) ?? null;
        // the content: the parent of the first button
        const firstBtn = card.querySelector("button");
        const content = firstBtn ? firstBtn.parentElement : null;
        const secondBtn = content ? content.querySelectorAll("button")[1] : null;
        const titleCls = title.getAttribute("class") ?? "";
        const descCls = desc ? desc.getAttribute("class") ?? "" : "(not found)";
        const contentCls = content ? content.getAttribute("class") ?? "" : "(no content)";
        return {
          cardBox: boxOf(card),
          titleBox: boxOf(title),
          titleCls,
          descBox: desc ? boxOf(desc) : "(not found)",
          descCls,
          descMargin: desc ? `${getComputedStyle(desc).marginTop} / ${getComputedStyle(desc).marginBottom}` : "",
          contentBox: content ? boxOf(content) : "(no content)",
          contentCls,
          firstBtnBox: firstBtn ? boxOf(firstBtn) : "",
          secondBtnMargin: secondBtn ? `${getComputedStyle(secondBtn).marginLeft}` : "",
        };
      });
      console.log(`\n=== ${label} IMPORT TEMPLATES geometry:`);
      if (chain) {
        console.log(`  card:        ${chain.cardBox}`);
        console.log(`  title:       ${chain.titleBox}  cls="${chain.titleCls}"`);
        console.log(`  desc:        ${chain.descBox}  cls="${chain.descCls}"  margins="${chain.descMargin}"`);
        console.log(`  content:     ${chain.contentBox}  cls="${chain.contentCls}"`);
        console.log(`  firstBtn:    ${chain.firstBtnBox}`);
        console.log(`  2ndBtn ml:   ${chain.secondBtnMargin}`);
      } else {
        console.log("  card NOT FOUND");
      }

      // Leg 2 — the profile Account card avatar (the D-187a2 sibling)
      await page.goto(`${base}/profile`, { waitUntil: "domcontentloaded" });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
      await page.waitForTimeout(2400);
      const acct = await page.evaluate(() => {
        // the Account card: the card whose content has the centered avatar (mb-4)
        const av = Array.from(document.querySelectorAll("main span")).find((s) => {
          const cls = s.getAttribute("class") ?? "";
          return cls.includes("rounded-full") && cls.includes("mb-4");
        }) ?? null;
        if (!av) return null;
        const inner = av.firstElementChild;
        const svg = av.querySelector("svg");
        const boxOf = (el: Element | null) => {
          if (!el) return "";
          const r = el.getBoundingClientRect();
          return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
        };
        return {
          rootCls: av.getAttribute("class") ?? "",
          rootBox: boxOf(av),
          innerTag: inner ? inner.tagName.toLowerCase() : "(none)",
          innerCls: inner ? inner.getAttribute("class") ?? "" : "",
          svgCls: svg ? svg.getAttribute("class") ?? "" : "(no svg)",
          svgBox: boxOf(svg),
          svgColor: svg ? getComputedStyle(svg).color : "",
        };
      });
      console.log(`\n=== ${label} PROFILE ACCOUNT-CARD avatar:`);
      if (acct) {
        console.log(`  root:  ${acct.rootBox} cls="${acct.rootCls}"`);
        console.log(`  inner: <${acct.innerTag}> cls="${acct.innerCls}"`);
        console.log(`  svg:   ${acct.svgBox} cls="${acct.svgCls}" color=${acct.svgColor}`);
      } else {
        console.log("  avatar NOT FOUND");
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
  console.error("[probe-8px-and-avatar]", e);
  process.exit(1);
});
