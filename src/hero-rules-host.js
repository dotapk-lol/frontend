import {createHeroRegistry,createRuleSession} from './heros-rules.js';
import {services as aStatusStore} from './hero-packs/r20_55/combat.js';
import {packStatusEffective} from './pack-services.js';
const defaultRules=createHeroRegistry().seal(),sessions=new WeakMap();
export const HERO_RULES_HASH=defaultRules.rulesHash;
function binding(engine){
 let entry=sessions.get(engine);
 if(!entry){entry={fighters:engine.fighters,handles:new Map(),nextHandle:1,jobs:new Map(),nextJob:1,generation:1,lease:null,session:createRuleSession(engine.heroRuleRegistry?engine.heroRuleRegistry.seal():defaultRules)};sessions.set(engine,entry);}
 if(entry.fighters!==engine.fighters){entry.fighters=engine.fighters;entry.handles=new Map();entry.nextHandle=1;entry.jobs=new Map();entry.nextJob=1;entry.generation++;entry.lease=null;entry.session=createRuleSession(entry.session.sealed);}
 return entry.session;
}
const bridgeEntry=engine=>{binding(engine);return sessions.get(engine);};
// Executable migration allowlist, not a roster unlock. Other registered drafts retain native dispatch.
const activeMigrations=new Set(['21:0','28:1','32:0','32:3','36:0','42:0','50:2','55:0','55:3']);
export function usesPrivateRuleCast(engine,actor,slot){return activeMigrations.has(engine.indices[actor]+':'+slot)&&binding(engine).has(engine.indices[actor],slot);}
const overlay=(a,b)=>b&&typeof b==='object'&&!Array.isArray(b)?Object.fromEntries(Object.entries({...a,...b}).map(([k,v])=>[k,k in b?overlay(a?.[k],v):v])):b;
const legacyActiveMigrations=new Set(['5:1','5:3','9:1','3:3','8:3','13:0','13:1','13:3','17:1']);
const legacyPassiveMigrations=new Set(['0:2','1:2','4:1','6:2','7:3']);
function selectedActivation(engine,actor,slot){const key=engine.indices[actor]+':'+slot;return usesPrivateRuleCast(engine,actor,slot)||legacyActiveMigrations.has(key);}
export function moduleAbility(engine,actorId,slot,original){const session=binding(engine),heroId=engine.indices[actorId],key=heroId+':'+slot;if(!session.sealed.implementation(heroId,slot)||!selectedActivation(engine,actorId,slot)&&!legacyPassiveMigrations.has(key)&&!(heroId===31&&slot===2&&session.has(heroId,slot,'onAttack')))return original;return {...original,mvp:overlay(original.mvp,session.sealed.hero(heroId).abilities[slot].mvp)};}

