[English](DEVELOPMENT.md) | [简体中文](DEVELOPMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 开发、身份与英雄接线

## 精确兼容性

当前源码 profile 为 `HEROS22_BUILD=true`、`CANDIDATE_BUILD=false`：

| 字段 | 当前值 / 来源 |
| --- | --- |
| rosterId | `arena-heros28-v1`，`src/released-roster.js` |
| registryVersion | `duel-heroes-127-v1` |
| registrySha256 | `5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138` |
| mechanicsVersion | `arena-heros28-public112-v1` |
| 当前源码 NET_VERSION | 由构建生成，见 `src/net-version.js` 和 `dist/client/build-manifest.json` |
| 前端组合 rulesHash | `af7cba2fb2aba770cd9ea18c08c4be97ac8d09d53bde76c6c3e0aa98fb4b0506` |
| WebRTC 协议 | `duel-wire-3` |

允许的稳定数字 ID：`0,1,2,3,4,5,6,7,8,9,10,14,15,17,18,19,28,31,32,36,50,55,57,58,62,71,81,82`。数字是 registryNumericId，不是列表下标或 Valve hero ID。目录的 127 身份不代表全部可玩；未发布英雄继续灰禁。

发布28英雄构建前，须在后端 roster 与选人 manifest 中登记其精确 gameVersion，并保留旧22的7个和旧46的2个构建绑定。双方仍须使用相同构建；后端不执行技能，也不接收客户端 rulesHash 字段。

普通 build 根据源码/资产生成新的 NET_VERSION。新标识需要在**本地或获授权的发布流程**中同时登记于 Go embed profile 与 MySQL roster 元数据；只改其中一处不足以联调。不要手填旧 hash 冒充兼容；当前 `--ui-only-from=<COMMIT>` 是受路径白名单限制的显示修复流程，文档文件变化也不在其白名单，包含非显示文件的提交不能直接拿旧提交执行该模式。没有运行 build 的文档提交不会改变已登记 wire 标识。

## 本地 API 与 CORS

静态服务使用 `http://127.0.0.1:4173`，后端单个精确 `DUEL_ALLOWED_ORIGIN` 与之相同。已有隔离本地 MySQL 与22 overlay 按[后端开发指南](https://github.com/dotapk-lol/backend/blob/main/docs/DEVELOPMENT.zh-CN.md)准备。

`src/match-api.js` 对 localhost/127.0.0.1 使用18082，但 `127.0.0.1:4174` 使用18083、`127.0.0.1:4185` 使用18084、隔离选人预览 `127.0.0.1:4196` 使用18086；其他主机使用 `https://api.dotapk.lol/api/v1`。没有 `VITE_API_URL` 或通用页面地址开关，测试可注入 `new MatchAPI({base: '<LOCAL_API_BASE>'})`。localhost 与127.0.0.1、协议和端口是不同 origin。建局前检查本地 GET `/healthz`、GET `/api/v1/registry` 和 OPTIONS，不为本地开发改生产 CORS 或绕过名单检查。

## 英雄包与 host

前端 package.json 固定 `vendor/dotapk-heros-0.1.0-review.10-rupture-order.1.tgz`，`scripts/vendor-heros.mjs` 校验 136 个源文件并生成消费 bundle。公开 [heros](https://github.com/dotapk-lol/heros) 根入口默认 28/112，公共 rulesHash 为 `c2e180393dd9a639ee806c85df949b32aa427a8d018b77324f35cfb981b5e6e4`；前端组合含 143 条实现元数据并执行 28 英雄准入。143 不是发布英雄/技能数量。两者 hash、组合与 checkpoint 不可混用，不能把依赖直接改为 `github:dotapk-lol/heros#main` 当作已验证升级。

规则通过静态 factory、固定 ID/四槽、参数、源码身份、revision 与 state schema 注册，再 seal 创建会话。前端 host 提供 actor 事实、资源/施法事务、真实效果回执、时钟与队列、物理世界和 lifecycle 投递。参数变更应在规则定义或 factory.parameters 中校验并捕获，重新核对 rulesHash；改 UI 标签不改变机制。详见 heros 的 [参数](https://github.com/dotapk-lol/heros/blob/main/docs/balance-identity.md)、[插件](https://github.com/dotapk-lol/heros/blob/main/docs/plugins.md) 与 [host 合约](https://github.com/dotapk-lol/heros/blob/main/docs/host-adapter.md)。

外置任意脚本不是受支持的插件安装方式，运行时不是不可信 JS 沙箱。任意新 ID、共享能力、规则包替换或未发英雄恢复都需独立设计与真实 host 验收；本轮没有进行这些改动。

## 轻量测试

从根目录逐条执行，命令结束后再运行下一条：

```sh
node --test --test-concurrency=1 qa/i18n.test.mjs
node --test --test-concurrency=1 qa/p2p-room-identity.test.mjs
node --test --test-concurrency=1 qa/registry-retry.test.mjs
```

选择与改动相关的文件；vendor 相关用例先 `npm ci`、`node scripts/vendor-heros.mjs`。完整 `npm test` 有 pretest 与全量发现，`qa/standalone-build.test.mjs` 等依赖构建产物，浏览器脚本依赖独立 QA 条件。不要启动生产 API 来代替隔离测试，不要并行浏览器/构建/测试。文档改动可只检查相对链接、脚本/模块路径与 `git diff --check`，无需生成规则或 build。

## 许可范围

本项目自有代码与开发者文档采用 [MIT](../LICENSE)；修改或分发时保留版权和许可声明。第三方图片、音乐、字体、商标与依赖各自适用的许可保持独立，不包含在项目自有代码 MIT 授权内。保留上游 LICENSE/NOTICE 与来源记录；素材是否可再分发应按素材自身授权核实，不能仅凭项目 LICENSE 判断。

## 新选人版本绑定

当前源码 build `duel-e81da0fe6c6faec0eef8` 需在后端28名单和 `roomSelectionVersions` 中精确追加绑定，保留所有旧版本。该文档不表示生产已启用；需配套后端契约、原生双窗验收和协调发布。默认占席英雄注册ID1是水晶室女（Valve ID5），不是Valve的ID1。品牌元信息更新会通过既有全文摘要规则改变 `RULESET_HASH`，封印技能规则的 `rulesHash` 和28/112名单保持不变。

## 入口核验与更新

托管入口先以10秒有限时限读取 `build-manifest.json`，再严格核验后端注册表。整页房间与人机共用一个 `MatchAPI`；成功核验只在当前已加载构建的内存中复用。注册表代际凭据及后端房间、比赛、选人检查仍保留，不用 cookie 或永久成功缓存授权未来构建。网络失败可在入口重试，与身份不兼容分开；失败缓存清除。服务端版本拒绝会作废旧凭据和入口状态。

空闲入口或回前台时，版本元信息最多每分钟检查一次；活动房间与比赛不会触发刷新。发现新发布版本后显示明确更新按钮，保留设置，通过 build 查询参数重新加载页面，不自动循环刷新。HTML及构建元信息禁止缓存；正式入口引用完整的带指纹 JS 包和 CSS。源码模块仍供检查与测试，但正式入口不再用各自缓存的模块地址拼装游戏。离线单文件保留本地模式。

不需新增后端版本发现接口。新源码运行时仍须先追加精确28名单、选人 feature 和 SQL 元数据绑定，才能发布。物理 Safari/iOS 验收须与实际 MacChrome及明确标注的网络夹具分开。
