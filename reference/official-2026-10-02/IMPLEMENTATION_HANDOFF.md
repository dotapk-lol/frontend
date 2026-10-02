# DOTA DUEL 全英雄实施交接（2026-10-02 官网快照）

本包是实现准备，不是全英雄上线。原 repo `/Users/didi/Documents/Codex/2026-10-01/task/frontend` 只读；本目录没有修改服务、数据库或部署，也未改变速度模式。

## 已核实范围与明确边界

Valve `herolist` 有 **127 英雄**；全部逐 ID 下载 English/简体中文。734 个唯一英雄技能记录中有 127 先天、607 非先天；按官网使用的 PASSIVE 位分类，177 被动位记录、557 非被动位记录。先天内部为115被动位/12非被动位。69条由神杖或魔晶授予；这些分类有交集，不能相加。非PASSIVE记录也包括隐藏、切换、自动施法、资源命令，并非557个常驻按钮。另保留1016条天赋。

最新补丁列表为7.41f（2026-09-15 07:00 UTC）。7.41官方补丁直接说明移除命石，127个英雄当前`facets`和`facet_abilities`均为空。`facets_loc`、`facet_bonus`等旧字段仍原样保留供溯源，但禁止作为当前可选命石运行。`herodata`不提供自身build/patch号，因此只承诺抓取日快照，不声称每个数值与7.41f严格锁定。

官网英雄列表是权威名单；官网技能记录不是完整可执行数据库。Kunkka Return、Puck Ethereal Jaunt、Kez取消招架、Spirit Bear五种能力、Brewmaster分身技能等由官方描述提及，却缺单独完整记录。`extra-input-requirements.json`列出35项已定位需求，另有`additional-input-candidates.json`对734条记录全文扫出的输入/召唤线索供逐条闭合，**不是附属缺口总数上限**。未编造技能ID/系数。完整闭合还需要同版本正常安装的Valve游戏/Workshop Tools内单位与技能脚本、官方工具文档或可复现客户端验证；本环境没有读取到这类安装数据，不用第三方记忆填充。

## 稳定ID：backend优先采用

`id-mapping.json`已冻结`duel-heroes-127-v1`。20个旧英雄保留字符串`internalHeroId`和数字`registryNumericId=legacyIndex=0..19`；新增107个一次性分配20..126，字符串使用`valve_<官方英雄ID>`。映射清单有规范JSON散列。下一编号127；未来只能依据既有清单追加分配，禁止重排、复用、按名称/数组顺序推导。删除用墓碑。官方英雄ID、官网order_id、展示数组索引和数据库历史hero整数是不同字段。

旧索引依次为：0 juggernaut、1 crystal_maiden、2 pudge、3 axe、4 sniper、5 anti_mage、6 phantom_assassin、7 drow_ranger、8 lina、9 lion、10 earthshaker、11 mirana、12 sven、13 zeus、14 windranger、15 shadow_fiend、16 storm_spirit、17 queen_of_pain、18 witch_doctor、19 tidehunter。官方别名antimage/zuus/nevermore/windrunner/queenofpain已显式映射。

前端可展示任意排序，但选角、房间、开战、战绩必须查注册表。旧战绩按legacy-20解释，不回写旧数据库值。新局记录registryVersion；握手核对协议/注册表hash/能力表hash/规则与机制版本。不兼容应阻止开战。Go/MySQL仅维护轻量会话、版本及结果，不引入登录或把全部战斗改成服务器权威计算。本包不执行schema迁移。

参考`integration/registry-adapter.mjs`和`integration/protocol-contract.json`。它们是可运行的注册表适配示例，不是战斗引擎补丁。

## 原实现中的确切结构缺口

冻结在`baseline/`，随包有文件hash；别的任务可能继续改原repo，请合并前再对照。

- `engine.js:9-13`通过`heroes[indices[i]]`、`abilities[s]`读取，固定4格冷却/charge状态和s0..s3输入；`engine.js:152,162,194`冷却循环、输入和AI也依赖4槽。需把角色、技能、实体的运行身份与显示绑定拆开。
- `p2p.js:21`硬编码`hero<20`；放宽为127只是名单校验，仍需注册表、能力可用集与协议哈希。房间/结果API的hero整数需要上述版本解释，不得重排序后直接沿用。
- 引擎多处直接引用`fighters[1-i]`，所有敌人等同另一主英雄；zones只支持有限ward等对象，缺一般单位实体、选择、指令、阵营、独立死亡/资源/碰撞/技能集合。完整召唤、复制、弹跳、友军选择依赖这个重构。
- 当前80槽都映射到734记录中的官方ID，差异矩阵标为`existing_arena_handler_static_only`，并保存既有mvp机制说明；不是80个技能通过官网语义验收。另654记录无独立槽位映射，其中可能已有间接近似效果，但不能算完整实现。
- 旧数据明确排除了20英雄先天；例如Lina Slow Burn、Zeus Static Field、Shadow Fiend Necromastery会改变伤害/资源；Mirana及PA有可操作先天。必须按当前数据审计，不能把“先天”一概当灰色被动。
- 既有20×20结果只证明400场AI对局达到终局/状态有界，不能证明每招伤害、命中、驱散、A杖、魔晶或先天正确。该历史结果保留为参考，本任务没有重新运行战斗测试。

