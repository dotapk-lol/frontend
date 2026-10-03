import {createHeroRegistry,createRuleSession} from './heros-rules.js';
import {services as aStatusStore} from './hero-packs/r20_55/combat.js';
import {packStatusEffective} from './pack-services.js';
const defaultRules=createHeroRegistry().seal(),sessions=new WeakMap();
export const HERO_RULES_HASH=defaultRules.rulesHash;
function binding(engine){
 let entry=sessions.get(engine);
 if(!entry){entry={fighters:engine.fighters,handles:new Map(),nextHandle:1,session:createRuleSession(engine.heroRuleRegistry?engine.heroRuleRegistry.seal():defaultRules)};sessions.set(engine,entry);}
 if(entry.fighters!==engine.fighters){entry.fighters=engine.fighters;entry.handles=new Map();entry.nextHandle=1;entry.session=createRuleSession(entry.session.sealed);}
 return entry.session;
}
const bridgeEntry=engine=>{binding(engine);return sessions.get(engine);};
// Executable migration allowlist, not a roster unlock. Other registered drafts retain native dispatch.
const activeMigrations=new Set(['28:1','32:0','32:3','36:0','42:0','50:2','55:0','55:3']);
export function usesPrivateRuleCast(engine,actor,slot){return activeMigrations.has(engine.indices[actor]+':'+slot)&&binding(engine).has(engine.indices[actor],slot);}
const overlay=(a,b)=>b&&typeof b==='object'&&!Array.isArray(b)?Object.fromEntries(Object.entries({...a,...b}).map(([k,v])=>[k,k in b?overlay(a?.[k],v):v])):b;
export function moduleAbility(engine,actorId,slot,original){const session=binding(engine),heroId=engine.indices[actorId];if(!session.sealed.implementation(heroId,slot)||engine.hero(actorId).packKey&&!usesPrivateRuleCast(engine,actorId,slot)&&!(heroId===31&&slot===2&&session.has(heroId,slot,'onAttack')))return original;return {...original,mvp:overlay(original.mvp,session.sealed.hero(heroId).abilities[slot].mvp)};}
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
   heal(spec){identity(spec);actor(spec.source);const target=actor(spec.target),receipt={actual:0,deferred:0};engine.heal(target,bounded(spec.amount,0,1e7),{skill:abilityId},receipt);return receipt;},
   cue(event){identity(event);if(aProfile&&event.kind==='cast')return;const f=actor(event.actor),color=engine.hero(f.i).color;if(event.kind==='blink')engine.fx('dash',f.x,f.y+80,color);else if(event.kind==='targeted-hit'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,color,{tx:t.x,ty:t.y+100});}else if(event.kind==='passive'&&abilityId==='slardar_bash'){const t=actor(event.target);engine.fx('text',t.x,t.y+170,'#cea4ff',{text:'深海重击'});engine.log('passive',f.i,{skill:abilityId});}else if(event.kind==='reflect'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,'#95dcff',{tx:t.x,ty:t.y+100});engine.fx('text',f.x,f.y+180,'#bbf0ff',{text:'法术反制'});engine.log('reflect',f.i,{skill:abilityId});}else throw Error('Unknown semantic cue');}
  }
 };
}
export function activateHeroRule(engine,f,cast){
 const session=binding(engine),heroId=engine.indices[f.i],abilityId=engine.ability(f.i,cast.slot).id;
 if(!session.has(heroId,cast.slot)||engine.hero(f.i).packKey&&!usesPrivateRuleCast(engine,f.i,cast.slot))return {handled:false};
 const result=session.invoke(heroId,cast.slot,'activate',host(engine,abilityId,{actor:f.i,heroId,slot:cast.slot,abilityId}),{owner:f.i,target:1-f.i,abilityId,slot:cast.slot,castId:String(cast.id),direction:cast.dir??f.dir,aimX:cast.aim,heldSeconds:cast.charge??0,reflected:!!cast.reflected});
 return {handled:result.handled,reflected:result.value?.reflected===true};
}
export function rulesSnapshot(engine){return binding(engine).snapshot();}
export function restoreRulesSnapshot(engine,value){binding(engine).restore(value);}
export function validRulesSnapshot(engine,value,fighters){const session=binding(engine);if(!session.validateSnapshot(value))return false;if(fighters)for(const f of fighters){const heroId=engine.indices[f.i];if(heroId===31&&session.has(heroId,2,'onAttack')){const ns='skill:31:'+session.sealed.hero(heroId).abilities[2].id,state=value.namespaces.find(row=>row.namespace===ns)?.state;if((state?.counts?.[f.i]??0)!==f.pack?.bashCount)return false;}}return true;}

