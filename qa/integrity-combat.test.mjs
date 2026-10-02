// Independent source-executing regression audit. Mock DOM/channel/gamepad APIs; not real browser or hardware QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {heroes} from '../src/data.js';
const hi=id=>heroes.findIndex(h=>h.id===id);
const setup=(id,other='juggernaut')=>{const e=new Engine(heroes,[hi(id),hi(other)],{seed:42}).start();e.time=999;const[p,q]=e.fighters;p.x=400;q.x=465;q.hp=q.maxHp=100000;return {e,p,q};};
const run=(e,seconds)=>{for(let i=0;i<Math.ceil(seconds*60);i++)e.step();};

test('Sonic Wave cannot attach its delayed damage to an invulnerable target',()=>{
 const {e,p,q}=setup('queen_of_pain');e.cast(0,3);run(e,.45);q.invuln=1;run(e,.2);
 assert.equal(q.dots.filter(d=>d.id==='queen_of_pain_sonic').length,0,'the collision was evaded, so it must not apply delayed damage');
 const hp=q.hp;run(e,3);assert.equal(q.hp,hp);
});
test('Sonic Wave respects blocking when its initial collision was guarded',()=>{
 const {e,p,q}=setup('queen_of_pain');e.setInput(1,{right:true,down:true});e.cast(0,3);run(e,3);
 assert.ok(q.maxHp-q.hp<=625*.2+1,'guarded wave should not deal full625-ish pure damage');
});
test('Mana Break must not burn mana through 100percent Windrun evasion',()=>{
 const {e,p,q}=setup('anti_mage','windranger');e.addBuff(q,'windranger_windrun',{basic_attack_evasion:1},6);const hp=q.hp,mp=q.mp;
 e.basicHit(p,q,{damage:78,m:{damage_type:'physical',blockable:true}});
 assert.equal(q.hp,hp,'ordinary attack was evaded');assert.equal(q.mp,mp,'evaded attack must not apply Mana Break');
});
test('Battle Hunger integrates the official24damage per second over12seconds',()=>{
 const {e,p,q}=setup('axe');e.cast(0,1);run(e,14);const damage=q.maxHp-q.hp;assert.ok(Math.abs(damage-24*12)<=1,`actual=${damage}, official24*12=${24*12}`);
});
test('Sonic Wave integrates its total625damage without per-tick rounding drift',()=>{
 const {e,p,q}=setup('queen_of_pain');e.cast(0,3);run(e,3);const damage=q.maxHp-q.hp;assert.ok(Math.abs(damage-625)<=1,`actual=${damage}`);
});
test('Shadow Fiend Presence radius follows configured0.55-scaled official range',()=>{
 const {e,p,q}=setup('shadow_fiend');q.x=800;const m=e.ability(0,2).mvp;assert.ok(q.x-p.x<m.radius_wu);e.hit(p,q,100,{damage_type:'physical',blockable:false});assert.ok(q.maxHp-q.hp>100,'the configured passive radius is660, but its effect disappears beyond220');
});
