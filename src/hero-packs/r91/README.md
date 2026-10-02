# R91 V5 — simplified fixed-four public ABI adapters

Pinned Engine: `bf5d6e924b02c04e35ec016ef27abff852f3a038`, public ABI `duel-pack-2.1-status`. Source baseline: `3fad3f881e38b83952cf44ceefbe9728f1ef6dff`. Namespace/systemId: `r91`. Merge only `src/hero-packs/r91/` and `qa/cohort/r91/`. Do not overwrite core, services, dispatcher, shared index, registry, renderer or provisional `r91-combat.js`/`r91-definitions.js`. Integrator must remove provisional R91 entries from its constructor list before selecting these entries; never register duplicate hero identities/systems.

## Scope and admission

The assigned35 immutable IDs are91..126 excluding100. They conflict with neither old0..19 nor core4 IDs25/31/45/100. `PACKS` exports all35 definitions/contracts using one shared `R91Combat` object. Passing all PACKS to the frozen dispatcher intentionally rejects28 capability-gated heroes. `ENGINE_PACKS` selects only seven local Engine candidates:94 Centaur,99 Skywrath,104 Ember,106 Underlord,117 Void Spirit,121 Dawnbreaker,124 Muerta. All definitions still have **runtimeReady=false and activeUnlock=false**. Nothing updates the active roster.

V5 adds five complete simplified four-slot candidates (20 slots); total seven complete candidates/28 slots. Bristle97 has four executable partial branches but is still gated by damage-block-bypass. The other27 heroes/108 slots have definitions and dependency reports only. There are no generic fallback damage handlers. `slot-matrix.json` reports all140 slots and innate omissions; `dependencies.json` reports every gate. `PRIORITY_IDS` retains the original first7 review selection; it is not the executable roster.

The user-authorized simplified rules are explicit in `v5-adaptations.json` and every new ability's arenaNote. Endpoint teleports do not claim swept collision, skill slashes do not claim complete ordinary attacks, and effect-only remnants/ghosts/portals do not claim attackable-unit support. New five innates remain omitted, not silently activated. Non-passive Gunslinger stays a toggle; Atrophy/Luminosity and other selected passives remain gray and unclickable.

Fixed level18 attributes use base+17×gain; official selected ranks/values and source URL/JSON pointers are preserved. Arena HP3360/mana1600, mean feed base attack, official cast point ×60, recovery12 frames, horizontal distance ×0.55 and control cap1.5s are explicit adaptations. No items/talents/facets/pages/manual unit switching. Image URLs form a source manifest only; rendering remains an integration task.

## Executable behavior and boundaries

Ember has typed Chains damage/root, timed real invulnerability and one skill slash, magical shield/aura, and three serially restored remnant charges. Flame Guard deliberately absorbs70% **after** mitigation in this arena. Underlord has six Firestorm waves/burn, re-triggering Pit, base-attack aura/one actual-death reward, and an interruptible self-only portal channel. Void has a watched remnant/instant pull, phase/exit, physical-only shield and two serial Astral charges with exit mark. Dawn has three cancellable slams, outgoing/return hammer and fire trail, landed-attack crit/actual-damage healing, and cancellable healing pulses followed by committed flight/landing. Muerta has a reflectable direct shot, four orbiting contact effects, seeded toggleable extra skill bullets, and physical immunity/magical basic attacks. Veil's basic self-dispel, disjoint and global ethereal interaction are explicitly omitted.

All HP changes use real Engine damageResult/resolveDamage/heal. No copied fighter HP, direct HP writes, parallel HP simulator, HP-difference lifesteal or HarnessWorld import exists. Luminosity uses the same synchronous attackId's actual post-pipeline damage receipt, held only in a transaction-local WeakMap and never serialized. Guarded hits do not increment it; absorption/conversion can yield zero healing. Native invulnerability timers are only raised with max, never forcibly cleared or shortened. Endpoints use real Engine wall clamping.

Negative typed effects suppress during immunity while clocks advance, with no catchup ticks. Positive shields are independently dispellable. Break suppresses new passive procs. Source death cancels its outstanding jobs/effects. Channel revision tokens prevent short interruptions from resuming scheduled impacts. Charges, pending jobs, entities, origins, polarity and immutable numerical profiles are validated and restored through the real Engine snapshot.

Old94/99 semantics remain covered: real nonlethal Centaur self-damage, landed-only Retaliate, actual magical HP-debit Scion barrier, cancelable Stomp,330 arena-unit/s Stampede and legal contacts. Bristle diagnostics deliberately strip its gate only in labeled tests and demonstrate a known block-bypass defect; no export enables Bristle.

## Reproducible evidence

Apply the clean patch to the exact ABI archive, or apply the V4-to-V5 delta over the frozen V4 adapter. Both contain only the two owned directories. Use `ENGINE_PACKS` in an explicit local simulation roster; the provided tests show the constructor wiring. Do not use all PACKS as the executable constructor list.

- `node --test qa/cohort/r91/*.test.mjs`: **167/167**, zero skipped. Includes28 capability-rejection gates,40 new side/slot input-to-step smoke checks,13 new pending-state restores, focused numeric effects and prior regressions. These are not167 complete-hero gameplay scenarios.
- `node qa/cohort/r91/engine-matrix-v5.mjs`: **434/434** scripted real Engine cases,7 candidates ×(24 existing+7 candidates) ×2 sides. 78,120 steps plus52,080 replayed steps; deterministic continuation matched. Maximum snapshot24,793 bytes. **Positions and inputs are injected harness fixtures, not natural matches.**
- `node --test qa/cohort/r91/required-capabilities.probe.mjs`: **six expected failures**, separate from acceptance. Missing deferred HP, forced orders, swept motion, attackable units, cross-system polarity purge and Quill block bypass remain unresolved. Quill85 through flat20 currently deals65. Do not mark probes green or unlock those dependencies.

Current evidence is `v5-engine-results.txt`, `engine-matrix-v5.json`, `v5-required-capabilities-results.txt` and `v5-fixture-integrity.json`. Unprefixed engine-results/matrix/fixture/preaudit files are preserved historical V4 evidence; they do not describe V5 test counts. The V5 source manifest lists every shipped file hash. All44 original pinned Engine files and frozen V4 artifacts remain unchanged.

No reference-only harness result is counted as real Engine evidence. No production, network, preview, backend, settings or deployment changes. Natural matches, browser/mobile/audio, rendering, performance, remote validation and cross-pack acceptance remain integrator gates before any unlock.
