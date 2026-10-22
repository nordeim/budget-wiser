// Zod schemas for the auth-family API inputs — session-163 (the Zod layer).
//
// Pattern donor: zero-balance (`zod ^4`, per-route schemas, field-level
// messages, nothing reaches Prisma unvalidated) at digma's seam placement
// (a dedicated server-side validation module consumed by every auth
// route). Every message string below is the CURRENT route string — the
// migration must not change a single user-facing word the unit + e2e
// suites pin.
//
// Session-166: the CRUD FAMILY JOINS THE SEAM (the documented incremental
// path completed — the twelve routes accounts/activities/contacts/
// events/leads x[root+[id]] + settings + users ride parseBody
// [users: the route-local safeParse form, its divergent null-body
// message]; reset keeps its custom confirm form). The field builders
// below recast the asString/isBad* guard semantics VERBATIM:
//
//   CREATE defaults — absent/null/""/whitespace keep the route's default
//   (the asString-optional ?? default form; status "active", health
//   "Healthy", stage "new", type "call"/"meeting", priority "normal"/
//   "Standard", status "scheduled").
//   PUT three-state — absent → undefined (no write), null/"" → null (the
//   explicit clear), a value → the trimmed value (the "X" in body +
//   asFKId/asString-optional ?? null forms).
//   Required-on-present — the PUT enums + name/title/subject: null/""/
//   garbage answer the route's message (the non-optional asString +
//   membership forms).
//   Field ORDER matches each route's guard order (parseBody answers the
//   FIRST issue — the single-error message equivalence).
//   Caps — the asString silent-truncate converts to the honest .max()
//   reject (the s163 email precedent; NEW "must be reasonably sized"
//   messages, never a change to an existing one).
//
// The FK-EXISTENCE checks and the merged-record invariants stay
// route-side (§7.3: parseBody → ownership/FK checks → mutation — a
// DB-bound check cannot live in a schema). The helpers stay exported
// from api.ts for the query-param GET family (events from/to, the
// reports/export/search period+q parses) and their behavior battery.

import { z } from "zod";

import { VERIFICATION_CODE_LENGTH } from "@/lib/verification";
import {
  ACCOUNT_HEALTH_STATUSES,
  ACCOUNT_STATUSES,
  ACCOUNT_TIERS,
  ACTIVITY_TYPES,
  COMPANY_SIZES,
  CONTACT_PRIORITIES,
  CONTACT_PRIORITIES_REF,
  CONTACT_ROLES,
  CONTACT_STATUSES,
  ENGAGEMENT_LEVELS,
  EVENT_TYPES,
  LEAD_STAGES,
} from "@/lib/constants";

/** The shared email contract: trimmed, lowercased, the 160-char cap that
 *  bounds the SQLite lookup. The pre-163 asString form TRUNCATED silently;
 *  the schema REJECTS with an honest message (both reference repos'
 *  posture — digma: "Email must be reasonably sized"). The `message`
 *  override is per-consumer: the missing/non-string TYPE error is the
 *  caller-specific required message, not a generic zod string. */
const emailField = (typeMessage: string) =>
  z
    .string({ message: typeMessage })
    .trim()
    .toLowerCase()
    .max(160, "Email must be reasonably sized");

const emailFormat = emailField("Enter a valid email address").regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Enter a valid email address",
);

export const emailSchema = emailFormat;

/** Passwords: the 8-char minimum every password-setting surface enforces. */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z
  .object({
    // Session-163: the N-63i "160 everywhere" truncation-parity contract
    // rides the schema now (the pre-163 form read login's email
    // untruncated while signup stored the 160-prefix — a >160 signup
    // could never log in; both surfaces cap at 160 in the one seam).
    email: z
      .string({ message: "Email and password are required" })
      .trim()
      .toLowerCase()
      .max(160, "Email must be reasonably sized"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    // The route's composite required-check, preserved verbatim: EITHER
    // field missing answers the ONE message (the per-field ladder would
    // change a pinned string).
    if (!body.email || !body.password) {
      ctx.addIssue({ code: "custom", message: "Email and password are required", path: [] });
    }
  });

export const signupSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .max(80)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  email: emailFormat,
  password: passwordSchema,
});

export const verifySchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
  code: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === VERIFICATION_CODE_LENGTH, "Please enter all 6 digits"),
});

export const resendSchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailFormat,
});

