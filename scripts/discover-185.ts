// Session-185 (discovery): THE QUICK-LOG DIALOG-OPEN REACHABILITY +
// BY-TYPE-CARD probe — the s390 close's named next-rotation candidates:
// "the quick-log quartet's OPEN-dialog faces — the Log Activity dialog's
// create-focus arm, the walk54 CREATE-family sibling at this call site"
// (first-named) + "the by-type card's checkbox-footer + ••• face — the
// s13 construction never re-walked under ADR-022" (second-named), plus
// the standing Edit-family re-check (the discover-184 census — the
// reference's zero-row state; the candidate returns the day the
// reference carries rows). This probe answers the round-shape questions
// BEFORE the plan:
//
//   1. THE EDIT-FAMILY REACHABILITY (standing re-check) — the row
//      counts on /contacts, /leads, /accounts + the calendar chips on
//      both apps: if the reference still carries ZERO rows the W7/wce/
//      Mke edit dialogs stay unreachable there (the two-app walk has
//      no REF arm).
//   2. THE QUICK-LOG CLICK — does the REFERENCE's quartet open the
//      Log Activity dialog at all (the L-125c2 dead-stub doctrine
//      killed its More-Filters sibling; the s76 Mce decode — `onSubmit:
//      N => mutate({...N, type: i || N.type})` — says the reference's
//      dialog is FUNCTIONAL, its quick-log preset riding the submit)?
//      Census on both apps: the [role=dialog][data-state=open] root,
//      the title, the label vocabulary, the mount-focus element, the
//      dialog geometry, the select trigger's face + value (the
//      starts-at-Call doctrine, L-76c6), the footer pair, the CANCEL
//      round-trip, then the Log WhatsApp variant (the emerald preset
//      arm — does the reference's DEFAULT-variant quartet member open
//      the same dialog?).
//   3. THE BY-TYPE CARD — the footer construction on both apps: the
//      checkbox face (the stock 16px + the dark checked fill) + the
//      label + the ••• button face (the s13 construction never
//      re-walked under ADR-022).
//
// Run: bun scripts/discover-185.ts
// (reuses the dev server on :3000 — the walk57 boot-site form; the
// reference rides the sweep-state storageState pair, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

import { preflightPairState } from "./sweep-state";

const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const root = resolve(here, "..");
    if (existsSync(join(root, "package.json"))) return root;
  } catch {
    /* fall through to the cwd */
  }
  return process.cwd();
})();
const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

/** Leg 1 — the standing Edit-family reachability re-check (the
 * discover-184 census, one leg): the entity-page rows + the calendar
 * chips. The reference's rows name which edit dialogs can open
 * TWO-APP at all. */
async function censusRows(page: import("@playwright/test").Page, url: string, label: string, w: number): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("main table tbody tr")).filter(
      (tr) => (tr.textContent ?? "").trim().length > 0,
    );
    const rowMenuButtons = Array.from(document.querySelectorAll('main button[aria-haspopup="true"], main button[aria-haspopup="menu"]'));
    return {
      tableRows: rows.length,
      rowMenuCount: rowMenuButtons.length,
    };
  });
  console.log(`  [${label}@${w}] ${new URL(url).pathname}: rows=${census.tableRows} rowMenus=${census.rowMenuCount}`);
}

async function censusCalendar(page: import("@playwright/test").Page, base: string, label: string, w: number): Promise<void> {
  await page.goto(`${base}/calendar`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('main [class*="cursor-pointer"][class*="truncate"], main button[class*="text-xs"]')).filter((el) => (el.textContent ?? "").includes(":"));
    return { chipCount: chips.length };
  });
  console.log(`  [${label}@${w}] calendar chips: ${census.chipCount}`);
}

/** Leg 2 — the quick-log CLICK: open the Log Activity dialog via the
 * quartet's first member (Log Call) on both apps, census the OPEN
 * interior, close, then re-open via Log WhatsApp (the emerald preset
 * arm). The reference's functional-vs-dead-stub verdict lives here. */
