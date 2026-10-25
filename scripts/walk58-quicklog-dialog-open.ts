// Session-185 (walk58): THE QUICK-LOG DIALOG OPEN-STATE INTERIOR WALK +
// BY-TYPE FOOTER RE-WALK — the two-app element-level DOM ledger of the
// Log Activity dialog's OPEN interiors (the quick-log quartet's
// create-focus arm, the s390 close's FIRST-NAMED candidate — the walk54
// CREATE-family sibling at this call site) + the by-type card's
// checkbox-footer/••• faces (the second-named candidate — the s13
// construction never re-walked under ADR-022).
//
// What the standing legs already carry, and what they do NOT:
//   - walk54 froze the dialog CHROME carriers (DIALOG_CONTENT.base +
//     DIALOG_CLOSE + DIALOG_OVERLAY full-string freezes) on OURS only
//     (the a11y dialog-open family's five create dialogs + the contact
//     edit dialog — the OURS-only legs); the reference's Log Activity
//     dialog OPEN interior was NEVER walked (the s76 Mce decode was the
//     BUNDLE, not the live DOM);
//   - the s125 walk pins hold the form-side preset doctrine (the
//     quick-log preset rides the SUBMIT, the visible form starts at
//     Call) — ours-only, db-verified, never the two-app OPEN ledger;
//   - the s15/s76/s141 pins hold the ACTIVITY_DIALOG contracts + the
//     by-type class tokens — source pins, never the computed faces;
//   - the e2e battery pins OUR dialog behavior (the crm.spec dialog
//     geometry + the a11y dialog-open family) — ours-only;
//   - the drift sweeps carry PIXELS of the resting pages — never an
//     OPEN dialog interior;
//   - the discover-185 probe (this round) proved the reference's
//     quartet FUNCTIONAL at byte-equal geometry — the two-app ledger
//     now has both arms.
// The walk closes the family gap: click the quartet on both apps at
// BOTH axes (the dialog family is reachable at phone, unlike the rail),
// dump the OPEN interior ledger, drive the REAL keyboard Tab chain
// through the dialog, census the select vocabularies, decode every
// delta against the standing genus register, then freeze the by-type
// footer census (the discovery already proved it byte-equal — the
// walk carries the frozen record).
//
// Expected per the discovery: the dialog root byte-equal at
// 384,237 672x426 white/1px rgb(229,229,229)/8px; the labels + footer
// byte-equal; the mount-focus the FIRST combobox on both (ours
// aria-labeled — the kept superset); the type vocabulary the FIVE
// options Call/Email/Meeting/Task/Note (WhatsApp NEVER listed, the
// L-76c6 doctrine); the related vocabulary Contact/Account/
// Opportunity/Lead; the dialog shadow the SLOT-COUNT genus (ours the
// v4 variable-chain zero slots; every VISIBLE layer byte-equal).
//
// Run: bun scripts/walk58-quicklog-dialog-open.ts
// (reuses the dev server on :3000, DATABASE_URL guarded at the boot
// site; the reference rides the sweep-state storageState pair — ONE
// reference login, reused while fresh, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "@playwright/test";

import { preflightPairState, type SweepPairState } from "./sweep-state";

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
const OUT_DIR = join(REPO, "scripts", "walk58");

interface Row {
  i: number;
  depth: number;
  tag: string;
  cls: string;
  role: string | null;
  aria: Record<string, string>;
  text: string;
  box: { x: number; y: number; w: number; h: number } | null;
}

/** The computed face — the effective-layer style probe (the walk51-57
 * form: the VISIBLE carriers; the zero-width v4 variable-chain shadow
 * slots never enter the comparison). */
interface Face {
  bg: string;
  color: string;
  border: string;
  boxShadow: string;
  borderRadius: string;
  outline: string;
  fontWeight: string;
}

