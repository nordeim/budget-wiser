// Session-187 (discovery): THE PROFILE PHOTO-UPLOAD + SETTINGS DATA-TAB
// ARMS probe — the s394 close's named next-rotation candidates: "the
// remaining unwalked interiors at the reference's zero-data state (the
// profile page's own interactive arms under ADR-022 — the photo-upload
// family's focus/open faces, the s30-era construction never re-walked
// live · the settings Data-tab arms [the template/export button
// family's focus faces — the s26/s83 margins walked, the focus faces
// never])" (first-named + second-named), plus the standing re-checks
// (the discover-184/185/186 Edit-family census — the reference's
// zero-row state; the topbar-search dropdown arm gated on the
// reference's own suggestions ever populating). probe:ref STABLE
// (46bc2d9c, this session) kills the fresh-bundle candidate; the
// registry's latest 3.10.1 (verified live) kills the recharts 4.0 gate.
// This probe answers the round-shape questions BEFORE the plan:
//
//   1. THE EDIT-FAMILY REACHABILITY (standing re-check) — the row
//      counts on /contacts, /leads, /accounts + the calendar chips on
//      both apps (the discover-184/185/186 census, one leg).
//   2. THE PROFILE PAGE (first-named) — the reference's /Profile
//      route's own interactive arms: the Personal Information card
//      (the avatar's face, the Upload Photo outline button's resting
//      + FOCUS faces, the hidden file input's construction, the Full
//      Name input's resting + focus ring, the DISABLED email/role
//      inputs' faces, the dark Save Changes button's face) + the
//      right-column four-card census (the labels). The s30-era
//      construction never re-walked live under ADR-022.
//   3. THE SETTINGS DATA-TAB ARMS (second-named) — the Import
//      Templates card's three outline buttons + the Export Data card's
//      four + the Danger Zone's tinted card + the RESET-gated
//      destructive button: the RESTING faces (the s26/s83 margins
//      walked) + the FOCUS faces (never walked) + the disabled-state
//      face of the reset button.
//   4. THE TOPBAR-SEARCH DROPDOWN (the standing conditional gate) —
//      does the reference's own search populate suggestions NOW?
//      (the s32 decode called the topbar search a dead stub; the
//      s392/394 closes gate this candidate on the reference's own
//      suggestions ever populating.) One leg: type a seeded-term,
//      census any listbox/popover/dropdown that appears.
//
// Run: bun scripts/discover-187.ts
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
 * discover-184/185/186 census, one leg): the entity-page rows + the
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

/** Leg 2 — the profile page census: the Personal Information card's
 * interactive arms (the avatar, the Upload Photo button's resting +
 * focus faces, the hidden file input, the Full Name input's focus
 * ring, the disabled email/role faces, the dark Save button) + the
 * right-column four-card labels. */
