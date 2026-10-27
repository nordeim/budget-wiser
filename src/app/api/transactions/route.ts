import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { transactionCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

// GET /api/transactions — the session user's full history, newest first.
// (The Transactions page filters client-side; the dashboard reads its own
// aggregate route, so this stays the simple full list.)
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const transactions = await db.transaction.findMany({
      where: { userId: guard.user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return ok(transactions);
  } catch {
    return ERR.INTERNAL();
  }
}

// POST /api/transactions — the Add Transaction dialog. Day precision on
// the date (time-of-day zeroed — the reference's week/month buckets key
// on the DAY, never the time).
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, transactionCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const day = new Date(body.date);
    if (Number.isNaN(day.getTime())) return ERR.BAD_REQUEST("Enter a valid date");
    day.setHours(0, 0, 0, 0);
    const transaction = await db.transaction.create({
      data: {
        userId: guard.user.id,
        type: body.type,
        amount: body.amount,
        category: body.category,
        date: day,
        description: body.description ?? null,
      },
    });
    return ok(transaction, 201);
  } catch {
    return ERR.INTERNAL();
  }
}
