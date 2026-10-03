import {invokeHeroHook} from './hero-rules-host.js';
// Core4 arena adaptation. All mutable data is plain, snapshot-visible simulation state.
const coreClamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const coreStatus=(f,key)=>f.pack?.statuses.find(s=>s.key===key&&s.life>1e-8);
const coreEffective=(e,f,s)=>!!s&&s.life>1e-8&&(s.pierces===true||!e.property(f,'debuffImmune'));
const coreBroken=f=>!!coreStatus(f,'viper_strike');
const coreAlive=f=>f&&f.hp>0;
const coreHero=(e,f,id)=>e.hero(f.i).valveHeroId===id;
const coreDistance=(a,b)=>Math.abs(a.x-b.x);
const coreArmorFactor=a=>1-.06*a/(1+.06*Math.abs(a));
function coreDebuff(e,f,key,owner,life,values={},dispel='basic',pierces=false){
 if(!coreAlive(f)||f.invuln>0||!pierces&&e.property(f,'debuffImmune'))return null;
 let s=coreStatus(f,key);if(!s){s={key,owner,life,duration:life,elapsed:0,tick:0,values,dispel,pierces};f.pack.statuses.push(s);}else Object.assign(s,{owner,life,duration:life,elapsed:0,values,dispel,pierces});return s;
}
function coreDamage(e,owner,target,amount,type,skill,flags={}){if(!coreAlive(target)||!Number.isFinite(amount)||amount<=0)return false;return e.hit(e.fighters[owner],target,amount,{damage_type:type,blockable:false},{skill,dot:true,noLifesteal:!!flags.reflected,...flags});}
function coreBolt(e,owner,target,color='#79e6ff'){e.fx('beam',owner.x,owner.y+175,color,{tx:target.x,ty:target.y+100,life:.18,maxLife:.18});}
function coreBorrow(e,f,automatic=false){
 if(!coreAlive(f)||f.pack.borrowed>0||f.cd[3]>1e-8||automatic&&coreBroken(f)||!automatic&&e.isSilenced(f))return false;
 if(!automatic)e.commitAction(f);f.pack.borrowed=6;f.cd[3]=65;f.casts++;f.cast=null;f.skillBuffer=null;e.dispel(f,'strong');e.animate(f,'cast',.3);e.fx('ring',f.x,f.y+70,e.hero(f.i).color,{size:120});e.fx('text',f.x,f.y+190,e.hero(f.i).color,{text:automatic?'回光返照 · 自动':'回光返照'});e.log('activate',f.i,{skill:'abaddon_borrowed_time'});e.log('cast',f.i,{skill:'abaddon_borrowed_time',automatic,cost:0});return true;
}
function coreAutoBorrow(e,f){if(coreHero(e,f,102)&&coreAlive(f)&&f.hp<400)coreBorrow(e,f,true);}
function coreShieldBurst(e,f,reason){const shield=f.pack.shield;if(!shield)return;f.pack.shield=null;e.fx('ring',f.x,f.y+60,e.hero(f.i).color,{size:371.25,life:.45,maxLife:.45});e.log('shield_end',f.i,{skill:'abaddon_aphotic_shield',reason,absorbed:210-shield.amount});const target=e.fighters[1-f.i];if(coreAlive(f)&&coreDistance(f,target)<=371.25+22)coreDamage(e,f.i,target,210,'magical','abaddon_aphotic_shield');}
function coreMissile(e,f,target,kind,abilityId,speed,range){e.packState.missiles.push({id:++e.seq,owner:f.i,target:target.i,kind,abilityId,x:f.x,y:f.y+100,dir:target.x>=f.x?1:-1,speed,remaining:range,r:18});}
function coreSurge(e,f,attacker,targeted){if(!coreHero(e,f,15)||!coreAlive(f)||!coreAlive(attacker)||coreBroken(f)||f.pack.surgeCD>0||coreDistance(f,attacker)>385+22||!targeted&&e.random()>=.2)return;f.pack.surgeCD=2.5;coreBolt(e,f,attacker);coreDamage(e,f.i,attacker,170,'magical','razor_storm_surge',{reflected:true,noReflect:true,passive:true});coreDebuff(e,attacker,'storm_surge',f.i,1,{moveSlow:.4});e.log('passive',f.i,{skill:'razor_storm_surge',targeted});}
export const CohortCombat={
 usesSharedArmor:true,
 init(e){if(!e.runtimeHeroes.some(h=>h.packKey==='core4')){e.packState=null;return;}e.packState={areas:[],missiles:[],links:[],storms:[],rings:[]};for(const f of e.fighters)f.pack={statuses:[],poison:[],poisonOn:false,borrowed:0,shield:null,surgeCD:0,bashCount:0,water:false,regenTick:0,toxinExposure:0,toxinOwner:null,deathHandled:false,attackRecoveryUntil:0};},
 broken:coreBroken,
 cast(e,f,slot,options={}){
  if(!e.packState||e.hero(f.i).packKey!=='core4')return undefined;
  const a=e.ability(f.i,slot),m=a?.mvp,id=a?.valveAbilityId,t=e.fighters[1-f.i];
  if(!m||m.passive||!coreAlive(f)||e.phase!=='fight'||e.paused)return false;
  if(id===5588)return coreBorrow(e,f,false);
  if(e.blocked(f)||e.isSilenced(f)||f.cd[slot]>1e-8||f.cast||f.channel&&id!==5114||f.recovery>0&&id!==5114)return false;
  if(id===5218){e.commitAction(f);f.pack.poisonOn=!f.pack.poisonOn;if(f.pack.poisonOn)e.addBuff(f,a.id,{},999);else f.buffs=f.buffs.filter(b=>b.key!==a.id);e.log('activate',f.i,{skill:a.id,toggle:f.pack.poisonOn});e.log('cast',f.i,{skill:a.id,toggle:f.pack.poisonOn,cost:0});f.casts++;return true;}
  const self=id===5585&&(options.self===true||e.input[f.i].down);
  if([5083,5221,5117].includes(id)||id===5585&&!self){if(!coreAlive(t)||t.invuln>0||coreDistance(f,t)>m.range_wu+22)return false;}
  if(f.mp<m.mana)return false;e.commitAction(f);f.mp-=m.mana;f.cd[slot]=m.cooldown_s;f.casts++;f.guard=false;
  const cast={slot,m:JSON.parse(JSON.stringify(m)),remaining:m.startup_frames/60,self,aim:coreClamp(options.aim??t.x,f.x-m.range_wu,f.x+m.range_wu),id:++e.seq};
  if([5083,5221,5117].includes(id)||id===5585&&!self)this.targeted(e,f,t,a.id);
  if(m.startup_frames===0)this.activate(e,f,cast);else f.cast=cast;e.animate(f,'cast',.35);e.log('cast',f.i,{skill:a.id,slot,cost:m.mana,self});return true;
 },
 activate(e,f,c){
  if(e.hero(f.i).packKey!=='core4')return false;const a=e.ability(f.i,c.slot),id=a.valveAbilityId,t=e.fighters[1-f.i];f.pack.attackRecoveryUntil=0;f.recovery=.2;
  if(id===5082)e.packState.rings.push({id:++e.seq,owner:f.i,x:f.x,age:0,life:2.2,out:[],back:[],radius:0,lastDistance:coreDistance(f,t)});
  else if(id===5083){if(coreAlive(t)&&coreDistance(f,t)<=324.5)e.packState.links.push({id:++e.seq,owner:f.i,target:t.i,draining:true,age:0,amount:0,life:28});}
  else if(id===5085)e.packState.storms.push({id:++e.seq,owner:f.i,life:30,tick:.5});
  else if(id===5219)e.packState.missiles.push({id:++e.seq,owner:f.i,kind:'nethertoxin',x:f.x,y:85,targetX:coreClamp(c.aim,45,1155),speed:1320});
  else if(id===5221)coreMissile(e,f,t,'viper_strike',a.id,825,434.5);
  else if(id===5585){const cost=128;if(f.pack.borrowed>0)e.heal(f,cost,{skill:a.id,source:'self_damage_converted'});else e.nonlethalSelfDamage(f,cost);coreAutoBorrow(e,f);if(c.self){e.heal(f,320,{skill:a.id});e.fx('ring',f.x,f.y+65,'#88ffbc',{size:80});}else coreMissile(e,f,t,'mist_coil',a.id,715,365.75);e.log('self_cost',f.i,{skill:a.id,nominal:cost,nonlethal:true});}
  else if(id===5586){coreShieldBurst(e,f,'replaced');e.dispel(f,'strong');f.pack.shield={amount:210,life:12};e.fx('ring',f.x,f.y+85,e.hero(f.i).color,{size:95});e.log('shield_start',f.i,{amount:210,life:12});}
  else if(id===5114){f.pack.sprint={life:10,age:0};f.recovery=0;}
  else if(id===5115){e.packState.areas.push({id:++e.seq,type:'water',owner:f.i,x:f.x,radius:178.75,life:7});if(coreDistance(f,t)<=200.75&&t.y<45){coreDamage(e,f.i,t,300,'physical',a.id,{dot:false});e.control(t,'stun',.8);coreDebuff(e,t,'crush',f.i,6.8,{moveSlow:.35,attackSlow:35,delay:.8},'strong');}e.fx('ring',f.x,20,e.hero(f.i).color,{size:178.75});}
  else if(id===5117){coreDebuff(e,t,'haze',f.i,18,{armor:-20,lastTrailX:t.x,trailTick:0},'basic',true);coreBolt(e,f,t,'#cf9dff');}
  else throw Error('Unimplemented selected core4 ability '+id);
  e.log('activate',f.i,{skill:a.id,slot:c.slot});return true;
 },
 targeted(e,source,target,skill){if(e.packState&&coreAlive(source)&&coreAlive(target)&&source!==target){coreSurge(e,target,source,true);e.log('targeted_spell',source.i,{target:target.i,skill});}},
 attack(e,f,t,damage,m){if(!e.packState)return damage;const p=f.pack;p.attackRecoveryUntil=e.t+f.recovery;
  for(const link of e.packState.links){if(link.life>0){if(link.owner===f.i)damage+=link.amount;if(link.target===f.i)damage-=link.amount;}}
  if(coreHero(e,f,28)&&p.water&&!coreBroken(f))damage*=1.222;
  if(coreHero(e,f,47)&&p.poisonOn&&f.mp>=20){f.mp-=20;m.corePoison=true;e.log('attack_cost',f.i,{skill:'viper_poison_attack',mana:20});}
  return Math.max(0,damage);
 },
 attackInterval(e,f,t,base){if(!e.packState)return base;const curse=coreStatus(t,'curse');let bonus=curse?.owner===f.i&&coreEffective(e,t,curse)?40:0,slow=0;for(const s of f.pack.statuses){if(!coreEffective(e,f,s)||s.values.delay&&s.elapsed<s.values.delay)continue;slow=Math.max(slow,s.key==='viper_strike'?180*s.life/6:s.values.attackSlow||0);}if(f.pack.toxinExposure>0&&!e.property(f,'debuffImmune'))slow=Math.max(slow,60);return base*100/Math.max(20,100+bonus-slow);},
 afterAttack(e,f,t,event,landed){if(!e.packState||!landed)return;
  if(event.m?.corePoison&&coreAlive(t)&&!e.property(t,'debuffImmune')){if(t.pack.poison.length>=6)t.pack.poison.sort((a,b)=>a.life-b.life).shift();t.pack.poison.push({owner:f.i,life:4,tick:0,id:++e.seq});e.log('poison_stack',f.i,{target:t.i,stacks:t.pack.poison.length});}
  if(coreBroken(f))return;
  if(coreHero(e,f,47)&&coreAlive(t))coreDamage(e,f.i,t,(1-t.hp/t.maxHp)*100*.25,'physical','viper_predator',{passive:true});
  if(coreHero(e,f,102))coreDebuff(e,t,'curse',f.i,2,{dps:45,moveSlow:.25,attackBonus:40},'basic');
  if(coreHero(e,f,28)){const result=invokeHeroHook(e,f.i,2,'onAttack',{actor:f.i,target:t.i,landed,priorCount:f.pack.bashCount});if(result.handled)f.pack.bashCount=result.value.bashCount;else{f.pack.bashCount++;if(f.pack.bashCount>=4){f.pack.bashCount=0;coreDamage(e,f.i,t,200,'physical','slardar_bash',{passive:true});e.control(t,'stun',1,true);e.fx('text',t.x,t.y+170,'#cea4ff',{text:'深海重击'});e.log('passive',f.i,{skill:'slardar_bash'});}}}
 },
 beforeDamage(e,event){if(!e.packState)return;const {target:f,attacker,m}=event,p=f.pack;
  if(m.damage_type==='physical'){let armor=(coreHero(e,f,28)&&p.water&&!coreBroken(f)?5.4:0)+(event.sharedArmor||0);for(const s of p.statuses)if(coreEffective(e,f,s))armor+=s.values.armor||0;event.damage*=coreArmorFactor(armor);}
  if(m.damage_type==='magical'){event.damage*=1+(e.property(f,'debuffImmune')?0:p.poison.length*.1);if(coreHero(e,f,47)&&!coreBroken(f))event.damage*=.75;}
  coreAutoBorrow(e,f);
  if(p.borrowed>0){e.heal(f,event.damage,{skill:'abaddon_borrowed_time',source:attacker.i});event.converted=event.damage;event.damage=0;return;}
  if(p.shield&&event.damage>0){const absorbed=Math.min(event.damage,p.shield.amount);p.shield.amount-=absorbed;event.damage-=absorbed;e.log('shield_absorb',f.i,{amount:absorbed,remaining:p.shield.amount});if(p.shield.amount<=1e-8)coreShieldBurst(e,f,'damage');}
 },
 afterDamage(e,event){if(!e.packState)return;const {attacker:f,target:t,damage,info,guard}=event;if(!guard&&!info.dot)t.pack.attackRecoveryUntil=0;
  if(event.burstShield)coreShieldBurst(e,t,'damage');coreAutoBorrow(e,t);
  if(damage<=0||f===t)return;
  if(coreHero(e,f,102)&&coreAlive(f)&&!coreBroken(f))coreDebuff(e,t,'withering',f.i,5,{healReduction:.335},'none');
  if(info.reflected||info.noReflect)return;
  if(coreHero(e,t,15)&&info.basic)coreSurge(e,t,f,false);
  if(coreHero(e,t,47)&&coreAlive(t)&&!coreBroken(t)&&coreDistance(f,t)<=660)coreDebuff(e,f,'skin',t.i,4,{dps:25,attackSlow:36,reflected:true},'basic');
 },
 healing(e,f,amount){if(!e.packState)return amount;return coreEffective(e,f,coreStatus(f,'withering'))&&f.hp/f.maxHp<.4?amount*.665:amount;},
 dispel(e,f,tier){if(!e.packState)return;f.pack.statuses=f.pack.statuses.filter(s=>!(s.dispel==='basic'||tier==='strong'&&s.dispel==='strong'));f.pack.poison=[];},
 moveMultiplier(e,f){if(!e.packState)return 1;let slow=e.property(f,'debuffImmune')?0:f.pack.poison.length*.12;for(const s of f.pack.statuses){if(!coreEffective(e,f,s)||s.values.delay&&s.elapsed<s.values.delay)continue;slow=Math.max(slow,s.key==='viper_strike'?.8*s.life/6:s.values.moveSlow||0);}const sprint=f.pack.sprint;const resist=sprint?(sprint.age<=2.5?1:Math.max(0,sprint.life/7.5)):0;const combined=Math.max(f.slowPct,Math.min(.95,slow));const oldFactor=1-f.slowPct*(1-e.property(f,'slow_resistance'));const slowFactor=1-combined*(1-Math.max(e.property(f,'slow_resistance'),resist));return (sprint?1.34:1)*(coreHero(e,f,28)&&f.pack.water&&!coreBroken(f)?1.18:1)*slowFactor/Math.max(.001,oldFactor);},
 movingAttack(e,f){return !!e.packState&&f.recovery>0&&f.pack.attackRecoveryUntil>e.t+1e-8&&!e.blocked(f)&&!f.cast&&!f.channel&&e.packState.links.some(l=>l.owner===f.i&&l.draining);},
 tick(e,dt){if(!e.packState)return;const world=e.packState;
  for(const area of world.areas)area.life-=dt;world.areas=world.areas.filter(a=>a.life>1e-8);
  for(const f of e.fighters){if(!coreAlive(f))continue;const p=f.pack;p.deathHandled=false;p.surgeCD=Math.max(0,p.surgeCD-dt);p.borrowed=Math.max(0,p.borrowed-dt);if(p.sprint){p.sprint.age+=dt;p.sprint.life-=dt;if(p.sprint.life<=1e-8)p.sprint=null;}if(p.shield){p.shield.life-=dt;if(p.shield.life<=1e-8)coreShieldBurst(e,f,'expired');}
   for(const s of p.statuses){const live=Math.min(dt,s.life);s.life-=dt;s.elapsed+=live;s.tick+=live;
    if(s.key==='haze'){s.values.trailTick-=live;if(s.values.trailTick<=0){s.values.trailTick=.15;if(Math.abs(f.x-s.values.lastTrailX)>=20||!world.areas.some(a=>a.type==='water'&&coreDistance(a,f)<30)){world.areas.push({id:++e.seq,type:'water',owner:s.owner,x:f.x,radius:55,life:7});s.values.lastTrailX=f.x;}}}
    if(s.key==='viper_strike'||s.values.dps){const tick=.25;while(s.tick>=tick-1e-8){s.tick-=tick;coreDamage(e,s.owner,f,(s.key==='viper_strike'?150:s.values.dps)*tick,'magical',s.key==='viper_strike'?'viper_viper_strike':s.key==='skin'?'viper_corrosive_skin':'abaddon_frostmourne',{reflected:!!s.values.reflected,noReflect:!!s.values.reflected});}}
   }p.statuses=p.statuses.filter(s=>s.life>1e-8);
   for(const s of p.poison){const live=Math.min(dt,s.life);s.life-=dt;s.tick+=live;while(s.tick>=.25-1e-8){s.tick-=.25;coreDamage(e,s.owner,f,4,'magical','viper_poison_attack');}}p.poison=p.poison.filter(s=>s.life>1e-8);
   const toxins=world.areas.filter(a=>a.type==='toxin'&&a.owner!==f.i&&coreDistance(a,f)<=a.radius+22&&f.y<45);if(toxins.length&&f.invuln<=0&&!e.property(f,'debuffImmune')){const before=p.toxinExposure;p.toxinExposure+=dt;p.toxinOwner=toxins[0].owner;const average=(Math.min(4,before)+Math.min(4,p.toxinExposure))/2;coreDamage(e,p.toxinOwner,f,(45+80*average/4)*dt,'magical','viper_nethertoxin');}else{p.toxinExposure=0;p.toxinOwner=null;}
   p.water=f.y<20&&world.areas.some(a=>a.type==='water'&&coreDistance(a,f)<=a.radius);p.revealed=!!coreStatus(f,'haze');if(coreHero(e,f,28)&&p.water&&!coreBroken(f)){p.regenTick+=dt;while(p.regenTick>=.5-1e-8){p.regenTick-=.5;e.heal(f,3.125,{skill:'slardar_seaborn_sentinel'});}}else p.regenTick=0;coreAutoBorrow(e,f);
  }
  for(const link of world.links){const f=e.fighters[link.owner],t=e.fighters[link.target];if(link.draining){if(!coreAlive(f)||!coreAlive(t)||coreDistance(f,t)>440){link.draining=false;link.life=18;e.log('link_break',f.i,{skill:'razor_static_link',amount:link.amount});}else{const live=Math.min(dt,10-link.age);link.age+=live;link.amount+=24*live;if(link.age>=10-1e-8){link.draining=false;link.life=18;}}}else link.life-=dt;}world.links=world.links.filter(l=>l.life>1e-8);
  for(const ring of world.rings){const previous=ring.age;ring.age+=Math.min(dt,ring.life);ring.life-=dt;const target=e.fighters[1-ring.owner],distance=coreDistance(ring,target),phases=[[previous,Math.min(ring.age,1.1),'out'],[Math.max(previous,1.1),ring.age,'back']];ring.radius=385*(ring.age<=1.1?ring.age/1.1:2-ring.age/1.1);
   for(const [a,b,key]of phases){if(b<a||b===a||ring[key].includes(target.i))continue;const r1=385*(key==='out'?a/1.1:2-a/1.1),r2=385*(key==='out'?b/1.1:2-b/1.1);if((key==='out'?ring.lastDistance>=r1-22&&distance<=r2+22:ring.lastDistance<=r1+22&&distance>=r2-22)&&distance<=407){ring[key].push(target.i);const fraction=coreClamp(distance/385,0,1);coreDamage(e,ring.owner,target,50+135*fraction,'magical','razor_plasma_field');coreDebuff(e,target,'plasma_slow',ring.owner,1.5,{moveSlow:(5+35*fraction)/100});e.log('plasma_contact',ring.owner,{phase:key,target:target.i,distance});}}ring.lastDistance=distance;
  }world.rings=world.rings.filter(r=>r.life>1e-8);
  for(const storm of world.storms){const f=e.fighters[storm.owner];if(!coreAlive(f)){storm.life=0;continue;}const live=Math.min(dt,storm.life);storm.life-=live;storm.tick-=live;while(storm.tick<=1e-8){storm.tick+=.5;const t=e.fighters[1-f.i],ward=e.zones.find(z=>z.type==='ward'&&z.owner!==f.i&&z.life>0&&coreDistance(z,f)<=275),linked=world.links.some(l=>l.owner===f.i&&l.target===t.i&&l.draining),heroEligible=coreAlive(t)&&t.invuln<=0&&coreDistance(f,t)<=297;if(ward&&(!linked||!heroEligible)){e.endWard(ward,'attack',f.i);e.fx('beam',f.x,240,e.hero(f.i).color,{tx:ward.x,ty:40});}else if(heroEligible){coreBolt(e,f,t);coreDamage(e,f.i,t,90,'physical','razor_eye_of_the_storm');const key='storm_armor_'+storm.id;let s=coreStatus(t,key);if(s)s.values.armor-=1;else coreDebuff(e,t,key,f.i,Math.max(dt,storm.life),{armor:-1},'none',true);e.log('storm_strike',f.i,{stormId:storm.id,target:t.i});}}}world.storms=world.storms.filter(s=>s.life>1e-8);
  for(const p of world.missiles){const owner=e.fighters[p.owner];if(p.kind==='nethertoxin'){const dx=p.targetX-p.x,travel=p.speed*dt;if(Math.abs(dx)<=travel){world.areas.push({id:++e.seq,type:'toxin',owner:p.owner,x:p.targetX,radius:220,life:8});p.dead=true;}else p.x+=Math.sign(dx)*travel;continue;}
   const old=p.x,travel=Math.min(p.remaining,p.speed*dt),next=coreClamp(old+p.dir*travel,0,1200),collision=e.projectileCollision({...p,basic:false,m:{height:'both'}},old,next);p.x=collision?old+p.dir*collision.distance:next;p.remaining-=Math.abs(p.x-old);if(collision){const target=collision.target,counter=e.buff(target,'counter');if(counter&&!counter.m.counter_type&&!p.reflected){p.owner=target.i;p.dir=-p.dir;p.reflected=true;p.remaining=p.kind==='mist_coil'?365.75:434.5;p.x=target.x+p.dir*40;target.buffs=target.buffs.filter(b=>b!==counter);continue;}
    if(p.kind==='mist_coil')coreDamage(e,p.owner,target,320,'magical','abaddon_death_coil',{dot:false,reflected:!!p.reflected});else coreDebuff(e,target,'viper_strike',p.owner,6,{},'none',true);p.dead=true;
   }else if(p.remaining<=1e-8||p.x<=0||p.x>=1200)p.dead=true;
  }world.missiles=world.missiles.filter(p=>!p.dead);
 },
 endStep(e){if(!e.packState)return;for(const f of e.fighters)if(f.hp<=0&&!f.pack.deathHandled){f.pack.deathHandled=true;f.pack.attackRecoveryUntil=0;f.pack.shield=null;f.pack.borrowed=0;f.pack.poisonOn=false;f.pack.sprint=null;f.pack.statuses=[];f.pack.poison=[];for(const storm of e.packState.storms)if(storm.owner===f.i){storm.life=0;for(const target of e.fighters)target.pack.statuses=target.pack.statuses.filter(s=>s.key!=='storm_armor_'+storm.id);}for(const link of e.packState.links)if(link.owner===f.i||link.target===f.i){link.draining=false;link.life=Math.min(link.life,18);}}},
};
