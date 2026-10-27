import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-38 pins (S38-P6): the gate umbrella script. The documented
// gate order (AGENTS.md "Gate order before every push") was manual —
// five commands run by hand in order, with the known hazard that
// `test:e2e` does not depend on `build` (a leftover standalone server
// on :3100 silently tests STALE code, per the deferred ledger's N7).
// The `gate` script encodes the order in one command.
//
// Session-39 correction (S39-P1): chaining `build` before `test:e2e`
// does NOT by itself guarantee the fresh tree — playwright.config's
// `reuseExistingServer: !process.env.CI` reuses a leftover :3100
// listener regardless of build timing (a running process holds the OLD
// code in memory while the rebuild swaps static assets underneath).
// The gate's e2e step therefore runs with `CI=1`, which forces
// `reuseExistingServer: false`: the gate ALWAYS boots a fresh server
// from the just-built tree and kills it on exit. Plain `bun run
// test:e2e` keeps the reuse ergonomics for iteration.

const pkg = JSON.parse(
  readFileSync(path.resolve(import.meta.dirname, "..", "package.json"), "utf-8"),
) as {
  name?: string;
  description?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
};

describe("session-38: the gate umbrella script (S38-P6)", () => {
  it("package.json ships a `gate` script", () => {
    expect(typeof pkg.scripts?.gate).toBe("string");
    expect(pkg.scripts!.gate.length).toBeGreaterThan(0);
  });

  it("the chain is lint → typecheck → test → build → smoke → CI=1 test:e2e (the AGENTS.md order — session-170 inserts the §13.4/§14 smoke leg between build and e2e)", () => {
    const steps = pkg.scripts!.gate.split("&&").map((s) => s.trim());
    expect(steps).toEqual([
      "bun run lint",
      "bun run typecheck",
      "bun run test",
      "bun run build",
      "./scripts/smoke-test.sh",
      "CI=1 bun run test:e2e",
    ]);
  });

  it("the build step precedes the e2e boot (the no-build hazard, closed in-script)", () => {
    expect(pkg.scripts!.gate.indexOf("bun run build")).toBeLessThan(
      pkg.scripts!.gate.indexOf("bun run test:e2e"),
    );
  });
});

describe("session-39: the gate's fresh-boot guarantee (S39-P1)", () => {
  it("the e2e step runs with CI=1 so a leftover :3100 server is never reused", () => {
    // reuseExistingServer: !process.env.CI in playwright.config.ts —
    // under CI=1 the gate always boots the just-built standalone
    // server (and kills it on exit). Without the prefix, a leftover
    // listener would serve STALE in-memory code through the whole e2e
    // leg — the s38 "closed the stale-server class" claim was false
    // in exactly this scenario.
    expect(pkg.scripts!.gate).toMatch(/CI=1\s+bun run test:e2e/);
  });

  it("plain `test:e2e` keeps the reuse ergonomics (the prefix lives only in the gate)", () => {
    // The iteration workflow (bun run test:e2e against an
    // already-running server) is documented local ergonomics — the
    // CI=1 prefix must not leak into the standalone script.
    expect(pkg.scripts!["test:e2e"]).toBe("playwright test");
  });
});

describe("session-39: the lint warning enforcement (S39-P6)", () => {
  it("the lint script fails on warnings (--max-warnings 0) — the documented 0/0 standard is load-bearing", () => {
    // `eslint .` exits 0 on warnings; every doc says "lint 0/0" as the
    // gate standard, but nothing enforced it. The flag makes the
    // convention a contract.
    expect(pkg.scripts!.lint).toMatch(/--max-warnings\s+0/);
  });
});

describe("session-69: the E2E_PORT single source (N-69g)", () => {
  // The 69-c rotation's find: the "3100" default was hardcoded TWICE —
  // playwright.config.ts (Number(process.env.E2E_PORT ?? 3100)) and the
  // crm.spec 401 probe (process.env.E2E_PORT ?? "3100") — so a default
  // change in one place silently sends the probe at a dead port. The
  // fix: tests/e2e/e2e-port.ts owns the default + the env resolution;
  // both consumers import it (the S68-P4 constant-wiring class).
  function stripComments(src: string): string {
    return src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
  }
  function read(rel: string): string {
    const p = path.resolve(import.meta.dirname, "..", rel);
    return existsSync(p) ? readFileSync(p, "utf-8") : "";
  }

  it("the 3100 default lives exactly once (in e2e-port.ts) and the config imports it", () => {
    const port = stripComments(read("tests/e2e/e2e-port.ts"));
    expect(port).toContain('"3100"');
    const config = stripComments(read("playwright.config.ts"));
    // the consumer carries no literal anymore
    expect(config).not.toContain("?? 3100");
    // the config consumes the shared module
    expect(config).toMatch(/e2e-port/);
  });
});

