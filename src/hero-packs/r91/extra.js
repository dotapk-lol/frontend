// V6 ABI2.4 explicitly simplified 1v1 spell programs. This module only operates real Engine objects.
export const EXTRA_IDS=[104,106,117,121,124];
const own=(e,f)=>EXTRA_IDS.includes(e.hero(f.i).registryNumericId),key=(e,f)=>e.hero(f.i).key;
const near=(a,b,r)=>Math.abs(a.x-b.x)<=r*.55+22&&Math.abs(a.y-b.y)<130;
const p=(a,k)=>{const x=a.official.params[k];if(!Number.isFinite(x))throw Error('Missing coefficient '+a.id+'.'+k);return x;};
const canonical=(e,i,id)=>e.hero(i).abilities.find(a=>a.id===id),clamp=x=>Math.max(45,Math.min(1155,x));
const rules={
 x_chains:['ember_spirit_searing_chains',true,2.75,{dps:100},.25],
 x_flame:['ember_spirit_flame_guard',false,18,{amount:[0,300],dps:50},.2],
 x_fireburn:['abyssal_underlord_firestorm',true,2,{percent:.03},1],
 x_atrophy_gain:['abyssal_underlord_atrophy_aura',false,60,{bonusDamage:45},0],
 x_pulse:['void_spirit_resonant_pulse',false,10,{amount:[0,210]},0],
 x_voidmark:['void_spirit_astral_step',true,1.25,{moveSlow:.8,pop:330},1.25],
 x_shortslow:['dawnbreaker_fire_wreath',true,.12,{moveSlow:1},0],
 x_hammer_slow:['dawnbreaker_celestial_hammer',true,.6,{moveSlow:.36},0],
 x_deadslow:['muerta_dead_shot',true,1,{moveSlow:1},0],
 x_call_slow:['muerta_the_calling',true,.2,{moveSlow:.2},0],
 x_call_silence:['muerta_the_calling',true,3,{silence:true},0],
 x_veil:['muerta_pierce_the_veil',false,8,{physicalImmune:true,veil:true},0],
};
const jobOps={ember_spirit_sleight_of_fist:['sleight'],ember_spirit_fire_remnant:['remnant'],abyssal_underlord_dark_portal:['gate'],void_spirit_dissimilate:['phase'],dawnbreaker_fire_wreath:['star'],dawnbreaker_celestial_hammer:['hammer_out','hammer_return'],dawnbreaker_solar_guardian:['solar_pulse','solar_fly','solar_land'],muerta_dead_shot:['deadshot'],muerta_pierce_the_veil:['veil']};
const fieldModes={ember_spirit_fire_remnant:['remnant'],abyssal_underlord_firestorm:['storm'],abyssal_underlord_pit_of_malice:['pit'],abyssal_underlord_dark_portal:['gate'],void_spirit_aether_remnant:['aether'],dawnbreaker_celestial_hammer:['hammer_burn'],muerta_the_calling:['calling']};
export function createExtraSystem(api){
 // Transaction-local correlation only: Engine invokes afterAttack synchronously after damage.
 // No receipt/cache is serialized into fighters or world state.
 const receipts=new WeakMap();
 const state=(e,f)=>api.fighter(e,f).data.extra;
 const control=(e,f,t,a,type,duration,dispel='strong')=>api.applyControlSource(e,t,{owner:f.i,key:'r91:'+a.id,type,duration,dispel});
 const damage=(e,f,t,n,a,type=a.official.damageType,flags={})=>api.damageResult(e,f.i,t,n,{type,abilityId:a.id,...flags});
 const stat=(e,f,k)=>api.value(e,f,k,{mode:'sum'});
 const power=(e,f)=>e.hero(f.i).attack+e.property(f,'attack_bonus')+stat(e,f,'bonusDamage');
 function add(e,f,t,name,values,life=null){const r=rules[name],opts={key:name+'_'+f.i,owner:f.i,duration:life??r[2],values,dispel:'basic',interval:r[4],pierces:false};const s=r[1]?api.applyStatus(e,t,opts):api.applyPositiveStatus(e,t,opts);if(s){s.origin=f.i;s.abilityId=r[0];}return s;}
 function job(e,f,a,op,delay,data={},token=null){api.scheduleEffect(e,{abilityId:a.id,kind:'extra',owner:f.i,target:null,delay,persist:true,data:{op,token,...data}});}
 function field(e,f,a,mode,x,life,from=x){const w=api.world(e),same=w.entities.filter(z=>z.kind==='extra'&&z.owner===f.i&&z.data.mode===mode);while(same.length>=2){const z=same.shift();w.entities=w.entities.filter(q=>q!==z);}return api.spawn(e,{kind:'extra',owner:f.i,x,life,data:{abilityId:a.id,mode,from,age:0,tick:0,nextHit:0,face:f.dir,waves:0}});}
 function cancel(e,f){const s=state(e,f);if(s.channel?.kind==='solar'&&s.channel.flight)return;s.revision++;s.channel=null;}
 function channel(e,f,kind,duration){const s=state(e,f);s.revision++;s.channel={kind,startX:f.x,until:e.t+duration,flight:false};return s.revision;}
 function teleport(e,f,x){e.move(f,clamp(x)-f.x);}
 function charges(e,f,a){return state(e,f).charges.find(x=>x.abilityId===a.id);}
 const X={
  init(e){receipts.set(e,[null,null]);for(const f of e.fighters){api.fighter(e,f).data.extra={revision:0,channel:null,charges:e.hero(f.i).abilities.filter(a=>a.official?.params?.AbilityCharges>0&&own(e,f)).map(a=>({abilityId:a.id,count:p(a,'AbilityCharges'),max:p(a,'AbilityCharges'),restore:p(a,'AbilityChargeRestoreTime'),pending:[]})),luminosity:0,gunslinger:true,deathSeen:false};}},
  validate(e,f,a,o){if(!own(e,f))return true;const s=state(e,f),c=charges(e,f,a),t=e.fighters[1-f.i],aim=o.aim??t.x;
   if(c&&!c.count)return false;if(o.self&& !['ember_spirit_flame_guard','void_spirit_resonant_pulse','muerta_pierce_the_veil'].includes(a.id))return false;
   if(s.channel?.kind==='solar'&&s.channel.flight)return false;
   if(s.channel?.kind==='star'&&['dawnbreaker_celestial_hammer','dawnbreaker_solar_guardian'].includes(a.id))return false;
   if(a.id==='dawnbreaker_fire_wreath'&&api.world(e).jobs.some(j=>j.owner===f.i&&j.data.op==='hammer_return'))return false;
   if(['ember_spirit_fire_remnant','void_spirit_dissimilate','void_spirit_astral_step','abyssal_underlord_dark_portal','dawnbreaker_solar_guardian'].includes(a.id)&&e.controlRemaining(f,'root')>0)return false;
   const point=['ember_spirit_sleight_of_fist','ember_spirit_fire_remnant','abyssal_underlord_firestorm','abyssal_underlord_pit_of_malice','void_spirit_aether_remnant','void_spirit_astral_step','dawnbreaker_celestial_hammer','muerta_the_calling'].includes(a.id);
   const range={dawnbreaker_celestial_hammer:1300,void_spirit_astral_step:1000}[a.id]??a.official.range;
   if(point&&(!Number.isFinite(aim)||aim<45||aim>1155||Math.abs(aim-f.x)>range*.55+22))return false;
   if(a.id==='abyssal_underlord_dark_portal'){const x=o.aim??(f.x<600?1155:45);if(!Number.isFinite(x)||x<45||x>1155||Math.abs(x-f.x)<p(a,'minimum_distance')*.55)return false;}
   if(a.id==='muerta_dead_shot'&&!api.canTargetSpell(e,{owner:f.i,target:t.i,abilityId:a.id,range:a.mvp.range_wu}).ok)return false;
   if(a.id==='dawnbreaker_solar_guardian'&&o.aim!==undefined&&(!Number.isFinite(o.aim)||o.aim<45||o.aim>1155||Math.abs(o.aim-f.x)>350*.55))return false;
   if(a.id==='void_spirit_dissimilate'&&o.aim!==undefined&&!Number.isFinite(o.aim))return false;return true;
  },
  onCast(e,f,a){if(!own(e,f))return;cancel(e,f);const c=charges(e,f,a);if(c){c.count--;c.pending.push(Math.max(e.t,c.pending.at(-1)||e.t)+c.restore);}if(a.id==='muerta_dead_shot')e.notifyTargeted(f,e.fighters[1-f.i],a.id);},
  activate(e,f,a,c){if(!own(e,f))return false;const t=e.fighters[1-f.i],s=state(e,f),aim=c.aim;
   switch(a.id){
    case 'ember_spirit_searing_chains':if(near(f,t,p(a,'radius'))){add(e,f,t,'x_chains',{dps:p(a,'damage_per_second')});control(e,f,t,a,'root',p(a,'duration'),'basic');}break;
    case 'ember_spirit_sleight_of_fist':{const rev=channel(e,f,'sleight',.25);f.invuln=Math.max(f.invuln,.25);job(e,f,a,'sleight',.25,{x:aim},rev);break;}
    case 'ember_spirit_flame_guard':add(e,f,f,'x_flame',{amount:p(a,'absorb_amount'),dps:p(a,'damage_per_second')});break;
    case 'ember_spirit_fire_remnant':field(e,f,a,'remnant',aim,1);job(e,f,a,'remnant',1,{x:aim});break;
    case 'abyssal_underlord_firestorm':field(e,f,a,'storm',aim,6.000001);break;
    case 'abyssal_underlord_pit_of_malice':field(e,f,a,'pit',aim,12);break;
    case 'abyssal_underlord_dark_portal':{const x=c.explicitAim?aim:(f.x<600?1155:45),rev=channel(e,f,'gate',3.5);field(e,f,a,'gate',f.x,20,x);field(e,f,a,'gate',x,20,f.x);job(e,f,a,'gate',3.5,{x},rev);break;}
    case 'void_spirit_aether_remnant':field(e,f,a,'aether',aim,17);break;
    case 'void_spirit_dissimilate':{const x=clamp(f.x+Math.sign(aim-f.x)*520*.55),rev=channel(e,f,'phase',1.1);f.invuln=Math.max(f.invuln,1.1);job(e,f,a,'phase',1.1,{x},rev);break;}
    case 'void_spirit_resonant_pulse':{let amount=100;if(near(f,t,p(a,'radius'))&&damage(e,f,t,210,a).accepted)amount+=110;add(e,f,f,'x_pulse',{amount});break;}
    case 'void_spirit_astral_step':{const dir=Math.sign(aim-f.x)||f.dir,x=clamp(f.x+dir*Math.max(110,Math.min(550,Math.abs(aim-f.x))));teleport(e,f,x);if(near(f,t,p(a,'radius'))){damage(e,f,t,power(e,f),a,'physical');add(e,f,t,'x_voidmark',{moveSlow:.8,pop:330});}break;}
    case 'dawnbreaker_fire_wreath':{const rev=channel(e,f,'star',1.1);for(let i=0;i<3;i++)job(e,f,a,'star',(i+1)*1.1/3,{part:i},rev);break;}
    case 'dawnbreaker_celestial_hammer':{const travel=Math.abs(aim-f.x)/(1600*.55);job(e,f,a,'hammer_out',travel,{from:f.x,x:aim});job(e,f,a,'hammer_return',travel*2+2,{from:f.x,x:aim});break;}
    case 'dawnbreaker_solar_guardian':{const x=c.explicitAim?aim:f.x,rev=channel(e,f,'solar',2.5);api.world(e).jobs=api.world(e).jobs.filter(j=>j.owner!==f.i||!['hammer_out','hammer_return'].includes(j.data.op));for(let i=1;i<=3;i++)job(e,f,a,'solar_pulse',i*.5,{x},rev);job(e,f,a,'solar_fly',1.7,{x},rev);job(e,f,a,'solar_land',2.5,{x},rev);break;}
    case 'muerta_the_calling':field(e,f,a,'calling',aim,8);break;
    case 'muerta_dead_shot':job(e,f,a,'deadshot',Math.abs(t.x-f.x)/(2000*.55),{});break;
    case 'muerta_gunslinger':s.gunslinger=!s.gunslinger;break;
    case 'muerta_pierce_the_veil':job(e,f,a,'veil',.35,{});break;
    default:throw Error('Unimplemented V5 slot '+a.id);
   }return true;
  },
  dispatch(e,j){const f=e.fighters[j.owner],t=e.fighters[1-j.owner],s=state(e,f),a=canonical(e,f.i,j.abilityId),d=j.data;if(f.hp<=0||d.token!==null&&d.token!==s.revision)return;
   switch(d.op){
    case 'sleight':if(t.hp>0&&Math.abs(t.x-d.x)<=550*.55+22)damage(e,f,t,power(e,f)+160,a,'physical');break;
    case 'remnant':teleport(e,f,d.x);if(near(f,t,450))damage(e,f,t,300,a,'magical');break;
    case 'gate':teleport(e,f,d.x);break;
    case 'phase':teleport(e,f,d.x);if(near(f,t,275))damage(e,f,t,345,a,'magical');break;
    case 'star':if(near(f,t,300)){damage(e,f,t,power(e,f)+70,a,'physical');if(d.part===2)control(e,f,t,a,'stun',1.2);else add(e,f,t,'x_shortslow',{moveSlow:1});}break;
    case 'hammer_out':case 'hammer_return':if(t.x>=Math.min(d.from,d.x)-110&&t.x<=Math.max(d.from,d.x)+110&&t.y<130)damage(e,f,t,140,a,'magical');if(d.op==='hammer_return')field(e,f,a,'hammer_burn',d.x,4,d.from);break;
    case 'solar_pulse':api.heal(e,f,95,{abilityId:a.id});if(Math.abs(t.x-d.x)<=500*.55+22&&t.y<130)damage(e,f,t,70,a,'magical');break;
    case 'solar_fly':f.invuln=Math.max(f.invuln,.8);if(s.channel)s.channel.flight=true;break;
    case 'solar_land':teleport(e,f,d.x);if(near(f,t,500)){damage(e,f,t,190,a,'magical');control(e,f,t,a,'stun',1.6);}break;
    case 'deadshot':{const route=api.routeTargetedSpell(e,{owner:f.i,target:t.i,abilityId:a.id});if(!route.accepted)break;const source=e.fighters[route.owner],target=e.fighters[route.target],receipt=damage(e,source,target,325,a,'magical',{reflected:route.reflected,noReflect:route.noReflect});if(receipt.accepted){const r=add(e,f,target,'x_deadslow',{moveSlow:1});if(r)r.owner=source.i;}break;}
    case 'veil':add(e,f,f,'x_veil',{physicalImmune:true,veil:true});break;
    default:throw Error('Unknown V5 job');
   }
   if(s.channel&&d.token!==null&&['sleight','gate','phase','solar_land'].includes(d.op))s.channel=null;
  },
  statusTick(e,f,s,enabled){if(!s.key.startsWith('x_')||!enabled||f.hp<=0||e.fighters[s.owner].hp<=0)return;const owner=e.fighters[s.owner],a=canonical(e,s.origin,s.abilityId);
   if(s.key.startsWith('x_chains_'))damage(e,owner,f,25,a,'magical');
   else if(s.key.startsWith('x_fireburn_'))damage(e,owner,f,f.maxHp*.03,a,'magical');
   else if(s.key.startsWith('x_voidmark_'))damage(e,owner,f,330,a,'magical');
   else if(s.key.startsWith('x_flame_')&&s.values.amount>0){const t=e.fighters[1-f.i];if(near(f,t,500))damage(e,f,t,10,a,'magical');}
  },
  beforeTick(e){for(const f of e.fighters){const s=state(e,f),ch=s.channel;if(ch&&!ch.flight){const inp=e.input[f.i];if(e.blocked(f)||api.effectiveStatus(e,f,'silence')||inp.left||inp.right||inp.attack||Math.abs(f.x-ch.startX)>1)cancel(e,f);}if(s.channel&&s.channel.until<e.t-1e-7)s.channel=null;for(const c of s.charges)while(c.pending.length&&c.pending[0]<=e.t+1e-8){c.pending.shift();c.count=Math.min(c.max,c.count+1);}}},
  tick(e,dt){const world=api.world(e);for(const z of world.entities){if(z.kind!=='extra')continue;const f=e.fighters[z.owner],t=e.fighters[1-z.owner],d=z.data,a=canonical(e,z.owner,d.abilityId),live=Math.min(dt,z.life);if(f.hp<=0){z.life=0;continue;}z.life-=live;d.age+=live;d.tick+=live;
   if(d.mode==='storm'){while(d.tick>=1-1e-8&&d.waves<6){d.tick-=1;d.waves++;if(Math.abs(t.x-z.x)<=425*.55+22&&t.y<130){damage(e,f,t,105,a,'magical');add(e,f,t,'x_fireburn',{percent:.03});}}}
   else if(d.mode==='pit'){if(t.hp>0&&Math.abs(t.x-z.x)<=400*.55+22&&t.y<130&&e.t>=d.nextHit){d.nextHit=e.t+3.6;damage(e,f,t,50,a,'magical');control(e,f,t,a,'root',1.8,'basic');}}
   else if(d.mode==='aether'){const dx=(t.x-z.x)*d.face;if(d.age>=.4&&t.hp>0&&t.invuln<=0&&!e.property(t,'debuffImmune')&&dx>=-130*.55&&dx<=450*.55&&t.y<130){teleport(e,t,z.x+d.face*62*.55);damage(e,f,t,240,a,'magical');control(e,f,t,a,'stun',1.6);z.life=0;}}
   else if(d.mode==='hammer_burn'){while(d.tick>=.5-1e-8){d.tick-=.5;if(t.x>=Math.min(d.from,z.x)-110&&t.x<=Math.max(d.from,z.x)+110&&t.y<130){damage(e,f,t,25,a,'magical');add(e,f,t,'x_hammer_slow',{moveSlow:.36});}}}
   else if(d.mode==='calling'){if(t.hp>0&&Math.abs(t.x-z.x)<=460*.55&&t.y<130){add(e,f,t,'x_call_slow',{moveSlow:.2});const touch=[0,1,2,3].some(i=>Math.abs(t.x-(z.x+340*.55*Math.cos(d.age*Math.PI/2+i*Math.PI/2)))<=120*.55);if(touch&&e.t>=d.nextHit){d.nextHit=e.t+1;damage(e,f,t,180,a,'magical');add(e,f,t,'x_call_silence',{silence:true});}}}
  }world.entities=world.entities.filter(z=>z.life>1e-8);},
  attack(e,f,t,amount,m){amount+=stat(e,f,'bonusDamage');const enemy=e.fighters[1-f.i];if(key(e,enemy)==='abyssal_underlord'&&enemy.hp>0&&e.passivesEnabled(enemy)&&near(f,enemy,900))amount=Math.max(0,amount-e.hero(f.i).attack*.32);if(api.hasValue(e,f,'veil')){amount+=e.hero(f.i).attack;m.damage_type='magical';}return amount;},
  modifyDamage(e,v){if(v.m.damage_type==='physical'&&api.hasValue(e,v.target,'physicalImmune'))v.damage=0;if(key(e,v.attacker)==='dawnbreaker'&&e.passivesEnabled(v.attacker)&&v.info.basic&&!v.info.reflected&&state(e,v.attacker).luminosity===3)v.damage*=2;},
  beforeDamage(e,v){for(const s of api.fighter(e,v.target).statuses){if(!api.effective(e,v.target,s.key))continue;if(s.key.startsWith('x_flame_')&&v.m.damage_type==='magical'){const amount=Math.min(s.values.amount,v.damage*.7);s.values.amount-=amount;v.damage-=amount;if(s.values.amount<=1e-8)api.removeStatus(e,v.target,s.key);}if(s.key.startsWith('x_pulse_')&&v.m.damage_type==='physical'){const amount=Math.min(s.values.amount,v.damage);s.values.amount-=amount;v.damage-=amount;if(s.values.amount<=1e-8)api.removeStatus(e,v.target,s.key);}}},
  afterDamage(e,v){if(key(e,v.attacker)==='dawnbreaker'&&v.info.basic&&Number.isSafeInteger(v.attackId))receipts.get(e)[v.attacker.i]={id:v.attackId,actual:v.damage};},
  afterAttack(e,f,t,ev,landed){const s=state(e,f);if(key(e,f)==='dawnbreaker'){if(landed&&e.passivesEnabled(f)){s.luminosity=(s.luminosity+1)%4;const receipt=receipts.get(e)[f.i];if(s.luminosity===0&&receipt?.id===ev.id)api.heal(e,f,receipt.actual*.5,{abilityId:'dawnbreaker_luminosity'});}receipts.get(e)[f.i]=null;}if(f.hp>0&&key(e,f)==='muerta'&&s.gunslinger&&landed&&e.passivesEnabled(f)&&t.hp>0&&e.random()<.45){const a=canonical(e,f.i,'muerta_gunslinger');damage(e,f,t,power(e,f)+(api.hasValue(e,f,'veil')?e.hero(f.i).attack:0),a,api.hasValue(e,f,'veil')?'magical':'physical');}},
  actionChanged(e,f,reason){if(['control','input_cancel','movement','action'].includes(reason)&&state(e,f).channel)cancel(e,f);},
  interrupted(e,f){cancel(e,f);},
  death(e,event){for(const f of e.fighters){const s=state(e,f),t=e.fighters[event.actor];if(key(e,f)==='abyssal_underlord'&&t.i!==f.i&&f.hp>0&&!s.deathSeen&&e.passivesEnabled(f)&&near(f,t,900)){add(e,f,f,'x_atrophy_gain',{bonusDamage:45});s.deathSeen=true;}}},
  disarmed(e,f){return !!state(e,f).channel;},
  moveMultiplier(e,f){return state(e,f).channel?0:1;},
  endStep(e){for(const f of e.fighters){const s=state(e,f),t=e.fighters[1-f.i];if(f.hp<=0){s.channel=null;receipts.get(e)[f.i]=null;api.cancelOwnerEffects(e,f.i,{includePersistent:true});for(const u of e.fighters)api.fighter(e,u).statuses=api.fighter(e,u).statuses.filter(x=>!x.key.startsWith('x_')||x.owner!==f.i);}}},
 };
 return X;
}
export function validateExtraStatus(e,s){const base=s.key.replace(/_[01]$/,''),r=rules[base];if(!r||s.key!==base+'_'+s.origin||![0,1].includes(s.origin)||!canonical(e,s.origin,r[0])||s.abilityId!==r[0]||s.hostile!==r[1]||s.polarity!==(r[1]?'hostile':'positive')||s.group!==null||s.allowInvulnerable!==false||s.pierces!==false||s.dispel!=='basic'||s.duration!==r[2]||s.interval!==r[4])return false;const keys=Object.keys(r[3]);return Object.keys(s.values).length===keys.length&&keys.every(k=>Array.isArray(r[3][k])?Number.isFinite(s.values[k])&&s.values[k]>=r[3][k][0]&&s.values[k]<=r[3][k][1]:s.values[k]===r[3][k]);}
export function validateExtraJob(e,j){return j.kind==='extra'&&jobOps[j.abilityId]?.includes(j.data.op)&&canonical(e,j.owner,j.abilityId)&&j.target===null&&j.persist===true&&j.cancelOnInterrupt===false;}
export function validateExtraEntity(e,z){return z.kind==='extra'&&fieldModes[z.data.abilityId]?.includes(z.data.mode)&&!!canonical(e,z.owner,z.data.abilityId);}
