import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { accountCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-42 (S42-P1): the list read joined the envelope.
  try {
    // Session-75 (N-75c1-5): the _count include RETIRED — zero consumers
    // (the page + the insights dialog count from the store's arrays
    // client-side; only the reports route's own _count join is consumed).
    const accounts = await db.account.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        owner: { select: { id: true, name: true, avatarColor: true } },
      },
    });
    return ok(accounts);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-166: the CRUD family joins the Zod seam (the §7.2 "zod at
  // every boundary" doctrine — the s163 incremental path completed).
  // parseBody composes the s165 bounded reader (the content-type CSRF
  // gate + the declared fast path + the stream counter) ahead of
  // accountCreateSchema; every 400 message is the route's own string
  // (the zero-message-drift doctrine); the field ORDER matches the
  // s35-s44 guard ladder this form replaces. The FK-EXISTENCE check
  // stays route-side (§7.3: parseBody → ownership/FK checks →
  // mutation — a DB-bound check cannot live in a schema). The asString
  // caps converted to honest .max() rejects (the s163 email precedent
  // — a 121-char name now 400s instead of storing its 120-prefix).
  const parsed = await parseBody(req, accountCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // Session-36 (S36-P2): the FK guard + create are envelope-held now.
  // Session-37 (S37-P3): a non-string FK payload is a 400 (the schema),
  // never a silent coercion to null.
  try {
    if (body.ownerId) {
      const owner = await db.user.findUnique({ where: { id: body.ownerId } });
      if (!owner) return ERR.BAD_REQUEST("Selected owner does not exist");
    }

    // Session-86 (M-86c2): the tier/isKey write seams RETIRED — the
    // reference models NO stored tier (its tier is DERIVED from revenue
    // at render time; its dialogs offer no tier field).
    // Session-75 (N-75c1-6, bundle-decoded): NO lastActivityAt stamp —
    // the reference's bce create form ships no last-activity field; a
    // fresh account renders "No activity" in the table (the schema
    // default null), exactly like the reference.
    const account = await db.account.create({
      data: {
        name: body.name,
        industry: body.industry,
        email: body.email,
        phone: body.phone,
        website: body.website,
        annualRevenue: body.annualRevenue,
        employees: body.employees,
        status: body.status,
        health: body.health,
        ownerId: body.ownerId,
      },
      include: { owner: { select: { id: true, name: true, avatarColor: true } } },
    });
    return ok(account);
  } catch {
    return ERR.INTERNAL();
  }
}
