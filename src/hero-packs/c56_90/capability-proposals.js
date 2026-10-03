// Pure proposal kernels ONLY; never imported by the executable adapter.
// Integrator must provide atomic, cross-system commits before advertising the capability.
export function planPolarizedDispel(records,{targetId,tier='basic',hostile=true}){
 if(!['basic','strong'].includes(tier)||typeof hostile!=='boolean')throw Error('Invalid dispel request');
 const removals=[];
 for(const r of records){if(r.targetId!==targetId)continue;if(typeof r.hostile!=='boolean'||!['basic','strong','none'].includes(r.dispel)||typeof r.namespace!=='string'||typeof r.key!=='string')throw Error('Untyped legacy record requires adapter');if(r.hostile===hostile&&(r.dispel==='basic'||tier==='strong'&&r.dispel==='strong'))removals.push({namespace:r.namespace,key:r.key,targetId});}
 return removals;
}
export function projectTypedStatus(s,{debuffImmune=false,invulnerable=false}={}){
 if(typeof s.hostile!=='boolean'||typeof s.pierces!=='boolean'||!Number.isFinite(s.life))throw Error('Invalid typed status');
 return {properties:s.life>0&&(!s.hostile||s.pierces||!debuffImmune),damage:s.life>0&&!invulnerable&&(!s.hostile||s.pierces||!debuffImmune)};
}
export function resolveOwnedControl(sources,{removeSourceId}){return sources.filter(s=>s.sourceId!==removeSourceId).map(s=>({...s}));}
