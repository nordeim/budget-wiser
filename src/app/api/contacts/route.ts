import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { contactCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-42 (S42-P1): the list read joined the envelope — the GET
  // handlers were the last raw reads (a SQLITE_BUSY-class failure
  // answered a raw non-JSON 500; the store degraded it to
  // "Request failed (500)" instead of the house message).
  try {
    const contacts = await db.contact.findMany({
      orderBy: { name: "asc" },
      include: {
        account: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(contacts);
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
  // contactCreateSchema; every 400 message is the route's own string;
  // the field ORDER matches the s28-s44 guard ladder this form
  // replaces (name → email → priority → the classifier enums → status
  // → photoUrl → the FKs → the inline strings). The legacy
  // hot/warm/cold → Key/Standard/At-Risk priority mapping lives in the
  // schema now (the s28 S28-P1 contract). The FK-EXISTENCE checks stay
  // route-side (§7.3).
  const parsed = await parseBody(req, contactCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // Session-36 (S36-P2): the FK guards + create are envelope-held now —
  // every DB call in the handler inside the try.
  try {
    if (body.accountId) {
      const account = await db.account.findUnique({ where: { id: body.accountId } });
      if (!account) return ERR.BAD_REQUEST("Selected company does not exist");
    }

    if (body.ownerId) {
      const owner = await db.user.findUnique({ where: { id: body.ownerId } });
      if (!owner) return ERR.BAD_REQUEST("Selected owner does not exist");
    }

    // Session-48 (S48-P2): source stays FREE-FORM — the s48 reconciliation
    // record (constants.ts's Session-48 comment). NO enum-membership: the
    // vocabulary is deliberately fragmented across five surfaces (the
    // dialogs' raw lowercase values, the seed maps, the CSV import's
    // arbitrary strings + "email" fallback, the settings list's Capitalized
    // free-form labels) — every candidate list is case-disjoint from
    // another surface, so a single-list guard would 400 either
    // dialog-created rows or import rows, and the reference itself accepts
    // arbitrary import strings. String-ness + the 40-char cap only (the
    // schema's clearable source field).
    const contact = await db.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        position: body.position,
        source: body.source,
        priority: body.priority,
        role: body.role,
        engagementLevel: body.engagementLevel,
        companySize: body.companySize,
        status: body.status,
        photoUrl: body.photoUrl,
        accountId: body.accountId,
        ownerId: body.ownerId,
        lastActivityAt: new Date(),
      },
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