interface DialogCensus {
  opened: boolean;
  rootFace: Face | null;
  rootBox: string;
  overlayFace: Face | null;
  closeFace: Face | null;
  closeAria: string;
  interior: Row[] | null;
  labels: string[];
  title: string;
  mountFocus: string;
  mountFocusFace: Face | null;
  comboboxFaces: Array<{ text: string; face: Face | null; box: string }>;
  typeOptions: string[];
  relatedOptions: string[];
  footerFaces: Array<{ text: string; face: Face | null; box: string }>;
  textareaMeta: { placeholder: string; rows: string };
  cancelRoundTrip: boolean;
}

interface TabResult {
  stops: string[];
  escapeClosed: boolean;
}

interface ByTypeResult {
  found: boolean;
  cardBox: string;
  checkboxFace: Face | null;
  checkboxBox: string;
  checkboxChecked: string;
  checkboxCls: string;
  dotsFace: Face | null;
  dotsBox: string;
  dotsAria: string;
  dotsCls: string;
  labelFace: Face | null;
  labelCls: string;
}

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

async function faceOfLocator(loc: import("@playwright/test").Locator): Promise<Face | null> {
  return loc
    .evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
      };
    })
    .catch(() => null);
}

async function faceOf(page: Page, selector: string): Promise<Face | null> {
  return page.evaluate(
    (sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
      };
    },
    selector,
  );
}

async function dumpLedger(page: Page, rootSelector: string): Promise<Row[] | null> {
  return page.evaluate(
    ({ sel }) => {
      const root = document.querySelector(sel);
      if (!root) return null;
      const rows: Array<{
        i: number; depth: number; tag: string; cls: string;
        role: string | null; aria: Record<string, string>; text: string;
        box: { x: number; y: number; w: number; h: number } | null;
      }> = [];
      const collect = (el: Element, depth: number) => {
        const aria: Record<string, string> = {};
        for (const attr of Array.from(el.attributes)) {
          if (
            attr.name.startsWith("aria-") ||
            attr.name === "data-state" ||
            attr.name === "data-highlighted" ||
            attr.name === "data-radix-collection-item"
          ) {
            aria[attr.name] = attr.value;
          }
        }
        const text = Array.from(el.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => (n.textContent ?? "").trim())
          .join(" ")
          .trim()
          .slice(0, 60);
        const r = el.getBoundingClientRect();
        rows.push({
          i: rows.length,
          depth,
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute("class") ?? "").trim(),
          role: el.getAttribute("role"),
          aria,
          text,
          box: {
            x: Math.round(r.x),
            y: Math.round(r.y),
            w: Math.round(r.width),
            h: Math.round(r.height),
          },
        });
        for (const child of Array.from(el.children)) collect(child, depth + 1);
      };
      collect(root, 0);
      return rows;
    },
    { sel: rootSelector },
  );
}

/** Phase A — the dialog OPEN census at one axis: the Log Call trigger's
 * click opens the Log Activity dialog; the chrome faces, the interior
 * ledger, the mount focus, the combobox faces + vocabularies, the
 * footer pair, the CANCEL round-trip. */
