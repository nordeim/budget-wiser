import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { eventUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // The patch three-state lives in the schema: absent → undefined (no
  // write below), null/"" → null (the clear), a value → the trimmed
  // value — the s40/s42 guard ladder this form replaces,
  // message-for-message. The MERGED-RECORD end≥start invariant + the
  // FK-EXISTENCE checks stay route-side (§7.3).
  const parsed = await parseBody(req, eventUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.location !== undefined) data.location = body.location;
  if (body.relatedType !== undefined) data.relatedType = body.relatedType;
  // Session-76 (M-76c13): the reference's CalendarEvent carries
  // related_to_name — the PATCH twin of the POST guard.
  if (body.relatedName !== undefined) data.relatedName = body.relatedName;
  if (body.allDay !== undefined) data.allDay = body.allDay;
  if (body.accountId !== undefined) data.accountId = body.accountId;
  if (body.contactId !== undefined) data.contactId = body.contactId;
  if (body.startAt !== undefined) data.startAt = body.startAt;
  if (body.endAt !== undefined) data.endAt = body.endAt;
  if (body.type !== undefined) data.type = body.type;
  if (body.status !== undefined) data.status = body.status;

  // Session-35 (S35-P5): FK existence guards on PUT — the POST-side
  // vocabulary — plus the envelope-held failure path. Session-36 (S36-P1):
  // the end≥start invariant the POST side enforces, checked against the
  // MERGED record (patch semantics — an absent field keeps the existing
  // row's value; checking only the patch's own startAt would let
  // {endAt: <early>} slip past an unchanged later startAt). Session-36
  // (S36-P2): the existence fetch moved INSIDE the try.
  try {
    const existing = await db.event.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Event");

    const effectiveStart = (data.startAt as Date | undefined) ?? existing.startAt;
    const effectiveEnd = data.endAt !== undefined ? (data.endAt as Date | null) : existing.endAt;
    if (effectiveEnd && effectiveEnd < effectiveStart) {
      return ERR.BAD_REQUEST("End time must be after start time");
    }

    if (typeof data.accountId === "string" && data.accountId) {
      const account = await db.account.findUnique({ where: { id: data.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }
    if (typeof data.contactId === "string" && data.contactId) {
      const contact = await db.contact.findUnique({ where: { id: data.contactId } });
      if (!contact) return ERR.BAD_REQUEST("Selected contact does not exist");
    }
    const event = await db.event.update({
      where: { id },
      data,
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

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  // Session-36 (S36-P2): the delete is envelope-held.
  try {
    const existing = await db.event.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Event");

    await db.event.delete({ where: { id } });
    return ok({ deleted: id });
  } catch {
    return ERR.INTERNAL();
  }
}
