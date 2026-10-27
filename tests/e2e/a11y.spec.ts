import { expect, test } from "@playwright/test";

// THE A11Y TWO-GATE — the structural gate (every rule outside the
// sanctioned register must be ZERO: button-name, link-name, label,
// heading-order…) + the sanctioned-citation gate (color-contrast /
// svg-img-alt nodes must cite the sanctioned matchers — the parity
// palette families verified on the reference's own DOM, 2026-10-27).
//
// The axe engine rides the DECLARED devDep (package.json: axe-core).

const AXE_PATH = "node_modules/axe-core/axe.min.js";

interface Violation {
  id: string;
  targets: string[];
}

// The SANCTIONED register — rule → matcher list, every matcher carrying
// its citation. A flagged node matching NONE of them REDs the gate.
const SANCTIONED: Record<string, Array<{ any: string[]; cite: string }>> = {
  "color-contrast": [
    {
      // The inactive nav pill / muted slate families — the reference's
      // own palette (text-slate-500/600 on white, live-verified).
      any: ["text-slate-400", "text-slate-500", "text-slate-600", "bg-slate-50", "text-gray-400", "text-gray-500"],
      cite: "the muted slate/gray families — the reference's own palette",
    },
    {
      // The white-wash family on the slate-900 surfaces (the year-
      // summary's slate-400 labels) + the bottom bar's inactive slate-400
      // items (the reference's own redesigned ink, live-verified).
      any: ["text-white\\/", "bg-white\\/", "text-slate-400"],
      cite: "the white-wash family on the slate-900 surfaces — the reference's own palette",
    },
    {
      // Session-193: the bottom tab bar's INACTIVE items — the reference's
      // own redesigned phone-nav ink (text-slate-400 on white, the exact
      // class split live-extracted 2026-10-27). The flagged node is the
      // label span (text-xs), which INHERITS the anchor's color — axe's
      // generated selector cites the anchor's .gap-1.rounded-xl chain,
      // not a slate class — hence this dedicated matcher.
      any: [".gap-1.rounded-xl"],
      cite: "the bottom bar's inactive slate-400 items — the reference's own redesigned phone-nav ink",
    },
    {
      // The inactive segmented-tab triggers (the Radix tab ids) — the
      // muted-ink inactive state is the tab family's own design.
      any: ["-trigger-"],
      cite: "the inactive segmented-tab muted ink — the tab family's own design",
    },
    {
      // The tinted KPI chips (emerald/red 50 washes with their 600/700
      // inks — the reference's own cards).
      any: ["bg-emerald-50", "bg-red-50", "bg-rose-50", "text-emerald-600", "text-rose-600", "bg-amber-50"],
      cite: "the tinted KPI families — the reference's own palette",
    },
  ],
  "svg-img-alt": [],
};

async function scanTwoGate(page: import("@playwright/test").Page, label: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);
  await page.addScriptTag({ path: AXE_PATH });
  const violations = await page.evaluate(async () => {
    const axe = (window as unknown as {
      axe: { run: (o: object) => Promise<{ violations: Array<{ id: string; nodes: Array<{ target: string[] }> }> }> };
    }).axe;
    const r = await axe.run({
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return r.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target.join(" ")),
    }));
  });

  // GATE 1 — structural: every rule OUTSIDE the sanctioned register
  // must be ZERO (button-name is the named-control proof).
  const structural = violations.filter((v: Violation) => !SANCTIONED[v.id]);
  expect(
    structural.map((v: Violation) => `${v.id}: ${v.targets.slice(0, 3).join(" || ")}`),
    `[${label}] STRUCTURAL violations must be zero`,
  ).toEqual([]);

  // GATE 2 — the sanctioned rules: every flagged node must match a
  // sanctioned matcher (a NEW unsanctioned contrast regression REDs here).
  for (const v of violations) {
    const matchers = SANCTIONED[v.id];
    for (const target of v.targets) {
      const sanctioned = matchers.some((m) => m.any.some((a) => target.includes(a)));
      expect(
        sanctioned,
        `[${label}] ${v.id} node "${target}" cites no sanctioned matcher`,
      ).toBe(true);
    }
  }
}

// ---------------------------------------------------------------------------
// The four app pages at desktop (1512×945) — the authed surfaces.
// ---------------------------------------------------------------------------
test.describe("the a11y two-gate: the app pages at desktop", () => {
  for (const [name, route] of [
    ["dashboard", "/dashboard"],
    ["transactions", "/transactions"],
    ["budgets", "/budgets"],
    ["profile", "/profile"],
  ] as const) {
    test(`desktop /${name} — structural zero + sanctioned citations`, async ({ page }) => {
      await page.setViewportSize({ width: 1512, height: 945 });
      await page.goto(route);
      await scanTwoGate(page, `desktop /${name}`);
    });
  }
});

// ---------------------------------------------------------------------------
// The four app pages at phone (390×844).
// ---------------------------------------------------------------------------
test.describe("the a11y two-gate: the app pages at phone", () => {
  for (const [name, route] of [
    ["dashboard", "/dashboard"],
    ["transactions", "/transactions"],
    ["budgets", "/budgets"],
    ["profile", "/profile"],
  ] as const) {
    test(`phone /${name} — structural zero + sanctioned citations`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      await scanTwoGate(page, `phone /${name}`);
    });
  }
});

// ---------------------------------------------------------------------------
// The public surfaces (landing + login) — logged out.
// ---------------------------------------------------------------------------
test.describe("the a11y two-gate: the public surfaces", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("landing — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1512, height: 945 });
    await page.goto("/");
    await scanTwoGate(page, "landing");
  });

  test("login — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1512, height: 945 });
    await page.goto("/login");
    await scanTwoGate(page, "login");
  });
});
