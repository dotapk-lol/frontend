import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {heroes} from '../src/data.js';
const run=(e,sec)=>{for(let n=0;n<Math.ceil(sec*60);n++)e.step(1/60);};
const hi=id=>heroes.findIndex(h=>h.id===id);
const arena=(id,slot,dist=80)=>{const e=new Engine(heroes,[hi(id),hi('juggernaut')],{seed:42}).start();e.time=999;const [p,q]=e.fighters;p.x=400;q.x=400+dist;p.hp=p.maxHp*.5;q.hp=q.maxHp=50000;q.mp=q.maxMp*.5;return {e,p,q,a:heroes[hi(id)].abilities[slot]};};
const start=(r,slot)=>{r.e.setInput(0,{['s'+slot]:true});r.e.previous[0]={['s'+slot]:true};assert.equal(r.e.cast(0,slot,{charge:r.a.mvp.charge_max_s||1,aim:r.q.x}),true,r.a.id+' cast');};
const damageLogs=(e,player=0)=>e.logs.filter(l=>l.type==='hit'&&l.player===player);
const oneAttack=(e,p=0)=>{const f=e.fighters[p];f.attackCd=0;f.recovery=0;assert.equal(e.attack(p),true);run(e,.55);};

// Each non-passive skill has a specific effect-category assertion. Additional tests below
// audit mechanically important compounds, passive triggers, and interrupt/termination paths.
for(const h of heroes)for(let slot=0;slot<4;slot++){
 const a=h.abilities[slot];if(a.mvp.passive)continue;
 test(`${a.id}: meaningful ${a.mvp.effect} behavior`,()=>{
  const r=arena(h.id,slot,a.mvp.effect==='pull'?180:80),{e,p,q}=r,m=a.mvp;const hp=p.hp,qhp=q.hp,mp=p.mp,qmp=q.mp,px=p.x,qx=q.x;
  if(m.effect==='drain')p.mp=200;
  start(r,slot);
  const active=(m.startup_frames||0)/60+.06;run(e,active);
  const early={buffs:p.buffs.map(b=>b.key),channel:!!p.channel,zones:e.zones.map(z=>z.type),root:q.root,hex:q.hex,taunt:q.taunt,invuln:p.invuln,cast:p.cast,projectiles:e.projectiles.length};
  run(e,Math.max(.5,Math.min(16,(m.duration_s||0)+1)));
  switch(m.effect){
   case 'aura': assert.ok(q.hp<qhp,'aura damage');if(m.self_damage_per_tick)assert.ok(p.hp<hp,'self damage');break;
   case 'ward':case 'heal':assert.ok(p.hp>hp,'heals');assert.ok(p.hp<=p.maxHp,'bounded heal');break;
   case 'blink':case 'leap':assert.ok(Math.abs(p.x-px)>20,'meaningful relocation');break;
   case 'leap_hit':case 'dash_hit':assert.ok(Math.abs(p.x-px)>10,'relocation');assert.ok(q.hp<qhp,'hit while moving');break;
   case 'blink_strike':assert.ok(Math.abs(p.x-q.x)<100,'closes distance');assert.ok(early.buffs.length>0,'attack boost');break;
   case 'drain':assert.ok(q.mp<qmp,'drains target mana');assert.ok(p.mp>200-(m.mana||0),'restores caster mana');break;
   case 'root':assert.ok(early.root>0,'root status');assert.equal(q.hex,0);assert.ok(q.hp<qhp,'damage-over-time');break;
   case 'hex':assert.ok(early.hex>0,'hex status');break;
   case 'taunt':assert.ok(early.taunt>0,'taunt status');assert.ok(p.hp<hp,'forced attacks hit taunter');break;
   case 'pull':assert.ok(Math.abs(q.x-p.x)<Math.abs(qx-px),'pull reduces distance');break;
   case 'counter':case 'buff':assert.ok(early.buffs.length>0,'active buff exists');break;
   case 'wall':assert.ok(early.zones.includes('wall'),'wall exists');assert.ok(q.hp<qhp,'fissure damages');break;
   case 'wave':if(m.damage>0)assert.ok(q.hp<qhp,'wave damages');else assert.ok(q.x!==qx||damageLogs(e).length>0,'control wave affects opponent');break;
   default:if(m.damage===0&&m.stun_s)assert.ok(e.logs.some(l=>l.type==='control'),'non-damaging skill applies control');else assert.ok(q.hp<qhp,'offensive skill does damage');
  }
  for(const f of [p,q])for(const [key,value]of Object.entries(f))if(typeof value==='number')assert.ok(Number.isFinite(value),key+' finite');
 });
}

