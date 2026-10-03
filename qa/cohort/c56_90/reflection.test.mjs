import test from 'node:test';import assert from 'node:assert/strict';
import {fixture,advance,ready} from './fixture.mjs';
import {C56System,services} from '../../../src/hero-packs/c56_90/system.js';
import {DELIVERY_TAGS} from '../../../src/hero-packs/c56_90/targeted-delivery.js';
const near=(a,b)=>assert(Math.abs(a-b)<1e-6,`${a} != ${b}`);
function press(e,i,slot){e.setInput(i,{['s'+slot]:true});e.step();e.setInput(i,{});}
function counter(e,t){press(e,t.i,2);advance(e,.1);assert(e.buff(t,'counter'));}
// Native Counterspell and authored skills enter by input→step. Geometry is the fixture's HARNESS setup.
for(const side of[0,1])for(const id of[58,82])test(`actual Counterspell input→step id${id} side${side}: redirected once with real receipt flags`,()=>{
 const {e,f,t}=fixture(id,side,5);counter(e,t);const hp=[f.hp,t.hp];const seen=[];const resolve=e.resolveDamage.bind(e);e.resolveDamage=(...args)=>{const receipt=resolve(...args);seen.push({info:args[4],receipt});return receipt;}; // test observer only
 press(e,side,0);advance(e,.55);near(t.hp,hp[1]);near(hp[0]-f.hp,id===58?320:250);assert(!e.buff(t,'counter'));assert.equal(e.logs.filter(x=>x.type==='spell_reflected').length,1);
 const hit=seen.find(x=>x.info.reflected);assert(hit);assert.equal(hit.info.noReflect,true);assert.equal(hit.info.noLifesteal,true);near(hit.receipt.actual,id===58?320:250);
 if(id===58){const s=services.status(e,f,'night_stalker_void');assert(s);assert.equal(s.owner,t.i);assert.equal(s.values.origin,f.i);assert.equal(s.values.reflected,true);near(C56System.moveMultiplier(e,f),.5);}else assert(e.controlRemaining(f,'stun')>0);
 const snapshot=e.snapshot();assert(C56System.validateSnapshot(e,snapshot));const restored=fixture(id,side,5).e;restored.restoreSimulation(snapshot);e.step();restored.step();assert.deepEqual(restored.snapshot(),e.snapshot());
});
for(const side of[0,1])for(const id of[58,82])test(`reflection recipient debuff immunity id${id} side${side}: damage stays, hostile effects refused`,()=>{
 const {e,f,t}=fixture(id,side,5);counter(e,t);e.addBuff(f,'harness_immune',{debuffImmune:1},2);const before=f.hp;press(e,side,0);advance(e,.55);near(before-f.hp,id===58?320:250);assert.equal(e.controlRemaining(f,'stun'),0);assert(!services.status(e,f,'night_stalker_void'));assert(!e.buff(t,'counter'));
});
for(const side of[0,1])test(`reflection target invulnerability side${side}: no damage/status, never re-reflects`,()=>{
 const {e,f,t}=fixture(58,side,5);counter(e,t);e.addBuff(f,'counter',{...e.ability(t.i,2).mvp},2);const before=[f.hp,t.hp];press(e,side,0);f.invuln=2; // HARNESS boundary injected during windup
 advance(e,.55);near(f.hp,before[0]);near(t.hp,before[1]);assert(!services.status(e,f,'night_stalker_void'));assert(e.buff(f,'counter'));assert(!e.buff(t,'counter'));assert.equal(e.logs.filter(x=>x.type==='spell_reflected').length,1);
});
for(const side of[0,1])test(`both actors counter side${side}: reflected delivery cannot consume original caster's counter`,()=>{
 const {e,f,t}=fixture(58,side,5);counter(e,t);e.addBuff(f,'counter',{...e.ability(t.i,2).mvp},2);const before=t.hp;press(e,side,0);advance(e,.55);near(t.hp,before);assert(e.buff(f,'counter'));assert(!e.buff(t,'counter'));assert.equal(e.logs.filter(x=>x.type==='spell_reflected').length,1);
 const second=services.routeTargetedSpell(e,{owner:t.i,target:f.i,abilityId:'night_stalker_void',originalOwner:f.i,reflected:true});assert.equal(second.owner,t.i);assert.equal(second.target,f.i);assert(e.buff(f,'counter'));
});
for(const side of[0,1])test(`Ignite reflected DOT retains origin/noReflect and serializes side${side}`,()=>{
 const {e,f,t}=fixture(82,side,5);counter(e,t);const seen=[];const resolve=e.resolveDamage.bind(e);e.resolveDamage=(...args)=>{const r=resolve(...args);seen.push({info:args[4],actual:r.actual});return r;};
 const hp=f.hp;press(e,side,1);advance(e,.45);const s=services.status(e,f,'ogre_magi_ignite');assert(s);assert.equal(s.owner,t.i);assert.equal(s.values.origin,f.i);assert.equal(s.values.reflected,true);assert(C56System.validateSnapshot(e,e.snapshot()));advance(e,1);near(hp-f.hp,50);assert(seen.some(x=>x.info.reflected&&x.info.noReflect&&x.info.noLifesteal&&x.actual===50));
 e.addBuff(f,'harness_immune',{debuffImmune:1},2);const before=f.hp;advance(e,1);near(f.hp,before);assert(services.status(e,f,'ogre_magi_ignite').life<7);
});
for(const side of[0,1])test(`point/directional breath and attack modifier don't consume counter side${side}`,()=>{
 const {e,f,t}=fixture(62,side,5);counter(e,t);press(e,side,0);advance(e,.6);assert(e.buff(t,'counter'));assert(services.status(e,t,'jakiro_dual_breath'));assert.equal(e.logs.filter(x=>x.type==='spell_reflected').length,0);assert.equal(DELIVERY_TAGS.jakiro_dual_breath.reflectable,false);
});
for(const side of[0,1])test(`Corrosive Weaponry reduces base only with night bonus side${side}`,()=>{
 const {e,f,t}=fixture(71,side,58);t.x=f.x+(side?-80:80);press(e,t.i,3);advance(e,.6);e.setInput(f.i,{attack:true});advance(e,.6);e.setInput(f.i,{});const s=services.status(e,t,'alchemist_corrosive_weaponry');assert(s);const base=e.hero(t.i).attack;near(C56System.attack(e,t,f,base),base*(1-s.values.attackReduction)+150);const expected=base*(1-s.values.attackReduction)+150,before=f.hp;e.setInput(t.i,{attack:true});advance(e,.35);e.setInput(t.i,{});near(before-f.hp,expected);e.addBuff(t,'harness_immune',{debuffImmune:1},2);near(C56System.attack(e,t,f,base),base+150);
});
test('strict reflection snapshot rejects unowned origin and fabricated flags',()=>{
 const {e,f,t}=fixture(58,0,5);counter(e,t);press(e,0,0);advance(e,.55);const snap=e.snapshot();for(const mutate of[s=>s.fighters[0].packModules.c56_90.statuses[0].values.origin=1,s=>s.fighters[0].packModules.c56_90.statuses[0].values.reflected=false,s=>s.fighters[0].packModules.c56_90.statuses[0].values.origin=99]){const bad=structuredClone(snap);mutate(bad);assert(!C56System.validateSnapshot(e,bad));assert.throws(()=>e.restoreSimulation(bad));}
});
test('single consumed counter does not silently redirect later independent multicast pulses',()=>{
 const {e,f,t}=fixture(82,0,5);counter(e,t);const hp=[f.hp,t.hp];press(e,0,0);advance(e,.55);near(f.hp,hp[0]-250);near(t.hp,hp[1]);advance(e,1.4);assert(t.hp<hp[1]);assert.equal(e.logs.filter(x=>x.type==='spell_reflected').length,1);
});
test('basic-physical counter is not spell reflection; unrelated buffs survive consumed Counterspell',()=>{
 const {e,f,t}=fixture(58,0,5);e.addBuff(t,'counter',{counter_type:'basic_physical'},2);const hp=t.hp;press(e,0,0);advance(e,.5);near(hp-t.hp,208);assert(e.buff(t,'counter'));
 const q=fixture(58,0,5);counter(q.e,q.t);q.e.addBuff(q.t,'harness_other',{move_bonus:12},2);press(q.e,0,0);advance(q.e,.5);assert(!q.e.buff(q.t,'counter'));assert(q.e.buff(q.t,'harness_other'));
});
for(const side of[0,1])test(`automatic Concoction throw reflects at impact, not at brew start side${side}`,()=>{
 const {e,f,t}=fixture(71,side,5);press(e,side,1);advance(e,4.65);counter(e,t);const hp=[f.hp,t.hp];advance(e,.5);near(hp[0]-f.hp,360);near(hp[1]-t.hp,0);assert(!e.buff(t,'counter'));assert.equal(e.logs.filter(x=>x.type==='spell_reflected').length,1);assert(e.controlRemaining(f,'stun')>0);
});
for(const side of[0,1])test(`Life Break routes the full timed charge/self-cost context once side${side}`,()=>{
 const {e,f,t}=fixture(57,side,5);counter(e,t);const hp=[f.hp,t.hp],cd=[...t.cd],mp=t.mp;const hits=[];const resolve=e.resolveDamage.bind(e);e.resolveDamage=(...args)=>{const r=resolve(...args);if(args[4]?.skill==='huskar_life_break')hits.push({source:args[0].i,target:args[1].i,info:args[4],r});return r;};
 press(e,side,3);advance(e,.31);assert(!e.buff(t,'counter'));assert(e.property(t,'debuffImmune'));assert(!e.property(f,'debuffImmune'));const job=services.world(e).jobs.find(j=>j.abilityId==='huskar_life_break');assert(job);assert.equal(job.owner,t.i);assert.equal(job.target,f.i);assert.equal(job.data.origin,f.i);assert.equal(job.data.reflected,true);const snap=e.snapshot();assert(C56System.validateSnapshot(e,snap));const resume=fixture(57,side,5).e;resume.restoreSimulation(snap);e.step();resume.step();assert.deepEqual(e.snapshot(),resume.snapshot());
 advance(e,.5);assert.equal(hits.length,1);assert.equal(hits[0].source,t.i);assert.equal(hits[0].target,f.i);assert(hits[0].info.noReflect&&hits[0].info.noLifesteal);near(hits[0].r.actual,hp[0]*.44);near(t.hp,hp[1]*.56);assert(t.mp>=mp);assert(t.cd[3]===cd[3]);near(Math.abs(f.x-t.x),60);assert.equal(e.logs.filter(l=>l.type==='spell_reflected').length,1);assert(C56System.validateSnapshot(e,e.snapshot()));
});
for(const side of[0,1])test(`already-applied reflected stun suppresses under later immunity without deleting control source side${side}`,()=>{
 const {e,f,t}=fixture(82,side,5);counter(e,t);press(e,side,0);advance(e,.5);assert(e.controlRemaining(f,'stun')>0);const c=e.packCore.controls.find(x=>x.target===f.i&&x.key==='ogre_magi_fireblast');assert(c);assert.equal(c.owner,t.i);e.addBuff(f,'harness_short_immunity',{debuffImmune:1},.15);assert.equal(e.controlRemaining(f,'stun'),0);advance(e,.2);assert(e.controlRemaining(f,'stun')>0);assert(e.packCore.controls.some(x=>x.id===c.id));
});
