import { describe, expect, it } from "vitest";

import {
  ABOUT_ME_MAX,
  CURRENCIES,
  DEFAULT_CURRENCY,
  currencyLabel,
  currencySymbol,
  isCurrencyCode,
} from "@/lib/currency";

describe("the currency vocabulary (the reference's Profile select)", () => {
  it("the five currencies, byte-matched to the reference's options", () => {
    expect(CURRENCIES.map((c) => c.label)).toEqual([
      "USD ($)",
      "EUR (€)",
      "GBP (£)",
      "CAD (C$)",
      "AUD (A$)",
    ]);
  });

  it("the codes and symbols pair correctly", () => {
    expect(currencySymbol("USD")).toBe("$");
    expect(currencySymbol("EUR")).toBe("€");
    expect(currencySymbol("GBP")).toBe("£");
    expect(currencySymbol("CAD")).toBe("C$");
    expect(currencySymbol("AUD")).toBe("A$");
  });

  it("defaults to USD (the reference's selected option)", () => {
    expect(DEFAULT_CURRENCY).toBe("USD");
  });

  it("isCurrencyCode guards the enum", () => {
    expect(isCurrencyCode("USD")).toBe(true);
    expect(isCurrencyCode("usd")).toBe(false);
    expect(isCurrencyCode("BTC")).toBe(false);
    expect(isCurrencyCode("")).toBe(false);
  });

  it("unknown codes fall back to the dollar symbol/label passthrough", () => {
    expect(currencySymbol("XYZ")).toBe("$");
    expect(currencyLabel("XYZ")).toBe("XYZ");
  });

  it("the About-Me cap is the reference's 120", () => {
    expect(ABOUT_ME_MAX).toBe(120);
  });
});