async function dialogPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
  axis: { w: number; h: number },
): Promise<DialogCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  // the trigger's RESTING face, then THE CLICK
  const trigger = page.locator("main button", { hasText: "Log Call" }).first();
  const restingFace = await faceOfLocator(trigger);
  await trigger.click();
  await page.waitForTimeout(900);

  const rootSel = '[role="dialog"][data-state="open"]';
  const opened = (await page.locator(rootSel).count()) > 0;
  if (!opened) {
    console.log(`[walk58] ${label}@${axis.w} dialog: NOT OPEN`);
    await ctx.close();
    return {
      opened: false, rootFace: null, rootBox: "MISSING", overlayFace: null,
      closeFace: null, closeAria: "(none)", interior: null, labels: [], title: "(none)",
      mountFocus: "(none)", mountFocusFace: null, comboboxFaces: [], typeOptions: [],
      relatedOptions: [], footerFaces: [], textareaMeta: { placeholder: "(none)", rows: "(none)" },
      cancelRoundTrip: false,
    };
  }

  const rootFace = await faceOf(page, rootSel);
  const rootBox = await page
    .evaluate(() => {
      const r = document.querySelector('[role="dialog"][data-state="open"]')!.getBoundingClientRect();
      return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
    });
  const overlayFace = await page.evaluate(() => {
    const ov = document.querySelector('[data-radix-dialog-overlay], [data-state="open"].fixed.inset-0') as HTMLElement | null;
    if (!ov) return null;
    const cs = getComputedStyle(ov);
    return { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight };
  });
  const closeFace = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const close = dlg?.querySelector("button:not([tabindex='-1']) svg")?.closest("button") as HTMLElement | null;
    // the close X: the last small button before the content — Radix
    // DialogContent renders it as the final child button
    const btns = Array.from(dlg?.querySelectorAll("button") ?? []);
    const x = btns.find((b) => (b.getAttribute("class") ?? "").includes("absolute")) ?? close;
    if (!x) return null;
    const cs = getComputedStyle(x);
    return { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight };
  });
  const closeAria = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const btns = Array.from(dlg?.querySelectorAll("button") ?? []);
    const x = btns.find((b) => (b.getAttribute("class") ?? "").includes("absolute"));
    return x ? Array.from(x.attributes).filter((a) => a.name.startsWith("aria")).map((a) => `${a.name}=${a.value}`).join(" ") || "(no aria)" : "(missing)";
  });

  const interior = await dumpLedger(page, rootSel);
  const labels = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] label'))
      .map((l) => (l.textContent ?? "").trim())
      .filter(Boolean),
  );
  const title = (await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] [role="heading"]'))
      .map((h) => (h.textContent ?? "").trim())
      .filter(Boolean),
  )).join(" | ");

  const mountInfo = await page.evaluate(() => {
    const ae = document.activeElement as HTMLElement | null;
    if (!ae) return { name: "(none)", face: null as null | Record<string, string> };
    const cs = getComputedStyle(ae);
    const r = ae.getBoundingClientRect();
    return {
      name: `${ae.tagName}/${(ae.getAttribute("aria-label") ?? ae.textContent ?? "").trim().slice(0, 24) || "(no text)"}`,
      face: {
        bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      },
    };
  });

  const comboboxFaces = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] button[role="combobox"]')).map((b) => {
      const cs = getComputedStyle(b as HTMLElement);
      const r = b.getBoundingClientRect();
      return {
        text: (b.textContent ?? "").trim(),
        box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        face: {
          bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow,
          borderRadius: cs.borderRadius,
          outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
          fontWeight: cs.fontWeight,
        },
      };
    }),
  );

  // the select VOCABULARIES (the FIXED arms — the type quintet + the
  // related quartet; WhatsApp NEVER a type option, the L-76c6 doctrine)
  const typeOptions = await page
    .locator('[role="dialog"] button[role="combobox"]')
    .nth(0)
    .click()
    .then(() => page.waitForTimeout(600))
    .then(() => page.evaluate(() => Array.from(document.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim())))
    .catch(() => [] as string[]);
  await page.keyboard.press("Escape").catch(() => undefined);
  await page.waitForTimeout(400);
  const relatedOptions = await page
    .locator('[role="dialog"] button[role="combobox"]')
    .nth(1)
    .click()
    .then(() => page.waitForTimeout(600))
    .then(() => page.evaluate(() => Array.from(document.querySelectorAll('[role="option"]')).map((o) => (o.textContent ?? "").trim())))
    .catch(() => [] as string[]);
  await page.keyboard.press("Escape").catch(() => undefined);
  await page.waitForTimeout(400);

  const footerFaces = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] button'))
      .filter((b) => ["Cancel", "Log Activity", "Save Changes"].includes((b.textContent ?? "").trim()))
      .map((b) => {
        const cs = getComputedStyle(b as HTMLElement);
        const r = b.getBoundingClientRect();
        return {
          text: (b.textContent ?? "").trim(),
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          face: {
            bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow,
            borderRadius: cs.borderRadius,
            outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
            fontWeight: cs.fontWeight,
          },
        };
      }),
  );

  const textareaMeta = await page.evaluate(() => {
    const t = document.querySelector('[role="dialog"] textarea');
    return { placeholder: t?.getAttribute("placeholder") ?? "(none)", rows: t?.getAttribute("rows") ?? "(none)" };
  });

  // the CANCEL round-trip
  const cancel = page.locator('[role="dialog"] button', { hasText: "Cancel" }).first();
  await cancel.click();
  await page.waitForTimeout(600);
  const cancelRoundTrip = await page.evaluate(() => !document.querySelector('[role="dialog"][data-state="open"]'));

  console.log(
    `[walk58] ${label}@${axis.w} dialog: root ${rootBox} title="${title}" labels=${labels.length} mount=${mountInfo.name} typeOpts=[${typeOptions.join("/")}] relatedOpts=[${relatedOptions.join("/")}] cancelClosed=${cancelRoundTrip}`,
  );
  await ctx.close();
  return {
    opened, rootFace, rootBox, overlayFace, closeFace, closeAria, interior, labels, title,
    mountFocus: mountInfo.name, mountFocusFace: (mountInfo.face as unknown as Face | null) ?? null,
    comboboxFaces, typeOptions, relatedOptions, footerFaces, textareaMeta, cancelRoundTrip,
  };
}

