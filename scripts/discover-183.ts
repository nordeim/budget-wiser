// Session-183 discovery probe (throwaway): the popover family's OPEN
// surfaces on BOTH apps — the s386 close's first-named candidate ("the
// popover family's OPEN faces under ADR-022 — the leads filter popover
// + the contacts filter panel"). Calibrates the walk56 locators:
//   Arm A — the LEADS Filters popover (a Radix Popover portal via the
//           shared Dropdown wrapper): the trigger census, the OPEN
//           content census (the w-80 panel, the 2 selects + 2 inputs
//           + the 2 footer buttons), the mount-focus, the REAL
//           keyboard Tab drive's first stops.
//   Arm B — the CONTACTS filter panel (the in-flow slide-in: fixed
//           right-0 below lg, static in-flow at lg): the trigger's
//           variant-flip, the OPEN panel census (the sticky Filters
//           header + the Clear All ghost + the 5-6 checkbox card
//           groups), the geometry at BOTH axes.
// Also answers the two-app vocabulary question on each arm (the
// field/option texts) + the reference's own construction (portal vs
// in-flow, data-side, the label/aria model).
// Run: bun scripts/discover-183.ts
import { chromium, type Page } from "@playwright/test";

import { preflightPairState } from "./sweep-state";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

interface ArmDump {
  label: string;
  base: string;
  width: number;
  height: number;
}

async function dumpLeads(page: Page, d: ArmDump) {
  await page.setViewportSize({ width: d.width, height: d.height });
  await page.goto(`${d.base}/leads`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  // the Filters trigger — ours carries the kept aria-label superset
  // ("Open lead filters", the s113 lens); the reference's own label
  // decoded live.
  const trigger = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('main button')).filter((b) =>
      (b.textContent ?? "").includes("Filters"),
    );
    return els.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        ariaLabel: el.getAttribute("aria-label") ?? "(none)",
        ariaHaspopup: el.getAttribute("aria-haspopup") ?? "(none)",
        ariaExpanded: el.getAttribute("aria-expanded") ?? "(none)",
        text: (el.textContent ?? "").trim().slice(0, 30),
        cls: (el.getAttribute("class") ?? "").slice(0, 90),
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    });
  });
  console.log(`\n=== ${d.label} LEADS @${d.width}x${d.height} Filters triggers: ${trigger.length}`);
  for (const t of trigger) {
    console.log(`  [label=${t.ariaLabel}] haspopup=${t.ariaHaspopup} expanded=${t.ariaExpanded} text="${t.text}" box=${t.box}`);
    console.log(`    cls="${t.cls}"`);
  }
  if (trigger.length === 0) return;

  // open the FIRST Filters control
  await page.locator("main button", { hasText: "Filters" }).first().click();
  await page.waitForTimeout(800);

  const census = await page.evaluate(() => {
    // the portal surface: Radix Popover content renders at body level;
    // ours carries role=dialog on the content (the Radix Popover
    // default), the reference's own construction decoded live.
    const popovers = Array.from(document.querySelectorAll('[data-radix-popper-content-wrapper]'))
      .concat(Array.from(document.querySelectorAll('[data-state="open"][role="dialog"]')))
      .concat(Array.from(document.querySelectorAll('[data-side]')));
    const seen = new Set<Element>();
    const panels: Array<Record<string, unknown>> = [];
    for (const p of popovers) {
      if (seen.has(p)) continue;
      seen.add(p);
      const r = p.getBoundingClientRect();
      panels.push({
        tag: p.tagName.toLowerCase(),
        role: p.getAttribute("role") ?? "(none)",
        dataSide: p.getAttribute("data-side") ?? "(none)",
        cls: (p.getAttribute("class") ?? "").slice(0, 100),
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      });
    }
    const ae = document.activeElement;
    const selects = Array.from(document.querySelectorAll('[data-state="open"] [role="combobox"], [role="dialog"] [role="combobox"]')).map((el) => ({
      label: el.getAttribute("aria-label") ?? "(none)",
      text: (el.textContent ?? "").trim().slice(0, 20),
    }));
    const inputs = Array.from(document.querySelectorAll('[data-state="open"] input, [role="dialog"] input')).map((el) => ({
      type: el.getAttribute("type") ?? "(none)",
      label: el.getAttribute("aria-label") ?? "(none)",
      placeholder: el.getAttribute("placeholder") ?? "(none)",
    }));
    const labels = Array.from(document.querySelectorAll('[data-state="open"] label, [role="dialog"] label')).map((el) => (el.textContent ?? "").trim());
    const buttons = Array.from(document.querySelectorAll('[data-state="open"] button, [role="dialog"] button')).map((el) => ({
      text: (el.textContent ?? "").trim().slice(0, 20),
      cls: (el.getAttribute("class") ?? "").slice(0, 80),
    }));
    return {
      panels,
      active: `${ae?.tagName ?? "?"}/${ae?.getAttribute("role") ?? ""}/cls=${(ae?.getAttribute("class") ?? "").slice(0, 40)}`,
      selects,
      inputs,
      labels,
      buttons,
    };
  });
  console.log(`  OPEN panels: ${census.panels.length}`);
  for (const p of census.panels) console.log(`    ${JSON.stringify(p)}`);
  console.log(`  mount-focus: ${census.active}`);
  console.log(`  labels: [${census.labels.join(" | ")}]`);
  console.log(`  selects: ${JSON.stringify(census.selects)}`);
  console.log(`  inputs: ${JSON.stringify(census.inputs)}`);
  console.log(`  buttons: ${JSON.stringify(census.buttons)}`);

  // the REAL keyboard drive: Tab from the mount focus
  await page.keyboard.press("Tab");
  await page.waitForTimeout(300);
  const tab1 = await page.evaluate(() => {
    const ae = document.activeElement;
    return `${ae?.tagName ?? "?"}/${(ae?.textContent ?? "").trim().slice(0, 25)}/label=${ae?.getAttribute("aria-label") ?? "(none)"}`;
  });
  console.log(`  after 1st Tab: ${tab1}`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const closed = await page.evaluate(() => document.querySelectorAll('[data-state="open"][role="dialog"]').length);
  console.log(`  Escape closed: openPanels=${closed}`);
}

