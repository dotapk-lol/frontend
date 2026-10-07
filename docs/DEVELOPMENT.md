[English](DEVELOPMENT.md) | [简体中文](DEVELOPMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Development and exact compatibility

## Identity bindings

The source profile is `HEROS22_BUILD=true`, `CANDIDATE_BUILD=false`.

| Field | Value / source |
| --- | --- |
| rosterId | `arena-heros22-v1`, `src/released-roster.js` |
| registryVersion | `duel-heroes-127-v1` |
| registrySha256 | `5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138` |
| mechanicsVersion | `arena-heros22-public127-v1` |
| Source NET_VERSION | `duel-e81da0fe6c6faec0eef8`, `src/net-version.js` |
| Frontend composition rulesHash | `5747bdeffe9948c67882ea02858e7958a5ea15be090b08d9ac6d8561a57970a4` |
| WebRTC protocol | `duel-wire-3` |

Stable playable IDs: `1,3,4,5,7,8,9,15,17,18,28,31,32,36,50,55,57,58,62,71,81,82`. These are registryNumericId values, not array positions or Valve IDs. The 127-entry catalog does not make every hero playable; others remain grey and paused.

The backend production profile binds this roster exactly to `duel-27c78aa4cfc8facc8a23`, `duel-6b1d12f75aa4bbac4e12`, `duel-851e67d77307f479f1fa`, and `duel-9431984810f197b393c5`. Historical builds preserve client/record compatibility; both peers still need the same build. `GAME_COMPATIBILITY` also carries rules and ability-catalog hashes in `src/compatibility.js`. The client checks the full identity map, membership and unique gameVersion binding. Go does not execute skills or accept a client rulesHash field.

Ordinary build generates a new NET_VERSION from source/assets. Register the exact value in the Go embed profile and MySQL roster metadata through a local or authorized release workflow; changing only one is insufficient. Do not fake old hashes. `--ui-only-from=<COMMIT>` is a path-restricted presentation-only workflow; docs are outside its whitelist, so a commit with non-display changes cannot use that mode against an older base. A documentation-only commit that is not rebuilt does not change the registered wire identity.

## Local API and CORS

Start the static server at `http://127.0.0.1:4173` and set the backend's single exact `DUEL_ALLOWED_ORIGIN` to that value. Follow the [backend development guide](https://github.com/dotapk-lol/backend/blob/main/docs/DEVELOPMENT.md) for an existing isolated local MySQL schema and the22 overlay.

`src/match-api.js` uses 18082 for localhost/127.0.0.1, except `127.0.0.1:4174` uses18083 `127.0.0.1:4185` uses18084 and the isolated room-selection preview `127.0.0.1:4196` uses18086; other hosts use `https://api.dotapk.lol/api/v1`. There is no `VITE_API_URL` or general page URL switch. Tests may inject `new MatchAPI({base: '<LOCAL_API_BASE>'})`. localhost and127.0.0.1, protocols and ports are distinct origins. Check local GET `/healthz`, GET `/api/v1/registry` and OPTIONS before creating games; do not change production CORS for local development or bypass roster checks.

## Rule package and host

package.json pins `vendor/dotapk-heros-0.1.0-review.10-rupture-order.1.tgz`. `scripts/vendor-heros.mjs` verifies136 source files and generates a consumer bundle. Public [heros](https://github.com/dotapk-lol/heros) root defaults to22/88 with rulesHash `bfca4c893786d98da8cc18d8c560a88e76fb9e5e79c1e71920bf78705a918d31`; the frontend composition contains132 implementation metadata rows and admits22 heroes.132 is not a released hero/skill count. Hashes, assemblies and checkpoints are different; replacing the dependency with `github:dotapk-lol/heros#main` is not an accepted upgrade.

Rules register reviewed static factories, stable IDs/four slots, parameters, source identity, revision and state schemas before seal/session creation. The host owns actor facts, cast/resource transactions, actual effect receipts, clock/queues, physical world and lifecycle delivery. Validate definition/factory parameters and recheck rulesHash; a UI label edit does not change mechanisms. See [hero integration](HERO_INTEGRATION.md) and heros [parameters](https://github.com/dotapk-lol/heros/blob/main/docs/balance-identity.md), [plugins](https://github.com/dotapk-lol/heros/blob/main/docs/plugins.md), [host contract](https://github.com/dotapk-lol/heros/blob/main/docs/host-adapter.md).

Arbitrary outside scripts are unsupported and the runtime is not a hostile-JS sandbox. Custom IDs, shared capabilities, package replacements and paused-hero restoration require separate design and real host acceptance.

## Focused checks

Run necessary files one at a time from the root:

```sh
node --test --test-concurrency=1 qa/i18n.test.mjs
node --test --test-concurrency=1 qa/p2p-room-identity.test.mjs
node --test --test-concurrency=1 qa/registry-retry.test.mjs
```

For vendor-dependent checks first run `npm ci` then `node scripts/vendor-heros.mjs`. Full `npm test` has pretest/full discovery; standalone checks require build output and browser tools require separate QA conditions. Do not use production API as a test fixture or parallelize browsers/builds/tests. Prose changes need link/path checks and `git diff --check`, without rebuilding rules or game assets. See [testing](TESTING.md).

## License scope

Project-owned code/docs use [MIT](../LICENSE); retain copyright/license notices when modifying or distributing. Third-party pictures, music, fonts, trademarks and dependencies keep separate terms, outside the project grant. Preserve upstream LICENSE/NOTICE and provenance; verify media redistribution rights independently.

## New selection build binding

Current source build `duel-e81da0fe6c6faec0eef8` requires append-only exact binding in the backend22 roster and `roomSelectionVersions`, preserving all historical versions. This document does not mean production has activated it; pair the backend contract, native two-window acceptance and coordinated release. Default reservation registry ID1 is Crystal Maiden (Valve ID5), not Valve ID1. Branding metadata updates change `RULESET_HASH` through the existing full-source digest, while sealed skill `rulesHash` and22/88 roster remain unchanged.

## Entry validation and updating

Hosted entry checks `build-manifest.json` with a finite10s deadline, then the exact backend registry. The page shares one `MatchAPI` across rooms and PvE; successful registry validation stays in memory for the loaded build. Registry generation permits and backend room/match/selection checks remain strict. No registry cookie or persistent success override authorizes a future build. Transport failures are retryable entry errors, distinct from incompatible identity; failed checks are cleared. Server version rejection invalidates the permit and entry state.

Idle entry/foreground checks refresh metadata at most once per minute; active rooms/matches do not trigger refresh. A newer published manifest offers an explicit update button; the button preserves settings and loads the page with a build query, without automatic reload loops. HTML/build metadata are no-store, and production HTML references one complete fingerprinted JS bundle plus fingerprinted CSS. Source modules remain available for inspection/tests, but the hosted entry does not assemble gameplay from individually cached module URLs. Offline standalone remains local.

No new backend discovery API is needed. A new exact source runtime still requires append-only22 roster/selection feature/SQL metadata binding before publication. Physical Safari/iOS acceptance is separate from actual MacChrome and labeled network fixtures.
