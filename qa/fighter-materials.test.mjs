import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {createImageLoader} from '../src/image-loader.js';
import {createFighterMaterials} from '../src/fighter-materials.js';
import {FIGHTER_SPRITES} from '../src/fighter-sprites.js';
import {runtimeHeroes} from '../src/runtime-heroes.js';
import {ACTIVE_ROSTER,lookupRuntimeHero} from '../src/hero-registry.js';
const tick=()=>new Promise(r=>setTimeout(r,5));
function fakeImages(plan){const calls=[],attempts=new Map();class FakeImage{naturalWidth=0;naturalHeight=0;complete=false;set src(value){this.url=value;if(!value)return;calls.push(value);const count=(attempts.get(value)||0)+1;attempts.set(value,count);const mode=this.mode=plan(value,count);queueMicrotask(()=>{if(mode==='transport')this.onerror?.();else if(mode!=='hang'){this.naturalWidth=200;this.naturalHeight=220;this.complete=true;this.onload?.();}});}async decode(){if(this.mode==='decode')throw Error('decode failed');if(this.mode==='decodeHang')return new Promise(()=>{});}}
 return {ImageClass:FakeImage,calls};}
const loaderFor=f=>createImageLoader({...f,timeoutMs:15,slowMs:10,loadTimeoutMs:50,retryDelayMs:1});
const sprites={a:{primary:{src:'sheet.png',frames:[[0,0,20,30,10,29]],referenceHeight:30},fallback:{src:'backup.png',frame:[0,0,20,30,10,29],referenceHeight:30}},b:{primary:{src:'b.webp'},fallback:{src:'b.png'}}};
test('loads and decodes only the selected primary; idle backup preserves pivot',async()=>{const f=fakeImages(()=> 'ok'),loader=loaderFor(f),m=createFighterMaterials({sprites,loader});m.select(['a']);await tick();assert.equal(m.fighter('a').status,'ready');assert.deepEqual(f.calls,['sheet.png']);assert.deepEqual(m.fighter('a').frame,[0,0,20,30,10,29]);m.select(['b']);await tick();assert.deepEqual(loader.info().map(i=>i.src),['b.webp']);});
test('load and decode failures get two attempts, then transparent PNG succeeds',async()=>{for(const reason of ['transport','decode','hang','decodeHang']){const f=fakeImages(src=>src.startsWith('sheet')?reason:'ok'),loader=loaderFor(f),m=createFighterMaterials({sprites,loader});m.select(['a']);await loader.load('sheet.png').promise;await tick();assert.equal(m.fighter('a').status,'fallback',reason);assert.equal(loader.status('sheet.png').attempts,reason==='hang'?1:2);assert.equal(f.calls.length,reason==='hang'?2:3);assert.deepEqual(m.fighter('a').frame,[0,0,20,30,10,29]);}});
test('primary and PNG failure stays explicit without retry storms, then user retry recovers',async()=>{let fail=true;const f=fakeImages(()=>fail?'transport':'ok'),loader=loaderFor(f),m=createFighterMaterials({sprites,loader});m.select(['a']);await loader.load('sheet.png').promise;await loader.load('backup.png').promise;assert.equal(m.fighter('a').status,'failed');for(let i=0;i<20;i++)assert.equal(m.fighter('a').image,null);assert.equal(f.calls.length,4);fail=false;m.retry();await tick();assert.equal(m.fighter('a').status,'ready');assert.equal(f.calls.length,6);});
test('PNG-only recovery is available while primary still fails',async()=>{let backupOK=false;const f=fakeImages(src=>src.startsWith('backup')&&backupOK?'ok':'transport'),loader=loaderFor(f),m=createFighterMaterials({sprites,loader});m.select(['a']);await loader.load('sheet.png').promise;await loader.load('backup.png').promise;assert.equal(m.fighter('a').status,'failed');backupOK=true;m.retry();await loader.load('sheet.png').promise;await tick();assert.equal(m.fighter('a').status,'fallback');assert.equal(loader.status('sheet.png').attempts,2);});
test('transient decode failure retries the stable URL and avoids PNG',async()=>{const f=fakeImages((src,count)=>src==='sheet.png'&&count===1?'decode':'ok'),loader=loaderFor(f),m=createFighterMaterials({sprites,loader});m.select(['a']);await loader.load('sheet.png').promise;assert.equal(m.fighter('a').status,'ready');assert.deepEqual(f.calls,['sheet.png','sheet.png']);});
test('late decode from a released selection cannot retain or revive a large image',async()=>{const f=fakeImages(src=>src.startsWith('sheet')?'decodeHang':'ok'),loader=loaderFor(f),m=createFighterMaterials({sprites,loader});m.select(['a']);const released=loader.load('sheet.png');m.select(['b']);assert.equal((await released.promise).status,'released');await tick();assert.deepEqual(loader.info().map(i=>i.src),['b.webp']);assert.equal(m.fighter('b').status,'ready');});
test('all 22 heroes have packaged primary and transparent PNG fallback with valid alpha and frames',()=>{
 const rows=ACTIVE_ROSTER.heroIds.map(id=>{const h=lookupRuntimeHero(runtimeHeroes,id),s=FIGHTER_SPRITES[h.id];assert(s,h.id);for(const src of [h.portrait,h.render,...h.abilities.map(a=>a.icon),s.primary.src,s.fallback.src]){assert(fs.existsSync(src),src);assert(fs.existsSync('dist/client/'+src),'packaged '+src);assert(fs.readFileSync(src).equals(fs.readFileSync('dist/client/'+src)),'identical packaged bytes '+src);}assert(s.fallback.src.endsWith('.png'));return {id:h.id,...s};});
 assert.equal(rows.length,22);
 const py=`import json,sys\nfrom PIL import Image\nfor r in json.load(sys.stdin):\n for kind in ['primary','fallback']:\n  p=r[kind]; im=Image.open(p['src']).convert('RGBA'); a=im.getchannel('A'); assert a.getextrema()[0]<255 and a.getextrema()[1]>0, r['id']\n  for f in p.get('frames',[]):\n   x,y,w,h,*_=f; assert w>0 and h>0 and x>=0 and y>=0 and x+w<=im.width and y+h<=im.height\n  if kind=='fallback' and 'frame' in p: assert list(im.size)==p['frame'][2:4]\nprint('22 transparent primary/PNG pairs verified')\n`;
 assert.match(execFileSync(process.env.PYTHON||'python3',['-c',py],{input:JSON.stringify(rows),encoding:'utf8'}),/22 transparent/);
 const manifest=JSON.parse(fs.readFileSync('dist/client/build-manifest.json')),code=fs.readFileSync('dist/client/'+manifest.entry.script,'utf8');
 for(const row of rows){assert(code.includes(row.primary.src));assert(code.includes(row.fallback.src));}
 assert.doesNotMatch(fs.readFileSync('src/app.js','utf8'),/h\.render\|\|h\.portrait|Object\.values\(a\.sheets\)/);
 assert.equal(fs.readFileSync('dist/client/src/data.js','utf8'),fs.readFileSync('src/data.js','utf8'));
});

