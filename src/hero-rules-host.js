import {createHeroRegistry,createRuleSession} from './heros-rules.js';
import {services as aStatusStore} from './hero-packs/r20_55/combat.js';
import {packStatusEffective} from './pack-services.js';
const defaultRules=createHeroRegistry().seal(),sessions=new WeakMap();
export const HERO_RULES_HASH=defaultRules.rulesHash;
function binding(engine){
 let entry=sessions.get(engine);
 if(!entry){entry={fighters:engine.fighters,handles:new Map(),nextHandle:1,jobs:new Map(),nextJob:1,sourceId:0,entityId:0,entities:new Map(),nextEntity:1,entityLease:null,allocations:new Map(),statusBirths:new Map(),sourceBirths:new Map(),areaBirths:new Map(),auraClocks:new Map(),generation:1,lease:null,session:createRuleSession(engine.heroRuleRegistry?engine.heroRuleRegistry.seal():defaultRules)};sessions.set(engine,entry);}
 if(entry.fighters!==engine.fighters){entry.fighters=engine.fighters;entry.handles=new Map();entry.nextHandle=1;entry.jobs=new Map();entry.nextJob=1;entry.sourceId=0;entry.entityId=0;entry.entities=new Map();entry.nextEntity=1;entry.entityLease=null;entry.allocations=new Map();entry.statusBirths=new Map();entry.sourceBirths=new Map();entry.areaBirths=new Map();entry.auraClocks=new Map();entry.generation++;entry.lease=null;entry.session=createRuleSession(entry.session.sealed);}
 return entry.session;
}
const bridgeEntry=engine=>{binding(engine);return sessions.get(engine);};
// Executable migration allowlist, not a roster unlock. Other registered drafts retain native dispatch.
const activeMigrations=new Set(['21:0','28:1','32:0','32:3','36:0','42:0','50:2','55:0','55:3','21:1','28:0','29:0','36:3','50:0','32:1','50:1']);
export function usesPrivateRuleCast(engine,actor,slot){return activeMigrations.has(engine.indices[actor]+':'+slot)&&binding(engine).has(engine.indices[actor],slot);}
const overlay=(a,b)=>b&&typeof b==='object'&&!Array.isArray(b)?Object.fromEntries(Object.entries({...a,...b}).map(([k,v])=>[k,k in b?overlay(a?.[k],v):v])):b;
const staticPassiveMigrations=new Set(['28:2']);
const legacyActiveMigrations=new Set(['5:1','5:3','9:1','3:3','8:3','13:0','13:1','13:3','17:1']);
const legacyPassiveMigrations=new Set(['0:2','1:2','4:1','6:2','7:3']);
function selectedActivation(engine,actor,slot){const key=engine.indices[actor]+':'+slot;return usesPrivateRuleCast(engine,actor,slot)||legacyActiveMigrations.has(key);}
export function moduleAbility(engine,actorId,slot,original){const session=binding(engine),heroId=engine.indices[actorId],key=heroId+':'+slot;if(!session.sealed.implementation(heroId,slot)||!selectedActivation(engine,actorId,slot)&&!legacyPassiveMigrations.has(key)&&!staticPassiveMigrations.has(key)&&!(heroId===31&&slot===2&&session.has(heroId,slot,'onAttack')))return original;return {...original,mvp:overlay(original.mvp,session.sealed.hero(heroId).abilities[slot].mvp)};}

const bounded=(v,min,max)=>{if(!Number.isFinite(v)||v<min||v>max)throw Error('Invalid effect amount/duration');return v;};
function host(engine,abilityId,origin,capture={}){
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
    apply(spec){identity(spec);if(!aProfile)throw Error('Unsupported status source profile');return applyRuleStatus(engine,origin,spec,capture);},
    remove(handle){return removeRuleStatus(engine,origin,handle);},
    query(target,key){actor(target);return queryRuleStatus(engine,origin,target,key);},
    cleanse(target,tier,id){if(id!==abilityId||!['basic','strong'].includes(tier))throw Error('Invalid status cleanse');actor(target);const before=queryRuleStatus(engine,origin,target);engine.dispel(actor(target),tier);reconcileRuleStatuses(engine);return before.filter(s=>!queryRuleStatus(engine,origin,target).some(x=>x.handle===s.handle)).map(s=>s.handle);}
   },
   legacyEffect:{spawn(spec){identity(spec);return spawnRuleArea(engine,origin,spec,capture);},view(handle){return viewRuleArea(engine,origin,handle);},end(handle,reason){return endRuleArea(engine,origin,handle,reason);}},
   schedule(spec){identity(spec);return spec.binding?.kind==='entity'?scheduleRuleArea(engine,origin,spec):spec.binding?.kind==='source-job'?scheduleRuleSourceJob(engine,origin,spec,capture):scheduleRuleStatus(engine,origin,spec);},
   cancelJob(handle){const entry=bridgeEntry(engine),job=entry.jobs.get(handle);if(!job)return false;if(originKey(job.origin)!==originKey(origin)||job.origin.actor!==origin.actor)throw Error('Cross-origin job cancellation');entry.jobs.delete(handle);if(job.nativeId!==undefined){const world=engine.packModules?.r20_55;if(world)world.jobs=world.jobs.filter(j=>j.id!==job.nativeId);}return true;},
   selfDamage(spec){identity(spec);if(Object.keys(spec).sort().join(',')!=='abilityId,actor,amount,nonlethal'||spec.actor!==origin.actor||spec.nonlethal!==true)throw Error('Unsupported self damage receipt');const f=actor(spec.actor),amount=bounded(spec.amount,0,1e7),actual=engine.nonlethalSelfDamage(f,amount);return {accepted:f.hp>0,landed:f.hp>0,guarded:false,raw:amount,actual,deferred:0,killedAtDebit:false};},
   heal(spec){identity(spec);actor(spec.source);const target=actor(spec.target),receipt={actual:0,deferred:0};engine.heal(target,bounded(spec.amount,0,1e7),{skill:abilityId},receipt);return receipt;},
   cue(event){identity(event);if(aProfile&&event.kind==='cast')return;const f=actor(event.actor),color=engine.hero(f.i).color;if(event.kind==='blink')engine.fx('dash',f.x,f.y+80,color);else if(event.kind==='targeted-hit'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,color,{tx:t.x,ty:t.y+100});}else if(event.kind==='passive'&&abilityId==='slardar_bash'){const t=actor(event.target);engine.fx('text',t.x,t.y+170,'#cea4ff',{text:'深海重击'});engine.log('passive',f.i,{skill:abilityId});}else if(event.kind==='reflect'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,'#95dcff',{tx:t.x,ty:t.y+100});engine.fx('text',f.x,f.y+180,'#bbf0ff',{text:'法术反制'});engine.log('reflect',f.i,{skill:abilityId});}else throw Error('Unknown semantic cue');}
  }
 };
}
export function activateHeroRule(engine,f,cast){
 const session=binding(engine),heroId=engine.indices[f.i],abilityId=engine.ability(f.i,cast.slot).id;
 if(!session.has(heroId,cast.slot)||!selectedActivation(engine,f.i,cast.slot))return {handled:false};
 const result=session.invoke(heroId,cast.slot,'activate',host(engine,abilityId,{actor:f.i,heroId,slot:cast.slot,abilityId},{aimX:cast.aim,sourceId:cast.id,castId:String(cast.id)}),{owner:f.i,target:1-f.i,abilityId,slot:cast.slot,castId:String(cast.id),direction:cast.dir??f.dir,aimX:cast.aim,heldSeconds:cast.charge??0,reflected:!!cast.reflected});
 syncRuleSourceJobs(engine);syncRuleAreas(engine);
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
 const supported=new Set(['damage','heal','control','target-route','motion-request','protect','cue',...(usesPrivateRuleCast(engine,actorId,slot)?['status','schedule','self-damage','legacy-effect']:[])]);
 const impl=session.sealed.implementation(heroId,slot);if(!scheduledBindingsAdmission(impl)||impl.requires.some(cap=>!supported.has(cap))||impl.requires.includes('schedule')&&!scheduleAdmission(engine,{actor:actorId,heroId,slot,abilityId:session.sealed.hero(heroId).abilities[slot].id}))return false;
 try{if(usesPrivateRuleCast(engine,actorId,slot))statusVariants(engine,{actor:actorId,heroId,slot,abilityId:session.sealed.hero(heroId).abilities[slot].id});return session.validateFacts(host(engine,session.sealed.hero(heroId).abilities[slot].id));}catch{return false;}
}


