// Private admission of legacy native records. Derive fixed payloads from the
// selected public hook in a detached session; never execute against live ports.
import {createRuleSession} from './heros-rules.js';

const plain=x=>!!x&&Object.getPrototypeOf(x)===Object.prototype;
const birthCache=new WeakMap();
export function sameLegacyValue(a,b){
 if(typeof a!==typeof b)return false;
 if(a===null||b===null||typeof a!=='object')return a===b;
 if(Array.isArray(a)||Array.isArray(b))return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>sameLegacyValue(v,b[i]));
 if(!plain(a)||!plain(b))return false;
 const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&sameLegacyValue(a[k],b[k]));
}
export function legacyStack(value,m){
 if(!Number.isInteger(value)||!Number.isFinite(m.max_stacks)||value<0||value>m.max_stacks)throw Error('Invalid sealed legacy stacks');
 return value;
}
export function deriveLegacyBirth(sealed,o,hook,event,{prior=[],stacks=undefined,indices=[]}={}){
 let cache=birthCache.get(sealed);if(!cache){cache=new Map();birthCache.set(sealed,cache);}
 const key=JSON.stringify({o,hook,event,prior,indices});
 if(cache.has(key)){const rows=structuredClone(cache.get(key));if(stacks!==undefined)for(const x of rows)if(Object.hasOwn(x.values,'stacks'))x.values.stacks=stacks;return rows;}
 const session=createRuleSession(sealed),births=[];
 const view=i=>({id:i,heroId:indices[i]??(i===o.actor?o.heroId:0),hp:1000,maxHp:1000,mp:1000,maxMp:1000,x:600,y:0,dir:i===0?1:-1,alive:true,invulnerable:false,debuffImmune:false,passivesEnabled:true,guarding:false,rooted:false,silenced:false});
 const host={now:()=>0,actor:view,random:()=>0,ports:{
  status:{query:()=>structuredClone(prior),apply:x=>{births.push(structuredClone(x));return 'legacy-admission';},remove:()=>true,cleanse:()=>[]},
  target:{route:x=>({accepted:true,reason:null,owner:x.owner,target:x.target,originalOwner:x.owner,reflected:false,noReflect:false,noLifesteal:false})},
  damage:x=>({accepted:true,landed:true,guarded:false,raw:x.amount,actual:0}),control:{apply:()=>null},cue:()=>null
 }};
 const out=session.invoke(o.heroId,o.slot,hook,host,event).value;
 for(const c of out?.commands??[])if(c.kind==='status.apply')births.push({owner:o.actor,target:c.target,abilityId:o.abilityId,key:c.key,duration:c.duration,values:structuredClone(c.values)});
 cache.set(key,structuredClone(births));
 if(stacks!==undefined)for(const x of births)if(Object.hasOwn(x.values,'stacks'))x.values.stacks=stacks;
 return births;
}
export function validLegacyNativeBuff(b,expected,{extra={},maxLife=3600}={}){
 // Native Engine adds reveal=0 to every buff on its first ordinary step.
 const keys=['key','m','life',...Object.keys(extra),...Object.hasOwn(b??{},'reveal')?['reveal']:[]];
 if(Object.hasOwn(b??{},'reveal')&&b.reveal!==0)return false;
 if(!plain(b)||Object.keys(b).length!==keys.length||!keys.every(k=>Object.hasOwn(b,k))||!sameLegacyValue(b.m,expected)||!Number.isFinite(maxLife)||maxLife<=0||maxLife>3600||!Number.isFinite(b.life)||b.life<=0||b.life>maxLife+1e-7)return false;
 return Object.entries(extra).every(([k,check])=>check(b[k]));
}
