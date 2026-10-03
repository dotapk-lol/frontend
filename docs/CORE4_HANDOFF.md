# Core4 candidate handoff

This is an isolated 24-hero candidate on `feat/registry-b0`, not a production release and not completion of the 127-hero roster. The previous B0 checkpoint remains commit `8ad8bc5534b3ff0580c9328d4a62028f0eb74726`; its legacy-only handoff is historical.

- Runtime: `duel-751bcab20194934a863a`
- Roster: `arena-core4-24-v1`; mechanics: `arena-core4-v1`
- Registry: `duel-heroes-127-v1`, SHA256 `5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138`
- Explicit IDs: 0–19, Razor25, Slardar31, Viper45, Abaddon100. Do not derive IDs from array position.
- Preview: `http://127.0.0.1:4174`, Go API `http://127.0.0.1:18083/api/v1`. Server startup text inherited from the older preview mentions18082; `src/match-api.js` and the browser's `DUEL.backend` expose the actual4174→18083 routing.
- Exact backend binding is required before network room acceptance. Never fall back to legacy20 for this build. Backend configuration is owned by the parent/backend integrator.

## Functional scope

Four explicit slots each: Razor5082/5083/1224/5085, Slardar5114/5115/5116/5117, Viper5218/5219/5220/5221, Abaddon5585/5586/5587/5588. Passives remain visible and non-clickable. Viper Poison Attack toggles without initial cost and spends20 mana per attack. Abaddon Down+S1 selects the explicit self-heal adaptation.

Automatic selected innates: Viper1461, Abaddon1481, Slardar1253. Razor5084 is omitted because the numeric source is unresolved; Viper983 is intentionally omitted. No Scepter, Shard or talents. Fixed level18. Ability data and adaptations are explicit in `cohort-data.js` and the frozen official reference package.

Arena-specific behavior includes scaled horizontal geometry, dodgeable straight projectiles, self-only shield and Coil self-heal in lieu of teammate targeting, baseline100 attack-speed formula, quarter-second DOT ticks, maximum continuous control protection1.5s, and no Borrowed Time resurrection from a fatal hit above its threshold. Viper Strike uses30s cooldown with no unverified item-derived charges. Razor's explicit-target notification covers core4 casts and the integrated legacy effect whitelist; it is not a claim that every official targeting edge case is reproduced.

Generated four-pose sprites match the existing arcade art direction. The source manifest records official reference URLs and image checks. Source and generated pixels were viewed; rendered browser sprite alignment is still pending. Existing official BGM remains embedded.

## Parallel author boundary

Actual ABI and ownership: `docs/hero-packs/interface-v1.json`. Live examples: `src/hero-packs/{razor,slardar,viper,abaddon}.js`; loaded through `CORE4_PACKS` by `runtime-heroes.js` and included in hosted/offline builds and fingerprint.

Authors own their hero module, tests and source manifest. Only the integrator changes engine, app, renderer, build, registry and active roster. Current four packs share `CohortCombat`; future independent modules need explicit integrator dispatch, not merely inclusion in the pack array. Reusable mechanisms: serializable statuses, basic/strong/no dispel, break, reflected damage guards, shield absorption and bursts, incoming-damage conversion, targeted notifications, attack modifiers, areas, missiles, water regions, links, and independent periodic storms. Missing general adapters: controllable summons/clones, morph/transform, skill pages/orb invocation, new resources and arbitrary multi-unit selection. Authors should describe required hooks and state in their contract without modifying core.

## Evidence and acceptance limits

- `npm test`:598/598 passed, including67 core4 mechanism/package/snapshot scenarios.
- `node scripts/core4-matrix.mjs`:576 ordered pairs,750824 simulation frames; maximum snapshot20632bytes, exact runtime recorded in `release/core4-qa/matrix.json`.
- Legacy comparison:400 old hero pairs×240frames=96000 snapshots identical to production62abfe; `release/core4-qa/legacy-parity.json`.
- `npm run build` and `node scripts/verify-core4-build.mjs`: hosted imports resolve;24 new definition image references and all atlas sheets embedded offline; standalone below32MiB.
- Hardened new snapshot references against malformed owners, targets and nonfinite render dimensions. Added lethal shield burst ordering and moving plasma intersection regression checks.

This environment has no supported browser/CUA tool. These are engine, VM, build and HTTP checks, not real browser operation, visual acceptance, acoustic confirmation, physical multi-touch, controller or FPS evidence. Required next acceptance: actual four-hero rendering/selection, side-swapped keyboard/touch actions, cross-window snapshots and release/blur cleanup, backend-bound room lifecycle, mobile landscape occlusion, audible skill/BGM switching, rounds/KO/rematch and frame pacing. Parent's browser QA must record its own screenshots and outcomes. No production deployment, original private Site update, or Library update was performed for this candidate.
