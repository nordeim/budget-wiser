// ---------------------------------------------------------------------------
// scripts/fullpage-sweep.ts — the FULL-PAGE landing drift gate (the FIFTH gate)
//
// Session-149 (F-149c3, walk39): the four viewport sweeps structurally
// clip at their capture height (y≈900) — the landing's below-the-fold
// sections (preview rows · pricing · FAQ · footer) had NEVER been
// pixel-compared end-to-end, and three real decodes (the repriced tiers,
// the Advanced card's sixth feature, the preview rows' ≥sm leading)
// accumulated invisible since s142. The owner's full-page-screenshot
// skill (skills/full-page-screenshot/SKILL.md, committed with the
// 1920×4986 neo-crm-homepage.png reference run) closed the axis as a
// one-off walk; this tool promotes it into a STANDING gate.
//
// The doctrine (the drift-probe at s101, the sweep classes at s96–s99):
//   • GUEST contexts — the landing is the public marketing surface; NO
//     login, NO storageState. The reference's "Edit with Base 44" pill
//     renders ONLY for guests (the logged-in sweeps measured landing
//     0.00 through s146–s148; the L-149c2 lesson) — it is documented
//     as a STANDING GENUS in STANDING_EXPLAINED, absorbed by the
//     baselines, never mirrored.
//   • The capture follows the skill's phases: viewport-before-navigation,
//     load-gate (networkidle), the lazy-content scroll pass, the
//     return-to-top settle, then the fullPage shot.
//   • The diff is the browser twin of sweep.ts's PURE diffPixels seam
//     (tol = TOLERANCE 12, a pixel differs when ANY channel diverges
//     by more than tol — the same cross-reference diffPixels carries;
//     the no-bundling doctrine). The pair pads to the max height via
//     the canvas twin of the PURE padTo seam (opaque white rows — the
//     height delta itself is part of the drift signal).
//   • --fail-on-drift exits 1 when any class exceeds its baseline by
//     more than FULLPAGE_MARGIN (the sweep's standing 0.5pct margin).
//
// Run: bun run sweep:fullpage [--fail-on-drift] [--json]
//      [--width W --height H]  (a single-class override, the sweep's arg)
// ---------------------------------------------------------------------------

import { chromium } from "@playwright/test";

const REF = "https://neo-crm-8ab2c17c.base44.app";
const OURS = "http://localhost:3000";

/** The standing classes — the full-page axis at the md-grid layout and
 *  the stacked phone layout (the two layouts the walk39 decode used). */
export const FULLPAGE_CLASSES = [
  { width: 1920, height: 1080, label: "desktop" },
  { width: 390, height: 844, label: "phone" },
] as const;

/** The landing full-page diff floor post-s149: the GUEST platform pill
 *  (desktop ~0.09 · phone ~0.31 — the pill's share of the taller phone
 *  frame) + the raster floor. Anchored from the walk39 post-fix maiden
 *  run; a real below-the-fold drift (this round's pre-fix values:
 *  0.901 desktop · 2.455 phone) clears the margin easily. */
export const STANDING_FULLPAGE_BASELINES: Record<string, number> = {
  desktop: 0.14,
  phone: 0.49,
};

/** The standing genera the baselines absorb (never for mirroring). */
export const STANDING_EXPLAINED: Record<string, string> = {
  desktop: "the guest 'Edit with Base 44' platform pill (~0.09, bottom-right fixed chrome — logged-in captures never see it) + the raster floor",
  phone: "the guest 'Edit with Base 44' platform pill (~0.31 — the pill's share of the taller phone frame) + the raster floor",
};

/** The sweep's standing drift margin (pct over the baseline). */
export const FULLPAGE_MARGIN = 0.5;

/** The sweep's pixel tolerance (diffPixels semantics). */
const TOLERANCE = 12;

/** The verdict seam: over the line ONLY when strictly past
 *  baseline + margin (the boundary itself is clean, the sweep's rule). */
export function failOnDrift(baseline: number, pct: number, margin: number): boolean {
  return pct > baseline + margin;
}

/** The PURE pad seam: white-pad an RGBA buffer (w×h) to targetH rows —
 *  opaque white rows (255,255,255,255) appended BELOW. The browser twin
 *  does the same via canvas fill + drawImage. Refuses to shrink (the
 *  undersize doctrine — the buffer already holds h rows). */
export function padTo(
  buf: Uint8ClampedArray,
  w: number,
  h: number,
  targetH: number,
): Uint8ClampedArray {
  if (targetH < h) {
    throw new Error(`padTo: target ${targetH} < h ${h} (refuses to shrink)`);
  }
  if (targetH === h) return buf;
  const out = new Uint8ClampedArray(w * targetH * 4);
  for (let i = 0; i < out.length; i += 4) {
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = 255;
  }
  out.set(buf.subarray(0, w * h * 4));
  return out;
}

// -- the capture (the skill's phases) ---------------------------------------

