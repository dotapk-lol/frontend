import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Engine} from '../../../src/engine.js';
import {runtimeHeroes} from '../../../src/runtime-heroes.js';
import {ACTIVE_ROSTER} from '../../../src/hero-registry.js';
import {CORE4_PACKS} from '../../../src/hero-packs/index.js';
import {PACKS as A} from '../../../src/hero-packs/r20_55/index.js';
import {services as a} from '../../../src/hero-packs/r20_55/combat.js';
// Exact read-only audit fixture, pinned in docs/r20_55/cross-pack-fixture.json.
// B belongs to its author and is deliberately excluded from the A release archive.
import {PACKS as B} from '../../../src/hero-packs/c56_90/index.js';
import {services as b} from '../../../src/hero-packs/c56_90/system.js';
import {packStatusFlag} from '../../../src/pack-services.js';

const packs=[...A,...B], ids=packs.map(p=>p.definition.registryNumericId);
const evidence=[];
after(()=>{if(process.env.R20_CHANNEL_REPORT)fs.writeFileSync(process.env.R20_CHANNEL_REPORT,JSON.stringify({kind:'REAL_ENGINE_CROSS_PACK_INPUT_REGRESSION',claim:'Synthetic normal input. initial-300-harness injects initial geometry only; default-spawn-walk injects no combat state. Not browser or match acceptance.',cycles:evidence},null,2)+'\n');});
const heroes=[...runtimeHeroes.filter(h=>!ids.includes(h.registryNumericId)),...packs.map(p=>p.definition)];
const options={seed:197,heroPacks:[...CORE4_PACKS,...packs],simulationRoster:{...ACTIVE_ROSTER,heroIds:[...new Set([...ACTIVE_ROSTER.heroIds,...ids])]}};
const channel=(e,f)=>a.fighter(e,f).data.channel;
const revision=(e,f)=>a.world(e).revisions[f.i];
const entities=(e,f)=>a.world(e).entities.filter(x=>x.owner===f.i&&x.data.channel);
function create(side){return new Engine(heroes,side?[58,32]:[32,58],options).start();}
function run(e,seconds,check=()=>{}){const end=e.t+seconds;for(let n=0;e.t<end-1e-8;n++){assert.ok(n<20000&&e.phase==='fight','simulation must continue');e.step();check();}}
function press(e,side,slot){e.setInput(side,{});e.step();e.setInput(side,{['s'+slot]:true});const at=e.t;for(let n=0;e.t===at;n++){assert.ok(n<100);e.step();}e.setInput(side,{});}
function restore(e){return new Engine(heroes,e.indices,options).restoreSimulation(e.snapshot());}
function walkToDistance(e,side,distance){const f=e.fighters[side],t=e.fighters[1-side];for(let n=0;Math.abs(Math.abs(f.x-t.x)-distance)>4;n++){assert.ok(n<1000,'normal movement reaches distance');const direction=Math.sign(t.x-f.x)*(Math.abs(t.x-f.x)>distance?1:-1);e.setInput(side,direction>0?{right:true}:{left:true});e.step();}e.setInput(side,{});e.step();}

