# Dota Duel official-source snapshot

Retrieved 2026-09-30 UTC directly from Valve's official Dota 2 website and its linked Steam CDN. Exact timestamps and SHA-256 hashes are recorded in `source-manifest.json` and `asset-manifest.json`.

## Deliverables

- `heroes.json`: 20 heroes, 80 core abilities; original prototype hero/ability IDs retained as `key`, official Valve internal names as `officialKey`. English and Simplified Chinese descriptions, numeric arrays for every skill rank, all official special-value arrays and modifier metadata, official base attributes, and innate/Scepter/Shard abilities preserved. `official` / `officialZh` retain the raw per-ability records. `officialBaseStats` is the site's displayed default hero stat snapshot, not a claim of level-18 or level-30 stats.
- `combat-overrides.json`: 80 original-ability-ID keyed entries under `byAbility`. Max-rank cooldown, mana, cast time, damage type, damage semantic, duration, range, radius, charges/recharge and compound effects. `fieldSources` names the original exact source field for semantic conversions. Values use original seconds/Dota units; no balancing or coordinate scaling was applied. The semantic map is an interpretation of official data, not Valve's executable game implementation.
- `innates.json`: Each of the 20 innate abilities with full official numeric arrays. Includes dependencies relevant to core abilities.
- `raw/{hero_id}-{english|schinese}.json`: 40 exact official hero-feed responses. These preserve talents and all additional abilities outside the selected four core abilities.
- `assets/`: 140 unmodified downloaded official image assets: 20 transparent full-character render PNGs (all 1440×1440), 20 portrait PNGs, 20 minimap icon PNGs, 80 ability icon PNGs (128×128).
- `max-level-audit.txt`: Human-readable semantic audit including max-level numeric fields.
- `source-manifest.json`: Source request URLs, exact retrieval times, HTTP status, available caching metadata, and hashes.
- `asset-manifest.json`: Asset source URLs, dimensions, transparency flag, sizes and hashes.
- `fetch_official.py`, `fetch_assets.py`, `normalize_official.py`, `build_combat_overrides.py`: Reproducible acquisition and interpretation scripts. `original-data.json` is copied from the earlier prototype only for ID/role/color/adaptation mapping, and is not an official source.

## Primary sources and provenance

Official hero overview: https://www.dota2.com/heroes

Official hero data endpoint:
`https://www.dota2.com/datafeed/herodata?language=english&hero_id={id}`
`https://www.dota2.com/datafeed/herodata?language=schinese&hero_id={id}`

Official hero index:
https://www.dota2.com/datafeed/herolist?language=english

The current official frontend JavaScript requests exactly these endpoints. Downloaded source bundle:
https://www.dota2.com/public/javascript/dota_react/main.js?v=qA3udhsb6x_S&l=english&_cdn=fastly

Official patch index:
https://www.dota2.com/datafeed/patchnoteslist?language=english

The latest listed patch at retrieval was 7.41f, timestamp 2026-09-15 07:00:00 UTC. Patch page:
https://www.dota2.com/patches/7.41f

IMPORTANT: The hero feed does not expose its own patch/build identifier. Label this release "official website snapshot, 2026-09-30; latest listed patch 7.41f" rather than claiming a proven patch lock for every numeric record.

## Image source patterns

Official frontend declares these asset patterns. All downloaded files were decoded successfully and checked; no URLs were accepted merely because they matched a pattern.

- Transparent character render: `https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/{officialHeroKey}.png`
- Hero portrait: `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/{officialHeroKey}.png`
- Hero minimap icon: `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/{officialHeroKey}.png`
- Ability icon: `https://cdn.steamstatic.com/apps/dota2/images/dota_react/abilities/{officialAbilityKey}.png`

Character renders are real full-body transparent Dota assets, not round portrait tokens. They are static renders, not an official fighting-animation sprite sheet. Any movement/attack animation built around them is an arena implementation. Valve's website also references idle-loop render videos; those are not fighting animation assets.

Technical availability does not establish a redistribution license. Dota 2 and its characters/art remain associated with Valve; avoid claiming an official Valve product or a legal entitlement to public/commercial reuse. This research provides provenance, not legal advice or permission.

## Numeric interpretation rules

1. Keep all per-rank arrays for reference; max-rank combat overrides select the last array value. No talents, Scepter, Shard, or facet bonuses are applied in these overrides.
2. Top-level `damages` and `durations` often contain zero while meaningful values are in `special_values`; zero cannot be interpreted as proof that a spell deals no damage or has no duration.
3. `damage_semantics` must be respected: DPS, total damage, per-attack damage, percentages, attack multipliers, and health/mana-based formulas cannot be interchanged.
4. Use `charges` and `charge_restore_s` where present; a zero cooldown is not unlimited charges. Phantom Strike currently has 2 charges and 12s recharge; Shrapnel 3/35s; Leap 2/15s.
5. The feed's damage codes are preserved. Current Death Ward and Battle Hunger are pure-damage records (4); do not copy historical physical/magical assumptions.
6. Official whole-hero mechanics include innate abilities. Omitting these needs a clear scope statement: Lina's Slow Burn, Zeus's Static Field, Shadow Fiend's Necromastery and other innates alter damage or resources. See the full records rather than deriving a fixed substitute damage.
7. Position units can be converted by a documented coordinate factor. Any shortened control duration, normalized health/mana pool, arena fallback target, extra invulnerability, nonofficial resource regen, animation cancel, altered collision rule, fixed random sequence, or reduced cooldown is an arena adaptation.

## Explicit missing / ambiguous fields

Do not fabricate these as official values. A labeled implementation constant is acceptable for an arena-specific behavior.

- Death Ward's attack interval is absent from the official hero feed. Its 120 pure damage is per ward attack, not DPS.
- Assassinate's base mini-stun duration is not exposed, despite the description mentioning it.
- Ball Lightning has raw `mana_costs:[30]` but its official tooltip and specials explicitly define activation as 25 + 7.5% of maximum mana, then each 100 Dota units costing 10 + 0.65% maximum mana. The explicit formula is preserved and preferred; the conflict remains visible.
- Shadowraze's official hero feed exposes `nevermore_shadowraze1`; it does not supply secondary Shadowraze variant records. The single record contains fixed center distance 200 and radius 250.
- Several detailed collision/hit rules (Multishot same-wave collision, Echo Slam echo-origin interactions, exact tick order, projectile/hurtbox geometry, animation backswing) are not specified by the website data.
- The website is a reference database, not a complete executable simulation. A browser arena can preserve sourced values and core effects while disclosing conversion rules; it cannot truthfully claim complete engine identity based only on these endpoints.

## Snapshot validation

- 20 exact roster matches against the original prototype
- 4 selected non-innate, non-item-granted, multi-rank core abilities per hero
- 80 unique original ability keys mapped to 80 official ability IDs
- 40 successful localized hero responses
- No unresolved substitution tokens in normalized core English/Chinese descriptions
- 140 decoded image assets; 0 failed downloads
- All 20 full-character render images have alpha transparency
