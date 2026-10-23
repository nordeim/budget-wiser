// Session-173 (WP-5): the captures 429-432 — the round is SEAM-ONLY by
// design (the injectable clock + the property families touched no
// component, no page, no className); the captures document the surfaces
// the round's seams serve + the standing contracts the seam-only proof
// re-verified: the login funnel surface (the rate-limited family whose
// window arithmetic now rides the property pins), the mobile drawer
// OPEN state (the standing 7/7 contract), the dashboard parity anchor,
// and a CRUD schema surface (the Zod seam's consumer face).
// Runs against the dev server on :3000 (login first — the demo
// credentials).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";
const OUT = "docs/screenshots";

type Shot = {
  name: string;
  path: string;
  width: number;
  height: number;
  open: (page: import("@playwright/test").Page) => Promise<void>;
};

const SHOTS: Shot[] = [
  {
    name: "429-login-funnel-surface-desktop.png",
    path: "/login",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.waitForTimeout(600);
    },
  },
  {
    name: "430-drawer-open-standing-contract-phone.png",
    path: "/dashboard",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "431-dashboard-parity-anchor-desktop.png",
    path: "/dashboard",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.waitForTimeout(1200);
    },
  },
  {
    name: "432-leads-crud-schema-surface-phone.png",
    path: "/leads",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.waitForTimeout(1200);
    },
  },
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
    await page2.waitForTimeout(1800);
    await shot.open(page2);
    await page2.screenshot({ path: `${OUT}/${shot.name}`, fullPage: false });
    console.log(`CAPTURED ${shot.name} (${shot.width}x${shot.height})`);
    await ctx2.close();
  }
  await browser.close();
  console.log("CAPTURES 429-432 DONE");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
