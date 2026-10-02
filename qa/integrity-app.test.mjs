import {TestAudioContext} from './audio-context.mjs';
// Independent source-executing regression audit. Mock DOM/channel/gamepad APIs; not real browser or hardware QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import {World} from './integrity-harness.mjs';

test('a rejected third player must not disconnect the existing pair',()=>{
 const w=new World(),{host,guest}=w.pair();assert.equal(host.DUEL.room.connected,true);assert.equal(guest.DUEL.room.connected,true);
 const third=w.tab();third.__audit.connect('ABC123','guest');third.__audit.sendRoom({type:'hello',hero:2});w.flush();
 assert.equal(host.DUEL.room.connected,true,'host remains connected after rejected guest leaves');assert.equal(guest.DUEL.room.connected,true,'accepted guest remains connected');
});
test('a host can accept a replacement after previous peer explicitly leaves',()=>{
 const w=new World(),{host,guest}=w.pair();guest.__audit.leaveRoom();w.flush();assert.equal(host.DUEL.room.connected,false);
 const next=w.tab();next.__audit.connect('ABC123','guest');next.__audit.sendRoom({type:'hello',hero:4});w.flush();
 assert.equal(host.DUEL.room.connected,true);assert.equal(next.DUEL.room.connected,true);
});
test('guest movement expires when input frames stop but heartbeat continues',()=>{
 const w=new World(),{host,guest}=w.pair();host.__audit.action('roomStart');w.flush();guest.__audit.sendRoom({type:'input',input:{right:true}});w.flush();assert.equal(host.__audit.getGuestInput().right,true);
 for(let i=0;i<8;i++){w.advance(1000);host.__audit.loop(w.now);w.flush();}
 assert.notEqual(host.__audit.getGuestInput().right,true,'old held direction must be released');
});
test('disconnecting an active gamepad releases the previously held input',()=>{
 const w=new World(),tab=w.tab();tab.DUEL.start({mode:'local'});const buttons=Array.from({length:16},(_,i)=>({pressed:i===2}));tab.setPads([{index:0,axes:[0,0],buttons}]);tab.__audit.gamepads();assert.equal(tab.__audit.getInput()[0].attack,true);
 tab.setPads([]);tab.__audit.gamepads();assert.notEqual(tab.__audit.getInput()[0].attack,true,'disconnected controller must stop attacks');
});
test('closing a room lobby leaves room before switching into local mode',()=>{
 const w=new World(),{host}=w.pair();host.__audit.close();host.DUEL.state.mode='local';host.DUEL.selection();host.DUEL.start({mode:'local'});
 assert.equal(host.DUEL.room,null,'local mode must not retain room routing');
});

