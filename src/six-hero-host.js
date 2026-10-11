import {beginSixProof,trackSixProof,advanceSixProof,reflectSixProof,pulseSixProof,validSixProof} from './six-hero-proof-host.js';
// Native transport for the six-hero release. Rules own coefficients and commands;
// this host owns collisions, actual damage receipts and serializable effect records.
import {privateRuleSession} from './hero-rules-host.js';
import {SIX_SLOTS} from './six-hero-rules.js';
import {sameLegacyValue as same} from './hero-legacy-native-state.js';
const slots=new Set(SIX_SLOTS.map(x=>x.join(':'))),copy=x=>structuredClone(x),clamp=(v,l,h)=>Math.max(l,Math.min(h,v));
const finite=(v,l=0,h=1e7)=>Number.isFinite(v)&&v>=l&&v<=h;
export const sixFrameRequired=e=>e.indices.some(h=>[0,2,6,10,14,19].includes(h));
export const sixEnabled=(e,i,s)=>slots.has(e.indices[i]+':'+s)&&!!privateRuleSession(e).sealed.implementation(e.indices[i],s);
export function sixAbility(e,i,s,a){return sixEnabled(e,i,s)?{...a,mvp:copy(privateRuleSession(e).sealed.hero(e.indices[i]).abilities[s].mvp)}:a;}
const facts=(o,extra={})=>({owner:o.owner,target:1-o.owner,slot:o.slot,abilityId:o.id,castId:o.castId,direction:o.direction,aim:o.aim,...extra});
function invoke(e,o,hook,extra={},preview=false){
 const x=privateRuleSession(e).sealed.implementation(o.heroId,o.slot);
 if(!x?.behaviorId.startsWith('six-heroes/')||typeof x[hook]!=='function'||x.requires.length)throw Error('Unsupported six-hero implementation');
 const context={now:e.t,actor:i=>{const f=e.fighters[i];if(!f)throw Error('Invalid actor');return Object.freeze({id:i,x:f.x,y:f.y,dir:f.dir,alive:f.hp>0,hp:f.hp,maxHp:f.maxHp,invulnerable:f.invuln>0,passivesEnabled:e.passivesEnabled(f)});},random:()=>{if(preview)throw Error('RNG in cast preflight');return e.random();}};
 const out=x[hook](context,Object.freeze(facts(o,extra)));if(!Array.isArray(out)||out.length>66)throw Error('Invalid six-hero program');return copy(out);
}
function origin(e,f,c){return {owner:f.i,heroId:e.indices[f.i],slot:c.slot,id:e.ability(f.i,c.slot).id,castId:c.id,born:e.t,round:e.round,direction:c.dir,aim:c.aim};}
export function sixReady(e,i,s,options={}){if(!sixEnabled(e,i,s))return true;try{const f=e.fighters[i],m=e.ability(i,s).mvp,aim=options.aim??e.fighters[1-i].x;if(!finite(aim,-1e4,1e4)||options.dir!==undefined&&![0,1,-1].includes(options.dir)||!finite(options.charge??0)||e.events.length>190||e.projectiles.length>=256||e.zones.length>=256||e.fighters.some(f=>f.buffs.length>=128))return false;const o=origin(e,f,{id:e.seq+1,slot:s,dir:options.dir||f.dir,aim:clamp(clamp(aim,f.x-m.range_wu,f.x+m.range_wu),45,1155)});invoke(e,o,'activate',{},true);return true;}catch{return false;}}
function execute(e,o,commands){const m=e.ability(o.owner,o.slot).mvp;let last=null;
 for(const c of commands){const f=e.fighters[o.owner],t=e.fighters[1-o.owner];
  switch(c.kind){
   case 'hit':{if(![0,1].includes(c.source)||c.target!==1-c.source||!finite(c.amount))throw Error('Invalid six-hero damage');const a=e.fighters[c.source],b=e.fighters[c.target];if(c.basic){e.basicHit(a,b,{owner:c.source,damage:c.bladeDance?e.bladeDance(a,c.amount):c.amount,m:c.recipe,id:o.id,dir:a.dir,range:m.tracking_break_wu});}else last=e.resolveDamage(a,b,c.amount,c.recipe,{skill:o.id,...(c.reflected?{reflected:true,noReflect:true,noLifesteal:true}:{})});break;}
   case 'target':{if(o.id!=='phantom_assassin_strike'||c.owner!==o.owner||c.target!==1-o.owner||c.range!==m.range_wu||c.reflectable!==true)throw Error('Invalid six-hero target route');const route=e.routeTargetedSpell({owner:c.owner,target:c.target,abilityId:o.id,range:c.range,reflectable:c.reflectable});last=execute(e,o,invoke(e,o,'onStage',{route}));break;}
   case 'buff':{if(![0,1].includes(c.owner)||!finite(c.duration,Number.MIN_VALUE,3600))throw Error('Invalid six-hero buff');e.addBuff(e.fighters[c.owner],c.key,c.values,c.duration);if(c.key!=='deadlyFocus')e.buff(e.fighters[c.owner],c.key).six=copy(o);if(c.key!=='deadlyFocus')trackSixProof(e,o,e.buff(e.fighters[c.owner],c.key),'buff',c);break;}
   case 'move':e.move(e.fighters[c.owner],c.x-e.fighters[c.owner].x);e.fx('dash',e.fighters[c.owner].x,80,e.hero(o.owner).color);break;
   case 'cleanse':e.dispel(f,c.tier);break;
   case 'protect':f.invuln=Math.max(f.invuln,c.duration);e.addBuff(f,'sixOmnislash',{sixOmnislash:true},c.duration);e.buff(f,'sixOmnislash').six=copy(o);trackSixProof(e,o,e.buff(f,'sixOmnislash'),'buff',c);break;
   case 'projectile':e.projectiles.push({owner:o.owner,x:c.x,y:c.y,dir:c.direction,v:c.speed,travel:0,range:c.range,r:c.radius,damage:m.damage,m:copy(m),id:o.id,reflected:false,six:copy(o)});trackSixProof(e,o,e.projectiles.at(-1),'projectile',c);break;
   case 'job':e.events.push({type:'six_hit',at:o.born+c.offset,owner:o.owner,index:c.index,six:copy(o)});trackSixProof(e,o,e.events.at(-1),'job',c);break;
   case 'wall':e.zones.push({type:'wall',owner:o.owner,x:c.x,life:c.duration,tick:0,m:copy(m),id:o.id,height:c.height,age:0,six:copy(o)});trackSixProof(e,o,e.zones.at(-1),'zone',c);break;
   case 'wave':e.zones.push({type:'expanding',owner:o.owner,x:c.x,life:c.duration,m:copy(m),id:o.id,age:0,hit:false,six:copy(o)});trackSixProof(e,o,e.zones.at(-1),'zone',c);break;
   default:throw Error('Unsupported six-hero command '+c.kind);
  }
 }
 return last;
}
export function activateSix(e,f,c){if(!sixEnabled(e,f.i,c.slot))return false;const o=origin(e,f,c),commands=invoke(e,o,'activate');beginSixProof(e,o,commands);execute(e,o,commands);e.fx('ring',f.x,70,e.hero(f.i).color,{size:c.m.radius_wu||100,life:.5,maxLife:.5});return true;}
export function sixJob(e,j){if(!j.six)return false;const o=j.six;if(j.type!=='six_hit')throw Error('Invalid six-hero job');const f=e.fighters[o.owner];execute(e,o,invoke(e,o,'onStage',{index:j.index,blocked:e.blocked(f)}));e.fx('slash',e.fighters[1-o.owner].x,100,e.hero(o.owner).color,{size:160,dir:f.dir});return true;}
export function sixContact(e,p){if(!p.six)return false;const o=p.six,t=e.fighters[1-p.owner],counter=e.buff(t,'counter');
 if(p.m.reflectable&&!p.reflected&&counter&&!counter.m.counter_type){reflectSixProof(e,p);p.owner=t.i;p.dir=-p.dir;p.reflected=true;p.travel=0;p.x=t.x+p.dir*35;t.buffs=t.buffs.filter(b=>b!==counter);e.fx('text',t.x,t.y+190,'#b5dcff',{text:'反制!'});return true;}
 const receipt=execute(e,o,invoke(e,o,'onContact',{source:p.owner}));
 if(o.id==='phantom_assassin_dagger')execute(e,o,invoke(e,o,'onAttack',{source:p.owner,landed:receipt?.landed===true}));p.dead=true;return true;
}
export function sixZone(e,z,dt){if(!z.six)return false;advanceSixProof(e,z,dt);const live=Math.min(dt,z.life);z.life-=dt;z.age+=live;if(z.type==='expanding'){const out=invoke(e,z.six,'onStage',{age:z.age,x:z.x,hit:z.hit});pulseSixProof(e,z,out.length>0);if(out.length){execute(e,z.six,out);z.hit=true;}}return true;}
// Restore rejects foreign sources, changed coefficients, duplicate pulses and due-time edits
// before any engine mutation. Tags bind native effects to stable slot/cast/round identities.
export function validSix(e,g){try{
 const origins=new Map(),jobs=new Set();
 const admit=o=>{if(!o||Object.keys(o).sort().join(',')!=='aim,born,castId,direction,heroId,id,owner,round,slot'||![0,1].includes(o.owner)||g.indices[o.owner]!==o.heroId||!slots.has(o.heroId+':'+o.slot)||o.round!==g.round||!Number.isSafeInteger(o.castId)||o.castId<1||o.castId>g.packClock.seq||!finite(o.born,0,g.t)||![-1,1].includes(o.direction)||!finite(o.aim,45,1155))throw Error('Invalid six source');const a=privateRuleSession(e).sealed.hero(o.heroId).abilities[o.slot];if(a.id!==o.id)throw Error('Foreign six ability');const key=o.owner+':'+o.castId;if(origins.has(key)&&!same(origins.get(key),o))throw Error('Conflicting six source');origins.set(key,o);return a.mvp;};
 for(const p of g.projectiles){if(!p.six){if(['pudge_hook','phantom_assassin_dagger'].includes(p.id))return false;continue;}const o=p.six,m=admit(o);if(!['pudge_hook','phantom_assassin_dagger'].includes(o.id)||!same(p.m,m)||p.id!==o.id||typeof p.reflected!=='boolean'||p.owner!==(p.reflected?1-o.owner:o.owner)||p.dir!==o.direction*(p.reflected?-1:1)||p.v!==m.projectile_speed_wu_s||p.range!==m.range_wu||p.r!==Math.max(12,m.radius_wu)||p.damage!==m.damage||!finite(p.travel,0,p.range)||!finite(p.x,0,1200)||!finite(p.y,-10000,10000)||p.basic)return false;}
 for(const z of g.zones){if(!z.six){if(['earthshaker_fissure','tidehunter_ravage'].includes(z.id))return false;continue;}const o=z.six,m=admit(o);if(!same(z.m,m)||z.owner!==o.owner||z.id!==o.id||!finite(z.age,0,3600)||!finite(z.life,Number.MIN_VALUE,3600))return false;const duration=o.id==='earthshaker_fissure'?m.duration_s:m.radius_wu/m.wave_speed_wu_s+.1;if(Math.abs(z.age+z.life-duration)>1e-6)return false;if(o.id==='earthshaker_fissure'){if(z.type!=='wall'||z.x!==o.aim||z.height!==m.wall_height_wu||z.tick!==0)return false;}else if(o.id!=='tidehunter_ravage'||z.type!=='expanding'||typeof z.hit!=='boolean'||!finite(z.x,45,1155))return false;}
 for(const j of g.packClock.events){if(!j.six){if(j.type==='six_hit'||j.type==='skill_hit'&&j.id==='juggernaut_omnislash')return false;continue;}const o=j.six,m=admit(o),key=o.owner+':'+o.castId+':'+j.index;if(Object.keys(j).sort().join(',')!=='at,index,owner,six,type'||o.id!=='juggernaut_omnislash'||j.type!=='six_hit'||j.owner!==o.owner||!Number.isInteger(j.index)||j.index<0||j.index>=m.ticks||j.at!==o.born+m.tick_offsets_s[j.index]||j.at<g.t-1e-7||jobs.has(key))return false;jobs.add(key);}
 for(const f of g.fighters)for(const b of f.buffs){if(!b.six){if(['earthshaker_totem','windranger_windrun','windranger_focus','phantom_assassin_strike','sixOmnislash'].includes(b.key))return false;continue;}const o=b.six,m=admit(o);let values,duration=m.duration_s;if(b.key==='sixOmnislash'&&o.id==='juggernaut_omnislash')values={sixOmnislash:true};else if(b.key===o.id){if(o.id==='earthshaker_totem')values={next_attack_override:m.next_attack_override,next_attack_range_bonus:m.next_attack_range_bonus};if(o.id==='windranger_windrun')values={move_multiplier:m.move_multiplier,basic_attack_evasion:m.basic_attack_evasion};if(o.id==='windranger_focus')values={attack_interval_override_s:m.attack_interval_override_s,attack_damage_override:m.attack_damage_override,move_attack:true};if(o.id==='phantom_assassin_strike'){values={attack_interval_multiplier:m.attack_interval_multiplier};duration=m.buff_duration_s;}}else if(b.key==='deadlyFocus'&&o.id==='phantom_assassin_dagger'){values={};duration=privateRuleSession(e).sealed.hero(6).abilities[3].mvp.slow_duration_s;}if(!values||!same(b.m,values)||!finite(b.life,Number.MIN_VALUE,duration+1e-7)||b.key!=='deadlyFocus'&&f.i!==o.owner)return false;}
 return validSixProof(e,g);
}catch{return false;}}
