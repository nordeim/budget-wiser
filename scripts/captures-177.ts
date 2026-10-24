// Session-177 (WP-6): the captures 443-reanchor + 445-448 — THE DRAWER
// INTERIOR RE-WALK's own evidence faces: the drawer-open standing
// contract RE-ANCHORED at the post-cure spine (the 443 lineage — the
// walk50 mb-0 cure moved the header rhythm 88→80px, every nav link and
// the footer group up 8px; the standing contract face re-captured), the
// reference's own drawer-open face (the walk's parity counterpart —
// both apps' drawers side-by-side evidence), the header wordmark detail
// (the mb-0 cure's own face), and the drawer-open at a second route
// (the active-link bg-white/20 family at /Leads).
// Runs against the dev server on :3000 (login first — the demo
// credentials); the reference rides the sweep-state pair.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

import { preflightPairState } from "./sweep-state";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const state = await preflightPairState(browser);

  // OUR faces — the drawer-open evidence set
  const ours: Array<{
    name: string;
    path: string;
    open: (page: import("@playwright/test").Page) => Promise<void>;
  }> = [
    {
      name: "443-drawer-open-standing-contract-phone.png", // RE-ANCHORED (the 8px cure)
      path: "/dashboard",
      open: async (page) => {
        await page.getByRole("button", { name: "Open navigation" }).click();
        await page.waitForTimeout(900);
      },
    },
    {
      name: "447-drawer-header-wordmark-detail-phone.png",
      path: "/dashboard",
      open: async (page) => {
        await page.getByRole("button", { name: "Open navigation" }).click();
        await page.waitForTimeout(900);
        // the header rhythm's own face: the clip to the sheet's top —
        // the wordmark at the reference's 24+32+24 = 80px rhythm (the
        // sheet is fixed at x=0,y=0 — the page-level clip crops it)
        await page.screenshot({
          path: `${OUT}/447-drawer-header-wordmark-detail-phone.png`,
          clip: { x: 0, y: 0, width: 288, height: 176 },
        });
      },
    },
    {
      name: "448-drawer-open-leads-active-phone.png",
      path: "/leads",
      open: async (page) => {
        await page.getByRole("button", { name: "Open navigation" }).click();
        await page.waitForTimeout(900);
      },
    },
  ];

  for (const shot of ours) {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      storageState: state,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${shot.path}`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
    await page.waitForTimeout(1800);
    await shot.open(page);
    if (shot.name !== "447-drawer-header-wordmark-detail-phone.png") {
      await page.screenshot({ path: `${OUT}/${shot.name}`, fullPage: false });
    }
    console.log(`CAPTURED ${shot.name} (390x844, ours)`);
    await ctx.close();
  }

  // THE REFERENCE's own drawer-open — the walk's parity counterpart
  const ctxR = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: state,
  });
  const pageR = await ctxR.newPage();
  await pageR.goto("https://neo-crm-8ab2c17c.base44.app/Dashboard", {
    waitUntil: "domcontentloaded",
  });
  await pageR.locator("main").first().waitFor({ state: "visible", timeout: 15000 }).catch(() => undefined);
  await pageR.waitForTimeout(2500);
  // the sweep's own badge closer (it overlays the bottom-right — the
  // sweep.ts closeBadge form)
  await pageR
    .locator('button[aria-label*="close badge" i]')
    .click({ timeout: 2000 })
    .catch(() => undefined);
  await pageR.waitForTimeout(300);
  await pageR.getByRole("button", { name: "Open navigation" }).click();
  await pageR.waitForTimeout(900);
  await pageR.screenshot({
    path: `${OUT}/446-drawer-interior-ref-parity-phone.png`,
    fullPage: false,
  });
  console.log("CAPTURED 446-drawer-interior-ref-parity-phone.png (390x844, REFERENCE)");
  await ctxR.close();

  await browser.close();
  console.log("captures-177: done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
