// Focused wiring regression only. Reuses accepted rules; does not re-accept the mechanism matrix.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(process.env.RELEASE22_ROOT||new URL('../',import.meta.url).pathname);
const from=file=>import(pathToFileURL(path.join(root,file)).href);
const {Engine}=await from('src/engine.js');
const {runtimeHeroes}=await from('src/runtime-heroes.js');
const {ACTIVE_ROSTER,REGISTRY_VERSION,REGISTRY_HASH,isActiveHero,validHeroPair,heroRegistry}=await from('src/hero-registry.js');
const {createReleasedHeroRegistry,fullWave,RELEASE_RULES_HASH}=await from('src/released-hero-rules.js');
const {createRemoteSnapshotValidator}=await from('src/remote-snapshot.js');
const R=await from('src/heros-rules.js');
const ids=[1,3,4,5,7,8,9,15,17,18,28,31,32,36,50,55,57,58,62,71,81,82];
assert.deepEqual(ACTIVE_ROSTER.heroIds,ids);assert.equal(ACTIVE_ROSTER.rosterId,'arena-heros22-v1');
assert.equal(REGISTRY_HASH,'5bca2bf8c43972583d1d58c876f5dcde039cabb0e662ac9536b0e7a53037f138');
assert.equal(REGISTRY_VERSION,'duel-heroes-127-v1');
const registry=createReleasedHeroRegistry(),sealed=registry.seal(),sessions=[];
assert.equal(sealed.rulesHash,RELEASE_RULES_HASH);assert.equal(sealed.manifest.length,132);
for(const hero of ids){
 const e=new Engine(runtimeHeroes,[hero,hero===3?1:3],{seed:0,simulationRoster:ACTIVE_ROSTER}).start();
 assert.equal(e.heroRuleRegistry.seal().rulesHash,RELEASE_RULES_HASH);
 for(let slot=0;slot<4;slot++)assert(e.heroRuleRegistry.seal().implementation(hero,slot));
 for(let k=0;k<24;k++){e.setInput(0,k<12?{left:true}:{});e.setInput(1,{});e.step();}
 const g=e.snapshot(),validate=createRemoteSnapshotValidator(runtimeHeroes,{roster:ACTIVE_ROSTER,heroRuleRegistry:registry});
 assert(validate(g),'session/remote snapshot '+hero);
 const restored=new Engine(runtimeHeroes,g.indices,{seed:0,simulationRoster:ACTIVE_ROSTER,heroRuleRegistry:registry}).start().restoreSimulation(g);
 for(let k=0;k<12;k++){e.setInput(0,{});restored.setInput(0,{});e.step();restored.step();assert.deepEqual(restored.snapshot(),e.snapshot());}
 sessions.push({hero,opponent:g.indices[1],registryRulesHash:e.heroRuleRegistry.seal().rulesHash,frame:e.frame,remoteSnapshot:true,restoreContinuation:12,fourRegisteredSlots:true});
}
const disabled=heroRegistry.rows().map(h=>h.registryNumericId).filter(id=>!ids.includes(id));
const widened={registryVersion:REGISTRY_VERSION,heroIds:heroRegistry.rows().map(h=>h.registryNumericId)};
for(const id of [...disabled,-1,127,'1',null]){
 assert(!isActiveHero(id));assert(!validHeroPair([id,3]));
 assert.throws(()=>new Engine(runtimeHeroes,[id,3],{simulationRoster:widened}),/Inactive hero selection/);
}
const replacements=[],baseRulesHash=sealed.rulesHash;
function inputRun(h,s,r){
 const e=new Engine(runtimeHeroes,[h,9],{seed:0,simulationRoster:ACTIVE_ROSTER,heroRuleRegistry:r}).start();
 e.fighters[0].x=560;e.fighters[1].x=640;
 let castsSeen=0,largestPayment=0;
 for(let k=0;k<160;k++){
  const before=e.fighters[0].mp,previous=e.fighters[0].casts;
  e.setInput(0,k===10?{['s'+s]:true}:{});e.setInput(1,{});e.step();
  if(e.fighters[0].casts>previous){castsSeen++;largestPayment=before-e.fighters[0].mp;}
 }
 assert.equal(e.fighters[0].casts,1);assert.equal(castsSeen,1);assert.equal(e.seed,0);
 const g=e.snapshot(),v=createRemoteSnapshotValidator(runtimeHeroes,{roster:ACTIVE_ROSTER,heroRuleRegistry:r});assert(v(g));
 const restored=new Engine(runtimeHeroes,[h,9],{seed:0,simulationRoster:ACTIVE_ROSTER,heroRuleRegistry:r}).start().restoreSimulation(g);
 for(let k=0;k<30;k++){for(const x of[e,restored]){x.setInput(0,{});x.setInput(1,{});x.step();}assert.deepEqual(e.snapshot(),restored.snapshot());}
 const casts=e.logs.filter(x=>x.type==='cast'&&x.player===0);
 assert.equal(casts.length,1);assert.equal(casts[0].cost,r.definition(h).abilities[s].mvp.mana);
 assert(largestPayment>casts[0].cost-2&&largestPayment<=casts[0].cost,'one resource payment with per-frame regeneration');
 const damages=e.logs.filter(x=>x.type==='hit'&&x.player===0&&x.skill===sealed.hero(h).abilities[s].id);
 return {e,damage:damages.reduce((n,x)=>n+x.damage,0),hitEvents:damages.length,cost:casts[0].cost,largestPayment};
}
for(const [name,h,s,edit,factory,want]of[
 ['stock A Leshrac',50,2,null,null,null],
 ['A parameter60',50,2,a=>{a.mvp.params.damage=60;a.official.semantic.damage=60;},null,60],
 ['A reviewed handler35',50,2,null,R.probeFactory('damage',{amount:35}),35],
 ['A reviewed empty handler',50,2,null,R.probeFactory('empty'),0],
 ['Legacy Nova parameter60',1,0,a=>{a.mvp.damage=60;},null,60],
 ['Core Slardar Crush parameter60',31,1,a=>{a.mvp.params.crush_damage=60;a.official.semantic.crush_damage=60;},null,60]
]){
 const r=fullWave();
 if(edit||factory){const a=structuredClone(r.definition(h).abilities[s]);edit?.(a);r.replaceSkill(h,s,{definition:a,...factory?{factory}:{}},{abilityId:a.id,revision:sealed.implementation(h,s).revision});assert.notEqual(r.seal().rulesHash,baseRulesHash);}
 const result=inputRun(h,s,r);if(want!==null)assert.equal(result.damage,want);
 else assert(result.damage>60,'stock retains original larger damage');
 if(want!==0)assert.equal(result.hitEvents,1);else assert.equal(result.hitEvents,0);
 replacements.push({name,hero:h,slot:s,want,actualDamage:result.damage,hitEvents:result.hitEvents,castCount:1,cost:result.cost,largestPayment:result.largestPayment,realInput:true,restoreContinuation:30,rulesHash:r.seal().rulesHash});
}
assert.equal(createReleasedHeroRegistry().seal().rulesHash,baseRulesHash,'replacement fixtures do not mutate the released registry');
{
 const r=fullWave(),a=structuredClone(r.definition(1).abilities[0]);
 r.replaceSkill(1,0,{definition:a,factory:R.probeFactory('heal',{amount:35})},{abilityId:a.id,revision:sealed.implementation(1,0).revision});
 const e=new Engine(runtimeHeroes,[1,9],{seed:0,simulationRoster:ACTIVE_ROSTER,heroRuleRegistry:r}).start(),g=e.snapshot();
 assert.equal(e.cast(0,0),false);assert.deepEqual(e.snapshot(),g);
 assert.equal(e.queueSkill(0,0),false);assert.deepEqual(e.snapshot(),g);
 e.setInput(0,{s0:true});e.step();assert.equal(e.fighters[0].casts,0);assert.equal(e.fighters[0].cd[0],0);assert.equal(e.fighters[0].mp,g.fighters[0].mp);
}
const original=new Engine(runtimeHeroes,[50,9],{seed:0,simulationRoster:ACTIVE_ROSTER,heroRuleRegistry:registry}).start();
const originalSnapshot=original.snapshot(),v=createRemoteSnapshotValidator(runtimeHeroes,{roster:ACTIVE_ROSTER,heroRuleRegistry:registry});
for(const id of disabled){const bad=structuredClone(originalSnapshot);bad.indices[0]=id;assert(!v(bad));}
const wrongIdentity=structuredClone(originalSnapshot);wrongIdentity.heroRules.rulesHash='0'.repeat(64);assert(!v(wrongIdentity));
assert.throws(()=>original.restoreSimulation(wrongIdentity));assert.deepEqual(original.snapshot(),originalSnapshot);
assert(v(originalSnapshot));
const report={result:'PASS focused22 wiring',root,rosterId:ACTIVE_ROSTER.rosterId,heroIds:ids,registryVersion:REGISTRY_VERSION,registrySHA256:REGISTRY_HASH,rulesHash:baseRulesHash,sessions,replacements,disabledHeroIds:disabled,disabledCount:disabled.length,unsupportedHandlerRejectedBeforePayment:true,invalidExpandedRosterDenied:true,invalidRemoteHeroDenied:true,wrongRulesIdentityRejectedWithoutMutation:true,seed0:true,newMechanismAcceptance:0,fullMechanismMatrixRerun:false};
const output=process.env.RELEASE22_REPORT||new URL('./browser-evidence/release22-mechanism-smoke.json',import.meta.url).pathname;
fs.mkdirSync(path.dirname(output),{recursive:true});
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:report.result,sessions:sessions.length,replacements:replacements.length,disabledIds:disabled.length,rulesHash:baseRulesHash,report:output}));
