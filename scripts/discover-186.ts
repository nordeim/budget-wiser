// Session-186 (discovery): THE SETTINGS PICKLIST-EDITOR ARMS probe —
// the s392 close's named next-rotation candidates: "the remaining
// unwalked interiors at the reference's zero-data state (the settings
// pages' own interactive arms under ADR-022 — the picklist editor's
// focus/open faces, the s83-era construction never re-walked live ·
// the topbar search's dropdown arm if the reference's own suggestions
// ever populate)" (first-named + the conditional sibling), plus the
// standing Edit-family re-check (the discover-184/185 census — the
// reference's zero-row state; the candidate returns the day the
// reference carries rows). probe:ref STABLE (46bc2d9c, this session)
// kills the fresh-bundle candidate; the registry's latest 3.10.1
// (verified live) kills the recharts 4.0 gate. This probe answers the
// round-shape questions BEFORE the plan:
//
//   1. THE EDIT-FAMILY REACHABILITY (standing re-check) — the row
//      counts on /contacts, /leads, /accounts + the calendar chips on
//      both apps (the discover-184/185 census, one leg).
//   2. THE PICKLIST EDITOR (first-named) — does the REFERENCE's
//      /settings Config tab carry picklist ROWS at all (the settings
//      singleton's own defaults, NOT the demo data the zero-data
//      state wiped)? Census on both apps: the five cards + their row
//      counts, the bordered row face (bg/border/radius/box), the
//      Pencil/Trash2 ghost-button faces (icon size + the Trash2 red
//      pair), the RENAME OPEN arm (the Pencil CLICK → the row swaps to
//      Input + Save + X — the swapped row's faces + the mount-focus +
//      the rename Input's FOCUS ring), the X close round-trip, the ADD
//      row (the Input's placeholder + the dark Add button's face) +
//      the add-Input's focus ring. The s72 bundle decode (H-72c1)
//      predicted the construction; the s83-era margins rode it; no
//      two-app live walk ever froze these faces under ADR-022.
//   3. THE TOPBAR-SEARCH DROPDOWN (the conditional sibling) — does
//      the reference's own search populate suggestions NOW? (the s32
//      decode called the topbar search a dead stub — no value/onChange
//      wiring; the s392 close gates this candidate on the reference's
//      own suggestions ever populating.) One leg: type a seeded-term,
//      census any listbox/popover/dropdown that appears.
//   4. THE DEFAULTS TAB SIBLING — the reference's "Defaults" tab:
//      the Default Values card + the six groups' labels + the select/
//      input values (the AED/new/B/3/month/monday fallback family,
//      the M-72c4 decode). Scopes whether the walk's settings family
//      includes the Defaults arms or holds the picklist editor alone.
//
// Run: bun scripts/discover-186.ts
// (reuses the dev server on :3000 — the walk57/58 boot-site form; the
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
 * discover-184/185 census, one leg): the entity-page rows + the
 * calendar chips. The reference's rows name which edit dialogs can
 * open TWO-APP at all. */
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

/** Leg 2 — the picklist editor census: the five cards, the bordered
 * rows, the Pencil/Trash2 faces, the RENAME OPEN arm (the Pencil
 * click → the Input + Save + X swap + the mount-focus + the focus
 * ring), the X close round-trip, the ADD row's faces. */