test('disconnecting P1 controller must not remap P2 controller into P1',()=>{
 const w=new World(),tab=w.tab();tab.DUEL.start({mode:'local'});const idle=Array.from({length:16},()=>({pressed:false}));const attack=Array.from({length:16},(_,i)=>({pressed:i===2}));const p1={index:0,axes:[0,0],buttons:idle},p2={index:1,axes:[0,0],buttons:attack};tab.setPads([p1,p2]);tab.__audit.gamepads();assert.equal(tab.__audit.getInput()[1].attack,true);
 tab.setPads([null,p2]);tab.__audit.gamepads();assert.equal(tab.__audit.getInput()[1].attack,true,'P2 still controls P2');assert.notEqual(tab.__audit.getInput()[0].attack,true,'P2 controller must not migrate to P1');
});
test('silent peer timeout allows a replacement without rebuilding the room',()=>{
 const w=new World(),{host,guest}=w.pair();const guestChannel=w.channels.find(c=>c.onmessage&&c!==w.channels[0]);guestChannel.close();guest.intervals.clear();
 for(let i=0;i<7;i++)w.advance(1000);assert.equal(host.DUEL.room.connected,false);
 const replacement=w.tab();replacement.__audit.connect('ABC123','guest');replacement.__audit.sendRoom({type:'hello',hero:4});w.flush();
 assert.equal(host.DUEL.room.connected,true,'timed-out peer must not permanently reserve the room');assert.equal(replacement.DUEL.room.connected,true);
});
test('room keyup from ignored P2 mapping does not release local P1 skill key',()=>{
 const w=new World(),{host}=w.pair();host.__audit.action('roomStart');w.flush();const event=code=>({code,target:{},preventDefault(){}});host.events.keydown(event('KeyQ'));assert.equal(host.__audit.getInput()[0].s0,true);host.events.keyup(event('KeyU'));assert.equal(host.__audit.getInput()[0].s0,true,'ignored P2 key must not interfere with P1');
});
test('background visibility releases inputs, freezes local clock, and resumes cleanly',()=>{
 const w=new World(),tab=w.tab();tab.DUEL.start({mode:'local'});tab.DUEL.engine.start();tab.DUEL.setInput(0,{right:true});w.now=20;tab.__audit.loop(w.now);const before=tab.DUEL.engine.time;
 tab.document.hidden=true;tab.docEvents.visibilitychange();assert.equal(tab.DUEL.engine.paused,true);for(let i=0;i<30;i++){w.now+=100;tab.__audit.loop(w.now);}assert.equal(tab.DUEL.engine.time,before);assert.equal(Object.values(tab.__audit.getInput()[0]).some(Boolean),false);
 tab.document.hidden=false;tab.__audit.action('resume');const x=tab.DUEL.engine.fighters[0].x;for(let i=0;i<10;i++){w.now+=16.667;tab.__audit.loop(w.now);}assert.equal(tab.DUEL.engine.fighters[0].x,x);assert.ok(tab.DUEL.engine.time<before);
});
test('synthetic multitouch ownership, pointer cancellation, and lost capture release correctly',()=>{
 const w=new World(),tab=w.tab();tab.DUEL.start({mode:'local'});const make=(player,key)=>({dataset:{playerinput:String(player),input:key},handlers:{},classList:{add(){},remove(){}},addEventListener(name,fn){this.handlers[name]=fn;},setPointerCapture(){}});const left=make(0,'left'),right=make(1,'s0');tab.nodes.get('#app').querySelectorAll=()=>[left,right];tab.__audit.bindTouch();const ev=id=>({pointerId:id,preventDefault(){}});
 left.handlers.pointerdown(ev(1));right.handlers.pointerdown(ev(2));assert.equal(tab.__audit.getInput()[0].left,true);assert.equal(tab.__audit.getInput()[1].s0,true);left.handlers.pointerup(ev(2));assert.equal(tab.__audit.getInput()[0].left,true);right.handlers.pointercancel(ev(2));assert.equal(tab.__audit.getInput()[1].s0,false);left.handlers.lostpointercapture(ev(1));assert.equal(tab.__audit.getInput()[0].left,false);left.handlers.pointerdown(ev(3));assert.equal(tab.__audit.getInput()[0].left,true);
});
test('room match score synchronizes through first-to-two and guest-requested rematch',()=>{
 const w=new World(),{host,guest}=w.pair();host.__audit.action('roomStart');w.flush();let e=host.DUEL.engine;
 for(let n=0;n<2;n++){e.start();e.fighters[1].hp=0;e.step();assert.equal(e.score[0],n+1);e.phaseTime=0;e.step();}
 assert.equal(e.phase,'matchEnd');host.__audit.sendRoom({type:'snapshot',snapshot:e.snapshot()});w.flush();assert.equal(guest.DUEL.snapshot.phase,'matchEnd');assert.equal(guest.DUEL.snapshot.score[0],2);
 guest.__audit.action('rematch');w.flush();assert.equal(host.DUEL.engine.phase,'intro');assert.equal(host.DUEL.engine.score[0],0);assert.equal(host.DUEL.engine.score[1],0);assert.equal(host.DUEL.engine.round,1);host.__audit.sendRoom({type:'snapshot',snapshot:host.DUEL.engine.snapshot()});w.flush();assert.equal(guest.DUEL.snapshot.phase,'intro');assert.equal(guest.DUEL.snapshot.score[0],0);
});

test('accepted guest receives authoritative skill sounds once and respects mute',async()=>{const w=new World(),{host,guest}=w.pair();host.__audit.action('roomStart');w.flush();guest.setAudioContext(TestAudioContext);await guest.__audit.music.unlock();const packet={id:'event1',key:'lina_laguna',player:0};host.__audit.sendRoom({type:'snapshot',snapshot:host.DUEL.snapshot,sounds:[packet,{id:'event2',key:'block',player:1}]});w.flush();assert.equal(guest.DUEL.musicStatus.stats.played,2);host.__audit.sendRoom({type:'snapshot',snapshot:host.DUEL.snapshot,sounds:[packet]});w.flush();assert.equal(guest.DUEL.musicStatus.stats.played,2);assert.equal(guest.DUEL.musicStatus.stats.duplicates,1);guest.DUEL.state.sound=false;host.__audit.sendRoom({type:'snapshot',snapshot:host.DUEL.snapshot,sounds:[{id:'event3',key:'ko'}]});w.flush();assert.equal(guest.DUEL.musicStatus.stats.played,2);});
