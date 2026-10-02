import {CORE4_PACKS} from './hero-packs/index.js';
import {R91_PACKS} from './hero-packs/r91-combat.js';
import {createPackDispatcher} from './pack-dispatcher.js';
export const HERO_PACKS=Object.freeze([...CORE4_PACKS,...R91_PACKS]);
export const PackCombat=createPackDispatcher(HERO_PACKS);
