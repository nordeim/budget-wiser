// Session-187 (walk60): THE PROFILE PHOTO-UPLOAD FAMILY FOCUS/OPEN
// INTERIOR WALK + SETTINGS DATA-TAB SIBLING — the walk53-59 ledger form
// over the profile family's focus/open states + the Data-tab sibling at
// BOTH axes (both families reachable at phone):
//
//   Phase A — the profile OPEN census: the Personal Information card's
//     interior DFS ledger (the title + the avatar row + the form
//     groups + the Save row), the avatar's face (the blue-100 circle +
//     the User glyph's geometry), the Upload Photo button's resting +
//     FOCUS faces + its Camera glyph, the hidden file input's
//     construction census (the D-187a1 id decode), the Full Name
//     input's resting + focus rings (the FULL untruncated slot
//     chains), the disabled email/role faces (the gray-50 wash + the
//     muted ink), the Save Changes button's resting + focus faces
//     (the dark primary + its focused shadow pair), the four
//     right-column cards' census. The save/upload writes ride OURS
//     only; the reference's arms are NEVER fired beyond focus.
//   Phase B — the REAL keyboard Tab drive through the profile form
//     (the walk54/58 focus form, now two-app): the chain from the
//     Upload button → the name input → the Save button, each stop's
//     REAL :focus-visible face (the mounted ring census).
//   Phase C — the settings Data-tab sibling: the three cards' geometry
//     ledger (the 8px template-button y-offset decode — the
//     title/desc/content rhythm chain on both apps), the first
//     template + first export buttons' resting + REAL-focus faces,
//     the Danger Zone's tinted card census, the RESET input's focus
//     ring, the destructive button's empty-gate + armed faces (the
//     arm state via the input fill, the write NEVER fired), the Tab
//     chain through the Data tab's buttons.
//   Phase D — the phone axis 390×844: the same profile + Data-tab
//     censuses at the phone width (the profile form stacks, the Data
//     tab rides the s106 segmented form).
//
// The DATA-STATE discipline: the user identity values (the name/email/
// role values) are data (both apps carry the demo account here); the
// walk compares the CONSTRUCTION faces on both apps. The aria-label
// naming (ours the superset) normalizes in the chain comparison — the
// s88-c9 kept genus.
//
// Run: bun scripts/walk60-profile-datatab-focus-open.ts
// (reuses the dev server on :3000 — the walk57/58 boot-site form; the
// reference rides the sweep-state storageState pair, the s162 doctrine.)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
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
const OUT_DIR = join(REPO, "scripts", "walk60");

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

/** The computed face — the effective-layer style probe (the walk51-59
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

interface ProfileCensus {
  found: boolean;
  h1: string;
  labels: string[];
  fileInput: { id: string; accept: string; cls: string; tabIndex: string } | null;
  avatar: { cls: string; box: string; bg: string; glyphBox: string; glyphColor: string; innerTag: string; innerCls: string; svgCls: string } | null;
  uploadBtn: { face: Face | null; cls: string; box: string; glyphCls: string; glyphPaths: number; focusRing: string } | null;
  nameInput: { face: Face | null; cls: string; box: string; focusRing: string } | null;
  disabledEmail: { face: Face | null; cls: string } | null;
  disabledRole: { face: Face | null; cls: string } | null;
  saveBtn: { face: Face | null; cls: string; box: string; focusRing: string } | null;
  smallCards: { title: string; value: string }[];
  ledger: Row[] | null;
}

interface TabChainResult {
  stops: string[];
}

interface DataTabCensus {
  found: boolean;
  cards: Array<{ firstText: string; face: Face | null; titleBox: string; descBox: string; firstBtnBox: string; contentCls: string }>;
  tmplBtn: { face: Face | null; cls: string; box: string; focusRing: string } | null;
  exportBtn: { face: Face | null; cls: string; box: string } | null;
  danger: {
    cardFace: Face | null;
    resetInput: { face: Face | null; cls: string; focusRing: string } | null;
    emptyGate: { face: Face | null; disabled: boolean } | null;
    armed: { face: Face | null; disabled: boolean } | null;
  } | null;
  buttonVocab: string[];
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

/** The Personal Information card root, resolved INSIDE the page (the
 * CardTitle-renders-a-div calibration, the M-185-p0 walk-up form). */
const PI_CARD_JS = `(() => {
  const h = Array.from(document.querySelectorAll("main div")).find(
    (el) => (el.textContent ?? "").trim() === "Personal Information" &&
      !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Personal Information")),
  );
  if (!h) return null;
  let card = h;
  for (let i = 0; i < 10; i++) {
    if (card.parentElement && card.parentElement.querySelector("form")) {
      card = card.parentElement;
      break;
    }
    if (!card.parentElement) break;
    card = card.parentElement;
  }
  return card;
})()`;