export const resetPasswordSchema = z.object({
  reset_token: z
    .string({ message: "Invalid or expired reset token" })
    .trim()
    .min(1, "Invalid or expired reset token")
    .max(200, "Token must be reasonably sized"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(200, "Password must be reasonably sized"),
});

// ---------------------------------------------------------------------------
// Session-166: the CRUD family's field vocabulary — the asString/isBad*
// guard semantics recast as Zod builders. Every message is the route's
// CURRENT string; the quadrant semantics (absent/null/""/whitespace/
// garbage/over-cap) are the guard family's own.
// ---------------------------------------------------------------------------

/** A required string: non-string/null/empty/whitespace → the required
 *  message (the non-optional asString form); over-cap → the honest
 *  reject (the s163 truncation→reject conversion); valid → trimmed. */
const requiredString = (message: string, max: number, sized: string) =>
  z.string({ message }).trim().min(1, message).max(max, sized);

/** Required-on-present (the PUT name/title/subject form): absent →
 *  undefined (no write); null/""/whitespace/garbage → the message. */
const requiredOnPresentString = (message: string, max: number, sized: string) =>
  requiredString(message, max, sized).optional();

/** A nullable string (the CREATE form — the asString-optional ?? null
 *  pair): absent/null/""/whitespace → null (a create cannot "clear" a
 *  field that does not exist yet, so absent ≡ null ≡ the explicit
 *  clear); non-string → the message; over-cap → the honest reject;
 *  valid → trimmed. NOT .optional() — Zod 4 short-circuits absent keys
 *  past optional fields, so the absent→null mapping must live in the
 *  core (a non-optional field parses the absent key with undefined). */
const nullableString = (message: string, max: number, sized: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v),
    z.union([z.null(), z.string({ message }).trim().max(max, sized)], { error: message }),
  );

/** A clearable string (the PUT three-state form): absent → undefined
 *  (no write); null/""/whitespace → null (the explicit clear); the rest
 *  the nullable core's contract. */
const clearableString = (message: string, max: number, sized: string) =>
  nullableString(message, max, sized).optional();

/** A create-default enum (the asString-optional ?? default form):
 *  absent/null/""/whitespace → the fallback; non-string → the message;
 *  a garbage string → the message; valid → trimmed. */
const defaultedEnum = (values: readonly string[], fallback: string, message: string) =>
  z.preprocess(
    (v) => {
      if (v === null || v === undefined) return fallback;
      if (typeof v === "string" && v.trim() === "") return fallback;
      return v;
    },
    z.string({ message }).trim().refine((s) => values.includes(s), message),
  );

/** A required-on-present enum (the PUT form — a present "" is a bad
 *  value, not a clear): absent → undefined; null → the type message;
 *  ""/whitespace/garbage → the value message; valid → trimmed. */
const requiredOnPresentEnum = (values: readonly string[], typeMessage: string, valueMessage: string) =>
  z.preprocess(
    // null rides the VALUE message — the route's isBadString(null) is
    // false and the non-optional asString maps it to "" (the !dow check
    // fires, not the type guard).
    (v) => (v === null ? "" : v),
    z.string({ message: typeMessage }).trim().refine((s) => s !== "" && values.includes(s), valueMessage),
  ).optional();

/** A nullable enum (the contacts role/engagementLevel/companySize
 *  CREATE form — absent/null/"" → NULL, never a default): the nullable
 *  core's contract + the membership refine. */
const nullableEnum = (values: readonly string[], message: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v),
    z.union(
      [z.null(), z.string({ message }).trim().refine((s) => values.includes(s), message)],
      { error: message },
    ),
  );

/** An optional enum (the PUT form): absent → undefined (no write);
 *  null/""/whitespace → null; garbage/non-string → the message. */
const optionalEnum = (values: readonly string[], message: string) =>
  nullableEnum(values, message).optional();

/** A nullable FK id (the CREATE form — the isBadFK + asFKId pair):
 *  absent/null/""/whitespace → null; a non-string → the selection
 *  message; valid → the trimmed id. */
const nullableFkId = (message: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v),
    z.union([z.null(), z.string({ message }).trim()], { error: message }),
  );

/** An FK id (the PUT three-state form): absent → undefined (no write);
 *  null/""/whitespace → null (the explicit clear); a non-string → the
 *  selection message; valid → the trimmed id. */
const fkId = (message: string) => nullableFkId(message).optional();

