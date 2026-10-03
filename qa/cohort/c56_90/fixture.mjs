import {createHeroRegistry,heroes as ruleDefinitions} from '../../../src/heros-rules.js';
import {Engine} from '../../../src/engine.js';
import {runtimeHeroes} from '../../../src/runtime-heroes.js';
import {CORE4_PACKS} from '../../../src/hero-packs/index.js';
import {ACTIVE_ROSTER} from '../../../src/hero-registry.js';
import {PACKS} from '../../../src/hero-packs/c56_90/index.js';
// All changes to position/HP/MP below are labelled HARNESS initial state, never natural match evidence.
export function fixture(id=57,side=0,opponent=0,{training=false}={}){
 const defs=PACKS.map(p=>p.definition),ids=new Set(defs.map(h=>h.registryNumericId));
 const heroes=[...runtimeHeroes.filter(h=>!ids.has(h.registryNumericId)),...defs];
 const pair=side===0?[id,opponent]:[opponent,id];
 // HARNESS resource schema: existing stress cases explicitly set maxMp=5000.
 const heroRuleRegistry=createHeroRegistry(ruleDefinitions.map(h=>({...h,combatMana:5000})));
 const e=new Engine(heroes,pair,{heroRuleRegistry,seed:197,mode:training?'training':'local',simulationRoster:{...ACTIVE_ROSTER,heroIds:[...new Set([...ACTIVE_ROSTER.heroIds,...ids])]},heroPacks:[...CORE4_PACKS,...PACKS]}).start();
 const f=e.fighters[side],t=e.fighters[1-side];f.x=side===0?500:700;t.x=side===0?700:500;f.dir=Math.sign(t.x-f.x);t.dir=-f.dir;
 return {e,f,t};
}
export function advance(e,seconds){const until=e.t+seconds;let n=0;while(e.t<until-1e-8&&e.phase==='fight'&&n++<10000)e.step();if(n>=10000)throw Error('Harness did not advance');}
export function ready(f){f.recovery=0;f.cast=null;f.cd=[0,0,0,0];f.mp=f.maxMp;}
export function basic(e,f,t,amount=100,id=++e.seq){e.basicHit(f,t,{id,damage:amount,m:{damage_type:'physical',blockable:false}});return id;}
export function rejectedRealEngine(pack){
 const definitions=[...PACKS.map(p=>p.definition),pack.definition],ids=new Set(definitions.map(h=>h.registryNumericId));
 return new Engine([...runtimeHeroes.filter(h=>!ids.has(h.registryNumericId)),...definitions],[pack.definition.registryNumericId,0],{seed:197,simulationRoster:{...ACTIVE_ROSTER,heroIds:[...new Set([...ACTIVE_ROSTER.heroIds,...ids])]},heroPacks:[...CORE4_PACKS,...PACKS,pack]}).start();
}
