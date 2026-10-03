import {arenaArmorFactor,PACK_CAPABILITIES} from './pack-services.js';
// Integrator adapter: Engine routes active registered systems through this dispatcher.
// Preserve the core4 hook ABI while enforcing ownership, deterministic ordering and no fallback.
export function createPackDispatcher(packs){
 const owners=new Map(),systems=new Map(),byObject=new Map();
 for(const pack of packs){
  const h=pack?.definition,system=pack?.sharedSystem,key=pack?.systemId||h?.packKey;
  if(!h||typeof h.id!=='string'||!Number.isInteger(h.registryNumericId)||!Array.isArray(h.abilities)||h.abilities.length!==4||typeof key!=='string'||!key||!system)throw Error('Invalid hero pack contract');
  if(owners.has(h.id)||[...owners.values()].some(p=>p.definition.registryNumericId===h.registryNumericId))throw Error('Duplicate hero pack identity');
  if(systems.has(key)&&systems.get(key)!==system||byObject.has(system)&&byObject.get(system)!==key)throw Error('Ambiguous shared system identity');
  if(typeof system.cast!=='function'||typeof system.activate!=='function')throw Error('Owned ability system requires cast and activate');
  if(pack.contract?.selectedAbilityIds&&JSON.stringify(pack.contract.selectedAbilityIds)!==JSON.stringify(h.abilities.map(a=>a.valveAbilityId)))throw Error('Selected four slots do not match contract');
  if(pack.contract?.realEngineImplemented===false||pack.contract?.state==='disabled_reserved_capabilities'||pack.contract?.adapterStatus==='not_ported_capability_locked')throw Error('Missing public pack capability or unaccepted hero implementation');
  if(pack.contract?.requiresCapabilities?.some(name=>!PACK_CAPABILITIES.includes(name)))throw Error('Missing public pack capability');owners.set(h.id,{...pack,systemId:key});systems.set(key,system);byObject.set(system,key);
 }
 const activeCache=new WeakMap();
 const active=e=>{const cached=activeCache.get(e);if(cached?.heroes===e.runtimeHeroes)return cached.systems;const keys=new Set();for(const h of e.runtimeHeroes){const p=owners.get(h.id);if(p)keys.add(p.systemId);else if(h.packKey)throw Error('Selected pack is not registered: '+h.id);}const ordered=[...keys].sort().map(key=>systems.get(key));activeCache.set(e,{heroes:e.runtimeHeroes,systems:ordered});return ordered;};
 const owned=(e,f)=>owners.get(e.hero(f.i).id)?.sharedSystem;
 const notify=(e,hook,...args)=>{for(const system of active(e))system[hook]?.(e,...args);};
 const scalar=(e,hook,args,value)=>{for(const system of active(e)){if(!system[hook])continue;value=system[hook](e,...args,value);if(!Number.isFinite(value))throw Error('Invalid numeric result from '+hook);}return value;};
 const dispatcher={
  validateSnapshot(e,g){const registered=active(e),names=registered.map(s=>s.namespace).filter(Boolean);if(Object.keys(g.packModules||{}).some(key=>!names.includes(key)))return false;return registered.every(s=>!s.validateSnapshot||s.validateSnapshot(e,g));},
  beforeDamage(e,event){notify(e,'modifyDamage',event);if(event.m?.damage_type==='physical'&&event.sharedArmor&&!active(e).some(s=>s.usesSharedArmor))event.damage*=arenaArmorFactor(event.sharedArmor);notify(e,'beforeDamage',event);},
  init(e){e.packState=null;for(const system of active(e))system.init?.(e);},
  cast(e,f,slot,options={}){const system=owned(e,f);if(!system){if(e.hero(f.i).packKey)throw Error('Unregistered owned cast');return undefined;}const result=system.cast(e,f,slot,options);if(typeof result!=='boolean')throw Error('Owned cast must explicitly accept or reject; fallback is forbidden');return result;},
  activate(e,f,cast){const system=owned(e,f);if(!system){if(e.hero(f.i).packKey)throw Error('Unregistered owned effect');return false;}if(system.activate(e,f,cast)!==true)throw Error('Owned effect is not implemented; fallback is forbidden');return true;},
  attack(e,f,t,damage,m){for(const system of active(e)){if(!system.attack)continue;damage=system.attack(e,f,t,damage,m);if(!Number.isFinite(damage))throw Error('Invalid numeric result from attack');}return damage;},
  attackInterval(e,f,t,base){const n=scalar(e,'attackInterval',[f,t],base);if(n<=0)throw Error('Invalid attack interval');return n;},
  healing(e,f,amount){return scalar(e,'healing',[f],amount);},
  moveMultiplier(e,f){let n=1;for(const system of active(e)){if(!system.moveMultiplier)continue;const value=system.moveMultiplier(e,f);if(!Number.isFinite(value)||value<0)throw Error('Invalid movement multiplier');n*=value;}if(!Number.isFinite(n))throw Error('Movement multiplier overflow');return n;},
  movingAttack(e,f){return active(e).some(system=>system.movingAttack?.(e,f)===true);},
  silenced(e,f){return active(e).some(system=>system.silenced?.(e,f)===true);},
  disarmed(e,f){return active(e).some(system=>system.disarmed?.(e,f)===true);},
  broken(e,f){return active(e).some(system=>system.broken?.(f)===true);},
  dispelDescriptors(e,f){return active(e).flatMap(system=>system.dispelDescriptors?.(e,f)||[]);},
 };
 for(const hook of ['targeted','afterDamage','afterAttack','dispel','tick','endStep','interrupted','death','hpSettled','actionChanged','controlEnded','statusesDispelled'])dispatcher[hook]=(e,...args)=>notify(e,hook,...args);
 return Object.freeze(dispatcher);
}