describe("session-97 (S97-P3) → session-192 retirement: the gate chain's smoke-leg order (the gate:full composite is RETIRED)", () => {
  // The s96 suggested next #3 once chained `gate:full` = the standing
  // gate + six drift-gate legs (sweep at four viewports + fullpage +
  // interior census) — the CRM-era parity tooling. The s190 domain
  // transformation removed the ~60 drift-gate scripts but left the
  // package.json entries behind, and this block's pins read the script
  // STRINGS without checking the targets existed — green tests masking
  // dead infrastructure for two sessions. Session-192 retired the six
  // dead entries (db:census, sweep, probe:ref, sweep:fullpage,
  // census:interior, gate:full) and replaced the pins with the
  // dead-script guard (see the session-192 describe below); the Budget
  // Wise parity workflow is agent-browser + VLM, not the sweep family.
  // The ONE surviving pin is the plain gate's smoke-leg order — the
  // §14 build → smoke → e2e sequencing (session-170), kept here as the
  // block's historical anchor (also pinned exactly by session-38's
  // step-array assert).

  it("the plain `gate` carries the smoke leg (session-170: the §14 order — build → smoke → e2e)", () => {
    expect(pkg.scripts!.gate).toBe(
      "bun run lint && bun run typecheck && bun run test && bun run build && ./scripts/smoke-test.sh && CI=1 bun run test:e2e",
    );
  });

  it("the drift-gate composite is gone (gate:full chained scripts whose files were deleted at the s190 transformation)", () => {
    // The retirement pin: the composite must NOT come back without its
    // targets. The dead-script guard above is the general form; this is
    // the specific tombstone for the family that actually bit us.
    expect(pkg.scripts?.["gate:full"]).toBeUndefined();
    expect(pkg.scripts?.sweep).toBeUndefined();
    expect(pkg.scripts?.["probe:ref"]).toBeUndefined();
    expect(pkg.scripts?.["db:census"]).toBeUndefined();
    expect(pkg.scripts?.["sweep:fullpage"]).toBeUndefined();
    expect(pkg.scripts?.["census:interior"]).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Session-192 (the session-3 remediation round): the dead-script guard.
// The s190 transformation removed ~60 CRM scripts (the sweep/census/walk
// family) but five package.json entries survived pointing at the deleted
// files — and `gate:full` chained six of the dead legs, so the composite
// failed on its first drift gate. The session-97 pins below kept that
// GREEN because they read the script STRINGS and never checked that the
// referenced files exist — green tests masking dead infrastructure, the
// same class s191 cured for dead modules. The guard closes the class
// structurally: every script's repo-local file target must exist on
// disk, and every `bun run <name>` reference must resolve to a defined
// script.
// ---------------------------------------------------------------------------
describe("session-192: the dead-script guard (no script may reference a missing file or script)", () => {
  // Repo-local SOURCE targets only: build outputs (.next/) and runtime
  // artifacts (*.log — the dev script's `tee dev.log` writes it live)
  // are legitimately absent from a fresh clone.
  const SKIP_PREFIXES = [".next/", "node_modules/"];
  const SKIP_SUFFIXES = [".log"];
  const FILE_TOKEN =
    /(?:^|[\s"'=(&|;])((?:\.\/|[A-Za-z0-9_@./-]+\/)?[A-Za-z0-9_.@-]+\.(?:ts|tsx|sh|mjs|cjs|js))(?=[\s&|;)]|$)/g;

  it("every repo-local file target referenced by a script exists on disk (the db:census/sweep/probe:ref/sweep:fullpage/census:interior leftovers all pointed at deleted files)", () => {
    const repoRoot = path.resolve(import.meta.dirname, "..");
    const offenders: string[] = [];
    for (const [name, cmd] of Object.entries(pkg.scripts ?? {})) {
      // matchAll + the CAPTURE group: String.match(/g) would return full
      // matches with the consumed delimiter char glued to the token.
      const tokens = [...cmd.matchAll(FILE_TOKEN)].map((m) => m[1]);
      for (const token of tokens) {
        const rel = token.startsWith("./") ? token.slice(2) : token;
        if (SKIP_PREFIXES.some((p) => rel.startsWith(p))) continue;
        if (SKIP_SUFFIXES.some((s) => rel.endsWith(s))) continue;
        if (!existsSync(path.join(repoRoot, rel))) {
          offenders.push(`${name} → ${token}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("every `bun run <name>` reference inside a script resolves to a defined script (gate:full chained the dead drift-gate family by name)", () => {
    const offenders: string[] = [];
    const defined = new Set(Object.keys(pkg.scripts ?? {}));
    for (const [name, cmd] of Object.entries(pkg.scripts ?? {})) {
      const refs = cmd.matchAll(/bun run ([A-Za-z0-9:_-]+)/g);
      for (const [, ref] of refs) {
        if (!defined.has(ref)) offenders.push(`${name} → bun run ${ref}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Session-191 (the session-2 remediation round): the package identity.
// package.json still carried the CRM's name/description ("neo-crm" /
// "NEO CRM — … CRM application") after the domain transformation — the
// identity ships in every bun run banner and the standalone artifact's
// manifest. The pin keeps the package honest about what this app is.
// ---------------------------------------------------------------------------
describe("session-191: the package identity (the retired-brand purge)", () => {
  it("names the package for the app it actually is", () => {
    expect(pkg.name).toBe("budget-wise");
  });

  it("describes the app as the personal finance platform (no CRM copy)", () => {
    expect(pkg.description).toMatch(/Budget Wise/);
    expect(pkg.description).toMatch(/personal finance/i);
    expect(pkg.description).not.toMatch(/CRM/i);
  });

  it("the dead PDF-export dependencies are retired (the dead-code census)", () => {
    expect(pkg.dependencies?.jspdf).toBeUndefined();
    expect(pkg.dependencies?.["html2canvas-pro"]).toBeUndefined();
  });
});
