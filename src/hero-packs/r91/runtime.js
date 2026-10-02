import {createExtraSystem,EXTRA_IDS} from './extra.js';
import {DEFINITIONS as R91_DEFINITIONS} from './definitions.js';
import {validateSnapshot} from './snapshot.js';
import {validateAim} from './targeting.js';
import {createPackServices,PACK_ABI_VERSION} from '../../pack-services.js';
if(!['duel-pack-2.1-status','duel-pack-2.2-hp','duel-pack-2.3-control','duel-pack-2.4-targeting'].includes(PACK_ABI_VERSION))throw Error('R91 V5 requires frozen public ABI2.1');
const r91FirstIds=new Set([94,97,99,...EXTRA_IDS]);
const r91Sources=R91_DEFINITIONS.filter(p=>r91FirstIds.has(p.definition.registryNumericId));
export const api=createPackServices('r91',{entityKinds:['homing','flare','extra'],eventKinds:['stomp','quill','extra'],abilityIds:r91Sources.flatMap(p=>p.definition.abilities.map(a=>a.id))});
const Extra=createExtraSystem(api);
const r91Own=(e,f)=>r91FirstIds.has(e.hero(f.i).registryNumericId)&&e.hero(f.i).packKey==='r91';
const r91Key=(e,f)=>e.hero(f.i).key;
const r91Param=(a,key)=>{const value=a.official.params[key];if(!Number.isFinite(value))throw Error('Missing reviewed coefficient '+a.id+'.'+key);return value;};
const r91State=(e,f)=>api.fighter(e,f);
const r91Status=(e,f,key)=>api.status(e,f,key);
const r91Effective=(e,f,key)=>api.effective(e,f,key);
const positive=(owner,extra)=>({owner,hostile:false,polarity:'positive',pierces:false,...extra});
const r91Ability=(e,f,id)=>e.hero(f.i).abilities.find(a=>a.id===id);
const r91Hit=(e,owner,target,amount,type,skill,flags={})=>api.damageResult(e,owner,target,amount,{type,abilityId:skill,...flags});
const r91Debuff=(e,t,key,owner,duration,values={},tier='basic',pierces=false,origin=owner)=>{const s=api.applyStatus(e,t,{key,owner,duration,values,dispel:tier,pierces});if(s){s.origin=origin;}return s;};
const r91Distance=(a,b)=>Math.abs(a.x-b.x);
const r91Back=(e,f,other)=>{const input=e.input[f.i],moving=(input.right?1:0)-(input.left?1:0);return (other.x-f.x)*(moving||f.dir)<0;};
const r91DebuffDuration=(e,owner,t,seconds)=>r91Key(e,owner)==='bristleback'&&e.passivesEnabled(owner)&&r91Back(e,owner,t)?seconds*1.045:seconds;
function r91Quill(e,f,reflected=false){const t=e.fighters[1-f.i],a=r91Ability(e,f,'bristleback_quill_spray');if(t.hp<=0||t.invuln>0||r91Distance(f,t)>r91Param(a,'radius')*.55+22)return;const stacks=r91State(e,t).data.quills.filter(s=>s.owner===f.i).length;r91Hit(e,f.i,t,Math.min(r91Param(a,'max_damage'),r91Param(a,'quill_base_damage')+stacks*r91Param(a,'quill_stack_damage')),'physical',a.id,{reflected});const list=r91State(e,t).data.quills;if(list.length>=64)list.shift();list.push({owner:f.i,life:r91DebuffDuration(e,f,t,r91Param(a,'quill_stack_duration')),hostile:true,polarity:'hostile',pierces:true});}
function r91FireMissile(e,f,t,a,damage,speed,slow=null){api.spawn(e,{kind:'homing',owner:f.i,x:f.x,y:f.y+100,life:8,data:{target:t.i,abilityId:a.id,damage,speed:speed*.55,slow,reflected:false}});}
export const R91Combat={
 namespace:'r91',
 validateSnapshot(e,g){return api.validateSnapshot(g)&&validateSnapshot(e,g);},
 init(e){api.world(e);for(const f of e.fighters){const state=r91State(e,f);state.data={barriers:[],stampede:null,windup:null,dead:false,quills:[],warpath:[],backDamage:0};}Extra.init(e);},
 cast(e,f,slot,options={}){
  if(!r91Own(e,f))return false;const a=e.ability(f.i,slot),m=a?.mvp,t=e.fighters[1-f.i];
  if(!a||m.passive||f.hp<=0||e.phase!=='fight'||e.paused||e.blocked(f)||e.isSilenced(f)||f.cd[slot]>1e-8||f.cast||f.channel||f.recovery>0||f.mp<m.mana)return false;
  if(!validateAim(e,f,a,options).ok||!Extra.validate(e,f,a,options))return false;
  const targeted=['bristleback_viscous_nasal_goo','centaur_double_edge','skywrath_mage_arcane_bolt','skywrath_mage_concussive_shot','skywrath_mage_ancient_seal'].includes(a.id),ground=a.id==='skywrath_mage_mystic_flare';
  const aim=options.aim??t.x;
  Extra.onCast(e,f,a);e.commitAction(f);f.mp-=m.mana;f.cd[slot]=m.cooldown_s;f.casts++;f.guard=false;const cast={id:++e.seq,slot,m:JSON.parse(JSON.stringify(m)),remaining:m.startup_frames/60,aim:options.aim??t.x,explicitAim:options.aim!==undefined};
  if(r91Key(e,f)==='bristleback'&&e.passivesEnabled(f)){const list=r91State(e,f).data.warpath;if(list.length>=12)list.shift();list.push(positive(f.i,{life:20}));}if(targeted)e.notifyTargeted(f,t,a.id);if(cast.remaining>0)f.cast=cast;else this.activate(e,f,cast);e.animate(f,'cast',.35);e.log('cast',f.i,{skill:a.id,slot,cost:m.mana});return true;
 },
 activate(e,f,c){if(!r91Own(e,f))return false;const a=e.ability(f.i,c.slot);let t=e.fighters[1-f.i],source=f.i;f.recovery=.2;const counter=e.buff(t,'counter');if(['centaur_double_edge','skywrath_mage_ancient_seal'].includes(a.id)&&counter&&!counter.m.counter_type&&r91Distance(f,t)<=a.mvp.range_wu+22){t.buffs=t.buffs.filter(b=>b!==counter);source=t.i;t=f;}
  if(Extra.activate(e,f,a,c)){e.log('activate',f.i,{skill:a.id,slot:c.slot});return true;}
  switch(a.id){
   case 'bristleback_viscous_nasal_goo':{r91FireMissile(e,f,t,a,0,r91Param(a,'goo_speed'));api.world(e).entities.at(-1).data.goo=true;break;}
   case 'bristleback_quill_spray':r91Quill(e,f);break;
   case 'centaur_hoof_stomp':{f.recovery=0;const duration=r91Param(a,'windup_time');r91State(e,f).data.windup={owner:f.i,hostile:false,polarity:'self_restriction',pierces:false,life:duration};api.scheduleEffect(e,{abilityId:a.id,kind:'stomp',owner:f.i,target:t.i,delay:duration,cancelOnInterrupt:true});break;}
   case 'centaur_double_edge':{if(t.hp<=0||r91Distance(f,t)>a.mvp.range_wu+22)break;const damage=r91Param(a,'edge_damage')+e.hero(f.i).attributes18.str*r91Param(a,'strength_damage')/100;r91Hit(e,source,t,damage,'magical',a.id,{reflected:source!==f.i});e.resolveDamage(f,f,damage,{damage_type:'magical',blockable:false,chip:true},{skill:a.id,dot:true,noReflect:true,noLifesteal:true});break;}
   case 'centaur_stampede':r91State(e,f).data.stampede=positive(f.i,{life:r91Param(a,'duration'),hit:[]});break;
   case 'skywrath_mage_arcane_bolt':if(t.hp>0)r91FireMissile(e,f,t,a,r91Param(a,'bolt_damage')+e.hero(f.i).attributes18.int*r91Param(a,'int_multiplier'),r91Param(a,'bolt_speed'));break;
   case 'skywrath_mage_concussive_shot':if(t.hp>0)r91FireMissile(e,f,t,a,r91Param(a,'damage'),r91Param(a,'speed'),{duration:r91Param(a,'slow_duration'),amount:r91Param(a,'movement_speed_pct')/100});break;
   case 'skywrath_mage_ancient_seal':r91Debuff(e,t,'seal',source,r91Param(a,'seal_duration'),{magicAmp:-r91Param(a,'resist_debuff')/100,silence:true},'basic',false,f.i);break;
   case 'skywrath_mage_mystic_flare':{const x=Math.max(45,Math.min(1155,c.aim));api.spawn(e,{kind:'flare',owner:f.i,x,life:r91Param(a,'duration'),data:{abilityId:a.id,radius:r91Param(a,'radius')*.55,interval:r91Param(a,'damage_interval'),tick:0,damage:r91Param(a,'damage')/(r91Param(a,'duration')/r91Param(a,'damage_interval'))}});break;}
   default:throw Error('R91 selected ability has no integrated handler: '+a.id);
  }
  e.log('activate',f.i,{skill:a.id,slot:c.slot});return true;
 },
 silenced(e,f){return api.hasValue(e,f,'silence');},
 disarmed(e,f){return !!r91State(e,f).data.windup||Extra.disarmed(e,f);},
 attack(e,f,t,damage,m){return Extra.attack(e,f,t,damage+r91State(e,f).data.warpath.length*20,m);},
 modifyDamage(e,event){const f=event.attacker,t=event.target;if(r91Key(e,f)==='bristleback'&&e.passivesEnabled(f)&&r91Back(e,f,t))event.damage*=1.045;if(r91Key(e,t)==='bristleback'&&e.passivesEnabled(t)&&r91Back(e,t,f))event.damage*=.6;if(event.m.damage_type==='physical')event.sharedArmor=(event.sharedArmor||0)-api.value(e,t,'armor',{mode:'sum'});if(event.m.damage_type==='magical')event.damage*=1+api.value(e,t,'magicAmp');Extra.modifyDamage(e,event);},
 beforeDamage(e,event){const {target,m}=event,state=r91State(e,target);if(m.damage_type==='magical'){for(const barrier of state.data.barriers){const take=Math.min(barrier.amount,event.damage);barrier.amount-=take;event.damage-=take;}}Extra.beforeDamage(e,event);},
 afterDamage(e,event){Extra.afterDamage(e,event);const {attacker:f,target:t,damage,m,info,guard}=event;
  if(damage>0&&f!==t&&t.hp>0&&!info.reflected&&!info.noReflect&&r91Key(e,t)==='bristleback'&&e.passivesEnabled(t)&&r91Back(e,t,f)){const data=r91State(e,t).data;data.backDamage+=damage;while(data.backDamage>=200){data.backDamage-=200;api.scheduleEffect(e,{abilityId:'bristleback_quill_spray',kind:'quill',owner:t.i,target:f.i,delay:.1,data:{reflected:true}});}}
  if(damage>0&&f!==t&&!info.reflected&&r91Key(e,f)==='skywrath_mage'&&e.passivesEnabled(f)&&m.damage_type==='magical'&&info.skill?.startsWith('skywrath_mage_')){const barriers=r91State(e,f).data.barriers;if(barriers.length>=64)barriers.shift();barriers.push(positive(f.i,{amount:13.5,life:12}));}

 },
 afterAttack(e,f,t,event,landed){if(landed&&t.hp>0&&f!==t&&r91Key(e,t)==='centaur'&&e.passivesEnabled(t)){const a=r91Ability(e,t,'centaur_return');r91Hit(e,t.i,f,r91Param(a,'return_damage')+e.hero(t.i).attributes18.str*r91Param(a,'return_damage_str')/100,'physical',a.id,{reflected:true});}Extra.afterAttack(e,f,t,event,landed);},
 dispel(e,f,tier){api.dispel(e,f,tier);},
 interrupted(e,f){api.cancelOwnerEffects(e,f.i);r91State(e,f).data.windup=null;Extra.interrupted(e,f);},
 moveMultiplier(e,f){const state=r91State(e,f);const slow=api.value(e,f,'moveSlow');let speed=e.hero(f.i).move_speed;if(r91Key(e,f)==='centaur'&&e.passivesEnabled(f))speed+=e.hero(f.i).attributes18.str*.4*.55;if(state.data.stampede)speed=Math.max(speed,330);return speed/e.hero(f.i).move_speed*(1+state.data.warpath.length*.03)*(1-Math.min(.95,slow))*Extra.moveMultiplier(e,f);},
 tick(e,dt){
  Extra.beforeTick(e);
  for(const f of e.fighters){api.advanceStatuses(e,f,dt,(s,enabled)=>Extra.statusTick(e,f,s,enabled));const data=r91State(e,f).data;if(data.windup){data.windup.life-=dt;if(data.windup.life<=1e-8)data.windup=null;}if(f.hp>0)data.dead=false;for(const list of [data.quills,data.warpath])for(const s of list)s.life-=dt;data.quills=data.quills.filter(s=>s.life>1e-8);data.warpath=data.warpath.filter(s=>s.life>1e-8);for(const b of data.barriers)b.life-=dt;data.barriers=data.barriers.filter(b=>b.life>1e-8&&b.amount>1e-8);const stamp=data.stampede;if(stamp){stamp.life-=dt;const t=e.fighters[1-f.i],a=r91Ability(e,f,'centaur_stampede');if(f.hp>0&&t.hp>0&&t.invuln<=0&&!stamp.hit.includes(t.i)&&r91Distance(f,t)<=r91Param(a,'radius')*.55+22){stamp.hit.push(t.i);r91Hit(e,f.i,t,e.hero(f.i).attributes18.str*r91Param(a,'strength_damage'),'magical',a.id);r91Debuff(e,t,'stampede_slow',f.i,r91Param(a,'slow_duration'),{moveSlow:r91Param(a,'slow_movement_speed')/100});}if(stamp.life<=1e-8)data.stampede=null;}}
  api.runDue(e,job=>{if(job.kind==='extra'){Extra.dispatch(e,job);return;}const f=e.fighters[job.owner],t=e.fighters[job.target],a=r91Ability(e,f,job.abilityId);if(job.kind==='quill'){r91Quill(e,f,true);return;}if(job.kind==='stomp'&&r91Distance(f,t)<=r91Param(a,'radius')*.55+22&&t.y<45){r91Hit(e,f.i,t,r91Param(a,'stomp_damage'),'magical',a.id);api.control(e,t,'stun',r91Param(a,'stun_duration'));}else if(job.kind!=='stomp')throw Error('Unknown R91 effect kind');});
  const world=api.world(e);for(const entity of world.entities){if(entity.kind==='extra')continue;const live=Math.min(dt,entity.life);entity.life-=live;const data=entity.data,f=e.fighters[entity.owner],t=e.fighters[data.target??1-entity.owner];
   if(entity.kind==='flare'){data.tick+=live;while(data.tick>=data.interval-1e-8){data.tick-=data.interval;if(t.hp>0&&r91Distance(entity,t)<=data.radius+22&&t.y<100)r91Hit(e,entity.owner,t,data.damage,'magical',data.abilityId);}continue;}
   if(entity.kind!=='homing')throw Error('Unknown R91 entity');if(f.hp<=0||t.hp<=0){entity.life=0;continue;}const dx=t.x-entity.x,dy=t.y+100-entity.y,d=Math.hypot(dx,dy),travel=data.speed*live;if(d<=travel+22){const counter=e.buff(t,'counter');if(counter&&!counter.m.counter_type&&!data.reflected){t.buffs=t.buffs.filter(b=>b!==counter);data.target=entity.owner;entity.owner=t.i;data.reflected=true;entity.x=t.x;entity.y=t.y+100;continue;}if(data.goo){const a=r91Ability(e,e.fighters[data.reflected?data.target:entity.owner],data.abilityId)||r91Sources.find(p=>p.definition.key==='bristleback').definition.abilities[0],old=r91Status(e,t,'goo'),n=Math.min(r91Param(a,'stack_limit'),(old?.values.stacks||0)+1);r91Debuff(e,t,'goo',entity.owner,r91DebuffDuration(e,f,t,r91Param(a,'goo_duration')),{stacks:n,armor:r91Param(a,'base_armor')+r91Param(a,'armor_per_stack')*n,moveSlow:(r91Param(a,'base_move_slow')+r91Param(a,'move_slow_per_stack')*n)/100},'basic',false,data.reflected?data.target:entity.owner);}else r91Hit(e,entity.owner,t,data.damage,'magical',data.abilityId,{reflected:data.reflected});if(data.slow)r91Debuff(e,t,'concussive_slow',entity.owner,data.slow.duration,{moveSlow:data.slow.amount},'basic',false,data.reflected?data.target:entity.owner);entity.life=0;}else{entity.x+=dx/d*travel;entity.y+=dy/d*travel;}}
  Extra.tick(e,dt);world.entities=world.entities.filter(x=>x.life>1e-8);
 },
 endStep(e){for(const f of e.fighters)if(f.hp<=0&&!r91State(e,f).data.dead){const state=r91State(e,f);state.data.dead=true;state.statuses=[];state.data.barriers=[];state.data.stampede=null;state.data.windup=null;state.data.quills=[];state.data.warpath=[];state.data.backDamage=0;api.cancelOwnerEffects(e,f.i);api.world(e).entities=api.world(e).entities.filter(z=>z.owner!==f.i);}Extra.endStep(e);},
};
