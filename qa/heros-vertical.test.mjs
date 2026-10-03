import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';import {runtimeHeroes} from '../src/runtime-heroes.js';
import * as Rules from '../src/heros-rules.js';
const {createHeroRegistry,BATTLE_ABI}=Rules;
import {probeFactory,closureSchema} from '../node_modules/@dotapk/heros/test/probes.mjs';
import {rulesSnapshot,restoreRulesSnapshot,validRulesSnapshot} from '../src/hero-rules-host.js';
const setup=(ids=[5,3],registry)=>{const e=new Engine(runtimeHeroes,ids,{heroRuleRegistry:registry}).start();e.fighters[0].x=450;e.fighters[1].x=600;e.fighters[1].mp=200;return e;};
test('actual private adapter consumes replacement formula/cost/CD from sealed config',()=>{
 const r=createHeroRegistry(),a=r.definition(5).abilities[3];r.replaceSkill(5,3,{definition:{...a,mvp:{...a.mvp,mana:20,cooldown_s:7,missing_mana_multiplier:.25}}},{abilityId:a.id,revision:'1.0.0'});
 const e=setup(undefined,r),before=e.fighters[1].hp,mp=e.fighters[0].mp;assert(e.cast(0,3));assert.equal(e.fighters[0].mp,mp-20);assert.equal(e.fighters[0].cd[3],7);for(let i=0;i<20;i++)e.step();assert(Math.abs(before-e.fighters[1].hp-249.4)<1e-6);assert.equal(e.logs.filter(l=>l.type==='hit'&&l.skill===a.id).length,1);assert.equal(e.logs.filter(l=>l.type==='activate'&&l.skill===a.id).length,1);
 const original=setup();original.cast(0,3);for(let i=0;i<20;i++)original.step();assert(Math.abs(before-original.fighters[1].hp-997.6)<1e-6);
});
test('actual behavior replacement commits requested damage once; original remains unchanged',()=>{
 const r=createHeroRegistry(),a=r.definition(5).abilities[3];r.replaceSkill(5,3,{definition:a,factory:probeFactory('damage',{amount:35,api:Rules})},{abilityId:a.id,revision:'1.0.0'});
 const e=setup(undefined,r),before=e.fighters[1].hp;e.cast(0,3);for(let i=0;i<20;i++)e.step();assert.equal(before-e.fighters[1].hp,35);assert.equal(e.logs.filter(l=>l.type==='hit').length,1);
});
test('host seed zero is preserved and rule state is reset between rounds',()=>{const e=new Engine(runtimeHeroes,[5,3],{seed:0});assert.equal(e.seed,0);assert.equal(e.random(),1013904223/4294967296);assert.equal(e.mode,'local');assert.deepEqual(rulesSnapshot(e).namespaces,[]);const s=rulesSnapshot(e);restoreRulesSnapshot(e,s);e.resetRound();assert.deepEqual(rulesSnapshot(e).namespaces,[]);});

test('VS-P1-01: actual host rejects checkpoint from a different declared pure damage parameter',()=>{
 const registry=amount=>{const r=createHeroRegistry(),a=r.definition(5).abilities[3];r.replaceSkill(5,3,{definition:a,factory:probeFactory('damage',{amount,api:Rules})},{abilityId:a.id,revision:'1.0.0'});return r;};
 const a=setup(undefined,registry(10)),b=setup(undefined,registry(35));for(const e of [a,b]){e.cast(0,3);for(let i=0;i<20;i++)e.step();}
 assert.equal(a.logs.find(l=>l.type==='hit').damage,10);assert.equal(b.logs.find(l=>l.type==='hit').damage,35);
 assert.notEqual(rulesSnapshot(a).rulesHash,rulesSnapshot(b).rulesHash);assert(!validRulesSnapshot(a,rulesSnapshot(b)));const before=a.snapshot();assert.throws(()=>a.restoreSimulation(b.snapshot()));assert.deepEqual(a.snapshot(),before);
});
test('VS-P1-02: invalid recipes cannot enter the actual host or debit MP/CD',()=>{
 for(const [hero,slot,delta] of [[9,1,{duration_s:-1}],[5,3,{damage_type:'invalid'}],[5,3,{missing_mana_multiplier:'2'}],[5,1,{range_wu:8846}],[5,3,{cooldown_s:3601}]]){
  const r=createHeroRegistry(),a=r.definition(hero).abilities[slot],e=setup([hero,3]),before=e.snapshot();
  assert.throws(()=>r.replaceSkill(hero,slot,{definition:{...a,mvp:{...a.mvp,...delta}}},{abilityId:a.id,revision:'1.0.0'}));
  const after=setup([hero,3],r);assert.deepEqual(after.snapshot(),before);assert.equal(after.fighters[0].cd[slot],0);assert.equal(after.fighters[0].mp,before.fighters[0].mp);
 }
});
test('VS-P1-03: conflicting captured state validators fail before host binding',()=>{
 const r=createHeroRegistry(undefined,{defaults:false});r.registerFactory(5,1,probeFactory('shared',{namespace:'heros/probe/conflict',schema:closureSchema(2,Rules),api:Rules}));
 assert.throws(()=>r.registerFactory(5,3,probeFactory('shared',{namespace:'heros/probe/conflict',schema:closureSchema(1,Rules),api:Rules})),/namespace schema/);assert.equal(r.seal().manifest.length,1);
});

test('VS-P1-02-D1: declared MP2000 rejects multiplier6250 atomically before private payment',()=>{const changed=runtimeHeroes.map(h=>h.id==='anti_mage'?{...h,combatMana:2000}:h);const definitions=Rules.heroes.map(h=>h.registryNumericId===5?{...h,combatMana:2000}:h),r=createHeroRegistry(definitions),a=r.definition(5).abilities[3],before=r.definition(5);assert.throws(()=>r.replaceSkill(5,3,{definition:{...a,mvp:{...a.mvp,missing_mana_multiplier:6250}}},{abilityId:a.id,revision:'1.0.0'}),/derived effect/);assert.equal(r.definition(5),before);const e=new Engine(changed,[5,3],{heroRuleRegistry:r}).start();assert.equal(e.fighters[0].maxMp,2000);assert.equal(e.fighters[0].cd[3],0);assert.equal(e.fighters[0].mp,2000);});
test('declared MP2000 and upper-bound multiplier5000 reflect successfully with matching actual model',()=>{const definitions=Rules.heroes.map(h=>h.registryNumericId===5?{...h,combatMana:2000}:h),r=createHeroRegistry(definitions),a=r.definition(5).abilities[3];r.replaceSkill(5,3,{definition:{...a,mvp:{...a.mvp,missing_mana_multiplier:5000}}},{abilityId:a.id,revision:'1.0.0'});const e=setup(undefined,r);e.fighters[0].maxMp=2000;e.fighters[0].mp=200;e.addBuff(e.fighters[1],'counter',{},2);assert(e.cast(0,3));assert.equal(e.fighters[0].mp,0);assert.equal(e.fighters[0].cd[3],70);assert.doesNotThrow(()=>{for(let n=0;n<25;n++)e.step();});assert(e.logs.some(l=>l.type==='reflect'));});
test('live resource facts exceeding the declaration reject before payment',()=>{const e=setup();e.fighters[0].maxMp=2000;e.fighters[0].mp=200;const before=e.snapshot();assert.equal(e.cast(0,3),false);assert.deepEqual(e.snapshot(),before);});
