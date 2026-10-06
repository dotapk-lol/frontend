# Private toggle/attack batch10

精确父 c3491e9f0c4022df7edacbe1aaabcf95fa15607c（已独立认可36/184），原始私有6b7b61fa6c4b27c66c4b9bdafb6af0a162077885 的独立副本。此批仅候选29/1 Tidebringer、47/2 Wyrm’s Wrath、50/3 Pulse Nova；候选39/184、剩余145，独立认可仍36。仅四个私有文件；public handlers/registry/contracts/bundle不改。旧冻结不改，生产/预览/DB/公开仓库未动。

## 端口及阶段

1. input queueSkill→consumeSkill→cast：以选中且已注册的身份分流；缺activate、未知值、混合toggle投影、未支持capability/任务声明/耗蓝表达式均在付款前拒绝。未注册保留旧路。公共planCast决定接受与资源计划；宿主唯一提交MP/CD/charge/casts，再公开activate。公开handler替换35不会执行原toggle/status/upkeep。
2. 静态toggle通过既有status端口：只承接单一armed:true或pulseToggle:true。native接受positive status后映射opaque handle、公开namespace、birth/epoch；宿主同步原生r20Toggle UI标记。静态toggle的schedule声明无需创造计时任务。无敌时公开拒绝positive status而旧原生仍留UI标记，私有cast cue映射保留该标记；它不提供armed效果或pulse时钟。复合status投影暂拒绝，以免native/public双算。
3. Nova在原生packCombat.tick→actor.status-advance位置递增elapsed/tick，当前status绑定lease内调用公开statusPulse；公开upkeep决定不足蓝取消、距离及damage。新mana端口仅允许同origin/live row/current job/lease的自身负数扣款，必须等于声明式upkeep成本（有限数字/params引用）；禁止正数、跨owner、任意call和复杂成本表达式。每pulse扣费一次，damage走现有resolveDamage一次。此阶段先于actor输入、CD及mana regeneration；没有帧末重排或catch-up。
4. Kunkka在原生attack聚合位置调用公开projectAttack（仅detached facts和amount），跳过旧140 bonus，其他攻击增益/百分比/敌方减攻仍在原位聚合。基本攻击依原生input/timer/collision→basicHit→hit提交；成功基本攻击之后、pack原生attack recipe RNG/mana/ops之前调用公开onAttack。29/1消费自己的已接受arm status；47/2公开发送额外damage。selected registered packet成功处理后跳过该旧recipe，DragonForm后置腐蚀/霜冻及其他技能仍原路。Engine/basic projectile collision、事件排序不变。
5. afterAttack有同步短命receipt lease（fighter/target/event对象身份及landed，每ability仅一次）；跨目标/旧packet/重复callback不做资源、伤害或状态改变。finally释放，lease不进snapshot。public只获得owner/target/abilityId/landed/secondary/attackId，读不到Engine/input/fighters。
6. 状态清理、消耗、toggle-off取消自身handle/job并清理UI；off保留原生零额外费/CD/casts/seq/恢复/日志路径。fight/t、死亡/源life/round/revision、既有job和状态时钟顺序沿用；免疫/break门在原位。源控制、AI/input/movement/collision/round/mainloop/render/net仍private。

## 有限域与快照

复用既有heroHost4/5、含aura时7，以及epoch1/2、含aura时4；没有新envelope。status vocabulary新增armed/pulseToggle两布尔值；应用、birth和恢复共用compiled schema。Nova继续使用既有statusPulse job/birth ordinal、native elapsed/tick、公开record与host handle交叉校验。严格code/schema/rules身份，seed0有效；不放宽旧6/3拒绝，不认证一致伪造的整个世界，不承诺恶意handler副作用事务回滚。private browser/network重放需集成者构建匹配新rules/build，不自动迁移旧快照。

## 证据

主248检查/110160原生差分帧/6600恢复帧；补充94检查/5400原生帧/1800恢复帧；替换16检查/480恢复帧（不计原生差分）。合计358检查/115560原生帧/8880恢复帧。双侧seed0/141，全world/input clock/log/RNG比较，仅剔除新增host/epoch和public namespace适配字段。invuln/immune/HP/部分break/dispel是明确诊断fixture；另有真实Viper大招break、Omniknight免疫与镜像input组合。60个无效snapshot变体原子拒绝；四组重复/跨目标callback实际结算仅一次。当前默认registry仍3工厂，组合仍51，rulesHash/public bundle SHA与已认可0f相同。QA包77作者原文件逐字节相同，仅自己的生成fingerprint加本地QA源；QA副本不作公开交付。

实际替换：29 damage_bonus140→60，首个基本攻击raw/actual258→178（80差值一次）；47 magic_damage40→60、50 damage180→60都有真实HP变化；50每秒扣蓝60→35，MP差值改变且伤害回执序列不变；47的onAttack整handler换pure0/35，收到actual0/35且无旧40；29/50 activate整handler换pure35，仅一次actual35且无旧状态/持续耗蓝。原registry复跑不变。私有全套1407通过；最初两项旧partial native测试因缺recipe失败，已用可选recipe访问修复，失败日志单独保留，不计通过证据。

## 未完成

此批待独立审计/主整合者合并。其余145仍native；47/0、47/1动态ability range和55/2独立status identity已给唯一public作者最小请求，收到认可delta后再承接。B/C其它profile未在本51工厂中实际启用；其它channel/projectile/link/debt/motion、attack chance/mana/cooldown、transfer mana、一般toggle状态投影仍不算闭合。浏览器/网络/双设备/Safari/视觉/音频未验收，不作生产上线声明。冻结中补丁、private tar和可复跑证据供独立审计，证据分类表不是实现证明。
