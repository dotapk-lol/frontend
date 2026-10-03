# B0 registry integration candidate

Independent worktree: `/Users/didi/Documents/Codex/2026-10-01/task/frontend-roster-b0`, branch `feat/registry-b0`, based on the published `62abfe665f10f8f7589890949714b174dae2db9d`. This branch is not deployed and does not modify the running 4173 preview or Go service.

## Implemented interfaces

- `src/hero-registry.js`: `heroRegistry.byNumericId/byValveId/byInternalId/fromLegacyIndex`, `ACTIVE_ROSTER`, `isActiveHero`, `validHeroPair`, `runtimeHeroId`, `lookupRuntimeHero(pool,id)`, and `historicalHero(record,slot)`. Lookups use explicit frozen identity fields; neither catalog order nor display/runtime array order assigns an identity. Missing or duplicate runtime definitions fail closed.
- `src/hero-catalog.js`: all 127 hero records and 734 ability index records, including 127 innates. `heroCatalog.byNumericId/ability/status` keeps catalog presence separate from active availability. Full official records and provenance are retained under `reference/official-2026-10-02`; they are not copied into public assets. The catalog does not claim full official kit completion.
- `src/compatibility.js`: `GAME_COMPATIBILITY`, `compatibleGame`, `validateBackendRegistry`, `compatibleMatch`. WebRTC and BroadcastChannel compare protocol, registry version/hash, roster, mechanics, rule data hash, official ability catalog hash, and exact runtime build. Older peers lacking this contract cannot start with this build. Invalid hero selections and mismatched snapshots are rejected.
- `MatchAPI.loadRegistry({refresh})` reads the backend registry without a game login. `rosterFields()` sends the optional `rosterId` only after validating authoritative backend metadata. An unavailable old endpoint retains the legacy request format and only permits the old20. An authoritative mismatched registry fails closed. PVE, local PVP, room creation and joining use this adapter; result bodies remain unchanged so existing result hashing is preserved.
- New local match records retain registry/roster/compatibility metadata. Existing history rows are interpreted through the pinned legacy mapping, without migrations or rewriting their hero integers. Unknown historical registries display unknown identity rather than mislabeling a hero.
- Engine selection resolves heroes by stable identity even if the runtime array is reordered. The old data file is byte-identical. Unknown effect kinds now throw instead of silently taking a generic direct-damage branch.
- `scripts/generate-catalog.mjs` verifies the frozen canonical hash and generates deterministic catalog modules and rule hash. Build fingerprints include every new runtime module; hosted and standalone outputs include their dependencies.

## Backend coordination

Active B0 roster remains `legacy-20-v1`, IDs 0 through19. Registry version is `duel-heroes-127-v1`, canonical SHA256 `5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138`. This does not need a new gameplay subset enabled on the backend. The precise candidate gameVersion is recorded in `release/registry-b0/handoff.json` after the final build.

Proposed next subset, **not enabled**: `arena-core4-24-v1`, old20 plus Razor25, Slardar31, Viper45 and Abaddon100. Do not bind a backend gameVersion until its selected kits and rendering pass acceptance. Exact JSON is `docs/roster-b0-contract.json`. B0 does not change backend code, database, port18082 or production.

## User-authorized simplified design

The later user instruction supersedes the source package's earlier page/unit-control proposals: exactly four skill slots, no paging, no manual clone switching. Complex heroes use explicitly selected representative abilities. Innates may be automatic where expressible; omissions are disclosed and never counted as implemented. `docs/simplified-coverage.json` distinguishes legacy selected adaptations, first-cohort selected implementation pending, automatic innate work, omitted abilities and pending selection.

First-cohort base slots: Razor5082/5083/1224/5085; Viper5218/5219/5220/5221; Abaddon5585/5586/5587/5588; Slardar5114/5115/5116/5117. Viper Nosedive983 is explicitly omitted. Proposed fixed arena level18 and base/no-item/no-talent profile are recorded in the contract. Unresolved Razor innate5084 speed is omitted rather than invented. These selected slots are **not yet implemented or unlocked** by B0.

## Validation and limits

531 unit/application tests pass, including19 new registry tests and all512 existing regressions. Updated VM harnesses load the actual new modules in dependency order; request tests now identify endpoints instead of assuming that session creation is the first read. New tests cover shuffled registry/runtime lists, all107 locked heroes, legacy history, large behavior flags, every handshake field, inactive peer heroes, old/new backend wire formats, conflicting build binding, and unsupported effects.

Build succeeds. Additional evidence under `release/registry-b0` compares old20 ordered matchups frame-by-frame to frozen62abfe and verifies module output integrity. These are deterministic Node/mock protocol tests, not new browser or real backend v1.3 acceptance. The new backend endpoint on a separate port still needs integration verification. First-cohort shared mechanics, asset pixel review/rendering and browser acceptance remain subsequent work. Physical iOS/PWA limitations from the production handoff remain open.
