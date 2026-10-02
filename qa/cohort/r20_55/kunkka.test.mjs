import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../../../src/engine.js';import {runtimeHeroes} from '../../../src/runtime-heroes.js';import {CORE4_PACKS} from '../../../src/hero-packs/index.js';import {ACTIVE_ROSTER} from '../../../src/hero-registry.js';
import {PACKS} from '../../../src/hero-packs/r20_55/index.js';import {services} from '../../../src/hero-packs/r20_55/combat.js';
const ids=PACKS.map(p=>p.definition.registryNumericId),heroes=[...runtimeHeroes.filter(h=>!ids.includes(h.registryNumericId)),...PACKS.map(p=>p.definition)],options={seed:197,heroPacks:[...CORE4_PACKS,...PACKS],simulationRoster:{...ACTIVE_ROSTER,heroIds:[...new Set([...ACTIVE_ROSTER.heroIds,...ids])]}};
const approx=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
function fixture(side=0,other=0,near=true){const e=new Engine(heroes,side?[other,29]:[29,other],options).start();if(near){e.fighters[0].x=500;e.fighters[1].x=560;}return {e,f:e.fighters[side],t:e.fighters[1-side]};} // HARNESS initial geometry where near=true.
function run(e,seconds){const end=e.t+seconds;for(let n=0;e.t<end-1e-8&&e.phase==='fight';n++){assert.ok(n<20000);e.step();}}
function press(e,i,slot){e.setInput(i,{});e.step();e.setInput(i,{['s'+slot]:true});e.step();e.setInput(i,{});}
function clone(e){return new Engine(heroes,e.indices,options).restoreSimulation(e.snapshot());}
function ledger(e){return e.packCore.ledgers.find(l=>l.abilityId==='kunkka_ghostship');}
function rum(side=0){const x=fixture(side);press(x.e,side,3);run(x.e,.4);assert.ok(ledger(x.e));return x;}
function hit(e,t,f,n,type='pure'){return e.resolveDamage(t,f,n,{damage_type:type,blockable:false},{skill:'harness_incoming',dot:true});}

