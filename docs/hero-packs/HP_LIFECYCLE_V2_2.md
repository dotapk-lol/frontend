# ABI2.2: authoritative deferred HP and death events

This extends the typed status ABI2.1. It does not mean Oracle, Legion or Kunkka has a fully integrated four-slot adapter. All new heroes remain locked. The tested shared service replaces author-owned HP ledgers and direct HP assignment.

## Implemented API

`e.enableHPLifecycle()` enables serialized packCore lifecycle state. Call in a system's init if it needs death notifications but has no deferred ledger. It is otherwise enabled lazily by beginDeferredHP. Ordinary legacy matches retain their previous snapshot/results.

`api.beginDeferredHP(e,targetFighter,{owner,abilityId,duration,damageFraction=1,deferHealing=false,healingMultiplier=1,repayDuration=0,nonlethal=false,priority=0})` returns an integer ledger ID. The equivalent Engine method is `e.beginDeferredHP(targetFighter,options)`.

The ledger captures only amounts that actually reach the core HP-debit stage, after current damage mitigation/amplification/shields/conversion. Guard/chip-only debt retains nonlethal semantics. Full deferral is damageFraction1; partial rum-like debt can use fraction.36, duration5, repayDuration5, nonlethal=true. These are author-supplied reviewed spell parameters; the generic API does not infer official spell values.

Healing is captured after the ordinary healing hook and heal-budget admission, before missing-HP capping; this allows healing while displayed HP is full to offset the debt. Healing amplification is recorded once. e.heal returns actual immediate healing0 while it is deferred; it never returns the ledger's amplified number as actual HP gain. Do not derive healing from net HP/MP differences.

`api.settleDeferredHP(e,id,{dt=1/60,force=false})` / `e.settleDeferredHP(id,options)` returns `status,actualDamage,actualHeal` and, for a debit/credit, ledgerId,target,cause. Normally authors need not call this: the Engine settles eligible ledgers every fixed step before death dispatch/KO. force is for explicit early expiry, not for bypassing invulnerability. The API does **not** accept an arbitrary damage/healing blob or a forged alreadyMitigated flag: all debt must originate in captured core transactions.

Settlement directly applies the already-resolved net HP change; it does not call hit/heal again, does not re-run armor/resistance/amp/lifesteal/reflection, and does not duplicate on-hit procs. It respects invulnerability, postponing the retained ledger until the target can receive the settlement. Net positive settlement is capped at missing HP. Partial nonlethal repayments keep HP at least1 and consume each scheduled portion once. Repeat settlement at the same simulation instant returns already_processed for an active repayment; a finished ledger returns settled with actual amounts0. Pauses/hitstop use the existing simulation clock.

## Callbacks, cause and ordering

`hpSettled(e,event)` receives actualDamage/actualHeal and the ledger identity/cause. Normal `afterDamage` sees the immediate actual HP debit; fully deferred hits report0 there. Use hpSettled for settlement accounting, not a synthetic second spell hit.

`death(e,event)` receives `{id,actor,life,at,cause}` once per actor life. `cause` preserves original source0/1, abilityId and attackId; delayed death additionally has kind=deferred and ledgerId. Direct hits use kind=damage. Unknown external HP changes use kind=external with source=null rather than inventing a killer. A Duel adapter must look up its still-active Duel contract in this callback and grant its winner once; a later dead-actor cleanup must not grant again.

Current frame order: pack tick/input/core attacks/projectiles/areas → eligible HP settlements → death callbacks → pack endStep cleanup → KO. Do not settle HP through an author endStep HP assignment. An explicit settlement performed outside step emits its death callback when the Engine next reaches the death stage; it does not claim deathDispatched=true immediately. Incoming healing/mitigation is already included in ledger capture and must not be applied again to the debt.

Multiple ledgers capture in priority then ID order against the remaining immediate damage. Healing goes to the first active healing-deferral ledger. Captured causes use the latest contributing lethal debit for fatal attribution; nonlethal debt cannot fabricate a fatal source. This deterministic arena ordering must be disclosed/tested where multiple spell deferrals overlap.

## State and tests

packCore includes bounded ledgers, phase, repayment clock, life/death counters and causes. It is part of Engine snapshot and strict local restore validation, together with packClock. Round reset clears it. Same-frame repeat settlement cannot charge twice. This is local deterministic state, not approval of the remote wire validator or of a particular hero adapter.

`qa/cohort/deferred-hp.test.mjs` uses the real Engine for both sides of HP100/debt200, starts an active Duel-reward callback at9s, and observes exactly one death/reward at10s. It also covers mitigated debt, later changed resistance/amplification, deferred/overheal budgets, invulnerability, nonlethal partial repayment, replay/forged state and round reset. The Duel callback is an explicit contract fixture; forced movement/attacks are not claimed implemented by that test.

## ABI2.1 audit corrections included

Periodic callbacks now recheck the exact live status object before each status and every pulse, so dispel, same-key replacement, target death and round replacement cancel stale work immediately. A legal exact-expiry final pulse still fires. The real Tidehunter first500-pure-DOT strong dispel now prevents the removed second25-DOT callback (500 total).

Status restoration enforces life+elapsed≈duration and elapsed/tick/interval phase consistency with floating tolerance. Forged timer fields reject atomically. `qa/cohort/status-tick-mutation.test.mjs` and status-contract tests cover these boundaries.

Source-scoped control removal, movement/new-action revision cancellation, attackable units, forced orders and global polarity-aware legacy dispel remain separate implementation work; their capability flags are not supplied by this HP service.