for(const side of [0,1])for(const placement of ['initial-300-harness','default-spawn-walk'])test(`CROSS-PACK normal input cycle side${side} ${placement}: Fear cancels Gaze before next pulse; replay and recast`,()=>{
 const e=create(side),f=e.fighters[side],t=e.fighters[1-side];
 if(placement==='initial-300-harness'){
  // HARNESS initial geometry only, matching the audit. No HP/MP/CD/status injection.
  f.x=side?700:500;t.x=f.x+(side?-300:300);
 }else walkToDistance(e,side,300); // Fully natural approach from default spawn.
 for(let cycle=0;cycle<2;cycle++){
  if(cycle){run(e,Math.max(f.cd[2],t.cd[1])+1);walkToDistance(e,side,300);}
  const beforeCasts=[f.casts,t.casts];
  press(e,t.i,1);run(e,.1);press(e,f.i,2);run(e,.2);
  assert.equal(t.casts,beforeCasts[1]+1);assert.equal(f.casts,beforeCasts[0]+1);
  assert.ok(channel(e,f),'channel begins outside Fear radius');
  assert.equal(packStatusFlag(e,f,'silence'),false,'self channel lock is not actual silence');
  assert.equal(e.isSilenced(f),true,'self channel still locks other casts');
  const beforeRevision=revision(e,f), twin=restore(e);
  let previousMp=t.mp,previousX=t.x,entry=null;
  for(let n=0;n<180&&!entry;n++){
   e.step();twin.step();assert.deepEqual(twin.snapshot(),e.snapshot());
   if(b.hasValue(e,f,'silence')){
    entry={time:e.t,revision:revision(e,f),distance:Math.abs(f.x-t.x),channelActive:!!channel(e,f),rawSilence:f.silence,externalSilence:b.hasValue(e,f,'silence'),manaDelta:t.mp-previousMp,pullDelta:t.x-previousX};
    assert.equal(f.silence,0,'silence is genuinely external typed state');
    assert.equal(a.hasValue(e,f,'silence'),false,'no own-namespace silence');
    assert.equal(channel(e,f),null,'effective cross-pack silence must cancel channel');
    assert.equal(revision(e,f),beforeRevision+1,'single cancellation invalidates owner revision');
    assert.equal(entities(e,f).length,0,'channel entity removed at entry');
    assert.ok(t.mp>=previousMp,'no mana drain on cancellation step');
    assert.equal(t.x,previousX,'no pull on cancellation step');
   }
   previousMp=t.mp;previousX=t.x;
  }
  assert.ok(entry,'Gaze pulls the actual Fear area into range');
  const cancelled=restore(e),cancelledRevision=revision(e,f),cancelledX=t.x;
  // Only ordinary directional input leaves the enemy aura; no direct interrupt/status edits.
  const away=side?{right:true}:{left:true};e.setInput(side,away);cancelled.setInput(side,away);
  for(let n=0;n<120;n++){
   const mp=t.mp;e.step();cancelled.step();assert.deepEqual(cancelled.snapshot(),e.snapshot());
   assert.equal(channel(e,f),null);assert.equal(entities(e,f).length,0);
   assert.equal(revision(e,f),cancelledRevision);assert.equal(t.x,cancelledX);assert.ok(t.mp>=mp);
  }
  e.setInput(side,{});assert.equal(packStatusFlag(e,f,'silence'),false,'normal walk exits Fear');
  run(e,3,()=>assert.equal(channel(e,f),null));
  evidence.push({side,placement,cycle:cycle+1,entry,beforeRevision,afterRevision:revision(e,f),resumeAfterSilence:false,originalVsRestored:'identical every checked step'});
 }
 // An entirely new input after cooldown may channel normally; cancellation does not poison it.
 run(e,Math.max(f.cd[2],t.cd[1])+1);walkToDistance(e,side,300);
 press(e,side,2);run(e,.4);assert.ok(channel(e,f));const mp=t.mp;run(e,.4);assert.ok(t.mp<mp);
 run(e,3);assert.equal(channel(e,f),null);assert.equal(entities(e,f).length,0);
});

for(const side of [0,1])for(const suppression of ['debuff-immunity','expired'])test(`CROSS-PACK HARNESS side${side}: ${suppression} typed silence does not cancel; later effective silence does`,()=>{
 const e=create(side),f=e.fighters[side];walkToDistance(e,side,300);
 press(e,side,2);run(e,.2);assert.ok(channel(e,f));const rev=revision(e,f);
 // Explicit service-level boundary injection, not natural-match evidence.
 const status=b.applyStatus(e,f,{key:'channel_silence_probe',owner:1-side,duration:suppression==='expired'?.001:2,values:{silence:1}});
 assert.ok(status);
 if(suppression==='debuff-immunity')e.addBuff(f,'harness_immunity',{debuffImmune:true},.4);
 else run(e,.03);
 assert.equal(packStatusFlag(e,f,'silence'),false);
 run(e,.25);assert.ok(channel(e,f));assert.equal(revision(e,f),rev);
 if(suppression==='expired')b.applyStatus(e,f,{key:'channel_silence_probe',owner:1-side,duration:1,values:{silence:1}});
 run(e,.25);assert.equal(channel(e,f),null);assert.equal(revision(e,f),rev+1);assert.equal(entities(e,f).length,0);
});