test('Meat Hook: projectile has travel time, pulls a far enemy and does not tunnel at dt=.05',()=>{
 const r=arena('pudge',0,400),{e,p,q}=r;start(r,0);run(e,(r.a.mvp.startup_frames||0)/60+.01);const hp=q.hp;assert.equal(q.hp,hp);assert.ok(Math.abs(q.x-p.x)>300);
 for(let n=0;n<50;n++)e.step(.05);assert.ok(q.hp<hp);assert.ok(Math.abs(q.x-p.x)<150);
});
test('channels stop on key release and hard interrupt',()=>{
 for(const id of ['crystal_maiden','witch_doctor'])for(const kind of ['release','stun']){
 const r=arena(id,3),{e,p,q}=r;start(r,3);run(e,(r.a.mvp.startup_frames||0)/60+.6);assert.ok(p.channel);assert.ok(damageLogs(e).length>0);
 if(kind==='release')e.setInput(0,{});else e.control(p,'stun',1);run(e,.1);assert.equal(p.channel,null);const hp=q.hp;run(e,2);assert.equal(q.hp,hp,id+' '+kind+' causes no later channel damage');}
});
test('Frostbite roots movement and basic attacks but still permits non-mobility spell casts',()=>{
 const r=arena('crystal_maiden',1),{e,q}=r;start(r,1);run(e,(r.a.mvp.startup_frames||0)/60+.08);assert.ok(q.root>0);const x=q.x;e.setInput(1,{right:true,attack:true,jump:true});run(e,.2);assert.equal(q.x,x);assert.equal(q.y,0);assert.equal(q.attackCd,0);assert.equal(e.cast(1,0),true,'root is not silence');
});
test('DoT expires without continuing damage',()=>{
 const r=arena('queen_of_pain',0),{e,q}=r;start(r,0);run(e,(r.a.mvp.startup_frames||0)/60+(r.a.mvp.duration_s||0)+3);assert.ok(q.hp<q.maxHp);assert.equal(q.dots.length,0);const hp=q.hp;run(e,4);assert.equal(q.hp,hp);
});
test('Healing Ward is destroyed by one enemy basic attack',()=>{
 const r=arena('juggernaut',1),{e,p,q}=r;start(r,1);run(e,(r.a.mvp.startup_frames||0)/60+.1);assert.ok(e.zones.some(z=>z.type==='ward'));oneAttack(e,1);assert.ok(!e.zones.some(z=>z.type==='ward'&&z.life>0));
});
test('Omnislash invulnerability prevents incoming damage during active slashes',()=>{
 const r=arena('juggernaut',3),{e,p,q}=r;start(r,3);run(e,(r.a.mvp.startup_frames||0)/60+.08);assert.ok(p.invuln>0);const hp=p.hp;e.hit(q,p,1000,{damage_type:'pure'});assert.equal(p.hp,hp);run(e,(r.a.mvp.duration_s||0)+2);assert.equal(p.invuln,0);
});
test('Mana Void damage grows with missing target mana',()=>{
 const damages=[];for(const fraction of [0,.8]){const r=arena('anti_mage',3),{e,q}=r;q.mp=q.maxMp*(1-fraction);start(r,3);run(e,2);damages.push(q.maxHp-q.hp);}assert.ok(damages[1]>damages[0]);
});
test('Windrun evades basic attacks but allows magic damage',()=>{
 const r=arena('windranger',2),{e,p,q}=r;start(r,2);run(e,(r.a.mvp.startup_frames||0)/60+.05);const hp=p.hp;e.hit(q,p,100,{damage_type:'physical'},{basic:true});assert.equal(p.hp,hp);e.hit(q,p,100,{damage_type:'magical'});assert.ok(p.hp<hp);
});
test('Powershot charged hit exceeds a tap hit',()=>{
 const damages=[];for(const c of [0,1]){const r=arena('windranger',1),{e,q}=r;e.cast(0,1,{charge:c});run(e,3);damages.push(q.maxHp-q.hp);}assert.ok(damages[1]>damages[0]);
});
test('Gust silence blocks spells while movement and attacks remain possible',()=>{
 const r=arena('drow_ranger',1),{e,q}=r;start(r,1);run(e,(r.a.mvp.startup_frames||0)/60+.4);assert.ok(q.silence>0);assert.equal(e.cast(1,0),false);q.recovery=0;assert.equal(e.attack(1),true);const x=q.x;e.setInput(1,{right:true});run(e,.4);assert.ok(q.x>x);
});

