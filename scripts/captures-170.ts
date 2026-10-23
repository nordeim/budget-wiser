// Session-170 (WP-8): the captures 417-420 — the error-boundary pair at
// phone + desktop. The boundaries are failure-path-only surfaces with no
// honest trigger in the committed tree (no debug affordance — the
// documented posture), so the captures ride a TEMPORARY UNCOMMITTED
// throw patch: this script navigates to a page whose client component
// has been patched to throw (the working tree carries the patch ONLY
// for the capture window — reverted immediately after; the captures are
// the evidence, the tree stays clean).
//
// The two passes (the committed record):
//   pass 1: patch src/components/layout/login-card.tsx with a
//     window-guarded throw -> bun run build -> boot the standalone on
//     :3220 -> bun scripts/captures-170.ts (417/418 — the segment pair)
//   pass 2: revert, patch src/app/layout.tsx with a NEXT_PHASE-guarded
//     throw (the static prerender stays green) -> rebuild -> re-run
//     (419/420 — the global pair)
// Both patches revert immediately; the committed tree carries no debug
// affordance (the documented posture).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3220";
const OUT = "docs/screenshots";
const SHOTS: Array<{ name: string; path: string; width: number; height: number }> = [
  { name: "417-error-boundary-phone.png", path: "/login", width: 390, height: 844 },
  { name: "418-error-boundary-desktop.png", path: "/login", width: 1440, height: 900 },
  { name: "419-global-error-phone.png", path: "/login", width: 390, height: 844 },
  { name: "420-global-error-desktop.png", path: "/login", width: 1440, height: 900 },
];

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const shot of SHOTS) {
    const ctx = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${shot.path}`, { waitUntil: "load" });
    // the boundary mounts AFTER hydration unwinds the client render
    // error — give the boundary card its settle window, then assert it
    await page.waitForTimeout(2500);
    await page.waitForSelector("text=Something went wrong", { timeout: 15_000 });
    await page.screenshot({ path: `${OUT}/${shot.name}`, fullPage: false });
    console.log(`CAPTURED ${shot.name} (${shot.width}x${shot.height})`);
    await ctx.close();
  }
  await browser.close();
  console.log("captures 417-420 done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
