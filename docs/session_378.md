我将按照任务书继续 neo-crm 的旋转迭代工作流。这是新一轮审计整改（引用已前移至 session_375/376 + session-176 recharts-3-migration 计划）。首先建立 TODO 计划，然后从 `git pull` 开始。
工作区已被重置，需要重新 clone。同时 paramiko 需要重装。
克隆成功。关键发现：远程已大幅前移——**session-175（wire-contract family）和 session-176（recharts 3.x migration，N-3 retirement）均已由外部完成并推送**。HEAD 为 `59c8f13`。本轮实际是 session-177 审计轮。核实文档存在性：
工作目录问题——使用绝对路径重试：
所有指定文档齐全。标记步骤 1 完成，开始步骤 2-3：精读文档。先查看文件规模：
AGENTS.md（9895 行）和 SKILL.md（12392 行）为巨型文档，将读关键区段。先并行精读 4 个会话文档：
session_376.md 确认为 s176 执行转录（本轮 rotation trigger）。现在读 176 计划文档和 worklog：
读取 worklog 尾部（最新 Task ID 176 记录）和核心文档关键区段：
Worklog 已确认 Task ID 176 为最新。现在读核心文档——先 CLAUDE.md 全文和 AGENTS.md 头部：
核心文档精读完成。当前状态明确：**s176 ship state = recharts 3.10.1 · 138/2733 unit · 192 e2e · badge 2925 · SKILL v1.173.0 · ADR-021**。Register 的 named code-level candidates 已全部退役。本轮为 session-177 审计轮。

现在对照代码库验证状态对齐，并做环境 intake：
迁移状态验证通过（recharts ^3.10.1 · lockfile 3.10.1 · parity props 在位）。现在进行环境 intake：
Intake 完成，census MATCH。现在运行 baseline gate——lint、typecheck、unit：
Unit 138/2733 GREEN——精确匹配 s176 ship 状态。继续 build + smoke：
Smoke 14/14。现在 e2e（前台运行，约 5.4 分钟）：
**BASELINE GATE FULLY GREEN**——lint 0/0 · tsc 0 · 138/2733 · build · smoke 14/14 · e2e 192/192。现在跑 standing legs——先是 probe:ref（关键：检测 reference 是否发布了新 bundle）：
probe:ref STABLE（`46bc2d9c`）——reference 未变，非 fresh-bundle 轮。继续 drawer battery 和 sweeps：
Drawer battery GREEN。现在跑 desktop + phone drift sweeps：
Desktop sweep CLEAN。Phone sweep（390×844）：
Phone sweep CLEAN——全部在 standing floors 内。**状态对齐验证完成：代码库与 s176 ship state 完全一致，baseline + standing legs 全 GREEN。**

