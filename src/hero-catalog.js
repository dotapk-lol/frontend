import {CATALOG_DATA} from './catalog-data.js';
import {freezeTree,heroRegistry,isActiveHero,historicalHero} from './hero-registry.js';
freezeTree(CATALOG_DATA);
const catalogByHero=new Map(CATALOG_DATA.heroes.map(h=>[h.valveHeroId,h]));
const catalogByAbility=new Map(CATALOG_DATA.abilities.map(a=>[a.valveAbilityId,a]));
export const heroCatalog=Object.freeze({snapshotId:CATALOG_DATA.snapshotId,counts:CATALOG_DATA.counts,heroes:()=>CATALOG_DATA.heroes,abilities:()=>CATALOG_DATA.abilities,byNumericId(id){const row=heroRegistry.byNumericId(id);return row?catalogByHero.get(row.valveHeroId)||null:null;},ability:id=>catalogByAbility.get(id)||null,status(id){return !heroRegistry.byNumericId(id)?'unknown':isActiveHero(id)?heroRegistry.byNumericId(id).legacyIndex===null?'selected_adapted_candidate':'legacy_arena_adaptation':'unimplemented';}});
export const historicalHeroName=(record,slot)=>{const row=historicalHero(record,slot);return row?catalogByHero.get(row.valveHeroId)?.nameZh||row.internalHeroId:'未知英雄';};
export const hasOfficialBehavior=(decimal,bit)=>(BigInt(decimal)&BigInt(bit))!==0n;