async function probeQuickLogOpen(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const drive = async (triggerText: string) => {
    await page.locator("main button", { hasText: triggerText }).first().click();
    await page.waitForTimeout(900);
    const c = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"][data-state="open"]');
      if (!dlg) return { open: false as const };
      const r = dlg.getBoundingClientRect();
      const cs = getComputedStyle(dlg as HTMLElement);
      const title = Array.from(dlg.querySelectorAll("h1,h2,[role=\"heading\"]")).map((h) => (h.textContent ?? "").trim()).filter(Boolean);
      const labels = Array.from(dlg.querySelectorAll("label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
      const ae = document.activeElement;
      const triggers = Array.from(dlg.querySelectorAll('button[role="combobox"]')).map((b) => {
        const tcs = getComputedStyle(b);
        const br = b.getBoundingClientRect();
        return {
          text: (b.textContent ?? "").trim(),
          cls: (b.getAttribute("class") ?? "").slice(0, 90),
          bg: tcs.backgroundColor,
          border: tcs.border,
          box: `${Math.round(br.x)},${Math.round(br.y)} ${Math.round(br.width)}x${Math.round(br.height)}`,
        };
      });
      const buttons = Array.from(dlg.querySelectorAll("button")).map((b) => (b.textContent ?? "").trim()).filter((t) => ["Cancel", "Log Activity", "Save Changes"].includes(t));
      const textarea = dlg.querySelector("textarea");
      const input = dlg.querySelector("input");
      const overlay = document.querySelector('[data-radix-dialog-overlay], [class*="fixed inset-0"]');
      return {
        open: true as const,
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        bg: cs.backgroundColor,
        border: cs.border,
        radius: cs.borderRadius,
        shadow: cs.boxShadow.slice(0, 140),
        title,
        labels,
        mountFocus: ae ? `${ae.tagName}${ae.id ? `#${ae.id}` : ""}/${(ae.getAttribute("aria-label") ?? ae.textContent ?? "").trim().slice(0, 24) || "(no text)"}` : "(none)",
        triggers,
        buttons,
        textareaPlaceholder: textarea?.getAttribute("placeholder") ?? "(none)",
        textareaRows: textarea?.getAttribute("rows") ?? "(none)",
        inputType: input?.getAttribute("type") ?? "(none)",
        overlayCount: overlay ? 1 : 0,
      };
    });
    console.log(`\n=== ${label} "${triggerText}" CLICK @${w}x*:`);
    if (!c.open) {
      console.log("  DIALOG NOT OPEN (the dead-stub verdict candidate)");
      return;
    }
    console.log(`  dialog box=${c.box} bg=${c.bg} radius=${c.radius}`);
    console.log(`  border="${c.border}"`);
    console.log(`  shadow="${c.shadow}"`);
    console.log(`  title=[${c.title.join(" | ")}] labels=[${c.labels.join(" | ")}]`);
    console.log(`  mountFocus=${c.mountFocus}`);
    for (const t of c.triggers) {
      console.log(`  combobox "${t.text}" bg=${t.bg} box=${t.box}`);
      console.log(`    border="${t.border}"`);
      console.log(`    cls="${t.cls}"`);
    }
    console.log(`  footerButtons=[${c.buttons.join(" | ")}]`);
    console.log(`  textarea placeholder="${c.textareaPlaceholder}" rows=${c.textareaRows} · inputType=${c.inputType} · overlay=${c.overlayCount}`);

    // the CANCEL round-trip closes the dialog
    const cancel = page.locator('[role="dialog"] button', { hasText: "Cancel" }).first();
    if (await cancel.count()) {
      await cancel.click();
      await page.waitForTimeout(600);
      const closed = await page.evaluate(() => !document.querySelector('[role="dialog"][data-state="open"]'));
      console.log(`  CANCEL round-trip: closed=${closed}`);
    } else {
      await page.keyboard.press("Escape").catch(() => undefined);
      await page.waitForTimeout(600);
    }
  };

  await drive("Log Call");
  await drive("Log WhatsApp");
}

/** Leg 3 — the by-type card footer census (the s13 construction never
 * re-walked under ADR-022): the checkbox + label + ••• button faces on
 * both apps. */
