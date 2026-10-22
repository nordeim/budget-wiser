import { describe, expect, it } from "vitest";

// Session-166 pins (F-166a — the CRUD family joins the Zod seam): the
// schema contract battery for the twelve migrated routes' schemas. The
// auth family's schemas shipped at s163 with the zero-message-drift
// doctrine; this battery extends it to the CRUD family — every 400
// message the hand-rolled guards answered is answered VERBATIM by the
// schema form, and every default/clear/absent quadrant keeps the
// route's exact semantics:
//
//   CREATE defaults — absent/null/""/whitespace keep the schema default
//   ("active"/"Healthy"/"new"/"call"/"meeting"/"Standard"/"scheduled"…
//   — the asString-optional ?? default form).
//   PUT three-state — absent → undefined (no write), null/"" → null
//   (the explicit clear), a value → the trimmed value (the "X" in body
//   + asFKId/asString-optional ?? null form).
//   Required-on-present — the PUT enums + name/title/subject: absent →
//   undefined, null/""/garbage → the route's message (the non-optional
//   asString + membership form).
//
// The field ORDER of each object schema matches the route's guard
// order (parseBody answers the FIRST issue — the single-error message
// equivalence the migration rides). The caps convert from the
// asString silent-truncate to the honest .max() reject (F-166a3 — the
// s163 email precedent; new "must be reasonably sized" messages, never
// a change to an existing one).
//
// The batteries that pin the ROUTE side of the seam (the parseBody
// call forms, the guard-import retirement, the FK-existence tail)
// live in tests/crud-zod-seam.test.ts.

import {
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
} from "@/lib/schemas";

/** A minimal structural view of a schema's safeParse result. */
type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: Array<{ message: string }> } };

/** The first issue's message of a failed parse (parseBody's 400). */
function firstMessage(schema: { safeParse: (v: unknown) => ParseResult<unknown> }, input: unknown): string {
  const r = schema.safeParse(input);
  if (r.success) throw new Error(`expected ${JSON.stringify(input)} to REJECT`);
  return r.error.issues[0].message;
}

/** The parsed output of a successful parse. */
function out<T>(schema: { safeParse: (v: unknown) => ParseResult<T> }, input: unknown): T {
  const r = schema.safeParse(input);
  if (!r.success) throw new Error(`expected ${JSON.stringify(input)} to PASS: ${r.error.issues[0]?.message}`);
  return r.data;
}

// ---------------------------------------------------------------------------
// The accounts family
// ---------------------------------------------------------------------------

