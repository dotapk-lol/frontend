// Controlled real Engine coverage; not natural match, rendering, or browser acceptance.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Engine} from '../../src/engine.js';
import {runtimeHeroes} from '../../src/runtime-heroes.js';
import {HERO_PACKS} from '../../src/pack-runtime.js';
import {ACTIVE_ROSTER} from '../../src/hero-registry.js';
const ids=runtimeHeroes.map(h=>h.registryNumericId??runtimeHeroes.indexOf(h)),newIds=HERO_PACKS.map(p=>p.definition.registryNumericId).filter(id=>!ACTIVE_ROSTER.heroIds.includes(id));
const roster={...ACTIVE_ROSTER,heroIds:ids},failures=[];let pairs=0,steps=0,replays=0,maxBytes=0;
for(const a of ids)for(const b of ids){if(!newIds.includes(a)&&!newIds.includes(b))continue;
 try{const e=new Engine(runtimeHeroes,[a,b],{seed:47,simulationRoster:roster}).start();e.fighters[0].x=460;e.fighters[1].x=620;
  let restored;
  for(let frame=0;frame<180;frame++){
   for(let side=0;side<2;side++){const input=frame%30===0?{['s'+Math.floor(frame/30)%4]:true}:frame%30<8?{attack:true}:{};e.setInput(side,input);restored?.setInput(side,input);}
   e.step();steps++;if(restored){restored.step();assert.deepEqual(restored.snapshot(),e.snapshot());replays++;}
   if(frame===89){const snap=e.snapshot();maxBytes=Math.max(maxBytes,JSON.stringify(snap).length);restored=new Engine(runtimeHeroes,[a,b],{seed:1,simulationRoster:roster}).restoreSimulation(snap);}
   assert(e.fighters.every(f=>Number.isFinite(f.hp)&&Number.isFinite(f.mp)&&Number.isFinite(f.x)&&f.hp>=0));
  }pairs++;
 }catch(error){failures.push({pair:[a,b],message:error.message,stack:error.stack});if(failures.length>=8)break;}
} 
const report={roster:ids,newIds,pairs,steps,replays,maxSnapshotBytes:maxBytes,failures,browserAcceptance:false,controlledInitialPositions:true};
fs.mkdirSync('release/pack-abi-v2.3',{recursive:true});fs.writeFileSync('release/pack-abi-v2.3/integrated-matrix.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,failures:failures.map(x=>({pair:x.pair,message:x.message}))}));if(failures.length)process.exitCode=1;
