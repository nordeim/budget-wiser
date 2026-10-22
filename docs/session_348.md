工作区完好，包含全部 4 个仓库，且工作日志确认先前的评估排名为（neo-crm 8.1 → zero-balance 7.7 → digma 7.1 → project-management 6.5）。现在开始新任务：更新仓库、以 digma 为参考对 neo-crm 进行 auth 改造 + Zod 可行性评估、TDD 实现、更新文档，以及通过 SSH wrapper 进行 commit/push。
**第一步：刷新所有 4 个仓库**
所有仓库已更新（digma +2 个提交，neo-crm +3 个提交）。现在让我阅读 SSH wrapper 的文档和脚本。
我已理解 SSH wrapper 契约：默认远程是 `task-management`，因此我必须传递 `--remote git@github.com:nordeim/neo-crm.git`，先运行验证关卡，使用 0600 /tmp 密钥文件，进行 dry-run，正式推送，然后销毁密钥。注意，wrapper 的 `OPENSSH_BEGIN` 常量在工具输出中显示为已脱敏 —— 文档明确警告这是显示造成的假象，绝对不能对其进行“修复”。

现在，让我并行调研这两个仓库的当前身份验证状态。
关键发现：**缺少 `ssh` 二进制文件和 paramiko**（推送需要修复 —— 稍后会处理），并且 **digma 和 neo-crm 目前都没有使用 Zod** —— 两者都使用的是手动编写的验证。这决定了 Zod 可行性评估的框架：digma 的 `src/lib/validation.ts` 架构是结构参考；实际的 Zod 使用模式需要对照 zero-balance（字面上的 Zod 参考实现）进行验证。现在让我深入研究这两个认证栈。
差距已经清晰可见：**digma 有 8 个 auth 路由，包括 `forgot-password` + `reset-password`（完整的密码重置流程）；neo-crm 只有 6 个，缺少该流程**。让我完整地阅读这两个 auth stacks。
The central gap is now precise: **neo-crm's session token has NO revocation dimension** (payload `{uid, iat, exp}` only) and **no password-reset flow exists**, while digma's token carries `tokenVersion` + full atomic single-use reset flow. Let me check neo-crm's schema, rate limiter, and login route.
Now I have the complete gap picture. Let me examine neo-crm's remaining auth pieces (verification, login-reset client, auth pages) and check the seeding path for password-hash duplication — then digma's validation seam for the Zod evaluation.
Critical discovery: **neo-crm's "Forgot password?" flow is client-side theater** — the login card swaps reset/sent views purely from client state, no API exists. And **seed.ts duplicates the scrypt hash** (the exact drift problem digma solved with its pure `password.ts` seam). Let me check digma's reset-password page, its validation seam, and zero-balance's actual Zod usage.
All three validation architectures mapped. Now let me study digma's client-side reset wiring, neo-crm's test infrastructure, and the docs-counts self-verification culture (critical for the docs phase).
主要发现：neo-crm 具有**文档数量自我验证**机制——测试用例锁定了文档中的准确测试数量。添加测试时，必须同步更新文档。让我完整阅读一下这个约束。
The docs-counts contract is clear: counts are pinned by tests across README/AGENTS/CLAUDE/PAD/SKILL, and even the pin tests themselves carry ladder assertions. Let me read the repo's own operating conventions (AGENTS.md), e2e setup, and playwright config.
I now have complete architectural understanding. Let me check the environment readiness (node_modules, chromium, docs conventions) before writing the meticulous plan.
需要配置 Playwright 1.64.1 → chromium-1248（缓存中只有 1200 —— 正好是 digma 工作日志中预警的 "S167 事件形态"）。我会在后台启动配置，同时并行验证安装。
安装已验证且完整。现在让我检查 repo 的会话编号规范，然后编写详细的计划。
The plan is nearly complete — one critical design question remains: how the e2e reset-flow spec can work given signup's verification gate + the demo-user eviction hazard. Let me check how digma's e2e solved exactly this.
digma's e2e spec is the exact blueprint: XFF-dedicated bucket + scratch account + verification code from signup response. Let me verify neo-crm's signup response shape.
digma's complete ADR-014 self-hosted delivery pattern is now mapped (code hint in verify view, reset link in sent card, both knob-gated). I have everything needed. Now writing the meticulous retrofit plan.
Plan landed. Now updating the worklog and starting TDD — first the zod dependency, then the RED test battery.
Chromium-1248 已配置。现在进入 TDD RED 阶段。让我先检查一下 resend 路由的具体消息协议，然后编写完整的 RED 测试集。
All message contracts captured. Writing the RED test battery now — six test files covering all work packages.
Now the tokenVersion additions to `auth.test.ts` and the clientKey rewrite in `rate-limit.test.ts`:
Now the RED phase — running the new test files to confirm they fail for the right reasons:
**RED confirmed: 31 failed | 18 passed** — all new contract tests fail for the right reasons (modules/routes don't exist), existing behavior pins still green. Now the GREEN phase — implementing in dependency order, starting with the pure crypto seam.
Now rewiring `auth.ts` — re-export the seam and add the tokenVersion dimension:
Now the schema — adding the three new User columns:
Now the rate-limit hardening — last-hop XFF trust with deploy-declared depth:
Now the Zod schemas module:
Now `parseBody` in api.ts:
Now the two new routes — forgot-password first:
Now retrofitting the login route — zod parse, timing equalizer, versioned mint:
现在 signup 和 resend 路由 — zod 改造 + 应用内 OTP 交付：
现在正在重新连接 seed.ts 以使用 pure seam：
Now regenerating the Prisma client (schema changed) and running the unit tests to check GREEN progress:
进展顺利 —— 75 个通过 / 16 个失败，全部是可诊断的契约微调：旧版的 `signSession(uid, now)` 测试需要更新为新的 `(uid, version, now)` 签名，pre-gate pins 必须认可 parseBody 组合，schema 消息覆盖需要针对每个字段进行差异化，并且我那个 digits-strip 测试的预期逻辑有误。现在修复这四个问题：
TDD is doing its job — three real defects caught: the `timingSafeEqual` import was dropped from auth.ts during the seam extraction, and two over-specific source pins need calibration. Fixing:
**91/91 GREEN.** Now the full unit suite to find collateral breakage in the repo's contract-pin network:
Only 7 failures in 2,347 — all expected contract-pin updates plus the docs-counts census (the WP-8 work). Let me examine and update each:
Found a real contract regression my retrofit introduced: loginSchema lost the 160-cap (the N-63i "160 everywhere" truncation-parity contract). Fixing the schema first, then re-anchoring the historical pins:
Now re-anchoring the four historical pin blocks onto the new forms:
Now the two dead-code-hygiene pins (dep count 19→20 with zod; login email cap re-anchored onto the schema):
Regex-vs-multiline-chain mismatches — the schema chains break across lines. Fixing the two regexes:
2346/2347 — only the docs-counts line-census remains (deliberately deferred to the docs phase when line counts are final). Now the client work: the `/reset-password` page and the login-card wiring.
Full client picture acquired. Wiring the reset flow + the ADR-014 code hints:
Now rendering the reset link in the sent view and the code hint in the verify view:
Now the `/reset-password` page. Let me check the login page's shell structure for consistency:
`LOGIN_LAYOUT.submit` exists — the screen is valid. Running the typecheck:
Typecheck and lint both clean. Now pushing the schema to the dev DB and writing the e2e reset-flow spec:
The existing pin will pass (unknown email → no-enumeration 200 → sent view), but its comment documents the retired theater. Updating it, then building:
Build green with `/reset-password` in the route table. Running the full e2e suite:
**E2E: 161/161 passed** — the full reset round-trip and the behavioral eviction pin both green. Now the docs phase (WP-8). First, exact counts:
The pin excludes `login-card.tsx` for reading `?from_url` (auth-flow input, not UI state) — my `?token=` read is the same class. Fixing the exclusion, then the space-y census:
Census moved to 21 files / 117 occurrences. Re-anchoring the pin:
The offender is my page's *comment* mentioning "useSearchParams" — the scan reads raw text. Rewording:
Now the line-census contract. Let me see all thirteen census sites and their live values:
Now the count-ladder lockstep — enumerating every live-tense site for UNIT/SUITES/E2E/badge:
Routes: 27→29 files, 39→41 handlers. Executing the full count-ladder lockstep update in one pass:
Now the pin-test carriers (docs-counts constants + dialog-geometry lockstep):
The `project_state:` head carries the current session layer. Now the narrative sections — first the SKILL head and version:
**FULL SUITE GREEN: 124/124 files, 2347/2347 tests.** Now the narrative docs — AGENTS auth bullet + Session-163 section, SKILL auth/env/deps sections, PAD, .env.example, session log:
Now the .env.example, SKILL sections, PAD updates, and the session log:
Now the session log and worklog entries:
Now the final full verification gate — lint → typecheck → unit → build → e2e:
**FULL GATE GREEN: lint 0/0 · tsc 0 · 124/2347 unit · build · e2e 161/161.** Now the commit + push phase. First, reviewing the changeset and provisioning the ssh path:
Changeset is clean (43 files, no secrets). pip hit PEP 668 — using the venv python instead:
paramiko 5.1.0 ready. Creating the ssh shim per Appendix A (outside the repo, workspace bin/):
Shim ready. Now committing the retrofit (single atomic commit in the repo's house style):
Commit `eaff1f9` on main, ahead 1. Executing the field-tested push sequence — key to a 0600 /tmp file, shim on PATH, dry-run first:
Dry-run clean — auth verified, fast-forward `44421e2..eaff1f9` negotiates. Real push:
Push verified and keys shredded. HTTPS cross-check that main serves the delivery live:
Live on GitHub confirmed. Finalizing the worklog:
Session-163 已交付并推送。所有 12 个任务均已完成。**提交 `eaff1f9` 已在 GitHub 的 `nordeim/neo-crm` 主分支上线，并已远程验证** —— 无需创建新分支，SSH wrapper 密钥已销毁。

**鉴权改造**（以 digma 为参考，先进行 TDD RED，共 31 个测试失败，然后进行 GREEN）：
- **会话撤销 (Session revocation)** —— 在签名 cookie payload 中添加了 `tokenVersion`；现在重置密码会驱逐每个预先重置的 cookie（行为已在 e2e 中验证）；缺失的 `v` 读取为 0，因此不会强制重新登录
- **密码重置流程 (Password-reset funnel)** —— 之前“忘记密码？”仅仅是个客户端的摆设；现在添加了真正的 `forgot-password`/`reset-password` 路由（无枚举 200、32 字节 token、60 分钟 TTL、原子化单次使用消耗、P2025/P2028 处理）以及一个 `/reset-password` 落地页
- **登录时间均衡器 (Login timing equalizer)**、**最后一跳 XFF 信任 + `NEO_PROXY_HOPS` 故障关闭 (fail-closed)**、**纯 `password.ts` 加密接合点 (crypto seam)**（移除了种子中重复的 scrypt）

**Zod 评估**：如实地发现 digma 本身不使用 Zod（zero-balance 才是该系列的实际参考）—— 结论是可行，已在 8 个鉴权路由中采用 `zod ^4.6.7`，且没有任何消息偏差；CRUD 迁移仍是文档中记录的增量路径。

**验证**：lint 0/0 · tsc 0 · **124/2347 个单元测试 · e2e 161/161**（新的重置往返 + 驱逐测试规范）；所有文档（SKILL v1.160.0, AGENTS, CLAUDE, PAD, README 徽章，计数锁步）均已对齐。

建议的下一步：拉取并在本地尝试重置流程；可以考虑何时将 CRUD 系列迁移到 Zod 架构上，或者将相同的模式移植到 zero-balance/project-management 中。
