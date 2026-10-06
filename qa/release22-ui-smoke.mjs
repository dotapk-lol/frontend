import assert from 'node:assert/strict';
import fs from 'node:fs';
import {app,flush} from './release22-dom-harness.mjs';
import {ACTIVE_ROSTER,heroRegistry} from '../src/hero-registry.js';
import {RELEASE_RULES_HASH} from '../src/released-hero-rules.js';
import {MatchAPI} from '../src/match-api.js';
import {PeerSession} from '../src/p2p.js';
import {DEFAULT_NET_POLICY} from '../src/net-quality.js';
import {compatibleMatch,GAME_COMPATIBILITY} from '../src/compatibility.js';
import {NET_VERSION} from '../src/net-version.js';
import {registryFixture} from './registry-fixture.mjs';
const ids=[...ACTIVE_ROSTER.heroIds],disabled=heroRegistry.rows().map(r=>r.registryNumericId).filter(id=>!ids.includes(id));
const plain=x=>JSON.parse(JSON.stringify(x)),checks=[];
const a=app({savedPicks:'[0,6]'});
assert.deepEqual(plain(a.duel.state.picks),[1,3]);assert.equal(a.duel.state.myHero,1);
const cards=a.doc.querySelectorAll('[data-hero]');
assert.equal(cards.length,46);assert.equal(cards.filter(n=>!n.disabled).length,22);assert.equal(cards.filter(n=>n.disabled).length,24);
for(const card of cards){
 const id=Number(card.dataset.hero);
 if(ids.includes(id)){assert(!card.disabled);continue;}
 assert.equal(card.getAttribute('aria-disabled'),'true');assert.match(card.textContent,/未发布.*暂停适配/);
 const before=plain(a.duel.state.picks);card.click();assert.deepEqual(plain(a.duel.state.picks),before);
 card.disabled=false;card.onclick({stopPropagation(){}});assert.deepEqual(plain(a.duel.state.picks),before,'removing disabled must not bypass the whitelist');
}
checks.push({name:'actual selection markup',cards:46,enabled:22,disabled:24,disabledAttributeAndClickBypassGuard:true});
for(const id of disabled){
 assert.equal(a.duel.catalog.status(id),'unreleased_adaptation_paused');
 assert.throws(()=>a.duel.start({p1:id,p2:3}),/英雄尚未开放/);
 assert.throws(()=>a.duel.start({mode:'cpu',p1:1,p2:id}),/英雄尚未开放/);
 assert.equal(a.duel.engine,null);
 assert.throws(()=>new PeerSession({role:'host',hero:id,policy:DEFAULT_NET_POLICY}),/英雄尚未开放/);
}
checks.push({name:'all105 disabled IDs denied in direct start, CPU opponent and PeerSession',count:disabled.length});
for(const savedPicks of ['invalid','null','[0,3]','[1,124]','["1",3]']){
 const t=app({savedPicks});assert(t.duel.state.picks.every(id=>ids.includes(id)));
}
checks.push({name:'old/corrupt stored picks normalize to allowed defaults',fixtures:5});
a.doc.querySelector('[data-playmode="pve"]').click();
a.doc.querySelector('[data-player="1"]').click();
a.doc.querySelector('[data-hero="9"]').click();
assert.equal(a.duel.state.picks[1],9);a.button('start');a.tick(150);
assert.equal(a.duel.engine.mode,'cpu');assert.deepEqual(plain(a.duel.engine.indices),[1,9]);
assert.equal(a.duel.engine.heroRuleRegistry.seal().rulesHash,RELEASE_RULES_HASH);
assert.deepEqual(plain(a.duel.engine.simulationRoster.heroIds),ids);
a.button('pause');a.button('quit');
a.duel.start({mode:'training',p1:50,p2:9});a.tick(150);a.key('KeyD');a.tick(160);a.key('KeyD',false);a.key('KeyR');a.tick(1);a.key('KeyR',false);a.tick(160);
const e=a.duel.engine,hits=e.logs.filter(x=>x.type==='hit'&&x.player===0&&x.skill==='leshrac_lightning_storm');
assert.equal(e.fighters[0].casts,1);assert.equal(hits.length,1);
assert(a.ctx.__releaseQA.validRemoteSnapshot(e.snapshot()),'actual app remote validator shares selected registry');
const bad=plain(e.snapshot());bad.indices[0]=0;assert(!a.ctx.__releaseQA.validRemoteSnapshot(bad));
const before=e.snapshot();a.duel.state.picks=[0,9];assert.throws(()=>a.ctx.__releaseQA.action('rematch'),/英雄尚未开放/);
assert.deepEqual(plain(a.duel.engine.snapshot()),plain(before));a.duel.state.picks=[50,9];
a.ctx.__releaseQA.action('rematch');assert.equal(a.duel.engine.round,1);assert.equal(a.duel.engine.heroRuleRegistry.seal().rulesHash,RELEASE_RULES_HASH);
checks.push({name:'actual CPU/keyboard input/rematch/remote wiring',cpuPair:[1,9],keyboardPair:[50,9],stockDamage:hits[0].damage,oneCast:true,sharedRegistry:true,badRematchDeniedBeforeMutation:true});
const t=app();t.ctx.__releaseQA.connect('123456','host');
for(const id of disabled){await t.ctx.__releaseQA.handleRoomMessage({type:'hello',hero:id,sender:'invalid-peer',compatibility:t.duel.compatibility});assert(!t.duel.room.connected);}
await t.ctx.__releaseQA.handleRoomMessage({type:'hello',hero:9,sender:'valid-peer',compatibility:t.duel.compatibility});
assert(t.duel.room.connected);assert.equal(t.duel.state.picks[1],9);
await t.ctx.__releaseQA.handleRoomMessage({type:'start',picks:[1,0],sender:'valid-peer',compatibility:t.duel.compatibility});assert.equal(t.duel.engine,null);
t.ctx.__releaseQA.action('quit');
checks.push({name:'actual same-browser room hello/start gate',invalidHelloCount:105,validHero:9,badStartDenied:true});
const calls=[],service=new MatchAPI({fetcher:async(url,options)=>{calls.push({url,options});return {ok:true,json:async()=>registryFixture()};}});
for(const id of disabled){await assert.rejects(service.createLocal(id,3,'local','invalid'),/Inactive hero selection/);await assert.rejects(service.createPVE(1,id,'invalid'),/Inactive hero selection/);}
assert.equal(calls.length,0);const permit=await service.authorizeRoster();assert.equal(permit.fields.rosterId,'arena-heros22-v1');
checks.push({name:'MatchAPI rejects all105 IDs before any request; new roster fixture authorizes only exact version',denied:210,requestsBeforeValidAuthorization:0,rosterId:permit.fields.rosterId});
const match={version:NET_VERSION,rosterId:ACTIVE_ROSTER.rosterId,registryVersion:GAME_COMPATIBILITY.registryVersion,heroes:[1,3],players:[{hero:1},{hero:3}]};
assert(compatibleMatch(match));
for(const id of disabled)assert(!compatibleMatch({...match,players:[{hero:id},{hero:3}]}));
for(const key of ['version','rosterId','registryVersion']){const missing={...match};delete missing[key];assert(!compatibleMatch(missing));}
assert(!compatibleMatch({...match,rosterId:'arena-first22-46-v1'}));
checks.push({name:'release match replies require current version and roster; all105 player IDs rejected',oldOrMissingIdentityDenied:true});
await flush();
const report={result:'PASS actual bundled UI wiring under mocked DOM/channel/fetch',heroIds:ids,checks,realBrowser:false,realWebRTC:false,layoutOrTouchHardwareAcceptance:false,backendRegistered:false,newMechanismAcceptance:0};
fs.mkdirSync(new URL('./browser-evidence/',import.meta.url),{recursive:true});
fs.writeFileSync(new URL('./browser-evidence/release22-ui-smoke.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:report.result,checks:checks.length,disabledIds:disabled.length}));
