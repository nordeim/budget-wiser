import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { accountUpdateSchema } from "@/lib/schemas";

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
  // trimmed value — the "X" in body + asString-optional ?? null pair
  // this form replaces, message-for-message. The FK-EXISTENCE check
  // stays route-side (§7.3).
  const parsed = await parseBody(req, accountUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const data: Record<string, unknown> = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.industry !== undefined) data.industry = body.industry;
  if (body.email !== undefined) data.email = body.email;
  if (body.phone !== undefined) data.phone = body.phone;
  if (body.website !== undefined) data.website = body.website;
  if (body.annualRevenue !== undefined) data.annualRevenue = body.annualRevenue;
  if (body.employees !== undefined) data.employees = body.employees;
  if (body.ownerId !== undefined) data.ownerId = body.ownerId;
  if (body.status !== undefined) data.status = body.status;
  if (body.health !== undefined) data.health = body.health;

  // Session-35 (S35-P5): FK existence guard on PUT — the POST-side
  // vocabulary — plus the envelope-held failure path. Session-36 (S36-P2):
  // the existence fetch moved INSIDE the try.
  try {
    const existing = await db.account.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Account");
    if (typeof data.ownerId === "string" && data.ownerId) {
      const owner = await db.user.findUnique({ where: { id: data.ownerId } });
      if (!owner) return ERR.BAD_REQUEST("Selected owner does not exist");
    }
    const account = await db.account.update({
      where: { id },
      data,
      include: { owner: { select: { id: true, name: true, avatarColor: true } } },
    });
    return ok(account);
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
    const existing = await db.account.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Account");

    await db.account.delete({ where: { id } });
    return ok({ deleted: id });
  } catch {
    return ERR.INTERNAL();
  }
}
