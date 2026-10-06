# 后续公共包作者输入与边界

本私有发布候选使用 `@dotapk/heros@0.1.0-review.10-rupture-order.1`，准确vendor文件 `vendor/dotapk-heros-0.1.0-review.10-rupture-order.1.tgz`，SHA256 `2885ade8d7eeb06a03045f41ac2907e17d5e753f0b881091515a3afc9005a391`。对应私有客户端中的编译SDK src/heros-rules.js SHA256 `649d21dfb2ae1b056c8226784b3a985f74d19d60bc8c789326a9ae4eeda02e8e`。公共源码仍来自该包的contract/content/rules；本轮未修改或重打vendor/SDK，不使用review11或暂停的wave44副本。

该准确包已有MIT LICENSE/NOTICE，但package.json仍为private:true、私有review版本。本轮没有建立或发布公共repo/npm。公共作者后续整理dotapk-lol/heros时需以准确包为基础，单独处理公共发布元数据、默认已发布名册与详细文档；不能直接把私有frontend目录公开。

公开内容应是英雄/四槽技能定义、竞技场数值与平衡模型、纯技能语义、只读facts契约、声明式effects与状态schema、代码身份与纯规则测试。包内已有legacy、A/B、Core4/C纯规则源码，包括私有构建目前分编译导入的legacy-10-19/remaining、legacy-0-9/next以及core4/c规则。它们的生成JS是这些纯源码的消费产物，不能把私有Engine或adapter混进去。

已发布默认名册应采用HEROS22_ROSTER.json的固定22 IDs、88槽。其余24运行时英雄及81目录英雄文档必须明确未发布、暂停；39个已验但所属英雄不完整的槽也不开放。不可把132条注册metadata解释为132正式验收，更不能把整个184槽默认标为可用。范围详情见HEROS22_UNRELEASED.md及逐槽/目录状态CSV。

必须留私有：Engine、hero-*-host适配器、私有注册编排src/released-hero-rules.js、release profile与游戏roster/API登记、输入/AI/碰撞/资源提交、回合/主循环、render/net、UI、后端、数据库、构建部署配置和游戏图片/音频。公共handler只接facts与契约提供的纯能力，不能接整个Engine，不增加castOriginalHeroSkill之类后门，不将engine.js改名放公开。不要从这份私有源码补丁或构建产物推导公共文件白名单。

当前私有构造验证精确seal rulesHash `5747bdeffe9948c67882ea02858e7958a5ea15be090b08d9ac6d8561a57970a4`、132项manifest和原有公共schema。公共作者若调整默认名册，请优先把“默认已发布范围”的说明/导出与现有createHeroRegistry工厂初始化行为分开，避免使私有组合出现重复注册或改变定义集合。若需要改变工厂默认行为、runtime定义集合或code/schema身份，须先通知主整合者协调私有消费端；此构建不能无验证地换包。

这些包版本/哈希只标识本轮已验证的消费输入。后续公共repo元数据或文档更新可产生新的包字节；即使技能codeHash未变，也需要明确新包SHA、重新生成私有SDK并完成构建/版本一致性验证。本轮未承诺未来包与当前runtime可直接互换。
