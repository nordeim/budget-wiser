import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";

// Session-167 pins (F-167k — the schema live-census battery, the 128th
// suite): the L-165c1 live-census doctrine extended to the seam the
// s166 round built. The s166 CRUD-family migration landed TWENTY
// exported schemas in src/lib/schemas.ts (the eight auth-family
// members from s163 + the twelve CRUD/settings/profile members from
// s166) with zero census pins of their own — nothing failed if a
// future edit dropped a field from a route schema (silently WIDENING
// the API: the field would pass unvalidated into the strip) or added
// an unexpected one (silently NARROWING it: previously-valid payloads
// would start 400ing). The s166 round's own next-round candidate list
// named the gap; this battery is the cure:
//
//   THE FIELD-INVENTORY PINS — Object.keys(schema.shape) for every
//   exported object schema, asserted against its exact field list in
//   the route-guard order (the field ORDER is the single-error message
//   equivalence the s166 migration rides — parseBody answers the FIRST
//   issue). A dropped/renamed/reordered field fails the census.
//
//   THE EXPORTED-SCHEMA CENSUS — the `export const …Schema` names read
//   LIVE from the source (the §13.5 drift-net form, acceptable for
//   architecture invariants): a silently un-exported schema, or a new
//   one landing uncensused, fails.
//
//   THE LINE-CENSUS CARRIER PIN — SKILL §7.4's heading claims
//   `src/lib/schemas.ts (N lines)`; the pin reads the file, counts the
//   lines, and demands the doc carry the LIVE number (RED at birth —
//   the doc says 103, the file is 716; GREEN when the doc flips). The
//   count can never drift again because the pin reads the source.
//
// The behavioral contract of each field (the quadrants, the messages,
// the defaults) is pinned by tests/schemas-crud.test.ts + the auth
// family's own battery — this census is the SHAPE drift net, not a
// re-statement of the behavior.

import {
  // the auth family (session-163)
  emailSchema,
  passwordSchema,
  loginSchema,
  signupSchema,
  verifySchema,
  resendSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  // the CRUD family (session-166)
  accountCreateSchema,
  accountUpdateSchema,
  activityCreateSchema,
  activityUpdateSchema,
  contactCreateSchema,
  contactUpdateSchema,
  eventCreateSchema,
  eventUpdateSchema,
  leadCreateSchema,
  leadUpdateSchema,
  settingsUpdateSchema,
  profileUpdateSchema,
} from "../src/lib/schemas";

const SCHEMAS_SRC = "src/lib/schemas.ts";

/** A schema's field inventory, in declaration (guard-ladder) order. */
const fields = (schema: { shape: Record<string, unknown> }): string[] =>
  Object.keys(schema.shape);