const bounded=(v,min,max)=>{if(!Number.isFinite(v)||v<min||v>max)throw Error('Invalid effect amount/duration');return v;};
function host(engine,abilityId,origin){
 const aProfile=origin&&engine.hero(origin.actor).packKey==='r20_55';
 const actor=id=>{if((id!==0&&id!==1)||engine.fighters[id]?.i!==id)throw Error('Invalid effect actor');return engine.fighters[id];};
 const identity=spec=>{if(spec.abilityId!==abilityId)throw Error('Cross-ability effect');};
 return {
  now:()=>engine.t,random:()=>engine.random(),
  actor:id=>{const f=actor(id);return {id,heroId:engine.indices[id],hp:f.hp,maxHp:f.maxHp,mp:f.mp,maxMp:f.maxMp,x:f.x,y:f.y,dir:f.dir,alive:f.hp>0,invulnerable:f.invuln>0,debuffImmune:!!engine.property(f,'debuffImmune'),passivesEnabled:engine.passivesEnabled(f),guarding:!!f.guard,rooted:engine.controlRemaining(f,'root')>0,silenced:engine.isSilenced(f)};},
  ports:{
   target:{route(spec){identity(spec);actor(spec.owner);if(aProfile)return engine.routeTargetedSpell(spec);const t=actor(spec.target),counter=engine.buff(t,'counter'),reflected=!!(spec.reflectable&&!spec.reflected&&counter&&!counter.m.counter_type);return {accepted:true,reason:null,owner:reflected?spec.target:spec.owner,target:reflected?spec.owner:spec.target,originalOwner:spec.owner,reflected,noReflect:reflected,noLifesteal:reflected};}},
   damage(spec){
    identity(spec);if(!['physical','magical','pure'].includes(spec.type))throw Error('Invalid damage type');const source=actor(spec.source),target=actor(spec.target),amount=bounded(spec.amount,0,1e7);
    const m={damage_type:spec.type,blockable:spec.blockable??true,...(!aProfile?{stun_s:bounded(spec.stunSeconds??0,0,60),hitstun_s:bounded(spec.hitstunSeconds??0,0,60)}:{})},info={skill:abilityId,basic:!!spec.basic,dot:!!spec.dot,passive:!!spec.passive,reflected:!!spec.reflected,noReflect:!!spec.noReflect,noLifesteal:!!spec.noLifesteal,attackId:spec.attackId??null};
    const receipt=engine.resolveDamage(source,target,amount,m,info);
    return {accepted:receipt.accepted,landed:receipt.landed,guarded:receipt.guard,raw:receipt.rawDamage,actual:receipt.actual,deferred:receipt.deferred??0,killedAtDebit:receipt.killedAtDebit};
   },
   control:{apply(spec){identity(spec);actor(spec.owner);const target=actor(spec.target);if(!['stun','root','hex','fear','taunt'].includes(spec.type))throw Error('Invalid control kind');const duration=engine.control(target,spec.type,bounded(spec.duration,0,60),!!spec.pierces);return duration?{handle:'legacy-control:'+target.i+':'+spec.type,duration}:null;}},
   motion(spec){identity(spec);if(spec.kind!=='blink')throw Error('Unimplemented motion request');const f=actor(spec.actor);bounded(spec.destinationX,-10000,10000);engine.move(f,spec.destinationX-f.x);return 'legacy-blink:'+spec.castId;},
   protect(spec){identity(spec);if(spec.kind!=='invulnerability')throw Error('Unimplemented protection');const f=actor(spec.actor);f.invuln=bounded(spec.duration,0,60);return 'legacy-protect:'+engine.frame+':'+f.i;},
   status:{
    apply(spec){identity(spec);if(!aProfile)throw Error('Unsupported status source profile');return applyRuleStatus(engine,origin,spec);},
    remove(handle){return removeRuleStatus(engine,origin,handle);},
    query(target,key){actor(target);return queryRuleStatus(engine,origin,target,key);},
    cleanse(target,tier,id){if(id!==abilityId||!['basic','strong'].includes(tier))throw Error('Invalid status cleanse');actor(target);const before=queryRuleStatus(engine,origin,target);engine.dispel(actor(target),tier);reconcileRuleStatuses(engine);return before.filter(s=>!queryRuleStatus(engine,origin,target).some(x=>x.handle===s.handle)).map(s=>s.handle);}
   },
   schedule(spec){identity(spec);return scheduleRuleStatus(engine,origin,spec);},
   cancelJob(handle){const entry=bridgeEntry(engine),job=entry.jobs.get(handle);if(!job)return false;if(originKey(job.origin)!==originKey(origin)||job.origin.actor!==origin.actor)throw Error('Cross-origin job cancellation');entry.jobs.delete(handle);return true;},
   selfDamage(spec){identity(spec);if(Object.keys(spec).sort().join(',')!=='abilityId,actor,amount,nonlethal'||spec.actor!==origin.actor||spec.nonlethal!==true)throw Error('Unsupported self damage receipt');const f=actor(spec.actor),amount=bounded(spec.amount,0,1e7),actual=engine.nonlethalSelfDamage(f,amount);return {accepted:f.hp>0,landed:f.hp>0,guarded:false,raw:amount,actual,deferred:0,killedAtDebit:false};},
   heal(spec){identity(spec);actor(spec.source);const target=actor(spec.target),receipt={actual:0,deferred:0};engine.heal(target,bounded(spec.amount,0,1e7),{skill:abilityId},receipt);return receipt;},
   cue(event){identity(event);if(aProfile&&event.kind==='cast')return;const f=actor(event.actor),color=engine.hero(f.i).color;if(event.kind==='blink')engine.fx('dash',f.x,f.y+80,color);else if(event.kind==='targeted-hit'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,color,{tx:t.x,ty:t.y+100});}else if(event.kind==='passive'&&abilityId==='slardar_bash'){const t=actor(event.target);engine.fx('text',t.x,t.y+170,'#cea4ff',{text:'深海重击'});engine.log('passive',f.i,{skill:abilityId});}else if(event.kind==='reflect'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,'#95dcff',{tx:t.x,ty:t.y+100});engine.fx('text',f.x,f.y+180,'#bbf0ff',{text:'法术反制'});engine.log('reflect',f.i,{skill:abilityId});}else throw Error('Unknown semantic cue');}
  }
 };
}
export function activateHeroRule(engine,f,cast){
 const session=binding(engine),heroId=engine.indices[f.i],abilityId=engine.ability(f.i,cast.slot).id;
 if(!session.has(heroId,cast.slot)||!selectedActivation(engine,f.i,cast.slot))return {handled:false};
 const result=session.invoke(heroId,cast.slot,'activate',host(engine,abilityId,{actor:f.i,heroId,slot:cast.slot,abilityId}),{owner:f.i,target:1-f.i,abilityId,slot:cast.slot,castId:String(cast.id),direction:cast.dir??f.dir,aimX:cast.aim,heldSeconds:cast.charge??0,reflected:!!cast.reflected});
 if(result.value?.presentation){
  const p=result.value.presentation,m=engine.ability(f.i,cast.slot).mvp;
  if(heroId!==13||cast.slot!==1||Object.keys(p).sort().join(',')!=='aimX,kind,lifeSeconds,radius'||p.kind!=='ground-pillar'||p.aimX!==cast.aim||p.radius!==m.radius_wu||p.lifeSeconds!==.6)throw Error('Invalid ground presentation');
  engine.fx('pillar',p.aimX,0,engine.hero(f.i).color,{size:p.radius,life:p.lifeSeconds,maxLife:p.lifeSeconds});
 }
 return {handled:result.handled,reflected:result.value?.reflected===true};
}
export function rulesSnapshot(engine){return binding(engine).snapshot();}
export function restoreRulesSnapshot(engine,value){binding(engine).restore(value);}
export function validRulesSnapshot(engine,value,fighters){const session=binding(engine);if(!session.validateSnapshot(value))return false;if(fighters)for(const f of fighters){const heroId=engine.indices[f.i];if(heroId===31&&session.has(heroId,2,'onAttack')){const ns='skill:31:'+session.sealed.hero(heroId).abilities[2].id,state=value.namespaces.find(row=>row.namespace===ns)?.state;if((state?.counts?.[f.i]??0)!==f.pack?.bashCount)return false;}}return true;}

