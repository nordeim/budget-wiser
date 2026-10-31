import { expect, test } from "@playwright/test";

// THE APP FLOWS e2e — the Budget Wise functional battery over the four
// pages: the dashboard's KPI cards + charts, the transactions CRUD round
// trips (add/search/filter/delete with the confirmation), the budget
// set/delete round trips, and the profile preferences save. Rides the
// storageState auth (the seeded demo user, the seeded demo month).

test.describe("the dashboard", () => {
  test("renders the KPI cards from the seeded demo month", async ({ page }) => {
    await page.goto("/Dashboard");

    await expect(page.getByRole("heading", { name: "Dashboard", exact: true })).toBeVisible();
    // The seeded month: $5,000 income, $575.45 expenses, 4 transactions.
    await expect(page.getByText("$5,000.00").first()).toBeVisible();
    await expect(page.getByText("$575.45").first()).toBeVisible();
    await expect(page.locator("[aria-label='Transactions']").getByText("4")).toBeVisible();
    // The savings badge on the Balance card.
    await expect(page.getByText(/88\.5% saved/)).toBeVisible();
  });

  test("renders the donut, the budget-progress empty state, and the recent list", async ({
    page,
  }) => {
    await page.goto("/Dashboard");

    await expect(page.getByRole("img", { name: "Spending by category donut chart" })).toBeVisible();
    // No budgets seeded — the reference's own empty state.
    await expect(page.getByText("No budgets set for this month")).toBeVisible();
    // The recent transactions list renders the demo rows.
    await expect(page.getByText("Bills & Utilities").first()).toBeVisible();
    await expect(page.getByText("Transport").first()).toBeVisible();
    // The Spend Summary tabs.
    await expect(page.getByRole("tab", { name: "This Week" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "This Year" })).toBeVisible();
  });

  test("the Spend Summary tabs flip", async ({ page }) => {
    await page.goto("/Dashboard");
    await page.getByRole("tab", { name: "This Year" }).click();
    await expect(page.getByText("Year Spent")).toBeVisible();
    await expect(page.getByText("Year Earned")).toBeVisible();
    await page.getByRole("tab", { name: "This Week" }).click();
    await expect(page.getByText("Week Spent")).toBeVisible();
  });

  test("the AI Insights Generate button surfaces insights", async ({ page }) => {
    await page.goto("/Dashboard");
    await page.getByRole("button", { name: "Generate" }).click();
    await expect(page.getByText(/biggest spending category/i)).toBeVisible();
  });
});