describe("session-167 (F-167k): the schema field-inventory live census — the drift guard for the s166 seam", () => {
  // --- the auth family (session-163) --------------------------------

  it("loginSchema's inventory (email → password — the composite-required pair)", () => {
    expect(fields(loginSchema)).toEqual(["email", "password"]);
  });

  it("signupSchema's inventory (name → email → password)", () => {
    expect(fields(signupSchema)).toEqual(["name", "email", "password"]);
  });

  it("verifySchema's inventory (email → code)", () => {
    expect(fields(verifySchema)).toEqual(["email", "code"]);
  });

  it("resendSchema's inventory (email)", () => {
    expect(fields(resendSchema)).toEqual(["email"]);
  });

  it("forgotPasswordSchema's inventory (email)", () => {
    expect(fields(forgotPasswordSchema)).toEqual(["email"]);
  });

  it("resetPasswordSchema's inventory (reset_token → new_password)", () => {
    expect(fields(resetPasswordSchema)).toEqual(["reset_token", "new_password"]);
  });

  it("emailSchema + passwordSchema are the string (non-object) family members the census still names", () => {
    expect(emailSchema).toBeDefined();
    expect(passwordSchema).toBeDefined();
  });

  // --- the CRUD family (session-166) — create side ------------------

  it("accountCreateSchema's inventory (the 10-field guard ladder: name → status → health → ownerId → annualRevenue → employees → industry → email → phone → website)", () => {
    expect(fields(accountCreateSchema)).toEqual([
      "name",
      "status",
      "health",
      "ownerId",
      "annualRevenue",
      "employees",
      "industry",
      "email",
      "phone",
      "website",
    ]);
  });

  it("activityCreateSchema's inventory (the 10-field ladder: subject → type → status → priority → contactId → accountId → dueAt → notes → relatedType → relatedName)", () => {
    expect(fields(activityCreateSchema)).toEqual([
      "subject",
      "type",
      "status",
      "priority",
      "contactId",
      "accountId",
      "dueAt",
      "notes",
      "relatedType",
      "relatedName",
    ]);
  });

  it("contactCreateSchema's inventory (the 14-field ladder: name → email → priority → role → engagementLevel → companySize → status → photoUrl → accountId → ownerId → phone → company → position → source)", () => {
    expect(fields(contactCreateSchema)).toEqual([
      "name",
      "email",
      "priority",
      "role",
      "engagementLevel",
      "companySize",
      "status",
      "photoUrl",
      "accountId",
      "ownerId",
      "phone",
      "company",
      "position",
      "source",
    ]);
  });

  it("eventCreateSchema's inventory (the 12-field ladder: title → startAt → type → status → endAt → contactId → accountId → description → location → relatedType → relatedName → allDay)", () => {
    expect(fields(eventCreateSchema)).toEqual([
      "title",
      "startAt",
      "type",
      "status",
      "endAt",
      "contactId",
      "accountId",
      "description",
      "location",
      "relatedType",
      "relatedName",
      "allDay",
    ]);
  });

  it("leadCreateSchema's inventory (the 12-field ladder: name → stage → source → ownerId → accountId → contactId → value → expectedCloseDate → nextFollowUp → email → phone → company)", () => {
    expect(fields(leadCreateSchema)).toEqual([
      "name",
      "stage",
      "source",
      "ownerId",
      "accountId",
      "contactId",
      "value",
      "expectedCloseDate",
      "nextFollowUp",
      "email",
      "phone",
      "company",
    ]);
  });

  // --- the CRUD family (session-166) — the PUT patch side ------------

  it("accountUpdateSchema's inventory (the create ladder's 10 fields, patch semantics)", () => {
    expect(fields(accountUpdateSchema)).toEqual(fields(accountCreateSchema));
  });

  it("activityUpdateSchema's inventory (the create ladder's 10 fields, patch semantics)", () => {
    expect(fields(activityUpdateSchema)).toEqual(fields(activityCreateSchema));
  });

  it("contactUpdateSchema's inventory (the create ladder's 14 fields, patch semantics)", () => {
    expect(fields(contactUpdateSchema)).toEqual(fields(contactCreateSchema));
  });

  it("eventUpdateSchema's inventory (the create ladder's 12 fields, patch semantics)", () => {
    expect(fields(eventUpdateSchema)).toEqual(fields(eventCreateSchema));
  });

  it("leadUpdateSchema's inventory (the PUT ladder — accountId precedes ownerId here, the route's own guard order, unlike the create form)", () => {
    expect(fields(leadUpdateSchema)).toEqual([
      "name",
      "stage",
      "source",
      "accountId",
      "ownerId",
      "contactId",
      "value",
      "expectedCloseDate",
      "nextFollowUp",
      "email",
      "phone",
      "company",
    ]);
  });

  // --- settings + profile --------------------------------------------

  it("settingsUpdateSchema's inventory (the 11-field quartet ladder: the five listKeys → defaultCurrency → defaultLeadStage → defaultTier → followUpDays → calendarView → firstDayOfWeek)", () => {
    expect(fields(settingsUpdateSchema)).toEqual([
      "contactSources",
      "leadStages",
      "activityTypes",
      "accountTiers",
      "industries",
      "defaultCurrency",
      "defaultLeadStage",
      "defaultTier",
      "followUpDays",
      "calendarView",
      "firstDayOfWeek",
    ]);
  });

  it("profileUpdateSchema's inventory (name → photoUrl — the users PATCH family)", () => {
    expect(fields(profileUpdateSchema)).toEqual(["name", "photoUrl"]);
  });

  // --- the source census ----------------------------------------------

  it("the exported-schema census — exactly the 20 members, in source order (a silent un-export or an uncensused newcomer fails)", () => {
    const src = readFileSync(SCHEMAS_SRC, "utf8");
    const exported = [...src.matchAll(/^export const (\w+Schema) = /gm)].map(
      (m) => m[1],
    );
    expect(exported).toEqual([
      "emailSchema",
      "passwordSchema",
      "loginSchema",
      "signupSchema",
      "verifySchema",
      "resendSchema",
      "forgotPasswordSchema",
      "resetPasswordSchema",
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
    ]);
  });

  it("the line-census carrier — SKILL 7.4's heading carries the LIVE schemas.ts line count (F-167b's root cure: the pin reads the file)", () => {
    const src = readFileSync(SCHEMAS_SRC, "utf8");
    const lineCount = (src.match(/\n/g) ?? []).length;
    const skill = readFileSync("neo-crm_SKILL.md", "utf8");
    expect(
      skill,
      `the 7.4 heading must carry the live count (${lineCount} lines)`,
    ).toContain(`\`src/lib/schemas.ts\` (${lineCount} lines)`);
    // the retired 103-line form (the pre-s166 file) never returns
    expect(skill).not.toContain("`src/lib/schemas.ts` (103 lines)");
  });
});
