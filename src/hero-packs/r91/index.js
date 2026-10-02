import {DEFINITIONS} from './definitions.js';
import {R91Combat} from './runtime.js';
export {DEFINITIONS} from './definitions.js';
export const PACKS=Object.freeze(DEFINITIONS.map(p=>Object.freeze({...p,systemId:'r91',sharedSystem:R91Combat})));
// This selection is only for local Engine fixtures. It never unlocks the active roster.
export const ENGINE_PACKS=Object.freeze(PACKS.filter(p=>p.contract.adapterStatus==='real_engine_candidate_locked'&&!p.contract.requiresCapabilities.length));
export const PRIORITY_IDS=Object.freeze([94,95,97,99,102,109,118]);