async function dumpContacts(page: Page, d: ArmDump) {
  await page.setViewportSize({ width: d.width, height: d.height });
  await page.goto(`${d.base}/contacts`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const trigger = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('main button')).filter((b) =>
      (b.textContent ?? "").includes("Filters"),
    );
    return els.map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        ariaLabel: el.getAttribute("aria-label") ?? "(none)",
        ariaExpanded: el.getAttribute("aria-expanded") ?? "(none)",
        text: (el.textContent ?? "").trim().slice(0, 25),
        cls: (el.getAttribute("class") ?? "").slice(0, 90),
        bg: cs.backgroundColor,
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    });
  });
  console.log(`\n=== ${d.label} CONTACTS @${d.width}x${d.height} Filters triggers: ${trigger.length}`);
  for (const t of trigger) {
    console.log(`  [label=${t.ariaLabel}] expanded=${t.ariaExpanded} text="${t.text}" bg=${t.bg} box=${t.box}`);
    console.log(`    cls="${t.cls}"`);
  }
  if (trigger.length === 0) return;

  // open the panel
  await page.locator("main button", { hasText: "Filters" }).first().click();
  await page.waitForTimeout(800);

  const census = await page.evaluate(() => {
    // the in-flow panel arm: ours is the `fixed right-0 top-16` w-80
    // slide-in (phone) / the lg:static in-flow rail; the reference's
    // own construction decoded live. Locate by the Filters h3 header
    // the s75 bundle decode documented.
    const headers = Array.from(document.querySelectorAll("h3")).filter((h) => (h.textContent ?? "").trim() === "Filters");
    const panels: Array<Record<string, unknown>> = [];
    for (const h of headers) {
      let panel: Element = h;
      for (let i = 0; i < 6 && panel.parentElement; i++) panel = panel.parentElement;
      const r = panel.getBoundingClientRect();
      panels.push({
        tag: panel.tagName.toLowerCase(),
        cls: (panel.getAttribute("class") ?? "").slice(0, 110),
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        position: getComputedStyle(panel).position,
      });
    }
    const cardTitles = Array.from(document.querySelectorAll("h3")).map((h) => (h.textContent ?? "").trim()).slice(0, 12);
    const checkboxes = Array.from(document.querySelectorAll('main button[role="checkbox"], main input[type="checkbox"]')).map((el) => ({
      role: el.getAttribute("role") ?? el.tagName.toLowerCase(),
      checked: el.getAttribute("aria-checked") ?? el.getAttribute("data-state") ?? (el as HTMLInputElement).checked,
      id: el.getAttribute("id") ?? "(none)",
    }));
    const clearAll = Array.from(document.querySelectorAll("main button")).find((b) => (b.textContent ?? "").trim() === "Clear All");
    const ae = document.activeElement;
    return {
      panels,
      cardTitles,
      checkboxCount: checkboxes.length,
      checkboxSample: checkboxes.slice(0, 3),
      clearAll: clearAll
        ? {
            cls: (clearAll.getAttribute("class") ?? "").slice(0, 80),
            box: `${Math.round(clearAll.getBoundingClientRect().x)},${Math.round(clearAll.getBoundingClientRect().y)} ${Math.round(clearAll.getBoundingClientRect().width)}x${Math.round(clearAll.getBoundingClientRect().height)}`,
          }
        : null,
      active: `${ae?.tagName ?? "?"}/${(ae?.textContent ?? "").trim().slice(0, 20)}`,
    };
  });
  console.log(`  OPEN panels: ${census.panels.length}`);
  for (const p of census.panels) console.log(`    ${JSON.stringify(p)}`);
  console.log(`  card h3s: [${census.cardTitles.join(" | ")}]`);
  console.log(`  checkboxes: ${census.checkboxCount} sample=${JSON.stringify(census.checkboxSample)}`);
  console.log(`  Clear All: ${JSON.stringify(census.clearAll)}`);
  console.log(`  mount-focus: ${census.active}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-183] pair state: ready (the s162 guarded form)");
    for (const [w, h] of [
      [1440, 900],
      [390, 844],
    ] as const) {
      for (const [label, base] of [
        ["OURS", OUR_URL],
        ["REF ", REF_URL],
      ] as const) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, storageState: state });
        const page = await ctx.newPage();
        const d: ArmDump = { label, base, width: w, height: h };
        await dumpLeads(page, d).catch((e) => console.log(`  [leads ${label}@${w}] ERROR: ${e}`));
        await dumpContacts(page, d).catch((e) => console.log(`  [contacts ${label}@${w}] ERROR: ${e}`));
        await ctx.close();
      }
    }
  } finally {
    await browser.close().catch(() => undefined);
  }
}

main().catch((e) => {
  console.error("[discover-183]", e);
  process.exit(1);
});
