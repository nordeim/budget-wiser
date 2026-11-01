# Session 96 — Census #47 (Task ID 239, the session-50 round)

**Date:** 2026-11-01 · **Branch:** `main` only · **Commit type:** `fix:` (one code finding)

## Round narrative

工作区 RESET（第十二次重置）——全新克隆引导：`bun install` → 六旋钮 `.env`（含 `DATABASE_URL="file:../db/custom.db"` 与生成的 `AUTH_SECRET`）→ `db:push + db:seed` → Playwright Chromium 1248 重下（记录在案的全新沙箱步骤）→ 基线门禁首轮全绿：lint 0/0 · tsc 0 · **422/422 单测** · build · **14/14 冒烟** · **68/68 e2e (CI=1)** · 移动端导航电池 **12/12** 独立复验；本地审计（§16/§20）全清洁，`skills/` 四范围排除复检确认。

**普查 #47 参考侧**：登录后数据状态第 39 轮不变（3 笔 10月27日交易，−$2,481.00；11月空月 KPI 全零；Spend Summary 卡 Week Spent $2481.00 / Week Earned $0.00）；四页标题全导航；s207 三探针（`Curl%20Probe%20239%20Test` → "Curl Probe 239 Test | Budget Wise"、%2D 解码先于连字符、/Hyphen-Probe-239）全部双端一致，404 体于探针页直读引原始编码路径（首轮即按 canon 读法，未重蹈循环末页陷阱）；520 面 CDN 状态复验；行解剖全嵌套逐字节一致；双对话框（支出家族 8 项组合框打开读、Income 标签在新鲜对话框 + 真实 Enter keydown 下翻转 + 收入家族 5 项、Set Budget 全字段）；移动端底栏逐维一致 + 间隙 **764 ≤ 767, gap 3 双端相同**（滚动到底 canon 读法）；SEO 表面（4-cap-loc sitemap · robots 同形 · manifest 302）；登出根路径重定向。捕获 4 帧参考图。**参考侧零结构漂移。**

**普查 #47 本地侧**：当月（11月）重播种 + 全新 `.next` 引导 dev server；全部探针镜像匹配（有数据 KPI $4,424.55 / 88.5% saved / 甜甜圈图例、s207 三探针 + 真实 404 状态、520 设计回退、行解剖 + N-89c6 超集 + trash2 双别名/`[&_svg]:size-4` 习惯用法（计算尺寸 16×16 双端相同）、双对话框、Spend Summary 卡 Week Spent $0.00 / Week Earned $5,000.00（11月1日薪资落周内——同 scoping genus）、移动端栏 + NAV/aria-current 超集 + 相同间隙、SEO 9-loc 超集、公共落地页 + 应用页访客墙 `/login?from_url=` 同形）。**双端对照：零结构漂移。**

**本轮发现（F-239a，Medium——自 s230 圆环图轮以来的首个代码发现）**：普查电池 boot-1 答 9/12 与 HEAD 逐字节一致，但两个 profile 帧（desktop/mobile）答**记录 genus 对之外的新 md5**——像素差异定位到 profile 页的 `text-xs text-slate-500` "Member since" 行（bbox (373,450,558,460) / (103,450,287,460)，非头像区）。根因：**seed 的用户 `create` 块未钉 `createdAt`**——Prisma 默认 now()，演示账号的账龄随播种日期漂移；参考所有者账号渲染固定的 "Member since October 2026"（本轮活体复读）。此前十一轮无重置，常备 db 一直源自 10 月——掩盖了缺陷；本轮重置迫使首次真正全新播种，演示用户被重日期为 11 月，电池 RED。对每道门禁不可见（e2e 只断言可见性，无单元 pin——s196 类）。

**TDD 修复**：RED 先行（新 demo-fixture spec 于缺失模块上失败）；GREEN 于数据层钉住——`src/lib/demo-fixture.ts` 导出 `DEMO_MEMBER_SINCE`（固定 `2026-10-15T00:00:00.000Z`，月中设计使任何 UTC 偏移都不改变渲染月份）+ `prisma/seed.ts` 在两个用户 upsert 的 create **和** update 块中钉 `createdAt`（原位重播种将漂移的常备 db 拉回 fixture）；真实注册用户保留真实 createdAt。修复活体验证：profile 页复读 **"Member since October 2026"** 与参考逐字节一致；profile 电池帧复捕答 HEAD 精确字节（desktop `ed954b46` · mobile `b0413d45`）。**单测数 422 → 425**（3 条新断言），s222 锁步守卫同变更集全绿（tests/docs-counts 常量 + README + CLAUDE + PAD §7 + SKILL 全部 425/68/14 活体时态）。