进入审计阶段。先读审计用 skills：
Register 状态确认：N-3/N-4 已退役，N-2 已证实为有意设计，N-1（owner-level doc restructure）与 N-5（watch item）为 standing deferrals。继续审计 legs——Tailwind v4 状态、sitemap/SEO、测试配置：
Tailwind v4 状态 clean、SEO 文件齐全。现在做 Base44 对等性验证——登录 reference app 并对照 dashboard：
Captures 441-444 在位。现在用 agent-browser 登录 Base44 reference 验证对等性：
Reference 登录成功——落地在 marketing landing（standing 状态）。进入 dashboard 验证：
Reference dashboard 渲染正常（8 nav links · topbar · KPI 零数据 standing 状态）。验证移动端菜单——reference 在 390px 的 drawer：
参考移动端抽屉（Reference mobile drawer）已验证：dialog 结构 + 8 个导航链接 + 关闭（Close）按钮——我们的抽屉组件（drawer battery）完美对应。正在关闭浏览器并检查 scandihaven 参考模式与抽屉走查（drawer walk）历史：
scandihaven 模式已确认对齐（无新增变化）。现在调查 s376 close 点名的第一候选——drawer interior re-walk 的历史脉络：
**关键发现**：interior census 从未覆盖 drawer-open 状态（无 "drawer" 引用）；a11y 只扫 axe violations、battery 只测行为、截图只看视觉——**drawer 内部的两 app DOM 逐元素对照是真实空白**，这正是 s366 以来被点名 5+ 次的候选。查看我们的 drawer 结构：
我们的 drawer 结构已审。查 walk 编号序列以确定本轮走查编号：
walk 编号确认——下一个是 **walk50**。审计结论成型。现在验证最后一个审计维度——s175/s176 近期变更的完整 diff 统计，然后制定本轮计划：
审计完成——零 live defects，覆盖空白锁定。在写计划前，先查现有 drawer 测试覆盖面，确保 WP 设计精准：
MOBILE_NAV_SHEET contract 已完整审阅。查 drawer 相关源文件自 s147（walk37 解码）后的变更历史——走查的核心价值点：
mobile-nav.tsx 自 s147 后零改动（30 sessions）——walk37 契约无源码漂移，但 **interior 级两 app 复验从未做过**。审计结论完整，现在写本轮计划文档：
计划已落地。二次校验——读既有工具形态（drawer-battery、sweep-state）确认 walk50 的复用机制：
工具机制清晰。查看 sweep.ts 的 login 导出（walk50 复用 reference 登录机制）：
复用机制齐备。写 walk50 工具：
校验 sweep-state 导出签名与我的用法一致性：
发现用法错误——`preflightPairState` 返回 state 对象（非路径）且内部自愈。修正 walk50：
**Maiden pass 成功**：OURS 61 rows vs REF 53 rows，140 行差异报告。初步解码已见几个关键面——最重要的是 **header 8px 高度差级联整条 spine**（y 88 vs 80）。看完整差异报告：
**ROOT CAUSE 找到**：两边 h2 都是 32px，但 header 88 vs 80px——**v4 space-y 语义翻转的 drawer 新面**（M-92c1 phantom-mb genus 同构）：reference 的 v3 语义给 sr-only p 的 mt 不参与布局（absolute 定位），我们的 v4 给 h2 的 mb-2 参与布局 → 8px 差级联整条 nav spine。查 Close 按钮的 accent/secondary 计算值和尾部 footer：
Footer 结构 parity 确认（8px 级联一致）。查 accent/secondary token 计算值：
Login rate-limit wall (L-158c3, known). Restart the dev server to clear the in-memory bucket, then run the probe:
**计算值裁决完成**：sheetBg 两边 rgb(37,99,235) 相等（token parity）；Close 按钮 bg 两边透明（Radix Close 无 data-state——dead variants，shadcn 版本 genus）；h2 行高两边 32px。**唯一 LIVE DEFECT = header 8px 膨胀**（v4 space-y 语义翻转级联整条 spine，自 s147 起存在、从未被对照发现——walk50 的价值证明）。