test('Blade Dance produces stronger critical basic attacks',()=>{
 const r=arena('juggernaut',2),{e,p,q}=r;let ds=[];for(let n=0;n<20;n++){p.x=400;q.x=465;const hp=q.hp;oneAttack(e);ds.push(hp-q.hp);}assert.ok(Math.max(...ds)>Math.min(...ds)*1.2);
});
test('Arcane Aura mana recovery exceeds a standard hero',()=>{
 const r=arena('crystal_maiden',2),normal=arena('juggernaut',2);r.p.mp=normal.p.mp=100;run(r.e,2);run(normal.e,2);assert.ok(r.p.mp>normal.p.mp);
});
test('Counter Helix retaliates after incoming attacks',()=>{
 const r=arena('axe',2),{e,p,q}=r;const hp=q.hp;for(let n=0;n<8;n++){p.x=400;q.x=465;oneAttack(e,1);}assert.ok(q.hp<hp);
});
test('Headshot causes enhanced damage and knockback on a subset of attacks',()=>{
 const r=arena('sniper',1),{e,p,q}=r;const amounts=[],distances=[];for(let n=0;n<20;n++){p.x=400;q.x=565;const hp=q.hp;oneAttack(e);amounts.push(hp-q.hp);distances.push(q.x-565);}assert.ok(Math.max(...amounts)>Math.min(...amounts));assert.ok(Math.max(...distances)>Math.min(...distances));
});
test('Mana Break removes enemy mana and adds physical damage',()=>{
 const r=arena('anti_mage',0),{e,q}=r;const mp=q.mp;oneAttack(e);assert.ok(q.mp<mp);assert.ok(q.hp<q.maxHp);
});
test('Marksmanship supplies additional ranged damage outside its disable radius',()=>{
 const damages=[];for(const dist of [80,320]){const r=arena('drow_ranger',3,dist),{e,p,q}=r;let dmg=0;for(let n=0;n<30;n++){p.x=400;q.x=400+dist;const hp=q.hp;oneAttack(e);dmg+=hp-q.hp;}damages.push(dmg);}assert.ok(damages[1]>damages[0]);
});
test('Fiery Soul stacks only after damaging spell hits and boosts attack speed',()=>{
 const r=arena('lina',2),{e,p}=r;assert.ok(!e.buff(p,'fiery'));e.cast(0,0);run(e,1);assert.ok(e.buff(p,'fiery'));assert.ok(e.buff(p,'fiery').m.stacks>0);p.recovery=0;p.attackCd=0;assert.equal(e.attack(0),true);assert.ok(p.attackCd<heroes[hi('lina')].attack_interval_s);run(e,17);assert.ok(!e.buff(p,'fiery'));
});
test('Aftershock deals extra damage when Earthshaker casts a non-damaging Totem',()=>{
 const r=arena('earthshaker',2),{e,p,q}=r;e.cast(0,1);run(e,1);assert.ok(q.hp<q.maxHp);
});
test('Presence of the Dark Lord amplifies physical damage in aura range',()=>{
 const r=arena('shadow_fiend',2),{e,p,q}=r;e.hit(p,q,100,{damage_type:'physical'});assert.ok(q.maxHp-q.hp>100);
});
test('Overload empowers the next attack after a spell, then consumes charge',()=>{
 const r=arena('storm_spirit',2),{e,p,q}=r;e.cast(0,0);run(e,.5);assert.ok(e.buff(p,'overload'));q.x=p.x+65;oneAttack(e);assert.ok(!e.buff(p,'overload'));assert.ok(damageLogs(e).filter(l=>l.player===0).length>=2);
});

