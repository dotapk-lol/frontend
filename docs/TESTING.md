[English](TESTING.md) | [简体中文](TESTING.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Testing

Choose a check that exercises the changed boundary. Run one command at a time; a matrix count, VM test or original recorder is not browser, mobile, listening, NAT or full native-world acceptance.

```sh
node --max-old-space-size=256 --test --test-concurrency=1 qa/i18n.test.mjs
node --max-old-space-size=256 --test --test-concurrency=1 qa/p2p-room-identity.test.mjs
node --max-old-space-size=256 --test --test-concurrency=1 qa/registry-retry.test.mjs
node --max-old-space-size=256 scripts/generate-catalog.mjs --check
```

These cover display language, room identity, registry retries and frozen generated input consistency. The catalog check reads source/assembly metadata, without building or opening a browser. Vendor-dependent tests require `npm ci` and `node scripts/vendor-heros.mjs`. `npm test` first verifies vendor/renders audio then discovers all `qa/**/*.test.mjs`; its runner may use concurrent children, so low-memory contributors should execute selected files with `--test-concurrency=1`. Full suites and `qa/standalone-build.test.mjs` may need build outputs; run them only for the corresponding changes.

Registry retry fixtures use released hero IDs 1 and 3 so the request reaches registry authorization. They retain retry rejection, verified-cache and stale/in-flight generation assertions without bypassing the released-roster guard.

Old task-bound browser scripts have been removed. Browser acceptance requires separately configured isolated local services/tooling; evidence belongs in ignored `qa/browser-evidence/`, never in public commits. Physical devices and real cross-network peers need separate acceptance. Matrix generators may produce ignored diagnostic output; no saved historical results are proof for current source. Do not run every paused-hero matrix to validate prose.

Local API integration must use an isolated database and matching profile/build from the backend guide. Integration creates test games; never use production as a fixture. Documentation-only changes need paired-language/header/link checks and `git diff --check`. Report exact commands, runtime, scope and remaining limits in PRs.

Paired-guide maintenance: `python3 scripts/check-docs.py` checks all retained Markdown headers, language partners and relative links.
