import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The reset flow pins (Budget Wise): the /api/reset route's contract —
// the session guard, the bounded reader, the "RESET" confirm gate, and
// the ATOMIC transactional wipe of the domain tables (budgets +
// transactions; users and their auth state survive).

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const RESET_ROUTE = "src/app/api/reset/route.ts";

describe("the reset route contract", () => {
  it("exists and is dynamic", () => {
    const src = read(RESET_ROUTE)!;
    expect(src).toMatch(/export const dynamic = "force-dynamic"/);
  });

  it("gates on the session", () => {
    const code = stripComments(read(RESET_ROUTE)!);
    expect(code).toMatch(/requireSession\(\)/);
    expect(code).toMatch(/if \(isGuarded\(guard\)\) return guard\.response;/);
  });

  it("parses through the bounded reader (never a bare req.json())", () => {
    const code = stripComments(read(RESET_ROUTE)!);
    expect(code).toMatch(/readBoundedJson\(req\)/);
    expect(code).not.toMatch(/\breq\.json\(\)/);
    expect(code).toMatch(/if \(read\.tooLarge\) return ERR\.BAD_REQUEST\("Request body too large"\);/);
  });

  it("gates on the exact RESET confirm string", () => {
    const code = stripComments(read(RESET_ROUTE)!);
    expect(code).toMatch(/body\.confirm !== "RESET"/);
    expect(code).toMatch(/'Type "RESET" to confirm'/);
  });

  it("wipes the domain tables ATOMICALLY (budgets + transactions; users survive)", () => {
    const code = stripComments(read(RESET_ROUTE)!);
    expect(code).toMatch(/db\.\$transaction\(\[/);
    expect(code).toMatch(/db\.budget\.deleteMany\(\)/);
    expect(code).toMatch(/db\.transaction\.deleteMany\(\)/);
    expect(code).not.toMatch(/db\.user\.deleteMany\(\)/);
    expect(code).not.toMatch(/db\.account\.deleteMany\(\)/);
    expect(code).not.toMatch(/db\.contact\.deleteMany\(\)/);
  });

  it("answers the envelope on success and holds the failure path", () => {
    const code = stripComments(read(RESET_ROUTE)!);
    expect(code).toMatch(/return ok\(\{ reset: true \}\);/);
    expect(code).toMatch(/return ERR\.INTERNAL\(\);/);
  });
});