// Detached definitions compile a closed status vocabulary. No private hero operation is called here.
function statusVariants(engine,origin){
 const ability=binding(engine).sealed.hero(origin.heroId).abilities[origin.slot],params=ability.mvp.params??{},out=[],fields=new Set(['armor','attackReduction','moveSlow','attackSlow','attackSpeed','spellAmp','physicalImmune','stun','silence','basicReduction']);
 const value=x=>{if(typeof x==='number'||typeof x==='boolean')return x;if(typeof x==='string'&&Number.isFinite(params[x]))return params[x];if(x&&typeof x==='object'){if(x.div)return value(x.div[0])/value(x.div[1]);if(x.mul)return x.mul.reduce((n,v)=>n*value(v),1);if(x.add)return x.add.reduce((n,v)=>n+value(v),0);}throw Error('Unsupported batch status expression');};
 const visit=(node,path='recipe')=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach((v,i)=>visit(v,path+'.'+i));return;}if(node.op==='status'){if(Object.keys(node.values??{}).some(k=>!fields.has(k)))throw Error('Unimplemented static status projection');const interval=node.tick?bounded(value(node.tick.interval),.001,3600):0;out.push({key:node.key??ability.id,duration:value(node.duration),polarity:node.to==='self'?'positive':'negative',dispel:node.dispel??'basic',pierces:!!node.pierces,interval,program:node.tick?ability.id+':'+path+'.tick.ops':null,values:Object.fromEntries(Object.entries(node.values??{}).map(([k,v])=>[k,value(v)]))});}for(const [k,v]of Object.entries(node))visit(v,path+'.'+k);};visit(ability.recipe);return out;
}
const same=(a,b)=>JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort());
const originKey=o=>o.heroId+':'+o.slot;
function liveRecord(engine,row){return engine.fighters[row.spec.target].packModules?.r20_55?.statuses.find(s=>s===row.record&&(s.life>1e-8||bridgeEntry(engine).lease?.record===s));}
function applyRuleStatus(engine,origin,spec,capture){
 const variants=statusVariants(engine,origin);
 if(Object.keys(spec).sort().join(',')!=='abilityId,dispel,duration,key,owner,pierces,polarity,target,values'||![0,1].includes(spec.owner)||![0,1].includes(spec.target)||!variants.some(v=>v.key===spec.key&&v.duration===spec.duration&&v.polarity===spec.polarity&&v.dispel===spec.dispel&&v.pierces===spec.pierces&&same(v.values,spec.values)))throw Error('Status request differs from sealed source schema');
 const variant=variants.find(v=>v.key===spec.key&&v.duration===spec.duration&&same(v.values,spec.values));const entry=bridgeEntry(engine),sourceId=capture.sourceId,n=namespaceState(entry.session,origin)?.next??1;if(!Number.isSafeInteger(sourceId)||sourceId<1||sourceId>engine.seq||!Number.isSafeInteger(n)||n<1)throw Error('Missing native status birth identity');const f=engine.fighters[spec.target],options={key:spec.key,owner:spec.owner,duration:spec.duration,values:spec.values,dispel:spec.dispel,pierces:spec.pierces,interval:variant.interval};
 const record=spec.polarity==='positive'?aStatusStore.applyPositiveStatus(engine,f,options):aStatusStore.applyStatus(engine,f,options);
 if(!record)return null;Object.assign(record,{abilityId:spec.abilityId,reflected:spec.owner!==origin.actor,programId:variant.program});
 // Admission rejection above leaves the prior handle/record untouched. Successful recast invalidates it.
 for(const [handle,row]of entry.handles)if(row.spec.target===spec.target&&row.spec.key===spec.key)dropRuleStatusJobs(entry,handle),entry.handles.delete(handle);
 allocated(entry,origin,'status',n);entry.statusBirths.set(allocationNamespace(entry.session,origin)+':'+spec.target+':'+spec.key,{namespace:allocationNamespace(entry.session,origin),origin:{...origin},target:spec.target,key:spec.key,owner:spec.owner,ordinal:entry.nextHandle,sourceId,record:n,startedAt:engine.t,...(variant.interval>0?{pulse:{issued:0,consumed:0,ordinal:0}}:{})});const handle='rule-status:'+entry.generation+':'+(entry.nextHandle++)+':'+sourceId+':'+n;entry.handles.set(handle,{origin:{...origin},spec:structuredClone(spec),stamp:{generation:entry.generation,round:engine.round,sourceId,record:n,targetLife:engine.packCore?.life?.[spec.target]??0},record});return handle;
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
 const supported=new Set(['damage','heal','status','control','target-route','cue','schedule','self-damage','legacy-effect']);if(!scheduledBindingsAdmission(session.sealed.implementation(heroId,slot))||session.sealed.implementation(heroId,slot).requires.some(cap=>!supported.has(cap))||session.sealed.implementation(heroId,slot).requires.includes('schedule')&&!scheduleAdmission(engine,origin))return false;
 statusVariants(engine,origin);
 engine.commitAction(f);f.mp-=plan.manaCost;f.cd[slot]=plan.cooldownSeconds;if(plan.chargeCost){f.charges[slot]-=plan.chargeCost;if(f.chargeTimers[slot]<=0)f.chargeTimers[slot]=m.charge_restore_s;}f.casts++;f.guard=false;
 const x=targetProfile==='self'?f.x:Math.max(Math.max(45,f.x-m.range_wu),Math.min(Math.min(1155,f.x+m.range_wu),aim)),cast={id:++engine.seq,slot,abilityId:a.id,remaining:plan.windupSeconds,aim:x};
 if(targetProfile==='enemy')engine.notifyTargeted(f,t,a.id);if(cast.remaining>0)f.cast=cast;else engine.activate(f,cast);engine.animate(f,'cast',.35);engine.log('cast',i,{skill:a.id,slot,cost:plan.manaCost});return true;
}
export function ruleHostSnapshot(engine){
 const entry=bridgeEntry(engine);if(!entry.handles.size&&entry.nextHandle===1&&!entry.jobs.size&&entry.nextJob===1&&!entry.entities.size&&entry.nextEntity===1&&entry.generation===1&&!entry.auraClocks.size)return null;
 pruneSourceBirths(entry);pruneAreaBirths(entry);const snapshot={version:4,sourceBirths:[...entry.sourceBirths.values()].map(r=>structuredClone(r)),statusBirths:[...entry.statusBirths.values()].map(r=>structuredClone(r)),allocations:[...entry.allocations.values()].map(r=>({...r})),rulesHash:entry.session.sealed.rulesHash,generation:entry.generation,nextHandle:entry.nextHandle,nextJob:entry.nextJob,statuses:[...entry.handles].map(([handle,row])=>({handle,origin:row.origin,spec:row.spec,stamp:row.stamp})),jobs:[...entry.jobs.values()].map(j=>structuredClone(j))};if(entry.entities.size||entry.nextEntity!==1)Object.assign(snapshot,{version:5,areaBirths:[...entry.areaBirths.values()].map(r=>structuredClone(r)),nextEntity:entry.nextEntity,entities:[...entry.entities].map(([handle,r])=>({handle,nativeId:r.nativeId,origin:r.origin,spec:r.spec,stamp:r.stamp,clock:r.clock,aimX:r.aimX,record:r.canonicalN}))});if(entry.auraClocks.size)Object.assign(snapshot,{baseVersion:snapshot.version,version:6,auraClocks:[...entry.auraClocks.values()].map(snapshotAuraClock)});return snapshot;
}
// Persist allocation history independently in the simulation clock, including empty queues.
// This is cross-field integrity, not authentication of a coherently forged whole world.
export function ruleHostEpochSnapshot(engine){const e=bridgeEntry(engine);if(e.generation===1&&e.nextHandle===1&&e.nextJob===1&&e.nextEntity===1&&!e.handles.size&&!e.jobs.size&&!e.entities.size&&!e.auraClocks.size)return null;const w={version:1,generation:e.generation,nextHandle:e.nextHandle,nextJob:e.nextJob,sourceId:e.sourceId};if(e.nextEntity!==1||e.entities.size)Object.assign(w,{version:2,nextEntity:e.nextEntity,entityId:e.entityId});if(e.auraClocks.size)Object.assign(w,{baseVersion:w.version,version:3,auraClocks:[...e.auraClocks.values()].map(snapshotAuraClock)});return w;}
function publicAllocationHistory(session,g){
 const namespaces=new Set();for(const id of g.indices)for(let slot=0;slot<4;slot++)if(usesPrivateRuleCastForSnapshot(session,id,slot)){const impl=session.sealed.implementation(id,slot);namespaces.add(impl.namespace??('skill:'+id+':'+session.sealed.hero(id).abilities[slot].id));}
 return g.heroRules.namespaces.filter(r=>namespaces.has(r.namespace)).reduce((n,r)=>n+(Number.isSafeInteger(r.state?.next)?r.state.next-1:0),0);
}
function usesPrivateRuleCastForSnapshot(session,id,slot){return activeMigrations.has(id+':'+slot)&&session.has(id,slot);}
function allocationNamespace(session,origin){const impl=session.sealed.implementation(origin.heroId,origin.slot);return impl.namespace??('skill:'+origin.heroId+':'+origin.abilityId);}
function allocated(entry,origin,kind,n=0,sourceId=0,birth=null){const namespace=allocationNamespace(entry.session,origin);let r=entry.allocations.get(namespace);if(!r){r={namespace,statuses:0,sourceJobs:0,callbacks:0,lastStatus:0,lastSource:0,sourceId:0};entry.allocations.set(namespace,r);}if(kind==='status'){r.statuses++;r.lastStatus=n;}else if(kind==='source'){r.sourceJobs++;r.lastSource=n;r.sourceId=sourceId;}else if(kind==='area'){if(r.areas===undefined)Object.assign(r,{areas:0,areaCallbacks:0,lastArea:0,entityId:0});r.areas++;r.lastArea=n;r.entityId=sourceId;r.areaBirth={...birth,record:n,nativeId:sourceId};}else if(kind==='area-callback')r.areaCallbacks++;else r.callbacks++;}
function validClassifiedAllocations(session,g){
 const h=g.heroHost,rows=h.allocations;if(!Array.isArray(rows)||rows.length>184||!Array.isArray(h.sourceBirths)||h.areaBirths!==undefined&&!Array.isArray(h.areaBirths))return false;const seen=new Set();let statuses=0,jobs=0,sourceMax=0,sources=0,areas=0,entityMax=0,entityOrdinal=0;
 for(const r of rows){if(!r||Object.keys(r).sort().join(',')!==(r.areas===undefined?'callbacks,lastSource,lastStatus,namespace,sourceId,sourceJobs,statuses':'areaBirth,areaCallbacks,areas,callbacks,entityId,lastArea,lastSource,lastStatus,namespace,sourceId,sourceJobs,statuses')||typeof r.namespace!=='string'||seen.has(r.namespace)||!['statuses','sourceJobs','callbacks','lastStatus','lastSource','sourceId'].every(k=>Number.isSafeInteger(r[k])&&r[k]>=0))return false;seen.add(r.namespace);
 const origins=g.indices.flatMap((heroId,actor)=>[0,1,2,3].filter(slot=>usesPrivateRuleCastForSnapshot(session,heroId,slot)).map(slot=>({heroId,actor,slot,abilityId:session.sealed.hero(heroId).abilities[slot].id}))).filter(o=>allocationNamespace(session,o)===r.namespace),ns=g.heroRules.namespaces.find(n=>n.namespace===r.namespace),total=r.statuses+r.sourceJobs+(r.areas??0);
 if(!origins.length||!ns||ns.state?.next!==total+1||(!r.statuses)!==(!r.lastStatus)||(!r.sourceJobs)!==(!r.lastSource)||(!r.sourceJobs)!==(!r.sourceId)||r.lastStatus<r.statuses||r.lastSource<r.sourceJobs||r.lastStatus>total||r.lastSource>total||r.lastStatus&&r.lastStatus===r.lastSource||r.sourceId>g.packClock.seq||r.statuses&&!origins.some(o=>statusVariantsFromSealed(session,o).length)||r.sourceJobs&&!origins.some(o=>session.sealed.implementation(o.heroId,o.slot).scheduledBindings?.delayedProgram?.some(p=>p.binding==='source-job'))||r.callbacks&&!origins.some(o=>session.sealed.implementation(o.heroId,o.slot).scheduledBindings?.statusPulse?.some(p=>p.binding==='status')))return false;
 if(r.areas!==undefined&&(!['areas','areaCallbacks','lastArea','entityId'].every(k=>Number.isSafeInteger(r[k])&&r[k]>=0)||r.areas<1||r.lastArea<r.areas||r.lastArea>total||r.entityId<1||r.entityId>g.packClock.seq||!origins.some(o=>session.sealed.implementation(o.heroId,o.slot).scheduledBindings?.areaPulse?.some(p=>p.binding==='entity-area'))))return false;if(r.areas!==undefined){const b=r.areaBirth;if(!b||Object.keys(b).sort().join(',')!=='actor,castId,createdAt,nativeId,ordinal,record'||!['castId','nativeId','ordinal','record'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=1)||![0,1].includes(b.actor)||!origins.some(o=>o.actor===b.actor)||b.castId>=b.nativeId||!Number.isFinite(b.createdAt)||b.createdAt<0||b.createdAt>g.t||b.nativeId!==r.entityId||b.record!==r.lastArea)return false;entityOrdinal=Math.max(entityOrdinal,b.ordinal);}areas+=r.areas??0;entityMax=Math.max(entityMax,r.entityId??0);statuses+=r.statuses;sources+=r.sourceJobs;jobs+=r.sourceJobs+r.callbacks+(r.areaCallbacks??0);sourceMax=Math.max(sourceMax,r.sourceId);
 }
 for(const ns of g.heroRules.namespaces)if(Number.isSafeInteger(ns.state?.next)&&ns.state.next>1&&!seen.has(ns.namespace))return false;
 if(!Array.isArray(h.statusBirths)||h.statusBirths.length>128)return false;const birthKeys=new Set(),ordinals=new Set();let maxOrdinal=0;
 for(const b of h.statusBirths){if(!b||Object.keys(b).sort().join(',')!==(b.pulse?'key,namespace,ordinal,origin,owner,pulse,record,sourceId,startedAt,target':'key,namespace,ordinal,origin,owner,record,sourceId,startedAt,target')||!['ordinal','sourceId','record'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=1)||b.ordinal>statuses||b.sourceId>g.packClock.seq||![0,1].includes(b.owner)||![0,1].includes(b.target)||!Number.isFinite(b.startedAt)||b.startedAt<0||b.startedAt>g.t||typeof b.key!=='string')return false;const o=b.origin;if(!o||Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!usesPrivateRuleCastForSnapshot(session,o.heroId,o.slot)||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId||allocationNamespace(session,o)!==b.namespace||!statusVariantsFromSealed(session,o).some(n=>(n.key??o.abilityId)===b.key))return false;const c=rows.find(r=>r.namespace===b.namespace),key=b.namespace+':'+b.target+':'+b.key;if(!c||b.record>c.lastStatus||birthKeys.has(key)||ordinals.has(b.ordinal))return false;if(b.pulse&&(!b.pulse||Object.keys(b.pulse).sort().join(',')!=='consumed,issued,ordinal'||!['issued','consumed','ordinal'].every(k=>Number.isSafeInteger(b.pulse[k])&&b.pulse[k]>=0)||b.pulse.consumed>b.pulse.issued||b.pulse.issued-b.pulse.consumed>1||b.pulse.issued<1||b.pulse.ordinal<1||b.pulse.ordinal>=h.nextJob||b.pulse.issued>c.callbacks))return false;birthKeys.add(key);ordinals.add(b.ordinal);maxOrdinal=Math.max(maxOrdinal,b.ordinal);}
 for(const r of rows)if(r.lastStatus!==Math.max(0,...h.statusBirths.filter(b=>b.namespace===r.namespace).map(b=>b.record)))return false;
 const jobOrdinals=[...h.statusBirths.filter(b=>b.pulse).map(b=>b.pulse.ordinal),...(h.areaBirths??[]).map(b=>b?.pulse?.ordinal),...h.sourceBirths.map(b=>typeof b?.handle==='string'?Number(b.handle.split(':')[2]):NaN)];if(jobOrdinals.some(n=>!Number.isSafeInteger(n)||n<1)||new Set(jobOrdinals).size!==jobOrdinals.length||Math.max(0,...jobOrdinals)!==jobs)return false;
 return h.nextHandle===statuses+1&&maxOrdinal===statuses&&h.nextJob===jobs+1&&g.packClock.heroEpoch.sourceId===sourceMax&&sourceMax>=2*sources&&validSourceBirths(session,g)&&(areas===0?h.version===4:h.version===5&&h.nextEntity===areas+1&&entityOrdinal===areas&&g.packClock.heroEpoch.entityId===entityMax)&&Math.max(sourceMax,entityMax)>=2*(sources+areas)&&validAreaBirths(session,g);
}
function pruneSourceBirths(entry){const latest=new Map();for(const b of entry.sourceBirths.values()){const k=allocationNamespace(entry.session,b.origin)+':'+b.origin.actor;if(!latest.has(k)||latest.get(k)<b.nativeId)latest.set(k,b.nativeId);}const active=new Set([...entry.jobs.values()].filter(j=>j.nativeId!==undefined).map(j=>j.nativeId));for(const [id,b]of entry.sourceBirths)if(!active.has(id)&&latest.get(allocationNamespace(entry.session,b.origin)+':'+b.origin.actor)!==id)entry.sourceBirths.delete(id);}
function validSourceBirths(session,g){const h=g.heroHost,rows=h.sourceBirths;if(!Array.isArray(rows)||rows.length>256)return false;const ids=new Set(),ordinals=new Set(),latest=new Map();for(const b of rows){if(!b||typeof b.handle!=='string'||Object.keys(b).sort().join(',')!=='castId,handle,nativeId,origin,owner,record,stamp,target'||!['castId','nativeId','record'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=1)||b.castId>=b.nativeId||b.nativeId>g.packClock.seq||ids.has(b.nativeId)||![0,1].includes(b.owner)||b.target!==1-b.owner)return false;const o=b.origin;if(!o||Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!usesPrivateRuleCastForSnapshot(session,o.heroId,o.slot)||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId)return false;const ns=allocationNamespace(session,o),c=h.allocations.find(r=>r.namespace===ns),st=b.stamp,ordinal=Number(b.handle?.split(':')[2]);if(!c||c.sourceJobs<1||b.record>c.lastSource||b.nativeId>c.sourceId||!new RegExp('^rule-job:'+h.generation+':[1-9][0-9]*:'+b.nativeId+'$').test(b.handle)||!Number.isSafeInteger(ordinal)||ordinal>=h.nextJob||ordinals.has(ordinal)||!st||Object.keys(st).sort().join(',')!=='createdAt,generation,ownerLife,revision,round,targetLife'||st.generation!==h.generation||st.round!==g.round||!Number.isFinite(st.createdAt)||st.createdAt<0||st.createdAt>g.t||!['ownerLife','targetLife','revision'].every(k=>Number.isSafeInteger(st[k])&&st[k]>=0))return false;ids.add(b.nativeId);ordinals.add(ordinal);const key=ns+':'+o.actor;latest.set(key,Math.max(latest.get(key)??0,b.nativeId));}
 for(const c of h.allocations){const births=rows.filter(b=>allocationNamespace(session,b.origin)===c.namespace);if(c.sourceId!==Math.max(0,...births.map(b=>b.nativeId))||c.lastSource!==Math.max(0,...births.map(b=>b.record)))return false;}
 for(const b of rows)if(!h.jobs.some(j=>j.nativeId===b.nativeId)&&latest.get(allocationNamespace(session,b.origin)+':'+b.origin.actor)!==b.nativeId)return false;
 return true;}