/** Phase B — the REAL keyboard Tab drive through the OPEN dialog (the
 * walk54 focus form, now two-app): from the mount-focus stop through
 * the full dialog chain, each stop's tag/text + the ring carrier. */
async function tabPhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
): Promise<TabResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  await page.locator("main button", { hasText: "Log Call" }).first().click();
  await page.waitForTimeout(900);

  // the mount-focus stop (stop 0)
  const stops: string[] = [];
  stops.push(await page.evaluate(() => {
    const ae = document.activeElement as HTMLElement | null;
    return ae ? `${ae.tagName}/${(ae.getAttribute("aria-label") ?? ae.textContent ?? "").trim().slice(0, 18)}` : "(none)";
  }));

  // the chain: Tab through the dialog's controls until the wrap (the
  // chain returns to the mount stop or leaves the dialog — Radix traps
  // focus; the budget 16 covers the full trap)
  let wrapped = false;
  for (let t = 0; t < 16 && !wrapped; t++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(180);
    const stop = await page.evaluate(() => {
      const ae = document.activeElement as HTMLElement | null;
      if (!ae) return "?";
      const cs = getComputedStyle(ae);
      const inDlg = !!ae.closest('[role="dialog"]');
      const tag = `${ae.tagName}/${(ae.getAttribute("aria-label") ?? ae.textContent ?? "").trim().slice(0, 16) || "(no text)"}`;
      return inDlg ? `${tag} ring=${cs.boxShadow.split("rgba").length - 1}slots` : `${tag} (OUTSIDE)`;
    });
    if (stop === stops[0] || stop.includes("(OUTSIDE)")) {
      stops.push(stop);
      wrapped = true;
    } else {
      stops.push(stop);
    }
  }

  // the Escape close round-trip
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const escapeClosed = await page.evaluate(() => !document.querySelector('[role="dialog"][data-state="open"]'));

  console.log(`[walk58] ${label} tab-chain: ${stops.length} stops [${stops.map((s) => s.split(" ring=")[0]).join(" → ")}] escapeClosed=${escapeClosed}`);
  await ctx.close();
  return { stops, escapeClosed };
}

/** Phase D — the by-type footer decode (the s13 construction re-walked
 * under ADR-022): the checkbox-footer + ••• faces — the discovery
 * proved them byte-equal; the walk freezes the census. Desktop axis
 * only (the rail is display:none below lg — the s109 pin). */
