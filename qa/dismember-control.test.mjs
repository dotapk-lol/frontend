import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {runtimeHeroes} from '../src/runtime-heroes.js';
import {createReleasedHeroRegistry} from '../src/released-hero-rules.js';
const registry=createReleasedHeroRegistry();
const make=side=>{const e=new Engine(runtimeHeroes,side?[1,2]:[2,1],{heroRuleRegistry:registry,seed:0}).start();e.fighters[0].x=500;e.fighters[1].x=580;e.setInput(side,{s3:true});return e;};
const owned=(e,side)=>e.packCore?.controls?.find(c=>c.owner===side&&c.key.startsWith('rule-channel:'));
const begin=(e,side,dt=1/60)=>{for(let n=0;n<60&&!owned(e,side);n++)e.step(dt);assert(owned(e,side));return owned(e,side);};
for(const side of [0,1])for(const dt of [1/60,.05])test(`Dismember side ${side} dt ${dt}: continuous hold respects 1.5s admission and 1s protection`,()=>{
 const e=make(side),target=e.fighters[1-side],c=begin(e,side,dt),start=e.t;let remaining=c.life,elapsed=0;
 assert.equal(c.duration,1.5);
 while(owned(e,side)){const t=e.t;e.step(dt);elapsed+=e.t-t;const next=owned(e,side);if(next){assert(next.life<=remaining+1e-8,'damage ticks cannot refresh the admitted control');remaining=next.life;}assert(elapsed<=1.5+dt+1e-7);}
 assert(e.t-start>=1.5-2*dt-1e-7);assert.equal(e.blocked(target),false);assert.equal(target.ccChain,0);assert.equal(target.ccGrace,1);assert(e.fighters[side].channel,'channel damage can continue after the stun cap');
 const released=e.t,hp=target.hp;let protectedSteps=0;
 while(target.ccGrace>dt+1e-7){assert.equal(e.control(target,'stun',.2),0);assert.equal(e.applyControlSource(target,{owner:side,key:'protection-probe',type:'stun',duration:.2}),null);e.step(dt);protectedSteps++;assert.equal(e.blocked(target),false);assert(!owned(e,side));assert(protectedSteps<150);}
 assert(e.t-released>=1-2*dt-1e-7);assert(target.hp<hp,'actual damage continues without renewing hard control');
 while(target.ccGrace>0)e.step(dt);
 assert.equal(e.control(target,'stun',.2),.2,'ordinary control is available after protection');
});
for(const side of [0,1])test(`Dismember side ${side} uses only the remaining shared control budget`,()=>{
 const e=make(side),target=e.fighters[1-side];assert.equal(e.control(target,'root',.6),.6);const c=begin(e,side);assert(Math.abs(c.duration-.9)<1e-7);const first=e.t;while(owned(e,side)){e.step();assert(e.t-first<=.9+1/60+1e-7);}assert.equal(target.ccGrace,1);
});
for(const side of [0,1])for(const reason of ['release','cancel-input','owner-dead','target-dead'])test(`Dismember side ${side} ${reason} cleans its source without removing foreign control`,()=>{
 const e=make(side);begin(e,side);for(let n=0;n<30;n++)e.step();const target=e.fighters[1-side];
 if(reason!=='target-dead')target.stun=.4;
 if(reason==='release')e.release(side,3);
 if(reason==='cancel-input')e.cancelNativeInput(side);
 if(reason==='owner-dead')e.fighters[side].hp=0;
 if(reason==='target-dead')target.hp=0;
 e.step();assert(!owned(e,side));if(reason!=='target-dead'){assert.equal(e.fighters[side].channel,null);assert.equal(target.grabbedBy,null);assert(target.stun>0);}
 e.resetRound();assert(!e.packCore?.controls?.length);assert(e.fighters.every(f=>!f.channel&&!f.grabbedBy));
});
for(const side of [0,1])test(`Dismember side ${side} restores before expiry and during protection with identical continuation`,()=>{
 for(const checkpoint of ['active','protection']){const e=make(side);begin(e,side);if(checkpoint==='active'){for(let n=0;n<35;n++)e.step();}else while(owned(e,side))e.step();const g=e.snapshot();const r=new Engine(runtimeHeroes,e.indices,{heroRuleRegistry:registry,seed:0}).start().restoreSimulation(g);assert.deepEqual(r.snapshot(),g);for(let n=0;n<170;n++){e.step();r.step();assert.deepEqual(r.snapshot(),e.snapshot());}assert(!owned(e,side));assert(!e.fighters[side].channel);}
});

test('Dismember restored control cannot refresh its admitted lifetime or duplicate its source',()=>{const e=make(0);begin(e,0);for(let n=0;n<40;n++)e.step();const g=e.snapshot();for(const change of [b=>b.packCore.controls.find(c=>c.key.startsWith('rule-channel:')).life=1.5,b=>{const c=structuredClone(b.packCore.controls.find(c=>c.key.startsWith('rule-channel:')));c.id=++b.packClock.seq;b.packCore.controls.push(c);}]){const bad=structuredClone(g);change(bad);assert.throws(()=>e.restoreSimulation(bad));assert.deepEqual(e.snapshot(),g);}});