async function probeProfile(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/profile`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2800);

  const face = (el: Element) => {
    const cs = getComputedStyle(el as HTMLElement);
    const r = el.getBoundingClientRect();
    return {
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      radius: cs.borderRadius,
      boxShadow: cs.boxShadow.slice(0, 160),
      box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      cls: (el.getAttribute("class") ?? "").slice(0, 130),
    };
  };

  const census = await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
    const cardTitles = Array.from(document.querySelectorAll("main div"))
      .map((el) => (el.textContent ?? "").trim())
      .filter((t) => t.length > 0 && t.length < 30);
    const buttons = Array.from(document.querySelectorAll("main button")).map((b) => ({
      text: (b.textContent ?? "").trim().slice(0, 40),
      aria: b.getAttribute("aria-label") ?? "(none)",
      disabled: (b as HTMLButtonElement).disabled,
    }));
    const fileInput = document.querySelector('main input[type="file"]') as HTMLInputElement | null;
    const inputs = Array.from(document.querySelectorAll("main input")).map((i) => ({
      type: (i as HTMLInputElement).type,
      id: i.id,
      placeholder: (i as HTMLInputElement).placeholder,
      value: ((i as HTMLInputElement).value ?? "").slice(0, 30),
      disabled: (i as HTMLInputElement).disabled,
      cls: (i.getAttribute("class") ?? "").slice(0, 120),
    }));
    // the avatar: the first rounded-full overflow-hidden span in main
    const avatar = Array.from(document.querySelectorAll("main span[class*=\"rounded-full\"]")).find((s) => {
      const r = s.getBoundingClientRect();
      return r.width >= 60 && r.height >= 60;
    }) ?? null;
    const h1 = document.querySelector("main h1");
    return {
      h1: h1 ? (h1.textContent ?? "").trim() : null,
      labels,
      buttons,
      fileInput: fileInput ? { accept: fileInput.accept, cls: (fileInput.getAttribute("class") ?? "") } : null,
      inputs,
      avatarFound: !!avatar,
      avatarCls: avatar ? (avatar.getAttribute("class") ?? "").slice(0, 130) : null,
      smallCardLabels: Array.from(document.querySelectorAll("main p")).map((p) => (p.textContent ?? "").trim()).filter(Boolean).slice(0, 12),
    };
  });
  console.log(`\n=== ${label} PROFILE @${w}x*:`);
  console.log(`  h1="${census.h1}"`);
  console.log(`  labels=[${census.labels.join(" | ")}]`);
  console.log(`  avatarFound=${census.avatarFound} cls="${census.avatarCls}"`);
  console.log(`  fileInput=${census.fileInput ? `accept="${census.fileInput.accept}" cls="${census.fileInput.cls}"` : "NOT FOUND"}`);
  for (const i of census.inputs) console.log(`  input ${i.type} id="${i.id}" ph="${i.placeholder}" val="${i.value}" disabled=${i.disabled}\n    cls="${i.cls}"`);
  for (const b of census.buttons) console.log(`  button "${b.text}" aria="${b.aria}" disabled=${b.disabled}`);
  console.log(`  smallCards=[${census.smallCardLabels.join(" | ")}]`);

  // The Upload Photo button: resting + FOCUS faces
  const uploadBtn = page.locator("main button").filter({ hasText: "Upload Photo" }).first();
  if (await uploadBtn.count()) {
    const resting = await uploadBtn.evaluate(face).catch(() => null);
    console.log(`  UPLOAD BTN resting: bg=${resting?.bg} color=${resting?.color} box=${resting?.box}\n    cls="${resting?.cls}"`);
    await uploadBtn.focus();
    const focused = await uploadBtn.evaluate(face).catch(() => null);
    console.log(`  UPLOAD BTN focused: boxShadow="${focused?.boxShadow.slice(0, 140)}"`);
  } else {
    console.log("  UPLOAD BTN: NOT FOUND");
  }

  // The Full Name input's focus ring (the first editable text input)
  const nameInput = page.locator('main input[id="display_name"]').first();
  if (!(await nameInput.count())) {
    console.log("  NAME INPUT (id=display_name): NOT FOUND");
  } else {
    const resting = await nameInput.evaluate(face).catch(() => null);
    console.log(`  NAME INPUT resting: bg=${resting?.bg} border="${resting?.border}" box=${resting?.box}`);
    await nameInput.focus();
    const focused = await nameInput.evaluate(face).catch(() => null);
    console.log(`  NAME INPUT focused: boxShadow="${focused?.boxShadow.slice(0, 140)}"`);
  }

  // The Save Changes button's face (dark primary)
  const saveBtn = page.locator("main button").filter({ hasText: "Save Changes" }).first();
  if (await saveBtn.count()) {
    const f = await saveBtn.evaluate(face).catch(() => null);
    console.log(`  SAVE BTN: bg=${f?.bg} color=${f?.color} box=${f?.box}\n    cls="${f?.cls}"`);
    await saveBtn.focus();
    const ff = await saveBtn.evaluate(face).catch(() => null);
    console.log(`  SAVE BTN focused: boxShadow="${ff?.boxShadow.slice(0, 140)}"`);
  } else {
    console.log("  SAVE BTN: NOT FOUND");
  }
}

/** Leg 3 — the settings Data-tab arms: the Import Templates card's
 * three outline buttons, the Export Data card's four, the Danger
 * Zone's tinted card + the RESET-gated destructive button — resting +
 * FOCUS faces. */
async function probeDataTab(
  page: import("@playwright/test").Page,
  base: string,
  label: string,
  w: number,
): Promise<void> {
  await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2400);
  const tabBtn = page.locator('main button[role="tab"], main [role="tab"]').filter({ hasText: "Data" }).first();
  if (!(await tabBtn.count())) {
    console.log(`\n=== ${label} SETTINGS DATA TAB @${w}x*: TAB NOT FOUND`);
    return;
  }
  await tabBtn.click();
  await page.waitForTimeout(1200);

  const face = (el: Element) => {
    const cs = getComputedStyle(el as HTMLElement);
    const r = el.getBoundingClientRect();
    return {
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      radius: cs.borderRadius,
      boxShadow: cs.boxShadow.slice(0, 160),
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      cls: (el.getAttribute("class") ?? "").slice(0, 130),
    };
  };

  const census = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("main button")).map((b) => ({
      text: (b.textContent ?? "").trim().slice(0, 44),
      disabled: (b as HTMLButtonElement).disabled,
    }));
    const cards = Array.from(document.querySelectorAll("main [class*=\"rounded-lg\"], main [class*=\"rounded-xl\"]"))
      .filter((c) => {
        const cs = getComputedStyle(c as HTMLElement);
        return cs.borderStyle !== "none" && (c.textContent ?? "").length > 0 && c.getBoundingClientRect().height > 60;
      })
      .map((c) => {
        const cs = getComputedStyle(c as HTMLElement);
        const t = (c.textContent ?? "").trim().slice(0, 50);
        return { bg: cs.backgroundColor, border: cs.border.slice(0, 80), radius: cs.borderRadius, firstText: t.split("\n")[0].slice(0, 40) };
      });
    const resetInput = document.querySelector('main input[id="reset-confirm"], main input[placeholder="RESET"]') as HTMLInputElement | null;
    return {
      buttons,
      cards: cards.slice(0, 8),
      resetInput: resetInput ? { ph: resetInput.placeholder, cls: (resetInput.getAttribute("class") ?? "").slice(0, 110) } : null,
    };
  });
  console.log(`\n=== ${label} SETTINGS DATA TAB @${w}x*:`);
  console.log(`  resetInput=${census.resetInput ? `ph="${census.resetInput.ph}" cls="${census.resetInput.cls}"` : "NOT FOUND"}`);
  for (const c of census.cards) console.log(`  card "${c.firstText}" bg=${c.bg} radius=${c.radius}\n    border="${c.border}"`);
  for (const b of census.buttons) console.log(`  button "${b.text}" disabled=${b.disabled}`);

  // The first template button's resting + FOCUS face
  const tmpl = page.locator("main button").filter({ hasText: "Download" }).first();
  if (await tmpl.count()) {
    const resting = await tmpl.evaluate(face).catch(() => null);
    console.log(`  TMPL BTN resting: bg=${resting?.bg} color=${resting?.color} box=${resting?.box}\n    cls="${resting?.cls}"`);
    await tmpl.focus();
    const focused = await tmpl.evaluate(face).catch(() => null);
    console.log(`  TMPL BTN focused: boxShadow="${focused?.boxShadow.slice(0, 140)}"`);
  } else {
    console.log("  TMPL BTN: NOT FOUND");
  }

  // The destructive Reset button (disabled until RESET typed)
  const resetBtn = page.locator("main button").filter({ hasText: "Reset All Data" }).first();
  if (await resetBtn.count()) {
    const resting = await resetBtn.evaluate(face).catch(() => null);
    console.log(`  RESET BTN (empty-gate): bg=${resting?.bg} color=${resting?.color} disabledCls="${resting?.cls}"`);
    const resetInput = page.locator('main input[placeholder="RESET"]').first();
    if (await resetInput.count()) {
      await resetInput.fill("RESET");
      await page.waitForTimeout(300);
      const armed = await resetBtn.evaluate(face).catch(() => null);
      console.log(`  RESET BTN (armed):    bg=${armed?.bg} color=${armed?.color} cls="${armed?.cls?.slice(0, 110)}"`);
      await resetInput.fill("");
    }
  } else {
    console.log("  RESET BTN: NOT FOUND");
  }
}

/** Leg 4 — the topbar-search dropdown: does typing populate any
 * suggestion surface on either app? (the standing conditional gate.) */
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

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[discover-187] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[discover-187] pair state: ready (the s162 guarded form)");
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
      await probeProfile(page, base, label, w).catch((e) => console.log(`  [profile ${label}] ERROR: ${e}`));
      await probeDataTab(page, base, label, w).catch((e) => console.log(`  [data-tab ${label}] ERROR: ${e}`));
      await probeTopbarSearch(page, base, label, w).catch((e) => console.log(`  [topbar-search ${label}] ERROR: ${e}`));
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
  console.error("[discover-187]", e);
  process.exit(1);
});