function statusVariantsFromSealed(session,origin){const a=session.sealed.hero(origin.heroId).abilities[origin.slot],out=[];const visit=n=>{if(!n||typeof n!=='object')return;if(n.op==='status')out.push(n);Object.values(n).forEach(visit);};visit(a.recipe);return out;}
function validAllocationEpoch(session,g){
 const h=g.heroHost,w=g.packClock?.heroEpoch,history=publicAllocationHistory(session,g);
 if(!h)return !w&&history===0&&g.round===1;
 if(!w||Object.keys(w).sort().join(',')!==(h.version===5?'entityId,generation,nextEntity,nextHandle,nextJob,sourceId,version':'generation,nextHandle,nextJob,sourceId,version')||w.version!==(h.version===5?2:1)||w.generation<g.round||!['generation','nextHandle','nextJob'].every(k=>Number.isSafeInteger(w[k])&&w[k]>=1&&w[k]===h[k])||!Number.isSafeInteger(w.sourceId)||w.sourceId<0||w.sourceId>(g.packClock?.seq??-1)||(h.nextHandle-1)+(h.nextJob-1)+(h.nextEntity===undefined?0:h.nextEntity-1)<history)return false;
 if(h.version===5&&(!Number.isSafeInteger(w.nextEntity)||w.nextEntity<1||w.nextEntity!==h.nextEntity||!Number.isSafeInteger(w.entityId)||w.entityId<1||w.entityId>g.packClock.seq||!Array.isArray(h.entities)||h.entities.some(r=>r.nativeId>w.entityId)))return false;
 return Array.isArray(h.jobs)&&h.jobs.every(j=>j.nativeId===undefined||j.nativeId<=w.sourceId)&&validClassifiedAllocations(session,g);
}
function validJobHandle(job,saved){const p=job.handle?.split(':'),source=job.request?.binding?.kind==='source-job';if(p?.length!==(source?4:6)||p[0]!=='rule-job'||p[1]!==String(saved.generation)||!p.slice(2).every(n=>/^[1-9][0-9]*$/.test(n)&&Number.isSafeInteger(Number(n)))||Number(p[2])>=saved.nextJob)return false;if(source)return p[3]===String(job.nativeId);if(job.request?.binding?.kind==='entity'){const r=saved.entities?.find(r=>r.handle===job.request.binding.ref);return !!r&&p[3]===String(r.nativeId)&&p[4]===String(r.record);}const row=saved.statuses.find(r=>r.handle===job.request?.binding?.ref);return !!row&&p[3]===String(row.stamp.sourceId)&&p[4]===String(row.stamp.record)&&Number(p[5])>=1;}

