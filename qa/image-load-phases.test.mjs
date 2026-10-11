import test from 'node:test';
import assert from 'node:assert/strict';
import {createImageLoader as fixed} from '../src/image-loader.js';
const tick=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
function fixture(create,{cached=false}={}){
 const instances=[],calls=[],timers=new Map(),visible=[];let now=0,id=0,releaseDecode;
 class ImageClass {
  complete=false;naturalWidth=0;naturalHeight=0;
  constructor(){instances.push(this);this.decodeTask=new Promise(r=>{releaseDecode=r;this.resolveDecode=r;});}
  set src(value){this.url=value;if(value){calls.push(value);if(cached){this.complete=true;this.naturalWidth=2048;this.naturalHeight=1928;}}}
  get src(){return this.url;}
  decode(){return this.decodeTask;}
  loaded(){this.complete=true;this.naturalWidth=2048;this.naturalHeight=1928;this.onload?.();}
 }
 let loader;
 loader=create({ImageClass,loadTimeoutMs:180000,slowMs:20000,timeoutMs:8000,retryDelayMs:350,maxAttempts:2,
  schedule(fn,ms){const key=++id;timers.set(key,{fn,at:now+ms});return key;},cancel(key){timers.delete(key);},
  onchange(){Promise.resolve().then(()=>visible.push(loader.info().map(r=>({...r}))));}});
 return {loader,instances,calls,timers,visible,release:()=>releaseDecode(),advance(ms){const end=now+ms;for(;;){const next=[...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;}};
}
test('loaded image publishes decode phase before the decode Promise settles',async()=>{
 const f=fixture(fixed),r=f.loader.load('fighters2.webp');f.instances[0].loaded();await tick();
 assert.equal(f.visible.at(-1)[0].phase,'decode');assert.equal(r.status,'loading');assert.equal(f.calls.length,1);
 f.release();await r.promise;assert.equal(r.status,'ready');assert.equal(f.timers.size,0);
});
test('cached complete Image with no onload callback still publishes decode and reaches ready',async()=>{
 const f=fixture(fixed,{cached:true}),r=f.loader.load('fighters2.webp');await tick();assert.equal(f.visible.at(-1)[0].phase,'decode');
 f.release();await r.promise;assert.equal(r.status,'ready');assert.equal(f.calls.length,1);
});
test('decode rejection remains bounded, retries same URL, then fails explicitly',async()=>{
 const f=fixture(fixed),r=f.loader.load('fighters2.webp');f.instances[0].decodeTask=Promise.reject(Error('invalid image data'));f.instances[0].loaded();await tick();assert.equal(r.phase,'retry');
 f.advance(350);f.instances[1].decodeTask=Promise.reject(Error('invalid image data'));f.instances[1].loaded();await tick();assert.equal((await r.promise).status,'failed');assert.equal(f.timers.size,0);assert.deepEqual(f.calls,['fighters2.webp','fighters2.webp']);
});
test('HTTP2/onerror notification retries without marking image ready',async()=>{
 const f=fixture(fixed),r=f.loader.load('fighters2.webp');f.instances[0].onerror();f.advance(350);f.instances[1].onerror();await tick();assert.equal((await r.promise).status,'failed');assert.equal(f.loader.ready('fighters2.webp'),null);assert.equal(f.timers.size,0);
});
test('a truncated/no completion-event attempt stays unready, ends at transport deadline and settles',async()=>{
 const f=fixture(fixed),r=f.loader.load('fighters2.webp');f.instances[0].naturalWidth=2048;f.instances[0].naturalHeight=1928;f.advance(180000);await tick();assert.equal((await r.promise).status,'failed');assert.match(r.error,/load deadline/);assert.equal(f.loader.ready('fighters2.webp'),null);assert.equal(f.calls.length,1);assert.equal(f.timers.size,0);
});
test('repeated retry while pending remains single-flight; cancelled late callbacks cannot reopen readiness',async()=>{
 const f=fixture(fixed),r=f.loader.load('fighters2.webp');for(let i=0;i<20;i++)assert.equal(f.loader.retry('fighters2.webp'),r);const late=f.instances[0].onload;f.loader.retain([]);late();await tick();assert.equal((await r.promise).status,'released');assert.equal(f.loader.info().length,0);assert.equal(f.calls.length,1);assert.equal(f.timers.size,0);
});
test('pending decode hard bound remains 8s per attempt; late Promise resolution cannot revive failed record',async()=>{
 const f=fixture(fixed),r=f.loader.load('fighters2.webp');f.instances[0].loaded();const late=f.instances[0].resolveDecode;f.advance(8000);f.advance(350);f.instances[1].loaded();f.advance(8000);await tick();assert.equal((await r.promise).status,'failed');late();await tick();assert.equal(r.status,'failed');assert.equal(f.loader.ready('fighters2.webp'),null);assert.equal(f.timers.size,0);
});