async function profilePhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string, axis: { w: number; h: number }): Promise<ProfileCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: ProfileCensus = {
    found: false,
    h1: "",
    labels: [],
    fileInput: null,
    avatar: null,
    uploadBtn: null,
    nameInput: null,
    disabledEmail: null,
    disabledRole: null,
    saveBtn: null,
    smallCards: [],
    ledger: null,
  };
  try {
    await page.goto(`${base}/profile`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);

    const faceOf = (el: Element): Face => {
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
    };
    const boxOf = (el: Element) => {
      const r = el.getBoundingClientRect();
      return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
    };

    const a1 = (await page.evaluate(`(() => {
      const card = ${PI_CARD_JS};
      const h1 = document.querySelector("main h1");
      const labels = Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
      const file = document.querySelector('main input[type="file"]');
      const fileInput = file ? { id: file.id, accept: file.getAttribute("accept") ?? "", cls: (file.getAttribute("class") ?? ""), tabIndex: String(file.tabIndex) } : null;
      // the avatar: the first large rounded-full span inside the card
      let avatar = null;
      if (card) {
        const av = Array.from(card.querySelectorAll('span[class*="rounded-full"]')).find((s) => {
          const r = s.getBoundingClientRect();
          return r.width >= 60 && r.height >= 60;
        }) ?? null;
        if (av) {
          const acs = getComputedStyle(av);
          const inner = av.firstElementChild;
          let glyphBox = "", glyphColor = "", innerTag = "", innerCls = "", svgCls = "";
          if (inner) {
            const svg = inner.querySelector("svg");
            glyphBox = svg ? Math.round(svg.getBoundingClientRect().width) + "x" + Math.round(svg.getBoundingClientRect().height) : "none";
            glyphColor = svg ? getComputedStyle(svg).color : "";
            innerTag = inner.tagName.toLowerCase();
            innerCls = inner.getAttribute("class") ?? "";
            svgCls = svg ? svg.getAttribute("class") ?? "" : "";
          }
          avatar = { cls: (av.getAttribute("class") ?? ""), box: Math.round(av.getBoundingClientRect().x) + "," + Math.round(av.getBoundingClientRect().y) + " " + Math.round(av.getBoundingClientRect().width) + "x" + Math.round(av.getBoundingClientRect().height), bg: acs.backgroundColor, glyphBox, glyphColor, innerTag, innerCls, svgCls };
        }
      }
      // the four right-column small cards (the title/value pairs)
      const smallCards = [];
      for (const t of ["Account Type", "Email Verified", "Security"]) {
        const el = Array.from(document.querySelectorAll("main p")).find((p) => (p.textContent ?? "").trim() === t);
        if (el) {
          const sib = el.parentElement ? Array.from(el.parentElement.children).find((c) => c !== el && c.tagName === "P") : null;
          smallCards.push({ title: t, value: sib ? (sib.textContent ?? "").trim().slice(0, 24) : "" });
        }
      }
      // the DFS ledger of the Personal Information card's form
      let ledger = null;
      if (card) {
        const form = card.querySelector("form") ?? card;
        ledger = [];
        const collect = (el, depth) => {
          const aria = {};
          for (const attr of Array.from(el.attributes)) {
            if (attr.name.startsWith("aria-") || attr.name === "data-state" || attr.name === "id" || attr.name === "for" || attr.name === "type") aria[attr.name] = attr.value;
          }
          const text = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join(" ").trim().slice(0, 40);
          const rr = el.getBoundingClientRect();
          ledger.push({ i: ledger.length, depth, tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class") ?? "").trim(), role: el.getAttribute("role"), aria, text, box: { x: Math.round(rr.x), y: Math.round(rr.y), w: Math.round(rr.width), h: Math.round(rr.height) } });
          for (const child of Array.from(el.children)) collect(child, depth + 1);
        };
        collect(form, 0);
      }
      return {
        h1: h1 ? (h1.textContent ?? "").trim() : "",
        labels, fileInput, avatar, smallCards, ledger,
      };
    })()`).catch(() => null)) as {
      h1?: string;
      labels?: string[];
      fileInput?: ProfileCensus["fileInput"];
      avatar?: ProfileCensus["avatar"];
      smallCards?: ProfileCensus["smallCards"];
      ledger?: Row[] | null;
    } | null;
    if (!a1) return result;
    result.found = true;
    result.h1 = a1.h1 ?? "";
    result.labels = a1.labels ?? [];
    result.fileInput = a1.fileInput ?? null;
    result.avatar = a1.avatar ?? null;
    result.smallCards = a1.smallCards ?? [];
    result.ledger = a1.ledger ?? null;

    // A2 — the interactive arms' resting + FOCUS faces
    const uploadLoc = page.locator("main button").filter({ hasText: "Upload Photo" }).first();
    if (await uploadLoc.count()) {
      const resting = await uploadLoc.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        const r = el.getBoundingClientRect();
        const svg = el.querySelector("svg");
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          cls: el.getAttribute("class") ?? "",
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          glyphCls: svg ? svg.getAttribute("class") ?? "" : "",
          glyphPaths: svg ? svg.querySelectorAll("path").length : 0,
        };
      }).catch(() => null);
      await uploadLoc.focus();
      await page.waitForTimeout(250);
      const focusRing = await uploadLoc.evaluate((el) => getComputedStyle(el as HTMLElement).boxShadow).catch(() => "");
      if (resting) result.uploadBtn = { ...resting, focusRing };
    }

    const nameLoc = page.locator('main input[id="display_name"]').first();
    if (await nameLoc.count()) {
      const resting = await nameLoc.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        const r = el.getBoundingClientRect();
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          cls: el.getAttribute("class") ?? "",
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        };
      }).catch(() => null);
      await nameLoc.focus();
      await page.waitForTimeout(250);
      const focusRing = await nameLoc.evaluate((el) => getComputedStyle(el as HTMLElement).boxShadow).catch(() => "");
      if (resting) result.nameInput = { ...resting, focusRing };
    }

    for (const [key, sel] of [
      ["disabledEmail", 'main input[id="email"]'],
      ["disabledRole", 'main input[id="role"]'],
    ] as const) {
      const loc = page.locator(sel).first();
      if (await loc.count()) {
        const f = await loc.evaluate((el) => {
          const cs = getComputedStyle(el as HTMLElement);
          return {
            face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
            cls: el.getAttribute("class") ?? "",
          };
        }).catch(() => null);
        if (f) result[key] = f;
      }
    }

    const saveLoc = page.locator("main button").filter({ hasText: "Save Changes" }).first();
    if (await saveLoc.count()) {
      const resting = await saveLoc.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        const r = el.getBoundingClientRect();
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          cls: el.getAttribute("class") ?? "",
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        };
      }).catch(() => null);
      await saveLoc.focus();
      await page.waitForTimeout(250);
      const focusRing = await saveLoc.evaluate((el) => getComputedStyle(el as HTMLElement).boxShadow).catch(() => "");
      if (resting) result.saveBtn = { ...resting, focusRing };
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