describe("session-166: accountCreateSchema (the accounts POST guard ladder, verbatim)", () => {
  const base = { name: "Acme" };

  it("name: required, trimmed, 120 — the required message for every bad shape", () => {
    expect(firstMessage(accountCreateSchema, {})).toBe("Account name is required");
    expect(firstMessage(accountCreateSchema, { name: null })).toBe("Account name is required");
    expect(firstMessage(accountCreateSchema, { name: "" })).toBe("Account name is required");
    expect(firstMessage(accountCreateSchema, { name: "   " })).toBe("Account name is required");
    expect(firstMessage(accountCreateSchema, { name: 123 })).toBe("Account name is required");
    expect(out(accountCreateSchema, { name: "  Acme Corp " }).name).toBe("Acme Corp");
  });

  it("status: absent/null/empty keep 'active'; garbage and non-strings answer 'Invalid status'", () => {
    expect(out(accountCreateSchema, base).status).toBe("active");
    expect(out(accountCreateSchema, { ...base, status: null }).status).toBe("active");
    expect(out(accountCreateSchema, { ...base, status: "" }).status).toBe("active");
    expect(out(accountCreateSchema, { ...base, status: "  " }).status).toBe("active");
    expect(out(accountCreateSchema, { ...base, status: " prospect " }).status).toBe("prospect");
    expect(firstMessage(accountCreateSchema, { ...base, status: "banana" })).toBe("Invalid status");
    expect(firstMessage(accountCreateSchema, { ...base, status: 9 })).toBe("Invalid status");
  });

  it("health: absent keeps 'Healthy'; garbage answers 'Invalid health status'", () => {
    expect(out(accountCreateSchema, base).health).toBe("Healthy");
    expect(out(accountCreateSchema, { ...base, health: "" }).health).toBe("Healthy");
    expect(out(accountCreateSchema, { ...base, health: "At Risk" }).health).toBe("At Risk");
    expect(firstMessage(accountCreateSchema, { ...base, health: "banana" })).toBe("Invalid health status");
    expect(firstMessage(accountCreateSchema, { ...base, health: 9 })).toBe("Invalid health status");
  });

  it("ownerId: absent → null (the create-form fill), null/empty → null (the clear), strings trim; non-strings answer 'Invalid owner selection'", () => {
    expect(out(accountCreateSchema, base).ownerId).toBeNull();
    expect(out(accountCreateSchema, { ...base, ownerId: null }).ownerId).toBeNull();
    expect(out(accountCreateSchema, { ...base, ownerId: "" }).ownerId).toBeNull();
    expect(out(accountCreateSchema, { ...base, ownerId: "  u1 " }).ownerId).toBe("u1");
    expect(firstMessage(accountCreateSchema, { ...base, ownerId: 123 })).toBe("Invalid owner selection");
  });

  it("annualRevenue/employees: null/empty → null, numbers and numeric strings pass, garbage answers the number vocabulary", () => {
    expect(out(accountCreateSchema, base).annualRevenue).toBeNull();
    expect(out(accountCreateSchema, { ...base, annualRevenue: null }).annualRevenue).toBeNull();
    expect(out(accountCreateSchema, { ...base, annualRevenue: "" }).annualRevenue).toBeNull();
    expect(out(accountCreateSchema, { ...base, annualRevenue: 5 }).annualRevenue).toBe(5);
    expect(out(accountCreateSchema, { ...base, annualRevenue: " 12 " }).annualRevenue).toBe(12);
    expect(firstMessage(accountCreateSchema, { ...base, annualRevenue: "abc" })).toBe("Invalid annual revenue");
    expect(firstMessage(accountCreateSchema, { ...base, annualRevenue: true })).toBe("Invalid annual revenue");
    // employees truncates (the asInt contract) — 5.9 stores 5.
    expect(out(accountCreateSchema, { ...base, employees: 5.9 }).employees).toBe(5);
    expect(out(accountCreateSchema, { ...base, employees: "7" }).employees).toBe(7);
    expect(firstMessage(accountCreateSchema, { ...base, employees: [] })).toBe("Invalid employee count");
  });

  it("industry/email/phone/website: the clearable-string quadrants with each field's own type message", () => {
    expect(out(accountCreateSchema, { ...base, industry: " Tech " }).industry).toBe("Tech");
    expect(out(accountCreateSchema, { ...base, industry: "" }).industry).toBeNull();
    expect(firstMessage(accountCreateSchema, { ...base, industry: 9 })).toBe("Invalid industry");
    expect(firstMessage(accountCreateSchema, { ...base, email: 9 })).toBe("Invalid email");
    expect(firstMessage(accountCreateSchema, { ...base, phone: 9 })).toBe("Invalid phone number");
    expect(firstMessage(accountCreateSchema, { ...base, website: 9 })).toBe("Invalid website");
    expect(out(accountCreateSchema, { ...base, email: " a@b.co " }).email).toBe("a@b.co");
  });

  it("field order follows the route's guard order — a multi-error body answers the FIRST checked field's message", () => {
    // Route order: name → status → health → … an empty name beats a bad status.
    expect(firstMessage(accountCreateSchema, { name: "", status: 9 })).toBe("Account name is required");
    // A bad status beats a bad health (status is checked first).
    expect(firstMessage(accountCreateSchema, { name: "x", status: 9, health: 9 })).toBe("Invalid status");
  });

  it("a non-object body answers the route's first-field message (the asString-on-array contract)", () => {
    expect(firstMessage(accountCreateSchema, [1, 2, 3])).toBe("Account name is required");
    expect(firstMessage(accountCreateSchema, "str")).toBe("Account name is required");
  });
});

