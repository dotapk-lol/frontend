import test from 'node:test';import assert from 'node:assert/strict';
import {EntryVersion,checkedJSON} from '../src/version-check.js';
import {MatchAPI} from '../src/match-api.js';import {NET_VERSION} from '../src/net-version.js';
import {ACTIVE_ROSTER} from '../src/hero-registry.js';import {registryFixture} from './registry-fixture.mjs';
const response=data=>({ok:true,json:async()=>data});
const manifest=(version=NET_VERSION)=>({profile:'heros22',candidate:false,gameVersion:version,roster:ACTIVE_ROSTER});
function fixture(){
 const calls=[],saved=new Map(),navigations=[];let network=true,registry='good',latest=NET_VERSION,active=false,now=0;
 const service=new MatchAPI({base:'/api/v1',fetcher:async(url,opts)=>{calls.push({url,opts});if(url.endsWith('/registry')){if(registry==='offline')throw Error('transport');return response(registry==='bad'?{...registryFixture(),registrySha256:'wrong'}:registryFixture());}return response(url.endsWith('/sessions')?{playerId:'a'.repeat(64),token:'b'.repeat(64)}:{id:'c'.repeat(64)});}});
 const entry=new EntryVersion({service,location:{protocol:'https:',href:'https://dotapk.lol/?keep=yes',replace:url=>navigations.push(url)},storage:{setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)},isActive:()=>active,now:()=>now,fetcher:async(url,opts)=>{calls.push({url,opts});if(!network)throw Error('offline');return response(manifest(latest));}});
 return {entry,service,calls,saved,navigations,network:v=>network=v,registry:v=>registry=v,latest:v=>latest=v,active:v=>active=v,now:v=>now=v};
}
test('cold entry validates manifest and exact registry once; warm rooms and sessions reuse this loaded build permit',async()=>{
 const f=fixture();await f.entry.check();assert.equal(f.entry.info().phase,'ready');
 for(let i=0;i<3;i++){const permit=await f.service.authorizeRoster();await f.service.request(i===1?'rooms/join':'rooms',{...permit.fields,hero:1,version:NET_VERSION},'POST',{registryPermit:permit});}
 assert.equal(f.calls.filter(c=>c.url.endsWith('/registry')).length,1);assert.equal(f.calls.filter(c=>c.url.endsWith('/sessions')).length,1);assert.equal(f.calls.filter(c=>c.url==='build-manifest.json').length,1);
 assert(f.calls.filter(c=>c.url.endsWith('/registry')||c.url==='build-manifest.json').every(c=>c.opts.cache==='no-store'));
 await f.entry.check({force:true});assert.equal(f.calls.filter(c=>c.url.endsWith('/registry')).length,1);
});
test('concurrent entry checks deduplicate and lifecycle uses a finite manifest freshness window',async()=>{
 const f=fixture();await Promise.all([f.entry.check(),f.entry.check()]);await f.entry.check();assert.equal(f.calls.length,2);f.now(61000);await f.entry.check();assert.equal(f.calls.filter(c=>c.url==='build-manifest.json').length,2);assert.equal(f.calls.filter(c=>c.url.endsWith('/registry')).length,1);
});
test('manifest transport failure does not allocate a session; explicit retry recovers without reload or permanent failed cache',async()=>{
 const f=fixture();f.network(false);await f.entry.check();assert.equal(f.entry.info().phase,'offline');assert.equal(f.calls.length,1);f.network(true);await f.entry.check({force:true});assert.equal(f.entry.info().phase,'ready');assert.equal(f.navigations.length,0);
});
test('registry transport failure is a network error instead of a changed-hero error; entry retry recovers',async()=>{
 const f=fixture();f.registry('offline');await f.entry.check();assert.equal(f.entry.info().phase,'offline');assert(!f.entry.info().error.includes('英雄'));await assert.rejects(()=>f.service.authorizeRoster(),e=>e.kind==='network');assert.equal(f.service.registryTask,null);f.registry('good');await f.entry.check({force:true});assert(f.entry.info().canConnect);assert(!f.calls.some(c=>c.url.endsWith('/sessions')));
});
test('real registry identity mismatch remains blocking and distinct from connectivity failure',async()=>{
 const f=fixture();f.registry('bad');await f.entry.check();assert.equal(f.entry.info().phase,'incompatible');assert.equal(f.entry.info().canConnect,false);assert.equal(f.service.registryStatus.status,'incompatible');assert(!f.calls.some(c=>c.url.endsWith('/sessions')));f.registry('good');await f.entry.check({force:true});assert(f.entry.info().canConnect);
});
test('an older loaded build offers one explicit update; never refreshes automatically or during a match',async()=>{
 const f=fixture(),next='duel-99999999999999999999';f.latest(next);await f.entry.check();assert.equal(f.entry.info().phase,'update');assert.equal(f.calls.length,1);assert.equal(f.navigations.length,0);f.active(true);assert.equal(f.entry.update(),false);await f.entry.check({force:true});assert.equal(f.calls.length,1);f.active(false);assert.equal(f.entry.update(),true);assert.equal(f.entry.update(),false);assert.equal(f.navigations.length,1);const url=new URL(f.navigations[0]);assert.equal(url.searchParams.get('keep'),'yes');assert.equal(url.searchParams.get('build'),next);assert.equal(f.saved.get('dota-duel-update-target'),next);
});
test('active sessions preserve their loaded version and skip even a forced launch recheck',async()=>{const f=fixture();await f.entry.check();f.latest('duel-88888888888888888888');f.active(true);await f.entry.check({force:true});assert.equal(f.entry.info().phase,'ready');assert.equal(f.calls.length,2);});
test('offline standalone has local mode with no update or registry requests',async()=>{let calls=0;const f=new EntryVersion({location:{protocol:'file:'},fetcher:()=>{calls++;}});await f.check();assert.equal(f.info().phase,'local');assert.equal(f.update(),false);assert.equal(calls,0);});
test('JSON body receives the same deadline; slow valid response passes without AbortSignal.timeout',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(AbortSignal,'timeout');Object.defineProperty(AbortSignal,'timeout',{value:undefined,configurable:true});try{const data=await checkedJSON(async()=>({ok:true,json:()=>new Promise(r=>setTimeout(()=>r({ok:true}),35))}),'registry',120);assert.deepEqual(data,{ok:true});}finally{Object.defineProperty(AbortSignal,'timeout',descriptor);}
});
test('deadline cancels transport and classifies network failure; a later valid call still succeeds',async()=>{
 let signal;await assert.rejects(()=>checkedJSON(async(_url,opts)=>{signal=opts.signal;return new Promise(()=>{});},'registry',10),e=>e.kind==='network');assert.equal(signal.aborted,true);assert.deepEqual(await checkedJSON(async()=>response({ok:true}),'registry',100),{ok:true});
});
test('malformed or candidate release metadata never authorizes gameplay or a refresh loop',async()=>{let calls=0;const f=new EntryVersion({location:{protocol:'https:'},fetcher:async()=>response({...manifest(),candidate:true}),service:{loadRegistry(){calls++;}}});await f.check();assert.equal(f.info().phase,'incompatible');assert.equal(f.update(),false);assert.equal(calls,0);});
test('server version rejection invalidates a cached permit and schedules an entry check without refreshing the running page',async()=>{
 let rejected=false,invalidations=0;const api=new MatchAPI({onVersionMismatch:()=>{invalidations++;},fetcher:async url=>url.endsWith('/registry')?response(registryFixture()):url.endsWith('/sessions')?response({playerId:'a'.repeat(64),token:'b'.repeat(64)}):{ok:!rejected,status:400,json:async()=>({error:'game version and roster mismatch'})}});
 const permit=await api.authorizeRoster();rejected=true;await assert.rejects(()=>api.request('rooms',{...permit.fields},'POST',{registryPermit:permit}),e=>e.kind==='version');assert.equal(invalidations,1);assert.equal(api.registryTask,null);assert.throws(()=>api.assertRegistryPermit(permit));
 const f=fixture();await f.entry.check();f.entry.invalidate();assert.equal(f.entry.info().phase,'checking');f.latest('duel-99999999999999999999');await f.entry.check();assert.equal(f.entry.info().phase,'update');assert.equal(f.navigations.length,0);
});