/** Phase B — the REAL keyboard Tab drive through the profile form. */
async function profileTabPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string): Promise<TabChainResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state as never });
  const page = await ctx.newPage();
  const stops: string[] = [];
  try {
    await page.goto(`${base}/profile`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2600);
    // land on the Upload button, then walk the form's tab order
    const upload = page.locator("main button").filter({ hasText: "Upload Photo" }).first();
    await upload.focus();
    await page.waitForTimeout(300);
    const describe = () =>
      page.evaluate(() => {
        const ae = document.activeElement as HTMLElement | null;
        if (!ae) return "(none)";
        const cs = getComputedStyle(ae);
        const name = (ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 28) || "(no text)";
        return `${ae.tagName.toLowerCase()}[${name}] ring=${cs.boxShadow.slice(0, 120)}`;
      });
    stops.push(`upload:${await describe()}`);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(250);
    stops.push(`tab1:${await describe()}`);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(250);
    stops.push(`tab2:${await describe()}`);
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return { stops };
}

/** Phase C-extra — the REAL keyboard Tab drive through the Data tab's
 * button row (the programmatic .focus() does not trigger :focus-visible
 * on either app there — the REAL keyboard is the only true face). */
async function dataTabTabPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string): Promise<TabChainResult> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state as never });
  const page = await ctx.newPage();
  const stops: string[] = [];
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2400);
    const tab = page.locator('main [role="tab"]').filter({ hasText: "Data" }).first();
    await tab.click();
    await page.waitForTimeout(1100);
    const first = page.locator("main button").filter({ hasText: "Download Contacts Template" }).first();
    await first.focus();
    await page.waitForTimeout(300);
    const describe = () =>
      page.evaluate(() => {
        const ae = document.activeElement as HTMLElement | null;
        if (!ae) return "(none)";
        const cs = getComputedStyle(ae);
        const name = (ae.getAttribute("aria-label") ?? ae.getAttribute("placeholder") ?? ae.textContent ?? "").trim().slice(0, 28) || "(no text)";
        return `${ae.tagName.toLowerCase()}[${name}] ring=${cs.boxShadow.slice(0, 120)}`;
      });
    stops.push(`tmpl1:${await describe()}`);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(250);
    stops.push(`tmpl2:${await describe()}`);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(250);
    stops.push(`tmpl3:${await describe()}`);
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return { stops };
}

