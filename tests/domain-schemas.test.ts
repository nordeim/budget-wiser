import { describe, expect, it } from "vitest";

import {
  budgetCreateSchema,
  profileUpdateSchema,
  transactionCreateSchema,
} from "@/lib/schemas";

describe("transactionCreateSchema", () => {
  const valid = {
    type: "expense",
    amount: 75.45,
    category: "bills",
    date: "2026-10-26",
  };

  it("accepts the reference's own demo rows", () => {
    expect(transactionCreateSchema.safeParse(valid).success).toBe(true);
    expect(
      transactionCreateSchema.safeParse({ ...valid, type: "income", category: "salary", amount: 5000 })
        .success,
    ).toBe(true);
  });

  it("the category must belong to the chosen type's vocabulary", () => {
    const cross = transactionCreateSchema.safeParse({ ...valid, category: "salary" });
    expect(cross.success).toBe(false);
  });

  it("amount must be positive and finite", () => {
    for (const amount of [0, -5, NaN, Infinity]) {
      const r = transactionCreateSchema.safeParse({ ...valid, amount });
      expect(r.success).toBe(false);
    }
  });

  it("amount caps at a sane billion-dollar bound", () => {
    const r = transactionCreateSchema.safeParse({ ...valid, amount: 1e10 });
    expect(r.success).toBe(false);
    expect(transactionCreateSchema.safeParse({ ...valid, amount: 999_999_999 }).success).toBe(true);
  });

  it("the type is the income/expense enum only", () => {
    const r = transactionCreateSchema.safeParse({ ...valid, type: "transfer" });
    expect(r.success).toBe(false);
  });

  it("the date must parse (yyyy-mm-dd or full ISO)", () => {
    expect(transactionCreateSchema.safeParse({ ...valid, date: "not-a-date" }).success).toBe(false);
    expect(transactionCreateSchema.safeParse({ ...valid, date: "" }).success).toBe(false);
    expect(transactionCreateSchema.safeParse({ ...valid, date: "2026-10-26T10:00:00Z" }).success).toBe(true);
  });

  it("description is optional and blank collapses to undefined", () => {
    const r = transactionCreateSchema.safeParse({ ...valid, description: "   " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.description).toBeUndefined();
  });

  it("description caps at 200 chars", () => {
    const r = transactionCreateSchema.safeParse({ ...valid, description: "x".repeat(201) });
    expect(r.success).toBe(false);
  });
});

describe("budgetCreateSchema", () => {
  it("accepts category + positive limit", () => {
    const r = budgetCreateSchema.safeParse({ category: "food", monthlyLimit: 500 });
    expect(r.success).toBe(true);
  });

  it("the category must be an EXPENSE category (income categories rejected)", () => {
    expect(budgetCreateSchema.safeParse({ category: "salary", monthlyLimit: 500 }).success).toBe(false);
    expect(budgetCreateSchema.safeParse({ category: "nonsense", monthlyLimit: 500 }).success).toBe(false);
  });

  it("the limit must be positive", () => {
    expect(budgetCreateSchema.safeParse({ category: "food", monthlyLimit: 0 }).success).toBe(false);
    expect(budgetCreateSchema.safeParse({ category: "food", monthlyLimit: -1 }).success).toBe(false);
  });

  it("month/year are coerced and bounded (absent defaults to current)", () => {
    const r = budgetCreateSchema.safeParse({ category: "food", monthlyLimit: 10, month: "10", year: "2026" });
    expect(r.success).toBe(true);
    expect(budgetCreateSchema.safeParse({ category: "food", monthlyLimit: 10, month: 13 }).success).toBe(false);
    expect(budgetCreateSchema.safeParse({ category: "food", monthlyLimit: 10, year: 1999 }).success).toBe(false);
  });
});

describe("profileUpdateSchema", () => {
  const valid = { name: "sepnetflix2023", currency: "USD" };

  it("accepts the minimal pair (about-me and goal optional)", () => {
    const r = profileUpdateSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.aboutMe).toBeUndefined();
      expect(r.data.savingsGoal).toBeUndefined();
    }
  });

  it("the currency is the five-code enum", () => {
    expect(profileUpdateSchema.safeParse({ ...valid, currency: "BTC" }).success).toBe(false);
    expect(profileUpdateSchema.safeParse({ ...valid, currency: "EUR" }).success).toBe(true);
  });

  it("a blank name is rejected (the field is required)", () => {
    expect(profileUpdateSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
  });

  it("about-me caps at the reference's 120 chars", () => {
    expect(profileUpdateSchema.safeParse({ ...valid, aboutMe: "x".repeat(120) }).success).toBe(true);
    expect(profileUpdateSchema.safeParse({ ...valid, aboutMe: "x".repeat(121) }).success).toBe(false);
  });

  it("the savings goal accepts null (the clear) and non-negative numbers", () => {
    const cleared = profileUpdateSchema.safeParse({ ...valid, savingsGoal: null });
    expect(cleared.success).toBe(true);
    expect(profileUpdateSchema.safeParse({ ...valid, savingsGoal: -5 }).success).toBe(false);
    expect(profileUpdateSchema.safeParse({ ...valid, savingsGoal: 1000 }).success).toBe(true);
  });
});