export function validRuleHostSnapshot(engine,g,auraChecked=false){
 if(!auraChecked){if(!validAuraWitness(engine,g))return false;const core=auraCoreView(g);if(core!==g)return validRuleHostSnapshot(engine,core,true);}
 const saved=g.heroHost,session=binding(engine),nativeRefs=g.fighters.flatMap(f=>(f.packModules?.r20_55?.statuses??[]).filter(s=>g.indices.some(id=>[0,1,2,3].some(slot=>usesPrivateRuleCast(engine,g.indices.indexOf(id),slot)&&session.has(id,slot)&&s.abilityId===session.sealed.hero(id).abilities[slot].id))).map(s=>({target:f.i,status:s})));if(!validAllocationEpoch(session,g))return false;if(saved===undefined||saved===null)return nativeRefs.length===0&&!g.heroRules.namespaces.some(row=>row.state?.records?.length||row.state?.jobs?.length||row.state?.areas?.length)&&!(g.packModules?.r20_55?.jobs??[]).some(j=>g.indices.some((id,actor)=>[0,1,2,3].some(slot=>usesPrivateRuleCast(engine,actor,slot)&&session.sealed.hero(id).abilities[slot].id===j.abilityId)))&&!migratedNativeAreas(engine,g).length;
 try{if(Object.keys(saved).sort().join(',')!==(saved.version===5?'allocations,areaBirths,entities,generation,jobs,nextEntity,nextHandle,nextJob,rulesHash,sourceBirths,statusBirths,statuses,version':'allocations,generation,jobs,nextHandle,nextJob,rulesHash,sourceBirths,statusBirths,statuses,version')||![4,5].includes(saved.version)||!Number.isSafeInteger(saved.generation)||saved.generation<1||!Number.isSafeInteger(saved.nextJob)||saved.nextJob<1||!Array.isArray(saved.jobs)||saved.jobs.length>256||saved.rulesHash!==session.sealed.rulesHash||!Number.isSafeInteger(saved.nextHandle)||saved.nextHandle<1||!Array.isArray(saved.statuses)||saved.statuses.length>128)return false;
 const jobHandles=new Set();for(const j of saved.jobs){if(!j?.request?.binding||!['status','source-job','entity'].includes(j.request.binding.kind)||!validJobHandle(j,saved)||jobHandles.has(j.handle))return false;jobHandles.add(j.handle);}
 const seen=new Set();for(const row of saved.statuses){if(Object.keys(row).sort().join(',')!=='handle,origin,spec,stamp'||typeof row.handle!=='string'||!new RegExp('^rule-status:'+saved.generation+':[1-9][0-9]*:'+row.stamp?.sourceId+':'+row.stamp?.record+'$').test(row.handle)||Number(row.handle.split(':')[2])>=saved.nextHandle||seen.has(row.handle))return false;seen.add(row.handle);const o=row.origin,s=row.spec;
 if(!row.stamp||Object.keys(row.stamp).sort().join(',')!=='generation,record,round,sourceId,targetLife'||!Number.isSafeInteger(row.stamp.sourceId)||row.stamp.sourceId<1||row.stamp.sourceId>g.packClock.seq||!Number.isSafeInteger(row.stamp.record)||row.stamp.record<1||row.stamp.generation!==saved.generation||row.stamp.round!==g.round||row.stamp.targetLife!==(g.packCore?.life?.[s.target]??0))return false;
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
  const birth=saved.statusBirths.find(b=>b.namespace===namespace&&b.target===s.target&&b.key===s.key);if(!birth||JSON.stringify(birth.origin)!==JSON.stringify(o)||birth.owner!==s.owner||birth.ordinal!==Number(row.handle.split(':')[2])||birth.sourceId!==row.stamp.sourceId||birth.record!==r.n||birth.startedAt!==r.startedAt)return false;const classRow=saved.allocations.find(a=>a.namespace===namespace);if(!classRow||classRow.statuses<1||r.n>classRow.lastStatus||ns.namespace!==namespace||r.n!==row.stamp.record||r.owner!==s.owner||r.target!==s.target||r.key!==s.key||r.reflected!==(s.owner!==o.actor)||r.polarity!==s.polarity||r.pierces!==s.pierces||r.program!==statusVariants(engine,o).find(v=>v.key===s.key&&v.duration===s.duration&&same(v.values,s.values)).program||r.interval!==statusVariants(engine,o).find(v=>v.key===s.key&&v.duration===s.duration&&same(v.values,s.values)).interval||r.remaining!==Number(s.values.shield??0)||!same(r.values,s.values))return false;
  const native=g.fighters[s.target].packModules.r20_55.statuses.find(n=>n.key===s.key&&n.owner===s.owner&&n.abilityId===s.abilityId),nativeKey=s.target+':'+s.key+':'+s.owner+':'+s.abilityId;
  if(!native||nativeIdentities.has(nativeKey))return false;nativeIdentities.add(nativeKey);
  if(!close(r.expires-r.startedAt,s.duration)||!close(g.t-r.startedAt,native.elapsed)||!close(r.expires-g.t,native.life)||!close(native.elapsed+native.life,native.duration)||native.reflected!==r.reflected)return false;
 }
 if(publicHandles.size!==saved.statuses.length||nativeIdentities.size!==nativeRefs.length)return false;
 if(!validRuleStatusJobs(engine,g,saved)||!validRuleSourceJobs(engine,g,saved)||!validRuleAreasSnapshot(engine,g,saved))return false;
 return true;
 }catch{return false;}
}
export function restoreRuleHostSnapshot(engine,value,epoch){const entry=bridgeEntry(engine);entry.auraClocks=new Map((value?.auraClocks??[]).map(r=>[r.actor+':'+r.abilityId,{...r,spans:restoreAuraSpans(r.spans)}]));const core=auraCoreView({heroHost:value,packClock:{heroEpoch:epoch}});value=core.heroHost;epoch=core.packClock.heroEpoch;entry.handles=new Map();entry.nextHandle=value?.nextHandle??1;entry.nextJob=value?.nextJob??1;entry.sourceId=epoch?.sourceId??0;entry.entityId=epoch?.entityId??0;entry.allocations=new Map((value?.allocations??[]).map(r=>[r.namespace,r]));entry.sourceBirths=new Map((value?.sourceBirths??[]).map(r=>[r.nativeId,r]));entry.areaBirths=new Map((value?.areaBirths??[]).map(r=>[r.nativeId,r]));entry.statusBirths=new Map((value?.statusBirths??[]).map(r=>[r.namespace+':'+r.target+':'+r.key,r]));entry.generation=value?.generation??1;entry.jobs=new Map((value?.jobs??[]).map(j=>[j.handle,j]));entry.lease=null;entry.entityLease=null;entry.nextEntity=value?.nextEntity??1;entry.entities=new Map((value?.entities??[]).map(r=>[r.handle,{...r,canonicalN:r.record,record:engine.packModules.r20_55.entities.find(n=>n.id===r.nativeId)}]));for(const row of value?.statuses??[]){const record=engine.fighters[row.spec.target].packModules.r20_55.statuses.find(s=>s.key===row.spec.key&&s.abilityId===row.spec.abilityId&&s.owner===row.spec.owner);entry.handles.set(row.handle,{origin:row.origin,spec:row.spec,stamp:row.stamp,record});}}

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

// Typed callbacks bind to one native status clock or one native source-owned queue item.
function dropRuleStatusJobs(entry,ref){for(const [handle,j]of entry.jobs)if(j.request.binding.ref===ref)entry.jobs.delete(handle);}
function scheduleRuleStatus(engine,origin,spec){
 const entry=bridgeEntry(engine),row=entry.handles.get(spec.binding?.ref),impl=entry.session.sealed.implementation(origin.heroId,origin.slot);
 if(Object.keys(spec).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||spec.binding?.kind!=='status'||Object.keys(spec.binding).sort().join(',')!=='kind,ref'||spec.delivery!=='actor.status-advance'||!impl.scheduledBindings?.[spec.handler]?.some(p=>p.binding==='status'&&p.delivery===spec.delivery)||!row||!liveRecord(engine,row)||row.origin.actor!==origin.actor||originKey(row.origin)!==originKey(origin)||spec.owner!==row.spec.owner||spec.target!==row.spec.target||spec.handler!=='statusPulse')throw Error('Unsupported/foreign typed status binding');
 const native=row.record,ns=impl.namespace??('skill:'+origin.heroId+':'+origin.abilityId),state=entry.session.snapshot().namespaces.find(n=>n.namespace===ns)?.state,r=state?.records?.find(x=>x.handle===spec.binding.ref);
 if(Object.keys(spec.data??{}).sort().join(',')!=='record'||!r||r.n!==spec.data.record||spec.delay!==native.interval||native.interval<=0||r.interval!==native.interval||r.program!==native.programId||entry.jobs.size>=256||[...entry.jobs.values()].some(j=>j.request.binding.ref===spec.binding.ref&&j.request.handler===spec.handler))throw Error('Invalid source status cadence/record');
 const at=(entry.lease?.job?.at??engine.t)+bounded(spec.delay,.001,3600),pulse=Math.round((at-r.startedAt)/native.interval),birth=entry.statusBirths.get(ns+':'+row.spec.target+':'+row.spec.key);if(!birth?.pulse||pulse!==birth.pulse.issued+1||birth.pulse.issued!==birth.pulse.consumed)throw Error('Invalid status pulse issuance history');birth.pulse.issued=pulse;birth.pulse.ordinal=entry.nextJob;allocated(entry,origin,'callback');const handle='rule-job:'+entry.generation+':'+(entry.nextJob++)+':'+row.stamp.sourceId+':'+r.n+':'+pulse;entry.jobs.set(handle,{handle,origin:{...origin},stamp:{...row.stamp},request:structuredClone(spec),at});return handle;
}
export function dispatchRuleStatusPulse(engine,f,record,enabled){
 const entry=bridgeEntry(engine),pair=[...entry.handles].find(([,r])=>r.record===record);if(!pair||!record.programId)return false;
 const [ref,row]=pair,jobs=[...entry.jobs.values()].filter(j=>j.request.binding.ref===ref&&j.request.delivery==='actor.status-advance'&&j.at<=engine.t+1e-8);
 if(jobs.length!==1)throw Error('Missing unique native status callback');
 const job=jobs[0],ns=allocationNamespace(entry.session,row.origin),birth=entry.statusBirths.get(ns+':'+row.spec.target+':'+row.spec.key),pulse=Number(job.handle.split(':')[5]);if(!birth?.pulse||pulse!==birth.pulse.consumed+1||pulse!==birth.pulse.issued||Number(job.handle.split(':')[2])!==birth.pulse.ordinal||record.elapsed+1e-8<pulse*record.interval)throw Error('Repeated/non-native status pulse');birth.pulse.consumed=pulse;entry.jobs.delete(job.handle);entry.lease={record,ref,job};
 try{entry.session.scheduled(row.origin.heroId,row.origin.slot,job.request.handler,host(engine,row.spec.abilityId,row.origin,{sourceId:row.stamp.sourceId}),{...structuredClone(job.request.data),handle:job.handle});}finally{entry.lease=null;}
 return true;
}
function validRuleStatusJobs(engine,g,saved){
 const session=binding(engine),seen=new Set();for(const job of saved.jobs.filter(j=>j.request?.binding?.kind==='status')){
  if(Object.keys(job).sort().join(',')!=='at,handle,origin,request,stamp'||!validJobHandle(job,saved)||seen.has(job.handle)||!Number.isFinite(job.at)||job.at<g.t-1e-7)return false;seen.add(job.handle);
  const q=job.request,row=saved.statuses.find(r=>r.handle===q.binding?.ref);if(!row||JSON.stringify(row.stamp)!==JSON.stringify(job.stamp)||JSON.stringify(row.origin)!==JSON.stringify(job.origin)||Object.keys(q).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||Object.keys(q.binding).sort().join(',')!=='kind,ref'||q.binding.kind!=='status'||q.delivery!=='actor.status-advance'||q.handler!=='statusPulse'||q.abilityId!==row.spec.abilityId||q.owner!==row.spec.owner||q.target!==row.spec.target||Object.keys(q.data??{}).sort().join(',')!=='record')return false;
  const o=row.origin,impl=session.sealed.implementation(o.heroId,o.slot),ns=impl.namespace??('skill:'+o.heroId+':'+o.abilityId),r=g.heroRules.namespaces.find(n=>n.namespace===ns)?.state?.records?.find(r=>r.handle===row.handle),native=g.fighters[row.spec.target].packModules.r20_55.statuses.find(n=>n.key===row.spec.key&&n.owner===row.spec.owner&&n.abilityId===row.spec.abilityId);
  const birth=saved.statusBirths.find(b=>b.namespace===ns&&b.target===row.spec.target&&b.key===row.spec.key),phase=Number(job.handle.split(':')[5]);if(!birth?.pulse||phase!==birth.pulse.consumed+1||phase!==birth.pulse.issued||Number(job.handle.split(':')[2])!==birth.pulse.ordinal||Math.abs(job.at-(birth.startedAt+phase*native.interval))>1e-7)return false;
  if(!impl.scheduledBindings?.[q.handler]?.some(p=>p.binding==='status'&&p.delivery===q.delivery)||!r||r.n!==q.data.record||Number(job.handle.split(':')[5])!==Math.round((job.at-r.startedAt)/r.interval)||q.delay!==r.interval||native.interval!==q.delay||native.programId!==r.program||Math.abs(job.at-(g.t+native.interval-native.tick))>1e-7)return false;
 }
 for(const row of saved.statuses){const o=row.origin,native=g.fighters[row.spec.target].packModules.r20_55.statuses.find(n=>n.key===row.spec.key&&n.owner===row.spec.owner&&n.abilityId===row.spec.abilityId);const ns=allocationNamespace(session,o),birth=saved.statusBirths.find(b=>b.namespace===ns&&b.target===row.spec.target&&b.key===row.spec.key);if(native.interval>0){const completed=Math.floor((native.elapsed+1e-8)/native.interval);if(!birth?.pulse||native.tick< -1e-8||native.tick>=native.interval-1e-8||Math.abs(native.tick-(native.elapsed-completed*native.interval))>1e-7||birth.pulse.consumed!==completed)return false;}else if(birth?.pulse)return false;const count=saved.jobs.filter(j=>j.request.binding.ref===row.handle).length,tail=native.interval>0&&native.elapsed>=native.interval-1e-8&&native.interval-native.tick>native.life+1e-8;if(count!==(native.interval>0&&!tail?1:0)||native.interval>0&&birth.pulse.issued!==birth.pulse.consumed+count)return false;}
 return true;
}

