// Zod schemas for the API inputs — the Budget Wise seam.
//
// Pattern donor: zero-balance (`zod ^4`, per-route schemas, field-level
// messages, nothing reaches Prisma unvalidated). The auth family below is
// carried over VERBATIM from the CRM scaffold (its message strings are
// pinned by the unit + e2e suites); the CRUD family is the Budget Wise
// vocabulary (transactions, budgets, profile).
//
// The FK-EXISTENCE checks and merged-record invariants stay route-side
// (parseBody → ownership checks → mutation — a DB-bound check cannot live
// in a schema).

import { z } from "zod";

import { VERIFICATION_CODE_LENGTH } from "@/lib/verification";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES } from "@/lib/categories";
import { CURRENCIES, ABOUT_ME_MAX } from "@/lib/currency";

/** The shared email contract: trimmed, lowercased, the 160-char cap that
 *  bounds the SQLite lookup. The schema REJECTS with an honest message. */
const emailField = (typeMessage: string) =>
  z
    .string({ message: typeMessage })
    .trim()
    .toLowerCase()
    .max(160, "Email must be reasonably sized");

const emailFormat = emailField("Enter a valid email address").regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Enter a valid email address",
);

export const emailSchema = emailFormat;

/** Passwords: the 8-char minimum every password-setting surface enforces. */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email and password are required" })
      .trim()
      .toLowerCase()
      .max(160, "Email must be reasonably sized"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    // The composite required-check, preserved verbatim: EITHER field
    // missing answers the ONE message.
    if (!body.email || !body.password) {
      ctx.addIssue({ code: "custom", message: "Email and password are required", path: [] });
    }
  });

export const signupSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .max(80)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  email: emailFormat,
  password: passwordSchema,
});

export const verifySchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
  code: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === VERIFICATION_CODE_LENGTH, "Please enter all 6 digits"),
});

export const resendSchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailFormat,
});

export const resetPasswordSchema = z.object({
  reset_token: z
    .string({ message: "Invalid or expired reset token" })
    .trim()
    .min(1, "Invalid or expired reset token")
    .max(200, "Token must be reasonably sized"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(200, "Password must be reasonably sized"),
});

// ---------------------------------------------------------------------------
// Budget Wise CRUD family
// ---------------------------------------------------------------------------

/** Positive money amounts — display-currency units, two-decimal sane cap
 *  ($1,000,000,000 guards float nonsense without touching real budgets). */
const amountField = z
  .number({ message: "Enter a valid amount" })
  .refine((v) => Number.isFinite(v), "Enter a valid amount")
  .refine((v) => v > 0, "Amount must be greater than zero")
  .refine((v) => v < 1_000_000_000, "Amount is too large")
  .refine((v) => Math.round(v * 100) === v * 100 || Math.abs(v * 100 - Math.round(v * 100)) < 1e-6, "Amount supports at most two decimals");

/** The transaction day — a yyyy-mm-dd (or full ISO) string, day precision. */
const dateField = z
  .string({ message: "Enter a valid date" })
  .trim()
  .min(1, "Enter a valid date")
  .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date");

export const transactionCreateSchema = z
  .object({
    type: z.enum(TRANSACTION_TYPES, { message: "Select a transaction type" }),
    amount: amountField,
    category: z.string({ message: "Select a category" }).min(1, "Select a category"),
    date: dateField,
    description: z
      .string()
      .trim()
      .max(200, "Description must be reasonably sized")
      .transform((v) => (v === "" ? undefined : v))
      .optional(),
  })
  .superRefine((body, ctx) => {
    // The category must belong to the chosen type's vocabulary — the
    // reference's dialog swaps the list with the tab, so a cross-type
    // category is a client bug, not user input.
    const list = body.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!(list as readonly string[]).includes(body.category)) {
      ctx.addIssue({
        code: "custom",
        message: "Select a category",
        path: ["category"],
      });
    }
  });

export const budgetCreateSchema = z.object({
  category: z
    .string({ message: "Select a category" })
    .refine((v) => (EXPENSE_CATEGORIES as readonly string[]).includes(v), "Select a category"),
  monthlyLimit: amountField,
  // Absent month/year default to the CURRENT month (the reference's dialog
  // is always the current month — "Set a monthly spending limit for
  // October 2026").
  month: z.coerce
    .number()
    .int()
    .min(1)
    .max(12)
    .optional(),
  year: z.coerce
    .number()
    .int()
    .min(2000)
    .max(2100)
    .optional(),
});

export const budgetUpdateSchema = z.object({
  monthlyLimit: amountField,
});

const currencyCodes = CURRENCIES.map((c) => c.code) as [string, ...string[]];

export const profileUpdateSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .min(1, "Invalid name")
    .max(80, "Name must be reasonably sized"),
  currency: z.enum(currencyCodes, { message: "Select a currency" }),
  aboutMe: z
    .string()
    .max(ABOUT_ME_MAX, `About me must be ${ABOUT_ME_MAX} characters or fewer`)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  savingsGoal: z
    .number({ message: "Enter a valid savings goal" })
    .refine((v) => Number.isFinite(v) && v >= 0, "Enter a valid savings goal")
    .refine((v) => v < 1_000_000_000, "Savings goal is too large")
    .nullable()
    .optional(),
});
