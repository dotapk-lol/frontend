import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fixture} from './fixture.mjs';
import {PACKS,RECORDS} from '../../../src/hero-packs/c56_90/index.js';
import {C56System} from '../../../src/hero-packs/c56_90/system.js';
import {heroRegistry,ACTIVE_ROSTER} from '../../../src/hero-registry.js';
const ids=PACKS.map(p=>p.definition.registryNumericId),opponents=[...ACTIVE_ROSTER.heroIds,...ids];
const result={kind:'HARNESS_INITIAL_STATE_INJECTION_REAL_ENGINE',abi:'duel-pack-2.4-targeting',abiCommit:'c84ca0d9caf27ab27503384fafb26a8563c793c6',candidateIds:ids,opponents,pairs:0,steps:0,snapshotChecks:0,maxSnapshotBytes:0,failures:[],activeUnlock:false};
for(const id of ids)for(const opponent of opponents)for(const side of[0,1]){
 const {e}=fixture(id,side,opponent);for(const f of e.fighters){f.hp=f.maxHp=10000;f.mp=f.maxMp=5000;f.healBudget=100000;}
 try{for(let n=0;n<720&&e.phase==='fight';n++){
  for(const f of e.fighters){const slot=Math.floor(n/120)%4;e.setInput(f.i,n%120===0?{['s'+slot]:true}:n%30===0?{attack:true}:{});}
  e.step();result.steps++;
  if(n%60===0){const s=e.snapshot();result.snapshotChecks++;assert(C56System.validateSnapshot(e,s));assert(s.fighters.every(f=>Number.isFinite(f.hp)&&f.hp>=0&&f.hp<=f.maxHp));result.maxSnapshotBytes=Math.max(result.maxSnapshotBytes,Buffer.byteLength(JSON.stringify(s)));const resumed=fixture(id,side,opponent).e;resumed.restoreSimulation(s);resumed.step();e.step();result.steps++;assert.deepEqual(resumed.snapshot(),e.snapshot());}
 }}catch(error){result.failures.push({id,opponent,side,error:error.message});}result.pairs++;
}
result.registry=RECORDS.map(p=>{const d=p.definition,r=heroRegistry.byNumericId(d.registryNumericId);assert.equal(r.internalHeroId,d.id);assert.equal(r.valveHeroId,d.valveHeroId);assert(!ACTIVE_ROSTER.heroIds.includes(d.registryNumericId));return {registryNumericId:d.registryNumericId,internalHeroId:d.id,valveHeroId:d.valveHeroId};});
const dest=process.argv[2];if(dest)fs.writeFileSync(dest,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({...result,registry:undefined},null,2));if(result.failures.length)process.exitCode=1;
