import {HEROS22_BUILD} from './release-profile.js';
import {NET_VERSION} from './net-version.js';
import {REGISTRY_VERSION,REGISTRY_HASH,ACTIVE_ROSTER,validHeroPair,isActiveHero,heroRegistry,LEGACY_ROSTER_ID} from './hero-registry.js';
import {ABILITY_CATALOG_HASH} from './catalog-data.js';
import {RULESET_HASH} from './rules-version.js';
export const GAME_COMPATIBILITY=Object.freeze({protocolVersion:'duel-wire-3',registryVersion:REGISTRY_VERSION,registrySha256:REGISTRY_HASH,rosterId:ACTIVE_ROSTER.rosterId,mechanicsVersion:ACTIVE_ROSTER.mechanicsVersion,rulesetHash:RULESET_HASH,abilityCatalogHash:ABILITY_CATALOG_HASH,gameVersion:NET_VERSION});
export const compatibleGame=remote=>!!remote&&Object.entries(GAME_COMPATIBILITY).every(([key,value])=>remote[key]===value);
export function validateBackendRegistry(data,gameVersion=NET_VERSION,rosterId=ACTIVE_ROSTER.rosterId){
 if(data?.registryVersion!==REGISTRY_VERSION||data?.registrySha256!==REGISTRY_HASH||!Array.isArray(data.heroes)||!Array.isArray(data.gameplayRosters))throw Error('后端英雄注册表版本不兼容');
 const seen=new Set();for(const row of data.heroes){const own=heroRegistry.byNumericId(row.registryNumericId);if(!own||seen.has(row.registryNumericId)||row.internalHeroId!==own.internalHeroId||row.valveHeroId!==own.valveHeroId||row.legacyIndex!==own.legacyIndex)throw Error('后端英雄身份与冻结清单不一致');seen.add(row.registryNumericId);}if(seen.size!==heroRegistry.rows().length)throw Error('后端英雄注册表不完整');
 const roster=data.gameplayRosters.find(r=>r.rosterId===rosterId);if(!roster||roster.registryVersion!==REGISTRY_VERSION||!Array.isArray(roster.heroIds)||new Set(roster.heroIds).size!==roster.heroIds.length||roster.heroIds.length!==ACTIVE_ROSTER.heroIds.length||!roster.heroIds.every(id=>ACTIVE_ROSTER.heroIds.includes(id)))throw Error('后端可玩名单不一致');
 const bindings=data.gameplayRosters.filter(r=>Array.isArray(r.gameVersions)&&r.gameVersions.includes(gameVersion));if(rosterId===LEGACY_ROSTER_ID?bindings.length>0:bindings.length!==1||bindings[0].rosterId!==rosterId)throw Error('构建版本与可玩名单不匹配');
 return Object.freeze({status:'verified',rosterId,registryVersion:REGISTRY_VERSION,registrySha256:REGISTRY_HASH,heroIds:Object.freeze([...roster.heroIds])});
}
export const compatibleMatch=match=>{
 if(HEROS22_BUILD&&(!match||match.rosterId!==ACTIVE_ROSTER.rosterId||match.registryVersion!==REGISTRY_VERSION||match.version!==NET_VERSION))return false;
 if(HEROS22_BUILD&&match.players!==undefined&&(!Array.isArray(match.players)||!match.players.every(p=>isActiveHero(p?.hero))))return false;
 return (match?.rosterId===undefined||match.rosterId===ACTIVE_ROSTER.rosterId)&&(match?.registryVersion===undefined||[REGISTRY_VERSION,LEGACY_ROSTER_ID].includes(match.registryVersion))&&(!match?.heroes||validHeroPair(match.heroes));
};
// RoomView has two fixed seats. Before joining, Go serializes the guest's
// zero-value Player as {id:'',hero:0}; it is not a selected hero or a match.
export const compatibleRoom=(room,{role,hero}={})=>{
 if(!HEROS22_BUILD)return compatibleMatch(room);
 if(!['host','guest'].includes(role)||!isActiveHero(hero)||!room||room.rosterId!==ACTIVE_ROSTER.rosterId||room.registryVersion!==REGISTRY_VERSION||room.version!==NET_VERSION||!Array.isArray(room.players)||room.players.length!==2)return false;
 const occupied=p=>/^[a-f0-9]{64}$/.test(p?.id||'')&&isActiveHero(p?.hero);
 const [host,guest]=room.players,emptyGuest=guest?.id===''&&guest?.hero===0;
 return occupied(host)&&(occupied(guest)||role==='host'&&emptyGuest)&&room.players[role==='host'?0:1].hero===hero;
};
