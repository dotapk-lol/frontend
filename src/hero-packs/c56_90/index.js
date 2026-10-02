import {RECORDS} from './definitions.js';
import {C56System} from './system.js';
export {RECORDS,C56System};
export const PACKS=Object.freeze(RECORDS.filter(r=>r.contract.realEngineImplemented).map(r=>Object.freeze({...r,systemId:'c56_90',sharedSystem:C56System})));
// These contracts deliberately fail frozen ABI capability validation. Never register partial heroes.
export const BLOCKED_PACKS=Object.freeze(RECORDS.filter(r=>!r.contract.realEngineImplemented).map(r=>Object.freeze({...r,systemId:'c56_90',sharedSystem:C56System})));
