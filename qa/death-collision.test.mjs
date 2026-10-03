import test from 'node:test';import assert from 'node:assert/strict';import {Engine} from '../src/engine.js';import {heroes} from '../src/data.js';
const hi=id=>heroes.findIndex(h=>h.id===id),frames=(e,n)=>{for(let i=0;i<n;i++)e.step();};
function duel(hero='pudge',side=0){const e=new Engine(heroes,side?[hi('axe'),hi(hero)]:[hi(hero),hi('axe')]).start();e.time=999;const p=e.fighters[side],q=e.fighters[1-side];p.x=side?800:400;q.x=side?720:480;p.mp=p.maxMp;q.hp=q.maxHp=50000;return {e,p,q};}
function lethal(e,p,q,kind='event'){
 p.hp=10;e.hitstop=0;for(const k of ['stun','hex','fear','taunt'])q[k]=0;
 const m={damage:50,damage_type:'pure',blockable:false,tick_interval_s:.2,radius_wu:200,slow_pct:0};
 if(kind==='deadAtStart')p.hp=0;
 if(kind==='event')e.events.push({type:'attack',at:e.t,owner:q.i,damage:50,m,range:100,dir:p.x>q.x?1:-1,y:0,id:10000});
 if(kind==='projectile')e.projectiles.push({owner:q.i,x:p.x+(q.x>p.x?45:-45),y:80,dir:q.x>p.x?-1:1,v:980,travel:0,range:100,r:10,damage:50,m,basic:true,id:10001});
 if(kind==='dot')p.dots.push({owner:q.i,id:'lethal-fixture',life:1,tick:0,m});
 if(kind.startsWith('zone')){const z={type:'ground_dot',owner:q.i,x:p.x,life:1,tick:0,m,id:'lethal-fixture'};kind==='zoneFirst'?e.zones.unshift(z):e.zones.push(z);}
 e.step();
}
test('Rot lethal melee repro: HP zero remains zero; corpse aura never ticks or prevents KO',()=>{const {e,p,q}=duel();e.setInput(p.i,{s1:true});frames(e,5);const rot=e.zones.find(z=>z.id==='pudge_rot');assert(rot);rot.tick=.001;lethal(e,p,q);assert.equal(p.hp,0);assert.equal(e.phase,'roundEnd');assert(!e.zones.some(z=>z.id==='pudge_rot'));assert(!e.logs.some(l=>l.frame===e.frame&&l.skill==='pudge_rot'));});
test('nonlethal self-damage cannot raise zero or fractional HP, including posthumous reflection',()=>{for(const hp of [0,.25,1,10]){const {e,p,q}=duel('queen_of_pain');p.hp=hp;e.hit(p,q,100,{damage_type:'pure',selfReflection:.25});assert.equal(p.hp,hp>1?1:hp,`reflection hp ${hp}`);}const{e,p}=duel();e.setInput(0,{s1:true});frames(e,5);p.hp=.25;e.zones[0].tick=0;e.step();assert.equal(p.hp,.25);});
const zoneSkills=[['pudge',1,'aura'],['juggernaut',0,'aura'],['juggernaut',1,'ward'],['witch_doctor',1,'heal'],['witch_doctor',3,'deathWard'],['sniper',0,'ground_dot'],['storm_spirit',0,'trap'],['earthshaker',0,'wall'],['tidehunter',3,'expanding']];
for(const [hero,slot,type]of zoneSkills)for(const side of [0,1])for(const kind of ['deadAtStart','event','projectile','dot','zoneFirst','zoneLast'])test(`${hero}/${type}/P${side+1}/${kind}: due zone tick cannot revive defeated owner`,()=>{
 const {e,p,q}=duel(hero,side);e.setInput(side,{['s'+slot]:true});for(let n=0;n<180&&!e.zones.some(z=>z.owner===side&&z.type===type);n++)e.step();const z=e.zones.find(z=>z.owner===side&&z.type===type);assert(z,'actual skill must create its zone');z.tick=.001;
 lethal(e,p,q,kind);assert.equal(p.hp,0);assert.equal(e.phase,'roundEnd');if(['aura','ward','heal','deathWard'].includes(type))assert(!e.zones.includes(z));
});
function collision({dir=1,hero=400,ward=400,start=hero-dir*100,speed=12000,y=100,heroY=0,range=1200,extraWards=[]}={}){
 const e=new Engine(heroes,[hi('sniper'),hi('juggernaut')]).start(),shooter=e.fighters[0],target=e.fighters[1];shooter.x=dir===1?45:1155;target.x=hero;target.y=heroY;target.hp=target.maxHp;
 const m=heroes[hi('juggernaut')].abilities[1].mvp;const main={type:'ward',owner:1,x:ward,life:10,tick:5,m:{...m,follow:false},id:'juggernaut_healing_ward',healed:0,healTicks:0};e.zones=[...extraWards.map(x=>({...main,x})),main];
 const shot={owner:0,x:start,y,dir,v:speed,travel:0,range,r:10,damage:158,m:{damage_type:'physical',blockable:false},basic:true,id:999};e.projectiles.push(shot);const hp=target.hp;e.step();return {e,target,main,shot,damage:hp-target.hp,wardAlive:e.zones.includes(main)};
}
test('reported Sniper distances 75/80 both let the colocated hero body intercept the ward',()=>{for(const dir of [-1,1])for(const gap of [75,80]){const r=collision({dir,start:400-dir*(gap-38),speed:980});assert.equal(r.damage,158,`${dir}/${gap}`);assert(r.wardAlive);}});
test('nearest swept collision wins for both directions, low/high speed and zone array order',()=>{for(const dir of [-1,1])for(const speed of [6000,60000])for(const front of ['hero','ward'])for(const reverse of [false,true]){
 const hero=600,ward=hero+(front==='ward'?-dir*70:dir*70),extraWards=[hero+dir*140,hero+dir*200];if(reverse)extraWards.reverse();const r=collision({dir,hero,ward,start:hero-dir*180,speed,extraWards});if(speed===6000)for(let i=0;i<3&&r.e.projectiles.length;i++)r.e.step();const damage=r.target.maxHp-r.target.hp;assert.equal(damage,front==='hero'?158:0,`${dir}/${speed}/${front}/${reverse}`);assert.equal(r.e.zones.includes(r.main),front==='hero');
}});
test('exact entry ties and initial overlaps explicitly prefer the hero body in either direction',()=>{for(const dir of [-1,1])for(const inside of [false,true]){const r=collision({dir,hero:600,ward:600-dir*13,start:inside?600:600-dir*100});assert.equal(r.damage,158);assert(r.wardAlive);}});
test('height eligibility participates before choosing the nearest collider',()=>{for(const dir of [-1,1]){
 const airHero=collision({dir,hero:600,ward:600+dir*70,start:600-dir*100,heroY:300,y:100,speed:30000});assert.equal(airHero.damage,0);assert.equal(airHero.wardAlive,false);
 const highShot=collision({dir,hero:600,ward:600-dir*70,start:600-dir*180,heroY:140,y:200,speed:30000});assert.equal(highShot.damage,158);assert(highShot.wardAlive);
 const miss=collision({dir,hero:600,ward:600,start:600-dir*100,y:350});assert.equal(miss.damage,0);assert(miss.wardAlive);
}});
test('swept collisions honor remaining range and arena clipping rather than discarding a fast valid hit',()=>{for(const dir of [-1,1]){for(const range of [61,62,100]){const r=collision({dir,hero:600,ward:600,start:600-dir*100,speed:120000,range});assert.equal(r.damage,range<62?0:158);assert(r.wardAlive);assert.equal(r.e.projectiles.length,0);if(range>=62)assert(Math.abs(r.shot.travel-62)<1e-7);}}});
test('dead wards cannot absorb basic shots',()=>{const {e,p,q}=duel('sniper');p.x=400;q.x=600;const m=heroes[hi('juggernaut')].abilities[1].mvp;const z={type:'ward',owner:1,x:500,life:0,tick:0,m,id:'juggernaut_healing_ward'};e.zones.push(z);e.projectiles.push({owner:0,x:450,y:100,dir:1,v:12000,travel:0,range:1000,r:10,damage:50,m:{damage_type:'pure',blockable:false},basic:true,id:888});const hp=q.hp;e.step();assert.equal(hp-q.hp,50);});

test('live wards do not absorb skill projectiles, and the hero receives the spell hit',()=>{for(const dir of [-1,1]){const {e,p,q}=duel('sniper');p.x=dir===1?400:800;q.x=600;const m=heroes[hi('juggernaut')].abilities[1].mvp;const z={type:'ward',owner:1,x:600-dir*70,life:10,tick:5,m:{...m,follow:false},id:'juggernaut_healing_ward',healed:0,healTicks:0};e.zones.push(z);e.projectiles.push({owner:0,x:600-dir*160,y:100,dir,v:12000,travel:0,range:1000,r:10,damage:50,m:{damage_type:'pure',blockable:false},basic:false,id:'test-spell'});const hp=q.hp;e.step();assert.equal(hp-q.hp,50);assert(e.zones.includes(z));}});
test('training revival remains an explicit reset, not nonlethal self-damage',()=>{const {e,p,q}=duel();e.mode='training';e.setInput(0,{s1:true});frames(e,5);e.zones[0].tick=.001;lethal(e,p,q);assert.equal(p.hp,p.maxHp);assert.equal(e.phase,'fight');assert(e.effects.some(x=>x.text==='训练重置'));assert(!e.zones.some(z=>z.type==='aura'));});