**证据层**：
- 电池 boot-2 证明：**12/12 双 boot 稳定**（9/12 与 HEAD 逐字节一致 + 3 帧记录 genus 实现——dashboard-desktop 答**记录的 settle 态 `327d785a`**，双 boot 确定性，全部 49,260 差异像素低于阈值（donut 抗锯齿带；自 s233 以来首个 settle 形态轮，五轮缺席后回归——时序依赖分类的预测应验）；两个 profile 帧在记录头像抖动 genus 对内（desktop `3d5173c8` ↔ `ed954b46` · mobile `8c6e81e7` ↔ `b0413d45`，修复后复捕直接答 HEAD 字节）；零可见阈值像素、零新 bbox；无需刷新任何帧（s228 先例）
- **VLM 电池 2/4 None，零存活标志**（dashboard 对 3 旗均为记录数据源 genus——空月 vs 播种甜甜圈、周柱、88.5% 徽章条件渲染；transactions-mobile 对 2 旗——行内徽章粗空间断言被逐字节行解剖推翻 + "底栏少 2 项"断言被直读 4 锚点普查推翻——平台徽章遮挡参考帧所致）

**s230 F-1 活体复验**：`throwaway239-ui-*@test.local` 经应用内 OTP 漏斗——**描述符数字填充在自动前进下答一位移位**（`.set` + input 事件后首框空、后框前移），**真实键击**（聚焦首框后 `keyboard type`）为可靠 canon 形态（已固化于 census239 脚本）；空仪表盘渲染精确参考结构（`text-slate-400` P "No expenses recorded yet" 直接位于 `p-6 pt-0 flex items-center justify-center h-64` 内，无 svg 兄弟）+ Budget Progress / Recent Transactions 空态 + "November 2026 Overview"；API 精确空聚合确认（balance 0 · income 0 · expenses 0 · **transactionCount 0** · spendingByCategory [] · overallBudget null · budgets [] · 周桶全零 · recentTransactions []——**API 探针脚本 `txnCount` 字段名债务本轮修复**，读取正确的 `transactionCount`，无误报）；有数据形态同会话复核完好（$4,424.55 · 88.5% saved）。

**方法论守卫入册（本轮新增 4 条）**：
1. **移动端栏探针选择器**：必须用类选择器（`.md\:hidden.fixed.bottom-0`）——我方底栏是 NAV 超集地标而非裸 DIV，`div.md\:hidden` 形式静默答 "NO BAR"
2. **注册漏斗确认密码框**：signup 卡带 "Re-enter password" 确认框，不填则 Create account 验证门不触发
3. **OTP 数字填充以真实键击为 canon**：描述符 `.set` + input 事件在自动前进组件下答一位移位；聚焦首框后真实键击可靠
4. **cookie 清理与墙形探针竞态**：cookie clear 后须待其生效再导航读 URL（本地早前一次读取答陈旧会话形态）

**交付**：单原子 `fix:` 提交推送至 `git@github.com:nordeim/budget-wiser.git` main 分支——含 F-239a 修复四文件（demo-fixture.ts、seed.ts、demo-fixture.test.ts、docs-counts.test.ts）+ 计数锁步四文档面（README、CLAUDE、PAD、SKILL）+ 文档五件套（PLAN-50、session_96、PAD v2.49.0 修订块、SKILL v1.48.0 provenance + Appendix C 第 239 行、worklog Task 239）；推送经 `docs/ssh_git_wrapper_v3.py`（dry-run 先行，密钥物化 /tmp、推送后粉碎）；无截图刷新需求（每帧差异均为记录 genus）。

**下一步**：第48次普查（Task ID 240，探针 `Curl Probe 240 Test`）——留意所有者侧数据重植；月度时态更替时 e2e 日期匹配器已按月无关设计；新工作区重置轮将首次以已钉的 member-since fixture 引导（F-239a 的回归面即在其上）。