describe("session-166: accountUpdateSchema (the accounts/[id] PUT patch semantics)", () => {
  it("name is required-on-present: absent → undefined, null/empty → the required message", () => {
    expect(out(accountUpdateSchema, {}).name).toBeUndefined();
    expect(firstMessage(accountUpdateSchema, { name: null })).toBe("Account name is required");
    expect(firstMessage(accountUpdateSchema, { name: "" })).toBe("Account name is required");
    expect(out(accountUpdateSchema, { name: " Acme " }).name).toBe("Acme");
  });

  it("status/health are required-on-present enums (a present '' is a bad value, not a clear)", () => {
    expect(out(accountUpdateSchema, {}).status).toBeUndefined();
    expect(firstMessage(accountUpdateSchema, { status: null })).toBe("Invalid status");
    expect(firstMessage(accountUpdateSchema, { status: "" })).toBe("Invalid status");
    expect(firstMessage(accountUpdateSchema, { status: "banana" })).toBe("Invalid status");
    expect(out(accountUpdateSchema, { status: "active" }).status).toBe("active");
    expect(firstMessage(accountUpdateSchema, { health: "" })).toBe("Invalid health status");
    expect(out(accountUpdateSchema, { health: "At Risk" }).health).toBe("At Risk");
  });

  it("the clearable family keeps the three-state contract (absent/undefined · null-clear · value)", () => {
    expect(out(accountUpdateSchema, {}).industry).toBeUndefined();
    expect(out(accountUpdateSchema, { industry: null }).industry).toBeNull();
    expect(out(accountUpdateSchema, { industry: " Tech " }).industry).toBe("Tech");
    expect(out(accountUpdateSchema, { annualRevenue: null }).annualRevenue).toBeNull();
    expect(out(accountUpdateSchema, { employees: "7" }).employees).toBe(7);
    expect(out(accountUpdateSchema, { ownerId: "" }).ownerId).toBeNull();
    expect(firstMessage(accountUpdateSchema, { ownerId: {} })).toBe("Invalid owner selection");
  });
});

// ---------------------------------------------------------------------------
// The activities family
// ---------------------------------------------------------------------------

describe("session-166: activityCreateSchema (the activities POST guard ladder)", () => {
  const base = { subject: "Call" };

  it("subject is required ('Activity details are required') and the three classifier enums keep their create defaults", () => {
    expect(firstMessage(activityCreateSchema, {})).toBe("Activity details are required");
    expect(firstMessage(activityCreateSchema, { subject: "  " })).toBe("Activity details are required");
    const d = out(activityCreateSchema, base);
    expect(d.type).toBe("call");
    expect(d.status).toBe("scheduled");
    expect(d.priority).toBe("normal");
    expect(out(activityCreateSchema, { ...base, type: "" }).type).toBe("call");
    expect(out(activityCreateSchema, { ...base, priority: null }).priority).toBe("normal");
  });

  it("the classifier enums answer their own messages for garbage and non-strings", () => {
    expect(firstMessage(activityCreateSchema, { ...base, type: "banana" })).toBe("Invalid activity type");
    expect(firstMessage(activityCreateSchema, { ...base, type: 9 })).toBe("Invalid activity type");
    expect(firstMessage(activityCreateSchema, { ...base, status: "banana" })).toBe("Invalid status");
    expect(firstMessage(activityCreateSchema, { ...base, priority: "banana" })).toBe("Invalid priority");
  });

  it("contactId/accountId FK quadrants + dueAt's date contract ('Invalid due date' for unparseable/non-string)", () => {
    expect(out(activityCreateSchema, { ...base, contactId: " c1 " }).contactId).toBe("c1");
    expect(firstMessage(activityCreateSchema, { ...base, contactId: 9 })).toBe("Invalid contact selection");
    expect(firstMessage(activityCreateSchema, { ...base, accountId: 9 })).toBe("Invalid company selection");
    expect(out(activityCreateSchema, base).dueAt).toBeNull();
    expect(out(activityCreateSchema, { ...base, dueAt: null }).dueAt).toBeNull();
    expect(out(activityCreateSchema, { ...base, dueAt: "2026-01-02T10:00:00Z" }).dueAt).toBeInstanceOf(Date);
    expect(firstMessage(activityCreateSchema, { ...base, dueAt: "junk" })).toBe("Invalid due date");
    expect(firstMessage(activityCreateSchema, { ...base, dueAt: 9 })).toBe("Invalid due date");
  });

  it("notes/relatedType/relatedName clearable strings with their own type messages", () => {
    expect(out(activityCreateSchema, { ...base, notes: " x " }).notes).toBe("x");
    expect(out(activityCreateSchema, { ...base, notes: "" }).notes).toBeNull();
    expect(firstMessage(activityCreateSchema, { ...base, notes: 9 })).toBe("Invalid notes");
    expect(firstMessage(activityCreateSchema, { ...base, relatedType: 9 })).toBe("Invalid related type");
    expect(firstMessage(activityCreateSchema, { ...base, relatedName: 9 })).toBe("Invalid related name");
  });
});

describe("session-166: activityUpdateSchema (the activities/[id] PUT patch semantics)", () => {
  it("subject required-on-present, the enums required-on-present, the FK/dates three-state", () => {
    expect(out(activityUpdateSchema, {}).subject).toBeUndefined();
    expect(firstMessage(activityUpdateSchema, { subject: null })).toBe("Activity details are required");
    expect(firstMessage(activityUpdateSchema, { status: "" })).toBe("Invalid status");
    expect(firstMessage(activityUpdateSchema, { type: 9 })).toBe("Invalid activity type");
    expect(out(activityUpdateSchema, { status: "completed" }).status).toBe("completed");
    expect(out(activityUpdateSchema, { dueAt: null }).dueAt).toBeNull();
    expect(out(activityUpdateSchema, { contactId: "" }).contactId).toBeNull();
    expect(firstMessage(activityUpdateSchema, { accountId: true })).toBe("Invalid company selection");
  });
});