test('periodic damage reaches the authored final tick at the duration boundary',()=>{
 for(const [id,slot] of [['crystal_maiden',1],['pudge',3],['drow_ranger',2],['witch_doctor',3]]){
 const r=arena(id,slot),{e,q}=r,m=r.a.mvp;start(r,slot);run(e,(m.startup_frames||0)/60+m.duration_s+3);
 const logs=e.logs.filter(l=>l.type==='hit'&&l.skill===r.a.id);assert.equal(logs.length,m.ticks,r.a.id+' tick count');}
});

test('Powershot actual held input reaches the official full one-second charge',()=>{
 const r=arena('windranger',1),{e,p,q}=r;e.setInput(0,{s1:true});run(e,1.25);assert.ok(p.charge>=r.a.mvp.charge_max_s-1e-6,'actual input charge reaches configured cap');e.setInput(0,{});run(e,2);assert.ok(q.maxHp-q.hp>=460,'full475-ish damage is reachable through inputs');
});
test('Meat Shield blocks a flat amount of PURE as well as magical damage',()=>{
 const r=arena('pudge',2),{e,p,q}=r;start(r,2);run(e,.1);for(const type of ['pure','magical','physical']){const hp=p.hp;e.hit(q,p,100,{damage_type:type,blockable:false});assert.equal(hp-p.hp,74,type+' damage blocked by26');}
});
test('Rot does not prevent Pudge from using basic attacks',()=>{
 const r=arena('pudge',1),{e,p,q}=r;start(r,1);run(e,.3);p.recovery=0;assert.equal(e.attack(0),true);
});
test('Battle Hunger persists when the cursed target takes a basic attack',()=>{
 const r=arena('axe',1),{e,p,q}=r;start(r,1);run(e,.7);assert.ok(q.dots.some(d=>d.id==='axe_hunger'));e.hit(p,q,1,{damage_type:'physical'},{basic:true});assert.ok(q.dots.some(d=>d.id==='axe_hunger'));
});
test('Immaterial passively evades some, but not all, ordinary attacks',()=>{
 const r=arena('phantom_assassin',2),{e,p,q}=r;let misses=0,hits=0;for(let n=0;n<100;n++){const hp=p.hp;e.hit(q,p,1,{damage_type:'physical'},{basic:true});if(p.hp===hp)misses++;else hits++;}assert.ok(misses>20&&hits>20,{misses,hits});assert.equal(e.cast(0,2),false);
});
test('Coup de Grace passively creates and consumes enhanced attack damage',()=>{
 const r=arena('phantom_assassin',3),{e,p,q}=r;const ds=[];for(let n=0;n<80;n++){p.x=400;q.x=465;const hp=q.hp;oneAttack(e);ds.push(hp-q.hp);}assert.ok(Math.max(...ds)>Math.min(...ds)*3);assert.equal(e.cast(0,3),false);
});
test('Take Aim guarantees Headshots and increases attack reach during the buff',()=>{
 const r=arena('sniper',2),{e,p,q}=r;start(r,2);run(e,.4);p.recovery=0;assert.equal(e.attack(0),true);const shot=e.events.find(x=>x.type==='attack');assert.ok(shot.damage>heroes[hi('sniper')].attack);assert.ok(shot.range>heroes[hi('sniper')].attack_range);assert.ok(e.property(p,'self_slow')>0);
});
test('Enchanted Totem empowers one attack then consumes its buff',()=>{
 const r=arena('earthshaker',1),{e,p,q}=r;start(r,1);run(e,.6);p.x=400;q.x=465;p.recovery=0;assert.equal(e.attack(0),true);assert.ok(e.events.find(x=>x.type==='attack').damage>heroes[hi('earthshaker')].attack*3);run(e,.6);assert.ok(!p.buffs.some(b=>b.m.next_attack_override));
});
test('Warcry reduces incoming physical damage; Gods Strength boosts basic damage',()=>{
 const r=arena('sven',2),{e,p,q}=r;start(r,2);run(e,.5);let hp=p.hp;e.hit(q,p,100,{damage_type:'physical',blockable:false});assert.ok(hp-p.hp<70);assert.ok(e.property(p,'move_multiplier')>1);
 p.recovery=0;p.cast=null;e.cast(0,3);run(e,.5);p.recovery=0;e.attack(0);assert.ok(e.events.find(x=>x.type==='attack').damage>heroes[hi('sven')].attack*2);
});
test('Focus Fire reduces attack interval and attack damage while active',()=>{
 const r=arena('windranger',3),{e,p,q}=r;start(r,3);run(e,.5);p.recovery=0;e.attack(0);const attack=e.events.find(x=>x.type==='attack');assert.ok(p.attackCd<heroes[hi('windranger')].attack_interval_s);assert.ok(attack.damage<heroes[hi('windranger')].attack);
});
test('Frost Arrows toggle spends mana per hit and slows the opponent',()=>{
 const r=arena('drow_ranger',0),{e,p,q}=r;start(r,0);run(e,.3);p.mp=200;const mp=p.mp;oneAttack(e);assert.ok(q.slow>0&&q.slowPct>.4);assert.ok(p.mp<mp);e.cast(0,0);assert.ok(!e.buff(p,'drow_ranger_frost'));
});
test('Phantom Strike consumes charges and restores them after the official delay',()=>{
 const r=arena('phantom_assassin',1),{e,p,q}=r;assert.equal(p.charges[1],2);start(r,1);run(e,.8);assert.equal(p.charges[1],1);p.recovery=0;e.cast(0,1);run(e,.8);assert.equal(p.charges[1],0);assert.equal(e.cast(0,1),false);run(e,12);assert.ok(p.charges[1]>=1);
});
test('Maledict emits three escalating health-loss bursts',()=>{
 const r=arena('witch_doctor',2),{e,p,q}=r;start(r,2);run(e,14);const values=e.logs.filter(l=>l.type==='hit'&&l.skill===r.a.id).map(l=>l.damage);assert.equal(values.filter(d=>d>r.a.mvp.damage+1).length,3);
});
test('Kraken Shell blocks75 passively,150 while active, and dispels after accumulated damage',()=>{
 const r=arena('tidehunter',1),{e,p,q}=r;let hp=p.hp;e.hit(q,p,200,{damage_type:'physical',blockable:false},{basic:true});assert.equal(hp-p.hp,125);start(r,1);run(e,.2);hp=p.hp;e.hit(q,p,200,{damage_type:'physical',blockable:false},{basic:true});assert.equal(hp-p.hp,50);p.silence=3;e.hit(q,p,600,{damage_type:'pure',blockable:false});assert.equal(p.silence,0);
});

