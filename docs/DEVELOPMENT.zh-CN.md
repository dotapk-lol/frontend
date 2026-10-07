[English](DEVELOPMENT.md) | [简体中文](DEVELOPMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 开发、身份与英雄接线

## 精确兼容性

当前源码 profile 为 `HEROS22_BUILD=true`、`CANDIDATE_BUILD=false`：

| 字段 | 当前值 / 来源 |
| --- | --- |
| rosterId | `arena-heros22-v1`，`src/released-roster.js` |
| registryVersion | `duel-heroes-127-v1` |
| registrySha256 | `5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138` |
| mechanicsVersion | `arena-heros22-public127-v1` |
| 当前源码 NET_VERSION | `duel-2f81eeda15fb572139ad`，`src/net-version.js` |
| 前端组合 rulesHash | `5747bdeffe9948c67882ea02858e7958a5ea15be090b08d9ac6d8561a57970a4` |
| WebRTC 协议 | `duel-wire-3` |

允许的稳定数字 ID：`1,3,4,5,7,8,9,15,17,18,28,31,32,36,50,55,57,58,62,71,81,82`。数字是 registryNumericId，不是列表下标或 Valve hero ID。目录的 127 身份不代表全部可玩；未发布英雄继续灰禁。

后端 production profile 对该 roster 精确允许 `duel-27c78aa4cfc8facc8a23`、`duel-6b1d12f75aa4bbac4e12`、`duel-851e67d77307f479f1fa`、`duel-9431984810f197b393c5`。历史 build 仅用于保留旧客户端/记录兼容性；双方仍须使用相同 build。`GAME_COMPATIBILITY` 还包含规则和能力目录 hash，见 `src/compatibility.js`。前端校验完整身份映射、名单成员和 gameVersion 唯一绑定；后端不执行技能，也没有客户端传入 rulesHash 的 API 字段。

普通 build 根据源码/资产生成新的 NET_VERSION。新标识需要在**本地或获授权的发布流程**中同时登记于 Go embed profile 与 MySQL roster 元数据；只改其中一处不足以联调。不要手填旧 hash 冒充兼容；当前 `--ui-only-from=<COMMIT>` 是受路径白名单限制的显示修复流程，文档文件变化也不在其白名单，包含非显示文件的提交不能直接拿旧提交执行该模式。没有运行 build 的文档提交不会改变已登记 wire 标识。

## 本地 API 与 CORS

静态服务使用 `http://127.0.0.1:4173`，后端单个精确 `DUEL_ALLOWED_ORIGIN` 与之相同。已有隔离本地 MySQL 与22 overlay 按[后端开发指南](https://github.com/dotapk-lol/backend/blob/main/docs/DEVELOPMENT.zh-CN.md)准备。

`src/match-api.js` 对 localhost/127.0.0.1 使用18082，但 `127.0.0.1:4174` 使用18083、`127.0.0.1:4185` 使用18084、隔离选人预览 `127.0.0.1:4196` 使用18086；其他主机使用 `https://api.dotapk.lol/api/v1`。没有 `VITE_API_URL` 或通用页面地址开关，测试可注入 `new MatchAPI({base: '<LOCAL_API_BASE>'})`。localhost 与127.0.0.1、协议和端口是不同 origin。建局前检查本地 GET `/healthz`、GET `/api/v1/registry` 和 OPTIONS，不为本地开发改生产 CORS 或绕过名单检查。

## 英雄包与 host

前端 package.json 固定 `vendor/dotapk-heros-0.1.0-review.10-rupture-order.1.tgz`，`scripts/vendor-heros.mjs` 校验 136 个源文件并生成消费 bundle。公开 [heros](https://github.com/dotapk-lol/heros) 根入口默认 22/88，公共 rulesHash 为 `bfca4c893786d98da8cc18d8c560a88e76fb9e5e79c1e71920bf78705a918d31`；前端组合含 132 条实现元数据并执行 22 英雄准入。132 不是发布英雄/技能数量。两者 hash、组合与 checkpoint 不可混用，不能把依赖直接改为 `github:dotapk-lol/heros#main` 当作已验证升级。

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

当前源码 build `duel-2f81eeda15fb572139ad` 需在后端22名单和 `roomSelectionVersions` 中精确追加绑定，保留所有旧版本。该文档不表示生产已启用；需配套后端契约、原生双窗验收和协调发布。默认占席英雄注册ID1是水晶室女（Valve ID5），不是Valve的ID1。品牌元信息更新会通过既有全文摘要规则改变 `RULESET_HASH`，封印技能规则的 `rulesHash` 和22/88名单保持不变。
