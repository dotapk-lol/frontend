import {CORE4_PACKS} from './hero-packs/index.js';
import {PACKS as A8_PACKS} from './hero-packs/r20_55/index.js';
import {PACKS as B6_PACKS} from './hero-packs/c56_90/index.js';
import {ENGINE_PACKS as C7_PACKS} from './hero-packs/r91/index.js';
import {createPackDispatcher} from './pack-dispatcher.js';
export const HERO_PACKS=Object.freeze([...CORE4_PACKS,...A8_PACKS,...B6_PACKS,...C7_PACKS]);
export const PackCombat=createPackDispatcher(HERO_PACKS);
