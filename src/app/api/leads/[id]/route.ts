import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { leadUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed) —
  // AND the §7.3 ordering normalization: parseBody now PRECEDES the
  // findUnique, matching the five sibling [id] routes' shape (the
  // s37-era divergence this route alone carried — its 404 answered
  // before a malformed body's 400; the standard shape validates first,
  // a malformed body + missing record now answers 400). The patch
  // three-state lives in the schema: absent → undefined (no write),
  // null/"" → null (the clear), a value → the trimmed value.
  // Session-69 (F-69a3): the gate stays the first post-guard statement
  // — an oversized body is rejected before any DB round-trip too.
  const parsed = await parseBody(req, leadUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // Session-35 (S35-P5): FK existence guards on PUT — the POST-side
  // vocabulary — plus the envelope-held failure path (P2003 and every
  // other DB failure stay inside the { ok, error } envelope).
  // Session-36 (S36-P2): the whole handler body is envelope-held — the
  // existence fetch INSIDE the try (the stage parsing below reads
  // existing.closedAt, so the try must start at the fetch).
  try {
    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Lead");

    const data: Record<string, unknown> = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.email !== undefined) data.email = body.email;
    if (body.phone !== undefined) data.phone = body.phone;
    if (body.company !== undefined) data.company = body.company;
    if (body.value !== undefined) data.value = body.value ?? 0;
    if (body.source !== undefined) data.source = body.source;
    if (body.accountId !== undefined) data.accountId = body.accountId;
    if (body.ownerId !== undefined) data.ownerId = body.ownerId;
    // Session-43 (S43-P1): the contactId branch — the PUT accepts the
    // field like the POST (the N-42b class cured at s43).
    if (body.contactId !== undefined) data.contactId = body.contactId;
    if (body.expectedCloseDate !== undefined) data.expectedCloseDate = body.expectedCloseDate;
    if (body.nextFollowUp !== undefined) data.nextFollowUp = body.nextFollowUp;
    if (body.stage !== undefined) {
      data.stage = body.stage;
      const closed = body.stage === "won" || body.stage === "lost";
      data.status = closed ? (body.stage === "won" ? "closed_won" : "closed_lost") : "open";
      if (closed && !existing.closedAt) data.closedAt = new Date();
      if (!closed && existing.closedAt) data.closedAt = null;
    }

    if (typeof data.accountId === "string" && data.accountId) {
      const account = await db.account.findUnique({ where: { id: data.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }
    if (typeof data.ownerId === "string" && data.ownerId) {
      const owner = await db.user.findUnique({ where: { id: data.ownerId } });
      if (!owner) return ERR.BAD_REQUEST("Selected owner does not exist");
    }
    // Session-43 (S43-P1): the contactId existence check — the POST's
    // own vocabulary (a stale dropdown id must be a 400, not a raw
    // P2003).
    if (typeof data.contactId === "string" && data.contactId) {
      const contact = await db.contact.findUnique({ where: { id: data.contactId } });
      if (!contact) return ERR.BAD_REQUEST("Selected contact does not exist");
    }
    const lead = await db.lead.update({
      where: { id },
      data,
      include: {
        account: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(lead);
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
    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) return ERR.NOT_FOUND("Lead");

    await db.lead.delete({ where: { id } });
    return ok({ deleted: id });
  } catch {
    return ERR.INTERNAL();
  }
}
