import { describe, expect, it } from "vitest";

import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORY_META,
  INCOME_CATEGORY_META,
  categoriesForType,
  categoryMeta,
  categoryOrderIndex,
  isKnownCategory,
} from "@/lib/categories";

describe("the category vocabularies (the reference's own lists)", () => {
  it("the eight expense categories, byte-matched to the reference's listbox", () => {
    expect([...EXPENSE_CATEGORIES]).toEqual([
      "food",
      "transport",
      "entertainment",
      "shopping",
      "bills",
      "healthcare",
      "education",
      "other",
    ]);
  });

  it("the five income categories, byte-matched to the reference's Income tab listbox", () => {
    expect([...INCOME_CATEGORIES]).toEqual([
      "salary",
      "freelance",
      "investment",
      "gift",
      "other_income",
    ]);
  });

  it("the two families are DISJOINT (no shared raw value)", () => {
    for (const raw of EXPENSE_CATEGORIES) {
      expect((INCOME_CATEGORIES as readonly string[]).includes(raw)).toBe(false);
    }
  });

  it("the labels byte-match the reference's option strings", () => {
    expect(EXPENSE_CATEGORY_META.food.label).toBe("Food & Dining");
    expect(EXPENSE_CATEGORY_META.transport.label).toBe("Transport");
    expect(EXPENSE_CATEGORY_META.bills.label).toBe("Bills & Utilities");
    expect(EXPENSE_CATEGORY_META.other.label).toBe("Other");
    expect(INCOME_CATEGORY_META.salary.label).toBe("Salary");
    expect(INCOME_CATEGORY_META.freelance.label).toBe("Freelance");
    expect(INCOME_CATEGORY_META.investment.label).toBe("Investment");
    expect(INCOME_CATEGORY_META.gift.label).toBe("Gift");
    expect(INCOME_CATEGORY_META.other_income.label).toBe("Other");
  });

  it("every category carries a label, tile tint, chart color, and icon", () => {
    for (const raw of [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]) {
      const meta = categoryMeta(raw);
      expect(meta.label.length).toBeGreaterThan(0);
      expect(meta.tile).toMatch(/bg-/);
      expect(meta.color).toMatch(/^#[0-9a-f]{6}$/);
      expect(meta.icon).toBeTruthy(); // a lucide forwardRef component (renderable)
    }
  });

  it("categoriesForType swaps the list with the tab (the dialog contract)", () => {
    expect(categoriesForType("expense")).toHaveLength(8);
    expect(categoriesForType("income")).toHaveLength(5);
    expect(categoriesForType("income")).not.toContain("food");
    expect(categoriesForType("expense")).not.toContain("salary");
  });

  it("isKnownCategory answers the vocabulary membership", () => {
    expect(isKnownCategory("expense", "food")).toBe(true);
    expect(isKnownCategory("income", "food")).toBe(false);
    expect(isKnownCategory("income", "salary")).toBe(true);
    expect(isKnownCategory("expense", "nonsense")).toBe(false);
  });

  it("categoryMeta falls back neutrally on a foreign raw value (never crashes)", () => {
    const meta = categoryMeta("something-foreign");
    expect(meta.label).toBe("something-foreign");
    // Session-194: the fallback rides the re-pinned Other palette.
    expect(meta.color).toBe("#6b7280");
  });

  it("the donut's canonical order index is stable", () => {
    expect(categoryOrderIndex("food")).toBe(0);
    expect(categoryOrderIndex("other")).toBe(7);
    expect(categoryOrderIndex("salary")).toBe(0);
    expect(categoryOrderIndex("other_income")).toBe(4);
  });

  it("the reference's donut legend colors (Other gray, Transport blue, Bills red)", () => {
    // Session-194: re-pinned by the live round-trip probe (Other now the
    // gray-500 #6b7280; food emerald; shopping amber; entertainment violet).
    expect(EXPENSE_CATEGORY_META.other.color).toBe("#6b7280");
    expect(EXPENSE_CATEGORY_META.transport.color).toBe("#3b82f6");
    expect(EXPENSE_CATEGORY_META.bills.color).toBe("#ef4444");
    expect(EXPENSE_CATEGORY_META.food.color).toBe("#10b981");
    expect(EXPENSE_CATEGORY_META.shopping.color).toBe("#f59e0b");
    expect(EXPENSE_CATEGORY_META.entertainment.color).toBe("#8b5cf6");
  });
});
