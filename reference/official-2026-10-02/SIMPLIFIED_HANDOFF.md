# 最新交接：固定四技能，不增加复杂操作

本文件取代上一包的工具页、手动单位切换和“完整复刻全部MOBA技能后才可玩”计划。用户现要求127英雄都可玩，每英雄四个有官方出处、真正生效的代表技能；省略项公开记录。稳定ID/历史战绩规则不变，原有127英雄manifest的hash仍为`5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138`。

## 可直接消费的选择与覆盖表

`simplified-four-slot-roster.json`给出127×4=508槽位的**候选选择**，旧20保持现有能力ID和顺序，新107按当前官网基础四招筛选，6个非四基础招英雄显式覆盖选择。它是待前端作者审阅的实现队列，不会自动把技能标实装。每个槽都带官方ID、原文来源和被动灰禁点标志。

`simplified-coverage.json`对原734记录分开标记：508 selected_adapted、119 automatic_innate_candidate、107 omitted_by_simplified_design。119含115被动先天及4个可自动化的主动先天候选（德鲁伊熊、土猫石头、巨魔切形态、陈狂信徒）。这些候选尚未实装；其中不适合当前版本的可以明确省略。旧80仅existing_handler_unverified，新增428槽not_implemented；本研究包没有新增任何已通过运行验收技能。

**英雄可玩验收只覆盖所选4槽和实际启用的自动效果/同槽命令**。不用为了未选中的天赋、神杖、召唤物手动操作或经济系统阻塞全英雄。但一个已选技能的实际效果不能用空动画冒充。

## 四槽复杂英雄的明确方案

| 英雄 | 四槽/简化效果 | 明确省略/适配 |
|---|---|---|
| Invoker74 | Chaos Meteor5385 / Tornado5382 / Sun Strike5386 / Deafening Blast5390，直接施放 | 不做Quas/Wex/Exort/Invoke输入，不做火人。施法系数按固定orb等级8的arena profile取对应数组，不声称合法MOBA升级路线；升级第9项不当普通满级 |
| Kez145 | Katana四招：Echo Slash/Grappling Claw/Kazurai Katana/Raptor Dance | 固定Katana，不做Sai切换；官方Sai取消1505已补数据但本设计省略 |
| Morphling10 | Waveform/Adaptive Strike/Attribute Shift/Morph | 属性转移单槽依次切换敏捷/力量/停止；Morph默认复制对手外形/指定战斗属性，若不复制全部技能须标adapted，不能声称完整原版Morph |
| Troll95 | Berserker's Rage（被动）/Whirling Axes/Fervor（被动）/Battle Trance | 近远形态按距离自动切换；飞斧同槽选择近/远对应技能5509/5510；共享冷却是arena规则。保留两被动灰禁点，不增切换按钮 |
| Ember106 | Searing Chains/Sleight of Fist/Flame Guard/Fire Remnant | R放置残影后同槽再次激活5607；如不支持多个残影连放，明确“单残影”适配，不悄悄当完整残影系统 |
| Dark Willow119 | Bramble Maze/Shadow Realm/Cursed Crown/Terrorize8340 | Bedlam6340本版省略 |
| Jakiro64 | Dual Breath/Ice Path/Liquid Fire/Macropyre | Liquid Frost1317省略；自动施法用同槽开关或固定普攻触发方案，标明适配 |
| Largo155 | 原3招+Amphibian Rhapsody | R自动执行固定歌曲顺序或固定选曲，不设节拍小游戏/歌曲页；1秒节拍为官方字段，自动完美演奏/提前结束是arena规则 |
| Rubick86 | Telekinesis/Fade Bolt/Arcane Supremacy/Spell Steal | R偷取后变成一次已支持的偷取技能，使用后回到偷取；支持白名单按能力ID公开。未支持技能必须明确fallback为实际有效的arena复制攻击，不能悄然无效或声称全法术可偷 |
| Lone Druid80 | Entangle/Spirit Link（被动）/Savage Roar/True Form | 熊在回合开始自动生成，自动跟随/攻击；熊死亡、主人反噬和共享吼冷却仍应生效。自动生成/不收费为显式arena规则。不必做熊装备栏和手动控制 |
| Meepo82 / Arc Warden113 | 保留其基础四招；复制体自动攻击/跟随或镜像已支持的施法 | 不切控制单位；Poof自动选择己方复制体目标；独立冷却/生命周期仍应稳定。共享死亡、复制体数量/伤害折扣写入arena规则 |
| Brewmaster78 | 保留基础四招，Primal Split产生三个自动战斗单位 | 可先只自动施放明确选定的分身技能，其余标省略；生存返回规则须真实运行，不必完整微操条 |
| Earth Spirit107 | Boulder Smash/Rolling Boulder/Geomagnetic Grip/Magnetize | 系统在需要时自动放置或消耗石头1395，能力仍须与石头状态互动；无手动石头页 |
| Chen66 / Enchantress58 | 保留代表四招，转化类技能产生固定公开预设友军 | 无中立生物生态时固定召唤是2D改编，不声称任意野怪转化已实现 |

