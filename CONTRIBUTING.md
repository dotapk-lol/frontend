[English](CONTRIBUTING.md) | [简体中文](CONTRIBUTING.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Contributing

Start from current main in a separate branch. Read the [README](README.md), [development](docs/DEVELOPMENT.md), [architecture](docs/ARCHITECTURE.md) and changed source. Keep each PR focused: concrete trigger, resulting behavior and actual checks.

- Maintain paired English/Chinese Markdown. `README.md` is English, `README.zh-CN.md` Chinese; every guide starts with language links and the website. Update both, preserve relative links and avoid duplicating machine schemas/data for translation.
- Keep UI language, landscape, keyboard/touch semantics and roster/build/protocol independent. Only22 heroes are enabled; paused adaptations need separate acceptance.
- Rule changes preserve stable IDs, four slots, bounded parameters, atomic restore and authentic host receipts. Package/capability changes need design review and exact source/build binding.
- Choose serial tests for affected boundaries, separating source/VM tests from actual browser/network acceptance. Do not commit generated matrices, per-game evidence, private paths, credentials or backups. Historical evidence is not current certification.
- Project-owned contributions use [MIT](LICENSE); preserve copyright/license notices. Third-party media/dependencies retain their own terms; do not introduce unauthorized assets.
- Deployment, DB/security/CI permissions need an explicit change scope. Avoid force pushes and coordinate concurrent edits. Run `git diff --check`, paired-doc/link checks and applicable tests before submitting.
