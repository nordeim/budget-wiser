// Session-169 (WP-6): the captures 413-416 — the auth pair the secret
// gate hardens (the login + signup pages) at phone + desktop, saved
// under docs/screenshots/ per the house convention.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";
const SHOTS: Array<{ name: string; path: string; width: number; height: number }> = [
  { name: "413-login-phone.png", path: "/login", width: 390, height: 844 },
  { name: "414-login-desktop.png", path: "/login", width: 1440, height: 900 },
  { name: "415-signup-phone.png", path: "/signup", width: 390, height: 844 },
  { name: "416-signup-desktop.png", path: "/signup", width: 1440, height: 900 },
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const shot of SHOTS) {
    const ctx = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${shot.path}`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `${OUT}/${shot.name}`, fullPage: false });
    console.log(`CAPTURED ${shot.name} (${shot.width}x${shot.height})`);
    await ctx.close();
  }
  await browser.close();
  console.log("DONE 4/4");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
