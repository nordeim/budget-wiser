The workspace has been reset — no neo-crm repo present. Let me set up the task plan and clone the repository.
仓库已克隆 — 令人印象深刻的演化状态（已到 session-180，测试计数 2750/138 个套件/192 个 e2e）。请注意，`vitest.config.ts`、`playwright.config.ts`、`.env.example` 和 `db/` 已经存在。让我查看一下文档和代码结构。
The `db/` folder at root is **empty** — a gap to address. Let me check the latest sessions, `.env` state, and key configs.
Excellent — the repo is in a highly-evolved state. `.env.example` already encodes `DATABASE_URL="file:../db/custom.db"`, `db/` exists at root (empty, needs `db:push`+`db:seed`), and no `.env` yet. Let me read the latest session docs to understand the current status.
session_383.md 记录了 session-180（walk53）的成功发布。在 `e4e39ef` 之后，所有者进行了上传（`c4a5c4e`）和合并（`144f2dd`）——这些新提交是下一次轮换的触发器。让我来检查一下所有者上传了什么内容。
现在情况已经明了：上一个 Agent 运行发布了 session-180（`e4e39ef`），随后所有者上传了 `docs/session_383.md`（该轮的执行记录）并进行了合并。根据项目规范，本次任务是 **session-181** —— 由所有者的新提交触发（s180 的执行记录上传）。让我来阅读一下关键文档。
现在让我阅读 s180 计划文档（以理解议会计划表）和仓库工作日志的尾部。
The house forms are clear. Now let me read the repo worklog tail and key AGENTS.md sections to understand doctrine and the next-rotation candidates.
The full picture is clear. This round is **session-181**, triggered by the owner's upload of the session_383 transcript. Let me read the core doctrine docs — CLAUDE.md fully, AGENTS.md strategically (head + latest session sections), and the skills catalog.
I now have the full house doctrine internalized. This round is **session-181** — the post-180 audit rotation, first-named candidate: the dialog-surface focus faces. Let me start the environment intake (the slow part) while studying the tooling.
Confirmed the ambient `DATABASE_URL` shadow (the documented F-123a1 hazard) — all DB-touching commands will run with `env -u DATABASE_URL`. Starting the fresh-sandbox intake:
While the install runs, let me study the walk-tool forms and survey the dialog surfaces (the round's candidate material).
The rotation material is confirmed: s172 walked dialog named-controls (a11y), s112 walked dialog geometry — but the **dialog-surface focus faces under REAL keyboard drive** in the walk50-form two-app computed ledger remain unwalked. That's the session-181 round (walk54). Let me check install progress and continue the intake.
Census MATCH. Now installing Playwright chromium and running the baseline gate legs:
**Baseline: lint 0/0 · tsc 0 · 138/2750** — the exact s180 ship state. Running build + the rotation-adjudication legs (probe:ref + recharts registry):
Rotation adjudication complete: probe:ref **STABLE** (46bc2d9c) kills the fresh-bundle candidate; recharts **3.10.1** kills the 4.0 gate. **The round = the dialog-surface focus faces (walk54)** — the s180 close's first-named candidate. Let me study the walk-tool form and the dialog surfaces.
The walk53 tool form is fully understood. Now let me survey the dialog surfaces and check what the standing e2e battery already pins on dialogs.
s112 完成了几何结构 + `mount-focus`。尚未覆盖的部分：**在真实的键盘 Tab 操作下，对话框控件的 `focus-visible` 状态**。让我研究一下 `page-layout` 载体和输入框的 `focus` 合约：
The walk51 REAL-keyboard-focus form is clear. Build is GREEN. Now running smoke + e2e to complete the baseline:
**BASELINE FULLY GREEN**: lint 0/0 · tsc 0 · 138/2750 · build · smoke 14/14 · e2e 192/192 (clean first run) · probe:ref STABLE · census MATCH. Now the standing audit legs — drawer battery + drift sweeps:
Drawer battery GREEN (all stages). Now the drift sweeps:
Both sweeps CLEAN — the audit leg is complete, zero live defects at the s180 ship state. Let me check the Tailwind v4 state and survey the dialog's focusable inventory for the walk:
Tailwind v4 state clean. Let me survey the New Lead dialog's focusable chain (the walk subject):
The dialog's focusable chain is mapped. Now let me study the round-tooling forms (count-ladder, skill-head, captures) to replicate:
Let me survey the existing pin coverage (the pin-survey-first lesson from s180) before writing the plan:
The pin-block form is fully internalized. Let me check the remaining carriers and the captures form:
Let me survey the existing DIALOG_CONTENT/CLOSE pin coverage to plan non-duplicative pins:
All forms internalized. Now writing the session-181 remediation plan:
Plan written. Now validating against the codebase — the D-112a4 dialog-root rule and the leads-page trigger:
The D-112a4 rule validated (the drawer's `DialogPrimitive.Content`). Now writing the discovery probe:
**MAIDEN CALIBRATION SUPERB**: both apps' dialog structures byte-equal (12 focusable controls at identical boxes, mount-focus on the first input, the ring painting `rgb(10,10,10) 0px 0px 0px 1px` on BOTH). The aria-label superset genus + the outline VERSION FORM genus already visible. Now writing the walk54 tool:
**WALK54 MAIDEN PASS — the decode is superb.** The Tab chain lands on identical elements on both apps (10 stops + the wrap at Tab 10 → ld-name), and every VISIBLE focus ring is byte-equal. Let me verify two decode questions — the REF's `aria-describedby` node and the overlay probe:
DOM structures byte-equal (51 rows, identical tag counters). Let me pinpoint the aria-describedby target node on the reference:
All 12 divergent rows are documented genera (the other 39 byte-equal including geometry). One decode question remains — the REF's `aria-describedby` target. Let me probe it live:
**DECODE RESOLVED — a new documented genus**: the REF's `aria-describedby="radix-:r8:"` points at **"NO SUCH ELEMENT"** — the reference's own platform carries a *dangling ARIA pointer* (their own defect); OURS omits the attribute entirely (the clean form — the s15-P4 no-description doctrine). Now let me fix the walk's overlay probe (the selector missed on both apps equally):
**Overlay decoded**: byte-equal class + geometry on both apps; the bg serializes as `oklab(0 0 0 / 0.8)` vs `rgba(0, 0, 0, 0.8)` — the documented v4 color-serialization genus (same visual color, the s28/e2e precedent). Fixing the walk's overlay probe and re-running for the complete ledger:
The walk is complete and stable at both axes. Let me verify the phone-axis delta structure:
**DECODE COMPLETE — ZERO LIVE DEFECTS.** Both axes carry identical delta censuses (79 lines: all documented genera). The round's new decode knowledge: the **dangling aria-describedby genus** (the reference's own dead pointer), the mount-focus ring behavior, the Tab-wrap census, and the overlay serialization genus. Let me check the s15 description-doctrine pin coverage before writing the TDD battery:
Pin survey complete: DIALOG_CONTENT.base, DIALOG_CLOSE, and DIALOG_OVERLAY all carry only fragment pins — the FULL-string upgrades are genuine gaps. Writing the TDD battery (4 born-green pins):
**4/4 born-green** (230 in-suite). Now WP-4 — the proofs. MUTATION-PROOF first (plant a regression only the new full-string pin catches):
**MUTATION-PROOF: exactly 1 RED** — only the new full-string pin tripped (unique teeth proven). Restoring and running STASH-PROOF:
**STASH-PROOF PASSED**: 138/2750 (the s180 ship state) → restored → **138/2754** (+4). Now WP-5 — the count ladder. Studying the s180 flip-site list:
Writing count-ladder-181.py (2750 → 2754 · badge 2942 → 2946):
Ladder idempotent + **138/2754 GREEN** (the census pins live-verified the collateral). Now the collateral re-anchors — the SKILL §5.6 census and the F-106a1 layer-axis pin:
Now the collateral re-anchors. Let me examine the SKILL head structure:
Writing skill-head-181.py (the s181 head surgery):
Now the docs-counts collateral re-anchors (the §5.6 census 226→230 + the F-106a1 layer-axis):
The SKILL §5.6 live site itself needs the 226→230 update:
**138/2754 GREEN** — all re-anchors verified. Now the docs lockstep. First the AGENTS.md Session-181 section:
Now the PAD inventory row. Locating the insertion point:
Now the CLAUDE page-layout bullet's walk54 tail and the README Tested row:
Now WP-6 — the captures 459-462 (the walk54 focus faces ours+ref):
Captures landed with byte-equal sizes (814/814 and 757/757). Running the pixel-diff verification:
**BOTH PAIRS 0.00% — BYTE-IDENTICAL (same md5)**. Let me VLM-verify the capture content (the house form):
该配对在数学上是字节一致的；VLM 将 1px 的近黑色环视为“黑色边框”（该环是环本身的极简深色形式）。正在验证关闭 X 捕获：
The VLM confirms the content (the X enclosed in its rounded-square double-ring). Both pairs byte-identical — the parity proof is mathematical. Now cleaning up the throwaway probes and writing the session record:
Now updating the plan's execution record with the actual results:
Now the worklog entry (Task ID 181) in the repo's docs/worklog.md:
Now the FINAL GATE (lint → tsc → test → build → smoke → e2e):
**FINAL GATE FULLY GREEN**: lint 0/0 · tsc 0 · 138/2754 · build · smoke 14/14 · e2e 192/192. Now the commit + push leg. Reading the SSH wrapper instructions:
The wrapper instructions are clear. Let me check the working tree and prepare the commit:
Working tree is clean of surprises. No `ssh` binary — deploying the paramiko shim and the operator key (outside the repo):
The shim works (correctly refuses the no-command case). Deploying the operator key and verifying:
Key deployed and verified (Ed25519). Now staging the round and writing the house-form commit:
Commit `ea86922` landed on main. Now the dry-run push via the SSH wrapper:
Dry-run GREEN — remote at `144f2dd` (no race). Executing the real push:
**PUSHED + REMOTE VERIFIED** — `refs/heads/main = ea86922` confirmed independently via HTTPS ls-remote. Final cleanup — shredding the key and stopping the dev server:
**Session-181 shipped** — commit `ea86922` pushed to main, remote independently verified, key shredded.

**The round**: audited the s180 ship state on a fresh clone (full gate green — lint 0/0 · tsc 0 · 138/2750 · build · smoke 14/14 · e2e 192/192 clean · probe:ref STABLE · drawer battery · sweeps · census MATCH), then executed the next rotation per house doctrine — **walk54, the dialog-surface focus-state interior walk**. The two-app ledger found **zero live defects**: the 51-row dialog spine byte-equal, the REAL keyboard Tab chain position-identical through all 10 stops plus the focus-trap wrap, and every visible focus face byte-equal (including the close X's double ring). The walk's own discovery: a **new documented genus — the reference's dangling `aria-describedby`** (its own platform's dead ARIA pointer; ours is the clean form). Captures 459-462 came back **byte-identical (same md5)** on both pairs.

**Verification**: lint 0/0 · tsc 0 · **138/2754** unit · build · smoke 14/14 · **e2e 192/192** · census MATCH · probe:ref STABLE · captures both pairs 0.00%. All operator asks verified standing: `.env`/db placement, vitest+playwright configs, sitemap/SEO (11 routes + robots + manifest), mobile-nav parity, Tailwind v4 clean, `.env.example` committed.

**Suggested next steps**: verify `ea86922` on GitHub; the next rotation candidates are the reports-filter selects' OPEN states, the popover family's OPEN faces, or the Edit-family dialogs' focus faces — plus the fresh-bundle re-derivation whenever probe:ref next trips.