## 四技能按钮下的可操作适配

始终保留左摇杆、右普攻与4个技能按钮。增设**技能栏标题/页签的横向滑动区**作为上下文切换；它不是额外技能按钮。手势只切换栏，不直接施法；键鼠提供对应页切换键。所有被动显示灰色且不可点击（含被动页），主动先天不能错误禁用。不能挪用普攻长按或技能长按，因为会与攻击/蓄力/持续施法冲突。

1. 普通英雄：基础页显示原4槽；先天、神杖/魔晶主动技能放工具页，带明显可用状态、独立冷却小标。升级通过赛前公开对称规则预设获得；未实现的预设不允许参战，但名单/资料可展示开发状态。没有商店不是删掉升级能力的理由。
2. 返回/引爆/终止：与母技能绑定的按钮在有效状态变成回返/引爆；若母技能仍可继续放置（如多个残影），辅助页保留独立激活命令，不能无条件替换母技能。每条命令绑定abilityId、actorEntityId及contextRevision；排队的旧槽输入在切页/变身后重新校验，避免错招。
3. Kez：两套四技能条随武器改变；工具页提供先天Switch Discipline。两组对应招共享冷却和等级，不能切形态刷新。Sai招架期间第三槽可显示取消，但其官方helper ID/时序未齐，先标阻塞。
4. Invoker：元素页为Quas/Wex/Exort/Invoke，法术页显示两条当前已Invoke法术及灰/空位；十种组合全部可访问，不预选四种冒充完整。维护最近三个元素、两个法术槽、每招独立冷却/等级依赖以及当前神杖/魔晶选择。Forge Spirit接单位层。
5. Largo：基础3招+R；R期间3首歌+结束上下文。节拍窗口按固定模拟帧驱动，客户端显示校准到同一时钟，错拍/叠层/耗蓝照语义处理。不能靠音频播放时间裁决；结束命令准确契约仍需核实。
6. Rubick/Morphling：动态法术页承载偷取/复制技能及其配套命令，完整保存施法者、源等级、可偷规则、形态、冷却与失效条件；UI必须显示当前来源，不能复用固定通用伤害。
7. Meepo/Arc Warden/Lone Druid/Brewmaster/Chen：点选场上己方单位或头像条切换控制者；四槽随当前实体切换，摇杆控制选中单位。指令页提供集结、停留、攻击目标、选下一单位；其余实体继续执行最后指令。实体独立ID、技能状态和所有权同步到P2P；英雄死亡与召唤物死亡分别裁决。技能库不能只有英雄本体条目。
8. Shadow Fiend：旧“单raze按距离”是竞技场适配。近/中/远三次施法的独立ID/冷却/数值未由本feed完全给出；完整模式需补证据和显式命令，不默认为一个共享CD。

自施法、友军目标、敌人目标必须遵守官网target_team/type。只有一个敌人不代表所有技能都能改成直接打敌人；例如Winter Wyvern Splinter Blast的主目标明确不受伤。地图/树木/中立生物/经济依赖不能悄悄删除：单独制定公开的竞技场规则并保留差异，或把相应能力标记未完成。

## 可分工的共享机制批次

`implementation-batches.json`给出734条记录的一次主归属及依赖；关键词分组是工作队列，需人工评审，不是已验证语义分类。批次必须以能力为单位推进，一个英雄的技能可跨批次。

