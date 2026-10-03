import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';import {runtimeHeroes} from '../src/runtime-heroes.js';
const frames=(e,n)=>{for(let i=0;i<n;i++)e.step();};
function setup(id,side){const e=new Engine(runtimeHeroes,side?[0,id]:[id,0],{seed:91}).start(),a=e.fighters[side],t=e.fighters[1-side];a.x=side?480:400;t.x=side?400:480;a.dir=side?-1:1;t.dir=-a.dir;return {e,a,t};}
function guard(e,t){e.setInput(t.i,{down:true,left:t.i===0,right:t.i===1});frames(e,2);assert(t.guard);}
for(const [name,id]of [['Haze',31],['Eye',25]])for(const side of [0,1])for(const hp of [10,1.5,1,.25])test(`${name}: natural guarded basic is nonlethal P${1-side+1} at HP${hp}`,()=>{
 const {e,a,t}=setup(id,side);assert(e.cast(side,3));frames(e,40);assert(t.pack.statuses.some(s=>s.values.armor<0));
 // Keep the real Eye-applied debuff; postpone its next unguardable strike to isolate the guarded attack.
 for(const storm of e.packState.storms)storm.tick=5;
 t.hp=hp;guard(e,t);const before=e.logs.length;e.setInput(side,{attack:true});frames(e,30);e.setInput(side,{});
 const blocks=e.logs.slice(before).filter(l=>l.type==='block'&&l.target===t.i);assert(blocks.length>0,'actual committed attack must contact guard');assert.equal(t.hp,Math.min(hp,1));assert.equal(e.phase,'fight');assert(blocks.every(l=>l.damage<=Math.max(0,hp-1)));assert(!e.logs.slice(before).some(l=>l.type==='round_end'));
});
for(const side of [0,1])for(const hp of [10,1.5,1,.25])for(const type of ['physical','magical','pure'])test(`final chip clamp handles ${type} modifiers P${1-side+1} HP${hp}`,()=>{
 const {e,a,t}=setup(31,side);t.hp=hp;t.pack.statuses.push({key:'haze',owner:a.i,life:18,values:{armor:-20},dispel:'basic'});t.pack.poison=Array.from({length:6},()=>({owner:a.i,life:4,tick:0}));
 const result=e.hit(a,t,100,{damage_type:type,chip:true,blockable:false},{dot:true});assert(result);assert.equal(t.hp,Math.min(1,hp));const event=e.logs.at(-1);assert.equal(event.damage,Math.max(0,hp-1));
});
test('guard nonlethal clamp is after shield absorption, so shields absorb the full mitigated guarded impact',()=>{
 const e=new Engine(runtimeHeroes,[31,100],{seed:91}).start(),[a,t]=e.fighters;a.x=400;t.x=480;assert(e.cast(1,1));frames(e,40);assert(t.pack.shield);t.hp=10;t.cd[3]=65;guard(e,t);
 const hp=t.hp;e.hit(a,t,100,{damage_type:'physical'},{basic:true});assert.equal(t.hp,hp);assert.equal(t.pack.shield.amount,190);assert.equal(e.logs.at(-1).damage,0);
});
test('unguarded amplified hits remain lethal; nonlethal contract must not cover ordinary damage',()=>{const {e,a,t}=setup(31,0);t.hp=10;t.pack.statuses.push({key:'haze',owner:0,life:18,values:{armor:-20},dispel:'basic'});e.hit(a,t,20,{damage_type:'physical'},{basic:true});assert.equal(t.hp,0);});
