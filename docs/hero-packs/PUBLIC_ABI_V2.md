# Public pack ABI: duel-pack-2-fighter

Integration checkpoint; **not a release or 27-hero unlock**. Default active roster remains24. Core4 preview4174 and production are unchanged. The API below exists in executable Engine code; reserved capabilities are explicitly separate.

## Author ownership and delivery

Use A's task-7 V2, B's task-8 V3, C's frozen task-9 V2. Their independent worlds remain reference tests only. Do not import a HarnessWorld into the real Engine, run a second HP simulation, or copy its fighters into Engine each frame.

Each author owns `src/hero-packs/<namespace>/`, `qa/cohort/<namespace>/`, a source manifest and a dependency report. Export `PACKS`, an array of `{definition,contract,systemId,sharedSystem}`. All heroes in one system share the same object and systemId; use namespaces `r20_55`, `c56_90`, `r91`. Only the integrator edits engine/dispatcher/services, registry, app, renderer, audio and build.

Definition: immutable stable internal `id`, registryNumericId, valveHeroId, packKey, four abilities in official approved order, explicit arena combat stats, localized notes and asset source URLs. Each ability has `id`, `valveAbilityId`, `mvp.passive`, mana/cooldown/startup/recovery/range fields and official source. Preserve runtimeReady/activeUnlock=false. Contract selectedAbilityIds must exactly match the four definitions; distinguish automatic innates from omitted ones. Never treat missing effects as generic damage.

Real Engine fixture, requiring no registry/core edits by authors:

```js
import {Engine} from '../../../src/engine.js';
import {runtimeHeroes} from '../../../src/runtime-heroes.js';
import {CORE4_PACKS} from '../../../src/hero-packs/index.js';
import {ACTIVE_ROSTER} from '../../../src/hero-registry.js';
import {PACKS} from '../../../src/hero-packs/r20_55/index.js';
const definitions=PACKS.map(p=>p.definition);
const ids=new Set(definitions.map(h=>h.registryNumericId));
const heroes=[...runtimeHeroes.filter(h=>!ids.has(h.registryNumericId)),...definitions];
const e=new Engine(heroes,[21,0],{
  seed:197,
  simulationRoster:{...ACTIVE_ROSTER,heroIds:[...new Set([...ACTIVE_ROSTER.heroIds,...ids])]},
  heroPacks:[...CORE4_PACKS,...PACKS]
}).start();
e.setInput(0,{s0:true});e.step();
```

`simulationRoster` and `heroPacks` are local constructor/test inputs, never network fields. Custom packs without an explicit simulation roster reject. Neither option unlocks UI or backend roster. Real fixture source is `qa/cohort/public-api.test.mjs`; R91's actual adapter is another reference, not a mandatory private dependency.

## Shared system hooks actually called

Owner-only `cast(e,f,slot,options)` MUST return boolean; validate all rejection conditions before any cost. `activate(e,f,cast)` MUST return true after dispatching the owned effect; throw for missing handlers. Only a legacy hero may delegate. A selected passive refuses cast without mana/CD/animation changes.

`init(e)` runs once per round, `tick(e,dt)` once per active simulation step before fighter updates, `endStep(e)` after collision/events before existing KO decision. Duplicate mirror picks do not double-call a system. Systems run lexically by systemId, independent of side or registration order. `e.t` is elapsed simulation seconds; `e.time` is the decreasing round clock. Use no Date/performance/random globals. Pause, intro, roundEnd and hitstop do not tick effects; all game timers use this same policy. dt is normally1/60, capped.05.

