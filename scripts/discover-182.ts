// Session-182 discovery probe (throwaway): locate the reports filter
// bar's FOUR selects on BOTH apps, dump each trigger's resting
// geometry + the OPEN listbox's option inventory (texts + data-state)
// + the mount-focus census — the calibration the walk55 locators stand
// on. Also answers the DATA-STATE question: the owner select's option
// census on both apps in their DEFAULT data states (ours seeded; the
// reference at its live zero-data).
// Run: bun scripts/discover-182.ts
import { chromium, type Page } from "@playwright/test";

import { preflightPairState } from "./sweep-state";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

async function dump(page: Page, label: string, base: string, width: number, height: number) {
  await page.setViewportSize({ width, height });
  await page.goto(`${base}/reports`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  // the four filter triggers — the aria-label superset the s9 lens
  // documented (ours); the reference's own labels decoded live.
  const triggers = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('main [role="combobox"]'));
    return els.map((el) => {
      const r = el.getBoundingClientRect();
      const parent = el.parentElement;
      const pr = parent?.getBoundingClientRect();
      return {
        ariaLabel: el.getAttribute("aria-label") ?? "(none)",
        text: (el.textContent ?? "").trim().slice(0, 30),
        expanded: el.getAttribute("aria-expanded") ?? "(none)",
        id: el.getAttribute("id") ?? "(none)",
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        parentCls: parent ? (parent.getAttribute("class") ?? "").slice(0, 60) : "",
        parentBox: pr ? `${Math.round(pr.x)},${Math.round(pr.y)} ${Math.round(pr.width)}x${Math.round(pr.height)}` : "",
      };
    });
  });
  console.log(`\n=== ${label} @${width}x${height} comboboxes: ${triggers.length}`);
  for (const t of triggers) {
    console.log(
      `  [${t.ariaLabel}] text="${t.text}" id=${t.id} box=${t.box} parent(${t.parentBox}) cls="${t.parentCls}"`,
    );
  }

  // open each select in DOM order, census the options, close
  for (let i = 0; i < triggers.length; i++) {
    // the ATTRIBUTE selector is load-bearing (the walk53 discovery:
    // getByRole("combobox") stops matching once aria-expanded flips
    // true at open).
    const combo = page.locator('main [role="combobox"]').nth(i);
    await combo.click();
    await page.waitForTimeout(700);
    const census = await page.evaluate(() => {
      const listbox = document.querySelector('[role="listbox"]');
      if (!listbox) return { options: [], active: "NO LISTBOX" };
      const opts = Array.from(listbox.querySelectorAll('[role="option"]')).map((o) => {
        const r = o.getBoundingClientRect();
        return {
          text: (o.textContent ?? "").trim().slice(0, 40),
          state: o.getAttribute("data-state") ?? "",
          highlighted: o.hasAttribute("data-highlighted"),
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        };
      });
      const lb = listbox.getBoundingClientRect();
      const ae = document.activeElement;
      return {
        options: opts,
        active: `${ae?.tagName ?? "?"}/${ae?.getAttribute("role") ?? ""}`,
        listboxBox: `${Math.round(lb.x)},${Math.round(lb.y)} ${Math.round(lb.width)}x${Math.round(lb.height)}`,
      };
    });
    console.log(`  OPEN #${i} [${triggers[i].ariaLabel}]: listbox ${census.listboxBox} · mount-focus: ${census.active}`);
    for (const o of census.options) {
      console.log(`    option "${o.text}" state=${o.state}${o.highlighted ? " HIGHLIGHTED" : ""} box=${o.box}`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    const ours = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
    await dump(await ours.newPage(), "OURS", OUR_URL, 1440, 900);
    await ours.close();
    const ref = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
    await dump(await ref.newPage(), "REF ", REF_URL, 1440, 900);
    await ref.close();
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[discover-182]", e);
  process.exit(1);
});
