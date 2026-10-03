# 首批四英雄：官方输入/先天闭合结论

最新用户决定：固定四槽，无工具页、翻页或手动分身选择；本补充不改变已冻结127英雄身份表。来源为2026-10-02 Valve hero/ability feeds及7.41补丁；“输入需求可建模”不等于游戏语义验收完成。

| 英雄 | 当前官网技能ID | 额外可操作技能结论 | 先天/数据阻塞 |
|---|---|---|---|
| Razor 15 | 5082,5083,1224,5084,5085 | hero feed四基础+被动先天；未发现当前描述要求独立返回/召唤命令 | 5084 Unstable Current原始movespeed_pct=[0]，文字却说增加移速：官方数值/成长未闭合；可选明确标注的2D固定移速规则，不能将其声称为官网数值。全局索引1225 Dynamo不在当前hero feed，保留隔离，不能替代当前先天 |
| Viper 47 | 5218,5219,5220,983,1461,5221 | 983 Nosedive是神杖授予主动；本简化默认四槽省略，若选择它则替换四槽之一，**不增工具页**；Poison Attack支持手动目标+自动施法开关；无额外已确认helper | Predator 1461为独立物理伤害实例，每缺失1%生命对应原始damage0.25；不能当成0.25倍普攻。需验证攻击事件/破被动顺序 |
| Abaddon 102 | 5585,5586,5587,1481,5588 | 没有新增独立按钮；Borrowed Time保留手动及自动两路；神杖自动发射Mist Coil复用5585 | 1481不能硬编码feed里的29.5%。7.41明确为24.5+0.5×英雄等级%；低于40%HP时削减治疗，buff持续5s。神杖自动Coil耗费/触发事件细节仍需语义测试 |
| Slardar 28 | 5114,5115,5116,1253,5117 | 四基础+水域被动先天；神杖/魔晶当前描述是增强。索引7864 slardar_scepter有数值但名称/描述空白且未列在hero feed：**隔离，不能添加为已确认第5主动** | 7.41明确先天回血1.75+0.25×等级、护甲1.8+0.2×等级、攻击力11.4+0.6×等级%。feed只给基数，不能当最终值。水坑/水迹/河流区域触发不可省略 |

## 当前源码实现尤其应避免

- `*_loc`非空不代表升级当前有效。Razor Static Link 5083仍有旧shard_loc，但`ability_has_shard=false`；7.41明确移除该升级并转给Storm Surge 1224。按当前布尔标记+补丁核实，别把旧移速吸取升级一起启用。
- Slithereen Crush 5115仍有scepter_loc，但`ability_has_scepter=false`；当前神杖入口在Seaborn Sentinel1253。不要把残留文本再叠加一次。
- Abaddon Borrowed Time：被控制时可手动开，沉默时不可手动但仍可自动；破被动禁自动。激活期间Aphotic Shield不能抢先吸收伤害，需允许伤害转治疗。Mist Coil自损不能自杀。不能套用当前引擎统一blocked()直接封禁所有释放。
- Viper Corrosive Skin反伤不得吸血、再反射；破被动阻止一般触发，但不阻止Nosedive施加它。重复Nethertoxin不叠加。该类标志必须进入伤害事件总线。
- Slardar Sprint不打断持续施法；前2.5秒100%慢抗，之后到10秒结束逐渐衰减。不能直接采用恒定慢抗buff。
- Razor Eye of the Storm优先Static Link目标，否则选范围最低血量目标；神杖打两个不同目标。连续释放可叠加独立风暴，不能以同名buff覆盖。Plasma Field每目标去/回各一次。

来源：
- https://www.dota2.com/datafeed/herodata?language=english&hero_id=15 （其他对应47/102/28）
- https://www.dota2.com/datafeed/abilitydata?language=english&ability_id=1225
- https://www.dota2.com/datafeed/abilitydata?language=english&ability_id=7864
- https://www.dota2.com/datafeed/patchnotes?version=7.41&language=english

结论：首批四槽固定采用基础4招；Viper983标omitted_by_simplified_design。建议格斗先天使用固定英雄等级18（Abaddon33.5%治疗削减；Slardar回血6.25、护甲5.4、额外攻击22.2%），明确这只是竞技场规则。Razor可省略先天或采用标明来源为arena_rule的固定移速，不阻塞全英雄可玩。控制界面始终四技能；同槽重施法/自动状态纳入AI/P2P确定性系统。
