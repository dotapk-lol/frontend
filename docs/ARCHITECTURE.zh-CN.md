[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 架构

浏览器承担战斗 host：UI/输入 → Engine 与 pack dispatcher → 已审核的英雄 session/provider → 渲染与快照。host 验证施法、支付资源、管理真实效果回执与世界状态。WebRTC 使用房主权威世界、客人输入/快照与可靠控制；Go 提供邀请码/信令和结果存储，不模拟战斗。同屏与 BC 是分别标注的 transport。

| 路径 | 职责 |
| --- | --- |
| `src/app.js`、`src/style.css`、`src/i18n.js` | 入口、显示和语言 |
| `src/engine.js`、`src/pack-*.js`、`src/cohort-*.js` | 世界、host provider/dispatcher、适配与渲染 |
| `src/released-roster.js`、`src/released-hero-rules.js` | 当前22白名单与已接受的规则组合 |
| `src/hero-registry.js`、`src/compatibility.js` | 冻结身份与精确兼容校验 |
| `src/match-api.js`、`src/p2p.js`、`src/room-selection.js`、`src/net-quality.js` | 匿名 API、P2P 生命周期、选人轮次与网络提示 |
| `src/hero-packs/` | 源模块和暂停的诊断 candidate；存在不等于可玩 |
| `vendor/`、`scripts/vendor-*.mjs` | 固定规则与源码清单；不手改 digest |
| `reference/`、`docs/official-combat-overrides.json` | 保留的目录/参数来源与生成器输入 |
| `assets/` | 已有媒体和来源记录，第三方权利单独适用 |
| `qa/` | 回归测试/夹具及可选本地工具，不存放已发布结果 |
| `worker/`、`drizzle/`、`scripts/sqlite-d1.mjs` | 旧 Worker/D1 回归夹具，不进入部署 |

目录生成器需要冻结 JSON 源输入；它们不是玩家原始报告，也不保证官方当前平衡。暂停英雄模块被活动适配器/测试引用，因此保留；清理不启用新能力或英雄。

客户端保留近期本地记录显示，只有服务器成功回执才表示已保存，PVP 与单报记录仍分开。[后端架构](https://github.com/dotapk-lol/backend/blob/main/docs/ARCHITECTURE.zh-CN.md)说明 MySQL 粒度与核对；[人工平衡说明](https://github.com/dotapk-lol/heros/blob/main/balance-data/README.zh-CN.md)说明可公开汇总。

## 先入房的 PvP

对战入口只有六个独立邀请码输入框和创建房间。合法六码填满后自动提交一次，无需入房前选英雄或额外加入按钮。占席时双方明确使用已发布默认水晶室女（ID1）；原生 control/frames 通道成功且完整版本/名单 hello 一致后即可选人，不等待采样窗口。人机维持即时本地选人流程。语言只在首页头部设置，通过持久化前端 i18n 控制器共享。

房主开启服务器选人 epoch，待双方渲染并确认该轮次后驱动20秒单调时钟倒计时。预选英雄经可靠有序 P2P 传递；每个参与者只通过服务器锁定自己的合法英雄，服务器确认后才报告准备。双方锁定可提前开始；到时要求各自锁定当前选择，未操作使用默认水晶室女。建局必须携带相同 selectionEpoch 且双方已服务器锁定，再完成既有双方 backend ready 和 in_progress 核验，不能只换 UI 英雄。

开启、预选、锁定、计时、再战和开战准备消息都带轮次。客方倒计时只作显示，仅房主判定到时；后台或转屏暂停保留剩余时间，普通网络波动不重置计时。底部按钮占视觉视口独立网格行，英雄列表单独滚动，准备/离开始终可见。结果页双方分别同意上一 matchID 的再战，且旧比赛服务器终态后，保留房间和 WebRTC 通道，用新 epoch 重置选人；每局新 requestId、新 matchID，旧英雄快照保持不变。

休闲策略保持七字段：above/RTT500/jitter250/loss30/minSamples1/window12/maxAge10000；这些值只作显示警告，不按统计指标否决开始。每350ms探测，滚动12样本、3000ms探测超时；首个 RTT 缺失显示检测中。可靠控制通道10秒不响应，或262144字节以上发送积压持续6秒，属于真实连接故障。房主快照约30Hz、客方输入约40Hz；客方显示房主状态，不作回滚模拟。此模式客方保持输入1500ms后失效，松键/中立消息立即清空。参数不代表物理5G或原生iOS已验收。