async function byTypePhase(
  browser: Browser,
  base: string,
  state: SweepPairState,
  label: string,
): Promise<ByTypeResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
  const page = await ctx.newPage();
  await page.goto(`${base}/activities`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2500);

  const c = await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("main div, main h2, main h3")).find((el) =>
      (el.textContent ?? "").trim() === "Activities by Type" &&
      !Array.from(el.children).some((ch) => (ch.textContent ?? "").includes("Activities by Type")),
    );
    if (!h) return null;
    let card: Element = h;
    for (let i = 0; i < 8; i++) {
      if (card.parentElement && card.parentElement.querySelector('button[role="checkbox"]')) {
        card = card.parentElement;
        break;
      }
      if (!card.parentElement) break;
      card = card.parentElement;
    }
    const face = (el: Element) => {
      const cs = getComputedStyle(el as HTMLElement);
      return {
        bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        fontWeight: cs.fontWeight,
      };
    };
    const cardR = card.getBoundingClientRect();
    const checkbox = card.querySelector('button[role="checkbox"]');
    const dots = Array.from(card.querySelectorAll("button")).find((b) =>
      (b.textContent ?? "").trim() === "•••" || (b.getAttribute("aria-label") ?? "").includes("More actions"),
    );
    const labelEl = Array.from(card.querySelectorAll("label")).find((l) => (l.textContent ?? "").trim() === "Activities");
    const box = (el: Element) => {
      const r = el.getBoundingClientRect();
      return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
    };
    return {
      cardBox: `${Math.round(cardR.x)},${Math.round(cardR.y)} ${Math.round(cardR.width)}x${Math.round(cardR.height)}`,
      checkboxFace: checkbox ? face(checkbox) : null,
      checkboxBox: checkbox ? box(checkbox) : "MISSING",
      checkboxChecked: checkbox?.getAttribute("aria-checked") ?? "(none)",
      checkboxCls: (checkbox?.getAttribute("class") ?? "").slice(0, 130),
      dotsFace: dots ? face(dots) : null,
      dotsBox: dots ? box(dots) : "MISSING",
      dotsAria: dots?.getAttribute("aria-label") ?? "(none)",
      dotsCls: (dots?.getAttribute("class") ?? "").slice(0, 130),
      labelFace: labelEl ? face(labelEl) : null,
      labelCls: (labelEl?.getAttribute("class") ?? "").slice(0, 90),
    };
  });

  const empty: ByTypeResult = {
    found: false, cardBox: "MISSING", checkboxFace: null, checkboxBox: "MISSING",
    checkboxChecked: "(none)", checkboxCls: "", dotsFace: null, dotsBox: "MISSING",
    dotsAria: "(none)", dotsCls: "", labelFace: null, labelCls: "",
  };
  if (!c) {
    console.log(`[walk58] ${label} by-type: CARD NOT FOUND`);
    await ctx.close();
    return empty;
  }
  console.log(`[walk58] ${label} by-type: card ${c.cardBox} checkbox=${c.checkboxChecked} @${c.checkboxBox} dots @${c.dotsBox} aria="${c.dotsAria}"`);
  await ctx.close();
  return { found: true, ...c };
}

function faceDelta(name: string, a: Face | null, b: Face | null): string[] {
  const out: string[] = [];
  if (!a || !b) {
    out.push(`${name}: presence OURS=${JSON.stringify(!!a)} REF=${JSON.stringify(!!b)}`);
    return out;
  }
  for (const k of Object.keys(a) as Array<keyof Face>) {
    if (a[k] !== b[k]) out.push(`${name}.${k}: OURS ${a[k]} | REF ${b[k]}`);
  }
  return out;
}

