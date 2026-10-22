import { db } from "@/lib/db";
import { ok, ERR, asDate, isBadDate, parseBody, isGuarded, requireSession } from "@/lib/api";
import { eventCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const url = new URL(req.url);
  // Session-43 (S43-P5): a present-but-unparseable window param is a
  // 400, not a silent filter drop — asDate("garbage") → undefined used
  // to DROP the window (the caller asked for a window, got everything;
  // the period param's own 400-on-garbage precedent). isBadDate
  // semantics for URL params: absent (null) passes, empty "" passes
  // (≡ absent, the house GET convention), a garbage string rejects.
  // Session-166: the query-param family KEEPS the guard helpers (the
  // Zod seam is the BODY boundary — URL params are the GET family's
  // own surface, validated in place).
  const fromRaw = url.searchParams.get("from");
  const toRaw = url.searchParams.get("to");
  if (isBadDate(fromRaw)) return ERR.BAD_REQUEST("Invalid from date");
  if (isBadDate(toRaw)) return ERR.BAD_REQUEST("Invalid to date");
  const from = asDate(fromRaw);
  const to = asDate(toRaw);

  // Session-42 (S42-P1): the list read joined the envelope.
  try {
    const events = await db.event.findMany({
      where: {
        ...(from || to
          ? { startAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } }
          : {}),
      },
      // Session-76 (L-76c4, bundle-decoded): the reference's query is
      // `CalendarEvent.list("-start_date")` — DESCENDING. The agenda's
      // slice(0,10) takes the 10 LATEST and the day-cell chips render
      // in desc order.
      orderBy: { startAt: "desc" },
      include: {
        account: { select: { id: true, name: true } },
        contact: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(events);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // parseBody composes the s165 bounded reader ahead of
  // eventCreateSchema; every 400 message is the route's own string; the
  // field ORDER matches the s36-s44 guard ladder this form replaces.
  // The end≥start invariant + the FK-EXISTENCE checks stay route-side
  // (§7.3 — the invariant needs both parsed values, the checks need the
  // DB).
  const parsed = await parseBody(req, eventCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // Session-36 (S36-P1): the end≥start invariant the POST side enforces.
  const endAt = body.endAt ?? null;
  if (endAt && endAt < body.startAt) return ERR.BAD_REQUEST("End time must be after start time");

  // Session-36 (S36-P2): the contactId guard INSIDE the try — every DB
  // call in the handler is envelope-held.
  try {
    if (body.contactId) {
      const contact = await db.contact.findUnique({ where: { id: body.contactId } });
      if (!contact) return ERR.BAD_REQUEST("Selected contact does not exist");
    }
    if (body.accountId) {
      const account = await db.account.findUnique({ where: { id: body.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }
    const event = await db.event.create({
      data: {
        title: body.title,
        description: body.description,
        type: body.type,
        status: body.status,
        startAt: body.startAt,
        endAt,
        allDay: body.allDay,
        location: body.location,
        relatedType: body.relatedType,
        relatedName: body.relatedName,
        accountId: body.accountId,
        contactId: body.contactId,
        ownerId: guard.user.id,
      },
      include: {
        account: { select: { id: true, name: true } },
        contact: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(event);
  } catch {
    return ERR.INTERNAL();
  }
}