test('offline release embeds bootstrap and one parseable app script without replacement-token corruption',()=>{const html=fs.readFileSync('release/DOTA_DUEL_22.html','utf8');assert.equal((html.match(/<script\b/gi)||[]).length,2);assert.equal((html.match(/<\/script\s*>/gi)||[]).length,2);assert.doesNotMatch(html,/<script[^>]*\bsrc=/);const code=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];new vm.Script(code);for(const id of ACTIVE_ROSTER.heroIds){const h=lookupRuntimeHero(runtimeHeroes,id),s=FIGHTER_SPRITES[h.id];for(const src of [s.primary.src,s.fallback.src])assert(code.includes('"'+src+'": "data:image/'),'inline fighter '+src);}assert.doesNotMatch(code,/fetch\(["']assets\/atlas\.json/);});

function controlledImages(){const calls=[],cancelled=[],instances=[];class ImageClass{
 constructor(){this.complete=false;this.naturalWidth=0;this.naturalHeight=0;instances.push(this);}
 set src(value){if(!value&&this.url)cancelled.push(this.url);this.url=value;if(value)calls.push(value);}get src(){return this.url;}
 decode(){return Promise.resolve();}loaded(){this.complete=true;this.naturalWidth=200;this.naturalHeight=220;this.onload?.();}
}return {ImageClass,calls,cancelled,instances};}
function clock(){let now=0,id=0;const timers=new Map();return {timers,schedule(fn,ms){const key=++id;timers.set(key,{fn,at:now+ms});return key;},cancel(key){timers.delete(key);},advance(ms){const end=now+ms;for(;;){const due=[...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!due)break;now=due[1].at;timers.delete(due[0]);due[1].fn();}now=end;}};}
test('soft wait keeps the original transfer; selected PNG recovers and late sheet becomes ready',async()=>{
 const f=controlledImages(),c=clock(),loader=createImageLoader({...f,schedule:c.schedule,cancel:c.cancel}),m=createFighterMaterials({sprites,loader});m.select(['a']);const primary=f.instances[0];
 c.advance(8000);assert.equal(loader.status('sheet.png').slow,true);assert.deepEqual(f.calls,['sheet.png','backup.png']);assert.deepEqual(f.cancelled,[]);assert.equal(primary.src,'sheet.png');
 f.instances[1].loaded();await tick();assert.equal(m.fighter('a').status,'fallback');for(let i=0;i<50;i++)m.retry();assert.equal(f.calls.length,2);
 c.advance(52000);primary.loaded();await tick();assert.equal(m.fighter('a').status,'ready');assert.deepEqual(f.cancelled,[]);assert.equal(loader.status('sheet.png').attempts,1);assert.equal(c.timers.size,0);
});
test('shared slow sheets and repeated retry/select controls create one request per selected URL',async()=>{
 const f=controlledImages(),c=clock(),shared={...sprites,a2:{...sprites.a,fallback:{src:'backup2.png'}}},loader=createImageLoader({...f,schedule:c.schedule,cancel:c.cancel}),m=createFighterMaterials({sprites:shared,loader});
 m.select(['a','a2']);for(let i=0;i<30;i++){m.select(['a','a2']);m.retry();}assert.deepEqual(f.calls,['sheet.png']);c.advance(8000);for(let i=0;i<30;i++)m.retry();
 assert.deepEqual(f.calls,['sheet.png','backup.png','backup2.png']);assert.equal(loader.info().length,3);assert.equal(f.instances.length,3);assert(f.calls.every(url=>!url.includes('?')));
 m.select([]);await tick();assert.equal(loader.info().length,0);assert.equal(c.timers.size,0);assert.equal(f.cancelled.length,3);
});
test('load hard deadline is finite and never auto-restarts a timed-out body; manual retry stays single-flight',async()=>{
 const f=controlledImages(),c=clock(),loader=createImageLoader({...f,loadTimeoutMs:100,slowMs:10,schedule:c.schedule,cancel:c.cancel});const old=loader.load('slow.png');c.advance(100);
 assert.equal((await old.promise).status,'failed');assert.equal(old.attempts,1);assert.equal(old.image,null);assert.equal(f.calls.length,1);assert.equal(c.timers.size,0);
 const retry=loader.retry('slow.png');for(let i=0;i<50;i++)assert.equal(loader.retry('slow.png'),retry);assert.deepEqual(f.calls,['slow.png','slow.png']);f.instances[1].loaded();await tick();assert.equal(retry.status,'ready');assert.equal(c.timers.size,0);
});
test('leaving a slow selection cancels retained callbacks, timers and backup starts without reviving old images',async()=>{
 const f=controlledImages(),c=clock(),loader=createImageLoader({...f,schedule:c.schedule,cancel:c.cancel}),m=createFighterMaterials({sprites,loader});m.select(['a']);c.advance(8000);const old=loader.load('sheet.png'),late=f.instances[0].onload;
 m.select(['b']);assert.equal((await old.promise).status,'released');assert.equal(old.image,null);late();await tick();assert.deepEqual(loader.info().map(x=>x.src),['b.webp']);assert.deepEqual(f.calls,['sheet.png','backup.png','b.webp']);
 f.instances.at(-1).loaded();await tick();assert.equal(m.fighter('b').status,'ready');assert.equal(c.timers.size,0);
});

test('released ready images drop native references and completed records cannot remain usable',async()=>{
 const f=controlledImages(),c=clock(),loader=createImageLoader({...f,schedule:c.schedule,cancel:c.cancel});const record=loader.load('ready.png');f.instances[0].loaded();await record.promise;assert.equal(record.status,'ready');loader.retain([]);assert.equal(record.status,'released');assert.equal(record.image,null);assert.equal(loader.ready('ready.png'),null);assert.equal(loader.info().length,0);assert.equal(c.timers.size,0);
});
