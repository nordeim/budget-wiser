import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { activityCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-42 (S42-P1): the list read joined the envelope.
  try {
    const activities = await db.activity.findMany({
      orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
      include: {
        account: { select: { id: true, name: true } },
        contact: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(activities);
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
  // activityCreateSchema; every 400 message is the route's own string;
  // the field ORDER matches the s41-s44 guard ladder this form
  // replaces. The FK-EXISTENCE checks stay route-side (§7.3). dueAt's
  // absent → NOW default stays route-side (?? new Date() — the s40-P4
  // inventing-twin cure kept its create-default semantics).
  const parsed = await parseBody(req, activityCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // Session-36 (S36-P2): the contactId guard moved INSIDE the try — every
  // DB call in the handler is envelope-held.
  try {
    if (body.contactId) {
      const contact = await db.contact.findUnique({ where: { id: body.contactId } });
      if (!contact) return ERR.BAD_REQUEST("Selected contact does not exist");
    }
    if (body.accountId) {
      const account = await db.account.findUnique({ where: { id: body.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }
    const activity = await db.activity.create({
      data: {
        type: body.type,
        subject: body.subject,
        notes: body.notes,
        status: body.status,
        priority: body.priority,
        dueAt: body.dueAt ?? new Date(),
        completedAt: body.status === "completed" ? new Date() : null,
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

    // Touch the related contact/account "last activity" stamps.
    const now = new Date();
    if (body.contactId) await db.contact.update({ where: { id: body.contactId }, data: { lastActivityAt: now } }).catch(() => null);
    if (body.accountId) await db.account.update({ where: { id: body.accountId }, data: { lastActivityAt: now } }).catch(() => null);

    return ok(activity);
  } catch {
    return ERR.INTERNAL();
  }
}
