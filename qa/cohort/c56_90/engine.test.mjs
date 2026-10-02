import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,advance,ready,basic,rejectedRealEngine} from './fixture.mjs';
import {PACKS,BLOCKED_PACKS} from '../../../src/hero-packs/c56_90/index.js';
import {C56System,services,applyEnchantSlow} from '../../../src/hero-packs/c56_90/system.js';
import {createPackDispatcher} from '../../../src/pack-dispatcher.js';
const near=(a,b)=>assert(Math.abs(a-b)<1e-6,`${a} != ${b}`);
const own=(e,f)=>services.fighter(e,f).data;
const positives=(e,f)=>services.fighter(e,f).statuses.filter(s=>!s.hostile);
const healthHarness=f=>{f.hp=10000;f.maxHp=10000;f.healBudget=100000;};
for(const pack of PACKS)for(const side of [0,1])for(let slot=0;slot<4;slot++){
 test(`HARNESS real Engine ${pack.definition.registryNumericId} side${side} slot${slot} cast/passive/restore`,()=>{
  const {e,f,t}=fixture(pack.definition.registryNumericId,side);f.mp=f.maxMp=5000;healthHarness(t);
  const a=e.ability(side,slot),before=e.snapshot();
  if(a.mvp.passive){assert.equal(e.cast(side,slot),false);assert.deepEqual(e.snapshot(),before);return;}
  assert.equal(e.cast(side,slot),true);advance(e,1.25);assert(e.logs.some(l=>l.type==='activate'&&l.skill===a.id));
  const snap=e.snapshot();assert(C56System.validateSnapshot(e,snap));const resumed=fixture(pack.definition.registryNumericId,side).e;resumed.restoreSimulation(snap);e.step();resumed.step();assert.deepEqual(resumed.snapshot(),e.snapshot());
 });
}
for(const pack of BLOCKED_PACKS)test(`reserved ${pack.definition.registryNumericId}: refuses real registration`,()=>{assert(pack.contract.requiresCapabilities.length>0);assert.throws(()=>rejectedRealEngine(pack),/Missing public pack capability/);assert.equal(pack.definition.activeUnlock,false);});
test('B preaudit Enchant slow suspends during immunity, ages, resumes; no purge claim',()=>{
 const {e,f,t}=fixture(57);assert(applyEnchantSlow(e,f,t));near(C56System.moveMultiplier(e,t),.4);const initial=services.status(e,t,'enchantress_enchant');assert.equal(initial.values.polarity,'hostile');assert.equal(initial.owner,f.i);assert.equal(initial.pierces,false);
 e.addBuff(t,'harness_immune',{debuffImmune:1},1);near(C56System.moveMultiplier(e,t),1);advance(e,.5);assert(services.status(e,t,'enchantress_enchant').life<4.51);near(C56System.moveMultiplier(e,t),1);advance(e,.55);near(C56System.moveMultiplier(e,t),.4);advance(e,4.1);near(C56System.moveMultiplier(e,t),1);
});
test('positive Bloodlust works during immunity and serializes polarity separately',()=>{const {e,f}=fixture(82);e.addBuff(f,'harness_immune',{debuffImmune:1},3);assert(e.cast(f.i,2));advance(e,.5);near(C56System.moveMultiplier(e,f),1.12);const b=positives(e,f)[0];assert.equal(b.polarity,'positive');assert.equal(b.owner,f.i);assert.equal(b.pierces,false);assert(C56System.validateSnapshot(e,e.snapshot()));});
test('existing DOT consumes suppressed ticks without catch-up; piercing is not invulnerability bypass',()=>{
 const {e,f,t}=fixture(62);assert(e.cast(0,2));advance(e,.25);basic(e,f,t);e.hitstop=0;const hp=t.hp;e.addBuff(t,'harness_immune',{debuffImmune:1},1.1);advance(e,1.05);near(t.hp,hp);advance(e,.5);near(hp-t.hp,24);
 const piercing=services.applyStatus(e,t,{key:'harness_piercing',owner:f.i,duration:1,values:{abilityId:'treant_overgrowth',hostile:true,polarity:'hostile',dps:95},pierces:true,interval:.5});assert(piercing);t.invuln=1;const before=t.hp;advance(e,.6);near(t.hp,before);assert.equal(services.applyStatus(e,t,{key:'harness_rejected',owner:f.i,duration:1,pierces:true}),null);
});
test('Huskar nonlethal cost, finite independent DOT stacks, passive break and no passive casts',()=>{
 const {e,f,t}=fixture(57);healthHarness(t);f.hp=1;assert(e.cast(0,0));advance(e,.4);assert(f.hp>0);assert(t.hp<10000);assert(e.isSilenced(t));ready(f);assert(e.cast(0,1));advance(e,.25);
 for(let i=0;i<40;i++)basic(e,f,t,0);assert.equal(services.fighter(e,t).statuses.filter(s=>s.values.abilityId==='huskar_burning_spear').length,32);assert(f.hp>0);assert.equal(e.cast(0,2),false);
});
test('Huskar Life Break actual debit and core body separation after e.move',()=>{
 const {e,f,t}=fixture(57);const hp=t.hp;assert(e.cast(0,3));advance(e,.32);assert(e.property(f,'debuffImmune'));assert(services.world(e).jobs.length);advance(e,.5);assert(!positiveLife());near(t.hp,hp*(1-.44));near(Math.abs(f.x-t.x),60);assert(services.status(e,t,'huskar_life_break'));function positiveLife(){return positives(e,f).some(x=>x.key==='huskar_life_break');}
});
test('Night Stalker day/night duration, attack bonus, heal, fear exits immediately',()=>{
 const {e,f,t}=fixture(58);assert(e.cast(0,0));advance(e,.31);assert(services.status(e,t,'night_stalker_void').life<=1.25);ready(f);assert(e.cast(0,3));advance(e,.31);near(C56System.attack(e,f,t,100),250);ready(f);assert(e.cast(0,0));advance(e,.31);assert(services.status(e,t,'night_stalker_void').life>3);f.hp-=100;const before=f.hp;basic(e,f,t);near(f.hp-before,24);ready(f);assert(e.cast(0,1));advance(e,.2);assert(e.isSilenced(t));t.x=1100;e.step();assert(!e.isSilenced(t));
});
test('Jakiro ice delay and one contact, Macropyre does not reset periodic burn clock',()=>{
 const {e,f,t}=fixture(62);healthHarness(t);f.mp=f.maxMp=5000;assert(e.cast(0,1));advance(e,.8);near(t.hp,10000);advance(e,.1);near(t.hp,9950);assert(t.stun<=1.5);advance(e,1);near(t.hp,9950);ready(f);f.mp=5000;assert(e.cast(0,3));const hp=t.hp;advance(e,3);assert(hp-t.hp>=400);assert(hp-t.hp<=600);
});
test('Alchemist armor applied once through sharedArmor, brew target/self branches and regen',()=>{
 const {e,f,t}=fixture(71);healthHarness(t);f.mp=f.maxMp=5000;assert(e.cast(0,0));advance(e,1.2);const lost=10000-t.hp;near(lost,40*(1+.36/1.36));ready(f);assert(e.cast(0,1));t.x=1155;const before=f.hp;advance(e,5.6);assert(f.hp<before);assert(f.stun>0);ready(f);f.stun=0;f.ccChain=0;f.hp=100;assert(e.cast(0,3));advance(e,1);near(f.hp,220);
});
test('Treant seed uses actual debit capped at victim HP, guard false required, shield zero refuses heal',()=>{
 const {e,f,t}=fixture(81);f.hp=100;own(e,f).seed=true;t.hp=8;basic(e,f,t,100);const jobs=services.world(e).jobs;assert.equal(jobs.length,2);near(jobs[0].data.amount,47);assert.equal(own(e,f).seed,false);
 const z=fixture(81);z.f.hp=100;own(z.e,z.f).seed=true;z.e.setInput(1,{right:true});z.e.basicHit(z.f,z.t,{id:99,damage:100,m:{damage_type:'physical',blockable:true}});assert.equal(services.world(z.e).jobs.length,0);assert.equal(own(z.e,z.f).seed,true);
 const q=fixture(81,0,100);q.t.pack.borrowed=2;q.t.hp=600;own(q.e,q.f).seed=true;basic(q.e,q.f,q.t,200);assert.equal(services.world(q.e).jobs.length,0);assert.equal(own(q.e,q.f).seed,true);
});
test('Treant Living Armor consumed once per actual pipeline and overgrowth pierces immunity',()=>{
 const {e,f,t}=fixture(81);assert(e.cast(0,2));advance(e,.31);const hp=f.hp;const r=services.damageResult(e,t.i,f,200,{type:'pure',abilityId:'harness'});near(r.actual,80);near(hp-f.hp,80);near(positives(e,f)[0].values.block,100);ready(f);e.addBuff(t,'harness_immune',{debuffImmune:1},10);assert(e.cast(0,3));advance(e,.51);assert(services.effective(e,t,'treant_overgrowth'));assert(t.root>0);assert(C56System.disarmed(e,t));C56System.dispel(e,t,'basic');assert(services.status(e,t,'treant_overgrowth'));C56System.dispel(e,t,'strong');assert(!services.status(e,t,'treant_overgrowth'));
});
test('Ogre seed deterministic multicasts and delayed Ignite refreshes without stacking',()=>{
 const a=fixture(82),b=fixture(82);for(const q of[a,b]){healthHarness(q.t);q.f.mp=q.f.maxMp=5000;assert(q.e.cast(0,0));advance(q.e,2.5);}assert.deepEqual(a.e.snapshot(),b.e.snapshot());assert(10000-a.t.hp>=250);ready(a.f);assert(a.e.cast(0,1));advance(a.e,2.5);assert.equal(services.fighter(a.e,a.t).statuses.filter(s=>s.key==='ogre_magi_ignite').length,1);
});
test('cast rejects bad aim/resources/target before RNG costs, self spells accept immune enemy',()=>{
 const {e,f,t}=fixture(82);const initial=e.snapshot();t.invuln=1;const before=e.snapshot();assert.equal(e.cast(0,0),false);assert.deepEqual(e.snapshot(),before);assert(e.cast(0,2));
 const q=fixture(62);const b=q.e.snapshot();assert.equal(q.e.cast(0,1,{aim:NaN}),false);assert.deepEqual(q.e.snapshot(),b);
});
test('pause/hitstop/intro freeze namespaced status and jobs; death cancels owner state exactly once',()=>{
 const {e,f,t}=fixture(62);f.mp=f.maxMp=5000;assert(e.cast(0,3));advance(e,.45);const ns=()=>JSON.stringify([services.world(e),services.fighter(e,t)]);e.paused=true;const before=ns();for(let i=0;i<60;i++)e.step();assert.equal(ns(),before);e.paused=false;e.hitstop=.1;const h=ns();e.step();assert.equal(ns(),h);f.hp=0;C56System.endStep(e);const rev=services.world(e).revisions[0];assert.equal(services.world(e).entities.length,0);C56System.endStep(e);assert.equal(services.world(e).revisions[0],rev);
});
test('strict snapshot rejects unknown field, status ability spoof, NaN, duplicate buff, job opcode',()=>{
 const {e,f,t}=fixture(82);assert(e.cast(0,2));advance(e,.5);const good=e.snapshot();assert(C56System.validateSnapshot(e,good));
 for(const mutate of [s=>s.fighters[0].packModules.c56_90.data.hp=999,s=>s.fighters[0].packModules.c56_90.statuses[0].life=NaN,s=>s.fighters[0].packModules.c56_90.statuses.push({...s.fighters[0].packModules.c56_90.statuses[0]}),s=>s.fighters[0].packModules.c56_90.statuses[0].polarity='hostile']){const bad=structuredClone(good);mutate(bad);assert(!C56System.validateSnapshot(e,bad));assert.throws(()=>e.restoreSimulation(bad));}
});
test('actual left/right input paths dispatch fixed slots, no pages and no passive fallback',()=>{for(const side of[0,1]){const {e,f}=fixture(58,side);e.setInput(side,{s3:true});advance(e,.4);assert(positives(e,f).some(b=>b.key==='night_stalker_darkness'));e.setInput(side,{});advance(e,.5);const before=f.casts;e.setInput(side,{s2:true});e.step();assert.equal(f.casts,before);}});
test('Viper core4 break suppresses Huskar passive regen and attack acceleration in the real dispatcher',()=>{
 const {e,f,t}=fixture(57,0,45);f.hp=f.maxHp*.2;const fast=e.packCombat.attackInterval(e,f,t,e.hero(0).attack_interval_s);assert(fast<e.hero(0).attack_interval_s);assert(e.cast(1,3));advance(e,.8);assert.equal(e.passivesEnabled(f),false);near(C56System.attackInterval(e,f,t,e.hero(0).attack_interval_s),e.hero(0).attack_interval_s);const hp=f.hp;advance(e,.1);assert(f.hp<=hp);
});
test('partial zero-damage Living Armor shield consumes seed only on actual positive debit',()=>{
 const {e,f,t}=fixture(81,0,81);own(e,f).seed=true;assert(e.cast(1,2));advance(e,.31);basic(e,f,t,100);assert.equal(services.world(e).jobs.length,0);assert(own(e,f).seed);basic(e,f,t,200);assert.equal(services.world(e).jobs.length,2);near(services.world(e).jobs[0].data.amount,70);
});
test('ongoing silence and attack-speed slow suspend during immunity; positive buffs keep running',()=>{
 const {e,f,t}=fixture(57,0,82);assert(e.cast(0,0));advance(e,.36);assert(e.isSilenced(t));e.addBuff(t,'harness_immune',{debuffImmune:1},1);assert(!e.isSilenced(t));ready(t);assert(e.cast(1,2));advance(e,.5);near(C56System.moveMultiplier(e,t),1.12);assert(positives(e,t).length);advance(e,.6);assert(e.isSilenced(t));
});
test('failed cast leaves seeded RNG, mana, cooldown, and pack state unchanged',()=>{
 const {e,f,t}=fixture(82);t.x=1155;const before=e.snapshot();assert.equal(e.cast(0,0),false);assert.deepEqual(e.snapshot(),before);f.mp=0;const empty=e.snapshot();assert.equal(e.cast(0,2),false);assert.deepEqual(e.snapshot(),empty);
});
test('harness effect and status serialization preserves hostile/positive owner and pierces flags',()=>{
 const {e,f,t}=fixture(81);f.mp=f.maxMp=5000;assert(e.cast(0,3));advance(e,.6);const s=JSON.parse(JSON.stringify(e.snapshot()));const n=s.fighters[t.i].packModules.c56_90.statuses[0];assert.equal(n.values.polarity,'hostile');assert.equal(n.owner,0);assert.equal(n.pierces,true);assert(C56System.validateSnapshot(e,s));
});
for(const pack of PACKS)for(const side of [0,1])for(let slot=0;slot<4;slot++)test(`input→step ${pack.definition.registryNumericId} side${side} slot${slot}`,()=>{
 const {e,f,t}=fixture(pack.definition.registryNumericId,side);healthHarness(t);f.mp=f.maxMp=5000;const a=e.ability(side,slot);e.setInput(side,{['s'+slot]:true});advance(e,1.25);e.setInput(side,{});assert.equal(f.casts,a.mvp.passive?0:1);assert.equal(e.logs.some(l=>l.type==='activate'&&l.skill===a.id),!a.mvp.passive);assert(C56System.validateSnapshot(e,e.snapshot()));
});
test('ABI2.1 own polarity dispel preserves hostile on purge and positive on cleanse',()=>{
 const {e,f,t}=fixture(82,0,57);assert(e.cast(0,2));advance(e,.5);assert(e.cast(1,0));advance(e,.4);assert(services.status(e,f,'huskar_inner_fire'));assert(positiveBlood());C56System.dispel(e,f,'basic',{hostile:false});assert(!positiveBlood());assert(services.status(e,f,'huskar_inner_fire'));C56System.dispel(e,f,'basic',{hostile:true});assert(!services.status(e,f,'huskar_inner_fire'));function positiveBlood(){return services.effective(e,f,'ogre_magi_bloodlust');}
});
test('Enchant remains blocked: per-namespace typed purge is not a cross-system legacy purge API',()=>{const p=BLOCKED_PACKS.find(p=>p.definition.registryNumericId===56);assert(p.contract.requiresCapabilities.includes('positive-buff-purge'));assert.throws(()=>createPackDispatcher([p]),/Missing public pack capability/);});
test('pending owned casts pin canonical four-slot identity and reject injected multicast/profile',()=>{
 const {e}=fixture(82);assert(e.cast(0,0));const snap=e.snapshot();assert(C56System.validateSnapshot(e,snap));for(const mutate of[s=>s.fighters[0].cast.multicast=40,s=>s.fighters[0].cast.m.damage=9999,s=>s.fighters[0].cast.slot=3]){const bad=structuredClone(snap);mutate(bad);assert(!C56System.validateSnapshot(e,bad));assert.throws(()=>e.restoreSimulation(bad));}
});
