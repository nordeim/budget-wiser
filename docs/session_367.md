The workspace is the sandbox base — the neo-crm repo lives elsewhere. Per the worklog, session-171 shipped at commit `147d3f2`. Let me locate/refresh the repo and confirm the true state.
Workspace was reset — re-cloning the repo per house convention.
Repo re-cloned at `48158d5` (the s171 ship `147d3f2` + its session-log commit). Now let me set up the environment and read the authoritative docs.
`session_365.md` 是刚刚提交的 session-171 日志。让我阅读这四份指定文档以及 session-171 计划。
`session_365.md` 是 session-171 的对话记录；`session_364.md` 是其权威记录。本次轮换是 **session-172** —— 171 后审计阶段。让我先制定任务计划，然后继续阅读权威文档。
工作日志确认 s171 已交付。现在正在后台启动环境接入，同时我将阅读核心文档。
现在正在读取核心文档 — 首先是完整的 CLAUDE.md（最新的原则文档）。
核心文档已读取。现在正在检查安装进度，并继续处理 README/PAD 的策略通道。
Install done (530 packages). Now completing the environment intake — .env, prisma generate, db push/seed with the ambient DATABASE_URL shadow scrubbed.
统计 MATCH (15/24/10/23/12 + 4 个用户)。正在安装 chromium 并启动基线检查。
单元测试 135/2668 GREEN —— 精确的 s171 发布状态。现在开始在后台进行构建，同时阅读 PAD/SKILL。
构建过程正在占用资源。正在等待它完成。
Smoke 14/14 PASS, artifact ~151MB (hygienic). Now the e2e suite.
**Baseline gate is GREEN at the exact s171 ship state**: lint 0/0 · tsc 0 · 135/2668 · build · smoke 14/14 · e2e 186/186. Now the standing audit legs.
probe:ref STABLE. Now the dev server (scrubbed env) for the drawer battery and sweeps.
Drawer 7/7 PASS — mobile nav verified live. Now the drift sweeps (desktop + phone).
All standing legs GREEN. Now loading the repo skills for the audit lenses.
Audit lenses loaded. Now the session-172 audit — first the dialog-surface select genus (the unprobed closed-by-default family).
The dialog-surface genus is real — bare sibling `<Label>` with no htmlFor wiring, nameless SelectTriggers. Let me enumerate the full family.
10 + 1 个 SelectTriggers 处于对话层面。正在检查各自的标签上下文，然后进行实时 Axe 探测验证。
The edit-dialog renders config-driven selects with sibling labels. Now the live probe — the executable truth before the plan. Let me check the existing a11y spec's harness form first.
Now writing the live dialog-open probe (throwaway, outside the repo per house convention).
The genus is verified live: 7 nameless dialog comboboxes so far. The activity button label differs — checking and completing the probe.
Updating the probe for the remaining three dialogs (Activity via quick-log, Contact-edit via ⋮ menu, Save-Report).
The edit-dialog genus also has **5 unlabeled inputs** (bare sibling Labels, no htmlFor). Let me see the full probe output and inspect the input rendering.
Full register so far: 11 nameless dialog comboboxes + 5 unlabeled edit-dialog inputs. Checking the save-report dialog trigger and the other edit-dialog configs.
The full genus: 16 nameless dialog comboboxes + 17 unlabeled edit-dialog inputs. Now the parity context — probing the REFERENCE's own dialogs (the honest citation).
**PARITY CONFIRMED**: the reference ships the identical dialog genus (nameless comboboxes + even unlabeled inputs on its event dialog). Let me check the reference's activity trigger form quickly.
The complete parity citation is established. Now auditing the s171 recent code changes + evaluating the fast-check candidate seams.
s171 changes are clean attribute-only fixes. Now evaluating the fast-check property-test seams.
Possible source anomaly in csv.ts (`return ead, ...body]`) — verifying the raw bytes.
The raw line reads `return ead, ...body]` — yet tsc passes. Checking the committed bytes and git history of this line.
False alarm — od confirms the source is correct (`return [head, ...body]`); the earlier display was a terminal artifact. Now testing the fast-check devDep availability for the property family.
fast-check integration confirmed. Checking the a11y-controls census coverage scope (which pages the s171 battery pinned).
The audit register is complete. Now reading the full entity-edit-dialog to plan the label wiring.
Edit-dialog 结构清晰。正在检查我们开放对话框的完整违规情况（包括对比度），以预判 e2e gate 的形式。
The dialog scans will ride the EXISTING sanctioned register. Now examining the property-test seams (format, rate-limit).
One more sweep — any remaining bare-Label/SelectTrigger pairs outside the dialog files.
Audit complete. Now checking the count-ladder pin structure before writing the plan.
Checking the avatar seam (initials derivation — a strong property candidate).
All seams evaluated. Now writing the session-172 plan.
Writing the session-172 plan document now.
Plan landed. Now validating it against the codebase — first the F-172e parser defect, then the e2e trigger forms.
F-172e confirmed live. Checking whether any existing test pins the current parser normalization.
Plan validated against the codebase. Now the TDD RED phase — studying the house source-pin idiom first.
Now writing the RED-phase battery — tests/dialog-controls.test.ts (the 136th suite).
Now the property battery (the 137th suite).
Now the e2e spec extension — the six dialog-open scans.
31 registrations (25+6). Now running the RED phase against the unfixed code.
RED 状态：6 + 5 个失败 —— 属性族发现了超出计划之外的**真正缺陷**（lead-views 往返、saved-reports 幂等性、initials）。正在逐一调查。
Two test-design fixes needed (saved-reports domain, initials scope) — but the lead-views failure looks like a REAL defect. Investigating the seam.
The property failures are generator-contract mismatches (the house "calibration catches at birth" pattern): my generators violated the seam's true contracts (`unqualified` isn't a filter vocabulary value; `minValue` is contractually `string`, never `undefined`). Fixing the generators to the honest domains.
**Honest RED state**: 8 failing (6 dialog + 2 csv-parser) + 19 born-green, with three live-caught calibration catches. Now the GREEN phase — the nine create-dialog aria-labels.
All 9 create-dialog labels landed. Now the edit-dialog wiring.
Now the parseCsv fix (F-172e) — moving line-ending normalization inside the state machine.
Dialog suite GREEN, csv family GREEN — but P-a still fails. Inspecting the failing input.
The counterexample is the parser's DOCUMENTED blank-row contract (the pinned "drops blank trailing lines" behavior) — the property's domain must respect it. Another live-caught calibration. Fixing the generators.
My test compared the parsed HEADER row against data rows — a test-construction bug. Fixing the comparison.
Third calibration: the toCsv model renders FIXED-WIDTH column sets — ragged rows are outside the production domain. Rewriting the generator with width-chained matrices.
**GREEN — 27/27** across both new suites. Running the full unit suite + lint + tsc.
The four expected collateral re-anchors. Examining each pin.
Now the Appendix B a11y row + the PAD §11 line-count rows. Locating the carriers.
The count ladder: running the full suite for the authoritative count.
**Count ladder**: UNIT 2668 → 2697 (+29) · SUITES 135 → 137 · E2E 186 → 192 (+6) · badge 2854 → 2889. Surveying every carrier site.
Writing the count-ladder script (the house assert-first, idempotent form).
Ladder idempotent (0-flip re-run ✓). Three content carriers remain — examining them.
Now the SKILL head surgery — checking the lockstep pin's expected form.
Writing the s172 head surgery script.
The two CLAUDE-lockstep carrier pins need re-anchoring to the new counts.
**Full unit suite GREEN: 137/2697.** Now the mutation-proof ritual.
Mutation proof PASS. Now the docs lockstep — the AGENTS Session-172 section.
Now the PAD ADR-017 + the session-172 inventory row.
Now the PAD session-172 inventory row.
Now the CLAUDE doctrine lines + README Tested-row mention.
Docs lockstep done. Now the live re-probe — verifying the naming cure on the open dialogs.
**ZERO naming violations on every open dialog — the cure verified live.** Now the attribute-only proof (drawer + probe:ref + sweeps).
**Attribute-only proof holds** — drawer 7/7 · probe:ref STABLE · sweeps CLEAN. Now the final gate: build → smoke → e2e 192.
**E2E 192/192 GREEN.** Verifying the six dialog-open scans ran specifically.
所有 6 次对话框扫描均已通过。现在开始 census check + captures。
Captures 425-428 landed. Now writing session_366.md (the canonical record).
Now the plan's execution record + the repo worklog entry.
Final pre-commit verification — the full unit suite after all doc edits.
**FINAL GATE FULLY GREEN.** Now the commit — checking the change set and reading the push runbook.
Runbook internalized. Now committing (the house mega-message convention).
Commit `c6c2e94` on main, tree clean. Now the SSH wrapper push — materializing the key outside the repo.
Now deploying the shim (the Appendix-A full-duplex pump + the DNS retry).
Shim works — remote at `48158d5`, local ahead at `c6c2e94`. Now the wrapper dry-run.
Dry-run clean (fast-forward `48158d5..c6c2e94`). The REAL push.
**PUSH SUCCEEDED** — remote main @ `c6c2e94` == local HEAD. Independent verification + key shredding.
Session-172 shipped. Recording the sandbox worklog entry.
**Session-172 已交付并推送** — commit `c6c2e94` 已在 `git@github.com:nordeim/neo-crm.git` 的 main 分支上验证（已通过独立 HTTPS 检查，密钥已粉碎，无新分支）。

