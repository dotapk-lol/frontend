import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {OfficialAlbumPlayer,OFFICIAL_ALBUM,officialMusicLayout} from '../src/official-music.js';
import {ArcadeAudio} from '../src/audio.js';
import {TestAudioContext} from './audio-context.mjs';

function setup({deferred=false,protocol='https:'}={}){
 const children=[],players=[],timers=new Set();let resolve;
 const bounds={width:200,height:200,left:632,top:60,right:832,bottom:260};
 const root={appendChild(f){children.push(f);}};
 const document={hidden:false,createElement(){return {attrs:{},setAttribute(k,v){this.attrs[k]=v;},getBoundingClientRect(){return {...bounds};},remove(){const i=children.indexOf(this);if(i>=0)children.splice(i,1);}};}};
 const window={innerWidth:844,innerHeight:390,location:{protocol,origin:'https://example.test'}};
 class Player{constructor(frame,{events}){this.frame=frame;this.events=events;this.time=0;this.duration=180;this.calls=[];players.push(this);}ready(){this.events.onReady({target:this});}setVolume(v){this.volume=v;}mute(){this.muted=true;}unMute(){this.muted=false;}playVideo(){this.calls.push('play');}pauseVideo(){this.calls.push('pause');}destroy(){this.calls.push('destroy');this.frame.remove();}getCurrentTime(){return this.time;}getDuration(){return this.duration;}state(n){this.events.onStateChange({data:n});}}
 const api=deferred?new Promise(r=>resolve=r):Promise.resolve({Player});
 const p=new OfficialAlbumPlayer({root,document,window,apiLoader:()=>api,interval:fn=>{timers.add(fn);return fn;},cancelInterval:fn=>timers.delete(fn)});
 return {p,children,players,timers,bounds,window,resolve:()=>resolve({Player}),async mount(){p.configure(true);p.setAvailable(true);await Promise.resolve();players[0]?.ready();return players[0];}};
}