// ---------------------------------------------------------------------------
// The events family
// ---------------------------------------------------------------------------

describe("session-166: eventCreateSchema (the events POST guard ladder)", () => {
  const base = { title: "Demo", startAt: "2026-01-02T10:00:00Z" };

  it("title + startAt are required — every bad shape answers each required message", () => {
    expect(firstMessage(eventCreateSchema, {})).toBe("Event title is required");
    expect(firstMessage(eventCreateSchema, { title: "  " })).toBe("Event title is required");
    expect(firstMessage(eventCreateSchema, { title: "x" })).toBe("Start date and time are required");
    expect(firstMessage(eventCreateSchema, { title: "x", startAt: null })).toBe("Start date and time are required");
    expect(firstMessage(eventCreateSchema, { title: "x", startAt: "junk" })).toBe("Start date and time are required");
    expect(firstMessage(eventCreateSchema, { title: "x", startAt: 9 })).toBe("Start date and time are required");
    expect(out(eventCreateSchema, base).startAt).toBeInstanceOf(Date);
  });

  it("type/status keep their create defaults; endAt is the clearable date ('Invalid end date')", () => {
    expect(out(eventCreateSchema, base).type).toBe("meeting");
    expect(out(eventCreateSchema, base).status).toBe("scheduled");
    expect(out(eventCreateSchema, { ...base, type: "" }).type).toBe("meeting");
    expect(firstMessage(eventCreateSchema, { ...base, type: "banana" })).toBe("Invalid event type");
    expect(firstMessage(eventCreateSchema, { ...base, status: "banana" })).toBe("Invalid status");
    expect(out(eventCreateSchema, base).endAt).toBeNull();
    expect(out(eventCreateSchema, { ...base, endAt: null }).endAt).toBeNull();
    expect(firstMessage(eventCreateSchema, { ...base, endAt: "junk" })).toBe("Invalid end date");
  });

  it("allDay: absent/null → false semantics, non-booleans answer 'Invalid all-day flag'", () => {
    expect(out(eventCreateSchema, base).allDay).toBe(false);
    expect(out(eventCreateSchema, { ...base, allDay: null }).allDay).toBe(false);
    expect(out(eventCreateSchema, { ...base, allDay: true }).allDay).toBe(true);
    expect(firstMessage(eventCreateSchema, { ...base, allDay: "yes" })).toBe("Invalid all-day flag");
  });

  it("description/location/relatedType/relatedName clearable with their type messages", () => {
    expect(firstMessage(eventCreateSchema, { ...base, description: 9 })).toBe("Invalid description");
    expect(firstMessage(eventCreateSchema, { ...base, location: 9 })).toBe("Invalid location");
    expect(firstMessage(eventCreateSchema, { ...base, relatedType: 9 })).toBe("Invalid related type");
    expect(firstMessage(eventCreateSchema, { ...base, relatedName: 9 })).toBe("Invalid related name");
    expect(out(eventCreateSchema, { ...base, location: " Room 5 " }).location).toBe("Room 5");
  });
});

describe("session-166: eventUpdateSchema (the events/[id] PUT patch semantics)", () => {
  it("title/startAt required-on-present, endAt clearable, allDay null→false (the === true idiom)", () => {
    expect(out(eventUpdateSchema, {}).title).toBeUndefined();
    expect(firstMessage(eventUpdateSchema, { title: "" })).toBe("Event title is required");
    expect(firstMessage(eventUpdateSchema, { startAt: null })).toBe("Start date and time are required");
    expect(out(eventUpdateSchema, { startAt: "2026-01-02T10:00:00Z" }).startAt).toBeInstanceOf(Date);
    expect(out(eventUpdateSchema, { endAt: null }).endAt).toBeNull();
    expect(out(eventUpdateSchema, { allDay: null }).allDay).toBe(false);
    expect(firstMessage(eventUpdateSchema, { allDay: "yes" })).toBe("Invalid all-day flag");
    expect(firstMessage(eventUpdateSchema, { type: "" })).toBe("Invalid event type");
  });
});

// ---------------------------------------------------------------------------
// The leads family
// ---------------------------------------------------------------------------

