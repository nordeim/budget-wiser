import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// DELETE /api/transactions/[id] — the row trash button. Ownership-scoped:
// a foreign id answers the same 404 as a missing one (no existence leak).
export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  try {
    const existing = await db.transaction.findUnique({ where: { id } });
    if (!existing || existing.userId !== guard.user.id) {
      return ERR.NOT_FOUND("Transaction");
    }
    await db.transaction.delete({ where: { id } });
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
