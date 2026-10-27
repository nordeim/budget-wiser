// Dev-boot preflight: prevents the dev-vs-build `.next` race (session-197,
// F-1) at the only place it can be prevented — before `next dev` boots.
//
// The live hit (2026-10-28): after the gate's `next build` completed
// CLEANLY (no concurrency, no killed process), booting `bun run dev` entered
// the infinite reload loop — 646 GET /login re-fetches, form fills wiped by
// the reloads. Turbopack dev watching a tree last written by the PRODUCTION
// compiler loops regardless of how cleanly that tree was produced; the
// README/AGENTS wording ("a build ran concurrently with / was killed
// half-into dev") under-described the genus. "Run the gate, then boot dev"
// is exactly the workflow the repo's own docs invite — so the guard rides
// the `dev` script itself.
//
// The marker facts (probed live):
//   • the production build writes top-level `.next/BUILD_ID`;
//   • dev turbopack writes `.next/dev/` with a `lock` JSON
//     (`{"pid":…,"port":…}`) and NO top-level BUILD_ID.
// A production-written tree with no LIVE dev lock is stale build cache —
// regenerable, safe to remove (Next itself treats .next as disposable);
// removing it before the boot is the documented cure, automated.
//
// Deliberately narrow: it removes NOTHING but a stale production `.next`,
// it never touches a tree a live dev server owns (the lock-pid check is
// the guard's own guard), it asks no questions (agents cannot answer
// prompts), and it exits 0 in every pass-through case so `next dev`
// proceeds. The build-while-dev-live direction of the race stays prose
// (documented in README/AGENTS) — this guard owns the boot seam only.
//
// Run: wired into package.json's `dev` script —
//   `bun scripts/dev-preflight.ts && next dev -p 3000 2>&1 | tee dev.log`
// (shell precedence: `&&` binds looser than `|`, so the guard completes
// before the pipe starts).

import { existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";

export type DevPreflightDecision =
  | { action: "none"; reason: "no-build-tree" | "dev-tree" }
  | { action: "clean"; reason: "stale-production-tree" }
  | { action: "pass-through"; reason: "dev-server-live" };

/** Pure decision — unit-pinned by tests/dev-preflight.test.ts. */
export function resolveDevPreflight(input: {
  hasNext: boolean;
  buildIdExists: boolean;
  lockPid: number | null;
}): DevPreflightDecision {
  if (!input.hasNext || !input.buildIdExists) {
    // Fresh clone or a normal dev-written tree — not the loop genus.
    return { action: "none", reason: input.hasNext ? "dev-tree" : "no-build-tree" };
  }
  if (input.lockPid !== null && isLivePid(input.lockPid)) {
    // A dev server owns this tree RIGHT NOW. Cleaning under it would
    // corrupt the running server's state — the exact class this guard
    // exists to prevent. Pass through and let Next handle the boot.
    return { action: "pass-through", reason: "dev-server-live" };
  }
  // A production-written tree with no live dev owner: booting dev onto it
  // is the reload-loop genus. The tree is regenerable build cache.
  return { action: "clean", reason: "stale-production-tree" };
}

/** Parse `.next/dev/lock` for the owning dev server's pid (null = no
 * usable lock — fails open to the no-lock branch of the decision). */
export function parseDevLock(raw: string): number | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as { pid?: unknown }).pid === "number" &&
      Number.isInteger((parsed as { pid: number }).pid) &&
      (parsed as { pid: number }).pid > 0
    ) {
      return (parsed as { pid: number }).pid;
    }
    return null;
  } catch {
    return null;
  }
}

/** pid liveness via signal-0 probe (ESRCH = dead; EPERM = alive, not
 * ours — a live pid owned by another user still owns the tree). */
export function isLivePid(pid: number | null): boolean {
  if (pid === null || !Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return (err as NodeJS.ErrnoException).code === "EPERM";
  }
}

function main(): void {
  const nextDir = path.resolve(import.meta.dirname, "..", ".next");
  const hasNext = existsSync(nextDir);
  const buildIdExists = hasNext && existsSync(path.join(nextDir, "BUILD_ID"));
  const lockPath = path.join(nextDir, "dev", "lock");
  const lockPid = hasNext && existsSync(lockPath)
    ? parseDevLock(readFileSync(lockPath, "utf-8"))
    : null;

  const decision = resolveDevPreflight({ hasNext, buildIdExists, lockPid });

  if (decision.action === "clean") {
    // The live-hit genus: turbopack dev would reload-loop on the
    // production-written tree. `.next` is regenerable cache — remove it
    // so dev boots onto a fresh tree.
    rmSync(nextDir, { recursive: true, force: true });
    console.log(
      "[dev-preflight] removed the stale production .next tree (last written by `next build`) —",
      "booting dev onto it enters the turbopack reload loop (session-197 F-1);",
      "a fresh dev tree will be compiled on boot.",
    );
    return;
  }

  if (decision.action === "pass-through") {
    console.warn(
      `[dev-preflight] a dev server (pid ${lockPid}) appears to own this .next tree, which also carries a production BUILD_ID —`,
      "if that server is reload-looping, stop it, run `rm -rf .next`, and reboot dev (the documented cure).",
    );
    return;
  }

  // "none": fresh or dev-only tree — say nothing, boot normally.
}

// Only take over the process when executed directly (not when imported by
// the Vitest suite) — the prisma-env.ts pattern.
const invokedAsScript = process.argv[1]?.endsWith("dev-preflight.ts");
if (invokedAsScript) main();