describe("session-166: leadCreateSchema (the leads POST guard ladder)", () => {
  const base = { name: "Deal" };

  it("name required ('Lead name is required'); stage keeps the 'new' default + the enum message", () => {
    expect(firstMessage(leadCreateSchema, {})).toBe("Lead name is required");
    expect(firstMessage(leadCreateSchema, { name: 9 })).toBe("Lead name is required");
    expect(out(leadCreateSchema, base).stage).toBe("new");
    expect(out(leadCreateSchema, { ...base, stage: null }).stage).toBe("new");
    expect(out(leadCreateSchema, { ...base, stage: " proposal " }).stage).toBe("proposal");
    expect(firstMessage(leadCreateSchema, { ...base, stage: "banana" })).toBe("Invalid stage");
    expect(firstMessage(leadCreateSchema, { ...base, stage: 9 })).toBe("Invalid stage");
  });

  it("source stays FREE-FORM (string-ness + cap only — the s48 parity posture, no membership)", () => {
    // Any arbitrary string passes the source field (the membership-free
    // contract; the vocabulary pins live in crud-zod-seam.test.ts).
    expect(out(leadCreateSchema, { ...base, source: " cold call " }).source).toBe("cold call");
    expect(out(leadCreateSchema, { ...base, source: "Partner" }).source).toBe("Partner");
    expect(firstMessage(leadCreateSchema, { ...base, source: 9 })).toBe("Invalid source");
  });

  it("the FK trio + value/expectedCloseDate/nextFollowUp quadrants", () => {
    expect(firstMessage(leadCreateSchema, { ...base, ownerId: 9 })).toBe("Invalid owner selection");
    expect(firstMessage(leadCreateSchema, { ...base, accountId: 9 })).toBe("Invalid company selection");
    expect(firstMessage(leadCreateSchema, { ...base, contactId: 9 })).toBe("Invalid contact selection");
    expect(out(leadCreateSchema, { ...base, value: "5" }).value).toBe(5);
    expect(out(leadCreateSchema, { ...base, value: null }).value).toBeNull();
    expect(firstMessage(leadCreateSchema, { ...base, value: "abc" })).toBe("Invalid value");
    expect(firstMessage(leadCreateSchema, { ...base, expectedCloseDate: "junk" })).toBe("Invalid expected close date");
    expect(firstMessage(leadCreateSchema, { ...base, nextFollowUp: 9 })).toBe("Invalid follow-up date");
    expect(out(leadCreateSchema, { ...base, expectedCloseDate: "2026-06-01" }).expectedCloseDate).toBeInstanceOf(Date);
  });

  it("email/phone/company clearable with their type messages", () => {
    expect(firstMessage(leadCreateSchema, { ...base, email: 9 })).toBe("Invalid email");
    expect(firstMessage(leadCreateSchema, { ...base, phone: 9 })).toBe("Invalid phone number");
    expect(firstMessage(leadCreateSchema, { ...base, company: 9 })).toBe("Invalid company");
  });
});

describe("session-166: leadUpdateSchema (the leads/[id] PUT patch semantics)", () => {
  it("the patch contract: required-on-present name/stage, three-state FK/dates/value", () => {
    expect(out(leadUpdateSchema, {}).name).toBeUndefined();
    expect(firstMessage(leadUpdateSchema, { name: "" })).toBe("Lead name is required");
    expect(firstMessage(leadUpdateSchema, { stage: "" })).toBe("Invalid stage");
    expect(out(leadUpdateSchema, { stage: "won" }).stage).toBe("won");
    expect(out(leadUpdateSchema, { value: null }).value).toBeNull();
    expect(out(leadUpdateSchema, { contactId: "" }).contactId).toBeNull();
    expect(out(leadUpdateSchema, { expectedCloseDate: null }).expectedCloseDate).toBeNull();
    expect(firstMessage(leadUpdateSchema, { source: 9 })).toBe("Invalid source");
  });
});

// ---------------------------------------------------------------------------
// The contacts family
// ---------------------------------------------------------------------------

