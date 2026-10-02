import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {heroes} from '../src/data.js';
const run=(e,sec)=>{for(let n=0;n<Math.ceil(sec*60);n++)e.step(1/60);};
const engine=(ids=[0,3],mode='local')=>new Engine(heroes,ids,{mode,seed:123}).start();
const near=e=>{e.fighters[0].x=500;e.fighters[1].x=565;return e;};
const stats=e=>e.fighters.map(f=>({x:f.x,hp:f.hp,mp:f.mp}));

test('20 unique heroes and 80 complete abilities',()=>{
 assert.equal(heroes.length,20);assert.equal(new Set(heroes.map(h=>h.id)).size,20);
 const ids=[];for(const h of heroes){assert.equal(h.abilities.length,4);for(const a of h.abilities){ids.push(a.id);assert.ok(a.name);assert.ok(a.mvp);}}
 assert.equal(new Set(ids).size,80);
});
test('both humans move independently with no CPU fallback',()=>{
 const e=engine();const [a,b]=stats(e);run(e,1);assert.deepEqual(stats(e).map(f=>f.x),[a.x,b.x]);
 e.setInput(0,{right:true});e.setInput(1,{left:true});run(e,.5);
 assert.ok(e.fighters[0].x>a.x);assert.ok(e.fighters[1].x<b.x);
 const stopped=stats(e);e.setInput(0,{});e.setInput(1,{});run(e,.5);assert.deepEqual(stats(e).map(f=>f.x),stopped.map(f=>f.x));
});
test('both humans can damage one another',()=>{
 for(const attacker of [0,1]){const e=near(engine([0,0]));const hp=e.fighters[1-attacker].hp;e.setInput(attacker,{attack:true});run(e,.3);assert.ok(e.fighters[1-attacker].hp<hp);assert.ok(e.fighters[attacker].hp===e.fighters[attacker].maxHp);}
});
test('distance, vertical separation, invulnerability prevent invalid basic hits',()=>{
 const far=engine();far.setInput(0,{attack:true});run(far,.3);assert.equal(far.fighters[1].hp,far.fighters[1].maxHp);
 const air=near(engine());air.fighters[1].y=400;air.setInput(0,{attack:true});run(air,.2);assert.equal(air.fighters[1].hp,air.fighters[1].maxHp);
 const inv=near(engine());inv.fighters[1].invuln=1;inv.setInput(0,{attack:true});run(inv,.3);assert.equal(inv.fighters[1].hp,inv.fighters[1].maxHp);
});
test('guard reduces damage and chip cannot kill',()=>{
 const a=near(engine([0,0])),b=near(engine([0,0]));b.setInput(1,{right:true,down:true});a.setInput(0,{attack:true});b.setInput(0,{attack:true});run(a,.3);run(b,.3);
 assert.ok(b.fighters[1].hp>a.fighters[1].hp);assert.ok(b.fighters[1].hp<b.fighters[1].maxHp);
 b.fighters[1].hp=1;run(b,1);assert.equal(b.fighters[1].hp,1);
});
test('jump lands and repeated held jump does not launch indefinitely',()=>{
 const e=engine();e.setInput(0,{jump:true});run(e,.3);assert.ok(e.fighters[0].y>0);run(e,1.5);assert.equal(e.fighters[0].y,0);
 e.setInput(0,{});run(e,.02);e.setInput(0,{jump:true});run(e,.2);assert.ok(e.fighters[0].y>0);
});
test('pause halts game clock, cooldown, movement and damage',()=>{
 const e=near(engine());e.setInput(0,{right:true,attack:true});e.paused=true;const before=e.snapshot();run(e,3);assert.deepEqual(e.snapshot(),before);
});
test('collision and arena bounds survive repeated movement',()=>{
 const e=engine();e.setInput(0,{right:true});e.setInput(1,{left:true});run(e,5);assert.ok(Math.abs(e.fighters[1].x-e.fighters[0].x)>=59.99);
 e.setInput(0,{left:true});e.setInput(1,{right:true});run(e,20);for(const f of e.fighters)assert.ok(f.x>=45&&f.x<=1155);
});
test('cooldown, mana, silence and stun gate skill casts',()=>{
 const e=engine();const p=e.fighters[0],m=heroes[0].abilities[0].mvp;
 p.mp=0;assert.equal(e.cast(0,0),false);p.mp=p.maxMp;p.silence=1;assert.equal(e.cast(0,0),false);p.silence=0;p.stun=1;assert.equal(e.cast(0,0),false);p.stun=0;
 assert.equal(e.cast(0,0),true);assert.equal(p.mp,p.maxMp-m.mana);assert.equal(p.cd[0],m.cooldown_s);assert.equal(e.cast(0,0),false);
});
test('best-of-three round transition cleans combat state',()=>{
 const e=engine();e.fighters[1].hp=0;run(e,.02);assert.equal(e.phase,'roundEnd');assert.deepEqual(e.score,[1,0]);run(e,3.1);assert.equal(e.round,2);assert.equal(e.phase,'intro');assert.equal(e.fighters[1].hp,e.fighters[1].maxHp);assert.equal(e.events.length,0);assert.equal(e.projectiles.length,0);run(e,2.4);
 e.fighters[1].hp=0;run(e,.02);run(e,3.1);assert.equal(e.phase,'matchEnd');assert.deepEqual(e.score,[2,0]);const before=e.snapshot();run(e,3);assert.deepEqual(e.snapshot(),before);
});
test('timeout compares health percentages and draw gives no point',()=>{
 const e=engine();e.time=.001;run(e,.02);assert.equal(e.winner,-1);assert.deepEqual(e.score,[0,0]);
 const w=engine();w.fighters[1].hp=w.fighters[1].maxHp*.9;w.time=.001;run(w,.02);assert.equal(w.winner,0);
});
test('all 80 skills and passive classifications survive valid activation without NaN',()=>{
 for(let h=0;h<heroes.length;h++)for(let slot=0;slot<4;slot++){
  const a=heroes[h].abilities[slot],e=near(engine([h,3]));const p=e.fighters[0];p.hp*=.5;e.fighters[1].mp*=.5;e.setInput(0,{['s'+slot]:true});
  const ok=e.cast(0,slot,{charge:.8,aim:e.fighters[1].x});assert.equal(ok,!a.mvp.passive,a.id+' activation');
  run(e,Math.min(16,(a.mvp.startup_frames||0)/60+(a.mvp.duration_s||0)+2));
  for(const f of e.fighters){for(const [key,value] of Object.entries(f))if(typeof value==='number')assert.ok(Number.isFinite(value),`${a.id} ${key} finite`);assert.ok(f.hp>=0&&f.hp<=f.maxHp);assert.ok(f.mp>=0&&f.mp<=f.maxMp);}
 }
});
test('seeded repeated two-player mixed-input stress: every hero, no exceptions',()=>{
 for(let h=0;h<heroes.length;h++){const e=engine([h,(h+7)%20]);let seed=100+h;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let n=0;n<2400;n++){if(n%9===0)for(let p=0;p<2;p++){const x={};for(const key of ['left','right','jump','attack','heavy','guard','dash','s0','s1','s2','s3'])x[key]=rnd()<.2;e.setInput(p,x);}e.step(1/60);for(const f of e.fighters)assert.ok(Number.isFinite(f.hp)&&Number.isFinite(f.mp)&&Number.isFinite(f.x)&&f.hp>=0&&f.mp>=0,heroes[h].id);}
 }
});