async function probePicklist(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  const rest = await page.evaluate(() => {
    // the five ListEditor cards: key on the card-title TEXT (the s184
    // captures lesson — CardTitle renders a div, not a heading)
    const wanted = ["Contact Sources", "Lead Stages", "Activity Types", "Account Tiers", "Industries"];
    const cards: { title: string; rows: number; firstItem: string | null }[] = [];
    for (const t of wanted) {
      const h = Array.from(document.querySelectorAll("main div, main h2, main h3")).find(
        (el) => (el.textContent ?? "").trim() === t && !Array.from(el.children).some((c) => (c.textContent ?? "").includes(t)),
      );
      if (!h) {
        cards.push({ title: t, rows: -1, firstItem: null });
        continue;
      }
      // walk up to the CARD root: the first ancestor containing a row
      // div (the bordered flex row) or the empty-state <p>
      let card: Element = h;
      for (let i = 0; i < 8; i++) {
        if (card.parentElement && card.parentElement.querySelector('div.flex.items-center.gap-2.p-2.border, div[class*="border"][class*="rounded-lg"]')) {
          card = card.parentElement;
          break;
        }
        if (!card.parentElement) break;
        card = card.parentElement;
      }
      const rowEls = Array.from(card.querySelectorAll('div.flex.items-center.gap-2.p-2.border, div[class*="border"][class*="rounded-lg"]'));
      const spans = rowEls[0] ? Array.from(rowEls[0].querySelectorAll("span")) : [];
      cards.push({ title: t, rows: rowEls.length, firstItem: spans.length ? (spans[0].textContent ?? "").trim() : null });
    }
    return cards;
  });
  console.log(`\n=== ${label} SETTINGS PICKLIST @${w}x*:`);
  for (const c of rest) console.log(`  card "${c.title}": rows=${c.rows}${c.firstItem ? ` first="${c.firstItem}"` : ""}`);

  // The FIRST card's row + its Pencil/Trash2 faces
  const rowFace = await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div")).find(
      (el) => (el.textContent ?? "").trim() === "Contact Sources" && !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Contact Sources")),
    );
    if (!h) return null;
    let card: Element = h;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector('div.flex.items-center.gap-2.p-2.border, div[class*="border"][class*="rounded-lg"]')) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const row = card.querySelector('div.flex.items-center.gap-2.p-2.border, div[class*="border"][class*="rounded-lg"]');
    if (!row) return null;
    const rcs = getComputedStyle(row as HTMLElement);
    const rr = row.getBoundingClientRect();
    const buttons = Array.from(row.querySelectorAll("button"));
    const face = (el: Element) => {
      const cs = getComputedStyle(el as HTMLElement);
      const r = el.getBoundingClientRect();
      return { bg: cs.backgroundColor, color: cs.color, box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, cls: (el.getAttribute("class") ?? "").slice(0, 100) };
    };
    const svgs = Array.from(row.querySelectorAll("svg")).map((s) => `${Math.round(s.getBoundingClientRect().width)}x${Math.round(s.getBoundingClientRect().height)}`);
    return {
      row: { bg: rcs.backgroundColor, border: rcs.border, radius: rcs.borderRadius, box: `${Math.round(rr.x)},${Math.round(rr.y)} ${Math.round(rr.width)}x${Math.round(rr.height)}`, cls: (row.getAttribute("class") ?? "").slice(0, 120) },
      buttons: buttons.map((b) => ({ ...face(b), aria: b.getAttribute("aria-label") ?? "(none)" })),
      svgSizes: svgs,
    };
  });
  if (rowFace) {
    console.log(`  ROW: box=${rowFace.row.box} bg=${rowFace.row.bg} radius=${rowFace.row.radius}`);
    console.log(`    border="${rowFace.row.border}"`);
    console.log(`    cls="${rowFace.row.cls}"`);
    for (const b of rowFace.buttons) console.log(`    btn [${b.aria}] bg=${b.bg} color=${b.color} box=${b.box}\n      cls="${b.cls}"`);
    console.log(`    svg sizes=[${rowFace.svgSizes.join(" | ")}]`);
  } else {
    console.log("  ROW: NOT FOUND");
  }

  // The RENAME OPEN arm: click the FIRST card's first Pencil-equivalent
  // (the first icon-only ghost button in the row — ours aria-label
  // "Rename …", the reference's unlabeled Pencil)
  const pencil = page.locator("main div.flex.items-center.gap-2.p-2.border button, main div[class*='border'][class*='rounded-lg'] button").first();
  if (await pencil.count()) {
    await pencil.click();
    await page.waitForTimeout(900);
    const open = await page.evaluate(() => {
      // the swapped row: the row div that now contains an input
      const rowWithInput = Array.from(document.querySelectorAll('main div[class*="border"][class*="rounded-lg"]')).find((d) => d.querySelector("input"));
      const ae = document.activeElement;
      if (!rowWithInput) return { open: false as const, mountFocus: ae ? `${ae.tagName}[${(ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 24)}]` : "(none)" };
      const input = rowWithInput.querySelector("input") as HTMLInputElement | null;
      const rcs = getComputedStyle(rowWithInput as HTMLElement);
      const btns = Array.from(rowWithInput.querySelectorAll("button"));
      const face = (el: Element) => {
        const cs = getComputedStyle(el as HTMLElement);
        const r = el.getBoundingClientRect();
        return { bg: cs.backgroundColor, color: cs.color, box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, cls: (el.getAttribute("class") ?? "").slice(0, 100) };
      };
      let inputFace: { bg: string; border: string; radius: string; box: string; value: string; cls: string; ring: string; focusRing: string } | null = null;
      if (input) {
        const cs = getComputedStyle(input);
        const r = input.getBoundingClientRect();
        const ring = cs.boxShadow;
        input.focus();
        const ringF = getComputedStyle(input).boxShadow;
        inputFace = {
          bg: cs.backgroundColor,
          border: cs.border,
          radius: cs.borderRadius,
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          value: input.value,
          cls: (input.getAttribute("class") ?? "").slice(0, 100),
          ring,
          focusRing: ringF,
        };
      }
      return {
        open: true as const,
        rowCls: (rowWithInput.getAttribute("class") ?? "").slice(0, 120),
        rowBg: rcs.backgroundColor,
        mountFocus: ae ? `${ae.tagName}[${(ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 24) || "(no text)"}]` : "(none)",
        input: inputFace,
        buttons: btns.map((b) => ({ ...face(b), aria: b.getAttribute("aria-label") ?? "(none)", svg: b.querySelector("svg") ? "svg" : "text" })),
      };
    });
    console.log(`  RENAME OPEN: ${open.open ? "SWAPPED" : "NOT SWAPPED"} mountFocus=${open.mountFocus}`);
    if (open.open) {
      console.log(`    row cls="${open.rowCls}" bg=${open.rowBg}`);
      if (open.input) {
        console.log(`    input box=${open.input.box} bg=${open.input.bg} radius=${open.input.radius} value="${open.input.value}"`);
        console.log(`      border="${open.input.border}"`);
        console.log(`      cls="${open.input.cls}"`);
        console.log(`      restingRing="${open.input.ring.slice(0, 120)}"`);
        console.log(`      focusRing="${open.input.focusRing.slice(0, 140)}"`);
      }
      for (const b of open.buttons) console.log(`    btn [${b.aria}] ${b.svg} bg=${b.bg} color=${b.color} box=${b.box}`);
    }
    // The X close round-trip (the last icon button in the swapped row —
    // ours aria-label "Cancel rename"; the reference's unlabeled X)
    const xBtn = page.locator('main div[class*="border"][class*="rounded-lg"]:has(input) button').last();
    if (await xBtn.count()) {
      await xBtn.click();
      await page.waitForTimeout(700);
      const closed = await page.evaluate(() => !document.querySelector('main div[class*="border"][class*="rounded-lg"] input'));
      console.log(`    X round-trip: closed=${closed}`);
    }
  } else {
    console.log("  RENAME OPEN: NO ROW BUTTONS (zero rows?)");
  }

  // The ADD row: the first card's trailing Input + the Add button
  const addRow = await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div")).find(
      (el) => (el.textContent ?? "").trim() === "Contact Sources" && !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Contact Sources")),
    );
    if (!h) return null;
    let card: Element = h;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector('div.flex.items-center.gap-2.p-2.border, div[class*="border"][class*="rounded-lg"]')) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const addInput = Array.from(card.querySelectorAll("input")).find((i) => (i.getAttribute("placeholder") ?? "").startsWith("Add new"));
    if (!addInput) return null;
    const cs = getComputedStyle(addInput);
    const r = addInput.getBoundingClientRect();
    addInput.focus();
    const focusRing = getComputedStyle(addInput).boxShadow;
    const addBtn = addInput.parentElement ? Array.from(addInput.parentElement.querySelectorAll("button")).find((b) => b.querySelector("svg")) : null;
    let btnFace: { bg: string; color: string; box: string; cls: string; aria: string } | null = null;
    if (addBtn) {
      const bcs = getComputedStyle(addBtn);
      const br = addBtn.getBoundingClientRect();
      btnFace = { bg: bcs.backgroundColor, color: bcs.color, box: `${Math.round(br.x)},${Math.round(br.y)} ${Math.round(br.width)}x${Math.round(br.height)}`, cls: (addBtn.getAttribute("class") ?? "").slice(0, 110), aria: addBtn.getAttribute("aria-label") ?? "(none)" };
    }
    return {
      placeholder: addInput.getAttribute("placeholder"),
      inputBox: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      inputBorder: cs.border,
      inputRadius: cs.borderRadius,
      inputCls: (addInput.getAttribute("class") ?? "").slice(0, 100),
      focusRing: focusRing.slice(0, 140),
      btn: btnFace,
    };
  });
  if (addRow) {
    console.log(`  ADD ROW: placeholder="${addRow.placeholder}" box=${addRow.inputBox} radius=${addRow.inputRadius}`);
    console.log(`    border="${addRow.inputBorder}"`);
    console.log(`    cls="${addRow.inputCls}"`);
    console.log(`    focusRing="${addRow.focusRing}"`);
    if (addRow.btn) console.log(`    addBtn [${addRow.btn.aria}] bg=${addRow.btn.bg} color=${addRow.btn.color} box=${addRow.btn.box}\n      cls="${addRow.btn.cls}"`);
  } else {
    console.log("  ADD ROW: NOT FOUND");
  }
}