export function validHeroRuleResources(engine,fighters){const resources=binding(engine).sealed.resources;if(!Array.isArray(fighters)||fighters.length!==2)return false;return fighters.every((f,i)=>f?.i===i&&Number.isFinite(f.maxMp)&&f.maxMp>0&&f.maxMp<=(resources.maxMpByHero[engine.indices[i]]??engine.hero(i).combatMana??engine.hero(i).mana??1200)&&Number.isFinite(f.mp)&&f.mp>=0&&f.mp<=f.maxMp);}
export function validateHeroRuleFacts(engine,actorId,slot){
 const session=binding(engine),heroId=engine.indices[actorId];
 if(!selectedActivation(engine,actorId,slot)||!session.has(heroId,slot,'activate')&&!session.has(heroId,slot,'planCast'))return true;
 const supported=new Set(['damage','heal','control','target-route','motion-request','protect','cue',...(usesPrivateRuleCast(engine,actorId,slot)?['status','schedule','self-damage']:[])]);
 const impl=session.sealed.implementation(heroId,slot);if(!scheduledBindingsAdmission(impl)||impl.requires.some(cap=>!supported.has(cap))||impl.requires.includes('schedule')&&!statusScheduleAdmission(engine,{actor:actorId,heroId,slot,abilityId:session.sealed.hero(heroId).abilities[slot].id}))return false;
 try{if(usesPrivateRuleCast(engine,actorId,slot))statusVariants(engine,{actor:actorId,heroId,slot,abilityId:session.sealed.hero(heroId).abilities[slot].id});return session.validateFacts(host(engine,session.sealed.hero(heroId).abilities[slot].id));}catch{return false;}
}


