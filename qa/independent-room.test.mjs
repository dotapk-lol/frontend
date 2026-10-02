import {bundleApp} from '../scripts/bundle-app.mjs';
import {registryFixture} from './registry-fixture.mjs';
import {idbFixture} from './idb-fixture.mjs';
// Runs real app.js protocol/input handlers in Node VM with a DOM stub.
// This is application integration coverage, NOT browser/touch/visual evidence.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {Engine,FIXED_DT,formatCombatNumber} from '../src/engine.js';
import {DATA,heroes} from '../src/data.js';
const appSource=(await bundleApp({append:'window.QA={action,selection,startRoomMatch,sendRoom,leaveRoom,get input(){return input},get roomGuestInput(){return roomGuestInput}};'})).code;
function environment(){
 const channels=[],queue=[],indexedDB=idbFixture();
 class BC{constructor(name){this.name=name;this.closed=false;channels.push(this);}postMessage(data){for(const ch of channels)if(ch!==this&&!ch.closed&&ch.name===this.name)queue.push(()=>ch.onmessage?.({data:structuredClone(data)}));}close(){this.closed=true;}}
 const flush=async()=>{let safety=0;for(let turn=0;turn<100;turn++){while(queue.length){assert.ok(safety++<1000,'protocol loop bounded');queue.shift()();}await Promise.resolve();}};
 function page(fetcher=async()=>({ok:false})){
 const listeners={},docListeners={},timers=new Map();let seq=0;
 const noop=()=>{};const node=()=>({innerHTML:'',textContent:'',value:'',style:{},dataset:{},classList:{add:noop,remove:noop},querySelectorAll:()=>[],querySelector:()=>null,appendChild:noop,remove:noop,focus:noop,getContext:()=>({})});
 const app=node(),toast=node(),roomInput=node(),canvas=node();const nodes={'#app':app,'#toast':toast,'#roomInput':roomInput,'#arena':canvas,'#official-player':node(),'#official-status':node()};
 const document={querySelector:s=>nodes[s]||null,createElement:node,addEventListener:(k,fn)=>(docListeners[k]??=[]).push(fn),hidden:false,documentElement:{}};
 const context={structuredClone,indexedDB,crypto:globalThis.crypto,console,Engine,FIXED_DT,formatCombatNumber,DATA,heroes,document,location:{protocol:'http:'},navigator:{getGamepads:()=>[]},performance:{now:()=>0},localStorage:{getItem:()=>null,setItem:noop},Image:class{complete=false;naturalWidth=0;},fetch:fetcher,requestAnimationFrame:noop,clearTimeout:noop,setTimeout:()=>++seq,setInterval:fn=>{timers.set(++seq,fn);return seq;},clearInterval:id=>timers.delete(id),BroadcastChannel:BC,addEventListener:(k,fn)=>(listeners[k]??=[]).push(fn)};
 context.window=context;vm.createContext(context);vm.runInContext(appSource,context);
 return {window:context,D:context.DUEL,Q:context.QA,roomInput,fire:(k,event={})=>(listeners[k]||[]).forEach(f=>f(event)),hide:()=>{document.hidden=true;(docListeners.visibilitychange||[]).forEach(f=>f());}};
 }
 return {page,flush};
}
async function joined(){const env=environment(),a=env.page(),b=env.page();await a.D.createRoom();b.roomInput.value=a.D.room.code;await b.D.joinRoom();await env.flush();return {...env,a,b};}

