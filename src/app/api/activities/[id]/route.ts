import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { activityUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // The patch three-state lives in the schema: absent → undefined (no
  // write), null/"" → null (the clear), a value → the trimmed value —
  // the s40/s42 guard ladder this form replaces, message-for-message.
  // The status→completedAt derivation + the FK-EXISTENCE checks stay
  // route-side (§7.3).
  const parsed = await parseBody(req, activityUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const data: Record<string, unknown> = {};
  if (body.subject !== undefined) data.subject = body.subject;
  if (body.notes !== undefined) data.notes = body.notes;
  if (body.relatedType !== undefined) data.relatedType = body.relatedType;
  if (body.relatedName !== undefined) data.relatedName = body.relatedName;
  if (body.dueAt !== undefined) data.dueAt = body.dueAt;
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.type !== undefined) data.type = body.type;
  if (body.status !== undefined) {
    data.status = body.status;
    data.completedAt = body.status === "completed" ? new Date() : null;
  }
  // Session-42 (S42-P3): the FK branches the route was missing until the
  // s42 round — an activity's links re-assign and clear like the
  // contacts/[id] shape.
  if (body.contactId !== undefined) data.contactId = body.contactId;
  if (body.accountId !== undefined) data.accountId = body.accountId;

  // Session-36 (S36-P2): the update is envelope-held (SQLITE_BUSY-class
  // failures stay inside { ok, error } instead of a raw non-JSON 500).
  // Session-37 (S37-P2): the existence fetch moved INSIDE the try —
  // missing-id + malformed-body both answer 400 before 404, matching
  // the four sibling [id] routes' ordering.
  try {
    const existing = await db.activity.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Activity");

    // Session-42 (S42-P3): FK existence guards — the POST route's own
    // vocabulary (a stale dropdown id must be a 400, not a raw P2003).
    if (typeof data.contactId === "string" && data.contactId) {
      const contact = await db.contact.findUnique({ where: { id: data.contactId } });
      if (!contact) return ERR.BAD_REQUEST("Selected contact does not exist");
    }
    if (typeof data.accountId === "string" && data.accountId) {
      const account = await db.account.findUnique({ where: { id: data.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }

    const activity = await db.activity.update({
      where: { id },
      data,
      include: {
        account: { select: { id: true, name: true } },
        contact: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(activity);
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
    const existing = await db.activity.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Activity");

    await db.activity.delete({ where: { id } });
    return ok({ deleted: id });
  } catch {
    return ERR.INTERNAL();
  }
}