for(const side of [0,1])test(`KUNKKA normal input four slots from default spawn side${side}`,()=>{
 for(let slot=0;slot<4;slot++){
  const {e,f,t}=fixture(side,0,false);e.setInput(side,t.x>f.x?{right:true}:{left:true});for(let n=0;Math.abs(t.x-f.x)>70;n++){assert.ok(n<1000);e.step();}e.setInput(side,{});
  press(e,side,slot);run(e,slot===3?3.6:slot===0?2.2:.6);assert.equal(f.casts,1);assert.ok(e.logs.some(l=>l.type==='activate'&&l.skill===e.ability(side,slot).id));
  const twin=clone(e);for(let n=0;n<40;n++){e.step();twin.step();}assert.deepEqual(twin.snapshot(),e.snapshot());
 }
});
for(const side of [0,1])test(`KUNKKA Torrent fixed aim delayed hit / normal walk dodge side${side}`,()=>{
 for(const dodge of [false,true]){const {e,f,t}=fixture(side),hp=t.hp;press(e,side,0);run(e,.6);assert.equal(t.hp,hp);if(dodge)e.setInput(t.i,side?{left:true}:{right:true});run(e,1.6);approx(hp-t.hp,dodge?0:320);if(!dodge){assert.ok(t.stun>0&&t.stun<=1.5);assert.ok(services.status(e,t,'kunkka_torrent'));}}
});
for(const side of [0,1])test(`KUNKKA Tidebringer one native attack packet, consumes status and input marker side${side}`,()=>{
 const {e,f,t}=fixture(side);press(e,side,1);run(e,.3);const base=e.hero(side).attack;
 approx(e.packCombat.attack(e,f,t,base,{}),base+140);assert.ok(e.buff(f,'kunkka_tidebringer'));
 e.setInput(side,{attack:true});run(e,.3);e.setInput(side,{});
 const hits=e.logs.filter(l=>l.type==='hit'&&l.player===side);assert.equal(hits.length,1);assert.equal(hits[0].basic,true);approx(hits[0].damage,base+140);
 assert.equal(services.status(e,f,'kunkka_tidebringer'),undefined);assert.equal(e.buff(f,'kunkka_tidebringer'),undefined);approx(e.packCombat.attack(e,f,t,base,{}),base);
});
for(const side of [0,1])test(`KUNKKA Tidebringer guarded/missed attacks retain preparation; toggle cancels during cooldown side${side}`,()=>{
 for(const guarded of [false,true]){const {e,f,t}=fixture(side,0,guarded);press(e,side,1);run(e,.3);if(guarded)e.setInput(t.i,side?{left:true}:{right:true});e.setInput(side,{attack:true});run(e,.4);e.setInput(side,{});if(guarded)assert.ok(e.logs.some(l=>l.type==='block'));assert.ok(services.status(e,f,'kunkka_tidebringer'));const mp=f.mp,casts=f.casts;press(e,side,1);run(e,.3);assert.equal(services.status(e,f,'kunkka_tidebringer'),undefined);assert.equal(f.casts,casts);assert.ok(f.mp>=mp);}
});
test('KUNKKA HARNESS Tidebringer break suppresses bonus without consuming preparation; later expiry restores it',()=>{
 const {e,f,t}=fixture();press(e,0,1);run(e,.3);const base=e.hero(0).attack;services.applyStatus(e,f,{key:'harness_break',owner:1,duration:.3,values:{break:true}});approx(e.packCombat.attack(e,f,t,base,{}),base);run(e,.4);approx(e.packCombat.attack(e,f,t,base,{}),base+140);
});
for(const side of [0,1])test(`KUNKKA X normal movement returns once and replays side${side}`,()=>{
 const {e,f,t}=fixture(side);press(e,side,2);run(e,.6);const mark=services.status(e,t,'kunkka_x_marks_the_spot'),origin=t.x;assert.ok(mark);e.setInput(t.i,side?{left:true}:{right:true});run(e,.5);e.setInput(t.i,{});assert.ok(Math.abs(t.x-origin)>100);const twin=clone(e);run(e,3);run(twin,3);approx(t.x,origin);assert.equal(services.status(e,t,'kunkka_x_marks_the_spot'),undefined);assert.deepEqual(e.snapshot(),twin.snapshot());
});
for(const side of [0,1])for(const immunity of ['debuff','invuln'])test(`KUNKKA HARNESS X later ${immunity} suppresses return without resuming after expiry side${side}`,()=>{
 const {e,t}=fixture(side);press(e,side,2);run(e,.6);e.setInput(t.i,side?{left:true}:{right:true});run(e,.5);e.setInput(t.i,{});const x=t.x;if(immunity==='invuln')t.invuln=4;else e.addBuff(t,'harness_immunity',{debuffImmune:true},4);run(e,5);approx(t.x,x);assert.equal(services.status(e,t,'kunkka_x_marks_the_spot'),undefined);
});
for(const side of [0,1])test(`KUNKKA X actual Anti-Mage counter routes original mark onto caster side${side}`,()=>{
 const {e,f,t}=fixture(side,5);press(e,t.i,2);run(e,.1);press(e,side,2);run(e,.5);const mark=services.status(e,f,'kunkka_x_marks_the_spot');assert.ok(mark?.reflected);assert.equal(mark.owner,t.i);assert.equal(services.status(e,t,'kunkka_x_marks_the_spot'),undefined);assert.equal(e.buff(t,'counter'),undefined);assert.equal(e.logs.filter(l=>l.type==='spell_reflected').length,1);
});
for(const side of [0,1])test(`KUNKKA Ghostship fixed point hits once and naturally dodges side${side}`,()=>{
 for(const dodge of [false,true]){const {e,f,t}=rum(side),hp=t.hp;approx(e.packCombat.moveMultiplier(e,f),1.155);if(dodge)e.setInput(t.i,side?{left:true}:{right:true});run(e,2.8);assert.equal(t.hp,hp);run(e,.4);approx(hp-t.hp,dodge?0:600);if(!dodge)assert.ok(t.stun>0&&t.stun<=1.5);assert.equal(e.logs.filter(l=>l.type==='hit'&&l.skill==='kunkka_ghostship').length,dodge?0:1);run(e,2);approx(e.packCombat.moveMultiplier(e,f),1);}
});
for(const side of [0,1])test(`KUNKKA HARNESS rum captures mitigated debt once, actual heal stays immediate, deterministic repayment side${side}`,()=>{
 const {e,f,t}=rum(side),hp=f.hp,l=ledger(e);e.addBuff(f,'harness_magic_reduction',{magic_reduction:.5},3);
 const r=hit(e,t,f,200,'magical');approx(r.actual,64);approx(r.deferred,36);approx(l.chip,36);approx(f.hp,hp-64);approx(e.heal(f,20),20);
 e.addBuff(f,'harness_changed_reduction',{magic_reduction:.9},15);const before=f.hp;const twin=clone(e);run(e,10.3);run(twin,10.3);approx(before-f.hp,36);approx(l.actualDamage,36);assert.equal(l.phase,'settled');assert.deepEqual(e.snapshot(),twin.snapshot());const final=f.hp;approx(services.settleDeferredHP(e,l.id,{force:true}).actualDamage,0);approx(f.hp,final);
});
for(const side of [0,1])test(`KUNKKA HARNESS rum repayment is nonlethal and does not invent death side${side}`,()=>{
 const {e,f,t}=rum(side);f.hp=100; // Explicit initial HP boundary after normal ship input.
 const r=hit(e,t,f,150);approx(r.actual,96);approx(r.deferred,54);approx(f.hp,4);run(e,10.3);approx(f.hp,1);assert.equal(ledger(e).phase,'settled');approx(ledger(e).actualDamage,3);assert.equal(e.packCore.deaths.length,0);
});
for(const side of [0,1])test(`KUNKKA HARNESS rum invulnerable repayment waits, pause freezes, source input cannot erase debt side${side}`,()=>{
 const {e,f,t}=rum(side),hp=f.hp;hit(e,t,f,100);e.cancelInput(side);e.addBuff(f,'harness_immunity',{debuffImmune:true},12);run(e,4);f.invuln=2;const snapshot=e.snapshot();e.paused=true;for(let n=0;n<120;n++)e.step();approx(e.t,snapshot.t);e.paused=false;const before=f.hp;run(e,1.5);approx(f.hp,before);run(e,6);approx(hp-f.hp,100);assert.equal(ledger(e).phase,'settled');
});
for(const side of [0,1])test(`KUNKKA HARNESS direct lethal hit cancels rum and pending ship; death attributed exactly once side${side}`,()=>{
 const {e,f,t}=rum(side);hit(e,t,f,100);const enemyHP=t.hp;hit(e,t,f,100000);e.step();assert.equal(f.hp,0);assert.equal(ledger(e).phase,'cancelled');assert.equal(services.world(e).jobs.some(j=>j.owner===side),false);assert.equal(e.packCore.deaths.length,1);assert.equal(e.packCore.deaths[0].cause.source,t.i);assert.equal(e.packCore.deaths[0].cause.abilityId,'harness_incoming');for(let n=0;n<30;n++)e.step();assert.equal(e.packCore.deaths.length,1);approx(t.hp,enemyHP);
});
test('KUNKKA canonical rum profile and selected slots remain fixed; forged ledger coefficients reject atomically',()=>{
 const {e,f,t}=rum();const p=PACKS.find(p=>p.definition.registryNumericId===29);assert.equal(p.definition.abilities.length,4);assert.deepEqual(p.contract.automaticInnateIds,[]);assert.equal(p.definition.runtimeReady,false);assert.equal(p.definition.activeUnlock,false);const l=ledger(e);approx(l.damageFraction,.36);approx(l.repayDuration,5);assert.equal(l.nonlethal,true);
 hit(e,t,f,100);for(const edit of [l=>l.damageFraction=.99,l=>l.repayDuration=1,l=>l.nonlethal=false,l=>l.owner=1,l=>l.deferHealing=true]){const before=e.snapshot(),bad=structuredClone(before);edit(bad.packCore.ledgers[0]);assert.throws(()=>e.restoreSimulation(bad));assert.deepEqual(e.snapshot(),before);}
});
