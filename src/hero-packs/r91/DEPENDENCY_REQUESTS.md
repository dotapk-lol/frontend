# Missing shared capabilities — proposals only

Pinned ABI2.4 includes ABI2.1, which supplies namespace-local applyPositiveStatus/applyMixedStatus and dispel(...,{hostile}); those are used/tested and are not missing. Cross-system/legacy offensive purge remains distinct.

V5 adds104/106/117/121/124 using explicitly authorized fixed-four 1v1 adaptations (see v5-adaptations.json). Their endpoint teleports, skill slashes and effect-only ghosts do not implement swept motion, complete attack transactions or attackable units. Those heroes no longer request those services for this reduced ruleset. Other heroes remain gated. V6 now uses frozen ABI2.4 shared source-control, cancellation, effective-status and targeting APIs. ABI2.2 deferred HP/death is provided; Oracle remains gated by the two distinct dispel requirements.

The remaining names below are intentionally absent from frozen PACK_CAPABILITIES and must remain blocking. Only the core integrator may implement/export them. No new parallel entry point is implemented here.

| Capability | Suggested public service/contract | Required real Engine boundary |
|---|---|---|
| forced-orders | forceOrder({actor,kind,target,duration,blockManualMove,blockManualAttack,cancelToken}) and endOrder(token,reason) | Both Duel actors approach/attack at their own intervals; legal restrictions; range/expiry/death ends; reward through death event; state/replay included. |
| swept-motion | startMotion({owner,actor,destinationX,speed,abilityId,cancelOnInterrupt,onContactKey}); motionActive(token) | Walls/actors crossed between frames; short stun/hex/banish, new incompatible action and input_cancel cancel permanently; no endpoint teleport damage. |
| damage-block-bypass | damageResult(...,{ignoreDamageBlock:true}) supported at baseline block phase | Quill85 through block_flat20 stays85; armor still applies once; shield, immunity, reflection and damage credit preserved. ABI2.4 diagnostic remains65. |
| attackable-units | spawnUnit({owner,kind,x,hp?,attackCountHP?,life}); real targetId query/attack/damage/death APIs | Egg10 landed hero attacks; miss/guard rules; no fighter spoof; no own-HP subsystem; summon caps/owner death/one cleanup/snapshot; no manual unit switching. |
| cross-system-positive-dispel | dispelStatusesByPolarity({target,tier,polarity:'positive'|'negative',source}) | Enemy positive purge must retain negative Seal; mixed Edict components independently classified; self negative cleanse retains buffs; never indiscriminate e.dispel. |
| invulnerable-target-dispel | explicit approved ability-specific invulnerable target admission/cleanse | Fortune's End affects invulnerable units without temporarily zeroing invulnerability; pierces immunity alone must not grant this. |
| attack-semantics | resolveAttack({actor,targetId,abilityId,noProc,secondary,noCleave,trueStrike,...}) plus actual receipt | Define issued vs landed attack consumption, Shredder five shots/range/AS/BAT, Jingu/Boundless, Walrus, Marci, Kez; avoid unintended recursive attack effects. |
| targetability | targetability query and scoped source policy | Shadow Realm/Dance/Box reject targeted spells, allow area damage, separate visibility and invulnerability; Muerta projectile disjoint. |
| global-stat-transactions | stat transaction/property hook over actual actor attributes/maxHP/maxMP | Slark/Timber/Underlord consistent derived stats, clamps and restore; no copied base HP or side-channel MP. |
| mana-transactions | spend/restore actual mana receipt + notification | Medusa return/shield use actual amounts; no net-MP inference; overflow/clamp once. |
| base-stat-queries | public base armor/base resistance separate from temporary modifiers | Elder Titan aura removes only eligible base components across both aura origins. |
| hp-exchange | exchangeHPPercent({source,target,minPct,immunityPolicy}) | Sunder is neither damage nor heal; unequal maxHP, no reflect/lifesteal, immunity, death. |
| preko-veto | registered pre-KO outcome/veto with exactly-once death | Battle Trance floor / egg outcome never resurrect an already-finalized actor. |
| effect-obstacles | registered collision volume and projectile boundary API | Ice Shards/Mars walls must affect actual Engine motion and attacks; no visual-only wall. |
| terrain | tree/wall/arena-edge query, destroy and destruction notification | Timber/Monkey/Hoodwink require actual legal anchors and release on destruction. |
| committed-cast-notifications | callback for all legacy/pack committed abilities with actual spend and identity | Croak/rhythm/innate interactions cannot be inferred from net mana or input presses. |

The five remaining failing probes are in `qa/cohort/r91/required-capabilities.probe.mjs`. Additional per-hero requirements appear in dependencies.json. A shared capability arriving does not automatically unlock any hero: unported slots, own adapter validation and independent acceptance must also complete.
