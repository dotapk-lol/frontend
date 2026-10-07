[English](DEPLOYMENT.md) | [简体中文](DEPLOYMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 部署

Cloudflare 托管静态 `dist/client`，Go/MySQL 属于独立后端。发布改动时才在本地构建，审阅生成身份和后端精确绑定，再使用获授权操作者自己的 Wrangler 凭据：

```sh
npm run deploy
```

命令运行 build 与 `wrangler deploy`，不是文档检查。`wrangler.jsonc` 是现有项目部署绑定，不是 secret 示例；贡献者部署独立环境时用自己获授权的账号/配置，不在仓库创建凭据。`_headers` 随静态输出发布，QA 页面、Worker/D1 夹具和验收数据不进入生产。

发布前核对后端 health、精确 origin、roster/build、peer 兼容性和必要浏览器/设备/网络验收。推源码不自动开放新 build，不用通配或复用规则身份。已登记版本和历史保持兼容；旧验收产物放跟踪源码之外供操作者回滚，协调客户端/服务端而非静默降级读取器。

官网/API 为 `https://dotapk.lol`、`https://api.dotapk.lol`，源码公开不授权操作生产。无运行变更的源码清理无需部署；此流程不创建自动平衡同步、数据库或 TURN。
