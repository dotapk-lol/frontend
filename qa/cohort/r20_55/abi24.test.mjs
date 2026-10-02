import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../../../src/engine.js';import {runtimeHeroes} from '../../../src/runtime-heroes.js';import {CORE4_PACKS} from '../../../src/hero-packs/index.js';import {ACTIVE_ROSTER} from '../../../src/hero-registry.js';
import {PACKS} from '../../../src/hero-packs/r20_55/index.js';import {services} from '../../../src/hero-packs/r20_55/combat.js';
const ids=PACKS.map(p=>p.definition.registryNumericId),heroes=[...runtimeHeroes.filter(h=>!ids.includes(h.registryNumericId)),...PACKS.map(p=>p.definition)],options={seed:197,heroPacks:[...CORE4_PACKS,...PACKS],simulationRoster:{...ACTIVE_ROSTER,heroIds:[...new Set([...ACTIVE_ROSTER.heroIds,...ids])]}};
function fixture(id,side=0,other=5){const e=new Engine(heroes,side?[other,id]:[id,other],options).start();e.fighters[0].x=500;e.fighters[1].x=560;return e;} // HARNESS initial geometry only.
function run(e,seconds){const end=e.t+seconds;for(let n=0;e.t<end-1e-8;n++){assert.ok(n<10000&&e.phase==='fight');e.step();}}
function press(e,i,slot){e.setInput(i,{});e.step();e.setInput(i,{['s'+slot]:true});e.step();e.setInput(i,{});}
const channel=(e,f)=>services.fighter(e,f).data.channel;
for(const side of [0,1])for(const [id,slot] of [[28,0],[32,0],[21,3],[42,2]])test(`ABI2.4 real Anti-Mage counter via normal input: hero${id} side${side}`,()=>{
 const e=fixture(id,side),f=e.fighters[side],t=e.fighters[1-side],hp=[f.hp,t.hp];
 press(e,t.i,2);run(e,.1);assert.ok(e.buff(t,'counter'));
 press(e,f.i,slot);run(e,.85);
 assert.equal(e.buff(t,'counter'),undefined);assert.equal(f.casts,1);
 assert.ok(f.hp<hp[0],'reflected original profile damages original caster');assert.equal(t.hp,hp[1]);
 const routed=e.logs.filter(l=>l.type==='spell_reflected');assert.equal(routed.length,1);assert.equal(routed[0].skill,e.ability(f.i,slot).id);assert.equal(routed[0].originalOwner,f.i);
 const clone=new Engine(heroes,e.indices,options).restoreSimulation(e.snapshot());for(let n=0;n<50;n++){e.step();clone.step();}assert.deepEqual(clone.snapshot(),e.snapshot());
});
for(const side of [0,1])test(`ABI2.4 HARNESS target becomes invulnerable during startup: no counter consumption or effects side${side}`,()=>{
 const e=fixture(32,side),f=e.fighters[side],t=e.fighters[1-side];press(e,t.i,2);run(e,.1);press(e,f.i,0);assert.ok(f.cast);
 t.invuln=1;const hp=[f.hp,t.hp];run(e,.5);assert.deepEqual([f.hp,t.hp],hp);assert.ok(e.buff(t,'counter'));assert.equal(e.logs.some(l=>l.type==='spell_reflected'),false);
});
for(const side of [0,1])test(`ABI2.4 HARNESS reflected destination invulnerable: consume counter once, no status or damage side${side}`,()=>{
 const e=fixture(21,side),f=e.fighters[side],t=e.fighters[1-side];press(e,t.i,2);run(e,.1);press(e,f.i,3);assert.ok(f.cast);f.invuln=1;const hp=[f.hp,t.hp];run(e,.5);assert.deepEqual([f.hp,t.hp],hp);assert.equal(e.buff(t,'counter'),undefined);assert.equal(services.status(e,f,'bloodseeker_rupture'),undefined);assert.equal(e.logs.filter(l=>l.type==='spell_reflected').length,1);
});
for(const side of [0,1])test(`ABI2.4 channel token remembers released movement/action input and rejects forged snapshot side${side}`,()=>{
 for(const input of [{left:true},{jump:true},{attack:true}]){
  const e=fixture(32,side,0),f=e.fighters[side];press(e,side,2);run(e,.3);assert.ok(channel(e,f));const token=channel(e,f).token;
  for(const edit of [t=>delete t.revisions.movement,t=>t.actor=1-side,t=>t.revisions.action+=999]){const bad=e.snapshot();edit(bad.fighters[side].packModules.r20_55.data.channel.token);const before=e.snapshot();assert.throws(()=>e.restoreSimulation(bad));assert.deepEqual(e.snapshot(),before);}
  // Both transitions occur before tick: raw held-input polling cannot detect this cancellation.
  e.setInput(side,input);e.setInput(side,{});assert.equal(services.actionTokenValid(e,token),false);e.step();assert.equal(channel(e,f),null);run(e,.5);assert.equal(channel(e,f),null);
 }
});
