// Session-172 (WP-6): the captures 425-428 — the round's remediated
// dialog surfaces at desktop + phone (the named-control + htmlFor
// wiring family is attribute-only BY DESIGN — zero visual delta; the
// captures document the OPEN dialog states where the labels landed:
// the Lead create dialog with its named Status/Source pair, the Event
// create dialog with its named trio, the contact Edit dialog with its
// htmlFor-wired fields, and the activities Log Call dialog with its
// named Activity Type/Related To pair). Runs against the dev server on
// :3000 (login first — the demo credentials).
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
    name: "425-lead-dialog-named-selects-desktop.png",
    path: "/leads",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.getByRole("button", { name: "New Lead" }).click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "426-lead-dialog-named-selects-phone.png",
    path: "/leads",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.getByRole("button", { name: "New Lead" }).click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "427-contact-edit-dialog-wired-fields-desktop.png",
    path: "/contacts",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.locator("table tbody button[aria-haspopup='menu']").first().click();
      await page.waitForTimeout(700);
      await page.getByRole("menuitem", { name: /^edit/i }).first().click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "428-activity-dialog-named-selects-phone.png",
    path: "/activities",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.getByRole("button", { name: "Log Call" }).first().click();
      await page.waitForTimeout(900);
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
  console.log("CAPTURES 425-428 DONE");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