test('Counterspell reflects a directly targeted Finger of Death',()=>{
 const e=new Engine(heroes,[hi('anti_mage'),hi('lion')],{seed:42}).start();const[p,q]=e.fighters;p.x=400;q.x=500;e.cast(0,2);run(e,.05);const hp=p.hp,qhp=q.hp;e.cast(1,3);run(e,1);assert.equal(p.hp,hp,'Counterspell blocks targeted spell');assert.ok(q.hp<qhp,'targeted spell reflects to original caster');
});
test('Blade Fury debuff immunity suppresses root, silence and slow',()=>{
 const e=new Engine(heroes,[hi('juggernaut'),hi('crystal_maiden')]).start();const[p,q]=e.fighters;p.x=400;q.x=465;e.cast(0,0);run(e,.05);e.cast(1,1);run(e,.4);assert.equal(p.root,0,'Frostbite root suppressed');e.hit(q,p,10,{damage_type:'magical',silence_s:2,slow_pct:50,slow_duration_s:2});assert.equal(p.silence,0);assert.equal(p.slow,0);
});

test('Great Cleave affects a secondary enemy healing ward behind the struck hero',()=>{
 const e=new Engine(heroes,[hi('sven'),hi('juggernaut')]).start();const[p,q]=e.fighters;p.x=400;q.x=600;e.cast(1,1);run(e,.4);assert.ok(e.zones.some(z=>z.type==='ward'));q.x=465;const before=q.hp;oneAttack(e);assert.ok(q.hp<before);assert.ok(!e.zones.some(z=>z.type==='ward'&&z.life>0));assert.ok(e.logs.some(l=>l.type==='cleave'));
});
test('Moonlight Shadow action reveal fades back and its damage boost actually applies',()=>{
 const r=arena('mirana',3),{e,p,q}=r;start(r,3);run(e,.6);let buff=e.buff(p,'mirana_moonlight');assert.ok(buff);const hp=q.hp;e.hit(p,q,100,{damage_type:'pure'});assert.equal(hp-q.hp,115);p.recovery=0;e.attack(0);assert.ok(buff.reveal>0);run(e,2);assert.equal(buff.reveal,0);p.recovery=0;e.cast(0,0);assert.ok(buff.reveal>0);
});

