// Session-181 discovery probe (throwaway): locate the New Lead trigger
// on BOTH apps' /leads, open the dialog, and dump the OPEN dialog's
// focusable inventory (buttons/inputs/comboboxes in DOM order) + the
// mount-focus state — the calibration the walk54 locators stand on.
// Run: bun scripts/discover-181.ts
import { chromium } from "@playwright/test";

import { preflightPairState } from "./sweep-state";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

interface FocusableRow {
  tag: string;
  id: string;
  aria: string;
  text: string;
  type: string;
  tabindex: string;
  box: string;
}

async function dump(page: import("@playwright/test").Page, label: string, base: string) {
  await page.goto(`${base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  // the trigger: the "New Lead" button (both apps carry the Plus + text)
  const trigger = page.getByRole("button", { name: "New Lead" });
  const trigCount = await trigger.count();
  const trigBox = trigCount ? await trigger.first().boundingBox() : null;
  console.log(`\n=== ${label} /leads New Lead trigger: count=${trigCount} box=${trigBox ? `${Math.round(trigBox.x)},${Math.round(trigBox.y)} ${Math.round(trigBox.width)}x${Math.round(trigBox.height)}` : "none"}`);

  if (!trigCount) return;
  await trigger.first().click();
  await page.waitForTimeout(900); // the 200ms enter animation + settle

  // the OPEN dialog (the D-112a4 rule: key on data-state="open")
  const dialogSel = '[role="dialog"][data-state="open"]';
  const dialogCount = await page.locator(dialogSel).count();
  console.log(`=== ${label} OPEN dialog count: ${dialogCount}`);

  // the focusable inventory in DOM order
  const rows = await page.evaluate((sel: string): FocusableRow[] => {
    const root = document.querySelector(sel);
    if (!root) return [];
    const out: FocusableRow[] = [];
    const focusable = root.querySelectorAll<HTMLElement>(
      "button, input, textarea, select, [role='combobox'], a[href], [tabindex]:not([tabindex='-1'])",
    );
    for (const el of Array.from(focusable)) {
      const r = el.getBoundingClientRect();
      out.push({
        tag: el.tagName.toLowerCase(),
        id: el.getAttribute("id") ?? "",
        aria: el.getAttribute("aria-label") ?? "",
        text: (el.textContent ?? "").trim().slice(0, 30),
        type: el.getAttribute("type") ?? "",
        tabindex: el.getAttribute("tabindex") ?? "",
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      });
    }
    return out;
  }, dialogSel);
  console.log(`=== ${label} focusable inventory (${rows.length}):`);
  rows.forEach((r, i) => console.log(`  [${i}] ${r.tag} id=${r.id} aria="${r.aria}" text="${r.text}" type=${r.type} tabindex=${r.tabindex} @${r.box}`));

  // the mount-focus state
  const active = await page.evaluate(() => {
    const el = document.activeElement;
    return `${el?.tagName ?? "?"}/id=${el?.getAttribute("id") ?? ""}/cls=${(el?.getAttribute("class") ?? "").slice(0, 60)}`;
  });
  console.log(`=== ${label} mount-focus: ${active}`);

  // the focus-visible state of the mount-focused element (the
  // programmatic-focus question: does Radix's mount focus() paint the
  // ring?)
  const ringFace = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      matchesFocusVisible: el.matches(":focus-visible"),
      boxShadow: cs.boxShadow,
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
    };
  });
  console.log(`=== ${label} mount-focus face: ${JSON.stringify(ringFace)}`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-181] pair state: ready");
    const ours = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
    await dump(await ours.newPage(), "OURS", OUR_URL);
    await ours.close();
    const ref = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
    await dump(await ref.newPage(), "REF ", REF_URL);
    await ref.close();
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[discover-181]", e);
  process.exit(1);
});
