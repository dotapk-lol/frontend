// Real Engine diagnostic boundary probes. Missing capability observations are NOT passing gameplay claims.
import fs from 'node:fs';import {Engine} from '../../../src/engine.js';import {runtimeHeroes} from '../../../src/runtime-heroes.js';import {ACTIVE_ROSTER} from '../../../src/hero-registry.js';import {PACK_CAPABILITIES} from '../../../src/pack-services.js';import {CANDIDATES} from '../../../src/hero-packs/r20_55/index.js';
const e=new Engine(runtimeHeroes,[0,0]).start(),results=[];
const proposals=[
 ['cast-range-projection','castRange(e,f,ability,rangeWu) -> rangeWu',20,'V5 owned precast is fixed; legacy/core cast validation still needs effective Enfeeble range reduction.'],
 ['sleep-source-control','acquireControl(e,target,{sourceId,kind,duration}); releaseControl(e,target,sourceId)',20,'Nightmare wake/transfer must release only its own control, preserving other source stun/root.'],
 ['visibility-query','canTarget(e,source,target,ability); revealStatus(e,target,sourceId)',26,'Sand Storm/Meld/Wind Walk conceal needs shared target admission. Bloodseeker vision is an explicit omission, not an unresolved active effect.'],
 ['positive-invulnerability','applyInvulnerability(e,f,{sourceId,duration}); removeInvulnerability(e,f,sourceId)',24,'Phase Shift must cancel only its own invulnerability, retaining overlapping immunity sources.'],
 ['movement-lock-query','canDisplace(e,f,{abilityId,kind}) -> boolean',24,'Orb jaunt and blink admission must consistently respect all namespaces root/leash.'],
 ['attack-intent','attackIntent(e,f,target,eventId)',26,'Reveal Sand Storm on accepted attack intent, including misses; no per-frame attack polling.'],
 ['secondary-attack-receipt','resolveSecondaryAttack(e,f,t,{abilityId,noProc,noCleave,...}) -> receipt',26,'Scorpion Strike and attack-derived effects need authoritative modifiers and actual debit.'],
 ['control-duration-projection','controlDuration(e,target,source,seconds) -> seconds',27,'Tiny fixed18 Strength innate status resistance must affect legacy/core/other-pack control equally.'],
 ['deferred-hp-settlement','settleDeferredHP(e,target,{ledgerId,amount,cause,nonlethal,alreadyMitigated}) -> receipt',29,'Ghostship debt uses actual deferred damage, respects invulnerability and settles once without second mitigation.'],
 ['attackable-units','spawnUnit; resolveTargetId; nearestLegalTarget; damageUnit -> receipt; onUnitDeath(cause)',30,'Autonomous summons are real targetable entities with exactly-once death, never fighter aliases.'],
 ['pre-ko-revival','beforeKO(e,f,cause) -> defer/revive/final',41,'Reincarnation intercepts before winner calculation and retains one death lifecycle.'],
 ['cooldown-rate-projection','cooldownRate(e,f,slot) -> multiplier',40,'Time Dilation changes the actual core cooldown clock, not a second private CD.'],
 ['committed-mana-notification','castCommitted(e,f,abilityId,actualManaSpent)',43,'Nether Ward reacts to committed legacy and pack mana spending once.'],
 ['body-spirit-target-routing','targetPosition(e,entityId,{bodyOrSpirit})',48,'Projection body and controlled spirit require one authoritative HP target route.'],
 ['terrain-collision','createBarrier; sweepMove; damageBarrier',49,'Cogs and Sprout must be destructible and share authoritative collision.'],
 ['max-resource-transaction','adjustMaxResources(e,f,{hpDelta,mpDelta,ratioRule,sourceId})',54,'Death Pact and Morph need reversible max-resource transactions.']
];
for(const [id,signature,hero,reason]of proposals)results.push({id,hero,signature,reason,available:PACK_CAPABILITIES.includes(id),expected:'public capability registered before full hero acceptance',observed:PACK_CAPABILITIES.includes(id)?'registered':'missing on frozen ABI 2.1',kind:'REAL_ENGINE_CAPABILITY_BOUNDARY'});
// Partial Puck S1 only: ordinary input proof of the existing native toggle admission route.
const source=CANDIDATES.find(p=>p.definition.registryNumericId===24),diagnostic={...source,definition:structuredClone(source.definition),contract:{selectedAbilityIds:source.contract.selectedAbilityIds,requiresCapabilities:['typed-status','effect-entities'],state:'PARTIAL_ORB_PROBE'}};diagnostic.definition.abilities[0].engineStatus='implemented';
const p=new Engine([...runtimeHeroes,diagnostic.definition],[24,0],{heroPacks:[diagnostic],simulationRoster:{...ACTIVE_ROSTER,heroIds:[...ACTIVE_ROSTER.heroIds,24]}}).start();p.setInput(0,{s0:true});for(let n=0;n<35;n++)p.step();p.setInput(0,{});p.step();p.setInput(0,{s0:true});p.step();const queued=p.logs.some(l=>l.type==='pack_recast');results.push({id:'puck-orb-owned-recast',available:true,resolvedInAdapter:queued,actualCasts:p.fighters[0].casts,normalInput:true,scope:'Only Orb S1; full Puck is disabled for source-owned invulnerability/movement gate.',mechanism:'Native m.toggle plus live Orb buff marker admits same-slot recast without CD/mana rewrites.'});
fs.writeFileSync(new URL('../../../docs/r20_55/capability-probes.json',import.meta.url),JSON.stringify(results,null,2));console.log({frozenAbi:'duel-pack-2.1-status',missing:results.filter(r=>r.available===false).length,ownedOrbRecastResolved:queued});if(!queued)process.exitCode=1;
