import {registryFixture} from './registry-fixture.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {REGISTRY_DATA} from '../src/registry-data.js';
import {ACTIVE_ROSTER,REGISTRY_HASH,REGISTRY_VERSION,createHeroRegistry,heroRegistry,isActiveHero,runtimeHeroId,lookupRuntimeHero,historicalHero} from '../src/hero-registry.js';
import {heroCatalog,hasOfficialBehavior,historicalHeroName} from '../src/hero-catalog.js';
import {GAME_COMPATIBILITY,compatibleGame,validateBackendRegistry} from '../src/compatibility.js';
import {NET_VERSION} from '../src/net-version.js';
import {heroes} from '../src/data.js';
import {Engine} from '../src/engine.js';
import {MatchAPI,MatchRecord} from '../src/match-api.js';
import {PeerSession} from '../src/p2p.js';
import {World} from './integrity-harness.mjs';

const canonical=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const serverRegistry=registryFixture;
test('frozen identity manifest canonical hash, all 127 identities, and legacy 20 agree',()=>{
 assert.equal(createHash('sha256').update(canonical(REGISTRY_DATA.heroes)).digest('hex'),REGISTRY_HASH);
 assert.equal(heroRegistry.rows().length,127);assert.equal(new Set(heroRegistry.rows().map(r=>r.valveHeroId)).size,127);
 for(const [id,hero]of heroes.entries()){assert.equal(runtimeHeroId(hero),id);assert.equal(heroRegistry.fromLegacyIndex(id).internalHeroId,hero.id);}
 const reversed=createHeroRegistry({...REGISTRY_DATA,heroes:[...REGISTRY_DATA.heroes].reverse()});for(const row of heroRegistry.rows())assert.deepEqual(reversed.byNumericId(row.registryNumericId),row);
 assert.throws(()=>createHeroRegistry({...REGISTRY_DATA,heroes:[...REGISTRY_DATA.heroes,REGISTRY_DATA.heroes[0]]}));
 assert.throws(()=>{heroRegistry.byNumericId(0).internalHeroId='other';});
});
test('catalog records all 734 abilities and 127 innates while103 unimplemented heroes stay locked',()=>{
 assert.equal(heroCatalog.heroes().length,127);assert.equal(heroCatalog.abilities().length,734);assert.equal(heroCatalog.abilities().filter(a=>a.innate).length,127);
 assert.equal(heroCatalog.counts.websiteTalentRecords,1016);assert.equal(ACTIVE_ROSTER.heroIds.length,24);
 for(const row of heroRegistry.rows()){assert(heroCatalog.byNumericId(row.registryNumericId));if(row.legacyIndex===null&&!ACTIVE_ROSTER.heroIds.includes(row.registryNumericId)){assert(!isActiveHero(row.registryNumericId));assert.equal(heroCatalog.status(row.registryNumericId),'unimplemented');assert.throws(()=>new Engine(heroes,[0,row.registryNumericId]));}}
 assert(heroCatalog.heroes().every(h=>h.fullKitReady===false));assert(!isActiveHero('0'));assert(!isActiveHero(127));
 assert(hasOfficialBehavior('1099511627778','1099511627776'));assert(hasOfficialBehavior('1099511627778','2'));assert(!hasOfficialBehavior('1099511627778','4'));
});
test('display/runtime array reordering preserves selected heroes, simulation and history identity',()=>{
 const reversed=[...heroes].reverse();for(const id of heroes.map((_,i)=>i)){assert.equal(lookupRuntimeHero(reversed,id),heroes[id]);const a=new Engine(heroes,[id,3],{seed:381}),b=new Engine(reversed,[id,3],{seed:381});a.start();b.start();for(let n=0;n<180;n++){a.ai(0,1/60);a.ai(1,1/60);b.ai(0,1/60);b.ai(1,1/60);a.step();b.step();}assert.deepEqual(a.snapshot(),b.snapshot());}
 const old={heroes:[0,19],version:'old-game'};const original=JSON.stringify(old);assert.equal(historicalHero(old,0).internalHeroId,'juggernaut');assert.equal(historicalHeroName(old,1),'潮汐猎人');assert.equal(JSON.stringify(old),original);
 assert.equal(historicalHero({heroes:[20,0]},0),null);assert.equal(historicalHero({heroes:[20,0],registryVersion:REGISTRY_VERSION},0).valveHeroId,3);assert.equal(historicalHeroName({heroes:[0],registryVersion:'unknown'},0),'未知英雄');
});
for(const key of Object.keys(GAME_COMPATIBILITY))test('P2P handshake rejects incompatible '+key,()=>{
 const peer=new PeerSession({role:'guest',hero:0,policy:{},service:{request:async()=>({})}});peer.connected=true;
 peer.receive(JSON.stringify({type:'hello',hero:3,version:NET_VERSION,policy:{},compatibility:{...GAME_COMPATIBILITY,[key]:'wrong'}}),'control');assert(peer.stopped);assert(!peer.gate().ok);
});
test('P2P handshake requires compatibility and blocks inactive hero even at same build',()=>{
 for(const compatibility of [undefined,GAME_COMPATIBILITY]){const peer=new PeerSession({role:'guest',hero:0,policy:{},service:{request:async()=>({})}});peer.connected=true;peer.receive(JSON.stringify({type:'hello',hero:compatibility?20:3,version:NET_VERSION,policy:{},compatibility}),'control');assert(peer.stopped);}
 assert(compatibleGame(structuredClone(GAME_COMPATIBILITY)));assert.throws(()=>new PeerSession({hero:20}));
});
test('same-browser room rejects incompatible catalog and inactive heroes before accepting peer',()=>{
 for(const change of [{compatibility:{...GAME_COMPATIBILITY,abilityCatalogHash:'wrong'},hero:0},{compatibility:GAME_COMPATIBILITY,hero:20}]){const w=new World(),host=w.tab(),guest=w.tab();host.__audit.connect('TEST01','host');guest.__audit.connect('TEST01','guest');w.channels[1].postMessage({type:'hello',sender:'unaccepted',...change});w.flush();assert(!host.DUEL.room.connected);}
 const w=new World(),{host,guest}=w.pair();host.__audit.action('roomStart');w.flush();const original=host.DUEL.snapshot;host.__audit.sendRoom({type:'snapshot',snapshot:{...original,indices:[0,20]}});w.flush();assert.equal(guest.DUEL.snapshot,null);host.__audit.sendRoom({type:'snapshot',snapshot:original});w.flush();assert.equal(guest.DUEL.snapshot.indices[1],3);
});
test('backend registry resolves explicit IDs, accepts array reorder, and rejects mismatched identities/build binding',()=>{
 const data=serverRegistry();data.heroes.reverse();data.gameplayRosters[0].heroIds.reverse();assert.equal(validateBackendRegistry(data).status,'verified');
 for(const mutate of [d=>d.heroes[0].internalHeroId='wrong',d=>d.registrySha256='wrong',d=>d.gameplayRosters[0].heroIds.push(20),d=>d.gameplayRosters.push({rosterId:'future-24',gameVersions:[NET_VERSION]})]){const bad=serverRegistry();mutate(bad);assert.throws(()=>validateBackendRegistry(bad));}
});
test('new backend sends rosterId; unavailable backend cannot silently save expanded matches as legacy',async()=>{
 for(const available of [true,false]){const calls=[],api=new MatchAPI({base:'/api/v1',fetcher:async(url,options)=>{calls.push({url,options});if(url.endsWith('/registry'))return {ok:available,json:async()=>serverRegistry()};return {ok:true,json:async()=>url.endsWith('/sessions')?{playerId:'a'.repeat(64),token:'b'.repeat(64)}:{id:'c'.repeat(64),status:'in_progress'}};}});
  if(!available){await assert.rejects(()=>api.createPVE(0,3,'blocked'));assert.equal(calls.length,1);continue;}await Promise.all([api.createPVE(0,3,'one'),api.createLocal(0,19,'local','two')]);assert.equal(calls.filter(c=>c.url.endsWith('/registry')).length,1);for(const c of calls.filter(c=>c.url.includes('/matches/'))){const body=JSON.parse(c.options.body);assert.equal(body.rosterId,available?ACTIVE_ROSTER.rosterId:undefined);assert(!('registryVersion'in body));assert.equal(body.version,NET_VERSION);}assert.equal(api.registryStatus.status,available?'verified':'unavailable');
  await assert.rejects(()=>api.createPVE(20,0,'bad'));await assert.rejects(()=>api.createLocal(0,127,'local','bad'));
 }
});
test('authoritative backend mismatch fails closed without creating session or match',async()=>{
 const calls=[],bad=serverRegistry();bad.registrySha256='wrong';const api=new MatchAPI({fetcher:async(url)=>{calls.push(url);return {ok:true,json:async()=>bad};}});await assert.rejects(()=>api.createPVE(0,1,'bad'));assert.equal(calls.length,1);assert.equal(api.registryStatus.status,'incompatible');
});
test('records retain explicit registry/roster locally while old records are not migrated',()=>{
 const prior=JSON.stringify([{heroes:[0,19],version:'old',localId:'historical'}]),store={value:prior,getItem(){return this.value;},setItem(_,v){this.value=v;}};const record=new MatchRecord({mode:'pve',heroes:[0,19],storage:store});assert.equal(record.view().registryVersion,REGISTRY_VERSION);assert.equal(record.view().rosterId,ACTIVE_ROSTER.rosterId);assert.equal(store.value,prior);assert.throws(()=>new MatchRecord({heroes:[0,20]}));
});
test('unknown effects never fall back to fabricated direct damage',()=>{
 const e=new Engine(heroes,[0,3]);e.start();const hp=e.fighters[1].hp;assert.throws(()=>e.activate(e.fighters[0],{slot:0,m:{effect:'not_implemented',range_wu:9999,damage:999,recovery_frames:0}}),/Unsupported/);assert.equal(e.fighters[1].hp,hp);
});
test('source data for accepted old20 remains byte-identical to rules hash',()=>{
 const baseline=JSON.parse(fs.readFileSync(new URL('../reference/official-2026-10-02/id-mapping.json',import.meta.url)));assert.equal(baseline.registrySha256,REGISTRY_HASH);
 assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../src/data.js',import.meta.url))).digest('hex'),'34650850eaccbbaca6d5f3a9373a017c4196742485319beefb2f3082bf30fc38');
});
