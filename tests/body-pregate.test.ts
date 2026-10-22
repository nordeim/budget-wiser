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
// tail. The pins below are ORDERING-aware (indexOf comparisons, not
// mere containment) so a gate placed after the parse cannot satisfy
// them, exactly as at s68; the seam's own contract battery lives in
// tests/bounded-reader.test.ts and the composed parseBody form in
// tests/parse-body.test.ts. Every route's 400 vocabulary is preserved
// VERBATIM (the zero-message-drift doctrine — including the two
// divergent siblings: users' "Invalid JSON body" and reset's
// 'Type "RESET" to confirm' null-body fallthrough).

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

// The eleven asString-family routes (the shared "Invalid request body"
// invalid-body form).
const ROUTES = [
  "src/app/api/accounts/route.ts",
  "src/app/api/accounts/[id]/route.ts",
  "src/app/api/activities/route.ts",
  "src/app/api/activities/[id]/route.ts",
  "src/app/api/contacts/route.ts",
  "src/app/api/contacts/[id]/route.ts",
  "src/app/api/events/route.ts",
  "src/app/api/events/[id]/route.ts",
  "src/app/api/leads/route.ts",
  "src/app/api/leads/[id]/route.ts",
  "src/app/api/settings/route.ts",
] as const;

// The reset route's own invalid-body face: no separate "Invalid request
// body" line — a null body falls into the 'Type "RESET" to confirm'
// guard (its historical contract, preserved verbatim).
const RESET_ROUTE = "src/app/api/reset/route.ts" as const;

// Session-72 (M-72c2): the users PATCH — the 13th sessioned body-parsing
// route. Its handler names its param `request` (not `req`) and its
// invalid-body message reads "Invalid JSON body" (the one divergent
// sibling — preserved verbatim, never normalized mid-port), so its pins
// are param- and message-aware below.
const USERS_ROUTE = "src/app/api/users/route.ts" as const;

const SEAM_ROUTES = [...ROUTES, RESET_ROUTE] as const;

describe("session-68 + session-165: the sessioned bounded-reader family (F-68a2 → the S148-A/S75-B port)", () => {
  it("all 12 sessioned routes import readBoundedJson from the api seam", () => {
    for (const rel of SEAM_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/readBoundedJson/);
      expect(src, rel).toMatch(/from "@\/lib\/api"/);
    }
  });

  it("session-72: the users PATCH — the 13th sessioned body-parsing route — is on the seam too (M-72c2)", () => {
    const src = stripComments(read(USERS_ROUTE) ?? "");
    expect(src, USERS_ROUTE).toMatch(/readBoundedJson/);
    expect(src, USERS_ROUTE).toMatch(/from "@\/lib\/api"/);
    const seam = src.indexOf("readBoundedJson(request)");
    expect(seam, `${USERS_ROUTE}: no seam call`).toBeGreaterThanOrEqual(0);
    expect(src, USERS_ROUTE).toContain(
      'if (read.tooLarge) return ERR.BAD_REQUEST("Request body too large");',
    );
  });

  it("session-165: NO sessioned route parses through a bare req.json() anymore (the unbounded direct parse retired)", () => {
    for (const rel of [...SEAM_ROUTES, USERS_ROUTE]) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: the direct req.json()/request.json() parse must not survive`).not.toMatch(
        /\b(?:req|request)\.json\(\)/,
      );
    }
  });

  it("the seam call precedes the too-large rejection in every sessioned handler", () => {
    for (const rel of SEAM_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      const seam = src.indexOf("readBoundedJson(req)");
      expect(seam, `${rel}: no seam call`).toBeGreaterThanOrEqual(0);
      expect(src, rel).toContain(
        'if (read.tooLarge) return ERR.BAD_REQUEST("Request body too large");',
      );
      const tooLarge = src.indexOf("if (read.tooLarge)");
      expect(tooLarge, `${rel}: no too-large rejection`).toBeGreaterThan(seam);
    }
  });

  it("the eleven asString-family routes keep their exact invalid-body 400 form (the message-preservation contract)", () => {
    for (const rel of ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toContain('ERR.BAD_REQUEST("Invalid request body")');
    }
    // the two divergent siblings, preserved verbatim — never normalized
    // mid-port (the s165 zero-message-drift doctrine):
    const users = stripComments(read(USERS_ROUTE) ?? "");
    expect(users, USERS_ROUTE).toContain('ERR.BAD_REQUEST("Invalid JSON body")');
    const reset = stripComments(read(RESET_ROUTE) ?? "");
    expect(reset, RESET_ROUTE).toContain('Type "RESET" to confirm');
  });
});

describe("session-69: the seam precedes all DB work in its own handler (F-69a3)", () => {
  it("no sessioned route reads the DB before the bounded reader rejects an oversized body", () => {
    // The 69-a re-audit's find: leads/[id] placed the gate INSIDE the
    // try AFTER the findUnique — the only one where an oversized body
    // still paid a DB round-trip before rejection (the gate-before-
    // parse ordering held, the cheap-rejection contract did not). The
    // pin scopes to the seam's OWN handler so the root routes' GET
    // findMany (a different handler, no body parse) stays legitimately
    // out of scope. Carried verbatim onto the s165 seam form: the
    // readBoundedJson call is the rejection point now.
    for (const rel of SEAM_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      const seam = src.indexOf("readBoundedJson(req)");
      expect(seam, `${rel}: no seam call`).toBeGreaterThanOrEqual(0);
      const handlerStarts = [...src.matchAll(/export async function (?:GET|POST|PUT|PATCH|DELETE)/g)]
        .map((m) => m.index ?? 0)
        .filter((i) => i < seam);
      const handlerStart = handlerStarts.length
        ? handlerStarts[handlerStarts.length - 1]
        : 0;
      const between = src.slice(handlerStart, seam);
      expect(between.match(/\bdb\.\w+/g) ?? [], `${rel}: DB work before the seam`).toEqual([]);
    }
    // the users route's param-aware twin
    const users = stripComments(read(USERS_ROUTE) ?? "");
    const seam = users.indexOf("readBoundedJson(request)");
    expect(seam, `${USERS_ROUTE}: no seam call`).toBeGreaterThanOrEqual(0);
    const handlerStarts = [...users.matchAll(/export async function (?:GET|POST|PUT|PATCH|DELETE)/g)]
      .map((m) => m.index ?? 0)
      .filter((i) => i < seam);
    const handlerStart = handlerStarts.length ? handlerStarts[handlerStarts.length - 1] : 0;
    expect(users.slice(handlerStart, seam).match(/\bdb\.\w+/g) ?? [], `${USERS_ROUTE}: DB work before the seam`).toEqual([]);
  });
});