function scheduledBindingsAdmission(impl){const area=Object.values(impl.scheduledBindings??{}).some(pairs=>pairs.some(p=>p.binding==='entity-area'));if(impl.requires.includes('legacy-effect')!==area||area&&!impl.requires.includes('schedule'))return false;return Object.entries(impl.scheduledBindings??{}).every(([handler,pairs])=>pairs.length>0&&pairs.every(p=>handler==='statusPulse'&&p.binding==='status'&&p.delivery==='actor.status-advance'||handler==='delayedProgram'&&p.binding==='source-job'&&p.delivery==='pack.job-due'||handler==='areaPulse'&&p.binding==='entity-area'&&p.delivery==='pack.entity'));}
function statusScheduleAdmission(engine,origin){
 const session=binding(engine),impl=session.sealed.implementation(origin.heroId,origin.slot),a=session.sealed.hero(origin.heroId).abilities[origin.slot];
 if(!scheduledBindingsAdmission(impl)||!impl.scheduledBindings?.statusPulse?.some(p=>p.binding==='status'&&p.delivery==='actor.status-advance'))return false;
 let unsupported=false;const scan=node=>{if(!node||typeof node!=='object')return;if(['delay','area','toggle','special','mark','rupture','pullStep'].includes(node.op)||node.aura)unsupported=true;Object.values(node).forEach(scan);};scan(a.recipe);
 try{const variants=statusVariants(engine,origin),periodic=variants.filter(v=>v.interval>0),keys=variants.map(v=>v.key);return !unsupported&&new Set(keys).size===keys.length&&periodic.length>0&&periodic.every(v=>v.interval>=1/60&&Math.abs(v.interval*60-Math.round(v.interval*60))<1e-8);}catch{return false;}
}


function namespaceState(session,origin,snapshot=session.snapshot()){
 const impl=session.sealed.implementation(origin.heroId,origin.slot),ns=impl.namespace??('skill:'+origin.heroId+':'+origin.abilityId);
 return snapshot.namespaces.find(n=>n.namespace===ns)?.state;
}
function sourceDelayProfiles(engine,origin){
 const session=binding(engine),a=session.sealed.hero(origin.heroId).abilities[origin.slot],params=a.mvp.params??{},profiles=[],nativePrograms=new Set();
 const collect=(node,path='recipe')=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){if(node.length&&node.every(o=>o&&typeof o.op==='string'))nativePrograms.add(a.id+':'+path);node.forEach((v,i)=>collect(v,path+'.'+i));return;}for(const [k,v]of Object.entries(node))collect(v,path+'.'+k);};collect(engine.hero(origin.actor).abilities[origin.slot].recipe);
 const value=v=>{if(typeof v==='number')return v;if(typeof v==='string'&&Number.isFinite(params[v]))return params[v];throw Error('Unsupported declared source-job delay');};
 const scan=(node,path='recipe')=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach((v,i)=>scan(v,path+'.'+i));return;}if(node.op&&!['delay','damage','status','heal','selfCost','dispel'].includes(node.op)||node.tick||node.aura)throw Error('Unsupported source-job operation');if(node.op==='delay'){const program=a.id+':'+path+'.ops';if(!nativePrograms.has(program)||!Array.isArray(node.ops))throw Error('Unsupported source-job program identity');profiles.push({program,delay:bounded(value(node.delay),0,3600)});}for(const [k,v]of Object.entries(node))scan(v,path+'.'+k);};scan(a.recipe);return profiles;
}
function scheduleAdmission(engine,origin){
 const impl=binding(engine).sealed.implementation(origin.heroId,origin.slot);if(!scheduledBindingsAdmission(impl))return false;
 const status=Object.values(impl.scheduledBindings??{}).some(pairs=>pairs.some(p=>p.binding==='status')),source=Object.values(impl.scheduledBindings??{}).some(pairs=>pairs.some(p=>p.binding==='source-job')),area=Object.values(impl.scheduledBindings??{}).some(pairs=>pairs.some(p=>p.binding==='entity-area'));
 if(status&&!statusScheduleAdmission(engine,origin))return false;
 if(source){try{if(sourceDelayProfiles(engine,origin).length!==1||(engine.packModules?.r20_55?.jobs.length??0)>=128||bridgeEntry(engine).jobs.size>=256)return false;}catch{return false;}}
 if(area){try{if(areaVariants(engine,origin).length!==1||(engine.packModules?.r20_55?.entities.length??0)>=64||bridgeEntry(engine).jobs.size>=256)return false;}catch{return false;}}
 return status||source||area;
}
function scheduleRuleSourceJob(engine,origin,spec,capture){
 const entry=bridgeEntry(engine),impl=entry.session.sealed.implementation(origin.heroId,origin.slot),profiles=sourceDelayProfiles(engine,origin),state=namespaceState(entry.session,origin);
 if(Object.keys(spec).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||Object.keys(spec.binding).sort().join(',')!=='kind'||spec.delivery!=='pack.job-due'||spec.handler!=='delayedProgram'||!impl.scheduledBindings?.[spec.handler]?.some(p=>p.binding==='source-job'&&p.delivery===spec.delivery)||![0,1].includes(spec.owner)||![0,1].includes(spec.target)||spec.target!==1-spec.owner||spec.abilityId!==origin.abilityId||Object.keys(spec.data??{}).sort().join(',')!=='job'||!Number.isSafeInteger(spec.data.job)||spec.data.job!==(state?.next??1)||profiles.length!==1||spec.delay!==profiles[0].delay||!Number.isFinite(capture.aimX)||capture.aimX<0||capture.aimX>1200)throw Error('Invalid typed source-job admission');
 if(!Number.isSafeInteger(capture.sourceId)||capture.sourceId<1||capture.sourceId>engine.seq)throw Error('Missing native source birth cast');const native=aStatusStore.scheduleEffect(engine,{abilityId:spec.abilityId,kind:'program',owner:spec.owner,target:spec.target,delay:spec.delay,data:{programId:profiles[0].program,aim:capture.aimX,reflected:spec.owner!==origin.actor,routeAtDelivery:false}});
 allocated(entry,origin,'source',spec.data.job,native.id);entry.sourceId=native.id;const handle='rule-job:'+entry.generation+':'+(entry.nextJob++)+':'+native.id;entry.jobs.set(handle,{handle,nativeId:native.id,origin:{...origin},stamp:{generation:entry.generation,round:engine.round,createdAt:engine.t,revision:native.revision,ownerLife:engine.packCore?.life?.[spec.owner]??0,targetLife:engine.packCore?.life?.[spec.target]??0},request:structuredClone(spec),at:native.at});const job=entry.jobs.get(handle);entry.sourceBirths.set(native.id,{nativeId:native.id,handle,origin:{...origin},owner:spec.owner,target:spec.target,record:spec.data.job,castId:capture.sourceId,stamp:{...job.stamp}});return handle;
}
function syncRuleSourceJobs(engine){
 const entry=bridgeEntry(engine);for(const job of entry.jobs.values())if(job.request.binding.kind==='source-job'){
  const row=namespaceState(entry.session,job.origin)?.jobs?.find(r=>r.handle===job.handle),native=engine.packModules?.r20_55?.jobs.find(j=>j.id===job.nativeId);
  if(!row||!native||row.n!==job.request.data.job||row.owner!==job.request.owner||row.target!==job.request.target||row.reflected!==(row.owner!==job.origin.actor)||!sourceDelayProfiles(engine,job.origin).some(p=>p.program===row.program&&p.delay===job.request.delay))throw Error('Public/native source-job commit mismatch');
  native.data={programId:row.program,aim:row.aimX,reflected:row.reflected,routeAtDelivery:row.route};
 }
}
export function dispatchRuleJobDue(engine,native,accepted,namespace){
 if(namespace!=='r20_55')return false;
 const entry=bridgeEntry(engine),job=[...entry.jobs.values()].find(j=>j.nativeId===native.id);if(!job)return false;
 entry.jobs.delete(job.handle);
 if(accepted)entry.session.scheduled(job.origin.heroId,job.origin.slot,job.request.handler,host(engine,job.origin.abilityId,job.origin,{aimX:native.data.aim,sourceId:native.id}),{...structuredClone(job.request.data),handle:job.handle});
 else entry.session.invoke(job.origin.heroId,job.origin.slot,'onStage',host(engine,job.origin.abilityId,job.origin),{kind:'job-ended',abilityId:job.origin.abilityId,handle:job.handle});
 syncRuleSourceJobs(engine);return true;
}
export function reconcileRuleJobs(engine){
 const entry=bridgeEntry(engine);for(const job of [...entry.jobs.values()])if(job.request.binding.kind==='source-job'&&!engine.packModules?.r20_55?.jobs.some(j=>j.id===job.nativeId)){
  entry.jobs.delete(job.handle);entry.session.invoke(job.origin.heroId,job.origin.slot,'onStage',host(engine,job.origin.abilityId,job.origin),{kind:'job-ended',abilityId:job.origin.abilityId,handle:job.handle});
 }
}
function validRuleSourceJobs(engine,g,saved){
 const session=binding(engine),bound=saved.jobs.filter(j=>j.request.binding.kind==='source-job'),nativeRows=g.packModules?.r20_55?.jobs??[],publicHandles=new Set(),nativeIds=new Set();
 for(const job of bound){
  const o=job.origin,q=job.request,st=job.stamp,birth=saved.sourceBirths.find(b=>b.nativeId===job.nativeId);if(!birth||birth.handle!==job.handle||birth.record!==q.data.job||birth.owner!==q.owner||birth.target!==q.target||JSON.stringify(birth.origin)!==JSON.stringify(o)||JSON.stringify(birth.stamp)!==JSON.stringify(st))return false;
  if(Object.keys(job).sort().join(',')!=='at,handle,nativeId,origin,request,stamp'||Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!usesPrivateRuleCast(engine,o.actor,o.slot)||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId||Object.keys(q).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||Object.keys(q.binding).sort().join(',')!=='kind'||q.delivery!=='pack.job-due'||q.handler!=='delayedProgram'||q.abilityId!==o.abilityId||![0,1].includes(q.owner)||q.target!==1-q.owner||Object.keys(q.data??{}).sort().join(',')!=='job'||!Number.isSafeInteger(q.data.job)||!Number.isSafeInteger(job.nativeId)||job.nativeId<1||!Number.isSafeInteger(g.packClock?.seq)||job.nativeId>g.packClock.seq||nativeIds.has(job.nativeId)||!Number.isFinite(job.at)||job.at<g.t-1e-7)return false;
  nativeIds.add(job.nativeId);
  if(Object.keys(st).sort().join(',')!=='createdAt,generation,ownerLife,revision,round,targetLife'||st.generation!==saved.generation||st.round!==g.round||!Number.isSafeInteger(st.ownerLife)||st.ownerLife<0||st.ownerLife!==(g.packCore?.life?.[q.owner]??0)||!Number.isSafeInteger(st.targetLife)||st.targetLife<0||st.targetLife>(g.packCore?.life?.[q.target]??0)||!Number.isFinite(st.createdAt)||st.createdAt<0||st.createdAt>g.t+1e-7||!Number.isSafeInteger(st.revision)||st.revision<0||Math.abs(job.at-(st.createdAt+q.delay))>1e-7)return false;
  const impl=session.sealed.implementation(o.heroId,o.slot),r=namespaceState(session,o,g.heroRules)?.jobs?.find(r=>r.handle===job.handle),native=nativeRows.filter(n=>n.id===job.nativeId),classRow=saved.allocations.find(a=>a.namespace===allocationNamespace(session,o));if(!classRow||classRow.sourceJobs<1||q.data.job>classRow.lastSource||job.nativeId>classRow.sourceId)return false;
  if(!impl.scheduledBindings?.[q.handler]?.some(p=>p.binding==='source-job'&&p.delivery===q.delivery)||!r||r.n!==q.data.job||r.owner!==q.owner||r.target!==q.target||r.reflected!==(q.owner!==o.actor)||!sourceDelayProfiles(engine,o).some(p=>p.program===r.program&&p.delay===q.delay)||native.length!==1)return false;
  const n=native[0];if(Object.keys(n).sort().join(',')!=='abilityId,at,cancelOnInterrupt,data,id,kind,owner,persist,revision,target'||n.kind!=='program'||n.abilityId!==q.abilityId||n.owner!==q.owner||n.target!==q.target||n.at!==job.at||n.persist!==false||n.cancelOnInterrupt!==false||!Number.isSafeInteger(n.revision)||n.revision!==st.revision||n.revision>(g.packModules.r20_55.revisions[q.owner]??-1)||Object.keys(n.data).sort().join(',')!=='aim,programId,reflected,routeAtDelivery'||n.data.programId!==r.program||n.data.aim!==r.aimX||n.data.reflected!==r.reflected||n.data.routeAtDelivery!==r.route)return false;
 }
 for(const ns of g.heroRules.namespaces)for(const r of ns.state?.jobs??[]){if(publicHandles.has(r.handle))return false;publicHandles.add(r.handle);const job=bound.find(j=>j.handle===r.handle);if(!job||ns.namespace!==(session.sealed.implementation(job.origin.heroId,job.origin.slot).namespace??('skill:'+job.origin.heroId+':'+job.origin.abilityId)))return false;}
 if(publicHandles.size!==bound.length)return false;
 for(const n of nativeRows)if(g.indices.some((id,actor)=>[0,1,2,3].some(slot=>usesPrivateRuleCast(engine,actor,slot)&&session.sealed.hero(id).abilities[slot].id===n.abilityId))&&!nativeIds.has(n.id))return false;
 return true;
}


