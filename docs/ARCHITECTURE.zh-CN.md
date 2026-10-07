[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 架构

浏览器承担战斗 host：UI/输入 → Engine 与 pack dispatcher → 已审核的英雄 session/provider → 渲染与快照。host 验证施法、支付资源、管理真实效果回执与世界状态。WebRTC 使用房主权威世界、客人输入/快照与可靠控制；Go 提供邀请码/信令和结果存储，不模拟战斗。同屏与 BC 是分别标注的 transport。

| 路径 | 职责 |
| --- | --- |
| `src/app.js`、`src/style.css`、`src/i18n.js` | 入口、显示和语言 |
| `src/engine.js`、`src/pack-*.js`、`src/cohort-*.js` | 世界、host provider/dispatcher、适配与渲染 |
| `src/released-roster.js`、`src/released-hero-rules.js` | 当前22白名单与已接受的规则组合 |
| `src/hero-registry.js`、`src/compatibility.js` | 冻结身份与精确兼容校验 |
| `src/match-api.js`、`src/p2p.js`、`src/net-quality.js` | 匿名 API、P2P 生命周期和质量策略 |
| `src/hero-packs/` | 源模块和暂停的诊断 candidate；存在不等于可玩 |
| `vendor/`、`scripts/vendor-*.mjs` | 固定规则与源码清单；不手改 digest |
| `reference/`、`docs/official-combat-overrides.json` | 保留的目录/参数来源与生成器输入 |
| `assets/` | 已有媒体和来源记录，第三方权利单独适用 |
| `qa/` | 回归测试/夹具及可选本地工具，不存放已发布结果 |
| `worker/`、`drizzle/`、`scripts/sqlite-d1.mjs` | 旧 Worker/D1 回归夹具，不进入部署 |

目录生成器需要冻结 JSON 源输入；它们不是玩家原始报告，也不保证官方当前平衡。暂停英雄模块被活动适配器/测试引用，因此保留；清理不启用新能力或英雄。

客户端保留近期本地记录显示，只有服务器成功回执才表示已保存，PVP 与单报记录仍分开。[后端架构](https://github.com/dotapk-lol/backend/blob/main/docs/ARCHITECTURE.zh-CN.md)说明 MySQL 粒度与核对；[人工平衡说明](https://github.com/dotapk-lol/heros/blob/main/balance-data/README.zh-CN.md)说明可公开汇总。
