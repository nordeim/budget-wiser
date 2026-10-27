// Budget Wise — the Profile page's currency preference vocabulary
// (byte-matched to the reference's Currency select, live-snapshotted
// 2026-10-27: USD ($), EUR (€), GBP (£), CAD (C$), AUD (A$)).

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "CAD", symbol: "C$", label: "CAD (C$)" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export function isCurrencyCode(raw: string): raw is CurrencyCode {
  return CURRENCIES.some((c) => c.code === raw);
}

export function currencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? "$";
}

export function currencyLabel(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.label ?? code;
}

/** The About-Me textarea cap (the reference's live "0/120" counter). */
export const ABOUT_ME_MAX = 120;