// Detached definitions compile a closed status vocabulary. No private hero operation is called here.
function statusVariants(engine,origin){
 const ability=binding(engine).sealed.hero(origin.heroId).abilities[origin.slot],params=ability.mvp.params??{},out=[],fields=new Set(['armor','attackReduction','moveSlow','attackSlow','attackSpeed','spellAmp','physicalImmune']);
 const value=x=>{if(typeof x==='number'||typeof x==='boolean')return x;if(typeof x==='string'&&Number.isFinite(params[x]))return params[x];if(x&&typeof x==='object'){if(x.div)return value(x.div[0])/value(x.div[1]);if(x.mul)return x.mul.reduce((n,v)=>n*value(v),1);if(x.add)return x.add.reduce((n,v)=>n+value(v),0);}throw Error('Unsupported batch status expression');};
 const visit=(node,path='recipe')=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach((v,i)=>visit(v,path+'.'+i));return;}if(node.op==='status'){if(Object.keys(node.values??{}).some(k=>!fields.has(k)))throw Error('Unimplemented static status projection');const interval=node.tick?bounded(value(node.tick.interval),.001,3600):0;out.push({key:node.key??ability.id,duration:value(node.duration),polarity:node.to==='self'?'positive':'negative',dispel:node.dispel??'basic',pierces:!!node.pierces,interval,program:node.tick?ability.id+':'+path+'.tick.ops':null,values:Object.fromEntries(Object.entries(node.values??{}).map(([k,v])=>[k,value(v)]))});}for(const [k,v]of Object.entries(node))visit(v,path+'.'+k);};visit(ability.recipe);return out;
}
const same=(a,b)=>JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort());
const originKey=o=>o.heroId+':'+o.slot;
function liveRecord(engine,row){return engine.fighters[row.spec.target].packModules?.r20_55?.statuses.find(s=>s===row.record&&(s.life>1e-8||bridgeEntry(engine).lease?.record===s));}
function applyRuleStatus(engine,origin,spec){
 const variants=statusVariants(engine,origin);
 if(Object.keys(spec).sort().join(',')!=='abilityId,dispel,duration,key,owner,pierces,polarity,target,values'||![0,1].includes(spec.owner)||![0,1].includes(spec.target)||!variants.some(v=>v.key===spec.key&&v.duration===spec.duration&&v.polarity===spec.polarity&&v.dispel===spec.dispel&&v.pierces===spec.pierces&&same(v.values,spec.values)))throw Error('Status request differs from sealed source schema');
 const variant=variants.find(v=>v.key===spec.key&&v.duration===spec.duration&&same(v.values,spec.values));const entry=bridgeEntry(engine),f=engine.fighters[spec.target],options={key:spec.key,owner:spec.owner,duration:spec.duration,values:spec.values,dispel:spec.dispel,pierces:spec.pierces,interval:variant.interval};
 const record=spec.polarity==='positive'?aStatusStore.applyPositiveStatus(engine,f,options):aStatusStore.applyStatus(engine,f,options);
 if(!record)return null;Object.assign(record,{abilityId:spec.abilityId,reflected:spec.owner!==origin.actor,programId:variant.program});
 // Admission rejection above leaves the prior handle/record untouched. Successful recast invalidates it.
 for(const [handle,row]of entry.handles)if(row.spec.target===spec.target&&row.spec.key===spec.key)dropRuleStatusJobs(entry,handle),entry.handles.delete(handle);
 const handle='rule-status:'+entry.generation+':'+entry.nextHandle++;entry.handles.set(handle,{origin:{...origin},spec:structuredClone(spec),stamp:{generation:entry.generation,round:engine.round,targetLife:engine.packCore?.life?.[spec.target]??0},record});return handle;
}
function queryRuleStatus(engine,origin,target,key){
 if(!origin)return [];const entry=bridgeEntry(engine),rows=[];
 for(const [handle,row]of entry.handles){if(originKey(row.origin)!==originKey(origin)||row.spec.target!==target||key!==undefined&&row.spec.key!==key)continue;const record=liveRecord(engine,row);if(record)rows.push({...structuredClone(row.spec),handle,remaining:record.life,remainingSeconds:record.life,elapsed:record.elapsed,effective:packStatusEffective(engine,engine.fighters[target],record),intervalSeconds:record.interval});}return rows;
}
function removeRuleStatus(engine,origin,handle){
 const entry=bridgeEntry(engine),row=entry.handles.get(handle);if(!row)return false;if(!origin||originKey(row.origin)!==originKey(origin))throw Error('Cross-origin status removal');
 const record=liveRecord(engine,row);dropRuleStatusJobs(entry,handle);entry.handles.delete(handle);if(!record)return false;const state=engine.fighters[row.spec.target].packModules.r20_55;state.statuses=state.statuses.filter(s=>s!==record);return true;
}
export function reconcileRuleStatuses(engine){
 const entry=bridgeEntry(engine);for(const [handle,row]of [...entry.handles])if(!liveRecord(engine,row)){dropRuleStatusJobs(entry,handle);entry.handles.delete(handle);entry.session.invoke(row.origin.heroId,row.origin.slot,'onStage',host(engine,row.spec.abilityId,row.origin),{kind:'status-removed',abilityId:row.spec.abilityId,handle});}
}
export function castHeroRule(engine,i,slot,options={}){
 if(!usesPrivateRuleCast(engine,i,slot))return undefined;
 const session=binding(engine),f=engine.fighters[i],t=engine.fighters[1-i],heroId=engine.indices[i],a=engine.ability(i,slot),m=a.mvp,origin={actor:i,heroId,slot,abilityId:a.id},ctxHost=host(engine,a.id,origin);
 if(!session.validateFacts(ctxHost))return false;
 const ready=f.hp>0&&engine.phase==='fight'&&!engine.paused&&!engine.blocked(f)&&!engine.isSilenced(f)&&f.chargeSlot<0&&!f.cast&&!f.channel&&f.recovery<=0;
 const aim=options.aim??t.x,targetProfile=session.sealed.hero(heroId).abilities[slot].recipe?.target;
 if(!ready||!Number.isFinite(aim))return false;
 const result=session.invoke(heroId,slot,'planCast',ctxHost,{owner:i,target:1-i,abilityId:a.id,slot,direction:options.dir??f.dir,heldSeconds:options.charge??0,actionReady:ready,manaAvailable:f.mp,cooldownRemaining:f.cd[slot],chargesAvailable:f.charges[slot],aimX:aim});
 const plan=result.handled?result.value:{accepted:f.cd[slot]<=1e-8&&f.mp>=m.mana&&(!m.charges||f.charges[slot]>0)&&(targetProfile!=='enemy'||engine.canTargetSpell({owner:i,target:1-i,abilityId:a.id,range:m.range_wu}).ok),manaCost:m.mana,cooldownSeconds:m.cooldown_s,chargeCost:m.charges?1:0,windupSeconds:m.startup_frames/60,recoverySeconds:m.recovery_frames/60,action:'cast'};
 if(!plan?.accepted)return false;
 for(const [key,max]of [['manaCost',1e7],['cooldownSeconds',3600],['windupSeconds',3600],['recoverySeconds',3600],['chargeCost',1]])bounded(plan[key],0,max);
 if(plan.action!=='cast'||plan.manaCost>f.mp||plan.chargeCost>f.charges[slot]||!Number.isInteger(plan.chargeCost))return false;
 // Only supported requirements reach a resource transaction. No missing port may fail after payment.
 const supported=new Set(['damage','heal','status','target-route','cue','schedule','self-damage']);if(!scheduledBindingsAdmission(session.sealed.implementation(heroId,slot))||session.sealed.implementation(heroId,slot).requires.some(cap=>!supported.has(cap))||session.sealed.implementation(heroId,slot).requires.includes('schedule')&&!statusScheduleAdmission(engine,origin))return false;
 statusVariants(engine,origin);
 engine.commitAction(f);f.mp-=plan.manaCost;f.cd[slot]=plan.cooldownSeconds;if(plan.chargeCost){f.charges[slot]-=plan.chargeCost;if(f.chargeTimers[slot]<=0)f.chargeTimers[slot]=m.charge_restore_s;}f.casts++;f.guard=false;
 const x=targetProfile==='self'?f.x:Math.max(Math.max(45,f.x-m.range_wu),Math.min(Math.min(1155,f.x+m.range_wu),aim)),cast={id:++engine.seq,slot,abilityId:a.id,remaining:plan.windupSeconds,aim:x};
 if(targetProfile==='enemy')engine.notifyTargeted(f,t,a.id);if(cast.remaining>0)f.cast=cast;else engine.activate(f,cast);engine.animate(f,'cast',.35);engine.log('cast',i,{skill:a.id,slot,cost:plan.manaCost});return true;
}
export function ruleHostSnapshot(engine){
 const entry=bridgeEntry(engine);if(!entry.handles.size&&entry.nextHandle===1&&!entry.jobs.size&&entry.generation===1)return null;
 return {version:2,rulesHash:entry.session.sealed.rulesHash,generation:entry.generation,nextHandle:entry.nextHandle,nextJob:entry.nextJob,statuses:[...entry.handles].map(([handle,row])=>({handle,origin:row.origin,spec:row.spec,stamp:row.stamp})),jobs:[...entry.jobs.values()].map(j=>structuredClone(j))};
}
export function validRuleHostSnapshot(engine,g){
 const saved=g.heroHost,session=binding(engine),nativeRefs=g.fighters.flatMap(f=>(f.packModules?.r20_55?.statuses??[]).filter(s=>g.indices.some(id=>[0,1,2,3].some(slot=>usesPrivateRuleCast(engine,g.indices.indexOf(id),slot)&&session.has(id,slot)&&s.abilityId===session.sealed.hero(id).abilities[slot].id))).map(s=>({target:f.i,status:s})));if(saved===undefined||saved===null)return nativeRefs.length===0&&!g.heroRules.namespaces.some(row=>row.state?.records?.length);
 try{if(Object.keys(saved).sort().join(',')!=='generation,jobs,nextHandle,nextJob,rulesHash,statuses,version'||saved.version!==2||!Number.isSafeInteger(saved.generation)||saved.generation<1||!Number.isSafeInteger(saved.nextJob)||saved.nextJob<1||!Array.isArray(saved.jobs)||saved.jobs.length>256||saved.rulesHash!==session.sealed.rulesHash||!Number.isSafeInteger(saved.nextHandle)||saved.nextHandle<1||!Array.isArray(saved.statuses)||saved.statuses.length>128)return false;
 const seen=new Set();for(const row of saved.statuses){if(Object.keys(row).sort().join(',')!=='handle,origin,spec,stamp'||typeof row.handle!=='string'||!new RegExp('^rule-status:'+saved.generation+':[1-9][0-9]*$').test(row.handle)||Number(row.handle.split(':')[2])>=saved.nextHandle||seen.has(row.handle))return false;seen.add(row.handle);const o=row.origin,s=row.spec;
 if(!row.stamp||Object.keys(row.stamp).sort().join(',')!=='generation,round,targetLife'||row.stamp.generation!==saved.generation||row.stamp.round!==g.round||row.stamp.targetLife!==(g.packCore?.life?.[s.target]??0))return false;
 if(Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!usesPrivateRuleCast(engine,o.actor,o.slot)||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId||s.abilityId!==o.abilityId||![0,1].includes(s.target)||![0,1].includes(s.owner))return false;
 if(!statusVariants(engine,o).some(v=>v.key===s.key&&v.duration===s.duration&&v.polarity===s.polarity&&v.dispel===s.dispel&&v.pierces===s.pierces&&same(v.values,s.values)))return false;
 const variant=statusVariants(engine,o).find(v=>v.key===s.key&&v.duration===s.duration&&same(v.values,s.values));const native=g.fighters[s.target].packModules?.r20_55?.statuses.filter(x=>x.key===s.key&&x.owner===s.owner&&x.abilityId===s.abilityId);if(native?.length!==1||!same(native[0].values,s.values)||native[0].duration!==s.duration||native[0].life<=1e-8)return false;const n=native[0];if(Object.keys(n).sort().join(',')!=='abilityId,allowInvulnerable,dispel,duration,elapsed,group,hostile,interval,key,life,owner,pierces,polarity,programId,reflected,tick,values'||n.pierces!==s.pierces||n.dispel!==s.dispel||n.hostile!==(s.polarity==='negative')||n.polarity!==(s.polarity==='negative'?'hostile':'positive')||n.group!==null||n.allowInvulnerable!==false||n.interval!==variant.interval||n.programId!==variant.program||n.reflected!==(s.owner!==o.actor))return false;
 }
 // Both public references and native referents must match; handles are never trusted by string alone.
 for(const n of nativeRefs)if(!saved.statuses.some(row=>row.spec.target===n.target&&row.spec.key===n.status.key&&row.spec.owner===n.status.owner))return false;
 const byHandle=new Map(saved.statuses.map(row=>[row.handle,row])),publicHandles=new Set(),nativeIdentities=new Set();
 const close=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=1e-7;
 for(const ns of g.heroRules.namespaces)for(const r of ns.state?.records??[]){
  if(publicHandles.has(r.handle))return false;publicHandles.add(r.handle);
  const row=byHandle.get(r.handle);if(!row)return false;
  const o=row.origin,s=row.spec,impl=session.sealed.implementation(o.heroId,o.slot),namespace=impl.namespace??('skill:'+o.heroId+':'+o.abilityId);
  if(ns.namespace!==namespace||r.owner!==s.owner||r.target!==s.target||r.key!==s.key||r.reflected!==(s.owner!==o.actor)||r.polarity!==s.polarity||r.pierces!==s.pierces||r.program!==statusVariants(engine,o).find(v=>v.key===s.key&&v.duration===s.duration&&same(v.values,s.values)).program||r.interval!==statusVariants(engine,o).find(v=>v.key===s.key&&v.duration===s.duration&&same(v.values,s.values)).interval||r.remaining!==Number(s.values.shield??0)||!same(r.values,s.values))return false;
  const native=g.fighters[s.target].packModules.r20_55.statuses.find(n=>n.key===s.key&&n.owner===s.owner&&n.abilityId===s.abilityId),nativeKey=s.target+':'+s.key+':'+s.owner+':'+s.abilityId;
  if(!native||nativeIdentities.has(nativeKey))return false;nativeIdentities.add(nativeKey);
  if(!close(r.expires-r.startedAt,s.duration)||!close(g.t-r.startedAt,native.elapsed)||!close(r.expires-g.t,native.life)||!close(native.elapsed+native.life,native.duration)||native.reflected!==r.reflected)return false;
 }
 if(publicHandles.size!==saved.statuses.length||nativeIdentities.size!==nativeRefs.length)return false;
 if(!validRuleStatusJobs(engine,g,saved))return false;
 return true;
 }catch{return false;}
}
export function restoreRuleHostSnapshot(engine,value){const entry=bridgeEntry(engine);entry.handles=new Map();entry.nextHandle=value?.nextHandle??1;entry.nextJob=value?.nextJob??1;entry.generation=value?.generation??1;entry.jobs=new Map((value?.jobs??[]).map(j=>[j.handle,j]));entry.lease=null;for(const row of value?.statuses??[]){const record=engine.fighters[row.spec.target].packModules.r20_55.statuses.find(s=>s.key===row.spec.key&&s.abilityId===row.spec.abilityId&&s.owner===row.spec.owner);entry.handles.set(row.handle,{origin:row.origin,spec:row.spec,stamp:row.stamp,record});}}

