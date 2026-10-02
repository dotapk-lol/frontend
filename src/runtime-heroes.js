import {heroes as legacyHeroes} from './data.js';
import {CORE4_PACKS} from './hero-packs/index.js';
export const runtimeHeroes=Object.freeze([...legacyHeroes,...CORE4_PACKS.map(pack=>pack.definition)]);
