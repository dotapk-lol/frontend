[English](README.md) | [简体中文](README.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# DOTA PK 前端

[dotapk.lol](https://dotapk.lol) 的浏览器客户端：**22 位已发布英雄 / 88 个技能槽**、六位房间号 WebRTC 对战、人机、桌面同屏和同浏览器 BroadcastChannel。玩家无需登录账号；首页中英偏好保存在 localStorage。手机采用横屏、拖动摇杆和四技能按钮，未发布英雄保持灰禁、暂停适配。

| 仓库 | 职责 |
| --- | --- |
| frontend（本仓库） | Cloudflare 静态 UI、输入、渲染、AI、浏览器战斗世界、规则 host、P2P 与结果客户端 |
| [backend](https://github.com/dotapk-lol/backend) | Go 匿名会话、房间号/信令、结果核对和现有 MySQL 统计；`https://api.dotapk.lol/api/v1` |
| [heros](https://github.com/dotapk-lol/heros) | MIT 确定性规则、参数和 host 合约；[人工汇总数据说明](https://github.com/dotapk-lol/heros/blob/main/balance-data/README.zh-CN.md) |

战斗在浏览器运行。WebRTC 通过 API 交换信令，再使用 DataChannel；BC 不能连接不同设备。当前没有 TURN，部分 NAT 组合无法连接。PVP `confirmed / peer_agreement` 仅表示双报一致，不是服务器模拟或反作弊认证。PVE/local/BC 为 `recorded / client_reported`；中止和争议局不计胜率。

## 快速启动

使用支持 ESM 和 `node:sqlite` 的 Node（22.13+ 或更新版）、npm 与固定的 package-lock.json。在根目录运行：

```sh
npm ci
npm run build
npm run dev
```

打开 `http://127.0.0.1:4173`。`dev` 只提供构建好的 `dist/client`，没有热更新、API 或数据库。源码改后重新构建，`DUEL_PORT` 可改静态端口。构建写入生成的目录/规则身份文件和 `src/net-version.js`、`dist/client/build-manifest.json`、`release/DOTA_DUEL_22.html`；新 gameVersion 可能需后端精确登记才能游玩。Cloudflare 只接收静态资产；`worker/` 与 `drizzle/` 是回归夹具，不是当前后端，不用创建 D1/R2。

联调当前22前端时按后端[开发指南](https://github.com/dotapk-lol/backend/blob/main/docs/DEVELOPMENT.zh-CN.md)操作：普通后端构建仅含 legacy20。本地 API 默认 `http://127.0.0.1:18082/api/v1`，后端设置 `DUEL_ALLOWED_ORIGIN=http://127.0.0.1:4173`，协议、主机和端口必须完全一致。页面没有通用 API 环境开关；实际地址规则和 roster/build 绑定见[开发指南](docs/DEVELOPMENT.zh-CN.md)。

## 开发者指南

- [架构与目录](docs/ARCHITECTURE.zh-CN.md)
- [开发、CORS 与精确身份](docs/DEVELOPMENT.zh-CN.md)
- [英雄参数与 host 接线](docs/HERO_INTEGRATION.zh-CN.md)
- [测试与证据边界](docs/TESTING.zh-CN.md)
- [部署](docs/DEPLOYMENT.zh-CN.md)
- [来源与第三方权利](docs/OFFICIAL_SOURCES.zh-CN.md)
- [贡献](CONTRIBUTING.zh-CN.md)

MIT 覆盖项目自有代码与文档，请保留 [LICENSE](LICENSE)。第三方图片、音乐、字体、商标和依赖保持各自许可与声明；项目 MIT 不授权 Valve 素材，也不表示其背书。当前播放器使用 Reborn D+B Remix，保留的 TI4 曲目及全部图像/音频需分别核查再分发授权，见来源指南。