同槽重施法直接用已补到的官方子能力ID，不新增按钮：Puck5070、Kunkka5034、AA5349、Alchemist5367、Timbersaw5528、Phoenix5624/5627/5631等。被动灰禁点不变；长按/释放仅用于原本持续施法，不添加隐藏复杂手势。目标选择默认当前敌人或自己；不合法目标的转化规则必须显式写在能力契约。

## B0—B6改版实施批次

| 批次 | 现在需要交付 | 降低或取消的前置 |
|---|---|---|
| B0 身份与四槽契约 | 使用既有冻结registry；保存selected4的能力ID与规则hash；同槽状态命令记录真实abilityId；旧20战绩原样回读 | 不要求任意技能页，不要求可手动选择任何实体 |
| B1 共享战斗基础 | 投射物、区域、持续伤害、治疗、护盾、攻击触发、免疫/驱散/破被动、固定等级公式；沿用确定性tick/RNG | 不要求MOBA商店、经济、全天赋或等级成长系统 |
| B2 首批新增四英雄 | Razor15、Viper47、Abaddon102、Slardar28的所选4槽逐招实效测试 | Nosedive983默认省略；不因无扩展UI或Razor先天数值缺失阻塞可玩。先天可选择明确arena常量或省略 |
| B3 同槽状态型 | 施放→回返/引爆/终止；剩余次数、CD、成本跟随能力身份；技能输入在状态变化后不误发 | 不做完整通用技能页系统；只实现所选能力的有限状态机 |
| B4 有限自动召唤 | 自动单位的owner/位置/HP/目标/伤害/生命周期；召唤与复制技能要真实生效；选定的自动技能策略 | 不做玩家单位切换、装备背包、任意中立单位目录。仍需要最小实体层，不能把召唤一律画成无功能装饰 |
| B5 代表技能与特殊改编 | 卡尔4个直接法术、固定Katana、自动Largo歌曲、有限Rubick偷取/复制规则 | 不做完整Invoke、双形态全招、节拍小游戏、任意法术/物品复制 |
| B6 全127可玩验收 | 每英雄4槽，每招状态/命中/成本/CD/被动/AI/P2P及Safari输入有证据；127×127有序对局为补充冒烟 | 不把原734或全1016天赋作为当前发布必须实装总数；覆盖表保留省略与适配 |

## 本轮补齐的官方资料

官网frontend原文中确认了`datafeed/abilitylist`及`datafeed/abilitydata?ability_id=`。全局索引实测2702条，包含旧技能/占位/AD技能；只据此筛选，未遍历猜测ID。本轮读取160候选技能的英文/简中320份响应。

35项原需求：13 resolved（所需公开子能力记录及字段已取得）、21 partial、1 missing（任意中立单位完整目录）。**resolved仅指资料缺口，不表示引擎完全复刻或实现通过**。详见`requirement-resolution-matrix.json`。已补获火人Melting Strike5388、熊Return1343/Entangle1344/Demolish1348/Spirit Link1683/Roar5687、酒仙三分身能力、Meepo遗留Fling记录等。多数单位HP/伤害也在母技能special_values，可优先做明确的2D自动单位，不必等待完整客户端。

以下仍不当事实填充：单位完整基础攻击间隔/碰撞/属性继承；偷取例外名单；全局索引旧技能的当前归属；Phoenix母技能文字4个精灵与launcher数值5的冲突；Razor先天数值0；Largo grace0.4代表总窗口还是两侧窗口。简化规则可自定这些行为，但标`arena_rule`且测试，不能冒称官方已核实。

未登录账号、未安装/下载大型游戏包、未使用付费或限制接口。GitHub公开API一次返回403后停止该路径；未绕过。没有修改frontend/backend、数据库、部署或用户速度模式。
