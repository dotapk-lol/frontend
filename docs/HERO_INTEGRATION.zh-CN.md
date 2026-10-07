[English](HERO_INTEGRATION.md) | [简体中文](HERO_INTEGRATION.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 英雄规则与 host 接线

只有 `src/released-roster.js` 中22个 ID 可选，每位四槽。其他24个 SDK 运行时英雄和81个目录身份继续暂停/灰禁。定义、诊断实现、注册清单和已验收可玩是不同状态，暂停模块测试通过不解锁英雄。[heros 未发布状态](https://github.com/dotapk-lol/heros/blob/main/docs/unreleased.zh-CN.md)列出逐英雄状态。

固定 review 包和源码清单提供已审核静态 factory；`src/released-hero-rules.js` 组合前端 registry；`src/pack-dispatcher.js`、`src/pack-services.js`、`src/pack-hp.js`、`src/pack-control.js`、`src/pack-targeting.js`、`src/pack-runtime.js` 实现 host 边界，以实际方法和校验源码为准，没有任意 `registerHero` 或远程插件加载器。

- 保持不可变 registry/ability ID、四槽、输入/被动/效果族和语义 revision。捕获已校验有限参数，不用全局可变系数；真正规则/配置变化影响 rulesHash 与快照。
- host 准入、mana/cooldown 支付和 action commit 与脱离世界的效果请求不同；只执行已接受施法，被动不是用户按钮，声明 capability 不等于实现缺失 provider 语义。
- host HP/效果回执、死亡事件和延迟结算权威；不建平行 HP 账本或伪造成功回执。恢复先验证 namespace、精确 schema 与组合身份，再提交世界/规则 candidate。
- 来源控制记录保留无关 root/stun；驱散等级、免疫和其他模块的有效状态分开。不把 action lock 当 silence，不释放无关控制。
- 目标准入、路由与投递按源码边界执行；反射/格挡消费归核心，AoE/自增益不走单体目标流程，已路由/返回弹道不二次消费。
- 时钟/队列顺序、中断/死亡清理、handle 代际与 action token 归 host；session 元数据不认证引用，也不自动迁移进行中的旧世界。

参见 heros [factory/生命周期](https://github.com/dotapk-lol/heros/blob/main/docs/plugins.zh-CN.md)、[效果](https://github.com/dotapk-lol/heros/blob/main/docs/effects.zh-CN.md)、[时序](https://github.com/dotapk-lol/heros/blob/main/docs/timing.zh-CN.md)、[参数身份](https://github.com/dotapk-lol/heros/blob/main/docs/balance-identity.zh-CN.md)、[host 适配](https://github.com/dotapk-lol/heros/blob/main/docs/host-adapter.zh-CN.md)。原始教学示例只测独立公共请求/回执，不是此浏览器世界；公共88包不能直接替换前端132条元数据组合。

自定义 ID、外置运行时插件和缺失共享能力需设计/host 验收；文档清理不加新英雄、装备/天赋/命石或完整官方机制承诺。平衡快照仍是人工汇总，不自动调参。
