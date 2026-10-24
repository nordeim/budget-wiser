// Session-180 discovery probe (throwaway): locate the account-menu
// trigger + the settings Defaults "Default Lead Stage" select on BOTH
// apps, at 1440x900, and dump the candidate structures the walk will
// target. Run: bun scripts/discover-180.ts
import { chromium } from "@playwright/test";
import { preflightPairState } from "./sweep-state";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

async function dumpTopbarButtons(page: import("@playwright/test").Page, label: string) {
  const rows = await page.evaluate(() => {
    const out: Array<Record<string, string>> = [];
    // the header is the topbar on both apps
    const header = document.querySelector("header");
    if (!header) return out;
    for (const btn of Array.from(header.querySelectorAll("button"))) {
      const r = btn.getBoundingClientRect();
      const text = (btn.textContent ?? "").trim().slice(0, 40);
      out.push({
        aria: btn.getAttribute("aria-label") ?? "",
        ariaHasPopup: btn.getAttribute("aria-haspopup") ?? "",
        text,
        cls: (btn.getAttribute("class") ?? "").slice(0, 90),
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      });
    }
    return out;
  });
  console.log(`\n=== ${label} header buttons (${rows.length}) ===`);
  for (const r of rows) console.log(JSON.stringify(r));
}

async function dumpSelectLabels(page: import("@playwright/test").Page, label: string) {
  // go to settings, open the Defaults tab
  await page.goto(`${page.url().includes("3000") ? OUR_URL : REF_URL}/settings`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(2500);
  const tabs = page.getByRole("tab");
  const count = await tabs.count();
  const names: string[] = [];
  for (let i = 0; i < count; i++) names.push((await tabs.nth(i).textContent()) ?? "");
  console.log(`\n=== ${label} settings tabs: ${JSON.stringify(names)}`);
  const defaultsTab = page.getByRole("tab", { name: "Defaults" });
  await defaultsTab.click();
  await page.waitForTimeout(800);
  const rows = await page.evaluate(() => {
    const out: Array<Record<string, string>> = [];
    for (const sel of Array.from(document.querySelectorAll("[role='combobox'], button[role='combobox']"))) {
      const r = sel.getBoundingClientRect();
      out.push({
        id: sel.id,
        ariaLabel: sel.getAttribute("aria-label") ?? "",
        text: (sel.textContent ?? "").trim().slice(0, 30),
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      });
    }
    return out;
  });
  console.log(`=== ${label} Defaults comboboxes (${rows.length}) ===`);
  for (const r of rows) console.log(JSON.stringify(r));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    // OURS
    const ourCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const ourPage = await ourCtx.newPage();
    await ourPage.goto(`${OUR_URL}/Dashboard`, { waitUntil: "domcontentloaded" });
    await ourPage.waitForTimeout(2500);
    await dumpTopbarButtons(ourPage, "OURS");
    await dumpSelectLabels(ourPage, "OURS");
    await ourCtx.close();

    // REF
    const refCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      storageState: state,
    });
    const refPage = await refCtx.newPage();
    await refPage.goto(`${REF_URL}/Dashboard`, { waitUntil: "domcontentloaded" });
    await refPage.waitForTimeout(3000);
    await dumpTopbarButtons(refPage, "REF");
    await dumpSelectLabels(refPage, "REF");
    await refCtx.close();
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[discover-180]", e);
  process.exit(1);
});
