// Session-176 (WP-5): the captures 441-444 — THE RECHARTS 3.x MIGRATION's
// own evidence faces: the dashboard (the revenue areas + the pipeline
// bars + the KPI sparks — the migrated ComposedChart/BarChart/Sparkline
// surfaces) at desktop, the reports Pipeline & Forecast tab (the aging
// grid the e2e sentinel pins + the forecast pie — the migrated
// LineChart/PieChart/LabelList surfaces) at desktop, the drawer-open
// standing contract at phone width (the mobile-nav authorization), and
// the leads surface (the funnel + the pipeline bars — the migrated
// FunnelChart) at phone width.
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
    name: "441-dashboard-recharts3-desktop.png",
    path: "/dashboard",
    width: 1440,
    height: 900,
    open: async (page) => {
      // the migrated surfaces: the ComposedChart revenue areas + the
      // SingleBarChart pipeline bars + the Sparkline area arms — the
      // 3.10.1 rendering the drift sweeps proved pixel-identical
      await page.waitForTimeout(2500);
    },
  },
  {
    name: "442-reports-aging-grid-sentinel-desktop.png",
    path: "/reports",
    width: 1440,
    height: 900,
    open: async (page) => {
      // the Pipeline & Forecast tab: the aging chart's classic grid
      // (the e2e L-138c2 sentinel's own face — the upgrade-proof) +
      // the forecast pie
      await page.getByRole("tab", { name: "Pipeline & Forecast" }).click();
      await page.waitForTimeout(2800);
    },
  },
  {
    name: "443-drawer-open-standing-contract-phone.png",
    path: "/dashboard",
    width: 390,
    height: 844,
    open: async (page) => {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.waitForTimeout(900);
    },
  },
  {
    name: "444-leads-funnel-recharts3-phone.png",
    path: "/leads",
    width: 390,
    height: 844,
    open: async (page) => {
      // the migrated FunnelChart (the s13 shape) + the leads pipeline
      // bars — the 3.10.1 rendering at phone width
      await page.waitForTimeout(2500);
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
  console.log("captures-176: done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