// Native source-owned area profile. Geometry/timer/contact counters remain in the private native phase.
function areaVariants(engine,origin){
 const a=binding(engine).sealed.hero(origin.heroId).abilities[origin.slot],params=a.mvp.params??{},out=[],originalPrograms=new Set();
 const collect=(node,path='recipe')=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){if(node.length&&node.every(o=>o&&typeof o.op==='string'))originalPrograms.add(a.id+':'+path);node.forEach((v,i)=>collect(v,path+'.'+i));return;}for(const [k,v]of Object.entries(node))collect(v,path+'.'+k);};collect(engine.hero(origin.actor).abilities[origin.slot].recipe);
 const val=v=>{if(typeof v==='number')return v;if(typeof v==='string'&&Number.isFinite(params[v]))return params[v];if(v?.div)return val(v.div[0])/val(v.div[1]);throw Error('Unsupported static area coefficient');};
 const scan=(node,path='recipe')=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach((v,i)=>scan(v,path+'.'+i));return;}if(node.op&&!['area','damage','status','heal'].includes(node.op)||node.tick||node.aura)throw Error('Unsupported area profile operation');if(node.op==='area'){const interval=bounded(val(node.interval),1/60,100),duration=bounded(val(node.duration),interval,100),program=a.id+':'+path+'.ops';if(node.channel||node.growth||node.maxHits||node.breakOnRange||node.cancelOnLeave||!originalPrograms.has(program)||Math.abs(interval*60-Math.round(interval*60))>1e-8||Math.abs(duration/interval-Math.round(duration/interval))>1e-8)throw Error('Unsupported area lifecycle/cadence profile');out.push({interval,duration,program,radius:bounded(val(node.radius)*.55,0,10000),follow:!!node.follow});}for(const [k,v]of Object.entries(node))scan(v,path+'.'+k);};scan(a.recipe);return out;
}
function spawnRuleArea(engine,origin,spec,capture){
 const entry=bridgeEntry(engine),profiles=areaVariants(engine,origin),p=profiles[0];
 if(profiles.length!==1||Object.keys(spec).sort().join(',')!=='abilityId,castId,data,duration,kind,owner,radius,x'||spec.kind!=='area'||spec.owner!==origin.actor||spec.abilityId!==origin.abilityId||spec.castId!==capture.castId||Object.keys(spec.data??{}).sort().join(',')!=='follow,interval,target'||spec.data.target!==1-spec.owner||spec.data.follow!==p.follow||spec.data.interval!==p.interval||spec.duration!==p.duration||spec.radius!==p.radius||spec.x!==(p.follow?engine.fighters[spec.owner].x:capture.aimX))throw Error('Area request differs from captured finite source profile');
 const native=aStatusStore.spawn(engine,{kind:'area',owner:spec.owner,x:spec.x,life:spec.duration,data:{abilityId:spec.abilityId,target:spec.data.target,programId:p.program,interval:p.interval,tick:0,radius:p.radius,growth:0,pulses:0,hits:0,maxHits:0,follow:p.follow,channel:false,breakOnRange:false,cancelOnLeave:false,reflected:false}});
 const n=namespaceState(entry.session,origin)?.next??1;allocated(entry,origin,'area',n,native.id,{ordinal:entry.nextEntity,actor:origin.actor,createdAt:engine.t,castId:Number(spec.castId)});entry.entityId=native.id;const handle='rule-entity:'+entry.generation+':'+(entry.nextEntity++)+':'+native.id;entry.areaBirths.set(native.id,{namespace:allocationNamespace(entry.session,origin),origin:{...origin},nativeId:native.id,handle,ordinal:Number(handle.split(':')[2]),record:n,castId:Number(spec.castId),createdAt:engine.t,pulse:{issued:0,consumed:0,ordinal:0}});entry.entities.set(handle,{origin:{...origin},spec:structuredClone(spec),aimX:capture.aimX,canonicalN:n,nativeId:native.id,stamp:{generation:entry.generation,round:engine.round,createdAt:engine.t,ownerLife:engine.packCore?.life?.[spec.owner]??0,targetLife:engine.packCore?.life?.[spec.data.target]??0},clock:{x:native.x,tick:0,pulses:0,hits:0},record:native});return handle;
}
function liveRuleArea(engine,row){const n=engine.packModules?.r20_55?.entities.find(n=>n===row.record&&n.id===row.nativeId);return n&&(n.life>1e-8||bridgeEntry(engine).entityLease?.record===n)?n:null;}
function viewRuleArea(engine,origin,handle){const row=bridgeEntry(engine).entities.get(handle);if(!row)return null;if(row.origin.actor!==origin.actor||originKey(row.origin)!==originKey(origin))throw Error('Cross-origin area view');const n=liveRuleArea(engine,row);return n?{alive:true,x:n.x,y:n.y}:null;}
function dropRuleAreaJobs(entry,ref){for(const [handle,j]of entry.jobs)if(j.request.binding.kind==='entity'&&j.request.binding.ref===ref)entry.jobs.delete(handle);}
function endRuleArea(engine,origin,handle,reason){const entry=bridgeEntry(engine),row=entry.entities.get(handle);if(!row)return false;if(row.origin.actor!==origin.actor||originKey(row.origin)!==originKey(origin)||!['expired','owner-dead'].includes(reason))throw Error('Invalid area end origin/policy');const n=liveRuleArea(engine,row);if(reason==='owner-dead'&&engine.fighters[row.spec.owner].hp>0)throw Error('Live source cannot end as owner-dead');if(reason==='expired'&&n?.life>1e-8)throw Error('Area profile cannot end before native expiry');dropRuleAreaJobs(entry,handle);entry.entities.delete(handle);if(n)n.life=0;return !!n;}
function syncRuleAreas(engine){const entry=bridgeEntry(engine);for(const [ref,row]of entry.entities){const r=namespaceState(entry.session,row.origin)?.areas?.find(r=>r.handle===ref),p=areaVariants(engine,row.origin)[0];if(!r||r.owner!==row.spec.owner||r.target!==row.spec.data.target||r.reflected!==false||r.program!==p.program||r.interval!==p.interval||r.radius!==p.radius||r.follow!==p.follow)throw Error('Public/native area commit mismatch');row.record.data.programId=r.program;}}
function scheduleRuleArea(engine,origin,spec){
 const entry=bridgeEntry(engine),row=entry.entities.get(spec.binding?.ref),impl=entry.session.sealed.implementation(origin.heroId,origin.slot),r=namespaceState(entry.session,origin)?.areas?.find(r=>r.handle===spec.binding?.ref);
 if(!row||!liveRuleArea(engine,row)||Object.keys(spec).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||Object.keys(spec.binding).sort().join(',')!=='kind,mode,ref'||spec.binding.kind!=='entity'||spec.binding.mode!=='area'||spec.delivery!=='pack.entity'||spec.handler!=='areaPulse'||!impl.scheduledBindings?.areaPulse?.some(p=>p.binding==='entity-area'&&p.delivery==='pack.entity')||row.origin.actor!==origin.actor||originKey(row.origin)!==originKey(origin)||spec.owner!==row.spec.owner||spec.target!==row.spec.data.target||spec.abilityId!==row.spec.abilityId||Object.keys(spec.data??{}).sort().join(',')!=='area'||!r||r.n!==spec.data.area||spec.delay!==row.record.data.interval||[...entry.jobs.values()].some(j=>j.request.binding.ref===spec.binding.ref))throw Error('Unsupported/foreign typed area callback');
 const at=(entry.entityLease?.job?.at??engine.t)+bounded(spec.delay,1/60,100),pulse=Math.round((at-row.stamp.createdAt)/spec.delay),birth=entry.areaBirths.get(row.nativeId);if(!birth||pulse!==birth.pulse.issued+1||birth.pulse.issued!==birth.pulse.consumed)throw Error('Invalid area pulse issuance');birth.pulse.issued=pulse;birth.pulse.ordinal=entry.nextJob;allocated(entry,origin,'area-callback');const handle='rule-job:'+entry.generation+':'+(entry.nextJob++)+':'+row.nativeId+':'+r.n+':'+pulse;entry.jobs.set(handle,{handle,origin:{...origin},stamp:{...row.stamp},request:structuredClone(spec),at});return handle;
}
export function dispatchRuleEntityPulse(engine,native,event){
 const entry=bridgeEntry(engine),pair=[...entry.entities].find(([,r])=>r.record===native);if(!pair)return false;const [ref,row]=pair,jobs=[...entry.jobs.values()].filter(j=>j.request.binding.kind==='entity'&&j.request.binding.ref===ref&&j.at<=engine.t+1e-8);
 if(jobs.length!==1||event.radius!==row.spec.radius||typeof event.contact!=='boolean')throw Error('Missing unique native area callback/contact facts');const job=jobs[0],birth=entry.areaBirths.get(row.nativeId),pulse=Number(job.handle.split(':')[5]);if(!birth||pulse!==birth.pulse.consumed+1||pulse!==birth.pulse.issued||pulse!==native.data.pulses||Number(job.handle.split(':')[2])!==birth.pulse.ordinal)throw Error('Repeated/non-native area pulse');birth.pulse.consumed=pulse;entry.jobs.delete(job.handle);entry.entityLease={record:native,ref,job};
 try{entry.session.scheduled(row.origin.heroId,row.origin.slot,job.request.handler,host(engine,row.origin.abilityId,row.origin,{sourceId:native.id}),{...structuredClone(job.request.data),handle:job.handle});}finally{entry.entityLease=null;}return true;
}
export function reconcileRuleAreas(engine){const entry=bridgeEntry(engine);for(const [ref,row]of [...entry.entities]){const n=liveRuleArea(engine,row);if(n){row.clock={x:n.x,tick:n.data.tick,pulses:n.data.pulses,hits:n.data.hits};continue;}dropRuleAreaJobs(entry,ref);entry.entities.delete(ref);entry.session.invoke(row.origin.heroId,row.origin.slot,'onStage',host(engine,row.origin.abilityId,row.origin),{kind:'effect-end',abilityId:row.origin.abilityId,handle:ref});}}
function migratedNativeAreas(engine,g){const session=binding(engine);return (g.packModules?.r20_55?.entities??[]).filter(n=>g.indices.some((id,actor)=>[0,1,2,3].some(slot=>usesPrivateRuleCast(engine,actor,slot)&&session.sealed.hero(id).abilities[slot].id===n.data.abilityId)));}
function validRuleAreasSnapshot(engine,g,saved){
 const session=binding(engine),rows=saved.entities??[],nativeRows=migratedNativeAreas(engine,g),jobs=saved.jobs.filter(j=>j.request.binding.kind==='entity'),seen=new Set(),ids=new Set(),publicRefs=new Set();
 if(saved.version===5&&(!Array.isArray(rows)||rows.length>64||!Number.isSafeInteger(saved.nextEntity)||saved.nextEntity<1)||saved.version===4&&(nativeRows.length||g.heroRules.namespaces.some(n=>n.state?.areas?.length)||jobs.length))return false;
 const close=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-7;
 for(const row of rows){const o=row.origin,s=row.spec,st=row.stamp,c=row.clock;if(Object.keys(row).sort().join(',')!=='aimX,clock,handle,nativeId,origin,record,spec,stamp'||!new RegExp('^rule-entity:'+saved.generation+':[1-9][0-9]*:'+row.nativeId+'$').test(row.handle)||Number(row.handle.split(':')[2])>=saved.nextEntity||seen.has(row.handle)||ids.has(row.nativeId)||!Number.isSafeInteger(row.nativeId)||row.nativeId<1||!Number.isSafeInteger(g.packClock?.seq)||row.nativeId>g.packClock.seq)return false;seen.add(row.handle);ids.add(row.nativeId);
  if(Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!usesPrivateRuleCast(engine,o.actor,o.slot)||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId||Object.keys(s).sort().join(',')!=='abilityId,castId,data,duration,kind,owner,radius,x'||s.owner!==o.actor||s.abilityId!==o.abilityId||s.kind!=='area'||!/^([1-9][0-9]*)$/.test(s.castId)||Number(s.castId)>=row.nativeId||Object.keys(s.data).sort().join(',')!=='follow,interval,target'||s.data.target!==1-s.owner||!Number.isFinite(s.x)||s.x<45||s.x>1155)return false;
  const birth=saved.areaBirths?.find(b=>b.nativeId===row.nativeId);if(!birth||birth.handle!==row.handle||birth.record!==row.record||birth.castId!==Number(s.castId)||birth.createdAt!==st.createdAt||JSON.stringify(birth.origin)!==JSON.stringify(o))return false;const cls=saved.allocations.find(r=>r.namespace===allocationNamespace(session,o));if(!cls||!cls.areas||row.record>cls.lastArea||row.nativeId>cls.entityId||row.nativeId===cls.entityId&&(row.record!==cls.areaBirth.record||Number(s.castId)!==cls.areaBirth.castId||st.createdAt!==cls.areaBirth.createdAt||o.actor!==cls.areaBirth.actor||Number(row.handle.split(':')[2])!==cls.areaBirth.ordinal))return false;const p=areaVariants(engine,o)[0];if(!p||s.radius!==p.radius||s.duration!==p.duration||s.data.interval!==p.interval||s.data.follow!==p.follow||Object.keys(st).sort().join(',')!=='createdAt,generation,ownerLife,round,targetLife'||st.generation!==saved.generation||st.round!==g.round||st.ownerLife!==(g.packCore?.life?.[s.owner]??0)||!Number.isSafeInteger(st.targetLife)||st.targetLife<0||st.targetLife>(g.packCore?.life?.[s.data.target]??0)||!Number.isFinite(st.createdAt)||st.createdAt<0||st.createdAt>g.t)return false;
  const natives=nativeRows.filter(n=>n.id===row.nativeId),r=namespaceState(session,o,g.heroRules)?.areas?.find(r=>r.handle===row.handle);if(natives.length!==1||!r)return false;const n=natives[0],d=n.data;
  if(Object.keys(n).sort().join(',')!=='data,id,kind,life,owner,x,y'||n.kind!=='area'||n.owner!==s.owner||n.y!==0||n.life<=1e-8||!close(n.life,s.duration-(g.t-st.createdAt))||Object.keys(d).sort().join(',')!=='abilityId,breakOnRange,cancelOnLeave,channel,follow,growth,hits,interval,maxHits,programId,pulses,radius,reflected,target,tick'||d.abilityId!==s.abilityId||d.target!==s.data.target||d.programId!==p.program||d.interval!==p.interval||d.radius!==p.radius||d.follow!==p.follow||d.growth!==0||d.maxHits!==0||d.channel!==false||d.breakOnRange!==false||d.cancelOnLeave!==false||d.reflected!==false||!Number.isSafeInteger(d.pulses)||d.pulses<0||!Number.isSafeInteger(d.hits)||d.hits<0||d.hits>d.pulses||d.tick< -1e-8||d.tick>=d.interval-1e-8||!close(g.t-st.createdAt,d.pulses*d.interval+d.tick)||n.x<45||n.x>1155||Object.keys(c).sort().join(',')!=='hits,pulses,tick,x'||c.x!==n.x||c.tick!==d.tick||c.pulses!==d.pulses||c.hits!==d.hits)return false;
  if(r.n!==row.record||r.owner!==s.owner||r.target!==s.data.target||r.reflected!==false||r.kind!=='area'||r.program!==p.program||r.interval!==p.interval||r.radius!==p.radius||r.follow!==p.follow||r.aimX!==row.aimX||!Number.isFinite(row.aimX)||row.aimX<45||row.aimX>1155||(!p.follow&&row.aimX!==s.x)||!close(r.startedAt,st.createdAt)||!close(r.expires-r.startedAt,s.duration))return false;
  const completed=Math.floor((g.t-birth.createdAt+1e-8)/p.interval);if(d.pulses!==completed||birth.pulse.consumed!==completed||birth.pulse.issued!==completed+1)return false;const linked=jobs.filter(j=>j.request.binding.ref===row.handle);if(linked.length!==1)return false;const j=linked[0],q=j.request;if(Number(j.handle.split(':')[5])!==birth.pulse.issued||Number(j.handle.split(':')[2])!==birth.pulse.ordinal||!close(j.at,birth.createdAt+birth.pulse.issued*p.interval))return false;const impl=session.sealed.implementation(o.heroId,o.slot);
  if(Object.keys(j).sort().join(',')!=='at,handle,origin,request,stamp'||JSON.stringify(j.origin)!==JSON.stringify(o)||JSON.stringify(j.stamp)!==JSON.stringify(st)||Object.keys(q).sort().join(',')!=='abilityId,binding,data,delay,delivery,handler,owner,target'||Object.keys(q.binding).sort().join(',')!=='kind,mode,ref'||q.binding.mode!=='area'||q.delivery!=='pack.entity'||q.handler!=='areaPulse'||!impl.scheduledBindings?.areaPulse?.some(p=>p.binding==='entity-area'&&p.delivery==='pack.entity')||q.abilityId!==s.abilityId||q.owner!==s.owner||q.target!==s.data.target||q.delay!==p.interval||Object.keys(q.data).sort().join(',')!=='area'||q.data.area!==r.n||Number(j.handle.split(':')[5])!==Math.round((j.at-r.startedAt)/r.interval)||!close(j.at,g.t+d.interval-d.tick)||j.at<g.t-1e-7)return false;
 }
 for(const ns of g.heroRules.namespaces)for(const r of ns.state?.areas??[]){if(publicRefs.has(r.handle))return false;publicRefs.add(r.handle);const row=rows.find(row=>row.handle===r.handle);if(!row||ns.namespace!==(session.sealed.implementation(row.origin.heroId,row.origin.slot).namespace??('skill:'+row.origin.heroId+':'+row.origin.abilityId)))return false;}
 return publicRefs.size===rows.length&&nativeRows.length===rows.length&&jobs.length===rows.length;
}

