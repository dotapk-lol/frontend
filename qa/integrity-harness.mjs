import {idbFixture} from './idb-fixture.mjs';
// Independent source-executing regression audit. Mock DOM/channel/gamepad APIs; not real browser or hardware QA.
import vm from 'node:vm';
import fs from 'node:fs';
import {DATA,heroes} from '../src/data.js';
import {Engine,FIXED_DT,formatCombatNumber} from '../src/engine.js';
const source=['net-version.js','cohort-data.js','cohort-combat.js','cohort-render.js','registry-data.js','catalog-data.js','rules-version.js','hero-registry.js','hero-catalog.js','compatibility.js','audio-score.js','audio-map.js','audio-synth.js','audio.js','official-music.js','mobile.js','music.js','net-quality.js','match-api.js','local-rooms.js','p2p.js'].map(f=>fs.readFileSync(new URL('../src/'+f,import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/export (const|class|function) /g,'$1 ')).join('\n')+'\nconst runtimeHeroes=Object.freeze([...heroes,...COHORT_DEFINITIONS]);\n'+fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
class Element {constructor(){this.style={};this.dataset={};this.classList={add(){},remove(){}};this.listeners={};this.tagName='DIV';this.value='';} querySelector(){return new Element();}querySelectorAll(){return [];}appendChild(){}remove(){}focus(){}getContext(){return new Proxy({},{get:(target,key)=>target[key]??(key==='createLinearGradient'?()=>({addColorStop(){}}):()=>{}),set:(target,key,value)=>(target[key]=value,true)});}addEventListener(n,fn){this.listeners[n]=fn;}setPointerCapture(){} }
export class World {
 constructor(){this.indexedDB=idbFixture();this.now=0;this.channels=[];this.queue=[];this.tabs=[];}
 flush(){let safety=0;while(this.queue.length){if(++safety>10000)throw Error('message storm');const {target,data}=this.queue.shift();if(!target.closed)target.onmessage?.({data});}}
 advance(ms){this.now+=ms;for(const tab of this.tabs)for(const fn of tab.intervals.values())fn();this.flush();}
 tab({viewport=null}={}){const world=this,events={},docEvents={},nodes=new Map(),intervals=new Map();let pads=[],timer=0;
 const document={hidden:false,querySelector(s){if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);},createElement(){return new Element();},addEventListener(n,fn){docEvents[n]=fn;},documentElement:{style:{setProperty(k,v){this[k]=v;}},setAttribute(k,v){this[k]=v;}}};
 const BroadcastChannel=class {constructor(name){this.name=name;this.closed=false;world.channels.push(this);}postMessage(data){for(const target of world.channels)if(target!==this&&!target.closed&&target.name===this.name)world.queue.push({target,data:structuredClone(data)});}close(){this.closed=true;}};
 if(viewport)viewport.addEventListener=(n,fn)=>{events['visual:'+n]=fn;};
 const win={visualViewport:viewport,BroadcastChannel,addEventListener(n,fn){events[n]=fn;}};
 const c={AbortController:globalThis.AbortController,indexedDB:world.indexedDB,crypto:globalThis.crypto,DATA,heroes,Engine,FIXED_DT,formatCombatNumber,window:win,document,BroadcastChannel,Image:class{},localStorage:{getItem(){return null;},setItem(){}},navigator:{getGamepads:()=>pads},location:{protocol:'https:'},performance:{now:()=>world.now},requestAnimationFrame(){},fetch:()=>Promise.resolve({ok:false}),setInterval:fn=>{intervals.set(++timer,fn);return timer;},clearInterval:id=>intervals.delete(id),setTimeout:()=>++timer,clearTimeout(){},console};
 vm.runInNewContext(source+'\nwindow.__audit={music,newP2P,connect,sendRoom,leaveRoom,gamepads,action,loop,pause,close,bindTouch,getInput:()=>input,getGuestInput:()=>roomGuestInput,getModal:()=>modal};',c);
 const tab={...win,events,docEvents,document,intervals,nodes,resize(width,height){win.innerWidth=width;win.innerHeight=height;events.resize?.();},setPads(v){pads=v;},setAudioContext(C){win.AudioContext=C;}};this.tabs.push(tab);return tab;
 }
 pair(){const host=this.tab(),guest=this.tab();host.__audit.connect('ABC123','host');guest.__audit.connect('ABC123','guest');guest.__audit.sendRoom({type:'hello',hero:3});this.flush();return {host,guest};}
}
