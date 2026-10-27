import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-197 (F-1): the dev-boot-after-build `.next` race guard.
//
// The live hit (2026-10-28): after the gate's `next build` completed
// CLEANLY (no concurrency, no killed process — build exit 0, smoke + e2e
// green on the standalone artifact), booting `bun run dev` entered the
// documented infinite reload loop — 646 GET /login re-fetches, the login
// form's fills wiped by the reloads. The cure (stop dev, rm -rf .next,
// restart) restored a stable server. The genus is broader than the
// README/AGENTS wording ("a build ran concurrently with / was killed
// half-into dev"): turbopack dev watching a tree last written by the
// PRODUCTION compiler loops regardless of how cleanly that tree was
// written — and "run the gate, then boot dev" is exactly the workflow the
// repo's own docs invite.
//
// The marker facts (probed live): the production build writes top-level
// `.next/BUILD_ID`; dev turbopack writes `.next/dev/` with a `lock` JSON
// (`{"pid":…,"port":…}`) — the two tree states are programmatically
// distinguishable at dev-boot time, which is all the guard needs.
//
// The guard contract pinned below:
//   • a production-written tree with NO live dev lock → CLEAN it (the
//     loop genus, prevented at boot);
//   • a production-written tree with a LIVE dev lock → PASS THROUGH and
//     never clean (removing a tree a running server owns would corrupt
//     it — the exact class the guard exists to prevent);
//   • a dev-only or fresh tree → pass through silently (no clean).
import {
  isLivePid,
  parseDevLock,
  resolveDevPreflight,
} from "../scripts/dev-preflight";

const pkg = JSON.parse(
  readFileSync(path.resolve(import.meta.dirname, "..", "package.json"), "utf-8"),
) as { scripts?: Record<string, string> };

describe("session-197: the dev-preflight decision function (F-1)", () => {
  it("a fresh clone (no .next) passes through with no clean", () => {
    expect(
      resolveDevPreflight({ hasNext: false, buildIdExists: false, lockPid: null }),
    ).toEqual({ action: "none", reason: "no-build-tree" });
  });

  it("a dev-only tree (no BUILD_ID — the normal iterate case) passes through untouched", () => {
    expect(
      resolveDevPreflight({ hasNext: true, buildIdExists: false, lockPid: null }),
    ).toEqual({ action: "none", reason: "dev-tree" });
    // A stale dev lock without a BUILD_ID is still a dev tree — the
    // guard must not clean it (dev state is not the loop genus).
    expect(
      resolveDevPreflight({ hasNext: true, buildIdExists: false, lockPid: 424242 }),
    ).toEqual({ action: "none", reason: "dev-tree" });
  });

  it("a production-written tree with no lock → CLEAN (the live-hit genus: boot dev after a completed build)", () => {
    expect(
      resolveDevPreflight({ hasNext: true, buildIdExists: true, lockPid: null }),
    ).toEqual({ action: "clean", reason: "stale-production-tree" });
  });

  it("a production-written tree with a DEAD lock pid → CLEAN (a dev server died on the mixed tree)", () => {
    // 4194304 is above the Linux pid ceiling — guaranteed not to exist.
    expect(
      resolveDevPreflight({ hasNext: true, buildIdExists: true, lockPid: 4194304 }),
    ).toEqual({ action: "clean", reason: "stale-production-tree" });
  });

  it("a production-written tree with a LIVE lock pid → PASS THROUGH, never clean (the guard's own guard)", () => {
    // The current test process is the most obviously-live pid available.
    expect(
      resolveDevPreflight({ hasNext: true, buildIdExists: true, lockPid: process.pid }),
    ).toEqual({ action: "pass-through", reason: "dev-server-live" });
  });
});

describe("session-197: the dev-lock parser + pid liveness (F-1)", () => {
  it("parses the lock JSON Next 16 dev writes ({pid, port, …})", () => {
    expect(
      parseDevLock('{"pid":16121,"port":3000,"hostname":"localhost"}'),
    ).toBe(16121);
  });

  it("returns null for a missing/malformed lock (fails open to the no-lock branch)", () => {
    expect(parseDevLock("")).toBeNull();
    expect(parseDevLock("not json")).toBeNull();
    expect(parseDevLock('{"port":3000}')).toBeNull(); // no pid
    expect(parseDevLock('{"pid":"not-a-number"}')).toBeNull();
  });

  it("isLivePid: the current process is live; a beyond-ceiling pid is dead", () => {
    expect(isLivePid(process.pid)).toBe(true);
    expect(isLivePid(4194304)).toBe(false);
    expect(isLivePid(null)).toBe(false);
  });
});

describe("session-197: the dev script wiring (F-1)", () => {
  it("the `dev` script runs the preflight guard BEFORE next dev (the && binds looser than the pipe)", () => {
    const dev = pkg.scripts?.dev ?? "";
    expect(dev).toContain("bun scripts/dev-preflight.ts");
    // The guard must complete before the dev server boots: the prefix
    // form `bun scripts/dev-preflight.ts && next dev … | tee dev.log`
    // parses as guard && (next dev | tee) — shell precedence does the
    // sequencing for us.
    expect(dev.indexOf("bun scripts/dev-preflight.ts")).toBeLessThan(
      dev.indexOf("next dev"),
    );
    // The pipe-to-tee ergonomics are preserved (dev.log stays gitignored).
    expect(dev).toContain("tee dev.log");
  });
});
