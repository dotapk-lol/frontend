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

## 先入房流程的定向检查

每次只执行一个有内存上限的分组，不为这些交互修改并行重复全英雄矩阵。

```sh
node --max-old-space-size=256 --test --test-concurrency=1 qa/room-selection.test.mjs qa/p2p-quality.test.mjs qa/p2p-room-identity.test.mjs
node --max-old-space-size=256 --test --test-concurrency=1 --test-name-pattern='homepage|language setting|six digits|waiting P2P|English host' qa/i18n-ui.test.mjs
```

确定性测试覆盖默认/提前/到时锁定、旧轮次、点击与到时竞态、单次建局、后台保留倒计时、网络只提示不按统计否决，以及终态/双方再战/新比赛。测试使用传输与服务器夹具，不是自然浏览器或 SQL 验收。原生验收必须另以两 Chrome 窗口连接匹配后端，实际自然结果后同房再战、真实六码自动加入、取消/重入，以及不同小屏横屏尺寸和两种语言的固定底栏命中测试。逐局 SQL ID 和运维证据只放私有交接。可靠连接失败应如实报告测量限制；夹具不证明真实连接或物理 iOS。

## 六英雄复审回归

执行 `node --test --test-concurrency=1 qa/dismember-control.test.mjs qa/strike-counterspell.test.mjs qa/six-snapshot-integrity.test.mjs qa/six-heroes.test.mjs`。这些测试通过真实 Engine 验证双方座位、累计控制预算与保护期、反射突袭的资源及回执，以及效果中途恢复。重复实体、伪造行程与反射、波命中重放和过期状态时钟负例均由 Engine 恢复入口和远端入口拒绝。独立出生、推进和回执记录序列化在 `packClock.sixEffects`；这是结构完整性校验，不是服务端权威反作弊。28 英雄机制冒烟脚本只证明接线。真实双浏览器 PVP、暂停恢复、自然结束及同房重赛仍为依赖后端的单独验收门槛。

训练复活覆盖：`qa/six-training-snapshot.test.mjs` 用真实魔法技能激活击杀持有 Windrun、Focus Fire、Totem 和 Strike 增益的角色，覆盖双方座位和固定步长，再通过 Engine 与远端入口恢复当帧复活快照。角色阶段前死亡会记录有界的 `training-dead-phase` 暂停区间；该区间保留原生增益寿命。缺失、重复、外来、非训练或被改写的暂停记录均被拒绝，并验证连续死亡、恢复计时后的自然到期及托管帧回滚。
