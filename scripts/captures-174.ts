// Session-174 (WP-5): the captures 433-436 — the round is CONFIG-ONLY by
// design (the type-gate hardening + the full-strict flip + the single
// lockfile touched no component, no page, no className); the captures
// document the standing surfaces under the hardened build + this round's
// own evidence faces: the profile surface (the sweep's drift-gate face —
// the pristine demo user mirrors the reference's own profile page; the
// environmental lesson live-caught this round: the e2e-db residue
// false-positive, cured by the standing dev-db posture), the dashboard
// parity anchor, the mobile drawer OPEN state (the standing 7/7
// contract), and a CRUD surface at phone width.
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
    name: "433-profile-surface-desktop.png",
    path: "/profile",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.waitForTimeout(1200);
    },
  },
  {
    name: "434-dashboard-parity-anchor-desktop.png",
    path: "/dashboard",
    width: 1440,
    height: 900,
    open: async (page) => {
      await page.waitForTimeout(1200);
    },
  },
  {
    name: "435-drawer-open-standing-contract-phone.png",
    path: "/dashboard",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "436-accounts-surface-phone.png",
    path: "/accounts",
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
  console.log("CAPTURES 433-436 DONE");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
