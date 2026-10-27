import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { profileUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

// GET /api/profile — the session user's Profile-page projection (name,
// email, role, member-since, preferences) + the Financial Overview rollups
// (this month / this year income-expenses, budget used, total tx, and the
// year summary trio).
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  try {
    const user = await db.user.findUnique({
      where: { id: guard.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarColor: true,
        photoUrl: true,
        role: true,
        currency: true,
        aboutMe: true,
        savingsGoal: true,
        createdAt: true,
      },
    });
    if (!user) return ERR.INTERNAL();

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const mStart = new Date(year, month - 1, 1);
    const mEnd = new Date(year, month, 1);
    const yStart = new Date(year, 0, 1);
    const yEnd = new Date(year + 1, 0, 1);

    const [monthTx, yearTx, budgets, total] = await Promise.all([
      db.transaction.findMany({
        where: { userId: user.id, date: { gte: mStart, lt: mEnd } },
        select: { type: true, amount: true },
      }),
      db.transaction.findMany({
        where: { userId: user.id, date: { gte: yStart, lt: yEnd } },
        select: { type: true, amount: true },
      }),
      db.budget.findMany({
        where: { userId: user.id, month, year },
        select: { monthlyLimit: true, category: true },
      }),
      db.transaction.count({ where: { userId: user.id } }),
    ]);

    const monthIncome = sum(monthTx, "income");
    const monthExpenses = sum(monthTx, "expense");
    const yearIncome = sum(yearTx, "income");
    const yearExpenses = sum(yearTx, "expense");

    // Budget-used %: this month's expense TOTAL against the month's
    // overall limit (0% when no budgets — the reference's own empty form).
    const overallLimit = budgets.reduce((acc, b) => acc + b.monthlyLimit, 0);
    const budgetUsed =
      overallLimit > 0
        ? Math.min(999, Math.round((monthExpenses / overallLimit) * 100))
        : 0;

    return ok({
      user,
      overview: {
        monthIncome,
        monthExpenses,
        yearIncome,
        yearExpenses,
        budgetUsed,
        totalTransactions: total,
      },
    });
  } catch {
    return ERR.INTERNAL();
  }
}

// PATCH /api/profile — the Save Preferences button (name, currency,
// about-me, monthly savings goal).
export async function PATCH(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, profileUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const user = await db.user.update({
      where: { id: guard.user.id },
      data: {
        name: body.name,
        currency: body.currency,
        aboutMe: body.aboutMe ?? null,
        savingsGoal: body.savingsGoal ?? null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarColor: true,
        photoUrl: true,
        role: true,
        currency: true,
        aboutMe: true,
        savingsGoal: true,
        createdAt: true,
      },
    });
    return ok(user);
  } catch {
    return ERR.INTERNAL();
  }
}

function sum(list: Array<{ type: string; amount: number }>, type: string): number {
  return Math.round(list.filter((t) => t.type === type).reduce((acc, t) => acc + t.amount, 0) * 100) / 100;
}