async function captureLanding(
  page: import("@playwright/test").Page,
  base: string,
  width: number,
  height: number,
): Promise<{ png: Buffer; scrollH: number }> {
  // phase 0–3: the viewport exists BEFORE navigation
  await page.setViewportSize({ width, height });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(2800);
  // phase 5: the lazy-content scroll pass (bottom, then back to top)
  const scrollH = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1100);
  // phase 7: the capture
  const png = await page.screenshot({ fullPage: true });
  return { png, scrollH };
}

/** The browser twin: decode both PNGs, white-pad to the max frame (the
 *  canvas twin of the PURE padTo seam), then the tol-12 diff loop —
 *  the same seam as sweep.ts's diffPixels, inlined for the browser (the
 *  no-bundling doctrine; the pure seam is what the unit pins exercise). */
async function diffPair(
  page: import("@playwright/test").Page,
  refPng: Buffer,
  ourPng: Buffer,
): Promise<{ pct: number; diffPx: number; w: number; h: number }> {
  const a = `data:image/png;base64,${refPng.toString("base64")}`;
  const b = `data:image/png;base64,${ourPng.toString("base64")}`;
  return page.evaluate(
    async ({ a, b, tol }) => {
      const load = (src: string) =>
        new Promise<HTMLImageElement>((res, rej) => {
          const img = new Image();
          img.onload = () => res(img);
          img.onerror = () => rej(new Error("png decode failed"));
          img.src = src;
        });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      // the pad frame: the max of the pair (the height delta itself is
      // part of the drift signal — the canvas twin of padTo)
      const w = Math.max(ia.width, ib.width);
      const h = Math.max(ia.height, ib.height);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      const px = (img: HTMLImageElement) => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h); // padTo: opaque white rows
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, w, h).data;
      };
      const da = px(ia);
      const db = px(ib);
      // the diffPixels seam (sweep.ts, TOLERANCE 12) — inlined twin
      const total = w * h;
      let diffPx = 0;
      for (let i = 0; i < total; i++) {
        const o = i * 4;
        if (
          Math.abs(da[o] - db[o]) > tol ||
          Math.abs(da[o + 1] - db[o + 1]) > tol ||
          Math.abs(da[o + 2] - db[o + 2]) > tol ||
          Math.abs(da[o + 3] - db[o + 3]) > tol
        ) {
          diffPx++;
        }
      }
      return { pct: (100 * diffPx) / total, diffPx, w, h };
    },
    { a, b, tol: TOLERANCE },
  );
}

// -- the CLI ----------------------------------------------------------------

function parseFlag(argv: string[], name: string): boolean {
  return argv.includes(`--${name}`);
}

function parseNumberArg(argv: string[], name: string): number | null {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return null;
  const v = Number(argv[i + 1]);
  return Number.isFinite(v) ? v : null;
}

async function run() {
  const argv = process.argv.slice(2);
  const json = parseFlag(argv, "json");
  const failOnDriftFlag = parseFlag(argv, "fail-on-drift");
  const widthArg = parseNumberArg(argv, "width");
  const heightArg = parseNumberArg(argv, "height");
  const classes = widthArg && heightArg
    ? [{ width: widthArg, height: heightArg, label: `${widthArg}x${heightArg}` }]
    : FULLPAGE_CLASSES.map((c) => ({ ...c }));

  const browser = await chromium.launch();
  const results: Array<{ label: string; pct: number; refH: number; ourH: number; baseline: number; drifted: boolean }> = [];

  for (const cls of classes) {
    const page = await browser.newPage({ viewport: { width: cls.width, height: cls.height } });
    try {
      const ref = await captureLanding(page, REF, cls.width, cls.height);
      const ours = await captureLanding(page, OURS, cls.width, cls.height);
      const d = await diffPair(page, ref.png, ours.png);
      const baseline = STANDING_FULLPAGE_BASELINES[cls.label] ?? 0;
      const drifted = failOnDrift(baseline, d.pct, FULLPAGE_MARGIN);
      results.push({ label: cls.label, pct: d.pct, refH: ref.scrollH, ourH: ours.scrollH, baseline, drifted });
      if (!json) {
        console.log(
          `[fullpage] ${cls.label} ${cls.width}x${cls.height}: ref H=${ref.scrollH} · ours H=${ours.scrollH} · ${d.pct.toFixed(3)}% diff` +
            ` (baseline ${baseline} + margin ${FULLPAGE_MARGIN}) — ${drifted ? "DRIFT" : "CLEAN"}`,
        );
        if (drifted) {
          console.log(`[fullpage]   standing genera: ${STANDING_EXPLAINED[cls.label] ?? "see the baselines"}`);
        }
      }
    } finally {
      await page.close();
    }
  }
  await browser.close();

  const drifted = results.some((r) => r.drifted);
  if (json) {
    console.log(JSON.stringify({ tool: "fullpage-sweep", results, drifted }));
  } else if (failOnDriftFlag && drifted) {
    console.error(`[fullpage] drift gate FAILED (margin ${FULLPAGE_MARGIN}pct over the standing baselines)`);
    process.exit(1);
  } else {
    console.log(`[fullpage] ${failOnDriftFlag ? "drift gate clean (margin 0.5pct over the standing baselines)" : "done"}`);
  }
}

run().catch((e) => {
  console.error(`[fullpage] ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