export function invokeHeroHook(engine,actor,slot,hook,event){const session=binding(engine),heroId=engine.indices[actor],abilityId=session.sealed.hero(heroId)?.abilities[slot]?.id;if(!abilityId)return {handled:false};return session.invoke(heroId,slot,hook,host(engine,abilityId,{actor,heroId,slot,abilityId}),{...event,abilityId});}

// Source-declared migrated status schemas supersede frozen private coefficient maps for restore only.
// The generic store checks all clocks/fields; every unmigrated record is still checked by its native family.
export function validRulePackSnapshot(engine,g){
 if(!g.heroHost?.statuses?.length)return engine.packCombat.validateSnapshot(engine,g);
 if(!validRuleHostSnapshot(engine,g)||!aStatusStore.validateSnapshot(g))return false;
 const view={...g,fighters:g.fighters.map(f=>({...f,packModules:{...f.packModules,r20_55:{...f.packModules.r20_55,statuses:f.packModules.r20_55.statuses.filter(s=>!g.heroHost.statuses.some(row=>row.spec.target===f.i&&row.spec.key===s.key&&row.spec.owner===s.owner&&row.spec.abilityId===s.abilityId))}}}))};
 return engine.packCombat.validateSnapshot(engine,view);
}

// Finite named projection stages. No opaque status objects or generic property setters.
const legacyProjectionStages=new Set(['0:2:projectAttack','1:2:projectInterval','4:1:projectAttack','6:2:projectDamage','7:3:projectAttack']);
export function projectLegacyPassive(engine,heroId,slot,hook,event,fallback){
 const session=binding(engine),key=heroId+':'+slot+':'+hook;
 if(!legacyProjectionStages.has(key)||!session.has(heroId,slot,hook))return fallback();
 const actor=event.owner,abilityId=session.sealed.hero(heroId).abilities[slot].id;
 if(engine.indices[actor]!==heroId)throw Error('Invalid projection owner');
 const result=session.invoke(heroId,slot,hook,host(engine,abilityId,{actor,heroId,slot,abilityId}),event).value;
 const shapes={projectInterval:['manaPerSecond'],projectDamage:['evaded'],projectAttack:heroId===4?['proc','damageBonus','knockbackBonus','slowPercentage','slowSeconds']:['damage']};
 if(!result||Object.keys(result).sort().join(',')!==shapes[hook].sort().join(','))throw Error('Invalid finite projection return');
 for(const [field,value]of Object.entries(result))if(['evaded','proc'].includes(field)){if(typeof value!=='boolean')throw Error('Invalid projection flag');}else bounded(value,0,field==='slowPercentage'?100:field==='slowSeconds'?60:1e7);
 return result;
}

