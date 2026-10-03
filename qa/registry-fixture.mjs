import {REGISTRY_DATA} from '../src/registry-data.js';
import {ACTIVE_ROSTER,REGISTRY_HASH,REGISTRY_VERSION} from '../src/hero-registry.js';
import {NET_VERSION} from '../src/net-version.js';
export const registryFixture=()=>({registryVersion:REGISTRY_VERSION,registrySha256:REGISTRY_HASH,heroes:REGISTRY_DATA.heroes.map(({registryNumericId,internalHeroId,valveHeroId,legacyIndex})=>({registryNumericId,internalHeroId,valveHeroId,legacyIndex})),gameplayRosters:[{rosterId:ACTIVE_ROSTER.rosterId,registryVersion:REGISTRY_VERSION,heroIds:[...ACTIVE_ROSTER.heroIds],gameVersions:[NET_VERSION]}]});
