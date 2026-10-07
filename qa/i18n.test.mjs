import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {createLanguage,LANGUAGE_KEY} from '../src/i18n.js';
import {UI_COPY_EN,SERVICE_COPY_ZH} from '../src/ui-copy-en.js';
import {SKILL_COPY_EN} from '../src/skill-copy-en.js';
import {runtimeHeroes} from '../src/runtime-heroes.js';import {heroCatalog} from '../src/hero-catalog.js';
import {ACTIVE_ROSTER,heroRegistry} from '../src/hero-registry.js';
import {GAME_COMPATIBILITY,compatibleGame,compatibleRoom,compatibleMatch} from '../src/compatibility.js';
import {AUTO_PVP_POLICY,qualityDecision} from '../src/net-quality.js';
const controller=()=>{const l=createLanguage();l.registerHeroes(runtimeHeroes,heroCatalog);return l;};
const han=/[\u3400-\u9fff]/;

test('central dictionaries have complete English values and exact 22 × 4 arena descriptions',()=>{
 for(const [zh,en] of Object.entries(UI_COPY_EN)){assert(zh&&en.trim());assert(!han.test(en),zh);}
 for(const [en,zh] of Object.entries(SERVICE_COPY_ZH)){assert(en&&zh.trim());assert(!han.test(en));assert(han.test(zh));}
 const ids=ACTIVE_ROSTER.heroIds.flatMap(id=>runtimeHeroes.find(h=>h.id===heroRegistry.byNumericId(id).internalHeroId).abilities.map(a=>a.id));
 assert.equal(ids.length,88);assert.deepEqual(Object.keys(SKILL_COPY_EN).sort(),ids.sort());
 for(const id of ids)for(const k of ['description','note']){assert(SKILL_COPY_EN[id][k].length>20,id);assert(!han.test(SKILL_COPY_EN[id][k]),id);}
});

test('all static protocol, quality, record and native-browser error messages have English display translations',()=>{
 const l=controller();l.setLanguage('en');for(const path of ['p2p.js','room-selection.js','version-check.js','match-api.js','local-rooms.js','net-quality.js','mobile.js','official-music.js','compatibility.js','engine.js']){
  const source=fs.readFileSync(new URL('../src/'+path,import.meta.url),'utf8');
  for(const m of source.matchAll(/'([^'\\\n]*(?:\\.[^'\\\n]*)*)'/g)){if(han.test(m[1])&&!m[1].includes('<'))assert(!han.test(l.translate(m[1])),path+': '+m[1]);}
 }
});

test('composed dynamic quality, failure prefixes, room policy and results translate without changing source values',()=>{
 const l=controller();const values=['对方：探测丢包过多','开战检查未通过：双方尚未准备好','战绩服务：版本不一致','自己 已准备 · 对方 未准备','本端 样本 30/24　RTT P95 151.0ms　抖动 5.0ms　丢包 0.0%\n对端 尚未收到','P95 RTT > 150ms 禁战 · 抖动≤30ms · 探测丢包≤5%','P1 拿下本回合　2 : 1','P1最高 12 连击','邀请码第6位','22 位已开放 · 24 位未发布 · 三局两胜 · 99 秒回合'];l.setLanguage('en');
 for(const source of values)assert(!han.test(l.translate(source)),source);
 assert(l.translate(values[4]).includes('RTT P95 151.0ms'));assert(l.translate(values[5]).includes('> 150ms'));
 l.setLanguage('zh');assert.equal(l.translate(values[4]),values[4]);
});

test('preference supports unavailable storage, valid saved English, default Chinese and no third language',()=>{
 const saved=new Map([[LANGUAGE_KEY,'en']]);const storage={getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)};const l=createLanguage({storage});assert.equal(l.current,'en');l.setLanguage('zh');assert.equal(saved.get(LANGUAGE_KEY),'zh');assert.equal(l.setLanguage('fr'),false);assert.equal(l.current,'zh');const blocked=createLanguage({storage:{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}}});assert.equal(blocked.current,'zh');assert(blocked.setLanguage('en'));assert.equal(blocked.current,'en');assert.equal(createLanguage({storage:{getItem:()=> 'de'}}).current,'zh');
});

test('canonical backend errors render Chinese or English and language is absent from all room/game comparisons',()=>{
 const l=controller();assert.equal(l.translate('room full'),'房间已有两位玩家');l.setLanguage('en');assert.equal(l.translate('room full'),'room full');
 const room={rosterId:ACTIVE_ROSTER.rosterId,registryVersion:GAME_COMPATIBILITY.registryVersion,version:GAME_COMPATIBILITY.gameVersion,players:[{id:'a'.repeat(64),hero:1},{id:'',hero:0}],policy:{...AUTO_PVP_POLICY}};
 const identity=JSON.stringify(GAME_COMPATIBILITY),canonical=JSON.stringify(room);assert(compatibleRoom(room,{role:'host',hero:1}));assert(!compatibleMatch(room));
 for(const lang of ['en','zh','en']){l.setLanguage(lang);assert(compatibleRoom(room,{role:'host',hero:1}));assert(!compatibleMatch(room));assert(compatibleGame({...GAME_COMPATIBILITY}));assert.equal(JSON.stringify(GAME_COMPATIBILITY),identity);assert.equal(JSON.stringify(room),canonical);}
 room.players[1]={id:'b'.repeat(64),hero:0};assert(!compatibleRoom(room,{role:'host',hero:1}));
 const bad={samples:30,received:30,p95:151,median:40,jitter:4,loss:0};const result=qualityDecision(bad,AUTO_PVP_POLICY);assert(!result.ok);assert.equal(result.reason,'RTT不符合开战规则');l.setLanguage('en');assert.equal(l.translate(result.reason),'RTT does not meet the start policy');assert.equal(qualityDecision(bad,AUTO_PVP_POLICY).reason,result.reason);
});
