import {HEROS22_BUILD} from './release-profile.js';
import {RELEASED_DEFAULT_PICKS} from './released-roster.js';
import {heroRegistry,isActiveHero} from './hero-registry.js';

export const DEFAULT_PICKS=HEROS22_BUILD?RELEASED_DEFAULT_PICKS:Object.freeze([0,3]);
// Stored preferences can age across releases; network/match inputs must be rejected instead.
export function storedHeroPicks(value){return DEFAULT_PICKS.map((fallback,i)=>Array.isArray(value)&&value.length===2&&isActiveHero(value[i])?value[i]:fallback);}
export function directoryHeroId(hero){const row=heroRegistry.byInternalId(hero?.id);if(!row)throw Error('Unknown directory hero identity');return row.registryNumericId;}
export function directoryRuntimeHero(pool,id){const row=heroRegistry.byNumericId(id),matches=row?pool.filter(hero=>hero.id===row.internalHeroId):[];if(matches.length!==1)throw Error('Missing directory runtime hero');return matches[0];}
