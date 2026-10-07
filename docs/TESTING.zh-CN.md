[English](TESTING.md) | [简体中文](TESTING.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 测试

选择真正覆盖改动边界的检查，逐条执行。矩阵数量、VM 测试和原始 recorder 都不代表浏览器、真机、听感、NAT 或完整原生世界验收。

```sh
node --max-old-space-size=256 --test --test-concurrency=1 qa/i18n.test.mjs
node --max-old-space-size=256 --test --test-concurrency=1 qa/p2p-room-identity.test.mjs
node --max-old-space-size=256 --test --test-concurrency=1 qa/registry-retry.test.mjs
node --max-old-space-size=256 scripts/generate-catalog.mjs --check
```

这些覆盖显示语言、房间身份、注册表重试和冻结生成输入一致性；目录检查只读源码/组合元数据，不构建或开浏览器。依赖 vendor 的测试先 `npm ci` 和 `node scripts/vendor-heros.mjs`。`npm test` 先校验 vendor/生成音频，再发现全部 `qa/**/*.test.mjs`，runner 可能并发子进程；低内存贡献者应选相关文件加 `--test-concurrency=1`。全套及 `qa/standalone-build.test.mjs` 可能需要构建产物，只为对应改动运行。

注册表重试夹具使用已发布英雄 ID 1 和3，使请求进入注册表授权流程；保留重试拒绝、已验证缓存、旧请求与在途代际的断言，不绕过发布名单检查。

旧任务绑定的浏览器脚本已移除。浏览器验收须另行配置隔离本地服务和工具；证据放被忽略的 `qa/browser-evidence/`，不提交公开仓库。真机和真实跨网络仍需独立验收。矩阵生成器的诊断输出应被忽略，旧结果不能证明当前源码。文档改动无需遍历暂停英雄的完整矩阵。

本地 API 集成使用隔离数据库和后端指南中的匹配 profile/build，会生成测试局，不能用生产作夹具。纯文档检查双语配对、首部/链接和 `git diff --check` 即可。PR 记录实际命令、运行时、证明范围和剩余限制。

双语维护：`python3 scripts/check-docs.py` 检查全部保留 Markdown 首部、语言配对与相对链接。
