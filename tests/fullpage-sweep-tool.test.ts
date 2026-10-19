import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

/**
 * Session-149 (F-149c3, walk39): the FULLPAGE-SWEEP TOOL pins — the
 * below-the-fold drift gate the owner's full-page-screenshot skill
 * motivated (the 1920×4986 homepage capture committed at the repo
 * root). The four viewport sweeps structurally clip at their height
 * (y≈900) — three real landing decodes (the prices, the 6th li, the
 * preview leading) accumulated invisible since s142; this tool closes
 * the axis with the landing's FULL-PAGE pair at two classes.
 *
 * The house seams-and-pins doctrine (the drift-probe at s101, the
 * sweep classes at s96–s99): the PURE node seams are what these pins
 * exercise; the browser twin carries the same cross-reference.
 */

const TOOL = "scripts/fullpage-sweep.ts";
const PKG = "package.json";

const toolSrc = () => readFileSync(TOOL, "utf-8");
const pkgSrc = () => JSON.parse(readFileSync(PKG, "utf-8"));

describe("session-149: the fullpage-sweep tool (the below-the-fold gate)", () => {
  it("the tool exists", () => {
    expect(existsSync(TOOL)).toBe(true);
  });

  it("the package wiring: `bun run sweep:fullpage` + the FIFTH gate in gate:full", () => {
    const pkg = pkgSrc();
    expect(pkg.scripts["sweep:fullpage"]).toBe("bun scripts/fullpage-sweep.ts");
    // the fifth gate appends AFTER the four viewport sweeps
    expect(pkg.scripts["gate:full"]).toMatch(/sweep:fullpage/);
  });

  it("the two standing classes: desktop 1920×1080 + phone 390×844 (the full-page axis)", async () => {
    const m = await import(`../${TOOL.replace(/\.ts$/, "")}`);
    const classes = m.FULLPAGE_CLASSES as ReadonlyArray<{ width: number; height: number; label: string }>;
    expect(classes).toEqual([
      { width: 1920, height: 1080, label: "desktop" },
      { width: 390, height: 844, label: "phone" },
    ]);
  });

  it("the standing baselines: both classes present + the 0.5pct drift margin (the sweep's margin)", async () => {
    const m = await import(`../${TOOL.replace(/\.ts$/, "")}`);
    const baselines = m.STANDING_FULLPAGE_BASELINES as Record<string, number>;
    expect(Object.keys(baselines).sort()).toEqual(["desktop", "phone"]);
    for (const v of Object.values(baselines)) {
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThan(1); // the pill genus + the raster floor, never a real drift
    }
    expect(m.FULLPAGE_MARGIN).toBe(0.5);
    // the maiden anchors (the post-s149 fix measurement — the pill genus
    // + the raster floor at EQUAL heights; the browser twin and the PIL
    // cross-check agreed at 0.144/0.487)
    expect(baselines.desktop).toBe(0.14);
    expect(baselines.phone).toBe(0.49);
  });

  it("the standing genera documented: the GUEST platform pill + the raster floor", async () => {
    const m = await import(`../${TOOL.replace(/\.ts$/, "")}`);
    const explained = m.STANDING_EXPLAINED as Record<string, string>;
    expect(Object.keys(explained).sort()).toEqual(["desktop", "phone"]);
    // the pill genus is the guest-only platform chrome (the sweeps'
    // logged-in captures never see it — the L-149c2 lesson)
    for (const line of Object.values(explained)) {
      expect(line).toMatch(/pill/i);
    }
  });

  it("padTo (the PURE pad seam): white-pads an RGBA buffer to the target height, preserving the rows", async () => {
    const m = await import(`../${TOOL.replace(/\.ts$/, "")}`);
    const padTo = m.padTo as (buf: Uint8ClampedArray, w: number, h: number, targetH: number) => Uint8ClampedArray;
    // a 2×1 image: two solid pixels
    const buf = new Uint8ClampedArray([10, 20, 30, 255, 40, 50, 60, 255]);
    const out = padTo(buf, 2, 1, 3);
    expect(out.length).toBe(2 * 3 * 4);
    // the original row is preserved byte-equal
    expect(Array.from(out.subarray(0, 8))).toEqual([10, 20, 30, 255, 40, 50, 60, 255]);
    // the padded rows are opaque white
    for (let row = 1; row < 3; row++) {
      expect(Array.from(out.subarray(row * 8, row * 8 + 8))).toEqual([255, 255, 255, 255, 255, 255, 255, 255]);
    }
  });

  it("padTo: REFUSES to shrink (the NaN/undersize doctrine)", async () => {
    const m = await import(`../${TOOL.replace(/\.ts$/, "")}`);
    const padTo = m.padTo as (buf: Uint8ClampedArray, w: number, h: number, targetH: number) => Uint8ClampedArray;
    const buf = new Uint8ClampedArray(2 * 3 * 4);
    expect(() => padTo(buf, 2, 3, 2)).toThrow();
  });

  it("the guest capture doctrine: NO login on the landing pair (the public marketing surface)", () => {
    const src = toolSrc();
    expect(src).not.toMatch(/await login\(/);
    // the USAGE seam (storageState in an options object) — a prose
    // mention of the doctrine itself is fine (the s142 own-doc-comment
    // lesson: pins target usage, not prose)
    expect(src).not.toMatch(/storageState\s*:/);
  });

  it("the capture methodology: the skill's phases (settle + the lazy-content scroll pass + the fullPage shot)", () => {
    const src = toolSrc();
    // the full-page-screenshot skill's phases: load-gate, the
    // scroll-to-bottom lazy pass, the return-to-top settle
    expect(src).toMatch(/scrollHeight\)/); // scrollTo bottom
    expect(src).toMatch(/scrollTo\(0, 0\)/); // return to top
    expect(src).toMatch(/fullPage: true/);
    expect(src).toMatch(/networkidle/);
  });

  it("the browser twin carries the diffPixels cross-reference (the no-bundling doctrine) + tol 12", () => {
    const src = toolSrc();
    expect(src).toMatch(/diffPixels/); // the cross-reference to the sweep's pure seam
    expect(src).toMatch(/12/); // TOLERANCE 12, the sweep's semantics
    // the unequal-height pad happens BEFORE the diff (the full-page pair
    // legitimately differs in height — the very drift signal itself)
    expect(src).toMatch(/padTo/);
  });

  it("--fail-on-drift: exit 1 only when a class exceeds baseline + margin", async () => {
    const m = await import(`../${TOOL.replace(/\.ts$/, "")}`);
    const failOnDrift = m.failOnDrift as (baseline: number, pct: number, margin: number) => boolean;
    expect(failOnDrift(0.1, 0.11, 0.5)).toBe(false); // within margin
    expect(failOnDrift(0.1, 0.6, 0.5)).toBe(false); // exactly at the line
    expect(failOnDrift(0.1, 0.61, 0.5)).toBe(true); // over
  });
});
