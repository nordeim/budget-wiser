import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { leadCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-42 (S42-P1): the list read joined the envelope.
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        account: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(leads);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // parseBody composes the s165 bounded reader ahead of leadCreateSchema;
  // every 400 message is the route's own string; the field ORDER matches
  // the s41-s44 guard ladder this form replaces. The stage→closed/
  // status/closedAt derivation + the FK-EXISTENCE checks stay route-side
  // (§7.3).
  const parsed = await parseBody(req, leadCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // Session-36 (S36-P2): the FK guards + create are envelope-held now.
  try {
    if (body.ownerId) {
      const owner = await db.user.findUnique({ where: { id: body.ownerId } });
      if (!owner) return ERR.BAD_REQUEST("Selected owner does not exist");
    }

    if (body.accountId) {
      const account = await db.account.findUnique({ where: { id: body.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }

    // Session-43 (S43-P1): the contactId FK family — the schema + wire
    // type carried the relation since the s43 round (the create stores
    // the parsed field; the existence check is the POST's own
    // vocabulary).
    if (body.contactId) {
      const contact = await db.contact.findUnique({ where: { id: body.contactId } });
      if (!contact) return ERR.BAD_REQUEST("Selected contact does not exist");
    }

    const closed = body.stage === "won" || body.stage === "lost";
    const lead = await db.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        value: body.value ?? 0,
        stage: body.stage,
        source: body.source,
        status: closed ? (body.stage === "won" ? "closed_won" : "closed_lost") : "open",
        expectedCloseDate: body.expectedCloseDate,
        closedAt: closed ? new Date() : null,
        nextFollowUp: body.nextFollowUp,
        accountId: body.accountId,
        ownerId: body.ownerId,
        contactId: body.contactId,
      },
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
