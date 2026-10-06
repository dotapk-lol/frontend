import {CANDIDATE_BUILD,HEROS22_BUILD} from './release-profile.js';
import {RELEASED_ROSTER} from './released-roster.js';
import {CANDIDATE_ROSTER} from './candidate-roster.js';
import {REGISTRY_DATA} from './registry-data.js';
export function freezeTree(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){for(const v of Object.values(value))freezeTree(v);Object.freeze(value);}return value;}
export function createHeroRegistry(manifest){
 const numeric=new Map(),valve=new Map(),internal=new Map(),legacy=new Map();
 for(const source of manifest.heroes){const row=freezeTree({...source});if(!Number.isSafeInteger(row.registryNumericId)||row.registryNumericId<0||!Number.isSafeInteger(row.valveHeroId)||row.valveHeroId<=0||typeof row.internalHeroId!=='string'||!row.internalHeroId||numeric.has(row.registryNumericId)||valve.has(row.valveHeroId)||internal.has(row.internalHeroId))throw Error('Duplicate or invalid hero identity');numeric.set(row.registryNumericId,row);valve.set(row.valveHeroId,row);internal.set(row.internalHeroId,row);if(row.legacyIndex!==null){if(!Number.isSafeInteger(row.legacyIndex)||row.legacyIndex!==row.registryNumericId||legacy.has(row.legacyIndex))throw Error('Invalid legacy identity');legacy.set(row.legacyIndex,row);}}
 return Object.freeze({registryVersion:manifest.registryVersion,registrySha256:manifest.registrySha256,byNumericId:id=>numeric.get(id)||null,byValveId:id=>valve.get(id)||null,byInternalId:id=>internal.get(id)||null,fromLegacyIndex:id=>legacy.get(id)||null,rows:()=>Object.freeze([...numeric.values()])});
}
freezeTree(REGISTRY_DATA);
export const heroRegistry=createHeroRegistry(REGISTRY_DATA);
export const REGISTRY_VERSION=heroRegistry.registryVersion;
export const REGISTRY_HASH=heroRegistry.registrySha256;
export const LEGACY_ROSTER_ID='legacy-20-v1';
// This allowlist is independent of catalog order and deliberately excludes all new heroes.
export const STABLE_ROSTER=freezeTree({rosterId:'arena-core4-24-v1',registryVersion:REGISTRY_VERSION,heroIds:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,25,31,45,100],mechanicsVersion:'arena-core4-v1'});
export const ACTIVE_ROSTER=HEROS22_BUILD?RELEASED_ROSTER:CANDIDATE_BUILD?freezeTree({...CANDIDATE_ROSTER,registryVersion:REGISTRY_VERSION}):STABLE_ROSTER;
export const isActiveHero=id=>Number.isSafeInteger(id)&&ACTIVE_ROSTER.heroIds.includes(id)&&!!heroRegistry.byNumericId(id)&&!heroRegistry.byNumericId(id).tombstone;
export const isHeroInSimulationRoster=(id,roster)=>roster?.registryVersion===REGISTRY_VERSION&&Array.isArray(roster.heroIds)&&Number.isSafeInteger(id)&&roster.heroIds.includes(id)&&(!HEROS22_BUILD||isActiveHero(id))&&!!heroRegistry.byNumericId(id)&&!heroRegistry.byNumericId(id).tombstone;
export const validSimulationPair=(ids,roster)=>Array.isArray(ids)&&ids.length===2&&ids.every(id=>isHeroInSimulationRoster(id,roster));
export const validHeroPair=ids=>Array.isArray(ids)&&ids.length===2&&ids.every(isActiveHero);
export function runtimeHeroId(hero){const row=heroRegistry.byInternalId(hero?.id);if(!row||!isActiveHero(row.registryNumericId))throw Error('Hero is not in the active gameplay roster');return row.registryNumericId;}
export function lookupRuntimeHero(pool,id,roster=ACTIVE_ROSTER){if(!isHeroInSimulationRoster(id,roster))throw Error('Hero is not playable in '+ACTIVE_ROSTER.rosterId);const row=heroRegistry.byNumericId(id),matches=pool.filter(h=>h.id===row.internalHeroId);if(matches.length!==1)throw Error('Missing or duplicate runtime hero: '+row.internalHeroId);return matches[0];}
export function historicalHero(record,slot){const id=record?.heroes?.[slot],version=record?.registryVersion;if(!version||version===LEGACY_ROSTER_ID)return heroRegistry.fromLegacyIndex(id);if(version!==REGISTRY_VERSION)return null;return heroRegistry.byNumericId(id);}