test('official video preloads without autoplay and retains visible standard controls and matching single-video loop',async()=>{
 const x=setup(),player=await x.mount(),f=x.children[0],url=new URL(f.src);
 assert.equal(x.children.length,1);assert.equal(url.hostname,'www.youtube.com');assert.equal(url.pathname,'/embed/'+OFFICIAL_ALBUM.videoId);
 assert.equal(url.searchParams.get('loop'),'1');assert.equal(url.searchParams.get('playlist'),OFFICIAL_ALBUM.videoId);assert.equal(url.searchParams.get('autoplay'),'0');assert.equal(url.searchParams.get('controls'),'1');assert.equal(url.searchParams.get('origin'),'https://example.test');assert.equal(url.searchParams.get('playsinline'),'1');assert.equal(f.attrs.referrerpolicy,'strict-origin-when-cross-origin');assert.equal(player.calls.length,0);assert.equal(x.p.status().playing,false);assert.equal(x.p.status().visible,true);
 x.p.configure(true);x.p.setAvailable(true);assert.equal(x.children.length,1);
});
test('click request is not reported as successful playback until state and time advance; volume and stop are independent',async()=>{
 const x=setup(),player=await x.mount();x.p.play();assert.deepEqual(player.calls,['play']);assert.equal(x.p.status().playing,false);player.state(1);assert.equal(x.p.status().playing,false);player.time=.4;x.p.observe();assert.equal(x.p.status().playing,true);
 x.p.setVolume(.12);assert.equal(player.volume,12);x.p.setVolume(0);assert(player.muted);x.p.setVolume(.8);assert(!player.muted);assert.equal(player.volume,80);x.p.stop();assert.equal(x.p.status().playing,false);assert.equal(player.calls.at(-1),'pause');
});
test('native play and two observed progress wraps are tracked without iframe recreation or scripted seek',async()=>{
 const x=setup(),player=await x.mount();player.state(1);
 for(let i=0;i<2;i++){player.time=179.8;x.p.observe();player.state(0);player.time=.2;player.state(1);x.p.observe();}
 assert.equal(x.p.status().observedWraps,2);assert.equal(x.children.length,1);assert.equal(x.players.length,1);assert.equal(player.calls.length,0);
 assert.equal(x.p.status().events.filter(e=>e.type==='observed-wrap').length,2);
});
test('hidden or offscreen player pauses; return requires explicit play and never creates a second instance',async()=>{
 const x=setup(),player=await x.mount();x.p.play();player.state(1);player.time=2;x.p.observe();x.p.lifecycle({hidden:true});assert.equal(x.p.status().playing,false);assert.equal(player.calls.at(-1),'pause');
 const calls=player.calls.length;x.p.lifecycle({hidden:false});assert.equal(player.calls.length,calls);x.p.play();player.state(1);x.bounds.right=850;x.p.observe();assert.equal(player.calls.at(-1),'pause');assert.equal(x.p.status().playing,false);assert.equal(x.p.play(),false);assert.equal(x.players.length,1);x.bounds.right=832;x.window.visualViewport={offsetLeft:0,offsetTop:0,width:700,height:390};assert.equal(x.p.visible(),false);
});
test('player below 200px cannot play; loss of layout space destroys the player and pending callbacks cannot revive it',async()=>{
 const x=setup(),player=await x.mount();x.bounds.width=199;assert.equal(x.p.play(),false);x.bounds.width=200;x.p.play();x.p.setAvailable(false);assert.equal(x.children.length,0);assert.equal(x.timers.size,0);player.ready();player.state(1);assert.equal(x.p.status().playerLoaded,false);assert.equal(x.p.state,'layout-unavailable');
 x.p.setAvailable(true);await Promise.resolve();assert.equal(x.children.length,1);assert.equal(x.players.length,2);assert.equal(x.p.status().playing,false);
});
test('API-load races, disable, retry and page-away cannot mount duplicate or late players',async()=>{
 const x=setup({deferred:true});x.p.configure(true);x.p.setAvailable(true);x.p.configure(false);x.resolve();await Promise.resolve();assert.equal(x.children.length,0);
 x.p.configure(true);await Promise.resolve();x.players[0].ready();x.p.retry();await Promise.resolve();assert.equal(x.children.length,1);assert.equal(x.timers.size,1);x.players[1].ready();x.p.lifecycle({pageAway:true});assert.equal(x.players[1].calls.at(-1),'pause');x.p.configure(false);assert.equal(x.children.length,0);assert.equal(x.timers.size,0);
});
test('autoplay denial and embedding restrictions are surfaced without reporting playback or bypassing them',async()=>{
 const x=setup(),player=await x.mount();x.p.play();player.events.onAutoplayBlocked();assert.equal(x.p.state,'blocked');assert.equal(x.p.status().playing,false);
 for(const code of [100,101,150,153]){player.events.onError({data:code});assert.match(x.p.status().error,new RegExp(String(code)));assert.equal(x.p.status().playing,false);}
 assert.equal(x.players.length,1);
});
test('a missing iframe ready event times out; file origins report a concrete limitation',async()=>{
 const x=setup();x.p.configure(true);x.p.setAvailable(true);await Promise.resolve();x.p.readyDeadline=1;x.p.observe();assert.equal(x.p.state,'error');assert.match(x.p.error,/超时/);assert.equal(x.p.status().playing,false);
 const local=setup({protocol:'file:'});await local.mount();assert.equal(local.children.length,0);assert.match(local.p.error,/网站/);
});
test('844x390 splits game and a complete 200px video; safe-area and truly small screens are handled explicitly',()=>{
 const l=officialMusicLayout(844,390);assert.equal(l.mode,'side');assert.equal(l.gameWidth,620);assert.equal(l.rail,224);assert.equal(l.gameHeight,390);assert.equal(l.gameWidth+l.rail,844);
 const notch=officialMusicLayout(844,390,{left:44,right:44,bottom:21});assert.equal(notch.available,true);assert.equal(notch.gameWidth,532);assert.equal(notch.gameHeight,369);
 assert.equal(officialMusicLayout(667,375).available,false);assert.equal(officialMusicLayout(844,300).available,false);assert.equal(officialMusicLayout(390,844).mode,'bottom');assert.equal(officialMusicLayout(1440,900).rail,344);
});
test('runtime external music mode never fetches or plays the rejected original draft BGM',async()=>{
 let requests=0;const c=new TestAudioContext(),a=new ArcadeAudio({internalMusic:false,contextFactory:()=>c,fetcher:async()=>{requests++;throw Error('must not load');}});await a.unlock();a.setScene('battle');await a.sync();assert.equal(requests,0);assert.equal(a.musicNodes.size,0);assert.equal(a.playEffect('lina_laguna'),true);a.dispose();
});
test('UI keeps one external player, actual music/SFX controls, and no Bandcamp or file selection',()=>{
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8'),css=fs.readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
 assert.equal(html.match(/id="official-player"/g).length,1);assert.match(app,/internalMusic:false/);assert.doesNotMatch(app+html,/Bandcamp|bandcamp|type="file"|id="music-file"/);assert.match(app,/id="music-volume"/);assert.match(app,/id="sfx-volume"/);assert.match(css,/min-height:200px/);assert.match(css,/right:var\(--duel-right-reserve\)/);
});