| Hook | Meaning |
|---|---|
| targeted(e,source,target,abilityId) | Call via e.notifyTargeted for committed targeted spells. |
| attack(e,f,target,damage,m) | Fold and return numeric basic damage; can annotate m. |
| attackInterval(e,f,target,seconds) | Fold a strictly positive numeric interval. |
| afterAttack(e,f,target,event,landed) | Original attack event ID; landed is NOT actual HP debit. |
| modifyDamage(e,event) | All modifiers run before all shield/conversion hooks. |
| beforeDamage(e,event) | After baseline mitigation/guard; mutate event.damage once. |
| afterDamage(e,event) | event.damage is actual HP debit, capped at HP immediately before debit. |
| healing(e,f,amount) | Fold heal request; e.heal applies missing-HP and healBudget caps once. |
| moveMultiplier(e,f) | Return nonnegative multiplier; systems multiply. |
| silenced(e,f), disarmed(e,f), movingAttack(e,f) | Boolean projections. |
| broken(f) | Existing ABI; state-only passive break projection. |
| dispel(e,f,tier) | Remove own statuses for basic/strong tiers. |
| interrupted(e,f,reason) | Core control/input-cancel notification; invalidate channel jobs permanently. |
| validateSnapshot(e,snapshot) | Return true only for valid own namespaced state. |

Damage event contains `attacker,target,damage,rawDamage,attackId,m,info,guard,hpBefore`. rawDamage is original hit input, before baseline outgoing multiplier/mitigation. attackId is numeric original basic attack ID, or null. Reflected calls carry reflected/noReflect/noLifesteal. `modifyDamage` may accumulate **numeric** `event.sharedArmor`; dispatcher applies the armor function once, including existing core4 numeric armor. Do not apply the same armor again in the author adapter. Current fixed ordering is part of the ABI; cross-system interactions need tests before unlock.

Engine `hit(...)` retains legacy boolean semantics. Do not use it for damage totals, lifesteal or thresholds. Engine `resolveDamage(attacker,target,amount,m,info)` uses the exact same pipeline and returns `{accepted,landed,guard,actual,killedAtDebit,rawDamage}`. accepted means transaction reached HP processing; a shield/conversion may make actual0. Guard can cause actual>0 with landed=false. killedAtDebit is a debit-time fact, not a final round winner. Receipt is local return data, never appended to fighter state. Healing in a conversion and nested retaliation cannot corrupt the outer receipt.

## Public services (implemented)

```js
import {createPackServices,PACK_ABI_VERSION} from '../../pack-services.js';
const api=createPackServices('r20_55',{
  abilityIds: PACKS.flatMap(p=>p.definition.abilities.map(a=>a.id)),
  entityKinds:['missile','area'],eventKinds:['pulse','release'],
  maxStatuses:64,maxEntities:64,maxJobs:256
});
```

Create the service after definitions but before PACKS initialization if necessary; pass IDs derived directly from definitions to avoid a circular initialization.

| Service | Signature/result |
|---|---|
| fighter(e,f) | Own `f.packModules[namespace]={statuses:[],data:{}}`. |
| world(e) | Own `e.packModules[namespace]={entities:[],jobs:[],revisions:[0,0],data:{}}`. |
| damageResult | `(e,ownerIndex,targetFighter,amount,{type,abilityId,dot=true,reflected=false,noReflect=false,blockable=false,attackId=null,basic=false})` → exact receipt. |
| damage | Legacy boolean helper only. Prefer damageResult in new adapters. |
| heal | `(e,f,amount,details)` → actual numeric heal. |
| control | `(e,f,'stun'/'root'/'hex'/'fear'/'taunt',duration,pierces=false)` → admitted duration,0 if rejected. Existing1.5s continuous-control protection remains. |
| applyStatus | `(e,f,{key,owner,duration,values,dispel='basic',pierces=false,interval=0})` → status/null. This is a negative-status gate; invulnerability/debuff immunity rejects unless applicable piercing. Store self buffs in data or e.addBuff, not this negative-status helper. |
| removeStatus | `(e,f,key)` removes an own status and returns whether one existed. |
| status/effective | `(e,f,key)` → record/boolean. Nonpiercing persistent negative statuses are suppressed during immunity while expiry continues. |
| advanceStatuses | `(e,f,dt,onTick)`; periodic callback receives `(status,enabled)`. Caller must not deal negative effect when enabled=false. No accumulated catch-up after immunity. |
| dispel | `(e,f,tier)` removes own basic or basic+strong statuses. |
| spawn | `(e,{kind,owner,x,y=0,life,data})` → plain entity. **Effects only, not attackable units.** Author tick owns motion/expiry and collision. |
| scheduleEffect | `(e,{abilityId,kind,owner,target=null,delay,data,persist=false,cancelOnInterrupt=false})` → serialized job using elapsed e.t. |
| cancelOwnerEffects | `(e,owner,{includePersistent=false})` advances revision and removes jobs. |
| runDue | `(e,dispatch)` sorted at/id, removes job before dispatch, bounded processing; no functions in payload. |
| validateSnapshot | `(snapshot)` validates structural namespace, actor references, opcodes and bounds. Author validator must additionally validate its specific data fields. |