/** Phase C — the settings Data-tab sibling census. */
async function dataTabPhase(browser: import("@playwright/test").Browser, base: string, state: unknown, label: string, axis: { w: number; h: number }): Promise<DataTabCensus> {
  const ctx = await browser.newContext({ viewport: { width: axis.w, height: axis.h }, storageState: state as never });
  const page = await ctx.newPage();
  const result: DataTabCensus = { found: false, cards: [], tmplBtn: null, exportBtn: null, danger: null, buttonVocab: [] };
  try {
    await page.goto(`${base}/settings`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
    await page.waitForTimeout(2400);
    const tab = page.locator('main [role="tab"]').filter({ hasText: "Data" }).first();
    if (!(await tab.count())) return result;
    await tab.click();
    await page.waitForTimeout(1200);

    const c1 = (await page.evaluate(`(() => {
      const wanted = ["Import Templates", "Export Data", "Danger Zone"];
      const cards = [];
      for (const t of wanted) {
        const h = Array.from(document.querySelectorAll("main div")).find(
          (el) => (el.textContent ?? "").trim() === t &&
            !Array.from(el.children).some((c) => (c.textContent ?? "").includes(t)),
        );
        if (!h) { cards.push(null); continue; }
        let card = h;
        for (let i = 0; i < 10; i++) {
          const p = card.parentElement;
          if (!p) break;
          const cs = getComputedStyle(p);
          // walk up to the card root: the first ancestor with a border + radius
          if (cs.borderStyle !== "none" && cs.borderRadius !== "0px" && p.querySelector("button, input")) { card = p; break; }
          card = p;
        }
        const ccs = getComputedStyle(card);
        const face = { bg: ccs.backgroundColor, color: ccs.color, border: ccs.border, boxShadow: ccs.boxShadow, borderRadius: ccs.borderRadius, outline: ccs.outlineWidth + " " + ccs.outlineStyle + " " + ccs.outlineColor, fontWeight: ccs.fontWeight };
        const desc = Array.from(card.querySelectorAll("div")).map((d) => (d.textContent ?? "").trim()).find((tx) => tx.length > 10 && tx.length < 60 && !/template|export|danger/i.test(tx.slice(0, 12))) ?? "";
        const titleEl = h;
        const descEl = Array.from(card.querySelectorAll("div")).find((d) => {
          const dt = (d.textContent ?? "").trim();
          return dt.length > 10 && dt.length < 60 && /download CSV|export your CRM|permanently delete/i.test(dt);
        });
        const firstBtn = card.querySelector("button");
        const boxOf = (el) => {
          if (!el) return "";
          const r = el.getBoundingClientRect();
          return Math.round(r.x) + "," + Math.round(r.y) + " " + Math.round(r.width) + "x" + Math.round(r.height);
        };
        const contentCls = Array.from(card.children).map((ch) => ch.tagName + "." + (ch.getAttribute("class") ?? "").slice(0, 40)).join(" | ");
        cards.push({ firstText: t, face, titleBox: boxOf(titleEl), descBox: boxOf(descEl), firstBtnBox: boxOf(firstBtn), contentCls });
      }
      const buttonVocab = Array.from(document.querySelectorAll("main button")).map((b) => (b.textContent ?? "").trim().replace(/\\s+/g, " ").slice(0, 40)).filter(Boolean);
      return { cards, buttonVocab };
    })()`).catch(() => null)) as {
      cards?: Array<DataTabCensus["cards"][number] | null>;
      buttonVocab?: string[];
    } | null;
    if (!c1) return result;
    result.found = true;
    result.cards = (c1.cards ?? []).filter((c): c is DataTabCensus["cards"][number] => c !== null);
    result.buttonVocab = c1.buttonVocab ?? [];

    // The first template + export buttons' faces + focus
    const tmplLoc = page.locator("main button").filter({ hasText: "Download Contacts Template" }).first();
    if (await tmplLoc.count()) {
      const resting = await tmplLoc.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        const r = el.getBoundingClientRect();
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          cls: el.getAttribute("class") ?? "",
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        };
      }).catch(() => null);
      await tmplLoc.focus();
      await page.waitForTimeout(250);
      const focusRing = await tmplLoc.evaluate((el) => getComputedStyle(el as HTMLElement).boxShadow).catch(() => "");
      if (resting) result.tmplBtn = { ...resting, focusRing };
    }
    const exportLoc = page.locator("main button").filter({ hasText: "Export Contacts" }).first();
    if (await exportLoc.count()) {
      const f = await exportLoc.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        const r = el.getBoundingClientRect();
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          cls: el.getAttribute("class") ?? "",
          box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
        };
      }).catch(() => null);
      if (f) result.exportBtn = f;
    }

    // The Danger Zone census: the tinted card + the RESET input's ring +
    // the destructive button's empty-gate + armed faces (write NEVER fired)
    const dangerCard = page.locator("main div").filter({ hasText: "Danger Zone" }).last();
    const resetInput = page.locator('main input[placeholder="RESET"]').first();
    const resetBtn = page.locator("main button").filter({ hasText: "Reset All Data" }).first();
    if ((await resetInput.count()) && (await resetBtn.count())) {
      const cardFace = await page.evaluate(`(() => {
        const h = Array.from(document.querySelectorAll("main div")).find(
          (el) => (el.textContent ?? "").trim() === "Danger Zone" &&
            !Array.from(el.children).some((c) => (c.textContent ?? "").includes("Danger Zone")),
        );
        if (!h) return null;
        let card = h;
        for (let i = 0; i < 10; i++) {
          const p = card.parentElement;
          if (!p) break;
          const cs = getComputedStyle(p);
          if (cs.borderStyle !== "none" && cs.borderRadius !== "0px" && p.querySelector("button")) { card = p; break; }
          card = p;
        }
        const ccs = getComputedStyle(card);
        return { bg: ccs.backgroundColor, color: ccs.color, border: ccs.border, boxShadow: ccs.boxShadow, borderRadius: ccs.borderRadius, outline: ccs.outlineWidth + " " + ccs.outlineStyle + " " + ccs.outlineColor, fontWeight: ccs.fontWeight };
      })()`).catch(() => null) as Face | null;
      const inputResting = await resetInput.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          cls: el.getAttribute("class") ?? "",
        };
      }).catch(() => null);
      await resetInput.focus();
      await page.waitForTimeout(250);
      const focusRing = await resetInput.evaluate((el) => getComputedStyle(el as HTMLElement).boxShadow).catch(() => "");
      const emptyGate = await resetBtn.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          disabled: (el as HTMLButtonElement).disabled,
        };
      }).catch(() => null);
      await resetInput.fill("RESET");
      await page.waitForTimeout(350);
      const armed = await resetBtn.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        return {
          face: { bg: cs.backgroundColor, color: cs.color, border: cs.border, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, fontWeight: cs.fontWeight },
          disabled: (el as HTMLButtonElement).disabled,
        };
      }).catch(() => null);
      await resetInput.fill("");
      await page.waitForTimeout(250);
      result.danger = {
        cardFace,
        resetInput: inputResting ? { ...inputResting, focusRing } : null,
        emptyGate,
        armed,
      };
    }
  } finally {
    await ctx.close().catch(() => undefined);
  }
  return result;
}

