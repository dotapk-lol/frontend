# R91 V6 — frozen ABI2.4 audit repair

Pinned Engine: `c84ca0d9caf27ab27503384fafb26a8563c793c6`, ABI `duel-pack-2.4-targeting`, from `duel-pack-2.4-targeting-c84ca0d.tgz`. Only `src/hero-packs/r91/` and `qa/cohort/r91/` are authored here. The primary merge patch is **from the exact c84ca0d archive**, which already includes V5 plus integrator ABI/commitAction edits. No core, services, dispatcher, registry, renderer, shared index, other author pack or settings changes belong in this patch. Frozen V4/V5 packages remain unchanged.

## Complete candidates and remaining gates

| Registry ID | Hero | Selected four-slot state |
|---|---|---|
|94|Centaur|Complete real Engine simplified candidate|
|99|Skywrath Mage|Complete real Engine simplified candidate|
|104|Ember Spirit|Complete real Engine simplified candidate|
|106|Underlord|Complete real Engine simplified candidate|
|117|Void Spirit|Complete real Engine simplified candidate|
|121|Dawnbreaker|Complete real Engine simplified candidate|
|124|Muerta|Complete real Engine simplified candidate|

All seven/28 slots still have `runtimeReady=false` and `activeUnlock=false`. `ENGINE_PACKS` selects them only for explicit local simulations. `PACKS` retains all35 immutable assigned IDs91..126 excluding100; passing all PACKS to the dispatcher still fails closed. Bristle97 has four executable partial branches but remains blocked by damage-block-bypass. The other27 heroes/108 slots remain unported. There are no fallback handlers. No old0..19 or core4 ID25/31/45/100 conflict exists.

ABI2.2 now supplies deferred HP and authoritative death events; ABI2.3/2.4 supply source control, action cancellation, effective cross-pack status queries and targeted spell routing. None of the28 blocked heroes now has every required capability. Oracle still requires cross-system positive purge and invulnerable-target dispel; Legion still requires forced orders and attack semantics. Therefore **zero new complete heroes and zero unlocks** result solely from this ABI migration. `v6-capability-screen.json` and `dependencies.json` distinguish provided from missing capabilities for every blocked hero. The six old failure probes become five; deferred HP is tested as supported, never treated as an absent API.

## Audit repairs

- All owned targeted spell admission uses the core read-only target policy. Seal/Double Edge route once at activation; homing Goo/Bolt/Concussive and delayed Dead Shot route once at delivery. Every damage/debuff component follows that route. Actual live counter consumption, basic-physical counter exclusion, reflected invulnerable-target rejection and recursion prevention are core-owned. An already-routed returning projectile only checks admission; it never routes twice. Original ability IDs, committed coefficients and origin/owner remain distinct. Self buffs and AoEs never enter targeted routing.
- Every successful direct cast calls `e.commitAction` after admission and before new action state. Refused/passive casts do not commit or spend. Shared actionChanged callbacks cancel eligible channel revisions on control/input/movement/action; committed Solar flight retains its explicit immunity to later manual cancellation. Stomp jobs also carry the public serialized core action token. Strict restore validates token policy and rejects a deleted token.
- Mobility admission uses `controlRemaining('root')`, covering source-owned roots and later immunity. Channels query `effectiveStatus('silence')`, covering foreign typed silence without treating another author's action lock as silence. All R91 applied roots/stuns use `applyControlSource`; Chains/Pit roots are basic-dispellable, stuns strong-dispellable. Releasing one record preserves unrelated control and raw timers. Strict restore validates R91 control source, ability, type, dispel tier and bounds.
- Underlord Atrophy rewards the authoritative core death callback once, including deferred settlements. It no longer scans HP in endStep to award. The Engine owns captured debt, settlement, cause and death ordering. Luminosity still correlates one synchronous attackId receipt in a transient WeakMap; deferred damage has immediate actual debit0 and produces no fabricated healing or second basic proc.
- R91 periodic effects use the core live-record tick loop and strict status clock restore. Real Chains stops after Tidehunter dispels it. Timer forgeries reject without mutating the source Engine.

All HP changes remain Engine damageResult/resolveDamage/heal. No direct HP write, parallel HP ledger/simulator, custom counter consumption, copied fighter state or HarnessWorld import is added.

## Selected mechanics and source scope

The five V5 additions retain their explicit fixed-four 1v1 reductions in `v5-adaptations.json` and `slot-matrix.json`: endpoint teleports instead of swept paths, skill slashes instead of full attack transactions, effect-only ghosts/remnants/portals, self-only portal/Solar targets, post-mitigation Flame Guard absorption and Veil's omitted self-dispel/disjoint/global ethereal interaction. Those files describe retained V5 balance rules; V6 changes shared API routing/lifecycle rather than adding omitted capabilities.

Official four-slot selections, passive flags, ranks, source URLs/pointers and stable IDs are unchanged. Passive slots stay gray/unusable; Gunslinger remains a toggle. Innates are only explicitly enabled for the previously reviewed IDs; none is newly auto-enabled. Fixed level18 is base+17×gain; explicit arena HP3360/mana1600, feed mean base attack, horizontal distance×0.55 and control cap1.5s remain. No pages/items/talents/facets/manual summon selection. `assets-manifest.json` contains official source URLs only; assets/rendering were not deployed.

## Verification and integration

Apply `r91-engine-adapter-v6-from-c84ca0d.patch` to the exact frozen ABI archive. The full archive contains only the two owned directories. Start fresh test simulations; V6 adds a required Stomp action token and source-control records, so migrating an existing V5 mid-match snapshot is not claimed. The integrator owns active/network registration and final unlock acceptance.

- `node --test qa/cohort/r91/*.test.mjs`: **217/217**, zero skips. This includes28 capability rejection tests and50 new ABI2.4 boundary tests; it is not217 full-hero match scenarios.
- The identical50 boundary tests on the untouched c84ca0d archive gave17 pass/33 fail; after the adapter patch,50/50 pass. The33 are failed test cases, not33 separately diagnosed defects. Evidence: `v6-before-audit.txt` and `v6-engine-results.txt`.
- `node qa/cohort/r91/engine-matrix-v6.mjs`: **630/630** cases,7 candidates ×45 registered heroes ×2 sides;113,400 steps plus75,600 replay steps; deterministic continuations matched. Maximum observed snapshot25,071 bytes.
- `node --test qa/cohort/r91/required-capabilities.probe.mjs`: **five expected failures**: forced orders, swept motion, attackable units, cross-system positive purge, Quill block bypass. These are separate unresolved capabilities, not adapter acceptance successes.

All setup positions/HP/counters/statuses and matrix inputs are explicitly harness injections, **not natural matches**. V6 current evidence filenames carry v6; older unprefixed/v5 reports are preserved historical evidence. The source manifest and fixture integrity report record file hashes, stable selections, unchanged non-owned archive files and frozen V5 hashes. Browser/mobile/rendering/audio/performance/remote snapshot acceptance remain unverified. No push, deployment, production or main-repository mutation occurred.