test.describe("the transactions page", () => {
  test("renders the summary cards and the seeded rows", async ({ page }) => {
    await page.goto("/Transactions");
    await expect(page.getByRole("heading", { name: "Transactions" })).toBeVisible();
    await expect(page.getByText("Manage your income and expenses")).toBeVisible();
    await expect(page.locator("[aria-label='Total Income']").getByText("$5,000.00")).toBeVisible();
    await expect(page.locator("[aria-label='Total Expenses']").getByText("$575.45")).toBeVisible();
    // Full weekday dates (the reference's own form).
    await expect(page.getByText(/Monday, Oct 26, 2026/)).toBeVisible();
  });

  test("the search box filters rows", async ({ page }) => {
    await page.goto("/Transactions");
    const search = page.getByLabel("Search transactions");
    await search.fill("transport");
    await expect(page.getByText("Transport").first()).toBeVisible();
    await expect(page.getByText(/Monday, Oct 26, 2026/)).toBeHidden();
    await search.fill("zzz-no-match");
    await expect(page.getByText("No transactions match your filters")).toBeVisible();
  });

  test("the type filter narrows to income", async ({ page }) => {
    await page.goto("/Transactions");
    await page.getByLabel("Filter by type").click();
    await page.getByRole("option", { name: "Income" }).click();
    await expect(page.getByText("Salary").first()).toBeVisible();
    await expect(page.getByText("Transport").first()).toBeHidden();
  });

  // Session-218 (F-1): the reference's amount-direction arrows — every
  // transaction row carries a small lucide arrow immediately before its
  // amount (ArrowDownLeft w-4 h-4 text-rose-500 on expenses, ArrowUpRight
  // w-4 h-4 text-emerald-500 on incomes) on BOTH row surfaces. The seeded
  // demo month (1 Salary income + 3 expenses) exercises both forms; the
  // dashboard's recent slice takes all types, so it carries the pair too
  // (the reference's own recent list shows only expenses — its demo data
  // has no income).
  test("the seeded rows carry the amount-direction arrows (session-218 F-1)", async ({ page }) => {
    await page.goto("/Transactions");
    const down = page.locator("svg.lucide-arrow-down-left");
    const up = page.locator("svg.lucide-arrow-up-right");
    await expect(down).toHaveCount(3);
    await expect(up).toHaveCount(1);
    await expect(down.first()).toHaveClass(/w-4 h-4 text-rose-500/);
    await expect(up.first()).toHaveClass(/w-4 h-4 text-emerald-500/);

    await page.goto("/Dashboard");
    // Scoped to the recent-rows section: the Balance card's savings badge
    // carries its OWN pre-existing ArrowUpRight (the reference's badge genus),
    // so a page-wide count would double-count it.
    const recent = page.locator('section[aria-label="Recent Transactions"]');
    await expect(recent.locator("svg.lucide-arrow-down-left")).toHaveCount(3);
    await expect(recent.locator("svg.lucide-arrow-up-right")).toHaveCount(1);
  });

  test("the Add Transaction round trip (expense)", async ({ page }) => {
    await page.goto("/Transactions");
    await page.getByRole("button", { name: "Add Transaction" }).click();
    const dialog = page.getByRole("dialog", { name: "Add Transaction" });

    // The submit stays disabled until the form is valid (the reference's
    // own disabled-until-valid contract).
    await expect(dialog.getByRole("button", { name: "Add Expense" })).toBeDisabled();

    await dialog.getByLabel("Amount").fill("12.34");
    await dialog.getByLabel("Category").click();
    await page.getByRole("option", { name: "Food & Dining" }).click();
    await dialog.getByLabel("Description (optional)").fill("e2e lunch");

    const submit = dialog.getByRole("button", { name: "Add Expense" });
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByRole("dialog")).toBeHidden();

    // The new row appears at the top of the list.
    await expect(page.getByText("e2e lunch")).toBeVisible();
    await expect(page.getByText("Food & Dining").first()).toBeVisible();
  });

  test("the Income tab swaps the category vocabulary and the submit label", async ({ page }) => {
    await page.goto("/Transactions");
    await page.getByRole("button", { name: "Add Transaction" }).click();
    const dialog = page.getByRole("dialog", { name: "Add Transaction" });

    await dialog.getByRole("tab", { name: "Income" }).click();
    await dialog.getByLabel("Category").click();
    for (const label of ["Salary", "Freelance", "Investment", "Gift", "Other"]) {
      await expect(page.getByRole("option", { name: label, exact: true })).toBeVisible();
    }
    await expect(page.getByRole("option", { name: "Food & Dining" })).toBeHidden();
    // Close the listbox first — an open Radix Select aria-hides the rest
    // of the tree (the dialog's button is unreachable while it is open).
    await page.keyboard.press("Escape");
    await expect(dialog.getByRole("button", { name: "Add Income" })).toBeVisible();
    await page.keyboard.press("Escape");
  });

  test("the delete round trip with the confirmation dialog", async ({ page }) => {
    await page.goto("/Transactions");
    // Create a row to delete (isolation from the seeded set).
    await page.getByRole("button", { name: "Add Transaction" }).click();
    const dialog = page.getByRole("dialog", { name: "Add Transaction" });
    await dialog.getByLabel("Amount").fill("99.99");
    await dialog.getByLabel("Category").click();
    await page.getByRole("option", { name: "Shopping" }).click();
    await dialog.getByRole("button", { name: "Add Expense" }).click();
    // Session-194: the row title is a <p> (the reference's restyled form).
    await expect(page.getByText("Shopping").first()).toBeVisible();

    // Delete it — the confirmation alertdialog first.
    await page.getByRole("button", { name: "Delete Shopping transaction" }).first().click();
    const confirm = page.getByRole("alertdialog", { name: "Delete Transaction" });
    await expect(confirm).toBeVisible();
    await confirm.getByRole("button", { name: "Cancel" }).click();
    await expect(confirm).toBeHidden();
    await expect(page.getByText("Shopping").first()).toBeVisible();

    await page.getByRole("button", { name: "Delete Shopping transaction" }).first().click();
    await page.getByRole("alertdialog", { name: "Delete Transaction" }).getByRole("button", { name: "Delete" }).click();
    await expect(page.getByRole("alertdialog")).toBeHidden();
    await expect(page.getByText("Shopping")).toBeHidden();
  });
});