/** Leg 3 — the topbar-search dropdown: does typing populate any
 * suggestion surface on either app? (the s392 conditional gate.) */
async function probeTopbarSearch(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  const search = page.locator('header input, input[type="search"], input[placeholder*="Search"]').first();
  if (!(await search.count())) {
    console.log(`\n=== ${label} TOPBAR SEARCH @${w}x*: INPUT NOT FOUND`);
    return;
  }
  const ph = await search.getAttribute("placeholder");
  await search.click();
  await search.fill("Acme");
  await page.waitForTimeout(1500);
  const census = await page.evaluate(() => {
    const pop = Array.from(document.querySelectorAll('[role="listbox"], [role="dialog"], [data-radix-popper-content-wrapper], [class*="absolute"] [class*="z-50"]'));
    const visible = pop.filter((p) => {
      const r = p.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    return { popCount: visible.length, texts: visible.map((p) => (p.textContent ?? "").trim().slice(0, 80)) };
  });
  console.log(`\n=== ${label} TOPBAR SEARCH @${w}x*: placeholder="${ph}" populated=${census.popCount}`);
  for (const t of census.texts) console.log(`    pop text: "${t}"`);
  await page.keyboard.press("Escape").catch(() => undefined);
}

/** Leg 4 — the Defaults tab sibling: the Default Values card + the
 * six groups + the select/input values (the M-72c4 fallback family). */
async function probeDefaultsTab(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  const tabBtn = page.locator('main button[role="tab"], main [role="tab"]').filter({ hasText: "Defaults" }).first();
  if (!(await tabBtn.count())) {
    console.log(`\n=== ${label} DEFAULTS TAB @${w}x*: TAB NOT FOUND`);
    return;
  }
  await tabBtn.click();
  await page.waitForTimeout(1200);
  const census = await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
    const cardTitles = Array.from(document.querySelectorAll("main div, main h2, main h3"))
      .map((el) => (el.textContent ?? "").trim())
      .filter((t) => t && t.length < 40 && /default|value/i.test(t));
    const selects = Array.from(document.querySelectorAll('main button[role="combobox"]')).map((b) => (b.textContent ?? "").trim());
    const inputs = Array.from(document.querySelectorAll("main input")).map((i) => ({ type: (i as HTMLInputElement).type, value: (i as HTMLInputElement).value })).filter((i) => i.value);
    return { labels, cardTitles: cardTitles.slice(0, 5), selects, inputs: inputs.slice(0, 8) };
  });
  console.log(`\n=== ${label} DEFAULTS TAB @${w}x*:`);
  console.log(`  cardTitles=[${census.cardTitles.join(" | ")}]`);
  console.log(`  labels=[${census.labels.join(" | ")}]`);
  console.log(`  combobox values=[${census.selects.join(" | ")}]`);
  for (const i of census.inputs) console.log(`  input ${i.type}="${i.value}"`);
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[discover-186] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-186] pair state: ready (the s162 guarded form)");
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
      await probePicklist(page, base, label, w).catch((e) => console.log(`  [picklist ${label}] ERROR: ${e}`));
      await probeTopbarSearch(page, base, label, w).catch((e) => console.log(`  [topbar-search ${label}] ERROR: ${e}`));
      await probeDefaultsTab(page, base, label, w).catch((e) => console.log(`  [defaults ${label}] ERROR: ${e}`));
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
  console.error("[discover-186]", e);
  process.exit(1);
});
