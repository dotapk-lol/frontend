[English](OFFICIAL_SOURCES.md) | [简体中文](OFFICIAL_SOURCES.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 来源与第三方权利

项目自有代码/文档采用 [MIT](../LICENSE)，版权2026 dotapk-lol contributors；不改授第三方依赖、Valve 图像/音乐/名称/商标、字体或描述的许可。保留上游许可/声明，署名、下载 URL、用户提供文件或 SHA256 都不证明再分发授权。本同人适配不表示 Valve 背书。

产品名为 **DOTA PK**。`assets/favicon.svg` 是项目原创的双人交叉武器图形，与生成的 favicon/app-icon PNG 和 ICO 一起适用项目 MIT 许可。红黑配色与棱角风格参考2026-10-07查看的[官方 Dota favicon](https://www.dota2.com/favicon.ico)，本标识没有复制或再分发官方图形；既有 Valve 素材仍保留各自权利。SVG 不含外部资源、内嵌官方图像或跟踪。`scripts/render-brand-icons.py` 用本地 macOS Quick Look 和 Pillow 生成16/32px favicon、180px Apple touch、192/512px app 及独立512px maskable 图标；普通构建只读取已提交的本地图标。小 PNG favicon 保留透明圆角，Apple/app 为不透明深色底，maskable 前景位于中央安全圆内。

## 保留的源输入

`reference/official-2026-10-02/` 保留 `scripts/generate-catalog.mjs` 读取的冻结身份/目录/技能/天赋及必要能力/覆盖输入；`reference/hero-pack-inputs/first21-assets.json`、`src/hero-packs/*/*.json` 支持开发生成/来源记录；`docs/official-combat-overrides.json` 保留最初20英雄适配使用的数值转换来源。这些是项目快照，不保证当前补丁或官方可执行机制。ID、源字段和元数据留在原文件，不重复到交接日志。

项目记录的主要来源：[官方英雄](https://www.dota2.com/heroes)、英雄 datafeed `https://www.dota2.com/datafeed/herodata?language=english&hero_id=<VALVE_ID>`（中文 `schinese`）及 Steam CDN 图像 URL。等级数组、DPS/每次/总量/百分比、充能恢复和源指针要区分；竞技场距离/控制/HP/资源/目标简化属于改编。官网 feed 缺少碰撞/时序/动画等原生细节，缺失字段只能标注实现常量，不能伪造成官方值。

## 媒体

当前 `src/official-music.js` 使用 `assets/music/reborn-dnb-remix.mp3`，[reborn-source.json](../assets/music/reborn-source.json)记录用户选择曲目及离线衍生版；保留的 TI4 曲目有 [source-manifest.json](../assets/music/source-manifest.json)。图像来源另见 `assets/cohort/source-manifest.json` 和保留输入清单，清理不修改已有资产。清单是来源记录，不是无限商业/公开再分发授权；复用和衍生版须分别核查权利。

清理删除过时采集/QA 证明，不删被引用源输入或媒体。已删文件仍可通过 Git 历史访问，不表示历史清除或授权。来源指南不收录逐玩家数据、私有路径或报告。