/** A clearable number (the isBadNumber + asNumber/asInt pair): absent →
 *  undefined; null/"" → null (the clear); a finite number or a numeric
 *  string passes (asInt truncates when int); whitespace-only strings,
 *  non-numeric strings, booleans, arrays, objects → the message. */
const nullableNumber = (message: string, int = false) => {
  const finish = (n: number) => (int ? Math.trunc(n) : n);
  return z.preprocess(
    (v) =>
      v === undefined || v === null || v === "" || (typeof v === "string" && v.trim() === "")
        ? null
        : v,
    z.union(
      [
        z.null(),
        z.number({ message }).refine(Number.isFinite, message).transform(finish),
        z
          .string({ message })
          .refine((v) => v.trim() !== "" && Number.isFinite(Number(v)), message)
          .transform((v) => finish(Number(v))),
      ],
      { error: message },
    ),
  );
};

/** A clearable number (the PUT three-state form): absent → undefined;
 *  null/"" → null (the clear); the rest the nullable core's contract. */
const clearableNumber = (message: string, int = false) => nullableNumber(message, int).optional();

/** A nullable date (the CREATE form — the isBadDate + asDate pair):
 *  absent/null/"" → null; an unparseable string or a non-string → the
 *  message; a parseable string → the Date. */
const nullableDate = (message: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null || v === "" ? null : v),
    z.union(
      [
        z.null(),
        z
          .string({ message })
          .refine((v) => !Number.isNaN(new Date(v).getTime()), message)
          .transform((v) => new Date(v)),
      ],
      { error: message },
    ),
  );

/** A clearable date (the PUT three-state form): absent → undefined;
 *  null/"" → null (the clear); the rest the nullable core's contract. */
const clearableDate = (message: string) => nullableDate(message).optional();

/** A required date (the events startAt form): every bad shape —
 *  absent/null/""/whitespace/unparseable/non-string — answers the one
 *  required message; valid → the Date. */
const requiredDate = (message: string) =>
  z.preprocess(
    (v) => (v === null || v === undefined || v === "" ? "" : v),
    z
      .string({ message })
      .refine((v) => v !== "" && !Number.isNaN(new Date(v).getTime()), message)
      .transform((v) => new Date(v)),
  );

/** A strict bool (the isBadBool + `=== true` pair): absent → undefined
 *  (no write); null → false (the idiom's own edge); a non-boolean → the
 *  message; true/false → itself. */
const boolField = (message: string) =>
  z.preprocess((v) => (v === null ? false : v), z.boolean({ message })).optional();

/** A photo URL (the isBadFK + prefix-check pair, the s36-P4 contract):
 *  absent → undefined; null/""/whitespace → null (the clear); a
 *  non-string → the message; over-500 → the honest reject (the users
 *  route's slice(0,500) truncation converts); only the documented
 *  /api/uploads/ or https:// shapes pass. */
const nullablePhotoUrl = (message: string, sized: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v),
    z.union(
      [
        z.null(),
        z
          .string({ message })
          .trim()
          .max(500, sized)
          .refine((v) => v.startsWith("/api/uploads/") || v.startsWith("https://"), message),
      ],
      { error: message },
    ),
  );

/** A photo URL (the PUT three-state form): absent → undefined (keep);
 *  null/""/whitespace → null (the clear); the rest the nullable core's
 *  contract. */
const photoUrlField = (message: string, sized: string) =>
  nullablePhotoUrl(message, sized).optional();

/** A contacts email (the isBadString + regex pair): the clearable
 *  three-state, the format check firing only on a present value. */
const nullableEmail = (typeMessage: string, regexMessage: string) =>
  z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v),
    z.union(
      [
        z.null(),
        z
          .string({ message: typeMessage })
          .trim()
          .max(160, "Email must be reasonably sized")
          .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), regexMessage),
      ],
      { error: typeMessage },
    ),
  );

/** A contacts email (the PUT three-state form): the nullable core's
 *  contract with absent → undefined (no write). */
const clearableEmail = (typeMessage: string, regexMessage: string) =>
  nullableEmail(typeMessage, regexMessage).optional();

/** The contacts priority legacy mapping (the s28 S28-P1 contract): the
 *  Key/Standard/At-Risk vocabulary with hot/warm/cold still accepted on
 *  input (mapped), never stored raw. */
