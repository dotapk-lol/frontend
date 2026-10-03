import {createHeroRegistry,createRuleSession} from './heros-rules.js';
const defaultRules=createHeroRegistry().seal(),sessions=new WeakMap();
export const HERO_RULES_HASH=defaultRules.rulesHash;
function binding(engine){
 let entry=sessions.get(engine);
 if(!entry){entry={fighters:engine.fighters,session:createRuleSession(engine.heroRuleRegistry?engine.heroRuleRegistry.seal():defaultRules)};sessions.set(engine,entry);}
 if(entry.fighters!==engine.fighters){entry.fighters=engine.fighters;entry.session=createRuleSession(entry.session.sealed);}
 return entry.session;
}
const overlay=(a,b)=>b&&typeof b==='object'&&!Array.isArray(b)?Object.fromEntries(Object.entries({...a,...b}).map(([k,v])=>[k,k in b?overlay(a?.[k],v):v])):b;
export function moduleAbility(engine,actorId,slot,original){const session=binding(engine),heroId=engine.indices[actorId];if(!session.has(heroId,slot))return original;return {...original,mvp:overlay(original.mvp,session.sealed.hero(heroId).abilities[slot].mvp)};}
const bounded=(v,min,max)=>{if(!Number.isFinite(v)||v<min||v>max)throw Error('Invalid effect amount/duration');return v;};
function host(engine,abilityId){
 const actor=id=>{if((id!==0&&id!==1)||engine.fighters[id]?.i!==id)throw Error('Invalid effect actor');return engine.fighters[id];};
 const identity=spec=>{if(spec.abilityId!==abilityId)throw Error('Cross-ability effect');};
 return {
  now:()=>engine.t,random:()=>engine.random(),
  actor:id=>{const f=actor(id);return {id,heroId:engine.indices[id],hp:f.hp,maxHp:f.maxHp,mp:f.mp,maxMp:f.maxMp,x:f.x,y:f.y,dir:f.dir,alive:f.hp>0,invulnerable:f.invuln>0,debuffImmune:!!engine.property(f,'debuffImmune'),passivesEnabled:engine.passivesEnabled(f),guarding:!!f.guard,rooted:engine.controlRemaining(f,'root')>0,silenced:engine.isSilenced(f)};},
  ports:{
   target:{route(spec){identity(spec);actor(spec.owner);const t=actor(spec.target),counter=engine.buff(t,'counter'),reflected=!!(spec.reflectable&&!spec.reflected&&counter&&!counter.m.counter_type);return {accepted:true,reason:null,owner:reflected?spec.target:spec.owner,target:reflected?spec.owner:spec.target,originalOwner:spec.owner,reflected,noReflect:reflected,noLifesteal:reflected};}},
   damage(spec){
    identity(spec);if(!['physical','magical','pure'].includes(spec.type))throw Error('Invalid damage type');const source=actor(spec.source),target=actor(spec.target),amount=bounded(spec.amount,0,1e7);
    const m={damage_type:spec.type,blockable:spec.blockable??true,stun_s:bounded(spec.stunSeconds??0,0,60),hitstun_s:bounded(spec.hitstunSeconds??0,0,60)},info={skill:abilityId,basic:!!spec.basic,dot:!!spec.dot,passive:!!spec.passive,reflected:!!spec.reflected,noReflect:!!spec.noReflect,noLifesteal:!!spec.noLifesteal,attackId:spec.attackId??null};
    const receipt=engine.resolveDamage(source,target,amount,m,info);
    return {accepted:receipt.accepted,landed:receipt.landed,guarded:receipt.guard,raw:receipt.rawDamage,actual:receipt.actual,deferred:receipt.deferred??0,killedAtDebit:receipt.killedAtDebit};
   },
   control:{apply(spec){identity(spec);actor(spec.owner);const target=actor(spec.target);if(!['stun','root','hex','fear','taunt'].includes(spec.type))throw Error('Invalid control kind');const duration=engine.control(target,spec.type,bounded(spec.duration,0,60),!!spec.pierces);return duration?{handle:'legacy-control:'+target.i+':'+spec.type,duration}:null;}},
   motion(spec){identity(spec);if(spec.kind!=='blink')throw Error('Unimplemented motion request');const f=actor(spec.actor);bounded(spec.destinationX,-10000,10000);engine.move(f,spec.destinationX-f.x);return 'legacy-blink:'+spec.castId;},
   protect(spec){identity(spec);if(spec.kind!=='invulnerability')throw Error('Unimplemented protection');const f=actor(spec.actor);f.invuln=bounded(spec.duration,0,60);return 'legacy-protect:'+engine.frame+':'+f.i;},
   cue(event){identity(event);const f=actor(event.actor),color=engine.hero(f.i).color;if(event.kind==='blink')engine.fx('dash',f.x,f.y+80,color);else if(event.kind==='targeted-hit'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,color,{tx:t.x,ty:t.y+100});}else if(event.kind==='reflect'){const t=actor(event.target);engine.fx('beam',f.x,f.y+100,'#95dcff',{tx:t.x,ty:t.y+100});engine.fx('text',f.x,f.y+180,'#bbf0ff',{text:'法术反制'});engine.log('reflect',f.i,{skill:abilityId});}else throw Error('Unknown semantic cue');}
  }
 };
}
export function activateHeroRule(engine,f,cast){
 const session=binding(engine),heroId=engine.indices[f.i],abilityId=engine.ability(f.i,cast.slot).id;
 if(!session.has(heroId,cast.slot))return {handled:false};
 const result=session.invoke(heroId,cast.slot,'activate',host(engine,abilityId),{owner:f.i,target:1-f.i,abilityId,slot:cast.slot,castId:String(cast.id),direction:cast.dir,aimX:cast.aim,heldSeconds:cast.charge,reflected:!!cast.reflected});
 return {handled:result.handled,reflected:result.value?.reflected===true};
}
export function rulesSnapshot(engine){return binding(engine).snapshot();}
export function restoreRulesSnapshot(engine,value){binding(engine).restore(value);}
export function validRulesSnapshot(engine,value){return binding(engine).validateSnapshot(value);}

export function validHeroRuleResources(engine,fighters){const resources=binding(engine).sealed.resources;if(!Array.isArray(fighters)||fighters.length!==2)return false;return fighters.every((f,i)=>f?.i===i&&Number.isFinite(f.maxMp)&&f.maxMp>0&&f.maxMp<=(resources.maxMpByHero[engine.indices[i]]??engine.hero(i).combatMana??engine.hero(i).mana??1200)&&Number.isFinite(f.mp)&&f.mp>=0&&f.mp<=f.maxMp);}
export function validateHeroRuleFacts(engine,actorId,slot){const session=binding(engine),heroId=engine.indices[actorId];if(!session.has(heroId,slot,'activate')&&!session.has(heroId,slot,'planCast'))return true;return session.validateFacts(host(engine,session.sealed.hero(heroId).abilities[slot].id));}