test('room real handlers exchange hello/welcome and authoritative match snapshot',async()=>{
 const {a,b,flush}=await joined();assert.equal(a.D.room.connected,true);assert.equal(b.D.room.connected,true);assert.equal(a.D.room.player,0);assert.equal(b.D.room.player,1);
 a.Q.startRoomMatch();await flush();assert.ok(a.D.engine);assert.equal(b.D.engine,null);a.D.engine.start();a.D.engine.fighters[1].hp-=100;a.Q.sendRoom({type:'snapshot',snapshot:a.D.engine.snapshot()});await flush();assert.equal(b.D.snapshot.fighters[1].hp,a.D.engine.fighters[1].hp);
});
test('third participant is refused without disconnecting first two',async()=>{
 const {a,b,page,flush}=await joined(),c=page();c.roomInput.value=a.D.room.code;await c.D.joinRoom();await flush();assert.equal(c.D.room,null);assert.equal(a.D.room.connected,true);assert.equal(b.D.room.connected,true);
});
test('guest input reaches host, and guest blur releases it',async()=>{
 const {a,b,flush}=await joined();a.Q.startRoomMatch();await flush();b.Q.sendRoom({type:'input',input:{attack:true,right:true}});await flush();assert.equal(a.Q.roomGuestInput.attack,true);b.fire('blur');await flush();assert.deepEqual(Object.keys(a.Q.roomGuestInput),[]);
});
test('local focus loss clears both held inputs and pauses fight',async()=>{
 const {page}=environment(),a=page();a.D.start({mode:'local'}).start();a.D.setInput(0,{right:true});a.D.setInput(1,{attack:true});a.fire('blur');assert.equal(a.D.engine.paused,true);assert.equal(Object.keys(a.Q.input[0]).length,0);assert.equal(Object.keys(a.Q.input[1]).length,0);
});
test('host leave marks guest disconnected',async()=>{
 const {a,b,flush}=await joined();a.Q.startRoomMatch();await flush();a.Q.leaveRoom();await flush();assert.equal(a.D.room,null);assert.equal(b.D.room.connected,false);
});
test('guest rematch request resets host score and starts new guest match',async()=>{
 const {a,b,flush}=await joined();a.Q.startRoomMatch();await flush();a.D.engine.score=[2,0];b.Q.action('rematch');await flush();assert.deepEqual(Array.from(a.D.engine.score),[0,0]);assert.equal(a.D.engine.round,1);assert.equal(b.D.engine,null);
});
test('room pause/resume synchronizes host pause state',async()=>{
 const {a,b,flush}=await joined();a.Q.startRoomMatch();await flush();b.Q.action('pause');await flush();assert.equal(a.D.engine.paused,true);b.Q.action('resume');await flush();assert.equal(a.D.engine.paused,false);
});
test('leaving room mode for local play discards stale room connection',async()=>{
 const {a,b,flush}=await joined();a.Q.action('close');a.D.state.mode='local';a.Q.selection();a.D.start({mode:'local'});await flush();assert.equal(a.D.room,null,'local game must not retain room transport/input routing');
});
test('guest departure clears held remote input rather than leaving sticky keys',async()=>{
 const {a,b,flush}=await joined();a.Q.startRoomMatch();await flush();b.Q.sendRoom({type:'input',input:{right:true,attack:true}});await flush();b.Q.leaveRoom();await flush();assert.equal(a.D.engine,null);assert.equal(a.D.state.screen,'select');assert.deepEqual(Object.keys(a.Q.roomGuestInput),[]);
});

test('room rejects input and pause messages from an unselected peer',async()=>{
 const {a,b,page,flush}=await joined(),c=page();a.Q.startRoomMatch();await flush();const extra=new c.window.BroadcastChannel('dota-duel-v2-'+a.D.room.reservation.id);extra.postMessage({type:'input',input:{attack:true},sender:'not-the-selected-guest'});extra.postMessage({type:'pause',value:true,sender:'not-the-selected-guest'});await flush();assert.equal(a.D.engine.paused,false);assert.equal(a.Q.roomGuestInput.attack,undefined);
});
test('host accepts a replacement guest after the previous guest has left',async()=>{
 const {a,b,page,flush}=await joined();b.Q.leaveRoom();await flush();assert.equal(a.D.room.connected,false);const c=page();c.roomInput.value=a.D.room.code;await c.D.joinRoom();await flush();assert.ok(c.D.room?.connected);assert.ok(a.D.room.connected);
});
test('closing room pause dialog resumes both peers consistently',async()=>{
 const {a,b,flush}=await joined();a.Q.startRoomMatch();await flush();a.Q.action('pause');await flush();assert.equal(a.D.engine.paused,true);a.Q.action('close');await flush();assert.equal(a.D.engine.paused,false,'close must not hide the only explanation for paused game');
});


test('BC app creates one host-only server match and mirrors ID to observer without guest HTTP',async()=>{const {page,flush}=environment(),calls=[];const fetcher=async(url,opt)=>{calls.push({url,body:JSON.parse(opt.body||'{}')});return {ok:true,json:async()=>url.endsWith('/registry')?registryFixture():url.endsWith('/sessions')?{playerId:'a'.repeat(64),token:'b'.repeat(64)}:{id:'c'.repeat(64),status:url.endsWith('/results')?'aborted':'in_progress',transport:'broadcastchannel',trust:'client_reported',participantKinds:['local_slot','local_slot'],reporterPlayerId:'a'.repeat(64)}};};let guestHTTP=0;const a=page(fetcher),b=page(async(url)=>{if(!url.includes('/api/'))return {ok:false};guestHTTP++;throw Error('guest HTTP forbidden');});await a.D.createRoom();b.roomInput.value=a.D.room.code;await b.D.joinRoom();await flush();a.Q.startRoomMatch();await flush();assert.equal(a.D.record.matchId,'c'.repeat(64));assert.equal(b.D.record.matchId,a.D.record.matchId);assert.equal(b.D.record.observer,true);assert.equal(calls.filter(c=>c.url.endsWith('/matches/local')).length,1);assert.equal(calls.find(c=>c.url.endsWith('/matches/local')).body.transport,'broadcastchannel');b.Q.leaveRoom();await flush();assert.equal(calls.filter(c=>c.url.endsWith('/results')).length,1);assert.equal(calls.at(-1).body.outcome,'aborted');assert.equal(guestHTTP,0);});
