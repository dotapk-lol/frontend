# Range91–126 candidate handoff

## Deliverable and boundary

Workspace: `/Users/didi/Documents/Codex/2026-10-02/task-9`.
35 heroes, stable registryNumericId91..126 excluding100. No overlap with legacy0..19 or core4 IDs25/31/45/100. Source baseline was verified at `3fad3f881e38b83952cf44ceefbe9728f1ef6dff`.

All140 selected slots preserve the provided official four-slot selection and ability IDs/ranks.62 slots have executable pure candidate logic;78 are explicitly unsupported and locked with named requests. Zero active unlocks. This does not complete35 playable heroes. The first7-hero subbatch is Centaur94/Magnus95/Bristleback97/Skywrath99/Legion102/Oracle109/Snapfire118; all28 of their slots have pure implementations, with integration/semantic limitations below.

There were no authorization blockers. No core engine, main repository, registry, service, database, production, user mode/settings, remote repository, hosting or sharing were changed. No private core helpers are imported. Assets are source manifests only.

## Integration paths

- `src/hero-packs/<hero>.js`: each exports `definition`, `contract`, `effects`, default pack.
- `range91-index.js`: unique candidate index; do not overwrite existing `index.js`.
- `range91-data.js`: frozen source descriptions, notes, selected ranks, scalar formulas, IDs, source pointers, candidate innates and omissions.
- `range91-programs.js`: per-ability custom effect programs, with exact formula-field lookup that throws on unresolved coefficients.
- `range91-support.js`: pure `HarnessWorld` and effect primitives. This is an independent executable proposal, NOT a `sharedSystem` implementing CohortCombat's ABI.
- `range91-extensions.js`: independent autonomous-unit, Phoenix egg, and charge-pool proposals with tests. These do NOT implicitly enable summons, Phoenix or charge-dependent slots.
- `range91-gaps.js`: named per-slot reasons and explicit unsupported behavior; no generic damage fallback.
- `assets/range91-sources.json`:210 official reference URLs, not downloaded/pixel-reviewed/animated.
- `docs/ability-status.json`:140 rows with implementation/adaptation/unsupported status and coefficient map.
- `docs/extension-requests.json`: public service proposals plus each unsupported ability's semantic chain, implementation suggestion and required checks.

Integrator should port/adapt the first7 through public mechanisms, supply explicit dispatch/state namespaces/snapshot support, and add the tests to the real repository runner. Never set activeUnlock based only on inclusion in a pack list or this harness passing. Definitions AND contract AND abilities expose runtimeReady/activeUnlock=false.

## Tests and evidence

Run exactly `node --test qa/cohort/*.test.mjs` in this workspace (or `npm test`, whose local glob explicitly includes that path). Final result240/240 passed, zero skipped. The root repository's previous test count is not used as evidence. Of these,176 are stable-ID/source/slot/gating/coefficient-execution checks and64 are directed behavioral, numerical, regression, extension-prototype or lock-boundary cases. Every passive remains non-clickable; unsupported active casts return `unsupported_locked` without spending mana or invoking fallback.

- `qa/cohort/subbatch-a.test.mjs`:29 directed tests across the first28 slots plus death/serialization. Initial checkpoint output in subbatch-a-results.txt.
- `qa/cohort/range91.test.mjs`:211 additional checks, including all140 slot gates, numerical cases for later slices and pure extension tests.
- `qa/cohort/all-results.txt`: final direct Node test output.
- `qa/cohort/harness-trace-oracle-skywrath.json`: timestamped events and serializable snapshot, explicitly marked injected harness initial state, NOT natural match evidence.
- `reference/provenance.json`: original input SHA256s, registry hash, baseline, assignment.

Final damage-type audit found and fixed Scatterblast to magical and Raptor Dance to pure; regression uses nonzero physical armor and magic resistance. Tests also cover independent/refreshing stacks, delayed hit versus cast, dispel tiers, break suppression, current/max HP formulas, immunity, nonlethal self-cost, reflection recursion guards, actual-damage lifesteal, death cancellation, Promise waiting through invulnerability, egg destruction versus rebirth, summoned-unit owner death and charge exhaustion.

## Explicit adaptation / remaining blockers

1. Horizontal geometry scales0.55 only at integration; pure harness coordinates use official source units. Control capped1.5s. Endpoint movement candidates require swept collision before engine acceptance. Cast points/recovery and continuous input are not modeled fully in this pure harness.
2. Arena constants: HP3360/mana1600/regen8. Base attack is the feed's level1 mean retained as an explicit arena choice. Attribute18 = base+17×gain. This is not a claim that HP, armor, attack speed, mana or damage match official full level18 derived stats. No talents/Scepter/Shard/facets.
3. Only six verified singleton innates have pure logic: Centaur Horsepower, Magnus Solid Core, Bristle Prickly, Skywrath Scion, Legion Outfight, Snapfire Boomstick. Others remain explicit candidates/omissions. Active innates and stale non-passive records are not automatically enabled. No extra pages or manual clone switching.
4. Channels require a persistent interruption revision: current pure impact-time checks are insufficient when a short stun ends between pulses. Forced attack/fear status proposals need actual input/movement dispatch. Full spell-reflection, immunity enum interpretation, effect-specific dispel, range/visibility/targetability and interaction with every existing hero are not accepted yet.
5. Temporal target/team/spatial constraints need core review. Single-enemy branches do not certify multi-unit matches: Flare splitting, Flux nearby allies, cleave, projectile bounces and target queries are named extensions. Splinter Blast's primary target remains untouched because the skill is locked; Marci's forbidden self-Bodyguard is not invented.
6. Summons/clones require entity targeting/rendering and ownership; reference pure implementation proves only lifecycle/coefficient scheduling. Phoenix egg proposal proves attack-count death versus timer rebirth in isolation; its ability remains locked pending integration. Fire Spirits additionally has a4-description versus5-special-value source conflict. Charges use an isolated sequential-recovery proposal; charge-dependent live slots remain locked.
7. Unsupported slots also include unfinished author semantic work, not only unavailable engine APIs; each has an explicit request. Do not describe all78 as externally blocked or all35 as completed. See ability-status.json for exact per-slot distinction and source text.
8. No natural-match matrix, snapshot restore through core, browser rendering, mobile touch, joystick, room/network, FPS, audio, asset pixel or production acceptance was performed. Packet identity and authoritative active roster remain integrator-owned.

## Reproduction

Node v25.8.1 was used; no npm dependencies were installed. `scripts/generate.py` recreates frozen modules using the original local official-package paths. `node scripts/build-audit.mjs` regenerates status/request/coverage/trace evidence from candidate code. Generated source snapshots can be used without rerunning the data generator.
