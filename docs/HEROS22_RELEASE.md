# 22英雄私有发布候选

从精确已验机制基线 `5fd32d825fca76f29b48ab964a27d5c4ca374e25` 构建，只启用四槽均正式验收的22名英雄，88槽。既有正式127/184验收计数不变：属于24名未完整英雄的39个已验槽也整体停用。所有未完成英雄继续暂停，无新增机制。名单、内部/Valve身份、技能ID与版本见HEROS22_ROSTER.json；未发布原因见HEROS22_UNRELEASED.md。

新rosterId `arena-heros22-v1`，mechanicsVersion `arena-heros22-public127-v1`。实际构建gameVersion `duel-27c78aa4cfc8facc8a23`。保留原stable24/candidate46和全部127目录身份的历史数据，不将新构建绑定旧生产roster。

## 接线

src/released-hero-rules.js只组合精确基线的既有公共工厂，初始化时验证rulesHash及四槽完整性。它不接收Engine，不定义旧英雄施法后门。公共SDK、handlers、CodeIdentity、schema、vendor均未变。注册组合仍为132条，其中五个未验A元数据槽都属于禁选英雄，不计正式127，不会进入比赛。实际seal rulesHash仍为 `5747bdeffe9948c67882ea02858e7958a5ea15be090b08d9ac6d8561a57970a4`，完整132条manifest与原冻结逐项一致。

页面主Engine与远端快照校验器显式使用同一已验registry、同一22名单；22模式的直接Engine构造也采用该registry。显式simulationRoster不能放宽发布名单。输入、AI、碰撞、资源提交、回合、主循环、渲染和网络仍私有；沿用基线事实与效果端口、唯一提交及快照格式。

src/release-selection.js将过期选择缓存规范化为合法值，默认[1,3]。选择页面显示原46运行时卡片，22可选、24置灰并标示未发布/暂停适配。其他81目录条目保留目录状态，不新增图片或卡片。选择处理器、直接开局、CPU对手、重赛、房间hello/start、P2P玩家、MatchAPI输入、远端indices和显式Engine roster均受同一白名单限制。本作没有额外英雄随机选择入口；AI只在已选英雄内选择技能，不能选择名单外英雄。

src/compatibility.js在22模式要求已有rosterId、registryVersion、version精确匹配，并验证回复中的玩家hero。没有新增线协议字段或snapshot schema。目录历史解析保持原身份映射，不将旧战绩重新编号。

## 已生产UI

准确UI提交 `43bf16d1006468d8d630d14b2a7ed91022c6a77a` 的7文件改动已整合。app与style冲突保留22名单及registry接线，同时保留托管网址默认联网对战、六格数字邀请码、自动PvP策略与取消/卸载清理。未恢复旧连接方式/RTT设置入口。UI原补丁身份和7文件清单见HEROS22_PROVENANCE.json。已有Reborn素材与音乐保持原文件，不新增素材。

## 构建

node scripts/build.mjs --heros22（缺省也是22发布profile）复制并指纹化全部私有客户端JS/CSS，包含之前漏掉的hero-legacy-phase-rules.js和新registry入口。此分支拒绝旧--candidate/--stable构建，历史QA应使用原归档，不意外产出未完整英雄发布名单。

既有私有RULESET_HASH纳入公共SDK、各规则/宿主辅助文件、注册组合及22名单。wire rulesetHash为 `c1f4ccd86a0dc21f293d7a56489d10a0ecaebcc7d08260b33218b809f983122f`，与seal rulesHash及hero registry SHA是不同身份。构建gameVersion覆盖所有客户端模块，不受Git提交号或QA文档更改影响。

产物：dist/client、release/DOTA_DUEL_22.html。构建复制93个JS文件；实际入口导入图89模块/225边，无外部依赖或源码回退。隔离临时目录只放已发出的src与manifest，冷导入Engine、registry、远端校验器并运行真实input/step验证，不依赖工作树源码。Git提交只包含私有源码/文档/QA，产物留在本地未部署。

## 验证范围

- 22个合法英雄会话：真实step、四槽implementation、远端校验及12帧恢复续跑一致，seed0合法。
- 六条代表替换：拉席克原240、参数60、已审handler35、空handler0；Nova参数60；Slardar Crush参数60。每次单施法/单扣费/单命中；空handler无旧路径回退。每个场景恢复后30帧一致，原registry哈希不受替换副本影响。
- 不支持的公开handler在cast、queueSkill及真实input/step中拒绝，MP/CD不提交。105个名单外ID不能通过扩大simulationRoster或远端indices进入，错误rulesHash恢复不破坏原状态。
- 真实bundled app在模拟DOM/channel/fetch下验证卡片禁选、移除disabled后的处理器门禁、缓存、CPU、键盘施法、重赛、网络hello/start、API和回复身份。此测试执行真实Engine与registry，DOM/API是模拟环境，不是浏览器布局或真实WebRTC验收。
- 从准确UI提交继承的7条针对性测试通过：六格输入、前导零、粘贴/自动填充、非法字符、取消/重试/pagehide、七字段策略、迟到房间回收。只运行此接线差异，没有重跑全部机制矩阵。
- 实际A/B/A2构建：阶段规则辅助文件追加无语义注释使版本从duel-27c78aa4cfc8facc8a23变为duel-872fb188fdedc73c46e2；恢复原字节后版本恢复27c78aa4。源文件已完全恢复。

详细日志与JSON随私有冻结交付；所有Node任务串行且已结束。没有服务、预览、生产部署、私有push或数据库写入。

## 主整合者后续

本候选尚未上线。实际私有后端需登记新22名单，并使最终gameVersion唯一绑定arena-heros22-v1；房间/比赛回复须含已有身份字段。未登记时客户端会拒绝旧名单或缺失身份的回复。当前后端实现不在此发布分支，本轮不提交后端/SQL补丁。

主整合者还需安排自然浏览器/真实联网与服务联调。公共包作者的准确输入与边界见HEROS22_PUBLIC_BOUNDARY.md；若之后改变公共默认注册组合、定义集合、code/schema身份或包字节，不能直接沿用这次冻结构建，需要协调重打包和版本检查。