const LEGACY_PRIORITY: Record<string, string> = { hot: "Key", warm: "Standard", cold: "At Risk" };
const priorityMembership = (s: string) =>
  (CONTACT_PRIORITIES_REF as readonly string[]).includes(s) ||
  (CONTACT_PRIORITIES as readonly string[]).includes(s);

const contactPriorityCreate = z.preprocess(
  (v) => {
    if (v === null || v === undefined) return "Standard";
    if (typeof v === "string" && v.trim() === "") return "Standard";
    return v;
  },
  z
    .string({ message: "Invalid priority" })
    .trim()
    .transform((s) => LEGACY_PRIORITY[s] ?? s)
    .refine(priorityMembership, "Invalid priority"),
);

const contactPriorityUpdate = z
  .string({ message: "Invalid priority" })
  .trim()
  .transform((s) => LEGACY_PRIORITY[s] ?? s)
  .refine((s) => s !== "" && priorityMembership(s), "Invalid priority")
  .optional();

// The settings family --------------------------------------------------------

/** A picklist (the listKeys loop's contract): absent → undefined; a
 *  non-array → the key's own message; every member must be a non-empty
 *  string ≤60 chars (the untrimmed length — the route's own check);
 *  over 40 entries → the entries message; the members trim for storage. */
const settingsListField = (key: string) => {
  const bad = `${key} must be a list of non-empty labels`;
  return z
    .array(z.string({ message: bad }).max(60, bad).trim().min(1, bad), { error: bad })
    .max(40, `${key} is limited to 40 entries`)
    .optional();
};

/** The quartet's nullable-default form: absent → undefined (NO WRITE —
 *  the patch contract); null/""/whitespace → null (the ROUTE fills its
 *  documented default via ?? — the s40-P3 revival semantics); a
 *  non-string → the type message. */
const nullableDefaultString = (message: string, max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.union([z.null(), z.string({ message }).trim().max(max, `${message.replace(/^Invalid /, "")} must be reasonably sized`)], {
      error: message,
    }),
  ).optional();

/** The followUpDays number form (the isBadNumber + asInt ?? 3 pair):
 *  absent → undefined; null/"" → null (the route's ?? 3); the number
 *  family's acceptance + truncation. The 0-90 RANGE stays route-side
 *  (the pinned `days < 0 || days > 90` literal). */
const nullableDefaultNumber = (message: string) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v === "" ? null : v),
    z.union(
      [
        z.null(),
        z.number({ message }).refine(Number.isFinite, message).transform(Math.trunc),
        z
          .string({ message })
          .refine((v) => v.trim() !== "" && Number.isFinite(Number(v)), message)
          .transform((v) => Math.trunc(Number(v))),
      ],
      { error: message },
    ),
  ).optional();

/** The create-side bool: absent/null → false (the `=== true` idiom's
 *  own semantics — the event create stores allDay false when absent).
 *  NOT .optional() — the absent key must PARSE (the optin rule the
 *  nullable cores document). */
const createBool = (message: string) =>
  z.preprocess((v) => (v === undefined || v === null ? false : v), z.boolean({ message }));

// ---------------------------------------------------------------------------
// Session-166: the twelve CRUD route schemas. Field ORDER = the route's
// guard order (parseBody answers the FIRST issue). The object-level
// `error` keeps the non-object body on the route's first-field message
// (the asString-on-array contract: body.X on [1,2,3] answered the
// required message).
// ---------------------------------------------------------------------------

/** accounts POST (the guard order: name → status → health → ownerId →
 *  annualRevenue → employees → industry → email → phone → website). */
export const accountCreateSchema = z.object(
  {
    name: requiredString("Account name is required", 120, "Account name must be reasonably sized"),
    status: defaultedEnum([...ACCOUNT_STATUSES], "active", "Invalid status"),
    health: defaultedEnum([...ACCOUNT_HEALTH_STATUSES], "Healthy", "Invalid health status"),
    ownerId: nullableFkId("Invalid owner selection"),
    annualRevenue: nullableNumber("Invalid annual revenue"),
    employees: nullableNumber("Invalid employee count", true),
    industry: nullableString("Invalid industry", 80, "Industry must be reasonably sized"),
    email: nullableString("Invalid email", 160, "Email must be reasonably sized"),
    phone: nullableString("Invalid phone number", 40, "Phone number must be reasonably sized"),
    website: nullableString("Invalid website", 200, "Website must be reasonably sized"),
  },
  { error: "Account name is required" },
);