function faceDelta(name: string, a: Face | null | undefined, b: Face | null | undefined): string[] {
  const out: string[] = [];
  if (!a || !b) {
    if (a || b) out.push(`${name}: presence OURS=${!!a} REF=${!!b}`);
    return out;
  }
  for (const k of Object.keys(a) as Array<keyof Face>) {
    if (a[k] !== b[k]) out.push(`${name}.${k}: OURS "${String(a[k]).slice(0, 200)}" | REF "${String(b[k]).slice(0, 200)}"`);
  }
  return out;
}

function diffRows(name: string, ours: Row[] | null, ref: Row[] | null): string[] {
  const out: string[] = [];
  if (!ours || !ref) {
    out.push(`${name}: presence OURS=${!!ours} REF=${!!ref}`);
    return out;
  }
  // the text nodes are data-borne (the user name/email values) — normalize
  const norm = (r: Row) => ({ ...r, text: r.text.replace(/sepnetflix[^ ]*/, "demo-user"), cls: r.cls.replace(/\b(h-4 w-4|w-4 h-4)\b/g, "SIZE4") });
  const o = ours.map(norm);
  const r = ref.map(norm);
  const max = Math.max(o.length, r.length);
  let structural = 0;
  for (let i = 0; i < max; i++) {
    const a = o[i];
    const b = r[i];
    if (!a || !b) { out.push(`${name}[${i}]: presence OURS=${!!a} REF=${!!b}`); structural++; continue; }
    if (a.depth !== b.depth || a.tag !== b.tag || a.cls !== b.cls) {
      out.push(`${name}[${i}] d${a.depth}/${b.depth} <${a.tag}>/<${b.tag}>: cls OURS "${a.cls.slice(0, 90)}" | REF "${b.cls.slice(0, 90)}"`);
      structural++;
    }
    const ja = JSON.stringify(a.aria, Object.keys(a.aria).sort());
    const jb = JSON.stringify(b.aria, Object.keys(b.aria).sort());
    if (ja !== jb) out.push(`${name}[${i}] <${a.tag}> aria: OURS ${ja} | REF ${jb}`);
  }
  if (!structural) out.push(`${name}: rows STRUCTURALLY IDENTICAL (${o.length} rows) modulo the aria/data naming`);
  return out;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[walk60] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const state = await preflightPairState(browser);
    console.log("[walk60] pair state: ready (the s162 guarded form)");
    mkdirSync(OUT_DIR, { recursive: true });
    const report: string[] = [];

    // Phase A — the profile OPEN census at BOTH axes
    const oursP = await profilePhase(browser, OUR_URL, state, "OURS", { w: 1440, h: 900 });
    const refP = await profilePhase(browser, REF_URL, state, "REF ", { w: 1440, h: 900 });
    const oursPp = await profilePhase(browser, OUR_URL, state, "OURS", { w: 390, h: 844 });
    const refPp = await profilePhase(browser, REF_URL, state, "REF ", { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-profile-desktop.json"), JSON.stringify(oursP, null, 2));
    writeFileSync(join(OUT_DIR, "ref-profile-desktop.json"), JSON.stringify(refP, null, 2));
    writeFileSync(join(OUT_DIR, "ours-profile-phone.json"), JSON.stringify(oursPp, null, 2));
    writeFileSync(join(OUT_DIR, "ref-profile-phone.json"), JSON.stringify(refPp, null, 2));

    report.push("\n===== PROFILE(PI CARD) @1440x900 =====");
    report.push(`found: OURS ${oursP.found} | REF ${refP.found}`);
    report.push(`h1: OURS "${oursP.h1}" | REF "${refP.h1}"`);
    report.push(`labels: OURS [${oursP.labels.join(" | ")}]`);
    report.push(`       REF  [${refP.labels.join(" | ")}]`);
    if (oursP.fileInput && refP.fileInput) {
      report.push(`fileInput.id: OURS "${oursP.fileInput.id}" | REF "${refP.fileInput.id}"`);
      report.push(`fileInput.accept: OURS "${oursP.fileInput.accept}" | REF "${refP.fileInput.accept}"`);
      report.push(`fileInput.cls: OURS "${oursP.fileInput.cls}" | REF "${refP.fileInput.cls}"`);
      report.push(`fileInput.tabIndex: OURS "${oursP.fileInput.tabIndex}" | REF "${refP.fileInput.tabIndex}"`);
    } else {
      report.push(`fileInput presence: OURS=${!!oursP.fileInput} REF=${!!refP.fileInput}`);
    }
    if (oursP.avatar && refP.avatar) {
      report.push(`avatar.box: OURS ${oursP.avatar.box} | REF ${refP.avatar.box}`);
      report.push(`avatar.inner: OURS <${oursP.avatar.innerTag}> cls="${oursP.avatar.innerCls}" | REF <${refP.avatar.innerTag}> cls="${refP.avatar.innerCls}"`);
      report.push(`avatar.svg: OURS cls="${oursP.avatar.svgCls}" color=${oursP.avatar.glyphColor} ${oursP.avatar.glyphBox} | REF cls="${refP.avatar.svgCls}" color=${refP.avatar.glyphColor} ${refP.avatar.glyphBox}`);
      report.push(`avatar.cls: OURS "${oursP.avatar.cls}" | REF "${refP.avatar.cls}"`);
    } else {
      report.push(`avatar presence: OURS=${!!oursP.avatar} REF=${!!refP.avatar}`);
    }
    if (oursP.uploadBtn && refP.uploadBtn) {
      report.push(`uploadBtn.box: OURS ${oursP.uploadBtn.box} | REF ${refP.uploadBtn.box}`);
      report.push(`uploadBtn.glyph: OURS cls="${oursP.uploadBtn.glyphCls}" paths=${oursP.uploadBtn.glyphPaths} | REF cls="${refP.uploadBtn.glyphCls}" paths=${refP.uploadBtn.glyphPaths}`);
      report.push(`uploadBtn.focusRing: OURS "${oursP.uploadBtn.focusRing}"`);
      report.push(`uploadBtn.focusRing: REF  "${refP.uploadBtn.focusRing}"`);
      report.push(...faceDelta("uploadBtn.face", oursP.uploadBtn.face, refP.uploadBtn.face));
    } else {
      report.push(`uploadBtn presence: OURS=${!!oursP.uploadBtn} REF=${!!refP.uploadBtn}`);
    }
    if (oursP.nameInput && refP.nameInput) {
      report.push(`nameInput.box: OURS ${oursP.nameInput.box} | REF ${refP.nameInput.box}`);
      report.push(`nameInput.focusRing: OURS "${oursP.nameInput.focusRing}"`);
      report.push(`nameInput.focusRing: REF  "${refP.nameInput.focusRing}"`);
      report.push(...faceDelta("nameInput.face", oursP.nameInput.face, refP.nameInput.face));
    }
    if (oursP.disabledEmail && refP.disabledEmail) {
      report.push(...faceDelta("disabledEmail.face", oursP.disabledEmail.face, refP.disabledEmail.face));
    }
    if (oursP.disabledRole && refP.disabledRole) {
      report.push(...faceDelta("disabledRole.face", oursP.disabledRole.face, refP.disabledRole.face));
    }
    if (oursP.saveBtn && refP.saveBtn) {
      report.push(`saveBtn.box: OURS ${oursP.saveBtn.box} | REF ${refP.saveBtn.box}`);
      report.push(`saveBtn.focusRing: OURS "${oursP.saveBtn.focusRing}"`);
      report.push(`saveBtn.focusRing: REF  "${refP.saveBtn.focusRing}"`);
      report.push(...faceDelta("saveBtn.face", oursP.saveBtn.face, refP.saveBtn.face));
    }
    report.push(`smallCards: OURS [${oursP.smallCards.map((c) => `${c.title}=${c.value}`).join(" | ")}]`);
    report.push(`            REF  [${refP.smallCards.map((c) => `${c.title}=${c.value}`).join(" | ")}]`);
    report.push(...diffRows("piLedger", oursP.ledger, refP.ledger));

    report.push("\n===== PROFILE @390x844 =====");
    report.push(`found: OURS ${oursPp.found} | REF ${refPp.found}`);
    if (oursPp.fileInput && refPp.fileInput) report.push(`fileInput.id: OURS "${oursPp.fileInput.id}" | REF "${refPp.fileInput.id}"`);
    if (oursPp.uploadBtn && refPp.uploadBtn) {
      report.push(`uploadBtn.box: OURS ${oursPp.uploadBtn.box} | REF ${refPp.uploadBtn.box}`);
      report.push(...faceDelta("phoneUploadBtn.face", oursPp.uploadBtn.face, refPp.uploadBtn.face));
    }
    if (oursPp.nameInput && refPp.nameInput) {
      report.push(`nameInput.box: OURS ${oursPp.nameInput.box} | REF ${refPp.nameInput.box}`);
      report.push(...faceDelta("phoneNameInput.face", oursPp.nameInput.face, refPp.nameInput.face));
    }
    if (oursPp.saveBtn && refPp.saveBtn) {
      report.push(`saveBtn.box: OURS ${oursPp.saveBtn.box} | REF ${refPp.saveBtn.box}`);
      report.push(...faceDelta("phoneSaveBtn.face", oursPp.saveBtn.face, refPp.saveBtn.face));
    }

    // Phase B — the REAL keyboard Tab chains through the profile form
    const oursT = await profileTabPhase(browser, OUR_URL, state, "OURS");
    const refT = await profileTabPhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-profile-tab.json"), JSON.stringify(oursT, null, 2));
    writeFileSync(join(OUT_DIR, "ref-profile-tab.json"), JSON.stringify(refT, null, 2));
    report.push("\n===== PROFILE TAB-CHAIN @1440x900 =====");
    const normChain = (s: string) => s.replace(/ring=.*/, "ring=N");
    if (JSON.stringify(oursT.stops.map(normChain)) !== JSON.stringify(refT.stops.map(normChain))) {
      report.push(`CHAIN DELTA: OURS [${oursT.stops.join(" → ")}] | REF [${refT.stops.join(" → ")}]`);
    } else {
      report.push(`CHAIN: STRUCTURALLY IDENTICAL [${oursT.stops.map(normChain).join(" → ")}] (the ring-form genus normalized)`);
    }

    // The Data-tab REAL keyboard Tab chain
    const oursDT = await dataTabTabPhase(browser, OUR_URL, state, "OURS");
    const refDT = await dataTabTabPhase(browser, REF_URL, state, "REF ");
    writeFileSync(join(OUT_DIR, "ours-datatab-tab.json"), JSON.stringify(oursDT, null, 2));
    writeFileSync(join(OUT_DIR, "ref-datatab-tab.json"), JSON.stringify(refDT, null, 2));
    report.push("\n===== DATA-TAB TAB-CHAIN @1440x900 =====");
    if (JSON.stringify(oursDT.stops.map(normChain)) !== JSON.stringify(refDT.stops.map(normChain))) {
      report.push(`CHAIN DELTA: OURS [${oursDT.stops.join(" → ")}] | REF [${refDT.stops.join(" → ")}]`);
    } else {
      report.push(`CHAIN: STRUCTURALLY IDENTICAL [${oursDT.stops.map(normChain).join(" → ")}]`);
    }
    if (oursDT.stops.length) report.push(`OURS tmpl1 raw ring: ${(oursDT.stops[0].match(/ring=(.*)$/)?.[1] ?? "").slice(0, 140)}`);
    if (refDT.stops.length) report.push(`REF  tmpl1 raw ring: ${(refDT.stops[0].match(/ring=(.*)$/)?.[1] ?? "").slice(0, 140)}`);

    // Phase C — the Data-tab sibling at BOTH axes
    const oursD = await dataTabPhase(browser, OUR_URL, state, "OURS", { w: 1440, h: 900 });
    const refD = await dataTabPhase(browser, REF_URL, state, "REF ", { w: 1440, h: 900 });
    const oursDp = await dataTabPhase(browser, OUR_URL, state, "OURS", { w: 390, h: 844 });
    const refDp = await dataTabPhase(browser, REF_URL, state, "REF ", { w: 390, h: 844 });
    writeFileSync(join(OUT_DIR, "ours-datatab-desktop.json"), JSON.stringify(oursD, null, 2));
    writeFileSync(join(OUT_DIR, "ref-datatab-desktop.json"), JSON.stringify(refD, null, 2));
    writeFileSync(join(OUT_DIR, "ours-datatab-phone.json"), JSON.stringify(oursDp, null, 2));
    writeFileSync(join(OUT_DIR, "ref-datatab-phone.json"), JSON.stringify(refDp, null, 2));

    report.push("\n===== SETTINGS DATA TAB @1440x900 =====");
    report.push(`found: OURS ${oursD.found} | REF ${refD.found}`);
    report.push(`buttonVocab: OURS [${oursD.buttonVocab.join(" | ")}]`);
    report.push(`             REF  [${refD.buttonVocab.join(" | ")}]`);
    for (let i = 0; i < Math.max(oursD.cards.length, refD.cards.length); i++) {
      const a = oursD.cards[i];
      const b = refD.cards[i];
      if (!a || !b) { report.push(`card[${i}]: presence OURS=${!!a} REF=${!!b}`); continue; }
      report.push(`card[${i}] "${a.firstText}": titleBox OURS ${a.titleBox} | REF ${b.titleBox}`);
      report.push(`card[${i}] descBox: OURS ${a.descBox} | REF ${b.descBox}`);
      report.push(`card[${i}] firstBtnBox: OURS ${a.firstBtnBox} | REF ${b.firstBtnBox}`);
      report.push(...faceDelta(`card[${i}].face`, a.face, b.face));
    }
    if (oursD.tmplBtn && refD.tmplBtn) {
      report.push(`tmplBtn.box: OURS ${oursD.tmplBtn.box} | REF ${refD.tmplBtn.box}`);
      report.push(`tmplBtn.focusRing: OURS "${oursD.tmplBtn.focusRing}"`);
      report.push(`tmplBtn.focusRing: REF  "${refD.tmplBtn.focusRing}"`);
      report.push(...faceDelta("tmplBtn.face", oursD.tmplBtn.face, refD.tmplBtn.face));
    }
    if (oursD.exportBtn && refD.exportBtn) {
      report.push(`exportBtn.box: OURS ${oursD.exportBtn.box} | REF ${refD.exportBtn.box}`);
      report.push(...faceDelta("exportBtn.face", oursD.exportBtn.face, refD.exportBtn.face));
    }
    if (oursD.danger && refD.danger) {
      report.push(...faceDelta("danger.cardFace", oursD.danger.cardFace, refD.danger.cardFace));
      if (oursD.danger.resetInput && refD.danger.resetInput) {
        report.push(`danger.resetInput.focusRing: OURS "${oursD.danger.resetInput.focusRing}"`);
        report.push(`danger.resetInput.focusRing: REF  "${refD.danger.resetInput.focusRing}"`);
        report.push(...faceDelta("danger.resetInput.face", oursD.danger.resetInput.face, refD.danger.resetInput.face));
      }
      if (oursD.danger.emptyGate && refD.danger.emptyGate) {
        report.push(`danger.emptyGate: OURS disabled=${oursD.danger.emptyGate.disabled} | REF disabled=${refD.danger.emptyGate.disabled}`);
        report.push(...faceDelta("danger.emptyGate.face", oursD.danger.emptyGate.face, refD.danger.emptyGate.face));
      }
      if (oursD.danger.armed && refD.danger.armed) {
        report.push(`danger.armed: OURS disabled=${oursD.danger.armed.disabled} | REF disabled=${refD.danger.armed.disabled}`);
        report.push(...faceDelta("danger.armed.face", oursD.danger.armed.face, refD.danger.armed.face));
      }
    } else {
      report.push(`danger presence: OURS=${!!oursD.danger} REF=${!!refD.danger}`);
    }

    report.push("\n===== SETTINGS DATA TAB @390x844 =====");
    report.push(`found: OURS ${oursDp.found} | REF ${refDp.found}`);
    if (oursDp.tmplBtn && refDp.tmplBtn) {
      report.push(`tmplBtn.box: OURS ${oursDp.tmplBtn.box} | REF ${refDp.tmplBtn.box}`);
      report.push(...faceDelta("phoneTmplBtn.face", oursDp.tmplBtn.face, refDp.tmplBtn.face));
    }
    if (oursDp.danger && refDp.danger) {
      report.push(...faceDelta("phoneDanger.cardFace", oursDp.danger.cardFace, refDp.danger.cardFace));
    }

    const text = report.join("\n");
    writeFileSync(join(OUT_DIR, "delta-report.txt"), text);
    console.log(`\n[walk60] DELTA CENSUS:\n${text}`);
    console.log(`\n[walk60] ledgers saved: ${join(OUT_DIR, "*.json")} + delta-report.txt`);
    console.log("[walk60] done — classify the deltas per the plan §WP-2");
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
  console.error("[walk60]", e);
  process.exit(1);
});
