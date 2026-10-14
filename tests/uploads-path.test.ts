// Session-121 (D-121a0): the uploads repo-root anchor chain pins — the
// F-121c1 defect's regression net. The 121-c walk found the standalone
// server writing uploads to <repo>/.next/standalone/uploads (the EPHEMERAL
// build output, wiped by every `next build`): the standalone bundle
// rewrites import.meta.url into the VIRTUAL path
// <repo>/.next/standalone/src/lib/uploads.ts, whose ../.. VALIDATES
// .next/standalone as a repo root (the traced prisma/schema.prisma copy
// lives there) — so the module-URL-first anchor order landed the folder
// inside .next. The fix mirrors db-path's session-34 order: the
// standalone-cwd anchor FIRST. These pins hold that order with the
// db-path.test.ts buildStandaloneRepo fixture idiom.

import { mkdtempSync, mkdirSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, describe, expect, it } from "vitest";
import { pathToFileURL } from "url";
import { repoRootFor, uploadsDir } from "../src/lib/uploads";

const tempDirs: string[] = [];

afterEach(() => {
  // tmp fixtures — best-effort cleanup (mkdtemp dirs age out of /tmp).
  for (const d of tempDirs.splice(0)) {
    try {
      import("fs").then((m) => m.rmSync(d, { recursive: true, force: true }));
    } catch {
      // ignore
    }
  }
});

/** The production layout the trace produces: <repo>/{prisma/schema.prisma}
 *  + <repo>/.next/standalone/{prisma/schema.prisma, src/lib/uploads.ts} —
 *  the VIRTUAL module URL the standalone bundle hands the module. */
function buildStandaloneRepo(): {
  repo: string;
  standalone: string;
  virtualModuleUrl: string;
} {
  const repo = mkdtempSync(join(tmpdir(), "neo-crm-uploads-"));
  tempDirs.push(repo);
  mkdirSync(join(repo, "prisma"), { recursive: true });
  writeFileSync(join(repo, "prisma", "schema.prisma"), "// schema stub\n");
  const standalone = join(repo, ".next", "standalone");
  const srcLib = join(standalone, "src", "lib");
  mkdirSync(srcLib, { recursive: true });
  // THE TRAP: the traced schema copy INSIDE the build output — the thing
  // that validates .next/standalone as a "repo root".
  mkdirSync(join(standalone, "prisma"), { recursive: true });
  writeFileSync(join(standalone, "prisma", "schema.prisma"), "// traced copy\n");
  const virtualModuleUrl = pathToFileURL(join(srcLib, "uploads.ts")).href;
  return { repo, standalone, virtualModuleUrl };
}

describe("repoRootFor (the F-121c1 standalone virtual-import.meta.url trap)", () => {
  it("THE TRAP: the standalone cwd anchor WINS over the virtual module URL — the uploads folder lands at the REAL repo root, never inside .next", () => {
    const { repo, standalone, virtualModuleUrl } = buildStandaloneRepo();
    // The exact standalone request-time conditions: the server.js
    // process.chdir(__dirname) into .next/standalone + the bundle's
    // virtual module URL. The module-first order returns .next/standalone
    // (validated by its own traced schema copy); the cwd-first order
    // resolves ../.. to the REAL repo root.
    const root = repoRootFor(virtualModuleUrl, standalone);
    expect(root).toBe(repo);
    expect(root).not.toBe(standalone);
    expect(root).not.toContain(".next");
  });

  it("the dev/seed/vitest case: the module's own URL anchors the repo (cwd outside .next never consults the standalone anchor)", () => {
    const { repo } = buildStandaloneRepo();
    // The dev runtime: import.meta.url = <repo>/src/lib/uploads.ts and
    // cwd = <repo> — the module anchor resolves src/lib/../.. = repo.
    const devModuleUrl = pathToFileURL(join(repo, "src", "lib", "uploads.ts")).href;
    expect(repoRootFor(devModuleUrl, repo)).toBe(repo);
    // NOTE the boundary (the db-path session-34 semantics, mirrored): the
    // cwd anchor only fires for a cwd INSIDE .next — the real runtimes are
    // exactly two (dev/vitest/seed at <repo>, the standalone server at
    // <repo>/.next/standalone after its boot chdir), both pinned above.
  });

  it("the fallthrough: no valid anchor -> the cwd passes through unchanged", () => {
    const { repo } = buildStandaloneRepo();
    const nowhere = join(repo, "empty-dir");
    // No cwd anchor (outside .next), no module URL — the cwd itself.
    expect(repoRootFor(undefined, nowhere)).toBe(nowhere);
    // A module URL whose ../.. validates NOTHING also falls through.
    expect(repoRootFor(pathToFileURL(join(nowhere, "x.ts")).href, nowhere)).toBe(nowhere);
  });

  it("uploadsDir() from the repo cwd resolves <repo>/uploads (the documented contract — dev/build/standalone share one folder)", () => {
    // This test process runs from the repo root: the real uploadsDir()
    // must land at <repo>/uploads, NOT inside .next (the F-121c1
    // regression guard on the live wiring, seam-level trap above).
    const dir = uploadsDir();
    expect(dir).not.toContain(".next");
    expect(dir.endsWith(join("neo-crm", "uploads")) || dir.endsWith("uploads")).toBe(true);
  });
});
