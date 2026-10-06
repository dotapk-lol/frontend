# DOTA DUEL frontend

[dotapk.lol](https://dotapk.lol) 的浏览器客户端：22 位已发布英雄、88 个技能槽、六位邀请码 WebRTC 对战、人机、桌面同屏与同浏览器 BroadcastChannel。玩家无需登录；后端签发匿名会话。首页中英偏好保存在本机 localStorage。手机采用横屏、拖动摇杆与四技能按钮；未发布英雄保持灰禁，暂停适配。

三个公开仓库各自负责：

| 仓库 | 职责 |
| --- | --- |
| **frontend（本仓库）** | 界面、输入、渲染、AI、浏览器战斗世界、英雄 host 接线、P2P 与战绩客户端；静态资源部署在 Cloudflare |
| [backend](https://github.com/dotapk-lol/backend) | Go API、匿名会话、房间/信令、结果核对与 MySQL 统计；API 地址为 `https://api.dotapk.lol/api/v1` |
| [heros](https://github.com/dotapk-lol/heros) | MIT 英雄纯规则、参数、状态 schema 与 host 合约；[balance-data](https://github.com/dotapk-lol/heros/tree/main/balance-data) 说明内部手动整理汇总快照的口径 |

战斗在浏览器运行，Go 不执行英雄技能。WebRTC 通过 API 交换信令，再使用 DataChannel；BroadcastChannel 仅适用于同浏览器，不能连接不同设备。当前没有 TURN，部分 NAT/跨网组合可能无法连接。双方报一致的 PVP 为 `confirmed / peer_agreement`，不代表服务器模拟或反作弊认证；PVE、同屏、BC 为 `recorded / client_reported`。`aborted`、`disputed` 不进入胜率。

## 本地启动

需要支持 `node:sqlite` 与 ESM 的现代 Node.js（建议 Node 22.13+ 或更新版本）、npm；依赖由 package-lock.json 固定。从仓库根目录运行：

```sh
npm ci
npm run build
npm run dev
```

打开 `http://127.0.0.1:4173`。`dev` 只提供已构建的 `dist/client`，没有热更新，不会启动 API 或数据库；源码改动后需重新 build。`DUEL_PORT` 可覆盖静态服务端口。构建会生成目录/规则版本文件、写入 `src/net-version.js` 并产出 `dist/client/build-manifest.json` 与 `release/DOTA_DUEL_22.html`，请检查生成 diff。首次 build 的新 gameVersion 不一定已被后端登记。

这是给开发者的命令说明；本轮文档更新不运行全量 build、浏览器或部署。`npm run deploy` 会 build 并调用 Wrangler，需要操作者自有授权；部署不属于本地启动。Cloudflare 只接收静态 `dist/client`，`worker/`、`drizzle/` 是历史回归夹具，不是当前后端，不需要创建 D1/R2。

## 前后端联调

按后端的 [开发指南](https://github.com/dotapk-lol/backend/blob/main/docs/DEVELOPMENT.md) 使用已有、隔离的本地 MySQL `dota_duel` 与 **22 英雄 profile 构建**。默认 API 为 `http://127.0.0.1:18082/api/v1`，后端设置单一精确 origin：

```sh
DUEL_ALLOWED_ORIGIN=http://127.0.0.1:4173
```

这是后端环境变量，前端没有 `VITE_API_URL` 等环境配置。`src/match-api.js` 的实际规则是：localhost/127.0.0.1 使用 18082，`127.0.0.1:4174` 使用 18083，`127.0.0.1:4185` 使用 18084，其余主机使用托管 API。测试可通过 `new MatchAPI({base: '<LOCAL_API_BASE>'})` 注入 base；页面入口没有通用运行时 URL 开关。`localhost` 与 `127.0.0.1` 是不同 origin，端口、协议也必须一致。开发中无需把本地 origin 加到生产服务。

先核对本地 `GET /healthz` 和 `GET /api/v1/registry`，再测试建房/人机/结果。精确名单及构建绑定见 [DEVELOPMENT.md](docs/DEVELOPMENT.md)。注册表不匹配会阻止当前 22 英雄请求，不能通过省略 rosterId、关闭校验或启用旧 candidate 来绕过。

## 目录与验证

| 路径 | 内容 |
| --- | --- |
| `src/app.js`、`src/style.css`、`src/i18n.js` | 入口、界面、语言；语言是显示偏好，不改变协议 |
| `src/engine.js`、`src/pack-*.js`、`src/cohort-*.js` | 战斗世界与 host/渲染适配 |
| `src/released-roster.js`、`src/released-hero-rules.js` | 当前名单与已接受规则组合 |
| `src/hero-registry.js`、`src/compatibility.js` | 稳定 ID 与精确兼容性校验 |
| `src/match-api.js`、`src/p2p.js`、`src/net-quality.js` | 匿名 API、P2P 会话与信令 |
| `vendor/`、`scripts/vendor-heros.mjs` | 固定 review 包与字节校验/消费 bundle |
| `scripts/`、`qa/` | 构建工具、源码/契约/游戏回归与历史浏览器 QA 工具 |
| `assets/`、`reference/`、`docs/` | 媒体、来源快照及历史设计/验收证据 |

查看 [开发与规则接线](docs/DEVELOPMENT.md) 和 [贡献指南](CONTRIBUTING.md)。`npm test` 会先校验 vendor 并生成音频，再由 Node test runner 发现所有 QA 测试，可能并行且部分测试依赖 build；低内存环境按指南逐文件执行，不能把源码测试称为浏览器验收。

## 许可与素材

本项目自有代码与开发者文档采用 [MIT 许可](LICENSE)，版权归属为 `Copyright (c) 2026 dotapk-lol contributors`。使用、修改和分发时保留许可及版权声明。MIT 仅适用于项目自有内容，第三方图片、音乐、字体、商标与依赖遵循各自适用许可，不因收录在本仓库而改为 MIT；保留上游 LICENSE/NOTICE 和来源说明。`@dotapk/heros` 保持其原有 MIT 许可，其他依赖按其各自许可使用。

Valve 的名称、商标、英雄图像、技能图标与音乐不在代码许可范围内，也不表示 Valve 背书。当前播放器使用 `assets/music/reborn-dnb-remix.mp3`，来源记录在 [reborn-source.json](assets/music/reborn-source.json)；仓库还保留 TI4 曲目与 [source-manifest.json](assets/music/source-manifest.json)。用户提供下载或记录 hash 并不证明公开再分发授权，复用/发布前需分别核实适用许可。历史文档中的 private/candidate 字样是当时状态，不是当前仓库可见性或自动发布许可。