function diffRows(name: string, ours: Row[] | null, ref: Row[] | null): string[] {
  const lines: string[] = [];
  if (!ours || !ref) {
    lines.push(`${name}: ledger presence OURS ${ours?.length ?? "null"} / REF ${ref?.length ?? "null"}`);
    return lines;
  }
  const n = Math.max(ours.length, ref.length);
  for (let i = 0; i < n; i++) {
    const a = ours[i];
    const b = ref[i];
    if (!a || !b) {
      lines.push(`${name} ROW ${i}: only ${a ? "OURS" : "REF"} — ${JSON.stringify(a ?? b)}`);
      continue;
    }
    const tags: string[] = [];
    if (a.tag !== b.tag) tags.push(`tag ${a.tag}/${b.tag}`);
    if (a.cls !== b.cls) tags.push("CLASS");
    if ((a.role ?? "") !== (b.role ?? "")) tags.push(`role ${a.role}/${b.role}`);
    const aAria = JSON.stringify(a.aria);
    const bAria = JSON.stringify(b.aria);
    if (aAria !== bAria) tags.push("ARIA");
    if (a.text !== b.text) tags.push(`text "${a.text}"/"${b.text}"`);
    if (a.box && b.box) {
      const dw = Math.abs(a.box.w - b.box.w);
      const dh = Math.abs(a.box.h - b.box.h);
      const dy = Math.abs(a.box.y - b.box.y);
      if (dw > 1 || dh > 1 || dy > 1) tags.push(`box ${JSON.stringify(a.box)}/${JSON.stringify(b.box)}`);
    } else if (!!a.box !== !!b.box) {
      tags.push("box presence");
    }
    if (tags.length) {
      lines.push(`${name} ROW ${i} (depth ${a.depth} ${a.tag}${a.role ? ` role=${a.role}` : ""}): ${tags.join(" | ")}`);
      if (tags.includes("CLASS")) {
        lines.push(`    OURS cls: ${a.cls}`);
        lines.push(`    REF  cls: ${b.cls}`);
      }
      if (tags.includes("ARIA")) {
        lines.push(`    OURS aria: ${aAria}`);
        lines.push(`    REF  aria: ${bAria}`);
      }
    }
  }
  return lines;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk58] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[walk58] pair state: ready (the s162 guarded form)");

    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    // Phase A — the dialog OPEN census at BOTH axes
    const oursD = await dialogPhase(browser, OUR_URL, state, "OURS", { w: 1440, h: 900 });
    const refD = await dialogPhase(browser, REF_URL, state, "REF ", { w: 1440, h: 900 });
    const oursP = await dialogPhase(browser, OUR_URL, state, "OURS", { w: 390, h: 844 });
    const refP = await dialogPhase(browser, REF_URL, state, "REF ", { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-dialog-desktop.json"), JSON.stringify(oursD, null, 2));
    writeFileSync(join(OUT_DIR, "ref-dialog-desktop.json"), JSON.stringify(refD, null, 2));
    writeFileSync(join(OUT_DIR, "ours-dialog-phone.json"), JSON.stringify(oursP, null, 2));
    writeFileSync(join(OUT_DIR, "ref-dialog-phone.json"), JSON.stringify(refP, null, 2));

    report.push("\n===== DIALOG(Log Activity) OPEN @1440x900 =====");
    report.push(`opened: OURS ${oursD.opened} | REF ${refD.opened}`);
    report.push(`rootBox: OURS ${oursD.rootBox} | REF ${refD.rootBox}`);
    report.push(`title: OURS "${oursD.title}" | REF "${refD.title}"`);
    report.push(`labels: OURS [${oursD.labels.join(" | ")}] | REF [${refD.labels.join(" | ")}]`);
    report.push(`mountFocus: OURS ${oursD.mountFocus} | REF ${refD.mountFocus}`);
    report.push(`typeOptions: OURS [${oursD.typeOptions.join("/")}] | REF [${refD.typeOptions.join("/")}]`);
    report.push(`relatedOptions: OURS [${oursD.relatedOptions.join("/")}] | REF [${refD.relatedOptions.join("/")}]`);
    report.push(`textarea: OURS "${oursD.textareaMeta.placeholder}" rows=${oursD.textareaMeta.rows} | REF "${refD.textareaMeta.placeholder}" rows=${refD.textareaMeta.rows}`);
    report.push(`cancelRoundTrip: OURS ${oursD.cancelRoundTrip} | REF ${refD.cancelRoundTrip}`);
    report.push(`closeAria: OURS ${oursD.closeAria} | REF ${refD.closeAria}`);
    report.push(...faceDelta("rootFace", oursD.rootFace, refD.rootFace));
    report.push(...faceDelta("overlayFace", oursD.overlayFace, refD.overlayFace));
    report.push(...faceDelta("closeFace", oursD.closeFace, refD.closeFace));
    report.push(...faceDelta("mountFocusFace", oursD.mountFocusFace, refD.mountFocusFace));
    for (let i = 0; i < Math.max(oursD.comboboxFaces.length, refD.comboboxFaces.length); i++) {
      const a = oursD.comboboxFaces[i];
      const b = refD.comboboxFaces[i];
      if (!a || !b) { report.push(`combobox[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`combobox[${i}] "${a.text}"/"${b.text}": OURS ${a.box} | REF ${b.box}`);
      report.push(...faceDelta(`combobox[${i}]`, a.face, b.face));
    }
    for (let i = 0; i < Math.max(oursD.footerFaces.length, refD.footerFaces.length); i++) {
      const a = oursD.footerFaces[i];
      const b = refD.footerFaces[i];
      if (!a || !b) { report.push(`footer[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`footer[${i}] "${a.text}": OURS ${a.box} | REF ${b.box}`);
      report.push(...faceDelta(`footer[${i}]`, a.face, b.face));
    }
    report.push(...diffRows("interior", oursD.interior, refD.interior));

    report.push("\n===== DIALOG(Log Activity) OPEN @390x844 =====");
    report.push(`opened: OURS ${oursP.opened} | REF ${refP.opened}`);
    report.push(`rootBox: OURS ${oursP.rootBox} | REF ${refP.rootBox}`);
    report.push(`labels: OURS ${oursP.labels.length} | REF ${refP.labels.length}`);
    report.push(`title: OURS "${oursP.title}" | REF "${refP.title}"`);
    report.push(`typeOptions: OURS [${oursP.typeOptions.join("/")}] | REF [${refP.typeOptions.join("/")}]`);
    report.push(...faceDelta("phoneRootFace", oursP.rootFace, refP.rootFace));

    // Phase B — the REAL keyboard Tab chains through the OPEN dialog
    const oursT = await tabPhase(browser, OUR_URL, state, "OURS");
    const refT = await tabPhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-tab.json"), JSON.stringify(oursT, null, 2));
    writeFileSync(join(OUT_DIR, "ref-tab.json"), JSON.stringify(refT, null, 2));
    report.push("\n===== TAB-CHAIN(through the OPEN dialog) @1440x900 =====");
    const norm = (s: string) => s.split(" ring=")[0];
    const oT = oursT.stops.map(norm);
    const rT = refT.stops.map(norm);
    if (JSON.stringify(oT) !== JSON.stringify(rT)) {
      report.push(`CHAIN DELTA: OURS [${oT.join(" → ")}] | REF [${rT.join(" → ")}]`);
    } else {
      report.push(`CHAIN: IDENTICAL [${oT.join(" → ")}]`);
    }
    report.push(`escapeClosed: OURS ${oursT.escapeClosed} | REF ${refT.escapeClosed}`);

    // Phase D — the by-type footer decode (the s13 construction)
    const oursB = await byTypePhase(browser, OUR_URL, state, "OURS");
    const refB = await byTypePhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-bytype.json"), JSON.stringify(oursB, null, 2));
    writeFileSync(join(OUT_DIR, "ref-bytype.json"), JSON.stringify(refB, null, 2));
    report.push("\n===== BY-TYPE FOOTER @1440x900 =====");
    report.push(`cardBox: OURS ${oursB.cardBox} | REF ${refB.cardBox}`);
    report.push(`checkbox: OURS ${oursB.checkboxChecked} @${oursB.checkboxBox} | REF ${refB.checkboxChecked} @${refB.checkboxBox}`);
    report.push(`dots: OURS @${oursB.dotsBox} aria="${oursB.dotsAria}" | REF @${refB.dotsBox} aria="${refB.dotsAria}"`);
    report.push(...faceDelta("checkboxFace", oursB.checkboxFace, refB.checkboxFace));
    report.push(...faceDelta("dotsFace", oursB.dotsFace, refB.dotsFace));
    report.push(...faceDelta("labelFace", oursB.labelFace, refB.labelFace));

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk58] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk58] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk58] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk58]", e);
  process.exit(1);
});
