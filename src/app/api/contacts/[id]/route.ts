import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { contactUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // The patch three-state lives in the schema: absent → undefined (no
  // write below), null/"" → null (the explicit clear), a value → the
  // trimmed value — the s40/s42 guard ladder this form replaces,
  // message-for-message (incl. the priority legacy mapping and the
  // email regex firing only on a present value). The FK-EXISTENCE
  // checks stay route-side (§7.3).
  const parsed = await parseBody(req, contactUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const data: Record<string, unknown> = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.email !== undefined) data.email = body.email;
  if (body.phone !== undefined) data.phone = body.phone;
  if (body.company !== undefined) data.company = body.company;
  if (body.position !== undefined) data.position = body.position;
  if (body.source !== undefined) data.source = body.source;
  if (body.accountId !== undefined) data.accountId = body.accountId;
  if (body.ownerId !== undefined) data.ownerId = body.ownerId;
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.role !== undefined) data.role = body.role;
  if (body.engagementLevel !== undefined) data.engagementLevel = body.engagementLevel;
  if (body.companySize !== undefined) data.companySize = body.companySize;
  if (body.photoUrl !== undefined) data.photoUrl = body.photoUrl;
  if (body.status !== undefined) data.status = body.status;

  // Session-35 (S35-P5): FK existence guards on PUT — the POST-side
  // vocabulary — plus the envelope-held failure path. A stale dropdown id
  // would otherwise throw Prisma P2003 as an unhandled rejection (a raw
  // non-envelope 500); any other DB failure lands in ERR.INTERNAL now.
  // Session-36 (S36-P2): the existence fetch moved INSIDE the try — every
  // DB call in the handler is envelope-held now.
  try {
    const existing = await db.contact.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Contact");
    if (typeof data.accountId === "string" && data.accountId) {
      const account = await db.account.findUnique({ where: { id: data.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }
    if (typeof data.ownerId === "string" && data.ownerId) {
      const owner = await db.user.findUnique({ where: { id: data.ownerId } });
      if (!owner) return ERR.BAD_REQUEST("Selected owner does not exist");
    }
    const contact = await db.contact.update({
      where: { id },
      data,
      include: {
        account: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(contact);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  // Session-36 (S36-P2): the delete is envelope-held (SQLITE_BUSY-class
  // failures stay inside { ok, error } instead of a raw non-JSON 500).
  try {
    const existing = await db.contact.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Contact");

    await db.contact.delete({ where: { id } });
    return ok({ deleted: id });
  } catch {
    return ERR.INTERNAL();
  }
}