**本轮概要：**

- **基准测试**：s171 发布状态完全复现（lint 0 · tsc 0 · 135/2668 · smoke 14/14 · e2e 186/186 · drawer 7/7 · probe:ref STABLE）
- **审计**：实时 `open-dialog` axe 探测（我们的 + 参考项目自身的对话框）发现了**默认关闭的 genus**，这是所有页面扫描都无法看到的 — 9 个未命名的创建对话框选择器 + 编辑对话框系列（5 个未命名的触发器 + 17 个未标记的输入），外加参考项目自带的相同缺陷（不可见的超集）
- **额外收获**：新的 `fast-check` 属性测试系列发现了一个**真实的解析器错误**（`parseCsv` 会静默修改带引号的 CRLF 单元格 — 违反了 RFC 4180 §2.6），该问题在 RED 阶段被发现并在源头得到修复
- **修复**：所有 14 个对话框控件已命名 + 17 个输入通过 `htmlFor/id` 进行了绑定；a11y 双重门限扩展了 6 个 `dialog-open` e2e 扫描；`fast-check ^4.10.2` 已声明（第 13 个 `devDep`）
- **最终门限**：lint 0 · tsc 0 · **137/2697** unit · smoke 14/14 · **e2e 192/192** · 仅属性校验（抽屉 7/7 · 探测 STABLE · 扫描 CLEAN — 零像素偏移）· mutation-proof 通过

**建议的后续步骤**：在 GitHub 上验证 commit；下一个轮换的候选工作包括抽屉内部重新梳理、更深层次的属性系列（Zod 往返测试 + 速率限制窗口计算需要可注入的时钟 seam），或者针对最新参考探测进行许可注册表的重新验证。
