import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';import {runtimeHeroes} from '../src/runtime-heroes.js';import {createReleasedHeroRegistry} from '../src/released-hero-rules.js';import {createRemoteSnapshotValidator} from '../src/remote-snapshot.js';
const registry=createReleasedHeroRegistry();
const cases=[[14,2,'windranger_windrun'],[14,3,'windranger_focus'],[10,1,'earthshaker_totem'],[6,1,'phantom_assassin_strike']];
function reviveWithBuff(hero,slot,key,owner,dt){
 const attacker=1-owner,e=new Engine(runtimeHeroes,owner?[1,hero]:[hero,1],{heroRuleRegistry:registry,mode:'training',seed:0}).start();e.fighters[0].x=500;e.fighters[1].x=580;e.setInput(owner,{['s'+slot]:true});for(let n=0;n<100&&!e.buff(e.fighters[owner],key);n++)e.step(dt);assert(e.buff(e.fighters[owner],key));e.setInput(owner,{});
 for(let n=0;n<180&&(e.blocked(e.fighters[attacker])||e.fighters[attacker].recovery>0||e.fighters[attacker].cast);n++)e.step(dt);
 assert(!e.blocked(e.fighters[attacker]));const f=e.fighters[owner];f.hp=1;e.setInput(attacker,{s0:true});let beforeLife,lethal=null;
 const resolve=e.resolveDamage.bind(e);e.resolveDamage=(a,b,d,m,info)=>{const receipt=resolve(a,b,d,m,info);if(a.i===attacker&&b.i===owner&&receipt.killedAtDebit)lethal={receipt:structuredClone(receipt),skill:info?.skill,type:m.damage_type};return receipt;};
 for(let n=0;n<100&&!lethal;n++){beforeLife=e.buff(f,key)?.life;e.step(dt);}
 assert(lethal,'real magic activation kills the buff owner');assert.equal(lethal.type,'magical');assert.equal(lethal.skill,e.ability(attacker,0).id);assert.equal(f.hp,f.maxHp,'training revives in the lethal frame');assert(e.buff(f,key),'the live buff survives training reset');assert(Math.abs(e.buff(f,key).life-(beforeLife-(owner===0?dt:0)))<1e-7,'preserve original alive/dead phase timing');e.setInput(attacker,{});return e;
}
for(const [hero,slot,key]of cases)for(const owner of [0,1])for(const dt of [1/60,.05])test(`training ${key} seat ${owner} dt ${dt}: lethal activation, revive, remote restore and continuation`,()=>{
 const e=reviveWithBuff(hero,slot,key,owner,dt),g=e.snapshot(),validate=createRemoteSnapshotValidator(runtimeHeroes,{heroRuleRegistry:registry});assert(validate(g),'legal immediate revival snapshot passes remote gate');const r=new Engine(runtimeHeroes,e.indices,{heroRuleRegistry:registry,mode:'training'}).start().restoreSimulation(g);assert.deepEqual(r.snapshot(),g);for(let n=0;n<100;n++){e.step(dt);r.step(dt);assert.deepEqual(r.snapshot(),e.snapshot());if(n%20===0)assert(validate(e.snapshot()));}
});
test('training revival checkpoint supports managed-frame rollback',()=>{
 const e=reviveWithBuff(14,2,'windranger_windrun',1,1/60);while(e.hitstop>0)e.step();const g=e.snapshot(),update=e.updateGuard;e.updateGuard=()=>{throw Error('managed rollback probe');};assert.throws(()=>e.step(),/managed rollback probe/);e.updateGuard=update;assert.deepEqual(e.snapshot(),g);e.step();assert(createRemoteSnapshotValidator(runtimeHeroes,{heroRuleRegistry:registry})(e.snapshot()));
});

for(const [name,mutate]of [
 ['missing suspension',g=>g.packClock.sixEffects.rows[0].clock.suspensions=[]],
 ['wrong duration',g=>g.packClock.sixEffects.rows[0].clock.suspensions[0].dt+=.01],
 ['living owner',g=>g.packClock.sixEffects.rows[0].clock.suspensions[0].hp=1],
 ['foreign owner',g=>g.packClock.sixEffects.rows[0].clock.suspensions[0].owner=0],
 ['duplicate interval',g=>{const c=g.packClock.sixEffects.rows[0].clock;c.suspensions.push(structuredClone(c.suspensions[0]));}],
 ['nontraining mode',g=>g.mode='local'],
 ['refreshed life',g=>g.fighters[1].buffs.find(b=>b.six).life+=.1]
])test('training suspension rejects '+name+' through both snapshot entrances',()=>{
 const e=reviveWithBuff(14,2,'windranger_windrun',1,1/60),g=e.snapshot(),bad=structuredClone(g),v=createRemoteSnapshotValidator(runtimeHeroes,{heroRuleRegistry:registry});assert(v(g));mutate(bad);assert.equal(v(bad),false);assert.throws(()=>e.restoreSimulation(bad));assert.deepEqual(e.snapshot(),g);
});
test('repeated training deaths preserve each skipped interval and resumed natural expiry',()=>{
 const e=reviveWithBuff(14,2,'windranger_windrun',1,1/60);while(e.hitstop>0)e.step();for(let n=0;n<3;n++){e.step();const f=e.fighters[1],receipt=e.resolveDamage(e.fighters[0],f,f.maxHp*10,{damage_type:'magical',blockable:false},{skill:'crystal_maiden_nova'});assert(receipt.killedAtDebit);while(e.hitstop>0)e.step();e.step();assert.equal(f.hp,f.maxHp);}
 const g=e.snapshot(),row=g.packClock.sixEffects.rows.find(r=>r.kind==='buff');assert.equal(row.clock.suspensions.length,4);const r=new Engine(runtimeHeroes,e.indices,{heroRuleRegistry:registry,mode:'training'}).start().restoreSimulation(g),v=createRemoteSnapshotValidator(runtimeHeroes,{heroRuleRegistry:registry});assert(v(g));for(let n=0;n<500;n++){e.step();r.step();assert.deepEqual(r.snapshot(),e.snapshot());}assert(!e.buff(e.fighters[1],'windranger_windrun'));assert(v(e.snapshot()));
});
