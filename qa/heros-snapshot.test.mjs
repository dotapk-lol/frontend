import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';import {runtimeHeroes} from '../src/runtime-heroes.js';
import * as Rules from '../src/heros-rules.js';
const {createHeroRegistry,BATTLE_ABI}=Rules;
import {probeFactory,closureSchema} from '../node_modules/@dotapk/heros/test/probes.mjs';
import {createRemoteSnapshotValidator} from '../src/remote-snapshot.js';
const registry=()=>{const r=createHeroRegistry(),a=r.definition(5).abilities[3];r.replaceSkill(5,3,{definition:a,factory:probeFactory('state',{api:Rules})},{abilityId:a.id,revision:'1.0.0'});return r;};
test('private full checkpoint preserves namespace state; invalid rules restore cannot mutate world',()=>{
 const r=registry(),e=new Engine(runtimeHeroes,[5,100],{heroRuleRegistry:r}).start();e.enableHPLifecycle();e.fighters[0].x=450;e.fighters[1].x=600;e.cast(0,3);for(let n=0;n<25;n++)e.step();const s=e.snapshot();assert.deepEqual(s.heroRules.namespaces,[{namespace:'skill:5:anti_mage_mana_void',state:{count:1}}]);
 const copy=new Engine(runtimeHeroes,[5,100],{heroRuleRegistry:registry()});copy.restoreSimulation(s);assert.deepEqual(copy.snapshot(),s);const before=copy.snapshot();assert.throws(()=>copy.restoreSimulation({...s,heroRules:{...s.heroRules,rulesHash:'wrong'}}));assert.deepEqual(copy.snapshot(),before);e.resetRound();assert.deepEqual(e.snapshot().heroRules.namespaces,[]);
});
test('P2P snapshot validator accepts identical rules and rejects missing/mismatched namespace envelope',()=>{const e=new Engine(runtimeHeroes,[5,3]).start(),validate=createRemoteSnapshotValidator(runtimeHeroes),s=e.snapshot();assert(validate(s));assert(!validate({...s,heroRules:undefined}));assert(!validate({...s,heroRules:{...s.heroRules,rulesHash:'wrong'}}));assert(!validate({...s,heroRules:{...s.heroRules,namespaces:[{namespace:'unknown',state:{}}]}}));});

test('P2P/world restore reject MP ceilings inconsistent with the declared registry before mutation',()=>{const e=new Engine(runtimeHeroes,[5,3]).start();e.enableHPLifecycle();const original=e.snapshot(),forged=structuredClone(original);forged.fighters[0].maxMp=2000;forged.fighters[0].mp=200;assert(!createRemoteSnapshotValidator(runtimeHeroes)(forged));assert.throws(()=>e.restoreSimulation(forged));assert.deepEqual(e.snapshot(),original);});
