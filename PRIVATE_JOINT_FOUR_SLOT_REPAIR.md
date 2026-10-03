# 私有宿主：联合四槽候选闭环

父任务已验收 **38/184**；本批四槽 47/0 Breathe Fire、47/1 Dragon Tail、55/2 Hammer of Purity、50/3 Pulse Nova 为 **42/184 候选**，未经过父任务私有独立审计，不增加验收计数。独立 Legacy batch11 的三个候选不在本树，不能据此报45。精确原始私有基线 6b7b61fa6c4b27c66c4b9bdafb6af0a162077885，archive 重建本地提交 e2a54d54da460c6b2ac5ddbc6f8ea1a8fc3b621a。本增量父节点 34fe3c4c610437f3b75af7fc2f7d125bb704f206，即已审核两行原生 Nova 目标修正；该节点父节点是 248f55679e4b97afd0c71b5be7919a7085e72510。

仅消费公共作者冻结 `0.1.0-review.4-a-joint.1`（tgz SHA256 9010a9ea872f8ac51c4c1ee660db88fe496c04887013a26baa4b632510bc1181），没有修改公共作者 handler、registry、contract。公共冻结131文件与已安装副本逐字节一致，重建私有 bundle 前后核验。私有源码只改 host adapter、消费包/lock、bundle 和构建核验；原生修正来自独立父提交，不复制 Engine 至公开包。游戏 Engine/AI/input/collision/mainloop/net/render/DB 全部保留私有；未部署或启动指定预览。

## 阶段与事实

1. input → 原 Engine.cast 入场验证 → 通用宿主 planCast → 唯一 MP/CD/charge/casts/sourceId 提交 → 原生 windup → 公共 activate → 声明式 effects 的私有资源提交。注册但不在迁移 allowlist 的技能保留原路径；本批不增加其他迁移。
2. DK 两技能在 planCast 接收捕获一次的私有 `effectiveCastRange`（有限标量0..1e7，含现有龙形态；计划保留原22入场余量），同一值用于判定与提交 aim；没有整个 Engine 或 input 穿透。真实龙形态 input 的基础射程外命中及 ±.001 边界分别测试。
3. Hammer 同 key 的敌人减速/自身治疗，以公共不可变 `statusDeclarationId` 与 self/enemy domain 区分。宿主从封存 recipe/参数独立编译期望声明，再核对公共声明；apply/pure state/schedule/restore 的字面身份一致，反射采用已认证的有效 owner。native status 对象不新增 declaration 字段。
4. Nova 状态、job、MP 属于自己，伤害 child program 属于敌人，由公共 `programTargets` 声明；私有 damage commit 核对当前唯一 status/job lease、source/target/domain，不能改写 public target 来掩盖错误。远距仍按原生机制付 upkeep，没有额外伤害或双扣费。
5. status-advance 按原生 fighter/status 顺序驱动唯一 callback。回调只读 `now` 使用认证 `job.at`，资源提交、原生世界和帧时钟仍用 Engine.t。解决可变 dt 第三 tick 使用帧末时间而提前丢弃最后第四 tick 的失败；保留首次失败日志。当前有限 damage/heal/selfCost/upkeep program 经过复核；不声称未来嵌套新状态 program 的时钟契约已接通。
6. snapshot 先完整验证 code/schema、源出生历史、recipient/program/declaration、native时钟、issued/consumed、唯一 job，再恢复；失效/重复包原子拒绝，旧 world/log/RNG 不变。只保证跨字段一致性，不能认证恶意端构造的完整自洽世界。callback lease 不序列化。

## 身份与复现

默认 registry 仍3工厂，rulesHash 更新为 `1addac3563ec57ce979f32e80ed2f443d43f92972999da1d2db606ad90513efd`。原 A36 + default3 + Legacy0七个 + Legacy10四个 + SlardarBash 的显式注册仍51工厂，hash 为 `1ee07a13ceeb719ffd0c54c871a386811e789d4a2ba17425f4311b0d5a64b09f`。未自动注册草稿，也未接 B/C。旧 default86d9…与51工厂557e…快照均明确拒绝；不自动迁移旧身份。

安装本地 vendor 后可运行 `node scripts/vendor-heros.mjs`：核验 tgz 和131文件哈希，保留既有私有 registrar/helper 导出，输出纯规则 bundle。重复构建字节一致；独立临时副本篡改公共 source 被拒绝且输出 sentinel 未被覆盖。预测试沿用该脚本；不运行部署/音频写入来制造证据。最终私有 bundle SHA256 `9a5f7ef87a132c8f8146b0a4c7a2376f8a675dc7fb16201042d5f22855fdf982`。

## 已完成验证与限制

本批主证据526项：312项真实 input/world/log/RNG/阶段恢复；12项混合最后 tick（默认原生与显式短周期参数模型分开标注）；32项参数/整 handler 替换；158项扣费前拒绝、混合快照伪造、旧身份、source control 与重复 callback；12项反射/射程边界。共167200个原生差分帧、14080个恢复帧。另有先行12闭环（5760/1200），旧状态批次206项（99840/1680），这些不是重复运行累加。最终完整私有测试1407通过，0失败。QA仅添加自己的 fixture 并重建自己的 fingerprint；131作者源除该派生 fingerprint 外未改。

伤害断言验证实际 source/target 与 HP delta；0/35整 activate 确认旧 status/heal/pulse 没有继续执行。原 registry 重跑结果保持。Hammer heal_pct、base_damage、slow/持续/interval 替换，Nova damage/cost/radius 替换实际生效。源控制取消付费 windup 仅适用 DK0；DK1/Hammer/Nova 瞬时启动不能伪称存在付费 windup。反射、边界位置、初始受伤、免疫/控制和短周期为标明的诊断 fixture；常规真实 input 案例不篡改初始世界。

Nova 差分明确使用已审核 `exact-6b + two-line native target repair`，不是把原6b自身伤害 bug 当正确 oracle；其他三槽使用原始6b。已安装公共107项及 A218/contract153 是父任务公共审计，不计为本批私有通过数量。public/native P1 联合关闭仍须父任务独立私有审核。

剩余：父任务验收146槽未计完成，若四槽通过则候选剩余142；Legacy batch11另树待审核。B/C、其他候选 projectile/channel/aura/death/afterAttack 等端口没有因本批而宣称全接通；原 fallback 保留，已有已验收状态/DOT/aura/area/afterAttack 不扩大授权。没有浏览器/network/生产验证或部署声明。
