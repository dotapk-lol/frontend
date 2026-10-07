[English](DEPLOYMENT.md) | [简体中文](DEPLOYMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 部署

Cloudflare 托管静态 `dist/client`，Go/MySQL 属于独立后端。发布改动时才在本地构建，审阅生成身份和后端精确绑定，再使用获授权操作者自己的 Wrangler 凭据：

```sh
export CLOUDFLARE_ACCOUNT_ID='<EXISTING_AUTHORIZED_ACCOUNT_ID>'
npm run deploy
```

命令运行 build 与 `wrangler deploy`，不是文档检查。`wrangler.jsonc` 保留原 Worker 名称、兼容日期、静态产物目录和路由设置，不保留账户标识。操作者从私有部署环境提供 `CLOUDFLARE_ACCOUNT_ID` 以选择原账户，使用既有获授权的 Wrangler 登录状态，不把 OAuth/API token 或登录资料复制进仓库。不要选择新账户部署或创建替代 Worker；贡献者的独立安装使用自己的获授权配置。`_headers` 随静态输出发布，QA 页面、Worker/D1 夹具和验收数据不进入生产。

账户 ID 只选择账户，不认证或授权登录/发布。[Wrangler 支持该账户选择环境变量](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/)。历史版本和旧公开分支头仍可能包含旧账户 ID 与个人账户子域；普通清理提交不会抹除历史或撤销凭据。不在 issue 发布疑似有效 token，也不向外部服务试用它。

发布前核对后端 health、精确 origin、roster/build、peer 兼容性和必要浏览器/设备/网络验收。推源码不自动开放新 build，不用通配或复用规则身份。已登记版本和历史保持兼容；旧验收产物放跟踪源码之外供操作者回滚，协调客户端/服务端而非静默降级读取器。

官网/API 为 `https://dotapk.lol`、`https://api.dotapk.lol`，源码公开不授权操作生产。源码提交不自动发布版本。用户要求发布时，由既有获授权发布者重建/审阅选定提交并部署到原项目；配置清理不授权更换基础设施。此流程不创建自动平衡同步、数据库或 TURN。
