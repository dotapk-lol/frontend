// Private release allowlist. Numeric IDs are immutable registry identities.
export const RELEASED_ROSTER=Object.freeze({rosterId:'arena-heros28-v1',registryVersion:'duel-heroes-127-v1',heroIds:Object.freeze([0,1,2,3,4,5,6,7,8,9,10,14,15,17,18,19,28,31,32,36,50,55,57,58,62,71,81,82]),mechanicsVersion:'arena-heros28-public112-v1'});
export const RELEASED_DEFAULT_PICKS=Object.freeze([1,3]);
// The build and entry gate share the profile derived from the exact release list.
export const RELEASED_PROFILE='heros'+RELEASED_ROSTER.heroIds.length;
