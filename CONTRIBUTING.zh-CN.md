[English](CONTRIBUTING.md) | [简体中文](CONTRIBUTING.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# 贡献指南

从最新 main 建独立分支，阅读 [README](README.zh-CN.md)、[开发](docs/DEVELOPMENT.zh-CN.md)、[架构](docs/ARCHITECTURE.zh-CN.md)和改动源码。每个 PR 聚焦具体触发条件、修改后行为和实际检查。

- Markdown 保持中英成对：`README.md` 英文、`README.zh-CN.md` 中文，每篇首部含语言与官网链接；两份同时改，相对链接正确，不为翻译复制机器 schema/数据。
- UI 语言、横屏、键盘/触控语义与 roster/build/协议相互独立；只启用22英雄，暂停适配需独立验收。
- 规则变化保留稳定 ID、四槽、有界参数、原子恢复和真实 host 回执，包/能力变化需设计和精确源码/build 绑定。
- 按边界选择串行测试，区分源码/VM 与真实浏览器/网络验收；不提交矩阵输出、逐局证据、私有路径、凭据或备份。历史证明不等于当前认证。
- 自有贡献遵循 [MIT](LICENSE)，保留版权/许可声明；第三方媒体/依赖各自许可不变，不新增未授权资产。
- 部署、DB/安全/CI 权限需明确改动范围。不强推，协调并发编辑；提交前检查 `git diff --check`、双语/链接和适用测试。