Use actual e.fighters[0/1] objects only; clones and invalid actor indices reject. Use e.random() for seeded RNG; e.move for wall/arena-clamped movement, e.fx/e.log for supported effects/events, e.addBuff/e.property/e.dispel for current documented properties. Do not reinterpret e.move as swept hero/summon collision. geometry scale.55 is applied once in definition/adapter; do not re-scale an existing *_wu coefficient.

All persistent state must be plain finite bounded JSON. Fighter namespaces and world namespaces are included in Engine.snapshot. packClock includes seed, sequence, pending core events, input/previous, hitstop and log sequence. `restoreSimulation` validates and restores same-pair local test state; **this is not the production network validator**. Do not store unlimited histories, debug logs, functions, Engine references, cached definitions or full copied skill profiles. The author must pin copied ability identity against canonical immutable data.

## Reserved capabilities — do not fake them

These are NOT implemented by this checkpoint: general attackable summon/illusion/egg entities; hero-or-unit source/target IDs; automatic nearest-entity attacks; unit reflection/control and exactly-once unit death; revival/preKO veto; deferred HP ledger settlement; forced orders; swept motion/contact callbacks; global stat/maxHP/maxMP transactions; committed-cast/mana-restoration notifications covering legacy heroes; narrow own-Astral invulnerability exception; cooldown-rate projection; arbitrary on-hit noProc/secondary/noCleave semantics; generic terrain APIs; pack status rendering and strict remote snapshot validation.

Report these as `contract.requiresCapabilities` (names must be in exported PACK_CAPABILITIES before the dispatcher accepts the pack) and disable the affected hero. Never spoof a unit as fighter0/1, temporarily zero invulnerability, infer mana restoration from net MP, or implement a parallel HP simulator to conceal an absent API. A metadata-only extension is not an executable adapter. The core integrator owns these shared follow-up capabilities; proposed changes should include signature + one failing real-Engine test, not a modified engine fork.

## Parallel requests for parent to forward

* A: use V2. Port priority20,21,24,26,27,28,29 to actual sharedSystem hooks and services. First return the subset needing only existing fighter capabilities; list specific gaps for the rest. Tests must construct this Engine, run both sides and restore snapshots. Keep 33-hero reference coverage intact.
* B: use V3. Port priority56,57,58,60,61,62 similarly; use actual receipts/control durations and rawDamage/attackId now available. Preserve Rubick14-spell disclosure/rejection metadata. Entity-targeting, Astral and global stat/mana transactions remain integrator dependencies; no pretend success.
* C: use frozen V2. Integrator's94/97/99 adapter is provisional executable evidence. Review it for semantic differences, then deliver normalized seven-hero adapters/notes and strict own-data snapshot validator; prioritize95/102/109/118 only as their motion/order/deferred capabilities arrive. Do not overwrite the integrator's current r91-combat.js; deliver a review patch or own-directory module.

All deliver immutable source archive+SHA, exact four-slot/innate matrix, real-Engine tests separately from harness tests, and unresolved capability list. Authors do not update preview, active roster, backend hash or production. Integrator continues shared capabilities, graphical/audio input, cross-pack interactions, network validation, build/fingerprint and browser handoff. New heroes unlock only after those gates pass.