describe("session-166: contactCreateSchema (the contacts POST guard ladder)", () => {
  const base = { name: "Jane" };

  it("name required ('Name is required'); email regex on the trimmed value", () => {
    expect(firstMessage(contactCreateSchema, {})).toBe("Name is required");
    expect(out(contactCreateSchema, { ...base, email: " jane@x.co " }).email).toBe("jane@x.co");
    expect(firstMessage(contactCreateSchema, { ...base, email: "not-an-email" })).toBe("Enter a valid email address");
    expect(firstMessage(contactCreateSchema, { ...base, email: 9 })).toBe("Invalid email");
    expect(out(contactCreateSchema, { ...base, email: "" }).email).toBeNull();
  });

  it("priority: the 'Standard' default, the legacy hot/warm/cold mapping, the membership message", () => {
    expect(out(contactCreateSchema, base).priority).toBe("Standard");
    expect(out(contactCreateSchema, { ...base, priority: "" }).priority).toBe("Standard");
    expect(out(contactCreateSchema, { ...base, priority: "hot" }).priority).toBe("Key");
    expect(out(contactCreateSchema, { ...base, priority: "warm" }).priority).toBe("Standard");
    expect(out(contactCreateSchema, { ...base, priority: "cold" }).priority).toBe("At Risk");
    expect(out(contactCreateSchema, { ...base, priority: " At Risk " }).priority).toBe("At Risk");
    expect(firstMessage(contactCreateSchema, { ...base, priority: "banana" })).toBe("Invalid priority");
    expect(firstMessage(contactCreateSchema, { ...base, priority: 9 })).toBe("Invalid priority");
  });

  it("role/engagementLevel/companySize are OPTIONAL enums (absent → null, NOT a default)", () => {
    expect(out(contactCreateSchema, base).role).toBeNull();
    expect(out(contactCreateSchema, { ...base, role: "" }).role).toBeNull();
    expect(out(contactCreateSchema, { ...base, role: " Influencer " }).role).toBe("Influencer");
    expect(firstMessage(contactCreateSchema, { ...base, role: "banana" })).toBe("Invalid role");
    expect(firstMessage(contactCreateSchema, { ...base, role: 9 })).toBe("Invalid role");
    expect(out(contactCreateSchema, base).engagementLevel).toBeNull();
    expect(firstMessage(contactCreateSchema, { ...base, engagementLevel: "banana" })).toBe("Invalid engagement level");
    expect(out(contactCreateSchema, base).companySize).toBeNull();
    expect(firstMessage(contactCreateSchema, { ...base, companySize: "banana" })).toBe("Invalid company size");
  });

  it("status keeps the 'active' create default; photoUrl carries the prefix contract", () => {
    expect(out(contactCreateSchema, base).status).toBe("active");
    expect(out(contactCreateSchema, { ...base, status: "" }).status).toBe("active");
    expect(firstMessage(contactCreateSchema, { ...base, status: "banana" })).toBe("Invalid status");
    expect(out(contactCreateSchema, base).photoUrl).toBeNull();
    expect(out(contactCreateSchema, { ...base, photoUrl: "https://cdn.x/a.png" }).photoUrl).toBe("https://cdn.x/a.png");
    expect(out(contactCreateSchema, { ...base, photoUrl: "/api/uploads/abc.png" }).photoUrl).toBe("/api/uploads/abc.png");
    expect(firstMessage(contactCreateSchema, { ...base, photoUrl: "http://x" })).toBe("Invalid photo URL");
    expect(firstMessage(contactCreateSchema, { ...base, photoUrl: "javascript:alert(1)" })).toBe("Invalid photo URL");
    expect(firstMessage(contactCreateSchema, { ...base, photoUrl: 999 })).toBe("Invalid photo URL");
  });

  it("phone/company/position/source clearable (source free-form) with their type messages", () => {
    expect(firstMessage(contactCreateSchema, { ...base, phone: 9 })).toBe("Invalid phone number");
    expect(firstMessage(contactCreateSchema, { ...base, company: 9 })).toBe("Invalid company");
    expect(firstMessage(contactCreateSchema, { ...base, position: 9 })).toBe("Invalid position");
    expect(firstMessage(contactCreateSchema, { ...base, source: 9 })).toBe("Invalid source");
    expect(out(contactCreateSchema, { ...base, source: "Email" }).source).toBe("Email");
  });
});

describe("session-166: contactUpdateSchema (the contacts/[id] PUT patch semantics)", () => {
  it("the patch contract: required-on-present name/status/priority, three-state optional enums + photoUrl", () => {
    expect(out(contactUpdateSchema, {}).name).toBeUndefined();
    expect(firstMessage(contactUpdateSchema, { name: null })).toBe("Name is required");
    expect(firstMessage(contactUpdateSchema, { status: "" })).toBe("Invalid status");
    expect(firstMessage(contactUpdateSchema, { priority: "" })).toBe("Invalid priority");
    expect(out(contactUpdateSchema, { priority: "hot" }).priority).toBe("Key");
    expect(out(contactUpdateSchema, { role: null }).role).toBeNull();
    expect(out(contactUpdateSchema, { photoUrl: null }).photoUrl).toBeNull();
    expect(firstMessage(contactUpdateSchema, { photoUrl: "data:image/png;base64,x" })).toBe("Invalid photo URL");
    expect(firstMessage(contactUpdateSchema, { email: "not-an-email" })).toBe("Enter a valid email address");
  });
});

