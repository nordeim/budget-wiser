import { describe, expect, it } from "vitest";

import {
  budgetSpending,
  money,
  monthLabel,
  monthRange,
  round1,
  savingsRate,
  spendingByCategory,
  weeklyBuckets,
  yearRange,
} from "@/lib/budget-math";

describe("budgetSpending", () => {
  it("computes spent/remaining/percent and the On Track state", () => {
    const b = budgetSpending({ monthlyLimit: 500, spent: 100 });
    expect(b.spent).toBe(100);
    expect(b.limit).toBe(500);
    expect(b.remaining).toBe(400);
    expect(b.percentUsed).toBe(20);
    expect(b.onTrack).toBe(true);
    expect(b.badgeLabel).toBe("On Track");
  });

  it("a zero-spending budget is On Track (the reference's own $0 of $500 state)", () => {
    const b = budgetSpending({ monthlyLimit: 500, spent: 0 });
    expect(b.onTrack).toBe(true);
    expect(b.badgeLabel).toBe("On Track");
    expect(b.remaining).toBe(500);
  });

  it("the final fifth turns amber (Nearly Full)", () => {
    const b = budgetSpending({ monthlyLimit: 100, spent: 80 });
    expect(b.percentUsed).toBe(80);
    expect(b.badgeLabel).toBe("Nearly Full");
    expect(b.barClass).toContain("bg-amber-500");
  });

  it("crossing the limit turns rose (Over Budget)", () => {
    const b = budgetSpending({ monthlyLimit: 100, spent: 120 });
    expect(b.percentUsed).toBe(120);
    expect(b.onTrack).toBe(false);
    expect(b.badgeLabel).toBe("Over Budget");
    expect(b.barClass).toContain("bg-rose-500");
  });

  it("a zero limit reads 0% and stays neutral (no divide-by-zero)", () => {
    const b = budgetSpending({ monthlyLimit: 0, spent: 50 });
    expect(b.percentUsed).toBe(0);
    expect(b.onTrack).toBe(false); // 50 > 0
  });

  it("negative inputs are clamped, never NaN", () => {
    const b = budgetSpending({ monthlyLimit: -10, spent: -5 });
    expect(Number.isFinite(b.percentUsed)).toBe(true);
    expect(b.limit).toBe(0);
    expect(b.spent).toBe(0);
  });
});

describe("spendingByCategory", () => {
  it("aggregates ONLY expenses, income excluded", () => {
    const out = spendingByCategory([
      { type: "expense", amount: 100, category: "transport" },
      { type: "expense", amount: 50, category: "transport" },
      { type: "income", amount: 5000, category: "salary" },
      { type: "expense", amount: 75.45, category: "bills" },
    ]);
    expect(out.get("transport")).toBe(150);
    expect(out.get("bills")).toBe(75.45);
    expect(out.has("salary")).toBe(false);
  });

  it("the reference's demo month aggregates to its exact totals", () => {
    const out = spendingByCategory([
      { type: "income", amount: 5000, category: "salary" },
      { type: "expense", amount: 400, category: "other" },
      { type: "expense", amount: 100, category: "transport" },
      { type: "expense", amount: 75.45, category: "bills" },
    ]);
    const total = [...out.values()].reduce((a, b) => a + b, 0);
    expect(Math.round(total * 100) / 100).toBe(575.45); // the reference's Expenses KPI
  });
});

describe("savingsRate", () => {
  it("the reference's badge: 88.5% saved on the demo month", () => {
    expect(savingsRate(5000, 575.45)).toBe(88.5);
  });

  it("zero income answers null (no badge renders)", () => {
    expect(savingsRate(0, 100)).toBeNull();
    expect(savingsRate(-5, 100)).toBeNull();
  });

  it("overspending answers a negative rate", () => {
    expect(savingsRate(100, 150)).toBe(-50);
  });
});

describe("money", () => {
  it("formats with thousands separators and two decimals", () => {
    expect(money(4424.55)).toBe("$4,424.55");
    expect(money(5000)).toBe("$5,000.00");
    expect(money(75.45)).toBe("$75.45");
  });

  it("negatives carry the leading sign (the reference's row form)", () => {
    expect(money(-75.45)).toBe("-$75.45");
  });

  it("honors the currency symbol", () => {
    expect(money(10, "€")).toBe("€10.00");
  });
});

describe("weeklyBuckets", () => {
  const tx = (dayOffset: number, type: string, amount: number) => {
    const d = new Date(2026, 9, 26); // Monday, Oct 26 2026
    d.setDate(d.getDate() + dayOffset);
    return { type, amount, date: d };
  };

  it("buckets Mon..Sun with the day labels", () => {
    const out = weeklyBuckets([tx(0, "expense", 75.45)], new Date(2026, 9, 26));
    expect(out.map((b) => b.day)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    expect(out[0].spent).toBe(75.45);
    expect(out[1].spent).toBe(0);
  });

  it("a Sunday entry lands in the PREVIOUS week's last bucket when anchored Monday", () => {
    // Oct 25 2026 is a Sunday — the day BEFORE the anchor Monday.
    const sunday = new Date(2026, 9, 25);
    const out = weeklyBuckets(
      [{ type: "expense", amount: 100, date: sunday }],
      new Date(2026, 9, 26),
    );
    expect(out[6].spent).toBe(0); // not in this week at all
  });

  it("income lands in the earned column, not spent", () => {
    const out = weeklyBuckets([tx(2, "income", 500)], new Date(2026, 9, 26));
    expect(out[2].earned).toBe(500);
    expect(out[2].spent).toBe(0);
  });

  it("the reference's demo week: spent $75.45, earned $0.00", () => {
    const out = weeklyBuckets(
      [
        { type: "income", amount: 5000, date: new Date(2026, 9, 1) },
        { type: "expense", amount: 400, date: new Date(2026, 9, 10) },
        { type: "expense", amount: 100, date: new Date(2026, 9, 25) },
        { type: "expense", amount: 75.45, date: new Date(2026, 9, 26) },
      ],
      new Date(2026, 9, 27), // Tuesday of the same anchor week
    );
    const spent = out.reduce((a, b) => a + b.spent, 0);
    const earned = out.reduce((a, b) => a + b.earned, 0);
    expect(Math.round(spent * 100) / 100).toBe(75.45);
    expect(earned).toBe(0);
  });
});

describe("the range helpers", () => {
  it("monthRange spans the whole local month", () => {
    const { start, end } = monthRange(2026, 10);
    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(9);
    expect(start.getDate()).toBe(1);
    expect(end.getMonth()).toBe(10);
    expect(end.getDate()).toBe(1);
  });

  it("yearRange spans the whole local year", () => {
    const { start, end } = yearRange(2026);
    expect(start.getMonth()).toBe(0);
    expect(end.getFullYear()).toBe(2027);
  });

  it("monthLabel renders the reference's header form", () => {
    expect(monthLabel(2026, 10)).toBe("October 2026");
    expect(monthLabel(2026, 1)).toBe("January 2026");
  });
});