async function probeByTypeCard(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
  const census = await page.evaluate(() => {
    // the s184 captures lesson: CardTitle renders a div, not h3 — key
    // on the title TEXT across all elements, then walk up to the card
    // root (the reference's own construction carries no heading tags
    // either)
    const h = Array.from(document.querySelectorAll("main div, main h2, main h3")).find((el) =>
      (el.textContent ?? "").trim() === "Activities by Type" &&
      !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Activities by Type")),
    );
    if (!h) return { found: false as const };
    // walk up to the CARD ROOT: the first ancestor that contains BOTH
    // the title AND a checkbox (the footer's own toggle) — stops well
    // below the rail/main containers, immune to the timeline's own
    // "More actions" dots (the M-185-p0 calibration)
    let card: Element = h;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector('button[role="checkbox"]')) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const cardR = card.getBoundingClientRect();
    const checkbox = card.querySelector('button[role="checkbox"]');
    const dots = Array.from(card.querySelectorAll("button")).find((b) =>
      (b.textContent ?? "").trim() === "•••" || (b.getAttribute("aria-label") ?? "").includes("More actions"),
    );
    const label = Array.from(card.querySelectorAll("label")).find((l) => (l.textContent ?? "").trim() === "Activities");
    const face = (el: Element) => {
      const cs = getComputedStyle(el as HTMLElement);
      const r = el.getBoundingClientRect();
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        radius: cs.borderRadius,
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    };
    return {
      found: true as const,
      cardBox: `${Math.round(cardR.x)},${Math.round(cardR.y)} ${Math.round(cardR.width)}x${Math.round(cardR.height)}`,
      checkbox: checkbox
        ? { ...face(checkbox), checked: checkbox.getAttribute("aria-checked") ?? "(none)", cls: (checkbox.getAttribute("class") ?? "").slice(0, 110) }
        : null,
      dots: dots ? { ...face(dots), cls: (dots.getAttribute("class") ?? "").slice(0, 110), ariaLabel: dots.getAttribute("aria-label") ?? "(none)" } : null,
      label: label ? { ...face(label), cls: (label.getAttribute("class") ?? "").slice(0, 90) } : null,
    };
  });
  console.log(`\n=== ${label} BY-TYPE CARD @${w}x*:`);
  if (!census.found) {
    console.log("  CARD NOT FOUND (the rail is display:none below lg — desktop axis only)");
    return;
  }
  console.log(`  card=${census.cardBox}`);
  if (census.checkbox) {
    console.log(`  checkbox checked=${census.checkbox.checked} bg=${census.checkbox.bg} box=${census.checkbox.box}`);
    console.log(`    border="${census.checkbox.border}" radius=${census.checkbox.radius}`);
    console.log(`    cls="${census.checkbox.cls}"`);
  } else {
    console.log("  checkbox MISSING");
  }
  if (census.dots) {
    console.log(`  dots bg=${census.dots.bg} color=${census.dots.color} box=${census.dots.box} label="${census.dots.ariaLabel}"`);
    console.log(`    cls="${census.dots.cls}"`);
  } else {
    console.log("  dots MISSING");
  }
  if (census.label) {
    console.log(`  label color=${census.label.color} cls="${census.label.cls}"`);
  }
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[discover-185] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-185] pair state: ready (the s162 guarded form)");
    const w = 1440;
    for (const [label, base] of [
      ["OURS", OUR_URL],
      ["REF ", REF_URL],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      console.log(`\n########## ${label} @${w}x900 ##########`);
      for (const p of ["/contacts", "/leads", "/accounts"]) {
        await censusRows(page, `${base}${p}`, label, w).catch((e) => console.log(`  [${p} ${label}] ERROR: ${e}`));
      }
      await censusCalendar(page, base, label, w).catch((e) => console.log(`  [calendar ${label}] ERROR: ${e}`));
      await probeQuickLogOpen(page, base, label, w).catch((e) => console.log(`  [quick-log ${label}] ERROR: ${e}`));
      await probeByTypeCard(page, base, label, w).catch((e) => console.log(`  [by-type ${label}] ERROR: ${e}`));
      await ctx.close();
    }
  } finally {
    await browser.close().catch(() => undefined);
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
}

main().catch((e) => {
  console.error("[discover-185]", e);
  process.exit(1);
});