test('Finger of Death grants a20-second shorter-range empowered melee attack',()=>{
 const r=arena('lion',3),{e,p,q}=r;start(r,3);run(e,1);assert.ok(e.buff(p,'lionForm'));assert.ok(e.buff(p,'lionForm').life>18);p.recovery=0;assert.equal(e.attack(0),true);const ev=e.events.find(x=>x.type==='attack');assert.equal(ev.range,137.5);assert.equal(ev.damage,heroes[hi('lion')].attack+40);run(e,.5);assert.equal(e.projectiles.length,0,'form attacks are melee');
});
test('Mana Drain applies30percent slow and45percent while target mana is empty',()=>{
 const r=arena('lion',2),{e,p,q}=r;p.mp=200;start(r,2);run(e,.8);assert.equal(q.slowPct,.3);q.mp=0;run(e,.2);assert.equal(q.slowPct,.45);
});
test('Presence of the Dark Lord reaches the declared660-unit radius',()=>{
 const r=arena('shadow_fiend',2,500),{e,p,q}=r;let hp=q.hp;e.hit(p,q,100,{damage_type:'physical'});assert.ok(hp-q.hp>100);q.x=1100;hp=q.hp;e.hit(p,q,100,{damage_type:'physical'});assert.equal(hp-q.hp,100);
});
test('Static Remnant walks from caster toward the chosen point',()=>{
 const r=arena('storm_spirit',0,400),{e,p,q}=r;start(r,0);run(e,(r.a.mvp.startup_frames||0)/60+.1);const zone=e.zones.find(z=>z.type==='trap');assert.ok(zone);assert.ok(zone.x>p.x&&zone.x<q.x-200,'remnant has not teleported to target');const x=zone.x;run(e,.3);assert.ok(zone.x>x&&zone.x-x<60,'walking speed matches165 units/sec');
});
test('Multishot applies Frost Arrows45percent slow to a struck opponent',()=>{
 const r=arena('drow_ranger',2),{e,q}=r;start(r,2);run(e,1.3);assert.ok(q.hp<q.maxHp);assert.equal(q.slowPct,.45);assert.ok(q.slow>0);
});
test('Ball Lightning completes its declared fixed-distance flight after hitting an enemy',()=>{
 const r=arena('storm_spirit',3),{e,p,q}=r;const x=p.x;start(r,3);run(e,(r.a.mvp.startup_frames||0)/60+r.a.mvp.duration_s+.2);assert.ok(q.hp<q.maxHp);assert.ok(p.x-x>=340&&p.x-x<=390,`expected360-unit flight, got${p.x-x}`);
});