function pruneAreaBirths(entry){const latest=new Map();for(const b of entry.areaBirths.values()){const key=b.namespace+':'+b.origin.actor;latest.set(key,Math.max(latest.get(key)??0,b.nativeId));}const active=new Set([...entry.entities.values()].map(r=>r.nativeId));for(const [id,b]of entry.areaBirths)if(!active.has(id)&&latest.get(b.namespace+':'+b.origin.actor)!==id)entry.areaBirths.delete(id);}
function validAreaBirths(session,g){const h=g.heroHost;if(h.version===4)return h.areaBirths===undefined;const rows=h.areaBirths;if(!Array.isArray(rows)||rows.length>128)return false;const ids=new Set(),latest=new Map(),ordinals=new Set();for(const b of rows){if(!b||Object.keys(b).sort().join(',')!=='castId,createdAt,handle,namespace,nativeId,ordinal,origin,pulse,record'||!['castId','nativeId','ordinal','record'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=1)||b.castId>=b.nativeId||b.nativeId>g.packClock.seq||b.ordinal>=h.nextEntity||!Number.isFinite(b.createdAt)||b.createdAt<0||b.createdAt>g.t||ids.has(b.nativeId)||ordinals.has(b.ordinal)||!new RegExp('^rule-entity:'+h.generation+':'+b.ordinal+':'+b.nativeId+'$').test(b.handle))return false;const o=b.origin;if(!o||Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!usesPrivateRuleCastForSnapshot(session,o.heroId,o.slot)||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId||allocationNamespace(session,o)!==b.namespace)return false;const c=h.allocations.find(r=>r.namespace===b.namespace),p=b.pulse;if(!c?.areas||b.record>c.lastArea||b.nativeId>c.entityId||!p||Object.keys(p).sort().join(',')!=='consumed,issued,ordinal'||!['issued','consumed','ordinal'].every(k=>Number.isSafeInteger(p[k])&&p[k]>=0)||p.issued<1||p.issued>c.areaCallbacks||p.issued-p.consumed<0||p.issued-p.consumed>1||p.ordinal<1||p.ordinal>=h.nextJob)return false;ids.add(b.nativeId);ordinals.add(b.ordinal);latest.set(b.namespace+':'+o.actor,Math.max(latest.get(b.namespace+':'+o.actor)??0,b.nativeId));}
for(const c of h.allocations.filter(c=>c.areas)){const births=rows.filter(b=>b.namespace===c.namespace);if(c.entityId!==Math.max(0,...births.map(b=>b.nativeId))||c.lastArea!==Math.max(0,...births.map(b=>b.record)))return false;}for(const b of rows)if(!h.entities.some(r=>r.nativeId===b.nativeId)&&latest.get(b.namespace+':'+b.origin.actor)!==b.nativeId)return false;return true;}

// A stateless scalar contribution at the original native aggregate stage.
// The public projectAttack sees unit amount; the host combines other contributors once.
export function projectRuleStaticPassive(engine,f,abilityId,key){
 const session=binding(engine),heroId=engine.indices[f.i],slot=session.sealed.hero(heroId)?.abilities.findIndex(a=>a.id===abilityId);
 if(!staticPassiveMigrations.has(heroId+':'+slot)||key!=='attackPct'||!session.sealed.implementation(heroId,slot))return undefined;
 if(engine.fighters[f.i]!==f)throw Error('Foreign passive actor');
 if(!readyStaticPassive(session,heroId,slot))throw Error('Unready static passive projection profile');
 const result=session.invoke(heroId,slot,'projectAttack',host(engine,abilityId,{actor:f.i,heroId,slot,abilityId}),{actor:f.i,amount:1,abilityId}).value;
 if(!result||Object.keys(result).join(',')!=='amount')throw Error('Invalid scalar attack projection');
 return bounded(result.amount,0,1e6)-1;
}