// ---------------------------------------------------------------------------
// The settings family
// ---------------------------------------------------------------------------

describe("session-166: settingsUpdateSchema (the settings PUT guard ladder)", () => {
  it("the five picklists: absent → undefined; arrays of non-empty trimmed labels; each key's own message", () => {
    expect(out(settingsUpdateSchema, {}).contactSources).toBeUndefined();
    expect(out(settingsUpdateSchema, { contactSources: [" Email ", "Phone"] }).contactSources).toEqual(["Email", "Phone"]);
    expect(firstMessage(settingsUpdateSchema, { contactSources: null })).toBe("contactSources must be a list of non-empty labels");
    expect(firstMessage(settingsUpdateSchema, { contactSources: "Email" })).toBe("contactSources must be a list of non-empty labels");
    expect(firstMessage(settingsUpdateSchema, { contactSources: [""] })).toBe("contactSources must be a list of non-empty labels");
    expect(firstMessage(settingsUpdateSchema, { leadStages: [9] })).toBe("leadStages must be a list of non-empty labels");
    expect(firstMessage(settingsUpdateSchema, { activityTypes: [{ a: 1 }] })).toBe("activityTypes must be a list of non-empty labels");
    expect(firstMessage(settingsUpdateSchema, { industries: ["x".repeat(61)] })).toBe("industries must be a list of non-empty labels");
    expect(firstMessage(settingsUpdateSchema, { accountTiers: Array.from({ length: 41 }, (_, i) => `t${i}`) })).toBe("accountTiers is limited to 40 entries");
    expect(out(settingsUpdateSchema, { contactSources: [] }).contactSources).toEqual([]);
  });

  it("the quartet keeps absent→undefined (no write) with null/'' → the null default the route fills", () => {
    expect(out(settingsUpdateSchema, {}).defaultCurrency).toBeUndefined();
    expect(out(settingsUpdateSchema, { defaultCurrency: null }).defaultCurrency).toBeNull();
    expect(out(settingsUpdateSchema, { defaultCurrency: "" }).defaultCurrency).toBeNull();
    expect(out(settingsUpdateSchema, { defaultCurrency: " aed " }).defaultCurrency).toBe("aed");
    expect(firstMessage(settingsUpdateSchema, { defaultCurrency: 9 })).toBe("Invalid currency");
    expect(out(settingsUpdateSchema, { defaultLeadStage: null }).defaultLeadStage).toBeNull();
    expect(firstMessage(settingsUpdateSchema, { defaultLeadStage: "banana" })).toBe("Default lead stage must be a valid stage");
    expect(firstMessage(settingsUpdateSchema, { defaultLeadStage: 9 })).toBe("Invalid default lead stage");
    expect(out(settingsUpdateSchema, { defaultTier: null }).defaultTier).toBeNull();
    expect(firstMessage(settingsUpdateSchema, { defaultTier: "D" })).toBe("Default account tier must be A, B or C");
    expect(firstMessage(settingsUpdateSchema, { defaultTier: 9 })).toBe("Invalid default tier");
    expect(out(settingsUpdateSchema, { defaultLeadStage: "new" }).defaultLeadStage).toBe("new");
  });

  it("followUpDays: int truncation, null/'' → null (the route's ?? 3), the type message", () => {
    expect(out(settingsUpdateSchema, {}).followUpDays).toBeUndefined();
    expect(out(settingsUpdateSchema, { followUpDays: null }).followUpDays).toBeNull();
    expect(out(settingsUpdateSchema, { followUpDays: "" }).followUpDays).toBeNull();
    expect(out(settingsUpdateSchema, { followUpDays: 5.9 }).followUpDays).toBe(5);
    expect(out(settingsUpdateSchema, { followUpDays: "7" }).followUpDays).toBe(7);
    expect(firstMessage(settingsUpdateSchema, { followUpDays: "abc" })).toBe("Invalid follow-up days");
    expect(firstMessage(settingsUpdateSchema, { followUpDays: true })).toBe("Invalid follow-up days");
  });

  it("calendarView + firstDayOfWeek (required-on-present with their two-message vocabularies)", () => {
    expect(out(settingsUpdateSchema, {}).calendarView).toBeUndefined();
    expect(out(settingsUpdateSchema, { calendarView: null }).calendarView).toBeNull();
    expect(out(settingsUpdateSchema, { calendarView: "" }).calendarView).toBeNull();
    expect(firstMessage(settingsUpdateSchema, { calendarView: "agenda" })).toBe("Calendar view must be month or week");
    expect(firstMessage(settingsUpdateSchema, { calendarView: 9 })).toBe("Invalid calendar view");
    expect(out(settingsUpdateSchema, {}).firstDayOfWeek).toBeUndefined();
    expect(firstMessage(settingsUpdateSchema, { firstDayOfWeek: null })).toBe("First day of week must be monday or sunday");
    expect(firstMessage(settingsUpdateSchema, { firstDayOfWeek: "friday" })).toBe("First day of week must be monday or sunday");
    expect(firstMessage(settingsUpdateSchema, { firstDayOfWeek: 9 })).toBe("Invalid first day of week");
    expect(out(settingsUpdateSchema, { firstDayOfWeek: " monday " }).firstDayOfWeek).toBe("monday");
  });
});

