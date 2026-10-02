import {heroes as legacyHeroes} from './data.js';
import {HERO_PACKS} from './pack-runtime.js';
export const runtimeHeroes=Object.freeze([...legacyHeroes,...HERO_PACKS.map(pack=>pack.definition)]);
