import test from 'node:test';import assert from 'node:assert/strict';import {Engine} from '../src/engine.js';import {heroes} from '../src/data.js';import {World} from './integrity-harness.mjs';
const hi=id=>heroes.findIndex(h=>h.id===id),frames=(e,n)=>{for(let k=0;k<n;k++)e.step();};
const setup=(other='axe')=>{const e=new Engine(heroes,[hi('juggernaut'),hi(other)],{seed:8192}).start();e.fighters[0].x=300;e.fighters[1].x=1000;return e;};

for(const [heroIndex,h]of heroes.entries())for(const [slot,a]of h.abilities.entries())if(!a.mvp.passive)test(`${a.id}: skill press wins over simultaneous held basic attack`,()=>{
 const e=new Engine(heroes,[heroIndex,hi('axe')]).start();e.fighters[0].x=400;e.fighters[1].x=480;e.setInput(0,{attack:true,['s'+slot]:true});e.step();const f=e.fighters[0];assert(a.mvp.input==='charge'?f.chargeSlot===slot:f.casts===1);assert.equal(e.events.filter(x=>x.type==='attack'&&x.owner===0).length,0);assert.equal(f.guard,false);
});
test('skill input during a basic attack waits for recovery, survives key release and casts exactly once',()=>{
 const e=setup(),f=e.fighters[0];f.hp=1000;e.setInput(0,{attack:true});e.step();const recovery=f.recovery,mp=f.mp;e.setInput(0,{attack:true,s1:true});e.step();assert(f.skillBuffer);assert.equal(f.casts,0);assert(f.recovery>0&&f.recovery<recovery);assert(f.mp>=mp,'queued input does not charge early');
 e.setInput(0,{attack:true});frames(e,50);assert.equal(f.casts,1);const cast=e.logs.find(x=>x.type==='cast');assert(cast.frame>=14,'no free attack recovery cancellation');assert(e.logs.some(x=>x.type==='attack'&&x.frame<cast.frame),'committed attack resolves first');assert(e.zones.some(x=>x.type==='ward'));assert(f.hp>1000);
});
test('buffer expires during long control and input cancellation prevents a delayed ghost cast',()=>{
 const e=setup(),f=e.fighters[0];f.stun=1;e.setInput(0,{attack:true,s1:true});frames(e,30);assert.equal(f.casts,0);assert.equal(f.skillBuffer,null);assert(e.logs.some(x=>x.type==='skill_input_expired'));e.setInput(0,{});frames(e,40);assert.equal(f.casts,0);
 f.recovery=.2;e.setInput(0,{s1:true});e.step();assert(f.skillBuffer);e.cancelInput(0);frames(e,30);assert.equal(f.casts,0);assert.equal(f.chargeSlot,-1);
});
test('back defense follows a side switch immediately and does not grant defense to attack, cast, charge or recovery',()=>{
 const e=setup(),f=e.fighters[0],q=e.fighters[1];e.setInput(0,{left:true});e.step();assert(f.guard);q.x=f.x-100;e.updateGuard(f);assert.equal(f.guard,false);e.setInput(0,{right:true,down:true});e.step();assert(f.guard&&f.crouching);
 for(const condition of ['attack','skill','recovery','cast','channel','charge','air']){const x=setup(),p=x.fighters[0];x.setInput(0,{left:true,...(condition==='attack'?{attack:true}:condition==='skill'?{s1:true}:{})});if(condition==='recovery')p.recovery=.2;if(condition==='cast')p.cast={};if(condition==='channel')p.channel={};if(condition==='charge')p.chargeSlot=1;if(condition==='air')p.y=10;assert.equal(x.updateGuard(p),false,condition);}
});
test('legacy heavy, dash and guard commands cannot activate hidden player actions',()=>{const e=setup(),f=e.fighters[0],x=f.x;e.setInput(0,{heavy:true,dash:true,guard:true});frames(e,30);assert.equal(f.x,x);assert.equal(f.attackCd,0);assert.equal(f.guard,false);assert.equal(f.invuln,0);assert(!e.logs.some(x=>x.type==='attack'||x.type==='dash'));const a=setup(),b=setup();a.attack(0);b.attack(0,true);assert.equal(a.events[0].damage,b.events[0].damage);assert.equal(a.events[0].at,b.events[0].at);});
test('ward non-full HP heals on actual 0.2 second ticks using current maximum HP and snapshot synchronizes it',()=>{
 const e=setup(),f=e.fighters[0];f.maxHp=6500;f.hp=1000;e.setInput(0,{s1:true});frames(e,150);const heals=e.logs.filter(x=>x.type==='heal'&&x.skill==='juggernaut_healing_ward');assert.equal(heals.length,10);assert(heals.every(x=>x.amount===65));assert.equal(f.hp,1650);for(let i=1;i<heals.length;i++)assert.equal(heals[i].frame-heals[i-1].frame,12);const snap=e.snapshot();assert.equal(snap.fighters[0].hp,1650);assert.equal(snap.zones.find(x=>x.type==='ward').healed,650);
});
test('ward cannot heal outside its horizontal aura, resumes on following and expires after 120 ticks',()=>{
 const e=setup(),f=e.fighters[0];f.hp=1000;e.setInput(0,{s1:true});frames(e,20);const ward=e.zones.find(x=>x.type==='ward');assert(ward);f.x=1000;e.fighters[1].x=100;const before=f.hp;frames(e,60);assert.equal(f.hp,before);assert(ward.x>300&&ward.x<500,'official325 times0.55 movement');frames(e,240);assert(f.hp>before);frames(e,1300);assert(!e.zones.some(x=>x.type==='ward'));const end=e.logs.find(x=>x.type==='ward_end');assert(end);assert.equal(end.reason,'expired');assert.equal(end.ticks,120);
});
test('destroyed ward stops immediately and can never revive a defeated owner',()=>{
 for(const dead of [false,true]){const e=setup(),f=e.fighters[0];f.hp=dead?0:1000;e.zones.push({type:'ward',owner:0,x:f.x,life:0,tick:0,m:heroes[0].abilities[1].mvp,id:'juggernaut_healing_ward'});e.step();assert.equal(f.hp,dead?0:1000);assert(!e.logs.some(x=>x.type==='heal'));if(dead)assert.equal(e.phase,'roundEnd');}
});
test('ward ignores back-facing and high airborne melee swings but a grounded forward attack destroys it',()=>{
 for(const kind of ['behind','air','front']){const e=setup(),p=e.fighters[0],q=e.fighters[1];p.x=400;p.hp=1000;q.x=1000;e.setInput(0,{s1:true});frames(e,20);e.setInput(0,{});q.x=480;if(kind==='behind')p.x=800;if(kind==='air'){q.y=300;q.vy=0;}e.setInput(1,{attack:true});frames(e,10);assert.equal(e.zones.some(x=>x.type==='ward'),kind!=='front',kind);if(kind==='front'){const end=e.logs.find(x=>x.type==='ward_end');assert.equal(end.reason,'attack');assert(e.effects.some(x=>x.text==='守卫被摧毁'));}}
});
test('ranged basic attacks only destroy the ward when the projectile arrives',()=>{
 const e=setup('sniper'),p=e.fighters[0],q=e.fighters[1];p.x=400;q.x=800;e.setInput(0,{s1:true});frames(e,20);e.setInput(0,{});p.y=300;p.vy=0;e.setInput(1,{attack:true});frames(e,12);assert(e.zones.some(x=>x.type==='ward'));assert(e.projectiles.length>0);frames(e,35);assert(!e.zones.some(x=>x.type==='ward'));assert(e.logs.some(x=>x.type==='ward_end'&&x.reason==='attack'));
});
test('real app channel carries ward HP recovery to the observing peer without a separate local heal',()=>{
 const w=new World(),{host,guest}=w.pair();host.__audit.action('roomStart');w.flush();const e=host.DUEL.engine;e.start();e.fighters[0].hp=1000;e.fighters[1].x=1100;host.events.keydown({code:'KeyF',target:{},preventDefault(){}});host.events.keydown({code:'KeyE',target:{},preventDefault(){}});for(let n=1;n<=150;n++){w.now=n*17;host.__audit.loop(w.now);w.flush();}assert(e.fighters[0].hp>1000);assert.equal(guest.DUEL.engine,null);assert.equal(guest.DUEL.snapshot.fighters[0].hp,e.fighters[0].hp);assert(guest.DUEL.snapshot.zones.some(x=>x.type==='ward'));
});
