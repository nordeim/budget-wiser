// Session-168 audit leg: the mobile drawer live battery at 390x844 —
// the seven-point contract (the s167 form): trigger unique · rail hidden ·
// data-state=open · 8/8 links · the MAIN-scroller lock · close-on-navigate
// + URL change · Escape + lock release. Runs against the standing dev
// server on :3000 (login first — the demo credentials).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const results: Array<[string, boolean, string]> = [];
const check = (name: string, ok: boolean, detail = "") => {
  results.push([name, ok, detail]);
  console.log(`${ok ? "PASS" : "FAIL"} — ${name}${detail ? ` (${detail})` : ""}`);
};

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  // login
  await page.goto(`${BASE}/login`);
  await page.getByRole("textbox", { name: /email/i }).fill(EMAIL);
  await page.getByRole("textbox", { name: /password/i }).fill(PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForTimeout(3000);
  await page.goto(`${BASE}/dashboard`);
  await page.waitForLoadState("networkidle");

  // 1. trigger unique
  const hamburger = page.getByRole("button", { name: "Open navigation" }).first();
  const hamburgerCount = await page.getByRole("button", { name: "Open navigation" }).count();
  check("1. trigger unique", hamburgerCount === 1, `count=${hamburgerCount}`);

  // 2. rail hidden at 390
  const rail = page.locator('aside, nav[aria-label="Sidebar"], [class*="sidebar"]').first();
  const railVisible = await rail.isVisible().catch(() => false);
  check("2. rail hidden", !railVisible);

  // open the drawer
  await hamburger.click();
  const content = page.locator('[data-state="open"][role="dialog"]');
  await content.waitFor({ state: "visible", timeout: 5000 });
  check("3. sheet opens (data-state=open)", (await content.count()) === 1);

  // 4. 8/8 links
  const links = content.locator("a[href]");
  const linkCount = await links.count();
  check("4. 8/8 links", linkCount === 8, `links=${linkCount}`);

  // 5. MAIN-scroller lock
  const mainOverflow = await page.evaluate(() => {
    const m = document.querySelector("main");
    return m ? m.style.overflow : "none";
  });
  const bodyLocked = await page.evaluate(() => document.body.dataset.scrollLocked !== undefined);
  check("5. main-scroller lock", mainOverflow === "hidden" && bodyLocked, `main=${mainOverflow} bodyLocked=${bodyLocked}`);

  // 6. close-on-navigate + URL change
  await content.locator('a[href="/Accounts"]').first().click();
  await page.waitForURL(/accounts/i, { timeout: 10000 });
  const closedAfterNav = (await page.locator('[data-state="open"][role="dialog"]').count()) === 0;
  const mainRestoredNav = await page.evaluate(() => {
    const m = document.querySelector("main");
    return m ? m.style.overflow : "none";
  });
  check("6. close-on-navigate + URL change", closedAfterNav && mainRestoredNav !== "hidden", `closed=${closedAfterNav} main=${mainRestoredNav}`);

  // 7. Escape + lock release
  await hamburger.click();
  await content.waitFor({ state: "visible", timeout: 5000 });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const closedAfterEsc = (await page.locator('[data-state="open"][role="dialog"]').count()) === 0;
  const mainRestoredEsc = await page.evaluate(() => {
    const m = document.querySelector("main");
    return m ? m.style.overflow : "none";
  });
  check("7. Escape + lock release", closedAfterEsc && mainRestoredEsc !== "hidden", `closed=${closedAfterEsc} main=${mainRestoredEsc}`);

  await browser.close();
  const fails = results.filter(([, ok]) => !ok).length;
  console.log(`\nDRAWER BATTERY: ${results.length - fails}/${results.length} PASS`);
  process.exit(fails > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
