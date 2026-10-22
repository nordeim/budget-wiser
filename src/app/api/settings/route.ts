import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { settingsUpdateSchema } from "@/lib/schemas";
import { ACCOUNT_TIERS, LEAD_STAGES } from "@/lib/constants";
import type { Settings } from "@/types";

export const dynamic = "force-dynamic";

function parseList(raw: string, fallback: string[]): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) return parsed;
  } catch {
    // fall through
  }
  return fallback;
}

async function readSettings(): Promise<Settings> {
  let row = await db.setting.findUnique({ where: { id: "singleton" } });
  if (!row) {
    row = await db.setting.create({ data: { id: "singleton" } });
  }
  return {
    // Session-48 (S48-P2): the contactSources defaults stay the
    // reference's own Capitalized six, VERBATIM — part of the
    // source-vocabulary reconciliation record (the operator decision).
    // Bundle-verified 2026-10-04: the reference's settings contactSources
    // is an entity-backed CRUD list whose ONLY consumer is the settings
    // page's own ConfigEditor — it drives nothing functional THERE either.
    // Our mirror therefore persists this free-form user list while the
    // functional vocabulary (the dialogs' hardcoded raw values) stays
    // case-disjoint — the fragmentation IS the reference's product
    // design. Do NOT "reconcile" by wiring this list into the dialogs or
    // by validating source against it: both would break parity (the
    // dialogs' options are bundle-pinned; the import accepts arbitrary
    // strings BY the reference's own design).
    contactSources: parseList(row.contactSources, ["Email", "Phone", "Website", "Referral", "Event", "Social Media"]),
    leadStages: parseList(row.leadStages, ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"]),
    activityTypes: parseList(row.activityTypes, ["call", "email", "meeting", "whatsapp", "task", "note"]),
    accountTiers: parseList(row.accountTiers, ["A", "B", "C"]),
    industries: parseList(row.industries, ["Technology", "Manufacturing", "Retail", "Finance", "Healthcare", "Education", "Logistics", "Energy"]),
    defaultCurrency: row.defaultCurrency,
    defaultLeadStage: row.defaultLeadStage,
    defaultTier: row.defaultTier,
    followUpDays: row.followUpDays,
    calendarView: row.calendarView,
    firstDayOfWeek: row.firstDayOfWeek,
  };
}

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-37 (S37-P2): readSettings lazily CREATES the singleton row
  // when missing — a mutating call reached from a GET; its failure path
  // joins the envelope (the PUT's readSettings call was already inside
  // its try — the GET's was the gap).
  try {
    return ok(await readSettings());
  } catch {
    return ERR.INTERNAL();
  }
}

export async function PUT(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // The patch three-state lives in the schema: the five picklists +
  // the quartet + followUpDays + calendarView + firstDayOfWeek, every
  // 400 message the route's own string, the field ORDER the s40/s43
  // guard ladder's. The quartet's ?? DEFAULTS (the s40-P3 revival —
  // absent → undefined here, null/'' → the route's default), the
  // toUpperCase, and the followUpDays 0-90 range stay route-side
  // (§7.3 — the pinned literals; the schema's absent → undefined is
  // the NO-WRITE contract).
  const parsed = await parseBody(req, settingsUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const data: Record<string, unknown> = {};

  // The five picklists — the schema trims + caps the members; the
  // storage is the JSON string (the ConfigEditor's own format).
  if (body.contactSources !== undefined) data.contactSources = JSON.stringify(body.contactSources);
  if (body.leadStages !== undefined) data.leadStages = JSON.stringify(body.leadStages);
  if (body.activityTypes !== undefined) data.activityTypes = JSON.stringify(body.activityTypes);
  if (body.accountTiers !== undefined) data.accountTiers = JSON.stringify(body.accountTiers);
  if (body.industries !== undefined) data.industries = JSON.stringify(body.industries);

  // Session-40 (S40-P3): the dead-fallback revival — the quartet's
  // absent → undefined (no write), null/'' → the schema's null → the
  // ?? DEFAULT here (a present non-string used to silently store "";
  // LIVE-proven at s40 — now the schema's 400).
  if (body.defaultCurrency !== undefined) {
    data.defaultCurrency = (body.defaultCurrency ?? "AED").toUpperCase();
  }
  if (body.defaultLeadStage !== undefined) {
    // Session-43 (S43-P3): membership vs LEAD_STAGES — the create
    // routes' own vocabulary. A poisoned default (LIVE-proven:
    // "banana-probe" saved verbatim) flowed into the lead dialog's
    // initial stage and made every subsequent create 400 confusingly.
    // The schema carries the membership; the ?? default's own check
    // stays (the null → "new" path).
    const stage = body.defaultLeadStage ?? "new";
    if (!(LEAD_STAGES as readonly string[]).includes(stage)) return ERR.BAD_REQUEST("Default lead stage must be a valid stage");
    data.defaultLeadStage = stage;
  }
  if (body.defaultTier !== undefined) {
    // Session-43 (S43-P3): membership vs ACCOUNT_TIERS (the accounts
    // routes' own vocabulary — the tier default seeds the account
    // dialog's initial value).
    const tier = body.defaultTier ?? "B";
    if (!(ACCOUNT_TIERS as readonly string[]).includes(tier)) return ERR.BAD_REQUEST("Default account tier must be A, B or C");
    data.defaultTier = tier;
  }
  if (body.followUpDays !== undefined) {
    const days = body.followUpDays ?? 3;
    if (days < 0 || days > 90) return ERR.BAD_REQUEST("Follow-up days must be between 0 and 90");
    data.followUpDays = days;
  }
  if (body.calendarView !== undefined) {
    // Session-43 (S43-P3): membership vs the settings UI's own Select
    // vocabulary (the settings-page dropdown is the only writer).
    // Session-72 (M-72c3, bundle-decoded): the reference's Select
    // ships exactly month/week — the invented third option retired.
    const view = body.calendarView ?? "month";
    if (!["month", "week"].includes(view)) return ERR.BAD_REQUEST("Calendar view must be month or week");
    data.calendarView = view;
  }
  if (body.firstDayOfWeek !== undefined) {
    // Session-42 (S42-P5) + Session-43 (S43-P3): the required-on-present
    // shape — the schema's enum (a present "" is a bad value, not a
    // clear; the membership lives there now).
    data.firstDayOfWeek = body.firstDayOfWeek;
  }

  // Session-36 (S36-P2): the upsert + re-read are envelope-held.
  try {
    await db.setting.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    return ok(await readSettings());
  } catch {
    return ERR.INTERNAL();
  }
}
