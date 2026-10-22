// Zod schemas for the auth-family API inputs — session-163 (the Zod layer).
//
// Pattern donor: zero-balance (`zod ^4`, per-route schemas, field-level
// messages, nothing reaches Prisma unvalidated) at digma's seam placement
// (a dedicated server-side validation module consumed by every auth
// route). Every message string below is the CURRENT route string — the
// migration must not change a single user-facing word the unit + e2e
// suites pin.
//
// Adoption scope (the incremental doctrine): the AUTH FAMILY ONLY this
// round (login, signup, verify, resend, forgot-password, reset-password).
// The CRUD family keeps the asString/isBad* guards in api.ts — no
// double-validation churn; the schemas are the seam future routes adopt.

import { z } from "zod";

import { VERIFICATION_CODE_LENGTH } from "@/lib/verification";

/** The shared email contract: trimmed, lowercased, the 160-char cap that
 *  bounds the SQLite lookup. The pre-163 asString form TRUNCATED silently;
 *  the schema REJECTS with an honest message (both reference repos'
 *  posture — digma: "Email must be reasonably sized"). The `message`
 *  override is per-consumer: the missing/non-string TYPE error is the
 *  caller-specific required message, not a generic zod string. */
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
    // Session-163: the N-63i "160 everywhere" truncation-parity contract
    // rides the schema now (the pre-163 form read login's email
    // untruncated while signup stored the 160-prefix — a >160 signup
    // could never log in; both surfaces cap at 160 in the one seam).
    email: z
      .string({ message: "Email and password are required" })
      .trim()
      .toLowerCase()
      .max(160, "Email must be reasonably sized"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    // The route's composite required-check, preserved verbatim: EITHER
    // field missing answers the ONE message (the per-field ladder would
    // change a pinned string).
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