查现有 drawer pins 的 suite 位置，落 RED pin：
Pin 位置明确（`tests/page-layout.test.ts` s147 describe block）。落 RED battery——session-177 describe block：
落 RED battery——session-177 describe block 插入 s147 block 之后：
现在运行 RED 验证（诚实 Red 诞生）：
**Red birth 诚实**：1 个 Red（title mb-0 pin）+ 1 个 born-green（decode freeze）。现在进行 Green 修复——为 `MOBILE_NAV_SHEET.title` 添加 `mb-0`，并重新锚定 s147 的旧 pin：
GREEN（212/212）。Live 复跑 walk50 验证 8px 级联消失：
**8px 级联全部消除**（header/nav/link 的 box delta 消失，剩余 delta 全是已分类 genus + span 包裹导致的对齐错位）。精确验证 spine 几何：
**SPINE BYTE-EQUAL 达成**——header 80/80、9 links 完全一致、footer 428/428。复跑 drawer battery 验证行为不受影响，并全量 unit 检查 collateral re-anchor：
预期 collateral——PAD §11 的 page-layout.ts 行数 pin。获取 live 行数并 re-anchor：
机制明确——census 活读 PAD §11 对照 live 行数。Re-anchor PAD row（1687 → 1695）：
Re-anchor 三处 lockstep carriers（SKILL §5.6 + docs-counts pins，旧形式入 negatives ladder）：
**138/2735 GREEN**（+2）。现在跑 MUTATION-PROOF（planted regression：去掉 mb-0 → pin 必 RED）：
MUTATION-PROOF 通过（exactly 1 RED → 恢复 GREEN）。现在 STASH-PROOF：
**STASH-PROOF 通过**（2733 stash → 2735 恢复）。现在写 captures 脚本（445-448 + 443 re-anchor）。先看 s176 的 capture 形态：
写 captures-177.ts（443 re-anchor + 445-448 证据面，含 reference 对照）：
Captures 完成。VLM 验证证据面 + 443/446 像素对照验证：
2.77% 差主要来自 Base44 badge（未关闭）。补 closeBadge 后重拍 reference 对照面：
**0.02% 像素差**——drawer-open 两 app 几乎 byte-equal（剩余为字体渲染噪声，rows 147-279 文本区）。修复的最终视觉证明。VLM 验证证据面：
VLM 验证通过（两个证据面确认）。现在 docs lockstep——先研究 count-ladder-176.py 形态：
写 count-ladder-177.py（2733 → 2735 · badge 2925 → 2927）：
23 flips 应用。验证幂等性（重跑应为 0-flip no-op）：
幂等验证通过（0 flips）、138/2735 GREEN。写 skill-head-177.py（先研究 176 形态）：
SKILL head 完成（v1.174.0，幂等）。写 AGENTS Session-177 section：
PAD 更新——ADR-022 + session-177 inventory row：
插入 ADR-022 与 session-177 inventory row：
Now insert the session-177 inventory row:
CLAUDE 扩展（space-y genus 家族的 walk50 面）：
写 session_377.md 会话记录：
Now fill the plan's execution record:
追加 repo worklog Task ID 177：
Docs lockstep 完成。跑 unit 验证全部 lockstep pins：
预期 collateral——F-106a1 layer-axis pin 的 per-round re-anchor。查看 pin 当前形式：
结构问题找到——s177 layer 缺少 "+ beneath it" 尾巴（house head 形式）。修复 SKILL head：
结构异常——需精确定位 head 区块行序：
结构实际正确（s176 demoted block 60-65 正常闭合，s177 live 第 67 行在 comment 外生效）。对照 git 验证格式惯例：
s177 层缺少下方尾标（house 形式）。修复 SKILL.md 与脚本：
138/2735 全 GREEN。验证 skill-head 脚本幂等性，然后跑 FINAL GATE：
类型错误——`clip` 不在 LocatorScreenshotOptions。修复 447 拍摄逻辑（用 page.screenshot 的 clip）：
Typecheck 修复后重拍 447（之前 clip 被运行时忽略，拍的是整元素）：
TSC 修复 + 447 正确 crop（288×176）。VLM 重验 447 后进入 FINAL GATE：
**FINAL GATE FULLY GREEN**——lint 0/0 · tsc 0 · 138/2735 · build · smoke 14/14 · e2e 192/192。清理 scratch 并准备 commit：
21 files staged。Commit with house-style message:
Commit `29b7954` 已落 main。现在 SSH wrapper push——重建 shim 基础设施：
完整 shim（163 行）就位。写入 operator key 并 dry-run：
Dry-run GREEN（`59c8f13..29b7954`）。执行真实 push：
**已推送 + 远程已验证**（`29b7954`）。独立远程验证 + key 粉碎：
远程独立验证通过（`29b7954` == local HEAD），key 已粉碎。更新工作区 worklog 并完成收尾：
**session-177 完成并已推送 ✅**

本轮发现并修复了一个隐藏 30 个 session 的真实缺陷：**drawer 头部 8px 膨胀**——Tailwind v4 的 space-y margin-BOTTOM 语义让标题的 mb-2 参与布局（88px），而 reference 的 v3 语义从不产生此间隙（80px）。这一偏移级联整个导航 spine，却从未被发现——因为没有任何常备门链会走查 drawer 打开状态的内部 DOM（像素 sweep 从不打开 drawer、battery 只测行为、a11y 只扫违规）。

**walk50 双 app 元素台账走查**找到了它：每个 delta 逐一 root-cause，唯一缺陷用 M-92c1 先例修复（title 加 `mb-0`），其余全部裁定为 parity/genus/supersets。修复后 spine **逐元素 byte-equal**（header 80/80、9 links 全等、footer 428/428），两 app 截图仅差 0.02%（字体噪声）。

验证全绿：lint 0/0 · tsc 0 · **138/2735**（+2 TDD pins）· build · smoke 14/14 · e2e 192/192 · mutation/stash 双 proof · badge 2927 · SKILL v1.174.0 · **ADR-022**（interior re-walk 教义）。commit `29b7954` 已推 main 并远程验证，operator key 已粉碎。

**下一步建议**：在 GitHub 上核实 commit；下一轮候选为剩余未走查的 OPEN interior（topbar 搜索焦点态、settings 分段 tab 激活态）、probe:ref 触发时的 fresh-bundle 重derive（walk50 可作其 interior 面）、或 recharts 4.0 发布时的 Cell→shape gate。
