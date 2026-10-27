import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-68 pins (F-68a2 — the 68-a re-audit's find): the N-67d body
// pre-gate family extended to the SESSIONED CRUD routes. All 13 routes
// that parse bodies behind requireSession() (accounts/activities/
// contacts/events/leads x[root+[id]] + settings + users + reset — the
// users PATCH joined at s72, M-72c2) gate the declared Content-Length
// BEFORE the parse — the same isBodyTooLarge ceiling the public auth
// routes carry (MAX_AUTH_BODY_BYTES = 16KB; the honest CRUD bodies are
// far smaller — asString defaults to a 500-char cap, the settings PUT
// carries the picklists). The gate sits after requireSession (the
// upload route's documented placement: the unauth 401 is cheap and
// pre-auth bucketing concerns do not apply to a pure size check) and
// before the parse so an oversized body is rejected without ever being
// read into memory.
//
// Session-165 (WP-1 — the digma S148-A/S75-B port): the family's parse
// sites ALL moved onto the readBoundedJson seam — the composed
// THREE-layer gate (the content-type CSRF gate → the declared-length
// fast path → the stream counter) with the null-on-unparseable parse
// tail.
//
// Session-166 (the Zod seam): the ELEVEN asString-family routes moved
// onto parseBody(req, <schema>) — the seam composes readBoundedJson +
// safeParse inside src/lib/api.ts, so the ordering pins below re-anchor
// onto the parseBody call form (the gate-before-parse and
// gate-before-DB contracts ride the SAME composed seam, one call). The
// users PATCH keeps its route-local readBoundedJson + safeParse form
// (its divergent "Invalid JSON body" null-body message — the
// zero-message-drift doctrine); reset keeps its custom confirm form.
// The pins stay ORDERING-aware (indexOf comparisons) so a seam placed
// after the parse or after DB work cannot satisfy them.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

// The eleven parseBody-family routes (the shared "Invalid request body"
// invalid-body form rides parseBody's null branch in api.ts).
const ROUTES = [
  "src/app/api/transactions/route.ts",
  "src/app/api/budgets/route.ts",
  "src/app/api/budgets/[id]/route.ts",
  "src/app/api/profile/route.ts",
] as const;

// The reset route's own invalid-body face: no separate "Invalid request
// body" line — a null body falls into the 'Type "RESET" to confirm'
// guard (its historical contract, preserved verbatim).
const RESET_ROUTE = "src/app/api/reset/route.ts" as const;


describe("session-68 + session-165 + session-166: the sessioned bounded-reader family (F-68a2 → the S148-A/S75-B port → the Zod seam)", () => {
  it("all parseBody-family routes import the seam from the api module", () => {
    for (const rel of ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/parseBody/);
      expect(src, rel).toMatch(/from "@\/lib\/api"/);
    }
    // the reset route keeps the raw seam (its custom confirm form)
    const reset = stripComments(read(RESET_ROUTE) ?? "");
    expect(reset, RESET_ROUTE).toMatch(/readBoundedJson/);
  });

  it("session-165 + session-166: NO sessioned route parses through a bare req.json() anymore (the unbounded direct parse retired)", () => {
    for (const rel of [...ROUTES, RESET_ROUTE]) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: the direct req.json()/request.json() parse must not survive`).not.toMatch(
        /\b(?:req|request)\.json\(\)/,
      );
    }
  });

  it("the parseBody call precedes all DB work in its own handler (the s166 seam form of the gate-before-DB ordering)", () => {
    for (const rel of ROUTES) {
      const src = stripComments(read(rel) ?? "");
      const seam = src.indexOf("await parseBody(req");
      expect(seam, `${rel}: no parseBody call`).toBeGreaterThanOrEqual(0);
      const handlerStarts = [...src.matchAll(/export async function (?:GET|POST|PUT|PATCH|DELETE)/g)]
        .map((m) => m.index ?? 0)
        .filter((i) => i < seam);
      const handlerStart = handlerStarts.length
        ? handlerStarts[handlerStarts.length - 1]
        : 0;
      const between = src.slice(handlerStart, seam);
      expect(between.match(/\bdb\.\w+/g) ?? [], `${rel}: DB work before the seam`).toEqual([]);
    }
  });

  it("the 400 vocabulary rides the seam (api.ts) + the two divergent siblings keep their own forms (the message-preservation contract)", () => {
    // Session-166 re-anchor: the eleven routes' shared "Request body too
    // large" + "Invalid request body" 400s are parseBody's own literals
    // (src/lib/api.ts) — the routes carry no seam literals of their own.
    const api = stripComments(read("src/lib/api.ts") ?? "");
    expect(api).toContain('ERR.BAD_REQUEST("Request body too large")');
    expect(api).toContain('ERR.BAD_REQUEST("Invalid request body")');
    for (const rel of ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/if \(!parsed\.ok\) return parsed\.response;/);
    }
    // the divergent sibling, preserved verbatim — never normalized
    // mid-port (the zero-message-drift doctrine):
    const reset = stripComments(read(RESET_ROUTE) ?? "");
    expect(reset, RESET_ROUTE).toContain('Type "RESET" to confirm');
  });
});
