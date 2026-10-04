// PRIVATE instantaneous motion transport; the source rule owns destination semantics.
export const B_MOTION_SLOTS=new Set(['57:0']);
const closed=(x,keys)=>x&&typeof x==='object'&&!Array.isArray(x)&&keys.every(k=>Object.hasOwn(x,k))&&Object.keys(x).every(k=>keys.includes(k));
export function bMotionPort(e,o,{write,birthLease,once}){
 return spec=>{write();if(!B_MOTION_SLOTS.has(o.heroId+':'+o.slot)||!birthLease||birthLease.actor!==o.actor||!closed(spec,['actor','abilityId','castId','kind','destinationX','speed','duration'])||spec.abilityId!==o.abilityId||spec.castId!==birthLease.castId||!(spec.actor===0||spec.actor===1)||spec.kind!=='dash'||!Number.isFinite(spec.destinationX)||Math.abs(spec.destinationX)>1e7||spec.speed!==0||spec.duration!==0)throw Error('Invalid B instantaneous motion request');
  once('motion');const f=e.fighters[spec.actor];if(f.hp<=0)return null;e.move(f,spec.destinationX-f.x);return 'b-motion:'+e.round+':'+spec.castId+':'+spec.actor;
 };
}