/** accounts/[id] PUT — the patch semantics (required-on-present name/
 *  status/health; the three-state clearables). */
export const accountUpdateSchema = z.object(
  {
    name: requiredOnPresentString("Account name is required", 120, "Account name must be reasonably sized"),
    status: requiredOnPresentEnum([...ACCOUNT_STATUSES], "Invalid status", "Invalid status"),
    health: requiredOnPresentEnum([...ACCOUNT_HEALTH_STATUSES], "Invalid health status", "Invalid health status"),
    ownerId: fkId("Invalid owner selection"),
    annualRevenue: clearableNumber("Invalid annual revenue"),
    employees: clearableNumber("Invalid employee count", true),
    industry: clearableString("Invalid industry", 80, "Industry must be reasonably sized"),
    email: clearableString("Invalid email", 160, "Email must be reasonably sized"),
    phone: clearableString("Invalid phone number", 40, "Phone number must be reasonably sized"),
    website: clearableString("Invalid website", 200, "Website must be reasonably sized"),
  },
  { error: "Account name is required" },
);

/** activities POST (subject → type → status → priority → contactId →
 *  accountId → dueAt → notes → relatedType → relatedName; the ownerId
 *  is the SESSION user, never a payload field). */
export const activityCreateSchema = z.object(
  {
    subject: requiredString("Activity details are required", 200, "Activity details must be reasonably sized"),
    type: defaultedEnum([...ACTIVITY_TYPES], "call", "Invalid activity type"),
    status: defaultedEnum(["scheduled", "completed"], "scheduled", "Invalid status"),
    priority: defaultedEnum(["high", "normal", "low"], "normal", "Invalid priority"),
    contactId: nullableFkId("Invalid contact selection"),
    accountId: nullableFkId("Invalid company selection"),
    dueAt: nullableDate("Invalid due date"),
    notes: nullableString("Invalid notes", 2000, "Notes must be reasonably sized"),
    relatedType: nullableString("Invalid related type", 40, "Related type must be reasonably sized"),
    relatedName: nullableString("Invalid related name", 160, "Related name must be reasonably sized"),
  },
  { error: "Activity details are required" },
);

/** activities/[id] PUT — the patch semantics. */
export const activityUpdateSchema = z.object(
  {
    subject: requiredOnPresentString("Activity details are required", 200, "Activity details must be reasonably sized"),
    type: requiredOnPresentEnum([...ACTIVITY_TYPES], "Invalid activity type", "Invalid activity type"),
    status: requiredOnPresentEnum(["scheduled", "completed"], "Invalid status", "Invalid status"),
    priority: requiredOnPresentEnum(["high", "normal", "low"], "Invalid priority", "Invalid priority"),
    contactId: nullableFkId("Invalid contact selection"),
    accountId: nullableFkId("Invalid company selection"),
    dueAt: nullableDate("Invalid due date"),
    notes: nullableString("Invalid notes", 2000, "Notes must be reasonably sized"),
    relatedType: nullableString("Invalid related type", 40, "Related type must be reasonably sized"),
    relatedName: nullableString("Invalid related name", 160, "Related name must be reasonably sized"),
  },
  { error: "Activity details are required" },
);

/** contacts POST (name → email → priority → role → engagementLevel →
 *  companySize → status → photoUrl → accountId → ownerId → phone →
 *  company → position → source). */
export const contactCreateSchema = z.object(
  {
    name: requiredString("Name is required", 120, "Name must be reasonably sized"),
    email: nullableEmail("Invalid email", "Enter a valid email address"),
    priority: contactPriorityCreate,
    role: nullableEnum([...CONTACT_ROLES], "Invalid role"),
    engagementLevel: nullableEnum([...ENGAGEMENT_LEVELS], "Invalid engagement level"),
    companySize: nullableEnum([...COMPANY_SIZES], "Invalid company size"),
    status: defaultedEnum([...CONTACT_STATUSES], "active", "Invalid status"),
    photoUrl: nullablePhotoUrl("Invalid photo URL", "Photo URL must be reasonably sized"),
    accountId: nullableFkId("Invalid company selection"),
    ownerId: nullableFkId("Invalid owner selection"),
    phone: nullableString("Invalid phone number", 40, "Phone number must be reasonably sized"),
    company: nullableString("Invalid company", 120, "Company must be reasonably sized"),
    position: nullableString("Invalid position", 80, "Position must be reasonably sized"),
    // source stays FREE-FORM (the s48 parity posture — no membership).
    source: nullableString("Invalid source", 40, "Source must be reasonably sized"),
  },
  { error: "Name is required" },
);

