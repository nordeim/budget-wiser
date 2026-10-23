import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-166 pins (F-166a — the CRUD family joins the Zod seam): the
// ROUTE-side adoption battery. The schemas' own field contracts live in
// tests/schemas-crud.test.ts; these pins hold the seam form itself:
//
//   THE 11 asString-family routes call parseBody(req, <entity><verb>Schema)
//   (the §7.3 standard shape — the third station) and their patch writes
//   ride the flat `if (body.X !== undefined)` form.
//   THE users PATCH keeps its divergent "Invalid JSON body" null-body
//   message via the route-local readBoundedJson + safeParse form (NOT
//   parseBody, whose null branch answers "Invalid request body" — the
//   s165 zero-message-drift doctrine extended to the whole family).
//   THE reset route keeps its custom confirm form entirely (its null
//   body falls into the 'Type "RESET" to confirm' guard — parseBody's
//   null branch would change that answer).
//   THE guard-family imports retire from the migrated routes (asString
//   and friends stay exported for the query-param GET family — events
//   from/to, the reports/export/search period+q parses — and their
//   behavior battery, tests/coercion-guards.test.ts).
//   THE FK-existence checks + the merged-record invariants stay
//   route-side (§7.3: parseBody → ownership/FK checks → mutation).

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const route = (rel: string) => stripComments(read(rel) ?? "");
const schemaSrc = () => stripComments(read("src/lib/schemas.ts") ?? "");

// The eleven parseBody-family routes (the shared "Invalid request body"
// invalid-body form rides parseBody) — [route, verb, schema name].
const PARSE_ROUTES: Array<[string, string, string]> = [
  ["src/app/api/accounts/route.ts", "POST", "accountCreateSchema"],
  ["src/app/api/accounts/[id]/route.ts", "PUT", "accountUpdateSchema"],
  ["src/app/api/activities/route.ts", "POST", "activityCreateSchema"],
  ["src/app/api/activities/[id]/route.ts", "PUT", "activityUpdateSchema"],
  ["src/app/api/contacts/route.ts", "POST", "contactCreateSchema"],
  ["src/app/api/contacts/[id]/route.ts", "PUT", "contactUpdateSchema"],
  ["src/app/api/events/route.ts", "POST", "eventCreateSchema"],
  ["src/app/api/events/[id]/route.ts", "PUT", "eventUpdateSchema"],
  ["src/app/api/leads/route.ts", "POST", "leadCreateSchema"],
  ["src/app/api/leads/[id]/route.ts", "PUT", "leadUpdateSchema"],
  ["src/app/api/settings/route.ts", "PUT", "settingsUpdateSchema"],
];

// The guard-family imports the migrated routes must NOT carry anymore
// (asDate stays only where a route still parses URL params with it —
// events GET's from/to; asString stays for the reports/export/search
// query-param family, none of which are in the migrated set).
const RETIRED_GUARDS = [
  "isBadFK",
  "isBadString",
  "isBadNumber",
  "isBadDate",
  "isBadBool",
  "asFKId",
  "asNumber",
  "asInt",
  "asString",
  "asDate",
];

