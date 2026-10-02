import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {visualBounds,protectBattleGestures,displayMode,toggleGameFullscreen,combatLabelLayout,arenaViewport} from '../src/mobile.js';
import {Engine,formatCombatNumber} from '../src/engine.js';import {heroes} from '../src/data.js';import {World} from './integrity-harness.mjs';

test('combat gesture guard is nonpassive and scoped; menus and toolbar activation remain native',()=>{
 const calls=[],surface={addEventListener:(name,fn,options)=>calls.push({name,fn,options})};let playing=true;
 protectBattleGestures(surface,()=>playing);protectBattleGestures(surface,()=>playing);assert.equal(calls.length,7,'rebinding does not duplicate handlers');
 for(const name of ['touchstart','touchmove','touchend','gesturestart','gesturechange','gestureend']){
  const row=calls.find(x=>x.name===name);assert.deepEqual(row.options,{capture:true,passive:false});let blocked=0;
  row.fn({cancelable:true,target:{closest:()=>null},preventDefault(){blocked++;}});assert.equal(blocked,1);
  for(const exempt of ['.battle-tools','.overlay'])row.fn({cancelable:true,target:{closest:q=>q===exempt?{}:null},preventDefault(){blocked++;}});assert.equal(blocked,1);
  playing=false;row.fn({preventDefault(){blocked++;}});playing=true;assert.equal(blocked,1);
 }
});
test('visual viewport compensation fits a pinched/panned arena and clears offsets after recovery',()=>{
 const win={innerWidth:844,innerHeight:390,visualViewport:{width:422,height:150,scale:2,offsetLeft:117,offsetTop:42}};
 const v=visualBounds(win);assert.deepEqual(v,{width:422,height:150,scale:2,left:117,top:42,gameWidth:844,gameHeight:300});assert.equal(v.gameWidth/v.scale,v.width);assert.equal(v.gameHeight/v.scale,v.height);
 Object.assign(win.visualViewport,{width:844,height:300,scale:1,offsetLeft:0,offsetTop:0});const restored=visualBounds(win);assert.equal(restored.left,0);assert.equal(restored.top,0);assert.equal(restored.scale,1);assert.equal(restored.height,300,'toolbar-reduced height wins over layout height');
});
test('application visualViewport scroll cancels held input, pauses and restores CSS geometry without changing browser zoom',()=>{
 const viewport={width:844,height:390,scale:1,offsetLeft:0,offsetTop:0},t=new World().tab({viewport});t.resize(844,390);t.DUEL.start({mode:'cpu'});t.events.keydown({code:'KeyD',target:{},preventDefault(){}});
 Object.assign(viewport,{width:422,height:160,scale:2,offsetLeft:90,offsetTop:35});t.events['visual:scroll']();assert(t.DUEL.engine.paused);assert(!Object.values(t.__audit.getInput()[0]).some(Boolean));const style=t.document.documentElement.style;assert.equal(style['--view-left'],'90px');assert.equal(style['--game-scale'],'0.5');assert.equal(style['--game-height'],'320px');assert.equal(viewport.scale,2);
 Object.assign(viewport,{width:844,height:280,scale:1,offsetLeft:0,offsetTop:0});t.events['visual:resize']();assert.equal(style['--view-left'],'0px');assert.equal(style['--view-top'],'0px');assert.equal(style['--game-scale'],'1');assert.equal(style['--view-height'],'280px');assert(t.DUEL.engine.paused,'recovery requires explicit resume');
});
test('iOS standalone and prefixed fullscreen have explicit state; successful promise alone is not success',async()=>{
 const messages=[],standalone={navigator:{standalone:true}};assert.equal(displayMode({},standalone),'standalone');assert((await toggleGameFullscreen({documentElement:{}},{},m=>messages.push(m),standalone)).standalone);
 const doc={documentElement:{webkitRequestFullscreen(){assert.equal(this,doc.documentElement);doc.webkitFullscreenElement=this;}},webkitExitFullscreen(){assert.equal(this,doc);doc.webkitFullscreenElement=null;}};
 assert((await toggleGameFullscreen(doc,{},()=>{},{})).fullscreen);assert.equal(displayMode(doc,{}),'fullscreen');assert.equal((await toggleGameFullscreen(doc,{},()=>{},{})).fullscreen,false);
 assert.equal((await toggleGameFullscreen({documentElement:{requestFullscreen:async()=>{}}},{},m=>messages.push(m),{})).reason,'denied');
});
test('damage/heal text has one decimal at most and preserves exact damage arithmetic',()=>{
 assert.equal(formatCombatNumber(4.800000000000001),'4.8');assert.equal(formatCombatNumber(12),'12');assert.equal(formatCombatNumber(.025),'<0.1');assert.equal(formatCombatNumber(NaN),'0');
 const e=new Engine(heroes,[0,3]).start(),[a,b]=e.fighters,hp=b.hp;e.hit(a,b,4.800000000000001,{damage_type:'pure'},{dot:true});assert.equal(b.hp,hp-4.800000000000001);assert.equal(e.effects.find(x=>x.type==='text').text,'4.8');e.hit(a,b,4.8,{damage_type:'pure'},{dot:true});const text=e.effects.filter(x=>x.type==='text');assert.equal(text.length,1);assert.equal(text[0].text,'9.6');assert(Math.abs(b.hp-(hp-9.6))<1e-9);
 e.heal(b,1.234);assert(e.effects.some(x=>x.text==='+1.2'));
});
test('continuous text effects are capped per fighter without removing gameplay damage or status',()=>{
 const e=new Engine(heroes,[0,3]).start();for(let n=0;n<40;n++){for(const x of e.effects)if(x.type==='text')x.life=.3;e.fx('text',e.fighters[n%2].x,180,'#fff',{amount:4.8,kind:'damage',target:n%2,life:.7,maxLife:.7});}
 const labels=e.effects.filter(x=>x.type==='text');assert.equal(labels.length,6);for(const target of [0,1])assert.equal(labels.filter(x=>x.target===target).length,3);
});
test('crowded damage and combo labels stay separated below HUD in short landscapes',()=>{
 for(const [w,h]of [[667,375],[667,250],[740,240],[844,280],[1024,500]]){
  const view=arenaViewport(w,h,{},154),effects=Array.from({length:20},(_,i)=>({text:i%2?'4.8':'8 HITS',x:600+i%2*2,y:250,life:.6,maxLife:.7,color:'#fff'})),labels=combatLabelLayout(effects,view,w,h);
  assert(labels.length>0&&labels.length<=6);for(const a of labels){assert(a.box.top>=74);assert(a.box.left>=8&&a.box.right<=w-8);assert(a.box.bottom<h);for(const b of labels)if(a!==b)assert(!(a.box.left<b.box.right&&a.box.right>b.box.left&&a.box.top<b.box.bottom&&a.box.bottom>b.box.top));}
 }
});
test('install manifest and Apple metadata refer to actual correctly sized opaque PNG icons',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url)));assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');assert.equal(manifest.orientation,'landscape');
 for(const icon of [...manifest.icons,{src:'assets/app-icon-180.png',sizes:'180x180'}]){const png=fs.readFileSync(new URL('../'+icon.src,import.meta.url));assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`,icon.sizes);assert.equal(png[25],2,'opaque RGB image');}
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');assert.match(html,/apple-mobile-web-app-capable" content="yes/);assert.match(html,/rel="manifest"/);assert.match(html,/rel="apple-touch-icon"/);assert(!/user-scalable=no|maximum-scale=1/.test(html),'menus retain user zoom');
});
