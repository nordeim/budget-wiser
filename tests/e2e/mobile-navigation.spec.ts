import { expect, test } from "@playwright/test";

// REGRESSION: the mobile navigation sheet. The reference app shipped NO
// mobile navigation for 100+ censused sessions (its sidebar simply
// disappears below `md`) — our hand-rolled drawer was the documented
// fix-over-defect. Session-147 (probe:ref #119's parity event): the
// reference FIXED the defect itself (a Radix Sheet, walk37-decoded), and
// our drawer was re-derived onto the same construction (the repo's own
// Radix dialog primitives + the byte-decoded MOBILE_NAV_SHEET
// contracts). This suite now pins the mirrored sheet + the kept
// behavioral supersets (the resize-past-md auto-close, the dual
// body+main lock, the focus contracts).

test.describe("mobile navigation sheet", () => {
  test("hamburger opens the sheet with every nav destination", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    // No desktop sidebar at 390px.
    await expect(page.locator("aside").first()).toBeHidden();

    // The trigger: the reference's exact label + the stock ghost
    // construction (walk37).
    const trigger = page.getByRole("button", { name: "Open navigation" });
    await expect(trigger).toBeVisible();

    // Open the sheet — the accessible name is the h2 title "CRM" (the
    // Radix aria-labelledby wiring; the reference's own name).
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "CRM" });
    await expect(dialog).toBeVisible();

    // Every destination is reachable from the sheet.
    for (const label of [
      "Dashboard",
      "Accounts",
      "Contacts",
      "Leads",
      "Calendar",
      "Activities",
      "Reports",
      "Settings",
    ]) {
      await expect(dialog.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
  });

  test("tapping a sheet link navigates and closes the sheet", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation" }).click();
    const dialog = page.getByRole("dialog", { name: "CRM" });
    await dialog.getByRole("link", { name: "Leads", exact: true }).click();

    // Session-24 (S24-P2): the nav hrefs are the reference's CAPITALIZED
    // paths — the sheet's Leads link lands on /Leads (rendered in place
    // per S24-P1, never normalized to the lowercase canonical).
    await page.waitForURL("**/Leads");
    await expect(page.getByRole("heading", { name: "Leads" })).toBeVisible();
    await expect(dialog).toBeHidden();
  });

  test("Escape closes the sheet and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    const trigger = page.getByRole("button", { name: "Open navigation" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "CRM" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // Session-65 (N-65h): the RESTORE half of the title — the sheet's
    // close returns focus to the trigger (Radix's onCloseAutoFocus, the
    // WCAG 2.4.3 contract — the reference's own behavior, live-verified
    // on both apps at walk37).
    await expect(trigger).toBeFocused();
  });

  test("opening the sheet moves focus INTO the sheet (S12-P1)", async ({ page }) => {
    // S12-P1 regression (kept contract, now Radix's own FocusScope): the
    // open sheet must hold focus inside the panel — keyboard users never
    // Tab through the background page behind the dialog.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    const trigger = page.getByRole("button", { name: "Open navigation" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "CRM" });
    await expect(dialog).toBeVisible();

    // Radix focuses the first focusable (the sheet's Close button — the
    // reference's own behavior, walk37-censused on both apps).
    await expect
      .poll(
        async () =>
          page.evaluate(() => {
            const dialog = document.querySelector('[role="dialog"][data-state="open"]');
            return dialog ? dialog.contains(document.activeElement) : false;
          }),
        { timeout: 3000 },
      )
      .toBe(true);
  });

  test("body scroll is locked while the sheet is open (react-remove-scroll + our main lock)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation" }).click();
    // Radix's react-remove-scroll locks body (the data-scroll-locked
    // marker, the reference's own mechanism); OUR superset clamps the
    // main scroller too (body alone never covered it — the shell's main
    // is the ONLY scroller).
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
    expect(await page.evaluate(() => document.querySelector("main")?.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    // The release rides the exit animation: Radix keeps the scroll lock
    // until the 300ms slide-out completes (the reference's own sheet
    // behaves the same — its data-[state=closed]:duration-300), so the
    // unlocked state lands asynchronously.
    await expect
      .poll(async () => page.evaluate(() => getComputedStyle(document.body).overflow))
      .not.toBe("hidden");
    await expect
      .poll(async () => page.evaluate(() => document.querySelector("main")?.style.overflow))
      .not.toBe("hidden");
  });

  test("growing past md auto-closes the sheet AND releases both scroll locks", async ({ page }) => {
    // S8-P1 regression (OUR kept superset — the reference does not
    // auto-close): session-7 moved the drawer from lg to md (768px) but
    // left the auto-close media listener at 1024px. Resizing from 700 to
    // 800px with the sheet open hid it (md:hidden) while body AND main
    // stayed overflow:hidden — the app became unscrollable. The sheet
    // must close and unlock at the SAME breakpoint it hides.
    await page.setViewportSize({ width: 700, height: 844 });
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Open navigation" }).click();
    const dialog = page.getByRole("dialog", { name: "CRM" });
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
    expect(await page.evaluate(() => document.querySelector("main")?.style.overflow)).toBe("hidden");

    // Grow past md (768px): the sheet must close too, releasing the locks.
    await page.setViewportSize({ width: 800, height: 844 });

    await expect(dialog).toBeHidden();
    // Both locks released (the desktop sidebar is now the nav).
    await expect
      .poll(async () => page.evaluate(() => getComputedStyle(document.body).overflow))
      .not.toBe("hidden");
    await expect
      .poll(async () => page.evaluate(() => document.querySelector("main")?.style.overflow))
      .not.toBe("hidden");
    // And the desktop sidebar took over.
    await expect(page.locator("aside").first()).toBeVisible();
  });

  test("desktop shows the persistent sidebar instead", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/dashboard");
    await expect(page.locator("aside").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
  });

  test("the closed sheet is UNMOUNTED (the s112 permanently-mounted trap retired with the Radix construction); open, Tab wraps inside the panel (N-66f)", async ({ page }) => {
    // Session-66 (N-66f) re-anchored for the Radix construction: closed,
    // the sheet is NOT in the DOM at all (Radix unmounts the portal when
    // closed — a strictly stronger contract than the old hand-rolled
    // inert attribute, and the permanently-mounted drawer that shadowed
    // [role="dialog"] CSS selectors (the s112 walk's third iteration) is
    // gone structurally). Open, Radix's FocusScope wraps Tab inside the
    // content — focus never escapes the dialog while it is open.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");

    // (1) CLOSED: no dialog in the DOM.
    expect(await page.locator('[role="dialog"]').count()).toBe(0);

    // Open and settle focus entry (the Close button focuses first).
    await page.getByRole("button", { name: "Open navigation" }).click();
    const panel = page.locator('[role="dialog"][data-state="open"]');
    await expect(panel).toBeVisible();

    // (2) The wrap arms: the focusable order inside the content is
    // [Close button, 8 links] — the LAST focusable is the Settings
    // link, the FIRST is the Close.
    const settingsLink = panel.getByRole("link", { name: "Settings", exact: true });
    await settingsLink.focus();
    await expect(settingsLink).toBeFocused();

    // Tab from the last focusable WRAPS to the sheet's FIRST focusable
    // (the Close button), never past the panel edge.
    await page.keyboard.press("Tab");
    const closeBtn = panel.getByRole("button", { name: "Close", exact: true });
    await expect(closeBtn).toBeFocused();

    // Shift+Tab from the first wraps BACK to the last.
    await page.keyboard.press("Shift+Tab");
    await expect(settingsLink).toBeFocused();
  });

  test("no route overflows the 390px viewport (the LIVE-battery sweep, pinned)", async ({ page }) => {
    // Session-69 (the 69-c rotation's coverage catalog): the ten-route
    // zero-overflow sweep ran LIVE-only every session — never e2e-
    // pinned. Both Dashboard casings covered (the root "/" and the
    // "/Dashboard" alias — the S24-P1 capital-route pair). The sheet
    // stays CLOSED here: the closed state's scrollW contract is the
    // regression surface (a re-broken sidebar would push scrollWidth
    // past the viewport exactly like the reference's pre-fix defect).
    await page.setViewportSize({ width: 390, height: 844 });
    const routes = [
      "/",
      "/Dashboard",
      "/accounts",
      "/contacts",
      "/leads",
      "/calendar",
      "/activities",
      "/reports",
      "/settings",
      "/profile",
    ];
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("domcontentloaded");
      const scrollW = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(scrollW, `${route}: horizontal overflow at 390px`).toBeLessThanOrEqual(390);
    }
  });

  test("the sheet OPEN never overflows the 390px viewport (the seeded-state open-sheet guard)", async ({ page }) => {
    // Session-104 (S104-P2) re-anchored for the Radix construction: the
    // ten-route sweep above pins the CLOSED state only. The OPEN state's
    // 390px contract: the sheet content (the w-72 dialog itself — no
    // inner panel wrapper in the Radix construction) never overflows.
    // This runs against the SEEDED e2e.db (the global setup pushes +
    // seeds db/e2e.db) — the seeded-state mobile face the zero-data
    // drift sweep cannot see.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("button", { name: "Open navigation" }).click();
    const dialog = page.getByRole("dialog", { name: "CRM" });
    await expect(dialog).toBeVisible();
    // the s94 exact-selector protocol, s147-re-anchored: the CONTENT is
    // the [role="dialog"][data-state="open"] element itself (w-72), no
    // inner panel div.
    const panel = page.locator('[role="dialog"][data-state="open"]');

    const openProbe = await page.evaluate(() => {
      const panelEl = document.querySelector(
        '[role="dialog"][data-state="open"]',
      ) as HTMLElement | null;
      return {
        // (a) the OPEN state's document-level contract: nothing — sheet,
        // overlay, or the locked main behind — may push past the frame.
        docScrollW: document.documentElement.scrollWidth,
        // (b) the content's INTERNAL contract: no horizontal overflow
        // inside the 288px column (long labels, badges, or a future
        // nav-section regression would show up here first).
        panelClientW: panelEl?.clientWidth ?? -1,
        panelScrollW: panelEl?.scrollWidth ?? -1,
        // (c) the design geometry: w-72 computes 288px at 390 — the
        // sm:max-w-sm cap (384px) stays inert at this width.
        panelRectW: panelEl ? Math.round(panelEl.getBoundingClientRect().width) : -1,
        // (d) every destination reachable with the sheet out.
        linkCount: panelEl ? panelEl.querySelectorAll("a").length : -1,
      };
    });
    expect(openProbe.docScrollW, "the OPEN sheet overflows the 390px frame").toBeLessThanOrEqual(390);
    expect(openProbe.panelScrollW, "the content overflows its own column").toBeLessThanOrEqual(openProbe.panelClientW);
    expect(openProbe.panelRectW, "the sheet left its w-72 budget (288px at 390)").toBe(288);
    expect(openProbe.linkCount, "the open sheet must expose every destination").toBe(8);
  });
});
