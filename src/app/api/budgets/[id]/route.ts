import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { budgetUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/budgets/[id] — adjust a budget's monthly limit.
export async function PATCH(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  const parsed = await parseBody(req, budgetUpdateSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const existing = await db.budget.findUnique({ where: { id } });
    if (!existing || existing.userId !== guard.user.id) {
      return ERR.NOT_FOUND("Budget");
    }
    const budget = await db.budget.update({
      where: { id },
      data: { monthlyLimit: parsed.data.monthlyLimit },
    });
    return ok(budget);
  } catch {
    return ERR.INTERNAL();
  }
}

// DELETE /api/budgets/[id] — the budget card's trash button (the
// confirmation alertdialog's confirmed action).
export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  try {
    const existing = await db.budget.findUnique({ where: { id } });
    if (!existing || existing.userId !== guard.user.id) {
      return ERR.NOT_FOUND("Budget");
    }
    await db.budget.delete({ where: { id } });
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