test.describe("the budgets page", () => {
  test("renders the empty state (no seeded budgets)", async ({ page }) => {
    await page.goto("/Budgets");
    await expect(page.getByRole("heading", { name: "Budgets", exact: true })).toBeVisible();
    await expect(page.getByText(/spending limits$/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "No budgets set" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Set Your First Budget" })).toBeVisible();
    // The KPI trio at zero.
    await expect(page.locator("[aria-label='Active Budgets']").getByText("0")).toBeVisible();
  });

  test("the Set Budget round trip (dialog validation + the populated card)", async ({ page }) => {
    await page.goto("/Budgets");
    await page.getByRole("button", { name: "Set Budget" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Set Budget" });

    // Disabled until valid.
    await expect(dialog.getByRole("button", { name: "Set Budget" })).toBeDisabled();

    await dialog.getByLabel("Monthly Limit").fill("500");
    await dialog.getByLabel("Category").click();
    await page.getByRole("option", { name: "Food & Dining" }).click();

    const submit = dialog.getByRole("button", { name: "Set Budget" });
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByRole("dialog")).toBeHidden();

    // The populated card: "$X of $500.00" (spent may include the earlier
    // add-transaction test's Food & Dining row), On Track, remaining.
    await expect(page.getByRole("heading", { name: "Food & Dining" })).toBeVisible();
    await expect(page.getByText(/\$[\d,.]+ of \$500\.00/)).toBeVisible();
    await expect(page.getByText("On Track").first()).toBeVisible();
    await expect(page.getByText(/\$[\d,.]+ remaining/)).toBeVisible();
    // The overall usage bar picked it up.
    await expect(page.locator("[aria-label='Overall Budget Usage']")).toBeVisible();
  });

  test("the delete round trip with the confirmation alertdialog", async ({ page }) => {
    // Set a budget to delete.
    await page.goto("/Budgets");
    await page.getByRole("button", { name: "Set Budget" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Set Budget" });
    await dialog.getByLabel("Monthly Limit").fill("100");
    await dialog.getByLabel("Category").click();
    await page.getByRole("option", { name: "Entertainment" }).click();
    await dialog.getByRole("button", { name: "Set Budget" }).click();
    await expect(page.getByRole("heading", { name: "Entertainment" })).toBeVisible();

    await page.getByRole("button", { name: "Delete Entertainment budget" }).click();
    const confirm = page.getByRole("alertdialog", { name: "Delete Budget" });
    await expect(confirm.getByText("This action cannot be undone.")).toBeVisible();
    await confirm.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByRole("alertdialog")).toBeHidden();
    await expect(page.getByRole("heading", { name: "Entertainment" })).toBeHidden();
  });
});

test.describe("the profile page", () => {
  test("renders the identity card and the financial overview", async ({ page }) => {
    await page.goto("/Profile");
    await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
    await expect(page.getByText("sepnetflix2023@outlook.com")).toBeVisible();
    await expect(page.getByText(/Member since/)).toBeVisible();
    // Session-194: the card titles are DIVs (the reference's restyled
    // CardTitle form — tracking-tight text-base font-semibold).
    await expect(page.getByText("Preferences", { exact: true })).toBeVisible();
    await expect(page.getByText("Financial Overview", { exact: true })).toBeVisible();
    await expect(page.getByText(/Summary/)).toBeVisible();
  });

  test("the Save Preferences round trip (about-me + the counter)", async ({ page }) => {
    await page.goto("/Profile");
    // Wait for the profile to hydrate BEFORE filling — the form's values
    // land asynchronously (fetchProfile), and a fill racing the hydration
    // re-render can append instead of replace.
    await expect(page.getByText(/Member since/)).toBeVisible();
    await expect(page.getByText(/Member since …/)).toBeHidden();
    const aboutMe = page.getByLabel("About Me");
    await aboutMe.fill("Saving for a house");
    await expect(page.getByText("18/120")).toBeVisible();

    await page.getByRole("button", { name: "Save Preferences" }).click();
    await expect(page.getByText("Preferences saved")).toBeVisible();

    // A reload keeps the value (the persisted round trip).
    await page.reload();
    await expect(page.getByLabel("About Me")).toHaveValue("Saving for a house");
  });

  test("the currency select carries the five options", async ({ page }) => {
    // Session-194: the reference's currency control is a NATIVE select
    // (w-full border-slate-200 rounded-lg) — not a Radix one.
    await page.goto("/Profile");
    const select = page.getByLabel("Currency");
    await expect(select).toBeVisible();
    for (const label of ["USD ($)", "EUR (€)", "GBP (£)", "CAD (C$)", "AUD (A$)"]) {
      await expect(select.locator("option", { hasText: label })).toBeAttached();
    }
    await expect(select).toHaveValue("USD");
  });
});

test.describe("the 404 surface (the reference's interpolated title + quoted path)", () => {
  // Session-196: live-probed on the reference (2026-10-28) — its SPA
  // answers a 404 with the tab title "<Humanized last non-empty
  // segment> | Budget Wise" (hyphens + camelCase split, first-letter
  // capitalization, rest-case preserved) and its body quotes the
  // unmatched pathname WITHOUT the leading slash. Our SSR keeps the
  // s191 absolute "Budget Wise" (the reference's own served head
  // answers the same) — the NotFoundBody effect updates the tab
  // post-hydration, so the assertion WAITS for the client title.

  test("the title interpolates the humanized path (post-hydration)", async ({ page }) => {
    await page.goto("/some-fake-route");
    // Wait for the client-side title update (the hydration race family).
    await expect
      .poll(() => page.title(), { timeout: 10_000 })
      .toBe("Some Fake Route | Budget Wise");
  });

  test("the title DECODES percent-escapes before humanizing (session-207 F-1)", async ({ page }) => {
    // The reference's platform decodes the pathname before
    // interpolating — live-probed 2026-10-29 on its served HTML head:
    // /Curl%20Probe%20207%20Test → "Curl Probe 207 Test | Budget Wise".
    // The genus was invisible to every prior census (all prior probes
    // used unencoded paths) and to every gate — the e2e regression for
    // the s207 decode fix. The body still quotes the raw encoded path
    // (the same genus the reference keeps).
    await page.goto("/Curl%20Probe%20207%20Test");
    await expect
      .poll(() => page.title(), { timeout: 10_000 })
      .toBe("Curl Probe 207 Test | Budget Wise");
    await expect(page.getByText("Page Not Found")).toBeVisible();
    await expect(
      page.getByText(
        'The page "Curl%20Probe%20207%20Test" could not be found in this application.',
      ),
    ).toBeVisible();
  });

  test("the message quotes the path without the leading slash", async ({ page }) => {
    await page.goto("/fake/deep/route");
    await expect(page.getByText("Page Not Found")).toBeVisible();
    await expect(
      page.getByText('The page "fake/deep/route" could not be found in this application.'),
    ).toBeVisible();
  });

  test("the Go Home pill returns to the landing and restores its title", async ({ page }) => {
    await page.goto("/nonexistent-route-xyz");
    await expect
      .poll(() => page.title(), { timeout: 10_000 })
      .toBe("Nonexistent Route Xyz | Budget Wise");
    await page.getByRole("link", { name: "Go Home" }).click();
    await page.waitForURL("/");
    // The route change restores the landing's title (the metadata
    // system re-applies it — no stranded 404 title).
    await expect
      .poll(() => page.title(), { timeout: 10_000 })
      .toBe("Budget Wise");
  });
});

test.describe("the page titles (the capitalized nav-href forms)", () => {
  // Session-196: found live — the .jsx alias stubs dropped the lowercase
  // pages' metadata, so /Transactions, /Budgets, /Profile (the reference's
  // own nav-href forms — the links every navbar click follows) served the
  // layout default "Budget Wise". The reference serves the full titles on
  // its capitalized routes (curl-verified 2026-10-28). /Dashboard titles
  // "Budget Wise" on BOTH apps (the reference's own form — it carries no
  // page metadata by design).

  test("each capitalized route serves its page title", async ({ page }) => {
    const cases: Array<[string, string]> = [
      ["/Dashboard", "Budget Wise"],
      ["/Transactions", "Transactions | Budget Wise"],
      ["/Budgets", "Budgets | Budget Wise"],
      ["/Profile", "Profile | Budget Wise"],
    ];
    for (const [route, title] of cases) {
      await page.goto(route);
      await expect(page).toHaveTitle(title);
    }
  });
});
