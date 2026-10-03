import {Engine} from './engine.js';
import {validRulesSnapshot,validHeroRuleResources,validRuleHostSnapshot} from './hero-rules-host.js';
import {ACTIVE_ROSTER,validSimulationPair} from './hero-registry.js';
import {validCohortSnapshot} from './cohort-render.js';
import {assertPackSerializable} from './pack-services.js';
// Validate the authored schemas before a peer's state reaches presentation.
// This is integrity checking, not server-authoritative anti-cheat.
export function createRemoteSnapshotValidator(pool,{roster=ACTIVE_ROSTER,heroRuleRegistry}={}){
 const cache=new Map(),finite=(n,min=-1e7,max=1e7)=>Number.isFinite(n)&&n>=min&&n<=max,actor=i=>i===0||i===1;
 return g=>{try{
  if(!g||!validSimulationPair(g.indices,roster)||!['intro','fight','roundEnd','matchEnd'].includes(g.phase)||!['local','cpu','training'].includes(g.mode)||!finite(g.time,0,99.001)||!finite(g.t,0,1000)||!Number.isSafeInteger(g.frame)||g.frame<0||typeof g.paused!=='boolean'||!Array.isArray(g.score)||g.score.length!==2||!g.score.every(n=>Number.isSafeInteger(n)&&n>=0&&n<=2)||!Array.isArray(g.fighters)||g.fighters.length!==2)return false;
  assertPackSerializable(g);
  if(!g.fighters.every((f,i)=>f.i===i&&['x','y','hp','maxHp','mp','maxMp','dir','stun','root','silence','hex','fear','taunt','ccGrace','charge','chargeSlot'].every(k=>finite(f[k]))&&f.hp>=0&&f.maxHp>0&&f.hp<=f.maxHp+1e-5&&f.mp>=0&&f.maxMp>0&&f.mp<=f.maxMp+1e-5&&[-1,1].includes(f.dir)&&Array.isArray(f.cd)&&f.cd.length===4&&f.cd.every(n=>finite(n,0,3600))&&Array.isArray(f.buffs)&&f.buffs.length<=128&&f.buffs.every(b=>b&&typeof b.key==='string'&&b.m&&finite(b.life,0,3600))))return false;
  for(const [key,limit]of [['projectiles',256],['zones',256],['effects',256],['history',3]])if(!Array.isArray(g[key])||g[key].length>limit)return false;
  if(!g.projectiles.every(p=>actor(p.owner)&&['x','y','r','dir'].every(k=>finite(p[k]))&&p.r>=0)||!g.zones.every(z=>actor(z.owner)&&finite(z.x)&&finite(z.life)&&z.m&&typeof z.type==='string')||!g.effects.every(v=>v&&typeof v.type==='string'&&finite(v.x)&&finite(v.y)&&finite(v.life)&&typeof v.color==='string'))return false;
  if(!validCohortSnapshot(g))return false;
  const key=g.indices.join('/');let e=cache.get(key);if(!e){e=new Engine(pool,g.indices,{simulationRoster:roster,heroRuleRegistry});if(cache.size>=4)cache.delete(cache.keys().next().value);cache.set(key,e);}
  if(!validRulesSnapshot(e,g.heroRules,g.fighters)||!validHeroRuleResources(e,g.fighters)||!validRuleHostSnapshot(e,g))return false;
  const names=Object.keys(e.packModules||{});if(g.fighters.some(f=>Object.keys(f.packModules||{}).some(n=>!names.includes(n)))||!!g.packState!==!!e.packState)return false;
  if(e.packModules||g.packModules||g.packCore||g.packClock){e.restoreSimulation(g);}else if(g.packModules!==undefined&&g.packModules!==null)return false;
  return true;
 }catch{return false;}};
}