/** contacts/[id] PUT — the patch semantics. */
export const contactUpdateSchema = z.object(
  {
    name: requiredOnPresentString("Name is required", 120, "Name must be reasonably sized"),
    email: clearableEmail("Invalid email", "Enter a valid email address"),
    priority: contactPriorityUpdate,
    role: optionalEnum([...CONTACT_ROLES], "Invalid role"),
    engagementLevel: optionalEnum([...ENGAGEMENT_LEVELS], "Invalid engagement level"),
    companySize: optionalEnum([...COMPANY_SIZES], "Invalid company size"),
    status: requiredOnPresentEnum([...CONTACT_STATUSES], "Invalid status", "Invalid status"),
    photoUrl: photoUrlField("Invalid photo URL", "Photo URL must be reasonably sized"),
    accountId: fkId("Invalid company selection"),
    ownerId: fkId("Invalid owner selection"),
    phone: clearableString("Invalid phone number", 40, "Phone number must be reasonably sized"),
    company: clearableString("Invalid company", 120, "Company must be reasonably sized"),
    position: clearableString("Invalid position", 80, "Position must be reasonably sized"),
    source: clearableString("Invalid source", 40, "Source must be reasonably sized"),
  },
  { error: "Name is required" },
);

/** events POST (title → startAt → type → status → endAt → contactId →
 *  accountId → description → location → relatedType → relatedName →
 *  allDay; the end≥start invariant stays route-side). */
export const eventCreateSchema = z.object(
  {
    title: requiredString("Event title is required", 160, "Event title must be reasonably sized"),
    startAt: requiredDate("Start date and time are required"),
    type: defaultedEnum([...EVENT_TYPES], "meeting", "Invalid event type"),
    status: defaultedEnum(["scheduled", "completed", "cancelled"], "scheduled", "Invalid status"),
    endAt: nullableDate("Invalid end date"),
    contactId: nullableFkId("Invalid contact selection"),
    accountId: nullableFkId("Invalid company selection"),
    description: nullableString("Invalid description", 1000, "Description must be reasonably sized"),
    location: nullableString("Invalid location", 200, "Location must be reasonably sized"),
    relatedType: nullableString("Invalid related type", 40, "Related type must be reasonably sized"),
    relatedName: nullableString("Invalid related name", 160, "Related name must be reasonably sized"),
    allDay: createBool("Invalid all-day flag"),
  },
  { error: "Event title is required" },
);

/** events/[id] PUT — the patch semantics (the merged-record end≥start
 *  invariant stays route-side). */
export const eventUpdateSchema = z.object(
  {
    title: requiredOnPresentString("Event title is required", 160, "Event title must be reasonably sized"),
    startAt: requiredDate("Start date and time are required").optional(),
    type: requiredOnPresentEnum([...EVENT_TYPES], "Invalid event type", "Invalid event type"),
    status: requiredOnPresentEnum(["scheduled", "completed", "cancelled"], "Invalid status", "Invalid status"),
    endAt: nullableDate("Invalid end date"),
    contactId: nullableFkId("Invalid contact selection"),
    accountId: nullableFkId("Invalid company selection"),
    description: nullableString("Invalid description", 1000, "Description must be reasonably sized"),
    location: nullableString("Invalid location", 200, "Location must be reasonably sized"),
    relatedType: nullableString("Invalid related type", 40, "Related type must be reasonably sized"),
    relatedName: nullableString("Invalid related name", 160, "Related name must be reasonably sized"),
    allDay: createBool("Invalid all-day flag"),
  },
  { error: "Event title is required" },
);

/** leads POST (name → stage → source → ownerId → accountId → contactId
 *  → value → expectedCloseDate → nextFollowUp → email → phone →
 *  company; the closed/status/closedAt derivation stays route-side). */