export function validHeroRuleResources(engine,fighters){const resources=binding(engine).sealed.resources;if(!Array.isArray(fighters)||fighters.length!==2)return false;return fighters.every((f,i)=>f?.i===i&&Number.isFinite(f.maxMp)&&f.maxMp>0&&f.maxMp<=(resources.maxMpByHero[engine.indices[i]]??engine.hero(i).combatMana??engine.hero(i).mana??1200)&&Number.isFinite(f.mp)&&f.mp>=0&&f.mp<=f.maxMp);}
export function validateHeroRuleFacts(engine,actorId,slot){const session=binding(engine),heroId=engine.indices[actorId];if(!session.has(heroId,slot,'activate')&&!session.has(heroId,slot,'planCast'))return true;if(engine.hero(actorId).packKey&&!usesPrivateRuleCast(engine,actorId,slot))return true;return session.validateFacts(host(engine,session.sealed.hero(heroId).abilities[slot].id));}

// Detached definitions compile a closed status vocabulary. No private hero operation is called here.
function statusVariants(engine,origin){
 const ability=binding(engine).sealed.hero(origin.heroId).abilities[origin.slot],params=ability.mvp.params??{},out=[];
 const value=x=>{if(typeof x==='number'||typeof x==='boolean')return x;if(typeof x==='string'&&Number.isFinite(params[x]))return params[x];if(x&&typeof x==='object'){if(x.div)return value(x.div[0])/value(x.div[1]);if(x.mul)return x.mul.reduce((n,v)=>n*value(v),1);if(x.add)return x.add.reduce((n,v)=>n+value(v),0);}throw Error('Unsupported batch status expression');};
 const visit=node=>{if(!node||typeof node!=='object')return;if(Array.isArray(node)){node.forEach(visit);return;}if(node.op==='status'){if(node.tick)throw Error('Periodic status is not in batch1');out.push({key:node.key??ability.id,duration:value(node.duration),polarity:node.to==='self'?'positive':'negative',dispel:node.dispel??'basic',pierces:!!node.pierces,values:Object.fromEntries(Object.entries(node.values??{}).map(([k,v])=>[k,value(v)]))});}Object.values(node).forEach(visit);};visit(ability.recipe);return out;
}
const same=(a,b)=>JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort());
const originKey=o=>o.heroId+':'+o.slot;
function liveRecord(engine,row){return engine.fighters[row.spec.target].packModules?.r20_55?.statuses.find(s=>s===row.record&&s.life>1e-8);}
function applyRuleStatus(engine,origin,spec){
 const variants=statusVariants(engine,origin);
 if(Object.keys(spec).sort().join(',')!=='abilityId,dispel,duration,key,owner,pierces,polarity,target,values'||![0,1].includes(spec.owner)||![0,1].includes(spec.target)||!variants.some(v=>v.key===spec.key&&v.duration===spec.duration&&v.polarity===spec.polarity&&v.dispel===spec.dispel&&v.pierces===spec.pierces&&same(v.values,spec.values)))throw Error('Status request differs from sealed source schema');
 const entry=bridgeEntry(engine),f=engine.fighters[spec.target],options={key:spec.key,owner:spec.owner,duration:spec.duration,values:spec.values,dispel:spec.dispel,pierces:spec.pierces,interval:0};
 const record=spec.polarity==='positive'?aStatusStore.applyPositiveStatus(engine,f,options):aStatusStore.applyStatus(engine,f,options);
 if(!record)return null;Object.assign(record,{abilityId:spec.abilityId,reflected:spec.owner!==origin.actor,programId:null});
 // Admission rejection above leaves the prior handle/record untouched. Successful recast invalidates it.
 for(const [handle,row]of entry.handles)if(row.spec.target===spec.target&&row.spec.key===spec.key)entry.handles.delete(handle);
 const handle='rule-status:'+entry.nextHandle++;entry.handles.set(handle,{origin:{...origin},spec:structuredClone(spec),record});return handle;
}
function queryRuleStatus(engine,origin,target,key){
 if(!origin)return [];const entry=bridgeEntry(engine),rows=[];
 for(const [handle,row]of entry.handles){if(originKey(row.origin)!==originKey(origin)||row.spec.target!==target||key!==undefined&&row.spec.key!==key)continue;const record=liveRecord(engine,row);if(record)rows.push({...structuredClone(row.spec),handle,remaining:record.life,remainingSeconds:record.life,elapsed:record.elapsed,effective:packStatusEffective(engine,engine.fighters[target],record),intervalSeconds:record.interval});}return rows;
}
function removeRuleStatus(engine,origin,handle){
 const entry=bridgeEntry(engine),row=entry.handles.get(handle);if(!row)return false;if(!origin||originKey(row.origin)!==originKey(origin))throw Error('Cross-origin status removal');
 const record=liveRecord(engine,row);entry.handles.delete(handle);if(!record)return false;const state=engine.fighters[row.spec.target].packModules.r20_55;state.statuses=state.statuses.filter(s=>s!==record);return true;
}
export function reconcileRuleStatuses(engine){
 const entry=bridgeEntry(engine);for(const [handle,row]of [...entry.handles])if(!liveRecord(engine,row)){entry.handles.delete(handle);entry.session.invoke(row.origin.heroId,row.origin.slot,'onStage',host(engine,row.spec.abilityId,row.origin),{kind:'status-removed',abilityId:row.spec.abilityId,handle});}
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
 const supported=new Set(['damage','heal','status','target-route','cue']);if(session.sealed.implementation(heroId,slot).requires.some(cap=>!supported.has(cap)))return false;
 statusVariants(engine,origin);
 engine.commitAction(f);f.mp-=plan.manaCost;f.cd[slot]=plan.cooldownSeconds;if(plan.chargeCost){f.charges[slot]-=plan.chargeCost;if(f.chargeTimers[slot]<=0)f.chargeTimers[slot]=m.charge_restore_s;}f.casts++;f.guard=false;
 const x=targetProfile==='self'?f.x:Math.max(Math.max(45,f.x-m.range_wu),Math.min(Math.min(1155,f.x+m.range_wu),aim)),cast={id:++engine.seq,slot,abilityId:a.id,remaining:plan.windupSeconds,aim:x};
 if(targetProfile==='enemy')engine.notifyTargeted(f,t,a.id);if(cast.remaining>0)f.cast=cast;else engine.activate(f,cast);engine.animate(f,'cast',.35);engine.log('cast',i,{skill:a.id,slot,cost:plan.manaCost});return true;
}
export function ruleHostSnapshot(engine){
 const entry=bridgeEntry(engine);if(!entry.handles.size&&entry.nextHandle===1)return null;
 return {version:1,rulesHash:entry.session.sealed.rulesHash,nextHandle:entry.nextHandle,statuses:[...entry.handles].map(([handle,row])=>({handle,origin:row.origin,spec:row.spec}))};
}
export function validRuleHostSnapshot(engine,g){
 const saved=g.heroHost,session=binding(engine),nativeRefs=g.fighters.flatMap(f=>(f.packModules?.r20_55?.statuses??[]).filter(s=>g.indices.some(id=>[0,1,2,3].some(slot=>activeMigrations.has(id+':'+slot)&&session.has(id,slot)&&s.abilityId===session.sealed.hero(id).abilities[slot].id))).map(s=>({target:f.i,status:s})));if(saved===undefined||saved===null)return nativeRefs.length===0&&!g.heroRules.namespaces.some(row=>row.state?.records?.length);
 try{if(Object.keys(saved).sort().join(',')!=='nextHandle,rulesHash,statuses,version'||saved.version!==1||saved.rulesHash!==session.sealed.rulesHash||!Number.isSafeInteger(saved.nextHandle)||saved.nextHandle<1||!Array.isArray(saved.statuses)||saved.statuses.length>128)return false;
 const seen=new Set();for(const row of saved.statuses){if(Object.keys(row).sort().join(',')!=='handle,origin,spec'||typeof row.handle!=='string'||!/^rule-status:[1-9][0-9]*$/.test(row.handle)||Number(row.handle.split(':')[1])>=saved.nextHandle||seen.has(row.handle))return false;seen.add(row.handle);const o=row.origin,s=row.spec;
 if(Object.keys(o).sort().join(',')!=='abilityId,actor,heroId,slot'||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||!activeMigrations.has(originKey(o))||session.sealed.hero(o.heroId).abilities[o.slot].id!==o.abilityId||s.abilityId!==o.abilityId||![0,1].includes(s.target)||![0,1].includes(s.owner))return false;
 if(!statusVariants(engine,o).some(v=>v.key===s.key&&v.duration===s.duration&&v.polarity===s.polarity&&v.dispel===s.dispel&&v.pierces===s.pierces&&same(v.values,s.values)))return false;
 const native=g.fighters[s.target].packModules?.r20_55?.statuses.filter(x=>x.key===s.key&&x.owner===s.owner&&x.abilityId===s.abilityId);if(native?.length!==1||!same(native[0].values,s.values)||native[0].duration!==s.duration||native[0].life<=1e-8)return false;const n=native[0];if(Object.keys(n).sort().join(',')!=='abilityId,allowInvulnerable,dispel,duration,elapsed,group,hostile,interval,key,life,owner,pierces,polarity,programId,reflected,tick,values'||n.pierces!==s.pierces||n.dispel!==s.dispel||n.hostile!==(s.polarity==='negative')||n.polarity!==(s.polarity==='negative'?'hostile':'positive')||n.group!==null||n.allowInvulnerable!==false||n.interval!==0||n.programId!==null||n.reflected!==(s.owner!==o.actor))return false;
 }
 // Both public references and native referents must match; handles are never trusted by string alone.
 for(const n of nativeRefs)if(!saved.statuses.some(row=>row.spec.target===n.target&&row.spec.key===n.status.key&&row.spec.owner===n.status.owner))return false;
 const refs=g.heroRules.namespaces.flatMap(row=>row.state?.records??[]);for(const r of refs){const row=saved.statuses.find(x=>x.handle===r.handle);if(!row||row.spec.owner!==r.owner||row.spec.target!==r.target||row.spec.key!==r.key||row.spec.duration!==r.expires-r.startedAt&&Math.abs(row.spec.duration-(r.expires-r.startedAt))>1e-8||!same(row.spec.values,r.values))return false;}for(const row of saved.statuses)if(!refs.some(r=>r.handle===row.handle))return false;return true;
 }catch{return false;}
}
export function restoreRuleHostSnapshot(engine,value){const entry=bridgeEntry(engine);entry.handles=new Map();entry.nextHandle=value?.nextHandle??1;for(const row of value?.statuses??[]){const record=engine.fighters[row.spec.target].packModules.r20_55.statuses.find(s=>s.key===row.spec.key&&s.abilityId===row.spec.abilityId&&s.owner===row.spec.owner);entry.handles.set(row.handle,{origin:row.origin,spec:row.spec,record});}}

export function invokeHeroHook(engine,actor,slot,hook,event){const session=binding(engine),heroId=engine.indices[actor],abilityId=session.sealed.hero(heroId)?.abilities[slot]?.id;if(!abilityId)return {handled:false};return session.invoke(heroId,slot,hook,host(engine,abilityId,{actor,heroId,slot,abilityId}),{...event,abilityId});}

// Source-declared migrated status schemas supersede frozen private coefficient maps for restore only.
// The generic store checks all clocks/fields; every unmigrated record is still checked by its native family.
export function validRulePackSnapshot(engine,g){
 if(!g.heroHost?.statuses?.length)return engine.packCombat.validateSnapshot(engine,g);
 if(!validRuleHostSnapshot(engine,g)||!aStatusStore.validateSnapshot(g))return false;
 const view={...g,fighters:g.fighters.map(f=>({...f,packModules:{...f.packModules,r20_55:{...f.packModules.r20_55,statuses:f.packModules.r20_55.statuses.filter(s=>!g.heroHost.statuses.some(row=>row.spec.target===f.i&&row.spec.key===s.key&&row.spec.owner===s.owner&&row.spec.abilityId===s.abilityId))}}}))};
 return engine.packCombat.validateSnapshot(engine,view);
}
