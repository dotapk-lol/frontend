import {SOURCES} from './definitions.js';
// V5 author-approved 1v1 adaptation: no fog/vision or invisible-target admission is claimed.
// Four slots, official identities, ranks and source coefficients remain immutable.
const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
export const ADAPTED_SOURCES=freeze(SOURCES.map(source=>{const p=structuredClone(source);if(p.definition.registryNumericId===21){const a=p.definition.abilities.find(a=>a.id==='bloodseeker_thirst');a.recipe.arenaNote='二维1v1改编：只按唯一敌人的实际失血比例加速；官方100%至25%生命阈值映射0至40%加速，破被动关闭。竞技场无战争迷雾；本版明确省略低血视野/反隐，不冒充公共隐身目标识别。';a.mvp.arenaNote=a.recipe.arenaNote;a.recipe.omissions=['fog-of-war vision','invisible-target reveal'];p.contract.arenaOmissions=[{abilityId:a.id,reason:'The fighter-only 1v1 adapter has no fog-of-war or shared visibility admission; Thirst retains actual health-driven movement.'}];}return p;}));
