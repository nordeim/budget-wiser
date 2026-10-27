import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { budgetCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

// GET /api/budgets?month=&year= — the month's budgets with their spent
// totals pre-joined (the Budgets page cards + the dashboard's Budget
// Progress both consume this shape; the client never re-derives spending).
// Defaults to the CURRENT month.
export async function GET(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const now = new Date();
  const url = new URL(req.url);
  const month = Number(url.searchParams.get("month")) || now.getMonth() + 1;
  const year = Number(url.searchParams.get("year")) || now.getFullYear();

  try {
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month, 1, 0, 0, 0, 0);

    const [budgets, expenses] = await Promise.all([
      db.budget.findMany({
        where: { userId: guard.user.id, month, year },
        orderBy: [{ createdAt: "asc" }],
      }),
      db.transaction.findMany({
        where: {
          userId: guard.user.id,
          type: "expense",
          date: { gte: start, lt: end },
        },
        select: { category: true, amount: true },
      }),
    ]);

    const spentByCategory = new Map<string, number>();
    for (const t of expenses) {
      spentByCategory.set(t.category, (spentByCategory.get(t.category) ?? 0) + t.amount);
    }

    const withSpent = budgets.map((b) => ({
      ...b,
      spent: Math.round((spentByCategory.get(b.category) ?? 0) * 100) / 100,
    }));
    return ok(withSpent);
  } catch {
    return ERR.INTERNAL();
  }
}

// POST /api/budgets — the Set Budget dialog. Upsert semantics on the
// (user, category, month) unique key: setting the same category twice
// UPDATES the limit (the reference re-opens the same budget row).
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, budgetCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const now = new Date();
  const month = body.month ?? now.getMonth() + 1;
  const year = body.year ?? now.getFullYear();

  try {
    const budget = await db.budget.upsert({
      where: {
        userId_category_month_year: {
          userId: guard.user.id,
          category: body.category,
          month,
          year,
        },
      },
      update: { monthlyLimit: body.monthlyLimit },
      create: {
        userId: guard.user.id,
        category: body.category,
        monthlyLimit: body.monthlyLimit,
        month,
        year,
      },
    });
    return ok(budget, 201);
  } catch {
    return ERR.INTERNAL();
  }
}
