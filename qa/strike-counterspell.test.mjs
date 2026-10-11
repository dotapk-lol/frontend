import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';import {runtimeHeroes} from '../src/runtime-heroes.js';import {createReleasedHeroRegistry} from '../src/released-hero-rules.js';
const registry=createReleasedHeroRegistry(),skill='phantom_assassin_strike';
const make=side=>{const e=new Engine(runtimeHeroes,side?[5,6]:[6,5],{heroRuleRegistry:registry,seed:0}).start();e.fighters[0].x=400;e.fighters[1].x=800;return e;};
const clone=e=>new Engine(runtimeHeroes,e.indices,{heroRuleRegistry:registry,seed:0}).start().restoreSimulation(e.snapshot());
for(const side of [0,1])for(const mode of ['normal','reflect','out-of-range','invulnerable-target','reflected-target-invulnerable'])test(`Strike side ${side} ${mode}: payment, charges, motion, buff, damage receipt and restore`,()=>{
 const e=make(side),f=e.fighters[side],t=e.fighters[1-side],reflected=mode==='reflect'||mode==='reflected-target-invulnerable',counter=mode!=='normal';
 if(counter){e.setInput(1-side,{s2:true});for(let n=0;n<60&&!e.buff(t,'counter');n++)e.step();assert(e.buff(t,'counter'),'real Counterspell cast activates');e.setInput(1-side,{});}
 const receipts=[],resolve=e.resolveDamage.bind(e);e.resolveDamage=(a,b,d,m,info)=>{const result=resolve(a,b,d,m,info);if(info?.skill===skill)receipts.push({source:a.i,target:b.i,info:structuredClone(info),result:structuredClone(result)});return result;};
 const x=f.x,mp=f.mp,charges=f.charges[1];e.setInput(side,{s1:true});e.step();assert(f.cast);assert.equal(f.charges[1],charges-1);const castLog=e.logs.filter(l=>l.type==='cast'&&l.player===side&&l.skill===skill);assert.equal(castLog.length,1);assert.equal(castLog[0].cost,e.ability(side,1).mvp.mana);assert(mp-f.mp>castLog[0].cost-2&&mp-f.mp<=castLog[0].cost);
 if(mode==='out-of-range'){f.x=side?1100:100;t.x=side?100:1100;}
 if(mode==='invulnerable-target')t.invuln=2;
 if(mode==='reflected-target-invulnerable')f.invuln=2;
 const beforeActivation=f.x,r=clone(e);for(let n=0;n<30;n++){e.step();r.step();assert.deepEqual(r.snapshot(),e.snapshot());}
 assert.equal(f.casts,1);assert.equal(f.charges[1],charges-1);assert.equal(e.logs.filter(l=>l.type==='cast'&&l.player===side&&l.skill===skill).length,1);
 if(mode==='normal'){assert.notEqual(f.x,x);assert(e.buff(f,skill));assert.equal(receipts.length,1);assert.equal(receipts[0].source,side);assert.equal(receipts[0].target,1-side);assert.equal(receipts[0].result.landed,true);}
 else {assert.equal(f.x,beforeActivation);assert(!e.buff(f,skill));assert(!e.buff(t,skill));assert.equal(!!e.buff(t,'counter'),!reflected);assert.equal(e.logs.filter(l=>l.type==='spell_reflected'&&l.skill===skill).length,reflected?1:0);if(mode==='reflect'){assert.equal(receipts.length,1);assert.equal(receipts[0].source,1-side);assert.equal(receipts[0].target,side);assert.equal(receipts[0].result.landed,true);for(const flag of ['reflected','noReflect','noLifesteal'])assert.equal(receipts[0].info[flag],true);}else assert.equal(receipts.length,0);}
 for(const receipt of receipts)assert.equal(receipt.result.actual,0,'Strike has a real zero-damage receipt');
 const after=clone(e);for(let n=0;n<35;n++){e.step();after.step();assert.deepEqual(after.snapshot(),e.snapshot());}
});
for(const side of [0,1])for(const reason of ['root','silence','mana','charges'])test(`Strike side ${side} admission rejects ${reason} without payment or consuming Counterspell`,()=>{
 const e=make(side),f=e.fighters[side],t=e.fighters[1-side];e.addBuff(t,'counter',{mode:'spell'},5);if(reason==='root')f.root=1;if(reason==='silence')f.silence=1;if(reason==='mana')f.mp=0;if(reason==='charges')f.charges[1]=0;const g=e.snapshot();assert.equal(e.cast(side,1),false);assert.deepEqual(e.snapshot(),g);
});
