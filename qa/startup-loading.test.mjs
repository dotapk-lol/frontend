// DOM/clock fixtures prove startup transitions, not browser paint or iOS behavior.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const code=html.match(/<script id="startup-bootstrap">([\s\S]*?)<\/script>/)[1];
function fixture({cookie='',storage=null,blocked=false,offline=false}={}){
 const nodes=Object.fromEntries(['startup-loading','startup-progress','startup-status','startup-retry','startup-style'].map(id=>[id,{id,hidden:id==='startup-retry',attrs:{},tagName:id==='startup-style'?(offline?'STYLE':'LINK'):'DIV',setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];delete this[k];},remove(){this.removed=true;}}]));
 const events={},frames=[],timers=new Map();let reloads=0,next=0;
 const document={getElementById:id=>nodes[id],get cookie(){if(blocked)throw Error('cookies unavailable');return cookie;}};
 const ctx={document,localStorage:{getItem(){if(blocked)throw Error('storage unavailable');return storage;}},location:{reload(){reloads++;}},addEventListener(k,f){(events[k]??=[]).push(f);},removeEventListener(k,f){events[k]=(events[k]||[]).filter(x=>x!==f);},requestAnimationFrame:f=>frames.push(f),setTimeout(f,ms){timers.set(++next,{f,ms});return next;},clearTimeout:id=>timers.delete(id)};
 ctx.window=ctx;const realmWindow=vm.runInNewContext(code+'\nwindow;',ctx);
 return {ctx,nodes,timers,events,boot:ctx.DOTA_STARTUP,get reloads(){return reloads;},frame(){frames.splice(0).forEach(f=>f());},timeout(){[...timers.values()].forEach(x=>x.f());},emit(k,e){(events[k]||[]).forEach(f=>f({...e,target:e.target===ctx?realmWindow:e.target}));}};
}
test('inline markup, styles and bootstrap precede every external rendering dependency',()=>{
 const positions=['id="startup-critical"','id="startup-loading"','id="startup-bootstrap"','id="startup-style"','id="app"','id="startup-app"'].map(s=>html.indexOf(s));
 assert(positions.every((x,i)=>x>=0&&(!i||x>positions[i-1])));
 assert.match(html,/<progress id="startup-progress" max="2" aria-label="[^"]+"><\/progress>/);
 assert.match(html,/<link id="startup-style"[^>]+media="print"[^>]+this.media='all'/);
 assert(!/<(?:link|script)[^>]+(?:href|src)="https:\/\//.test(html));
 assert(Buffer.byteLength(code)<5000);
 assert.doesNotMatch(fs.readFileSync('src/style.css','utf8'),/@import|fonts\.googleapis/);
 assert.doesNotMatch(code,/fetch\(|new Image|setInterval|Math\.random/);
});
test('cold startup is indeterminate and time never invents completion',()=>{const f=fixture();assert.equal(f.nodes['startup-progress'].value,undefined);assert.equal(f.boot.info().completed,0);assert.equal([...f.timers.values()][0].ms,45000);f.timeout();assert.equal(f.boot.info().phase,'failed');assert.equal(f.boot.info().completed,0);assert.equal(f.nodes['startup-retry'].hidden,false);assert.equal(f.nodes['startup-progress'].hidden,true);assert.equal(f.reloads,0);});
for(const first of ['stylesReady','appReady'])test(first+' alone keeps startup overlay until both real tasks finish',()=>{const f=fixture();f.boot[first]();assert.equal(f.nodes['startup-progress'].value,1);assert.equal(f.boot.info().completed,1);assert.equal(f.nodes['startup-loading'].removed,undefined);f.boot.moduleLoaded();assert.equal(f.boot.info().completed,1);f.boot[first==='stylesReady'?'appReady':'stylesReady']();assert.equal(f.boot.info().phase,'ready');assert.equal(f.timers.size,0);assert.equal(f.nodes['startup-progress'].value,2);f.frame();assert.equal(f.nodes['startup-loading'].removed,undefined);f.frame();assert.equal(f.nodes['startup-loading'].removed,true);assert.equal(f.events.error.length,0);});
for(const failure of ['module','styles','initialization'])test(failure+' failure shows retry; one click reloads exactly once',()=>{const f=fixture();f.boot.fail(failure);assert.equal(f.nodes['startup-retry'].hidden,false);assert.equal(f.boot.info().phase,'failed');assert.equal(f.reloads,0);f.nodes['startup-retry'].onclick();f.nodes['startup-retry'].onclick();assert.equal(f.reloads,1);assert.equal(f.nodes['startup-retry'].disabled,true);});
test('initialization exception and rejected initialization fail visibly',()=>{for(const event of ['error','unhandledrejection']){const f=fixture();f.emit(event,{target:f.ctx});assert.equal(f.boot.info().phase,'failed');assert.equal(f.nodes['startup-retry'].hidden,false);}});
test('unrelated image error does not claim startup failure',()=>{const f=fixture();f.emit('error',{target:{tagName:'IMG'}});assert.equal(f.boot.info().phase,'loading');});
test('late successful loads recover after timeout without an automatic reload',()=>{const f=fixture();f.timeout();f.boot.stylesReady();f.boot.appReady();f.frame();f.frame();assert.equal(f.nodes['startup-loading'].removed,true);assert.equal(f.reloads,0);assert.equal(f.nodes['startup-retry'].hidden,true);});
test('repeat callbacks and failures after success cannot reopen or reload startup',()=>{const f=fixture();f.boot.stylesReady();f.boot.stylesReady();f.boot.appReady();f.boot.appReady();f.boot.fail('module');f.nodes['startup-retry'].onclick();assert.equal(f.boot.info().completed,2);assert.equal(f.boot.info().phase,'ready');assert.equal(f.reloads,0);});
for(const state of [{screen:'battle',room:null},{screen:'select',room:{code:'000123'}}])test('retry guards active '+(state.room?'room':'battle'),()=>{const f=fixture();f.ctx.DUEL={state};f.boot.fail('module');f.nodes['startup-retry'].onclick();assert.equal(f.reloads,0);});
test('cookie language precedes storage and unavailable preferences are safe',()=>{for(const [options,lang]of [[{cookie:'other=1; dota-duel-language=en',storage:'zh'},'en'],[{cookie:'dota-duel-language=zh',storage:'en'},'zh'],[{storage:'en'},'en'],[{cookie:'dota-duel-language=bad',storage:'en'},'en'],[{blocked:true},'zh']]){const f=fixture(options);assert.equal(f.boot.info().language,lang);assert.equal(f.nodes['startup-retry'].textContent,lang==='en'?'Retry':'重试');}});
test('offline inline styles and app callback complete both real tasks',()=>{const f=fixture({offline:true});f.boot.appReady();assert.equal(f.boot.info().completed,2);f.frame();f.frame();assert.equal(f.nodes['startup-loading'].removed,true);});
test('source includes safe areas and short/portrait flow without large assets',()=>{const critical=html.match(/<style id="startup-critical">([\s\S]*?)<\/style>/)[1];for(const side of ['top','right','bottom','left'])assert(critical.includes('safe-area-inset-'+side));assert.match(critical,/position:fixed;inset:0/);assert.doesNotMatch(critical,/url\(|animation|100vh/);assert.match(critical,/min-height:44px/);assert.match(critical,/width:min\(280px,100%\)/);});
test('actual app success hook follows initial screen construction, independent of fighter/API readiness',()=>{const app=fs.readFileSync('src/app.js','utf8');assert.match(app,/\nselection\(\);\nwindow\.DOTA_STARTUP\?\.appReady\(\);/);assert.equal((app.match(/DOTA_STARTUP/g)||[]).length,1);});
