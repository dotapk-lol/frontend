// Actual Engine adapter. State contains no alternate fighters, HP ledger, or runtime references.
import {createPackServices} from '../../pack-services.js';
import {RECORDS} from './definitions.js';
const definitions=RECORDS.map(r=>r.definition);
const byId=new Map(definitions.flatMap(h=>h.abilities.map(a=>[a.id,a])));
const executable=new Set(RECORDS.filter(r=>r.contract.realEngineImplemented).map(r=>r.definition.registryNumericId));
export const services=createPackServices('c56_90',{abilityIds:[...byId.keys()],entityKinds:['area'],eventKinds:['release','pulse','heal'],maxStatuses:64,maxEntities:32,maxJobs:64});
const own=(e,f)=>e.hero(f.i).packKey==='c56_90'&&executable.has(e.hero(f.i).registryNumericId);
const hero=(e,f,id)=>own(e,f)&&e.hero(f.i).registryNumericId===id;
const state=(e,f)=>services.fighter(e,f),data=(e,f)=>state(e,f).data;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const distance=(a,b)=>Math.abs(a.x-b.x);
const p=(id,key)=>{const n=byId.get(id)?.official.params[key];if(!Number.isFinite(n))throw Error('Missing canonical coefficient '+id+'.'+key);return n;};
const ability=(e,f,id)=>e.hero(f.i).abilities.find(a=>a.id===id);
const positive=(e,f,id)=>{const s=services.status(e,f,id);return s&&s.hostile===false&&services.effective(e,f,id)?s:null;};
const buff=(e,f,id,life,values={})=>services.applyPositiveStatus(e,f,{key:id,owner:f.i,duration:life,values:{abilityId:id,...values},dispel:id==='huskar_life_break'?'none':'basic',allowInvulnerable:false});
const removeBuff=(e,f,id)=>services.removeStatus(e,f,id);
const negative=(e,t,id,owner,life,values={},options={})=>services.applyStatus(e,t,{key:id,owner,duration:life,values:{abilityId:id,hostile:true,polarity:'hostile',...values},...options});
const value=(e,f,key)=>services.value(e,f,key,{mode:'sum'});
const damage=(e,f,t,n,id,type='magical',flags={})=>services.damageResult(e,f.i,t,n,{abilityId:id,type,...flags});
const heal=(e,f,n,id)=>services.heal(e,f,n,{skill:id});
const queue=(e,f,id,delay,kind='release',payload={},target=null)=>services.scheduleEffect(e,{abilityId:id,kind,owner:f.i,target,delay,data:payload});
const area=(e,f,id,x,radius,life,interval,follow=false)=>services.spawn(e,{kind:'area',owner:f.i,x,life,data:{abilityId:id,radius,interval,tick:0,follow,hit:false}});
const near=(f,t,r)=>t.hp>0&&distance(f,t)<=r+22&&Math.abs(f.y-t.y)<105;
const blood=(e,f)=>hero(e,f,57)&&e.passivesEnabled(f)?clamp((1-f.hp/f.maxHp)/(1-p('huskar_berserkers_blood','hp_threshold_max')/100),0,1):0;
const targeted=new Set(['huskar_life_break','night_stalker_void','jakiro_dual_breath','ogre_magi_fireblast','ogre_magi_ignite']);
const ground=new Set(['jakiro_ice_path','jakiro_macropyre','alchemist_acid_spray','treant_natures_grasp']);
const timedPositive=new Set(['huskar_life_break','night_stalker_darkness','alchemist_unstable_concoction','alchemist_chemical_rage','treant_living_armor','ogre_magi_bloodlust']);
// Standalone negative-effect helper also used by the preaudit regression; full Enchantress stays blocked.
export function applyEnchantSlow(e,source,target){return negative(e,target,'enchantress_enchant',source.i,p('enchantress_enchant','slow_duration'),{slow:-p('enchantress_enchant','slow_movement_speed')/100});}
function ignite(e,f,t){const id='ogre_magi_ignite';negative(e,t,id,f.i,p(id,'duration'),{dps:p(id,'burn_damage'),slow:-p(id,'slow_movement_speed_pct')/100},{interval:1});}
function fireblast(e,f,t){const id='ogre_magi_fireblast';damage(e,f,t,p(id,'fireblast_damage'),id);services.control(e,t,'stun',p(id,'stun_duration'));}
function multicast(e,f){if(!e.passivesEnabled(f))return 1;const id='ogre_magi_multicast',roll=e.random()*100,bonus=e.hero(f.i).attributes18.str/p(id,'strength_for_one_pct');return roll<p(id,'multicast_4_times')+bonus?4:roll<p(id,'multicast_3_times')+bonus?3:roll<p(id,'multicast_2_times')+bonus?2:1;}
function release(e,job){const f=e.fighters[job.owner],t=e.fighters[job.target??1-job.owner],id=job.abilityId;
 switch(id){
 case 'huskar_life_break':{removeBuff(e,f,id);if(t.invuln>0)return;e.move(f,t.x-Math.sign(t.x-f.x||1)*40-f.x);e.nonlethalSelfDamage(f,f.hp*p(id,'health_cost_percent'));damage(e,f,t,t.hp*p(id,'health_damage'),id);negative(e,t,id,f.i,p(id,'AbilityDuration'),{slow:-p(id,'movespeed')/100,aspd:-p(id,'attack_speed')});break;}
 case 'jakiro_dual_breath':if(near(f,t,ability(e,f,id).mvp.range_wu))negative(e,t,id,f.i,p(id,'AbilityDuration'),{slow:.4,aspd:-40,dps:p(id,'burn_damage')},{interval:1});break;
 case 'jakiro_ice_path':{const end=job.data.aim;area(e,f,id,(job.data.origin+end)/2,Math.abs(end-job.data.origin)/2+p(id,'path_radius')*.55,p(id,'path_duration'),0);break;}
 case 'alchemist_unstable_concoction':{
  removeBuff(e,f,id);if(job.data.self){damage(e,f,f,p(id,'max_damage'),id,'physical');services.control(e,f,'stun',p(id,'max_stun'));}
  else if(t.invuln<=0&&near(f,t,ability(e,f,id).mvp.range_wu)){damage(e,f,t,p(id,'max_damage'),id,'physical');services.control(e,t,'stun',p(id,'max_stun'));}
  else queue(e,f,id,p(id,'brew_explosion')-p(id,'brew_time'),'release',{self:true});break;
 }
 case 'treant_leech_seed':heal(e,f,job.data.amount,id);break;
 case 'ogre_magi_fireblast':fireblast(e,f,t);break;
 case 'ogre_magi_ignite':ignite(e,f,t);break;
 default:throw Error('Unknown C56 scheduled handler: '+id);
 }
}
function pulseArea(e,z){const id=z.data.abilityId,f=e.fighters[z.owner],t=e.fighters[1-z.owner];if(t.hp<=0||distance(z,t)>z.data.radius+22||t.y>=105)return;
 switch(id){
 case 'night_stalker_crippling_fear':{const admitted=negative(e,t,id,f.i,.12,{silence:1});if(admitted)damage(e,f,t,p(id,'dps')*z.data.interval,id);break;}
 case 'jakiro_macropyre':{const existing=services.status(e,t,id);if(existing){existing.life=p(id,'linger_duration');existing.duration=p(id,'linger_duration');existing.elapsed=0;}else negative(e,t,id,f.i,p(id,'linger_duration'),{dps:p(id,'damage')},{interval:p(id,'burn_interval')});break;}
 case 'alchemist_acid_spray':negative(e,t,id,f.i,z.data.interval+.05,{armor:-p(id,'armor_reduction')});damage(e,f,t,p(id,'damage')*z.data.interval,id,'physical');break;
 case 'treant_natures_grasp':if(negative(e,t,id,f.i,z.data.interval+.05,{slow:p(id,'movement_slow')/100}))damage(e,f,t,p(id,'damage_per_second')*z.data.interval,id);break;
 default:throw Error('Unknown C56 area handler: '+id);
 }
}
export const C56System={
 namespace:'c56_90',
 init(e){services.world(e);for(const f of e.fighters)state(e,f).data={spears:false,liquidFire:false,seed:false,dead:false,spearSequence:0};},
 cast(e,f,slot,options={}){
  if(!own(e,f))return false;
  const a=e.ability(f.i,slot),m=a?.mvp,t=e.fighters[1-f.i];
  if(!a||m.passive||f.hp<=0||e.phase!=='fight'||e.paused||e.blocked(f)||e.isSilenced(f)||f.cd[slot]>1e-8||f.cast||f.channel||f.recovery>0||f.mp<m.mana)return false;
  if(a.id==='huskar_life_break'&&e.controlRemaining(f,'root')>0)return false;
  if(targeted.has(a.id)&&(t.hp<=0||t.invuln>0||!near(f,t,m.range_wu)))return false;
  const aim=options.aim??t.x;
  if(ground.has(a.id)&&(!Number.isFinite(aim)||aim<45||aim>1155||Math.abs(aim-f.x)>m.range_wu+22))return false;
  const count=hero(e,f,82)&&['ogre_magi_fireblast','ogre_magi_ignite'].includes(a.id)?multicast(e,f):1;
  e.commitAction(f);f.mp-=m.mana;f.cd[slot]=m.cooldown_s;f.casts++;f.guard=false;
  const cast={id:++e.seq,slot,m:JSON.parse(JSON.stringify(m)),remaining:m.startup_frames/60,aim,dir:f.dir,multicast:count};
  if(targeted.has(a.id))e.notifyTargeted(f,t,a.id);
  if(cast.remaining>0)f.cast=cast;else this.activate(e,f,cast);
  e.animate(f,'cast',.35);e.log('cast',f.i,{skill:a.id,slot,cost:m.mana});return true;
 },
 activate(e,f,c){
  if(!own(e,f))return false;
  const a=e.ability(f.i,c.slot),id=a.id,t=e.fighters[1-f.i],d=data(e,f);f.recovery=a.mvp.recovery_frames/60;
  if(a.mvp.passive)throw Error('Passive activation forbidden');
  switch(id){
  case 'huskar_inner_fire':e.nonlethalSelfDamage(f,p(id,'health_cost'));if(near(f,t,p(id,'radius')*.55)){damage(e,f,t,p(id,'damage'),id);if(negative(e,t,id,f.i,p(id,'disarm_duration'),{silence:1}))e.move(t,f.x+Math.sign(t.x-f.x||1)*p(id,'knockback_distance')*.55-t.x);}break;
  case 'huskar_burning_spear':d.spears=!d.spears;break;
  case 'huskar_life_break':{
   if(t.hp<=0||t.invuln>0)break;e.dispel(f,'basic');const travel=distance(f,t)/(p(id,'charge_speed')*.55);
   buff(e,f,id,travel+.05,{debuffImmune:1,magicReduction:p(id,'immunity_resist')/100});queue(e,f,id,travel,'release',{},t.i);break;
  }
  case 'night_stalker_void':if(near(f,t,a.mvp.range_wu)){damage(e,f,t,p(id,'damage'),id);const night=!!positive(e,f,'night_stalker_darkness');negative(e,t,id,f.i,p(id,night?'duration_night':'duration_day'),{slow:p(id,'movespeed_slow')/100,aspd:-p(id,'attackspeed_slow')});if(night)services.control(e,t,'stun',.1);}break;
  case 'night_stalker_crippling_fear':area(e,f,id,f.x,p(id,'radius')*.55,p(id,positive(e,f,'night_stalker_darkness')?'duration_night':'duration_day'),p(id,'tick_rate'),true);break;
  case 'night_stalker_darkness':buff(e,f,id,p(id,'duration'));break;
  case 'jakiro_dual_breath':if(near(f,t,a.mvp.range_wu)){negative(e,t,id,f.i,p(id,'AbilityDuration'),{slow:.4,aspd:-40});queue(e,f,id,p(id,'fire_delay'),'release',{},t.i);}break;
  case 'jakiro_ice_path':queue(e,f,id,p(id,'path_delay'),'release',{origin:f.x,aim:clamp(c.aim,f.x-a.mvp.range_wu,f.x+a.mvp.range_wu)});break;
  case 'jakiro_liquid_fire':d.liquidFire=true;break;
  case 'jakiro_macropyre':{const end=clamp(c.aim,f.x-a.mvp.range_wu,f.x+a.mvp.range_wu);area(e,f,id,(f.x+end)/2,Math.abs(end-f.x)/2+p(id,'path_width')*.275,p(id,'duration'),p(id,'burn_interval'));break;}
  case 'alchemist_acid_spray':area(e,f,id,c.aim,p(id,'radius')*.55,p(id,'duration'),p(id,'tick_rate'));break;
  case 'alchemist_unstable_concoction':buff(e,f,id,p(id,'brew_time'));queue(e,f,id,p(id,'brew_time'));break;
  case 'alchemist_chemical_rage':e.dispel(f,'basic');buff(e,f,id,p(id,'duration'));break;
  case 'treant_natures_grasp':{const end=clamp(c.aim,f.x-a.mvp.range_wu,f.x+a.mvp.range_wu);area(e,f,id,(f.x+end)/2,Math.abs(end-f.x)/2+p(id,'latch_range')*.55,p(id,'vines_duration'),.5);break;}
  case 'treant_leech_seed':d.seed=true;break;
  case 'treant_living_armor':buff(e,f,id,p(id,'duration'),{block:p(id,'damage_block_base')});break;
  case 'treant_overgrowth':if(near(f,t,p(id,'radius')*.55)){negative(e,t,id,f.i,p(id,'duration'),{dps:p(id,'damage')},{dispel:'strong',pierces:true,interval:1});const admitted=services.control(e,t,'root',p(id,'duration'),true);if(admitted)negative(e,t,id+'_control',f.i,admitted,{abilityId:id,disarm:1},{dispel:'strong',pierces:true});}break;
  case 'ogre_magi_fireblast':case 'ogre_magi_ignite':{
   if(t.hp<=0||t.invuln>0)break;if(id==='ogre_magi_fireblast')fireblast(e,f,t);else ignite(e,f,t);
   for(let i=1;i<(c.multicast||1);i++)queue(e,f,id,i*p(id,'multicast_delay'),'pulse',{},t.i);break;
  }
  case 'ogre_magi_bloodlust':buff(e,f,id,p(id,'duration'));break;
  default:throw Error('Missing actual Engine handler: '+id);
  }
  e.log('activate',f.i,{skill:id,slot:c.slot});return true;
 },
 attack(e,f,t,n){
  if(positive(e,f,'night_stalker_darkness'))n+=p('night_stalker_darkness','bonus_damage');
  return n*(1-clamp(value(e,f,'attackReduction'),0,1));
 },
 attackInterval(e,f,t,seconds){
  let aspd=value(e,f,'aspd');
  if(hero(e,f,57))aspd+=blood(e,f)*p('huskar_berserkers_blood','maximum_attack_speed');
  if(positive(e,f,'ogre_magi_bloodlust'))aspd+=p('ogre_magi_bloodlust','self_bonus');
  const base=100+(e.hero(f.i).attributes18?.agi??e.hero(f.i).level18?.agility??0);
  if(positive(e,f,'alchemist_chemical_rage'))seconds=p('alchemist_chemical_rage','base_attack_time')*100/base;
  return seconds*base/clamp(base+aspd,20,700);
 },
 afterAttack(e,f,t,event,landed){
  if(!own(e,f)||!landed||f.hp<=0)return;
  const d=data(e,f);
  if(hero(e,f,57)&&d.spears&&t.hp>0){const id='huskar_burning_spear';e.nonlethalSelfDamage(f,f.maxHp*p(id,'max_health_cost')/100);const key=id+'_'+d.spearSequence;d.spearSequence=(d.spearSequence+1)%32;services.applyStatus(e,t,{key,owner:f.i,duration:p(id,'duration'),values:{abilityId:id,hostile:true,polarity:'hostile',dps:p(id,'burn_damage')+t.maxHp*p(id,'burn_damage_max_pct')/100},interval:1});}
  if(hero(e,f,58)&&e.passivesEnabled(f))heal(e,f,p('night_stalker_midnight_feast','attack_heal'),'night_stalker_midnight_feast');
  if(hero(e,f,62)&&d.liquidFire){d.liquidFire=false;const id='jakiro_liquid_fire';negative(e,t,id,f.i,p(id,'AbilityDuration'),{dps:p(id,'damage'),aspd:p(id,'slow_attack_speed_pct')},{interval:p(id,'tick_rate')});}
  if(hero(e,f,71)&&e.passivesEnabled(f)){const id='alchemist_corrosive_weaponry',old=services.status(e,t,id),stacks=Math.min(p(id,'max_stacks'),(old?.values.stacks||0)+p(id,'stacks_per_attack'));negative(e,t,id,f.i,p(id,'debuff_duration'),{stacks,slow:stacks*p(id,'slow_per_stack')/100,attackReduction:stacks*p(id,'attack_dmg_per_stack')/100});}
 },
 afterDamage(e,event){
  const {attacker:f,target:t,damage:actual,info,guard}=event;
  // Use actual debit from the original basic event, not afterAttack's boolean and not a nested bonus receipt.
  if(hero(e,f,81)&&data(e,f).seed&&info.basic&&!guard&&!info.reflected&&f!==t&&actual>0){
   data(e,f).seed=false;const id='treant_leech_seed';damage(e,f,t,p(id,'leech_damage'),id);
   const admitted=services.control(e,t,'root',p(id,'duration'));if(admitted)negative(e,t,id,f.i,admitted,{disarm:1},{dispel:'strong'});
   const amount=p(id,'flat_heal')+actual*p(id,'leech_heal')/100;
   for(let i=1;i<=p(id,'healing_pulse_count');i++)queue(e,f,id,i*.5,'heal',{amount});
  }
 },
 modifyDamage(e,event){
  if(event.m.damage_type==='physical')event.sharedArmor=(event.sharedArmor||0)+value(e,event.target,'armor');
  if(event.m.damage_type==='magical'){event.damage*=1-value(e,event.target,'magicReduction');if(hero(e,event.target,57))event.damage*=1-blood(e,event.target)*p('huskar_berserkers_blood','maximum_magic_resist')/100;}
 },
 beforeDamage(e,event){const b=positive(e,event.target,'treant_living_armor');if(b&&event.damage>=p(b.key,'damage_block_threshold')){event.damage=Math.max(0,event.damage-b.values.block);b.values.block-=p(b.key,'damage_block_loss');if(b.values.block<=0)removeBuff(e,event.target,b.key);}},
 silenced(e,f){return value(e,f,'silence')>0;},
 disarmed(e,f){return value(e,f,'disarm')>0;},
 moveMultiplier(e,f){
  let bonus=0;if(positive(e,f,'ogre_magi_bloodlust'))bonus+=p('ogre_magi_bloodlust','bonus_movement_speed')/100;
  if(positive(e,f,'alchemist_unstable_concoction'))bonus+=p('alchemist_unstable_concoction','move_speed')/100;
  if(positive(e,f,'alchemist_chemical_rage'))bonus+=p('alchemist_chemical_rage','bonus_movespeed')*.8/e.hero(f.i).move_speed;
  return (1+bonus)*(1-clamp(value(e,f,'slow'),0,1));
 },
 dispel(e,f,tier,options={hostile:true}){services.dispel(e,f,tier,options);},
 interrupted(e,f){
  // No V4 registered ability is a channel. Core cancels windups; thrown spells/brew continue.
  // Do not cancel ordinary delayed effects when a later, unrelated stun occurs.
 },
 tick(e,dt){
  for(const f of e.fighters){
   for(const b of state(e,f).statuses){if(b.hostile||!services.effective(e,f,b.key))continue;const live=Math.min(dt,b.life);if(f.hp>0){if(b.key==='alchemist_chemical_rage')heal(e,f,p(b.key,'bonus_health_regen')*live,b.key);if(b.key==='treant_living_armor')heal(e,f,p(b.key,'heal_per_second')*live,b.key);}}
   services.advanceStatuses(e,f,dt,(s,enabled)=>{if(enabled&&s.values.dps&&f.hp>0)damage(e,e.fighters[s.owner],f,s.values.dps*s.interval,s.values.abilityId);});
   if(f.hp>0&&hero(e,f,57))heal(e,f,e.hero(f.i).attributes18.str*p('huskar_berserkers_blood','maximum_health_regen')/100*blood(e,f)*dt,'huskar_berserkers_blood');
  }
  services.runDue(e,job=>release(e,job));
  const w=services.world(e);
  for(const z of w.entities){
   const f=e.fighters[z.owner],t=e.fighters[1-z.owner],id=z.data.abilityId;
   if(f.hp<=0){z.life=0;continue;}const live=Math.min(dt,Math.max(0,z.life));z.life-=live;if(z.data.follow)z.x=f.x;
   if(id==='jakiro_ice_path'){if(!z.data.hit&&t.hp>0&&t.invuln<=0&&distance(z,t)<=z.data.radius+22&&t.y<105){z.data.hit=true;damage(e,f,t,p(id,'damage'),id);services.control(e,t,'stun',p(id,'stun_duration'));}continue;}
   if(id==='night_stalker_crippling_fear'&&(distance(z,t)>z.data.radius+22||t.y>=105))services.removeStatus(e,t,id);
   z.data.tick+=live;while(z.data.tick>=z.data.interval-1e-8){z.data.tick-=z.data.interval;pulseArea(e,z);}
  }
  w.entities=w.entities.filter(z=>z.life>1e-8);
 },
 endStep(e){for(const f of e.fighters){const d=data(e,f);if(f.hp<=0&&!d.dead){d.dead=true;d.seed=false;d.liquidFire=false;d.spears=false;state(e,f).statuses=[];services.cancelOwnerEffects(e,f.i,{includePersistent:true});const w=services.world(e);w.entities=w.entities.filter(z=>z.owner!==f.i);}}},
 validateSnapshot(e,snapshot){return validateOwn(e,snapshot);}
};
function canonicalNegative(n,target){
 const id=n.values.abilityId;
 const expected={huskar_inner_fire:{silence:1},huskar_life_break:{slow:.6,aspd:-140},night_stalker_void:{slow:.5,aspd:-50},night_stalker_crippling_fear:{silence:1},jakiro_liquid_fire:{dps:48,aspd:-60},jakiro_macropyre:{dps:200},alchemist_acid_spray:{armor:-6},treant_natures_grasp:{slow:.4},treant_leech_seed:{disarm:1}};
 let fields=expected[id];
 if(id==='huskar_burning_spear')fields={dps:16+target.maxHp*.005};
 if(id==='jakiro_dual_breath')fields=n.interval?{slow:.4,aspd:-40,dps:80}:{slow:.4,aspd:-40};
 if(id==='alchemist_corrosive_weaponry'){const stacks=n.values.stacks;if(!Number.isInteger(stacks)||stacks<2||stacks>16||stacks%2)return false;fields={stacks,slow:stacks*.04,attackReduction:stacks*.04};}
 if(id==='treant_overgrowth')fields=n.key.endsWith('_control')?{disarm:1}:{dps:95};
 if(id==='ogre_magi_ignite')fields={dps:50,slow:.25};
 if(!fields)return false;const allowed={abilityId:id,hostile:true,polarity:'hostile',...fields};
 if(JSON.stringify(Object.keys(n.values).sort())!==JSON.stringify(Object.keys(allowed).sort()))return false;
 if(Object.entries(allowed).some(([k,v])=>typeof v==='number'?Math.abs(n.values[k]-v)>1e-8:n.values[k]!==v))return false;
 const strong=id==='treant_overgrowth'||id==='treant_leech_seed';
 return n.hostile===true&&n.polarity==='hostile'&&n.group===null&&n.allowInvulnerable===false&&n.pierces===(id==='treant_overgrowth')&&n.dispel===(strong?'strong':'basic');
}
function validateOwn(e,g){
 try{
  if(!services.validateSnapshot(g))return false;
  const w=g.packModules.c56_90;
  if(Object.keys(w.data).length!==0||Object.keys(w).sort().join(',')!=='data,entities,jobs,revisions')return false;
  const validOwner=(owner,id)=>e.hero(owner).abilities.some(a=>a.id===id)&&own(e,e.fighters[owner]);
  const only=(o,keys)=>Object.keys(o).every(k=>keys.includes(k));
  const finite=(n,lo=0,hi=100000)=>Number.isFinite(n)&&n>=lo&&n<=hi;
  for(const f of g.fighters){const s=f.packModules.c56_90,d=s.data;if(Object.keys(s).sort().join(',')!=='data,statuses')return false;
   if(![0,1].includes(f.i)||g.fighters[f.i]!==f)return false;
   if(own(e,e.fighters[f.i])){if(f.channel)return false;if(f.cast){const c=f.cast,a=e.hero(f.i).abilities[c.slot];if(!a||a.mvp.passive||JSON.stringify(c.m)!==JSON.stringify(a.mvp)||!Number.isSafeInteger(c.id)||!finite(c.remaining,0,a.mvp.startup_frames/60)||!finite(c.aim,45,1155)||![-1,1].includes(c.dir)||!Number.isInteger(c.multicast)||c.multicast<1||c.multicast>4||!['ogre_magi_fireblast','ogre_magi_ignite'].includes(a.id)&&c.multicast!==1)return false;}}

   if(!only(d,['spears','liquidFire','seed','dead','spearSequence'])||Object.keys(d).length!==5||!['spears','liquidFire','seed','dead'].every(k=>typeof d[k]==='boolean')||!Number.isInteger(d.spearSequence)||d.spearSequence<0||d.spearSequence>=32)return false;
   if(new Set(s.statuses.map(x=>x.key)).size!==s.statuses.length)return false;
   for(const n of s.statuses){const v=n.values;if(Object.keys(n).sort().join(',')!=='allowInvulnerable,dispel,duration,elapsed,group,hostile,interval,key,life,owner,pierces,polarity,tick,values')return false;
    if(!n.hostile){if(!timedPositive.has(n.key)||!validOwner(n.owner,n.key)||n.owner!==f.i||v.abilityId!==n.key||n.polarity!=='positive'||n.pierces!==false||!finite(n.life,0,35)||!only(v,n.key==='treant_living_armor'?['abilityId','block']:n.key==='huskar_life_break'?['abilityId','debuffImmune','magicReduction']:['abilityId']))return false;if(n.key==='treant_living_armor'&&!finite(v.block,0,120))return false;if(n.key==='huskar_life_break'&&(v.debuffImmune!==1||v.magicReduction!==.6||n.dispel!=='none'))return false;continue;}
    if(!canonicalNegative(n,f)||!validOwner(n.owner,v.abilityId)||v.hostile!==true||v.polarity!=='hostile'||!only(v,['abilityId','hostile','polarity','slow','aspd','dps','silence','disarm','armor','attackReduction','stacks']))return false;
    if(!(n.key===v.abilityId||n.key===v.abilityId+'_control'||v.abilityId==='huskar_burning_spear'&&/^huskar_burning_spear_(?:[0-9]|[12][0-9]|3[01])$/.test(n.key)))return false;
    if(!finite(n.life,0,16)||!finite(n.duration,0,16)||!finite(n.elapsed,0,100)||!finite(n.tick,-1e-7,n.interval||n.duration)||!finite(n.interval,0,1))return false;
    for(const [k,vv] of Object.entries(v))if(!['abilityId','hostile','polarity'].includes(k)&&!finite(vv,k==='aspd'?-210:k==='armor'?-6:0,k==='dps'?Math.max(200,f.maxHp*.005+16):k==='aspd'?0:k==='stacks'?16:k==='armor'?0:1))return false;
   }
  }
  for(const j of w.jobs){if(Object.keys(j).sort().join(',')!=='abilityId,at,cancelOnInterrupt,data,id,kind,owner,persist,revision,target')return false;if(!validOwner(j.owner,j.abilityId)||!finite(j.at,0,100)||j.persist!==false||j.cancelOnInterrupt!==false)return false;
   const id=j.abilityId,expectedKind=id==='treant_leech_seed'?'heal':id.startsWith('ogre_magi_')?'pulse':'release';if(j.kind!==expectedKind)return false;
   if(id==='treant_leech_seed'){if(!only(j.data,['amount'])||!finite(j.data.amount,45,100000))return false;}
   else if(id==='jakiro_ice_path'){if(!only(j.data,['origin','aim'])||!finite(j.data.origin,45,1155)||!finite(j.data.aim,45,1155))return false;}
   else if(id==='alchemist_unstable_concoction'){if(!only(j.data,['self'])||j.data.self!==undefined&&j.data.self!==true)return false;}
   else if(!['huskar_life_break','jakiro_dual_breath','ogre_magi_fireblast','ogre_magi_ignite'].includes(id)||Object.keys(j.data).length)return false;
  }
  const areaIds=['night_stalker_crippling_fear','jakiro_ice_path','jakiro_macropyre','alchemist_acid_spray','treant_natures_grasp'];
  for(const z of w.entities){const d=z.data;if(Object.keys(z).sort().join(',')!=='data,id,kind,life,owner,x,y')return false;if(z.kind!=='area'||!areaIds.includes(d.abilityId)||!validOwner(z.owner,d.abilityId)||!only(d,['abilityId','radius','interval','tick','follow','hit'])||Object.keys(d).length!==6||!finite(z.life,0,15)||!finite(z.x,45,1155)||z.y!==0||!finite(d.radius,0,1000)||!finite(d.tick,-1e-7,1)||typeof d.follow!=='boolean'||typeof d.hit!=='boolean'||d.follow!==(d.abilityId==='night_stalker_crippling_fear'))return false;
   const intervals={night_stalker_crippling_fear:.1,jakiro_ice_path:0,jakiro_macropyre:.5,alchemist_acid_spray:1,treant_natures_grasp:.5};if(d.interval!==intervals[d.abilityId])return false;
  }
  return true;
 }catch{return false;}
}