// ---------------------------------------------------------------------------
// The users profile family
// ---------------------------------------------------------------------------

describe("session-166: profileUpdateSchema (the users PATCH guard ladder)", () => {
  it("name: the ≥2 rule with the route's message; photoUrl: three-state + prefix + trim", () => {
    expect(firstMessage(profileUpdateSchema, {})).toBe("Name must be at least 2 characters");
    expect(firstMessage(profileUpdateSchema, { name: "x" })).toBe("Name must be at least 2 characters");
    expect(firstMessage(profileUpdateSchema, { name: null })).toBe("Name must be at least 2 characters");
    expect(firstMessage(profileUpdateSchema, { name: 9 })).toBe("Name must be at least 2 characters");
    expect(out(profileUpdateSchema, { name: " Jane Doe " }).name).toBe("Jane Doe");
    expect(out(profileUpdateSchema, { name: "Jane" }).photoUrl).toBeUndefined();
    expect(out(profileUpdateSchema, { name: "Jane", photoUrl: null }).photoUrl).toBeNull();
    expect(out(profileUpdateSchema, { name: "Jane", photoUrl: " https://cdn.x/a.png " }).photoUrl).toBe("https://cdn.x/a.png");
    expect(firstMessage(profileUpdateSchema, { name: "Jane", photoUrl: "http://x" })).toBe("Invalid photo URL");
    expect(firstMessage(profileUpdateSchema, { name: "Jane", photoUrl: 999 })).toBe("Invalid photo URL");
  });
});

// ---------------------------------------------------------------------------
// F-166a3 — the honest-reject cap conversion (the s163 email precedent)
// ---------------------------------------------------------------------------

describe("session-166: the caps convert from silent truncation to honest rejects (F-166a3)", () => {
  it("every capped field rejects over-cap input with the 'reasonably sized' family (never a silent prefix)", () => {
    expect(firstMessage(accountCreateSchema, { name: "x".repeat(121) })).toBe("Account name must be reasonably sized");
    expect(firstMessage(accountCreateSchema, { name: "Acme", industry: "x".repeat(81) })).toBe("Industry must be reasonably sized");
    expect(firstMessage(activityCreateSchema, { subject: "x".repeat(201) })).toBe("Activity details must be reasonably sized");
    expect(firstMessage(activityCreateSchema, { subject: "x", notes: "x".repeat(2001) })).toBe("Notes must be reasonably sized");
    expect(firstMessage(eventCreateSchema, { title: "x".repeat(161), startAt: "2026-01-02T10:00:00Z" })).toBe("Event title must be reasonably sized");
    expect(firstMessage(eventCreateSchema, { title: "x", startAt: "2026-01-02T10:00:00Z", description: "x".repeat(1001) })).toBe("Description must be reasonably sized");
    expect(firstMessage(leadCreateSchema, { name: "x".repeat(121) })).toBe("Lead name must be reasonably sized");
    expect(firstMessage(contactCreateSchema, { name: "x".repeat(121) })).toBe("Name must be reasonably sized");
    expect(firstMessage(contactCreateSchema, { name: "Jane", photoUrl: `https://x.com/${"x".repeat(500)}` })).toBe("Photo URL must be reasonably sized");
    expect(firstMessage(profileUpdateSchema, { name: "x".repeat(61) })).toBe("Name must be reasonably sized");
    expect(firstMessage(profileUpdateSchema, { name: "Jane", photoUrl: `https://x.com/${"x".repeat(500)}` })).toBe("Photo URL must be reasonably sized");
  });
});
