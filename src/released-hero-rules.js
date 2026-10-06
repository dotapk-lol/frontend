// Private host composition of the exact accepted127 baseline. Never publish this app entry.
import * as R from './heros-rules.js';
import {remainingLegacyFactory as ten} from './hero-legacy-phase-rules.js';
import {remainingLegacyFactory as zero} from './hero-legacy-zero-rules.js';
import {registerLegacyStatusDrafts,legacyActiveDraftFactory} from './hero-legacy-next-rules.js';
import {core4Factory,centaurFactory,skywrathFactory,extraFactory} from './hero-wave43-owned-rules.js';
import {RELEASED_ROSTER} from './released-roster.js';
export const RELEASE_RULES_HASH='5747bdeffe9948c67882ea02858e7958a5ea15be090b08d9ac6d8561a57970a4';
export const slots=[[1,0],[2,2],[3,0],[4,2],[5,2],[8,1],[9,3],[15,0]];
export function accepted(){const r=R.registerB(R.registerLegacy10To19(R.registerLegacy0To9(R.registerA(R.createHeroRegistry()))),{statusMode:'strict'}).registerFactory(31,2,{abiVersion:R.BATTLE_ABI,create:R.createBash});
 const tenRows=[[10,2,['legacy-passive-v1','legacy-hit-v1']],[12,1,['legacy-passive-v1','legacy-ward-cleave-v1']],[15,2,['legacy-property-v1']],[15,3,['legacy-hit-v1','legacy-souls-v1']],[17,2,['legacy-hit-v1']]];
 for(const [h,s]of[[11,1],[12,0],[14,0],[18,0],[19,0],[14,1],[17,0],[17,3]])tenRows.push([h,s,['legacy-hit-v1','legacy-linear-v1',...(h===17?['legacy-dot-v1']:[])]]);
 tenRows.push([18,3,['legacy-hit-v1','legacy-channel-v1','legacy-field-v1']],[18,1,['legacy-hit-v1','legacy-field-v1','legacy-status-v1']],[18,2,['legacy-hit-v1','legacy-dot-v1']]);
 for(const[h,s,c]of tenRows)r.registerFactory(h,s,ten(h,s,{hostSemantics:'heros-host-events-1',hostCapabilities:c}));
 const zeroRows=[];
 for(const[h,s]of[[4,3],[7,1],[8,0],[9,0]])zeroRows.push([h,s,['legacy-hit-v1','legacy-linear-v1']]);
 for(const[h,s]of[[0,0],[2,1],[4,0],[0,1]])zeroRows.push([h,s,['legacy-hit-v1','legacy-field-v1','legacy-status-v1']]);
 for(const[h,s]of[[1,1],[3,1]])zeroRows.push([h,s,['legacy-hit-v1','legacy-dot-v1','legacy-status-v1']]);
 for(const[h,s]of[[1,3],[2,3],[7,2],[9,2]])zeroRows.push([h,s,['legacy-hit-v1','legacy-channel-v1',...(h===7?['legacy-linear-v1']:[])]]);
 for(const[h,s,c]of zeroRows)r.registerFactory(h,s,zero(h,s,{hostSemantics:'heros-host-events-1',hostCapabilities:c}));
 for(const[h,s]of[[28,3],[32,2],[29,2],[21,3]]){const a=r.definition(h).abilities[s];r.replaceSkill(h,s,{definition:a,factory:R.extensionCanonicalFactory},{abilityId:a.id,revision:h===32?'2.3.0':'2.1.0'});}
 return r;
}
export function finiteRegistry(){const r=accepted();registerLegacyStatusDrafts(r);for(const[h,s]of[[3,0],[8,1],[9,3]])r.registerFactory(h,s,legacyActiveDraftFactory(r.definition(h).abilities[s].id));r.registerFactory(1,0,zero(1,0,{hostSemantics:'heros-host-events-1',hostCapabilities:['legacy-hit-v1']}));r.registerFactory(15,0,ten(15,0,{hostSemantics:'heros-host-events-1',hostCapabilities:['legacy-hit-v1','legacy-status-v1','legacy-souls-v1']}));return r;}
export const receiptSlots=[[3,2],[5,0],[6,3],[7,0],[8,2],[15,1],[16,2],[19,1]];
export function wave(){const r=finiteRegistry();for(const[h,s]of receiptSlots){const c=h<10?['legacy-passive-v1','legacy-status-v1','legacy-contact-v1',...(h===3?['legacy-hit-v1']:[])]:h===15?['legacy-status-v1','legacy-souls-v1','legacy-property-v1']:h===16?['legacy-passive-v1','legacy-status-v1','legacy-hit-v1']:['legacy-shell-v1','legacy-status-v1','legacy-property-v1'];r.registerFactory(h,s,(h<10?zero:ten)(h,s,{hostSemantics:'heros-host-events-1',hostCapabilities:c}));}return r;}
export {R};

export const coreSlots=[[25,2],[31,0],[31,1],[31,3],[45,0],[45,2],[100,2]];
export function coreWave(){const r=wave();for(const[h,s]of coreSlots)r.registerFactory(h,s,core4Factory(h,s));return r;}

export const cSlots=[[94,1],[94,2],[99,2],[106,2]];
export function fullWave(){const r=coreWave();for(const[h,s]of cSlots)r.registerFactory(h,s,{abiVersion:R.BATTLE_ABI,create:h===94?centaurFactory:h===99?skywrathFactory:extraFactory});return r;}

export function createReleasedHeroRegistry(){
 const registry=fullWave(),sealed=registry.seal();
 if(sealed.rulesHash!==RELEASE_RULES_HASH||sealed.manifest.length!==132)throw Error('Released rule registry identity mismatch');
 for(const heroId of RELEASED_ROSTER.heroIds)for(let slot=0;slot<4;slot++)if(!sealed.implementation(heroId,slot))throw Error('Released hero lacks an accepted skill implementation');
 return registry;
}
