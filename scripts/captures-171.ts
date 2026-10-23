// Session-171 (WP-6): the captures 421-424 — the round's remediated
// surfaces at phone + desktop (the named-control family is
// attribute-only BY DESIGN — zero visual delta; the captures document
// the standing surfaces where the aria-labels landed: the contacts rows
// with their per-row Role selects, the activities filter rail with its
// labelled Owner/Status selects, the reports filter card, and the
// dashboard's Follow-up checkbox families + the named Filter button).
// Runs against the dev server on :3000 (login first — the demo
// credentials).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";
const OUT = "docs/screenshots";
const SHOTS: Array<{ name: string; path: string; width: number; height: number }> = [
  { name: "421-contacts-named-role-selects-phone.png", path: "/contacts", width: 390, height: 844 },
  { name: "422-contacts-named-role-selects-desktop.png", path: "/contacts", width: 1440, height: 900 },
  { name: "423-activities-named-filter-selects-phone.png", path: "/activities", width: 390, height: 844 },
  { name: "424-reports-named-filter-selects-desktop.png", path: "/reports", width: 1440, height: 900 },
];

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/login`);
  await page.getByRole("textbox", { name: /email/i }).fill(EMAIL);
  await page.getByRole("textbox", { name: /password/i }).fill(PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForTimeout(3000);
  const cookies = await ctx.cookies();
  await ctx.close();

  for (const shot of SHOTS) {
    const ctx2 = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
    });
    await ctx2.addCookies(cookies);
    const page2 = await ctx2.newPage();
    await page2.goto(`${BASE}${shot.path}`);
    await page2.waitForLoadState("networkidle").catch(() => {});
    await page2.waitForTimeout(2000);
    await page2.screenshot({ path: `${OUT}/${shot.name}`, fullPage: false });
    console.log(`CAPTURED ${shot.name} (${shot.width}x${shot.height})`);
    await ctx2.close();
  }
  await browser.close();
  console.log("captures 421-424 done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