// Only typed status callbacks are enabled in this batch. Other binding kinds reject.
function dropRuleStatusJobs(entry,ref){for(const [handle,j]of entry.jobs)if(j.request.binding.ref===ref)entry.jobs.delete(handle);}
function scheduleRuleStatus(engine,origin,spec){
 const entry=bridgeEntry(engine),row=entry.handles.get(spec.binding?.ref),impl=entry.session.sealed.implementation(origin.heroId,origin.slot);
 if(Object.keys(spec).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||spec.binding?.kind!=='status'||Object.keys(spec.binding).sort().join(',')!=='kind,ref'||spec.delivery!=='actor.status-advance'||!impl.scheduledBindings?.[spec.handler]?.some(p=>p.binding==='status'&&p.delivery===spec.delivery)||!row||!liveRecord(engine,row)||row.origin.actor!==origin.actor||originKey(row.origin)!==originKey(origin)||spec.owner!==row.spec.owner||spec.target!==row.spec.target||spec.handler!=='statusPulse')throw Error('Unsupported/foreign typed status binding');
 const native=row.record,ns=impl.namespace??('skill:'+origin.heroId+':'+origin.abilityId),state=entry.session.snapshot().namespaces.find(n=>n.namespace===ns)?.state,r=state?.records?.find(x=>x.handle===spec.binding.ref);
 if(Object.keys(spec.data??{}).sort().join(',')!=='record'||!r||r.n!==spec.data.record||spec.delay!==native.interval||native.interval<=0||r.interval!==native.interval||r.program!==native.programId||entry.jobs.size>=256||[...entry.jobs.values()].some(j=>j.request.binding.ref===spec.binding.ref&&j.request.handler===spec.handler))throw Error('Invalid source status cadence/record');
 const handle='rule-job:'+entry.generation+':'+entry.nextJob++;entry.jobs.set(handle,{handle,origin:{...origin},stamp:{...row.stamp},request:structuredClone(spec),at:(entry.lease?.job?.at??engine.t)+bounded(spec.delay,.001,3600)});return handle;
}
export function dispatchRuleStatusPulse(engine,f,record,enabled){
 const entry=bridgeEntry(engine),pair=[...entry.handles].find(([,r])=>r.record===record);if(!pair||!record.programId)return false;
 const [ref,row]=pair,jobs=[...entry.jobs.values()].filter(j=>j.request.binding.ref===ref&&j.request.delivery==='actor.status-advance'&&j.at<=engine.t+1e-8);
 if(jobs.length!==1)throw Error('Missing unique native status callback');
 const job=jobs[0];entry.jobs.delete(job.handle);entry.lease={record,ref,job};
 try{entry.session.scheduled(row.origin.heroId,row.origin.slot,job.request.handler,host(engine,row.spec.abilityId,row.origin),{...structuredClone(job.request.data),handle:job.handle});}finally{entry.lease=null;}
 return true;
}
function validRuleStatusJobs(engine,g,saved){
 const session=binding(engine),seen=new Set();for(const job of saved.jobs){
  if(Object.keys(job).sort().join(',')!=='at,handle,origin,request,stamp'||!new RegExp('^rule-job:'+saved.generation+':[1-9][0-9]*$').test(job.handle)||Number(job.handle.split(':')[2])>=saved.nextJob||seen.has(job.handle)||!Number.isFinite(job.at)||job.at<g.t-1e-7)return false;seen.add(job.handle);
  const q=job.request,row=saved.statuses.find(r=>r.handle===q.binding?.ref);if(!row||JSON.stringify(row.stamp)!==JSON.stringify(job.stamp)||JSON.stringify(row.origin)!==JSON.stringify(job.origin)||Object.keys(q).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||Object.keys(q.binding).sort().join(',')!=='kind,ref'||q.binding.kind!=='status'||q.delivery!=='actor.status-advance'||q.handler!=='statusPulse'||q.abilityId!==row.spec.abilityId||q.owner!==row.spec.owner||q.target!==row.spec.target||Object.keys(q.data??{}).sort().join(',')!=='record')return false;
  const o=row.origin,impl=session.sealed.implementation(o.heroId,o.slot),ns=impl.namespace??('skill:'+o.heroId+':'+o.abilityId),r=g.heroRules.namespaces.find(n=>n.namespace===ns)?.state?.records?.find(r=>r.handle===row.handle),native=g.fighters[row.spec.target].packModules.r20_55.statuses.find(n=>n.key===row.spec.key&&n.owner===row.spec.owner&&n.abilityId===row.spec.abilityId);
  if(!impl.scheduledBindings?.[q.handler]?.some(p=>p.binding==='status'&&p.delivery===q.delivery)||!r||r.n!==q.data.record||q.delay!==r.interval||native.interval!==q.delay||native.programId!==r.program||Math.abs(job.at-(g.t+native.interval-native.tick))>1e-7)return false;
 }
 for(const row of saved.statuses){const o=row.origin,native=g.fighters[row.spec.target].packModules.r20_55.statuses.find(n=>n.key===row.spec.key&&n.owner===row.spec.owner&&n.abilityId===row.spec.abilityId);const count=saved.jobs.filter(j=>j.request.binding.ref===row.handle).length,tail=native.interval>0&&native.elapsed>=native.interval-1e-8&&native.interval-native.tick>native.life+1e-8;if(count!==(native.interval>0&&!tail?1:0))return false;}
 return true;
}

function scheduledBindingsAdmission(impl){return Object.entries(impl.scheduledBindings??{}).every(([handler,pairs])=>handler==='statusPulse'&&pairs.length>0&&pairs.every(p=>p.binding==='status'&&p.delivery==='actor.status-advance'));}
function statusScheduleAdmission(engine,origin){
 const session=binding(engine),impl=session.sealed.implementation(origin.heroId,origin.slot),a=session.sealed.hero(origin.heroId).abilities[origin.slot];
 if(!scheduledBindingsAdmission(impl)||!impl.scheduledBindings?.statusPulse?.some(p=>p.binding==='status'&&p.delivery==='actor.status-advance'))return false;
 let unsupported=false;const scan=node=>{if(!node||typeof node!=='object')return;if(['delay','area','toggle','special','mark','rupture','pullStep'].includes(node.op)||node.aura)unsupported=true;Object.values(node).forEach(scan);};scan(a.recipe);
 try{return !unsupported&&statusVariants(engine,origin).filter(v=>v.interval>0).every(v=>v.interval>=1/60&&Math.abs(v.interval*60-Math.round(v.interval*60))<1e-8);}catch{return false;}
}