describe("session-166: the CRUD family rides the parseBody seam (F-166a)", () => {
  it.each(PARSE_ROUTES)("%s consumes %s through parseBody (the §7.3 third station)", (rel, _verb, schema) => {
    const src = route(rel);
    expect(src, `${rel}: the schema import`).toMatch(new RegExp(`import \\{[^}]*${schema}[^}]*\\} from "@/lib/schemas"`));
    expect(src, `${rel}: the parseBody call`).toMatch(new RegExp(`await parseBody\\(\\s*(?:req|request)\\s*,\\s*${schema}\\s*\\)`));
    expect(src, `${rel}: the guard return`).toMatch(/if \(!parsed\.ok\) return parsed\.response;/);
    // the seam form replaces the s165 readBoundedJson literals — the
    // too-large/invalid-body 400s now ride parseBody (api.ts).
    expect(src, `${rel}: the retired seam literals`).not.toMatch(/readBoundedJson/);
    expect(src, `${rel}: no direct json parse survives`).not.toMatch(/\b(?:req|request)\.json\(\)/);
  });

  it.each(PARSE_ROUTES)("%s carries no guard-family imports anymore (the schema owns the vocabulary)", (rel) => {
    const src = route(rel);
    // events GET still parses the from/to URL params with isBadDate/
    // asDate — the query-param family, EXEMPT from the retirement.
    const exempt = rel.includes("events/route.ts");
    for (const guard of RETIRED_GUARDS) {
      if (exempt && (guard === "isBadDate" || guard === "asDate")) continue;
      expect(src, `${rel}: ${guard} must be retired from the route`).not.toMatch(new RegExp(`\\b${guard}\\b`));
    }
  });

  it("the users PATCH keeps its divergent 'Invalid JSON body' message (the route-local seam form)", () => {
    const src = route("src/app/api/users/route.ts");
    expect(src).toMatch(/readBoundedJson\(request\)/);
    expect(src).toContain('ERR.BAD_REQUEST("Invalid JSON body")');
    // the schema + safeParse — the same issue-to-400 mapping parseBody
    // carries, inlined so the null branch keeps the route's own message.
    expect(src).toMatch(/import \{[^}]*profileUpdateSchema[^}]*\} from "@\/lib\/schemas"/);
    expect(src).toMatch(/profileUpdateSchema\.safeParse/);
    expect(src).not.toMatch(/parseBody\(/);
  });

  it("the reset route keeps its custom confirm form (the null-body fallthrough contract)", () => {
    const src = route("src/app/api/reset/route.ts");
    expect(src).toContain('Type "RESET" to confirm');
    expect(src).not.toMatch(/parseBody\(/);
    expect(src).not.toMatch(/from "@\/lib\/schemas"/);
  });

  it("the FK-existence checks stay route-side (§7.3 — the DB-bound fourth station)", () => {
    for (const [rel] of PARSE_ROUTES) {
      const src = route(rel);
      if (rel.includes("settings")) continue; // no FK fields
      expect(src, `${rel}: the FK existence vocabulary stays in the route`).toMatch(/does not exist/);
    }
    expect(route("src/app/api/accounts/route.ts")).toMatch(/Selected owner does not exist/);
    expect(route("src/app/api/contacts/[id]/route.ts")).toMatch(/Selected company does not exist/);
    expect(route("src/app/api/events/[id]/route.ts")).toMatch(/Selected contact does not exist/);
  });

  it("the events merged-record invariant + the leads stage-derivation stay route-side", () => {
    const put = route("src/app/api/events/[id]/route.ts");
    expect(put).toMatch(/existing\.startAt/);
    expect(put).toMatch(/existing\.endAt/);
    expect(put).toMatch(/effectiveEnd\s*&&\s*effectiveEnd\s*<\s*effectiveStart/);
    expect(route("src/app/api/events/route.ts")).toMatch(/End time must be after start time/);
    const leadPut = route("src/app/api/leads/[id]/route.ts");
    expect(leadPut).toMatch(/existing\.closedAt/);
    expect(leadPut).toMatch(/data\.status = closed/);
  });

  it("leads/[id] normalizes to parseBody-before-404 (the §7.3 ordering its five siblings already carried)", () => {
    const src = route("src/app/api/leads/[id]/route.ts");
    const put = src.slice(src.indexOf("export async function PUT"));
    const parseAt = put.indexOf("await parseBody(req");
    const findAt = put.indexOf("db.lead.findUnique");
    expect(parseAt).toBeGreaterThanOrEqual(0);
    expect(findAt).toBeGreaterThan(parseAt);
  });

  it("schemas.ts carries the twelve CRUD schemas (the seam export census)", () => {
    const src = schemaSrc();
    for (const schema of [
      "accountCreateSchema",
      "accountUpdateSchema",
      "activityCreateSchema",
      "activityUpdateSchema",
      "contactCreateSchema",
      "contactUpdateSchema",
      "eventCreateSchema",
      "eventUpdateSchema",
      "leadCreateSchema",
      "leadUpdateSchema",
      "settingsUpdateSchema",
      "profileUpdateSchema",
    ]) {
      expect(src, `the ${schema} export`).toMatch(new RegExp(`export const ${schema}\\b`));
    }
  });

  it("the settings range literal stays route-side (the pinned s43-P3/S46-P2 superset)", () => {
    expect(route("src/app/api/settings/route.ts")).toContain("days < 0 || days > 90");
    expect(route("src/app/api/settings/route.ts")).toContain("Follow-up days must be between 0 and 90");
  });

  it("the source fields stay membership-free in the schemas (the s48 parity posture)", () => {
    const src = schemaSrc();
    expect(src).not.toMatch(/CONTACT_SOURCE/);
    expect(src).not.toMatch(/LEAD_SOURCE/);
  });

  it("the guard helpers stay exported for the query-param GET family + their behavior battery", async () => {
    const api = await import("@/lib/api");
    for (const helper of ["asString", "asDate", "isBadString", "isBadDate", "isBadNumber", "isBadFK", "isBadBool", "asFKId", "asNumber", "asInt"]) {
      expect(typeof (api as Record<string, unknown>)[helper], `the ${helper} pure seam stays exported`).toBe("function");
    }
    // the query-param consumers still carry them
    expect(route("src/app/api/events/route.ts")).toMatch(/isBadDate\(fromRaw\)/);
    expect(route("src/app/api/reports/route.ts")).toMatch(/asString\(url\.searchParams\.get\("period"\)/);
    expect(route("src/app/api/search/route.ts")).toMatch(/asString\(url\.searchParams\.get\("q"\)/);
    expect(route("src/app/api/export/route.ts")).toMatch(/asString\(url\.searchParams\.get\("period"\)/);
  });
});

// ---------------------------------------------------------------------------
// Session-175 — THE READ HALF: the GET wire-shape contracts (the s371
// close's named candidate; the response side of the routes this suite
// already pins on the request side). The property family
// (tests/property.test.ts P-r/P-s) pins the wire ROUND-TRIP invariants;
// these source pins freeze the SHAPES the routes declare — the include
// select sets the client templates render against, the orderBy contracts
// the rendering order depends on, the envelope discipline (the s42
// doctrine: no raw reads), the opportunities raw-row contract (the s31
// second-deal-model), and the me route's full SessionUser carrier (the
// canonical user shape; the login response's slim 5-field form has ZERO
// consumers — the login card reads only body.ok).
// ---------------------------------------------------------------------------

describe("session-175: the READ half — the GET wire-shape contracts", () => {
  const ACCOUNT_JOIN = String.raw`account:\s*\{\s*select:\s*\{\s*id:\s*true,\s*name:\s*true\s*\}\s*\}`;
  const OWNER_JOIN = String.raw`owner:\s*\{\s*select:\s*\{\s*id:\s*true,\s*name:\s*true,\s*avatarColor:\s*true\s*\}\s*\}`;
  const CONTACT_JOIN = String.raw`contact:\s*\{\s*select:\s*\{\s*id:\s*true,\s*name:\s*true\s*\}\s*\}`;

  it("the five include-carrying routes ship their exact include select sets (the joined wire shapes)", () => {
    // contacts + leads: account + owner
    for (const rel of ["src/app/api/contacts/route.ts", "src/app/api/leads/route.ts"]) {
      const src = route(rel);
      expect(src, `${rel} — the include block`).toMatch(
        new RegExp(`include:\\s*\\{\\s*${ACCOUNT_JOIN},\\s*${OWNER_JOIN},?\\s*\\}`),
      );
    }
    // accounts: owner only (the _count include retired at session-75)
    expect(route("src/app/api/accounts/route.ts")).toMatch(
      new RegExp(`include:\\s*\\{\\s*${OWNER_JOIN},?\\s*\\}`),
    );
    // activities + events: account + contact + owner
    for (const rel of ["src/app/api/activities/route.ts", "src/app/api/events/route.ts"]) {
      const src = route(rel);
      expect(src, `${rel} — the include block`).toMatch(
        new RegExp(`include:\\s*\\{\\s*${ACCOUNT_JOIN},\\s*${CONTACT_JOIN},\\s*${OWNER_JOIN},?\\s*\\}`),
      );
    }
  });

  it("the six list routes' orderBy contracts (the sort orders the client's rendering depends on)", () => {
    expect(route("src/app/api/contacts/route.ts")).toMatch(/orderBy:\s*\{\s*name:\s*"asc"\s*\}/);
    expect(route("src/app/api/leads/route.ts")).toMatch(/orderBy:\s*\{\s*createdAt:\s*"desc"\s*\}/);
    expect(route("src/app/api/accounts/route.ts")).toMatch(/orderBy:\s*\[\s*\{\s*name:\s*"asc"\s*\}\s*\]/);
    expect(route("src/app/api/activities/route.ts")).toMatch(
      /orderBy:\s*\[\s*\{\s*dueAt:\s*"asc"\s*\},\s*\{\s*createdAt:\s*"desc"\s*\}\s*\]/,
    );
    // events: startAt desc (the L-76c4 bundle-decoded reference order)
    expect(route("src/app/api/events/route.ts")).toMatch(/orderBy:\s*\{\s*startAt:\s*"desc"\s*\}/);
    expect(route("src/app/api/opportunities/route.ts")).toMatch(/orderBy:\s*\{\s*createdAt:\s*"desc"\s*\}/);
  });

  it("every GET list answers through the envelope (the s42 doctrine — findMany feeds return ok)", () => {
    const pairs: Array<[string, RegExp]> = [
      ["src/app/api/contacts/route.ts", /const contacts = await db\.contact\.findMany[\s\S]*?return ok\(contacts\);/],
      ["src/app/api/leads/route.ts", /const leads = await db\.lead\.findMany[\s\S]*?return ok\(leads\);/],
      ["src/app/api/accounts/route.ts", /const accounts = await db\.account\.findMany[\s\S]*?return ok\(accounts\);/],
      ["src/app/api/activities/route.ts", /const activities = await db\.activity\.findMany[\s\S]*?return ok\(activities\);/],
      ["src/app/api/events/route.ts", /const events = await db\.event\.findMany[\s\S]*?return ok\(events\);/],
      ["src/app/api/opportunities/route.ts", /const opportunities = await db\.opportunity\.findMany[\s\S]*?return ok\(opportunities\);/],
    ];
    for (const [rel, re] of pairs) {
      expect(route(rel), `${rel} — the envelope read`).toMatch(re);
    }
  });

  it("opportunities ships RAW rows — no include (the s31 second-deal-model: owner is a NAME string)", () => {
    const src = route("src/app/api/opportunities/route.ts");
    expect(src).toMatch(/db\.opportunity\.findMany\(\{\s*orderBy:\s*\{\s*createdAt:\s*"desc"\s*\},?\s*\}\)/);
    expect(src).not.toMatch(/include:/);
  });

  it("auth/me ships the full SessionUser shape (the canonical user carrier — photoUrl included)", () => {
    // the me route answers through the envelope with the session user
    expect(route("src/app/api/auth/me/route.ts")).toMatch(/return ok\(user\);/);
    // the projection carries every SessionUser field — photoUrl is the
    // load-bearing member (the topbar avatar's photo round-trip)
    const auth = stripComments(read("src/lib/auth.ts") ?? "");
    expect(auth).toMatch(
      /return\s*\{\s*id:\s*user\.id,\s*email:\s*user\.email,\s*name:\s*user\.name,\s*avatarColor:\s*user\.avatarColor,\s*photoUrl:\s*user\.photoUrl,\s*role:\s*user\.role,?\s*\};/,
    );
  });
});