export const leadCreateSchema = z.object(
  {
    name: requiredString("Lead name is required", 120, "Lead name must be reasonably sized"),
    stage: defaultedEnum([...LEAD_STAGES], "new", "Invalid stage"),
    // source stays FREE-FORM (the s48 parity posture — no membership).
    source: nullableString("Invalid source", 40, "Source must be reasonably sized"),
    ownerId: nullableFkId("Invalid owner selection"),
    accountId: nullableFkId("Invalid company selection"),
    contactId: nullableFkId("Invalid contact selection"),
    value: nullableNumber("Invalid value"),
    expectedCloseDate: nullableDate("Invalid expected close date"),
    nextFollowUp: nullableDate("Invalid follow-up date"),
    email: nullableString("Invalid email", 160, "Email must be reasonably sized"),
    phone: nullableString("Invalid phone number", 40, "Phone number must be reasonably sized"),
    company: nullableString("Invalid company", 120, "Company must be reasonably sized"),
  },
  { error: "Lead name is required" },
);

/** leads/[id] PUT — the patch semantics (the stage/closedAt
 *  merged-record derivation stays route-side). */
export const leadUpdateSchema = z.object(
  {
    name: requiredOnPresentString("Lead name is required", 120, "Lead name must be reasonably sized"),
    stage: requiredOnPresentEnum([...LEAD_STAGES], "Invalid stage", "Invalid stage"),
    source: clearableString("Invalid source", 40, "Source must be reasonably sized"),
    accountId: fkId("Invalid company selection"),
    ownerId: fkId("Invalid owner selection"),
    contactId: fkId("Invalid contact selection"),
    value: clearableNumber("Invalid value"),
    expectedCloseDate: clearableDate("Invalid expected close date"),
    nextFollowUp: clearableDate("Invalid follow-up date"),
    email: clearableString("Invalid email", 160, "Email must be reasonably sized"),
    phone: clearableString("Invalid phone number", 40, "Phone number must be reasonably sized"),
    company: clearableString("Invalid company", 120, "Company must be reasonably sized"),
  },
  { error: "Lead name is required" },
);

/** settings PUT (the listKeys loop → the quartet → followUpDays →
 *  calendarView → firstDayOfWeek; the quartet's ?? defaults + the
 *  followUpDays 0-90 range + the toUpperCase stay route-side). */
export const settingsUpdateSchema = z.object(
  {
    contactSources: settingsListField("contactSources"),
    leadStages: settingsListField("leadStages"),
    activityTypes: settingsListField("activityTypes"),
    accountTiers: settingsListField("accountTiers"),
    industries: settingsListField("industries"),
    defaultCurrency: nullableDefaultString("Invalid currency", 8),
    defaultLeadStage: z.preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? null : v),
      z.union(
        [
          z.null(),
          z
            .string({ message: "Invalid default lead stage" })
            .trim()
            .max(40, "Default lead stage must be reasonably sized")
            .refine((s) => (LEAD_STAGES as readonly string[]).includes(s), "Default lead stage must be a valid stage"),
        ],
        { error: "Invalid default lead stage" },
      ),
    ).optional(),
    defaultTier: z.preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? null : v),
      z.union(
        [
          z.null(),
          z
            .string({ message: "Invalid default tier" })
            .trim()
            .max(4, "Default tier must be reasonably sized")
            .refine((s) => (ACCOUNT_TIERS as readonly string[]).includes(s), "Default account tier must be A, B or C"),
        ],
        { error: "Invalid default tier" },
      ),
    ).optional(),
    followUpDays: nullableDefaultNumber("Invalid follow-up days"),
    calendarView: z.preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? null : v),
      z.union(
        [
          z.null(),
          z
            .string({ message: "Invalid calendar view" })
            .trim()
            .max(20, "Calendar view must be reasonably sized")
            .refine((s) => ["month", "week"].includes(s), "Calendar view must be month or week"),
        ],
        { error: "Invalid calendar view" },
      ),
    ).optional(),
    firstDayOfWeek: requiredOnPresentEnum(["monday", "sunday"], "Invalid first day of week", "First day of week must be monday or sunday"),
  },
  { error: "contactSources must be a list of non-empty labels" },
);

/** users PATCH (the profile family — consumed through the route-local
 *  readBoundedJson + safeParse form so the null body keeps its own
 *  "Invalid JSON body" message). */
export const profileUpdateSchema = z.object(
  {
    name: z
      .string({ message: "Name must be at least 2 characters" })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name must be reasonably sized"),
    photoUrl: photoUrlField("Invalid photo URL", "Photo URL must be reasonably sized"),
  },
  { error: "Name must be at least 2 characters" },
);