| 批次 | 交付及依赖 | 具体起点与验收 |
|---|---|---|
| B0 | 注册表、哈希握手、能力ID状态、输入绑定；backend/frontend共享同一manifest | 旧20存档回读不变；展示乱序不改战绩；旧协议拒绝新语义；全部734记录可加载但不默认可玩 |
| B1 | 状态/伤害事件总线；source entity、攻击/法术、免疫、驱散、破被动、护盾、治疗、叠层、seed RNG | 先补旧20先天，优先Lina 1244、Zeus静电场、SF灵魂；保留每个公式来源。数值、伤害顺序及永久/回合重置分别测 |
| B2 | 定向投射物、区域/持续/百分比公式、自动施法、触发器 | **第一批新增Razor(15)、Viper(47)、Abaddon(102)、Slardar(28)**，详见下表；不得仅导入头像 |
| B3 | 地形、树、轨迹、矢量瞄准、往返/取消、技能关联 | Puck(13)、Kunkka(23)、Earth Spirit(107)、Phoenix(110)；先补未列出的helper命令及来源，才能全能力验收 |
| B4 | 一般单位系统、攻击/AI指令、独立技能资源、共享死亡、召唤/幻象 | 先把剑圣守卫迁入一般实体并回归，再Lone Druid(80)、Lycan(77)、Broodmother(61)、Meepo(82)、Arc Warden(113)、Brewmaster(78)、Chen(66)；单位库缺口阻止标全覆盖 |
| B5 | 动态能力条/组合/复制，依赖B3+B4 | Kez(145)、Invoker(74)、Largo(155)、Rubick(86)、Morphling(10)；覆盖每个形态/组合/偷取依赖，命令身份一致 |
| B6 | 世界/队友/日夜/经济/复活依赖的竞技场契约 | 例如陈的转化目标、Gris-Gris、赏金/经验、树与河流；避免无目标技能变成空壳或擅改伤害 |
| B7 | 天赋/神杖/魔晶/等级解析与全组合验收；无命石选择 | 每个734能力、1016天赋、附属/单位需求均有证据；127×127=16129有序对局只作为冒烟测试，不取代技能测试 |

第一批新增的具体可编码任务（都仍需B1基础；升级可跨后续批次，不得称英雄全完成）：

| 英雄 | 可复用原基础 | 必须新增/证明 | 第一张验收用例 |
|---|---|---|---|
| Razor 15 | expanding zone、周期伤害、buff | Plasma Field去返各命中一次/距离伤害；Static Link攻击力转移/断链；Storm Surge触发过滤；风暴护甲递减/最低血目标；先天移速 | 同一目标在出/返两相各一次，进入同一相不重复；断链后转移值按规则保留/消退 |
| Viper 47 | projectile_dot、ground_dot、普攻额外效果 | Poison Attack有上限叠层/魔抗降低；Nethertoxin按驻留时间递增；Corrosive Skin伤害来源/距离过滤；Predator缺血公式；Viper Strike破被动；Nosedive升级 | 目标进出毒区时驻留曲线重置规则；破被动启停事件；多层独立到期不混算 |
| Abaddon 102 | heal、dispel、buff、dot | 全伤害护盾/爆炸结算；Mist Coil自损/敌伤或友疗；Withering Mist低血治疗削减；Borrowed Time自动阈值触发/手动施放/伤害转治疗 | 单次致命伤、护盾吸收、阈值触发及转治疗顺序；施法自损不能错误触发伤害来源循环 |
| Slardar 28 | 移速buff、AOE控制、攻击计数、护甲变化 | 河流/水坑/水迹区域；Seaborn Sentinel自动获得与退出；Corrosive Haze真视/水迹；Sprint阶段慢抗；Bash次数 | 离开水坑后buff正确消退；每N次攻击触发一次；减甲与真视互不替代 |

## 数据与验收规则

`official-abilities.json`保存所有等级数组、special_values、升级值、target/behavior原始位串及中英文原文。不能把每个数组最后一项都当普通满级：例如Invoker数组可含神杖额外级数，先天还可按英雄等级成长。先解析max_level、profile及来源关系，再选择值。特殊字段通常比顶层damages:[0]更有意义；DPS、每跳、每次攻击、百分比必须显式区分。保留未替换的`%token%`作模板，不能当渲染完成的中文说明。

behavior可能超32位，JS用BigInt从字符串解码，不能对完整数值用普通位运算再宣称没有高位属性。低位标签来自官网frontend，target/immunity/dispellable数值仍保留原值；缺少枚举证据的高位禁止猜测。

`coverage-acceptance.json`为每条技能预建14项检查、为天赋及额外需求建待验条目。每项需附test ID、输入、初态、逐帧事件及结果/expected来源；N/A必须理由。技能完成需要全部适用项通过；英雄完成需要全部能力、先天、升级、天赋和helper/单位依赖完成。头像可用、handler存在、对局不崩溃都不等于技能完成。当前所有运行验收为unverified/pending。

图像：127头像、127小地图图标、127角色render的HEAD均成功；734个技能名URL中685成功，49个先天URL返回404，已用Valve前端实际使用的`icons/innate_icon.png`提供回退。`asset-verification.json`保留每条结果与resolvedUrl；HEAD只证明资源端点，不证明逐图像素/透明度/动画。回退PNG已GET并验PNG签名。无战斗动画实装声明。

## 整合路径

先由backend/frontend锁定`id-mapping.json`与`integration/protocol-contract.json`，只做版本化身份兼容。再由前端单写者把官方记录作为参考数据层导入独立catalog，不直接替换当前DATA.heroes数组。以B1/B2能力注册器逐条接入，运行语义用例后设置`runtimeReady`。每次合并更新矩阵及规则hash，Safari/9P1任务先维持原20稳定基线；不从此包覆盖其源文件。原repo没有被本任务修改。