function readyStaticPassive(session,heroId,slot){
 const a=session.sealed.hero(heroId).abilities[slot],r=a.recipe,impl=session.sealed.implementation(heroId,slot);
 return a.mvp.passive&&r.target==='passive'&&!r.ops.length&&Object.keys(r.stats??{}).join(',')==='attackPct'&&!r.attack&&!r.aura&&!r.dynamic&&session.has(heroId,slot,'projectAttack')&&impl.requires.every(cap=>['status','cue'].includes(cap));
}
export function validateRuleStaticPassives(engine,actor){
 const session=binding(engine),heroId=engine.indices[actor];
 for(let slot=0;slot<4;slot++)if(staticPassiveMigrations.has(heroId+':'+slot)&&session.sealed.implementation(heroId,slot)&&!readyStaticPassive(session,heroId,slot))return false;
 return true;
}

// Native source aura clocks remain in the pack. Public rules receive only the
// named due stage; these private spans witness enabled time across pauses/deaths.
const passiveAuraMigrations=new Set(['36:2']),MAX_AURA_SPANS=512;
const auraClose=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-7;
function snapshotAuraClock(row){return {...structuredClone(row),spans:row.spans.map(s=>JSON.stringify([s.active,s.dt,s.start,s.end,s.steps,s.firstFrame,s.lastFrame]))};}
function restoreAuraSpans(values){return values.map(value=>{if(typeof value!=='string'||value.length>2048)throw Error('Invalid compact aura span');const a=JSON.parse(value);if(!Array.isArray(a)||a.length!==7||JSON.stringify(a)!==value)throw Error('Invalid compact aura span');const [active,dt,start,end,steps,firstFrame,lastFrame]=a;return {active,dt,start,end,steps,firstFrame,lastFrame};});}
function auraOrigins(engine,session){return engine.indices.flatMap((heroId,actor)=>[0,1,2,3].filter(slot=>passiveAuraMigrations.has(heroId+':'+slot)&&session.sealed.implementation(heroId,slot)).map(slot=>({actor,heroId,slot,abilityId:session.sealed.hero(heroId).abilities[slot].id})));}
function auraReady(engine,o){
 const session=binding(engine),a=session.sealed.hero(o.heroId).abilities[o.slot],r=a.recipe,impl=session.sealed.implementation(o.heroId,o.slot),native=engine.hero(o.actor).abilities[o.slot].recipe?.aura,au=r?.aura;
 const radius=typeof au?.radius==='number'?au.radius:a.mvp.params?.[au?.radius];
 return a.mvp.passive&&r.target==='passive'&&r.ops.length===0&&!r.stats&&!r.attack&&!r.dynamic&&!!au&&au.interval===native?.interval&&Number.isFinite(au.interval)&&au.interval>=1/60&&Math.abs(au.interval*60-Math.round(au.interval*60))<1e-8&&Number.isFinite(radius)&&radius>=0&&radius<=10000&&au.ops.length===1&&au.ops[0].op==='damage'&&Object.keys(au.ops[0]).every(k=>['op','amount','type'].includes(k))&&session.has(o.heroId,o.slot,'onStage')&&impl.requires.every(c=>['cue','status','damage','schedule'].includes(c))&&Object.keys(impl.scheduledBindings??{}).length===0;
}
export function initRulePassiveAuras(engine){
 const sealed=engine.heroRuleRegistry?engine.heroRuleRegistry.seal():defaultRules;
 if(!engine.indices.some(id=>[0,1,2,3].some(slot=>passiveAuraMigrations.has(id+':'+slot)&&sealed.implementation(id,slot))))return;
 const entry=bridgeEntry(engine);entry.auraClocks=new Map();
 for(const o of auraOrigins(engine,entry.session)){const interval=engine.hero(o.actor).abilities[o.slot].recipe.aura.interval;entry.auraClocks.set(o.actor+':'+o.abilityId,{...o,generation:entry.generation,round:engine.round,interval,bornAt:0,phaseSteps:0,activeSteps:0,activeTime:0,pulses:0,lastPulseAt:0,lastPulseFrame:0,lastAt:0,lastFrame:0,eligible:false,spans:[]});}
}
export function observeRulePassiveAura(engine,f,dt,alive){
 const entry=bridgeEntry(engine);if(engine.fighters[f.i]!==f)return;
 for(const row of entry.auraClocks.values())if(row.actor===f.i){
  if(row.lastFrame===engine.frame)return;
  if(!auraClose(engine.t-row.lastAt,dt)||engine.frame<=row.lastFrame)throw Error('Aura phase clock discontinuity');
  let eligible=alive&&engine.passivesEnabled(f)&&auraReady(engine,row)&&Number.isFinite(dt)&&dt>=0&&dt<=.05;
  const last=row.spans.at(-1);if(eligible&&(!last?.active||last.dt!==dt)&&row.spans.length>=MAX_AURA_SPANS)eligible=false;
  if(last?.active===eligible&&(!eligible||last.dt===dt)){last.end=engine.t;last.steps++;last.lastFrame=engine.frame;}else row.spans.push({active:eligible,dt:eligible?dt:null,start:row.lastAt,end:engine.t,steps:1,firstFrame:engine.frame,lastFrame:engine.frame});
  row.phaseSteps++;if(eligible){row.activeSteps++;row.activeTime+=dt;}row.eligible=eligible;row.lastAt=engine.t;row.lastFrame=engine.frame;
 }
}
export function readyRulePassiveAura(engine,f,abilityId){const row=bridgeEntry(engine).auraClocks.get(f.i+':'+abilityId);if(!row)return undefined;return engine.fighters[f.i]===f&&row.lastFrame===engine.frame&&row.eligible;}
export function dispatchRulePassiveAura(engine,f,abilityId){
 const entry=bridgeEntry(engine),row=entry.auraClocks.get(f.i+':'+abilityId);if(!row)return false;
 const due=Math.floor((row.activeTime+1e-8)/row.interval),tick=f.packModules?.r20_55?.data?.aura?.[abilityId];
 // A duplicate, stale or disabled native callback is handled without effects.
 if(engine.fighters[f.i]!==f||row.lastFrame!==engine.frame||!row.eligible||due===row.pulses)return true;
 if(due!==row.pulses+1||!auraClose(tick,row.activeTime-due*row.interval))throw Error('Invalid native aura due stage');
 row.pulses++;row.lastPulseAt=engine.t;row.lastPulseFrame=engine.frame;
 entry.session.invoke(row.heroId,row.slot,'onStage',host(engine,abilityId,row),{kind:'passive-pulse',owner:f.i,abilityId});return true;
}
function auraCoreView(g){
 if(g.heroHost?.version!==6)return g;
 const {auraClocks,baseVersion,...h}=g.heroHost,{auraClocks:clockRows,baseVersion:clockVersion,...w}=g.packClock.heroEpoch;
 return {...g,heroHost:{...h,version:baseVersion},packClock:{...g.packClock,heroEpoch:{...w,version:clockVersion}}};
}
function validAuraWitness(engine,g){try{
 const expected=auraOrigins(engine,binding(engine)),h=g.heroHost,w=g.packClock?.heroEpoch;
 if(!expected.length)return h?.version!==6&&w?.version!==3&&!h?.auraClocks&&!w?.auraClocks;
 if(!Number.isSafeInteger(g.frame)||g.frame<0||h?.version!==6||![4,5].includes(h.baseVersion)||w?.version!==3||w.baseVersion!==h.baseVersion-3||!Array.isArray(h.auraClocks)||h.auraClocks.length!==expected.length||JSON.stringify(h.auraClocks)!==JSON.stringify(w.auraClocks))return false;
 const seen=new Set();for(const row of h.auraClocks){
  if(Object.keys(row).sort().join(',')!=='abilityId,activeSteps,activeTime,actor,bornAt,eligible,generation,heroId,interval,lastAt,lastFrame,lastPulseAt,lastPulseFrame,phaseSteps,pulses,round,slot,spans'||!expected.some(o=>o.actor===row.actor&&o.heroId===row.heroId&&o.slot===row.slot&&o.abilityId===row.abilityId)||seen.has(row.actor)||row.generation!==h.generation||row.round!==g.round||row.bornAt!==0||row.interval!==engine.hero(row.actor).abilities[row.slot].recipe.aura.interval||typeof row.eligible!=='boolean'||!Array.isArray(row.spans)||row.spans.length>MAX_AURA_SPANS+1||!['phaseSteps','activeSteps','pulses','lastFrame','lastPulseFrame'].every(k=>Number.isSafeInteger(row[k])&&row[k]>=0)||row.lastFrame>g.frame||!auraClose(row.lastAt,g.t))return false;seen.add(row.actor);
  let end=0,frame=0,steps=0,active=0,activeTime=0,lastPulseAt=0,lastPulseFirst=0,lastPulseLast=0,previous;
  const period=row.interval;
  for(const span of restoreAuraSpans(row.spans)){
   if(Object.keys(span).sort().join(',')!=='active,dt,end,firstFrame,lastFrame,start,steps'||typeof span.active!=='boolean'||(previous?.active===span.active&&(!span.active||previous.dt===span.dt))||!auraClose(span.start,end)||!Number.isFinite(span.end)||span.end<span.start||span.end>g.t+1e-7||!Number.isSafeInteger(span.steps)||span.steps<1||!Number.isSafeInteger(span.firstFrame)||span.firstFrame<=frame||!Number.isSafeInteger(span.lastFrame)||span.lastFrame<span.firstFrame||span.lastFrame>g.frame||span.lastFrame-span.firstFrame+1<span.steps||span.end-span.start>span.steps*.05+1e-7)return false;
   if(span.active){if(!Number.isFinite(span.dt)||span.dt<0||span.dt>.05||!auraClose(span.end-span.start,span.steps*span.dt))return false;const after=activeTime+span.steps*span.dt;if(Math.floor((after+1e-8)/period)>Math.floor((activeTime+1e-8)/period)){const boundary=Math.floor((after+1e-8)/period)*period-activeTime;lastPulseAt=span.start+Math.ceil((boundary-1e-8)/span.dt)*span.dt;lastPulseFirst=span.firstFrame;lastPulseLast=span.lastFrame;}active+=span.steps;activeTime=after;}else if(span.dt!==null)return false;
   end=span.end;frame=span.lastFrame;steps+=span.steps;previous=span;
  }
  if(!auraClose(end,g.t)||steps!==row.phaseSteps||active!==row.activeSteps||frame!==row.lastFrame||row.eligible!==(previous?.active??false)||row.spans.length===MAX_AURA_SPANS+1&&restoreAuraSpans(row.spans).at(-1).active||!auraClose(row.activeTime,activeTime)||row.pulses!==Math.floor((activeTime+1e-8)/period)||!auraClose(row.lastPulseAt,lastPulseAt)||row.pulses===0&&row.lastPulseFrame!==0||row.pulses>0&&(row.lastPulseFrame<lastPulseFirst||row.lastPulseFrame>lastPulseLast))return false;
  const native=g.fighters[row.actor]?.packModules?.r20_55?.data?.aura;if(!native||(active===0?Object.hasOwn(native,row.abilityId):!auraClose(native[row.abilityId],activeTime-row.pulses*period)))return false;
 }
 return true;
}catch{return false;}}
