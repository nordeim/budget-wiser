// Session-175 (WP-5): the captures 437-440 — the round is TEST-ONLY by
// design (the response-side wire-contract family touched no product
// code: no component, no page, no className, no route, no config); the
// captures document the standing surfaces + this round's own evidence
// faces: the dashboard parity anchor (desktop), the contacts surface
// (the INCLUDE-RICH wire's own face — the joined account/owner columns
// the P-r round-trip family + the include source pins freeze), the
// drawer-open standing contract at phone width (the mobile-nav
// authorization), and the leads surface at phone width.
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
    name: "437-dashboard-parity-anchor-desktop.png",
    path: "/dashboard",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.waitForTimeout(1200);
    },
  },
  {
    name: "438-contacts-surface-desktop.png",
    path: "/contacts",
    width: 1440,
    height: 900,
    open: async (page) => {
      // the include-rich wire's own face: the table's Company column
      // renders the joined account name (the include select set the
      // source pins freeze; the P-r round-trip family's joined shape)
      await page.waitForTimeout(1200);
    },
  },
  {
    name: "439-drawer-open-standing-contract-phone.png",
    path: "/dashboard",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "440-leads-surface-phone.png",
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
  console.log("CAPTURES 437-440 DONE");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
