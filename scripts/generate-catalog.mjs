import fs from 'node:fs';
import {createHash} from 'node:crypto';
const base=new URL('../',import.meta.url),ref=new URL('reference/official-2026-10-02/',base);
const read=name=>JSON.parse(fs.readFileSync(new URL(name,ref),'utf8'));
const hash=value=>createHash('sha256').update(value).digest('hex');
const canonical=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const manifest=read('id-mapping.json'),roster=read('official-roster.json'),abilities=read('official-abilities.json');
if(hash(canonical(manifest.heroes))!==manifest.registrySha256)throw Error('Frozen registry hash mismatch');
if(manifest.heroes.length!==127||abilities.abilities.length!==734)throw Error('Unexpected handoff counts');
const sources={};for(const name of ['id-mapping.json','official-roster.json','official-abilities.json','official-talents.json','ability-gap-matrix.json','coverage-acceptance.json','extra-input-requirements.json'])sources[name]=hash(fs.readFileSync(new URL(name,ref)));
const catalog={snapshotId:roster.meta.snapshotId,counts:roster.meta.counts,sourceHashes:sources,heroes:roster.heroes.map(h=>({valveHeroId:h.valveHeroId,internalHeroId:h.internalHeroId,nameEn:h.nameEn,nameZh:h.nameZh,abilityIds:h.abilityIds,innateIds:h.innateIds,fullKitReady:false})),abilities:abilities.abilities.map(a=>({valveAbilityId:a.valveAbilityId,valveHeroId:a.valveHeroId,internalHeroId:a.internalHeroId,valveAbilityKey:a.valveAbilityKey,nameEn:a.nameEn,nameZh:a.nameZh,behaviorRaw:a.behaviorRaw,innate:a.innate,grantedByScepter:a.grantedByScepter,grantedByShard:a.grantedByShard,legacyAbilityId:a.legacyAbilityId,source:a.source,sourceJsonPointer:a.sourceJsonPointer,runtimeStatus:a.legacyAbilityId?'legacy_arena_adaptation':'unimplemented',fullSemanticsVerified:false}))};
const outputs={
 'src/registry-data.js':'// Generated from frozen id-mapping.json; do not reallocate identities.\nexport const REGISTRY_DATA='+JSON.stringify(manifest)+';\n',
 'src/catalog-data.js':'// Generated reference index; catalog presence never enables gameplay. Full official records are preserved under reference/.\nexport const CATALOG_DATA='+JSON.stringify(catalog)+';\nexport const ABILITY_CATALOG_HASH='+JSON.stringify(sources['official-abilities.json'])+';\n',
 'src/rules-version.js':'// Generated from the accepted arena data; distinct from full official semantics.\nexport const RULESET_HASH='+JSON.stringify(hash(Buffer.concat(['src/data.js','src/cohort-data.js','src/cohort-combat.js','src/engine.js','src/pack-dispatcher.js','src/pack-services.js','src/pack-hp.js','src/pack-control.js','src/pack-targeting.js','src/pack-runtime.js',...fs.readdirSync(new URL('src/hero-packs/',base),{recursive:true}).filter(f=>f.endsWith('.js')).sort().map(f=>'src/hero-packs/'+f)].map(f=>fs.readFileSync(new URL(f,base))))))+';\n'
};
for(const [name,body]of Object.entries(outputs)){if(process.argv.includes('--check')){if(fs.readFileSync(new URL(name,base),'utf8')!==body)throw Error('Stale generated catalog: '+name);}else fs.writeFileSync(new URL(name,base),body);}
console.log(JSON.stringify({catalogHeroes:127,abilityRecords:734,registrySha256:manifest.registrySha256,mode:process.argv.includes('--check')?'verified':'generated'}));
